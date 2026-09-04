import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../AuthContext';
import { 
  BoltIcon, 
  XIcon, 
  CheckCircleIcon, 
  MapPinIcon, 
  AlertTriangleIcon
} from './Icons';
import '../../styles/ReportModal.css';

const OUTAGE_TYPES = [
  { id: 'total', label: 'Complete Blackout', icon: <BoltIcon size={16} /> },
  { id: 'partial', label: 'Partial / Single Phase', icon: <AlertTriangleIcon size={16} /> },
  { id: 'voltage', label: 'Voltage Surge / Drop', icon: <AlertTriangleIcon size={16} /> },
  { id: 'streetlight', label: 'Streetlight Circuit', icon: <MapPinIcon size={16} /> },
];

const SECTORS = [
  'Sector 4B - North Heights',
  'Downtown Commercial District',
  'West Industrial Corridor',
  'Lakeview Residential Enclave',
  'South Substation Colony',
  'Eastern Technology Park'
];

export default function ReportModal({ isOpen, onClose, onReportSuccess }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [sector, setSector] = useState(SECTORS[0]);
  const [outageType, setOutageType] = useState('total');
  const [streetAddress, setStreetAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Require authentication before reporting
    if (!user) {
      onClose();
      navigate('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert report record into Supabase public.reports table safely
      const { data, error } = await supabase
        .from('reports')
        .insert([
          {
            user_id: user.id,
            location_id: 1, // Linking to seeded Ward location
            description: `[Sector: ${sector}] [Type: ${outageType.toUpperCase()}] ${streetAddress ? `Address: ${streetAddress} | ` : ''}${description}`,
            status: 'submitted'
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Generate tracking reference from database ID
      const ticketId = `PW-${data.id || Math.floor(1000 + Math.random() * 9000)}`;

      setSubmittedTicket({
        id: ticketId,
        sector,
        type: outageType
      });

      if (onReportSuccess) {
        onReportSuccess(ticketId);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setStreetAddress('');
    setDescription('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="report-modal" onClick={(e) => e.stopPropagation()}>
        {submittedTicket ? (
          /* Submission Success State */
          <div className="modal-success">
            <div className="success-icon-box">
              <CheckCircleIcon size={34} />
            </div>
            <h3 className="success-title">Outage Report Logged!</h3>
            <p className="success-desc">
              Your report has been verified and clustered with neighboring reports in{' '}
              <strong>{submittedTicket.sector}</strong>.
            </p>
            <div className="ticket-pill">
              <span>Tracking Ticket:</span>
              <strong>{submittedTicket.id}</strong>
            </div>
            <button 
              type="button" 
              className="pw-btn pw-btn-primary"
              onClick={handleReset}
            >
              Done & Return to Map
            </button>
          </div>
        ) : (
          /* Reporting Form */
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <div className="modal-title-box">
                <BoltIcon size={22} className="modal-title-icon" />
                <h3>Report a Power Outage</h3>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={onClose}
                aria-label="Close modal"
              >
                <XIcon size={20} />
              </button>
            </div>

            <div className="modal-body">
              {errorMsg && (
                <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '10px', borderRadius: '6px', marginBottom: '12px', fontSize: '14px' }}>
                  {errorMsg}
                </div>
              )}

              {/* Sector Selection */}
              <div className="form-group">
                <label className="form-label" htmlFor="sector-select">
                  Select Affected Area / Sector
                </label>
                <select 
                  id="sector-select"
                  className="form-select"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  required
                >
                  {SECTORS.map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>

              {/* Outage Type */}
              <div className="form-group">
                <label className="form-label">Outage Nature</label>
                <div className="outage-type-grid">
                  {OUTAGE_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      className={`type-option-btn ${outageType === type.id ? 'selected' : ''}`}
                      onClick={() => setOutageType(type.id)}
                    >
                      {type.icon}
                      <span>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Street / Landmark */}
              <div className="form-group">
                <label className="form-label" htmlFor="street-input">
                  Street / Landmark / House No. (Optional)
                </label>
                <input 
                  id="street-input"
                  type="text"
                  className="form-input"
                  placeholder="e.g. 4th Cross Road near Community Park"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
              </div>

              {/* Additional Notes */}
              <div className="form-group">
                <label className="form-label" htmlFor="desc-textarea">
                  Details / Observations
                </label>
                <textarea 
                  id="desc-textarea"
                  className="form-textarea"
                  placeholder="e.g. Spark heard from transformer pole, or power went out right after heavy rain..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="pw-btn pw-btn-ghost" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="pw-btn pw-btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Signal...' : 'Submit Incident Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}