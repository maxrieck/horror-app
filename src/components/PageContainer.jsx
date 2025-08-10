import { useDroppable } from '@dnd-kit/core';
import DraggableItem from './DraggableItem';
import { useInventory } from '../context/InventoryContext';

const PAGE_CONTAINERS = {
  page1: ['container1', 'container2'],
  page2: ['container3', 'container4'],
  page3: ['container5', 'container6'],
  page4: ['container7', 'container8'],
  page5: ['container9', 'container10'],
};

export default function PageContainer({ page, container }) {
  const { state } = useInventory();
  
  if (container) {
    return (
      <DropZone
        id={`${container}:${page}`}
        items={state.containers[page][container]}
        page={page}
        container={container}
      />
    );
  }
  
  const containers = PAGE_CONTAINERS[page] || [];
  return (
    <div style={{ padding: '1rem', display: 'flex', gap: '2rem' }}>
      {containers.map((containerId) => (
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

