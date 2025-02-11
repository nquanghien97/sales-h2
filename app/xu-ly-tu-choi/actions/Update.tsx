import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input'
import LoadingIcon from '@/components/ui/LoadingIcon';
import Modal from '@/components/ui/Modal'
import { HandleRejectionEntity } from '@/entities/handle-rejection';
import { updateHandleRejection } from '@/services/handle-rejection';
import { Editor } from '@tinymce/tinymce-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface UpdateHandleRejectionProps {
  open: boolean
  onClose: () => void
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
  data: HandleRejectionEntity
}

function UpdateHandleRejection(props: UpdateHandleRejectionProps) {
  const { open, onClose, setRefreshKey, data } = props;
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState<{ category?: string, content?: string }>({
    category: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
    setContent('');
    setCategory('')
    setErrorMessage({});
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newErrors: { category?: string, content?: string } = {};
      if (!category.trim()) {
        newErrors.category = 'Trường này không được để trống';
      }
      if (!content.trim()) {
        newErrors.content = 'Trường này không được để trống';
      }
      setErrorMessage(newErrors);
      if (newErrors.category || newErrors.content) return;

      await updateHandleRejection({ id: data.id, content, category })
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
      className='w-1/2'
    >
      <h1 className="mb-4 text-2xl font-bold text-center">Cập nhật nội dung</h1>
      <div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Input
              label="Từ khóa"
              minWidthLabel='90px'
              defaultValue={data.category}
              onChange={(e) => setCategory(e.target.value)}
            />
            {errorMessage.category && <p className="text-red-500">{errorMessage.category}</p>}
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
                  width: 1000,
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
                      editor.setContent(data?.content)
                    })
                  }
                }}
              />
            </div>
            {errorMessage.category && <p className="text-red-500 text-sm">{errorMessage.category}</p>}
          </div>
          <div className="flex justify-center gap-4">
            <Button variant='danger' onClick={onClose}>Hủy</Button>
            <Button variant='primary' type="submit">
              Xác nhận
              {loading && <LoadingIcon />}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default UpdateHandleRejection