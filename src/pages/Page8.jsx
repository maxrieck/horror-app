
import React, { useState } from 'react';
import ContainerModal from '../components/ContainerModal';
import { Link } from 'react-router-dom'

const CONTAINERS = ['blockedExit'];

const Page8 = () => {

  const [openModal, setOpenModal] = useState(null);

  // use this to re-position buttons on page
  const containerPositions = {
    blockedExit: { gridRow: 4, gridColumn: 5 },
  };

  return (
    <>
      <h2>Blocked Exit - page 8</h2>

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

        <Link className='back-button' to='/page5'>Back</Link>

      </div>

      {CONTAINERS.map((container) => (
        <ContainerModal
          key={container}
          page="page8"
          container={container}
          open={openModal === container}
          onClose={() => setOpenModal(null)}
        />
      ))}
    </>
  );
};
export default Page8;