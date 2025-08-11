
import { createContext, useReducer } from 'react';
import { inventoryReducer, initialState } from './inventoryReducer';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);
  return (
    <InventoryContext.Provider value={{ state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};



