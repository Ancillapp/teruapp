import React, {
  FunctionComponent,
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';

import { useTheme } from '@material-ui/core';

export type MenuContextToggleCallback = (newState?: boolean) => void;

export const MenuContext = createContext<
  | {
      open: boolean;
      toggle: MenuContextToggleCallback;
    }
  | undefined
>(undefined);

export const MenuProvider: FunctionComponent = (props) => {
  const theme = useTheme();

  const [open, setOpen] = useState(
    window.matchMedia(`(min-width:${theme.breakpoints.width('sm')}px)`).matches,
  );

  const toggle = useCallback<MenuContextToggleCallback>((newState) => {
    setOpen(
      typeof newState === 'boolean'
        ? newState
        : (previousState) => !previousState,
    );
  }, []);

  return <MenuContext.Provider value={{ open, toggle }} {...props} />;
};

export const useMenu = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }

  return context;
};

export default MenuProvider;
