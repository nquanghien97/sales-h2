import prisma from "@/lib/db";
import { verifyToken } from "@/lib/token";
import { deleteFile, uploadFile } from "@/utils/fileUpload";
import { ImageCategory } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: number }> }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({
      success: false,
      message: "Missing id"
    }, { status: 403 });

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

    const data = await prisma.insight_mother.findUnique({
      where: {
        id: +id
      }
    })
    return NextResponse.json({
      success: true,
      data,
      message: "Lấy data thành công",
    });
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

export async function PUT(req: Request, { params }: { params: Promise<{ id: number }> }) {
  try {
    const { id } = await params;

    const formData = await req.formData();
    const keyword = formData.get('keyword') as string;
    const content = formData.get('content') as string;
    const salesPolicy = formData.getAll('salesPolicy') as File[];
    const products = formData.getAll('products') as File[];
    const productDocuments = formData.getAll('productDocuments') as File[];
    const feedbacks = formData.getAll('feedbacks') as File[];

    if (!id) return NextResponse.json({
      success: false,
      message: "Missing id"
    }, { status: 403 });

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

    const listFiles = await prisma.files.findMany({
      where: {
        insightMotherId: +id
      }
    });

    await prisma.files.deleteMany({
      where: {
        insightMotherId: +id
      }
    })

    for (const file of listFiles) {
      deleteFile(file.url)
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

    const dataSalesPolicy = dataFiles({
      filenames: fileNamesSalesPolicy,
      insightMotherId: +id,
      category: "salesPolicy",
    })
    const dataProducts = dataFiles({
      filenames: fileNamesProducts,
      insightMotherId: +id,
      category: "products",
    })
    const dataProductDocuments = dataFiles({
      filenames: fileNamesProductDocuments,
      insightMotherId: +id,
      category: "productDocuments",
    })
    const dataFeedbacks = dataFiles({
      filenames: fileNamesFeedbacks,
      insightMotherId: +id,
      category: "feedbacks",
    })

    const mergeData = [...dataSalesPolicy, ...dataProducts, ...dataProductDocuments, ...dataFeedbacks]

    if (mergeData.length > 0) {
      await prisma.files.createMany({ data: mergeData });
    }

    await prisma.insight_mother.update({
      where: {
        id: +id
      },
      data: {
        keyword,
        content,
      }
    })

    return NextResponse.json({
      success: true,
      message: "Cập nhật thành công",
    });
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

export async function DELETE(req: Request, { params }: { params: Promise<{ id: number }> }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({
      success: false,
      message: "Missing id"
    }, { status: 403 });

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
    const listFiles = await prisma.files.findMany({
      where: {
        insightMotherId: +id
      }
    });

    await prisma.files.deleteMany({
      where: {
        insightMotherId: +id
      }
    })

    for (const file of listFiles) {
      deleteFile(file.url)
    }
    await prisma.insight_mother.delete({
      where: {
        id: +id
      }
    })
    return NextResponse.json({
      success: true,
      message: "Xóa thành công",
    });
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