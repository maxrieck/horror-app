import { useDroppable } from '@dnd-kit/core';
import DraggableItem from './DraggableItem';
import { useInventory } from '../context/InventoryContext';

const PAGE_CONTAINERS = {
  page1: ['container1', 'container2', 'container3', 'container4'],
  page2: ['container5', 'container6'],
  page3: ['container7', 'container8'],
  page4: ['container9'],
  page5: ['hallwayObject'],
  page6: ['container10', 'container11'],
  page7: ['container12'],
};

export default function PageContainer({ page, container }) {
  const { state } = useInventory();
  // check if page and container exist in state
  const pageContainers = state.containers[page] || {};

  if (container) {
    const items = pageContainers[container] || [];
    return (
      <DropZone
        id={`${container}:${page}`}
        items={items}
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
          items={pageContainers[containerId] || []}
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

