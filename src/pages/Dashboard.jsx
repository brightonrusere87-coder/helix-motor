import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, TrendingDown, Shield, FileText, Car, AlertTriangle,
  ArrowUpRight, Activity, Clock, CheckCircle, XCircle, RefreshCw
} from 'lucide-react'
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts'
import { usePremium } from '../context/PremiumContext.jsx'

const coverTypeData = [
  { name: 'Comprehensive', value: 48, color: '#3d5eff' },
  { name: 'Third Party', value: 29, color: '#6b8eff' },
  { name: 'TPFT', value: 15, color: '#1e3aff' },
  { name: 'Fleet', value: 8, color: '#9bb5ff' },
]

const recentActivities = [
  { id: 'HLX-2025-04821', type: 'New Policy', client: 'Zimnat Corp Fleet', premium: '$12,400', status: 'active', time: '2m ago' },
  { id: 'HLX-2025-04820', type: 'Endorsement', client: 'Benson & Hedges Ltd', premium: '$1,200', status: 'pending', time: '18m ago' },
  { id: 'HLX-2025-04819', type: 'Claim', client: 'Mrs. R. Moyo', premium: '$8,500', status: 'processing', time: '1h ago' },
  { id: 'HLX-2025-04818', type: 'Renewal', client: 'Delta Beverages PSV', premium: '$34,800', status: 'active', time: '2h ago' },
  { id: 'HLX-2025-04817', type: 'Reinsurance', client: 'Treaty Cession Q1', premium: '$142,000', status: 'pending', time: '3h ago' },
]

const statuses = {
  active:     { label: 'Active',     color: 'text-emerald-400', bg: 'bg-emerald-400/10', dot: 'bg-emerald-400' },
  pending:    { label: 'Pending',    color: 'text-amber-400',   bg: 'bg-amber-400/10',   dot: 'bg-amber-400'   },
  processing: { label: 'Processing', color: 'text-helix-400',   bg: 'bg-helix-400/10',   dot: 'bg-helix-400'   },
}

