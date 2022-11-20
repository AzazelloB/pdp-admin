import { Dialog, DialogContent } from '@mui/material';
import { useModalContext } from 'context/ModalContext';

type ModalContentProps = Omit<React.ComponentProps<typeof Dialog>, 'open'>;

const ModalContent: React.FC<ModalContentProps> = ({ children, ...props }) => {
  const { isOpen, setOpen } = useModalContext();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      {...props}
    >
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalContent;
