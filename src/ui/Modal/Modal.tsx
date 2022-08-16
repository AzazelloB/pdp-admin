import { ModalProvider } from 'context/ModalContext';
import ModalContent from './ModalContent';
import ModalButton from './ModalButton';
import ModalActions from './ModalActions';

interface ModalComponents {
  Button: typeof ModalButton;
  Content: typeof ModalContent;
  Actions: typeof ModalActions;
}

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> & ModalComponents = ({ children }) => {
  return (
    <ModalProvider>
      {children}
    </ModalProvider>
  );
};

Modal.Button = ModalButton;
Modal.Content = ModalContent;
Modal.Actions = ModalActions;

export default Modal;
