import React, { useState , useEffect } from "react";
import "./CommunityPage.css";
import Herbanner from "../../assets/hero-banner1.png";
import axios from "axios";

export default function CommunityPage() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [userName, setUserName] = useState("John Doe"); // Example user name
  const [communities, setCommunities] = useState([]);


 
  useEffect(() => {
    // Function to fetch communities for the user
    const fetchCommunities = async () => {
      try {
        const userDataString = localStorage.getItem("userData");
  
        // Parse user data to extract user ID
        if (!userDataString) {
          console.error("User data not found in local storage");
          return;
        }
  
        const userData = JSON.parse(userDataString);
        const userId = userData._id;
  
        // Construct the data object with user ID
        const data = {
          userId: userId
        };
        // Include the user ID in the request body
        const response = await axios.get(`http://localhost:4005/api/communities/`, data );
        setCommunities(response.data);
  
      } catch (error) {
        console.error("Failed to fetch communities:", error);
      }
    };
  
    // Call the function directly
    fetchCommunities();
  }, []); // This effect runs once on component mount
  
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
    setMessage("");
  };

  return (
    <div className="CommunityPage">
      
      <div className="left-div">
        <h1 className="Follwers">Communities</h1>
        <div className="Players">
          {communities.map((community, index) => (
            <h1 key={index} className="FollowersName">{community.name}</h1>
          ))}
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
