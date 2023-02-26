import {
  Box,
  Tabs,
  Tab as TabLabel,
} from '@mui/material';
import { useTabsContext } from 'context/TabsContext';
import { useSearchParams } from 'react-router-dom';

interface TabPanelProps {
  children: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    defaultActiveTabId,
    activeTabId,
    setActiveTabId,
    tabs,
  } = useTabsContext();

  const handleChange = (e: React.SyntheticEvent<Element>) => {
    const { id } = e.currentTarget;

    setActiveTabId(id);

    if (id === defaultActiveTabId) {
      searchParams.delete('tab');
    } else {
      searchParams.set('tab', id);
    }

    setSearchParams(searchParams, { replace: true });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        bgcolor: 'background.paper',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={activeTabId}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {tabs.map((tab) => (
          <TabLabel
            key={tab.id}
            id={tab.id}
            value={tab.id}
            label={tab.label}
          />
        ))}
      </Tabs>

      {children}
    </Box>
  );
};

export default TabPanel;
