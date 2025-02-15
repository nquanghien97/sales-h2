import prisma from "@/lib/db";
import { verifyToken } from "@/lib/token";
import { uploadFile } from "@/utils/fileUpload";
import { ImageCategory } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const keyword = formData.get('keyword') as string;
    const content = formData.get('content') as string;
    const salesPolicy = formData.getAll('salesPolicy') as File[];
    const products = formData.getAll('products') as File[];
    const productDocuments = formData.getAll('productDocuments') as File[];
    const feedbacks = formData.getAll('feedbacks') as File[];

    if (!keyword || !content) {
      return NextResponse.json(
        { success: false, message: "Thiếu dữ liệu bắt buộc." },
        { status: 400 }
      );
    }

    const authorization = req.headers.get('authorization');
    const token = authorization?.split(' ')[1];
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại."
      }, { status: 401 });
    }
    const user = await verifyToken(token)
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại."
      }, { status: 401 });
    }
    
    if (user.user_role !== 'ADMIN') {
      return NextResponse.json({
        success: false,
        message: "Bạn không có quyền"
      }, { status: 403 });
    }

    const dataFiles = ({ filenames, insightMotherId, category }: { filenames: { filename: string, type?: 'image' | 'video' }[], insightMotherId: number, category: ImageCategory }) => {
      return filenames.map(filename => ({
        url: filename.filename,
        type: filename.type,
        insightMotherId,
        category,
        authorId: Number(user.user_id)
      }))
    }

    const [
      fileNamesSalesPolicy,
      fileNamesProducts,
      fileNamesProductDocuments,
      fileNamesFeedbacks,
    ] = await Promise.all([
      uploadFile(salesPolicy, "sales-policy"),
      uploadFile(products, "products"),
      uploadFile(productDocuments, "product-documents"),
      uploadFile(feedbacks, "feedbacks"),
    ]);

    const resInsightMother = await prisma.insight_mother.create({
      data: {
        keyword,
        content,
        authorId: Number(user.user_id)
      }
    })

    const dataSalesPolicy = dataFiles({
      filenames: fileNamesSalesPolicy,
      insightMotherId: resInsightMother.id,
      category: "salesPolicy",
    })
    const dataProducts = dataFiles({
      filenames: fileNamesProducts,
      insightMotherId: resInsightMother.id,
      category: "products",
    })
    const dataProductDocuments = dataFiles({
      filenames: fileNamesProductDocuments,
      insightMotherId: resInsightMother.id,
      category: "productDocuments",
    })
    const dataFeedbacks = dataFiles({
      filenames: fileNamesFeedbacks,
      insightMotherId: resInsightMother.id,
      category: "feedbacks",
    })

    const mergeData = [...dataSalesPolicy, ...dataProducts, ...dataProductDocuments, ...dataFeedbacks]

    if (mergeData.length > 0) {
      await prisma.files.createMany({ data: mergeData });
    }

    return NextResponse.json({
      success: true,
      message: "Tạo data thành công",
    }, { status: 200 });

  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({
        success: false,
        message: "Server error, please try again.",
        error: err.message,
      }, { status: 500 });
    }
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pageParam = url.searchParams.get('page');
  const pageSizeParam = url.searchParams.get('pageSize')
  const search = url.searchParams.get('search') || '';

  const page = pageParam ? parseInt(pageParam, 10) : null;
  const pageSize = pageSizeParam ? parseInt(pageSizeParam, 10) : null;

  let skip: number | undefined;
  let take: number | undefined;

  if (page !== null && pageSize !== null) {
    skip = (page - 1) * pageSize;
    take = pageSize;
  }
  const whereCondition = {
    keyword: {
      contains: search.toLowerCase(),
    },
  };

  try {
    const authorization = req.headers.get('authorization');
    const token = authorization?.split(' ')[1];
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại."
      }, { status: 401 });
    }
    const user = await verifyToken(token)
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại."
      }, { status: 401 });
    }

    const data = await prisma.insight_mother.findMany({
      where: {
        ...whereCondition
      },
      include: {
        author: {
          select: {
            id: true,
            fullName: true
          }
        },
        images: true
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      }
    })

    const total = await prisma.insight_mother.count({
      where: {
        ...whereCondition
      }
    })
    return NextResponse.json({
      success: true,
      data,
      total
    }, { status: 200 });

  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({
        success: false,
        message: "Server error, please try again.",
        error: err.message,
      }, { status: 500 });
    }
  }
}