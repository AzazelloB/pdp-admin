import { useModalContext } from 'context/ModalContext';
import { AsProp } from 'utils/asPropType';

const ModalButton = <T extends React.ElementType = 'button'>({
  as,
  onClick,
  ...props
}: AsProp<T>) => {
  const { setOpen } = useModalContext();
  const Component = as || 'button';

  const handleClick = (e: React.MouseEvent) => {
    setOpen(true);

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Component {...props} onClick={handleClick} />
  );
};

export default ModalButton;
