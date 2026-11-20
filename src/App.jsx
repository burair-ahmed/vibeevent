import { useEffect } from 'react';
import CanvasContainer from './components/3d/CanvasContainer';
import HeaderHUD from './components/ui/HeaderHUD';
import EntranceOverlay from './components/ui/EntranceOverlay';
import WaypointDock from './components/ui/WaypointDock';
import ServiceDrawer from './components/ui/ServiceDrawer';
import PortfolioModal from './components/ui/PortfolioModal';
import CostCalculatorModal from './components/ui/CostCalculatorModal';
import AboutModal from './components/ui/AboutModal';
import BookingModal from './components/ui/BookingModal';
import PolicyModal from './components/ui/PolicyModal';
import Classic2DView from './components/ui/Classic2DView';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import SafetyPolicyPage from './pages/SafetyPolicyPage';
import { useExperienceStore } from './store/useExperienceStore';

export default function App() {
  const { viewMode, currentRoute } = useExperienceStore();

  const isPolicyPage = ['privacy', 'terms', 'refund', 'safety'].includes(currentRoute);

  // Prevent scroll bounce on iOS/mobile when in 3D mode on home page
  useEffect(() => {
    if (viewMode === '3d' && !isPolicyPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [viewMode, isPolicyPage]);

  // Render individual policy page if navigated to
  if (isPolicyPage) {
    return (
      <div className="relative w-full min-h-screen bg-[#07070a] text-zinc-100 font-['Plus_Jakarta_Sans',sans-serif]">
        {currentRoute === 'privacy' && <PrivacyPolicyPage />}
        {currentRoute === 'terms' && <TermsConditionsPage />}
        {currentRoute === 'refund' && <RefundPolicyPage />}
        {currentRoute === 'safety' && <SafetyPolicyPage />}

        {/* Global modals can still be opened (e.g. Booking consultation) */}
        <BookingModal />
        <CostCalculatorModal />
        <AboutModal />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full bg-[#07070a] text-zinc-100 font-['Plus_Jakarta_Sans',sans-serif] ${
        viewMode === '3d' ? 'w-screen h-screen min-h-screen select-none overflow-hidden' : 'min-h-screen'
      }`}
    >
      {/* 1. Global Navigation Header */}
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

      {/* 3. Global Subpage Modals & Drawers */}
      <ServiceDrawer />
      <PortfolioModal />
      <CostCalculatorModal />
      <AboutModal />
      <BookingModal />
      <PolicyModal />
    </div>
  );
}
