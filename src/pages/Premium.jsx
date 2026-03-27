import React, { useState, useMemo } from 'react'
import {
  DollarSign, CreditCard, Building2, CheckCircle, Clock,
  AlertTriangle, X, Check, Plus, Search, Filter, Eye,
  ChevronDown, ChevronRight, ArrowUpRight, ArrowDownRight,
  Printer, Download, RefreshCw, Send, Globe, Shield,
  FileText, Hash, Calendar, Percent, TrendingUp, TrendingDown,
  Wallet, Banknote, Receipt, AlertCircle, ExternalLink,
  BarChart2, Activity, Users, Copy, Zap
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'
import { usePremium } from '../context/PremiumContext.jsx'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt  = (v, d=2) => (parseFloat(v)||0).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })
const fmtD = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) : '—'
const today = () => new Date().toISOString().split('T')[0]

const STATUS_CFG = {
  paid:        { label:'Paid',          color:'text-emerald-400', bg:'bg-emerald-400/10', border:'border-emerald-400/20', Icon:CheckCircle   },
  partial:     { label:'Partial',       color:'text-amber-400',   bg:'bg-amber-400/10',   border:'border-amber-400/20',   Icon:Clock         },
  outstanding: { label:'Outstanding',   color:'text-rose-400',    bg:'bg-rose-400/10',    border:'border-rose-400/20',    Icon:AlertTriangle },
  ri_pending:  { label:'RI Pending',    color:'text-violet-400',  bg:'bg-violet-400/10',  border:'border-violet-400/20',  Icon:Shield        },
  overdue:     { label:'Overdue',       color:'text-rose-500',    bg:'bg-rose-500/10',    border:'border-rose-500/30',    Icon:AlertCircle   },
}

const METHOD_CFG = {
  EFT:          { label:'EFT / Bank Transfer', Icon:Building2, color:'#3d5eff' },
  Card:         { label:'Online Card',         Icon:CreditCard, color:'#0d9488' },
  Cash:         { label:'Cash Receipt',        Icon:Banknote,   color:'#b45309' },
  ri_settlement:{ label:'RI Settlement',       Icon:Shield,     color:'#7c3aed' },
}

