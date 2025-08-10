import React from 'react';
import Modal from './Modal'; 
import { useInventory } from '../context/InventoryContext';
import DraggableItem from './DraggableItem';
import { useDroppable } from '@dnd-kit/core';
import PageContainer from './PageContainer';

export default function ContainerModal({ page, container, open, onClose }) {
  const {  dispatch } = useInventory();
  const { setNodeRef } = useDroppable({ id: `${container}:${page}` });
  

  
  const showKey7Button = page === 'page2' && container === 'container5';
  const handleAddKey7 = () => {
    dispatch({ type: 'ADD_ITEM', payload: { itemId: 'key7' } });
  };

  if (!open) return null;

  let content;
  try {
    content = <PageContainer page={page} container={container} />;
  } catch (e) {
    content = <div style={{ color: 'red' }}>Error rendering container: {String(e)}</div>;
  }

  return (
    <Modal onClose={onClose}>
      <div ref={setNodeRef}>
        {content}
        {showKey7Button && (
          <button style={{ marginTop: '1rem' }} onClick={handleAddKey7}>
            Add key7 to inventory
          </button>
        )}
      </div>
    </Modal>
  );
}
