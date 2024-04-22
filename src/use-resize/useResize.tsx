import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ResizableDomEvents,
  ResizableEventType,
  ResizableHandlers,
  ResizableResult,
} from "./use-resize.types";
import {
  getCurrentPosition,
  getSize,
  isRecognisableEvent,
} from "./use-resize.util";

type HandleRefs<Target extends Element> = {
  top: React.RefObject<Target>;
  topright: React.RefObject<Target>;
  right: React.RefObject<Target>;
  bottomright: React.RefObject<Target>;
  bottom: React.RefObject<Target>;
  bottomleft: React.RefObject<Target>;
  left: React.RefObject<Target>;
  topleft: React.RefObject<Target>;
};

type Position = {
  x: number;
  y: number;
};

type Size = {
  w: number;
  h: number;
};

type Direction =
  | "top"
  | "topright"
  | "right"
  | "bottomright"
  | "bottom"
  | "bottomleft"
  | "left"
  | "topleft";

type ResizableState<Target extends Element> = {
  resizableRef: RefObject<Target>;
  handleRefs: HandleRefs<Target>;
  isResizing: boolean;
  initialDirection: Direction | null;
  startPos: Position | null;
  initialSize: Size | null;
};

function useResize<Target extends Element = Element>({
  detect = ResizableEventType.Pointer,
  onResizeStart,
  onResize,
  onResizeEnd,
}): ResizableResult<ResizableHandlers<Target>> {
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
      if (!isRecognisableEvent(event)) {
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
    },
    [onResizeStart],
  );

  useEffect(() => {
    if (state.isResizing && onResizeStart) {
      onResizeStart({
        direction: state.initialDirection,
        size: state.initialSize,
        startPos: state.startPos,
      });
    }
  }, [
    state.isResizing,
    state.initialDirection,
    state.initialSize,
    onResizeStart,
  ]);

  const handlePointerMove = useCallback(
    (event) => {
      if (!state.isResizing) return;

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

    Object.keys(state.handleRefs).forEach((direction) => {
      const ref = state.handleRefs[direction as Direction].current;

      if (ref) {
        const handleEventDownDirection = (event: ResizableDomEvents) =>
          handlePointerDown(direction as Direction, event);

        // Attach down event listeners
        eventTypes.forEach((eventType) => {
          window.addEventListener(eventType, handleEventDownDirection);
          // Remove down event listeners
          eventListeners.push(() =>
            window.removeEventListener(eventType, handleEventDownDirection),
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
    console.log(`move effect rinning`);
    if (state.isResizing && window) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      console.log(`move effect cleanup`);
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
