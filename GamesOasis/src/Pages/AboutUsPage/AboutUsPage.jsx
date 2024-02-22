import React, { useState, useEffect } from "react";
import "./AboutUsPage.css";
import WhoAreWeImage from "../../assets/AboutUs.jpg";
import CommunityImage from "../../assets/Community.jpg";
import TournmentsImage from "../../assets/Tournments.jpg";
const AboutUsPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <main className="AboutUsPage">
      <div className="AboutUsheading">
        <h1 className="AboutUsheadingText">About Us</h1>
      </div>
      <div
        className="whoAreWe"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <img className="WhoAreWeImage" src={WhoAreWeImage} alt="" />
        <div className="Content">
          <h1 className="WAWHeading">Who are we</h1>
          <h3 className="WAWContent">
            Our mission is to create an inclusive and vibrant gaming community
            where every gamer feels welcome and valued. We strive to offer a
            diverse range of gaming content, from reviews and walkthroughs to
            discussions and events, catering to the interests of our diverse
            audience.
          </h3>
        </div>
      </div>
      <div
        className="whoAreWe"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <img className="WhoAreWeImage" src={CommunityImage} alt="" />
        <div className="Content">
          <h1 className="WAWHeading">Community </h1>
          <h3 className="WAWContent">
            join our community forums to engage in discussions, share tips and
            strategies, and connect with fellow gamers from around the world.
            Whether you're seeking advice on a tough level or looking for a
            squad to join you online, our forums are the perfect place to hang
            out.
          </h3>
        </div>
      </div>
      <div
        className="whoAreWe"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <img className="WhoAreWeImage" src={TournmentsImage} alt="" />
        <div className="Content">
          <h1 className="WAWHeading">Events and Tournaments</h1>
          <h3 className="WAWContent">
            Participate in our exciting gaming events and tournaments for a
            chance to showcase your skills, win prizes, and bond with fellow
            gamers. Whether it's a friendly competition or a high-stakes
            showdown, there's always something happening at Gaming World.
          </h3>
        </div>
      </div>
    </main>
  );
};

export default AboutUsPage;
