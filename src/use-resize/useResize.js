import { useCallback, useEffect, useRef, useState } from "react";
// import { calculateDirectionAndDelta } from "./use-resize.util";F
import useResizeObserver from "../useResizeObserver";

const useResize = ({ onResizeStart, onResize, onResizeEnd }) => {
  const [isResizing, setIsResizing] = useState(false);

  const resizableRef = useRef(null);
  const handleRefs = useRef({
    north: useRef(null),
    northeast: useRef(null),
    east: useRef(null),
    southeast: useRef(null),
    south: useRef(null),
    southwest: useRef(null),
    west: useRef(null),
    northwest: useRef(null),
  });

  const initialDirection = useRef(null);
  const initialPosRef = useRef({ x: 0, y: 0 });
  const initialSizeRef = useRef({ w: 0, h: 0 });
  const currentSizeRef = useRef({ w: 0, h: 0 });

  useResizeObserver(resizableRef, (target) => {
    const { contentRect } = target;
    currentSizeRef.current = {
      w: contentRect.width,
      h: contentRect.height,
    };
  });

  const handlePointerDown = useCallback(
    (direction, event) => {
      setIsResizing(true);
      initialDirection.current = direction;

      const { clientX, clientY } = event;
      initialPosRef.current = {
        x: clientX,
        y: clientY,
      };

      initialSizeRef.current = currentSizeRef.current;
      onResizeStart &&
        onResizeStart({
          direction: initialDirection.current,
          size: initialSizeRef.current,
        });
    },
    [onResizeStart],
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (!isResizing) return;

      onResize && onResize();
    },
    [onResize, isResizing],
  );

  const handlePointerUp = useCallback(
    (event) => {
      setIsResizing(false);

      onResizeEnd && onResizeEnd();
    },
    [onResizeEnd],
  );

  useEffect(() => {
    const eventListeners = [];

    Object.keys(handleRefs.current).forEach((direction) => {
      const ref = handleRefs.current[direction].current;

      if (ref) {
        // attach
        ref.addEventListener("pointerdown", (event) =>
          handlePointerDown(direction, event),
        );

        // remove
        eventListeners.push(() =>
          ref.removeEventListener("pointerdown", handlePointerDown),
        );
      }
    });

    return () => {
      eventListeners.forEach((removeListener) => removeListener());
    };
  }, [handlePointerDown]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp, isResizing]);

  return {
    resizableRef,
    ...handleRefs.current,
    isResizing,
  };
};

export default useResize;
