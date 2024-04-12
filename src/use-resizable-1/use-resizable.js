import { useCallback, useMemo, useRef, useState } from "react";

const useResizable = ({
    axis,
    disabled = false,
    initial = 0,
    min = 0,
    max = Infinity,
    reverse,
    step = 10,
    shiftStep = 50,
    onResizeStart,
    onResizeEnd,
    containerRef,
  }) => {
    const initialPosition = Math.min(Math.max(initial, min), max);
    const isResizing = useRef(false);
    const [isDragging, setIsDragging] = useState(false);

    const [position, setPosition] = useState(initialPosition);
    const positionRef = useRef(initialPosition);
    const [endPosition, setEndPosition] = useState(initialPosition);

    const ariaProps = useMemo(
        () => ({
          role: 'separator',
          'aria-valuenow': position,
          'aria-valuemin': min,
          'aria-valuemax': max,
          'aria-orientation': axis === 'x' ? 'vertical' : 'horizontal',
          'aria-disabled': disabled,
        }),
        [axis, disabled, max, min, position],
      );

      const handlePointermove = useCallback(
        (e) => {
          if (!isResizing.current) return;
    
          if (disabled) return;
    
          e.stopPropagation();
          e.preventDefault(); // prevent text selection
    
          let currentPosition = (() => {
            if (axis === 'x') {
              if (containerRef?.current) {
                const containerNode = containerRef.current;
                const { left, width } = containerNode.getBoundingClientRect();
                return reverse ? left + width - e.clientX : e.clientX - left;
              }
              return reverse ? document.body.offsetWidth - e.clientX : e.clientX;
            }
            if (containerRef?.current) {
              const containerNode = containerRef.current;
              const { top, height } = containerNode.getBoundingClientRect();
              return reverse ? top + height - e.clientY : e.clientY - top;
            }
            return reverse ? document.body.offsetHeight - e.clientY : e.clientY;
          })();
    
          currentPosition = Math.min(Math.max(currentPosition, min), max);
          setPosition(currentPosition);
          positionRef.current = currentPosition;
        },
        [axis, disabled, max, min, reverse, containerRef],
      );

      const handlePointerup = useCallback(
        (e) => {
          if (disabled) return;
    
          e.stopPropagation();
          isResizing.current = false;
          setIsDragging(false);
          setEndPosition(positionRef.current);
          document.removeEventListener('pointermove', handlePointermove);
          document.removeEventListener('pointerup', handlePointerup);
          if (onResizeEnd) onResizeEnd({ position: positionRef.current });
        },
        [disabled, handlePointermove, onResizeEnd],
      );
    
      const handlePointerdown = useCallback(
        (e) => {
          if (disabled) return;
    
          e.stopPropagation();
          isResizing.current = true;
          setIsDragging(true);
          document.addEventListener('pointermove', handlePointermove);
          document.addEventListener('pointerup', handlePointerup);
          if (onResizeStart) onResizeStart({ position: positionRef.current });
        },
        [disabled, handlePointermove, handlePointerup, onResizeStart],
      );
    
  }