import { IntlProvider } from 'react-intl';

import messagesEn from 'lang/compiled/en.json';

const messages: any = {
  en: messagesEn,
};

interface IntlWrapperProps {
  children: React.ReactNode;
}

const IntlWrapper: React.FC<IntlWrapperProps> = ({ children }) => {
  const locale = 'en-GB';

  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="en-GB">
      {children}
    </IntlProvider>
  );
};

export default IntlWrapper;
