import React, { useState } from 'react';
import ContainerModal from '../components/ContainerModal';
import { Link } from 'react-router-dom'

const CONTAINERS = ['container7', 'container8'];


const Page3 = () => {

  const [openModal, setOpenModal] = useState(null);

  const containerPositions = {
    container7: { gridRow: 4, gridColumn: 5 },
    container8: { gridRow: 7, gridColumn: 9 },
  };


  return (
    <>
      <h2>Wall with drain - page 3</h2>

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

        <Link className='left-button' to='/page1'>Left</Link>
        <Link className='right-button' to='/page4'>Right</Link>

      </div>

      {CONTAINERS.map((container) => (
        <ContainerModal
          key={container}
          page="page3"
          container={container}
          open={openModal === container}
          onClose={() => setOpenModal(null)}
        />
      ))}
    </>
  );
};
export default Page3;
