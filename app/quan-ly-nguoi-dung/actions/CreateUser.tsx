import { Button } from '@/components/ui/Button'
import LoadingIcon from '@/components/ui/LoadingIcon'
import { createUser } from '@/services/user'
import { USER_ROLE } from '@prisma/client'
import { Form, Input, Modal, Select } from 'antd'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface CreateUserProps {
  open: boolean
  onClose: () => void
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
  username: string
  fullName: string
  role: USER_ROLE
  password: string
  confirmPassword: string
}

function CreateUser(props: CreateUserProps) {
  const { open, onClose, setRefreshKey } = props;

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleClose = () => {
    onClose();
    form.resetFields();
  }

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      // handle create user
      await createUser({
        username: data.username,
        password: data.password,
        fullName: data.fullName,
        role: data.role,
      })
      toast.success('Tạo mới người dùng thành công')
      setRefreshKey(pre => !pre);
      handleClose();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        toast.error(e.message)
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className='!w-1/2'
      footer={false}
    >
      <h1 className="mb-4 text-2xl font-bold text-center">Thêm mới người dùng</h1>
      <div>
        <Form form={form} onFinish={onSubmit} initialValues={{ fullName: '', username: '', role: undefined, password: '', confirmPassword: '' }}>
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
            <p className="w-[106px] text-left text-[#2563eb]">Tên đăng nhập</p>
            <Form.Item
              className="!mb-0 w-full flex-1"
              name="username"
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

export default CreateUser