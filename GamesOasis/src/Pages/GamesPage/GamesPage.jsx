import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi"; // Import the ChevronDown icon from react-icons
import axios from "axios";
import "./GamesPage.css";
import { MdOutlineGames } from "react-icons/md";

const GamesPage = () => {
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [games, setGames] = useState([]);
  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);

  const toggleDropdown = (dropdownType) => {
    switch (dropdownType) {
      case "platform":
        setIsPlatformDropdownOpen(!isPlatformDropdownOpen);
        break;
      case "genre":
        setIsGenreDropdownOpen(!isGenreDropdownOpen);
        break;
      case "tag":
        setIsTagDropdownOpen(!isTagDropdownOpen);
        break;
      case "store":
        setIsStoreDropdownOpen(!isStoreDropdownOpen);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Fetch platforms
    axios
      .get(
        "https://api.rawg.io/api/platforms?key=e45e7dfaf729470f861e9a41cfc0245e"
      )
      .then((response) => {
        setPlatforms(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching platforms:", error);
      });

    // Fetch genres
    axios
      .get(
        "https://api.rawg.io/api/genres?key=e45e7dfaf729470f861e9a41cfc0245e"
      )
      .then((response) => {
        setGenres(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });

    // Fetch tags
    axios
      .get("https://api.rawg.io/api/tags?key=e45e7dfaf729470f861e9a41cfc0245e")
      .then((response) => {
        setTags(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });

    // Fetch stores
    axios
      .get(
        "https://api.rawg.io/api/stores?key=e45e7dfaf729470f861e9a41cfc0245e"
      )
      .then((response) => {
        setStores(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  }, []);
  useEffect(() => {
    // Fetch games based on selected options
    const fetchGames = async () => {
      if (
        selectedPlatform ||
        selectedGenre ||
        selectedTag ||
        selectedStore ||
        selectedOption
      ) {
        const response = await axios.get("https://api.rawg.io/api/games", {
          params: {
            key: "e45e7dfaf729470f861e9a41cfc0245e",
            platforms: selectedPlatform,
            genres: selectedGenre,
            tags: selectedTag,
            stores: selectedStore,
            option: selectedOption,
          },
        });
        setGames(response.data.results);
      }
    };

    fetchGames();
  }, [
    selectedPlatform,
    selectedGenre,
    selectedTag,
    selectedStore,
    selectedOption,
  ]);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre); // Update the selected genre
    const selectedGenreName = genres.find((g) => g.id === genre)?.name; // Find the genre name based on the ID
    setSelectedOption(selectedGenreName); // Update the selected option to reflect the selected genre name
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag); // Update the selected tag
    const selectedTagName = tags.find((t) => t.id === tag)?.name; // Find the tag name based on the ID
    setSelectedOption(selectedTagName); // Update the selected option to reflect the selected tag name
  };

  const handleStoreChange = (store) => {
    setSelectedStore(store); // Update the selected store
    const selectedStoreName = stores.find((s) => s.id === store)?.name; // Find the store name based on the ID
    setSelectedOption(selectedStoreName); // Update the selected option to reflect the selected store name
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform); // Update the selected platform
    const selectedPlatformName = platforms.find((p) => p.id === platform)?.name; // Find the platform name based on the ID
    setSelectedOption(selectedPlatformName); // Update the selected option to reflect the selected platform name
  };

  return (
    <div className="GamesPage">
      <div className="sidebar">
        <div className="dropdown" onClick={() => toggleDropdown("platform")}>
          <h1 className="dropbutton">
            Platforms{" "}
            <FiChevronDown
              className={`arrow ${isPlatformDropdownOpen ? "open" : ""}`}
            />
          </h1>
          <div
            className={`dropdown-content ${
              isPlatformDropdownOpen ? "open" : ""
            }`}
          >
            {platforms.map((platform, index) => (
              <a
                key={index}
                onClick={() => handlePlatformChange(platform.id)}
                href="#"
              >
                {platform.name}
              </a>
            ))}
          </div>
        </div>
        <div className="dropdown" onClick={() => toggleDropdown("genre")}>
          <h1 className="dropbutton">
            Genres{" "}
            <FiChevronDown
              className={`arrow ${isGenreDropdownOpen ? "open" : ""}`}
            />
          </h1>
          <div
            className={`dropdown-content ${isGenreDropdownOpen ? "open" : ""}`}
          >
            {genres.map((genre, index) => (
              <a
                key={index}
                onClick={() => handleGenreChange(genre.id)}
                href="#"
              >
                {genre.name}
              </a>
            ))}
          </div>
        </div>
        <div className="dropdown" onClick={() => toggleDropdown("tag")}>
          <h1 className="dropbutton">
            Type{" "}
            <FiChevronDown
              className={`arrow ${isTagDropdownOpen ? "open" : ""}`}
            />
          </h1>
          <div
            className={`dropdown-content ${isTagDropdownOpen ? "open" : ""}`}
          >
            {tags.map((tag, index) => (
              <a key={index} onClick={() => handleTagChange(tag.id)} href="#">
                {tag.name}
              </a>
            ))}
          </div>
        </div>
        <div className="dropdown" onClick={() => toggleDropdown("store")}>
          <h1 className="dropbutton">
            Stores{" "}
            <FiChevronDown
              className={`arrow ${isStoreDropdownOpen ? "open" : ""}`}
            />
          </h1>
          <div
            className={`dropdown-content ${isStoreDropdownOpen ? "open" : ""}`}
          >
            {stores.map((store, index) => (
              <a
                key={index}
                onClick={() => handleStoreChange(store.id)}
                href="#"
              >
                {store.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="GamesHeader">
        <h1 className="NameOftheFilter">
          <MdOutlineGames className="HeadingGamesPageiconLeft" />{" "}
          {selectedOption ? selectedOption : ""}{" "}
          <MdOutlineGames className="HeadingGamesPageiconRight" />
        </h1>
      </div>
      <div className="Games">
        {games.map((game, index) => (
          <div key={index} className="card">
            <img src={game.background_image} alt="" />
            <div className="card__content">
              <p className="card__title">{game.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
