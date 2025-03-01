'use client';

import DeleteIcon from '@/assets/icons/DeleteIcon';
import DownloadIcon from '@/assets/icons/DownloadIcon';
import { Button } from '@/components/ui/Button';
import LoadingIcon from '@/components/ui/LoadingIcon';
import { FilesEntity } from '@/entities/files';
import { getFiles } from '@/services/files';
import { useAuthStore } from '@/zustand/auth.store';
import { Image } from 'antd';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CreateFiles from './actions/Create';
import Link from 'next/link';
import DeleteFile from './actions/DeleteFile';

function FileCategories() {
  const [files, setFiles] = useState<FilesEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpenCreateFiles, setIsOpenCreateFiles] = useState(false);
  const [isOpenDeleteFiles, setIsOpenDelete] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);
  const [fileId, setFileId] = useState<number>();

  const params : { slug: string } = useParams();

  const { me } = useAuthStore()

  useEffect(() => {
    document.title = 'Chính sách bán hàng'
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getFiles({
          slug: params.slug,
        })
        setFiles(res.files);
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false);
      }
    })()
  }, [refreshKey, params.slug])

  return (
    <div>
      <CreateFiles open={isOpenCreateFiles} onClose={() => setIsOpenCreateFiles(false)} setRefreshKey={setRefreshKey} />
      {fileId && <DeleteFile open={isOpenDeleteFiles} onClose={() => setIsOpenDelete(false)} setRefreshKey={setRefreshKey} id={fileId} />}
      <h1 className="text-center text-4xl font-bold mb-4 py-4">Chính sách bán hàng</h1>
      {me?.role === 'ADMIN' && (
        <div className="mb-4">
          <Button variant='primary' onClick={() => setIsOpenCreateFiles(true)}>Thêm tư liệu</Button>
        </div>
      )}
      <div className="flex flex-wrap justify-center w-full py-4 gap-4">
        {loading ? (
          <LoadingIcon color="blue" />
        ) : (
          files.length > 0 ? (
            files.map((file, index) => {
              if (file.type?.startsWith('image')) {
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <Image.PreviewGroup>
                      <Image className="border-2 m-auto cursor-pointer" width={180} height={180} src={`/api${file.url}`} alt="preview avatar" />
                    </Image.PreviewGroup>
                    <div className="flex justify-center max-w-[180px] flex-1">
                      <span className="break-words w-full">{file.fileName}</span>
                    </div>
                    <div className="flex w-full">
                      <Button variant='primary' className="w-full">
                        <a download href={`/api${file.url}`} className="flex">
                          <DownloadIcon title='Tải xuống' />
                        </a>
                      </Button>
                      {me?.role === 'ADMIN' && (
                        <Button
                          variant='danger'
                          className="w-full"
                          onClick={() => {
                            setIsOpenDelete(true)
                            setFileId(file.id)
                          }}>
                          <DeleteIcon title='Xóa' />
                        </Button>
                      )}
                    </div>
                  </div>
                )
              }
              if (file.type?.startsWith('video')) {
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <video
                      controls
                      width={300}
                      height={300}
                      className='h-[180px] w-full'
                    >
                      <source className="border-2 m-auto cursor-pointer" width={100} height={100} src={`/api${file.url}`} />
                    </video>
                    <div className="flex justify-center flex-1 max-w-[180px]">
                      <span className="break-words w-full">{file.fileName}</span>
                    </div>
                    <div className="flex w-full">
                      <Button variant='primary' className="w-full">
                        <a download href={`/api${file.url}`} className="flex">
                          <DownloadIcon title='Tải xuống' />
                        </a>
                      </Button>
                      {me?.role === 'ADMIN' && (
                        <Button
                          variant='danger'
                          className="w-full"
                          onClick={() => {
                            setIsOpenDelete(true)
                            setFileId(file.id)
                          }}>
                          <DeleteIcon title='Xóa' />
                        </Button>
                      )}
                    </div>
                  </div>
                )
              }
              if (file.type?.startsWith('pdf')) {
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <Image src="/pdf-image.png" alt="pdf-image" width={180} height={180} />
                    <div className="flex justify-center flex-1 max-w-[180px]">
                      <span className="w-[180px] break-words">{file.fileName}</span>
                    </div>
                    <div className="flex w-full">
                      <Button variant='primary' className="w-full">
                        <a download href={`/api${file.url}`} className="flex">
                          <DownloadIcon title='Tải xuống' />
                        </a>
                      </Button>
                      {me?.role === 'ADMIN' && (
                        <Button
                          variant='danger'
                          className="w-full"
                          onClick={() => {
                            setIsOpenDelete(true)
                            setFileId(file.id)
                          }}>
                          <DeleteIcon title='Xóa' />
                        </Button>
                      )}
                    </div>
                  </div>
                )
              }
              if (file.type?.startsWith('audio')) {
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <Image src="/audio.jpg" alt="audio" width={180} height={180} />
                    <div className="flex justify-center flex-1 max-w-[180px]">
                      <span className="w-[180px] break-words">{file.fileName}</span>
                    </div>
                    <div className="flex w-full">
                      <Button variant='primary' className="w-full">
                        <a download href={`/api${file.url}`} className="flex">
                          <DownloadIcon title='Tải xuống' />
                        </a>
                      </Button>
                      {me?.role === 'ADMIN' && (
                        <Button
                          variant='danger'
                          className="w-full"
                          onClick={() => {
                            setIsOpenDelete(true)
                            setFileId(file.id)
                          }}>
                          <DeleteIcon title='Xóa' />
                        </Button>
                      )}
                    </div>
                  </div>
                )
              }
              return (
                <div key={file.id} className="flex flex-col justify-center gap-2">
                  <div className="h-[180px] flex items-center">
                    <Link href={file.url} target='__blank' className="px-4 py-2 bg-[#2563eb] rounded-xl">Đi tới link {'->'}</Link>
                  </div>
                  <div className="flex justify-center max-w-[180px] flex-1">
                      <span className="break-words w-full">{file.fileName || file.url}</span>
                    </div>
                </div>
              )
            })
          ) : (
            <p>Không có dữ liệu</p>
          )
        )
        }
      </div>
    </div>
  )
}

export default FileCategories