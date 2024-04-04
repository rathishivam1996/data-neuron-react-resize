import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import "./test.css";

const Resizable = () => {
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(200);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const resizableRef = useRef(null);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  useLayoutEffect(() => {
    if (resizableRef.current) {
      const measure = () => {
        setHeight(resizableRef.current.getBoundingClientRect().height);
        setWidth(resizableRef.current.getBoundingClientRect().width);
      };

      window.addEventListener("resize", measure);

      return () => {
        window.removeEventListener("resize", measure);
      };
    }
  }, [resizableRef]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const newWidth = width + (e.clientX - startX);
    const newHeight = height + (e.clientY - startY);
    setHeight(newHeight);
    setWidth(newWidth);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const handles = document.querySelectorAll(".handle");
    handles.forEach((handle) => {
      handle.addEventListener("mousedown", handleMouseDown);
    });
    return () => {
      handles.forEach((handle) => {
        handle.removeEventListener("mousedown", handleMouseDown);
      });
    };
  }, []);

  return (
    <div
      ref={measuredRef}
      className="resizable"
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <div className="handle handle-n"></div>
      <div className="handle handle-e"></div>
      <div className="handle handle-s"></div>
      <div className="handle handle-w"></div>
    </div>
  );
};

export default Resizable;
