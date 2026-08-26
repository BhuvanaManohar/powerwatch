import { useState, useEffect } from 'react';
import { BoltIcon, MenuIcon, XIcon, ChevronRightIcon } from './Icons';
import '../../styles/Navbar.css';

export default function Navbar({ onOpenReport, onOpenLogin, onOpenGetStarted }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`pw-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#" className="brand-link" aria-label="PowerWatch Home">
          <div className="brand-icon-box">
            <BoltIcon size={22} />
          </div>
          <div className="brand-name">
            Power<span className="brand-accent">Watch</span>
            <span className="brand-tag">Civic Grid</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-menu" aria-label="Main Navigation">
          <a href="#home" className="nav-item-link active">Home</a>
          <a href="#live-map" className="nav-item-link">Live Map</a>
          <a href="#how-it-works" className="nav-item-link">How It Works</a>
          <a href="#department" className="nav-item-link">Department Bridge</a>
          <a href="#about" className="nav-item-link">About</a>
        </nav>

        {/* Live System Status Indicator */}
        <div className="nav-status-chip" title="Real-time outage telemetry active">
          <span className="pulse-dot"></span>
          <span>Grid Monitoring Active</span>
        </div>

        {/* Action Buttons */}
        <div className="nav-actions">
          <button 
            type="button" 
            className="nav-btn-login"
            onClick={onOpenLogin}
          >
            Login
          </button>
          <button 
            type="button" 
            className="pw-btn pw-btn-primary nav-btn-cta"
            onClick={onOpenGetStarted}
          >
            Get Started
          </button>
          <button 
            type="button" 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li>
            <a href="#home" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>Home</span>
              <ChevronRightIcon size={18} />
            </a>
          </li>
          <li>
            <a href="#live-map" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>Live Map</span>
              <ChevronRightIcon size={18} />
            </a>
          </li>
          <li>
            <a href="#how-it-works" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>How It Works</span>
              <ChevronRightIcon size={18} />
            </a>
          </li>
          <li>
            <a href="#department" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>Department Bridge</span>
              <ChevronRightIcon size={18} />
            </a>
          </li>
          <li>
            <a href="#about" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>About PowerWatch</span>
              <ChevronRightIcon size={18} />
            </a>
          </li>
        </ul>

        <div className="mobile-actions">
          <button 
            type="button" 
            className="pw-btn pw-btn-secondary"
            onClick={() => { closeMobileMenu(); onOpenLogin(); }}
          >
            Citizen / Staff Login
          </button>
          <button 
            type="button" 
            className="pw-btn pw-btn-primary"
            onClick={() => { closeMobileMenu(); onOpenReport(); }}
          >
            <BoltIcon size={18} />
            Report an Outage Now
          </button>
        </div>
      </div>
    </header>
  );
}
