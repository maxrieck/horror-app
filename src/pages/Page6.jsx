import React, { useState } from 'react';
import ContainerModal from '../components/ContainerModal';
import { Link } from 'react-router-dom'

const CONTAINERS = ['container10', 'container11'];

const Page6 = () => {

  const [openModal, setOpenModal] = useState(null);

  const containerPositions = {
    container10: { gridRow: 4, gridColumn: 6 },
    container11: { gridRow: 3, gridColumn: 5 },
  }

  return (
    <>
      <h2>Office area with desk - page 6</h2>

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
          page="page6"
          container={container}
          open={openModal === container}
          onClose={() => setOpenModal(null)}
        />
      ))}
    </>
  );
};
export default Page6;

