import React from "react";
import "./Navbar.css";
import Logo from "../../assets/logo-02.png"
import { Link } from "react-router-dom";



import chevron from '../../assets/chevron.png';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img  src={Logo} alt="Logo" />
      </div>
      <div className="links">
        <Link to="/">HOME</Link>
        <Link to="/CommunityPage">COMMUNITY</Link>
        <div className="dropdown">
          <a href="#">
            DATABASE
            <img src={chevron} alt="Chevron" />
          </a>
          <div className="menu">
            <Link to="/GamesPage">GAMES</Link>
            <Link to="/PlatformsPage">PLATFORMS</Link>
          </div>
        </div>
        <Link to="/AboutUsPage">ABOUT US</Link>
        <Link to="/ContactUs">CONTACT US</Link>
      </div>
      <Link to="/Login"><button className="LoginButton">Login</button></Link> 
    </nav>
  );
};

export default Navbar;
