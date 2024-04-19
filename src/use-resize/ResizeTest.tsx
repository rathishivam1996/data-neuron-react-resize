import useResize from "./useResize";

import React, { useState } from "react";

const ResizeTest = () => {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);

  const onResizeStart = ({ direction, size }) => {
    console.log(
      `resize started direction: ${direction} size: ${JSON.stringify(size)}`,
    );
  };

  const onResize = ({ direction, deltaX, deltaY, newWidth, newHeight }) => {
    console.log(
      `resize direction: ${direction}, deltaX: ${deltaX}, deltaY: ${deltaY}, newWidth: ${newWidth}, newHeight: ${newHeight}`,
    );
    setWidth(newWidth);
    setHeight(newHeight);
  };
  const onResizeEnd = () => {
    console.log(`resize ended`);
  };

  const { resizableRef, north, east, south, west, isResizing } = useResize({
    onResizeStart,
    onResize,
    onResizeEnd,
  });

  return (
    <div
      ref={resizableRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="resizable-box relative bg-red-300"
    >
      <div
        ref={north}
        className="resize-handle n absolute left-0 top-0 h-[10px] w-full cursor-pointer bg-gray-500"
      ></div>

      <div
        ref={east}
        className="resize-handle e absolute right-0 top-0 h-full w-[10px] cursor-pointer bg-gray-500"
      ></div>

      <div
        ref={south}
        className="resize-handle s absolute bottom-0 left-0 h-[10px] w-full cursor-pointer bg-gray-500"
      ></div>

      <div
        ref={west}
        className="resize-handle w absolute left-0 top-0 h-full w-[10px] cursor-pointer bg-gray-500"
      ></div>
    </div>
  );
};

export default ResizeTest;
