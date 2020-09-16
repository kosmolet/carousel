import React, { useState } from "react";
import './Slider.css';

const Slider = (props) => {
  let images = props.Images

  const [mainImg, setMainImg] = useState({
    src: images[props.Index].src,
  });
  const [active, setActiveId] = useState(props.Index);

  const isActive = (id) => active === id;

  const handleSelectedImg = (e) => {

    const newMainImg = images.filter(
      (image) => image.src === e.target.src
    );
    setMainImg(...newMainImg);
  }

  const handleSelectedImgById = (id) => {

    const newMainImg = images.filter(
      (image) => image.id === id
    );
    setMainImg(...newMainImg);
  }

  const handleActive = (id) => {
    setActiveId(id);
  }

  const handleClick = (e, id) => {
    handleSelectedImg(e);
    handleActive(id);
  }
  const slideLeft = () => {
    let nextIndex = active - 1;
    if (nextIndex < 0) {
      nextIndex = images.length - 1
    }
    setActiveId(nextIndex);
    handleSelectedImgById(nextIndex)
  };

  const slideRight = () => {
    let newIndex = (active + 1) % images.length
    setActiveId(newIndex);
    handleSelectedImgById(newIndex)
  };

  return (
    <div className="modalBox">
      <div className="image-slider">
        <button className="arrow-left" onClick={slideLeft}>{"<"}</button>
        <button className="arrow-right" onClick={slideRight}>{">"}</button>
        <img src={mainImg.src} alt={mainImg.alt} className="img-main" />

      </div>
      <div className="flex-row">
        {images.map((image) => (
          <img
            src={image.src}
            alt={image.alt}
            onClick={(e) => handleClick(e, image.id)}
            key={image.id}
            className={isActive(image.id) ? "active flex-item" : "flex-item"}
          />
        ))}
      </div>

    </div>
  );
}
export default Slider;