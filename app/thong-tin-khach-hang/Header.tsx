'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import { vi } from 'date-fns/locale';
import { ageCalculator } from '@/utils/ageCalculator'
import { formatDate } from '@/utils/formatDate'
import { data_weight } from '@/constants/data'

function Header() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState<'BOY' | 'GIRL'>();
  const [date, setDate] = useState<Date | null>(new Date());

  const handleSubmit = () => {
    if (!date || !height || !weight || !gender) return;
    // e.preventDefault();
    
    const currentAge = ageCalculator(formatDate(date)).years;
    const weightBelowStandard = data_weight[gender].can_nang_duoi_TB[currentAge]
    console.log(weightBelowStandard)
  }


  return (
    <div className="bg-white py-2 px-4 rounded-xl mb-4">
      <h2 className="mb-4 text-xl">Nhập thông tin khách hàng</h2>
      <div className="flex gap-2">
        <Input className="w-1/5" label='Chiều cao (cm)' onChange={(e) => setHeight(e.target.value)} />
        <Input className="w-1/5" label='Cân nặng (kg)' onChange={(e) => setWeight(e.target.value)} />
        <div className='w-1/5'>
          <Select options={[{ label: 'Nam', value: 'BOY' }, { label: 'Nữ', value: 'GIRL' }]} label='Giới tính' placeholder='Giới tính' onChange={(e) => setGender(e)} />
        </div>
        <div className='w-1/5 flex items-center'>
          <label className="bg-white px-1 text-blue-600 whitespace-nowrap">Ngày sinh</label>
          <DatePicker
            locale={vi}
            className="w-full rounded-xl px-4 py-2 outline-none border placeholder-[#002A9E] placeholder:italic placeholder:font-semibold"
            selected={date}
            onChange={(date: Date | null) => setDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <Button variant='primary' onClick={handleSubmit}>Tìm kiếm</Button>
      </div>
    </div>
  )
}

export default Header