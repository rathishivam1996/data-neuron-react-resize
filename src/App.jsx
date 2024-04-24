import "./App.css";
import { Resizable } from "./bokuweb";
import ResizeTest from "./use-resize/ResizeTest";
// import ResizeObserverTest from "./resize-observer-test";
// import ResizeTest from "./use-resize/ResizeTest";
// import Test from "./use-resizable/test";
// import Resizable from "./use-resizable/resizable";
// import Test from "./use-resizable-1/Test"

function App() {
  return (
    <div id="MainContent">
      {/* <ResizeTest /> */}

      <Resizable defaultSize={{ width: 200, height: 200 }}>
        <div className="h-full w-full bg-red-300"></div>
      </Resizable>

      <ResizeTest>bdhsbdjsbj</ResizeTest>
    </div>
  );
}

export default App;
