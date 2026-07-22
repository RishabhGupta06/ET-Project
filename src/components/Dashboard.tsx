import React, { useState } from 'react';
import { Shield, Activity, AlertTriangle, Terminal, Network, Search, Bell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AttackGraph from './AttackGraph';

const anomalyData = [
  { time: '10:00', score: 0.1 },
  { time: '10:05', score: 0.15 },
  { time: '10:10', score: 0.12 },
  { time: '10:15', score: 0.89 },
  { time: '10:20', score: 0.95 },
  { time: '10:25', score: 0.4 },
  { time: '10:30', score: 0.2 },
];

const alerts = [
  { id: 1, severity: 'critical', type: 'Lateral Movement', target: 'DB-Prod-01', time: '10:15:32', mitre: 'T1021' },
  { id: 2, severity: 'high', type: 'Anomalous Login', target: 'Admin-PC', time: '10:14:15', mitre: 'T1078' },
  { id: 3, severity: 'medium', type: 'High CPU Usage', target: 'Web-Server-03', time: '10:12:05', mitre: 'T1496' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 p-4 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 glass-panel p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg text-primary">
            <Shield size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">AI Cyber Resilience</h1>
            <p className="text-xs text-gray-400">CNI Protection Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search assets, alerts, CVEs..." 
              className="bg-black/50 border border-gray-800 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-primary w-64 transition-all"
            />
          </div>
          <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent"></div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <div className="col-span-2 glass-panel rounded-2xl p-4 flex flex-col gap-2">
          <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-gray-400'}`}>
            <Activity size={20} /> <span className="font-medium">Overview</span>
          </button>
          <button onClick={() => setActiveTab('graph')} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'graph' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-gray-400'}`}>
            <Network size={20} /> <span className="font-medium">Attack Graph</span>
          </button>
          <button onClick={() => setActiveTab('alerts')} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'alerts' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-gray-400'}`}>
            <AlertTriangle size={20} /> <span className="font-medium">Threat Intel</span>
          </button>
          <button onClick={() => setActiveTab('copilot')} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'copilot' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-gray-400'}`}>
            <Terminal size={20} /> <span className="font-medium">AI Copilot</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="col-span-10 grid grid-cols-12 gap-6">
          
          {/* Main Graph Area */}
          <div className="col-span-8 flex flex-col gap-6">
            {/* Top Stats */}
            <div className="grid grid-cols-3 gap-6 h-28">
              <div className="glass-panel rounded-2xl p-4 flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-danger/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-gray-400 text-sm font-medium mb-1">Active Threats</h3>
                <div className="text-3xl font-bold text-white">3</div>
                <div className="text-xs text-danger mt-2 flex items-center gap-1"><AlertTriangle size={12}/> Critical severity</div>
              </div>
              <div className="glass-panel rounded-2xl p-4 flex flex-col justify-center">
                <h3 className="text-gray-400 text-sm font-medium mb-1">Monitored Assets</h3>
                <div className="text-3xl font-bold text-white">1,204</div>
                <div className="text-xs text-success mt-2">100% online</div>
              </div>
              <div className="glass-panel rounded-2xl p-4 flex flex-col justify-center">
                <h3 className="text-gray-400 text-sm font-medium mb-1">Anomaly Score</h3>
                <div className="text-3xl font-bold text-warning">89%</div>
                <div className="text-xs text-warning mt-2">Elevated risk detected</div>
              </div>
            </div>

            {/* Visualizer Area */}
            <div className="glass-panel rounded-2xl flex-1 p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">
                  {activeTab === 'overview' ? 'Behavioral Anomaly Score' : 'Attack Path Prediction'}
                </h2>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-danger/20 text-danger text-xs font-semibold border border-danger/30">Action Required</span>
                </div>
              </div>
              
              <div className="flex-1 relative bg-black/30 rounded-xl overflow-hidden border border-gray-800">
                {activeTab === 'overview' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={anomalyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="time" stroke="#666" tick={{fill: '#666'}} axisLine={false} />
                      <YAxis stroke="#666" tick={{fill: '#666'}} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#13131a', border: '1px solid #333', borderRadius: '8px' }}
                        itemStyle={{ color: '#0ea5e9' }}
                      />
                      <Line type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={3} dot={{r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#0a0a0f'}} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <AttackGraph />
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Alerts & Copilot */}
          <div className="col-span-4 flex flex-col gap-6">
            {/* Recent Alerts */}
            <div className="glass-panel rounded-2xl p-4 flex-1 flex flex-col max-h-[50%]">
              <h2 className="text-lg font-semibold text-white mb-4">Real-time Intel</h2>
              <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                {alerts.map(alert => (
                  <div key={alert.id} className="bg-black/40 border border-gray-800 rounded-xl p-3 hover:border-gray-600 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${alert.severity === 'critical' ? 'bg-danger' : alert.severity === 'high' ? 'bg-warning' : 'bg-primary'}`}></span>
                        <span className="font-semibold text-sm text-gray-200">{alert.type}</span>
                      </div>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                    <div className="flex justify-between items-end mt-3">
                      <div className="text-xs text-gray-400">Target: <span className="text-gray-300">{alert.target}</span></div>
                      <span className="px-2 py-1 bg-white/5 text-accent text-[10px] font-mono rounded-md border border-accent/20">
                        {alert.mitre}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Security Copilot */}
            <div className="glass-panel rounded-2xl p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="text-primary" size={20} />
                <h2 className="text-lg font-semibold text-white">AI Copilot</h2>
              </div>
              <div className="flex-1 bg-black/40 border border-gray-800 rounded-xl p-4 mb-3 flex flex-col gap-4 overflow-y-auto">
                <div className="bg-primary/10 border border-primary/20 rounded-lg rounded-tl-none p-3 max-w-[85%] self-start">
                  <p className="text-sm text-gray-300">I detected anomalous lateral movement (T1021) originating from <span className="text-primary">Admin-PC</span> towards <span className="text-danger">DB-Prod-01</span>. The behavioral score is 0.89.</p>
                </div>
                <div className="bg-white/10 rounded-lg rounded-tr-none p-3 max-w-[85%] self-end">
                  <p className="text-sm text-gray-200">What is the recommended SOAR action?</p>
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded-lg rounded-tl-none p-3 max-w-[85%] self-start">
                  <p className="text-sm text-gray-300 mb-2">Based on the playbook, I recommend:</p>
                  <ul className="text-xs text-gray-400 list-disc pl-4 space-y-1">
                    <li>Isolate Admin-PC from the network</li>
                    <li>Revoke active sessions for Admin user</li>
                  </ul>
                  <button className="mt-3 px-4 py-1.5 bg-danger/20 hover:bg-danger/30 text-danger text-xs font-semibold rounded-lg border border-danger/30 transition-colors w-full">
                    Execute SOAR Playbook
                  </button>
                </div>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask Copilot about threats..." 
                  className="w-full bg-black/50 border border-gray-800 rounded-xl py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors p-1">
                  <Terminal size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
