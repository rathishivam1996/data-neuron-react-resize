import { ResizableBox } from "react-resizable";
import "./resizable.css";

const Resizable = () => (
  <div className="resizable-wrapper">
    <ResizableBox width={200} height={200}>
      <div className="resizable-item">Component 1</div>
    </ResizableBox>
    <ResizableBox width={200} height={200}>
      <div className="resizable-item">Component 2</div>
    </ResizableBox>
    <ResizableBox width={200} height={200}>
      <div className="resizable-item">Component 3</div>
    </ResizableBox>
  </div>
);

export default Resizable;
