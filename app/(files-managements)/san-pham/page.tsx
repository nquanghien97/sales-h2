'use client';

import LoadingIcon from '@/components/ui/LoadingIcon';
import Pagination from '@/components/ui/Pagination';
import Select from '@/components/ui/Select';
import { FilesEntity } from '@/entities/files';
import { getFiles } from '@/services/files';
import { Image } from 'antd';
import React, { useEffect, useState } from 'react'

function Products() {
  const [files, setFiles] = useState<FilesEntity[]>([]);
  const [searchParams, setSearchParams] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Sản phẩm'
  }, [])

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getFiles({
          ...searchParams,
          page,
          pageSize,
          category: 'products',
        })
        setFiles(res.files);
        setTotal(res.total);
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false);
      }
    })()
  }, [page, pageSize, searchParams])

  return (
    <div className="px-4">
      <h1 className="text-center text-4xl font-bold mb-4 py-4">Sản phẩm</h1>
      <div className="flex flex-wrap justify-center w-full py-4 gap-4">
        {loading ? (
          <LoadingIcon color='blue' />
        ) : (
          files.length > 0 ? (
            files.map((file, index) => {
              if (file.type?.startsWith('image')) {
                return (
                  <Image.PreviewGroup key={index}>
                    <Image className="border-2 m-auto cursor-pointer" width={180} height={180} src={`/api${file.url}`} alt="preview avatar" />
                  </Image.PreviewGroup>
                )
              }
              if (file.type?.startsWith('video')) {
                return (
                  <video
                    key={index}
                    controls
                    width={300}
                    height={300}
                  >
                    <source className="border-2 m-auto cursor-pointer" width={100} height={100} src={`/api${file.url}`} />
                  </video>
                )
              }
            })
          ) : (
            <p>Không có dữ liệu</p>
          )
        )
        }
      </div>
      <div className="mt-4 flex justify-between items-center w-1/2 m-auto">
        <div>
          <Select
            options={[
              { label: '1', value: '1' },
              { label: '10', value: '10' },
              { label: '20', value: '20' },
              { label: '50', value: '50' },
              { label: '100', value: '100' },
            ]}
            defaultValue='10'
            onChange={(e) => {
              setPageSize(Number(e))
              setPage(1)
            }}
          />
        </div>
        <Pagination
          totalCount={total}
          onPageChange={(page) => {
            setSearchParams((pre) => ({ ...pre, page }));
            setPage(page);
          }}
          siblingCount={1}
          currentPage={page}
          pageSize={pageSize}
        />
        <div className="whitespace-nowrap">
          <span>Kết quả {1 + (pageSize * (page - 1))} - {(pageSize * page)} của tổng {total} bản ghi</span>
        </div>
      </div>
    </div>
  )
}

export default Products