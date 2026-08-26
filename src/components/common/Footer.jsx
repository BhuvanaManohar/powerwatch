import { BoltIcon } from './Icons';
import '../../styles/Footer.css';

export default function Footer({ onOpenReport }) {
  return (
    <footer className="pw-footer" id="about">
      <div className="container">
        {/* Top 4-Column Grid */}
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <a href="#" className="brand-link">
              <div className="brand-icon-box">
                <BoltIcon size={20} />
              </div>
              <div className="brand-name">
                Power<span className="brand-accent">Watch</span>
              </div>
            </a>
            <p className="footer-desc">
              Next-generation civic power outage monitoring platform connecting communities and grid engineers for transparent restoration.
            </p>
            <div className="footer-status-indicator">
              <span className="pulse-dot"></span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links-list">
              <li><a href="#home" className="footer-link">Home Overview</a></li>
              <li><a href="#live-map" className="footer-link">Live Outage Map</a></li>
              <li><a href="#how-it-works" className="footer-link">How It Works</a></li>
              <li><a href="#department" className="footer-link">Department Bridge</a></li>
              <li><a href="#stats" className="footer-link">City Grid Telemetry</a></li>
            </ul>
          </div>

          {/* Citizen Resources */}
          <div>
            <h4 className="footer-col-title">Citizens</h4>
            <ul className="footer-links-list">
              <li>
                <button 
                  type="button" 
                  className="footer-link" 
                  onClick={onOpenReport}
                  style={{ textAlign: 'left' }}
                >
                  Report a Power Cut
                </button>
              </li>
              <li><a href="#live-map" className="footer-link">Feeder Zone Lookup</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Electrical Safety Tips</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Storm Outage Prep</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Community Guidelines</a></li>
            </ul>
          </div>

          {/* Operations & Utilities */}
          <div>
            <h4 className="footer-col-title">Grid Utilities</h4>
            <ul className="footer-links-list">
              <li><a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Control Room Portal</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Field Crew Dispatcher</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Substation Telemetry Sync</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Civic API Specifications</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Incident Deduplication</a></li>
            </ul>
          </div>
        </div>

        {/* Civic Transparency Disclaimer */}
        <div className="footer-disclaimer-box">
          <p className="disclaimer-text">
            <strong>Civic Platform Notice:</strong> PowerWatch is an independent civic technology platform engineered to facilitate transparent crowd-sourced outage reporting, community status verification, and collaborative communication with electrical distribution utilities. PowerWatch is not an official government utility board. For life-threatening emergencies, fallen power lines, or active electrical fires, contact your local emergency municipal services immediately.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} PowerWatch Civic Grid Platform. Built for open community resilience.</p>
          <ul className="footer-bottom-links">
            <li><a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Open Source & Civic Tech</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
