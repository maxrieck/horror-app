import { createContext, useContext } from 'react';
import bucket from '../assets/items/bucket.png'
import flashdrive from '../assets/items/flashdrive.png'
import carkeys from '../assets/items/carkeys.png'
import crowbar from '../assets/items/crowbar.png'
import scalpel from '../assets/items/scalpel.png'
import lighter from '../assets/items/lighter.png'
import wallet from '../assets/items/wallet.png'
import extinguisher from '../assets/items/extinguisher.png'
import elevatorkey from '../assets/items/elevatorkey.png'

const InventoryContext = createContext();

// Initial state with item objects and containers storing IDs
export const initialState = {
  items: {
    item1: { id: 'keycard', name: 'Keycard', image: 'keycard.png', description: '', status: false },
    item2: { id: 'bucket', name: 'Bucket', image: bucket, description: '', status: false },
    item3: { id: 'scalpel', name: 'Scalpel', image: scalpel, description: '', status: false },
    item4: { id: 'wallet', name: 'Wallet', image: wallet, description: '', status: true },
    item5: { id: 'carKeys', name: 'Car Keys', image: carkeys, description: '', status: true },
    item6: { id: 'flashdrive', name: 'Flashdrive', image: flashdrive, description: '', status: true },
    item7: { id: 'fireExtinguisher', name: 'Fire Extinguisher', image: extinguisher, description: '', status: true },
    item8: { id: 'crowbar', name: 'Crowbar', image: crowbar, description: '', status: true },
    item9: { id: 'lighter', name: 'Lighter', image: lighter, description: '', status: true },
    item10: { id: 'elevatorKey', name: 'Elevator Doors', image: elevatorkey, description: '', status: true },
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