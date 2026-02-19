import { createContext, FC, ReactNode, useState } from 'react';

interface StoreContextType {
  isViewScreen?: boolean;
  toggleViewScreen: () => void;
  resetWelcomeState: () => void;
}

export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isViewScreen, setIsViewScreen] = useState<boolean>(false);

  const toggleViewScreen = () => {
    setIsViewScreen((prevIsView) => !prevIsView);
  };

  const resetWelcomeState = () => {
    setIsViewScreen(false);
  };

  return (
    <StoreContext.Provider
      value={{ isViewScreen, toggleViewScreen, resetWelcomeState }}
    >
      {children}
    </StoreContext.Provider>
  );
};
