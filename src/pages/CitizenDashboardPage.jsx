import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../AuthContext';
import { BoltIcon, CheckCircleIcon, ClockIcon } from '../components/common/Icons';

export default function CitizenDashboardPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function fetchUserReports() {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setReports(data || []);
      } catch (err) {
        console.error('Error fetching citizen reports:', err.message);
        setErrorMsg('Failed to load your submitted tickets. Please try refreshing.');
      } finally {
        setLoading(false);
      }
    }

    fetchUserReports();
  }, [user]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
        return <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#059669', color: '#fff', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircleIcon size={14} /> Resolved</span>;
      case 'investigating':
      case 'in_progress':
        return <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#d97706', color: '#fff', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><ClockIcon size={14} /> Under Review</span>;
      default:
        return <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#0284c7', color: '#fff', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><BoltIcon size={14} /> Submitted</span>;
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto', color: '#fff' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Citizen Incident Hub</h1>
        <p style={{ color: '#9ca3af' }}>Track real-time restoration progress and history for your reported outages.</p>
      </header>

      {errorMsg && (
        <div style={{ color: '#ef4444', backgroundColor: '#fef2f215', border: '1px solid #ef4444', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#9ca3af' }}>
          <p>Fetching your ticket records...</p>
        </div>
      ) : reports.length === 0 ? (
        <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #334155' }}>
          <BoltIcon size={48} style={{ color: '#eab308', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>No Active Outage Reports</h3>
          <p style={{ color: '#9ca3af', marginTop: '8px' }}>You haven't submitted any incident reports yet. If your power is out, use the "Report Outage" button in the menu.</p>
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
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontWeight: '700', color: '#f59e0b', fontSize: '16px' }}>PW-{report.id}</span>
                  {getStatusBadge(report.status)}
                </div>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                  {new Date(report.created_at).toLocaleString()}
                </span>
              </div>

              <div style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5' }}>
                {report.description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}