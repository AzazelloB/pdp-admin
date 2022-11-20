import { DialogActions } from '@mui/material';
import { useModalContext } from 'context/ModalContext';

interface RenderProps {
  handleClose: () => void;
}

interface ModalActionsProps extends Omit<React.ComponentProps<typeof DialogActions>, 'children'> {
  children: React.ReactNode | ((props: RenderProps) => React.ReactNode);
}

const ModalActions: React.FC<ModalActionsProps> = ({ children, ...props }) => {
  const { setOpen } = useModalContext();

  const handleClose = () => {
    setOpen(false);
  };

  const renderProps: RenderProps = {
    handleClose,
  };

  return (
    <DialogActions {...props}>
      {typeof children === 'function' ? children(renderProps) : children}
    </DialogActions>
  );
};

export default ModalActions;
