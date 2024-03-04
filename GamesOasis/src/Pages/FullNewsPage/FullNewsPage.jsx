import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./FullNewsPage.css";

const FullNewsPage = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const response = await axios.get(
          `https://games-oasis-back-1.onrender.com/api/News/${id}`
        );
        setNewsItem(response.data);
      } catch (error) {
        console.error("Error fetching news item:", error);
      }
    };

    fetchNewsItem();
  }, [id]);

  return (
    <div className="FullNewsPage">
      {newsItem && (
        <>
          <div className="FullNewsHeading">
            <h1 className="NewsName">{newsItem.gameName}</h1>
            <div className="Middle">
            <img
              className="imgNewsGame"
              src={`https://games-oasis-back-1.onrender.com/${newsItem.images}`}
              alt=""
            />
            <div className="FullContent">{newsItem.content}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FullNewsPage;
