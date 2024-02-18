import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import Navbar from "./Components/NavbarComponent/Navbar.jsx";
import Footer from "./Components/FooterComponent/Footer.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
};

const AppContent = () => {
  return (
    <div className="Pages">
      <Navbar />
      <Routes>
        <Route path="/Login" element={<LoginPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