function StatCard({ label, value, sub, trend, trendVal, icon: Icon, delay = 0, live = false }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t) }, [delay])
  const up = trend === 'up'
  return (
    <div className={`glass-light rounded-2xl p-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-helix-600/20 border border-helix-600/20 flex items-center justify-center">
          <Icon size={18} className="text-helix-400" />
        </div>
        <div className="flex items-center gap-2">
          {live && <span className="flex items-center gap-1 text-[10px] text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"/>Live</span>}
          <div className={`flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-full ${up ? 'bg-emerald-400/10 text-emerald-400' : 'bg-rose-400/10 text-rose-400'}`}>
            {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {trendVal}
          </div>
        </div>
      </div>
      <div className="font-display text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400 font-medium">{label}</div>
      {sub && <div className="text-xs text-slate-600 mt-1">{sub}</div>}
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 text-xs space-y-1 shadow-xl">
        <div className="text-slate-400 font-medium mb-2">{label}</div>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-slate-400">{p.name}:</span>
            <span className="text-white font-mono">${p.value}k</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const { stats, ledger } = usePremium()

  // Build chart data from live ledger
  const premiumData = stats.monthlyData.map(m => ({
    month: m.month,
    premium: m.premium,
    claims: Math.round(m.premium * parseFloat(stats.lossRatio) / 100),
    reinsurance: m.ri,
  }))

  const fmt0 = (v) => (parseFloat(v)||0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Motor Insurance & Reinsurance — Live Premium Data</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 px-3 py-1.5 rounded-xl border border-emerald-600/20 bg-emerald-600/8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>All figures live from Premium Ledger
          </span>
          <button className="flex items-center gap-2 px-4 py-2 glass-light rounded-xl text-sm text-slate-400 hover:text-slate-200 transition-colors">
            <RefreshCw size={14} /><span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Live Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Gross Written Premium" live
          value={`$${(stats.gwp/1000).toFixed(1)}k`}
          sub={`${stats.collectionRate}% collected · ${stats.paidCount} fully paid`}
          trend="up" trendVal={`+${stats.collectionRate}%`} icon={TrendingUp} delay={0} />
        <StatCard
          label="Premium Collected" live
          value={`$${(stats.collected/1000).toFixed(1)}k`}
          sub={`Balance outstanding: $${fmt0(stats.outstanding)}`}
          trend="up" trendVal={`${stats.paidCount}/${ledger.length} paid`} icon={CheckCircle} delay={100} />
        <StatCard
          label="Open Claims" 
          value="83"
          sub="$1.2M total exposure"
          trend="down" trendVal="-12.1%" icon={Car} delay={200} />
        <StatCard
          label="RI Premium Pending" live
          value={`$${(stats.riPending/1000).toFixed(1)}k`}
          sub={`${stats.riPendingCount} settlements due`}
          trend={stats.riPendingCount > 0 ? 'down' : 'up'} trendVal={`${stats.riPendingCount} pending`} icon={Activity} delay={300} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 glass-light rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-slate-200">Premium vs Claims vs Reinsurance</h3>
              <p className="text-xs text-slate-500 mt-0.5">Live from Premium Ledger (USD thousands)</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              {[['#3d5eff','Premium'],['#f87171','Claims'],['#34d399','Reinsurance']].map(([c,l]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{background:c}} />
                  <span className="text-slate-500">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={premiumData}>
              <defs>
                <linearGradient id="gPremium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3d5eff" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3d5eff" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gClaims" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gRein" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="premium" name="Premium" stroke="#3d5eff" fill="url(#gPremium)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="claims" name="Claims" stroke="#f87171" fill="url(#gClaims)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="reinsurance" name="Reinsurance" stroke="#34d399" fill="url(#gRein)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-light rounded-2xl p-5">
          <h3 className="font-semibold text-slate-200 mb-1">Cover Type Mix</h3>
          <p className="text-xs text-slate-500 mb-4">By policy count</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={coverTypeData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                {coverTypeData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {coverTypeData.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-slate-400">{name}</span>
                </div>
                <span className="text-slate-300 font-mono">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live premium summary strip */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { l:'Outstanding Balance', v:`$${fmt0(stats.outstanding)}`,    c:'text-rose-400',    b:'border-rose-800/20',  bg:'bg-rose-900/10' },
          { l:'RI Settled (YTD)',    v:`$${fmt0(stats.riSettledAmt)}`,   c:'text-emerald-400', b:'border-emerald-800/20',bg:'bg-emerald-900/10' },
          { l:'Broker Commission',   v:`$${fmt0(stats.brokerComm)}`,     c:'text-amber-400',   b:'border-amber-800/20', bg:'bg-amber-900/10' },
          { l:'Loss Ratio',          v:`${stats.lossRatio}%`,            c: parseFloat(stats.lossRatio)>60?'text-rose-400':'text-emerald-400', b:'border-slate-700/30', bg:'bg-slate-800/20' },
        ].map(({ l, v, c, b, bg }) => (
          <div key={l} className={`rounded-xl p-3 border ${bg} ${b} text-center`}>
            <div className={`font-mono text-lg font-bold ${c}`}>{v}</div>
            <div className="text-[10px] text-slate-600 mt-0.5">{l}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass-light rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-200">Recent Activity</h3>
          <button className="text-xs text-helix-400 hover:text-helix-300 flex items-center gap-1">View all <ArrowUpRight size={12} /></button>
        </div>
        <div className="space-y-2">
          {recentActivities.map((item) => {
            const st = statuses[item.status]
            return (
              <div key={item.id} className="flex items-center gap-4 py-3 border-b border-slate-800/50 last:border-0 hover:bg-slate-800/20 px-2 -mx-2 rounded-lg transition-colors cursor-pointer">
                <div className="font-mono text-xs text-helix-500 w-32 flex-shrink-0">{item.id}</div>
                <div className="flex-shrink-0">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">{item.type}</span>
                </div>
                <div className="flex-1 text-sm text-slate-300 truncate">{item.client}</div>
                <div className="font-mono text-sm text-slate-200 w-24 text-right">{item.premium}</div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${st.bg} ${st.color} w-28 justify-center`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${st.dot} animate-pulse`} />
                  {st.label}
                </div>
                <div className="text-xs text-slate-600 w-16 text-right flex-shrink-0">{item.time}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts'

const premiumData = [
  { month: 'Aug', premium: 420, claims: 180, reinsurance: 130 },
  { month: 'Sep', premium: 380, claims: 210, reinsurance: 110 },
  { month: 'Oct', premium: 510, claims: 165, reinsurance: 160 },
  { month: 'Nov', premium: 470, claims: 190, reinsurance: 145 },
  { month: 'Dec', premium: 560, claims: 220, reinsurance: 175 },
  { month: 'Jan', premium: 620, claims: 195, reinsurance: 200 },
  { month: 'Feb', premium: 680, claims: 240, reinsurance: 215 },
]

const coverTypeData = [
  { name: 'Comprehensive', value: 48, color: '#3d5eff' },
  { name: 'Third Party', value: 29, color: '#6b8eff' },
  { name: 'TPFT', value: 15, color: '#1e3aff' },
  { name: 'Fleet', value: 8, color: '#9bb5ff' },
]

const recentActivities = [
  { id: 'HLX-2025-04821', type: 'New Policy', client: 'Zimnat Corp Fleet', premium: '$12,400', status: 'active', time: '2m ago' },
  { id: 'HLX-2025-04820', type: 'Endorsement', client: 'Benson & Hedges Ltd', premium: '$1,200', status: 'pending', time: '18m ago' },
  { id: 'HLX-2025-04819', type: 'Claim', client: 'Mrs. R. Moyo', premium: '$8,500', status: 'processing', time: '1h ago' },
  { id: 'HLX-2025-04818', type: 'Renewal', client: 'Delta Beverages PSV', premium: '$34,800', status: 'active', time: '2h ago' },
  { id: 'HLX-2025-04817', type: 'Reinsurance', client: 'Treaty Cession Q1', premium: '$142,000', status: 'pending', time: '3h ago' },
]

const statuses = {
  active: { label: 'Active', color: 'text-emerald-400', bg: 'bg-emerald-400/10', dot: 'bg-emerald-400' },
  pending: { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-400/10', dot: 'bg-amber-400' },
  processing: { label: 'Processing', color: 'text-helix-400', bg: 'bg-helix-400/10', dot: 'bg-helix-400' },
}

function StatCard({ label, value, sub, trend, trendVal, icon: Icon, delay = 0 }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t) }, [delay])
  const up = trend === 'up'
  return (
    <div className={`glass-light rounded-2xl p-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-helix-600/20 border border-helix-600/20 flex items-center justify-center">
          <Icon size={18} className="text-helix-400" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-full ${up ? 'bg-emerald-400/10 text-emerald-400' : 'bg-rose-400/10 text-rose-400'}`}>
          {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {trendVal}
        </div>
      </div>
      <div className="font-display text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400 font-medium">{label}</div>
      {sub && <div className="text-xs text-slate-600 mt-1">{sub}</div>}
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 text-xs space-y-1 shadow-xl">
        <div className="text-slate-400 font-medium mb-2">{label}</div>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-slate-400">{p.name}:</span>
            <span className="text-white font-mono">${p.value}k</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}
