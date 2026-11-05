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
import Classic2DView from './components/ui/Classic2DView';
import { useExperienceStore } from './store/useExperienceStore';

export default function App() {
  const { viewMode } = useExperienceStore();

  // Prevent scroll bounce on iOS/mobile when in 3D mode
  useEffect(() => {
    if (viewMode === '3d') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [viewMode]);

  return (
    <div className="relative w-screen h-screen min-h-screen bg-[#07070a] text-zinc-100 select-none overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
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
        <main className="relative w-full h-full overflow-y-auto">
          <Classic2DView />
        </main>
      )}

      {/* 3. Global Subpage Modals & Drawers */}
      <ServiceDrawer />
      <PortfolioModal />
      <CostCalculatorModal />
      <AboutModal />
      <BookingModal />
    </div>
  );
}
