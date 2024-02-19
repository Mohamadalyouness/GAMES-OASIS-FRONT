import React, { useRef, useEffect } from "react";
import HomeVideo from "../../assets/HomeVideo.mp4";
import Herobannerbg from "../../assets/hero-banner-bg.png";
import Herbanner from "../../assets/hero-banner.png";
import NewsSlider from '../../Components/NewsSlider/NewsSlider.jsx'
import { MdOutlineGames } from "react-icons/md";
import { IoMdArrowUp } from "react-icons/io";
import { GiEgyptianWalk } from "react-icons/gi";
import { AiTwotoneTrophy } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./HomePage.css";
// import axios from 'axios';
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
      <MdOutlineGames className="GamesIcon1" /><h1 className="HeadingOne">it's just a game! </h1><MdOutlineGames className="GamesIcon" />
     
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
      <div className="News">
       <div className="Newsheader"><GiEgyptianWalk className="NewsIcon" /><h1>News Feed</h1><GiEgyptianWalk className="NewsIcon1" /></div>
        <NewsSlider/>
      </div>
      <div className="Tournament">
        <div className="Tournmentheader"><AiTwotoneTrophy className="NewsIcon" /><h1>Tournments</h1><AiTwotoneTrophy className="NewsIcon1" /></div>
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