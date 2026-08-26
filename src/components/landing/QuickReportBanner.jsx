import { BoltIcon, MapPinIcon } from '../common/Icons';
import '../../styles/QuickReportBanner.css';

export default function QuickReportBanner({ onOpenReport, onScrollToMap }) {
  return (
    <section className="quick-report-section">
      <div className="container">
        <div className="quick-report-card">
          <div className="quick-report-glow" aria-hidden="true" />
          
          <div className="quick-report-content">
            <div className="section-tag">
              <BoltIcon size={16} />
              <span>Real-Time Civic Response</span>
            </div>

            <h2 className="quick-report-title">
              Experiencing a Power Outage Right Now?
            </h2>

            <p className="quick-report-desc">
              Log an outage for your street in 30 seconds. Your report notifies neighbors, 
              flags the local feeder line, and sends automated cluster alerts to repair teams.
            </p>

            <div className="quick-report-actions">
              <button 
                type="button" 
                className="pw-btn pw-btn-primary quick-report-btn"
                onClick={onOpenReport}
              >
                <BoltIcon size={20} />
                <span>Report an Outage</span>
              </button>

              <button 
                type="button" 
                className="pw-btn pw-btn-secondary quick-report-btn"
                onClick={onScrollToMap}
              >
                <MapPinIcon size={20} />
                <span>Check Live Grid Map</span>
              </button>
            </div>

            <p className="quick-notice-text">
              * For immediate electrical hazards or fallen live cables, always call emergency municipal services immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
