import { createPortal } from 'react-dom'; 
import '../styles/InventoryModal.css'; 

const InventoryModal = ({ message, onClose }) => {
  if (!message) return null;

  console.log('InventoryModal received:', { message });

  return createPortal(
    <div className="inventory-modal-overlay" onClick={onClose}>
      <div className="inventory-modal" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
};

export default InventoryModal; 