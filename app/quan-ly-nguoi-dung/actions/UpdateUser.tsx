import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input'
import LoadingIcon from '@/components/ui/LoadingIcon';
import Modal from '@/components/ui/Modal'
import { UserEntity } from '@/entities/user';
import { updateUser } from '@/services/user';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface UpdateUserProps {
  open: boolean
  onClose: () => void
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
  user: UserEntity
}

function UpdateUser(props: UpdateUserProps) {
  const { open, onClose, setRefreshKey, user } = props;
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState<{ fullName?: string }>({
    fullName: '',
  });
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
    setFullName('');
    setErrorMessage({});
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newErrors: { fullName?: string } = {};
      if (!fullName.trim()) {
        newErrors.fullName = 'Trường này không được để trống';
      }
      setErrorMessage(newErrors);
      if (newErrors.fullName) return;

      await updateUser({ id: user.id, fullName })
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
      <h1 className="mb-4 text-2xl font-bold text-center">Cập nhật người dùng <span className="text-[#2563eb]">{user.fullName}</span></h1>
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

export default UpdateUser