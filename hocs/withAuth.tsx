'use client';

import React, { useEffect, ComponentType } from 'react';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { verifyToken } from '@/lib/token';

function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
): ComponentType<P> {
  const WithAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const token = Cookies.get('token');
    useEffect(() => {
      const checkAuth = async () => {
        const dataParse = await verifyToken(token)
        const user_id = dataParse?.user_id || null
        if (!user_id) {
          router.push('/login');
        }
      };

      checkAuth();
    }, [token, router]);

    return <WrappedComponent {...props} />
  };

  WithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
}

export default withAuth;