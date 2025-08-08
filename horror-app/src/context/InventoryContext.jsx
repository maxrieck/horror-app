import { createContext, useContext, useReducer } from 'react';


// Initial state with item objects and containers storing IDs
const initialState = {
  items: {
    item1: { id: 'item1', name: 'Item 1', description: 'First item' },
    item2: { id: 'item2', name: 'Item 2', description: 'Second item' },
    item3: { id: 'item3', name: 'Item 3', description: 'Third item' },
    item4: { id: 'item4', name: 'Item 4', description: 'Fourth item' },
    item5: { id: 'item5', name: 'Item 5', description: 'Fifth item' },
  },
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
      // Shallow copy containers and their arrays
      const newContainers = { ...state.containers };
      Object.keys(newContainers).forEach(page => {
        newContainers[page] = { ...newContainers[page] };
        Object.keys(newContainers[page]).forEach(container => {
          newContainers[page][container] = [...newContainers[page][container]];
        });
      });

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

      return { ...state, inventory: newInventory, containers: newContainers };
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

// eslint-disable-next-line react-refresh/only-export-components
export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used within InventoryProvider');
  return context;
}

