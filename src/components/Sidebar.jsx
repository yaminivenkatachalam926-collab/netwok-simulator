import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Network,
  Server,
  Send,
  GitBranch,
  Activity,
  Zap,
  Settings,
  Radio
} from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/topology', label: 'Network Topology', icon: Network },
    { path: '/devices', label: 'Devices', icon: Server },
    { path: '/packets', label: 'Packet Simulator', icon: Send },
    { path: '/routing', label: 'Routing Protocols', icon: GitBranch },
    { path: '/monitoring', label: 'Monitoring', icon: Activity },
    { path: '/scenarios', label: 'Chaos Scenarios', icon: Zap },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <Network size={22} />
        </div>
        <div>
          <div className="sidebar-title">Campus NetSim</div>
          <div className="sidebar-subtitle">LAN • MAN • WAN</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Footer */}
      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Radio size={14} style={{ color: '#a78bfa' }} />
          <span>v1.0 — CN Mini Project</span>
        </div>
      </div>
    </aside>
  );
}
