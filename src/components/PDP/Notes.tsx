import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';
import InputUI from '@mui/material/FilledInput';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useRemoveNote, useAddNote } from 'api/pdpForms';

import Field from 'components/Form/Field';

interface NotesProps {
  tabIndex: number;
  categoryIndex: number;
  skillIndex: number;
  notes: string[];
}

const Notes: React.FC<NotesProps> = ({
  tabIndex,
  categoryIndex,
  skillIndex,
  notes,
}) => {
  const intl = useIntl();
  const { formId } = useParams();

  const [newNote, setNewNote] = useState('');

  const queryClient = useQueryClient();
  const { mutate: addNote } = useAddNote();
  const { mutate: removeNote } = useRemoveNote();

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setNewNote('');

      addNote({
        pathParams: {
          id: formId!,
          tabIndex,
          categoryIndex,
          skillIndex,
        },
        data: {
          note: newNote,
        },
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries('getPDPForm');
        },
      });
    }
  };

  const handleDeleteNote = (noteIndex: number) => () => {
    removeNote({
      pathParams: {
        id: formId!,
        tabIndex,
        categoryIndex,
        skillIndex,
        noteIndex,
      },
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries('getPDPForm');
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(e.target.value);
  };

  return (
    <>
      {notes.length ? (
        <Box mb={2}>
          {notes.map((note, noteIndex) => (
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
                onClick={handleDeleteNote(noteIndex)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      ) : null}

      <Field
        as={InputUI}
        size="small"
        value={newNote}
        onChange={handleChange}
        onKeyUp={handleSubmit}
        label={intl.formatMessage({
          defaultMessage: 'Write your note here',
        })}
      />
    </>
  );
};

export default Notes;
