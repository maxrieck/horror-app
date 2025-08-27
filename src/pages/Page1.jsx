import React, { useState } from 'react';
import ContainerModal from '../components/ContainerModal';
import { Link } from 'react-router-dom'
import GameView from '../components/GameView';
import { iceRoomV1_pathData } from '../assets/iceRoomV1_paths.js';
import iceRoomV1_bg from '../assets/iceRoomV1_bg.jpeg';
import { iceRoomV1_colorMap } from '../assets/iceRoomV1_colorMap.js';


const CONTAINERS = ['freezer1', 'freezer2', 'freezer3', 'freezer4'];

const Page1 = () => {

  const [openModal, setOpenModal] = useState(null);

  // use this to re-position buttons on page
  const containerPositions = {
    freezer1: { gridRow: 1, gridColumn: 5 },
    freezer2: { gridRow: 3, gridColumn: 3 },
    freezer3: { gridRow: 3, gridColumn: 7 },
    freezer4: { gridRow: 6, gridColumn: 5 },
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
              zIndex: 10,
            }}
          >
            Open {container}
          </button>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: '100%', width: '100%'}}>
        <GameView viewBackground={iceRoomV1_bg} viewColorMap={iceRoomV1_colorMap} viewPathData={iceRoomV1_pathData}>
          <Link className='left-button' to='/page2' style={{zIndex:100}}>Left</Link>
          <Link className='right-button' to='/page3'>Right</Link>
        </GameView>
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


