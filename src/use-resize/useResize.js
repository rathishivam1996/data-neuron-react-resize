import { useCallback, useEffect, useRef, useState } from "react";
import { calculateDirectionAndDelta } from "./use-resize.util";

const useResize = ({ onResizeStart, onResize, onResizeEnd }) => {
  const initialRef = useRef({ x: 0, y: 0 });

  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback(
    (event) => {
      setIsResizing(true);

      const { clientX, clientY } = event;
      initialRef.current = {
        x: clientX,
        y: clientY,
      };
      console.log(
        `MouseDown handle initialPos At x: ${initialRef.current.x}, y: ${initialRef.current.y}`,
      );

      onResizeStart && onResizeStart();
    },
    [onResizeStart],
  );

  const handleMouseMove = useCallback(
    (event) => {
      console.log(isResizing);
      if (!isResizing) return;
      const { direction, deltaX, deltaY } = calculateDirectionAndDelta(
        event,
        initialRef,
      );

      onResize &&
        onResize({
          direction,
          deltaX,
          deltaY,
        });
    },
    [onResize, isResizing],
  );

  const handleMouseUp = useCallback(
    (event) => {
      console.log(
        `MouseUp - end of resize clientX: ${event.clientX}, clientY: ${event.clientY}`,
      );
      setIsResizing(false);

      onResizeEnd && onResizeEnd();
    },
    [onResizeEnd],
  );

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("pointermove", handleMouseMove);
      document.addEventListener("pointerup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("pointermove", handleMouseMove);
      document.removeEventListener("pointerup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, isResizing]);

  return {
    isResizing,
    onPointerDown: handleMouseDown,
  };
};

export default useResize;
