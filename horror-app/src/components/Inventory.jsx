import { useDroppable } from '@dnd-kit/core';
import DraggableItem from './DraggableItem';
import { useInventory } from '../context/InventoryContext';

export default function Inventory() {
  const { state } = useInventory();
  const { setNodeRef, isOver } = useDroppable({ id: 'inventory' });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: isOver ? '#def' : '#f8f8f8',
        borderTop: '2px solid #ccc',
        padding: '1rem',
        display: 'flex',
        gap: '1rem',
        overflowX: 'auto',
      }}
    >
      <strong>Inventory:</strong>
      {state.inventory.length === 0 && <span>(empty)</span>}
      {state.inventory.map((itemId) => (
        <DraggableItem key={itemId} id={itemId} from="inventory" />
      ))}
    </div>
  );
}


