import React from "react";
import "./Location.css";

const Location = () => {
  return (
    <div className="location">
      {/* TODO: Get location from the browser? */}
      <h1> Now Playing</h1>
      <div className="city-container">
        <div className="pulse-contnainer">
          <div className="pulsing-circle"></div>
        </div>
        <div className="location-text">Seattle</div>
      </div>
    </div>
  );
};

export default Location;
