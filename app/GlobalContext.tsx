'use client';
import { createContext, useContext } from 'react';
import { GlobalContextValue, GlobalData, SessionType } from '@/utils/types';
import { FALLBACK_DATA } from '@/utils/Constants';

const GlobalContext = createContext<GlobalContextValue | null>(null);

export const GlobalProvider = ({
  children,
  data,
  session,
}: {
  children: React.ReactNode;
  data: GlobalData | null;
  session: SessionType | null;
}) => {
  // fallback if data is null
  const value = {
    globalData: data ?? FALLBACK_DATA,
    session,
    isDbDown: data === null,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

// GlobalProvider hook
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
