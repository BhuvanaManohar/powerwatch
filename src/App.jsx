import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ReportModal from './components/common/ReportModal';
import Toast from './components/common/Toast';

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
        {/* Navigation Bar with Router Integration */}
        <Navbar 
          onOpenReport={() => setIsReportModalOpen(true)}
          onOpenGetStarted={handleOpenGetStarted}
        />

        {/* Dynamic Route Pages */}
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
            <Route path="/citizen" element={<CitizenDashboardPage />} />
            <Route path="/department" element={<DepartmentDashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Civic Footer */}
        <Footer 
          onOpenReport={() => setIsReportModalOpen(true)}
        />

        {/* Global Interactive Report Modal */}
        <ReportModal 
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onReportSuccess={handleReportSuccess}
        />

        {/* Global Toast Notification */}
        <Toast 
          toast={toast}
          onClose={() => setToast(null)}
        />
      </div>
    </BrowserRouter>
  );
}
