import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import LoadingIcon from '@/components/ui/LoadingIcon'
import Modal from '@/components/ui/Modal'
import { createHandleRejection } from '@/services/handle-rejection'
import { Editor } from '@tinymce/tinymce-react'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

interface CreateUserProps {
  open: boolean
  onClose: () => void
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateUser(props: CreateUserProps) {
  const { open, onClose, setRefreshKey } = props;

  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState<{ category?: string, content?: string }>({
    category: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
    setCategory('');
    setContent('');
    setErrorMessage({});
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // validate form
      const newErrors: { category?: string; content?: string } = {};
      if (!category.trim()) {
        newErrors.category = 'Trường này không được để trống';
      }
      if (!content.trim()) {
        newErrors.content = 'Trường này không được để trống';
      }
      setErrorMessage(newErrors);
      if (newErrors.category || newErrors.content) return;

      // handle create user
      await createHandleRejection({
        category,
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
      onClose={onClose}
      className='w-1/2'
    >
      <h1 className="mb-4 text-2xl font-bold text-center">Thêm mới nội dung</h1>
      <div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Input
              className="mb-2"
              label="Từ khóa"
              minWidthLabel='90px'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            {errorMessage.category && <p className="text-red-500 text-sm">{errorMessage.category}</p>}
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
                    'bullist numlist outdent indent | table | forecolor | removeformat | media'
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

export default CreateUser