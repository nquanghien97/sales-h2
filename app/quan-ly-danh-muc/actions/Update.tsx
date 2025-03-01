import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input'
import LoadingIcon from '@/components/ui/LoadingIcon';
import Modal from '@/components/ui/Modal'
import { FileCategoriesEntity } from '@/entities/file-categories';
import { updateFileCategory } from '@/services/file-categories';
import { FILE_CATEGORY } from '@prisma/client';
import { Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface UpdateProps {
  open: boolean
  onClose: () => void
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
  data: FileCategoriesEntity
}

interface FormValues {
  title: string
  category: FILE_CATEGORY
}

function Update(props: UpdateProps) {
  const { open, onClose, setRefreshKey, data } = props;

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if(data) {
      form.setFieldsValue({
        title: data.title,
        category: data.category
      })
    }
  }, [data, form])

  const onSubmit = async ({ title, category }: FormValues) => {
    setLoading(true);
    try {
      await updateFileCategory({ id: data.id, data: { title, category} })
      toast.success('Cập nhật thông tin thành công');
      setRefreshKey(pre => !pre);
      onClose();

    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      className='w-1/2'
    >
      <h1 className="mb-4 text-2xl font-bold text-center">Cập nhật nội dung</h1>
      <div>
        <Form form={form} onFinish={onSubmit} initialValues={{ title: data.title }}>
          <div className="flex items-center h-[40px] mb-6">
            <p className="w-[106px] text-left text-[#2563eb]">Tiêu đề</p>
            <Form.Item
              className="!mb-0 w-full flex-1"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Input className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px] mb-6">
            <p className="w-[106px] text-left text-[#2563eb]">Danh mục</p>
            <Form.Item
              className="!mb-0 w-full flex-1"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Select options={[{ label: 'Tư liệu chung', value: 'GENERAL' }, { label: 'MKT', value: 'MKT' }, { label: 'SALES', value: 'SALES' }, { label: 'CSKH', value: 'CSKH' }]} />
            </Form.Item>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant='danger' onClick={onClose}>Hủy</Button>
            <Button variant='primary' type="submit">
              Xác nhận
              {loading && <LoadingIcon />}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default Update