/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
import { ResizableBox } from 'react-resizable';
import Card from './card';
import './resizable-window.css';

const MyHandle = forwardRef((props, ref) => {
  const { handleAxis, ...restProps } = props;
  return (
    <div
      ref={ref}
      className={`react-resizable-handle handle-${handleAxis}`}
      {...restProps}
    />
  );
});

MyHandle.displayName = 'MyHandle';

const ResizableWindow = () => {
  return (
    <ResizableBox
      handle={<MyHandle />}
      className="resizable-window"
      width={500}
      height={500}
    >
      <Card />
    </ResizableBox>
  );
};

export default ResizableWindow;
