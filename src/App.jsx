import { useState } from 'react';
import Navbar from './components/common/Navbar';
import Hero from './components/landing/Hero';
import LiveMapPreview from './components/landing/LiveMapPreview';
import StatsOverview from './components/landing/StatsOverview';
import HowItWorks from './components/landing/HowItWorks';
import DepartmentConnection from './components/landing/DepartmentConnection';
import QuickReportBanner from './components/landing/QuickReportBanner';
import Footer from './components/common/Footer';
import ReportModal from './components/common/ReportModal';
import Toast from './components/common/Toast';
import './App.css';

export default function App() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleScrollToMap = () => {
    const mapSection = document.getElementById('live-map');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLogin = () => {
    setToast({
      title: 'Citizen & Utility Portal',
      message: 'Authentication and verified crew accounts will be activated in Phase 2. Explore the live map and reporting flow!'
    });
  };

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
    <div className="app-wrapper">
      {/* Navigation Bar */}
      <Navbar 
        onOpenReport={() => setIsReportModalOpen(true)}
        onOpenLogin={handleOpenLogin}
        onOpenGetStarted={handleOpenGetStarted}
      />

      {/* Main Content Area */}
      <main>
        {/* 1. Hero Section */}
        <Hero 
          onOpenReport={() => setIsReportModalOpen(true)}
          onScrollToMap={handleScrollToMap}
        />

        {/* 2. Visual Representation of Live Outage Map */}
        <LiveMapPreview />

        {/* 3. Statistics & Core Features */}
        <StatsOverview />

        {/* 4. How PowerWatch Works */}
        <HowItWorks />

        {/* 5. Citizen + Electricity Department Connection */}
        <DepartmentConnection 
          onOpenReport={() => setIsReportModalOpen(true)}
          onOpenGetStarted={handleOpenGetStarted}
        />

        {/* 6. Quick Action Banner */}
        <QuickReportBanner 
          onOpenReport={() => setIsReportModalOpen(true)}
          onScrollToMap={handleScrollToMap}
        />
      </main>

      {/* 7. Civic Footer */}
      <Footer 
        onOpenReport={() => setIsReportModalOpen(true)}
      />

      {/* Interactive Report Outage Modal */}
      <ReportModal 
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onReportSuccess={handleReportSuccess}
      />

      {/* Notification Toast */}
      <Toast 
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
