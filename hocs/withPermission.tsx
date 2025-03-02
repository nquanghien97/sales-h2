'use client';

import React, { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/navigation'
import { USER_ROLE } from '@prisma/client';
import { useAuthStore } from '@/zustand/auth.store';

function withPermission<P extends object>(
  WrappedComponent: ComponentType<P>,
  roles: USER_ROLE[]
): ComponentType<P> {
  const WithPermission: React.FC<P> = (props) => {
    const router = useRouter();
    const { me } = useAuthStore()
    useEffect(() => {
      const checkPermission = async () => {
        if (!me) {
          router.push('/login');
          return;  // Stop checking if user is not logged in.
        }
        const currentRole = me.role
        const hasPermission = roles.includes(currentRole)
        if (!hasPermission) {
          router.push('/access-denied');
        }
      };

      checkPermission();
    }, [me, router]);

    return <WrappedComponent {...props} />
  };

  WithPermission.displayName = `WithPermission(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithPermission;
}

export default withPermission;