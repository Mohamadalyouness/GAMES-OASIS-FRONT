import React, { useState } from "react";
import './ContactUs.css'
 
const ContactUs = () => {
  const [message, setMessage] = useState(""); // State for message
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const [messageSent, setMessageSent] = useState(false); // State to track if message is sent

  const handleSendMessage = () => {
    setMessageSent(true); // Set messageSent to true when the send button is clicked
  };

  return (
    <div className="ContactUs">
    <div className={`wrapper centered ${messageSent ? "sent" : ""}`}>
      <article className="letter">
        <div className="side">
          <h1 className="contactUsh1">Contact us</h1>
          <p>
            <textarea
              className="TextContactUs"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)} // Update message state
            ></textarea>
          </p>
        </div>
        <div className="side">
          <p>
            <input
              className="InputContactUs"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state
            />
          </p>
          <p>
            <input
              className="InputContactUs"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
          </p>
          <p>
            <button className="ContactUsbutton" onClick={handleSendMessage}>
              Send
            </button>
          </p>
        </div>
      </article>
      <div className="envelope front"></div>
      <div className="envelope back"></div>
      <p className="result-message centered">
        {messageSent && "Thank you for your message"}
      </p>
    </div>
    </div>
  );
};

export default ContactUs; // Exporting the ContactUs component
