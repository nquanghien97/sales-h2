'use client'

import SearchIcon from '@/assets/icons/SearchIcon'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import React, { useState } from 'react'
import Create from './actions/Create'
import { UserParams } from '@/dto/user'
import { useAuthStore } from '@/zustand/auth.store'

interface HeaderProps {
  setSearchParams: React.Dispatch<React.SetStateAction<UserParams>>
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function Header(props: HeaderProps) {
  const { setSearchParams, setRefreshKey } = props;
  const [inputValue, setInputValue] = useState('');
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const { me } = useAuthStore();

  const onSearch = () => {
    setSearchParams(pre => ({
      ...pre,
      search: inputValue
    }))
    setRefreshKey(pre => !pre)
  }
  return (
    <>
      {me?.role === 'ADMIN' && <Create open={isOpenCreate} onClose={() => setIsOpenCreate(false)} setRefreshKey={setRefreshKey} />}
      <div className="mb-2">
        <div className="mb-2">
          <Button variant='primary' onClick={() => setIsOpenCreate(true)}>Thêm mới</Button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <Input
            placeholder='Tìm kiếm từ khóa'
            icon={<SearchIcon />}
            className="w-1/2"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <Button variant='primary' onClick={onSearch}>Tìm kiếm</Button>
        </div>
      </div>
    </>
  )
}

export default Header