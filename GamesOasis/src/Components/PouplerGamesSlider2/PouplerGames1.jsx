import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PouplerGames1.css";
import { Link } from 'react-router-dom';

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
      <div className="Games">
        {games.map((game, index) => (
        
          <div key={index} className="card">
            <img src={game.background_image} alt="" />
            <div className="card__content">
            <Link className="link" key={index} to={`/game/${game.id}`}><p className="card__title">{game.name}</p></Link>
            </div>
          </div>
     
        ))}
      </div>
      </ol>
    </section>
  );
};

export default PopularGames1;
