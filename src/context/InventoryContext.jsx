import { createContext, useContext, useReducer } from 'react';


// Initial state with item objects and containers storing IDs
const initialState = {
  items: {
    item1: { id: 'keycard', name: 'Keycard', description: '', status: false },
    item2: { id: 'bucket', name: 'Bucket', description: '', status: false },
    item3: { id: 'scalpal', name: 'Scalpal', description: '', status: false },
    item4: { id: 'wallet', name: 'Wallet', description: '', status: true },
    item5: { id: 'carKeys', name: 'Car Keys', description: '', status: true },
    item6: { id: 'flashdrive', name: 'Flashdrive', description: '', status: true },
    item7: { id: 'fireExtinguisher', name: 'Fire Extinguisher', description: '', status: true },
    item8: { id: 'crowbar', name: 'Crowbar', description: '', status: true },
    item9: { id: 'lighter', name: 'Lighter', description: '', status: true },
    item10: { id: 'elevatorKey', name: 'Elevator Doors', description: '', status: true },
  },
  inventory: [],
  containers: {
    page1: { freezer1: [], freezer2: ['bucket'], freezer3: [], freezer4: ['keycard', 'flashdrive'] },
    page2: { bodyBag: [], propertyBag: ['wallet', 'carKeys'], medicalChart: [] },
    page3: { drain: [], fireExitMap: [] },
    page4: { cardReader: [], cabinet: [] },
    page5: { fireExtinguisherCase: ['fireExtinguisher'] },
    page6: { safe: ['elevatorKey'] },
    page7: { computer: [], desk: ['lighter'] },
    page8: { blockedExit: ['crowbar'] },
    page9: { elevatorDoors: [], elevatorButton: [] },
    page10: { elevatorPanel: [] },
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


      // logic for drain container
      if (itemId === 'carKeys' && to && typeof to === 'object' && to.page === 'page3' && to.container === 'drain') {
        const carKeysIndex = newInventory.indexOf('carKeys');
        if (carKeysIndex > -1) newInventory.splice(carKeysIndex, 1);
        newContainers.page3.drain = newContainers.page3.drain.filter(id => id !== 'carKeys');
        const newItems = { ...state.items, item2: { ...state.items.item2, status: true } };
        return { ...state, inventory: newInventory, containers: newContainers, items: newItems };
      }

      if (itemId === 'bucket' && to && typeof to === 'object' && to.page === 'page3' && to.container === 'drain') {
        const bucketStatus = state.items.item2.status;
        if (bucketStatus) {
          if (!newInventory.includes('scalpal')) newInventory.push('scalpal');
          newContainers.page3.drain = newContainers.page3.drain.filter(id => id !== 'bucket');
          return { ...state, inventory: newInventory, containers: newContainers };
        }
        if (!newContainers.page3.drain.includes('bucket')) newContainers.page3.drain.push('bucket');
        return { ...state, inventory: newInventory, containers: newContainers };
      }

     // logic for card reader container
      if (itemId === 'scalpal' && to && typeof to === 'object' && to.page === 'page4' && to.container === 'cardReader') {
        const newItems = { ...state.items, item3: { ...state.items.item3, status: true } };
        return { ...state, inventory: newInventory, containers: newContainers, items: newItems };
      }

      if (itemId === 'keycard' && to && typeof to === 'object' && to.page === 'page4' && to.container === 'cardReader') {
        const scalpalStatus = state.items.item3.status;
        if (scalpalStatus) {

          const keycardIndex = newInventory.indexOf('keycard');
          if (keycardIndex > -1) newInventory.splice(keycardIndex, 1);

          newContainers.page4.cardReader = newContainers.page4.cardReader.filter(id => id !== 'keycard');
          return { ...state, inventory: newInventory, containers: newContainers };
        }
      }

      // logic for freezer1 container
      if (itemId === 'lighter' && to && typeof to === 'object' && to.page === 'page1' && to.container === 'freezer1') {
        const lighterIndex = newInventory.indexOf('lighter');
        if(lighterIndex > -1) newInventory.splice(lighterIndex, 1);
        newContainers.page1.freezer1 = newContainers.page1.freezer1.filter(id => id === 'lighter')
        const newItems = { ...state.items, item9: { ...state.items.item9, status: true } };
        return { ...state, inventory: newInventory, containers: newContainers, items: newItems };
      }

      // logic for elevator doors container
      if (itemId === 'crowbar' && to && typeof to === 'object' && to.page === 'page9' && to.container === 'elevatorDoors') {
        const crowbarIndex = newInventory.indexOf('crowbar');
        if(crowbarIndex > -1) newInventory.splice(crowbarIndex, 1);
        newContainers.page9.elevatorDoors = newContainers.page9.elevatorDoors.filter(id => id === 'crowbar')
        const newItems = { ...state.items, item8: { ...state.items.item8, status: true } };
        return { ...state, inventory: newInventory, containers: newContainers, items: newItems };
      }

      // logic for elevator panel container
      if (itemId === 'elevatorKey' && to && typeof to === 'object' && to.page === 'page10' && to.container === 'elevatorPanel') {
        const elevatorKeyIndex = newInventory.indexOf('elevatorKey');
        if(elevatorKeyIndex > -1) newInventory.splice(elevatorKeyIndex, 1);
        newContainers.page10.elevatorPanel = newContainers.page10.elevatorPanel.filter(id => id === 'elevatorKey')
        const newItems = { ...state.items, item10: { ...state.items.item10, status: true } };
        return { ...state, inventory: newInventory, containers: newContainers, items: newItems };
      }

      // logic for computer container
      if (itemId === 'flashdrive' && to && typeof to === 'object' && to.page === 'page7' && to.container === 'computer') {
        const flashdriveIndex = newInventory.indexOf('flashdrive');
        if(flashdriveIndex > -1) newInventory.splice(flashdriveIndex, 1);
        newContainers.page7.computer = newContainers.page7.computer.filter(id => id === 'flashdrive')
        const newItems = { ...state.items, item6: { ...state.items.item6, status: true } };
        return { ...state, inventory: newInventory, containers: newContainers, items: newItems };
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
