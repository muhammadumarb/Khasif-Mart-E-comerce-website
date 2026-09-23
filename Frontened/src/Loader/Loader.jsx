import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <div className="loader-ring"></div>
        <div className="loader-dot"></div>
      </div>

      <p>Adding to cart...</p>
    </div>
  );
};

export default Loader;