export const calculateDirectionAndDelta = (event, initialRef) => {
  if (!initialRef) return null;

  const deltaX = event.clientX - initialRef.current.x;
  const deltaY = event.clientY - initialRef.current.y;

  // Calculate resize direction
  let direction;
  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    direction = deltaX > 0 ? "east" : "west";
  } else {
    direction = deltaY > 0 ? "south" : "north";
  }

  // Handle edge cases for diagonal directions (optional)
  if (Math.abs(deltaX) > 0 && Math.abs(deltaY) > 0) {
    if (deltaX > 0 && deltaY > 0) {
      direction = "southeast";
    } else if (deltaX < 0 && deltaY > 0) {
      direction = "southwest";
    } else if (deltaX > 0 && deltaY < 0) {
      direction = "northeast";
    } else {
      direction = "northwest";
    }
  }

  console.log(direction, deltaX, deltaY);
  return { direction, deltaX, deltaY };
};
