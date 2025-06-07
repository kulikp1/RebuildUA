import "./App.css";
import HomePage from "../HomePage/HomePage";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </div>
  );
}

export default App;
