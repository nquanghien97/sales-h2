'use client'

import { loginUser } from '@/services/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Input } from '@/components/ui/Input';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from '@/components/ui/Button';
import LoadingIcon from '@/components/ui/LoadingIcon';
import { useAuthStore } from '@/zustand/auth.store';

function Login() {

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const { getMe } = useAuthStore();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newErrors: { username?: string; password?: string } = {};
      if (!username.trim()) {
        newErrors.username = 'Vui lòng nhập tài khoản';
      }
      if (!password.trim()) {
        newErrors.password = 'Vui lòng nhập mật khẩu';
      }
      setErrors(newErrors);
      if (newErrors.password || newErrors.username) return;

      const res = await loginUser({ username, password });
      Cookies.set('token', res.accessToken);
      await getMe()
      router.push('/');
      toast.success('Đăng nhập thành công')
    } catch (err) {
      console.log(err)
      toast.error('Đăng nhập thất bại. Vui lòng thử lại')
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-[#ccc]">
        <div className="flex flex-col bg-white p-8 rounded-xl w-1/2">
          <h1 className="text-center text-2xl mb-4">Đăng nhập</h1>
          <form className="flex flex-col w-full" onSubmit={onSubmit}>
            <div className="mb-4 w-full">
              <Input label="Tài khoản" type="text" value={username} onChange={e => setUsername(e.target.value)} />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div className="mb-4 w-full">
              <Input label="Mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="flex justify-center">
              <Button variant='primary' type='submit'>
                Đăng nhập
                {loading && <LoadingIcon />}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login