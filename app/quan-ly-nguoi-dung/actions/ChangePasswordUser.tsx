import { Button } from '@/components/ui/Button';
import LoadingIcon from '@/components/ui/LoadingIcon';
import { UserEntity } from '@/entities/user';
import { changePassword } from '@/services/user';
import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface ChangePasswordUserProps {
  open: boolean
  onClose: () => void
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
  user: UserEntity
}

interface FormValues {
  password: string
  confirmPassword: string
}

function ChangePasswordUser(props: ChangePasswordUserProps) {
  const { open, onClose, setRefreshKey, user } = props;
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleClose = () => {
    onClose();
    form.resetFields();
  }

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {

      await changePassword({ id: user.id, password: data.password })
      toast.success('Đổi mật khẩu thành công');
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
      onCancel={handleClose}
      className='!w-full lg:!w-1/2 min-h-[300px]'
      footer={false}
    >
      <h1 className="my-4 text-2xl font-bold text-center">Đổi mật khẩu người dùng <span className="text-[#2563eb]">{user.fullName}</span></h1>
      <div>
        <Form onFinish={onSubmit} form={form} initialValues={{ password: '', confirmPassword: '' }}>
          <div className="flex items-center h-[40px] mb-6">
            <p className="w-[106px] text-left text-[#2563eb]">Mật khẩu</p>
            <Form.Item
              className="!mb-0 w-full flex-1"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Input.Password className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px] mb-6">
            <p className="w-[106px] text-left text-[#2563eb]">Xác nhận mật khẩu</p>
            <Form.Item
              className="!mb-0 w-full flex-1"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không chính xác'));
                  },
                }),
              ]}
            >
              <Input.Password className="py-2" />
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

export default ChangePasswordUser