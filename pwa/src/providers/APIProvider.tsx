import React, { FunctionComponent, createContext, useContext } from 'react';

export interface APIProviderProps {
  baseUrl: string;
}

export const APIContext = createContext<APIProviderProps | undefined>(
  undefined,
);

export const APIProvider: FunctionComponent<APIProviderProps> = ({
  baseUrl,
  children,
}) => <APIContext.Provider value={{ baseUrl }}>{children}</APIContext.Provider>;

export const useAPI = () => {
  const context = useContext(APIContext);

  if (!context) {
    throw new Error('useAPI must be used within a APIProvider');
  }

  return context;
};

export default APIProvider;
