import React from "react";

const Test = () => {
  
  return (
    <div className="resizable-box relative h-[200px] w-[200px] bg-red-300">
      <div className="resize-handle n absolute left-0 top-0 h-[10px] w-full cursor-pointer bg-gray-500"></div>
      <div className="resize-handle e absolute right-0 top-0 h-full w-[10px] cursor-pointer bg-gray-500"></div>
      <div className="resize-handle s absolute bottom-0 left-0 h-[10px] w-full cursor-pointer bg-gray-500"></div>
      <div className="resize-handle w absolute left-0 top-0 h-full w-[10px] cursor-pointer bg-gray-500"></div>
    </div>
  );
};

export default Test;
