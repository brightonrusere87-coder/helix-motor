import React, { useState, useMemo } from 'react'
import {
  Users, Plus, Search, X, Check, ChevronRight, ChevronDown,
  Phone, Mail, MapPin, Hash, User, Building2, Car, Shield,
  FileText, AlertTriangle, CheckCircle, Clock, Edit3, Save,
  Download, Printer, RefreshCw, Star, TrendingUp, DollarSign,
  Calendar, Eye, Briefcase, Award, Activity, MoreVertical,
  FileStack, AlertCircle, Globe, Zap, ArrowRight, Copy
} from 'lucide-react'

// ─── Client Dataset ───────────────────────────────────────────────────────────
const INITIAL_CLIENTS = [
  {
    id: 'CLT-2026-00001',
    type: 'corporate',
    name: 'Econet Wireless Zimbabwe',
    tradingName: 'Econet Wireless',
    idType: 'Company (CRN)',
    idNumber: '1234/2001',
    phone: '+263 242 700 000',
    altPhone: '+263 77 700 0001',
    email: 'insurance@econet.co.zw',
    website: 'www.econet.co.zw',
    address: '2 Old Mutual Centre, Jason Moyo Ave, Harare',
    postalAddress: 'P.O. Box 66013, Kopje, Harare',
    industry: 'Telecommunications',
    contactPerson: 'Mr. Tafadzwa Masiyiwa',
    contactTitle: 'Chief Financial Officer',
    contactPhone: '+263 77 700 0010',
    contactEmail: 't.masiyiwa@econet.co.zw',
    broker: 'AON Zimbabwe',
    brokerRef: 'AON-2026-4412',
    kycStatus: 'green',
    kycScore: 88,
    kycDate: '2026-02-13',
    status: 'active',
    since: '2019-03-01',
    segment: 'Corporate',
    riskRating: 'low',
    policies: ['HLX-POL-004520'],
    placements: ['PLC-2026-00089'],
    totalPolicies: 3,
    activePolicies: 2,
    totalPremium: 127400,
    claimsCount: 1,
    claimsValue: 8500,
    ncdYears: 4,
    renewalDate: '2026-12-31',
    notes: 'Key corporate account. Fleet of 28 vehicles across Zimbabwe. Prefers annual review meeting in November.',
    tags: ['Fleet', 'Corporate', 'High Value', 'Reinsured'],
  },
  {
    id: 'CLT-2026-00002',
    type: 'corporate',
    name: 'Delta Beverages Ltd',
    tradingName: 'Delta Beverages',
    idType: 'Company (CRN)',
    idNumber: '5678/1997',
    phone: '+263 4 446 000',
    altPhone: '',
    email: 'insurance@delta.co.zw',
    website: 'www.delta.co.zw',
    address: '1 Beverley Crescent, Msasa, Harare',
    postalAddress: 'P.O. Box 2840, Harare',
    industry: 'Food & Beverages',
    contactPerson: 'Ms. Aisha Chikara',
    contactTitle: 'Finance Director',
    contactPhone: '+263 77 456 7890',
    contactEmail: 'a.chikara@delta.co.zw',
    broker: 'Marsh Zimbabwe',
    brokerRef: 'MZW-2026-0088',
    kycStatus: 'amber',
    kycScore: 62,
    kycDate: '2026-02-10',
    status: 'active',
    since: '2021-06-15',
    segment: 'Corporate',
    riskRating: 'medium',
    policies: ['HLX-POL-004518'],
    placements: ['PLC-2026-00088'],
    totalPolicies: 2,
    activePolicies: 2,
    totalPremium: 98400,
    claimsCount: 0,
    claimsValue: 0,
    ncdYears: 2,
    renewalDate: '2027-02-11',
    notes: 'Commercial fleet with goods-in-transit cover. KYC under review — ZIMRA clearance pending.',
    tags: ['Commercial', 'Fleet', 'Reinsured', 'KYC Review'],
  },
  {
    id: 'CLT-2026-00003',
    type: 'individual',
    name: 'Mrs. Rutendo Moyo',
    tradingName: '',
    idType: 'National ID',
    idNumber: '63-149821 B21',
    phone: '+263 77 234 5678',
    altPhone: '',
    email: 'r.moyo@gmail.com',
    website: '',
    address: '14 Fife Ave, Belgravia, Harare',
    postalAddress: '',
    industry: 'Civil Service',
    contactPerson: 'Mrs. Rutendo Moyo',
    contactTitle: '',
    contactPhone: '+263 77 234 5678',
    contactEmail: 'r.moyo@gmail.com',
    broker: 'Direct',
    brokerRef: '',
    kycStatus: 'green',
    kycScore: 92,
    kycDate: '2026-01-10',
    status: 'active',
    since: '2022-08-20',
    segment: 'Retail',
    riskRating: 'low',
    policies: ['HLX-POL-004521'],
    placements: [],
    totalPolicies: 1,
    activePolicies: 1,
    totalPremium: 1240,
    claimsCount: 0,
    claimsValue: 0,
    ncdYears: 5,
    renewalDate: '2027-01-14',
    notes: 'Long-standing retail client. 5-year NCD. No claims history.',
    tags: ['Private', 'NCD 5yr', 'Low Risk'],
  },
  {
    id: 'CLT-2026-00004',
    type: 'individual',
    name: 'Mr. Tatenda Sibanda',
    tradingName: '',
    idType: 'National ID',
    idNumber: '44-201453 A73',
    phone: '+263 71 987 6543',
    altPhone: '',
    email: 't.sibanda@yahoo.com',
    website: '',
    address: '8 Chiremba Rd, Waterfalls, Harare',
    postalAddress: '',
    industry: 'Self-employed',
    contactPerson: 'Mr. Tatenda Sibanda',
    contactTitle: '',
    contactPhone: '+263 71 987 6543',
    contactEmail: 't.sibanda@yahoo.com',
    broker: 'Direct',
    brokerRef: '',
    kycStatus: 'green',
    kycScore: 75,
    kycDate: '2026-01-28',
    status: 'active',
    since: '2026-01-28',
    segment: 'Retail',
    riskRating: 'medium',
    policies: ['HLX-POL-004519'],
    placements: [],
    totalPolicies: 1,
    activePolicies: 1,
    totalPremium: 680,
    claimsCount: 0,
    claimsValue: 0,
    ncdYears: 0,
    renewalDate: '2027-01-31',
    notes: 'Young driver (30). First insurance — TPFT cover. Young driver loading applied.',
    tags: ['Private', 'Young Driver', 'First Policy'],
  },
  {
    id: 'CLT-2026-00005',
    type: 'corporate',
    name: 'Harare City Council',
    tradingName: 'HCC',
    idType: 'Company (CRN)',
    idNumber: '0001/1890',
    phone: '+263 242 703 500',
    altPhone: '+263 242 703 600',
    email: 'fleet@hararecity.gov.zw',
    website: 'www.hararecity.gov.zw',
    address: 'Town House, Julius Nyerere Way, Harare',
    postalAddress: 'P.O. Box 624, Harare',
    industry: 'Local Government',
    contactPerson: 'Mr. Farai Mutindi',
    contactTitle: 'Fleet Manager',
    contactPhone: '+263 77 100 2345',
    contactEmail: 'f.mutindi@hararecity.gov.zw',
    broker: 'Skybridge-Re',
    brokerRef: 'SKY-2025-PSV-0044',
    kycStatus: 'green',
    kycScore: 85,
    kycDate: '2025-11-15',
    status: 'active',
    since: '2020-01-01',
    segment: 'Public Sector',
    riskRating: 'medium',
    policies: ['HLX-POL-004518'],
    placements: [],
    totalPolicies: 1,
    activePolicies: 1,
    totalPremium: 8400,
    claimsCount: 2,
    claimsValue: 34000,
    ncdYears: 1,
    renewalDate: '2026-11-30',
    notes: 'PSV fleet of 14 buses. 2 prior claims. Renewal due Nov 2026 — begin renewal process in September.',
    tags: ['PSV', 'Public Sector', 'Fleet', 'Claims History'],
  },
  {
    id: 'CLT-2026-00006',
    type: 'corporate',
    name: 'Innscor Africa Ltd',
    tradingName: 'Innscor',
    idType: 'Company (CRN)',
    idNumber: '9012/1987',
    phone: '+263 242 336 400',
    altPhone: '',
    email: 'risk@innscor.co.zw',
    website: 'www.innscor.com',
    address: 'Innscor House, 7 Kenilworth Rd, Highlands, Harare',
    postalAddress: 'P.O. Box 3762, Harare',
    industry: 'Food & Retail',
    contactPerson: 'Ms. Tendai Ncube',
    contactTitle: 'Risk & Compliance Officer',
    contactPhone: '+263 77 200 3344',
    contactEmail: 't.ncube@innscor.co.zw',
    broker: 'Riskwise Brokers',
    brokerRef: 'RWB-2026-0076',
    kycStatus: 'green',
    kycScore: 90,
    kycDate: '2026-01-20',
    status: 'active',
    since: '2018-07-01',
    segment: 'Corporate',
    riskRating: 'low',
    policies: [],
    placements: ['PLC-2026-00076'],
    totalPolicies: 4,
    activePolicies: 3,
    totalPremium: 31200,
    claimsCount: 0,
    claimsValue: 0,
    ncdYears: 6,
    renewalDate: '2027-01-19',
    notes: 'Long-standing corporate client since 2018. NCD 6 years. Impeccable claims record.',
    tags: ['Fleet', 'Corporate', 'NCD 6yr', 'Premium Client'],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt  = (v, d=0) => (parseFloat(v)||0).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })
