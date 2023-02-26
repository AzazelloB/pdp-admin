import { useUserPDPForm } from 'api/pdpForms';
import Form from 'components/PDP/Form';
import { useParams } from 'react-router-dom';

const PDPFormPage: React.FC = () => {
  const { formId } = useParams();

  const {
    data,
    isLoading,
    isIdle,
    isError,
  } = useUserPDPForm({
    pathParams: {
      id: formId!,
    },
  });

  if (isLoading || isIdle) {
    return (
      <>
        Loading..
      </>
    );
  }

  if (isError) {
    return (
      <>
        Error
      </>
    );
  }

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      template={data.template}
      initialValues={data.values}
      onSumbit={handleSubmit}
    />
  );
};

export default PDPFormPage;
