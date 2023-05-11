import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { usePDPForm, useUpdatePDPForm } from 'api/pdpForms';

import Form from 'components/PDP/Form';

const PDPFormPage: React.FC = () => {
  const { formId } = useParams();

  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    isIdle,
    isError,
  } = usePDPForm({
    pathParams: {
      id: formId!,
    },
  });
  const { mutateAsync: updatePDPForm } = useUpdatePDPForm();

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

  const handleSubmit = async (values: any) => {
    await updatePDPForm({
      pathParams: {
        id: formId!,
      },
      data: values,
    });

    queryClient.invalidateQueries('getPDPForm');
  };

  return (
    <Form
      form={data}
      onSumbit={handleSubmit}
    />
  );
};

export default PDPFormPage;
