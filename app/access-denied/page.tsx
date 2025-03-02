import { Button } from '@/components/ui/Button'
import Link from 'next/link'

function AccessDenined() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-[red] text-4xl mb-4">Bạn không có quyền truy cập trang này!</h1>
      <Button variant='primary'>
        <Link href="/">{'<-'} Trở về trang chủ</Link>
      </Button>
    </div>
  )
}

export default AccessDenined