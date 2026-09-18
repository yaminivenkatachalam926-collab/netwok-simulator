import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Server,
  Network,
  Activity,
  Send,
  GitBranch,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Wifi,
  Cpu,
  MemoryStick,
  PackageSearch
} from 'lucide-react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import { useNetwork } from '../context/NetworkContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function Dashboard() {
  const navigate = useNavigate();
  const { metrics, activityLogs, timeSeriesData, devices, links } = useNetwork();

  const quickActions = [
    { label: 'View Topology', path: '/topology', icon: Network, color: '#7c3aed' },
    { label: 'Manage Devices', path: '/devices', icon: Server, color: '#2563eb' },
    { label: 'Packet Simulator', path: '/packets', icon: Send, color: '#10b981' },
    { label: 'Routing Protocols', path: '/routing', icon: GitBranch, color: '#f59e0b' },
    { label: 'Monitoring', path: '/monitoring', icon: Activity, color: '#ef4444' },
    { label: 'Chaos Scenarios', path: '/scenarios', icon: Zap, color: '#8b5cf6' },
  ];

  const areaStats = {
    LAN: devices.filter(d => d.area === 'LAN').length,
    MAN: devices.filter(d => d.area === 'MAN').length,
    WAN: devices.filter(d => d.area === 'WAN').length,
  };

  return (
    <div>
      <Header
        title="Campus NetSim — Overview"
        subtitle="Real-time network simulation dashboard for LAN • MAN • WAN"
      />

      <div className="page-wrapper">

        {/* KPI Cards */}
        <div className="grid-4" style={{ marginBottom: '24px' }}>
          <StatCard
            title="Total Devices"
            value={metrics.totalDevices}
            subtitle={`${metrics.activeDevices} Active · ${metrics.standbyDevices} Standby`}
            icon={Server}
            accent="purple"
          />
          <StatCard
            title="Network Links"
            value={`${metrics.linksOnline}/${metrics.totalLinks}`}
            subtitle={`${metrics.totalLinks - metrics.linksOnline} down`}
            icon={Network}
            accent="blue"
          />
          <StatCard
            title="Throughput"
            value={`${metrics.throughput} Gbps`}
            subtitle="Aggregated bandwidth"
            icon={Wifi}
            accent="green"
          />
          <StatCard
            title="Packet Delivery"
            value={`${metrics.deliverySuccess}%`}
            subtitle={`${metrics.packetsTransmitted} packets sent`}
            icon={Send}
            accent={metrics.deliverySuccess < 95 ? 'red' : 'green'}
          />
        </div>

        {/* Secondary KPIs */}
        <div className="grid-3" style={{ marginBottom: '24px' }}>
          <StatCard
            title="CPU Utilization"
            value={`${metrics.cpuUtilization}%`}
            subtitle="Core router average"
            icon={Cpu}
            accent={metrics.cpuUtilization > 80 ? 'red' : 'orange'}
          />
          <StatCard
            title="Memory Usage"
            value={`${metrics.memoryUsage}%`}
            subtitle="Switch memory pool"
            icon={MemoryStick}
            accent="blue"
          />
          <StatCard
            title="Packet Loss"
            value={`${metrics.packetLoss}%`}
            subtitle={`Avg latency ${metrics.latency}ms`}
            icon={PackageSearch}
            accent={metrics.packetLoss > 2 ? 'red' : 'green'}
          />
        </div>

        {/* Charts + Activity Row */}
        <div className="grid-2" style={{ marginBottom: '24px' }}>
          {/* Throughput Chart */}
          <div className="card">
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px', color: '#1e293b' }}>
              📈 Network Throughput (24h)
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="throughput" stroke="#7c3aed" strokeWidth={2} dot={false} name="Throughput (Gbps)" />
                <Line type="monotone" dataKey="packetLoss" stroke="#ef4444" strokeWidth={2} dot={false} name="Loss (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Log */}
          <div className="card">
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '12px', color: '#1e293b' }}>
              🗒 Recent Activity
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
              {activityLogs.slice(0, 8).map(log => (
                <div key={log.id} style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#94a3b8', flexShrink: 0, fontFamily: 'monospace' }}>{log.time}</span>
                  {log.status === 'success'
                    ? <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0, marginTop: 1 }} />
                    : <AlertTriangle size={14} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 1 }} />
                  }
                  <span style={{ color: '#334155' }}>{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Network Area Breakdown */}
        <div className="grid-3" style={{ marginBottom: '24px' }}>
          {Object.entries(areaStats).map(([area, count]) => {
            const colors = { LAN: '#7c3aed', MAN: '#2563eb', WAN: '#10b981' };
            const labels = {
              LAN: 'Local Area Network — Campus Buildings',
              MAN: 'Metropolitan Area Network — City Links',
              WAN: 'Wide Area Network — Internet Gateway'
            };
            return (
              <div className="card" key={area} style={{ borderLeft: `4px solid ${colors[area]}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.5rem', color: colors[area] }}>{count}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>{area} Devices</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{labels[area]}</div>
                  </div>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    backgroundColor: `${colors[area]}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: colors[area]
                  }}>
                    <Network size={22} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px', color: '#1e293b' }}>
            ⚡ Quick Actions
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {quickActions.map(action => {
              const Icon = action.icon;
              return (
                <button
                  key={action.path}
                  onClick={() => navigate(action.path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '12px 16px', borderRadius: '10px', cursor: 'pointer',
                    backgroundColor: `${action.color}11`,
                    border: `1px solid ${action.color}33`,
                    transition: 'all 0.2s ease', textAlign: 'left',
                    color: '#1e293b', fontFamily: 'inherit'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = `${action.color}22`}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = `${action.color}11`}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '8px',
                    backgroundColor: `${action.color}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: action.color, flexShrink: 0
                  }}>
                    <Icon size={18} />
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{action.label}</span>
                  <ArrowRight size={14} style={{ marginLeft: 'auto', color: '#94a3b8' }} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Links Status */}
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '14px', color: '#1e293b' }}>
            🔗 Link Status Summary
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {links.map(link => (
              <div key={link.id} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600,
                backgroundColor: link.status === 'Online' ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${link.status === 'Online' ? '#bbf7d0' : '#fecaca'}`,
                color: link.status === 'Online' ? '#15803d' : '#b91c1c'
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor' }} />
                {link.id}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
