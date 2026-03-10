import React, { useState } from 'react'
import { Bell, Plus, ArrowRight, User, Building2, Globe, RefreshCw, CheckCircle, Clock, AlertTriangle } from 'lucide-react'

const notifications = [
  { id: 'NOT-2026-00412', source: 'Broker Submission', insured: 'TN Holdings Ltd', broker: 'Riskwise Brokers Ltd', class: 'Fleet', vehicles: 18, date: '2026-02-20', status: 'new', underwriter: 'Unassigned', priority: 'high' },
  { id: 'NOT-2026-00411', source: 'Online Portal', insured: 'Mr. James Sibanda', broker: 'Direct', class: 'Private', vehicles: 1, date: '2026-02-20', status: 'review', underwriter: 'J. Mutasa', priority: 'normal' },
  { id: 'NOT-2026-00410', source: 'Renewal', insured: 'Harare City Council', broker: 'AON Zimbabwe', class: 'PSV', vehicles: 14, date: '2026-02-19', status: 'quoted', underwriter: 'T. Banda', priority: 'normal' },
  { id: 'NOT-2026-00409', source: 'Direct', insured: 'Mrs. P. Mwangi', broker: 'Walk-In', class: 'Private', vehicles: 1, date: '2026-02-19', status: 'review', underwriter: 'J. Mutasa', priority: 'low' },
  { id: 'NOT-2026-00408', source: 'Broker Submission', insured: 'Innscor Africa Ltd', broker: 'Marsh Zimbabwe', class: 'Commercial', vehicles: 34, date: '2026-02-18', status: 'declined', underwriter: 'M. Dube', priority: 'high' },
]

const stConf = {
  new:      { label: 'New', color: 'text-violet-400', bg: 'bg-violet-400/10', dot: 'bg-violet-400 animate-pulse' },
  review:   { label: 'Under Review', color: 'text-amber-400', bg: 'bg-amber-400/10', dot: 'bg-amber-400' },
  quoted:   { label: 'Quoted', color: 'text-helix-400', bg: 'bg-helix-400/10', dot: 'bg-helix-400' },
  declined: { label: 'Declined', color: 'text-rose-400', bg: 'bg-rose-400/10', dot: 'bg-rose-400' },
}

const priorityConf = {
  high:   'border-l-2 border-l-rose-500',
  normal: 'border-l-2 border-l-helix-700',
  low:    'border-l-2 border-l-slate-700',
}

const sourceIcons = { 'Broker Submission': Building2, 'Online Portal': Globe, 'Renewal': RefreshCw, 'Direct': User, 'Walk-In': User }

export default function Notifications() {
  const [selected, setSelected] = useState(null)
  
  const counts = { new: 3, review: 2, total: notifications.length }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Risk Notifications</h1>
          <p className="text-slate-500 text-sm mt-1">Incoming motor risk enquiries & submissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-medium transition-colors glow-blue">
          <Plus size={15} /> New Notification
        </button>
      </div>

      {/* Pipeline view */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'New Submissions', count: counts.new, color: 'text-violet-400', bg: 'bg-violet-400/10', icon: Bell },
          { label: 'Under Review', count: counts.review, color: 'text-amber-400', bg: 'bg-amber-400/10', icon: Clock },
          { label: 'Converted to Quote', count: 1, color: 'text-helix-400', bg: 'bg-helix-400/10', icon: CheckCircle },
        ].map(({ label, count, color, bg, icon: Icon }) => (
          <div key={label} className="glass-light rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className={`font-display text-3xl font-bold ${color}`}>{count}</div>
              <div className="text-xs text-slate-500 mt-1">{label}</div>
            </div>
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
              <Icon size={18} className={color} />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {notifications.map(n => {
          const s = stConf[n.status]
          const SrcIcon = sourceIcons[n.source] || Bell
          return (
            <div
              key={n.id}
              onClick={() => setSelected(n === selected ? null : n)}
              className={`glass-light rounded-2xl p-4 cursor-pointer hover:border-helix-600/20 border border-slate-800/50 transition-all ${priorityConf[n.priority]}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <SrcIcon size={15} className="text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-xs text-helix-500">{n.id}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-500">{n.source}</span>
                  </div>
                  <div className="font-medium text-slate-200">{n.insured}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{n.class} · {n.vehicles} vehicle{n.vehicles > 1 ? 's' : ''} · {n.broker}</div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${s.bg} ${s.color}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {s.label}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">{n.underwriter}</div>
                </div>
                <div className="text-xs text-slate-600 w-20 text-right flex-shrink-0">{n.date}</div>
                <ArrowRight size={14} className="text-slate-600 flex-shrink-0" />
              </div>

              {selected === n && (
                <div className="mt-4 pt-4 border-t border-slate-800/50 animate-fade-up">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[['Insured',n.insured],['Broker',n.broker],['Assigned To',n.underwriter],['Vehicle Class',n.class],['No. of Vehicles',n.vehicles],['Received',n.date]].map(([l,v]) => (
                      <div key={l} className="bg-slate-800/40 rounded-xl p-3">
                        <div className="text-xs text-slate-500 mb-1">{l}</div>
                        <div className="text-sm text-slate-200">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-medium transition-colors">Convert to Quotation</button>
                    <button className="px-4 py-2 glass text-slate-400 hover:text-slate-200 rounded-xl text-sm transition-colors border border-slate-700">Assign Underwriter</button>
                    <button className="px-4 py-2 glass text-rose-400 hover:text-rose-300 rounded-xl text-sm transition-colors border border-rose-900/30">Decline</button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
