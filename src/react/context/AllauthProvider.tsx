import { createContext, useContext, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AllauthTransport } from '@browser/transport';

interface AllauthContextValue {
  transport: AllauthTransport;
  queryClient: QueryClient;
}

const AllauthContext = createContext<AllauthContextValue | null>(null);

export const AllauthProvider = ({ 
  transport, 
  queryClient, 
  children 
}: { transport: AllauthTransport, queryClient: QueryClient, children: ReactNode }) => (
  <AllauthContext.Provider value={{ transport, queryClient }}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </AllauthContext.Provider>
);

export const useAllauth = () => {
  const context = useContext(AllauthContext);
  if (!context) throw new Error('useAllauth must be used within AllauthProvider');
  return context;
};