const fmtD = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) : '—'
const initials = (name) => name.split(' ').filter(Boolean).slice(0,2).map(w => w[0]).join('').toUpperCase()

const SEGMENT_CFG = {
  'Corporate':      { color: '#3d5eff', bg: 'rgba(61,94,255,0.12)',  border: 'rgba(61,94,255,0.25)'  },
  'Retail':         { color: '#0d9488', bg: 'rgba(13,148,136,0.12)', border: 'rgba(13,148,136,0.25)' },
  'Public Sector':  { color: '#7c3aed', bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.25)' },
  'SME':            { color: '#b45309', bg: 'rgba(180,83,9,0.12)',    border: 'rgba(180,83,9,0.25)'   },
}

const RISK_CFG = {
  low:    { label: 'Low Risk',    color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  medium: { label: 'Medium Risk', color: 'text-amber-400',   bg: 'bg-amber-400/10'   },
  high:   { label: 'High Risk',   color: 'text-rose-400',    bg: 'bg-rose-400/10'    },
}

const KYC_CFG = {
  green: { label: 'Compliant',     color: 'text-emerald-400', bg: 'bg-emerald-500/10', dot: 'bg-emerald-400', border: 'border-emerald-500/20' },
  amber: { label: 'Under Review',  color: 'text-amber-400',   bg: 'bg-amber-500/10',   dot: 'bg-amber-400',   border: 'border-amber-500/20'   },
  red:   { label: 'Non-Compliant', color: 'text-rose-400',    bg: 'bg-rose-500/10',     dot: 'bg-rose-400',    border: 'border-rose-500/20'    },
}

// ─── UI Atoms ─────────────────────────────────────────────────────────────────
const Inp = ({ className='', ...p }) => (
  <input className={`w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-helix-500/60 transition-colors ${className}`} {...p} />
)
const Sel = ({ className='', children, ...p }) => (
  <select className={`w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 outline-none focus:border-helix-500/60 transition-colors appearance-none ${className}`} {...p}>{children}</select>
)
const Txt = ({ className='', ...p }) => (
  <textarea className={`w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-helix-500/60 transition-colors resize-none ${className}`} {...p} />
)
function Fld({ label, required, col='', children, hint }) {
  return (
    <div className={col}>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}{required && <span className="text-rose-500 ml-0.5">*</span>}</label>
      {children}
      {hint && <p className="text-xs text-slate-600 mt-1">{hint}</p>}
    </div>
  )
}

