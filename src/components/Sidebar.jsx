import React, { useState } from 'react'
import {
  LayoutDashboard, FileText, Car, Shield, BarChart3,
  Settings, Bell, Users, FileStack, ChevronRight,
  Zap, Activity, LogOut, ChevronDown, Lock, Globe, DollarSign
} from 'lucide-react'
import { useAuth, ROLES } from '../context/AuthContext.jsx'

const ALL_NAV = [
  { id: 'dashboard',     label: 'Dashboard',         icon: LayoutDashboard, badge: null },
  { id: 'notifications', label: 'Risk Notifications', icon: Bell,            badge: '3'  },
  { id: 'quotations',    label: 'Quotations',         icon: FileText,        badge: '12' },
  { id: 'placement',     label: 'Risk Placement',     icon: Shield,          badge: null },
  { id: 'policies',      label: 'Policies',           icon: FileStack,       badge: null },
  { id: 'reinsurance',   label: 'Reinsurance',        icon: Activity,        badge: '2'  },
  { id: 'openmarket',    label: 'Open Market',        icon: Globe,           badge: 'NEW'},
  { id: 'premium',       label: 'Premium Ledger',     icon: DollarSign,      badge: null },
  { id: 'claims',        label: 'Claims',             icon: Car,             badge: '5'  },
  { id: 'clients',       label: 'Clients',            icon: Users,           badge: null },
  { id: 'reports',       label: 'Reports',            icon: BarChart3,       badge: null },
  { id: 'settings',      label: 'Configuration',      icon: Settings,        badge: null },
]

const ROLE_STYLE = {
  insurer:   { accent: '#3d5eff', accentBg: 'rgba(61,94,255,0.12)',  accentBorder: 'rgba(61,94,255,0.28)',  label: 'Insurer'   },
  reinsurer: { accent: '#34d399', accentBg: 'rgba(52,211,153,0.12)', accentBorder: 'rgba(52,211,153,0.28)', label: 'Reinsurer' },
  broker:    { accent: '#fbbf24', accentBg: 'rgba(251,191,36,0.12)', accentBorder: 'rgba(251,191,36,0.28)', label: 'Broker'    },
}

export default function Sidebar({ activeTab, setActiveTab }) {
  const { user, logout, allowedPages } = useAuth()
  const [showUser, setShowUser] = useState(false)
  const rs = user ? (ROLE_STYLE[user.role] ?? ROLE_STYLE.insurer) : ROLE_STYLE.insurer
  const visibleNav = ALL_NAV.filter(item => allowedPages.includes(item.id))
  const lockedNav  = ALL_NAV.filter(item => !allowedPages.includes(item.id))

  return (
    <aside className="w-64 min-h-screen glass border-r border-slate-800/50 flex flex-col fixed left-0 top-0 bottom-0 z-20">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-helix-600 flex items-center justify-center glow-blue">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <div className="font-display text-lg font-bold text-white leading-none">HELIX</div>
            <div className="text-[10px] text-slate-500 tracking-widest uppercase mt-0.5">Motor & Reinsurance</div>
          </div>
        </div>
        {user && (
          <div className="mt-3 flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
            style={{ background: rs.accentBg, border: `1px solid ${rs.accentBorder}` }}>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: rs.accent }} />
            <span className="text-[11px] font-semibold" style={{ color: rs.accent }}>{rs.label} Portal</span>
            <span className="text-[10px] text-slate-600 ml-auto truncate max-w-[90px]">{user.organisation}</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {visibleNav.map(({ id, label, icon: Icon, badge }) => {
          const active = activeTab === id
          return (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                active ? 'text-white border' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
              style={active ? { background: rs.accentBg, borderColor: rs.accentBorder } : {}}>
              <Icon size={16} style={{ color: active ? rs.accent : undefined }}
                className={active ? '' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="flex-1 text-left font-medium">{label}</span>
              {badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  active ? 'bg-slate-800/60 text-slate-300' : 'bg-slate-700 text-slate-400'
                }`}>{badge}</span>
              )}
              {active && <ChevronRight size={12} style={{ color: rs.accent }} />}
            </button>
          )
        })}

        {/* Locked pages */}
        {lockedNav.length > 0 && (
          <div className="pt-3 mt-2 border-t border-slate-800/30">
            <p className="text-[10px] text-slate-800 px-3 mb-1.5 uppercase tracking-wider">No access</p>
            {lockedNav.map(({ id, label }) => (
              <div key={id} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-800 cursor-not-allowed select-none">
                <Lock size={12} className="text-slate-800 flex-shrink-0" />
                <span className="text-xs truncate">{label}</span>
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* User panel */}
      {user && (
        <div className="border-t border-slate-800/50">
          <button onClick={() => setShowUser(v => !v)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800/40 transition-colors">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${rs.accent}88, ${rs.accent}44)`, border: `1px solid ${rs.accentBorder}` }}>
              {user.initials}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-sm font-medium text-slate-200 truncate">{user.name}</div>
              <div className="text-xs text-slate-500 truncate">{user.title}</div>
            </div>
            <ChevronDown size={13} className={`text-slate-600 transition-transform duration-200 ${showUser ? 'rotate-180' : ''}`} />
          </button>

          {showUser && (
            <div className="px-3 pb-3 space-y-2">
              {/* Session info */}
              <div className="p-3 rounded-xl" style={{ background: 'rgba(2,6,23,0.8)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-[10px] text-slate-700 mb-2 uppercase tracking-wider">Session</p>
                {[['Organisation', user.organisation], ['Licence No.', user.licenceNo], ['Role', rs.label]].map(([l, v]) => (
                  <div key={l} className="flex justify-between text-[11px] mb-1 last:mb-0">
                    <span className="text-slate-600">{l}</span>
                    <span className="text-slate-400 truncate ml-2 max-w-[130px] text-right">{v}</span>
                  </div>
                ))}
              </div>

              {/* Permissions */}
              <div className="p-3 rounded-xl" style={{ background: 'rgba(2,6,23,0.8)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-[10px] text-slate-700 mb-2 uppercase tracking-wider">Permissions granted</p>
                <div className="space-y-1">
                  {Object.entries(ROLES[user.role].permissions).filter(([,v]) => v).slice(0, 5).map(([k]) => (
                    <div key={k} className="flex items-center gap-2 text-[11px] text-slate-500">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: rs.accent }} />
                      <span>{k.replace(/([A-Z])/g, ' $1').replace(/^can /, '').trim()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sign out */}
              <button onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all">
                <LogOut size={14} /><span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  )
}
