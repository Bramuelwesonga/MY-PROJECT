import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import mcLogo from '../assets/R.svg';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // 1. HANDLE SCROLL EFFECT
  // Makes the header transparent at the top, and adds a frosted glass background when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // Trigger after 20px of scrolling
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. HANDLE MOBILE MENU STATE & AUTO-CLOSE
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = 'unset'; // Re-enable scrolling when closed
      return;
    }

    document.body.style.overflow = 'hidden'; // Lock background scroll when open

    // Auto-close the menu after 5 seconds (5000ms)
    const autoCloseTimer = setTimeout(() => {
      setMenuOpen(false);
    }, 5000);

    // Cleanup function to prevent memory leaks and reset scroll on unmount
    return () => {
      document.body.style.overflow = 'unset';
      clearTimeout(autoCloseTimer);
    };
  }, [menuOpen]);

  // Helper function to close the menu
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        
        {/* LOGO */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={mcLogo} alt="MC Visual Logo" className="logo-img" />
        </Link>

        {/* DESKTOP NAVIGATION LINKS (Hidden on mobile via CSS) */}
        <nav className="nav-links">
          <Link to="/mcv-studio" onClick={closeMenu}>McV Studio</Link>
          <Link to="/#events" onClick={closeMenu}>McV Events</Link>
          <Link to="/#design" onClick={closeMenu}>McV Designs</Link>
          <Link to="/#contact" className="btn-contact" onClick={closeMenu}>BOOK NOW</Link>
        </nav>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* MOBILE FULLSCREEN TRANSPARENT OVERLAY */}
      {/* Clicking this background triggers closeMenu */}
      <div 
        className={`mobile-overlay ${menuOpen ? 'open' : ''}`} 
        onClick={closeMenu}
      >
        {/* stopPropagation prevents clicks inside the menu box from accidentally closing it */}
        <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
          
          <ul className="overlay-menu">
            <li><Link to="/mcv-studio" onClick={closeMenu}>McV Studio</Link></li>
            <li><Link to="/#events" onClick={closeMenu}>McV Events</Link></li>
            <li><Link to="/#design" onClick={closeMenu}>McV Designs</Link></li>
            <li><Link to="/#contact" className="book-btn" onClick={closeMenu}>BOOK NOW</Link></li>
          </ul>

          {/* Brand name displayed at the bottom of the mobile menu */}
          <div className="mobile-menu-logo">mcvstudios</div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;