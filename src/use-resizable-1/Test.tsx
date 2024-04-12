import React from 'react';

const Test = () => {
  return (
    <div className="resizable-box w-[200px] h-[200px] relative bg-red-300">
      <div className="resize-handle n bg-gray-500 w-full h-[10px] top-0 left-0 absolute cursor-pointer"></div>
      <div className="resize-handle e bg-gray-500 h-full w-[10px] top-0 right-0 absolute cursor-pointer"></div>
      <div className="resize-handle s bg-gray-500 w-full h-[10px] bottom-0 left-0 absolute cursor-pointer"></div>
      <div className="resize-handle w bg-gray-500 h-full w-[10px] top-0 left-0 absolute cursor-pointer"></div>
    </div>
  );
};

export default Test;
