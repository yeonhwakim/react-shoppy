import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>HEADER</div>
      <Outlet />
    </div>
  );
}

export default App;
