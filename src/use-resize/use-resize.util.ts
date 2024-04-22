import { ResizableDomEvents } from "./use-resize.types";

// utils.ts
type ElementInput<Target extends Element> = Target | React.RefObject<Target>;

export function getSize<Target extends Element>(
  elementInput: ElementInput<Target>,
): DOMRect | undefined {
  const element =
    "current" in elementInput ? elementInput.current : elementInput;

  return element?.getBoundingClientRect();
}

export function isTouchEvent(event: Event): event is TouchEvent {
  return "touches" in event;
}

export function isMouseEvent(event: Event): event is MouseEvent {
  return event instanceof MouseEvent;
}

export function isPointerEvent(event: Event): event is PointerEvent {
  return event instanceof PointerEvent;
}

export function isRecognisableEvent(event: Event): event is ResizableDomEvents {
  return isMouseEvent(event) || isTouchEvent(event) || isPointerEvent(event);
}

export function getCurrentPosition(
  event: MouseEvent | TouchEvent | PointerEvent,
): { x: number; y: number } | null {
  if (isTouchEvent(event)) {
    return {
      x: event.touches[0].pageX,
      y: event.touches[0].pageY,
    };
  }

  if (isMouseEvent(event) || isPointerEvent(event)) {
    return {
      x: event.pageX,
      y: event.pageY,
    };
  }

  return null;
}

// export const calculateDirectionAndDelta = (event, initialPos) => {
//   if (!initialPos) return null;

//   const deltaX = event.clientX - initialPos.x;
//   const deltaY = event.clientY - initialPos.y;

//   // Calculate resize direction
//   let direction;

//   if (Math.abs(deltaX) >= Math.abs(deltaY)) {
//     // Horizontal resize
//     if (deltaX > 0) {
//       direction = "east";
//     } else {
//       direction = "west";
//     }
//   } else {
//     // Vertical resize
//     if (deltaY > 0) {
//       direction = "south";
//     } else {
//       direction = "north";
//     }
//   }

//   // Handle edge cases for diagonal directions (optional)
//   if (Math.abs(deltaX) > 0 && Math.abs(deltaY) > 0) {
//     if (deltaX > 0 && deltaY > 0) {
//       direction = "southeast";
//     } else if (deltaX < 0 && deltaY > 0) {
//       direction = "southwest";
//     } else if (deltaX > 0 && deltaY < 0) {
//       direction = "northeast";
//     } else {
//       direction = "northwest";
//     }
//   }

//   return { direction, deltaX, deltaY };
// };

// // resizeUtils.js

// export const calculateResizeDirectionAndDelta = (initialDirection, deltaX, deltaY) => {
//   let direction;
//   let deltaWidth = 0;
//   let deltaHeight = 0;

//   switch (initialDirection) {
//     case "north":
//       direction = "north";
//       deltaHeight = -deltaY;
//       break;
//     case "northeast":
//       direction = deltaX > 0 ? "east" : "north";
//       deltaWidth = deltaX;
//       deltaHeight = deltaX > 0 ? -deltaY : -deltaX;
//       break;
//     case "east":
//       direction = "east";
//       deltaWidth = deltaX;
//       break;
//     case "southeast":
//       direction = deltaX > 0 ? "east" : "south";
//       deltaWidth = deltaX;
//       deltaHeight = deltaX > 0 ? deltaY : -deltaX;
//       break;
//     case "south":
//       direction = "south";
//       deltaHeight = deltaY;
//       break;
//     case "southwest":
//       direction = deltaX < 0 ? "west" : "south";
//       deltaWidth = -deltaX;
//       deltaHeight = deltaX < 0 ? deltaY : deltaX;
//       break;
//     case "west":
//       direction = "west";
//       deltaWidth = -deltaX;
//       break;
//     case "northwest":
//       direction = deltaX < 0 ? "west" : "north";
//       deltaWidth = -deltaX;
//       deltaHeight = deltaX < 0 ? -deltaY : -deltaX;
//       break;
//     default:
//       break;
//   }

//   return { direction, deltaWidth, deltaHeight };
// };

// export const calculateResizeDirectionAndDelta = (initialDirection, deltaX, deltaY) => {
//   let direction;
//   let newDeltaX = deltaX;
//   let newDeltaY = deltaY;

//   switch (initialDirection) {
//     case "north":
//       direction = deltaY < 0 ? "north" : "south";
//       newDeltaY = Math.abs(deltaY);
//       break;
//     case "northeast":
//       if (deltaX < 0) {
//         direction = "northwest";
//         newDeltaX = Math.abs(deltaX);
//       } else {
//         direction = "southeast";
//       }
//       newDeltaY = Math.abs(deltaY);
//       break;
//     case "east":
//       direction = deltaX < 0 ? "west" : "east";
//       newDeltaX = Math.abs(deltaX);
//       break;
//     case "southeast":
//       if (deltaX < 0) {
//         direction = "southwest";
//         newDeltaX = Math.abs(deltaX);
//       } else {
//         direction = "northeast";
//       }
//       newDeltaY = Math.abs(deltaY);
//       break;
//     case "south":
//       direction = deltaY < 0 ? "north" : "south";
//       newDeltaY = Math.abs(deltaY);
//       break;
//     case "southwest":
//       if (deltaX < 0) {
//         direction = "southeast";
//         newDeltaX = Math.abs(deltaX);
//       } else {
//         direction = "northwest";
//       }
//       newDeltaY = Math.abs(deltaY);
//       break;
//     case "west":
//       direction = deltaX < 0 ? "east" : "west";
//       newDeltaX = Math.abs(deltaX);
//       break;
//     case "northwest":
//       if (deltaX < 0) {
//         direction = "northeast";
//         newDeltaX = Math.abs(deltaX);
//       } else {
//         direction = "southwest";
//       }
//       newDeltaY = Math.abs(deltaY);
//       break;
//     default:
//       direction = "unknown";
//   }

//   return { direction, deltaX: newDeltaX, deltaY: newDeltaY };
// };
