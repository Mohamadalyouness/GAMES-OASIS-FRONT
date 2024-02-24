import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import Navbar from "./Components/NavbarComponent/Navbar.jsx";
import Footer from "./Components/FooterComponent/Footer.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import Loader from "./Components/Loader/Loader.jsx";
import AboutUsPage from './Pages/AboutUsPage/AboutUsPage.jsx'
import FullNewsPage from "./Pages/FullNewsPage/FullNewsPage.jsx";
import PlatformsPage from "./Pages/PlatformsPage/PlatformsPage.jsx";
import GamesPage from "./Pages/GamesPage/GamesPage.jsx";
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
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [location]);

  return (
    <div className="Pages">
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/AboutUsPage" element={<AboutUsPage />} />
            <Route path="/FullNewsPage/:id" element={<FullNewsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/PlatformsPage" element={<PlatformsPage />} />
            <Route path="/GamesPage" element={<GamesPage />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;