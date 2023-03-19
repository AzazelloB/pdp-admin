import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useField } from 'formik';

interface NoteProps {
  name: string;
  note: string;
  noteIndex: number;
}

const Note: React.FC<NoteProps> = ({ name, note, noteIndex }) => {
  const [{ value = [] }, , { setValue }] = useField(name);

  const handleDeleteNote = () => {
    setValue([
      ...value.slice(0, noteIndex),
      ...value.slice(noteIndex + 1),
    ]);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <span>{note}</span>

      <IconButton
        sx={{
          ml: 4,
        }}
        onClick={handleDeleteNote}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default Note;
