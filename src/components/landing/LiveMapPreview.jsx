import { useState } from 'react';
import { 
  BoltIcon, 
  SearchIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  ActivityIcon,
  CheckCircleIcon,
  UsersIcon
} from '../common/Icons';
import '../../styles/LiveMapPreview.css';

const MOCK_OUTAGES = [
  {
    id: 'outage-1',
    zone: 'Sector 4B - North Heights',
    substation: 'North 33/11kV Substation • Feeder F-04',
    type: 'danger',
    status: 'Crew Dispatched',
    badgeClass: 'active',
    affectedUnits: '1,420 Connections',
    reportedAt: '18 mins ago',
    etr: 'Estimated 35 mins (06:15 PM)',
    cause: 'Transformer jumper flashover due to localized high wind load.',
    deptNote: 'Line repair team #2 on-site isolating Section 3. Rest of feeder back soon.',
    confirmations: 86,
    x: '28%',
    y: '36%'
  },
  {
    id: 'outage-2',
    zone: 'Downtown Commercial Hub',
    substation: 'Central Grid Terminal • Feeder F-12',
    type: 'warning',
    status: 'Investigating',
    badgeClass: 'investigating',
    affectedUnits: '890 Units',
    reportedAt: '7 mins ago',
    etr: 'Under Evaluation',
    cause: 'Underground cable fault trip alarm on breaker #3.',
    deptNote: 'Substation engineers testing insulation resistance.',
    confirmations: 42,
    x: '52%',
    y: '58%'
  },
  {
    id: 'outage-3',
    zone: 'West Industrial Estate',
    substation: 'Western 66kV Stepdown • Industrial Line 1',
    type: 'info',
    status: 'In Progress',
    badgeClass: 'progress',
    affectedUnits: '45 Facilities',
    reportedAt: '34 mins ago',
    etr: 'ETA 50 mins (06:30 PM)',
    cause: 'Scheduled emergency insulator replacement.',
    deptNote: 'Scheduled maintenance work 70% completed.',
    confirmations: 19,
    x: '76%',
    y: '32%'
  },
  {
    id: 'outage-4',
    zone: 'Lakeview Residential Enclave',
    substation: 'South-East Feeder 09',
    type: 'resolved',
    status: 'Restored',
    badgeClass: 'restored',
    affectedUnits: '640 Connections',
    reportedAt: '1 hr ago',
    etr: 'Fully Restored',
    cause: 'Tree branch touching overhead low-tension conductor.',
    deptNote: 'Vegetation cleared and power safely restored across all blocks.',
    confirmations: 112,
    x: '64%',
    y: '78%'
  }
];

const MOCK_LIVE_FEED = [
  {
    id: 'feed-1',
    location: 'Sector 4B, 3rd Cross',
    time: '2m ago',
    type: 'dept',
    message: 'Utility Crew #2: Replacement breaker installed, initiating test energization.',
    source: 'Verified Dispatch'
  },
  {
    id: 'feed-2',
    location: 'Market Street, Downtown',
    time: '6m ago',
    type: 'citizen',
    message: 'Streetlights and Block B buildings shut down suddenly with loud buzzing.',
    source: '14 Neighbors Confirmed'
  },
  {
    id: 'feed-3',
    location: 'Greenwood Apartments',
    time: '12m ago',
    type: 'citizen',
    message: 'Voltage fluctuation resolved; power steady on Phase 2.',
    source: 'Community Update'
  },
  {
    id: 'feed-4',
    location: 'West Industrial Substation',
    time: '24m ago',
    type: 'dept',
    message: 'Substation Engineer: Load transferred to alternate feeder to minimize downtime.',
    source: 'Grid Control Room'
  }
];

const ZONES = ['All Zones', 'North Heights', 'Downtown Core', 'West Industrial', 'Lakeview Sector'];

