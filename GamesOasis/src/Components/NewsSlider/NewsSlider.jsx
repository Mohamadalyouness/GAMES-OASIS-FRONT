import React, { useState, useEffect, useRef } from "react";
import Swiper from "swiper";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SwiperNewsSlider.css";
import "./NewsSlider.css";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const NewsSlider = () => {
  const [news, setNews] = useState([]);
  const swiperRef = useRef(null);

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

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.destroy();
    }

    swiperRef.current = new Swiper(".card__content", {
      loop: true,
      spaceBetween: 32,
      grabCursor: true,

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        600: {
          slidesPerView: 2,
        },
        968: {
          slidesPerView: 4,
        },
      },
    });
  }, [news]);

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <section className="container">
      <div className="card__container swiper">
        <div className="card__content">
          <div className="swiper-wrapper">
            {news.map((item) => (
              <article key={item._id} className="card__article swiper-slide">
                <div className="card__image">
                  <img
                    src={`http://localhost:4005/${item.images}`}
                    alt="image"
                    className="card__img"
                  />
                  <div className="card__shadow"></div>
                </div>

                <div className="card__data">
                  <h3 className="card__name">{item.gameName}</h3>
                  <p className="card__description">
                    {item.content.length > 200
                      ? `${item.content.substring(0, 200)}...`
                      : item.content}
                  </p>

                  <Link
                    to={`/FullNewsPage/${item._id}`}
                    className="card__button"
                  >
                    View More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="swiper-button-next" onClick={slideNext}>
          <i className="ri-arrow-right-s-line">
            <RiArrowRightSLine />
          </i>
        </div>

        <div className="swiper-button-prev" onClick={slidePrev}>
          <i className="ri-arrow-left-s-line">
            <RiArrowLeftSLine />
          </i>
        </div>

        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
};

export default NewsSlider;
