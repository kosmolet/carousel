import React, { useState } from "react";
import "./ImageSlider.css";

export default function ImageSlider({ images }) {
    const [index, setIndex] = useState(0);


    const slideLeft = () => {
        const nextIndex = index - 1;
        if (nextIndex < 0) {
            setIndex(images.length - 1);
        } else {
            setIndex(nextIndex);
        }
    };

    const slideRight = () => {
        setIndex((index + 1) % images.length);
    };

    return (
        images.length > 0 && (
            <div className="image-slider">
                <button onClick={slideLeft}>{"<"}</button>
                <img src={images[index]} />
                <button onClick={slideRight}>{">"}</button>
            </div>
        )
    );
}