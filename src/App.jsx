import "./App.css";
import { Resizable } from "./bokuweb";
import ResizeTest from "./use-resize/ResizeTest";
// import Test from "./use-resizable/test";
// import Resizable from "./use-resizable/resizable";
// import Test from "./use-resizable-1/Test"

function App() {
  return (
    <div id="MainContent">
      <ResizeTest />

      <Resizable
        className="bg-red-200"
        defaultSize={{
          width: 320,
          height: 200,
        }}
      >
        Sample Bokuweb
      </Resizable>

      <Resizable defaultSize={{ width: 320, height: 200 }}>
        <div className="h-full w-full bg-blue-100">
          <span>nsjdhcsjbhcsdbj</span>
        </div>
      </Resizable>
    </div>
  );
}

export default App;
