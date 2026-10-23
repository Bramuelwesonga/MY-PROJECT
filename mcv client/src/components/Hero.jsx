import React from 'react';
import './Hero.css'; // Import the CSS file for styling and animations
import images from '../assets/2.webp'; // Import the main image for the Hero section
import smallImage1 from "../assets/1.webp"; // Import the first small overlapping image
import smallImage2 from "../assets/3.webp"; // Import the second small overlapping image
const Hero = () => {
  return (
    <section className="hero-section">
      {/* Main wrapper for the Hero section. Takes up full screen height */}

      {/* Decorative background glows (Red and Blue blurred circles) */}
      <div className="glow glow-red"></div>
      <div className="glow glow-blue"></div>

      {/* The main container that splits the screen into two columns (Text left, Images right) */}
      <div className="hero-container">
        {/* --- LEFT SIDE: Animated Text Content --- */}
        <div className="hero-text">
          {/* Small pill-shaped badge at the top. 'fade-up delay-1' makes it slide in first */}
          <span className="badge fade-up delay-1">Creative Studio</span>

          {/* Main Headline. We use <br /> to force a line break */}
          <h1 className="fade-up delay-2">
            We Bring Your <br />
            {/* These spans allow us to color specific words Red and Blue */}
            <span className="highlight-red">Vision</span> to <span className="highlight-blue">Life</span>
          </h1>

          {/* Descriptive paragraph. 'delay-3' makes it appear after the headline */}
          <p className="fade-up delay-3">
            MCVisual is a premier creative studio specializing in high-end production,
            immersive events, and modern design. Let's build something extraordinary together.
          </p>

          {/* Button container. 'delay-4' makes them appear last */}
          <div className="hero-buttons fade-up delay-4">
            {/* Primary button (Solid Red) */}
            <a href="#studio" className="btn btn-primary">Explore Our Work</a>
            {/* Secondary button (Outlined Blue) */}
            <a href="#contact" className="btn btn-secondary">Get in Touch</a>
          </div>
        </div>

        {/* --- RIGHT SIDE: Floating Image Collage --- */}
        <div className="hero-visuals">
          {/* Main large image. 'float-1' applies the first floating animation speed */}
          <div className="img-wrapper main-img float-1">
            <img
              src={images}
              alt="Creative Studio"
            />
          </div>

          {/* Small overlapping image 1 (Top Right). 'float-2' applies a different speed */}
          <div className="img-wrapper small-img-1 float-2">
            <img
              src={smallImage1}
              alt="MC Visual Events"
            />
          </div>

          {/* Small overlapping image 2 (Bottom Left). 'float-3' applies the slowest speed */}
          <div className="img-wrapper small-img-2 float-3">
            <img
              src={smallImage2}
              alt="MC Visual Design"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; // Export the component so App.jsx can use it