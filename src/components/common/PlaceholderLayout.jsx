import { Link } from 'react-router-dom';
import { BoltIcon } from './Icons';
import '../../styles/PlaceholderPage.css';

export default function PlaceholderLayout({
  tag = 'Upcoming Feature',
  tagColor = 'amber',
  icon,
  title,
  description,
  plannedFeatures = [],
  primaryAction,
  secondaryAction
}) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-glow" aria-hidden="true" />
      
      <div className="placeholder-card">
        <div className={`section-tag ${tagColor === 'blue' ? 'blue' : ''}`}>
          <BoltIcon size={14} />
          <span>{tag}</span>
        </div>

        {icon && (
          <div>
            <div className={`placeholder-icon-box ${tagColor}`}>
              {icon}
            </div>
          </div>
        )}

        <h1 className="placeholder-title">{title}</h1>
        <p className="placeholder-desc">{description}</p>

        {plannedFeatures.length > 0 && (
          <div className="placeholder-features-box">
            <span className="features-box-title">Planned for next release:</span>
            <ul className="placeholder-features-list">
              {plannedFeatures.map((feat, idx) => (
                <li key={idx} className="placeholder-feature-item">
                  <span className="feature-dot" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="placeholder-actions">
          {primaryAction || (
            <Link to="/" className="pw-btn pw-btn-primary">
              <BoltIcon size={18} />
              <span>Return to Home</span>
            </Link>
          )}

          {secondaryAction}
        </div>
      </div>
    </div>
  );
}
