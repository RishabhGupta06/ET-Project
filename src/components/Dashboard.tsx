import { useState, useEffect, useRef } from 'react';
import { Shield, Activity, AlertTriangle, Terminal, Network, Search, Bell, Sun, Moon, Cpu, Settings, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import AttackGraph from './AttackGraph';

// Mock Data
const anomalyData = [
  { time: '10:00', score: 0.1 }, { time: '10:05', score: 0.15 }, { time: '10:10', score: 0.12 },
  { time: '10:15', score: 0.89 }, { time: '10:20', score: 0.95 }, { time: '10:25', score: 0.4 }, { time: '10:30', score: 0.2 },
];

const cpuData = [
  { time: '00s', usage: 30 }, { time: '10s', usage: 35 }, { time: '20s', usage: 45 },
  { time: '30s', usage: 90 }, { time: '40s', usage: 60 }, { time: '50s', usage: 40 }, { time: '60s', usage: 45 },
];

const alerts = [
  { id: 1, severity: 'critical', type: 'Lateral Movement', target: 'DB-Prod-01', time: '10:15:32', mitre: 'T1021' },
  { id: 2, severity: 'high', type: 'Anomalous Login', target: 'Admin-PC', time: '10:14:15', mitre: 'T1078' },
  { id: 3, severity: 'medium', type: 'High CPU Usage', target: 'Web-Server-03', time: '10:12:05', mitre: 'T1496' },
];

const initialVulnerabilities = [
  { id: 'CVE-2024-2100', name: 'RCE in Web Server', status: 'critical', patched: false },
  { id: 'CVE-2023-3450', name: 'SQL Injection', status: 'high', patched: true },
  { id: 'CVE-2023-1100', name: 'XSS in Admin Panel', status: 'medium', patched: false },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Theme Toggle Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // AI Copilot State
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'I detected anomalous lateral movement (T1021) originating from Admin-PC towards DB-Prod-01. The behavioral score is 0.89.' },
    { role: 'user', text: 'What is the recommended SOAR action?' },
    { role: 'ai', text: 'Based on the playbook, I recommend: 1. Isolate Admin-PC 2. Revoke active sessions for Admin user.', isAction: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scanner State
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMsg = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `Analyzing query: "${userMsg.text}". No direct threats found related to this query. Systems are nominal.` 
      }]);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const runScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  // Reusable Classes
  const panelClass = "bg-white dark:bg-[#0a0a0f] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm transition-colors";
  const textPrimary = "text-gray-900 dark:text-gray-50";
  const textSecondary = "text-gray-500 dark:text-gray-400";
  const textMuted = "text-gray-400 dark:text-gray-600";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] text-gray-900 dark:text-gray-50 p-4 font-sans transition-colors duration-300">
      {/* Header */}
      <header className={`${panelClass} flex justify-between items-center mb-6 p-4`}>
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
            <Shield size={28} />
          </div>
          <div>
            <h1 className={`text-xl font-bold tracking-tight ${textPrimary}`}>AI Cyber Resilience</h1>
            <p className={`text-xs ${textSecondary}`}>CNI Protection Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`} size={16} />
            <input 
              type="text" 
              placeholder="Search assets, CVEs..." 
              className={`bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500 w-64 transition-colors ${textPrimary}`}
            />
          </div>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${textSecondary}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className={`relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${textSecondary}`}>
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#0a0a0f]"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-sm border border-white dark:border-[#0a0a0f]"></div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <div className={`col-span-2 ${panelClass} p-4 flex flex-col gap-2`}>
          <div className={`text-xs font-semibold uppercase tracking-wider mb-2 mt-2 px-3 ${textMuted}`}>Modules</div>
          {[
            { id: 'overview', icon: <Activity size={18} />, label: 'Overview' },
            { id: 'graph', icon: <Network size={18} />, label: 'Attack Graph' },
            { id: 'health', icon: <Cpu size={18} />, label: 'System Health' },
            { id: 'vulnerabilities', icon: <AlertTriangle size={18} />, label: 'Vulnerabilities' },
            { id: 'settings', icon: <Settings size={18} />, label: 'Settings' }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)} 
              className={`flex items-center gap-3 p-3 rounded-lg transition-all text-sm font-medium ${
                activeTab === item.id 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                  : `hover:bg-gray-50 dark:hover:bg-gray-800/50 ${textSecondary}`
              }`}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="col-span-10 grid grid-cols-12 gap-6">
          
          {/* Main Visualizer Area */}
          <div className="col-span-8 flex flex-col gap-6">
            
            {/* Top Stats */}
            <div className="grid grid-cols-3 gap-6 h-28">
              <div className={`${panelClass} p-5 flex flex-col justify-center`}>
                <h3 className={`text-sm font-medium mb-1 ${textSecondary}`}>Active Threats</h3>
                <div className={`text-3xl font-bold ${textPrimary}`}>3</div>
                <div className="text-xs text-red-500 mt-1 font-medium">Critical severity</div>
              </div>
              <div className={`${panelClass} p-5 flex flex-col justify-center`}>
                <h3 className={`text-sm font-medium mb-1 ${textSecondary}`}>Monitored Assets</h3>
                <div className={`text-3xl font-bold ${textPrimary}`}>1,204</div>
                <div className="text-xs text-emerald-500 mt-1 font-medium">100% online</div>
              </div>
              <div className={`${panelClass} p-5 flex flex-col justify-center`}>
                <h3 className={`text-sm font-medium mb-1 ${textSecondary}`}>Global Risk Score</h3>
                <div className={`text-3xl font-bold text-amber-500`}>89%</div>
                <div className="text-xs text-amber-500 mt-1 font-medium">Elevated risk detected</div>
              </div>
            </div>

            {/* Dynamic Content Panel */}
            <div className={`${panelClass} flex-1 flex flex-col overflow-hidden`}>
              
              {activeTab === 'overview' && (
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-lg font-semibold ${textPrimary}`}>Behavioral Anomaly Score</h2>
                  </div>
                  <div className="flex-1 w-full bg-gray-50/50 dark:bg-[#050508] rounded-lg border border-gray-100 dark:border-gray-800/50 pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={anomalyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#1f2937' : '#e2e8f0'} vertical={false} />
                        <XAxis dataKey="time" stroke={isDarkMode ? '#6b7280' : '#94a3b8'} axisLine={false} tickLine={false} />
                        <YAxis stroke={isDarkMode ? '#6b7280' : '#94a3b8'} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', border: isDarkMode ? 'none' : '1px solid #e2e8f0', borderRadius: '8px', color: isDarkMode ? '#f8fafc' : '#0f172a' }}
                        />
                        <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6', strokeWidth: 2}} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {activeTab === 'graph' && (
                <div className="flex-1 flex flex-col">
                  <div className="p-5 pb-0 flex justify-between items-center">
                    <h2 className={`text-lg font-semibold ${textPrimary}`}>Attack Path Prediction</h2>
                  </div>
                  <div className="flex-1 m-5 bg-gray-50/50 dark:bg-[#050508] rounded-lg border border-gray-100 dark:border-gray-800/50">
                    <AttackGraph isDark={isDarkMode} />
                  </div>
                </div>
              )}

              {activeTab === 'health' && (
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className={`text-lg font-semibold mb-4 ${textPrimary}`}>System Health Monitor</h2>
                  <div className="flex-1 w-full bg-gray-50/50 dark:bg-[#050508] rounded-lg border border-gray-100 dark:border-gray-800/50 pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={cpuData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#1f2937' : '#e2e8f0'} vertical={false} />
                        <XAxis dataKey="time" stroke={isDarkMode ? '#6b7280' : '#94a3b8'} axisLine={false} tickLine={false} />
                        <YAxis stroke={isDarkMode ? '#6b7280' : '#94a3b8'} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', border: isDarkMode ? 'none' : '1px solid #e2e8f0', borderRadius: '8px' }} />
                        <Area type="monotone" dataKey="usage" stroke="#10b981" fillOpacity={1} fill="url(#colorUsage)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {activeTab === 'vulnerabilities' && (
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-lg font-semibold ${textPrimary}`}>Vulnerability Scanner</h2>
                    <button 
                      onClick={runScan}
                      disabled={isScanning}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Search size={16} /> {isScanning ? 'Scanning...' : 'Run Scan'}
                    </button>
                  </div>
                  
                  {isScanning && (
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 mb-6 overflow-hidden">
                      <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-200" style={{ width: `${scanProgress}%` }}></div>
                    </div>
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className={`text-xs uppercase ${textSecondary} bg-gray-50 dark:bg-gray-900/50`}>
                        <tr>
                          <th className="px-4 py-3 rounded-tl-lg">CVE ID</th>
                          <th className="px-4 py-3">Vulnerability</th>
                          <th className="px-4 py-3">Severity</th>
                          <th className="px-4 py-3 rounded-tr-lg">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {initialVulnerabilities.map((vuln) => (
                          <tr key={vuln.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                            <td className={`px-4 py-4 font-medium ${textPrimary}`}>{vuln.id}</td>
                            <td className={`px-4 py-4 ${textSecondary}`}>{vuln.name}</td>
                            <td className="px-4 py-4">
                              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                                vuln.status === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                vuln.status === 'high' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              }`}>
                                {vuln.status}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              {vuln.patched ? 
                                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400"><CheckCircle size={14}/> Patched</span> : 
                                <span className="flex items-center gap-1 text-red-600 dark:text-red-400"><AlertTriangle size={14}/> Open</span>
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className={`text-lg font-semibold mb-6 ${textPrimary}`}>System Settings</h2>
                  <div className="space-y-6 max-w-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-medium ${textPrimary}`}>Dark Mode</div>
                        <div className={`text-sm ${textSecondary}`}>Toggle the platform theme</div>
                      </div>
                      <button 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                      >
                        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></span>
                      </button>
                    </div>
                    <hr className="border-gray-200 dark:border-gray-800" />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-medium ${textPrimary}`}>Email Notifications</div>
                        <div className={`text-sm ${textSecondary}`}>Receive alerts for critical threats</div>
                      </div>
                      <button className="w-12 h-6 rounded-full bg-blue-600 transition-colors relative">
                        <span className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform translate-x-6"></span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Sidebar - Intel & Copilot */}
          <div className="col-span-4 flex flex-col gap-6">
            
            {/* Threat Intel */}
            <div className={`${panelClass} p-5 flex flex-col h-[40%]`}>
              <h2 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${textMuted}`}>Threat Intel</h2>
              <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                {alerts.map(alert => (
                  <div key={alert.id} className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-900/50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-lg p-3 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${alert.severity === 'critical' ? 'bg-red-500' : alert.severity === 'high' ? 'bg-amber-500' : 'bg-blue-500'}`}></span>
                        <span className={`font-medium text-sm ${textPrimary}`}>{alert.type}</span>
                      </div>
                      <span className={`text-xs ${textMuted}`}>{alert.time}</span>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <div className={`text-xs ${textSecondary}`}>Target: <span className="font-medium">{alert.target}</span></div>
                      <span className="px-2 py-0.5 bg-white dark:bg-[#0a0a0f] text-gray-600 dark:text-gray-400 text-[10px] font-mono rounded border border-gray-200 dark:border-gray-800">
                        {alert.mitre}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Security Copilot */}
            <div className={`${panelClass} p-5 flex-1 flex flex-col`}>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="text-blue-600 dark:text-blue-400" size={18} />
                <h2 className={`text-sm font-semibold uppercase tracking-wider ${textMuted}`}>AI Copilot</h2>
              </div>
              
              <div className="flex-1 bg-gray-50/50 dark:bg-[#050508] border border-gray-100 dark:border-gray-800/50 rounded-lg p-4 mb-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3 text-sm rounded-2xl max-w-[90%] ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-tl-sm text-gray-800 dark:text-gray-200 shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                    {msg.isAction && (
                      <button className="mt-2 ml-1 px-4 py-1.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-semibold rounded-lg border border-red-200 dark:border-red-900/50 transition-colors">
                        Execute SOAR Playbook
                      </button>
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <div className="relative mt-auto">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Copilot..." 
                  className={`w-full bg-gray-50 dark:bg-[#050508] border border-gray-200 dark:border-gray-800 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-blue-500 transition-colors ${textPrimary}`}
                />
                <button 
                  onClick={handleSendMessage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors p-1"
                >
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
