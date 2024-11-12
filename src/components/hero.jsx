import "./css/hero.css"
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const Hero = () => {
  return (
    <div className="videocontainer">
      <video
        autoPlay
        muted
        loop
        className="video-background">
        <source src="/blackhole.webm" type="video/webm" />
      </video>
    </div>
  );
};

export default Hero;