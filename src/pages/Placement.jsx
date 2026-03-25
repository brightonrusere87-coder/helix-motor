import React, { useState, useRef, useEffect } from 'react'
import {
  Shield, CheckCircle, Clock, XCircle, ChevronRight, Users,
  Plus, ArrowLeft, ArrowRight, Car, FileText, Building2,
  AlertTriangle, X, Check, Info, Percent, DollarSign,
  Calendar, Hash, User, Briefcase, Globe, Phone, Mail,
  ChevronsRight, Save, Eye, Printer, RotateCcw, Download,
  Stamp, Layers, AlertCircle, TrendingUp, Zap, BookOpen,
  Search, MapPin, Paperclip, Trash2, Upload, PenTool,
  CheckSquare, Square, RefreshCw, Lock, Unlock
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────
const initialPlacements = [
  {
    id: 'PLC-2026-00089', insured: 'Econet Wireless Zimbabwe', ref: 'QTE-2026-00115',
    class: 'Fleet', premium: '$42,800', sumInsured: '$1,200,000',
    currency: 'USD', grossPremiumNum: 42800, sumInsuredNum: 1200000,
    inceptionDate: '2026-02-15', expiryDate: '2027-02-14',
    coverType: 'Fleet Comprehensive',
    vehicleMake: 'Toyota', vehicleModel: 'Hilux 2.4', vehicleRegNo: 'Various (Fleet)',
    vehicleYear: '2022–2025', vehicleChassisNo: 'Various',
    driverName: 'Multiple Fleet Drivers',
    excessOwn: '500', thirdPartyLimit: '100000',
    brokerName: 'AON Zimbabwe', brokerRef: 'AON-2026-4412',
    insurer: { name: 'Old Mutual Insurance', share: 40, status: 'accepted', date: '2026-02-15', ref: 'OM-2026-44521', signatory: 'Head of Motor UW — J. Moyo' },
    coinsurer: { name: 'Sanctuary Insurance', share: 30, status: 'pending', date: null, ref: '', signatory: '' },
    reinsurer: { name: 'Munich Re', share: 40, cedingPct: 40, status: 'accepted', date: '2026-02-16', ref: 'MR-2026-SLP-0221', slipNo: 'SLIP-2026-MR-00089' },
    insuredAcceptance: { status: 'accepted', date: '2026-02-14', signatory: 'CEO — T. Masiyiwa' },
    specialConditions: 'Tracking device warranty applies to all fleet vehicles.',
    extensions: ['Windscreen & Glass', 'Emergency Roadside Rescue', 'Personal Accident (Drivers)'],
    ncdPct: '20', basicRate: '3.5', reinsuranceRequired: true,
    kyc: { status: 'green', score: 88, completedDate: '2026-02-13' },
    territories: ['Zimbabwe', 'SADC'],
    documents: [],
    signatures: {},
  },
  {
    id: 'PLC-2026-00088', insured: 'Delta Beverages Ltd', ref: 'QTE-2026-00110',
    class: 'Commercial', premium: '$98,400', sumInsured: '$4,800,000',
    currency: 'USD', grossPremiumNum: 98400, sumInsuredNum: 4800000,
    inceptionDate: '2026-02-12', expiryDate: '2027-02-11',
    coverType: 'Commercial Comprehensive',
    vehicleMake: 'Mercedes-Benz', vehicleModel: 'Sprinter 519', vehicleRegNo: 'Various',
    vehicleYear: '2021–2024', vehicleChassisNo: 'Various',
    driverName: 'Commercial Driver Pool',
    excessOwn: '1000', thirdPartyLimit: '150000',
    brokerName: 'Marsh Zimbabwe', brokerRef: 'MZW-2026-0088',
    insurer: { name: 'ZIMNAT Insurance', share: 50, status: 'accepted', date: '2026-02-12', ref: 'ZIM-2026-98440', signatory: 'Underwriting Director — R. Choto' },
    coinsurer: { name: 'First Mutual Insurance', share: 50, status: 'accepted', date: '2026-02-13', ref: 'FMI-2026-0445', signatory: 'Senior Underwriter — B. Dube' },
    reinsurer: { name: 'Swiss Re', share: 60, cedingPct: 60, status: 'accepted', date: '2026-02-14', ref: 'SR-2026-ZW-004', slipNo: 'SLIP-2026-SR-00088' },
    insuredAcceptance: { status: 'accepted', date: '2026-02-11', signatory: 'CFO — A. Chikara' },
    specialConditions: 'Goods-in-transit cover applies. Load certification required per trip.',
    extensions: ['Goods-in-Transit', 'Emergency Medical Expenses', 'Legal Expenses'],
    ncdPct: '30', basicRate: '2.8', reinsuranceRequired: true,
    kyc: { status: 'amber', score: 62, completedDate: '2026-02-10' },
    territories: ['Zimbabwe', 'SADC', 'East Africa'],
    documents: [],
    signatures: {},
  },
]

// ─── Master Party Directories ─────────────────────────────────────────────────
const INSURER_DIRECTORY = [
  { name: 'Old Mutual Insurance', country: 'Zimbabwe', rating: 'A', licNo: 'IRA-INS-001', contact: 'uw@oldmutual.co.zw', riAppetite: true },
  { name: 'ZIMNAT Insurance', country: 'Zimbabwe', rating: 'A-', licNo: 'IRA-INS-002', contact: 'uw@zimnat.co.zw', riAppetite: true },
  { name: 'Sanctuary Insurance', country: 'Zimbabwe', rating: 'B+', licNo: 'IRA-INS-003', contact: 'uw@sanctuary.co.zw', riAppetite: false },
  { name: 'First Mutual Insurance', country: 'Zimbabwe', rating: 'B+', licNo: 'IRA-INS-004', contact: 'uw@firstmutual.co.zw', riAppetite: true },
  { name: 'Cell Insurance', country: 'Zimbabwe', rating: 'B', licNo: 'IRA-INS-005', contact: 'uw@cell.co.zw', riAppetite: false },
  { name: 'RM Insurance', country: 'Zimbabwe', rating: 'B', licNo: 'IRA-INS-006', contact: 'uw@rm.co.zw', riAppetite: false },
]

const REINSURER_DIRECTORY = [
  { name: 'Munich Re', country: 'Germany', rating: 'AA', licNo: 'IRA-RI-001', contact: 'motor@munichre.com', riAppetite: true, territories: ['Zimbabwe','SADC','East Africa','Global'] },
  { name: 'Swiss Re', country: 'Switzerland', rating: 'AA-', licNo: 'IRA-RI-002', contact: 'motor.africa@swissre.com', riAppetite: true, territories: ['Zimbabwe','SADC','Global'] },
  { name: 'Hannover Re', country: 'Germany', rating: 'AA-', licNo: 'IRA-RI-003', contact: 'africa@hannover-re.com', riAppetite: true, territories: ['Zimbabwe','SADC','East Africa','West Africa'] },
  { name: 'African Re', country: 'Nigeria', rating: 'A-', licNo: 'IRA-RI-004', contact: 'uw@africa-re.com', riAppetite: true, territories: ['Zimbabwe','SADC','East Africa','West Africa'] },
  { name: 'ZEP-RE', country: 'Kenya', rating: 'B+', licNo: 'IRA-RI-005', contact: 'uw@zep-re.com', riAppetite: true, territories: ['Zimbabwe','SADC','East Africa'] },
  { name: 'Tropical Re', country: 'Zimbabwe', rating: 'B', licNo: 'IRA-RI-006', contact: 'uw@tropicalre.co.zw', riAppetite: false, territories: ['Zimbabwe'] },
  { name: 'General Re', country: 'USA', rating: 'AA+', licNo: 'IRA-RI-007', contact: 'africa@genre.com', riAppetite: true, territories: ['Zimbabwe','Global'] },
  { name: 'SCOR', country: 'France', rating: 'A+', licNo: 'IRA-RI-008', contact: 'africa@scor.com', riAppetite: true, territories: ['Zimbabwe','SADC','Middle East'] },
]

const BROKER_DIRECTORY = [
  { name: 'Direct', country: 'Zimbabwe', licNo: '—', contact: '—' },
  { name: 'Riskwise Brokers', country: 'Zimbabwe', licNo: 'IRA-BRK-001', contact: 'info@riskwise.co.zw' },
  { name: 'AON Zimbabwe', country: 'Zimbabwe', licNo: 'IRA-BRK-002', contact: 'aon@aon.co.zw' },
  { name: 'Marsh Zimbabwe', country: 'Zimbabwe', licNo: 'IRA-BRK-003', contact: 'marsh@marsh.co.zw' },
  { name: 'Willis Towers Watson', country: 'Zimbabwe', licNo: 'IRA-BRK-004', contact: 'wtw@wtw.co.zw' },
  { name: 'Alexander Forbes', country: 'Zimbabwe', licNo: 'IRA-BRK-005', contact: 'af@af.co.zw' },
]

// ─── Territory Groups ─────────────────────────────────────────────────────────
const TERRITORY_GROUPS = [
  {
    group: 'SADC Region',
    color: '#3d5eff',
    territories: ['Zimbabwe', 'Zambia', 'Mozambique', 'Botswana', 'Namibia', 'South Africa', 'Tanzania', 'Malawi', 'Angola', 'Lesotho', 'Eswatini', 'DRC', 'Madagascar', 'Mauritius', 'Seychelles'],
  },
  {
    group: 'East Africa',
    color: '#0d9488',
    territories: ['Kenya', 'Uganda', 'Rwanda', 'Burundi', 'Ethiopia', 'Somalia', 'Djibouti', 'Eritrea', 'South Sudan', 'Sudan'],
  },
  {
    group: 'West Africa',
    color: '#7c3aed',
    territories: ['Nigeria', 'Ghana', 'Senegal', 'Ivory Coast', 'Cameroon', 'Mali', 'Burkina Faso', 'Niger', 'Togo', 'Benin'],
  },
  {
    group: 'Middle East',
    color: '#b45309',
    territories: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Jordan', 'Lebanon'],
  },
  {
    group: 'Global / Other',
    color: '#64748b',
    territories: ['Global', 'Europe', 'Asia', 'North America', 'South America', 'Oceania'],
  },
]

// KYC checks
const KYC_CHECKS = [
  { key: 'idVerified',      label: 'ID / Company Registration Verified',   weight: 20 },
  { key: 'addressVerified', label: 'Physical Address Confirmed',            weight: 10 },
  { key: 'sanctionsCheck',  label: 'Sanctions & PEP Screening Clear',       weight: 25 },
  { key: 'taxCompliant',    label: 'ZIMRA Tax Clearance Current',           weight: 15 },
  { key: 'iRALicenced',    label: 'IRA / Regulatory Licence Confirmed',    weight: 15 },
  { key: 'riskProfile',    label: 'Risk Profile Assessment Completed',     weight: 15 },
]

const VEHICLE_CLASSES = ['Private', 'Fleet', 'Commercial', 'PSV', 'Motorcycle', 'Special Type']
const COVER_TYPES     = ['Comprehensive', 'Third Party Only', 'Third Party Fire & Theft']
const CURRENCIES      = ['USD', 'ZWG', 'GBP', 'EUR', 'ZAR']
const TREATY_TYPES    = ['Quota Share', 'Excess of Loss', 'Facultative']
const USE_TYPES       = ['Private Use', 'Business Use', 'Commercial Carriage', 'Public Hire', 'Agricultural']
const BODY_TYPES      = ['Saloon', 'SUV / 4x4', 'Pick-up / Truck', 'Minibus', 'Bus', 'Van', 'Motorcycle', 'Special']

const STEPS = [
  { id: 1, label: 'KYC & Compliance', icon: Shield,      desc: 'Know Your Client checks' },
  { id: 2, label: 'Risk Details',     icon: Car,         desc: 'Vehicle & insured information' },
  { id: 3, label: 'Cover & Premium',  icon: DollarSign,  desc: 'Coverage terms and premium' },
  { id: 4, label: 'Insurer(s)',        icon: Building2,   desc: 'Lead insurer & co-insurers' },
  { id: 5, label: 'Reinsurance',      icon: Globe,       desc: 'Treaty or facultative cession' },
  { id: 6, label: 'Acceptance',       icon: CheckCircle, desc: 'E-signatures & confirmations' },
  { id: 7, label: 'Review & Bind',    icon: FileText,    desc: 'Final review and binding' },
]

const defaultForm = {
  // KYC
  kycChecks: { idVerified: false, addressVerified: false, sanctionsCheck: false, taxCompliant: false, iRALicenced: false, riskProfile: false },
  kycNotes: '',
  kycStatus: '',
  // Territories
  territories: [],
  // Documents
  attachedDocs: [],
  // Insured
  insuredName: '', insuredIdType: 'Company', insuredIdNumber: '', insuredPhone: '',
  insuredEmail: '', insuredAddress: '', brokerName: 'Direct', brokerRef: '',
  // Vehicle
  vehicleClass: 'Private', vehicleMake: '', vehicleModel: '', vehicleYear: '',
  vehicleRegNo: '', vehicleChassisNo: '', vehicleEngineNo: '', vehicleBodyType: 'Saloon',
  vehicleUse: 'Private Use', vehicleColour: '', vehicleSeats: '', vehicleCc: '',
  vehicleModified: false, vehicleModDetails: '',
  // Driver
  driverName: '', driverLicenceNo: '', driverLicenceClass: '', driverDOB: '',
  driverYearsLicensed: '', namedDrivers: [],
  // Cover
  coverType: 'Comprehensive', currency: 'USD', sumInsured: '', agreedValue: false,
  inceptionDate: '', expiryDate: '', periodMonths: 12,
  basicRate: '', ncdPct: '0', youngDriverLoading: '0', highValueLoading: '0',
  otherLoading: '0', otherLoadingDesc: '',
  stampDutyPct: '3', levyPct: '1',
  extensions: { windscreen: false, radio: false, personalAccident: false, medicalExpenses: false,
    carHire: false, emergencyRescue: false, riotStrike: false, naturalDisaster: false },
  excessOwn: '', excessThirdParty: '', excessYoungDriver: '', thirdPartyLimit: '50000',
  specialConditions: '',
  // Insurers
  leadInsurer: '', leadInsurerShare: '100', leadInsurerRef: '',
  coinsurers: [],
  // Reinsurance
  reinsuranceRequired: false, treatyType: 'Quota Share', reinsurer: '',
  reinsurerRef: '', cedingPct: '', retentionPct: '', facultativeReason: '', slipNumber: '',
  // Acceptance + e-sigs
  insuredAcceptanceStatus: 'pending', insuredSignatory: '', insuredAcceptDate: '',
  insurerAcceptanceStatus: 'pending', insurerSignatory: '', insurerAcceptDate: '',
  reinsurerAcceptanceStatus: 'pending', reinsurerSignatory: '', reinsurerAcceptDate: '',
  signatures: { insured: null, insurer: null, reinsurer: null },
  underwriterNotes: '', referredTo: '',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function calcPremium(form) {
  const si = parseFloat(form.sumInsured) || 0
  const basic = parseFloat(form.basicRate) || 0
  const ncd = parseFloat(form.ncdPct) || 0
  const yd = parseFloat(form.youngDriverLoading) || 0
  const hv = parseFloat(form.highValueLoading) || 0
  const oth = parseFloat(form.otherLoading) || 0
  const sd = parseFloat(form.stampDutyPct) || 0
  const lv = parseFloat(form.levyPct) || 0
  const netRate = basic - ncd + yd + hv + oth
  const netPremium = (si * netRate) / 100
  const stampDuty = (netPremium * sd) / 100
  const levy = (netPremium * lv) / 100
  const gross = netPremium + stampDuty + levy
  return { netRate: netRate.toFixed(3), netPremium: netPremium.toFixed(2), stampDuty: stampDuty.toFixed(2), levy: levy.toFixed(2), gross: gross.toFixed(2) }
}

function fmtMoney(v) {
  const n = parseFloat(v) || 0
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function genRef() {
  return 'PLC-2026-' + String(Math.floor(Math.random() * 90000) + 10000).padStart(5, '0')
}

function today() { return new Date().toISOString().split('T')[0] }

function calcKycScore(checks) {
  return KYC_CHECKS.reduce((score, c) => checks[c.key] ? score + c.weight : score, 0)
}

function kycStatus(score) {
  if (score >= 80) return 'green'
  if (score >= 50) return 'amber'
  return 'red'
}

const KYC_STYLE = {
  green: { label: 'Compliant',        bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-400', badge: '#10b981' },
  amber: { label: 'Review Required',  bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   text: 'text-amber-400',   dot: 'bg-amber-400',   badge: '#f59e0b' },
  red:   { label: 'Non-Compliant',    bg: 'bg-rose-500/10',    border: 'border-rose-500/30',    text: 'text-rose-400',    dot: 'bg-rose-500',    badge: '#ef4444' },
}

// ─── UI Primitives ────────────────────────────────────────────────────────────
function Field({ label, required, children, hint, col }) {
  return (
    <div className={col}>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-600 mt-1">{hint}</p>}
    </div>
  )
}

function Input({ className = '', ...props }) {
  return (
    <input className={`w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-helix-500/60 focus:bg-slate-900 transition-colors ${className}`} {...props} />
  )
}

function Select({ className = '', children, ...props }) {
  return (
    <select className={`w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 outline-none focus:border-helix-500/60 transition-colors appearance-none ${className}`} {...props}>
      {children}
    </select>
  )
}

function Textarea({ className = '', ...props }) {
  return (
    <textarea className={`w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-helix-500/60 transition-colors resize-none ${className}`} {...props} />
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <button type="button" onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors ${checked ? 'bg-helix-600' : 'bg-slate-700'}`}>
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : ''}`} />
      </button>
      <span className="text-sm text-slate-400">{label}</span>
    </label>
  )
}

function SectionTitle({ children, sub }) {
  return (
    <div className="mb-4 pb-3 border-b border-slate-800/60">
      <h3 className="text-sm font-semibold text-slate-200">{children}</h3>
      {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
    </div>
  )
}

const AcceptBadge = ({ status }) => {
  const conf = {
    accepted: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    pending:  { icon: Clock,       color: 'text-amber-400',   bg: 'bg-amber-400/10'   },
    declined: { icon: XCircle,     color: 'text-rose-400',    bg: 'bg-rose-400/10'    },
  }
  const { icon: Icon, color, bg } = conf[status] || conf.pending
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${bg} ${color}`}>
      <Icon size={11} /> <span className="capitalize">{status}</span>
    </span>
  )
}

// ─── Searchable Party Dropdown ────────────────────────────────────────────────
function PartyDropdown({ value, onChange, directory, placeholder, showRating, showAppetite }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = directory.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    (p.country || '').toLowerCase().includes(q.toLowerCase())
  )
  const selected = directory.find(p => p.name === value)

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 outline-none focus:border-helix-500/60 transition-colors text-left">
        <span className={value ? 'text-slate-200' : 'text-slate-600'}>{value || placeholder || 'Select...'}</span>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          {selected?.rating && showRating && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-helix-600/20 text-helix-400 font-mono">{selected.rating}</span>
          )}
          {selected && showAppetite && (
            <span className={`w-2 h-2 rounded-full ${selected.riAppetite ? 'bg-emerald-400' : 'bg-slate-600'}`} title={selected.riAppetite ? 'Has RI appetite' : 'No RI appetite'} />
          )}
          <Search size={12} className="text-slate-600" />
        </div>
      </button>
      {open && (
        <div className="absolute z-50 w-full mt-1 rounded-xl shadow-2xl overflow-hidden"
          style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="p-2 border-b border-slate-800/60">
            <input autoFocus value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search by name or country..."
              className="w-full px-3 py-1.5 bg-slate-800/60 rounded-lg text-xs text-slate-200 placeholder-slate-600 outline-none" />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0 && <p className="text-xs text-slate-600 px-3 py-3 text-center">No matches found</p>}
            {filtered.map(p => (
              <button key={p.name} type="button"
                onClick={() => { onChange(p.name); setOpen(false); setQ('') }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-xs hover:bg-slate-800/60 transition-colors ${p.name === value ? 'bg-helix-600/10 text-helix-300' : 'text-slate-300'}`}>
                <div>
                  <div className="font-medium">{p.name}</div>
                  {p.country && <div className="text-slate-600 mt-0.5">{p.country}{p.licNo && p.licNo !== '—' ? ` · ${p.licNo}` : ''}</div>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  {p.rating && showRating && <span className="text-[10px] px-1.5 py-0.5 rounded bg-helix-600/20 text-helix-400 font-mono">{p.rating}</span>}
                  {showAppetite && <span className={`w-2 h-2 rounded-full ${p.riAppetite ? 'bg-emerald-400' : 'bg-slate-600'}`} />}
                  {p.name === value && <Check size={12} className="text-helix-400" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── KYC Step ─────────────────────────────────────────────────────────────────
function StepKYC({ form, set }) {
  const score = calcKycScore(form.kycChecks)
  const status = kycStatus(score)
  const ks = KYC_STYLE[status]

  const toggleCheck = (key) => {
    const updated = { ...form.kycChecks, [key]: !form.kycChecks[key] }
    const newScore = calcKycScore(updated)
    set(f => ({ ...f, kycChecks: updated, kycStatus: kycStatus(newScore) }))
  }

  const selectAll = () => {
    const all = Object.fromEntries(KYC_CHECKS.map(c => [c.key, true]))
    set(f => ({ ...f, kycChecks: all, kycStatus: 'green' }))
  }

  return (
    <div className="space-y-6">
      {/* KYC Status Badge */}
      <div className={`p-5 rounded-2xl border ${ks.bg} ${ks.border}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${ks.dot} ${status !== 'green' ? 'animate-pulse' : ''}`} />
            <span className={`font-bold text-lg ${ks.text}`}>KYC Status: {ks.label}</span>
          </div>
          <div className="text-right">
            <div className={`font-mono text-3xl font-bold ${ks.text}`}>{score}<span className="text-lg opacity-60">/100</span></div>
            <div className="text-xs text-slate-500">Compliance score</div>
          </div>
        </div>
        {/* Score bar */}
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${score}%`, background: ks.badge }} />
        </div>
        <div className="flex justify-between text-[10px] text-slate-600 mt-1.5">
          <span>0 — Red (Non-Compliant)</span>
          <span>50 — Amber (Review)</span>
          <span>80+ — Green (Compliant)</span>
        </div>
        {status === 'red' && (
          <p className="text-xs text-rose-400 mt-3 flex items-center gap-1.5">
            <AlertCircle size={12} /> Risk cannot proceed to bind until KYC score reaches Amber (50+). Complete required checks below.
          </p>
        )}
        {status === 'amber' && (
          <p className="text-xs text-amber-400 mt-3 flex items-center gap-1.5">
            <AlertTriangle size={12} /> Risk requires senior underwriter review before binding. Add notes below.
          </p>
        )}
        {status === 'green' && (
          <p className="text-xs text-emerald-400 mt-3 flex items-center gap-1.5">
            <CheckCircle size={12} /> KYC compliant — risk may proceed through all placement steps.
          </p>
        )}
      </div>

      {/* KYC Checks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <SectionTitle sub="Complete all applicable checks for this client">KYC Verification Checklist</SectionTitle>
          <button type="button" onClick={selectAll}
            className="text-xs text-helix-400 hover:text-helix-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-helix-600/20 hover:bg-helix-600/10 transition-colors">
            <CheckSquare size={12} /> Mark All Complete
          </button>
        </div>
        <div className="space-y-2">
          {KYC_CHECKS.map(c => {
            const checked = form.kycChecks[c.key]
            return (
              <button key={c.key} type="button" onClick={() => toggleCheck(c.key)}
                className={`w-full flex items-center gap-4 p-3.5 rounded-xl border text-left transition-all ${
                  checked ? 'border-emerald-600/30 bg-emerald-500/5' : 'border-slate-700/40 bg-slate-800/20 hover:border-slate-600/60'
                }`}>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border transition-all ${
                  checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 bg-slate-800'
                }`}>
                  {checked && <Check size={11} className="text-white" />}
                </div>
                <span className={`flex-1 text-sm ${checked ? 'text-slate-200' : 'text-slate-400'}`}>{c.label}</span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${checked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/60 text-slate-600'}`}>
                  +{c.weight}pts
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* KYC Notes */}
      <Field label="KYC Notes / Underwriter Comments" hint="Record any exceptions, referrals or risk observations">
        <Textarea value={form.kycNotes} onChange={e => set(f => ({ ...f, kycNotes: e.target.value }))}
          rows={3} placeholder="e.g. Client referred by senior underwriter. Sanctions check clear per OFAC & EU lists dated 2026-02-10." />
      </Field>

      {/* Territory Selection */}
      <div>
        <SectionTitle sub="Select all territories where the risk / vehicle will operate">Territorial Scope</SectionTitle>
        <div className="space-y-4">
          {TERRITORY_GROUPS.map(group => {
            const groupSelected = group.territories.filter(t => form.territories.includes(t))
            const allSelected = group.territories.every(t => form.territories.includes(t))
            const toggleGroup = () => {
              if (allSelected) {
                set(f => ({ ...f, territories: f.territories.filter(t => !group.territories.includes(t)) }))
              } else {
                set(f => ({ ...f, territories: [...new Set([...f.territories, ...group.territories])] }))
              }
            }
            const toggleTerritory = (t) => {
              set(f => ({
                ...f,
                territories: f.territories.includes(t) ? f.territories.filter(x => x !== t) : [...f.territories, t]
              }))
            }
            return (
              <div key={group.group} className="rounded-xl border border-slate-700/40 overflow-hidden">
                <button type="button" onClick={toggleGroup}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-slate-800/30"
                  style={{ borderLeft: `3px solid ${group.color}` }}>
                  <div className="flex items-center gap-2">
                    <MapPin size={12} style={{ color: group.color }} />
                    <span className="text-sm font-semibold text-slate-200">{group.group}</span>
                    {groupSelected.length > 0 && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-mono"
                        style={{ background: `${group.color}20`, color: group.color }}>
                        {groupSelected.length}/{group.territories.length}
                      </span>
                    )}
                  </div>
                  <span className="text-xs" style={{ color: group.color }}>{allSelected ? 'Deselect all' : 'Select all'}</span>
                </button>
                <div className="px-4 py-3 flex flex-wrap gap-2">
                  {group.territories.map(t => {
                    const sel = form.territories.includes(t)
                    return (
                      <button key={t} type="button" onClick={() => toggleTerritory(t)}
                        className="text-xs px-3 py-1 rounded-full border transition-all"
                        style={sel ? { background: `${group.color}20`, borderColor: `${group.color}50`, color: group.color } : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' }}>
                        {t}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        {form.territories.length > 0 && (
          <p className="text-xs text-helix-400 mt-2">✓ {form.territories.length} territories selected: {form.territories.slice(0, 5).join(', ')}{form.territories.length > 5 ? ` +${form.territories.length - 5} more` : ''}</p>
        )}
      </div>

      {/* Document Uploads */}
      <div>
        <SectionTitle sub="Attach supporting documents for this placement">Supporting Documents</SectionTitle>
        <DocUploader docs={form.attachedDocs} onChange={docs => set(f => ({ ...f, attachedDocs: docs }))} />
      </div>
    </div>
  )
}

// ─── Document Uploader ────────────────────────────────────────────────────────
function DocUploader({ docs, onChange }) {
  const inputRef = useRef(null)
  const DOC_TYPES_LIST = ['Vehicle Inspection Report', 'Valuation Certificate', 'ID / Company Registration', 'Driver Licence', 'Claims History', 'Fleet Schedule', 'Risk Survey', 'Other']

  const handleFiles = (files) => {
    const newDocs = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      docType: 'Other',
      uploadedAt: new Date().toLocaleTimeString(),
      dataUrl: null,
    }))
    // Read as dataUrl for preview
    newDocs.forEach((doc, i) => {
      const reader = new FileReader()
      reader.onload = e => {
        const updated = [...docs, ...newDocs]
        updated[docs.length + i] = { ...updated[docs.length + i], dataUrl: e.target.result }
        onChange(updated)
      }
      reader.readAsDataURL(files[i])
    })
    if (newDocs.length > 0) onChange([...docs, ...newDocs])
  }

  const remove = (id) => onChange(docs.filter(d => d.id !== id))
  const updateDocType = (id, docType) => onChange(docs.map(d => d.id === id ? { ...d, docType } : d))

  const fmtSize = (b) => b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)}MB` : `${Math.round(b / 1024)}KB`

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
        className="border-2 border-dashed border-slate-700/60 rounded-xl p-6 text-center cursor-pointer hover:border-helix-500/40 hover:bg-helix-600/5 transition-all">
        <Upload size={22} className="text-slate-600 mx-auto mb-2" />
        <p className="text-sm text-slate-500">Drop files here or <span className="text-helix-400 underline">browse</span></p>
        <p className="text-xs text-slate-700 mt-1">PDF, JPG, PNG, DOCX — max 10MB per file</p>
        <input ref={inputRef} type="file" multiple className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.docx,.doc"
          onChange={e => handleFiles(e.target.files)} />
      </div>

      {/* Attached files */}
      {docs.length > 0 && (
        <div className="space-y-2">
          {docs.map(doc => (
            <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-700/40 bg-slate-800/20">
              <Paperclip size={14} className="text-helix-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-300 truncate font-medium">{doc.name}</p>
                <p className="text-[10px] text-slate-600">{fmtSize(doc.size)} · {doc.uploadedAt}</p>
              </div>
              <select value={doc.docType}
                onChange={e => updateDocType(doc.id, e.target.value)}
                className="text-xs bg-slate-900/60 border border-slate-700/40 rounded-lg px-2 py-1 text-slate-400 outline-none">
                {DOC_TYPES_LIST.map(t => <option key={t}>{t}</option>)}
              </select>
              <button type="button" onClick={() => remove(doc.id)}
                className="text-slate-600 hover:text-rose-400 transition-colors flex-shrink-0">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── E-Signature Canvas ───────────────────────────────────────────────────────
function ESignaturePanel({ party, label, value, onChange }) {
  const canvasRef = useRef(null)
  const [mode, setMode] = useState('draw') // draw | type
  const [typedSig, setTypedSig] = useState('')
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSig, setHasSig] = useState(!!value)
  const lastPos = useRef(null)

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  const startDraw = (e) => {
    e.preventDefault()
    const canvas = canvasRef.current; if (!canvas) return
    setIsDrawing(true)
    lastPos.current = getPos(e, canvas)
  }

  const draw = (e) => {
    e.preventDefault()
    if (!isDrawing || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e, canvas)
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = '#6b8eff'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPos.current = pos
  }

  const endDraw = () => {
    setIsDrawing(false)
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL()
      setHasSig(true)
      onChange(dataUrl)
    }
  }

  const clearSig = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
    setHasSig(false)
    setTypedSig('')
    onChange(null)
  }

  const applyTyped = () => {
    if (!canvasRef.current || !typedSig) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = 'italic 28px Georgia, serif'
    ctx.fillStyle = '#6b8eff'
    ctx.textAlign = 'center'
    ctx.fillText(typedSig, canvas.width / 2, canvas.height / 2 + 10)
    const dataUrl = canvas.toDataURL()
    setHasSig(true)
    onChange(dataUrl)
  }

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${hasSig ? 'border-emerald-600/30 bg-emerald-500/5' : 'border-slate-700/40 bg-slate-800/20'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PenTool size={14} className={hasSig ? 'text-emerald-400' : 'text-slate-500'} />
            <span className="text-sm font-semibold text-slate-200">{label}</span>
          </div>
          <div className="flex items-center gap-2">
            {hasSig && <span className="flex items-center gap-1 text-xs text-emerald-400"><CheckCircle size={11} />Signed</span>}
            {hasSig && (
              <button type="button" onClick={clearSig} className="text-xs text-slate-600 hover:text-rose-400 flex items-center gap-1 transition-colors">
                <RotateCcw size={11} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-1 mb-3">
          {[['draw','✍ Draw'], ['type','⌨ Type']].map(([m, lbl]) => (
            <button key={m} type="button" onClick={() => setMode(m)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${mode === m ? 'bg-helix-600/20 text-helix-300 border border-helix-600/30' : 'text-slate-600 hover:text-slate-400'}`}>
              {lbl}
            </button>
          ))}
        </div>

        {mode === 'draw' && (
          <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(2,6,23,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <canvas ref={canvasRef} width={460} height={90}
              className="w-full cursor-crosshair touch-none"
              onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
              onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
            />
            {!hasSig && <p className="text-center text-xs text-slate-700 pb-2">Draw your signature above</p>}
          </div>
        )}

        {mode === 'type' && (
          <div className="flex gap-2">
            <input value={typedSig} onChange={e => setTypedSig(e.target.value)}
              placeholder="Type your full name..."
              className="flex-1 px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-helix-500/60"
              style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }} />
            <button type="button" onClick={applyTyped}
              className="px-4 py-2 bg-helix-600 hover:bg-helix-500 text-white rounded-lg text-xs font-medium transition-colors">
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Risk Details Step ────────────────────────────────────────────────────────
function StepRiskDetails({ form, set }) {
  const addDriver = () => set(f => ({ ...f, namedDrivers: [...f.namedDrivers, { name: '', licence: '', dob: '' }] }))
  const removeDriver = i => set(f => ({ ...f, namedDrivers: f.namedDrivers.filter((_, idx) => idx !== i) }))
  const updateDriver = (i, field, value) => set(f => { const d = [...f.namedDrivers]; d[i] = { ...d[i], [field]: value }; return { ...f, namedDrivers: d } })

  return (
    <div className="space-y-6">
      <div>
        <SectionTitle sub="Details of the person or entity being insured">Insured Information</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Insured Full Name / Company Name" required><Input value={form.insuredName} onChange={e => set(f => ({ ...f, insuredName: e.target.value }))} placeholder="e.g. Econet Wireless Zimbabwe" /></Field>
          <Field label="ID Type"><Select value={form.insuredIdType} onChange={e => set(f => ({ ...f, insuredIdType: e.target.value }))}>{['Company (CRN)', 'National ID', 'Passport', 'Other'].map(o => <option key={o}>{o}</option>)}</Select></Field>
          <Field label="ID / Registration Number" required><Input value={form.insuredIdNumber} onChange={e => set(f => ({ ...f, insuredIdNumber: e.target.value }))} placeholder="e.g. 1234/2001" /></Field>
          <Field label="Phone Number"><Input value={form.insuredPhone} onChange={e => set(f => ({ ...f, insuredPhone: e.target.value }))} placeholder="+263 71 234 5678" /></Field>
          <Field label="Email Address"><Input type="email" value={form.insuredEmail} onChange={e => set(f => ({ ...f, insuredEmail: e.target.value }))} placeholder="accounts@company.co.zw" /></Field>
          <Field label="Physical Address"><Input value={form.insuredAddress} onChange={e => set(f => ({ ...f, insuredAddress: e.target.value }))} placeholder="123 Samora Machel Ave, Harare" /></Field>
        </div>
      </div>
      <div>
        <SectionTitle sub="Submission source and broker reference">Submission Source</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Broker / Source">
            <PartyDropdown value={form.brokerName} onChange={v => set(f => ({ ...f, brokerName: v }))} directory={BROKER_DIRECTORY} placeholder="Select broker..." />
          </Field>
          <Field label="Broker Reference No." hint="Leave blank if direct"><Input value={form.brokerRef} onChange={e => set(f => ({ ...f, brokerRef: e.target.value }))} placeholder="e.g. BKR-2026-1122" /></Field>
        </div>
      </div>
      <div>
        <SectionTitle sub="Full vehicle particulars for this placement">Vehicle Details</SectionTitle>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Vehicle Class" required><Select value={form.vehicleClass} onChange={e => set(f => ({ ...f, vehicleClass: e.target.value }))}>{VEHICLE_CLASSES.map(c => <option key={c}>{c}</option>)}</Select></Field>
          <Field label="Make" required><Input value={form.vehicleMake} onChange={e => set(f => ({ ...f, vehicleMake: e.target.value }))} placeholder="e.g. Toyota" /></Field>
          <Field label="Model" required><Input value={form.vehicleModel} onChange={e => set(f => ({ ...f, vehicleModel: e.target.value }))} placeholder="e.g. Hilux 2.4GD-6" /></Field>
          <Field label="Year of Manufacture" required><Input value={form.vehicleYear} onChange={e => set(f => ({ ...f, vehicleYear: e.target.value }))} placeholder="e.g. 2022" maxLength={4} /></Field>
          <Field label="Registration Number" required><Input value={form.vehicleRegNo} onChange={e => set(f => ({ ...f, vehicleRegNo: e.target.value.toUpperCase() }))} placeholder="e.g. GRD 4821" /></Field>
          <Field label="Chassis Number" required><Input value={form.vehicleChassisNo} onChange={e => set(f => ({ ...f, vehicleChassisNo: e.target.value.toUpperCase() }))} placeholder="17-char VIN" /></Field>
          <Field label="Engine Number"><Input value={form.vehicleEngineNo} onChange={e => set(f => ({ ...f, vehicleEngineNo: e.target.value.toUpperCase() }))} placeholder="e.g. 2GD123456" /></Field>
          <Field label="Body Type"><Select value={form.vehicleBodyType} onChange={e => set(f => ({ ...f, vehicleBodyType: e.target.value }))}>{BODY_TYPES.map(b => <option key={b}>{b}</option>)}</Select></Field>
          <Field label="Use of Vehicle" required><Select value={form.vehicleUse} onChange={e => set(f => ({ ...f, vehicleUse: e.target.value }))}>{USE_TYPES.map(u => <option key={u}>{u}</option>)}</Select></Field>
          <Field label="Colour"><Input value={form.vehicleColour} onChange={e => set(f => ({ ...f, vehicleColour: e.target.value }))} placeholder="e.g. White" /></Field>
          <Field label="No. of Seats"><Input type="number" value={form.vehicleSeats} onChange={e => set(f => ({ ...f, vehicleSeats: e.target.value }))} placeholder="e.g. 5" /></Field>
          <Field label="Engine Capacity (cc)"><Input type="number" value={form.vehicleCc} onChange={e => set(f => ({ ...f, vehicleCc: e.target.value }))} placeholder="e.g. 2400" /></Field>
        </div>
        <div className="mt-4">
          <Toggle checked={form.vehicleModified} onChange={v => set(f => ({ ...f, vehicleModified: v }))} label="Vehicle has modifications / non-standard accessories" />
          {form.vehicleModified && <div className="mt-3"><Field label="Modification Details"><Textarea value={form.vehicleModDetails} onChange={e => set(f => ({ ...f, vehicleModDetails: e.target.value }))} rows={2} placeholder="Describe modifications..." /></Field></div>}
        </div>
      </div>
      <div>
        <SectionTitle sub="Main driver of the vehicle">Principal Driver</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name" required><Input value={form.driverName} onChange={e => set(f => ({ ...f, driverName: e.target.value }))} placeholder="Full name as on licence" /></Field>
          <Field label="Licence Number" required><Input value={form.driverLicenceNo} onChange={e => set(f => ({ ...f, driverLicenceNo: e.target.value }))} placeholder="e.g. ZIM-2345678" /></Field>
          <Field label="Licence Class"><Select value={form.driverLicenceClass} onChange={e => set(f => ({ ...f, driverLicenceClass: e.target.value }))}><option value="">Select class</option>{['Class 1 – Motorcycle', 'Class 2 – Light Motor Vehicle', 'Class 3 – Heavy Motor Vehicle', 'Class 4 – Articulated Vehicle', 'Class 5 – PSV'].map(c => <option key={c}>{c}</option>)}</Select></Field>
          <Field label="Date of Birth" required><Input type="date" value={form.driverDOB} onChange={e => set(f => ({ ...f, driverDOB: e.target.value }))} /></Field>
          <Field label="Years Licensed"><Input type="number" value={form.driverYearsLicensed} onChange={e => set(f => ({ ...f, driverYearsLicensed: e.target.value }))} placeholder="e.g. 3" /></Field>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <SectionTitle sub="Additional drivers to be named on the policy">Named Drivers</SectionTitle>
          <button type="button" onClick={addDriver} className="flex items-center gap-1.5 px-3 py-1.5 bg-helix-600/15 text-helix-400 rounded-lg text-xs border border-helix-600/20 hover:bg-helix-600/25 transition-colors"><Plus size={12} /> Add Driver</button>
        </div>
        {form.namedDrivers.length === 0 && <p className="text-xs text-slate-600 italic">No additional named drivers added.</p>}
        {form.namedDrivers.map((d, i) => (
          <div key={i} className="grid grid-cols-3 gap-3 mb-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/40 relative">
            <button type="button" onClick={() => removeDriver(i)} className="absolute top-2 right-2 text-slate-600 hover:text-rose-400"><X size={12} /></button>
            <Field label={`Driver ${i + 2} Name`}><Input value={d.name} onChange={e => updateDriver(i, 'name', e.target.value)} placeholder="Full name" /></Field>
            <Field label="Licence Number"><Input value={d.licence} onChange={e => updateDriver(i, 'licence', e.target.value)} placeholder="Licence no." /></Field>
            <Field label="Date of Birth"><Input type="date" value={d.dob} onChange={e => updateDriver(i, 'dob', e.target.value)} /></Field>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Cover & Premium Step ─────────────────────────────────────────────────────
function StepCoverPremium({ form, set }) {
  const calc = calcPremium(form)
  const setExt = (key, val) => set(f => ({ ...f, extensions: { ...f.extensions, [key]: val } }))
  const updateInception = (val) => {
    const d = new Date(val); const exp = new Date(d)
    exp.setFullYear(exp.getFullYear() + 1); exp.setDate(exp.getDate() - 1)
    set(f => ({ ...f, inceptionDate: val, expiryDate: exp.toISOString().split('T')[0] }))
  }
  return (
    <div className="space-y-6">
      <div>
        <SectionTitle sub="Coverage section and policy duration">Cover Terms</SectionTitle>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Cover Type" required><Select value={form.coverType} onChange={e => set(f => ({ ...f, coverType: e.target.value }))}>{COVER_TYPES.map(c => <option key={c}>{c}</option>)}</Select></Field>
          <Field label="Currency"><Select value={form.currency} onChange={e => set(f => ({ ...f, currency: e.target.value }))}>{CURRENCIES.map(c => <option key={c}>{c}</option>)}</Select></Field>
          <Field label="Sum Insured" required><Input type="number" value={form.sumInsured} onChange={e => set(f => ({ ...f, sumInsured: e.target.value }))} placeholder="e.g. 25000" /></Field>
          <Field label="Inception Date" required><Input type="date" value={form.inceptionDate} onChange={e => updateInception(e.target.value)} /></Field>
          <Field label="Expiry Date" required><Input type="date" value={form.expiryDate} onChange={e => set(f => ({ ...f, expiryDate: e.target.value }))} /></Field>
          <div className="flex items-end pb-1"><Toggle checked={form.agreedValue} onChange={v => set(f => ({ ...f, agreedValue: v }))} label="Agreed Value basis" /></div>
        </div>
      </div>
      <div>
        <SectionTitle sub="Rate components used to calculate the net premium">Premium Rating</SectionTitle>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Basic Rate (%)" required><Input type="number" value={form.basicRate} onChange={e => set(f => ({ ...f, basicRate: e.target.value }))} placeholder="e.g. 4.50" step="0.01" /></Field>
          <Field label="NCD Discount (%)"><Select value={form.ncdPct} onChange={e => set(f => ({ ...f, ncdPct: e.target.value }))}>{['0','10','15','20','25','30','35','40','50'].map(n => <option key={n} value={n}>{n}% NCD</option>)}</Select></Field>
          <Field label="Young Driver Loading (%)"><Input type="number" value={form.youngDriverLoading} onChange={e => set(f => ({ ...f, youngDriverLoading: e.target.value }))} placeholder="e.g. 0.75" step="0.01" min="0" /></Field>
          <Field label="High Value Loading (%)"><Input type="number" value={form.highValueLoading} onChange={e => set(f => ({ ...f, highValueLoading: e.target.value }))} placeholder="e.g. 0.25" step="0.01" min="0" /></Field>
          <Field label="Other Loading (%)"><Input type="number" value={form.otherLoading} onChange={e => set(f => ({ ...f, otherLoading: e.target.value }))} placeholder="e.g. 0.50" step="0.01" min="0" /></Field>
          <Field label="Stamp Duty (%)"><Input type="number" value={form.stampDutyPct} onChange={e => set(f => ({ ...f, stampDutyPct: e.target.value }))} placeholder="3" step="0.01" /></Field>
        </div>
        {form.sumInsured && form.basicRate && (
          <div className="mt-4 p-4 bg-helix-900/20 border border-helix-700/20 rounded-xl">
            <div className="text-xs text-helix-400 font-semibold mb-3 uppercase tracking-wide">Live Premium Preview</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs mb-3">
              {[['Sum Insured',`${form.currency} ${fmtMoney(form.sumInsured)}`,'text-slate-300'],['Basic Rate',`${form.basicRate}%`,'text-slate-300'],[`NCD (${form.ncdPct}%)`,`– ${form.ncdPct}%`,'text-emerald-400'],['Net Rate',`${calc.netRate}%`,'text-helix-300 font-semibold']].map(([l,v,c])=>(
                <div key={l} className="flex justify-between border-b border-slate-800/40 pb-1.5"><span className="text-slate-500">{l}</span><span className={c}>{v}</span></div>
              ))}
            </div>
            <div className="space-y-1 text-xs border-t border-slate-700/40 pt-3">
              {[[`Net Premium`,`${form.currency} ${fmtMoney(calc.netPremium)}`],[`Stamp Duty`,`${form.currency} ${fmtMoney(calc.stampDuty)}`],[`Levy`,`${form.currency} ${fmtMoney(calc.levy)}`]].map(([l,v])=>(
                <div key={l} className="flex justify-between"><span className="text-slate-500">{l}</span><span className="text-slate-300">{v}</span></div>
              ))}
              <div className="flex justify-between text-sm font-bold border-t border-slate-700/40 pt-2 mt-1">
                <span className="text-slate-200">GROSS PREMIUM</span>
                <span className="text-helix-300 font-mono">{form.currency} {fmtMoney(calc.gross)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <SectionTitle sub="Deductibles the insured bears for each loss event">Excess / Deductibles</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Own Damage Excess"><Input type="number" value={form.excessOwn} onChange={e => set(f => ({ ...f, excessOwn: e.target.value }))} placeholder="e.g. 500" /></Field>
          <Field label="Third Party Property Limit"><Input type="number" value={form.thirdPartyLimit} onChange={e => set(f => ({ ...f, thirdPartyLimit: e.target.value }))} placeholder="50000" /></Field>
        </div>
      </div>
      <div>
        <SectionTitle sub="Optional covers to be endorsed onto the policy">Extensions</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries({ windscreen:'Windscreen & Glass', radio:'Radio & Entertainment', personalAccident:'Personal Accident', medicalExpenses:'Medical Expenses', carHire:'Car Hire', emergencyRescue:'Emergency Rescue', riotStrike:'Riot & Strike', naturalDisaster:'Flood & Storm' }).map(([key, label]) => (
            <label key={key} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${form.extensions[key] ? 'border-helix-600/40 bg-helix-600/10' : 'border-slate-700/40 bg-slate-800/20 hover:border-slate-600/60'}`}>
              <input type="checkbox" checked={form.extensions[key]} onChange={e => setExt(key, e.target.checked)} className="accent-helix-500 w-4 h-4" />
              <span className="text-sm text-slate-300">{label}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <SectionTitle>Special Conditions</SectionTitle>
        <Textarea value={form.specialConditions} onChange={e => set(f => ({ ...f, specialConditions: e.target.value }))} rows={3} placeholder="Tracking device warranty, garaged overnight, etc." />
      </div>
    </div>
  )
}

// ─── Insurers Step ────────────────────────────────────────────────────────────
function StepInsurers({ form, set }) {
  const leadShare = parseFloat(form.leadInsurerShare) || 0
  const coShare = form.coinsurers.reduce((a, c) => a + (parseFloat(c.share) || 0), 0)
  const totalShare = leadShare + coShare
  const addCoinsurer = () => set(f => ({ ...f, coinsurers: [...f.coinsurers, { name: '', share: '', ref: '', status: 'pending' }] }))
  const removeCoinsurer = i => set(f => ({ ...f, coinsurers: f.coinsurers.filter((_, idx) => idx !== i) }))
  const updateCo = (i, field, value) => set(f => { const co = [...f.coinsurers]; co[i] = { ...co[i], [field]: value }; return { ...f, coinsurers: co } })
  return (
    <div className="space-y-6">
      <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-slate-400">Total Share Allocated</span>
          <span className={`font-mono font-bold ${totalShare === 100 ? 'text-emerald-400' : totalShare > 100 ? 'text-rose-400' : 'text-amber-400'}`}>{totalShare.toFixed(0)}% / 100%</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${totalShare === 100 ? 'bg-emerald-500' : totalShare > 100 ? 'bg-rose-500' : 'bg-helix-500'}`} style={{ width: `${Math.min(totalShare, 100)}%` }} />
        </div>
        {totalShare === 100 && <p className="text-xs mt-1.5 text-emerald-400">✓ Full 100% allocated</p>}
      </div>
      <div>
        <SectionTitle sub="Leading insurer — searchable directory">Lead Insurer</SectionTitle>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Lead Insurer" required>
            <PartyDropdown value={form.leadInsurer} onChange={v => set(f => ({ ...f, leadInsurer: v }))} directory={INSURER_DIRECTORY} placeholder="Search insurer..." showRating showAppetite />
          </Field>
          <Field label="Share (%)" required><Input type="number" value={form.leadInsurerShare} onChange={e => set(f => ({ ...f, leadInsurerShare: e.target.value }))} placeholder="e.g. 60" /></Field>
          <Field label="Insurer Reference No."><Input value={form.leadInsurerRef} onChange={e => set(f => ({ ...f, leadInsurerRef: e.target.value }))} placeholder="e.g. OM-2026-44521" /></Field>
        </div>
        {form.leadInsurer && INSURER_DIRECTORY.find(i => i.name === form.leadInsurer) && (
          <div className="mt-2 text-xs text-slate-600 flex items-center gap-3">
            <span>Licence: {INSURER_DIRECTORY.find(i => i.name === form.leadInsurer)?.licNo}</span>
            <span>Contact: {INSURER_DIRECTORY.find(i => i.name === form.leadInsurer)?.contact}</span>
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <SectionTitle sub="Additional co-insurers sharing the risk">Co-Insurers</SectionTitle>
          <button type="button" onClick={addCoinsurer} className="flex items-center gap-1.5 px-3 py-1.5 bg-helix-600/15 text-helix-400 rounded-lg text-xs border border-helix-600/20 hover:bg-helix-600/25 transition-colors"><Plus size={12} /> Add Co-insurer</button>
        </div>
        {form.coinsurers.length === 0 && <p className="text-xs text-slate-600 italic">No co-insurers added.</p>}
        {form.coinsurers.map((co, i) => (
          <div key={i} className="grid grid-cols-4 gap-3 mb-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/40 relative">
            <button type="button" onClick={() => removeCoinsurer(i)} className="absolute top-2 right-2 text-slate-600 hover:text-rose-400"><X size={12} /></button>
            <Field label={`Co-insurer ${i+1}`}>
              <PartyDropdown value={co.name} onChange={v => updateCo(i,'name',v)} directory={INSURER_DIRECTORY.filter(ins => ins.name !== form.leadInsurer)} placeholder="Select..." showRating />
            </Field>
            <Field label="Share (%)"><Input type="number" value={co.share} onChange={e => updateCo(i,'share',e.target.value)} placeholder="e.g. 40" /></Field>
            <Field label="Reference No."><Input value={co.ref} onChange={e => updateCo(i,'ref',e.target.value)} placeholder="Co-insurer ref" /></Field>
            <Field label="Status"><Select value={co.status} onChange={e => updateCo(i,'status',e.target.value)}>{['pending','accepted','declined'].map(s => <option key={s}>{s}</option>)}</Select></Field>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Reinsurance Step ─────────────────────────────────────────────────────────
function StepReinsurance({ form, set }) {
  const calc = calcPremium(form)
  const cedingPct = parseFloat(form.cedingPct) || 0
  const retentionPct = 100 - cedingPct
  const premiumCeded = parseFloat(calc.gross) * cedingPct / 100
  const premiumRetained = parseFloat(calc.gross) * retentionPct / 100

  // Filter reinsurers that have appetite for selected territories
  const matchingRIs = REINSURER_DIRECTORY.filter(r =>
    r.riAppetite && (form.territories.length === 0 || form.territories.some(t => r.territories.includes(t) || r.territories.includes('Global')))
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/40">
        <Toggle checked={form.reinsuranceRequired} onChange={v => set(f => ({ ...f, reinsuranceRequired: v }))} label="Reinsurance placement required for this risk" />
      </div>
      {form.reinsuranceRequired && (
        <div className="space-y-6">
          {/* RI Appetite panel based on territories */}
          {form.territories.length > 0 && (
            <div className="p-4 rounded-xl border border-helix-700/20 bg-helix-900/10">
              <div className="text-xs text-helix-400 font-semibold uppercase tracking-wide mb-2">
                Reinsurers with appetite for selected territories ({matchingRIs.length} match)
              </div>
              <div className="flex flex-wrap gap-2">
                {matchingRIs.map(r => (
                  <button key={r.name} type="button" onClick={() => set(f => ({ ...f, reinsurer: r.name }))}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${form.reinsurer === r.name ? 'bg-helix-600/20 border-helix-600/40 text-helix-300' : 'border-slate-700/40 text-slate-500 hover:border-slate-500/60 hover:text-slate-300'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    {r.name}
                    <span className="font-mono text-[10px] opacity-60">{r.rating}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <SectionTitle sub="Reinsurer — searchable directory with appetite indicators">Reinsurance Structure</SectionTitle>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Treaty / Arrangement Type" required><Select value={form.treatyType} onChange={e => set(f => ({ ...f, treatyType: e.target.value }))}>{TREATY_TYPES.map(t => <option key={t}>{t}</option>)}</Select></Field>
              <Field label="Reinsurer" required>
                <PartyDropdown value={form.reinsurer} onChange={v => set(f => ({ ...f, reinsurer: v }))} directory={REINSURER_DIRECTORY} placeholder="Search reinsurer..." showRating showAppetite />
              </Field>
              <Field label="Reinsurer Reference"><Input value={form.reinsurerRef} onChange={e => set(f => ({ ...f, reinsurerRef: e.target.value }))} placeholder="e.g. MR-2026-SLP-0221" /></Field>
              <Field label="Ceding Percentage (%)" required><Input type="number" value={form.cedingPct} onChange={e => { const v = Math.min(100, Math.max(0, parseFloat(e.target.value)||0)); set(f => ({ ...f, cedingPct: String(v), retentionPct: String(100-v) })) }} placeholder="e.g. 40" /></Field>
              <Field label="Retention (%)"><Input value={retentionPct.toFixed(0)} readOnly className="opacity-60 cursor-not-allowed" /></Field>
              {form.treatyType === 'Facultative' && <Field label="Facultative Reason"><Input value={form.facultativeReason} onChange={e => set(f => ({ ...f, facultativeReason: e.target.value }))} placeholder="e.g. Sum insured exceeds treaty capacity" /></Field>}
            </div>
          </div>
          {cedingPct > 0 && (
            <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
              <div className="flex gap-1 h-8 rounded-lg overflow-hidden mb-2">
                <div className="flex items-center justify-center text-[10px] text-white font-bold bg-helix-600" style={{ width: `${cedingPct}%` }}>{cedingPct >= 15 && `${cedingPct}% Ceded`}</div>
                <div className="flex items-center justify-center text-[10px] text-slate-400 font-bold flex-1 bg-slate-700/60">{retentionPct >= 15 && `${retentionPct}% Retained`}</div>
              </div>
              {calc.gross > 0 && (
                <div className="grid grid-cols-2 gap-4 text-xs mt-3">
                  <div className="p-3 bg-helix-900/30 rounded-lg border border-helix-700/20">
                    <div className="text-helix-500 text-[10px] uppercase tracking-wide mb-1">Premium Ceded</div>
                    <div className="font-mono font-bold text-helix-300">{form.currency} {fmtMoney(premiumCeded)}</div>
                    <div className="text-slate-500 mt-0.5">to {form.reinsurer || '—'}</div>
                  </div>
                  <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/20">
                    <div className="text-slate-500 text-[10px] uppercase tracking-wide mb-1">Premium Retained</div>
                    <div className="font-mono font-bold text-slate-300">{form.currency} {fmtMoney(premiumRetained)}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {!form.reinsuranceRequired && (
        <div className="p-6 text-center border border-dashed border-slate-700/40 rounded-xl">
          <Shield size={28} className="text-slate-700 mx-auto mb-2" />
          <p className="text-sm text-slate-600">No reinsurance required. Risk retained 100% by lead insurer.</p>
        </div>
      )}
    </div>
  )
}

// ─── Acceptance + E-Signatures Step ──────────────────────────────────────────
function StepAcceptance({ form, set }) {
  const parties = [
    { key:'insured',   label:'Insured Acceptance',   sigLabel:`Insured — ${form.insuredName || 'Sign here'}`,   icon:User,      color:'text-slate-400',  statusKey:'insuredAcceptanceStatus',   signatoryKey:'insuredSignatory',   dateKey:'insuredAcceptDate',   desc:`Formal acceptance by the insured of the terms and premium.` },
    { key:'insurer',   label:'Insurer Acceptance',   sigLabel:`Insurer — ${form.leadInsurer || 'Sign here'}`,   icon:Building2, color:'text-helix-400',  statusKey:'insurerAcceptanceStatus',   signatoryKey:'insurerSignatory',   dateKey:'insurerAcceptDate',   desc:`Acceptance by ${form.leadInsurer||'the lead insurer'} of the risk.` },
    { key:'reinsurer', label:'Reinsurer Acceptance', sigLabel:`Reinsurer — ${form.reinsurer || 'Sign here'}`, icon:Globe,     color:'text-violet-400', statusKey:'reinsurerAcceptanceStatus', signatoryKey:'reinsurerSignatory', dateKey:'reinsurerAcceptDate', desc:form.reinsuranceRequired ? `Acceptance by ${form.reinsurer||'the reinsurer'} of the ceded portion.` : 'Not applicable — no reinsurance required.' },
  ]
  const allAccepted = form.insuredAcceptanceStatus === 'accepted' && form.insurerAcceptanceStatus === 'accepted' && (!form.reinsuranceRequired || form.reinsurerAcceptanceStatus === 'accepted')

  return (
    <div className="space-y-6">
      {allAccepted && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
          <p className="text-sm text-emerald-400">All required parties have accepted. Risk is ready to bind.</p>
        </div>
      )}

      {parties.map(({ key, label, sigLabel, icon: Icon, color, statusKey, signatoryKey, dateKey, desc }) => {
        const disabled = key === 'reinsurer' && !form.reinsuranceRequired
        const status = form[statusKey]
        return (
          <div key={key} className={`rounded-2xl border overflow-hidden transition-all ${disabled ? 'opacity-40' : status === 'accepted' ? 'border-emerald-600/30 bg-emerald-500/5' : status === 'declined' ? 'border-rose-600/30 bg-rose-500/5' : 'border-slate-700/40 bg-slate-800/20'}`}>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2"><Icon size={15} className={color} /><span className="text-sm font-semibold text-slate-200">{label}</span></div>
                <AcceptBadge status={disabled ? 'pending' : status} />
              </div>
              <p className="text-xs text-slate-500 mb-4">{desc}</p>
              {!disabled && (
                <>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <Field label="Acceptance Status">
                      <Select value={form[statusKey]} onChange={e => set(f => ({ ...f, [statusKey]: e.target.value }))}>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="declined">Declined</option>
                      </Select>
                    </Field>
                    <Field label="Signatory Name / Title"><Input value={form[signatoryKey]} onChange={e => set(f => ({ ...f, [signatoryKey]: e.target.value }))} placeholder="e.g. CEO — T. Masiyiwa" /></Field>
                    <Field label="Date of Acceptance"><Input type="date" value={form[dateKey]} onChange={e => set(f => ({ ...f, [dateKey]: e.target.value }))} /></Field>
                  </div>
                  {/* E-Signature */}
                  <ESignaturePanel
                    party={key}
                    label={`Electronic Signature — ${sigLabel}`}
                    value={form.signatures[key]}
                    onChange={sig => set(f => ({ ...f, signatures: { ...f.signatures, [key]: sig } }))}
                  />
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Review Step ──────────────────────────────────────────────────────────────
function StepReview({ form }) {
  const calc = calcPremium(form)
  const enabledExts = Object.entries(form.extensions).filter(([,v])=>v).map(([k])=>({windscreen:'Windscreen',radio:'Radio',personalAccident:'Personal Accident',medicalExpenses:'Medical',carHire:'Car Hire',emergencyRescue:'Emergency Rescue',riotStrike:'Riot & Strike',naturalDisaster:'Flood & Storm'}[k]))
  const kycScore = calcKycScore(form.kycChecks)
  const kycSt = kycStatus(kycScore)
  const ks = KYC_STYLE[kycSt]
  const Section = ({ title, children }) => <div className="mb-5"><div className="text-[10px] text-helix-500 font-semibold uppercase tracking-widest mb-2">{title}</div><div className="space-y-1.5 text-sm">{children}</div></div>
  const Row = ({ label, value, highlight }) => <div className="flex justify-between gap-4 border-b border-slate-800/30 pb-1.5"><span className="text-slate-500 flex-shrink-0">{label}</span><span className={`text-right truncate ${highlight ? 'text-helix-300 font-mono font-bold' : 'text-slate-300'}`}>{value || '—'}</span></div>
  return (
    <div className="space-y-4">
      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2">
        <AlertTriangle size={15} className="text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-400">Review all details before binding. Once bound, a policy number is issued and all documents become available.</p>
      </div>

      {/* KYC summary */}
      <div className={`p-3 rounded-xl border ${ks.bg} ${ks.border} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${ks.dot}`} />
          <span className={`text-sm font-semibold ${ks.text}`}>KYC: {ks.label}</span>
        </div>
        <span className={`font-mono font-bold ${ks.text}`}>{kycScore}/100</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
          <Section title="Insured & Vehicle">
            <Row label="Insured" value={form.insuredName} /><Row label="Vehicle" value={`${form.vehicleYear} ${form.vehicleMake} ${form.vehicleModel}`} />
            <Row label="Reg No." value={form.vehicleRegNo} /><Row label="Class" value={form.vehicleClass} />
            <Row label="Driver" value={form.driverName} /><Row label="Broker" value={form.brokerName} />
          </Section>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
          <Section title="Cover & Period">
            <Row label="Cover Type" value={form.coverType} /><Row label="Sum Insured" value={`${form.currency} ${fmtMoney(form.sumInsured)}`} />
            <Row label="Inception" value={form.inceptionDate} /><Row label="Expiry" value={form.expiryDate} />
            <Row label="Extensions" value={enabledExts.length ? enabledExts.join(', ') : 'None'} />
            <Row label="Territories" value={form.territories.length ? `${form.territories.length} selected` : 'None'} />
          </Section>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
          <Section title="Premium">
            <Row label="Net Rate" value={`${calc.netRate}%`} />
            <Row label="Net Premium" value={`${form.currency} ${fmtMoney(calc.netPremium)}`} />
            <Row label="Stamp Duty" value={`${form.currency} ${fmtMoney(calc.stampDuty)}`} />
            <Row label="GROSS PREMIUM" value={`${form.currency} ${fmtMoney(calc.gross)}`} highlight />
          </Section>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
          <Section title="Placement & Acceptance">
            <Row label="Lead Insurer" value={form.leadInsurer} />
            <Row label="Reinsurance" value={form.reinsuranceRequired ? `${form.cedingPct}% → ${form.reinsurer}` : 'None'} />
            <Row label="Insured Accept." value={form.insuredAcceptanceStatus} />
            <Row label="Insurer Accept." value={form.insurerAcceptanceStatus} />
            {form.reinsuranceRequired && <Row label="RI Accept." value={form.reinsurerAcceptanceStatus} />}
            <Row label="E-Signatures" value={`${Object.values(form.signatures).filter(Boolean).length} of 3 captured`} />
            <Row label="Documents" value={`${form.attachedDocs.length} attached`} />
          </Section>
        </div>
      </div>
      {form.specialConditions && <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40"><div className="text-[10px] text-helix-500 font-semibold uppercase tracking-widest mb-2">Special Conditions</div><p className="text-sm text-slate-400">{form.specialConditions}</p></div>}
    </div>
  )
}

// ─── Document Modal (unchanged from original) ─────────────────────────────────
function buildDocData(placement, docType) {
  const p = placement
  const curr = p.currency || 'USD'
  const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
  const grossFmt = p.grossPremiumNum ? fmtMoney(p.grossPremiumNum) : p.premium
  const base = {
    docRef: `${docType.toUpperCase().replace(/\s/g, '-')}-${p.id}`,
    placementRef: p.id, policyRef: `MOT-${p.id.slice(4)}`, quoteRef: p.ref,
    issuedDate: now, insuredName: p.insured, vehicleClass: p.class, coverType: p.coverType,
    currency: curr, sumInsured: p.sumInsuredNum ? fmtMoney(p.sumInsuredNum) : p.sumInsured,
    grossPremium: grossFmt, inceptionDate: p.inceptionDate, expiryDate: p.expiryDate,
    vehicleDetails: `${p.vehicleYear} ${p.vehicleMake} ${p.vehicleModel}`,
    regNo: p.vehicleRegNo, chassisNo: p.vehicleChassisNo,
    leadInsurer: p.insurer?.name, leadInsurerShare: p.insurer?.share, coinsurer: p.coinsurer,
    reinsurer: p.reinsurer, excessOwn: p.excessOwn, thirdPartyLimit: p.thirdPartyLimit,
    brokerName: p.brokerName, brokerRef: p.brokerRef, specialConditions: p.specialConditions,
    extensions: p.extensions || [], insuredSignatory: p.insuredAcceptance?.signatory, insurerSignatory: p.insurer?.signatory,
  }
  if (docType === 'Cover Note') return { ...base, docTitle: 'MOTOR INSURANCE COVER NOTE', validDays: 30, driverName: p.driverName }
  if (docType === 'Debit Note') {
    const net = p.grossPremiumNum ? (p.grossPremiumNum / 1.04).toFixed(2) : '—'
    const due = new Date(); due.setDate(due.getDate() + 30)
    return { ...base, docTitle: 'MOTOR PREMIUM DEBIT NOTE', debitNoteNo: `DN-${p.id}`,
      netPremium: p.grossPremiumNum ? fmtMoney(parseFloat(net)) : '—',
      stampDuty: p.grossPremiumNum ? fmtMoney(p.grossPremiumNum * 0.03 / 1.04) : '—',
      levy: p.grossPremiumNum ? fmtMoney(p.grossPremiumNum * 0.01 / 1.04) : '—',
      dueDate: due.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
      paymentTerms: '30 days from date of issue',
      brokerCommission: p.grossPremiumNum ? fmtMoney(p.grossPremiumNum * 0.15) : '—',
      brokerCommissionPct: '15%',
    }
  }
  if (docType === 'Reinsurance Slip') {
    const riPremium = p.reinsurer?.cedingPct && p.grossPremiumNum ? fmtMoney(p.grossPremiumNum * p.reinsurer.cedingPct / 100) : '—'
    const riCommission = p.reinsurer?.cedingPct && p.grossPremiumNum ? fmtMoney(p.grossPremiumNum * p.reinsurer.cedingPct / 100 * 0.25) : '—'
    return { ...base, docTitle: 'MOTOR REINSURANCE PLACEMENT SLIP', slipNo: p.reinsurer?.slipNo || `SLIP-${p.id}`,
      reinsurerName: p.reinsurer?.name, cedingPct: p.reinsurer?.cedingPct, retentionPct: 100-(p.reinsurer?.cedingPct||0),
      riPremium, riCommission, riCommissionPct: '25%',
      treatyType: p.reinsurer?.cedingPct >= 50 ? 'Quota Share Treaty' : 'Facultative Proportional',
      riRef: p.reinsurer?.ref, eml: p.sumInsuredNum ? fmtMoney(p.sumInsuredNum * 0.75) : '—',
    }
  }
  if (docType === 'Signing Slip') {
    const participants = [
      { name: p.insurer?.name, written: p.insurer?.share, signed: p.insurer?.share, ref: p.insurer?.ref, date: p.insurer?.date, signatory: p.insurer?.signatory, status: p.insurer?.status },
      p.coinsurer?.name ? { name: p.coinsurer.name, written: p.coinsurer.share, signed: p.coinsurer.share, ref: p.coinsurer.ref||'—', date: p.coinsurer.date, signatory: p.coinsurer.signatory||'—', status: p.coinsurer.status } : null,
    ].filter(Boolean)
    return { ...base, docTitle: 'MARKET SIGNING SLIP', signingSlipNo: `SGN-${p.id}`,
      participants, totalSigned: participants.reduce((a,c)=>a+(c.signed||0),0), signingDeadline: p.expiryDate,
    }
  }
  return base
}

function DocSection({ title, accent, children }) {
  return <div><div className="text-[10px] font-bold uppercase tracking-widest mb-2 pb-1 border-b" style={{ color: accent, borderColor: `${accent}44` }}>{title}</div><div className="space-y-1.5">{children}</div></div>
}
function DocRow({ label, value, highlight }) {
  return <div className="flex gap-4 text-xs border-b py-1.5" style={{ borderColor: 'rgba(255,255,255,0.04)' }}><span className="text-slate-500 w-44 flex-shrink-0">{label}</span><span className={`font-mono ${highlight ? 'font-bold text-white' : 'text-slate-300'}`}>{value||'—'}</span></div>
}
function SignatureBlock({ label, name, note }) {
  return <div className="text-xs"><div className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">{label}</div><div className="text-slate-300 border-b border-slate-700/60 pb-1 mb-1 font-mono">{name}</div><div className="text-slate-600">{note}</div></div>
}

function DocumentModal({ placement, docType, onClose }) {
  const [printing, setPrinting] = useState(false)
  const data = buildDocData(placement, docType)
  const docColors = {
    'Cover Note':       { header: '#0f766e', badge: '#134e4a', icon: '📋', accent: '#14b8a6' },
    'Debit Note':       { header: '#1d4ed8', badge: '#1e3a8a', icon: '💰', accent: '#3b82f6' },
    'Reinsurance Slip': { header: '#7c3aed', badge: '#4c1d95', icon: '🛡', accent: '#8b5cf6' },
    'Signing Slip':     { header: '#b45309', badge: '#78350f', icon: '✍️', accent: '#f59e0b' },
  }
  const dc = docColors[docType] || docColors['Cover Note']
  const handlePrint = () => { setPrinting(true); setTimeout(() => setPrinting(false), 1200) }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}>
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl" style={{ background: '#0d1117' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60" style={{ background: dc.header }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{dc.icon}</span>
            <div><div className="text-xs text-white/60 font-mono uppercase tracking-widest">{data.docRef}</div><div className="text-lg font-bold text-white">{docType}</div></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all" style={{ background: printing ? '#16a34a' : 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
              {printing ? <><Check size={14} /> Sent to Print</> : <><Printer size={14} /> Print / PDF</>}
            </button>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"><X size={16} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-5 font-mono text-sm" style={{ color: '#e2e8f0' }}>
          <div className="flex items-start justify-between pb-4 border-b-2" style={{ borderColor: dc.accent }}>
            <div><div className="text-xl font-bold" style={{ color: dc.accent }}>HELIX INSURANCE</div><div className="text-xs text-slate-500 mt-1">IRA Reg. No. IRA-0012-ZW · 12 Samora Machel Avenue, Harare</div></div>
            <div className="text-right"><div className="text-xs text-slate-500">Ref: {data.docRef}</div><div className="text-xs text-slate-500">Issued: {data.issuedDate}</div></div>
          </div>
          <DocSection title="Insured Details" accent={dc.accent}><DocRow label="Insured Name" value={data.insuredName} /><DocRow label="Cover Type" value={data.coverType} /><DocRow label="Vehicle" value={data.vehicleDetails} /><DocRow label="Sum Insured" value={`${data.currency} ${data.sumInsured}`} highlight /><DocRow label="Gross Premium" value={`${data.currency} ${data.grossPremium}`} highlight /><DocRow label="Period" value={`${data.inceptionDate} to ${data.expiryDate}`} /></DocSection>
          {placement.territories?.length > 0 && <DocSection title="Territorial Scope" accent={dc.accent}><DocRow label="Territories" value={placement.territories.join(', ')} /></DocSection>}
          {placement.kyc && <DocSection title="KYC Compliance" accent={dc.accent}><DocRow label="KYC Status" value={`${KYC_STYLE[placement.kyc.status]?.label} (${placement.kyc.score}/100)`} highlight /><DocRow label="Completed" value={placement.kyc.completedDate} /></DocSection>}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800/60">
            <SignatureBlock label="FOR AND ON BEHALF OF INSURED" name={data.insuredSignatory || '________________________'} note="Authorised Signatory / Date" />
            <SignatureBlock label="FOR AND ON BEHALF OF INSURER" name={data.insurerSignatory || '________________________'} note="Authorised Signatory / Date" />
          </div>
        </div>
        <div className="px-6 py-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-600" style={{ background: '#0a0f1a' }}>
          <span>Helix Insurance Management System · Generated {data.issuedDate}</span>
          <span className="font-mono">{data.docRef}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Efficiency Guide ─────────────────────────────────────────────────────────
function EfficiencyGuide({ onClose }) {
  const tips = [
    { icon:'⚡', title:'Pre-qualify the Risk', color:'#f59e0b', points:['Complete KYC before opening the wizard — risk cannot bind with Red KYC status','Confirm vehicle details (reg, chassis, VIN) before starting','Verify NCD certificate is current and matches previous insurer records'] },
    { icon:'🏦', title:'Prepare Insurer Panel Early', color:'#3b82f6', points:['Contact lead insurer before wizard to confirm capacity and rate appetite','Have co-insurer names and target shares pre-agreed','Confirm 100% = lead + co-insurers before entering shares'] },
    { icon:'🛡', title:'Reinsurance Ready-State', color:'#8b5cf6', points:['Check treaty capacity for sum insured BEFORE placement','For fleet risks over USD 500k SI, always trigger RI regardless of class','Select territories first — the system shows matching RI appetite automatically'] },
    { icon:'✅', title:'E-Signature Best Practice', color:'#10b981', points:['Collect insured e-signature at Step 6 before marking as Accepted','Draw or type signature — both are legally equivalent in this system','All three parties (insured, insurer, reinsurer) should sign before binding'] },
    { icon:'📄', title:'Document Generation Order', color:'#06b6d4', points:['1 → Cover Note (issue immediately on binding for temp proof of cover)','2 → Debit Note (issue same day to trigger payment warranty clock)','3 → Reinsurance Slip (circulate to RI within 24hrs of binding)','4 → Signing Slip (circulate to all co-insurers within 48hrs)'] },
  ]
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}>
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl" style={{ background: '#0d1117' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60" style={{ background: '#0f172a' }}>
          <div className="flex items-center gap-3"><BookOpen size={18} className="text-helix-400" /><div><div className="text-lg font-bold text-white">Placement Efficiency Guide</div><div className="text-xs text-slate-500">Best practices for fast, accurate motor risk placement</div></div></div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"><X size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {tips.map((tip, i) => (
            <div key={i} className="rounded-xl p-4" style={{ border: `1px solid ${tip.color}22`, background: `${tip.color}08` }}>
              <div className="flex items-center gap-2 mb-3"><span className="text-lg">{tip.icon}</span><div className="font-bold text-sm" style={{ color: tip.color }}>{tip.title}</div></div>
              <ul className="space-y-1.5">{tip.points.map((pt,pi)=><li key={pi} className="flex items-start gap-2 text-xs text-slate-400"><span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: tip.color }} />{pt}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-600">
          <span>Helix Insurance · Motor Underwriting Operations Guide</span>
          <button onClick={onClose} className="px-4 py-1.5 bg-helix-600 hover:bg-helix-500 text-white rounded-lg text-xs transition-colors">Close Guide</button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Placement() {
  const [placements, setPlacements] = useState(initialPlacements)
  const [expanded, setExpanded] = useState(initialPlacements[0]?.id)
  const [showWizard, setShowWizard] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(defaultForm)
  const [bound, setBound] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [docModal, setDocModal] = useState(null)
  const [showGuide, setShowGuide] = useState(false)

  const resetWizard = () => { setStep(1); setForm(defaultForm); setBound(null); setShowSuccess(false) }
  const openWizard  = () => { resetWizard(); setShowWizard(true) }
  const closeWizard = () => { setShowWizard(false); resetWizard() }

  const kycScore = calcKycScore(form.kycChecks)
  const kycSt = kycStatus(kycScore)

  const handleBind = () => {
    const calc = calcPremium(form)
    const newId = genRef()
    const enabledExts = Object.entries(form.extensions).filter(([,v])=>v).map(([k])=>({windscreen:'Windscreen & Glass',radio:'Radio & Entertainment',personalAccident:'Personal Accident',medicalExpenses:'Medical Expenses',carHire:'Car Hire',emergencyRescue:'Emergency Rescue',riotStrike:'Riot & Strike',naturalDisaster:'Earthquake & Flood'}[k]))
    const newPlacement = {
      id: newId, insured: form.insuredName, ref: 'QTE-'+newId.slice(4),
      class: form.vehicleClass, premium: `${form.currency} ${fmtMoney(calc.gross)}`,
      sumInsured: `${form.currency} ${fmtMoney(form.sumInsured)}`,
      currency: form.currency, grossPremiumNum: parseFloat(calc.gross), sumInsuredNum: parseFloat(form.sumInsured),
      inceptionDate: form.inceptionDate, expiryDate: form.expiryDate,
      coverType: form.coverType, vehicleMake: form.vehicleMake, vehicleModel: form.vehicleModel,
      vehicleRegNo: form.vehicleRegNo, vehicleChassisNo: form.vehicleChassisNo,
      vehicleYear: form.vehicleYear, driverName: form.driverName,
      excessOwn: form.excessOwn, thirdPartyLimit: form.thirdPartyLimit,
      brokerName: form.brokerName, brokerRef: form.brokerRef,
      specialConditions: form.specialConditions, extensions: enabledExts,
      ncdPct: form.ncdPct, basicRate: form.basicRate,
      insurer: { name: form.leadInsurer, share: parseFloat(form.leadInsurerShare), status: form.insurerAcceptanceStatus, date: form.insurerAcceptDate||null, ref: form.leadInsurerRef, signatory: form.insurerSignatory },
      coinsurer: form.coinsurers[0] || { name: null, share: 0, status: 'pending', date: null, ref:'', signatory:'' },
      reinsurer: form.reinsuranceRequired
        ? { name: form.reinsurer, share: parseFloat(form.cedingPct), cedingPct: parseFloat(form.cedingPct), status: form.reinsurerAcceptanceStatus, date: form.reinsurerAcceptDate||null, ref: form.reinsurerRef, slipNo: `SLIP-${newId}` }
        : { name: 'N/A', share: 0, cedingPct: 0, status: 'accepted', date: null, ref:'', slipNo:'' },
      insuredAcceptance: { status: form.insuredAcceptanceStatus, date: form.insuredAcceptDate||null, signatory: form.insuredSignatory },
      reinsuranceRequired: form.reinsuranceRequired,
      kyc: { status: kycSt, score: kycScore, completedDate: today() },
      territories: form.territories,
      documents: form.attachedDocs,
      signatures: form.signatures,
    }
    setPlacements(prev => [newPlacement, ...prev])
    setBound(newPlacement)
    setShowSuccess(true)
  }

  const DOC_BUTTONS = [
    { label: 'Cover Note',       emoji: '📋', type: 'Cover Note',       color: '#0d9488' },
    { label: 'Debit Note',       emoji: '💰', type: 'Debit Note',        color: '#2563eb' },
    { label: 'Reinsurance Slip', emoji: '🛡', type: 'Reinsurance Slip',  color: '#7c3aed' },
    { label: 'Signing Slip',     emoji: '✍️', type: 'Signing Slip',      color: '#b45309' },
  ]

  // ─── Wizard view ─────────────────────────────────────────────────────────
  if (showWizard) return (
    <>
      <div className="fixed inset-0 z-50 flex" style={{ background: 'rgba(2,6,23,0.97)' }}>
        {/* Sidebar */}
        <div className="w-64 border-r border-slate-800/60 flex flex-col glass" style={{ minHeight: '100vh' }}>
          <div className="p-5 border-b border-slate-800/50">
            <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">Risk Placement Wizard</div>
            <div className="font-display text-lg text-white">Place New Risk</div>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {STEPS.map(s => {
              const done = step > s.id; const active = step === s.id; const Icon = s.icon
              return (
                <button key={s.id} onClick={() => done && setStep(s.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${active ? 'bg-helix-600/20 border border-helix-600/30' : done ? 'hover:bg-slate-800/40 cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${active ? 'bg-helix-600 text-white' : done ? 'bg-emerald-600/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                    {done ? <Check size={12} /> : s.id}
                  </div>
                  <div>
                    <div className={`text-xs font-semibold ${active ? 'text-helix-300' : done ? 'text-slate-300' : 'text-slate-600'}`}>{s.label}</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">{s.desc}</div>
                  </div>
                  {/* KYC badge on step 1 */}
                  {s.id === 1 && kycScore > 0 && (
                    <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-mono flex-shrink-0 ${KYC_STYLE[kycSt].text}`}
                      style={{ background: `${KYC_STYLE[kycSt].badge}20` }}>
                      {kycScore}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
          <div className="p-4 border-t border-slate-800/50 space-y-2">
            <button onClick={() => setShowGuide(true)} className="w-full flex items-center gap-2 px-3 py-2 text-helix-400 hover:text-helix-300 text-xs rounded-lg hover:bg-helix-600/10 transition-colors border border-helix-600/20">
              <BookOpen size={12} /> Placement Best Practices
            </button>
            <button onClick={closeWizard} className="w-full flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-slate-300 text-xs rounded-lg hover:bg-slate-800/40 transition-colors">
              <X size={13} /> Cancel & Close
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-800/50 flex items-center justify-between flex-shrink-0">
            <div>
              <div className="text-xs text-slate-500 mb-0.5">Step {step} of {STEPS.length} — {STEPS[step-1].label}</div>
              <div className="text-slate-200 font-semibold">{STEPS[step-1].desc}</div>
            </div>
            <div className="flex items-center gap-2">
              {STEPS.map(s => <div key={s.id} className={`h-1.5 w-8 rounded-full transition-all ${s.id < step ? 'bg-emerald-500' : s.id === step ? 'bg-helix-500' : 'bg-slate-800'}`} />)}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6">
            {showSuccess && bound ? (
              <div className="max-w-2xl mx-auto text-center py-12">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={36} className="text-emerald-400" />
                </div>
                <h2 className="font-display text-3xl text-white mb-2">Risk Successfully Bound!</h2>
                <p className="text-slate-500 mb-6">Placement reference <span className="font-mono text-helix-400">{bound.id}</span> has been created.</p>
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-8 text-sm">
                  {[['Insured',bound.insured],['Premium',bound.premium],['KYC',`${KYC_STYLE[bound.kyc?.status]?.label} (${bound.kyc?.score}/100)`],['Territories',`${bound.territories?.length || 0} selected`]].map(([l,v]) => (
                    <div key={l} className="p-3 bg-slate-800/40 rounded-xl"><div className="text-xs text-slate-500 mb-1">{l}</div><div className="text-slate-200 font-medium">{v}</div></div>
                  ))}
                </div>
                <div className="mb-4">
                  <div className="text-xs text-slate-500 mb-3 uppercase tracking-widest">Generate Documents</div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {DOC_BUTTONS.map(({ label, emoji, type, color }) => (
                      <button key={type} onClick={() => setDocModal({ placement: bound, docType: type })}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                        style={{ background: `${color}22`, border: `1px solid ${color}44`, color }}>
                        <span>{emoji}</span>{label}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={closeWizard} className="mt-4 px-6 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-medium transition-colors">
                  Return to Placements
                </button>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                {step === 1 && <StepKYC form={form} set={setForm} />}
                {step === 2 && <StepRiskDetails form={form} set={setForm} />}
                {step === 3 && <StepCoverPremium form={form} set={setForm} />}
                {step === 4 && <StepInsurers form={form} set={setForm} />}
                {step === 5 && <StepReinsurance form={form} set={setForm} />}
                {step === 6 && <StepAcceptance form={form} set={setForm} />}
                {step === 7 && <StepReview form={form} />}
              </div>
            )}
          </div>

          {!showSuccess && (
            <div className="px-8 py-4 border-t border-slate-800/50 flex items-center justify-between flex-shrink-0">
              <button onClick={() => step > 1 ? setStep(s => s - 1) : closeWizard()}
                className="flex items-center gap-2 px-4 py-2 glass-light text-slate-400 hover:text-slate-200 rounded-xl text-sm border border-slate-700 transition-colors">
                <ArrowLeft size={14} /> {step === 1 ? 'Cancel' : 'Back'}
              </button>
              <div className="text-xs text-slate-700 font-mono">Step {step}/{STEPS.length}</div>
              {step === STEPS.length ? (
                <button onClick={handleBind} disabled={kycSt === 'red'}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors ${kycSt === 'red' ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}>
                  <Shield size={14} /> {kycSt === 'red' ? 'KYC Not Compliant' : 'Bind Risk & Issue Policy'}
                </button>
              ) : (
                <button onClick={() => setStep(s => s + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-medium transition-colors">
                  Continue <ArrowRight size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {docModal && <DocumentModal placement={docModal.placement} docType={docModal.docType} onClose={() => setDocModal(null)} />}
      {showGuide && <EfficiencyGuide onClose={() => setShowGuide(false)} />}
    </>
  )

  // ─── List view ────────────────────────────────────────────────────────────
  const KYCBadge = ({ kyc }) => {
    if (!kyc) return null
    const ks = KYC_STYLE[kyc.status]
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border ${ks.bg} ${ks.text} ${ks.border}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${ks.dot}`} />{ks.label} · {kyc.score}/100
      </span>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Risk Placement</h1>
            <p className="text-slate-500 text-sm mt-1">KYC · Three-party acceptance · E-Signatures · Territory · Documents</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowGuide(true)} className="flex items-center gap-2 px-3 py-2 text-helix-400 rounded-xl text-sm border border-helix-600/20 hover:bg-helix-600/10 transition-colors">
              <BookOpen size={14} /> Best Practices
            </button>
            <button onClick={openWizard} className="flex items-center gap-2 px-4 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors glow-blue">
              <Plus size={15} /> Place New Risk
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            [placements.length, 'Total Placements', 'text-helix-400'],
            [placements.filter(p => p.kyc?.status === 'green').length, 'KYC Compliant', 'text-emerald-400'],
            [placements.filter(p => p.kyc?.status === 'amber').length, 'KYC Under Review', 'text-amber-400'],
            [placements.filter(p => p.insuredAcceptance?.status === 'accepted' && p.insurer?.status === 'accepted').length, 'Fully Accepted', 'text-violet-400'],
          ].map(([v, l, c]) => (
            <div key={l} className="glass-light rounded-2xl p-4 flex items-center gap-4">
              <div className={`font-display text-3xl font-bold ${c}`}>{v}</div>
              <div className="text-xs text-slate-500">{l}</div>
            </div>
          ))}
        </div>

        {/* Placements list */}
        <div className="space-y-4">
          {placements.map(p => (
            <div key={p.id} className="glass-light rounded-2xl border border-slate-800/50 overflow-hidden hover:border-helix-600/20 transition-colors">
              <div className="p-5 cursor-pointer flex items-center justify-between hover:bg-slate-800/10 transition-colors" onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-helix-500">{p.id}</span>
                    {p.kyc && <KYCBadge kyc={p.kyc} />}
                    {p.territories?.length > 0 && <span className="text-[10px] text-slate-600 px-2 py-0.5 rounded-full border border-slate-700/40 bg-slate-800/40"><MapPin size={9} className="inline mr-1" />{p.territories.length} territories</span>}
                  </div>
                  <div className="font-semibold text-slate-200">{p.insured}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{p.class} · {p.premium} · SI {p.sumInsured}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    {[{label:'Insured',status:p.insuredAcceptance.status},{label:'Insurer',status:p.insurer.status},{label:'Reinsurer',status:p.reinsurer.status}].map(({label,status}) => (
                      <div key={label} className="text-center"><div className="text-[10px] text-slate-600 mb-1">{label}</div><AcceptBadge status={status} /></div>
                    ))}
                  </div>
                  <ChevronRight size={16} className={`text-slate-600 transition-transform duration-200 ${expanded === p.id ? 'rotate-90' : ''}`} />
                </div>
              </div>

              {expanded === p.id && (
                <div className="border-t border-slate-800/50 p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-800/40 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3"><Users size={14} className="text-slate-400" /><span className="text-sm font-medium text-slate-300">Insured</span></div>
                      <AcceptBadge status={p.insuredAcceptance.status} />
                      <div className="mt-2 text-xs text-slate-500">{p.insuredAcceptance.signatory||'—'}</div>
                    </div>
                    <div className="bg-slate-800/40 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3"><Shield size={14} className="text-helix-400" /><span className="text-sm font-medium text-slate-300">Insurer(s)</span></div>
                      {[p.insurer, p.coinsurer].filter(i => i?.name).map((ins, i) => (
                        <div key={i} className="mb-2 last:mb-0">
                          <div className="flex items-center justify-between"><span className="text-xs text-slate-400">{ins.name}</span><span className="font-mono text-xs text-helix-400">{ins.share}%</span></div>
                          <AcceptBadge status={ins.status} />
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-800/40 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3"><Globe size={14} className="text-violet-400" /><span className="text-sm font-medium text-slate-300">Reinsurer</span></div>
                      {p.reinsurer?.name && p.reinsurer.name !== 'N/A' ? (
                        <><div className="font-medium text-slate-300 text-sm">{p.reinsurer.name}</div><div className="text-xs text-slate-500 mt-1">Ceding {p.reinsurer.cedingPct}%</div><div className="mt-2"><AcceptBadge status={p.reinsurer.status} /></div></>
                      ) : <p className="text-xs text-slate-600 italic">No reinsurance</p>}
                    </div>
                  </div>

                  {/* Territories */}
                  {p.territories?.length > 0 && (
                    <div className="p-3 rounded-xl border border-slate-700/40 bg-slate-800/20">
                      <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Territorial Scope</div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.territories.map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-helix-600/15 text-helix-400 border border-helix-600/20">{t}</span>)}
                      </div>
                    </div>
                  )}

                  {/* Documents attached */}
                  {p.documents?.length > 0 && (
                    <div className="p-3 rounded-xl border border-slate-700/40 bg-slate-800/20">
                      <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Attached Documents ({p.documents.length})</div>
                      <div className="flex flex-wrap gap-2">
                        {p.documents.map((d, i) => (
                          <span key={i} className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg bg-slate-700/40 text-slate-400 border border-slate-700/30">
                            <Paperclip size={9} />{d.name || d.docType}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Document actions */}
                  <div className="pt-2 border-t border-slate-800/40">
                    <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-3">Documents & Actions</div>
                    <div className="flex gap-2 flex-wrap">
                      <button onClick={() => setDocModal({ placement: p, docType: 'Debit Note' })}
                        className="flex items-center gap-1.5 px-4 py-2 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-medium transition-colors">
                        Issue Policy
                      </button>
                      {DOC_BUTTONS.map(({ label, emoji, type, color }) => (
                        <button key={type} onClick={() => setDocModal({ placement: p, docType: type })}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                          style={{ background: `${color}15`, border: `1px solid ${color}33`, color }}>
                          <span>{emoji}</span>{label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {docModal && <DocumentModal placement={docModal.placement} docType={docModal.docType} onClose={() => setDocModal(null)} />}
      {showGuide && <EfficiencyGuide onClose={() => setShowGuide(false)} />}
    </>
  )
}
s