// ─── New Client Form ──────────────────────────────────────────────────────────
const blankForm = {
  type:'individual', name:'', tradingName:'', idType:'National ID', idNumber:'',
  phone:'', altPhone:'', email:'', website:'', address:'', postalAddress:'',
  industry:'', contactPerson:'', contactTitle:'', contactPhone:'', contactEmail:'',
  broker:'Direct', brokerRef:'', segment:'Retail', riskRating:'low', notes:'',
}

function ClientForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || blankForm)
  const [tab, setTab] = useState('basic')
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    if (!form.name.trim()) return
    onSave(form)
    onClose()
  }

  const TABS = [['basic','Basic Info'], ['contact','Contact'], ['risk','Risk & Broker'], ['notes','Notes']]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl" style={{ background: '#070d1a' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50" style={{ background: 'rgba(61,94,255,0.06)' }}>
          <div>
            <div className="text-xs text-helix-400 font-semibold uppercase tracking-widest mb-0.5">{initial ? 'Edit Client' : 'New Client'}</div>
            <h2 className="text-lg font-bold text-white">{initial ? initial.name : 'Add to Client Register'}</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"><X size={15}/></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800/50 flex-shrink-0">
          {TABS.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex-1 py-2.5 text-xs font-semibold transition-colors border-b-2 ${tab === id ? 'border-helix-500 text-helix-300' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">

          {tab === 'basic' && (
            <div className="space-y-4">
              <div className="flex gap-2 mb-2">
                {[['individual','Individual / Personal'],['corporate','Corporate / Company']].map(([v,l]) => (
                  <button key={v} type="button" onClick={() => set('type', v)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${form.type === v ? 'bg-helix-600/20 border-helix-600/35 text-helix-300' : 'border-slate-700/40 text-slate-500 hover:border-slate-600'}`}>
                    {v === 'individual' ? '👤 ' : '🏢 '}{l}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Fld label={form.type === 'corporate' ? 'Company Name' : 'Full Name'} required col="col-span-2">
                  <Inp value={form.name} onChange={e => set('name', e.target.value)} placeholder={form.type === 'corporate' ? 'e.g. Econet Wireless Zimbabwe' : 'e.g. Mrs. Rutendo Moyo'} />
                </Fld>
                {form.type === 'corporate' && (
                  <Fld label="Trading Name / Short Name">
                    <Inp value={form.tradingName} onChange={e => set('tradingName', e.target.value)} placeholder="e.g. Econet" />
                  </Fld>
                )}
                <Fld label="ID Type">
                  <Sel value={form.idType} onChange={e => set('idType', e.target.value)}>
                    {['National ID','Company (CRN)','Passport','Other'].map(o => <option key={o}>{o}</option>)}
                  </Sel>
                </Fld>
                <Fld label="ID / Registration Number" required>
                  <Inp value={form.idNumber} onChange={e => set('idNumber', e.target.value)} placeholder="e.g. 63-149821 B21" />
                </Fld>
                <Fld label="Industry / Occupation">
                  <Inp value={form.industry} onChange={e => set('industry', e.target.value)} placeholder="e.g. Telecommunications" />
                </Fld>
                <Fld label="Physical Address" col="col-span-2">
                  <Inp value={form.address} onChange={e => set('address', e.target.value)} placeholder="Street address, suburb, city" />
                </Fld>
                <Fld label="Postal Address">
                  <Inp value={form.postalAddress} onChange={e => set('postalAddress', e.target.value)} placeholder="P.O. Box / postal code" />
                </Fld>
                <Fld label="Client Segment">
                  <Sel value={form.segment} onChange={e => set('segment', e.target.value)}>
                    {['Retail','Corporate','Public Sector','SME'].map(s => <option key={s}>{s}</option>)}
                  </Sel>
                </Fld>
              </div>
            </div>
          )}

          {tab === 'contact' && (
            <div className="grid grid-cols-2 gap-4">
              <Fld label="Primary Phone" required><Inp value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+263 77 234 5678" /></Fld>
              <Fld label="Alternate Phone"><Inp value={form.altPhone} onChange={e => set('altPhone', e.target.value)} placeholder="+263 242 700 000" /></Fld>
              <Fld label="Email Address" required><Inp type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="client@company.co.zw" /></Fld>
              <Fld label="Website"><Inp value={form.website} onChange={e => set('website', e.target.value)} placeholder="www.company.co.zw" /></Fld>
              {form.type === 'corporate' && (
                <>
                  <Fld label="Contact Person" col="col-span-2"><Inp value={form.contactPerson} onChange={e => set('contactPerson', e.target.value)} placeholder="Name of main point of contact" /></Fld>
                  <Fld label="Contact Title / Role"><Inp value={form.contactTitle} onChange={e => set('contactTitle', e.target.value)} placeholder="e.g. Finance Director" /></Fld>
                  <Fld label="Contact Direct Phone"><Inp value={form.contactPhone} onChange={e => set('contactPhone', e.target.value)} placeholder="+263 77..." /></Fld>
                  <Fld label="Contact Email" col="col-span-2"><Inp value={form.contactEmail} onChange={e => set('contactEmail', e.target.value)} placeholder="contact@company.co.zw" /></Fld>
                </>
              )}
            </div>
          )}

          {tab === 'risk' && (
            <div className="grid grid-cols-2 gap-4">
              <Fld label="Broker / Agent">
                <Sel value={form.broker} onChange={e => set('broker', e.target.value)}>
                  {['Direct','Riskwise Brokers','AON Zimbabwe','Marsh Zimbabwe','Willis Towers Watson','Alexander Forbes','Skybridge-Re'].map(b => <option key={b}>{b}</option>)}
                </Sel>
              </Fld>
              <Fld label="Broker Reference"><Inp value={form.brokerRef} onChange={e => set('brokerRef', e.target.value)} placeholder="e.g. AON-2026-4412" /></Fld>
              <Fld label="Risk Rating">
                <Sel value={form.riskRating} onChange={e => set('riskRating', e.target.value)}>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </Sel>
              </Fld>
              <Fld label="Client Segment">
                <Sel value={form.segment} onChange={e => set('segment', e.target.value)}>
                  {['Retail','Corporate','Public Sector','SME'].map(s => <option key={s}>{s}</option>)}
                </Sel>
              </Fld>
            </div>
          )}

          {tab === 'notes' && (
            <Fld label="Internal Notes / Underwriter Comments" hint="Not visible to client">
              <Txt value={form.notes} onChange={e => set('notes', e.target.value)} rows={6} placeholder="e.g. Key account. Prefers annual review. Claims history clear for 5 years." />
            </Fld>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-800/50 flex items-center justify-between flex-shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white text-sm border border-slate-700 rounded-xl transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={!form.name.trim()}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${form.name.trim() ? 'bg-helix-600 hover:bg-helix-500 text-white' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}>
            <Save size={13}/>{initial ? 'Update Client' : 'Add Client'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Client Detail Drawer ─────────────────────────────────────────────────────
function ClientDetail({ client, onClose, onEdit }) {
  const [tab, setTab] = useState('overview')
  const seg = SEGMENT_CFG[client.segment] || SEGMENT_CFG['Retail']
  const kyc = KYC_CFG[client.kycStatus]
  const risk = RISK_CFG[client.riskRating]
  const lossRatio = client.totalPremium > 0 ? ((client.claimsValue / client.totalPremium) * 100).toFixed(1) : '0.0'

  const TABS = [['overview','Overview'],['policies','Policies'],['financials','Financials'],['timeline','Timeline']]

  // Upcoming renewal alert
  const daysToRenewal = client.renewalDate
    ? Math.ceil((new Date(client.renewalDate) - new Date()) / (1000 * 60 * 60 * 24)) : null

  return (
    <div className="fixed inset-0 z-[100] flex" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}>
      <div className="ml-auto w-full max-w-2xl h-full flex flex-col border-l border-slate-700/60 shadow-2xl" style={{ background: '#070d1a' }}>

        {/* Header */}
        <div className="p-6 border-b border-slate-800/50 flex-shrink-0">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${seg.color}66, ${seg.color}33)`, border: `1px solid ${seg.color}44` }}>
                {initials(client.name)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-mono text-xs text-helix-500">{client.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: seg.bg, color: seg.color, border: `1px solid ${seg.border}` }}>{client.segment}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${risk.bg} ${risk.color}`}>{risk.label}</span>
                </div>
                <h2 className="font-bold text-xl text-white">{client.name}</h2>
                {client.tradingName && <p className="text-sm text-slate-500">t/a {client.tradingName}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => onEdit(client)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                <Edit3 size={12}/>Edit
              </button>
              <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"><X size={15}/></button>
            </div>
          </div>

          {/* Quick contact row */}
          <div className="flex items-center gap-4 flex-wrap">
            {client.phone && (
              <a href={`tel:${client.phone}`} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-helix-400 transition-colors">
                <Phone size={12}/>{client.phone}
              </a>
            )}
            {client.email && (
              <a href={`mailto:${client.email}`} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-helix-400 transition-colors">
                <Mail size={12}/>{client.email}
              </a>
            )}
            {client.address && (
              <span className="flex items-center gap-1.5 text-xs text-slate-600">
                <MapPin size={12}/>{client.address.split(',').slice(-2).join(',').trim()}
              </span>
            )}
          </div>

          {/* Renewal alert */}
          {daysToRenewal !== null && daysToRenewal <= 90 && (
            <div className={`mt-3 flex items-center gap-2 p-2.5 rounded-xl text-xs ${daysToRenewal <= 30 ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400' : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'}`}>
              <Clock size={12}/>
              {daysToRenewal <= 0 ? 'Policy OVERDUE for renewal!' : `Renewal due in ${daysToRenewal} days — ${fmtD(client.renewalDate)}`}
            </div>
          )}

          {/* KYC strip */}
          <div className={`mt-3 flex items-center justify-between p-2.5 rounded-xl ${kyc.bg} border ${kyc.border}`}>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${kyc.dot}`}/>
              <span className={`text-xs font-semibold ${kyc.color}`}>KYC: {kyc.label}</span>
              <span className={`text-xs ${kyc.color} opacity-70`}>· {client.kycScore}/100</span>
            </div>
            <span className="text-[10px] text-slate-600">Last verified: {fmtD(client.kycDate)}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800/50 flex-shrink-0">
          {TABS.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex-1 py-2.5 text-xs font-semibold transition-colors border-b-2 ${tab === id ? 'border-helix-500 text-helix-300' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {tab === 'overview' && (
            <>
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { l:'Total Policies',    v: client.totalPolicies,                         c:'text-helix-400'   },
                  { l:'Active Policies',   v: client.activePolicies,                        c:'text-emerald-400' },
                  { l:'Total Premium',     v:`$${fmt(client.totalPremium)}`,                 c:'text-violet-400'  },
                  { l:'Claims Count',      v: client.claimsCount,                           c:client.claimsCount > 2 ? 'text-rose-400' : 'text-amber-400' },
                  { l:'Claims Value',      v:`$${fmt(client.claimsValue)}`,                  c:'text-rose-400'    },
                  { l:'Loss Ratio',        v:`${lossRatio}%`,                               c: parseFloat(lossRatio) > 60 ? 'text-rose-400' : parseFloat(lossRatio) > 30 ? 'text-amber-400' : 'text-emerald-400' },
                ].map(({ l, v, c }) => (
                  <div key={l} className="p-3 rounded-xl border border-slate-700/30 bg-slate-800/20">
                    <div className="text-[10px] text-slate-600 mb-1">{l}</div>
                    <div className={`text-lg font-bold font-mono ${c}`}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div>
                <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Client Details</div>
                <div className="space-y-1.5">
                  {[
                    ['Client Since',    fmtD(client.since)],
                    ['ID Type',         client.idType],
                    ['ID Number',       client.idNumber],
                    ['Industry',        client.industry || '—'],
                    ['Broker',          client.broker],
                    ['Broker Ref',      client.brokerRef || '—'],
                    ['NCD Years',       client.ncdYears + ' years'],
                    ['Next Renewal',    fmtD(client.renewalDate)],
                  ].map(([l, v]) => (
                    <div key={l} className="flex justify-between text-xs border-b border-slate-800/30 pb-1.5">
                      <span className="text-slate-500">{l}</span>
                      <span className="text-slate-300 font-mono text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact person (corporate) */}
              {client.type === 'corporate' && client.contactPerson && (
                <div>
                  <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Key Contact</div>
                  <div className="p-3 rounded-xl border border-slate-700/30 bg-slate-800/20">
                    <div className="font-semibold text-slate-200 text-sm">{client.contactPerson}</div>
                    {client.contactTitle && <div className="text-xs text-slate-500 mt-0.5">{client.contactTitle}</div>}
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      {client.contactPhone && <a href={`tel:${client.contactPhone}`} className="flex items-center gap-1 text-xs text-helix-400 hover:text-helix-300"><Phone size={11}/>{client.contactPhone}</a>}
                      {client.contactEmail && <a href={`mailto:${client.contactEmail}`} className="flex items-center gap-1 text-xs text-helix-400 hover:text-helix-300"><Mail size={11}/>{client.contactEmail}</a>}
                    </div>
                  </div>
                </div>
              )}

              {/* Tags */}
              {client.tags?.length > 0 && (
                <div>
                  <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Tags</div>
                  <div className="flex flex-wrap gap-1.5">
                    {client.tags.map(t => (
                      <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-slate-700/60 text-slate-400 border border-slate-700/40">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {client.notes && (
                <div>
                  <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Internal Notes</div>
                  <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 text-xs text-slate-400 leading-relaxed">{client.notes}</div>
                </div>
              )}
            </>
          )}

          {tab === 'policies' && (
            <div>
              <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-3">{client.totalPolicies} Policies on Record</div>
              {client.policies?.length === 0 && client.placements?.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-700/40 rounded-xl">
                  <FileStack size={28} className="text-slate-700 mx-auto mb-2"/>
                  <p className="text-sm text-slate-600">No policies on record yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {client.policies?.map(pId => (
                    <div key={pId} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-700/30 bg-slate-800/20">
                      <div className="flex items-center gap-3">
                        <Shield size={14} className="text-helix-400"/>
                        <div>
                          <div className="font-mono text-xs text-helix-400">{pId}</div>
                          <div className="text-xs text-slate-500 mt-0.5">Motor Insurance Policy</div>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">Active</span>
                    </div>
                  ))}
                  {client.placements?.map(pId => (
                    <div key={pId} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-700/30 bg-slate-800/20">
                      <div className="flex items-center gap-3">
                        <Layers size={14} className="text-violet-400"/>
                        <div>
                          <div className="font-mono text-xs text-violet-400">{pId}</div>
                          <div className="text-xs text-slate-500 mt-0.5">Risk Placement</div>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-400/10 text-violet-400 border border-violet-400/20">Placed</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'financials' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l:'Total GWP',       v:`USD ${fmt(client.totalPremium)}`,     c:'text-helix-400'   },
                  { l:'Total Claims',    v:`USD ${fmt(client.claimsValue)}`,       c:'text-rose-400'    },
                  { l:'Loss Ratio',      v:`${lossRatio}%`,                       c: parseFloat(lossRatio) > 60 ? 'text-rose-400' : 'text-emerald-400' },
                  { l:'NCD Earned',      v:`${client.ncdYears} years`,             c:'text-emerald-400' },
                ].map(({ l, v, c }) => (
                  <div key={l} className="p-4 rounded-xl border border-slate-700/30 bg-slate-800/20">
                    <div className="text-[10px] text-slate-600 mb-1">{l}</div>
                    <div className={`text-2xl font-bold font-mono ${c}`}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Loss ratio bar */}
              <div className="p-4 rounded-xl border border-slate-700/30 bg-slate-800/20">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500">Loss Ratio</span>
                  <span className={`font-mono font-bold ${parseFloat(lossRatio) > 60 ? 'text-rose-400' : parseFloat(lossRatio) > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>{lossRatio}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${parseFloat(lossRatio) > 60 ? 'bg-rose-500' : parseFloat(lossRatio) > 30 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(parseFloat(lossRatio), 100)}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-700 mt-1">
                  <span>0%</span><span>30% — Target</span><span>60% — Alert</span><span>100%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-700/30 bg-slate-800/15 text-xs text-slate-500">
                <strong className="text-slate-400">Premium history:</strong> Client joined {fmtD(client.since)} · {client.totalPolicies} total policies · {client.claimsCount} claim{client.claimsCount !== 1 ? 's' : ''} filed
              </div>
            </div>
          )}

          {tab === 'timeline' && (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-800/60" />
              <div className="space-y-4">
                {[
                  { date: client.renewalDate, label: 'Next Renewal Due', color: '#f59e0b', icon: Clock, note: 'Renewal preparation should begin 60 days prior' },
                  { date: client.kycDate,     label: 'Last KYC Review',  color: '#10b981', icon: Shield, note: `Status: ${KYC_CFG[client.kycStatus]?.label} · Score: ${client.kycScore}/100` },
                  { date: client.since,       label: 'Client Since',     color: '#3d5eff', icon: Star, note: 'Client relationship established' },
                ].sort((a, b) => new Date(b.date) - new Date(a.date)).map(({ date, label, color, icon: Icon, note }, i) => (
                  <div key={i} className="flex gap-4 pl-4 relative">
                    <div className="absolute left-0 top-2 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                      style={{ background: `${color}20`, border: `2px solid ${color}40` }}>
                      <Icon size={13} style={{ color }} />
                    </div>
                    <div className="ml-6 p-3 flex-1 rounded-xl border border-slate-700/30 bg-slate-800/20">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-sm font-semibold text-slate-200">{label}</span>
                        <span className="text-[11px] text-slate-600 font-mono">{fmtD(date)}</span>
                      </div>
                      <p className="text-xs text-slate-500">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Client Card ──────────────────────────────────────────────────────────────
function ClientCard({ client, onView, onEdit }) {
  const seg  = SEGMENT_CFG[client.segment] || SEGMENT_CFG['Retail']
  const kyc  = KYC_CFG[client.kycStatus]
  const risk = RISK_CFG[client.riskRating]
  const daysToRenewal = client.renewalDate
    ? Math.ceil((new Date(client.renewalDate) - new Date()) / (1000 * 60 * 60 * 24)) : null
  const renewalAlert = daysToRenewal !== null && daysToRenewal <= 60

  return (
    <div className="glass-light rounded-2xl border border-slate-800/50 p-5 hover:border-helix-600/20 transition-all group cursor-pointer" onClick={() => onView(client)}>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${seg.color}55, ${seg.color}22)`, border: `1px solid ${seg.color}33` }}>
          {initials(client.name)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="font-mono text-[10px] text-helix-600">{client.id}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: seg.bg, color: seg.color, border: `1px solid ${seg.border}` }}>{client.segment}</span>
              </div>
              <div className="font-bold text-slate-200 truncate">{client.name}</div>
              {client.industry && <div className="text-xs text-slate-500 mt-0.5">{client.industry}</div>}
            </div>
            <button onClick={e => { e.stopPropagation(); onEdit(client) }}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg text-slate-600 hover:text-slate-300 hover:bg-slate-700/40 flex-shrink-0 ml-2">
              <Edit3 size={13}/>
            </button>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {client.phone && <span className="flex items-center gap-1 text-[11px] text-slate-600"><Phone size={10}/>{client.phone}</span>}
            {client.email && <span className="flex items-center gap-1 text-[11px] text-slate-600 truncate max-w-[180px]"><Mail size={10}/>{client.email}</span>}
          </div>

          {/* Stats + badges */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${kyc.bg} ${kyc.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${kyc.dot}`}/>KYC {kyc.label}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${risk.bg} ${risk.color}`}>{risk.label}</span>
            <span className="text-[10px] text-slate-600">{client.activePolicies} active polic{client.activePolicies !== 1 ? 'ies' : 'y'}</span>
            <span className="text-[10px] text-helix-500 font-mono">USD {fmt(client.totalPremium)}</span>
            {renewalAlert && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${daysToRenewal <= 30 ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'}`}>
                <Clock size={9}/>{daysToRenewal}d to renewal
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Clients() {
  const [clients, setClients]     = useState(INITIAL_CLIENTS)
  const [search, setSearch]       = useState('')
  const [filterSeg, setFilterSeg] = useState('all')
  const [filterKyc, setFilterKyc] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy]       = useState('name')
  const [viewClient, setViewClient] = useState(null)
  const [editClient, setEditClient] = useState(null)
  const [showForm, setShowForm]   = useState(false)

  const filtered = useMemo(() => {
    let list = [...clients]
    if (search) list = list.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.idNumber?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search)
    )
    if (filterSeg !== 'all') list = list.filter(c => c.segment === filterSeg)
    if (filterKyc !== 'all') list = list.filter(c => c.kycStatus === filterKyc)
    if (filterType !== 'all') list = list.filter(c => c.type === filterType)
    if (sortBy === 'name')    list.sort((a,b) => a.name.localeCompare(b.name))
    if (sortBy === 'premium') list.sort((a,b) => b.totalPremium - a.totalPremium)
    if (sortBy === 'recent')  list.sort((a,b) => new Date(b.since) - new Date(a.since))
    if (sortBy === 'renewal') list.sort((a,b) => new Date(a.renewalDate||'9999') - new Date(b.renewalDate||'9999'))
    return list
  }, [clients, search, filterSeg, filterKyc, filterType, sortBy])

  const stats = useMemo(() => ({
    total:       clients.length,
    corporate:   clients.filter(c => c.type === 'corporate').length,
    individual:  clients.filter(c => c.type === 'individual').length,
    kycGreen:    clients.filter(c => c.kycStatus === 'green').length,
    kycAmber:    clients.filter(c => c.kycStatus === 'amber').length,
    totalPremium: clients.reduce((a,c) => a + c.totalPremium, 0),
    upForRenewal: clients.filter(c => {
      const d = c.renewalDate ? Math.ceil((new Date(c.renewalDate)-new Date())/(1000*60*60*24)) : null
      return d !== null && d <= 60 && d >= 0
    }).length,
  }), [clients])

  const handleSaveClient = (formData) => {
    if (editClient) {
      setClients(prev => prev.map(c => c.id === editClient.id ? { ...c, ...formData } : c))
    } else {
      const newClient = {
        ...formData,
        id: 'CLT-2026-' + String(clients.length + 1).padStart(5, '0'),
        kycStatus: 'amber', kycScore: 0, kycDate: new Date().toISOString().split('T')[0],
        status: 'active',
        since: new Date().toISOString().split('T')[0],
        policies: [], placements: [],
        totalPolicies: 0, activePolicies: 0,
        totalPremium: 0, claimsCount: 0, claimsValue: 0,
        ncdYears: 0, renewalDate: null,
        tags: [formData.segment, formData.type === 'corporate' ? 'Corporate' : 'Individual'],
      }
      setClients(prev => [newClient, ...prev])
    }
    setEditClient(null)
  }

  const openEdit = (client) => {
    setViewClient(null)
    setEditClient(client)
    setShowForm(true)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Client Management</h1>
            <p className="text-slate-500 text-sm mt-1">Corporate & individual client register · KYC · policies · renewals</p>
          </div>
          <button onClick={() => { setEditClient(null); setShowForm(true) }}
            className="flex items-center gap-2 px-4 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors glow-blue">
            <Plus size={15}/> Add Client
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { l:'Total Clients',    v: stats.total,         c:'text-helix-400',   I:Users       },
            { l:'Corporate',        v: stats.corporate,     c:'text-blue-400',    I:Building2   },
            { l:'Individual',       v: stats.individual,    c:'text-teal-400',    I:User        },
            { l:'KYC Compliant',    v: stats.kycGreen,      c:'text-emerald-400', I:CheckCircle },
            { l:'Renewals ≤60 days',v: stats.upForRenewal,  c:'text-amber-400',   I:Clock       },
          ].map(({ l, v, c, I }) => (
            <div key={l} className="glass-light rounded-2xl p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-slate-800/60 ${c}`}><I size={16}/></div>
              <div>
                <div className={`font-mono text-xl font-bold ${c}`}>{v}</div>
                <div className="text-[10px] text-slate-500 leading-tight">{l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* GWP strip */}
        <div className="flex items-center gap-3 p-4 rounded-2xl border border-helix-800/30 bg-helix-900/10">
          <DollarSign size={16} className="text-helix-400 flex-shrink-0"/>
          <span className="text-sm text-slate-400">Total client premium under management:</span>
          <span className="font-mono font-bold text-helix-300 text-lg">USD {fmt(stats.totalPremium)}</span>
          <span className="ml-auto text-xs text-slate-600">{clients.filter(c => c.kycStatus === 'amber').length} clients pending KYC completion</span>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"/>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, ID, phone..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-sm text-slate-300 placeholder-slate-600 outline-none focus:border-helix-500/60"/>
          </div>
          <div className="flex items-center gap-1.5">
            {[['all','All'],['corporate','Corporate'],['individual','Individual']].map(([v,l]) => (
              <button key={v} onClick={() => setFilterType(v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filterType === v ? 'bg-helix-600 text-white' : 'text-slate-500 border border-slate-700/50 hover:text-slate-300'}`}>{l}</button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            {[['all','All KYC'],['green','✓ Green'],['amber','⚠ Amber']].map(([v,l]) => (
              <button key={v} onClick={() => setFilterKyc(v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filterKyc === v ? 'bg-helix-600 text-white' : 'text-slate-500 border border-slate-700/50 hover:text-slate-300'}`}>{l}</button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-xs text-slate-600">Sort:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="bg-slate-900/60 border border-slate-700/50 rounded-lg px-2 py-1.5 text-xs text-slate-400 outline-none">
              <option value="name">Name A–Z</option>
              <option value="premium">Premium ↓</option>
              <option value="recent">Newest</option>
              <option value="renewal">Renewal date</option>
            </select>
          </div>
          <span className="text-xs text-slate-600">{filtered.length} client{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Client Grid */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-700/40 rounded-2xl">
            <Users size={32} className="text-slate-700 mx-auto mb-3"/>
            <p className="text-slate-500">No clients match your search or filters.</p>
            <button onClick={() => { setSearch(''); setFilterSeg('all'); setFilterKyc('all'); setFilterType('all') }}
              className="mt-3 text-xs text-helix-400 hover:text-helix-300 flex items-center gap-1 mx-auto">
              <RefreshCw size={11}/> Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map(c => (
              <ClientCard key={c.id} client={c}
                onView={setViewClient}
                onEdit={openEdit} />
            ))}
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {viewClient && (
        <ClientDetail
          client={viewClient}
          onClose={() => setViewClient(null)}
          onEdit={openEdit} />
      )}

      {/* Add / Edit form */}
      {showForm && (
        <ClientForm
          initial={editClient}
          onSave={handleSaveClient}
          onClose={() => { setShowForm(false); setEditClient(null) }} />
      )}
    </>
  )
}
