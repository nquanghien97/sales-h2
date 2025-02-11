import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import LoadingIcon from '@/components/ui/LoadingIcon'
import Modal from '@/components/ui/Modal'
import { createUser } from '@/services/user'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

interface CreateUserProps {
  open: boolean
  onClose: () => void
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateUser(props: CreateUserProps) {
  const { open, onClose, setRefreshKey } = props;

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<{ username?: string, password?: string, confirmPassword?: string, fullName?: string }>({
    username: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
    setUsername('');
    setFullName('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage({});
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // validate form
      const newErrors: { username?: string; password?: string, fullName?: string, confirmPassword?: string } = {};
      if (!username.trim()) {
        newErrors.username = 'Vui lòng nhập tài khoản';
      }
      if (!fullName.trim()) {
        newErrors.fullName = 'Vui lòng nhập tên';
      }
      if (!password.trim()) {
        newErrors.password = 'Vui lòng nhập mật khẩu';
      }
      if (password !== confirmPassword || !confirmPassword.trim()) {
        newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp'
      }
      setErrorMessage(newErrors);
      if (newErrors.password || newErrors.username || newErrors.fullName || newErrors.confirmPassword) return;

      // handle create user
      await createUser({
        username,
        password,
        fullName,
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
      <h1 className="mb-4 text-2xl font-bold text-center">Thêm mới người dùng</h1>
      <div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Input
              label="Họ tên"
              minWidthLabel='200px'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errorMessage.fullName && <p className="text-red-500">{errorMessage.fullName}</p>}
          </div>
          <div className="mb-4">
            <Input
              label="Tên đăng nhập"
              minWidthLabel='200px'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errorMessage.username && <p className="text-red-500">{errorMessage.username}</p>}
          </div>
          <div className="mb-4">
            <Input
              label="Mật khẩu" type="password"
              minWidthLabel='200px'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage.password && <p className="text-red-500">{errorMessage.password}</p>}
          </div>
          <div className="mb-4">
            <Input
              label="Xác nhận mật khẩu" type="password"
              minWidthLabel='200px'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorMessage.confirmPassword && <p className="text-red-500">{errorMessage.confirmPassword}</p>}
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