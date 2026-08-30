import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ReportModal from './components/common/ReportModal';
import Toast from './components/common/Toast';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LiveMapPage from './pages/LiveMapPage';
import LoginPage from './pages/LoginPage';
import CitizenDashboardPage from './pages/CitizenDashboardPage';
import DepartmentDashboardPage from './pages/DepartmentDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

import './App.css';

export default function App() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleOpenGetStarted = () => {
    setIsReportModalOpen(true);
  };

  const handleReportSuccess = (ticketId) => {
    setToast({
      title: 'Report Clustered Successfully',
      message: `Incident #${ticketId} registered into local feeder cluster. Realtime updates enabled.`
    });
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar 
          onOpenReport={() => setIsReportModalOpen(true)}
          onOpenGetStarted={handleOpenGetStarted}
        />

        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <LandingPage 
                  onOpenReport={() => setIsReportModalOpen(true)} 
                />
              } 
            />
            <Route path="/live-map" element={<LiveMapPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/citizen" 
              element={
                <ProtectedRoute allowedRoles={['citizen', 'department', 'admin']}>
                  <CitizenDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/department" 
              element={
                <ProtectedRoute allowedRoles={['department', 'admin']}>
                  <DepartmentDashboardPage />
                </ProtectedRoute>
              } 
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer onOpenReport={() => setIsReportModalOpen(true)} />

        <ReportModal 
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onReportSuccess={handleReportSuccess}
        />

        <Toast 
          toast={toast}
          onClose={() => setToast(null)}
        />
      </div>
    </BrowserRouter>
  );
}