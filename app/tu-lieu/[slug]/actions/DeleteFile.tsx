import { Button } from '@/components/ui/Button';
import LoadingIcon from '@/components/ui/LoadingIcon';
import Modal from '@/components/ui/Modal';
import { deleteFile } from '@/services/files';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

interface DeleteFileProps {
  open: boolean;
  onClose: () => void;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
  id: number
}

function DeleteFile(props: DeleteFileProps) {
  const { open, onClose, setRefreshKey, id } = props;
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      await deleteFile({ id })
      toast.success('Xóa tư liệu thành công')
      setRefreshKey(pre => !pre)
      onClose();
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
      <h1 className="mb-4 text-2xl font-bold text-center">Bạn có chắc chắn xóa tư liệu này không?</h1>
      <div>
        <div className="flex justify-center gap-4">
          <Button variant='danger' onClick={onClose}>Hủy</Button>
          <Button variant='primary' onClick={onDelete}>
            Xác nhận
            {loading && <LoadingIcon />}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteFile