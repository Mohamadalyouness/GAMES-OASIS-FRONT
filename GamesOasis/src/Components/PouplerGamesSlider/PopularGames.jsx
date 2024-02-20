import React from 'react';
import './PopularGames.css'
const PopulerGamesSLider = () => {
  return (
    <div className="PouplerGamesSlider">
      <div
        className="box box-1"
        style={{ '--img': 'url(https://i.postimg.cc/sgBkfbtx/img-1.jpg)' }}
        data-text="Renji"
      ></div>
      <div
        className="box box-2"
        style={{ '--img': 'url(https://i.postimg.cc/3RZ6bhDS/img-2.jpg)' }}
        data-text="Sora"
      ></div>
      <div
        className="box box-3"
        style={{ '--img': 'url(https://i.postimg.cc/DZhHg0m4/img-3.jpg)' }}
        data-text="Kaito"
      ></div>
      <div
        className="box box-4"
        style={{ '--img': 'url(https://i.postimg.cc/KjqWx5ft/img-4.jpg)' }}
        data-text="Tsuki"
      ></div>
      <div
        className="box box-5"
        style={{ '--img': 'url(https://i.postimg.cc/nrcWyW4H/img-5.jpg)' }}
        data-text="Mitsui"
      ></div>
    </div>
  );
};

export default PopulerGamesSLider;