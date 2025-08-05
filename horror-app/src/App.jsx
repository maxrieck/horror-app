import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { InventoryProvider, useInventory } from './context/InventoryContext';
import Inventory from './components/Inventory';
import PageContainer from './components/PageContainer';
import DraggableItem from './components/DraggableItem';

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
  const { state, dispatch } = useInventory();
  const [activeId, setActiveId] = useState(null);
  const [activeFrom, setActiveFrom] = useState(null);

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
      // target container id format: containerId:pageId
      const [containerId, pageId] = toId.split(':');
      to = { page: pageId, container: containerId };
    }

    dispatch({
      type: 'MOVE_ITEM',
      payload: { from, to, itemId: active.id },
    });
  }

  return (
    <>
      {/* Simple navigation */}
      <nav
        style={{
          padding: '1rem',
          borderBottom: '1px solid #ccc',
          marginBottom: '1rem',
          display: 'flex',
          gap: '1rem',
        }}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <Link key={num} to={`/page${num}`}>
            Page {num}
          </Link>
        ))}
      </nav>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Routes>
          {[1, 2, 3, 4, 5].map((num) => (
            <Route
              key={num}
              path={`/page${num}`}
              element={<PageContainer page={`page${num}`} />}
            />
          ))}
          <Route path="*" element={<div>Select a page above</div>} />
        </Routes>

        {/* Persistent Inventory at bottom */}
        <Inventory />

        {/* Drag Overlay to keep dragged item visible */}
        <DragOverlay>
          {activeId ? <DraggableItem id={activeId} from={activeFrom} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default App;

