import { useDroppable } from '@dnd-kit/core';
import DraggableItem from './DraggableItem';
import { useInventory } from '../context/InventoryContext';

const PAGE_CONTAINERS = {
    page1: { freezer1: [], freezer2: [], freezer3: [], freezer4: [] },
    page2: { bodyBag: [], propertyBag: [], medicalChart: [] },
    page3: { drain: [], fireExitMap: [] },
    page4: { cardReader: [], cabinet: [] },
    page5: { fireExtinguisherCase: [] },
    page6: { safe: [] },
    page7: { computer: [], desk: [] },
    page8: { blockedExit: [] },
    page9: { elevatorDoors: [], elevatorButton: [] },
    page10: { elevatorPanel: [] },
  }

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

