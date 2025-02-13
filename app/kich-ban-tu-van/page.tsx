'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import React, { JSX, useEffect, useState } from 'react'
import { data_height, data_weight } from '@/constants/data'
import { data_config, Gender } from './data_config'
import withAuth from '@/hocs/withAuth'

function Content() {
  const [currentHeight, setCurrentHeight] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [gender, setGender] = useState<Gender>();
  const [currentAge, setCurrentAge] = useState('');
  const [dataResponse, setDataResponse] = useState<{ title?: string, content?: JSX.Element }>();
  const [errorMessage, setErrorMessage] = useState<{ currentHeight?: string, currentWeight?: string, gender?: string, currentAge?: string }>({
    currentHeight: '',
    currentWeight: '',
    gender: '',
    currentAge: '',
  });

  useEffect(() => {
    document.title = "Kịch bản tư vấn"
  }, []);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!currentHeight) {
      errors.currentHeight = 'Chiều cao không được để trống';
    } else if (isNaN(Number(currentHeight)) || Number(currentHeight) <= 0) {
      errors.currentHeight = 'Chiều cao phải là số dương';
    }

    if (!currentWeight) {
      errors.currentWeight = 'Cân nặng không được để trống';
    } else if (isNaN(Number(currentWeight)) || Number(currentWeight) <= 0) {
      errors.currentWeight = 'Cân nặng phải là số dương';
    }

    if (!gender) {
      errors.gender = 'Bạn phải chọn giới tính';
    }

    if (!currentAge) {
      errors.currentAge = 'Số tuổi không được để trống';
    } else if (isNaN(Number(currentAge)) || Number(currentAge) <= 0) {
      errors.currentAge = 'Số tuổi phải là số dương';
    }

    setErrorMessage(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const weightBelowStandard = data_weight[gender!].can_nang_duoi_TB[+currentAge]
    const weightAboveStandard = data_weight[gender!].can_nang_tren_TB[+currentAge]

    const heightBelowStandard = data_height[gender!].chieu_cao_duoi_TB[+currentAge]
    const heightAboveStandard = data_height[gender!].chieu_cao_tren_TB[+currentAge]

    const matchedCondition = data_config({
      weightAboveStandard,
      weightBelowStandard,
      heightAboveStandard,
      heightBelowStandard
    }).find(condition => condition.condition({
      currentHeight: +currentHeight,
      currentAge: +currentAge,
      currentWeight: +currentWeight,
      gender: gender!
    }))
    setDataResponse({
      title: matchedCondition?.title,
      content: matchedCondition?.content
    })
  }

  return (
    <>
      <div className="bg-white py-2 px-4 rounded-xl mb-4">
        <h2 className="mb-4 text-xl">Nhập thông tin khách hàng</h2>
        <div className="flex gap-2">
          <div className="flex flex-col w-1/5 justify-start">
            <Input label='Chiều cao (cm)' onChange={(e) => setCurrentHeight(e.target.value)} />
            <p className="text-[red] text-sm">{errorMessage?.currentHeight}</p>
          </div>
          <div className="flex flex-col w-1/5 justify-start">
            <Input label='Cân nặng (kg)' onChange={(e) => setCurrentWeight(e.target.value)} />
            <p className="text-[red] text-sm">{errorMessage?.currentWeight}</p>
          </div>
          <div className="flex flex-col w-1/5 justify-start">
            <Select options={[{ label: 'Nam', value: 'BOY' }, { label: 'Nữ', value: 'GIRL' }]} label='Giới tính' placeholder='Giới tính' onChange={(e) => setGender(e as Gender)} />
            <p className="text-[red] text-sm">{errorMessage?.gender}</p>
          </div>
          <div className="flex flex-col w-1/5 justify-start">
            <Input label='Số tuổi' onChange={(e) => setCurrentAge(e.target.value)} />
            <p className="text-[red] text-sm">{errorMessage?.currentAge}</p>
          </div>
          <Button variant='primary' onClick={handleSubmit}>Tìm kiếm</Button>
        </div>
      </div>
      {dataResponse && (
        <div className="bg-white p-4 rounded-xl">
          <h2 className="text-2xl mb-2 font-semibold">{dataResponse.title}</h2>
          <div className="">
            {dataResponse.content}
          </div>
        </div>
      )}
    </>
  )
}

const ContentWithAuth = withAuth(Content)

export default ContentWithAuth