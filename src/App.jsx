import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { DndContext, DragOverlay, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { InventoryProvider, useInventory } from './context/InventoryContext';
import Inventory from './components/Inventory';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import Page6 from './pages/Page6';
import Page7 from './pages/Page7';
import SplashPage from './pages/Splash'; 
import Login from './users/Login';
import Signup from './users/Signup'; 
import DraggableItem from './components/DraggableItem';
import Page8 from './pages/Page8';
import Page9 from './pages/Page9';
import Page10 from './pages/page10';
import IceRoomV1 from './assets/IceRoomV1.jsx';

function App() {
  return (
    <InventoryProvider>
      <Router>
        <Main />
      </Router>
    </InventoryProvider>
  );
}

function Main() {

  const navigate = useNavigate(); 
  // init dndkit sensors to add controls for mobile touch
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor)
  const keyboardSensor = useSensor(KeyboardSensor)
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

  const { dispatch } = useInventory();
  const [activeId, setActiveId] = useState(null);
  const [activeFrom, setActiveFrom] = useState(null);
  const location = useLocation(); 
  const hideGlobalUI = ["/", "/login", "/signup"].includes(location.pathname);

  function handleDragStart({ active }) {
    setActiveId(active.id);
    setActiveFrom(active.data.current.from);
  }

  function handleDragEnd({ active, over }) {
    setActiveId(null);
    setActiveFrom(null);

    if (!over || active.id === over.id) return;

    // Determine source and destination
    const from = active.data.current.from;
    const toId = over.id;

    let to;
    if (toId === 'inventory') {
      to = 'inventory';
    } else {
      const [containerId, pageId] = toId.split(':');
      to = { page: pageId, container: containerId };
    }

    // Prevents item from moving if only clicked and not moved
    // This will work so long as both to and from maintain {page: pID, container: cID} structure
    if (JSON.stringify(from) === JSON.stringify(to)) return;

    dispatch({
      type: 'MOVE_ITEM',
      payload: { from, to, itemId: active.id },
    });
  }

  return (
    <>

      {/* Simple navigation for testing purposes. Will remove with final version. Rendering if splash page is left first.*/}
      {!hideGlobalUI && (
        <nav
          style={{
            padding: '1rem',
            borderBottom: '1px solid #ccc',
            marginBottom: '1rem',
            display: 'flex',
            gap: '1rem',
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <Link key={num} to={`/page${num}`}>
              Page {num}
            </Link>
          ))}
          <Link to={'/iceRoom'}>IceRoomV1</Link>
        </nav>
      )}
      

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
        <Routes>
          <Route path="/" element={
            <SplashPage 
              onLogin={() => navigate("/login")}
              onSignup={() => navigate("/signup")}
              onGuest={() => navigate("/page1")} 
            />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}/> 
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/page5" element={<Page5 />} />
          <Route path="/page6" element={<Page6 />} />
          <Route path="/page7" element={<Page7 />} />
          <Route path="/page8" element={<Page8 />} />
          <Route path="/page9" element={<Page9 />} />
          <Route path="/page10" element={<Page10 />} />
          <Route path="/iceRoom" element={<IceRoomV1 />} />
          <Route path="*" element={<div>Select a page above **INSERT SPLASH PAGE / LOGIN</div>} />
        </Routes>

        {/* Persistent Inventory at bottom */}
        {!hideGlobalUI && <Inventory />}

        {/* Drag Overlay to keep dragged item visible */}
        <DragOverlay style={{ zIndex: 9999 }}>
          {activeId ? <DraggableItem id={activeId} from={activeFrom} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default App;

