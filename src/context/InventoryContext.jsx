import { createContext, useContext } from 'react';
const InventoryContext = createContext();

// Initial state with item objects and containers storing IDs
export const initialState = {
  items: {
    item1: { id: 'keycard', name: 'Keycard', description: '', status: false },
    item2: { id: 'bucket', name: 'Bucket', description: '', status: false },
    item3: { id: 'scalpel', name: 'Scalpel', description: '', status: false },
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


// eslint-disable-next-line react-refresh/only-export-components
export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used within InventoryProvider');
  return context;
}

export { InventoryContext }; 