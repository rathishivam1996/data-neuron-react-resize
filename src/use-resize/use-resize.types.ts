import {
  MouseEvent as ReactMouseEvent,
  MouseEventHandler,
  PointerEvent as ReactPointerEvent,
  PointerEventHandler,
  TouchEvent as ReactTouchEvent,
  TouchEventHandler,
} from "react";

export enum ResizableEventType {
  Mouse = "mouse",
  Touch = "touch",
  Pointer = "pointer",
}

export type ResizableResult<
  T extends ResizableHandlers<Target> | ResizableEmptyHandlers,
  Target extends Element = Element,
> = T;

export type ResizableDomEvents = MouseEvent | TouchEvent | PointerEvent;
export type ResizableReactEvents<Target extends Element = Element> =
  | ReactMouseEvent<Target>
  | ReactTouchEvent<Target>
  | ReactPointerEvent<Target>;

export type ResizableEmptyHandlers = Record<never, never>;

export interface ResizableMouseHandlers<Target extends Element = Element> {
  onMouseDown: MouseEventHandler<Target>;
  onMouseMove: MouseEventHandler<Target>;
  onMouseUp: MouseEventHandler<Target>;
  onMouseLeave?: MouseEventHandler<Target>;
}
export interface ResizableTouchHandlers<Target extends Element = Element> {
  onTouchStart: TouchEventHandler<Target>;
  onTouchMove: TouchEventHandler<Target>;
  onTouchEnd: TouchEventHandler<Target>;
}

export interface ResizablePointerHandlers<Target extends Element = Element> {
  onPointerDown: PointerEventHandler<Target>;
  onPointerMove: PointerEventHandler<Target>;
  onPointerUp: PointerEventHandler<Target>;
  onPointerLeave?: PointerEventHandler<Target>;
}

export type ResizableHandlers<Target extends Element = Element> =
  | ResizableMouseHandlers<Target>
  | ResizableTouchHandlers<Target>
  | ResizablePointerHandlers<Target>
  | ResizableEmptyHandlers;
