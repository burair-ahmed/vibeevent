import { useState, useEffect } from 'react';

// Simple, fast reactive global store without heavy extra state libraries
let globalState = {
  entranceState: 'outside', // 'outside' | 'opening' | 'inside'
  leftDoorOpen: false,      // independent left door state (true = open, false = closed)
  rightDoorOpen: false,     // independent right door state (true = open, false = closed)
  activeService: null,
  activeModal: null, // 'portfolio' | 'calculator' | 'about' | 'booking' | null
  isSoundEnabled: false,
  viewMode: '3d', // '3d' | '2d'
  cameraWaypoint: 'entrance', // 'entrance' | 'hall' | 'services' | 'stage' | null
  waypointVersion: 0,        // increments on every setCameraWaypoint call (forces re-trigger)
  customHotspotTarget: null,  // [x, y, z] target when clicking a ground hotspot
  isMobile: false,
  activeZone: 'entrance',    // proximity-detected zone camera is currently IN: 'entrance' | 'hall' | 'services' | 'stage'
  estimatorState: {
    eventType: 'corporate',
    guestCount: 350,
    tier: 'luxury',
    addons: {
      projectionMapping: true,
      droneShow: false,
      michelinCatering: true,
      liveBroadcast: false,
    },
    estimate: {
      low: '42,000',
      high: '54,000',
      stageCost: '21,000',
      avCost: '16,000',
      hospitalityCost: '12,000',
    },
  },
  bookingPrefill: null, // Holds quote snapshot when transferring to booking form
};

const listeners = new Set();

function notifyListeners() {
  listeners.forEach((listener) => listener({ ...globalState }));
}

export function setExperienceState(updater) {
  if (typeof updater === 'function') {
    globalState = { ...globalState, ...updater(globalState) };
  } else {
    globalState = { ...globalState, ...updater };
  }
  notifyListeners();
}

export function useExperienceStore() {
  const [state, setState] = useState({ ...globalState });

  useEffect(() => {
    listeners.add(setState);
    return () => listeners.delete(setState);
  }, []);

  // Open both doors and transition inside
  const openDoors = () => {
    setExperienceState({
      entranceState: 'opening',
      leftDoorOpen: true,
      rightDoorOpen: true,
    });
  };

  // Toggle individual doors cleanly
  const toggleLeftDoor = () => {
    setExperienceState((prev) => ({
      leftDoorOpen: !prev.leftDoorOpen,
    }));
  };

  const toggleRightDoor = () => {
    setExperienceState((prev) => ({
      rightDoorOpen: !prev.rightDoorOpen,
    }));
  };

  const finishDoorEntrance = () => {
    setExperienceState({ entranceState: 'inside', cameraWaypoint: 'hall' });
  };

  const moveToHotspot = (position, { keepState = false } = {}) => {
    setExperienceState((prev) => ({
      customHotspotTarget: position,
      cameraWaypoint: null, // clear waypoint highlight — user is free-roaming via hotspot
      activeService: null, // clear drawer if open
      entranceState: keepState ? prev.entranceState : 'inside', // exterior hotspots keep current state
    }));
  };

  const setActiveService = (service) => {
    setExperienceState({ activeService: service });
  };

  const closeServiceDrawer = () => {
    setExperienceState({ activeService: null });
  };

  const setActiveModal = (modalName) => {
    setExperienceState({ activeModal: modalName });
  };

  const closeModal = () => {
    setExperienceState({ activeModal: null });
  };

  const toggleSound = () => {
    setExperienceState((prev) => ({ isSoundEnabled: !prev.isSoundEnabled }));
  };

  const setViewMode = (mode) => {
    setExperienceState({ viewMode: mode });
  };

  const setCameraWaypoint = (waypoint) => {
    setExperienceState((prev) => ({ 
      cameraWaypoint: waypoint,
      waypointVersion: prev.waypointVersion + 1, // always increment — forces useEffect re-trigger even for same waypoint
      customHotspotTarget: null,
      entranceState: prev.entranceState === 'outside' && waypoint !== 'entrance' ? 'inside' : prev.entranceState,
      leftDoorOpen: waypoint !== 'entrance' ? true : prev.leftDoorOpen,
      rightDoorOpen: waypoint !== 'entrance' ? true : prev.rightDoorOpen,
    }));
  };

  // Called from CameraController every ~0.5s — updates which zone the camera is currently IN
  // Uses globalState.activeZone directly to avoid stale closure re-render thrashing
  const setActiveZone = (zone) => {
    if (globalState.activeZone !== zone) {
      setExperienceState({ activeZone: zone });
    }
  };

  // Update estimator state (both on-page & modal share this)
  const updateEstimatorState = (partial) => {
    setExperienceState((prev) => ({
      estimatorState: {
        ...prev.estimatorState,
        ...partial,
      },
    }));
  };

  const setBookingPrefill = (prefillData) => {
    setExperienceState({ bookingPrefill: prefillData });
  };

  const clearBookingPrefill = () => {
    setExperienceState({ bookingPrefill: null });
  };

  return {
    ...state,
    openDoors,
    toggleLeftDoor,
    toggleRightDoor,
    finishDoorEntrance,
    moveToHotspot,
    setActiveService,
    closeServiceDrawer,
    setActiveModal,
    closeModal,
    toggleSound,
    setViewMode,
    setCameraWaypoint,
    setActiveZone,
    updateEstimatorState,
    setBookingPrefill,
    clearBookingPrefill,
  };
}
