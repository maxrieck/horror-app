

export function inventoryReducer(state, action) {
  if (action.type !== 'MOVE_ITEM') return state;

  const { from, to, itemId } = action.payload;
  console.log('REDUCER MOVE_ITEM', { from, to, itemId });

  let newInventory = [...state.inventory];
  let newContainers = JSON.parse(JSON.stringify(state.containers));

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

  return { inventory: newInventory, containers: newContainers, items: state.items, };
}