function StatusBadge({ status, rec }) {
  const isOverdue = rec && rec.balance > 0 && rec.status !== 'paid' && new Date(rec.dueDate) < new Date()
  const key = isOverdue && status !== 'paid' ? 'overdue' : status
  const c = STATUS_CFG[key] || STATUS_CFG.outstanding
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${c.bg} ${c.color} ${c.border}`}>
      <c.Icon size={10}/>{c.label}
    </span>
  )
}

// ─── UI Atoms ─────────────────────────────────────────────────────────────────
const Inp = ({ className='', ...p }) => (
  <input className={`w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-helix-500/60 transition-colors ${className}`} {...p} />
)
const Sel = ({ children, className='', ...p }) => (
  <select className={`w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 outline-none focus:border-helix-500/60 transition-colors appearance-none ${className}`} {...p}>{children}</select>
)
function Fld({ label, required, children, hint, col='' }) {
  return (
    <div className={col}>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}{required && <span className="text-rose-500 ml-0.5">*</span>}</label>
      {children}
      {hint && <p className="text-xs text-slate-600 mt-1">{hint}</p>}
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-xl p-3 text-xs space-y-1 shadow-xl">
      <div className="text-slate-400 font-medium mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }}/>
          <span className="text-slate-400">{p.name}:</span>
          <span className="text-white font-mono">${p.value}k</span>
        </div>
      ))}
    </div>
  )
}

// ─── Payment Modal ────────────────────────────────────────────────────────────
function PaymentModal({ rec, onClose, onSave }) {
  const [method, setMethod] = useState('EFT')
  const [amount, setAmount] = useState(rec.balance > 0 ? rec.balance.toFixed(2) : '')
  const [ref, setRef] = useState('')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(today())
  const [payType, setPayType] = useState(rec.hasRI && rec.amountReceived >= rec.grossPremium && !rec.riSettled ? 'ri_settlement' : 'collection')
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)

  const isRI = payType === 'ri_settlement'
  const maxAmount = isRI ? rec.riNetDue : rec.balance
  const currency = rec.currency

  const handleSave = async () => {
    if (!amount || parseFloat(amount) <= 0) return
    setProcessing(true)
    await new Promise(r => setTimeout(r, 900))
    onSave(rec.id, {
      amount: parseFloat(amount),
      method: isRI ? 'EFT' : method,
      ref: ref || 'Manual Entry',
      note: note || (isRI ? `RI net premium remitted to ${rec.reinsurer}` : `Premium received via ${method}`),
      type: payType,
      date,
    })
    setProcessing(false)
    setDone(true)
  }

  if (done) return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-sm text-center p-8 rounded-2xl border border-emerald-600/30 bg-emerald-500/5">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-emerald-400"/>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Payment Recorded</h3>
        <p className="text-slate-400 text-sm mb-1">{currency} {fmt(parseFloat(amount))} {isRI ? 'RI settlement' : 'collected'}</p>
        <p className="text-xs text-slate-600 mb-6">{fmtD(date)} · {isRI ? 'EFT' : method} · Ref: {ref || 'Manual'}</p>
        <p className="text-xs text-emerald-400 mb-5">Dashboard & ledger updated in real time ✓</p>
        <button onClick={onClose} className="px-6 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors">Back to Ledger</button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden" style={{ background: '#070d1a' }}>

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50" style={{ background: 'rgba(61,94,255,0.06)' }}>
          <div>
            <div className="text-xs text-helix-400 font-semibold uppercase tracking-widest mb-0.5">Record Payment</div>
            <h3 className="text-base font-bold text-white">{rec.insured}</h3>
            <p className="text-xs text-slate-500">{rec.id} · {rec.cover}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"><X size={15}/></button>
        </div>

        <div className="p-6 space-y-5">
          {/* Balance strip */}
          <div className="grid grid-cols-3 gap-3">
            {[
              ['Gross Premium',  `${currency} ${fmt(rec.grossPremium)}`],
              ['Received',       `${currency} ${fmt(rec.amountReceived)}`],
              ['Balance',        `${currency} ${fmt(rec.balance)}`],
            ].map(([l,v]) => (
              <div key={l} className="p-3 rounded-xl border border-slate-700/30 bg-slate-800/20 text-center">
                <div className="text-[10px] text-slate-600 mb-1">{l}</div>
                <div className={`text-sm font-bold font-mono ${l === 'Balance' && rec.balance > 0 ? 'text-rose-400' : l === 'Received' ? 'text-emerald-400' : 'text-slate-200'}`}>{v}</div>
              </div>
            ))}
          </div>

          {/* Payment type */}
          {rec.hasRI && (
            <div className="flex gap-2">
              {[['collection','Collect from Client'],['ri_settlement','Settle RI Premium']].map(([v,l]) => (
                <button key={v} type="button" onClick={() => { setPayType(v); if (v === 'ri_settlement') setAmount(rec.riNetDue.toFixed(2)) ; else setAmount(rec.balance.toFixed(2)) }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${payType === v ? v === 'ri_settlement' ? 'bg-violet-600/20 border-violet-600/35 text-violet-300' : 'bg-emerald-600/20 border-emerald-600/35 text-emerald-300' : 'border-slate-700/40 text-slate-500 hover:border-slate-600'}`}>
                  {v === 'collection' ? '💰 ' : '🛡 '}{l}
                </button>
              ))}
            </div>
          )}

          {/* RI info if applicable */}
          {isRI && (
            <div className="p-3 rounded-xl border border-violet-600/20 bg-violet-600/8">
              <p className="text-xs text-violet-300 font-semibold mb-1">RI Settlement — {rec.reinsurer}</p>
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <div><span className="text-slate-600">RI Premium: </span><span className="text-slate-300 font-mono">{currency} {fmt(rec.riPremium)}</span></div>
                <div><span className="text-slate-600">Commission ({rec.riCommissionPct}%): </span><span className="text-emerald-400 font-mono">-{currency} {fmt(rec.riCommission)}</span></div>
                <div><span className="text-slate-600">Net Due: </span><span className="text-violet-300 font-mono font-bold">{currency} {fmt(rec.riNetDue)}</span></div>
              </div>
            </div>
          )}

          {/* Payment method — only for client collection */}
          {!isRI && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {[['EFT','🏦 EFT / Bank'],['Card','💳 Online Card'],['Cash','💵 Cash']].map(([v,l]) => (
                  <button key={v} type="button" onClick={() => setMethod(v)}
                    className={`py-2.5 rounded-xl text-xs font-semibold border transition-all ${method === v ? 'bg-helix-600/20 border-helix-600/35 text-helix-300' : 'border-slate-700/40 text-slate-500 hover:border-slate-600'}`}>
                    {l}
                  </button>
                ))}
              </div>
              {method === 'Card' && (
                <div className="mt-3 p-3 rounded-xl border border-teal-600/20 bg-teal-600/8">
                  <p className="text-xs text-teal-300 font-semibold mb-1.5">Online Payment Link</p>
                  <p className="text-[11px] text-slate-500 mb-2">Generate a secure payment link to send to the client for card payment.</p>
                  <button className="flex items-center gap-2 px-3 py-2 bg-teal-600/20 hover:bg-teal-600/30 border border-teal-600/30 text-teal-400 rounded-lg text-xs font-semibold transition-colors">
                    <ExternalLink size={12}/> Generate Payment Link (Stripe)
                  </button>
                  <p className="text-[10px] text-slate-700 mt-1">* Stripe/PayFast integration — configure API key in System Settings</p>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Fld label={`Amount (${currency})`} required>
              <Inp type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 42800.00" step="0.01" min="0" max={maxAmount} />
            </Fld>
            <Fld label="Payment Date" required>
              <Inp type="date" value={date} onChange={e => setDate(e.target.value)} />
            </Fld>
            <Fld label="Reference / Transaction No." col="col-span-2">
              <Inp value={ref} onChange={e => setRef(e.target.value)} placeholder={isRI ? 'e.g. SCB-RI-SR-0088' : 'e.g. CBZ-TXN-44521'} />
            </Fld>
            <Fld label="Note (optional)" col="col-span-2">
              <Inp value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Payment per debit note..." />
            </Fld>
          </div>

          {/* EFT bank details */}
          {(isRI || method === 'EFT') && (
            <div className="p-3 rounded-xl border border-slate-700/30 bg-slate-800/20">
              <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-2">{isRI ? `Remit to ${rec.reinsurer}` : 'Helix Bank Details (receive from client)'}</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[11px]">
                {isRI ? [
                  ['Bank', 'Standard Chartered'], ['SWIFT', 'SCBLZWHA'],
                  ['Account', `RI Settlement — ${rec.reinsurer}`], ['Ref', rec.id],
                ] : [
                  ['Bank', 'CBZ Bank Harare'], ['Account', '01-234567-8'],
                  ['Branch', 'Jason Moyo Avenue'], ['Ref', rec.id],
                ].map(([l,v]) => (
                  <div key={l} className="flex gap-2">
                    <span className="text-slate-600 w-16 flex-shrink-0">{l}:</span>
                    <span className="text-slate-400 font-mono">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-800/50 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white text-sm border border-slate-700 rounded-xl transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={!amount || parseFloat(amount) <= 0 || processing}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${parseFloat(amount) > 0 && !processing ? isRI ? 'bg-violet-600 hover:bg-violet-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}>
            {processing ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Processing…</>
            ) : (
              <><Check size={14}/>{isRI ? 'Confirm RI Settlement' : 'Record Payment'}</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Ledger Row ───────────────────────────────────────────────────────────────
function LedgerRow({ rec, onPay, onView }) {
  const [expanded, setExpanded] = useState(false)
  const isOverdue = rec.balance > 0 && rec.status !== 'paid' && new Date(rec.dueDate) < new Date()
  const pctCollected = rec.grossPremium > 0 ? Math.min((rec.amountReceived / rec.grossPremium) * 100, 100) : 0

  return (
    <>
      <tr
        onClick={() => setExpanded(e => !e)}
        className={`border-b border-slate-800/30 cursor-pointer hover:bg-slate-800/20 transition-colors ${isOverdue ? 'bg-rose-500/3' : ''}`}>
        <td className="px-4 py-3">
          <div className="font-mono text-xs text-helix-500">{rec.id}</div>
          <div className="text-[10px] text-slate-600 mt-0.5">{rec.type === 'reinsurance' ? '🛡 RI' : '📋 Policy'}</div>
        </td>
        <td className="px-4 py-3">
          <div className="font-semibold text-sm text-slate-200 truncate max-w-[180px]">{rec.insured}</div>
          <div className="text-[11px] text-slate-500 truncate max-w-[180px]">{rec.cover}</div>
        </td>
        <td className="px-4 py-3 font-mono text-sm text-slate-200">{rec.currency} {fmt(rec.grossPremium)}</td>
        <td className="px-4 py-3">
          <div className="font-mono text-sm text-emerald-400">{rec.currency} {fmt(rec.amountReceived)}</div>
          <div className="w-24 h-1.5 bg-slate-700 rounded-full mt-1 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${pctCollected}%` }}/>
          </div>
        </td>
        <td className="px-4 py-3 font-mono text-sm" style={{ color: rec.balance > 0 ? '#f87171' : '#4ade80' }}>
          {rec.currency} {fmt(rec.balance)}
        </td>
        <td className="px-4 py-3 text-xs text-slate-500">{fmtD(rec.dueDate)}</td>
        <td className="px-4 py-3"><StatusBadge status={rec.status} rec={rec}/></td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            {rec.status !== 'paid' && (
              <button onClick={e => { e.stopPropagation(); onPay(rec) }}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-helix-600 hover:bg-helix-500 text-white rounded-lg text-xs font-semibold transition-colors">
                <DollarSign size={11}/>Pay
              </button>
            )}
            {rec.hasRI && !rec.riSettled && rec.amountReceived >= rec.grossPremium && (
              <button onClick={e => { e.stopPropagation(); onPay(rec) }}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold transition-colors">
                <Shield size={11}/>RI
              </button>
            )}
            <button onClick={e => { e.stopPropagation(); setExpanded(v => !v) }}
              className="text-slate-600 hover:text-slate-300 transition-colors">
              <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`}/>
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded detail */}
      {expanded && (
        <tr className="border-b border-slate-800/30">
          <td colSpan={8} className="px-4 pb-4 pt-2">
            <div className="bg-slate-800/20 rounded-2xl p-4 space-y-4">
              {/* Financial breakdown */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  ['Net Premium',      `${rec.currency} ${fmt(rec.netPremium)}`],
                  ['Stamp Duty',       `${rec.currency} ${fmt(rec.stampDuty)}`],
                  ['IRA Levy',         `${rec.currency} ${fmt(rec.levy)}`],
                  ['Broker Comm.',     rec.brokerCommission ? `${rec.currency} ${fmt(rec.brokerCommission)} (${rec.brokerCommissionPct}%)` : '—'],
                ].map(([l,v]) => (
                  <div key={l} className="p-2.5 rounded-xl border border-slate-700/30 bg-slate-800/30">
                    <div className="text-[10px] text-slate-600 mb-0.5">{l}</div>
                    <div className="text-xs font-mono text-slate-300">{v}</div>
                  </div>
                ))}
              </div>

              {/* RI info */}
              {rec.hasRI && (
                <div className="p-3 rounded-xl border border-violet-700/20 bg-violet-900/10">
                  <div className="text-[10px] text-violet-400 uppercase tracking-widest mb-2">Reinsurance — {rec.reinsurer}</div>
                  <div className="grid grid-cols-4 gap-3 text-[11px]">
                    <div><span className="text-slate-600">Cession: </span><span className="text-slate-300">{rec.cedingPct}%</span></div>
                    <div><span className="text-slate-600">RI Premium: </span><span className="text-slate-300 font-mono">{rec.currency} {fmt(rec.riPremium)}</span></div>
                    <div><span className="text-slate-600">RI Comm ({rec.riCommissionPct}%): </span><span className="text-emerald-400 font-mono">{rec.currency} {fmt(rec.riCommission)}</span></div>
                    <div><span className="text-slate-600">Net Due: </span>
                      <span className={`font-mono font-bold ${rec.riSettled ? 'text-emerald-400' : 'text-violet-400'}`}>{rec.currency} {fmt(rec.riNetDue)}</span>
                      {rec.riSettled && <span className="text-emerald-400 ml-1">✓ Settled {fmtD(rec.riPaidDate)}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* Payment history */}
              <div>
                <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Payment History ({rec.paymentHistory.length})</div>
                {rec.paymentHistory.length === 0 ? (
                  <p className="text-xs text-slate-700 italic">No payments recorded yet.</p>
                ) : (
                  <div className="space-y-1.5">
                    {rec.paymentHistory.map((p, i) => {
                      const mc = METHOD_CFG[p.type === 'ri_settlement' ? 'ri_settlement' : p.method] || METHOD_CFG['EFT']
                      return (
                        <div key={i} className="flex items-center gap-4 px-3 py-2.5 rounded-xl border border-slate-700/25 bg-slate-800/20 text-xs">
                          <mc.Icon size={13} style={{ color: mc.color }} className="flex-shrink-0"/>
                          <span className="text-slate-500 w-20 flex-shrink-0">{fmtD(p.date)}</span>
                          <span className={`font-mono font-bold w-28 flex-shrink-0 ${p.type === 'ri_settlement' ? 'text-violet-400' : 'text-emerald-400'}`}>
                            {p.type === 'ri_settlement' ? '↗' : '↙'} {rec.currency} {fmt(p.amount)}
                          </span>
                          <span className="text-slate-500 w-20 flex-shrink-0">{mc.label}</span>
                          <span className="font-mono text-slate-600 w-32 flex-shrink-0 truncate">{p.ref}</span>
                          <span className="flex-1 text-slate-500 truncate">{p.note}</span>
                          <span className="text-slate-700 flex-shrink-0">{p.by}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Premium() {
  const { ledger, recordPayment, stats } = usePremium()
  const [search, setSearch]         = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [activeTab, setActiveTab]   = useState('ledger')
  const [payModal, setPayModal]     = useState(null)

  const filtered = useMemo(() => {
    let list = [...ledger]
    if (search) list = list.filter(r =>
      r.insured.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.policyId.toLowerCase().includes(search.toLowerCase())
    )
    if (filterStatus !== 'all') {
      if (filterStatus === 'overdue') {
        list = list.filter(r => r.balance > 0 && r.status !== 'paid' && new Date(r.dueDate) < new Date())
      } else {
        list = list.filter(r => r.status === filterStatus)
      }
    }
    if (filterType !== 'all') list = list.filter(r => r.type === filterType)
    return list
  }, [ledger, search, filterStatus, filterType])

  const handlePay = (rec) => setPayModal(rec)
  const handleSavePayment = (id, payment) => {
    recordPayment(id, payment)
    setPayModal(null)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={18} className="text-helix-400"/>
              <span className="text-xs text-helix-400 font-semibold uppercase tracking-widest">Finance</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-white">Premium Ledger</h1>
            <p className="text-slate-500 text-sm mt-1">Real-time collection · RI settlement · payment tracking · dashboard sync</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 px-3 py-1.5 rounded-xl border border-emerald-600/20 bg-emerald-600/8">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>Live — synced to dashboard
            </div>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { l:'Gross Written Premium', v:`$${(stats.gwp/1000).toFixed(0)}k`,   c:'text-helix-400',   I:TrendingUp,   sub:`${stats.collectionRate}% collected` },
            { l:'Premium Collected',     v:`$${(stats.collected/1000).toFixed(0)}k`, c:'text-emerald-400', I:CheckCircle,  sub:`${stats.paidCount} fully paid` },
            { l:'Outstanding Balance',   v:`$${(stats.outstanding/1000).toFixed(0)}k`, c:stats.outstanding>0?'text-rose-400':'text-emerald-400', I:AlertTriangle, sub:`${stats.outstandingCount + stats.partialCount} open items` },
            { l:'RI Premium Pending',    v:`$${(stats.riPending/1000).toFixed(0)}k`,   c:'text-violet-400',  I:Shield,       sub:`${stats.riPendingCount} settlements due` },
          ].map(({ l, v, c, I, sub }) => (
            <div key={l} className="glass-light rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-slate-800/60 ${c}`}><I size={16}/></div>
              </div>
              <div className={`font-display text-3xl font-bold ${c} mb-1`}>{v}</div>
              <div className="text-sm text-slate-400">{l}</div>
              <div className="text-xs text-slate-600 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {/* Secondary stats */}
        <div className="grid grid-cols-5 gap-3">
          {[
            { l:'Broker Commission',   v:`$${fmt(stats.brokerComm,0)}`,     c:'text-amber-400'   },
            { l:'RI Settled (YTD)',    v:`$${fmt(stats.riSettledAmt,0)}`,   c:'text-emerald-400' },
            { l:'Overdue Items',       v:stats.overdueCount,                c:stats.overdueCount>0?'text-rose-400':'text-emerald-400' },
            { l:'Overdue Amount',      v:`$${fmt(stats.overdueAmt,0)}`,     c:'text-rose-400'    },
            { l:'Loss Ratio',          v:`${stats.lossRatio}%`,             c: parseFloat(stats.lossRatio)>60?'text-rose-400':parseFloat(stats.lossRatio)>30?'text-amber-400':'text-emerald-400' },
          ].map(({ l, v, c }) => (
            <div key={l} className="glass-light rounded-xl p-3 text-center">
              <div className={`font-mono text-lg font-bold ${c}`}>{v}</div>
              <div className="text-[10px] text-slate-600 mt-0.5">{l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-800/50">
          {[['ledger','Premium Ledger'],['charts','Cash Flow Charts'],['ri','RI Settlement Summary']].map(([id,label]) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-all ${activeTab===id?'border-helix-500 text-helix-300':'border-transparent text-slate-500 hover:text-slate-300'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* LEDGER TAB */}
        {activeTab === 'ledger' && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 max-w-sm">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"/>
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search insured, reference..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-sm text-slate-300 placeholder-slate-600 outline-none focus:border-helix-500/60"/>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[['all','All'],['paid','Paid'],['partial','Partial'],['outstanding','Outstanding'],['ri_pending','RI Pending'],['overdue','Overdue']].map(([v,l]) => (
                  <button key={v} onClick={() => setFilterStatus(v)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filterStatus===v?'bg-helix-600 text-white':'text-slate-500 border border-slate-700/50 hover:text-slate-300'}`}>{l}</button>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                {[['all','All Types'],['policy','Policies'],['reinsurance','RI']].map(([v,l]) => (
                  <button key={v} onClick={() => setFilterType(v)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filterType===v?'bg-helix-600 text-white':'text-slate-500 border border-slate-700/50 hover:text-slate-300'}`}>{l}</button>
                ))}
              </div>
              <span className="ml-auto text-xs text-slate-600">{filtered.length} records</span>
            </div>

            {/* Table */}
            <div className="glass-light rounded-2xl border border-slate-800/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800/60" style={{ background: 'rgba(15,23,42,0.6)' }}>
                      {['Reference','Insured / Cover','Gross Premium','Collected','Balance','Due Date','Status','Action'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr><td colSpan={8} className="px-4 py-10 text-center text-slate-600 text-sm">No records match your filters</td></tr>
                    ) : (
                      filtered.map(rec => (
                        <LedgerRow key={rec.id} rec={rec} onPay={handlePay} />
                      ))
                    )}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: 'rgba(15,23,42,0.8)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      <td colSpan={2} className="px-4 py-3 text-xs font-bold text-slate-400">TOTALS ({filtered.length} records)</td>
                      <td className="px-4 py-3 font-mono text-sm font-bold text-helix-300">${fmt(filtered.reduce((a,r)=>a+r.grossPremium,0),0)}</td>
                      <td className="px-4 py-3 font-mono text-sm font-bold text-emerald-400">${fmt(filtered.reduce((a,r)=>a+r.amountReceived,0),0)}</td>
                      <td className="px-4 py-3 font-mono text-sm font-bold text-rose-400">${fmt(filtered.reduce((a,r)=>a+r.balance,0),0)}</td>
                      <td colSpan={3}/>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CHARTS TAB */}
        {activeTab === 'charts' && (
          <div className="space-y-4">
            <div className="glass-light rounded-2xl p-5">
              <h3 className="font-semibold text-slate-200 mb-1">Premium vs Collection (Monthly)</h3>
              <p className="text-xs text-slate-500 mb-4">USD thousands</p>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={stats.monthlyData}>
                  <defs>
                    <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3d5eff" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3d5eff" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Area type="monotone" dataKey="premium" name="Gross Premium" stroke="#3d5eff" fill="url(#gP)" strokeWidth={2} dot={false}/>
                  <Area type="monotone" dataKey="collected" name="Collected" stroke="#34d399" fill="url(#gC)" strokeWidth={2} dot={false}/>
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-6 mt-2">
                {[['#3d5eff','Gross Premium'],['#34d399','Collected']].map(([c,l]) => (
                  <div key={l} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <div className="w-2 h-2 rounded-full" style={{ background: c }}/>
                    {l}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Collection status doughnut via bar */}
              <div className="glass-light rounded-2xl p-5">
                <h3 className="font-semibold text-slate-200 mb-4">Collection Status</h3>
                <div className="space-y-3">
                  {[
                    { l:'Paid in Full',   v:stats.paidCount,        pct:Math.round(stats.paidCount/(ledger.length||1)*100),        c:'#10b981' },
                    { l:'Partial',        v:stats.partialCount,     pct:Math.round(stats.partialCount/(ledger.length||1)*100),     c:'#f59e0b' },
                    { l:'Outstanding',    v:stats.outstandingCount, pct:Math.round(stats.outstandingCount/(ledger.length||1)*100), c:'#ef4444' },
                    { l:'RI Pending',     v:stats.riPendingCount,   pct:Math.round(stats.riPendingCount/(ledger.length||1)*100),   c:'#8b5cf6' },
                  ].map(({ l, v, pct, c }) => (
                    <div key={l}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">{l}</span>
                        <span className="font-mono" style={{ color: c }}>{v} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: c }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overdue alert */}
              <div className="glass-light rounded-2xl p-5">
                <h3 className="font-semibold text-slate-200 mb-4">Overdue Alerts</h3>
                {stats.overdueCount === 0 ? (
                  <div className="flex flex-col items-center justify-center h-32 text-center">
                    <CheckCircle size={28} className="text-emerald-400 mb-2"/>
                    <p className="text-sm text-emerald-400 font-semibold">No overdue items</p>
                    <p className="text-xs text-slate-600 mt-1">All premiums within due dates</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {ledger.filter(r => r.balance > 0 && r.status !== 'paid' && new Date(r.dueDate) < new Date()).map(r => {
                      const days = Math.abs(Math.ceil((new Date(r.dueDate) - new Date()) / (1000*60*60*24)))
                      return (
                        <div key={r.id} className="flex items-center justify-between p-3 rounded-xl border border-rose-600/20 bg-rose-500/5">
                          <div>
                            <div className="text-xs font-semibold text-slate-200">{r.insured}</div>
                            <div className="text-[10px] text-rose-400 mt-0.5">{days} days overdue</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-sm text-rose-400 font-bold">{r.currency} {fmt(r.balance)}</div>
                            <button onClick={() => setPayModal(r)} className="text-[10px] text-helix-400 hover:text-helix-300 mt-0.5">Collect →</button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* RI SETTLEMENT TAB */}
        {activeTab === 'ri' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { l:'Total RI Premium Ceded',   v:`$${fmt(stats.riGross,0)}`,      c:'text-violet-400' },
                { l:'RI Net Settled (YTD)',      v:`$${fmt(stats.riSettledAmt,0)}`, c:'text-emerald-400' },
                { l:'RI Net Pending',            v:`$${fmt(stats.riPending,0)}`,    c:'text-amber-400' },
              ].map(({ l, v, c }) => (
                <div key={l} className="glass-light rounded-2xl p-4 text-center">
                  <div className={`font-mono text-2xl font-bold ${c} mb-1`}>{v}</div>
                  <div className="text-xs text-slate-500">{l}</div>
                </div>
              ))}
            </div>

            <div className="glass-light rounded-2xl border border-slate-800/50 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-800/50 text-xs text-slate-500 uppercase tracking-widest">
                RI Premium Summary — All Arrangements
              </div>
              <div className="divide-y divide-slate-800/30">
                {ledger.filter(r => r.hasRI).map(r => (
                  <div key={r.id} className="p-4 hover:bg-slate-800/10 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-violet-500">{r.id}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${r.riSettled ? 'bg-emerald-400/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'}`}>
                            {r.riSettled ? `✓ Settled ${fmtD(r.riPaidDate)}` : '⏳ Pending'}
                          </span>
                        </div>
                        <div className="font-semibold text-slate-200">{r.insured}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{r.reinsurer} · {r.cedingPct}% cession · Due: {fmtD(r.dueDate)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">RI Premium Gross</div>
                        <div className="font-mono text-sm text-slate-300">{r.currency} {fmt(r.riPremium)}</div>
                        <div className="text-xs text-emerald-500 mt-0.5">-Comm: {r.currency} {fmt(r.riCommission)}</div>
                        <div className={`font-mono text-sm font-bold mt-0.5 ${r.riSettled ? 'text-emerald-400' : 'text-violet-400'}`}>
                          Net: {r.currency} {fmt(r.riNetDue)}
                        </div>
                        {!r.riSettled && (
                          <button onClick={() => setPayModal(r)} className="mt-2 flex items-center gap-1 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold transition-colors ml-auto">
                            <Send size={11}/> Settle
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {payModal && (
        <PaymentModal rec={payModal} onClose={() => setPayModal(null)} onSave={handleSavePayment}/>
      )}
    </>
  )
}