export default function LiveMapPreview() {
  const [selectedOutage, setSelectedOutage] = useState(MOCK_OUTAGES[0]);
  const [activeZone, setActiveZone] = useState('All Zones');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOutages = MOCK_OUTAGES.filter(outage => {
    if (activeZone !== 'All Zones' && !outage.zone.toLowerCase().includes(activeZone.toLowerCase().split(' ')[0])) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        outage.zone.toLowerCase().includes(q) ||
        outage.substation.toLowerCase().includes(q) ||
        outage.status.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <section id="live-map" className="map-preview-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag blue">
            <ActivityIcon size={16} />
            <span>Interactive Feeder Telemetry</span>
          </div>
          <h2 className="section-title">Live Civic Outage Map</h2>
          <p className="section-desc">
            Explore live incident clusters, feeder status, and verified engineering updates. 
            Citizens and grid operators share synchronized visibility.
          </p>
        </div>

        <div className="map-preview-wrapper">
          {/* Top Map Toolbar */}
          <div className="map-toolbar">
            <div className="map-search-box">
              <SearchIcon size={18} className="search-icon" />
              <input 
                type="text"
                placeholder="Search area, feeder code, or locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="map-zone-filters">
              {ZONES.map((zone) => (
                <button
                  key={zone}
                  type="button"
                  className={`zone-filter-pill ${activeZone === zone ? 'active' : ''}`}
                  onClick={() => setActiveZone(zone)}
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>

          {/* Map & Feed Grid */}
          <div className="map-view-layout">
            {/* Visual Canvas Representation */}
            <div className="map-canvas-container" role="region" aria-label="Visual Map Area">
              {/* SVG Grid and Simulated City Streets */}
              <svg className="map-grid-bg" viewBox="0 0 800 500" fill="none" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#162238" strokeWidth="1" />
                  </pattern>
                  <linearGradient id="feeder-line-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4"/>
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                
                {/* Simulated Road and Feeder Network */}
                <path d="M 50 120 Q 240 180 400 130 T 750 200" stroke="#1f2f4c" strokeWidth="6" strokeLinecap="round" />
                <path d="M 120 450 Q 300 320 480 380 T 720 280" stroke="#1f2f4c" strokeWidth="5" strokeLinecap="round" />
                <path d="M 280 50 L 320 450" stroke="#1e2e4a" strokeWidth="4" strokeDasharray="6 6" />
                <path d="M 560 30 L 520 470" stroke="#1e2e4a" strokeWidth="4" strokeDasharray="6 6" />
                
                {/* Feeder Power Line Overlay */}
                <path d="M 224 180 L 416 290 L 608 160" stroke="url(#feeder-line-glow)" strokeWidth="2.5" strokeDasharray="4 4" />
                
                {/* Substation Nodes */}
                <circle cx="224" cy="180" r="14" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="416" cy="290" r="16" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="608" cy="160" r="14" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              </svg>

              {/* Map Legend Overlay */}
              <div className="map-legend-overlay">
                <span className="legend-title">Grid Status Key</span>
                <div className="legend-item">
                  <span className="legend-dot red"></span>
                  <span>Active Outage</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot amber"></span>
                  <span>Under Investigation</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot green"></span>
                  <span>Restored / Operational</span>
                </div>
              </div>

              {/* Outage Pins */}
              {filteredOutages.map((outage) => (
                <button
                  key={outage.id}
                  type="button"
                  className={`map-pin-marker ${outage.type} ${selectedOutage?.id === outage.id ? 'active' : ''}`}
                  style={{ left: outage.x, top: outage.y }}
                  onClick={() => setSelectedOutage(outage)}
                  aria-label={`View outage in ${outage.zone}`}
                >
                  <div className="pin-bubble">
                    <span className="pin-ring"></span>
                    <BoltIcon size={18} />
                  </div>
                  <div className="pin-tooltip">{outage.zone.split(' - ')[0]}</div>
                </button>
              ))}

              {/* Selected Incident Card */}
              {selectedOutage && (
                <div className="map-selected-card">
                  <div className="card-top">
                    <div>
                      <h4 className="card-zone-title">{selectedOutage.zone}</h4>
                      <p className="card-substation">{selectedOutage.substation}</p>
                    </div>
                    <span className={`status-badge ${selectedOutage.badgeClass}`}>
                      {selectedOutage.status}
                    </span>
                  </div>

                  <div className="card-meta-grid">
                    <div className="card-meta-item">
                      <span className="meta-label">Affected Area</span>
                      <span className="meta-val">{selectedOutage.affectedUnits}</span>
                    </div>
                    <div className="card-meta-item">
                      <span className="meta-label">Estimated Restoration</span>
                      <span className="meta-val etr">{selectedOutage.etr}</span>
                    </div>
                  </div>

                  <div className="card-dept-note">
                    <strong>Electricity Board Field Note</strong>
                    {selectedOutage.deptNote}
                  </div>

                  <div className="card-footer-action">
                    <span className="trust-item">
                      <UsersIcon size={14} />
                      {selectedOutage.confirmations} community confirmations
                    </span>
                    <span className="trust-item">
                      <ClockIcon size={14} />
                      Reported {selectedOutage.reportedAt}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Live Incident Activity Feed */}
            <div className="map-activity-feed">
              <div className="feed-header">
                <div className="feed-title">
                  <ActivityIcon size={18} />
                  <span>Real-time Log</span>
                </div>
                <span className="feed-count">Live Updates</span>
              </div>

              <div className="feed-list">
                {MOCK_LIVE_FEED.map((item) => (
                  <div key={item.id} className="feed-item">
                    <div className="feed-item-top">
                      <span className="feed-item-location">{item.location}</span>
                      <span className="feed-item-time">{item.time}</span>
                    </div>
                    <p className="feed-item-desc">{item.message}</p>
                    <div className="feed-item-footer">
                      <span className={`feed-verifier ${item.type === 'dept' ? 'dept' : ''}`}>
                        {item.type === 'dept' ? <ShieldCheckIcon size={13} /> : <CheckCircleIcon size={13} />}
                        {item.source}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
