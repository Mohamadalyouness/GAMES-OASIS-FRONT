import React, { useState, useEffect } from "react";
import "./PopularGames.css";

const PopularGamesSlider = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchPopularGames = async () => {
      try {
        const response = await fetch(
          "https://api.rawg.io/api/games?key=e45e7dfaf729470f861e9a41cfc0245e"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (Array.isArray(data.results)) {
          setGames(data.results);
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPopularGames();
  }, []);

  return (
    <div className="PopularGamesSlider">
      {games.map((game, index) => (
        <div
          key={index}
          className={`box box-${index + 1}`}
          style={{ "--img": `url(${game.background_image})` }}
          data-text={game.name}
        ></div>
      ))}
    </div>
  );
};

export default PopularGamesSlider;
