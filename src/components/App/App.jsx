import "./App.css";
import HomePage from "../HomePage/HomePage";
import UserPage from "../UserPage/UserPage";
import CompanyPage from "../CompanyPage/CompanyPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/userPage" element={<UserPage />} />
          <Route path="/companyPage" element={<CompanyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
