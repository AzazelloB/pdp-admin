import { Box, Typography } from '@mui/material';
import { useTabsContext } from 'context/TabsContext';
import { useEffect } from 'react';

interface TabProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({
  id,
  label,
  children,
}) => {
  const { activeTabId, setTabs } = useTabsContext();

  useEffect(() => {
    setTabs((prev) => [
      ...prev,
      {
        id,
        label,
      },
    ]);

    return () => setTabs((prev) => prev.filter((tab) => tab.id !== id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, label]);

  return (
    <Box
      width="100%"
      role="tabpanel"
      hidden={id !== activeTabId}
    >
      {id === activeTabId && (
        <Box sx={{ p: 3 }}>
          <Typography>
            {children}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Tab;
