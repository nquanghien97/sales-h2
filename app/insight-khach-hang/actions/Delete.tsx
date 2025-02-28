import { Button } from '@/components/ui/Button'
import LoadingIcon from '@/components/ui/LoadingIcon'
import Modal from '@/components/ui/Modal'
import { InsightMotherEntity } from '@/entities/insight-mother'
import { deleteInsightMother } from '@/services/insight-mother'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

interface DeleteProps {
  open: boolean
  onClose: () => void
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
  data: InsightMotherEntity
}

function Delete(props: DeleteProps) {
  const { open, onClose, setRefreshKey, data } = props;
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      await deleteInsightMother(data.id);
      toast.success('Xóa data thành công');
      setRefreshKey(pre => !pre);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Modal open={open} onClose={onClose} className="w-1/3">
      <h1 className="text-2xl font-bold mb-4 text-center">Bạn có chắc chắn muốn xóa data này không</h1>
      <div className="flex justify-center gap-4">
        <Button variant='danger' onClick={onClose}>Hủy</Button>
        <Button variant='primary' onClick={onDelete}>
          Xác nhận
          {loading && <LoadingIcon />}
        </Button>
      </div>
    </Modal>
  )
}

export default Delete