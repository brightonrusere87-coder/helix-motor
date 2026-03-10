import React from 'react'
import {
  LayoutDashboard, FileText, Car, Shield, BarChart3, 
  Settings, Bell, Users, FileStack, ChevronRight,
  Zap, Activity
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'notifications', label: 'Risk Notifications', icon: Bell, badge: '3' },
  { id: 'quotations', label: 'Quotations', icon: FileText, badge: '12' },
  { id: 'placement', label: 'Risk Placement', icon: Shield, badge: null },
  { id: 'policies', label: 'Policies', icon: FileStack, badge: null },
  { id: 'reinsurance', label: 'Reinsurance', icon: Activity, badge: '2' },
  { id: 'claims', label: 'Claims', icon: Car, badge: '5' },
  { id: 'clients', label: 'Clients', icon: Users, badge: null },
  { id: 'reports', label: 'Reports', icon: BarChart3, badge: null },
  { id: 'settings', label: 'Configuration', icon: Settings, badge: null },
]

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 min-h-screen glass border-r border-slate-800/50 flex flex-col fixed left-0 top-0 bottom-0 z-20">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-helix-600 flex items-center justify-center glow-blue">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <div className="font-display text-lg font-bold text-white leading-none">HELIX</div>
            <div className="text-[10px] text-slate-500 tracking-widest uppercase mt-0.5">Motor & Reinsurance</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon, badge }) => {
          const active = activeTab === id
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                active
                  ? 'bg-helix-600/20 text-helix-300 border border-helix-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon size={16} className={active ? 'text-helix-400' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="flex-1 text-left font-medium">{label}</span>
              {badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  active ? 'bg-helix-600/40 text-helix-300' : 'bg-slate-700 text-slate-400'
                }`}>
                  {badge}
                </span>
              )}
              {active && <ChevronRight size={12} className="text-helix-400" />}
            </button>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-slate-800/50">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-helix-400 to-helix-700 flex items-center justify-center text-xs font-bold text-white">BR</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-200 truncate">Brighton Rusere</div>
            <div className="text-xs text-slate-500">Underwriter</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
