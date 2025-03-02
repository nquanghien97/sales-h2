'use client'

import React, { useEffect, useState } from 'react'
import Header from './header'
import { UserEntity } from '@/entities/user'
import { getUsers } from '@/services/user'
import { UserParams } from '@/dto/user'
import { formatDate } from '@/utils/formatDate'
import Select from '@/components/ui/Select'
import Pagination from '@/components/ui/Pagination'
import LoadingIcon from '@/components/ui/LoadingIcon'
import { ButtonIcon } from '@/components/ui/ButtonIcon'
import EditUserIcon from '@/assets/icons/EditUserIcon'
import DeleteIcon from '@/assets/icons/DeleteIcon'
import ChangePasswordIcon from '@/assets/icons/ChangePasswordIcon'
import ChangePasswordUser from './actions/ChangePasswordUser'
import withAuth from '@/hocs/withAuth'
import DeleteUser from './actions/DeleteUser'
import UpdateUser from './actions/UpdateUser'
import withPermission from '@/hocs/withPermission'

function UsersManagement() {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [searchParams, setSearchParams] = useState<UserParams>({});
  const [refreshKey, setRefreshKey] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserEntity>();
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [isOpenUpdateUser, setIsOpenUpdateUser] = useState(false);

  useEffect(() => {
    document.title = "Quản lý người dùng"
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const res = await getUsers({
          ...searchParams,
          page,
          pageSize
        })
        setUsers(res.users);
        setTotal(res.total);
      } catch (err) {
        console.error('Error fetching users:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [page, pageSize, searchParams, refreshKey])

  const renderBody = () => {
    if (loading) return (
      <tr>
        <td colSpan={5}>
          <LoadingIcon color="#1677ff" className='m-auto my-4' />
        </td>
      </tr>
    )
    if (users.length === 0) return (
      <tr>
        <td colSpan={9} className="!text-center">
          Không có dữ liệu
        </td>
      </tr>
    )
    return (
      users.map((user, index) => (
        <tr key={user.id}>
          <th className="px-4 py-2 text-left font-medium border border-black">{(index + 1) + pageSize * (page - 1)}</th>
          <th className="px-4 py-2 text-left font-medium border border-black">{user.username}</th>
          <th className="px-4 py-2 text-left font-medium border border-black">{user.fullName}</th>
          <th className="px-4 py-2 text-left font-medium border border-black">{user.role}</th>
          <th className="px-4 py-2 text-left font-medium border border-black">{formatDate(user.createdAt)}</th>
          <th className="px-4 py-2 text-left font-medium border border-black">
            <div className="flex gap-2">
              {/* update user */}
              <ButtonIcon
                onClick={() => {
                  setIsOpenUpdateUser(true);
                  setUser(user);
                }}
              >
                <EditUserIcon color='#1677ff' title='Cập nhật thông tin nhân viên' width={20} height={20} />
              </ButtonIcon>
              <ButtonIcon
                onClick={() => {
                  setIsOpenDeleteUser(true);
                  setUser(user);
                }}
              >
                <DeleteIcon color='#1677ff' title='Xóa thông tin nhân viên' width={20} height={20} />
              </ButtonIcon>
              <ButtonIcon
                onClick={() => {
                  setIsOpenChangePassword(true);
                  setUser(user);
                }}
              >
                <ChangePasswordIcon color='#1677ff' title='Đổi mật khẩu nhân viên' width={20} height={20} />
              </ButtonIcon>
            </div>
          </th>
        </tr>
      ))
    )
  }

  return (
    <>
      {user && (<UpdateUser user={user} open={isOpenUpdateUser} onClose={() => setIsOpenUpdateUser(false)} setRefreshKey={setRefreshKey} />)}
      {user && (<ChangePasswordUser user={user} open={isOpenChangePassword} onClose={() => setIsOpenChangePassword(false)} setRefreshKey={setRefreshKey} />)}
      {user && (<DeleteUser user={user} open={isOpenDeleteUser} onClose={() => setIsOpenDeleteUser(false)} setRefreshKey={setRefreshKey} />)}
      <div>
        <h1 className="text-center text-4xl font-bold mb-4 py-4">QUẢN LÝ NGƯỜI DÙNG</h1>
        <div className="bg-[#ec658d] rounded-xl p-4 shadow-xl">
          <Header setSearchParams={setSearchParams} setRefreshKey={setRefreshKey} />
          <table className="w-full border-collapse">
            <thead className="bg-[#f0c568]">
              <tr>
                <th className="px-4 py-2 text-left border border-black">STT</th>
                <th className="px-4 py-2 text-left border border-black">Tài khoản</th>
                <th className="px-4 py-2 text-left border border-black">Tên</th>
                <th className="px-4 py-2 text-left border border-black">Vai trò</th>
                <th className="px-4 py-2 text-left border border-black">Thời gian tạo</th>
                <th className="px-4 py-2 text-left border border-black">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {renderBody()}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center w-full">
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
      </div>
    </>
  )
}

const UsersManagementWithAuth = withAuth(UsersManagement)
const UserManagementWithPermission = withPermission(UsersManagementWithAuth, ['ADMIN'])

export default UserManagementWithPermission