'use client';

import { useEffect, useState } from 'react';

import { CreateServerModal } from '../modals/create-server-modal';

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
    </>
  );
}

export { ModalProvider };
