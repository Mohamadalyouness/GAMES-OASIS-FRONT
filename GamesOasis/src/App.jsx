import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import Navbar from "./Components/NavbarComponent/Navbar.jsx";
import Footer from "./Components/FooterComponent/Footer.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import AboutUsPage from "./Pages/AboutUsPage/AboutUsPage.jsx";
import FullNewsPage from "./Pages/FullNewsPage/FullNewsPage.jsx";
import GamesPage from "./Pages/GamesPage/GamesPage.jsx";
import ContactUs from "./Pages/ContactUsPage/ContactUs.jsx";
import GamesinfoPage from "./Pages/GamesinfoPage/GamesinfoPage.jsx";
import CommunityPage from "./Pages/CommunityPage/CommunityPage.jsx";
import AdminUsersPage from "./AdminDashboard/Pages/AdminUsersPage/AdminUsersPage.jsx";
import AdminNewsPage from "./AdminDashboard/Pages/AdminNewsPage/AdminNewsPage.jsx";
import AdminTournementsPage from "./AdminDashboard/Pages/AdminTournementsPage/AdminTournementsPage.jsx";
import AdminCommunitiesPage from "./AdminDashboard/Pages/AdminCommunitesPage/AdminCommunitesPage.jsx";
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
  const location = useLocation();

  // Check if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith("/Admin");

  return (
    <div className="Pages">
      {/* Conditionally render the Navbar based on whether it's an admin route */}
      {!isAdminRoute && <Navbar />}
      {/* Define all routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AboutUsPage" element={<AboutUsPage />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/FullNewsPage/:id" element={<FullNewsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/GamesPage" element={<GamesPage />} />
        <Route path="/game/:id" element={<GamesinfoPage />} />
        <Route path="/CommunityPage" element={<CommunityPage />} />
        {/* Define admin pages without Navbar and Footer */}
        <Route path="/AdminUsersPage" element={<AdminUsersPage />} />
        <Route path="/AdminNewsPage" element={<AdminNewsPage />} />
        <Route path="/AdminTournementsPage" element={<AdminTournementsPage />} />
        <Route path="/AdminCommunitiesPage" element={<AdminCommunitiesPage />} />
      </Routes>
      {/* Conditionally render the Footer based on whether it's an admin route */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
