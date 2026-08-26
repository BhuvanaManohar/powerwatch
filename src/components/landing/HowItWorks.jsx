import { 
  BoltIcon, 
  ShieldCheckIcon, 
  BuildingOfficeIcon, 
  CheckCircleIcon,
  ClockIcon,
  SparklesIcon,
  UsersIcon
} from '../common/Icons';
import '../../styles/HowItWorks.css';

const STEPS = [
  {
    stepNumber: '01',
    title: 'Report',
    icon: <BoltIcon size={24} />,
    desc: 'Citizens report power cuts in under 30 seconds with simple location picking, description, and optional photo.',
    chip: '30-Second Fast Report',
    chipIcon: <ClockIcon size={14} />
  },
  {
    stepNumber: '02',
    title: 'Verify',
    icon: <ShieldCheckIcon size={24} />,
    desc: 'Smart algorithms cluster nearby reports onto specific feeder lines, eliminating duplicate tickets automatically.',
    chip: 'Neighborhood Verification',
    chipIcon: <UsersIcon size={14} />
  },
  {
    stepNumber: '03',
    title: 'Department Update',
    icon: <BuildingOfficeIcon size={24} />,
    desc: 'Electricity department technicians log root causes, dispatch field crews, and publish estimated restoration times (ETR).',
    chip: 'Direct Utility Sync',
    chipIcon: <SparklesIcon size={14} />
  },
  {
    stepNumber: '04',
    title: 'Restore',
    icon: <CheckCircleIcon size={24} />,
    desc: 'Grid restoration alerts are broadcasted to affected households and verified by neighborhood feedback.',
    chip: 'Community Confirmed',
    chipIcon: <CheckCircleIcon size={14} />
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <SparklesIcon size={16} />
            <span>Civic Workflow</span>
          </div>
          <h2 className="section-title">How PowerWatch Works</h2>
          <p className="section-desc">
            A transparent four-stage lifecycle transforming chaotic power outages into 
            structured, real-time collaboration between citizens and grid repair teams.
          </p>
        </div>

        <div className="steps-timeline-grid">
          {STEPS.map((step) => (
            <div key={step.stepNumber} className="step-card">
              <div className="step-top">
                <div className="step-number-badge">{step.stepNumber}</div>
                <div className="step-icon-box">
                  {step.icon}
                </div>
              </div>
              
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              
              <div className="step-highlight-chip">
                {step.chipIcon}
                <span>{step.chip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
