import React, { useState, useMemo } from 'react'
import {
  Globe, Send, CheckCircle, Clock, XCircle, AlertTriangle,
  Search, Filter, ChevronDown, ChevronRight, Plus, X,
  Shield, Zap, TrendingUp, BarChart2, Users, Mail,
  Bell, Star, Target, RefreshCw, Eye, Building2,
  MapPin, Award, DollarSign, Percent, AlertCircle,
  ArrowRight, FileText, Radio, Wifi, WifiOff, Check,
  Activity, Layers
} from 'lucide-react'

// ─── Reinsurer Market Directory ───────────────────────────────────────────────
const MARKET_REINSURERS = [
  {
    id: 'RI-001', name: 'Munich Re', country: 'Germany', flag: '🇩🇪',
    rating: 'AA', ratingAgency: "S&P", contact: 'motor.africa@munichre.com',
    contactPerson: 'Hans Weber', phone: '+49 89 38910',
    territories: ['Zimbabwe', 'SADC', 'East Africa', 'West Africa', 'Global'],
    classes: ['Fleet', 'Commercial', 'Private', 'PSV'],
    maxSI: 10000000, minPremium: 50000,
    riAppetite: true, capacityUsedPct: 42,
    preferredCession: [40, 70], preferredCommission: [20, 28],
    avgResponseDays: 2, successRate: 94,
    status: 'active', lastEngaged: '2026-02-14',
    specialisms: ['Fleet risks', 'High-value commercial', 'PSV'],
    kycStatus: 'green',
  },
  {
    id: 'RI-002', name: 'Swiss Re', country: 'Switzerland', flag: '🇨🇭',
    rating: 'AA-', ratingAgency: "S&P", contact: 'motor.africa@swissre.com',
    contactPerson: 'Klaus Mueller', phone: '+41 43 285 2121',
    territories: ['Zimbabwe', 'SADC', 'Global'],
    classes: ['Fleet', 'Commercial', 'Private'],
    maxSI: 15000000, minPremium: 80000,
    riAppetite: true, capacityUsedPct: 61,
    preferredCession: [50, 80], preferredCommission: [22, 30],
    avgResponseDays: 3, successRate: 91,
    status: 'active', lastEngaged: '2026-02-12',
    specialisms: ['Large fleet', 'Cross-border commercial'],
    kycStatus: 'green',
  },
  {
    id: 'RI-003', name: 'Hannover Re', country: 'Germany', flag: '🇩🇪',
    rating: 'AA-', ratingAgency: "S&P", contact: 'africa@hannover-re.com',
    contactPerson: 'Petra Schulz', phone: '+49 511 56040',
    territories: ['Zimbabwe', 'SADC', 'East Africa', 'West Africa'],
    classes: ['Fleet', 'Commercial', 'Private', 'PSV', 'Motorcycle'],
    maxSI: 8000000, minPremium: 30000,
    riAppetite: true, capacityUsedPct: 35,
    preferredCession: [30, 60], preferredCommission: [20, 25],
    avgResponseDays: 2, successRate: 96,
    status: 'active', lastEngaged: '2026-02-17',
    specialisms: ['All motor classes', 'PSV & public transport'],
    kycStatus: 'green',
  },
  {
    id: 'RI-004', name: 'African Re', country: 'Nigeria', flag: '🇳🇬',
    rating: 'A-', ratingAgency: "AM Best", contact: 'uw@africa-re.com',
    contactPerson: 'Amara Diallo', phone: '+234 1 4616820',
    territories: ['Zimbabwe', 'SADC', 'East Africa', 'West Africa'],
    classes: ['Fleet', 'Commercial', 'Private', 'PSV', 'Motorcycle', 'Special Type'],
    maxSI: 5000000, minPremium: 20000,
    riAppetite: true, capacityUsedPct: 58,
    preferredCession: [25, 55], preferredCommission: [22, 30],
    avgResponseDays: 4, successRate: 88,
    status: 'active', lastEngaged: '2026-02-10',
    specialisms: ['African markets specialist', 'Local expertise'],
    kycStatus: 'green',
  },
  {
    id: 'RI-005', name: 'ZEP-RE', country: 'Kenya', flag: '🇰🇪',
    rating: 'B+', ratingAgency: "AM Best", contact: 'uw@zep-re.com',
    contactPerson: 'Faith Wanjiku', phone: '+254 20 4973000',
    territories: ['Zimbabwe', 'SADC', 'East Africa'],
    classes: ['Fleet', 'Commercial', 'Private'],
    maxSI: 3000000, minPremium: 15000,
    riAppetite: true, capacityUsedPct: 72,
    preferredCession: [30, 50], preferredCommission: [25, 32],
    avgResponseDays: 5, successRate: 83,
    status: 'active', lastEngaged: '2026-01-28',
    specialisms: ['COMESA specialist', 'SME fleets'],
    kycStatus: 'amber',
  },
  {
    id: 'RI-006', name: 'SCOR', country: 'France', flag: '🇫🇷',
    rating: 'A+', ratingAgency: "S&P", contact: 'africa@scor.com',
    contactPerson: 'Pierre Lefebvre', phone: '+33 1 58 44 70 00',
    territories: ['Zimbabwe', 'SADC', 'Middle East'],
    classes: ['Fleet', 'Commercial', 'Special Type'],
    maxSI: 12000000, minPremium: 100000,
    riAppetite: true, capacityUsedPct: 29,
    preferredCession: [50, 75], preferredCommission: [18, 25],
    avgResponseDays: 3, successRate: 92,
    status: 'active', lastEngaged: '2026-02-05',
    specialisms: ['High-value risks', 'Special type vehicles'],
    kycStatus: 'green',
  },
  {
    id: 'RI-007', name: 'General Re', country: 'USA', flag: '🇺🇸',
    rating: 'AA+', ratingAgency: "S&P", contact: 'africa@genre.com',
    contactPerson: 'Sarah Johnson', phone: '+1 203 328 5000',
    territories: ['Zimbabwe', 'Global'],
    classes: ['Fleet', 'Commercial'],
    maxSI: 20000000, minPremium: 150000,
    riAppetite: false, capacityUsedPct: 88,
    preferredCession: [60, 90], preferredCommission: [15, 22],
    avgResponseDays: 5, successRate: 89,
    status: 'capacity_full', lastEngaged: '2026-01-15',
    specialisms: ['Large fleet only', 'USD-denominated risks'],
    kycStatus: 'green',
  },
  {
    id: 'RI-008', name: 'Tropical Re', country: 'Zimbabwe', flag: '🇿🇼',
    rating: 'B', ratingAgency: "IRA", contact: 'uw@tropicalre.co.zw',
    contactPerson: 'Tatenda Moyo', phone: '+263 242 700 200',
    territories: ['Zimbabwe'],
    classes: ['Private', 'Fleet', 'Motorcycle'],
    maxSI: 1000000, minPremium: 5000,
    riAppetite: true, capacityUsedPct: 45,
    preferredCession: [20, 40], preferredCommission: [28, 35],
    avgResponseDays: 1, successRate: 78,
    status: 'active', lastEngaged: '2026-02-20',
    specialisms: ['Zimbabwe local risks', 'Small fleet'],
    kycStatus: 'amber',
  },
]

