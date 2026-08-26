import { 
  AlertTriangleIcon, 
  UsersIcon, 
  BuildingOfficeIcon, 
  ClockIcon, 
  ActivityIcon,
  ShieldCheckIcon,
  RadioIcon
} from '../common/Icons';
import '../../styles/StatsOverview.css';

const STATS_DATA = [
  {
    id: 'active-outages',
    theme: 'rose',
    icon: <AlertTriangleIcon size={22} />,
    value: '14',
    label: 'Active Outages',
    badge: 'Real-time',
    description: 'Active feeder incidents under rapid field mitigation.'
  },
  {
    id: 'community-reports',
    theme: 'amber',
    icon: <UsersIcon size={22} />,
    value: '3,850+',
    label: 'Community Reports',
    badge: 'Crowd-Sourced',
    description: 'Verified citizen reports aggregated across all sectors.'
  },
  {
    id: 'dept-updates',
    theme: 'blue',
    icon: <BuildingOfficeIcon size={22} />,
    value: '98.4%',
    label: 'Department Updates',
    badge: 'Response Rate',
    description: 'Incidents acknowledged with estimated restoration time.'
  },
  {
    id: 'avg-resolution',
    theme: 'emerald',
    icon: <ClockIcon size={22} />,
    value: '42 min',
    label: 'Avg. Response Time',
    badge: 'Benchmark',
    description: 'Average time between first report and crew dispatch.'
  }
];

const PILLARS_DATA = [
  {
    id: 'pillar-1',
    theme: 'amber',
    icon: <ActivityIcon size={24} />,
    title: 'Rapid Incident Clustering',
    description: 'Eliminates duplicate phone reports by grouping neighborhood signals onto a single feeder map in real time.'
  },
  {
    id: 'pillar-2',
    theme: 'blue',
    icon: <ShieldCheckIcon size={24} />,
    title: 'Verified Utility Direct Sync',
    description: 'Electricity board engineers publish verified causes, dispatch status, and ETRs without call-center bottlenecks.'
  },
  {
    id: 'pillar-3',
    theme: 'emerald',
    icon: <RadioIcon size={24} />,
    title: 'Transparent Public Alerts',
    description: 'Instant notification broadcasts keep residents, hospitals, schools, and local businesses safely informed.'
  }
];

export default function StatsOverview() {
  return (
    <section className="stats-section" id="stats">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <ActivityIcon size={16} />
            <span>Civic Grid Telemetry</span>
          </div>
          <h2 className="section-title">Transparent City-Wide Outage Intelligence</h2>
          <p className="section-desc">
            Combining citizen reports with direct electricity department updates gives communities 
            clear answers when the power goes out.
          </p>
        </div>

        {/* 4 Metrics Grid */}
        <div className="stats-metrics-grid">
          {STATS_DATA.map((stat) => (
            <div key={stat.id} className={`stat-card ${stat.theme}`}>
              <div className="stat-card-accent-bar" />
              <div className="stat-header">
                <div className="stat-icon-wrapper">
                  {stat.icon}
                </div>
                <span className="stat-badge">{stat.badge}</span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <p className="stat-description">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* 3 Core Pillar Feature Cards */}
        <div className="features-pillars-grid">
          {PILLARS_DATA.map((pillar) => (
            <div key={pillar.id} className="feature-pillar-card">
              <div className={`pillar-icon ${pillar.theme}`}>
                {pillar.icon}
              </div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
