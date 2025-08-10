import { createContext, useContext, useReducer } from 'react';


// Initial state with item objects and containers storing IDs
const initialState = {
  items: {
    test2: { id: 'test2', name: 'Test 2', description: 'Second test item' },
    test3: { id: 'test3', name: 'Test 3', description: 'Third test item' },
    test4: { id: 'test4', name: 'Test 4', description: 'Fourth test item' },
    key7: { id: 'key7', name: 'Key 7', description: 'Special key for container 7' },
    key9: { id: 'key9', name: 'Key 9', description: 'Special key for container 9' },
  },
  inventory: ['test2'],
  containers: {
    page1: { container1: [], container2: [], container3: [], container4: [] },
    page2: { container5: [], container6: [] },
    page3: { container7: [], container8: [] },
    page4: { container9: [] },
    page5: {},
    page6: { container8: [], container9: [] },
    page7: { container10: [] },
  },
};

const InventoryContext = createContext();

function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { itemId } = action.payload;
      if (!state.inventory.includes(itemId)) {
        return { ...state, inventory: [...state.inventory, itemId] };
      }
      return state;
    }
    case 'MOVE_ITEM': {
      const { from, to, itemId } = action.payload;
      const newInventory = [...state.inventory];
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
          id => id !== itemId
        );
      }

      // logic for test2 and test3
      if (itemId === 'test2' && to && typeof to === 'object' && to.container === 'container2') {
        if (!newInventory.includes('test3')) newInventory.push('test3');
        return { ...state, inventory: newInventory, containers: newContainers };
      }
      if (itemId === 'test3' && to && typeof to === 'object' && to.container === 'container3') {
        if (!newInventory.includes('test4')) newInventory.push('test4');
        return { ...state, inventory: newInventory, containers: newContainers };
      }
      // logic for key7
      if (itemId === 'key7' && to && typeof to === 'object' && to.container === 'container7') {
        if (!newInventory.includes('key9')) newInventory.push('key9');
        return { ...state, inventory: newInventory, containers: newContainers };
      }

      // Add to destination
      if (to === 'inventory') {
        if (!newInventory.includes(itemId)) newInventory.push(itemId);
      } else if (to && typeof to === 'object') {
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

