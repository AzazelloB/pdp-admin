import { TabsProvider } from 'context/TabsContext';

import Tab from './Tab';
import TabPanel from './TabPanel';

interface VerticalTabsComponents {
  Tab: typeof Tab;
}

interface VerticalTabsProps {
  defaultActiveTabId: string;
  children: React.ReactNode;
}

const VerticalTabs: React.FC<VerticalTabsProps> & VerticalTabsComponents = ({
  defaultActiveTabId,
  children,
}) => {
  return (
    <TabsProvider defaultActiveTabId={defaultActiveTabId}>
      <TabPanel>
        {children}
      </TabPanel>
    </TabsProvider>
  );
};

VerticalTabs.Tab = Tab;

export default VerticalTabs;