// ─── Bound placements available for open market ───────────────────────────────
const AVAILABLE_RISKS = [
  {
    id: 'PLC-2026-00089', insured: 'Econet Wireless Zimbabwe',
    class: 'Fleet', coverType: 'Fleet Comprehensive',
    sumInsured: 1200000, grossPremium: 42800, currency: 'USD',
    inceptionDate: '2026-02-15', expiryDate: '2027-02-14',
    territories: ['Zimbabwe', 'SADC'],
    kycStatus: 'green', kycScore: 88,
    cedingRequired: 40, retentionPct: 60,
    brokerName: 'AON Zimbabwe',
    vehicleDetails: 'Toyota Hilux Fleet (24 units)',
    marketStatus: 'open',
    approaches: [
      { riId: 'RI-001', riName: 'Munich Re', status: 'accepted', sentDate: '2026-02-10', responseDate: '2026-02-12', offeredCession: 40, offeredCommission: 25, notes: 'Accepted at standard terms.' },
      { riId: 'RI-003', riName: 'Hannover Re', status: 'declined', sentDate: '2026-02-10', responseDate: '2026-02-11', offeredCession: 40, offeredCommission: 25, notes: 'Capacity constraints this quarter.' },
    ],
  },
  {
    id: 'PLC-2026-00088', insured: 'Delta Beverages Ltd',
    class: 'Commercial', coverType: 'Commercial Comprehensive',
    sumInsured: 4800000, grossPremium: 98400, currency: 'USD',
    inceptionDate: '2026-02-12', expiryDate: '2027-02-11',
    territories: ['Zimbabwe', 'SADC', 'East Africa'],
    kycStatus: 'amber', kycScore: 62,
    cedingRequired: 60, retentionPct: 40,
    brokerName: 'Marsh Zimbabwe',
    vehicleDetails: 'Mercedes-Benz Sprinter Fleet (52 units)',
    marketStatus: 'open',
    approaches: [
      { riId: 'RI-002', riName: 'Swiss Re', status: 'accepted', sentDate: '2026-02-08', responseDate: '2026-02-11', offeredCession: 60, offeredCommission: 22, notes: 'Accepted subject to tracking device warranty.' },
      { riId: 'RI-004', riName: 'African Re', status: 'pending', sentDate: '2026-02-09', responseDate: null, offeredCession: 60, offeredCommission: 22, notes: '' },
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (v, d = 0) => (parseFloat(v) || 0).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

const STATUS_CFG = {
  accepted:      { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', Icon: CheckCircle,  label: 'Accepted'      },
  pending:       { color: 'text-amber-400',   bg: 'bg-amber-400/10',   border: 'border-amber-400/20',   Icon: Clock,        label: 'Pending'       },
  declined:      { color: 'text-rose-400',    bg: 'bg-rose-400/10',    border: 'border-rose-400/20',    Icon: XCircle,      label: 'Declined'      },
  sent:          { color: 'text-blue-400',    bg: 'bg-blue-400/10',    border: 'border-blue-400/20',    Icon: Send,         label: 'Sent'          },
  active:        { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', Icon: Wifi,         label: 'Active'        },
  capacity_full: { color: 'text-slate-400',   bg: 'bg-slate-400/10',   border: 'border-slate-400/20',   Icon: WifiOff,      label: 'Capacity Full' },
  interested:    { color: 'text-violet-400',  bg: 'bg-violet-400/10',  border: 'border-violet-400/20',  Icon: Star,         label: 'Interested'    },
  open:          { color: 'text-helix-400',   bg: 'bg-helix-400/10',   border: 'border-helix-400/20',   Icon: Radio,        label: 'Open Market'   },
}

const KYC_CFG = {
  green: { label: 'Compliant',       color: 'text-emerald-400', bg: 'bg-emerald-400/10', dot: 'bg-emerald-400' },
  amber: { label: 'Under Review',    color: 'text-amber-400',   bg: 'bg-amber-400/10',   dot: 'bg-amber-400'   },
  red:   { label: 'Non-Compliant',   color: 'text-rose-400',    bg: 'bg-rose-400/10',    dot: 'bg-rose-400'    },
}

function Badge({ status, size = 'sm' }) {
  const c = STATUS_CFG[status] || STATUS_CFG.pending
  const Icon = c.Icon
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${c.bg} ${c.color} ${c.border}`}>
      <Icon size={10} />{c.label}
    </span>
  )
}

// ─── Appetite Scorer ──────────────────────────────────────────────────────────
function scoreAppetite(ri, risk) {
  if (!ri.riAppetite || ri.status === 'capacity_full') return 0
  let score = 0
  if (risk.territories.some(t => ri.territories.includes(t) || ri.territories.includes('Global'))) score += 35
  if (ri.classes.includes(risk.class)) score += 25
  if (risk.sumInsured <= ri.maxSI) score += 20
  if (risk.grossPremium >= ri.minPremium) score += 10
  const [minC, maxC] = ri.preferredCession
  if (risk.cedingRequired >= minC && risk.cedingRequired <= maxC) score += 10
  return Math.min(score, 100)
}

function AppetiteBar({ score }) {
  const color = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : score >= 20 ? '#3d5eff' : '#ef4444'
  const label = score >= 80 ? 'Strong' : score >= 50 ? 'Good' : score >= 20 ? 'Moderate' : 'Low'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-[10px] font-mono font-bold w-12 text-right" style={{ color }}>{score}% {label}</span>
    </div>
  )
}

// ─── Broadcast Modal ──────────────────────────────────────────────────────────
function BroadcastModal({ risk, reinsurers, onClose, onBroadcast }) {
  const [selected, setSelected] = useState([])
  const [customMsg, setCustomMsg] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const scored = reinsurers
    .map(r => ({ ...r, score: scoreAppetite(r, risk) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)

  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const selectAll = () => setSelected(scored.map(r => r.id))

  const riPremium = risk.grossPremium * risk.cedingRequired / 100

  const handleSend = async () => {
    setSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
    onBroadcast(risk.id, selected.map(id => scored.find(r => r.id === id)))
  }

  // Build mailto string for selected reinsurers
  const buildMailto = () => {
    const emails = selected.map(id => scored.find(r => r.id === id)?.contact).filter(Boolean).join(',')
    const subject = encodeURIComponent(`[HELIX OPEN MARKET] Fac RI Opportunity — ${risk.insured} · ${risk.class} · ${risk.currency} ${fmt(risk.sumInsured)} SI`)
    const body = encodeURIComponent(`Dear Reinsurance Underwriter,

We are pleased to present the following facultative reinsurance opportunity for your consideration.

RISK DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Insured:          ${risk.insured}
Class:            Motor — ${risk.class}
Cover Type:       ${risk.coverType}
Risk Description: ${risk.vehicleDetails}
Territories:      ${risk.territories.join(', ')}

FINANCIAL SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sum Insured:      ${risk.currency} ${fmt(risk.sumInsured)}
Gross Premium:    ${risk.currency} ${fmt(risk.grossPremium, 2)}
Cession Required: ${risk.cedingRequired}%
RI Premium:       ${risk.currency} ${fmt(riPremium, 2)}
Period:           ${fmtDate(risk.inceptionDate)} to ${fmtDate(risk.expiryDate)}

KYC STATUS:       ${KYC_CFG[risk.kycStatus]?.label} (${risk.kycScore}/100)
BROKER:           ${risk.brokerName}
REFERENCE:        ${risk.id}

${customMsg ? `ADDITIONAL NOTES\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${customMsg}\n\n` : ''}Please confirm your interest, proposed line, and any special terms by return.

Regards,
Helix Insurance — Reinsurance Broking Desk
12 Samora Machel Avenue, Harare, Zimbabwe
Tel: +263 242 123 456 | reinsurance@helixinsurance.co.zw`)
    return `mailto:${emails}?subject=${subject}&body=${body}`
  }

  if (sent) return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md text-center p-8 rounded-2xl border border-emerald-600/30 bg-emerald-500/5">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Broadcast Sent!</h3>
        <p className="text-slate-400 text-sm mb-2">Approached <span className="text-emerald-400 font-bold">{selected.length}</span> reinsurers for:</p>
        <p className="text-helix-400 font-mono text-sm mb-6">{risk.insured} · {risk.id}</p>
        <div className="space-y-2 mb-6">
          {selected.map(id => {
            const r = scored.find(x => x.id === id)
            return (
              <div key={id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 text-xs">
                <span className="text-slate-300">{r?.flag} {r?.name}</span>
                <Badge status="pending" />
              </div>
            )
          })}
        </div>
        <p className="text-xs text-slate-600 mb-4">Responses will appear in the Approaches tracker below. The system will alert you when reinsurers respond.</p>
        <button onClick={onClose} className="px-6 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors">
          Return to Open Market
        </button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden" style={{ background: '#070d1a' }}>

        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800/50 flex items-start justify-between" style={{ background: 'rgba(61,94,255,0.08)' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Radio size={15} className="text-helix-400" />
              <span className="text-xs text-helix-400 font-semibold uppercase tracking-widest">Open Market Broadcast</span>
            </div>
            <h2 className="text-lg font-bold text-white">{risk.insured}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{risk.class} · {risk.currency} {fmt(risk.sumInsured)} SI · {risk.cedingRequired}% cession · RI premium {risk.currency} {fmt(riPremium, 2)}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-slate-800 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Risk summary strip */}
          <div className="grid grid-cols-4 gap-3">
            {[
              ['Sum Insured', `${risk.currency} ${fmt(risk.sumInsured)}`],
              ['RI Premium', `${risk.currency} ${fmt(riPremium, 2)}`],
              ['Cession', `${risk.cedingRequired}%`],
              ['KYC', `${KYC_CFG[risk.kycStatus]?.label}`],
            ].map(([l, v]) => (
              <div key={l} className="p-3 rounded-xl border border-slate-700/40 bg-slate-800/20">
                <div className="text-[10px] text-slate-600 mb-1">{l}</div>
                <div className="text-sm font-bold text-slate-200 font-mono">{v}</div>
              </div>
            ))}
          </div>

          {/* Territories */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">Territories:</span>
            {risk.territories.map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-helix-600/15 text-helix-400 border border-helix-600/20">{t}</span>
            ))}
          </div>

          {/* Reinsurer selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-slate-200">Select reinsurers to approach</p>
                <p className="text-xs text-slate-500 mt-0.5">Ranked by appetite match score for this specific risk</p>
              </div>
              <button onClick={selectAll} className="text-xs text-helix-400 hover:text-helix-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-helix-600/20 hover:bg-helix-600/10 transition-colors">
                <Check size={11} /> Select all matching
              </button>
            </div>

            <div className="space-y-2">
              {scored.map(r => {
                const sel = selected.includes(r.id)
                const alreadyApproached = risk.approaches?.some(a => a.riId === r.id)
                return (
                  <button key={r.id} type="button"
                    onClick={() => !alreadyApproached && toggle(r.id)}
                    disabled={alreadyApproached}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                      alreadyApproached ? 'opacity-50 cursor-not-allowed border-slate-700/20 bg-slate-800/10' :
                      sel ? 'border-helix-600/40 bg-helix-600/8' : 'border-slate-700/30 bg-slate-800/15 hover:border-slate-600/50'
                    }`}>
                    {/* Checkbox */}
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border transition-all ${
                      alreadyApproached ? 'bg-slate-700 border-slate-600' :
                      sel ? 'bg-helix-600 border-helix-600' : 'border-slate-600 bg-slate-800'
                    }`}>
                      {sel && !alreadyApproached && <Check size={11} className="text-white" />}
                      {alreadyApproached && <Check size={11} className="text-slate-500" />}
                    </div>

                    {/* Flag + name */}
                    <div className="w-44 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{r.flag}</span>
                        <span className="font-semibold text-sm text-slate-200">{r.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-600 mt-0.5">{r.country} · {r.ratingAgency} {r.rating}</div>
                    </div>

                    {/* Appetite bar */}
                    <div className="flex-1">
                      <div className="text-[10px] text-slate-600 mb-1">Appetite match</div>
                      <AppetiteBar score={r.score} />
                    </div>

                    {/* Commission range */}
                    <div className="w-28 text-xs text-right flex-shrink-0">
                      <div className="text-slate-600 text-[10px] mb-0.5">Commission range</div>
                      <div className="font-mono text-slate-300">{r.preferredCommission[0]}–{r.preferredCommission[1]}%</div>
                    </div>

                    {/* Status */}
                    <div className="w-28 flex-shrink-0 flex justify-end">
                      {alreadyApproached ? (
                        <span className="text-[10px] text-slate-500 italic">Already approached</span>
                      ) : (
                        <Badge status={r.status} />
                      )}
                    </div>
                  </button>
                )
              })}

              {scored.length === 0 && (
                <div className="p-8 text-center border border-dashed border-slate-700/40 rounded-xl">
                  <Globe size={28} className="text-slate-700 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">No reinsurers match the appetite criteria for this risk.</p>
                </div>
              )}
            </div>
          </div>

          {/* Custom message */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Additional message to reinsurers (optional)</label>
            <textarea value={customMsg} onChange={e => setCustomMsg(e.target.value)} rows={3}
              placeholder="e.g. Risk has tracker devices installed. Claims history clean for past 3 years. Please confirm interest within 5 business days."
              className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-helix-500/60 resize-none transition-colors" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800/50 flex items-center justify-between flex-shrink-0">
          <div className="text-xs text-slate-600">
            {selected.length > 0 ? (
              <span className="text-helix-400 font-semibold">{selected.length} reinsurer{selected.length !== 1 ? 's' : ''} selected</span>
            ) : 'Select at least one reinsurer'}
          </div>
          <div className="flex items-center gap-3">
            {/* mailto fallback */}
            {selected.length > 0 && (
              <a href={buildMailto()} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors">
                <Mail size={13} /> Open in Email
              </a>
            )}
            <button onClick={handleSend} disabled={selected.length === 0 || sending}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selected.length === 0 ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-helix-600 hover:bg-helix-500 text-white'
              }`}>
              {sending ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
              ) : (
                <><Send size={14} /> Broadcast to Market</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Interest Response Modal ──────────────────────────────────────────────────
function InterestModal({ approach, risk, onClose, onUpdate }) {
  const [status, setStatus] = useState(approach.status)
  const [offeredCession, setOfferedCession] = useState(approach.offeredCession)
  const [offeredCommission, setOfferedCommission] = useState(approach.offeredCommission)
  const [notes, setNotes] = useState(approach.notes)

  const handleSave = () => {
    onUpdate({ ...approach, status, offeredCession, offeredCommission, notes, responseDate: new Date().toISOString().split('T')[0] })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden" style={{ background: '#070d1a' }}>
        <div className="px-6 py-4 border-b border-slate-800/50 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Record response from</p>
            <h3 className="text-base font-bold text-white">{approach.riName}</h3>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"><X size={15} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Response Status</label>
            <div className="flex gap-2">
              {['pending', 'interested', 'accepted', 'declined'].map(s => (
                <button key={s} type="button" onClick={() => setStatus(s)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border capitalize transition-all ${status === s ? `${STATUS_CFG[s]?.bg} ${STATUS_CFG[s]?.color} ${STATUS_CFG[s]?.border}` : 'border-slate-700/40 text-slate-500 hover:border-slate-600'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Offered Cession (%)</label>
              <input type="number" value={offeredCession} onChange={e => setOfferedCession(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 outline-none focus:border-helix-500/60" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Offered Commission (%)</label>
              <input type="number" value={offeredCommission} onChange={e => setOfferedCommission(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 outline-none focus:border-helix-500/60" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Notes / Conditions from Reinsurer</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
              placeholder="e.g. Accepted subject to tracking device warranty. Require copy of fleet schedule."
              className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-helix-500/60 resize-none" />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-800/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white text-sm border border-slate-700 rounded-xl transition-colors">Cancel</button>
          <button onClick={handleSave} className="px-5 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors">Save Response</button>
        </div>
      </div>
    </div>
  )
}

// ─── Risk Card ────────────────────────────────────────────────────────────────
function RiskCard({ risk, reinsurers, onBroadcast, onUpdateApproach }) {
  const [expanded, setExpanded] = useState(false)
  const [showBroadcast, setShowBroadcast] = useState(false)
  const [editApproach, setEditApproach] = useState(null)

  const accepted   = risk.approaches.filter(a => a.status === 'accepted').length
  const pending    = risk.approaches.filter(a => a.status === 'pending').length
  const interested = risk.approaches.filter(a => a.status === 'interested').length
  const declined   = risk.approaches.filter(a => a.status === 'declined').length
  const riPremium  = risk.grossPremium * risk.cedingRequired / 100
  const kc = KYC_CFG[risk.kycStatus]

  const handleUpdateApproach = (updated) => {
    onUpdateApproach(risk.id, updated)
    setEditApproach(null)
  }

  return (
    <>
      <div className="glass-light rounded-2xl border border-slate-800/50 overflow-hidden hover:border-helix-600/20 transition-colors">
        {/* Card header */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="font-mono text-xs text-helix-500">{risk.id}</span>
                <Badge status="open" />
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] ${kc.bg} ${kc.color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${kc.dot}`} />{kc.label} · {risk.kycScore}/100
                </span>
              </div>
              <h3 className="font-bold text-slate-200 text-base">{risk.insured}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{risk.class} · {risk.coverType} · {risk.vehicleDetails}</p>
            </div>
            <button onClick={() => setShowBroadcast(true)}
              className="flex items-center gap-2 px-4 py-2 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-all hover:scale-105 ml-4 flex-shrink-0">
              <Send size={13} /> Broadcast
            </button>
          </div>

          {/* Financial strip */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              ['Sum Insured',   `${risk.currency} ${fmt(risk.sumInsured)}`],
              ['Gross Premium', `${risk.currency} ${fmt(risk.grossPremium, 2)}`],
              ['Cession',       `${risk.cedingRequired}%`],
              ['RI Premium',    `${risk.currency} ${fmt(riPremium, 2)}`],
            ].map(([l, v]) => (
              <div key={l} className="p-2.5 rounded-xl border border-slate-700/30 bg-slate-800/20">
                <div className="text-[10px] text-slate-600 mb-0.5">{l}</div>
                <div className="text-sm font-bold font-mono text-slate-200">{v}</div>
              </div>
            ))}
          </div>

          {/* Territories */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-[10px] text-slate-600 uppercase tracking-wider">Territories:</span>
            {risk.territories.map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-helix-600/12 text-helix-400 border border-helix-600/20">{t}</span>
            ))}
          </div>

          {/* Approach stats */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">{risk.approaches.length} approaches:</span>
            {[
              [accepted,   'Accepted',   'text-emerald-400', 'bg-emerald-400/10'],
              [interested, 'Interested', 'text-violet-400',  'bg-violet-400/10' ],
              [pending,    'Pending',    'text-amber-400',   'bg-amber-400/10'  ],
              [declined,   'Declined',   'text-rose-400',    'bg-rose-400/10'   ],
            ].filter(([n]) => n > 0).map(([n, label, c, bg]) => (
              <span key={label} className={`text-[10px] px-2 py-0.5 rounded-full ${bg} ${c} font-semibold`}>{n} {label}</span>
            ))}
            <button onClick={() => setExpanded(e => !e)} className="ml-auto flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors">
              {expanded ? 'Hide' : 'Show'} approaches <ChevronDown size={12} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Approaches table */}
        {expanded && (
          <div className="border-t border-slate-800/50 px-5 pb-5 pt-4">
            <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-3">Reinsurer Approaches & Responses</div>
            {risk.approaches.length === 0 ? (
              <p className="text-xs text-slate-600 italic text-center py-4">No approaches yet. Use Broadcast to approach the market.</p>
            ) : (
              <div className="space-y-2">
                {risk.approaches.map((app, i) => {
                  const ri = reinsurers.find(r => r.id === app.riId)
                  return (
                    <div key={i} className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all ${
                      app.status === 'accepted'   ? 'border-emerald-600/25 bg-emerald-500/5' :
                      app.status === 'interested' ? 'border-violet-600/25 bg-violet-500/5'   :
                      app.status === 'declined'   ? 'border-rose-600/20   bg-rose-500/5'     :
                      'border-slate-700/30 bg-slate-800/15'
                    }`}>
                      <span className="text-lg flex-shrink-0">{ri?.flag || '🌐'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-sm text-slate-200">{app.riName}</span>
                          <Badge status={app.status} />
                        </div>
                        {app.notes && <p className="text-[11px] text-slate-500 truncate">{app.notes}</p>}
                      </div>
                      <div className="text-right flex-shrink-0 text-xs">
                        <div className="text-slate-500">Sent: {fmtDate(app.sentDate)}</div>
                        {app.responseDate && <div className="text-slate-500">Responded: {fmtDate(app.responseDate)}</div>}
                        {app.offeredCession && <div className="font-mono text-helix-400">{app.offeredCession}% · {app.offeredCommission}% comm</div>}
                      </div>
                      <button onClick={() => setEditApproach(app)}
                        className="flex-shrink-0 px-3 py-1.5 text-xs border border-slate-700/40 text-slate-400 hover:text-slate-200 hover:border-slate-600 rounded-lg transition-colors">
                        <Eye size={12} className="inline mr-1" />Update
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {showBroadcast && (
        <BroadcastModal
          risk={risk} reinsurers={reinsurers}
          onClose={() => setShowBroadcast(false)}
          onBroadcast={(riskId, selectedRIs) => {
            onBroadcast(riskId, selectedRIs)
            setShowBroadcast(false)
            setExpanded(true)
          }}
        />
      )}
      {editApproach && (
        <InterestModal
          approach={editApproach} risk={risk}
          onClose={() => setEditApproach(null)}
          onUpdate={handleUpdateApproach}
        />
      )}
    </>
  )
}

// ─── Reinsurer Directory Panel ────────────────────────────────────────────────
function ReinsurerDirectory({ reinsurers, risks }) {
  const [search, setSearch] = useState('')
  const [filterAppetite, setFilterAppetite] = useState(false)

  const filtered = reinsurers.filter(r => {
    const ms = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.country.toLowerCase().includes(search.toLowerCase())
    const ma = !filterAppetite || r.riAppetite
    return ms && ma
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search reinsurers..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-sm text-slate-300 placeholder-slate-600 outline-none focus:border-helix-500/60" />
        </div>
        <button onClick={() => setFilterAppetite(f => !f)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs border transition-colors ${filterAppetite ? 'bg-emerald-600/20 border-emerald-600/30 text-emerald-400' : 'border-slate-700/40 text-slate-500 hover:border-slate-600'}`}>
          <Activity size={12} /> Appetite only
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map(r => {
          const totalApproaches = risks.reduce((a, risk) => a + risk.approaches.filter(ap => ap.riId === r.id).length, 0)
          const totalAccepted = risks.reduce((a, risk) => a + risk.approaches.filter(ap => ap.riId === r.id && ap.status === 'accepted').length, 0)
          return (
            <div key={r.id} className={`glass-light rounded-2xl border p-4 ${r.riAppetite && r.status === 'active' ? 'border-slate-700/50' : 'border-slate-800/30 opacity-60'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{r.flag}</span>
                  <div>
                    <div className="font-bold text-slate-200 text-sm">{r.name}</div>
                    <div className="text-[10px] text-slate-600">{r.country} · {r.ratingAgency} {r.rating}</div>
                  </div>
                </div>
                <Badge status={r.status} />
              </div>

              {/* Capacity bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[10px] text-slate-600 mb-1">
                  <span>Capacity used</span>
                  <span className="font-mono">{r.capacityUsedPct}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${r.capacityUsedPct >= 80 ? 'bg-rose-500' : r.capacityUsedPct >= 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${r.capacityUsedPct}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
                <div><span className="text-slate-600">Max SI: </span><span className="text-slate-400 font-mono">${fmt(r.maxSI / 1000)}k</span></div>
                <div><span className="text-slate-600">Avg response: </span><span className="text-slate-400">{r.avgResponseDays}d</span></div>
                <div><span className="text-slate-600">Success rate: </span><span className="text-emerald-400 font-mono">{r.successRate}%</span></div>
                <div><span className="text-slate-600">Commission: </span><span className="text-slate-400 font-mono">{r.preferredCommission[0]}–{r.preferredCommission[1]}%</span></div>
              </div>

              {/* Territories */}
              <div className="flex flex-wrap gap-1 mb-3">
                {r.territories.slice(0, 4).map(t => (
                  <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-500">{t}</span>
                ))}
                {r.territories.length > 4 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-600">+{r.territories.length - 4}</span>}
              </div>

              {/* Engagement stats */}
              {totalApproaches > 0 && (
                <div className="pt-2 border-t border-slate-800/40 flex items-center justify-between text-[10px]">
                  <span className="text-slate-600">{totalApproaches} approaches in system</span>
                  <span className="text-emerald-400">{totalAccepted} accepted</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OpenMarket() {
  const [risks, setRisks] = useState(AVAILABLE_RISKS)
  const [activeTab, setActiveTab] = useState('risks')
  const [filterClass, setFilterClass] = useState('all')
  const [filterKyc, setFilterKyc] = useState('all')
  const [search, setSearch] = useState('')

  const handleBroadcast = (riskId, selectedRIs) => {
    setRisks(prev => prev.map(r => {
      if (r.id !== riskId) return r
      const newApproaches = selectedRIs.map(ri => ({
        riId: ri.id, riName: ri.name,
        status: 'pending',
        sentDate: new Date().toISOString().split('T')[0],
        responseDate: null,
        offeredCession: r.cedingRequired,
        offeredCommission: ri.preferredCommission[0],
        notes: '',
      }))
      return { ...r, approaches: [...r.approaches, ...newApproaches] }
    }))
  }

  const handleUpdateApproach = (riskId, updatedApproach) => {
    setRisks(prev => prev.map(r => {
      if (r.id !== riskId) return r
      return { ...r, approaches: r.approaches.map(a => a.riId === updatedApproach.riId ? updatedApproach : a) }
    }))
  }

  const filteredRisks = risks.filter(r => {
    const mc = filterClass === 'all' || r.class === filterClass
    const mk = filterKyc === 'all' || r.kycStatus === filterKyc
    const ms = !search || r.insured.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase())
    return mc && mk && ms
  })

  // Stats
  const stats = useMemo(() => ({
    totalRisks:      risks.length,
    totalApproaches: risks.reduce((a, r) => a + r.approaches.length, 0),
    accepted:        risks.reduce((a, r) => a + r.approaches.filter(ap => ap.status === 'accepted').length, 0),
    pending:         risks.reduce((a, r) => a + r.approaches.filter(ap => ap.status === 'pending').length, 0),
    totalRIPremium:  risks.reduce((a, r) => a + r.grossPremium * r.cedingRequired / 100, 0),
    activeRIs:       MARKET_REINSURERS.filter(r => r.riAppetite && r.status === 'active').length,
  }), [risks])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe size={18} className="text-helix-400" />
            <span className="text-xs text-helix-400 font-semibold uppercase tracking-widest">Reinsurance</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">Open Market Engine</h1>
          <p className="text-slate-500 text-sm mt-1">
            Broadcast risks to matched reinsurers · Track responses · Collect interest
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 px-3 py-2 rounded-xl border border-slate-800/60 bg-slate-900/30">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {stats.activeRIs} reinsurers active in market
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { l: 'Risks on Market',   v: stats.totalRisks,      c: 'text-helix-400',   I: Layers    },
          { l: 'Total Approaches',  v: stats.totalApproaches, c: 'text-blue-400',    I: Send      },
          { l: 'Accepted Lines',    v: stats.accepted,        c: 'text-emerald-400', I: CheckCircle },
          { l: 'Awaiting Response', v: stats.pending,         c: 'text-amber-400',   I: Clock     },
          { l: 'RI Premium in Play',v: `$${fmt(stats.totalRIPremium / 1000)}k`, c: 'text-violet-400', I: DollarSign },
        ].map(({ l, v, c, I }) => (
          <div key={l} className="glass-light rounded-2xl p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-slate-800/60 ${c}`}><I size={16} /></div>
            <div>
              <div className={`font-mono text-xl font-bold ${c}`}>{v}</div>
              <div className="text-[10px] text-slate-500 leading-tight">{l}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-800/50 pb-0">
        {[
          { id: 'risks',      label: 'Risks on Market',       count: risks.length },
          { id: 'directory',  label: 'Reinsurer Directory',   count: MARKET_REINSURERS.length },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px ${
              activeTab === tab.id ? 'border-helix-500 text-helix-300' : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}>
            {tab.label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${activeTab === tab.id ? 'bg-helix-600/30 text-helix-400' : 'bg-slate-800 text-slate-600'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Risks tab */}
      {activeTab === 'risks' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by insured or reference..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-sm text-slate-300 placeholder-slate-600 outline-none focus:border-helix-500/60" />
            </div>
            <div className="flex items-center gap-1.5">
              {['all', 'Fleet', 'Commercial', 'Private', 'PSV'].map(c => (
                <button key={c} onClick={() => setFilterClass(c)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors capitalize ${filterClass === c ? 'bg-helix-600 text-white' : 'text-slate-500 border border-slate-700/50 hover:text-slate-300'}`}>
                  {c === 'all' ? 'All classes' : c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              {[['all','All KYC'],['green','✓ Green'],['amber','⚠ Amber']].map(([v, l]) => (
                <button key={v} onClick={() => setFilterKyc(v)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filterKyc === v ? 'bg-helix-600 text-white' : 'text-slate-500 border border-slate-700/50 hover:text-slate-300'}`}>
                  {l}
                </button>
              ))}
            </div>
            <span className="ml-auto text-xs text-slate-600">{filteredRisks.length} risk{filteredRisks.length !== 1 ? 's' : ''}</span>
          </div>

          {filteredRisks.length === 0 && (
            <div className="p-12 text-center border border-dashed border-slate-700/40 rounded-2xl">
              <Globe size={32} className="text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500">No risks match current filters.</p>
            </div>
          )}
          {filteredRisks.map(risk => (
            <RiskCard key={risk.id} risk={risk} reinsurers={MARKET_REINSURERS}
              onBroadcast={handleBroadcast} onUpdateApproach={handleUpdateApproach} />
          ))}

          {/* How it works */}
          <div className="p-5 rounded-2xl border border-slate-800/40 bg-slate-800/15">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">How the Open Market Engine works</h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                { n: '1', icon: Shield,      color: '#3d5eff', title: 'Risk captured',    desc: 'Risk passes KYC & territory checks in Placement wizard' },
                { n: '2', icon: Target,      color: '#7c3aed', title: 'Appetite matched', desc: 'System scores all reinsurers against risk class, SI, territories & cession' },
                { n: '3', icon: Send,        color: '#0d9488', title: 'Broadcast',        desc: 'Select matched RIs, send in-app approach & auto-generate mailto' },
                { n: '4', icon: CheckCircle, color: '#10b981', title: 'Collect & bind',   desc: 'Record responses, select best terms, proceed to fac placement' },
              ].map(({ n, icon: Icon, color, title, desc }) => (
                <div key={n} className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="text-xs font-bold text-slate-300">{title}</div>
                  <div className="text-[11px] text-slate-600 leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Directory tab */}
      {activeTab === 'directory' && (
        <ReinsurerDirectory reinsurers={MARKET_REINSURERS} risks={risks} />
      )}
    </div>
  )
}
