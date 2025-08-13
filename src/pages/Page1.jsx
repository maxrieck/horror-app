import React, { useState } from 'react';
import ContainerModal from '../components/ContainerModal';
import { Link } from 'react-router-dom'

const CONTAINERS = ['container1', 'container2', 'container3', 'container4'];

const Page1 = () => {

  const [openModal, setOpenModal] = useState(null);

  // use this to re-position buttons on page
  const containerPositions = {
    container1: { gridRow: 1, gridColumn: 5 },
    container2: { gridRow: 3, gridColumn: 3 },
    container3: { gridRow: 3, gridColumn: 7 },
    container4: { gridRow: 6, gridColumn: 5 },
  };

  return (
    <>
      <h2>Morgue Freezer Wall - page 1</h2>

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

        <Link className='left-button' to='/page2'>Left</Link>
        <Link className='right-button' to='/page3'>Right</Link>

      </div>

      {CONTAINERS.map((container) => (
        <ContainerModal
          key={container}
          page="page1"
          container={container}
          open={openModal === container}
          onClose={() => setOpenModal(null)}
        />
      ))}
    </>
  );
};
export default Page1;


