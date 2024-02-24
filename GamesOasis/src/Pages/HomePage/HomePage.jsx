import React, { useRef, useEffect, useState } from "react";
import HomeVideo from "../../assets/HomeVideo.mp4";
import Herobannerbg from "../../assets/hero-banner-bg.png";
import Herbanner from "../../assets/hero-banner1.png";
import NewsSlider from "../../Components/NewsSlider/NewsSlider.jsx";
import PouplerGamesSlider1 from "../../Components/PouplerGamesSlider2/PouplerGames1.jsx";
import { MdOutlineGames } from "react-icons/md";
import { IoMdArrowUp } from "react-icons/io";
import { GiEgyptianWalk } from "react-icons/gi";
import { AiTwotoneTrophy } from "react-icons/ai";
import { BsFire } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./HomePage.css";
import axios from "axios";
const HomePage = () => {
  const [animate, setAnimate] = useState(false);
  const videoRef = useRef(null);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4005/api/tournament/"
        );
        setTournaments(response.data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

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
        <MdOutlineGames className="GamesIcon1" />
        <h1 className="HeadingOne"> it's just a game! </h1>
        <MdOutlineGames className="GamesIcon" />
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
        <div className="Newsheader">
          <GiEgyptianWalk className="NewsIcon" />
          <h1 className="TournmentsheaderText">News Feed</h1>
          <GiEgyptianWalk className="NewsIcon1" />
        </div>
        <NewsSlider />
      </div>
      <div className="Tournament">
        <div className="Tournmentheader">
          <AiTwotoneTrophy className="NewsIcon" />
          <h1 className="TournmentsheaderText">Tournaments</h1>
          <AiTwotoneTrophy className="NewsIcon1" />
        </div>
        <div className="Tournmentheadertwo">
          <h2 className="TournmentheaderTwo">Upcoming matches</h2>
          <h3 className="TournmentheaderTwo">
            Check the best teams in the world competing for high prizes
          </h3>
        </div>
        <div className="Tournamentbody">
          {tournaments.map((tournament) => (
            <div key={tournament._id} className="TournamentDetails">
              {tournament.teamLogos.map((logo, index) => (
                <img
                  key={index}
                  className="TeamLogo"
                  src={`http://localhost:4005/${logo}`}
                  alt={`Team ${index + 1} Logo`}
                />
              ))}
              <div className="TeamOneTournmentinfo">
                <h1>{tournament.teamNames[0]}</h1>
                <h3>{tournament.gameName}</h3>
              </div>
              <div className="TournmentDetails">
                <h1>{tournament.time}</h1>
                <h3>{new Date(tournament.date).toLocaleDateString()}</h3>
                <div className="links">
                  <a
                    href={tournament.watchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="Link">
                      <FaExternalLinkAlt />
                    </p>
                  </a>
                </div>
              </div>
              <div className="TeamTwoTournmentinfo">
                <h1>{tournament.teamNames[1]}</h1>
                <h3>{tournament.gameName}</h3>
              </div>
              <img
                className="TeamTwoLogo"
                src={`http://localhost:4005/${tournament.teamLogos}`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
      <div className="PopularGames">
        <div className="PopularGamesheader">
          <BsFire className="PopularIcons" />
          <h1 className="PopularGamesheaderText">popular Games</h1>
          <BsFire className="PopularIconsOne" />
        </div>
        <PouplerGamesSlider1 />
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
