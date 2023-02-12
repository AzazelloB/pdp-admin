import { IntlProvider } from 'react-intl';

import messagesEn from 'lang/compiled/en.json';

const messages: any = {
  en: messagesEn,
};

interface IntlWrapperProps {
  children: React.ReactNode;
}

const IntlWrapper: React.FC<IntlWrapperProps> = ({ children }) => {
  const locale = 'en';

  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="en">
      {children}
    </IntlProvider>
  );
};

export default IntlWrapper;
