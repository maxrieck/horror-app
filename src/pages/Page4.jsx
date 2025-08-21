import React, { useState } from 'react';
import ContainerModal from '../components/ContainerModal';
import { Link } from 'react-router-dom'

const CONTAINERS = ['cardReader', 'cabinet'];

const Page4 = () => {
  const [openModal, setOpenModal] = useState(null);

  // use this to re-position buttons on page
  const containerPositions = {
    cardReader: { gridRow: 4, gridColumn: 5 },
     cabinet: { gridRow: 2, gridColumn: 5 },

  };

  return (
    <>
      <h2>Wall with exit - page 4</h2>

      <div className="page-layout" >
        {CONTAINERS.map((container) => (
          <button
            key={container}
            onClick={() => setOpenModal(container)}
            style={{
              gridRow: containerPositions[container].gridRow,
              gridColumn: containerPositions[container].gridColumn,
            }}
          >
            Open {container}
          </button>
        ))}

        <Link className='left-button' to='/page3'>Left</Link>
        <Link className='right-button' to='/page2'>Right</Link>
        <Link className='forward-button' to='/page5'>Forward</Link>

      </div>

      {CONTAINERS.map((container) => (
        <ContainerModal
          key={container}
          page="page4"
          container={container}
          open={openModal === container}
          onClose={() => setOpenModal(null)}
        />
      ))}
    </>
  );
};
export default Page4;

