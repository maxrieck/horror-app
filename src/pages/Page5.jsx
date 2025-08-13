import React, { useState } from 'react';
import ContainerModal from '../components/ContainerModal';
import { Link } from 'react-router-dom'

const CONTAINERS = ['hallwayObject']

const Page5 = () => {

  const [openModal, setOpenModal] = useState(null);

  const containerPositions = {
    hallwayObject: { gridRow: 4, gridColumn: 5 }, //placeholder object to make sure page works 
  };

  return (
    <>
      <h2>Hallway - page 5</h2>

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

      <Link className='left-button' to='/page6'>Left</Link>
      <Link className='right-button' to='/page7'>Right</Link>
      {/* <Link className='forward-button' to='/page5'>Forward</Link> */}
      <Link className='back-button' to='/page4'>Back</Link>

      </div>

      {CONTAINERS.map((container) => (
        <ContainerModal
          key={container}
          page="page5"
          container={container}
          open={openModal === container}
          onClose={() => setOpenModal(null)}
        />
      ))}
    </>
  );
};
export default Page5;


