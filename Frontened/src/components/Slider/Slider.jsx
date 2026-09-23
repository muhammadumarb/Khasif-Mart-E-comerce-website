import React, { useEffect, useRef, useState } from "react";
import "./Slider.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Slider = () => {
  const [slider, setSlider] = useState(0);
  const timeoutRef = useRef(null);

  const slide = [
    {
      eyebrow: "This week only",
      title: "Groceries, Delivered to Your Door",
      description: "Shop fresh and quality groceries at affordable prices.",
      cta: "Shop the offers",
      image:
       "https://cdn.dribbble.com/userupload/38781171/file/original-af5c118458d7f91ccb66b81140ba36fd.jpg?format=webp&resize=640x480&vertical=center",
    },
    {
      eyebrow: "New arrivals",
      title: "Freshness You Can Trust",
      description: "Fresh fruits, vegetables and daily essentials.",
      cta: "Browse groceries",
      image:
        "https://i.pinimg.com/1200x/5c/fe/32/5cfe32c6dd453116d24a4bb5557541eb.jpg",
    },
    {
      eyebrow: "Limited time",
      title: "Special Deals Just for You",
      description: "Save more on your everyday grocery essentials.",
      cta: "See the deals",
      image:
        "/src/assets/3.jpg",
    },
  ];

  const handleClick = (way) => {
    way === "left"
      ? setSlider((prev) => (prev > 0 ? prev - 1 : slide.length - 1))
      : setSlider((prev) => (prev < slide.length - 1 ? prev + 1 : 0));
  };


  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setSlider((prev) => (prev < slide.length - 1 ? prev + 1 : 0));
    }, 5000);

    return () => clearTimeout(timeoutRef.current);
  }, [slider, slide.length]);

  return (
    <div className="main">
      <div
        className="slide"
        style={{
          transform: `translateX(-${slider * 100}%)`,
        }}
      >
        {slide.map((item, i) => (
          <div className="slide-item" key={i}>
            <img src={item.image} alt={item.title} />
            <div className="overlay" />

            <div className="content">
              <span className="eyebrow">{item.eyebrow}</span>
              <h1>{item.title}</h1>
              <h2>{item.description}</h2>
              <button className="cta-btn">{item.cta}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="arrows">
        <button onClick={() => handleClick("left")} aria-label="Previous slide">
          <FaChevronLeft />
        </button>
        <button onClick={() => handleClick("right")} aria-label="Next slide">
          <FaChevronRight />
        </button>
      </div>

      <div className="dots">
        {slide.map((_, i) => (
          <span
            key={i}
            className={i === slider ? "dot active" : "dot"}
            onClick={() => setSlider(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;