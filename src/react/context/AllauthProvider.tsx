import { createContext, useContext, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AllauthClient } from '@browser/client';

const AllauthContext = createContext<{ client: AllauthClient } | null>(null);

export const AllauthProvider = ({ 
  client, 
  queryClient, 
  children 
}: { client: AllauthClient, queryClient: QueryClient, children: ReactNode }) => (
  <AllauthContext.Provider value={{ client }}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </AllauthContext.Provider>
);

export const useAllauth = () => {
  const context = useContext(AllauthContext);
  if (!context) throw new Error('useAllauth must be used within AllauthProvider');
  return context;
};
