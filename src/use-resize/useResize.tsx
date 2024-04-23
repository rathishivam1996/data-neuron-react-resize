import { useCallback, useEffect, useRef, useState } from "react";
import {
  Direction,
  HandleRefs,
  Position,
  ResizableDomEvents,
  ResizableEventType,
  ResizableRef,
  ResizableResult,
  Size,
} from "./use-resize.types";
import {
  calculateDeltas,
  calculateNewSize,
  getCurrentPosition,
  getSize,
  isRecognisableEvent,
} from "./use-resize.util";

type ResizableState<Target extends Element> = {
  resizableRef: ResizableRef<Target>;
  handleRefs: HandleRefs<Target>;
  isResizing: boolean;
  initialDirection: Direction | null;
  startPos: Position | null;
  initialSize: Size | null;
};

function useResize<Target extends Element = Element>({
  disabled = false,
  detect = ResizableEventType.Pointer,
  onResizeStart,
  onResize,
  onResizeEnd,
}): ResizableResult<Target> {
  const initialState: ResizableState<Target> = {
    resizableRef: useRef(null),
    handleRefs: {
      top: useRef(null),
      topright: useRef(null),
      right: useRef(null),
      bottomright: useRef(null),
      bottom: useRef(null),
      bottomleft: useRef(null),
      left: useRef(null),
      topleft: useRef(null),
    },
    isResizing: false,
    initialDirection: null,
    startPos: null,
    initialSize: null,
  };

  const [state, setState] = useState(initialState);

  const handlePointerDown = useCallback(
    (direction: Direction, event: ResizableDomEvents) => {
      // Ignore unrecognised events
      if (!isRecognisableEvent(event) || disabled) {
        return;
      }
      const rect: DOMRect | undefined = getSize(state.resizableRef);
      const startPos = getCurrentPosition(event);

      if (!rect) {
        console.warn(
          "Invalid resizableRef: expected an HTMLElement or a RefObject.",
        );
        return;
      }

      if (!startPos) {
        console.warn(
          "Invalid event type: Unable to get initail position from event",
        );
        return;
      }

      const { width, height } = rect;

      setState((prevState) => ({
        ...prevState,
        isResizing: true,
        initialDirection: direction,
        startPos: startPos,
        initialSize: {
          w: width,
          h: height,
        },
      }));

      // Call the start callback with the latest state data
      if (onResizeStart) {
        onResizeStart({
          direction: direction,
          size: { w: width, h: height },
          startPos: startPos,
        });
      }
    },
    [onResizeStart],
  );

  // useEffect(() => {
  //   if (state.isResizing && onResizeStart) {
  //     onResizeStart({
  //       direction: state.initialDirection,
  //       size: state.initialSize,
  //       startPos: state.startPos,
  //     });
  //   }
  // }, [
  //   state.isResizing,
  //   state.initialDirection,
  //   state.initialSize,
  //   onResizeStart,
  // ]);

  const handlePointerMove = useCallback(
    (event: ResizableDomEvents) => {
      if (
        disabled ||
        !state.isResizing ||
        !state.startPos ||
        !state.initialSize ||
        !state.initialDirection
      )
        return;

      const newPosition = getCurrentPosition(event);

      if (!newPosition) {
        console.warn(
          "Invalid event type: Unable to get initail position from event",
        );
        return;
      }

      const { deltaX, deltaY } = calculateDeltas(state.startPos, newPosition);

      const newSize = calculateNewSize(
        state.initialSize,
        state.initialDirection,
        deltaX,
        deltaY,
      );

      console.log(newSize);

      onResize && onResize();
    },
    [onResize, state],
  );

  const handlePointerUp = useCallback(
    (event) => {
      setState((prevState) => {
        return {
          ...prevState,
          isResizing: false,
        };
      });

      onResizeEnd && onResizeEnd();
    },
    [onResizeEnd],
  );

  const eventTypes = ["pointerdown", "mousedown", "touchstart"] as const;

  // effect for down listeners
  useEffect(() => {
    // Do nothing if SSR
    if (typeof window === "undefined") return;

    const eventListeners: Array<() => void> = [];

    Object.keys(state.handleRefs).forEach((key) => {
      const direction = key as Direction;
      const ref = state.handleRefs[direction]?.current;

      if (ref) {
        const handleEventDownDirection = (event: Event) => {
          if (isRecognisableEvent(event)) {
            handlePointerDown(direction, event);
          }
        };

        // Attach down event listeners
        eventTypes.forEach((eventType) => {
          ref.addEventListener(eventType, handleEventDownDirection);

          // Remove down event listeners
          eventListeners.push(() =>
            ref.removeEventListener(eventType, handleEventDownDirection),
          );
        });
      }
    });

    return () => {
      eventListeners.forEach((removeListener) => removeListener());
    };
  }, [handlePointerDown, state.handleRefs]);

  // effect for move and up listeners
  useEffect(() => {
    if (state.isResizing && window) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp, state.isResizing]);

  return {
    resizableRef: state.resizableRef,
    ...state.handleRefs,
    isResizing: state.isResizing,
  };
}

export default useResize;
