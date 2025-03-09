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
import { SortableList } from './actions/SortableList';

function FileCategories() {

  const { fileCategories, getFileCategories } = useFileCategories();

  const [itemsGeneral, setItemsGeneral] = useState<FileCategoriesEntity[]>([]);
  const [itemsSales, setItemsSales] = useState<FileCategoriesEntity[]>([]);
  const [itemsMKT, setItemsMKT] = useState<FileCategoriesEntity[]>([]);
  const [itemsCSKH, setItemsCSKH] = useState<FileCategoriesEntity[]>([]);

  const [data, setData] = useState<FileCategoriesEntity>();

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);

  useEffect(() => {
    setItemsGeneral(fileCategories?.filter(item => item.category === 'GENERAL') || []);
    setItemsSales(fileCategories?.filter(item => item.category === 'SALES') || []);
    setItemsMKT(fileCategories?.filter(item => item.category === 'MKT') || []);
    setItemsCSKH(fileCategories?.filter(item => item.category === 'CSKH') || []);
  }, [fileCategories]);

  useEffect(() => {
    (async () => {
      await getFileCategories();
    })()
  }, [getFileCategories, refreshKey])

  if (!fileCategories || !itemsGeneral) {
    return <p>Không có dữ liệu</p>
  }

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
          <div>
            <SortableList
              items={itemsGeneral}
              onChange={setItemsGeneral}
              renderItem={(item) => {
                return (
                  <SortableList.Item id={item.id}>
                    {item.title}
                    <div className="flex justify-end flex-1">
                      <ButtonIcon
                        onClick={() => {
                          setData(item);
                          setIsOpenUpdate(true);
                        }}
                      >
                        <EditIcon width={16} height={16} />
                      </ButtonIcon>
                      <ButtonIcon
                        onClick={() => {
                          setData(item);
                          setIsOpenDelete(true);
                        }}
                      >
                        <DeleteIcon width={16} height={16} />
                      </ButtonIcon>
                      <SortableList.DragHandle />
                    </div>
                  </SortableList.Item>
                );
              }}
            />
          </div>
        </div>
        <div className="w-full border-x border-[#ccc] px-4">
          <p className="font-bold text-2xl mb-2">MKT</p>
          <div>
            <SortableList
              items={itemsMKT}
              onChange={setItemsMKT}
              renderItem={(item) => {
                return (
                  <SortableList.Item id={item.id}>
                    {item.title}
                    <div className="flex justify-end flex-1">
                      <ButtonIcon
                        onClick={() => {
                          setData(item);
                          setIsOpenUpdate(true);
                        }}
                      >
                        <EditIcon width={16} height={16} />
                      </ButtonIcon>
                      <ButtonIcon
                        onClick={() => {
                          setData(item);
                          setIsOpenDelete(true);
                        }}
                      >
                        <DeleteIcon width={16} height={16} />
                      </ButtonIcon>
                      <SortableList.DragHandle />
                    </div>
                  </SortableList.Item>
                );
              }}
            />
          </div>
        </div>
        <div className="w-full border-x border-[#ccc] px-4">
          <p className="font-bold text-2xl mb-2">SALES</p>
          <div>
            <SortableList
              items={itemsSales}
              onChange={setItemsSales}
              renderItem={(item) => {
                return (
                  <SortableList.Item id={item.id}>
                    {item.title}
                    <div className="flex justify-end flex-1">
                      <ButtonIcon
                        onClick={() => {
                          setData(item);
                          setIsOpenUpdate(true);
                        }}
                      >
                        <EditIcon width={16} height={16} />
                      </ButtonIcon>
                      <ButtonIcon
                        onClick={() => {
                          setData(item);
                          setIsOpenDelete(true);
                        }}
                      >
                        <DeleteIcon width={16} height={16} />
                      </ButtonIcon>
                      <SortableList.DragHandle />
                    </div>
                  </SortableList.Item>
                );
              }}
            />
          </div>
        </div>
        <div className="w-full border-x border-[#ccc] px-4">
          <p className="font-bold text-2xl mb-2">CSKH</p>
          <div>
            <SortableList
              items={itemsCSKH}
              onChange={setItemsCSKH}
              renderItem={(item) => {
                return (
                  <SortableList.Item id={item.id}>
                    {item.title}
                    <div className="flex justify-end flex-1">
                      <ButtonIcon
                        onClick={() => {
                          setData(item);
                          setIsOpenUpdate(true);
                        }}
                      >
                        <EditIcon width={16} height={16} />
                      </ButtonIcon>
                      <ButtonIcon
                        onClick={() => {
                          setData(item);
                          setIsOpenDelete(true);
                        }}
                      >
                        <DeleteIcon width={16} height={16} />
                      </ButtonIcon>
                      <SortableList.DragHandle />
                    </div>
                  </SortableList.Item>
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const FileCategoriesWithAuth = withAuth(FileCategories)
const FileCategoriesWithPermission = withPermission(FileCategoriesWithAuth, ['ADMIN'])

export default FileCategoriesWithPermission