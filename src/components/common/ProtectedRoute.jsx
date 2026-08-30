import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading session...</div>;
  }

  // Not logged in -> send to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role authorization if allowedRoles array is provided
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    // Redirect citizens trying to access department routes back to citizen dashboard
    return <Navigate to="/citizen" replace />;
  }

  return children;
}