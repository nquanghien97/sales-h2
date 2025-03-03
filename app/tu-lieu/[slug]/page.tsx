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
import withAuth from '@/hocs/withAuth';
import { useFileCategories } from '@/zustand/file-categories';

function FileCategories() {
  const [files, setFiles] = useState<FilesEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpenCreateFiles, setIsOpenCreateFiles] = useState(false);
  const [isOpenDeleteFiles, setIsOpenDelete] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);
  const [fileId, setFileId] = useState<number>();

  const { fileCategories } = useFileCategories();

  const params: { slug: string } = useParams();
  const currentCategory = fileCategories?.find(item => item.slug === params.slug);

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
      <h1 className="text-center text-4xl font-bold mb-4 py-4">{currentCategory?.title}</h1>
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
                  <div key={index} className="flex flex-col gap-2 border-2 border-[#ccc] rounded-xl p-2">
                    <Image.PreviewGroup>
                      <Image className="border-2 m-auto cursor-pointer" width={300} height={300} src={`/api${file.url}`} alt="preview avatar" />
                    </Image.PreviewGroup>
                    <div className="flex justify-center max-w-[300px] flex-1">
                      <span className="break-words w-full">{file.fileName}</span>
                    </div>
                    <div className="flex w-full gap-2">
                      <a download href={`/api${file.url}`} className="flex w-full">
                        <Button variant='primary' className="w-full">
                          <DownloadIcon title='Tải xuống' />
                        </Button>
                      </a>
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
                  <div key={index} className="flex flex-col gap-2 border-2 border-[#ccc] rounded-xl p-2">
                    <video
                      controls
                      width={300}
                      height={300}
                      className='h-[300px] w-full'
                    >
                      <source className="border-2 m-auto cursor-pointer" width={100} height={100} src={`/api${file.url}`} />
                    </video>
                    <div className="flex justify-center flex-1 max-w-[300px]">
                      <span className="break-words w-full">{file.fileName}</span>
                    </div>
                    <div className="flex w-full gap-2">
                      <a download href={`/api${file.url}`} className="flex w-full">
                        <Button variant='primary' className="w-full">
                          <DownloadIcon title='Tải xuống' />
                        </Button>
                      </a>
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
                  <div key={index} className="flex flex-col gap-2 border-2 border-[#ccc] rounded-xl p-2">
                    <Image src="/pdf-image.png" alt="pdf-image" width={300} height={300} />
                    <div className="flex justify-center flex-1 max-w-[300px]">
                      <span className="w-[300px] break-words">{file.fileName}</span>
                    </div>
                    <div className="flex w-full gap-2">
                      <a download href={`/api${file.url}`} className="flex w-full">
                        <Button variant='primary' className="w-full">
                          <DownloadIcon title='Tải xuống' />
                        </Button>
                      </a>
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
                  <div key={index} className="flex flex-col gap-2 border-2 border-[#ccc] rounded-xl p-2">
                    <Image src="/audio.jpg" alt="audio" width={300} height={300} />
                    <div className="flex justify-center flex-1 max-w-[300px]">
                      <span className="w-[300px] break-words">{file.fileName}</span>
                    </div>
                    <div className="flex w-full gap-2">
                      <a download href={`/api${file.url}`} className="flex w-full">
                        <Button variant='primary' className="w-full">
                          <DownloadIcon title='Tải xuống' />
                        </Button>
                      </a>
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
                <div key={index} className="flex flex-col gap-2 border-2 border-[#ccc] rounded-xl p-2">
                  <Image src="/link.png" alt="link" width={300} height={300} />
                  <div className="flex justify-center flex-1 max-w-[300px]">
                    <span className="w-[300px] break-words">{file.fileName}</span>
                  </div>
                  <div className="flex w-full gap-2">
                    {
                      file.url.startsWith('http') ? (
                        <Link href={file.url} target='__blank' className="w-full">
                          <Button variant='primary' className="w-full">
                            Đi tới link {'->'}
                          </Button>
                        </Link>
                      ) : (
                        <a download href={`/api${file.url}`} className="flex w-full">
                          <Button variant='primary' className="w-full">
                            <DownloadIcon title='Tải xuống' />
                          </Button>
                        </a>
                      )
                    }
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

const FileCategoriesWithAuth = withAuth(FileCategories)

export default FileCategoriesWithAuth