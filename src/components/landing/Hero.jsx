import { BoltIcon, MapPinIcon, ShieldCheckIcon, UsersIcon, RadioIcon } from '../common/Icons';
import '../../styles/Hero.css';

export default function Hero({ onOpenReport, onScrollToMap }) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-glow-blob" aria-hidden="true" />
      
      <div className="container hero-content">
        {/* Civic Badge */}
        <div className="hero-badge">
          <span className="hero-badge-tag">Open Civic Tech</span>
          <span>Next-Generation Power Outage Monitoring</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-headline">
          Know the outage. <br />
          <span className="highlight">Know the update.</span>
        </h1>

        {/* Supporting Text */}
        <p className="hero-description">
          PowerWatch connects everyday citizens and local electricity departments. 
          Report power cuts in 30 seconds, view live affected feeder zones, 
          and track verified restoration timelines straight from the field.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <button 
            type="button" 
            className="pw-btn pw-btn-primary hero-btn-primary"
            onClick={onOpenReport}
          >
            <BoltIcon size={20} />
            <span>Report an Outage</span>
          </button>
          
          <button 
            type="button" 
            className="pw-btn pw-btn-secondary hero-btn-secondary"
            onClick={onScrollToMap}
          >
            <MapPinIcon size={20} />
            <span>View Live Map</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="hero-trust-bar">
          <div className="trust-item">
            <span className="trust-icon">
              <BoltIcon size={18} />
            </span>
            <span>Crowd-Verified Reporting</span>
          </div>

          <div className="trust-item">
            <span className="trust-icon blue">
              <ShieldCheckIcon size={18} />
            </span>
            <span>Electricity Board Feeder Sync</span>
          </div>

          <div className="trust-item">
            <span className="trust-icon emerald">
              <RadioIcon size={18} />
            </span>
            <span>Real-Time Public ETR Broadcast</span>
          </div>

          <div className="trust-item">
            <span className="trust-icon">
              <UsersIcon size={18} />
            </span>
            <span>No Account Required to Check</span>
          </div>
        </div>
      </div>
    </section>
  );
}
