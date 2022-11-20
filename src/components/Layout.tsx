import { Container } from '@mui/material';

import Header from './Header';

export interface LayoutProps {
  children: JSX.Element,
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />

      <main>
        <Container
          sx={{
            py: 5,
          }}
        >
          {children}
        </Container>
      </main>
    </>
  );
};

export default Layout;
