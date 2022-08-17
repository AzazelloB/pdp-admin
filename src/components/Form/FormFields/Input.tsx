import {
  FormHelperText,
  Input as MuiInput,
  OutlinedInput,
  FilledInput,
  Box,
  Typography,
} from '@mui/material';

interface StandartInputProps extends React.ComponentProps<typeof MuiInput> {
  variant: 'standart';
}

interface OutlinedInputProps extends React.ComponentProps<typeof OutlinedInput> {
  variant: 'outlined';
}

interface FilledInputProps extends React.ComponentProps<typeof FilledInput> {
  variant: 'filled';
}

type InputProps = (StandartInputProps | OutlinedInputProps | FilledInputProps) & {
  name: string;
  label?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  variant = 'standard',
  label,
  helperText,
  ...props
}) => {
  let InputComponent = null;

  switch (variant) {
    case 'filled':
      InputComponent = FilledInput;
      break;

    case 'outlined':
      InputComponent = OutlinedInput;
      break;

    default:
      InputComponent = MuiInput;
      break;
  }

  return (
    // <Box display="flex" alignItems="center">
    <>
      {label && (
        <label
          htmlFor={name}
        >
          <Typography sx={{
            mr: 2,
            fontSize: 18,
          }}
          >
            {label}
          </Typography>
        </label>
      )}

      <InputComponent
        id={name}
        name={name}
        hiddenLabel
        aria-describedby={`${name}-text`}
        {...props}
      />

      {helperText && <FormHelperText id={`${name}-text`}>{helperText}</FormHelperText>}
    </>
    // </Box>
  );
};

export default Input;
