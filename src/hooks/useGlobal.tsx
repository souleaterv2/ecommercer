import { createContext, useContext, useState } from "react";

interface GlobalContextData {
  isLoginModelOpen: boolean;
  handleLoginModel: () => void;
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalContextProvider: React.FC = ({ children }) => {
  const [isLoginModelOpen, setIsLoginModelOpen] = useState(false);

  function handleLoginModel() {
    setIsLoginModelOpen(!isLoginModelOpen);
  }

  return (
    <GlobalContext.Provider value={{ isLoginModelOpen, handleLoginModel }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobal() {
  return useContext(GlobalContext);
}
