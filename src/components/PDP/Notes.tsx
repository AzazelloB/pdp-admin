import { useIntl } from 'react-intl';
import { Form, Formik, useField } from 'formik';
import InputUI from '@mui/material/FilledInput';

import Input from 'components/Form/FormFields/Input';
import Field from 'components/Form/Field';

import Note from './Note';

interface NotesProps {
  prefixName: string;
}

const Notes: React.FC<NotesProps> = ({ prefixName }) => {
  const intl = useIntl();

  const name = `${prefixName}.notes`;

  const [{ value: notes = [] }] = useField<string[]>(name);

  const handleSubmit = (e: any) => {
    // TODO Formik is dumb and posts in case of nested forms..........................................................
    console.log(231);
  };

  return (
    <>
      {notes.map((note, noteIndex) => (
        <Note
          key={note}
          name={name}
          note={note}
          noteIndex={noteIndex}
        />
      ))}

      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field
            as={Input}
            name="newNote"
            label={intl.formatMessage({
              defaultMessage: 'Write your note here',
            })}
          />
        </Form>
      </Formik>
    </>
  );
};

export default Notes;
