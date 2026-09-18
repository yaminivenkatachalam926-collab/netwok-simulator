import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NetworkProvider } from './context/NetworkContext';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';

import Dashboard from './pages/Dashboard';
import NetworkTopology from './pages/NetworkTopology';
import Devices from './pages/Devices';
import PacketSimulator from './pages/PacketSimulator';
import RoutingProtocols from './pages/RoutingProtocols';
import Monitoring from './pages/Monitoring';
import Scenarios from './pages/Scenarios';
import Settings from './pages/Settings';

export default function App() {
  return (
    <NetworkProvider>
      <BrowserRouter>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/topology" element={<NetworkTopology />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/packets" element={<PacketSimulator />} />
              <Route path="/routing" element={<RoutingProtocols />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/scenarios" element={<Scenarios />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
          <Toast />
        </div>
      </BrowserRouter>
    </NetworkProvider>
  );
}
