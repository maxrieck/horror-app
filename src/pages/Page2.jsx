import React, { useState } from 'react';
import ContainerModal from '../components/ContainerModal';
import { Link } from 'react-router-dom'

const CONTAINERS = ['bodyBag', 'propertyBag', 'medicalChart'];


const Page2 = () => {

  const [openModal, setOpenModal] = useState(null);

  // use this to re-position buttons on page
  const containerPositions = {
    bodyBag: { gridRow: 3, gridColumn: 5 },
    propertyBag: { gridRow: 3, gridColumn: 3 },
    medicalChart: { gridRow: 5, gridColumn: 8 }
  };


  return (
    <>
      <h2>Wall with table - page 2</h2>

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

        <Link className='left-button' to='/page4'>Left</Link>
        <Link className='right-button' to='/page1'>Right</Link>

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


