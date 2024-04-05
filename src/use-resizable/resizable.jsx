import ResizableWindow from './resizable-window';
import './resizable.css';

const Resizable = () => (
  <div className="resizable-wrapper">
    <div className="row">
      <div className="column">
        <ResizableWindow />
      </div>
      <div className="column">
        <ResizableWindow />
      </div>
    </div>
    <div className="row">
      <ResizableWindow />
    </div>
  </div>
);

export default Resizable;
