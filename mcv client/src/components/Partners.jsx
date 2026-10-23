import React from 'react';
import './Partners.css';

// ==========================================
// BEST METHOD: Explicitly import local images
// ==========================================
// Uncomment the lines below and update the file names when you have your actual logos!
import image1 from '../assets/logo/mc.png'; 
import image2 from '../assets/logo/wrc.png'; 
import image3 from '../assets/logo/RHEMA.png'; 
import image4 from '../assets/logo/Strat.png'; 
import image5 from '../assets/logo/cca.png'; 
import image6 from '../assets/logo/zoe tv.png';
import image7 from '../assets/logo/mifun.png'; 
import image8 from '../assets/logo/KQ LOGO NEW.png';

// import globalmediaLogo from '../assets/partners/globalmedia.png';
// import innovateLogo from '../assets/partners/innovate.png';
// import nextgenLogo from '../assets/partners/nextgen.png';
// import primeLogo from '../assets/partners/prime.png';
// import visionaryLogo from '../assets/partners/visionary.png';
// import apexLogo from '../assets/partners/apex.png';
// import stellarLogo from '../assets/partners/stellar.png';

// For now, we use high-quality placeholder logos so the code works immediately.
// When you have your files, replace these URLs with the imported variables above (e.g., logo: techcorpLogo)
const partners = [
  { id: 1, name: 'Microsoft', logo: image1 },
  { id: 2, name: 'WRC', logo: image2 },
  { id: 3, name: 'RHEMA', logo: image3 },
  { id: 4, name: 'STRAT', logo: image4 },
  { id: 5, name: 'cca', logo: image5 },
  { id: 6, name: 'Zoe tv', logo: image6 },
  { id: 7, name: 'MIFUN', logo: image7 },
  { id: 8, name: 'KQ', logo: image8 }
];

const Partners = () => {
  return (
    <section className="partners-section">
      <div className="partners-header">
        <span className="section-badge">Our Network</span>
        <h2>Trusted by Industry Leaders</h2>
        <p>We are proud to collaborate with forward-thinking companies around the globe.</p>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          
          {/* 1. First set of logos (The original list) */}
          {partners.map((partner) => (
            <div key={partner.id} className="partner-logo">
              <img 
                src={partner.logo} 
                alt={`${partner.name} company logo`} 
                className="logo-image" 
              />
            </div>
          ))}

          {/* 2. Second set of logos (Exact duplicate for the seamless infinite loop) */}
          {partners.map((partner) => (
            <div key={`dup-${partner.id}`} className="partner-logo">
              <img 
                src={partner.logo} 
                alt={`${partner.name} company logo`} 
                className="logo-image" 
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Partners;