import useResize from "./useResize";

import React, { useState } from "react";

const ResizeTest = () => {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);

  const onResizeStart = ({ direction, size, startPos }) => {
    console.log(
      `resize started direction: ${direction} size: ${JSON.stringify(size)} startPos: ${JSON.stringify(startPos)}`,
    );
  };

  const onResize = () => {
    // console.log(
    //   `resize direction: ${direction}, deltaX: ${deltaX}, deltaY: ${deltaY}, newWidth: ${newWidth}, newHeight: ${newHeight}`,
    // );
    // setWidth(newWidth);
    // setHeight(newHeight);

    console.log(`onResizeCallback called`);
  };

  const onResizeEnd = () => {
    console.log(`onResizeEndCallback called`);
  };

  const { resizableRef, top, right, bottom, left, isResizing } =
    useResize<HTMLDivElement>({
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
        ref={top}
        className="resize-handle n absolute left-0 top-0 h-[10px] w-full cursor-pointer bg-gray-500"
      ></div>

      <div
        ref={right}
        className="resize-handle e absolute right-0 top-0 h-full w-[10px] cursor-pointer bg-gray-500"
      ></div>

      <div
        ref={bottom}
        className="resize-handle s absolute bottom-0 left-0 h-[10px] w-full cursor-pointer bg-gray-500"
      ></div>

      <div
        ref={left}
        className="resize-handle w absolute left-0 top-0 h-full w-[10px] cursor-pointer bg-gray-500"
      ></div>
    </div>
  );
};

export default ResizeTest;
