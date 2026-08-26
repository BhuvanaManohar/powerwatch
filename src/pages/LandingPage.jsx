import Hero from '../components/landing/Hero';
import LiveMapPreview from '../components/landing/LiveMapPreview';
import StatsOverview from '../components/landing/StatsOverview';
import HowItWorks from '../components/landing/HowItWorks';
import DepartmentConnection from '../components/landing/DepartmentConnection';
import QuickReportBanner from '../components/landing/QuickReportBanner';

export default function LandingPage({ onOpenReport }) {
  const handleScrollToMap = () => {
    const mapSection = document.getElementById('live-map');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Hero 
        onOpenReport={onOpenReport}
        onScrollToMap={handleScrollToMap}
      />
      <LiveMapPreview />
      <StatsOverview />
      <HowItWorks />
      <DepartmentConnection 
        onOpenReport={onOpenReport}
      />
      <QuickReportBanner 
        onOpenReport={onOpenReport}
        onScrollToMap={handleScrollToMap}
      />
    </>
  );
}
