

export function inventoryReducer(state, action) {
  if (action.type !== 'MOVE_ITEM') return state;

  const { from, to, itemId } = action.payload;
  console.log('REDUCER MOVE_ITEM', { from, to, itemId });

  let newInventory = [...state.inventory];
  let newContainers = JSON.parse(JSON.stringify(state.containers));


  // logic for drain container
  if (itemId === 'carKeys' && to && typeof to === 'object' && to.page === 'page3' && to.container === 'drain') {
    if (from === 'inventory') {
      newInventory = newInventory.filter(id => id !== itemId);
    } else {
      newContainers[from.page][from.container] =
        newContainers[from.page][from.container].filter(id => id !== itemId);
    }
    newContainers.page3.drain = newContainers.page3.drain.filter(id => id !== 'carKeys');
    const newItems = { ...state.items, item2: { ...state.items.item2, status: true } };
    return { inventory: newInventory, containers: newContainers, items: newItems };
  }

  if (itemId === 'bucket' && to && typeof to === 'object' && to.page === 'page3' && to.container === 'drain') {
    if (from === 'inventory') {
      newInventory = newInventory.filter(id => id !== itemId);
    } else {
      newContainers[from.page][from.container] =
        newContainers[from.page][from.container].filter(id => id !== itemId);
    }
    const bucketStatus = state.items.item2.status;
    if (bucketStatus) {
      if (!newInventory.includes('scalpel')) newInventory.push('scalpel');
      newContainers.page3.drain = newContainers.page3.drain.filter(id => id !== 'bucket');
      return { inventory: newInventory, containers: newContainers, items: state.items };
    }
    if (!newContainers.page3.drain.includes('bucket')) newContainers.page3.drain.push('bucket');
    return { inventory: newInventory, containers: newContainers, items: state.items };
  }

  // logic for card reader container
  if (itemId === 'scalpel' && to && typeof to === 'object' && to.page === 'page4' && to.container === 'cardReader') {
    if (from === 'inventory') {
      newInventory = newInventory.filter(id => id !== itemId);
    } else {
      newContainers[from.page][from.container] =
        newContainers[from.page][from.container].filter(id => id !== itemId);
    }
    const newItems = { ...state.items, item3: { ...state.items.item3, status: true } };
    return { inventory: newInventory, containers: newContainers, items: newItems };
  }

  if (itemId === 'keycard' && to && typeof to === 'object' && to.page === 'page4' && to.container === 'cardReader') {
    const scalpalStatus = state.items.item3.status;
    if (scalpalStatus) {
      if (from === 'inventory') {
        newInventory = newInventory.filter(id => id !== itemId);
      } else {
        newContainers[from.page][from.container] =
          newContainers[from.page][from.container].filter(id => id !== itemId);
      }
      newContainers.page4.cardReader = newContainers.page4.cardReader.filter(id => id !== 'keycard');
      return { inventory: newInventory, containers: newContainers, items: state.items };
    }
  }

  // logic for freezer1 container
  if (itemId === 'lighter' && to && typeof to === 'object' && to.page === 'page1' && to.container === 'freezer1') {
    if (from === 'inventory') {
      newInventory = newInventory.filter(id => id !== itemId);
    } else {
      newContainers[from.page][from.container] =
        newContainers[from.page][from.container].filter(id => id !== itemId);
    }
    newContainers.page1.freezer1 = newContainers.page1.freezer1.filter(id => id !== 'lighter');
    const newItems = { ...state.items, item9: { ...state.items.item9, status: true } };
    return { inventory: newInventory, containers: newContainers, items: newItems };
  }

  
  // logic for computer container
  if (itemId === 'flashdrive' && to && typeof to === 'object' && to.page === 'page7' && to.container === 'computer') {
    
    if (from === 'inventory') {
      newInventory = newInventory.filter(id => id !== itemId);
    } else {
      newContainers[from.page][from.container] =
        newContainers[from.page][from.container].filter(id => id !== itemId);
    }
    
    newContainers[to.page][to.container] =
      (newContainers[to.page][to.container] || []).filter(id => id !== itemId);
    return { inventory: newInventory, containers: newContainers, items: state.items };
  }

  // logic for elevator doors container
  if (itemId === 'crowbar' && to && typeof to === 'object' && to.page === 'page9' && to.container === 'elevatorDoors') {
    if (from === 'inventory') {
      newInventory = newInventory.filter(id => id !== itemId);
    } else {
      newContainers[from.page][from.container] =
        newContainers[from.page][from.container].filter(id => id !== itemId);
    }
    newContainers.page9.elevatorDoors = newContainers.page9.elevatorDoors.filter(id => id !== 'crowbar');
    const newItems = { ...state.items, item8: { ...state.items.item8, status: true } };
    return { inventory: newInventory, containers: newContainers, items: newItems };
  }

  // logic for elevator panel container
  if (itemId === 'elevatorKey' && to && typeof to === 'object' && to.page === 'page10' && to.container === 'elevatorPanel') {
    if (from === 'inventory') {
      newInventory = newInventory.filter(id => id !== itemId);
    } else {
      newContainers[from.page][from.container] =
        newContainers[from.page][from.container].filter(id => id !== itemId);
    }
    newContainers.page10.elevatorPanel = newContainers.page10.elevatorPanel.filter(id => id !== 'elevatorKey');
    const newItems = { ...state.items, item10: { ...state.items.item10, status: true } };
    return { inventory: newInventory, containers: newContainers, items: newItems };
  }

  // remove from source
  if (from === 'inventory') {
    newInventory = newInventory.filter(id => id !== itemId);
  } else {
    newContainers[from.page][from.container] =
      newContainers[from.page][from.container].filter(id => id !== itemId);
  }

  // add to destination
  if (to === 'inventory') {
    if (!newInventory.includes(itemId)) newInventory.push(itemId);
  } else {
    newContainers[to.page][to.container] =
      newContainers[to.page][to.container] || [];
    if (!newContainers[to.page][to.container].includes(itemId)) {
      newContainers[to.page][to.container].push(itemId);
    }
  }

  return { inventory: newInventory, containers: newContainers, items: state.items };
}




