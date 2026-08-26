import { 
  UsersIcon, 
  BuildingOfficeIcon, 
  CheckCircleIcon, 
  ShieldCheckIcon,
  ChevronRightIcon
} from '../common/Icons';
import '../../styles/DepartmentConnection.css';

export default function DepartmentConnection({ onOpenReport }) {
  return (
    <section id="department" className="dept-bridge-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag blue">
            <BuildingOfficeIcon size={16} />
            <span>Civic Collaboration</span>
          </div>
          <h2 className="section-title">Bridging Citizens & Grid Engineers</h2>
          <p className="section-desc">
            Traditional power outage handling relies on overwhelmed call centers. 
            PowerWatch establishes a direct, structured communication loop between residents and utility dispatchers.
          </p>
        </div>

        <div className="bridge-grid">
          {/* Left Column: For Citizens & Communities */}
          <div className="bridge-card citizen">
            <div className="bridge-card-header">
              <div className="bridge-icon-box">
                <UsersIcon size={26} />
              </div>
              <div className="bridge-header-text">
                <h3>For Citizens & Communities</h3>
                <span className="bridge-header-tag">Community Experience</span>
              </div>
            </div>

            <p className="bridge-card-intro">
              No more wondering if the whole street is down or waiting on hold. 
              Get clear, crowd-validated power status for your home and neighborhood in seconds.
            </p>

            <ul className="bridge-feature-list">
              <li className="bridge-feature-item">
                <div className="feature-check-icon">
                  <CheckCircleIcon size={18} />
                </div>
                <div className="feature-content">
                  <strong>Instant Outage Transparency</strong>
                  <p>Check if your building, street, or wider colony is affected before logging a ticket.</p>
                </div>
              </li>

              <li className="bridge-feature-item">
                <div className="feature-check-icon">
                  <CheckCircleIcon size={18} />
                </div>
                <div className="feature-content">
                  <strong>Verified Restoration Timelines (ETR)</strong>
                  <p>Receive realistic expected time of restoration directly from assigned grid engineers.</p>
                </div>
              </li>

              <li className="bridge-feature-item">
                <div className="feature-check-icon">
                  <CheckCircleIcon size={18} />
                </div>
                <div className="feature-content">
                  <strong>Neighborhood Collaboration</strong>
                  <p>Confirm power restoration together so utility teams know when an entire sector is back online.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: For Electricity Department & Operations */}
          <div className="bridge-card department">
            <div className="bridge-card-header">
              <div className="bridge-icon-box">
                <BuildingOfficeIcon size={26} />
              </div>
              <div className="bridge-header-text">
                <h3>For Electricity Departments</h3>
                <span className="bridge-header-tag">Operations & Field Dispatch</span>
              </div>
            </div>

            <p className="bridge-card-intro">
              Equip control rooms and field crews with auto-clustered incident data, 
              reducing call-center congestion and pinpointing feeder faults faster.
            </p>

            <ul className="bridge-feature-list">
              <li className="bridge-feature-item">
                <div className="feature-check-icon">
                  <CheckCircleIcon size={18} />
                </div>
                <div className="feature-content">
                  <strong>Automated Incident Clustering</strong>
                  <p>Consolidate hundreds of incoming calls into single transformer or feeder alert groups.</p>
                </div>
              </li>

              <li className="bridge-feature-item">
                <div className="feature-check-icon">
                  <CheckCircleIcon size={18} />
                </div>
                <div className="feature-content">
                  <strong>Direct Broadcast Channel</strong>
                  <p>Publish field technician progress notes, tree clearing alerts, and safety notices instantly to citizens.</p>
                </div>
              </li>

              <li className="bridge-feature-item">
                <div className="feature-check-icon">
                  <CheckCircleIcon size={18} />
                </div>
                <div className="feature-content">
                  <strong>Reduced Helpdesk Overload</strong>
                  <p>Proactive public map updates prevent 70%+ repetitive enquiry calls during severe weather outages.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bridge-summary-banner">
          <div className="banner-left">
            <ShieldCheckIcon size={28} className="trust-icon emerald" />
            <div className="banner-text">
              <h4>Ready to report a power interruption or check your feeder?</h4>
              <p>Reports are open to all community members with zero app download or complex sign-ups.</p>
            </div>
          </div>
          <button 
            type="button" 
            className="pw-btn pw-btn-primary"
            onClick={onOpenReport}
          >
            <span>Submit a Report</span>
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
