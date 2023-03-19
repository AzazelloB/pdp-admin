import { useCallback } from 'react';
import { useIntl } from 'react-intl';

type Dateable = Date | string | number;

export const useDate = () => {
  const intl = useIntl();

  const formatDate = useCallback((date: Dateable) => {
    return intl.formatDate(date);
  }, [intl]);

  return {
    formatDate,
  };
};
