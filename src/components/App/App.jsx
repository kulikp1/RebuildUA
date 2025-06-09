import "./App.css";
import HomePage from "../HomePage/HomePage";
import UserPage from "../UserPage/UserPage";
import CompanyPage from "../CompanyPage/CompanyPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequestsPage from "../RequestsPage/RequestsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../AuthForm/toastifyOverrides.css";
import MyBidsPage from "../MyBidsPage/MyBidsPage";
import AboutPage from "../AboutPage/AboutPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/userPage" element={<UserPage />} />
          <Route path="/companyPage" element={<CompanyPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/my-bids" element={<MyBidsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
