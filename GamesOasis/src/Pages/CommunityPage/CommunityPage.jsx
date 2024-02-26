import React, { useState } from "react";
import "./CommunityPage.css";
import Herbanner from "../../assets/hero-banner1.png";

export default function CommunityPage() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [userName, setUserName] = useState("John Doe"); // Example user name

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      text: message,
      time: new Date().toLocaleTimeString(),
      isSentByCurrentUser: true,
    };
    setChatMessages([...chatMessages, newMessage]);
    setMessage(""); // Clear the message input after submission
  };

  return (
    <div className="CommunityPage">
        <div className="left-div">
          <h1 className="Follwers">Follwers</h1>
          <div className="Players">
            <h1 className="FollowersName">John Doe</h1>
            <h1 className="FollowersName">John Doe</h1>
            <h1 className="FollowersName">John Doe</h1>
            <h1 className="FollowersName">John Doe</h1>
            <h1 className="FollowersName">John Doe</h1>
            <h1 className="FollowersName">John Doe</h1>
            <h1 className="FollowersName">John Doe</h1>
          </div>
        </div>
      <div className="chat-container">
      <h1 className="CommunityName">CommunityName</h1>
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`container ${
              msg.isSentByCurrentUser ? "sent" : "received"
            }`}
          >
            <img
              src={Herbanner}
              alt="Avatar"
              className={msg.isSentByCurrentUser ? "" : "right"}
            />
            <h1 className="SenderName">{userName}</h1>
            <p>{msg.text}</p>
            <span
              className={msg.isSentByCurrentUser ? "time-right" : "time-left"}
            >
              {msg.time}
            </span>
          </div>
        ))}

        <form onSubmit={handleMessageSubmit} className="message-form">
          <div className="message-input-container">
            <input
              className="CommunityMessageBox"
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={handleMessageChange}
            />
            <button className="MessageSendButton" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
