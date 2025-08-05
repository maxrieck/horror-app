import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import DraggableItem from './DraggableItem';
import { useInventory } from '../context/InventoryContext';

const CONTAINERS = ['containerA', 'containerB'];

export default function PageContainer({ page }) {
  const { state } = useInventory();

  return (
    <div style={{ padding: '1rem', display: 'flex', gap: '2rem' }}>
      {CONTAINERS.map((containerId) => (
        <DropZone
          key={containerId}
          id={`${containerId}:${page}`}
          items={state.containers[page][containerId]}
          page={page}
          container={containerId}
        />
      ))}
    </div>
  );
}

function DropZone({ id, items, page, container }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        minHeight: 200,
        border: '2px dashed #999',
        backgroundColor: isOver ? '#def' : '#fafafa',
        padding: '1rem',
        borderRadius: '4px',
        overflowY: 'auto',
      }}
    >
      <strong>{`${container} (${page})`}</strong>
      {items.length === 0 && <p>(empty)</p>}
      {items.map((itemId) => (
        <DraggableItem key={itemId} id={itemId} from={{ page, container }} />
      ))}
    </div>
  );
}

