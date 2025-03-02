'use client'

import DeleteIcon from '@/assets/icons/DeleteIcon';
import { Button } from '@/components/ui/Button';
import { ButtonIcon } from '@/components/ui/ButtonIcon';
import { useFileCategories } from '@/zustand/file-categories'
import React, { useEffect, useState } from 'react'
import Create from './actions/Create';
import Delete from './actions/Delete';
import { FileCategoriesEntity } from '@/entities/file-categories';
import EditIcon from '@/assets/icons/EditIcon';
import Update from './actions/Update';
import withAuth from '@/hocs/withAuth';
import withPermission from '@/hocs/withPermission';

function FileCategories() {

  const { fileCategories, getFileCategories } = useFileCategories();
  const [data, setData] = useState<FileCategoriesEntity>()
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);

  useEffect(() => {
    (async () => {
      await getFileCategories();
    })()
  }, [getFileCategories, refreshKey])

  if (!fileCategories) {
    return <p>Không có dữ liệu</p>
  }


  const dataGeneral = fileCategories.filter(item => item.category === 'GENERAL')
  const dataMKT = fileCategories.filter(item => item.category === 'MKT')
  const dataSales = fileCategories.filter(item => item.category === 'SALES')
  const dataCSKH = fileCategories.filter(item => item.category === 'CSKH')

  return (
    <div>
      {<Create open={isOpenCreate} onClose={() => setIsOpenCreate(false)} setRefreshKey={setRefreshKey} />}
      {data && <Delete open={isOpenDelete} onClose={() => setIsOpenDelete(false)} setRefreshKey={setRefreshKey} data={data} />}
      {data && <Update open={isOpenUpdate} onClose={() => setIsOpenUpdate(false)} setRefreshKey={setRefreshKey} data={data} />}
      <h1 className="text-center text-4xl font-bold mb-4 py-4">QUẢN LÝ DANH MỤC</h1>
      <div className="mb-4">
        <Button variant='primary' onClick={() => setIsOpenCreate(true)}>Thêm mới</Button>
      </div>
      <div className="w-full flex">
        <div className="w-full border-x border-[#ccc] px-4">
          <p className="font-bold text-2xl mb-2">TƯ LIỆU CHUNG</p>
          <ul className="list-disc pl-8">
            {dataGeneral.map(data => (
              <li key={data.id}>
                <div className="flex items-center gap-2">
                  <span>{data.title}</span>
                  <div className="flex">
                    <ButtonIcon
                      onClick={() => {
                        setData(data);
                        setIsOpenUpdate(true);
                      }}
                    >
                      <EditIcon width={16} height={16} />
                    </ButtonIcon>
                    <ButtonIcon
                      onClick={() => {
                        setData(data);
                        setIsOpenDelete(true);
                      }}
                    >
                      <DeleteIcon width={16} height={16} />
                    </ButtonIcon>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full border-x border-[#ccc] px-4">
          <p className="font-bold text-2xl mb-2">MKT</p>
          <ul className="list-disc pl-8">
            {dataMKT.map(data => (
              <li key={data.id}>
                <div className="flex items-center gap-2">
                  <span>{data.title}</span>
                  <div className="flex">
                    <ButtonIcon
                      onClick={() => {
                        setData(data);
                        setIsOpenUpdate(true);
                      }}
                    >
                      <EditIcon width={16} height={16} />
                    </ButtonIcon>
                    <ButtonIcon
                      onClick={() => {
                        setData(data);
                        setIsOpenDelete(true);
                      }}
                    >
                      <DeleteIcon width={16} height={16} />
                    </ButtonIcon>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full border-x border-[#ccc] px-4">
          <p className="font-bold text-2xl mb-2">SALES</p>
          <ul className="list-disc pl-8">
            {dataSales.map(data => (
              <li key={data.id}>
                <div className="flex items-center gap-2">
                  <span>{data.title}</span>
                  <div className="flex">
                    <ButtonIcon
                      onClick={() => {
                        setData(data);
                        setIsOpenUpdate(true);
                      }}
                    >
                      <EditIcon width={16} height={16} />
                    </ButtonIcon>
                    <ButtonIcon
                      onClick={() => {
                        setData(data);
                        setIsOpenDelete(true);
                      }}
                    >
                      <DeleteIcon width={16} height={16} />
                    </ButtonIcon>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full border-x border-[#ccc] px-4">
          <p className="font-bold text-2xl mb-2">CSKH</p>
          <ul className="list-disc pl-8">
            {dataCSKH.map(data => (
              <li key={data.id}>
                <div className="flex items-center gap-2">
                  <span>{data.title}</span>
                  <div className="flex">
                    <ButtonIcon
                      onClick={() => {
                        setData(data);
                        setIsOpenUpdate(true);
                      }}
                    >
                      <EditIcon width={16} height={16} />
                    </ButtonIcon>
                    <ButtonIcon
                      onClick={() => {
                        setData(data);
                        setIsOpenDelete(true);
                      }}
                    >
                      <DeleteIcon width={16} height={16} />
                    </ButtonIcon>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const FileCategoriesWithAuth = withAuth(FileCategories)
const FileCategoriesWithPermission = withPermission(FileCategoriesWithAuth, ['ADMIN'])

export default FileCategoriesWithPermission