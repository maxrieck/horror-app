import React, { createContext, useContext, useReducer } from 'react';

// Initial state with some example items
const initialState = {
  inventory: ['item1', 'item2', 'item3', 'item4', 'item5'],
  containers: {
    page1: { containerA: [], containerB: [] },
    page2: { containerA: [], containerB: [] },
    page3: { containerA: [], containerB: [] },
    page4: { containerA: [], containerB: [] },
    page5: { containerA: [], containerB: [] },
  },
};

const InventoryContext = createContext();

function inventoryReducer(state, action) {
  switch (action.type) {
    case 'MOVE_ITEM': {
      const { from, to, itemId } = action.payload;
      const newInventory = [...state.inventory];
      const newContainers = JSON.parse(JSON.stringify(state.containers));

      // Remove from source
      if (from === 'inventory') {
        const index = newInventory.indexOf(itemId);
        if (index > -1) newInventory.splice(index, 1);
      } else {
        const { page, container } = from;
        newContainers[page][container] = newContainers[page][container].filter(
          (id) => id !== itemId
        );
      }

      // Add to destination
      if (to === 'inventory') {
        if (!newInventory.includes(itemId)) newInventory.push(itemId);
      } else {
        const { page, container } = to;
        if (!newContainers[page][container].includes(itemId))
          newContainers[page][container].push(itemId);
      }

      return { inventory: newInventory, containers: newContainers };
    }
    default:
      return state;
  }
}

export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);
  return (
    <InventoryContext.Provider value={{ state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used within InventoryProvider');
  return context;
}

