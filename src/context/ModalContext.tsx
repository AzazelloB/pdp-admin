import { useState } from 'react';

import { createContext } from 'utils/createContext';

function useModalState() {
  const [isOpen, setOpen] = useState(false);

  return { isOpen, setOpen };
}

const [ModalProvider, useModalContext] = createContext(useModalState);

export { ModalProvider, useModalContext };
