import React, { useState } from 'react'
import {
  X, Plus, Search, Download, Printer, Send, Eye,
  AlertTriangle, CheckCircle, Clock, XCircle, ChevronRight,
  FileText, Car, Shield, DollarSign, ArrowLeft, ArrowRight,
  User, Phone, MapPin, Calendar, Hash, Edit3, Copy,
  Layers, Building2, BarChart2, Filter, RefreshCw, Paperclip,
  AlertCircle, ThumbsDown, Wrench, Camera, Scale
} from 'lucide-react'

// ─── CLAIMS DATA ──────────────────────────────────────────────────────────────
const INITIAL_CLAIMS = [
  {
    id: 'CLM-2026-00289',
    policy: 'HLX-POL-004521',
    insured: 'Mrs. Rutendo Moyo',
    idNumber: '63-123456-R-20',
    phone: '+263 77 123 4567',
    email: 'r.moyo@email.com',
    address: '14 Borrowdale Road, Harare',
    type: 'Own Damage',
    subType: 'Collision',
    vehicle: 'Toyota Corolla',
    regNumber: 'GRD 4821',
    year: 2020,
    colour: 'Silver',
    vin: 'JTDBT923X61234567',
    engineNo: '1NZ-FE-12345',
    coverType: 'Comprehensive',
    sumInsured: 18000,
    dateOfLoss: '2026-02-18',
    dateReported: '2026-02-18',
    dateAssigned: '2026-02-19',
    location: 'Sam Nujoma St & Rotten Row, Harare',
    description: 'Insured vehicle collided with a stationary vehicle at the intersection. Front bumper, bonnet and radiator damaged. Airbags deployed.',
    policeReport: 'REP-026-2026',
    witnesses: 'Mr. J. Chikwanda (0772 345 678)',
    thirdPartyName: 'Mr. K. Dube',
    thirdPartyVehicle: 'Honda Fit GRA 5544',
    thirdPartyInsurer: 'FBC Insurance',
    reserveAmount: 4200,
    settledAmount: null,
    excessApplicable: 500,
    salvageValue: 0,
    status: 'processing',
    adjuster: 'T. Banda',
    adjusterPhone: '+263 77 987 6543',
    repairShop: 'Premier Panel Beaters',
    repairShopAddress: '22 Coventry Road, Workington, Harare',
    assessor: null,
    riRecovery: false,
    riTreaty: null,
    riRecoveryAmt: 0,
    notes: 'Vehicle towed to Premier Panel Beaters. Awaiting detailed assessment report.',
    documents: ['Police Abstract', 'Photos x6', 'Estimate - Premier Panel Beaters'],
    payments: [],
    statusHistory: [
      { status: 'registered', date: '2026-02-18', user: 'System', note: 'Claim registered via portal' },
      { status: 'processing', date: '2026-02-19', user: 'T. Banda', note: 'Assigned to adjuster, vehicle inspected' },
    ],
  },
  {
    id: 'CLM-2026-00288',
    policy: 'HLX-POL-003847',
    insured: 'Econet Wireless Zimbabwe',
    idNumber: 'Co. Reg: 2345/2002',
    phone: '+263 77 200 0000',
    email: 'fleet@econet.co.zw',
    address: 'Econet Park, 2 Old Mutare Road, Msasa, Harare',
    type: 'Third Party',
    subType: 'Third Party Bodily Injury',
    vehicle: 'Toyota Hilux',
    regNumber: 'GRE 2234',
    year: 2023,
    colour: 'White',
    vin: 'AHTFB8CD4N2345678',
    engineNo: '2GD-FTV-23456',
    coverType: 'Comprehensive',
    sumInsured: 45000,
    dateOfLoss: '2026-02-16',
    dateReported: '2026-02-16',
    dateAssigned: '2026-02-17',
    location: 'Borrowdale Road near Sam Levy Village',
    description: 'Insured vehicle (driven by company employee) struck a pedestrian crossing the road. Third party sustained leg fractures. Admitted to Avenues Clinic.',
    policeReport: 'REP-019-2026',
    witnesses: 'Ms. P. Sithole (0712 456 789)',
    thirdPartyName: 'Mr. A. Ncube',
    thirdPartyVehicle: null,
    thirdPartyInsurer: null,
    reserveAmount: 18500,
    settledAmount: null,
    excessApplicable: 0,
    salvageValue: 0,
    status: 'assessment',
    adjuster: 'M. Dube',
    adjusterPhone: '+263 77 654 3210',
    repairShop: null,
    repairShopAddress: null,
    assessor: 'Dr. T. Mpofu (Medical Assessor)',
    riRecovery: true,
    riTreaty: 'XOL-MOT-2026',
    riRecoveryAmt: 0,
    notes: 'Medical assessment ongoing. Legal counsel instructed. Third party represented by Mushoriwa & Pasi Legal Practitioners.',
    documents: ['Police Abstract', 'Hospital Admission Records', 'Medical Report - Avenues Clinic', 'Photos x4'],
    payments: [],
    statusHistory: [
      { status: 'registered', date: '2026-02-16', user: 'System', note: 'Claim registered' },
      { status: 'assessment', date: '2026-02-17', user: 'M. Dube', note: 'Medical assessor appointed, legal counsel engaged' },
    ],
  },
  {
    id: 'CLM-2026-00287',
    policy: 'HLX-POL-005102',
    insured: 'Mr. Farai Chikwanda',
    idNumber: '75-234567-F-20',
    phone: '+263 71 234 5678',
    email: 'f.chikwanda@gmail.com',
    address: '8 Highlands Road, Highlands, Harare',
    type: 'Theft',
    subType: 'Vehicle Theft (Total)',
    vehicle: 'Honda Fit',
    regNumber: 'GAA 7712',
    year: 2019,
    colour: 'Blue',
    vin: 'JHMAS1G52LX123456',
    engineNo: 'L13B-12345',
    coverType: 'Comprehensive',
    sumInsured: 9800,
    dateOfLoss: '2026-02-13',
    dateReported: '2026-02-14',
    dateAssigned: '2026-02-14',
    location: 'Westgate Shopping Mall Parking, Harare',
    description: 'Vehicle stolen from Westgate Shopping Mall parking lot between 14:00 and 17:00 on 13 February 2026. CCTV footage obtained from mall management.',
    policeReport: 'REP-017-2026',
    witnesses: null,
    thirdPartyName: null,
    thirdPartyVehicle: null,
    thirdPartyInsurer: null,
    reserveAmount: 9800,
    settledAmount: null,
    excessApplicable: 1000,
    salvageValue: 0,
    status: 'approved',
    adjuster: 'A. Moyo',
    adjusterPhone: '+263 71 876 5432',
    repairShop: null,
    repairShopAddress: null,
    assessor: null,
    riRecovery: false,
    riTreaty: null,
    riRecoveryAmt: 0,
    notes: 'CCTV footage reviewed. Police confirmed no recovery. Approved for settlement less excess. Awaiting title documents from insured.',
    documents: ['Police Abstract', 'CCTV Footage Reference', 'ZRP Stop & Search Clearance', 'Title Docs (pending)'],
    payments: [],
    statusHistory: [
      { status: 'registered', date: '2026-02-14', user: 'System', note: 'Claim registered' },
      { status: 'assessment', date: '2026-02-14', user: 'A. Moyo', note: 'Investigation initiated, police contacted' },
      { status: 'approved', date: '2026-02-20', user: 'A. Moyo', note: 'Approved — USD 8,800 net of excess USD 1,000' },
    ],
  },
  {
    id: 'CLM-2026-00286',
    policy: 'HLX-POL-002391',
    insured: 'Delta Beverages Ltd',
    idNumber: 'Co. Reg: 1178/1997',
    phone: '+263 24 2754 600',
    email: 'fleet@deltabev.co.zw',
    address: '1 Northend Close, Northridge Park, Borrowdale, Harare',
    type: 'Own Damage',
    subType: 'Rollover / Overturning',
    vehicle: 'Mercedes-Benz Actros',
    regNumber: 'GRD 0041',
    year: 2022,
    colour: 'Red/White',
    vin: 'WDB9634031L345678',
    engineNo: 'OM501LA-34567',
    coverType: 'Comprehensive',
    sumInsured: 320000,
    dateOfLoss: '2026-02-12',
    dateReported: '2026-02-12',
    dateAssigned: '2026-02-12',
    location: 'Harare-Beitbridge Road, near Beit Bridge 140km',
    description: 'Fully loaded 40-tonne truck overturned on bend due to tyre burst. Driver sustained minor injuries. Cargo (beverages) partially damaged. Vehicle recovered and towed to Harare.',
    policeReport: 'REP-BP-012-2026',
    witnesses: 'Mr. S. Mlambo (0713 234 567) — passing motorist',
    thirdPartyName: null,
    thirdPartyVehicle: null,
    thirdPartyInsurer: null,
    reserveAmount: 32000,
    settledAmount: 28400,
    excessApplicable: 2000,
    salvageValue: 3600,
    status: 'settled',
    adjuster: 'T. Banda',
    adjusterPhone: '+263 77 987 6543',
    repairShop: 'Mercedes-Benz Zimbabwe (Official)',
    repairShopAddress: '7 Coventry Road, Workington, Harare',
    assessor: 'Apex Vehicle Assessors (Pvt) Ltd',
    riRecovery: true,
    riTreaty: 'XOL-MOT-2026',
    riRecoveryAmt: 0,
    notes: 'Claim settled. Repairs completed at MB Zimbabwe. Tyre analysis confirmed blowout — no driver negligence. Salvage parts sold for USD 3,600.',
    documents: ['Police Abstract', 'Assessor Report', 'Repair Invoice - MB Zimbabwe', 'Salvage Receipt', 'Settlement Voucher'],
    payments: [
      { date: '2026-02-26', amount: 28400, method: 'EFT', ref: 'PAY-2026-00286', note: 'Full and final settlement' },
    ],
    statusHistory: [
      { status: 'registered', date: '2026-02-12', user: 'System', note: 'Claim registered' },
      { status: 'assessment', date: '2026-02-12', user: 'T. Banda', note: 'Apex Assessors appointed' },
      { status: 'approved', date: '2026-02-18', user: 'T. Banda', note: 'Approved for USD 28,400 net of excess and salvage' },
      { status: 'settled', date: '2026-02-26', user: 'Finance', note: 'EFT payment processed' },
    ],
  },
  {
    id: 'CLM-2026-00285',
    policy: 'HLX-POL-004820',
    insured: 'Mrs. Nomsa Sithole',
    idNumber: '80-345678-N-20',
    phone: '+263 71 345 6789',
    email: 'n.sithole@hotmail.com',
    address: '22 Mabelreign Drive, Mabelreign, Harare',
    type: 'Third Party',
    subType: 'Third Party Property Damage',
    vehicle: 'Nissan March',
    regNumber: 'GRA 5513',
    year: 2018,
    colour: 'Red',
    vin: 'JN1FBAK11Z0234567',
    engineNo: 'HR12DE-23456',
    coverType: 'Third Party Only',
    sumInsured: 0,
    dateOfLoss: '2026-02-10',
    dateReported: '2026-02-10',
    dateAssigned: '2026-02-11',
    location: '7th Street & J. Tongogara Ave, Harare CBD',
    description: 'Insured vehicle reversed into a parked car at traffic lights. Third party vehicle sustained rear panel damage. Liability disputed — insured claims third party was double-parked.',
    policeReport: 'REP-007-2026',
    witnesses: null,
    thirdPartyName: 'Mr. P. Gono',
    thirdPartyVehicle: 'Mazda Demio GRD 3312',
    thirdPartyInsurer: 'ZB Insurance',
    reserveAmount: 2100,
    settledAmount: null,
    excessApplicable: 0,
    salvageValue: 0,
    status: 'declined',
    adjuster: 'M. Dube',
    adjusterPhone: '+263 77 654 3210',
    repairShop: null,
    repairShopAddress: null,
    assessor: null,
    riRecovery: false,
    riTreaty: null,
    riRecoveryAmt: 0,
    notes: 'Declined — investigation confirmed insured reversed negligently into lawfully parked vehicle. Policy Condition 4(b) applies. Insured notified in writing.',
    documents: ['Police Abstract', 'Photos x3', 'Decline Letter'],
    payments: [],
    statusHistory: [
      { status: 'registered', date: '2026-02-10', user: 'System', note: 'Claim registered' },
      { status: 'assessment', date: '2026-02-11', user: 'M. Dube', note: 'Site visited, CCTV unavailable' },
      { status: 'declined', date: '2026-02-17', user: 'M. Dube', note: 'Declined — negligence established, policy condition invoked' },
    ],
  },
]

