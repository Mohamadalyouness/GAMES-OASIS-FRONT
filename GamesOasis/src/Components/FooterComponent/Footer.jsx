import React, { useEffect, useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo-02.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setShowFooter(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section>
      {showFooter && (
        <div className="footer">
          <div id="button"></div>
          <div id="container">
            <div id="cont">
              <div className="footer_center">
                <div className="FooterNavgation">
                  <Link className="Navgation" to="/">Home</Link>
                  <Link className="Navgation" to="/">Community</Link>
                  <Link className="Navgation" to="/">Games</Link>
                  <Link className="Navgation" to="/">Platforms</Link>
                </div>
                <img className="LogoFooter" src={Logo} alt="" />
                <div className="mediaicons">
                  <span>
                    <a className="MediaIcons" href="#">
                      <FaFacebookF />
                    </a>
                  </span>
                  <span>
                    <a className="MediaIcons" href="#">
                      <FaTwitter />
                    </a>
                  </span>
                  <span>
                    <a className="MediaIcons" href="#">
                      <FaInstagram />
                    </a>
                  </span>
                  <span>
                    <a className="MediaIcons" href="#">
                      <FaLinkedinIn />
                    </a>
                  </span>
                  <span>
                    <a className="MediaIcons" href="#">
                      <FaYoutube />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Footer;
