import React from 'react';
import { Navigation } from './components/Navigation';
import { SimulationPage } from './components/SimulationPage';
export function App() {
  return <div className="min-h-screen relative bg-[#000000]">
      {/* Starfield background */}
      <div className="fixed inset-0 star-layer-1"></div>
      <div className="fixed inset-0 star-layer-2"></div>
      <div className="fixed inset-0 star-layer-3"></div>
      {/* Distant nebula effect */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10 mix-blend-screen"></div>
      {/* Deep space gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#000000] via-[#0A1A2F]/40 to-[#000000] opacity-90"></div>
      <div className="relative z-10">
        <Navigation />
        <SimulationPage />
      </div>
    </div>;
}