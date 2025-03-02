import { Button } from '@/components/ui/Button';
import LoadingIcon from '@/components/ui/LoadingIcon';
import { UserEntity } from '@/entities/user';
import { updateUser } from '@/services/user';
import { USER_ROLE } from '@prisma/client';
import { Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface UpdateUserProps {
  open: boolean
  onClose: () => void
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
  user: UserEntity
}

interface FormValues {
  fullName: string
  role: USER_ROLE
}

function UpdateUser(props: UpdateUserProps) {
  const { open, onClose, setRefreshKey, user } = props;
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const handleClose = () => {
    onClose();
  }

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {

      await updateUser({ id: user.id, fullName: data.fullName, role: data.role });
      toast.success('Cập nhật thông tin thành công');
      setRefreshKey(pre => !pre);
      handleClose();

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
      onClose={handleClose}
      className='!w-1/2'
      footer={false}
    >
      <h1 className="mb-4 text-2xl font-bold text-center">Cập nhật người dùng <span className="text-[#2563eb]">{user.fullName}</span></h1>
      <div>
        <Form form={form} onFinish={onSubmit} initialValues={{ fullName: user.fullName, role: user.role }}>
          <div className="flex items-center h-[40px] mb-6">
            <p className="w-[106px] text-left text-[#2563eb]">Họ tên</p>
            <Form.Item
              className="!mb-0 w-full flex-1"
              name="fullName"
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
            <p className="w-[106px] text-left text-[#2563eb]">Vai trò</p>
            <Form.Item
              className="!mb-0 w-full flex-1"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Select options={[{ label: 'MKT', value: 'MKT' }, { label: 'SALES', value: 'SALES' }, { label: 'CSKH', value: 'CSKH' }]} />
            </Form.Item>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant='danger' onClick={handleClose}>Hủy</Button>
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

export default UpdateUser