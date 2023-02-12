import { useUserPDPForm } from 'api/pdpForms';
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

  return (
    <div>PDPFormPage</div>
  );
};

export default PDPFormPage;
