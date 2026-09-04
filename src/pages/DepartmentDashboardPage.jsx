import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { BoltIcon, CheckCircleIcon, ClockIcon, BuildingOfficeIcon, MapPinIcon } from '../components/common/Icons';

export default function DepartmentDashboardPage() {
  const [reports, setReports] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedIncidents, setSelectedIncidents] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);

      // 1. Fetch reports
      const { data: reportsData, error: reportsErr } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (reportsErr) throw reportsErr;
      setReports(reportsData || []);

      // 2. Fetch active incidents for linking options
      const { data: incidentsData, error: incidentsErr } = await supabase
        .from('incidents')
        .select('id, title, status')
        .order('created_at', { ascending: false });

      if (incidentsErr) console.warn('Could not load incidents dropdown:', incidentsErr.message);
      else setIncidents(incidentsData || []);

    } catch (err) {
      console.error('Error fetching department dashboard data:', err.message);
      setErrorMsg('Failed to load operational feeds. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (reportId, newStatus) => {
    setUpdatingId(reportId);
    try {
      const { error } = await supabase
        .from('reports')
        .update({ status: newStatus })
        .eq('id', reportId)
        .select();

      if (error) throw error;

      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error('Failed to update status:', err.message, err.code, err.details);
      alert(`Update failed: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLinkToIncident = async (reportId) => {
    const targetIncidentId = selectedIncidents[reportId];
    if (!targetIncidentId) {
      alert('Please select an active incident from the dropdown first.');
      return;
    }

    setUpdatingId(reportId);
    try {
      // Both target_report_id and target_incident_id are BIGINT numbers
      const { error } = await supabase.rpc('link_report_to_incident', {
        target_report_id: Number(reportId),
        target_incident_id: Number(targetIncidentId)
      });

      if (error) throw error;

      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, status: 'linked', incident_id: targetIncidentId } : r))
      );
    } catch (err) {
      console.error('Failed to link report to incident:', err.message);
      alert(`Linking failed: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'reviewed':
        return (
          <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#d97706', color: '#fff', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <ClockIcon size={14} /> Under Review
          </span>
        );
      case 'linked':
        return (
          <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#8b5cf6', color: '#fff', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <MapPinIcon size={14} /> Linked to Map
          </span>
        );
      case 'rejected':
        return (
          <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#ef4444', color: '#fff', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircleIcon size={14} /> Rejected
          </span>
        );
      default:
        return (
          <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#0284c7', color: '#fff', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <BoltIcon size={14} /> Submitted
          </span>
        );
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>
      <header style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <BuildingOfficeIcon size={32} style={{ color: '#3b82f6' }} />
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>Control Room Operations</h1>
          <p style={{ color: '#9ca3af' }}>Manage grid outages, assign field crews, and sync tickets to the Live Map.</p>
        </div>
      </header>

      {errorMsg && (
        <div style={{ color: '#ef4444', backgroundColor: '#fef2f215', border: '1px solid #ef4444', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#9ca3af' }}>
          <p>Loading control room feeds...</p>
        </div>
      ) : reports.length === 0 ? (
        <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #334155' }}>
          <CheckCircleIcon size={48} style={{ color: '#10b981', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>All Feeder Zones Operational</h3>
          <p style={{ color: '#9ca3af', marginTop: '8px' }}>No community outage signals currently reported.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {reports.map((report) => (
            <div 
              key={report.id} 
              style={{ 
                backgroundColor: '#1e293b', 
                padding: '20px', 
                borderRadius: '12px', 
                border: '1px solid #334155',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontWeight: '700', color: '#f59e0b', fontSize: '18px' }}>PW-{report.id}</span>
                  {getStatusBadge(report.status)}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleStatusChange(report.id, 'reviewed')}
                    disabled={updatingId === report.id || report.status === 'reviewed'}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      backgroundColor: report.status === 'reviewed' ? '#d9770633' : '#d97706',
                      color: '#fff',
                      border: 'none',
                      cursor: report.status === 'reviewed' ? 'default' : 'pointer',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Mark Reviewed
                  </button>

                  <button
                    onClick={() => handleStatusChange(report.id, 'rejected')}
                    disabled={updatingId === report.id || report.status === 'rejected'}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      backgroundColor: report.status === 'rejected' ? '#ef444433' : '#ef4444',
                      color: '#fff',
                      border: 'none',
                      cursor: report.status === 'rejected' ? 'default' : 'pointer',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Reject
                  </button>

                  {/* Incident Map Linking */}
                  {incidents.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px' }}>
                      <select
                        value={selectedIncidents[report.id] || ''}
                        onChange={(e) => setSelectedIncidents({ ...selectedIncidents, [report.id]: e.target.value })}
                        disabled={updatingId === report.id || report.status === 'linked'}
                        style={{
                          backgroundColor: '#0f172a',
                          color: '#fff',
                          border: '1px solid #475569',
                          borderRadius: '6px',
                          padding: '6px',
                          fontSize: '12px'
                        }}
                      >
                        <option value="">-- Select Map Incident --</option>
                        {incidents.map((inc) => (
                          <option key={inc.id} value={inc.id}>
                            {inc.title || `Incident #${inc.id}`} ({inc.status})
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => handleLinkToIncident(report.id)}
                        disabled={updatingId === report.id || report.status === 'linked' || !selectedIncidents[report.id]}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          backgroundColor: report.status === 'linked' ? '#8b5cf633' : '#8b5cf6',
                          color: '#fff',
                          border: 'none',
                          cursor: report.status === 'linked' ? 'default' : 'pointer',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        Link to Map
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5' }}>
                {report.description}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', borderTop: '1px solid #334155', paddingTop: '12px' }}>
                <span>User ID: {report.user_id}</span>
                <span>Submitted: {new Date(report.created_at).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}