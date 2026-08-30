import { createContext, useContext, ReactNode, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AllauthTransport } from '@/browser/transport';
import { AllAuthApi } from '@/browser/api';

interface AllauthContextValue {
  api: AllAuthApi;
  queryClient: QueryClient;
}

const AllauthContext = createContext<AllauthContextValue | null>(null);

export const AllauthProvider = ({ 
  transport, 
  queryClient, 
  children 
}: { transport: AllauthTransport, queryClient: QueryClient, children: ReactNode }) => {
  const api = useMemo(() => new AllAuthApi(transport), [transport]);
  
  return (
    <AllauthContext.Provider value={{ api, queryClient }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AllauthContext.Provider>
  );
};

export const useAllauth = () => {
  const context = useContext(AllauthContext);
  if (!context) throw new Error('useAllauth must be used within AllauthProvider');
  return context;
};
