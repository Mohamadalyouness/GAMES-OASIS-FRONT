import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./NewsSliderF.css";

const NewsSliderF = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:4005/api/News/");
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="Slidercontainer">
      {news.map((item) => (
        <div key={item._id} className="NewsCard">
          <div className="imgHead">
            <img className="NewsImg" src={`http://localhost:4005/${item.images}`} alt="" />
          </div>
          <h1 className="title">{item.gameName}</h1>
          <p className="description">
            {item.content.length > 200 ? `${item.content.substring(0, 200)}...` : item.content}
          </p>
          <Link to={`/FullNewsPage/${item._id}`} className="card__button">
            View More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NewsSliderF;
