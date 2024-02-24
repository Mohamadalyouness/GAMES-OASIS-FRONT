import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PlatformsPage.css";

const PlatformsPage = () => {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get("https://api.rawg.io/api/platforms?key=e45e7dfaf729470f861e9a41cfc0245e");
        setPlatforms(response.data.results);
      } catch (error) {
        console.error("Error fetching platforms:", error);
      }
    };

    fetchPlatforms();
  }, []);

  return (
      <div className="nft">
        <div className="main">
          {platforms.map(platform => (
            <div key={platform.id}>
              <hr />
              <div className="creator">
                <p>
                  <div className="PlatformName">{platform.name}</div>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default PlatformsPage;
