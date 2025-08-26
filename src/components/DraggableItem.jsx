import { useDraggable } from '@dnd-kit/core';

export default function DraggableItem({ id, image, from }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    image,
    data: { from },
  });

  const style = {     
    backgroundColor: isDragging ? '#dedede7e' : '#dddddd00',
    cursor: 'grab',
    userSelect: 'none',
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <img style={{
        maxWidth: '125px',
        backgroundColor: '#dddddd00',
        border: 'none',
        borderRadius:'60px'
      }} src={image} alt={id} />
    </div>
  );
}


