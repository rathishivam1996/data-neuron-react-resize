import { useEffect, useRef } from "react";

function useLatest<T extends any>(current: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = current;
  });

  return ref;
}

export default useLatest;
