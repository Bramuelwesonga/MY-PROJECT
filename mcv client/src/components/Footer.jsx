import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* 1. Brand & Description */}
        <div className="footer-brand fade-up">
          <h3>MCVisual</h3>
          <p>Bringing your vision to life through high-end production, immersive events, and modern design.</p>
        </div>

        {/* 2. Social Media Links */}
        <div className="footer-socials fade-up delay-1">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            
            {/* Instagram */}
            <a 
              href="https://instagram.com/yourhandle" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Follow us on Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* TikTok */}
            <a 
              href="https://tiktok.com/@yourhandle" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Follow us on TikTok"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>

            {/* Facebook */}
            <a 
              href="https://facebook.com/yourhandle" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Follow us on Facebook"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>

          </div>
        </div>

      </div>

      {/* 3. Copyright & Bottom Bar */}
      <div className="footer-bottom fade-up delay-2">
        <div className="footer-divider"></div>
        <p>&copy; {currentYear} MCVisual. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;