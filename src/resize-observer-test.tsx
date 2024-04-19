import React, { useRef } from "react";
import useResizeObserver from "./useResizeObserver";

const ResizeObserverTest = () => {
  const ref1 = useRef<HTMLDivElement>(null);

  const ref2 = useRef<HTMLDivElement>(null);

  useResizeObserver(ref1, (entry, observer) => {
    console.log(`clb 1`);
    console.log(entry.contentRect);
  });

  useResizeObserver(ref1, (entry, observer) => {
    console.log(`clb 2`);
    console.log(entry.contentRect);
  });

  useResizeObserver(ref2, (entry, observer) => {
    console.log(`clb 3`);
    console.log(entry.contentRect);
  });

  return (
    <>
      <div
        ref={ref1}
        className="h-[200px] w-[50%] bg-red-300 hover:h-4 hover:w-4"
      >
        ResizeObserverTest
      </div>

      <div
        ref={ref2}
        className="mt-10 h-[200px] w-[50%] bg-red-300 hover:h-[250px] hover:w-[250px]"
      >
        ResizeObserverTest
      </div>
    </>
  );
};

export default ResizeObserverTest;
