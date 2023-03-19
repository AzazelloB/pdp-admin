import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { createContext } from 'utils/createContext';

interface Tab {
  id: string;
  label: string;
}

function useTabsState({ defaultActiveTabId }: { defaultActiveTabId: string }) {
  const [searchParams] = useSearchParams();

  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState(searchParams.get('tab') || defaultActiveTabId);

  useEffect(() => {
    const currentTabId = searchParams.get('tab');

    if (currentTabId) {
      setActiveTabId(currentTabId);
    }
  }, [searchParams]);

  return {
    tabs,
    setTabs,
    defaultActiveTabId,
    activeTabId,
    setActiveTabId,
  };
}

const [TabsProvider, useTabsContext] = createContext(useTabsState);

export { TabsProvider, useTabsContext };
