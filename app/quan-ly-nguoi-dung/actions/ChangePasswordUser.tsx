import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input'
import LoadingIcon from '@/components/ui/LoadingIcon';
import Modal from '@/components/ui/Modal'
import { UserEntity } from '@/entities/user';
import { changePassword } from '@/services/user';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface ChangePasswordUserProps {
  open: boolean
  onClose: () => void
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
  user: UserEntity
}

function ChangePasswordUser(props: ChangePasswordUserProps) {
  const { open, onClose, setRefreshKey, user } = props;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<{ username?: string, password?: string, confirmPassword?: string, fullName?: string }>({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
    setPassword('');
    setConfirmPassword('');
    setErrorMessage({});
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newErrors: { password?: string, confirmPassword?: string } = {};
      if (!password.trim()) {
        newErrors.password = 'Vui lòng nhập mật khẩu';
      }
      if (password !== confirmPassword || !confirmPassword.trim()) {
        newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp'
      }
      setErrorMessage(newErrors);
      if (newErrors.password || newErrors.confirmPassword) return;

      await changePassword({ id: user.id, password })
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
      className='w-1/2'
    >
      <h1 className="mb-4 text-2xl font-bold text-center">Đổi mật khẩu người dùng <span className="text-[#2563eb]">{user.fullName}</span></h1>
      <div>
        <form onSubmit={onSubmit}>
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

export default ChangePasswordUser