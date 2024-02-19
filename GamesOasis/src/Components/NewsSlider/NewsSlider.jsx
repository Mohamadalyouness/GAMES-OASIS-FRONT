import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import "./SwiperNewsSlider.css";
import "./NewsSlider.css";
import avatar1 from "../../assets/News2.png";
import avatar2 from "../../assets/News3.png";
import avatar3 from "../../assets/News4.png";
import avatar4 from "../../assets/News5.png";
import avatar5 from "../../assets/News6.png";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const NewsSlider = () => {

  const swiperRef = useRef(null);

  useEffect(() => {
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
          slidesPerView: 3,
        },
      },
    });
  }, []);
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
            <article className="card__article swiper-slide">
              <div className="card__image">
                <img src={avatar1} alt="image" className="card__img" />
                <div className="card__shadow"></div>
              </div>

              <div className="card__data">
                <h3 className="card__name">League of Legends</h3>
                <p className="card__description">
                  Passionate about development and design, I carry out projects
                  at the request of users.
                </p>

                <a href="#" className="card__button">
                  View More
                </a>
              </div>
            </article>

            <article className="card__article swiper-slide">
              <div className="card__image">
                <img src={avatar2} alt="image" className="card__img" />
                <div className="card__shadow"></div>
              </div>

              <div className="card__data">
                <h3 className="card__name">Lotw Fox</h3>
                <p className="card__description">
                  Passionate about development and design, I carry out projects
                  at the request of users.
                </p>

                <a href="#" className="card__button">
                  View More
                </a>
              </div>
            </article>

            <article className="card__article swiper-slide">
              <div className="card__image">
                <img src={avatar3} alt="image" className="card__img" />
                <div className="card__shadow"></div>
              </div>

              <div className="card__data">
                <h3 className="card__name">Sara Mit</h3>
                <p className="card__description">
                  Passionate about development and design, I carry out projects
                  at the request of users.
                </p>

                <a href="#" className="card__button">
                  View More
                </a>
              </div>
            </article>

            <article className="card__article swiper-slide">
              <div className="card__image">
                <img src={avatar4} alt="image" className="card__img" />
                <div className="card__shadow"></div>
              </div>

              <div className="card__data">
                <h3 className="card__name">Jenny Wert</h3>
                <p className="card__description">
                  Passionate about development and design, I carry out projects
                  at the request of users.
                </p>

                <a href="#" className="card__button">
                  View More
                </a>
              </div>
            </article>

            <article className="card__article swiper-slide">
              <div className="card__image">
                <img src={avatar5} alt="image" className="card__img" />
                <div className="card__shadow"></div>
              </div>

              <div className="card__data">
                <h3 className="card__name">Lexa Kin</h3>
                <p className="card__description">
                  Passionate about development and design, I carry out projects
                  at the request of users.
                </p>

                <a href="#" className="card__button">
                  View More
                </a>
              </div>
            </article>
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
