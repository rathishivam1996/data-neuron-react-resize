import { useCallback, useEffect, useRef, useState } from "react";
import {
  Direction,
  HandleRefs,
  Position,
  ResizableDomEvents,
  ResizableEventType,
  ResizableRef,
  ResizableResult,
  ResizeCallback,
  ResizeEndCallback,
  ResizeStartCallback,
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
  startDirection: Direction | null;
  startPos: Position | null;
  startSize: Size | null;
};

export type UseResizeProps<Target extends Element = Element> = {
  disabled?: boolean;
  detect?: ResizableEventType;
  onResizeStart?: ResizeStartCallback<Target>;
  onResize?: ResizeCallback<Target>;
  onResizeEnd?: ResizeEndCallback<Target>;
  minSize?: Size;
  maxSize?: Size;
};

function useResize<Target extends Element = Element>({
  disabled = false,
  detect = ResizableEventType.Pointer,
  onResizeStart,
  onResize,
  onResizeEnd,
  minSize = {
    w: 0,
    h: 0,
  },
  maxSize = {
    w: Infinity,
    h: Infinity,
  },
}: UseResizeProps<Target>): ResizableResult<Target> {
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
    startDirection: null,
    startPos: null,
    startSize: null,
  };

  const [state, setState] = useState(initialState);

  const handlePointerDown = useCallback(
    (direction: Direction, event: ResizableDomEvents) => {
      const resizable = state.resizableRef?.current;
      const handle = state.handleRefs[direction]?.current;

      if (!isRecognisableEvent(event) || disabled || !resizable || !handle) {
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
        startDirection: direction,
        startPos: startPos,
        startSize: {
          w: width,
          h: height,
        },
      }));

      // Call the start callback with the latest state data
      if (onResizeStart) {
        onResizeStart({
          event: event,
          resizable: resizable,
          handle: handle,
          direction: direction,
          startSize: { w: width, h: height },
          startPos: startPos,
        });
      }
    },
    [
      onResizeStart,
      disabled,
      state.resizableRef,
      state.handleRefs,
      getCurrentPosition,
      getSize,
    ],
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
      const { isResizing, startDirection, startPos, startSize } = state;

      if (!isResizing || disabled || !startDirection || !startPos || !startSize)
        return;

      const resizable = state.resizableRef?.current;
      const handle = state.handleRefs[startDirection]?.current;

      if (!resizable || !handle) return;

      const newPosition = getCurrentPosition(event);

      if (!newPosition) {
        console.warn(
          "Invalid event type: Unable to get initial position from event",
        );
        return;
      }

      const { deltaX, deltaY } = calculateDeltas(startPos, newPosition);

      const newSize = calculateNewSize(
        startSize,
        startDirection,
        deltaX,
        deltaY,
      );

      onResize &&
        onResize({
          event,
          resizable,
          handle,
          direction: startDirection,
          startPos,
          startSize,
          delta: { deltaX, deltaY },
          currSize: newSize,
        });
    },
    [
      onResize,
      state,
      disabled,
      getCurrentPosition,
      calculateDeltas,
      calculateNewSize,
    ],
  );

  const handlePointerUp = useCallback(
    (event: ResizableDomEvents) => {
      const { isResizing, startDirection, startPos, startSize } = state;

      if (!isResizing || disabled || !startDirection || !startPos || !startSize)
        return;

      const resizable = state.resizableRef?.current;
      const handle = state.handleRefs[startDirection]?.current;

      if (!resizable || !handle) return;

      const newPosition = getCurrentPosition(event);

      if (!newPosition) {
        console.warn(
          "Invalid event type: Unable to get initial position from event",
        );
        return;
      }

      const { deltaX, deltaY } = calculateDeltas(startPos, newPosition);

      const newSize = calculateNewSize(
        startSize,
        startDirection,
        deltaX,
        deltaY,
      );

      onResizeEnd &&
        onResizeEnd({
          event,
          resizable,
          handle,
          direction: startDirection,
          startPos,
          startSize,
          delta: { deltaX, deltaY },
          currSize: newSize,
        });
    },
    [
      onResize,
      state,
      disabled,
      getCurrentPosition,
      calculateDeltas,
      calculateNewSize,
    ],
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
