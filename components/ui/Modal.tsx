import {
  useCallback, useRef, useEffect, PropsWithChildren, RefObject,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  className?: string;
  ref?: RefObject<HTMLDivElement>
}

export default function Modal(props: ModalProps) {
  const {
    children,
    open,
    onClose,
    className,
    ref,
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback((event: MouseEvent) => {
    if (
      wrapperRef
      && wrapperRef.current
      && !wrapperRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('click', closeModal, { capture: true });

    return () => {
      document.removeEventListener('click', closeModal, { capture: true });
    };
  }, [closeModal]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  

  return open ? createPortal(
    <div className="fixed inset-0 z-[999]" ref={ref}>
      <div className="fixed inset-0 z-[-1] bg-[#0b0b0b80]" />
      <div className="opacity-100 flex justify-center h-screen">
        <div ref={wrapperRef} className={`relative m-auto max-h-[90vh] overflow-auto rounded-xl bg-white p-4 ${className && className}`}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  ) : null;
}