const ADJUSTERS = ['T. Banda', 'M. Dube', 'A. Moyo', 'P. Chigumba', 'S. Ncube']
const REPAIR_SHOPS = ['Premier Panel Beaters', 'Mercedes-Benz Zimbabwe', 'Toyota Zimbabwe', 'Zimoco', 'Highglen Panel Beaters', 'Avonlea Auto Repairs']
const CLAIM_TYPES = ['Own Damage', 'Third Party', 'Theft', 'Fire', 'Windscreen', 'Flood/Natural Disaster']
const SUBTYPES = {
  'Own Damage':   ['Collision', 'Rollover / Overturning', 'Fire Damage', 'Flood Damage', 'Hail Damage', 'Vandalism'],
  'Third Party':  ['Third Party Property Damage', 'Third Party Bodily Injury', 'Third Party Both'],
  'Theft':        ['Vehicle Theft (Total)', 'Partial Theft (Parts)', 'Attempted Theft'],
  'Fire':         ['Engine Fire', 'Electrical Fire', 'External Fire'],
  'Windscreen':   ['Cracked', 'Shattered', 'Stone Chip'],
  'Flood/Natural Disaster': ['Flood', 'Hail', 'Storm Damage'],
}

const STATUS_CFG = {
  registered: { label: 'Registered', color: 'text-slate-400',   bg: 'bg-slate-400/10',   border: 'border-slate-600/30',   dot: 'bg-slate-400'   },
  processing: { label: 'Processing', color: 'text-helix-400',   bg: 'bg-helix-400/10',   border: 'border-helix-600/30',   dot: 'bg-helix-400'   },
  assessment: { label: 'Assessment', color: 'text-amber-400',   bg: 'bg-amber-400/10',   border: 'border-amber-600/30',   dot: 'bg-amber-400'   },
  approved:   { label: 'Approved',   color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-600/30', dot: 'bg-emerald-400' },
  settled:    { label: 'Settled',    color: 'text-blue-400',    bg: 'bg-blue-400/10',    border: 'border-blue-600/30',    dot: 'bg-blue-400'    },
  declined:   { label: 'Declined',   color: 'text-rose-400',    bg: 'bg-rose-400/10',    border: 'border-rose-600/30',    dot: 'bg-rose-400'    },
}

const TYPE_ICON = {
  'Own Damage': Car,
  'Third Party': Scale,
  'Theft': Shield,
  'Fire': AlertTriangle,
  'Windscreen': Camera,
  'Flood/Natural Disaster': AlertCircle,
}

function fmt(v) { return (parseFloat(v) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
function fmtM(v) { const n = parseFloat(v) || 0; return n >= 1000000 ? `${(n/1000000).toFixed(2)}M` : n >= 1000 ? `${(n/1000).toFixed(0)}K` : fmt(n) }

// ─── PRINT CLAIM SLIP ─────────────────────────────────────────────────────────
function printClaimSlip(claim) {
  const st = STATUS_CFG[claim.status]
  const html = `<!DOCTYPE html><html><head><title>Claim — ${claim.id}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;padding:30px;font-size:11px;line-height:1.7}
.hdr{display:flex;justify-content:space-between;padding-bottom:16px;border-bottom:3px solid #2563eb;margin-bottom:20px}
.logo{font-size:22px;font-weight:900;color:#0f172a;letter-spacing:-1px}.logo span{color:#2563eb}
.sec-title{font-size:9px;font-weight:800;color:#2563eb;text-transform:uppercase;letter-spacing:.1em;border-left:3px solid #2563eb;padding-left:7px;margin-bottom:8px;margin-top:14px}
.row{display:flex;justify-content:space-between;border-bottom:1px solid #f1f5f9;padding:3.5px 0}
.lbl{color:#64748b;font-size:10px;min-width:160px}.val{color:#1e293b;font-weight:500;font-size:10px;text-align:right}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}
.card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px}
.status{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:20px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;background:#dbeafe;color:#1d4ed8}
table{width:100%;border-collapse:collapse}th{background:#2563eb;color:#fff;padding:6px 10px;text-align:left;font-size:8.5px;text-transform:uppercase;letter-spacing:.08em}td{padding:5px 10px;border-bottom:1px solid #f1f5f9;font-size:10px}
.sig-area{display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;margin-top:32px}
.sig{border-top:1px solid #cbd5e1;padding-top:5px;font-size:9px;color:#94a3b8;line-height:1.9}
.footer{margin-top:20px;padding-top:10px;border-top:1px solid #e2e8f0;font-size:9px;color:#94a3b8;display:flex;justify-content:space-between}
.desc-box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:10px;font-size:10.5px;color:#475569;margin-bottom:14px;line-height:1.8}
</style></head><body>
<div class="hdr">
  <div><div class="logo">HELIX<span>.</span></div><div style="font-size:9.5px;color:#94a3b8">Motor Insurance — Claims Department — Zimbabwe</div><div style="margin-top:8px;font-size:16px;font-weight:800;font-family:monospace;color:#2563eb">${claim.id}</div></div>
  <div style="text-align:right"><div style="font-size:16px;font-weight:800;color:#0f172a">MOTOR CLAIM NOTIFICATION</div><div style="margin-top:4px"><span class="status">${claim.status.toUpperCase()}</span></div><div style="font-size:9.5px;color:#94a3b8;margin-top:6px">Printed: ${new Date().toLocaleDateString('en-GB')}</div></div>
</div>
<div class="grid2">
<div class="card">
<div class="sec-title">Claim Particulars</div>
${[['Claim Number', claim.id],['Policy Number', claim.policy],['Claim Type', claim.type],['Sub-Type', claim.subType],['Cover Type', claim.coverType],['Date of Loss', claim.dateOfLoss],['Date Reported', claim.dateReported],['Loss Location', claim.location]].map(([l,v])=>`<div class="row"><span class="lbl">${l}</span><span class="val">${v||'—'}</span></div>`).join('')}
</div>
<div class="card">
<div class="sec-title">Insured Details</div>
${[['Insured Name', claim.insured],['ID / Reg No.', claim.idNumber],['Phone', claim.phone],['Email', claim.email],['Address', claim.address],['Adjuster', claim.adjuster],['Police Report', claim.policeReport]].map(([l,v])=>`<div class="row"><span class="lbl">${l}</span><span class="val">${v||'—'}</span></div>`).join('')}
</div>
</div>
<div class="grid2">
<div class="card">
<div class="sec-title">Vehicle Details</div>
${[['Vehicle', `${claim.vehicle} (${claim.year})`],['Registration', claim.regNumber],['Colour', claim.colour],['VIN / Chassis No.', claim.vin],['Engine No.', claim.engineNo],['Sum Insured', `USD ${fmt(claim.sumInsured)}`]].map(([l,v])=>`<div class="row"><span class="lbl">${l}</span><span class="val">${v||'—'}</span></div>`).join('')}
</div>
<div class="card">
<div class="sec-title">Financial Summary</div>
${[['Reserve Amount', `USD ${fmt(claim.reserveAmount)}`],['Settled Amount', claim.settledAmount ? `USD ${fmt(claim.settledAmount)}` : 'Pending'],['Excess Applicable', `USD ${fmt(claim.excessApplicable)}`],['Salvage Value', `USD ${fmt(claim.salvageValue)}`],['RI Recovery', claim.riRecovery ? `Yes — ${claim.riTreaty}` : 'No'],['Repair Shop', claim.repairShop || 'N/A']].map(([l,v])=>`<div class="row"><span class="lbl">${l}</span><span class="val">${v||'—'}</span></div>`).join('')}
</div>
</div>
${claim.thirdPartyName ? `<div class="card" style="margin-bottom:14px"><div class="sec-title">Third Party Details</div><div class="grid2" style="gap:0">${[['Third Party Name', claim.thirdPartyName],['Third Party Vehicle', claim.thirdPartyVehicle||'N/A'],['Third Party Insurer', claim.thirdPartyInsurer||'Uninsured/Unknown']].map(([l,v])=>`<div class="row"><span class="lbl">${l}</span><span class="val">${v}</span></div>`).join('')}</div></div>` : ''}
<div class="sec-title">Circumstances of Loss</div>
<div class="desc-box">${claim.description}</div>
${claim.payments.length > 0 ? `<div class="sec-title">Payments Made</div><table><thead><tr><th>Date</th><th>Amount</th><th>Method</th><th>Reference</th><th>Note</th></tr></thead><tbody>${claim.payments.map(p=>`<tr><td>${p.date}</td><td style="font-family:monospace;font-weight:700">USD ${fmt(p.amount)}</td><td>${p.method}</td><td style="font-family:monospace">${p.ref}</td><td>${p.note}</td></tr>`).join('')}</tbody></table>` : ''}
<div class="sec-title">Documents on File</div>
<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">${claim.documents.map(d=>`<span style="background:#dbeafe;color:#1d4ed8;padding:3px 8px;border-radius:4px;font-size:9.5px;font-weight:600">${d}</span>`).join('')}</div>
${claim.notes ? `<div class="sec-title">Adjuster Notes</div><div class="desc-box">${claim.notes}</div>` : ''}
<div class="sig-area">
  <div><div class="sig"><strong>Claims Adjuster</strong><br>${claim.adjuster}<br><br>Signature: _____________<br>Date: _________________</div></div>
  <div><div class="sig"><strong>Claims Manager</strong><br>HELIX Motor Insurance<br><br>Signature: _____________<br>Date: _________________</div></div>
  <div><div class="sig"><strong>Insured / Agent</strong><br>${claim.insured}<br><br>Signature: _____________<br>Date: _________________</div></div>
</div>
<div class="footer"><span>HELIX Motor Insurance — Claims Department — Computer Generated</span><span>${claim.id} | ${new Date().toLocaleDateString('en-GB')}</span></div>
</body></html>`
  const w = window.open('', '_blank', 'width=1060,height=820')
  w.document.write(html); w.document.close(); w.focus()
  setTimeout(() => w.print(), 600)
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = STATUS_CFG[status] || STATUS_CFG.processing
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border whitespace-nowrap ${s.bg} ${s.color} ${s.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
    </span>
  )
}
function Panel({ children, className = '' }) {
  return <div className={`p-4 bg-slate-800/30 rounded-xl border border-slate-700/40 ${className}`}>{children}</div>
}
function SecHead({ children, icon: Icon }) {
  return (
    <div className="mb-4 pb-2 border-b border-slate-800/50 flex items-center gap-2">
      {Icon && <Icon size={12} className="text-helix-500 flex-shrink-0" />}
      <div className="text-[9.5px] font-bold uppercase tracking-widest text-slate-400">{children}</div>
    </div>
  )
}
function KV({ label, value, mono, hi }) {
  return (
    <div className="flex justify-between items-baseline gap-4 py-1.5 border-b border-slate-800/20 last:border-0">
      <span className="text-[10.5px] text-slate-500 flex-shrink-0">{label}</span>
      <span className={`text-[10.5px] text-right ${hi ? 'text-helix-300 font-bold font-mono text-sm' : mono ? 'font-mono text-slate-300' : 'text-slate-300'}`}>{value || '—'}</span>
    </div>
  )
}
function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-[10.5px] font-medium text-slate-400 mb-1.5">
        {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
const Inp = (p) => <input className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-helix-500/50 transition-colors" {...p} />
const Sel = ({ children, ...p }) => <select className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 outline-none focus:border-helix-500/50 transition-colors appearance-none" {...p}>{children}</select>
const Txt = (p) => <textarea className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-helix-500/50 transition-colors resize-none" {...p} />

// ─── CLAIM DETAIL MODAL ───────────────────────────────────────────────────────
function ClaimDetail({ claim, onClose, onUpdate }) {
  const [tab, setTab] = useState('overview')
  const [note, setNote] = useState('')
  const [newStatus, setNewStatus] = useState(claim.status)

  const tabs = ['overview', 'vehicle', 'financials', 'documents', 'history']
  const TypeIcon = TYPE_ICON[claim.type] || FileText

  const handleStatusUpdate = () => {
    if (newStatus !== claim.status && note.trim()) {
      onUpdate(claim.id, newStatus, note)
      setNote('')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(2,6,23,0.92)' }}>
      <div className="w-full max-w-5xl max-h-[93vh] flex flex-col glass rounded-2xl border border-slate-700/40 overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-800/50 flex-shrink-0">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-helix-600/20 border border-helix-600/30 flex items-center justify-center flex-shrink-0">
              <TypeIcon size={18} className="text-helix-400" />
            </div>
            <div>
              <div className="font-mono text-helix-400 text-xs mb-0.5 tracking-wider">{claim.id}</div>
              <div className="font-display text-xl font-bold text-white">{claim.insured}</div>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <StatusBadge status={claim.status} />
                <span className="text-xs text-slate-600 px-2 py-0.5 rounded bg-slate-800">{claim.type}</span>
                <span className="text-xs text-slate-600 px-2 py-0.5 rounded bg-slate-800">{claim.subType}</span>
                <span className="text-xs text-slate-600">{claim.policy}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => printClaimSlip(claim)} className="flex items-center gap-1.5 px-3 py-1.5 glass-light text-slate-300 rounded-lg text-xs border border-slate-700 hover:text-white transition-colors">
              <Printer size={12} /> Print
            </button>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-200 transition-colors"><X size={16} /></button>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-3 px-6 py-4 border-b border-slate-800/50 flex-shrink-0">
          {[
            { label: 'Reserve', value: `USD ${fmtM(claim.reserveAmount)}`, color: 'text-amber-400' },
            { label: claim.settledAmount ? 'Settled' : 'Excess', value: claim.settledAmount ? `USD ${fmtM(claim.settledAmount)}` : `USD ${fmt(claim.excessApplicable)}`, color: claim.settledAmount ? 'text-emerald-400' : 'text-slate-300' },
            { label: 'Adjuster', value: claim.adjuster, color: 'text-helix-300' },
            { label: 'Date of Loss', value: claim.dateOfLoss, color: 'text-slate-300' },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-3 bg-slate-800/30 rounded-xl border border-slate-700/30">
              <div className="text-[9.5px] text-slate-500 uppercase tracking-wide mb-1">{label}</div>
              <div className={`text-sm font-bold ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-3 border-b border-slate-800/50 flex-shrink-0">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-colors capitalize whitespace-nowrap ${tab === t ? 'bg-helix-600/20 text-helix-300 border-b-2 border-helix-500' : 'text-slate-500 hover:text-slate-300'}`}>
              {t === 'history' ? `History (${claim.statusHistory.length})` : t === 'documents' ? `Documents (${claim.documents.length})` : t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* OVERVIEW */}
          {tab === 'overview' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Panel>
                  <SecHead icon={FileText}>Claim Particulars</SecHead>
                  <KV label="Claim Number" value={claim.id} mono />
                  <KV label="Policy Number" value={claim.policy} mono />
                  <KV label="Claim Type" value={claim.type} />
                  <KV label="Sub-Type" value={claim.subType} />
                  <KV label="Cover Type" value={claim.coverType} />
                  <KV label="Date of Loss" value={claim.dateOfLoss} />
                  <KV label="Date Reported" value={claim.dateReported} />
                  <KV label="Date Assigned" value={claim.dateAssigned} />
                  <KV label="Loss Location" value={claim.location} />
                  <KV label="Police Report" value={claim.policeReport} mono />
                  <KV label="Witnesses" value={claim.witnesses} />
                </Panel>
                <Panel>
                  <SecHead icon={User}>Insured Details</SecHead>
                  <KV label="Insured Name" value={claim.insured} />
                  <KV label="ID / Reg No." value={claim.idNumber} />
                  <KV label="Phone" value={claim.phone} />
                  <KV label="Email" value={claim.email} />
                  <KV label="Address" value={claim.address} />
                </Panel>
              </div>
              <div className="space-y-4">
                <Panel>
                  <SecHead icon={FileText}>Circumstances of Loss</SecHead>
                  <p className="text-xs text-slate-400 leading-relaxed">{claim.description}</p>
                </Panel>
                {claim.thirdPartyName && (
                  <Panel>
                    <SecHead icon={Scale}>Third Party Details</SecHead>
                    <KV label="Third Party Name" value={claim.thirdPartyName} />
                    <KV label="Third Party Vehicle" value={claim.thirdPartyVehicle} />
                    <KV label="Third Party Insurer" value={claim.thirdPartyInsurer || 'Uninsured/Unknown'} />
                  </Panel>
                )}
                <Panel>
                  <SecHead icon={Wrench}>Claims Handler</SecHead>
                  <KV label="Adjuster" value={claim.adjuster} />
                  <KV label="Adjuster Phone" value={claim.adjusterPhone} />
                  <KV label="Assessor" value={claim.assessor} />
                  <KV label="Repair Shop" value={claim.repairShop} />
                  <KV label="Repair Shop Address" value={claim.repairShopAddress} />
                </Panel>
                {claim.notes && (
                  <Panel>
                    <SecHead>Adjuster Notes</SecHead>
                    <p className="text-xs text-slate-400 leading-relaxed">{claim.notes}</p>
                  </Panel>
                )}
                {/* Status Update */}
                <Panel>
                  <SecHead icon={RefreshCw}>Update Claim Status</SecHead>
                  <div className="space-y-3">
                    <Field label="New Status">
                      <Sel value={newStatus} onChange={e => setNewStatus(e.target.value)}>
                        {Object.keys(STATUS_CFG).map(s => <option key={s} value={s}>{STATUS_CFG[s].label}</option>)}
                      </Sel>
                    </Field>
                    <Field label="Note / Reason">
                      <Txt rows={2} value={note} onChange={e => setNote(e.target.value)} placeholder="Describe the action taken..." />
                    </Field>
                    <button onClick={handleStatusUpdate} disabled={!note.trim() || newStatus === claim.status}
                      className="w-full py-2 bg-helix-600 hover:bg-helix-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-xs font-semibold transition-colors">
                      Update Status
                    </button>
                  </div>
                </Panel>
              </div>
            </div>
          )}

          {/* VEHICLE */}
          {tab === 'vehicle' && (
            <div className="grid grid-cols-2 gap-4">
              <Panel>
                <SecHead icon={Car}>Vehicle Details</SecHead>
                <KV label="Make & Model" value={claim.vehicle} />
                <KV label="Year" value={claim.year} />
                <KV label="Registration" value={claim.regNumber} mono />
                <KV label="Colour" value={claim.colour} />
                <KV label="VIN / Chassis No." value={claim.vin} mono />
                <KV label="Engine Number" value={claim.engineNo} mono />
                <KV label="Sum Insured" value={`USD ${fmt(claim.sumInsured)}`} hi />
                <KV label="Cover Type" value={claim.coverType} />
              </Panel>
              <Panel>
                <SecHead icon={Wrench}>Repair Details</SecHead>
                <KV label="Repair Shop" value={claim.repairShop || 'Not yet assigned'} />
                <KV label="Shop Address" value={claim.repairShopAddress} />
                <KV label="Assessor" value={claim.assessor || 'Not yet assigned'} />
                <KV label="Salvage Value" value={`USD ${fmt(claim.salvageValue)}`} />
              </Panel>
            </div>
          )}

          {/* FINANCIALS */}
          {tab === 'financials' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Reserve Amount', value: `USD ${fmt(claim.reserveAmount)}`, color: 'text-amber-400' },
                  { label: 'Settled Amount', value: claim.settledAmount ? `USD ${fmt(claim.settledAmount)}` : 'Pending', color: 'text-emerald-400' },
                  { label: 'Excess Applicable', value: `USD ${fmt(claim.excessApplicable)}`, color: 'text-rose-400' },
                  { label: 'Salvage Value', value: `USD ${fmt(claim.salvageValue)}`, color: 'text-blue-400' },
                  { label: 'RI Recovery', value: claim.riRecovery ? claim.riTreaty : 'N/A', color: 'text-violet-400' },
                  { label: 'Net Exposure', value: `USD ${fmt(claim.reserveAmount - claim.excessApplicable - claim.salvageValue)}`, color: 'text-helix-300' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/30">
                    <div className="text-[9.5px] text-slate-500 uppercase tracking-wide mb-1">{label}</div>
                    <div className={`font-mono font-bold ${color}`}>{value}</div>
                  </div>
                ))}
              </div>
              <Panel>
                <SecHead icon={DollarSign}>Payment Records</SecHead>
                {claim.payments.length === 0
                  ? <div className="text-sm text-slate-600 text-center py-6">No payments recorded yet.</div>
                  : <div className="space-y-2">
                    {claim.payments.map((p, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-slate-800/30 last:border-0">
                        <div>
                          <div className="text-xs text-slate-300 font-medium">{p.note}</div>
                          <div className="text-[10px] font-mono text-slate-500 mt-0.5">{p.ref} • {p.method} • {p.date}</div>
                        </div>
                        <div className="font-mono font-bold text-emerald-400">USD {fmt(p.amount)}</div>
                      </div>
                    ))}
                  </div>
                }
              </Panel>
            </div>
          )}

          {/* DOCUMENTS */}
          {tab === 'documents' && (
            <Panel>
              <SecHead icon={Paperclip}>Documents on File</SecHead>
              <div className="grid grid-cols-2 gap-2">
                {claim.documents.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-900/40 rounded-xl border border-slate-700/30">
                    <div className="w-8 h-8 rounded-lg bg-helix-600/20 flex items-center justify-center flex-shrink-0">
                      <FileText size={14} className="text-helix-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-300 font-medium">{d}</div>
                      <div className="text-[10px] text-slate-600 mt-0.5">On file</div>
                    </div>
                    <CheckCircle size={12} className="text-emerald-500 ml-auto flex-shrink-0" />
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {/* HISTORY */}
          {tab === 'history' && (
            <Panel>
              <SecHead icon={Clock}>Status History</SecHead>
              <div className="space-y-3">
                {[...claim.statusHistory].reverse().map((h, i) => {
                  const s = STATUS_CFG[h.status] || STATUS_CFG.processing
                  return (
                    <div key={i} className="flex gap-4 py-2 border-b border-slate-800/30 last:border-0">
                      <div className="flex-shrink-0 mt-0.5">
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${s.bg} ${s.color} ${s.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-300">{h.note}</div>
                        <div className="text-[10px] text-slate-600 mt-0.5">{h.user} • {h.date}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Panel>
          )}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800/50 flex-shrink-0">
          <div className="text-[10px] text-slate-600 font-mono">{claim.id} | {claim.policy} | {claim.dateOfLoss}</div>
          <div className="flex gap-2">
            <button onClick={() => printClaimSlip(claim)} className="flex items-center gap-1.5 px-4 py-1.5 bg-helix-600 hover:bg-helix-500 text-white rounded-lg text-xs font-semibold transition-colors">
              <Printer size={12} /> Print Claim Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── NEW CLAIM WIZARD ─────────────────────────────────────────────────────────
const claimDefault = {
  policy: '', insured: '', idNumber: '', phone: '', email: '', address: '',
  type: 'Own Damage', subType: 'Collision',
  vehicle: '', regNumber: '', year: '', colour: '', vin: '', engineNo: '',
  coverType: 'Comprehensive', sumInsured: '',
  dateOfLoss: '', dateReported: new Date().toISOString().split('T')[0],
  location: '', description: '', policeReport: '',
  witnesses: '', thirdPartyName: '', thirdPartyVehicle: '', thirdPartyInsurer: '',
  reserveAmount: '', excessApplicable: '',
  adjuster: ADJUSTERS[0], repairShop: '', assessor: '', notes: '',
}

const CLAIM_STEPS = [
  { id: 1, label: 'Policy & Insured', desc: 'Policyholder information' },
  { id: 2, label: 'Vehicle & Loss',   desc: 'Vehicle details and circumstances' },
  { id: 3, label: 'Third Party',      desc: 'Third party details if applicable' },
  { id: 4, label: 'Reserves',         desc: 'Financial estimates and assignment' },
  { id: 5, label: 'Review & Submit',  desc: 'Confirm and register claim' },
]

function NewClaimWizard({ onClose, onSave }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(claimDefault)
  const [done, setDone] = useState(false)
  const [newId, setNewId] = useState('')
  const set = fn => setForm(prev => fn(prev))

  const hasThirdParty = ['Third Party', 'Theft'].includes(form.type) === false && form.type === 'Third Party' ||
    form.type === 'Third Party'

  const handleSubmit = () => {
    const id = `CLM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`
    setNewId(id)
    setDone(true)
    onSave && onSave({
      ...form, id,
      status: 'processing',
      dateAssigned: new Date().toISOString().split('T')[0],
      salvageValue: 0,
      settledAmount: null,
      riRecovery: false, riTreaty: null, riRecoveryAmt: 0,
      documents: [],
      payments: [],
      statusHistory: [
        { status: 'registered', date: new Date().toISOString().split('T')[0], user: 'System', note: 'Claim registered' },
        { status: 'processing', date: new Date().toISOString().split('T')[0], user: form.adjuster, note: `Assigned to ${form.adjuster}` },
      ],
      sumInsured: parseFloat(form.sumInsured) || 0,
      reserveAmount: parseFloat(form.reserveAmount) || 0,
      excessApplicable: parseFloat(form.excessApplicable) || 0,
      adjusterPhone: '',
      repairShopAddress: '',
    })
  }

  return (
    <div className="fixed inset-0 z-[60] flex" style={{ background: 'rgba(2,6,23,0.97)' }}>
      {/* Sidebar */}
      <div className="w-56 border-r border-slate-800/50 flex flex-col glass min-h-screen flex-shrink-0">
        <div className="px-5 py-5 border-b border-slate-800/50">
          <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">Claims Registration</div>
          <div className="font-display text-base font-bold text-white leading-tight">New Motor<br />Claim</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {CLAIM_STEPS.map(s => {
            const d = step > s.id; const a = step === s.id
            return (
              <button key={s.id} onClick={() => d && setStep(s.id)}
                className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all ${a ? 'bg-helix-600/20 border border-helix-600/30' : d ? 'hover:bg-slate-800/40 cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5 ${a ? 'bg-helix-600 text-white' : d ? 'bg-emerald-600/20 text-emerald-400' : 'bg-slate-800 text-slate-600'}`}>
                  {d ? '✓' : s.id}
                </div>
                <div>
                  <div className={`text-[11px] font-semibold ${a ? 'text-helix-300' : d ? 'text-slate-300' : 'text-slate-600'}`}>{s.label}</div>
                  <div className="text-[9.5px] text-slate-700 mt-0.5">{s.desc}</div>
                </div>
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-800/50">
          <button onClick={onClose} className="w-full flex items-center gap-2 text-slate-600 hover:text-slate-400 text-xs rounded-lg py-2 px-2 hover:bg-slate-800/40 transition-colors">
            <X size={12} /> Cancel
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-8 py-4 border-b border-slate-800/50 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="text-xs text-slate-500">Step {step} of {CLAIM_STEPS.length} — {CLAIM_STEPS[step-1].label}</div>
            <div className="text-slate-200 font-semibold text-sm mt-0.5">{CLAIM_STEPS[step-1].desc}</div>
          </div>
          <div className="flex gap-1">
            {CLAIM_STEPS.map(s => (
              <div key={s.id} className={`h-1.5 rounded-full transition-all ${s.id < step ? 'bg-emerald-500 w-7' : s.id === step ? 'bg-helix-500 w-9' : 'bg-slate-800 w-5'}`} />
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {done ? (
            <div className="max-w-md mx-auto text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={30} className="text-emerald-400" />
              </div>
              <h2 className="font-display text-2xl text-white mb-2">Claim Registered!</h2>
              <p className="text-slate-400 mb-1">Claim ID: <span className="font-mono text-helix-400">{newId}</span></p>
              <p className="text-slate-500 text-sm mb-6">{form.insured} — Assigned to {form.adjuster}</p>
              <button onClick={onClose} className="px-6 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors">
                Back to Claims
              </button>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">

              {/* STEP 1 — Policy & Insured */}
              {step === 1 && (
                <Panel>
                  <SecHead icon={User}>Policyholder & Claim Details</SecHead>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Field label="Policy Number" required>
                        <Inp value={form.policy} onChange={e => set(f => ({ ...f, policy: e.target.value }))} placeholder="e.g. HLX-POL-004521" />
                      </Field>
                    </div>
                    <Field label="Insured Name" required>
                      <Inp value={form.insured} onChange={e => set(f => ({ ...f, insured: e.target.value }))} placeholder="Full name or company name" />
                    </Field>
                    <Field label="ID / Company Reg. No." required>
                      <Inp value={form.idNumber} onChange={e => set(f => ({ ...f, idNumber: e.target.value }))} placeholder="e.g. 63-123456-R-20" />
                    </Field>
                    <Field label="Phone Number" required>
                      <Inp value={form.phone} onChange={e => set(f => ({ ...f, phone: e.target.value }))} placeholder="+263 77 123 4567" />
                    </Field>
                    <Field label="Email Address">
                      <Inp type="email" value={form.email} onChange={e => set(f => ({ ...f, email: e.target.value }))} placeholder="insured@email.com" />
                    </Field>
                    <div className="col-span-2">
                      <Field label="Physical Address">
                        <Inp value={form.address} onChange={e => set(f => ({ ...f, address: e.target.value }))} placeholder="Street, Suburb, City" />
                      </Field>
                    </div>
                    <Field label="Claim Type" required>
                      <Sel value={form.type} onChange={e => set(f => ({ ...f, type: e.target.value, subType: SUBTYPES[e.target.value]?.[0] || '' }))}>
                        {CLAIM_TYPES.map(t => <option key={t}>{t}</option>)}
                      </Sel>
                    </Field>
                    <Field label="Sub-Type" required>
                      <Sel value={form.subType} onChange={e => set(f => ({ ...f, subType: e.target.value }))}>
                        {(SUBTYPES[form.type] || []).map(t => <option key={t}>{t}</option>)}
                      </Sel>
                    </Field>
                    <Field label="Date of Loss" required>
                      <Inp type="date" value={form.dateOfLoss} onChange={e => set(f => ({ ...f, dateOfLoss: e.target.value }))} />
                    </Field>
                    <Field label="Date Reported">
                      <Inp type="date" value={form.dateReported} onChange={e => set(f => ({ ...f, dateReported: e.target.value }))} />
                    </Field>
                  </div>
                </Panel>
              )}

              {/* STEP 2 — Vehicle & Loss */}
              {step === 2 && (
                <div className="space-y-4">
                  <Panel>
                    <SecHead icon={Car}>Vehicle Details</SecHead>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Make & Model" required>
                        <Inp value={form.vehicle} onChange={e => set(f => ({ ...f, vehicle: e.target.value }))} placeholder="e.g. Toyota Corolla" />
                      </Field>
                      <Field label="Registration Number" required>
                        <Inp value={form.regNumber} onChange={e => set(f => ({ ...f, regNumber: e.target.value }))} placeholder="e.g. GRD 4821" />
                      </Field>
                      <Field label="Year of Manufacture">
                        <Inp type="number" value={form.year} onChange={e => set(f => ({ ...f, year: e.target.value }))} placeholder="e.g. 2020" min={1990} max={2026} />
                      </Field>
                      <Field label="Colour">
                        <Inp value={form.colour} onChange={e => set(f => ({ ...f, colour: e.target.value }))} placeholder="e.g. Silver" />
                      </Field>
                      <Field label="VIN / Chassis No." required>
                        <Inp value={form.vin} onChange={e => set(f => ({ ...f, vin: e.target.value }))} placeholder="17-character VIN" />
                      </Field>
                      <Field label="Engine Number">
                        <Inp value={form.engineNo} onChange={e => set(f => ({ ...f, engineNo: e.target.value }))} placeholder="e.g. 1NZ-FE-12345" />
                      </Field>
                      <Field label="Cover Type">
                        <Sel value={form.coverType} onChange={e => set(f => ({ ...f, coverType: e.target.value }))}>
                          {['Comprehensive', 'Third Party Only', 'Third Party Fire & Theft'].map(c => <option key={c}>{c}</option>)}
                        </Sel>
                      </Field>
                      <Field label="Sum Insured (USD)">
                        <Inp type="number" value={form.sumInsured} onChange={e => set(f => ({ ...f, sumInsured: e.target.value }))} placeholder="e.g. 18000" />
                      </Field>
                    </div>
                  </Panel>
                  <Panel>
                    <SecHead icon={MapPin}>Circumstances of Loss</SecHead>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Field label="Exact Location of Loss" required>
                          <Inp value={form.location} onChange={e => set(f => ({ ...f, location: e.target.value }))} placeholder="Street, intersection, suburb, city" />
                        </Field>
                      </div>
                      <Field label="Police Report Number">
                        <Inp value={form.policeReport} onChange={e => set(f => ({ ...f, policeReport: e.target.value }))} placeholder="e.g. REP-026-2026" />
                      </Field>
                      <Field label="Witnesses">
                        <Inp value={form.witnesses} onChange={e => set(f => ({ ...f, witnesses: e.target.value }))} placeholder="Name and contact number" />
                      </Field>
                      <div className="col-span-2">
                        <Field label="Description of Loss / Circumstances" required>
                          <Txt rows={4} value={form.description} onChange={e => set(f => ({ ...f, description: e.target.value }))} placeholder="Describe exactly what happened, damage sustained, injuries if any..." />
                        </Field>
                      </div>
                    </div>
                  </Panel>
                </div>
              )}

              {/* STEP 3 — Third Party */}
              {step === 3 && (
                <Panel>
                  <SecHead icon={Scale}>Third Party Details</SecHead>
                  <div className="mb-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
                    <p className="text-xs text-slate-500">Complete this section if there is a third party involved (property damage or bodily injury). Leave blank if not applicable.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Third Party Name">
                      <Inp value={form.thirdPartyName} onChange={e => set(f => ({ ...f, thirdPartyName: e.target.value }))} placeholder="Full name of third party" />
                    </Field>
                    <Field label="Third Party Vehicle">
                      <Inp value={form.thirdPartyVehicle} onChange={e => set(f => ({ ...f, thirdPartyVehicle: e.target.value }))} placeholder="e.g. Honda Fit GRA 5544" />
                    </Field>
                    <Field label="Third Party Insurer">
                      <Inp value={form.thirdPartyInsurer} onChange={e => set(f => ({ ...f, thirdPartyInsurer: e.target.value }))} placeholder="e.g. FBC Insurance / Uninsured" />
                    </Field>
                  </div>
                  <div className="mt-6 p-3 bg-amber-400/5 border border-amber-600/20 rounded-xl">
                    <div className="flex items-center gap-2 text-amber-400 text-xs mb-2"><AlertTriangle size={12} /> Third Party Bodily Injury</div>
                    <p className="text-xs text-slate-500">For bodily injury claims, ensure a medical assessor is appointed immediately and legal counsel is informed. Notify the RI team if the reserve exceeds USD 50,000.</p>
                  </div>
                </Panel>
              )}

              {/* STEP 4 — Reserves */}
              {step === 4 && (
                <div className="space-y-4">
                  <Panel>
                    <SecHead icon={DollarSign}>Financial Estimates</SecHead>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Reserve Amount (USD)" required>
                        <Inp type="number" value={form.reserveAmount} onChange={e => set(f => ({ ...f, reserveAmount: e.target.value }))} placeholder="e.g. 4200" />
                      </Field>
                      <Field label="Excess Applicable (USD)">
                        <Inp type="number" value={form.excessApplicable} onChange={e => set(f => ({ ...f, excessApplicable: e.target.value }))} placeholder="e.g. 500" />
                      </Field>
                    </div>
                    {form.reserveAmount && (
                      <div className="mt-4 p-3 bg-helix-900/20 border border-helix-700/20 rounded-xl text-center">
                        <div className="text-[10px] text-helix-500 uppercase tracking-widest mb-1">Net Reserve (less excess)</div>
                        <div className="font-mono text-lg font-bold text-helix-300">
                          USD {fmt((parseFloat(form.reserveAmount) || 0) - (parseFloat(form.excessApplicable) || 0))}
                        </div>
                      </div>
                    )}
                  </Panel>
                  <Panel>
                    <SecHead icon={Wrench}>Assignment</SecHead>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Assign Adjuster" required>
                        <Sel value={form.adjuster} onChange={e => set(f => ({ ...f, adjuster: e.target.value }))}>
                          {ADJUSTERS.map(a => <option key={a}>{a}</option>)}
                        </Sel>
                      </Field>
                      <Field label="Preferred Repair Shop">
                        <Sel value={form.repairShop} onChange={e => set(f => ({ ...f, repairShop: e.target.value }))}>
                          <option value="">— Select or leave blank —</option>
                          {REPAIR_SHOPS.map(s => <option key={s}>{s}</option>)}
                        </Sel>
                      </Field>
                      <div className="col-span-2">
                        <Field label="Assessor">
                          <Inp value={form.assessor} onChange={e => set(f => ({ ...f, assessor: e.target.value }))} placeholder="e.g. Apex Vehicle Assessors (Pvt) Ltd" />
                        </Field>
                      </div>
                      <div className="col-span-2">
                        <Field label="Initial Notes">
                          <Txt rows={3} value={form.notes} onChange={e => set(f => ({ ...f, notes: e.target.value }))} placeholder="Any initial observations, instructions or special handling notes..." />
                        </Field>
                      </div>
                    </div>
                  </Panel>
                </div>
              )}

              {/* STEP 5 — Review */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2">
                    <AlertTriangle size={13} className="text-amber-400 flex-shrink-0" />
                    <span className="text-xs text-amber-400">Please verify all details carefully. Claim will be assigned to {form.adjuster} upon submission.</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Panel>
                      <SecHead>Insured & Claim</SecHead>
                      <KV label="Insured" value={form.insured} />
                      <KV label="Policy" value={form.policy} mono />
                      <KV label="ID Number" value={form.idNumber} />
                      <KV label="Claim Type" value={`${form.type} — ${form.subType}`} />
                      <KV label="Date of Loss" value={form.dateOfLoss} />
                      <KV label="Date Reported" value={form.dateReported} />
                      <KV label="Police Report" value={form.policeReport} />
                    </Panel>
                    <Panel>
                      <SecHead>Vehicle & Financials</SecHead>
                      <KV label="Vehicle" value={`${form.vehicle} ${form.year}`} />
                      <KV label="Registration" value={form.regNumber} mono />
                      <KV label="VIN" value={form.vin} mono />
                      <KV label="Sum Insured" value={`USD ${fmt(form.sumInsured)}`} />
                      <KV label="Reserve Amount" value={`USD ${fmt(form.reserveAmount)}`} hi />
                      <KV label="Excess" value={`USD ${fmt(form.excessApplicable)}`} />
                      <KV label="Adjuster" value={form.adjuster} />
                    </Panel>
                  </div>
                  {form.description && (
                    <Panel>
                      <SecHead>Circumstances</SecHead>
                      <p className="text-xs text-slate-400 leading-relaxed">{form.description}</p>
                    </Panel>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {!done && (
          <div className="px-8 py-4 border-t border-slate-800/50 flex items-center justify-between flex-shrink-0">
            <button onClick={() => step > 1 ? setStep(s => s - 1) : onClose()} className="flex items-center gap-2 px-4 py-2 glass-light text-slate-400 hover:text-slate-200 rounded-xl text-sm border border-slate-700 transition-colors">
              <ArrowLeft size={13} />{step === 1 ? 'Cancel' : 'Back'}
            </button>
            <div className="text-xs text-slate-700 font-mono">{step}/{CLAIM_STEPS.length}</div>
            {step === CLAIM_STEPS.length
              ? <button onClick={handleSubmit} className="flex items-center gap-2 px-6 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors">
                  <CheckCircle size={14} /> Register Claim
                </button>
              : <button onClick={() => setStep(s => s + 1)} className="flex items-center gap-2 px-5 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-medium transition-colors">
                  Continue <ArrowRight size={13} />
                </button>
            }
          </div>
        )}
      </div>
    </div>
  )
}

// ─── MAIN CLAIMS MODULE ───────────────────────────────────────────────────────
export default function Claims() {
  const [claims, setClaims] = useState(INITIAL_CLAIMS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedClaim, setSelectedClaim] = useState(null)
  const [showNewClaim, setShowNewClaim] = useState(false)

  const filtered = claims.filter(c => {
    const matchSearch = !search ||
      c.insured.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.policy.toLowerCase().includes(search.toLowerCase()) ||
      c.regNumber.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || c.status === statusFilter
    const matchType = typeFilter === 'all' || c.type === typeFilter
    return matchSearch && matchStatus && matchType
  })

  const totalReserve = claims.reduce((a, c) => a + c.reserveAmount, 0)
  const totalSettled = claims.filter(c => c.settledAmount).reduce((a, c) => a + (c.settledAmount || 0), 0)
  const openCount = claims.filter(c => ['processing', 'assessment', 'approved'].includes(c.status)).length
  const pendingRI = claims.filter(c => c.riRecovery && c.status !== 'settled').length

  const handleUpdate = (id, newStatus, note) => {
    setClaims(prev => prev.map(c => {
      if (c.id !== id) return c
      const updated = {
        ...c, status: newStatus,
        statusHistory: [...c.statusHistory, {
          status: newStatus,
          date: new Date().toISOString().split('T')[0],
          user: c.adjuster,
          note,
        }]
      }
      return updated
    }))
    setSelectedClaim(prev => prev?.id === id ? { ...prev, status: newStatus, statusHistory: [...prev.statusHistory, { status: newStatus, date: new Date().toISOString().split('T')[0], user: prev.adjuster, note }] } : prev)
  }

  const exportCSV = () => {
    const headers = ['Claim ID', 'Policy', 'Insured', 'Type', 'Sub-Type', 'Vehicle', 'Reg No.', 'Date of Loss', 'Reserve (USD)', 'Settled (USD)', 'Status', 'Adjuster']
    const rows = claims.map(c => [c.id, c.policy, c.insured, c.type, c.subType, c.vehicle, c.regNumber, c.dateOfLoss, c.reserveAmount, c.settledAmount || '', c.status, c.adjuster].map(v => `"${v}"`).join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'claims-register.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const TypeIcon = ({ type, className }) => {
    const Icon = TYPE_ICON[type] || FileText
    return <Icon size={16} className={className} />
  }

  return (
    <>
      {selectedClaim && <ClaimDetail claim={selectedClaim} onClose={() => setSelectedClaim(null)} onUpdate={handleUpdate} />}
      {showNewClaim && (
        <NewClaimWizard
          onClose={() => setShowNewClaim(false)}
          onSave={newClaim => {
            setClaims(p => [newClaim, ...p])
            setShowNewClaim(false)
          }}
        />
      )}

      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Claims</h1>
            <p className="text-slate-500 text-sm mt-1">Motor claims registration, processing and settlement</p>
          </div>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 glass-light text-slate-300 hover:text-white rounded-xl border border-slate-700 text-sm transition-colors">
              <Download size={14} /> Export
            </button>
            <button onClick={() => setShowNewClaim(true)} className="flex items-center gap-2 px-4 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors">
              <Plus size={15} /> New Claim
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-3">
          {[
            { label: 'Open Claims',      value: openCount,             color: 'text-helix-300' },
            { label: 'Total Reserve',    value: `$${fmtM(totalReserve)}`, color: 'text-amber-400' },
            { label: 'Total Settled',    value: `$${fmtM(totalSettled)}`, color: 'text-emerald-400' },
            { label: 'Pending RI Notify', value: pendingRI,            color: pendingRI > 0 ? 'text-violet-400' : 'text-slate-500' },
            { label: 'Total Claims',     value: claims.length,         color: 'text-slate-300' },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-3 glass-light rounded-xl border border-slate-800/50">
              <div className={`font-display text-xl font-bold ${color}`}>{value}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by insured name, claim ID, policy or registration..."
              className="w-full pl-10 pr-4 py-2.5 glass-light rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none border border-transparent focus:border-helix-600/40" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-sm text-slate-300 outline-none focus:border-helix-500/50 appearance-none">
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_CFG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-sm text-slate-300 outline-none focus:border-helix-500/50 appearance-none">
            <option value="all">All Types</option>
            {CLAIM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Status Summary Pills */}
        <div className="flex gap-2 flex-wrap">
          {Object.entries(STATUS_CFG).map(([k, v]) => {
            const count = claims.filter(c => c.status === k).length
            if (!count) return null
            return (
              <button key={k} onClick={() => setStatusFilter(statusFilter === k ? 'all' : k)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors ${statusFilter === k ? `${v.bg} ${v.color} ${v.border}` : 'bg-slate-800/40 text-slate-500 border-slate-700/40 hover:border-slate-600/60'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${v.dot}`} />
                {v.label} ({count})
              </button>
            )
          })}
        </div>

        {/* Claims List */}
        <div className="glass-light rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800/50">
                {['Claim ID', 'Insured / Policy', 'Type', 'Vehicle', 'Date of Loss', 'Reserve', 'Adjuster', 'Status', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[9.5px] font-semibold text-slate-500 uppercase tracking-wide first:pl-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="px-5 py-10 text-center text-slate-600 text-sm">No claims match your filters.</td></tr>
              ) : filtered.map(c => {
                const st = STATUS_CFG[c.status]
                const Icon = TYPE_ICON[c.type] || FileText
                return (
                  <tr key={c.id} onClick={() => setSelectedClaim(c)}
                    className="border-b border-slate-800/30 last:border-0 hover:bg-slate-800/25 cursor-pointer transition-colors group">
                    <td className="px-4 pl-5 py-4 font-mono text-xs text-helix-400 whitespace-nowrap">{c.id}</td>
                    <td className="px-4 py-4">
                      <div className="text-slate-200 font-medium text-sm">{c.insured}</div>
                      <div className="text-slate-600 text-xs">{c.policy}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <Icon size={12} className="text-slate-500 flex-shrink-0" />
                        <span className="text-xs text-slate-400">{c.type}</span>
                      </div>
                      <div className="text-[10px] text-slate-600 mt-0.5 pl-4">{c.subType}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-xs text-slate-300">{c.vehicle}</div>
                      <div className="text-[10px] font-mono text-slate-500 mt-0.5">{c.regNumber}</div>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-400 whitespace-nowrap">{c.dateOfLoss}</td>
                    <td className="px-4 py-4 font-mono text-xs text-amber-400 whitespace-nowrap font-semibold">
                      USD {fmtM(c.reserveAmount)}
                      {c.settledAmount && <div className="text-[10px] text-emerald-400 font-normal">Settled: {fmtM(c.settledAmount)}</div>}
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-400">{c.adjuster}</td>
                    <td className="px-4 py-4"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-4">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={e => { e.stopPropagation(); setSelectedClaim(c) }} className="p-1.5 rounded bg-slate-800 text-slate-500 hover:text-helix-400 transition-colors"><Eye size={12} /></button>
                        <button onClick={e => { e.stopPropagation(); printClaimSlip(c) }} className="p-1.5 rounded bg-slate-800 text-slate-500 hover:text-slate-200 transition-colors"><Printer size={12} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            {filtered.length > 0 && (
              <tfoot>
                <tr className="border-t border-slate-700/50 bg-slate-900/40">
                  <td colSpan={5} className="px-4 pl-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {filtered.length} claim{filtered.length !== 1 ? 's' : ''}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-amber-300 text-xs">
                    USD {fmt(filtered.reduce((a, c) => a + c.reserveAmount, 0))}
                  </td>
                  <td colSpan={3} />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </>
  )
}
