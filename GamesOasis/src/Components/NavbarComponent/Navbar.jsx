import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Logo from "../../assets/logo-02.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Initialize userDataExists based on whether user data is present in localStorage
  const [userDataExists, setUserDataExists] = useState(!!localStorage.getItem("userData"));

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserDataExists(false); // Update state to trigger re-render
  };

  // Use useEffect to update userDataExists when local storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      // Update userDataExists based on the presence of user data in localStorage
      setUserDataExists(!!localStorage.getItem("userData"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="links">
        <Link to="/">HOME</Link>
        <Link to="/CommunityPage">COMMUNITY</Link>
        <Link to="/GamesPage">DATABASE</Link>
        <Link to="/AboutUsPage">ABOUT US</Link>
        <Link to="/ContactUs">CONTACT US</Link>
      </div>
      {userDataExists ? (
        <button className="LoginButton" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/Login">
          <button className="LoginButton">Login</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
