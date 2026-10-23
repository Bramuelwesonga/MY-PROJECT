import React from 'react';
import './Services.css';
import img1 from '../assets/4.webp';
import img2 from '../assets/5.webp';
import img3 from '../assets/6.webp';
import img4 from '../assets/13.webp';
import img5 from '../assets/7.webp';
import img6 from '../assets/8.webp';
import img7 from '../assets/10.webp';
import img8 from '../assets/11.webp';
import img9 from '../assets/12.webp';
const Services = () => {
  // Data for the 3 services. You can replace the image URLs with your own local imports!
  const servicesData = [
    {
      id: 1,
      title: 'MCV Studio',
      description: 'High-end video production and visual storytelling.',
      // Using placeholder images. Replace these with your own imports like: import img1 from '../assets/studio1.jpg'
      images: [
        img1,
        img2,
        img3
      ]
    },
    {
      id: 2,
      title: 'MCV Events',
      description: 'Immersive event design and seamless management.',
      images: [
        img4,
        img5,
        img6
      ]
    },
    {
      id: 3,
      title: 'MCV Design',
      description: 'Modern graphic design and digital branding solutions.',
      images: [
        img7,
        img8,
        img9
      ]
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="services-header">
        <span className="section-badge">Our Expertise</span>
        <h2>What We Do Best</h2>
        <p>Comprehensive creative solutions tailored to elevate your brand.</p>
      </div>

      <div className="services-grid">
        {servicesData.map((service) => (
          <div key={service.id} className="service-card">
            
            {/* 1. THE SLIDESHOW AREA */}
            <div className="card-slideshow">
              {/* The images will automatically fade in and out using CSS */}
              <img src={service.images[0]} alt={`${service.title} slide 1`} className="slide slide-1" />
              <img src={service.images[1]} alt={`${service.title} slide 2`} className="slide slide-2" />
              <img src={service.images[2]} alt={`${service.title} slide 3`} className="slide slide-3" />
              
              {/* Text overlaid on top of the images */}
              <div className="slide-overlay">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>

            {/* 2. THE BUTTON OUTSIDE THE IMAGE */}
            <button className="learn-more-btn">
              Learn More &rarr;
            </button>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;