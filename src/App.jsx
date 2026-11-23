import { useEffect } from 'react';
import CanvasContainer from './components/3d/CanvasContainer';
import HeaderHUD from './components/ui/HeaderHUD';
import EntranceOverlay from './components/ui/EntranceOverlay';
import WaypointDock from './components/ui/WaypointDock';
import ServiceDrawer from './components/ui/ServiceDrawer';
import Classic2DView from './components/ui/Classic2DView';
import AboutPage from './pages/AboutPage';
import BookingPage from './pages/BookingPage';
import CostCalculatorPage from './pages/CostCalculatorPage';
import PortfolioPage from './pages/PortfolioPage';
import ServicesPage from './pages/ServicesPage';
import FaqPage from './pages/FaqPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import SafetyPolicyPage from './pages/SafetyPolicyPage';
import { useExperienceStore } from './store/useExperienceStore';

export default function App() {
  const { viewMode, currentRoute } = useExperienceStore();

  const isSubpage = currentRoute !== 'home';

  // Prevent scroll bounce on iOS/mobile when in 3D mode on home page
  useEffect(() => {
    if (viewMode === '3d' && !isSubpage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [viewMode, isSubpage]);

  // Render dedicated standalone pages when navigated to
  if (isSubpage) {
    return (
      <div className="relative w-full min-h-screen bg-[#07070a] text-zinc-100 font-['Plus_Jakarta_Sans',sans-serif]">
        {currentRoute === 'about' && <AboutPage />}
        {currentRoute === 'booking' && <BookingPage />}
        {(currentRoute === 'calculator' || currentRoute === 'estimator') && <CostCalculatorPage />}
        {currentRoute === 'portfolio' && <PortfolioPage />}
        {currentRoute === 'services' && <ServicesPage />}
        {(currentRoute === 'faq' || currentRoute === 'faqs') && <FaqPage />}
        {currentRoute === 'privacy' && <PrivacyPolicyPage />}
        {currentRoute === 'terms' && <TermsConditionsPage />}
        {currentRoute === 'refund' && <RefundPolicyPage />}
        {currentRoute === 'safety' && <SafetyPolicyPage />}
      </div>
    );
  }

  // Primary Experience Viewport: 3D Walkthrough or 2D Presentation
  return (
    <div
      className={`relative w-full bg-[#07070a] text-zinc-100 font-['Plus_Jakarta_Sans',sans-serif] ${
        viewMode === '3d' ? 'w-screen h-screen min-h-screen select-none overflow-hidden' : 'min-h-screen'
      }`}
    >
      {/* 1. Global Navigation Header HUD */}
      <HeaderHUD />

      {/* 2. Main Experience Viewport: 3D or 2D */}
      {viewMode === '3d' ? (
        <main className="relative w-full h-full">
          {/* 3D WebGL World */}
          <CanvasContainer />

          {/* Entrance Overlay (Doors Closed CTA) */}
          <EntranceOverlay />

          {/* Waypoint Bottom Dock (Inside the Grand Hall) */}
          <WaypointDock />
        </main>
      ) : (
        <main className="relative w-full min-h-screen">
          <Classic2DView />
        </main>
      )}

      {/* 3. Interactive Service Drawer (opens when a 3D plinth or service is selected) */}
      <ServiceDrawer />
    </div>
  );
}
