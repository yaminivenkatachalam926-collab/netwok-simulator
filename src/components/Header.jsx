import React from 'react';
import { useNetwork } from '../context/NetworkContext';
import { Wifi } from 'lucide-react';

export default function Header({ title, subtitle }) {
  const { metrics } = useNetwork();

  const allOnline = metrics.activeDevices === metrics.totalDevices;

  return (
    <header className="top-header">
      <div className="header-title-box">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {metrics.activeDevices}/{metrics.totalDevices} devices active
        </span>
        <span
          className="status-pill"
          style={{
            backgroundColor: allOnline ? 'var(--color-green-light)' : '#fef3c7',
            color: allOnline ? '#065f46' : '#92400e',
            border: `1px solid ${allOnline ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`
          }}
        >
          <Wifi size={13} />
          {allOnline ? 'All Systems Online' : 'Degraded Mode'}
        </span>
      </div>
    </header>
  );
}
