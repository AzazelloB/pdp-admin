import { useField } from 'formik';
import TextareaUI from '@mui/material/FilledInput';

interface TextAreaProps extends React.ComponentProps<typeof TextareaUI> {
  name: string;
}

const Textarea: React.FC<TextAreaProps> = ({ name, ...props }) => {
  const [field] = useField(name);

  return (
    <TextareaUI
      {...field}
      fullWidth
      multiline
      {...props}
    />
  );
};

export default Textarea;
