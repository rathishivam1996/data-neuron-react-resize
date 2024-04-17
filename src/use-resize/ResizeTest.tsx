import useResize from "./useResize";

import React from "react";

const ResizeTest = () => {
  const onResizeStart = () => {
    console.log(`resize started`);
  };
  const onResize = ({ direction, deltaX, deltaY }) => {
    console.log(
      `resize direction: ${direction}, deltaX: ${deltaX}, deltaY: ${deltaY}`,
    );
  };
  const onResizeEnd = () => {
    console.log(`resize ended`);
  };

  const { onPointerDown } = useResize({
    onResizeStart,
    onResize,
    onResizeEnd,
  });

  return (
    <div className="resizable-box relative h-[200px] w-[200px] bg-red-300">
      <div
        onPointerDown={onPointerDown}
        className="resize-handle n absolute left-0 top-0 h-[10px] w-full cursor-pointer bg-gray-500"
      ></div>
      <div
        onPointerDown={onPointerDown}
        className="resize-handle e absolute right-0 top-0 h-full w-[10px] cursor-pointer bg-gray-500"
      ></div>
      <div
        onPointerDown={onPointerDown}
        className="resize-handle s absolute bottom-0 left-0 h-[10px] w-full cursor-pointer bg-gray-500"
      ></div>
      <div
        onPointerDown={onPointerDown}
        className="resize-handle w absolute left-0 top-0 h-full w-[10px] cursor-pointer bg-gray-500"
      ></div>
    </div>
  );
};

export default ResizeTest;
