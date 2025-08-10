import React from 'react';

export default function Modal({ children, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      pointerEvents: 'none',
    }}>
      <div
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          minWidth: '300px',
          minHeight: '200px',
          position: 'relative',
          pointerEvents: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button style={{ position: 'absolute', top: 10, right: 10 }} onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}
