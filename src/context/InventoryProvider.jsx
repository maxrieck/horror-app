
import { createContext, useReducer } from 'react';
import { inventoryReducer, initialState } from './InventoryReducer';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);
  return (
    <InventoryContext.Provider value={{ state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};



