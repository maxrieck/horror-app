import React, { useState } from 'react';
import ContainerModal from '../components/ContainerModal';

const CONTAINERS = ['container5', 'container6'];

const Page2 = () => {
  const [openModal, setOpenModal] = useState(null);
  return (
    <>
      <h2>Page 2</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        {CONTAINERS.map((container) => (
          <button key={container} onClick={() => setOpenModal(container)}>
            Open {container}
          </button>
        ))}
      </div>
      {CONTAINERS.map((container) => (
        <ContainerModal
          key={container}
          page="page2"
          container={container}
          open={openModal === container}
          onClose={() => setOpenModal(null)}
        />
      ))}
    </>
  );
};
export default Page2;


