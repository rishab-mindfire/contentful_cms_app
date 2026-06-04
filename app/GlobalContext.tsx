'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SessionType } from '@/utils/types';
import { authClient } from '@/lib/auth-client';
import { handleApiError } from '@/utils/errorHandler';

interface GlobalContextValue {
  session: SessionType | null;
}

const GlobalContext = createContext<GlobalContextValue | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionType | null>(null);

  useEffect(() => {
    async function initialize() {
      try {
        const { data: sessionData, error } = await authClient.getSession();
        if (error) {
          handleApiError('AuthSession', error, 'Failed to load your session.');
          return;
        }
        setSession(sessionData);
      } catch (err) {
        handleApiError('GlobalProvider.initialize', err, 'An unexpected error occurred.');
      }
    }

    initialize();
  }, []);

  const value = {
    session,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useGlobal must be used within a GlobalProvider');
  return context;
};
