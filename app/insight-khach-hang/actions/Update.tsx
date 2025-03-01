import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input'
import LoadingIcon from '@/components/ui/LoadingIcon';
import Modal from '@/components/ui/Modal'
import { GuidesEntity } from '@/entities/guides';
import { updateGuides } from '@/services/guides';
import { Editor } from '@tinymce/tinymce-react';
import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface UpdateHandleRejectionProps {
  open: boolean
  onClose: () => void
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
  data: GuidesEntity
}

interface FormValues {
  keyword: string
}

function UpdateHandleRejection(props: UpdateHandleRejectionProps) {
  const { open, onClose, setRefreshKey, data } = props;

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const [form] = Form.useForm();

  useEffect(() => {
    if(data) {
      form.setFieldsValue({
        keyword: data.keyword
      })
    }
  }, [data, form])

  const onSubmit = async ({ keyword }: FormValues) => {
    setLoading(true);
    try {
      await updateGuides({ id: data.id, data: { keyword, content} })
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
        <Form form={form} onFinish={onSubmit} initialValues={{ keyword: data.keyword }}>
          <div className="flex items-center h-[40px] mb-6">
            <p className="w-[106px] text-left text-[#2563eb]">Từ khóa</p>
            <Form.Item
              className="!mb-0 w-full flex-1"
              name="keyword"
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
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <p className="w-[106px] text-left text-[#2563eb]">Nội dung</p>
              <Editor
                apiKey="hkoepxco9p2gme5kius6axtlk3n83yberu5a59m56l7dhgn3"
                value={content}
                onEditorChange={(newContent) => setContent(newContent)}
                init={{
                  height: 300,
                  flex: 1,
                  menubar: false,
                  extended_valid_elements: "iframe[src|frameborder|style|scrolling|class|width|height|name|align]",
                  valid_elements: '*[*]',
                  plugins: [
                    'table',
                    'media',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | table | forecolor | removeformat | media',
                    setup: (editor) => {
                      editor.on('init', () => {
                        editor.setContent(data.content)
                      })
                    }
                }}
              />
            </div>
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

export default UpdateHandleRejection