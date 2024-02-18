import React, { useRef, useEffect } from "react";
import HomeVideo from "../../assets/HomeVideo.mp4";
import Herobannerbg from "../../assets/hero-banner-bg.png";
import Herbanner from "../../assets/hero-banner.png";
import { IoMdArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const videoRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="HomePage">
      <div className="WelcomeGamers">
        <h3 className="Headingthree">WELCOME TO GAMERS WORLD</h3>
        <h3 className="Headingthree">PLAY MORE LIVE MORE</h3>
        <h3 className="HeadingOne">
          join our communities to find your dream team
        </h3>
        <Link>
          <button className="HomeButtonCommunity">Join Communities</button>
        </Link>
        <div className="Banners">
        <img className="Herobannerbg" src={Herobannerbg} alt="" />
        <img className="Herobanner" src={Herbanner} alt="" />
        </div>
      </div>
      <div className="VideoHeading">
      <h1 className="HeadingOne">check this video to the best </h1>
      <h1 className="HeadingOne"> emotionally engaging journeys through the world of gaming experiences</h1>
      </div>
      <div className="videoContainer">
        <video
          ref={videoRef}
          src={HomeVideo}
          autoPlay
          loop
          muted
          playsInline
          controls
        ></video>
      </div>
      <a
        href="#top"
        className="back-top-btn"
        aria-label="back to top"
        data-back-top-btn
        onClick={scrollToTop}
      >
        <IoMdArrowUp aria-hidden="true" />
      </a>
    </div>
  );
};

export default HomePage;