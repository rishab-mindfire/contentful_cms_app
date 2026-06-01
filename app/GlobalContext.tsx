'use client';
import { createContext, useContext } from 'react';
import { GlobalContextValue, GlobalData, SessionType } from '@/utils/types';

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
  return (
    <GlobalContext.Provider value={{ globalData: data, session }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useGlobal must be used within GlobalProvider');
  return context;
};
