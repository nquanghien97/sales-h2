import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import LoadingIcon from '@/components/ui/LoadingIcon'
import Modal from '@/components/ui/Modal'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Form, Select } from "antd";
import { createFileCategory } from '@/services/file-categories'
import { FILE_CATEGORY } from '@prisma/client'

interface CreateProps {
  open: boolean
  onClose: () => void
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
  title: string
  category: FILE_CATEGORY
}

function Create(props: CreateProps) {
  const { open, onClose, setRefreshKey } = props;

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleClose = () => {
    onClose();
    form.setFieldsValue({
      title: '',
      category: null
    })
  }

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      
      await createFileCategory({
        title: data.title,
        category: data.category
      })
      toast.success('Tạo danh mục thành công')
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
      onClose={() => { }}
      className='w-1/2'
    >
      <h1 className="mb-4 text-2xl font-bold text-center">Thêm mới tiêu đề</h1>
      <div>
        <Form form={form} onFinish={onSubmit} initialValues={{ title: '' }}>
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

export default Create