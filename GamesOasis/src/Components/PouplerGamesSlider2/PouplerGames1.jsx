import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PouplerGames1.css";

const PopularGames1 = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get("https://api.rawg.io/api/games?key=e45e7dfaf729470f861e9a41cfc0245e")
      .then(response => {
        // Assuming the structure of the response contains an array of games
        setGames(response.data.results);
      })
      .catch(error => {
        console.error("Error fetching games:", error);
      });
  }, []);

  return (
    <section className="carousel">
      <ol className="carousel__viewport">
        {games.map((game, index) => (
          <li key={index} className="carousel__slide">
            <div
              className="carousel__snapper"
              style={{ backgroundImage: `url('${game.background_image}')` ,
              backgroundSize: 'cover', // Set background-size to cover
              backgroundPosition: 'center',}}
            >
              <h1 className="GameName">{game.name}</h1>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default PopularGames1;
