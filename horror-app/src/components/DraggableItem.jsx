import { useDraggable } from '@dnd-kit/core';

export default function DraggableItem({ id, from }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { from },
  });

  const style = {
    padding: '0.5rem 1rem',
    margin: '0.25rem 0',
    border: '1px solid #999',
    backgroundColor: isDragging ? '#bde4ff' : 'white',
    cursor: 'grab',
    userSelect: 'none',
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {id}
    </div>
  );
}


