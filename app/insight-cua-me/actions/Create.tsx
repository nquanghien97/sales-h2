import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import LoadingIcon from '@/components/ui/LoadingIcon'
import Modal from '@/components/ui/Modal'
import { createHandleRejection } from '@/services/insight-mother'
import { Editor } from '@tinymce/tinymce-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Form } from "antd";

interface CreateUserProps {
  open: boolean
  onClose: () => void
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
  category: string
}

function CreateUser(props: CreateUserProps) {
  const { open, onClose, setRefreshKey } = props;

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('')

  const [form] = Form.useForm();

  const handleClose = () => {
    onClose();
  }

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await createHandleRejection({
        category: data.category,
        content,
      })
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
      <h1 className="mb-4 text-2xl font-bold text-center">Thêm mới nội dung</h1>
      <div>
        <Form form={form} onFinish={onSubmit} initialValues={{ category: "" }}>
          <div className="flex items-center h-[40px] mb-2">
            <p className="w-[106px] text-left text-[#2563eb]">Từ khóa</p>
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
                    'bullist numlist outdent indent | table | forecolor | removeformat | media'
                }}
              />
            </div>
          </div>
          {/* <div className="flex items-center flex-col pb-4 border-b mb-4">
            <div className="flex items-center w-full h-full">
              <p className="w-[106px] text-left text-[#2563eb]">Chính sách bán hàng</p>
              <div className="flex items-center flex-1">
                <Form.Item name="salesPolicy" valuePropName="filelist">
                  <Upload
                    multiple
                    showUploadList
                    beforeUpload={(file) => {
                      setSalesPolicy((prev) => [...prev, file]); // Lưu file vào state
                      return false; // Ngăn không upload ngay lập tức
                    }}
                  >
                    <Button>Chọn hình ảnh</Button>
                  </Upload>
                </Form.Item>
                {salesPolicy.length !== 0 && (
                  <div className="flex flex-wrap justify-center w-full py-4 gap-4">
                    <Image.PreviewGroup
                    >
                      {
                        salesPolicy.map((file, index) => (
                          <Image key={index} className="border-2 m-auto cursor-pointer" width={100} height={100} src={URL.createObjectURL(file)} alt="preview avatar" />
                        ))
                      }
                    </Image.PreviewGroup>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center flex-col pb-4 border-b mb-4">
            <div className="flex items-center w-full h-full">
              <p className="w-[106px] text-left text-[#2563eb]">Sản phẩm</p>
              <div className="flex items-center flex-1">
                <Form.Item name="product" valuePropName="filelist">
                  <Upload
                    multiple
                    showUploadList
                    beforeUpload={(file) => {
                      setProducts((prev) => [...prev, file]); // Lưu file vào state
                      return false; // Ngăn không upload ngay lập tức
                    }}
                  >
                    <Button>Chọn hình ảnh</Button>
                  </Upload>
                </Form.Item>
                {products.length !== 0 && (
                  <div className="flex flex-wrap justify-center w-full py-4 gap-4">
                    <Image.PreviewGroup
                    >
                      {
                        products.map((file, index) => (
                          <Image key={index} className="border-2 m-auto cursor-pointer" width={100} height={100} src={URL.createObjectURL(file)} alt="preview avatar" />
                        ))
                      }
                    </Image.PreviewGroup>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center flex-col pb-4 border-b mb-4">
            <div className="flex items-center w-full h-full">
              <p className="w-[106px] text-left text-[#2563eb]">Giấy tờ sản phẩm</p>
              <div className="flex items-center flex-1">
                <Form.Item name="product_documents" valuePropName="filelist">
                  <Upload
                    multiple
                    showUploadList
                    beforeUpload={(file) => {
                      setProductDocuments((prev) => [...prev, file]); // Lưu file vào state
                      return false; // Ngăn không upload ngay lập tức
                    }}
                  >
                    <Button>Chọn hình ảnh hoặc video</Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>
              {productDocuments.length !== 0 && (
                <div className="flex flex-wrap justify-center w-full py-4 gap-4">
                  {
                    productDocuments.map((file, index) => (
                      <video
                        key={index}
                        controls
                        width={300}
                        height={300}
                      >
                        <source className="border-2 m-auto cursor-pointer" width={100} height={100} src={URL.createObjectURL(file)} />
                      </video>
                    ))
                  }
                </div>
              )}
          </div> */}
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