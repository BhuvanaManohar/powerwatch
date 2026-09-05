import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { supabase } from '../lib/supabaseClient';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function LiveMapPage() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('incidents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIncidents(data || []);
    } catch (err) {
      console.error('Error loading incidents on map:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();

    // Subscribe to real-time incident updates
    const channel = supabase
      .channel('public:incidents')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'incidents' },
        (payload) => {
          setIncidents((prev) =>
            prev.map((inc) => (inc.id === payload.new.id ? payload.new : inc))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>Live Outage Map</h1>
        <p style={{ color: '#9ca3af' }}>Real-time grid incident monitoring across active feeder zones.</p>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#9ca3af' }}>
          <p>Loading interactive grid map...</p>
        </div>
      ) : (
        <div style={{ height: '520px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
          <MapContainer 
            center={[16.5449, 81.7258]} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {incidents.map((incident) => (
              <Marker 
                key={incident.id} 
                position={[incident.latitude || 16.5449, incident.longitude || 81.7258]} 
                icon={customIcon}
              >
                <Popup>
                  <div style={{ color: '#0f172a', padding: '4px' }}>
                    <strong style={{ fontSize: '14px' }}>{incident.title || `Incident #${incident.id}`}</strong>
                    <div style={{ marginTop: '6px', fontSize: '12px' }}>
                      Status: <span style={{ fontWeight: '700', color: incident.status === 'investigating' ? '#d97706' : '#0284c7' }}>{incident.status?.toUpperCase()}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
}