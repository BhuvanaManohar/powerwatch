import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BoltIcon, MenuIcon, XIcon, ChevronRightIcon } from './Icons';
import '../../styles/Navbar.css';

export default function Navbar({ onOpenReport, onOpenGetStarted }) {
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
        <Link to="/" className="brand-link" aria-label="PowerWatch Home">
          <div className="brand-icon-box">
            <BoltIcon size={22} />
          </div>
          <div className="brand-name">
            Power<span className="brand-accent">Watch</span>
            <span className="brand-tag">Civic Grid</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-menu" aria-label="Main Navigation">
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink 
            to="/live-map" 
            className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
          >
            Live Map
          </NavLink>
          <NavLink 
            to="/citizen" 
            className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
          >
            Citizen
          </NavLink>
          <NavLink 
            to="/department" 
            className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
          >
            Department
          </NavLink>
        </nav>

        {/* Live System Status Indicator */}
        <div className="nav-status-chip" title="Real-time outage telemetry active">
          <span className="pulse-dot"></span>
          <span>Grid Monitoring Active</span>
        </div>

        {/* Action Buttons */}
        <div className="nav-actions">
          <Link 
            to="/login" 
            className="nav-btn-login"
          >
            Login
          </Link>
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
            <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>Home</span>
              <ChevronRightIcon size={18} />
            </Link>
          </li>
          <li>
            <Link to="/live-map" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>Live Map</span>
              <ChevronRightIcon size={18} />
            </Link>
          </li>
          <li>
            <Link to="/citizen" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>Citizen Dashboard</span>
              <ChevronRightIcon size={18} />
            </Link>
          </li>
          <li>
            <Link to="/department" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>Department Dashboard</span>
              <ChevronRightIcon size={18} />
            </Link>
          </li>
          <li>
            <Link to="/login" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>Login Portal</span>
              <ChevronRightIcon size={18} />
            </Link>
          </li>
        </ul>

        <div className="mobile-actions">
          <Link 
            to="/login" 
            className="pw-btn pw-btn-secondary"
            onClick={closeMobileMenu}
          >
            Citizen / Staff Login
          </Link>
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
