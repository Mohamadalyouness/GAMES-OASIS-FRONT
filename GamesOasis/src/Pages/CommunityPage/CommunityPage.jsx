import React, { useState, useEffect } from "react";
import "./CommunityPage.css";
import Herbanner from "../../assets/hero-banner1.png";
import axios from "axios";

export default function CommunityPage() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);
  const [selectedCommunityName, setSelectedCommunityName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [com, setCom] = useState();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const communityId = urlParams.get("community");
    if (communityId) {
      setCom(communityId);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = localStorage.getItem("userData");

        if (!userDataString) {
          console.error("User data not found in local storage");
          setIsLoggedIn(false);
          return;
        }

        const userData = JSON.parse(userDataString);
        const userId = userData._id;

        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found in local storage");
          setIsLoggedIn(false);
          return;
        }

        setIsLoggedIn(true);

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `http://localhost:4005/api/getUser/${userId}`,
          { headers }
        );
        setUserCommunities(response.data.Communities);

        if (com) {
          const chatResponse = await axios.get(
            `http://localhost:4005/api/chatmessage/${com}`
          );
          setChatMessages(chatResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [com]);

  const handleCommunityClick = async (communityId) => {
    setCom(communityId);

    try {
      const response = await axios.get(
        `http://localhost:4005/api/chatmessage/${communityId}`
      );
      setChatMessages(response.data);

      // Fetch the community name and set it to selectedCommunityName
      const selectedCommunity = userCommunities.find(
        (community) => community._id === communityId
      );
      if (selectedCommunity) {
        setSelectedCommunityName(selectedCommunity.name);
      }
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSubmit = async (event, communityId) => {
    event.preventDefault();

    try {
      const userDataString = localStorage.getItem("userData");

      if (!userDataString) {
        console.error("User data not found in local storage");
        setIsLoggedIn(false);
        return;
      }

      const userData = JSON.parse(userDataString);
      const userId = userData._id;
      const newMessage = {
        text: message,
        time: new Date().toLocaleTimeString(),
        isSentByCurrentUser: true,
      };

      var response = await axios.post(
        `http://localhost:4005/api/chatmessage/${com}/`,
        {
          message: newMessage.text,
          senderId: userId,
        }
      );

      // setChatMessages([...chatMessages, newMessage]);
      setChatMessages([...chatMessages, response.data]);
      setMessage("");

      // Store the selected community ID in URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("community", com);
      window.history.replaceState(null, null, `?${urlParams.toString()}`);

      // Reload the page
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  return (
    <div className="CommunityPage">
      <div className="left-div">
        <h1 className="Follwers">Communities</h1>
        <div className="Players">
          {userCommunities.map((each) => (
            <div className="UserCommunites" key={each._id} onClick={() => handleCommunityClick(each._id)}>
                 <img
                className="UserCommunityimg"
                src={`http://localhost:4005/${each.images}`}  
              />
            </div>
          ))}
        </div>
      </div>

      <div className="chat-container">
        <h1 className="CommunityName">
          {selectedCommunityName || "Select a community to view chat"}
        </h1>

        {/* {chatMessages.map((each) => console.log("each ", each))} */}

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
            {/* Check if senderId and username are defined */}
            <h1 className="SenderName">
              {msg.senderId?.username ? msg.senderId.username : "Anonymous"}
            </h1>

            <p>{msg.message}</p>
            <span
              className={msg.isSentByCurrentUser ? "time-right" : "time-left"}
            >
              {msg.time}
            </span>
          </div>
        ))}

        {isLoggedIn && (
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
        )}
      </div>
    </div>
  );
}
