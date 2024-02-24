import React, { useState, useEffect } from "react";
import "./AboutUsPage.css";
import WhoAreWeImage from "../../assets/AboutUs.jpg";
import CommunityImage from "../../assets/Community.jpg";
import TournmentsImage from "../../assets/Tournments.jpg";
import { GiZeusSword } from "react-icons/gi";
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
      <GiZeusSword className="AboutUsiconRight" /><h1 className="AboutUsheadingText">About Us</h1><GiZeusSword className="AboutUsiconLeft" />
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


// import React, { useState } from 'react';
// import './styles.css'; // Make sure to import your CSS file

// const ContactForm = () => {
//   const [message, setMessage] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [messageSent, setMessageSent] = useState(false);

//   const handleSendMessage = () => {
//     // Here you can perform any actions related to sending the message
//     // For now, let's just simulate a message being sent by setting messageSent to true
//     setMessageSent(true);
//   };

//   return (
//     <div className={`wrapper centered ${messageSent ? 'sent' : ''}`}>
//       <article className="letter">
//         <div className="side">
//           <h1>Contact us</h1>
//           <p>
//             <textarea
//               placeholder="Your message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             ></textarea>
//           </p>
//         </div>
//         <div className="side">
//           <p>
//             <input
//               type="text"
//               placeholder="Your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </p>
//           <p>
//             <input
//               type="email"
//               placeholder="Your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </p>
//           <p>
//             <button onClick={handleSendMessage}>Send</button>
//           </p>
//         </div>
//       </article>
//       <div className="envelope front"></div>
//       <div className="envelope back"></div>
//       <p className="result-message centered">
//         {messageSent && 'Thank you for your message'}
//       </p>
//     </div>
//   );
// };

// export default ContactForm;
