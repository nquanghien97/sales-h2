import { Button } from '@/components/ui/Button';
import LoadingIcon from '@/components/ui/LoadingIcon';
import Modal from '@/components/ui/Modal';
import { createFiles } from '@/services/files';
import { Form, Upload, Image, UploadFile } from 'antd';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

interface CreateFilesProps {
  open: boolean
  onClose: () => void
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateFiles(props: CreateFilesProps) {
  const { open, onClose, setRefreshKey } = props;
  const [productDocuments, setProductDocuments] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleClose = () => {
    onClose();
    setProductDocuments([])
  }

  const onSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      productDocuments.forEach((file) => {
        formData.append("productDocuments", file as unknown as File); // Không có [] trong key
      });

      await createFiles({
        category: 'productDocuments',
        data: formData
      })
      toast.success('Tạo tư liệu thành công')
      setRefreshKey(pre => !pre)
      handleClose();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        toast.error(err.message)
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} className="w-1/2">
      <h1 className="mb-4 text-2xl font-bold text-center">Thêm mới nội dung</h1>
      <div>
        <Form form={form} onFinish={onSubmit}>
          <div className="flex items-center flex-col py-4 border-b mb-4">
            <div className="flex items-center w-full h-full">
              <p className="w-[150px] text-left text-[#2563eb]">Chính sách bán hàng</p>
              <div className="flex items-center flex-1">
                <Form.Item name="productDocuments" className="!m-0">
                  <Upload
                    multiple
                    showUploadList
                    fileList={productDocuments}
                    beforeUpload={(file) => {
                      setProductDocuments((prev) => [...prev, file]); // Lưu file vào state
                      return false; // Ngăn không upload ngay lập tức
                    }}
                    onRemove={(file) => {
                      setProductDocuments((prev) => prev.filter((item) => item.uid !== file.uid))
                    }}
                  >
                    <Button>Chọn hình ảnh hoặc</Button>
                  </Upload>
                </Form.Item>
                {productDocuments.length !== 0 && (
                  <div className="flex flex-wrap justify-center w-full py-4 gap-4">
                    {
                      productDocuments.map((file, index) => {
                        if (file.type?.startsWith('image/')) {
                          return (
                            <Image.PreviewGroup key={index}>
                              <Image className="border-2 m-auto cursor-pointer" width={300} height={300} src={URL.createObjectURL(file as unknown as File)} alt="preview avatar" />
                            </Image.PreviewGroup>
                          )
                        }
                        if (file.type?.startsWith('video/')) {
                          return (
                            <video
                              key={index}
                              controls
                              width={300}
                              height={300}
                              className='h-[180px]'
                            >
                              <source className="border-2 m-auto cursor-pointer" width={100} height={100} src={URL.createObjectURL(file as unknown as File)} />
                            </video>
                          )
                        }
                      })
                    }
                  </div>
                )}
              </div>
            </div>
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

export default CreateFiles