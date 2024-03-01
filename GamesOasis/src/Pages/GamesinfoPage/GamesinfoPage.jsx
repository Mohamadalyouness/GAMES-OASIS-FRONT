import React, { useEffect, useState } from "react";
import "./GamesinfoPage.css";
import axios from "axios";
import img from "../../assets/AboutUs.jpg";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const GamesinfoPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [similarGames, setSimilarGames] = useState([]);

  useEffect(() => {
    const fetchGameInfo = async () => {
      const apiKey = "e45e7dfaf729470f861e9a41cfc0245e";
      const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
      try {
        const response = await axios.get(url);
        if (response.data.genres.length > 0) {
          const genreId = response.data.genres[0].id;
          const similarUrl = `https://api.rawg.io/api/games?key=${apiKey}&genres=${genreId}&page_size=3`;
          const similarResponse = await axios.get(similarUrl);
          setSimilarGames(similarResponse.data.results);
        }
        setGame(response.data);
      } catch (error) {
        console.error("Error fetching game info:", error);
      }
    };

    fetchGameInfo();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="SingleGamePage">
      <div className="TopSide">
        <div className="RightSide">
          <div className="GameTitle">
            <h1 className="GameH1">{game.name}</h1>
          </div>
          <div className="About">
            <h3>About</h3>
            <span> {game.description_raw}</span>
          </div>
          <div className="RightSideyunder">
            <div className="Spans">
              <h3>platform</h3>
              <span>
                {game.platforms
                  .map((platform) => platform.platform.name)
                  .join(", ")}
              </span>
            </div>
            <div className="Spans">
              <h3>Release date</h3>
              <span>{game.released}</span>
            </div>
            <div className="Spans">
              <h3>Age Rating</h3>
              <span>
                {game.esrb_rating ? game.esrb_rating.name : "Not available"}
              </span>
            </div>
            <div className="UnderBottomSide">
              <div className="Tags">
                <h3>Tags</h3>
                <span>{game.tags.map((tag) => tag.name).join(", ")}</span>
              </div>
              <div className="GameWebsite">
                <h3>Website</h3>
                <a href={game.website}>{game.website}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="LeftSide">
          <div className="GameImages">
            <img className="Gameimg" src={game.background_image} alt="" />
            <img className="Gameimg" src={game.background_image_additional} alt="" />
            <img className="Gameimg" src={game.background_image_additional} alt="" />
          </div>
        </div>
      </div>
      <div className="MiddleSide">
        <h1 className="MiddleH1">System requirements for PC</h1>
        <div className="MiddleBottom">
          <div className="MiddleLeftSide">
            <h3>Minimum</h3>
            {game.platforms && game.platforms.length > 0 ? (
              game.platforms[0].requirements_en ? (
                <p>{game.platforms[0].requirements_en.minimum}</p>
              ) : (
                <p>Minimum requirements not available</p>
              )
            ) : (
              <p>No platform information available</p>
            )}
          </div>
          <div className="MiddleRightSide">
            <h3>Recommended</h3>
            {game.platforms && game.platforms.length > 0 ? (
              game.platforms[0].requirements_en ? (
                <p>{game.platforms[0].requirements_en.recommended}</p>
              ) : (
                <p>Recommended requirements not available</p>
              )
            ) : (
              <p>No platform information available</p>
            )}
          </div>
        </div>
      </div>
      <div className="BottomSide">
        <h1 className="BottomH1">Games like {game.name}</h1>
        <div className="Games">
          {similarGames.map((similarGame) => (
            <div className="card" key={similarGame.id}>
              <img src={similarGame.background_image} alt={similarGame.name} />
              <div className="card__content">
              <Link className="link" to={`/game/${similarGame.id}`}>
                  <p className="card__title">{similarGame.name}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesinfoPage;
