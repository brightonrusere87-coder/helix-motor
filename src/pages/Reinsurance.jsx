import React, { useState } from 'react'
import {
  X, Plus, ChevronRight, Search, Download, Printer, Send,
  AlertTriangle, CheckCircle, Clock, XCircle, RefreshCw,
  FileText, Building2, Percent, DollarSign, ArrowRight,
  Shield, Edit3, Copy, Eye, Filter, Calendar, Hash,
  ArrowLeft, Zap, BarChart2, Layers, GitBranch, Settings
} from 'lucide-react'

const TREATIES = [
  {
    code: 'QS-MOT-2026', type: 'Proportional', subType: 'Quota Share', status: 'active',
    name: 'Quota Share Motor Treaty 2026',
    classOfBusiness: 'Motor Insurance — All Classes',
    cedant: 'HELIX Motor Insurance', cedantCountry: 'Zimbabwe',
    inceptionDate: '2026-01-01', expiryDate: '2026-12-31',
    currency: 'USD',
    cessionPct: 65, retentionPct: 35,
    retentionAmount: null,
    riCommissionPct: 20, profitCommissionPct: 10, profitCommissionThreshold: 80,
    estimatedCedingPremium: 2800000,
    actualCedingPremium: 1820400,
    riPremium: 1820400,
    riCommissionAmount: 364080,
    minimumPremium: 1500000,
    depositPremiumPct: 80,
    currency2: null,
    lossRatio: 42.1, portfolioTransferIn: false,
    bordereau: 'monthly',
    cancellationNotice: 90,
    governing: 'English Law',
    arbitration: 'London',
    interestedParties: 'All policyholders, cedant reinsurers',
    reinsurers: [
      { name: 'Africa Re', country: 'Kenya', rating: 'A-', share: 40, premium: 728160, contact: 'reinsurance@africa-re.com', slipSigned: true },
      { name: 'ZEP-RE', country: 'Kenya', rating: 'B+', share: 25, premium: 455100, contact: 'underwriting@zep-re.com', slipSigned: true },
    ],
    layerFrom: null, layerTo: null,
    reinstatements: 0,
    lossesNotified: [
      { ref: 'LN-2026-001', date: '2026-02-10', insured: 'Econet Wireless', amount: 45000, status: 'reserved' },
    ],
    endorsements: [
      { ref: 'END-001', date: '2026-01-15', desc: 'Correction of cedant registered address' },
    ],
    notes: 'Annual quota share covering all motor classes. Commission sliding scale applies for LRs below 65%.',
  },
  {
    code: 'XOL-MOT-2026', type: 'Non-Proportional', subType: 'Excess of Loss (Per Risk)', status: 'active',
    name: 'Motor Excess of Loss 2026',
    classOfBusiness: 'Motor Insurance — All Classes',
    cedant: 'HELIX Motor Insurance', cedantCountry: 'Zimbabwe',
    inceptionDate: '2026-01-01', expiryDate: '2026-12-31',
    currency: 'USD',
    cessionPct: null, retentionPct: null,
    retentionAmount: 50000,
    layerFrom: 50000, layerTo: 250000,
    riCommissionPct: 0, profitCommissionPct: 0,
    estimatedCedingPremium: null,
    actualCedingPremium: null,
    riPremium: 284000,
    riCommissionAmount: 0,
    minimumPremium: 250000,
    depositPremiumPct: 100,
    lossRatio: 28.4,
    portfolioTransferIn: false,
    bordereau: 'quarterly',
    cancellationNotice: 90,
    governing: 'English Law',
    arbitration: 'London',
    interestedParties: 'All motor policyholders with SI > USD 50,000',
    reinstatements: 2,
    reinstatementPremiumPct: 100,
    reinsurers: [
      { name: 'Swiss Re', country: 'Switzerland', rating: 'AA-', share: 60, premium: 170400, contact: 'motor.africa@swissre.com', slipSigned: true },
      { name: 'Munich Re', country: 'Germany', rating: 'AA', share: 40, premium: 113600, contact: 'motor@munichre.com', slipSigned: false },
    ],
    lossesNotified: [],
    endorsements: [],
    notes: 'Per risk XOL. Two free reinstatements at 100% of annual premium pro-rata. Applies after QS net retention.',
  },
  {
    code: 'CAT-XOL-2026', type: 'Non-Proportional', subType: 'Catastrophe XOL', status: 'active',
    name: 'Catastrophe Excess of Loss 2026',
    classOfBusiness: 'Motor Insurance — All Classes',
    cedant: 'HELIX Motor Insurance', cedantCountry: 'Zimbabwe',
    inceptionDate: '2026-01-01', expiryDate: '2026-12-31',
    currency: 'USD',
    cessionPct: null, retentionPct: null,
    retentionAmount: 500000,
    layerFrom: 500000, layerTo: 5000000,
    riCommissionPct: 0, profitCommissionPct: 0,
    estimatedCedingPremium: null,
    actualCedingPremium: null,
    riPremium: 120000,
    riCommissionAmount: 0,
    minimumPremium: 110000,
    depositPremiumPct: 100,
    lossRatio: 0,
    portfolioTransferIn: false,
    bordereau: 'annual',
    cancellationNotice: 90,
    governing: 'English Law',
    arbitration: 'London',
    interestedParties: 'Motor fleet, commercial policyholders',
    reinstatements: 1,
    reinstatementPremiumPct: 100,
    reinsurers: [
      { name: "Lloyd's Syndicate 2623", country: 'United Kingdom', rating: 'A+', share: 70, premium: 84000, contact: 'motor@lloyds.com', slipSigned: true },
      { name: 'General Re', country: 'USA', rating: 'AA+', share: 30, premium: 36000, contact: 'africa@genre.com', slipSigned: true },
    ],
    lossesNotified: [],
    endorsements: [],
    notes: 'Catastrophe cover for accumulated losses arising from a single event (flood, hailstorm, civil commotion).',
  },
  {
    code: 'SL-MOT-2026', type: 'Non-Proportional', subType: 'Stop Loss', status: 'pending',
    name: 'Motor Stop Loss Treaty 2026',
    classOfBusiness: 'Motor Insurance — Private & Fleet',
    cedant: 'HELIX Motor Insurance', cedantCountry: 'Zimbabwe',
    inceptionDate: '2026-04-01', expiryDate: '2027-03-31',
    currency: 'USD',
    cessionPct: null, retentionPct: null,
    retentionAmount: null,
    layerFrom: null, layerTo: null,
    attachmentPoint: 75, exhaustionPoint: 105,
    riCommissionPct: 0, profitCommissionPct: 0,
    estimatedCedingPremium: null,
    actualCedingPremium: null,
    riPremium: 65000,
    riCommissionAmount: 0,
    minimumPremium: 60000,
    depositPremiumPct: 100,
    lossRatio: null,
    portfolioTransferIn: false,
    bordereau: 'annual',
    cancellationNotice: 90,
    governing: 'English Law',
    arbitration: 'London',
    interestedParties: 'Private and fleet motor policyholders',
    reinstatements: 0,
    reinsurers: [
      { name: 'Africa Re', country: 'Kenya', rating: 'A-', share: 100, premium: 65000, contact: 'reinsurance@africa-re.com', slipSigned: false },
    ],
    lossesNotified: [],
    endorsements: [],
    notes: 'Stop loss covering aggregate LR exceeding 75% up to 105% of net earned premium.',
  },
]

const FACULTIES = [
  {
    ref: 'FAC-2026-0041', policyRef: 'HLX-POL-004520', status: 'placed',
    insured: 'Econet Wireless Zimbabwe', vehicleClass: 'Fleet', vehicles: 28,
    makeModel: 'Toyota Hilux (x28)', sumInsured: 1200000, currency: 'USD',
    cover: 'Comprehensive', grossPremium: 42800,
    broker: 'Riskwise Brokers',
    reason: 'Sum insured exceeds QS treaty automatic acceptance limit of USD 800,000',
    requestDate: '2025-12-18', placedDate: '2025-12-22', inceptionDate: '2026-01-01',
    expiryDate: '2026-12-31',
    facCessionPct: 50, facCessionAmount: 600000,
    facPremium: 21400,
    reinsurers: [
      { name: 'Swiss Re', share: 60, premium: 12840, slipSigned: true, ref: 'SWR-FAC-2026-181' },
      { name: 'Africa Re', share: 40, premium: 8560, slipSigned: true, ref: 'AFR-FAC-2026-092' },
    ],
    slipIssued: true, slipRef: 'FAC-SLIP-2026-041',
    notes: 'Facultative placed due to fleet size and SI above treaty limit.',
    endorsements: [],
  },
  {
    ref: 'FAC-2026-0040', policyRef: 'HLX-POL-004516', status: 'placed',
    insured: 'Delta Beverages Ltd', vehicleClass: 'Commercial', vehicles: 52,
    makeModel: 'Mercedes-Benz Actros (x52)', sumInsured: 4800000, currency: 'USD',
    cover: 'Comprehensive', grossPremium: 98400,
    broker: 'Marsh Zimbabwe',
    reason: 'Large commercial fleet — high value heavy vehicles exceed treaty capacity',
    requestDate: '2025-02-08', placedDate: '2025-02-12', inceptionDate: '2025-02-15',
    expiryDate: '2026-02-14',
    facCessionPct: 60, facCessionAmount: 2880000,
    facPremium: 59040,
    reinsurers: [
      { name: 'Swiss Re', share: 50, premium: 29520, slipSigned: true, ref: 'SWR-FAC-2025-092' },
      { name: 'Munich Re', share: 30, premium: 17712, slipSigned: true, ref: 'MUN-FAC-2025-044' },
      { name: 'Africa Re', share: 20, premium: 11808, slipSigned: true, ref: 'AFR-FAC-2025-061' },
    ],
    slipIssued: true, slipRef: 'FAC-SLIP-2025-040',
    notes: 'Heavy commercial fleet. Speed governors and MixTelematics tracking mandatory per slip warranty.',
    endorsements: [
      { ref: 'FEND-001', date: '2025-05-10', desc: 'Fleet count corrected from 50 to 52 vehicles — premium adjustment USD +3,840' },
    ],
  },
  {
    ref: 'FAC-2026-0042', policyRef: 'HLX-POL-004521', status: 'pending',
    insured: 'CBZ Holdings Fleet', vehicleClass: 'Fleet', vehicles: 45,
    makeModel: 'Toyota Land Cruiser (x45)', sumInsured: 2250000, currency: 'USD',
    cover: 'Comprehensive', grossPremium: 81000,
    broker: 'Alexander Forbes',
    reason: 'Fleet SI USD 2.25m — exceeds QS treaty automatic acceptance limit',
    requestDate: '2026-02-20', placedDate: null, inceptionDate: '2026-03-01',
    expiryDate: '2027-02-28',
    facCessionPct: 55, facCessionAmount: 1237500,
    facPremium: 44550,
    reinsurers: [
      { name: 'Swiss Re', share: 60, premium: 26730, slipSigned: false, ref: null },
      { name: 'Munich Re', share: 40, premium: 17820, slipSigned: false, ref: null },
    ],
    slipIssued: false, slipRef: null,
    notes: 'Awaiting Swiss Re and Munich Re signed lines. Inception 1 March 2026.',
    endorsements: [],
  },
  {
    ref: 'FAC-2026-0039', policyRef: 'HLX-POL-004498', status: 'declined',
    insured: 'Hwange Colliery Transport', vehicleClass: 'Commercial', vehicles: 18,
    makeModel: 'Volvo FH16 Mining Trucks (x18)', sumInsured: 5400000, currency: 'USD',
    cover: 'Comprehensive', grossPremium: 162000,
    broker: 'AON Zimbabwe',
    reason: 'Mining use — high-risk classification requiring facultative placement',
    requestDate: '2026-01-15', placedDate: null, inceptionDate: null,
    expiryDate: null,
    facCessionPct: 70, facCessionAmount: 3780000,
    facPremium: 113400,
    reinsurers: [
      { name: 'Swiss Re', share: 100, premium: 113400, slipSigned: false, ref: null },
    ],
    slipIssued: false, slipRef: null,
    notes: "Declined by Swiss Re — mining/quarrying use excluded under their motor appetite. Exploring Lloyd's market.",
    endorsements: [],
  },
]

const BORDEREAU = [
  { policyRef: 'HLX-POL-004521', insured: 'Mrs. Rutendo Moyo',       class: 'Private',    gwp: 1240,  cedingPct: 65, cession: 806,   commission: 161.2,  treaty: 'QS-MOT-2026', month: '2026-01' },
  { policyRef: 'HLX-POL-004520', insured: 'Econet Wireless Zimbabwe', class: 'Fleet',      gwp: 42800, cedingPct: 65, cession: 27820, commission: 5564,   treaty: 'QS-MOT-2026', month: '2026-01', note: 'Balance after FAC' },
  { policyRef: 'HLX-POL-004519', insured: 'Mr. Tatenda Sibanda',     class: 'Private',    gwp: 680,   cedingPct: 65, cession: 442,   commission: 88.4,   treaty: 'QS-MOT-2026', month: '2026-01' },
  { policyRef: 'HLX-POL-004518', insured: 'Harare City Council',      class: 'PSV',        gwp: 8400,  cedingPct: 65, cession: 5460,  commission: 1092,   treaty: 'QS-MOT-2026', month: '2026-01' },
  { policyRef: 'HLX-POL-004517', insured: 'Mr. R. Chimhanda',        class: 'Private',    gwp: 2400,  cedingPct: 65, cession: 1560,  commission: 312,    treaty: 'QS-MOT-2026', month: '2026-01' },
  { policyRef: 'HLX-POL-004516', insured: 'Delta Beverages Ltd',     class: 'Commercial', gwp: 98400, cedingPct: 65, cession: 39360, commission: 7872,   treaty: 'QS-MOT-2026', month: '2026-01', note: 'Balance after FAC' },
]

const RI_MARKETS = [
  { name: 'Africa Re',              country: 'Kenya',          rating: 'A-',  type: 'Treaty / Fac' },
  { name: 'ZEP-RE',                 country: 'Kenya',          rating: 'B+',  type: 'Treaty' },
  { name: 'Swiss Re',               country: 'Switzerland',    rating: 'AA-', type: 'Treaty / Fac' },
  { name: 'Munich Re',              country: 'Germany',        rating: 'AA',  type: 'Treaty / Fac' },
  { name: "Lloyd's Syndicate 2623", country: 'United Kingdom', rating: 'A+',  type: 'Treaty / Fac' },
  { name: 'General Re',             country: 'USA',            rating: 'AA+', type: 'Treaty' },
  { name: 'Hannover Re',            country: 'Germany',        rating: 'AA-', type: 'Fac' },
  { name: 'SCOR',                   country: 'France',         rating: 'A+',  type: 'Fac' },
]

const STATUS_CFG = {
  active:   { label: 'Active',   color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-600/30', dot: 'bg-emerald-400' },
  pending:  { label: 'Pending',  color: 'text-amber-400',   bg: 'bg-amber-400/10',   border: 'border-amber-600/30',   dot: 'bg-amber-400'   },
  placed:   { label: 'Placed',   color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-600/30', dot: 'bg-emerald-400' },
  declined: { label: 'Declined', color: 'text-rose-400',    bg: 'bg-rose-400/10',    border: 'border-rose-600/30',    dot: 'bg-rose-400'    },
  lapsed:   { label: 'Lapsed',   color: 'text-slate-500',   bg: 'bg-slate-500/10',   border: 'border-slate-700/30',   dot: 'bg-slate-500'   },
}

const TREATY_TYPES = ['Proportional', 'Non-Proportional']
const TREATY_SUBTYPES = {
  Proportional: ['Quota Share', 'Surplus'],
  'Non-Proportional': ['Excess of Loss (Per Risk)', 'Catastrophe XOL', 'Stop Loss', 'Aggregate XOL'],
}

function fmt(v) { return (parseFloat(v) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
function fmtM(v) { const n = parseFloat(v) || 0; return n >= 1000000 ? `${(n/1000000).toFixed(2)}M` : n >= 1000 ? `${(n/1000).toFixed(0)}K` : fmt(n) }

const RI_COLORS = ['bg-helix-600', 'bg-blue-600', 'bg-emerald-600', 'bg-violet-600', 'bg-rose-600']
const RI_TEXT   = ['text-helix-400', 'text-blue-400', 'text-emerald-400', 'text-violet-400', 'text-rose-400']

function printTreatySlip(treaty) {
  const html = `<!DOCTYPE html><html><head><title>RI Slip — ${treaty.code}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;padding:30px;font-size:11px;line-height:1.7}
.hdr{display:flex;justify-content:space-between;padding-bottom:16px;border-bottom:3px solid #2563eb;margin-bottom:20px}
.logo{font-size:22px;font-weight:900;color:#0f172a;letter-spacing:-1px}.logo span{color:#2563eb}
.title{font-size:16px;font-weight:800;color:#0f172a;letter-spacing:-.5px}
.slip-type{font-size:11px;font-weight:700;color:#2563eb;text-transform:uppercase;letter-spacing:.1em;margin-top:2px}
.sec{margin-bottom:18px}
.sec-title{font-size:9px;font-weight:800;color:#2563eb;text-transform:uppercase;letter-spacing:.1em;border-left:3px solid #2563eb;padding-left:7px;margin-bottom:8px}
.row{display:flex;justify-content:space-between;border-bottom:1px solid #f1f5f9;padding:3.5px 0}
.lbl{color:#64748b;font-size:10px}.val{color:#1e293b;font-weight:500;font-size:10px;text-align:right}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}
.card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px}
.cert{margin-top:24px;padding:12px;border:1px dashed #cbd5e1;border-radius:6px;font-size:9.5px;color:#64748b;text-align:center}
.sig-area{display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;margin-top:32px}
.sig{border-top:1px solid #cbd5e1;padding-top:5px;font-size:9px;color:#94a3b8;line-height:1.9}
.footer{margin-top:20px;padding-top:10px;border-top:1px solid #e2e8f0;font-size:9px;color:#94a3b8;display:flex;justify-content:space-between}
table{width:100%;border-collapse:collapse}th{background:#2563eb;color:#fff;padding:6px 10px;text-align:left;font-size:8.5px;text-transform:uppercase;letter-spacing:.08em}td{padding:5px 10px;border-bottom:1px solid #f1f5f9;font-size:10px}
</style></head><body>
<div class="hdr">
  <div><div class="logo">HELIX<span>.</span></div><div style="font-size:9.5px;color:#94a3b8">Motor Insurance & Reinsurance System — Zimbabwe</div><div style="margin-top:8px"><div style="font-size:16px;font-weight:800;font-family:monospace;color:#2563eb">${treaty.code}</div></div></div>
  <div style="text-align:right"><div class="title">REINSURANCE PLACEMENT SLIP</div><div class="slip-type">${treaty.subType}</div><div style="font-size:9.5px;color:#94a3b8;margin-top:4px">Prepared: ${new Date().toLocaleDateString('en-GB')}</div></div>
</div>
<div class="grid2">
  <div class="card"><div class="sec-title">Treaty Particulars</div>
  ${[['Treaty Name', treaty.name],['Treaty Code', treaty.code],['Type', treaty.type],['Sub-Type', treaty.subType],['Class of Business', treaty.classOfBusiness],['Currency', treaty.currency],['Cedant', treaty.cedant],['Cedant Country', treaty.cedantCountry]].map(([l,v])=>`<div class="row"><span class="lbl">${l}</span><span class="val">${v||'—'}</span></div>`).join('')}
  </div>
  <div class="card"><div class="sec-title">Period & Financial</div>
  ${[['Inception Date', treaty.inceptionDate],['Expiry Date', treaty.expiryDate],['Cancellation Notice', `${treaty.cancellationNotice} days`],
    ...(treaty.cessionPct ? [['Cession Rate', `${treaty.cessionPct}%`],['Retention Rate', `${treaty.retentionPct}%`]] : []),
    ...(treaty.retentionAmount ? [['Retention (Per Risk)', `USD ${fmt(treaty.retentionAmount)}`]] : []),
    ...(treaty.layerFrom ? [['Layer', `USD ${fmt(treaty.layerFrom)} xs USD ${fmt(treaty.layerTo)}`]] : []),
    ...(treaty.attachmentPoint ? [['Attachment Point', `${treaty.attachmentPoint}% LR`],['Exhaustion Point', `${treaty.exhaustionPoint}% LR`]] : []),
    ['RI Premium (Annual)', `USD ${fmt(treaty.riPremium)}`],
    ...(treaty.riCommissionPct ? [['RI Commission', `${treaty.riCommissionPct}%`]] : []),
    ...(treaty.reinstatements > 0 ? [['Reinstatements', `${treaty.reinstatements} @ ${treaty.reinstatementPremiumPct}%`]] : []),
    ['Governing Law', treaty.governing],['Arbitration', treaty.arbitration]
  ].map(([l,v])=>`<div class="row"><span class="lbl">${l}</span><span class="val">${v||'—'}</span></div>`).join('')}
  </div>
</div>
<div class="sec"><div class="sec-title">Reinsurer Lines & Shares</div>
<table><thead><tr><th>Reinsurer</th><th>Country</th><th>Rating</th><th>Share %</th><th>Premium (USD)</th><th>Slip Signed</th></tr></thead><tbody>
${treaty.reinsurers.map(r=>`<tr><td style="font-weight:600">${r.name}</td><td>${r.country}</td><td style="font-family:monospace;color:#2563eb">${r.rating}</td><td style="font-family:monospace;font-weight:700">${r.share}%</td><td style="font-family:monospace;color:#047857">USD ${fmt(r.premium)}</td><td style="color:${r.slipSigned?'#047857':'#dc2626'}">${r.slipSigned?'✓ Signed':'Pending'}</td></tr>`).join('')}
<tr style="background:#eff6ff;font-weight:700"><td colspan="3">TOTAL</td><td>100%</td><td style="font-family:monospace;color:#047857">USD ${fmt(treaty.riPremium)}</td><td></td></tr>
</tbody></table></div>
${treaty.notes ? `<div class="sec"><div class="sec-title">Notes & Conditions</div><div class="card" style="color:#475569;font-size:10.5px">${treaty.notes}</div></div>` : ''}
${treaty.lossesNotified.length > 0 ? `<div class="sec"><div class="sec-title">Losses Notified</div><table><thead><tr><th>Ref</th><th>Date</th><th>Insured</th><th>Amount (USD)</th><th>Status</th></tr></thead><tbody>${treaty.lossesNotified.map(l=>`<tr><td>${l.ref}</td><td>${l.date}</td><td>${l.insured}</td><td style="font-family:monospace">${fmt(l.amount)}</td><td>${l.status}</td></tr>`).join('')}</tbody></table></div>` : ''}
<div class="cert">This slip constitutes the agreement between the cedant and reinsurers pending issue of the formal treaty wording. All parties agree to be bound by the terms herein.</div>
<div class="sig-area">
  <div><div class="sig"><strong>Cedant Representative</strong><br>${treaty.cedant}<br><br>Signature: _____________<br>Date: _________________</div></div>
  <div><div class="sig"><strong>Lead Reinsurer</strong><br>${treaty.reinsurers[0]?.name || '—'}<br><br>Signature: _____________<br>Date: _________________</div></div>
  <div><div class="sig"><strong>Reinsurance Broker</strong><br>(If applicable)<br><br>Signature: _____________<br>Date: _________________</div></div>
</div>
<div class="footer"><span>HELIX Motor Insurance & Reinsurance System — Computer generated document</span><span>${treaty.code} | Generated: ${new Date().toLocaleDateString('en-GB')}</span></div>
</body></html>`
  const w = window.open('', '_blank', 'width=1060,height=820')
  w.document.write(html); w.document.close(); w.focus()
  setTimeout(() => w.print(), 600)
}

function printFacSlip(fac) {
  const html = `<!DOCTYPE html><html><head><title>Fac Slip — ${fac.ref}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;padding:30px;font-size:11px;line-height:1.7}
.hdr{display:flex;justify-content:space-between;padding-bottom:16px;border-bottom:3px solid #7c3aed;margin-bottom:20px}
.logo{font-size:22px;font-weight:900;color:#0f172a;letter-spacing:-1px}.logo span{color:#7c3aed}
.sec-title{font-size:9px;font-weight:800;color:#7c3aed;text-transform:uppercase;letter-spacing:.1em;border-left:3px solid #7c3aed;padding-left:7px;margin-bottom:8px}
.row{display:flex;justify-content:space-between;border-bottom:1px solid #f1f5f9;padding:3.5px 0}
.lbl{color:#64748b;font-size:10px}.val{color:#1e293b;font-weight:500;font-size:10px;text-align:right}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px}
.card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px}
.prem-box{background:#f5f3ff;border:2px solid #c4b5fd;border-radius:8px;padding:14px;text-align:center;margin-top:10px}
.prem-val{font-size:22px;font-weight:900;color:#6d28d9;font-family:monospace}
table{width:100%;border-collapse:collapse}th{background:#7c3aed;color:#fff;padding:6px 10px;text-align:left;font-size:8.5px;text-transform:uppercase;letter-spacing:.08em}td{padding:5px 10px;border-bottom:1px solid #f1f5f9;font-size:10px}
.sig-area{display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;margin-top:32px}
.sig{border-top:1px solid #cbd5e1;padding-top:5px;font-size:9px;color:#94a3b8;line-height:1.9}
.footer{margin-top:20px;padding-top:10px;border-top:1px solid #e2e8f0;font-size:9px;color:#94a3b8;display:flex;justify-content:space-between}
</style></head><body>
<div class="hdr">
  <div><div class="logo">HELIX<span>.</span></div><div style="font-size:9.5px;color:#94a3b8">Motor Insurance & Reinsurance System</div><div style="margin-top:8px;font-size:15px;font-weight:800;font-family:monospace;color:#7c3aed">${fac.ref}</div></div>
  <div style="text-align:right"><div style="font-size:16px;font-weight:800;color:#0f172a">FACULTATIVE PLACEMENT SLIP</div><div style="font-size:10px;color:#94a3b8;margin-top:4px">Policy Ref: ${fac.policyRef}</div><div style="font-size:10px;color:#94a3b8">Prepared: ${new Date().toLocaleDateString('en-GB')}</div></div>
</div>
<div class="grid2">
  <div class="card"><div class="sec-title">Risk Details</div>
  ${[['Insured', fac.insured],['Vehicle Class', fac.vehicleClass],['Vehicle(s)', fac.makeModel],['No. of Vehicles', fac.vehicles],['Cover Type', fac.cover],['Sum Insured', `${fac.currency} ${fmt(fac.sumInsured)}`],['Gross Premium', `${fac.currency} ${fmt(fac.grossPremium)}`],['Inception Date', fac.inceptionDate],['Expiry Date', fac.expiryDate]].map(([l,v])=>`<div class="row"><span class="lbl">${l}</span><span class="val">${v||'—'}</span></div>`).join('')}
  </div>
  <div class="card"><div class="sec-title">Facultative Terms</div>
  ${[['FAC Cession %', `${fac.facCessionPct}%`],['FAC Cession Amount', `${fac.currency} ${fmt(fac.facCessionAmount)}`],['FAC Premium', `${fac.currency} ${fmt(fac.facPremium)}`],['Original Broker', fac.broker],['FAC Reason', fac.reason],['Request Date', fac.requestDate],['Placed Date', fac.placedDate || 'Pending'],['Slip Reference', fac.slipRef || 'Pending']].map(([l,v])=>`<div class="row"><span class="lbl">${l}</span><span class="val">${v||'—'}</span></div>`).join('')}
  <div class="prem-box"><div style="font-size:9px;color:#6d28d9;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px">FAC Premium</div><div class="prem-val">${fac.currency} ${fmt(fac.facPremium)}</div></div>
  </div>
</div>
<div style="margin-bottom:18px"><div class="sec-title">Reinsurer Lines</div>
<table><thead><tr><th>Reinsurer</th><th>Share %</th><th>Premium (USD)</th><th>Slip Ref</th><th>Status</th></tr></thead><tbody>
${fac.reinsurers.map(r=>`<tr><td style="font-weight:600">${r.name}</td><td style="font-family:monospace;font-weight:700">${r.share}%</td><td style="font-family:monospace;color:#047857">USD ${fmt(r.premium)}</td><td style="font-family:monospace">${r.ref||'—'}</td><td style="color:${r.slipSigned?'#047857':'#dc2626'}">${r.slipSigned?'✓ Signed':'Pending'}</td></tr>`).join('')}
<tr style="background:#f5f3ff;font-weight:700"><td>TOTAL</td><td>100%</td><td style="font-family:monospace;color:#047857">USD ${fmt(fac.facPremium)}</td><td colspan="2"></td></tr>
</tbody></table></div>
${fac.notes ? `<div class="card" style="margin-bottom:18px;color:#475569;font-size:10.5px"><strong>Notes:</strong> ${fac.notes}</div>` : ''}
${fac.endorsements.length > 0 ? `<div class="sec-title">Endorsements</div><table><thead><tr><th>Ref</th><th>Date</th><th>Description</th></tr></thead><tbody>${fac.endorsements.map(e=>`<tr><td>${e.ref}</td><td>${e.date}</td><td>${e.desc}</td></tr>`).join('')}</tbody></table>` : ''}
<div style="margin-top:12px;padding:10px;border:1px dashed #c4b5fd;border-radius:6px;font-size:9.5px;color:#64748b;text-align:center">This facultative placement slip constitutes the agreement between cedant and accepting reinsurer(s) pending formal treaty documentation.</div>
<div class="sig-area">
  <div><div class="sig"><strong>Cedant (Ceding)</strong><br>HELIX Motor Insurance<br><br>Signature: _____________<br>Date: _________________</div></div>
  <div><div class="sig"><strong>Lead Reinsurer</strong><br>${fac.reinsurers[0]?.name || '—'}<br><br>Signature: _____________<br>Date: _________________</div></div>
  <div><div class="sig"><strong>Following Reinsurer(s)</strong><br>${fac.reinsurers.slice(1).map(r=>r.name).join(', ')||'N/A'}<br><br>Signature: _____________<br>Date: _________________</div></div>
</div>
<div class="footer"><span>HELIX Motor Insurance & Reinsurance System — Facultative Placement</span><span>${fac.ref} | ${new Date().toLocaleDateString('en-GB')}</span></div>
</body></html>`
  const w = window.open('', '_blank', 'width=1060,height=820')
  w.document.write(html); w.document.close(); w.focus()
  setTimeout(() => w.print(), 600)
}

function exportBordereau(data) {
  const headers = ['Policy Ref', 'Insured', 'Class', 'GWP (USD)', 'Ceding %', 'RI Cession (USD)', 'RI Commission (USD)', 'Treaty', 'Month', 'Notes']
  const rows = data.map(b => [b.policyRef, b.insured, b.class, b.gwp, b.cedingPct + '%', b.cession, b.commission, b.treaty, b.month, b.note || ''].map(v => `"${v}"`).join(','))
  const totals = [`"TOTAL","","","${data.reduce((a,b)=>a+b.gwp,0)}","","${data.reduce((a,b)=>a+b.cession,0).toFixed(2)}","${data.reduce((a,b)=>a+b.commission,0).toFixed(2)}","","",""`]
  const csv = [headers.join(','), ...rows, ...totals].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = 'bordereau-feb-2026.csv'; a.click()
  URL.revokeObjectURL(url)
}

function StatusBadge({ status }) {
  const s = STATUS_CFG[status] || STATUS_CFG.pending
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border whitespace-nowrap ${s.bg} ${s.color} ${s.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
    </span>
  )
}
function Panel({ children, className = '' }) {
  return <div className={`p-4 bg-slate-800/30 rounded-xl border border-slate-700/40 ${className}`}>{children}</div>
}
function SecHead({ children, sub, icon: Icon }) {
  return (
    <div className="mb-4 pb-2 border-b border-slate-800/50 flex items-center gap-2">
      {Icon && <Icon size={12} className="text-helix-500 flex-shrink-0" />}
      <div>
        <div className="text-[9.5px] font-bold uppercase tracking-widest text-slate-400">{children}</div>
        {sub && <div className="text-[10px] text-slate-600 mt-0.5">{sub}</div>}
      </div>
    </div>
  )
}
function KV({ label, value, mono, hi, className = '' }) {
  return (
    <div className={`flex justify-between items-baseline gap-4 py-1.5 border-b border-slate-800/20 last:border-0 ${className}`}>
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

function ShareBar({ reinsurers }) {
  return (
    <div>
      <div className="flex h-3 rounded-full overflow-hidden mb-2">
        {reinsurers.map((r, i) => (
          <div key={i} className={`h-full ${RI_COLORS[i % RI_COLORS.length]} transition-all`} style={{ width: `${r.share}%` }} title={`${r.name}: ${r.share}%`} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {reinsurers.map((r, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-sm ${RI_COLORS[i % RI_COLORS.length]}`} />
            <span className={`text-[10px] ${RI_TEXT[i % RI_TEXT.length]}`}>{r.name}: {r.share}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TreatyDetail({ treaty, onClose }) {
  const [tab, setTab] = useState('terms')
  const tabs = ['terms', 'reinsurers', 'losses', 'endorsements']
  const totalSigned = treaty.reinsurers.filter(r => r.slipSigned).reduce((a, r) => a + r.share, 0)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(2,6,23,0.92)' }}>
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col glass rounded-2xl border border-slate-700/40 overflow-hidden">
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-800/50 flex-shrink-0">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-helix-600/20 border border-helix-600/30 flex items-center justify-center flex-shrink-0">
              <GitBranch size={18} className="text-helix-400" />
            </div>
            <div>
              <div className="font-mono text-helix-400 text-xs mb-0.5 tracking-wider">{treaty.code}</div>
              <div className="font-display text-xl font-bold text-white">{treaty.name}</div>
              <div className="flex items-center gap-2 mt-1.5">
                <StatusBadge status={treaty.status} />
                <span className="text-xs text-slate-600 px-2 py-0.5 rounded bg-slate-800">{treaty.type}</span>
                <span className="text-xs text-slate-600 px-2 py-0.5 rounded bg-slate-800">{treaty.subType}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => printTreatySlip(treaty)} className="flex items-center gap-1.5 px-3 py-1.5 glass-light text-slate-300 rounded-lg text-xs border border-slate-700 hover:text-white transition-colors">
              <Printer size={12} /> Print Slip
            </button>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-200 transition-colors"><X size={16} /></button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 px-6 py-4 border-b border-slate-800/50 flex-shrink-0">
          {[
            { label: 'RI Premium', value: `USD ${fmtM(treaty.riPremium)}`, color: 'text-helix-300' },
            { label: treaty.cessionPct ? 'Cession Rate' : treaty.retentionAmount ? 'Retention' : 'Attach Point',
              value: treaty.cessionPct ? `${treaty.cessionPct}%` : treaty.retentionAmount ? `USD ${fmtM(treaty.retentionAmount)}` : `${treaty.attachmentPoint}% LR`,
              color: 'text-violet-400' },
            { label: 'Signed Lines', value: `${totalSigned}%`, color: totalSigned < 100 ? 'text-amber-400' : 'text-emerald-400' },
            { label: 'Loss Ratio', value: treaty.lossRatio != null ? `${treaty.lossRatio}%` : 'N/A', color: treaty.lossRatio > 65 ? 'text-rose-400' : 'text-emerald-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-3 bg-slate-800/30 rounded-xl border border-slate-700/30">
              <div className="text-[9.5px] text-slate-500 uppercase tracking-wide mb-1">{label}</div>
              <div className={`text-base font-bold ${color}`}>{value}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-1 px-6 pt-3 border-b border-slate-800/50 flex-shrink-0">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-colors capitalize whitespace-nowrap ${tab === t ? 'bg-helix-600/20 text-helix-300 border-b-2 border-helix-500' : 'text-slate-500 hover:text-slate-300'}`}>
              {t === 'losses' ? `Losses Notified (${treaty.lossesNotified.length})` : t}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {tab === 'terms' && (
            <div className="grid grid-cols-2 gap-4">
              <Panel>
                <SecHead icon={FileText}>Treaty Particulars</SecHead>
                <KV label="Treaty Name" value={treaty.name} />
                <KV label="Treaty Code" value={treaty.code} mono />
                <KV label="Type" value={treaty.type} />
                <KV label="Sub-Type" value={treaty.subType} />
                <KV label="Class of Business" value={treaty.classOfBusiness} />
                <KV label="Cedant" value={treaty.cedant} />
                <KV label="Cedant Country" value={treaty.cedantCountry} />
                <KV label="Currency" value={treaty.currency} />
                <KV label="Inception Date" value={treaty.inceptionDate} />
                <KV label="Expiry Date" value={treaty.expiryDate} />
                <KV label="Cancellation Notice" value={`${treaty.cancellationNotice} days`} />
                <KV label="Governing Law" value={treaty.governing} />
                <KV label="Arbitration" value={treaty.arbitration} />
                <KV label="Bordereau Frequency" value={treaty.bordereau} />
              </Panel>
              <div className="space-y-4">
                <Panel>
                  <SecHead icon={Percent}>Financial Terms</SecHead>
                  {treaty.cessionPct && <><KV label="Cession Rate" value={`${treaty.cessionPct}%`} /><KV label="Retention Rate" value={`${treaty.retentionPct}%`} /><KV label="Est. Ceding Premium" value={`USD ${fmt(treaty.estimatedCedingPremium)}`} /><KV label="Actual Ceding Premium" value={`USD ${fmt(treaty.actualCedingPremium)}`} /></>}
                  {treaty.retentionAmount && <KV label="Retention (Per Risk)" value={`USD ${fmt(treaty.retentionAmount)}`} />}
                  {treaty.layerFrom && <KV label="Layer" value={`USD ${fmt(treaty.layerFrom)} xs USD ${fmt(treaty.layerTo)}`} />}
                  {treaty.attachmentPoint && <><KV label="Attachment Point" value={`${treaty.attachmentPoint}% Loss Ratio`} /><KV label="Exhaustion Point" value={`${treaty.exhaustionPoint}% Loss Ratio`} /></>}
                  <KV label="RI Premium (Annual)" value={`USD ${fmt(treaty.riPremium)}`} hi />
                  {treaty.riCommissionPct > 0 && <><KV label="RI Commission Rate" value={`${treaty.riCommissionPct}%`} /><KV label="RI Commission Amount" value={`USD ${fmt(treaty.riCommissionAmount)}`} /></>}
                  {treaty.profitCommissionPct > 0 && <><KV label="Profit Commission" value={`${treaty.profitCommissionPct}%`} /><KV label="Profit Comm. Threshold" value={`LR < ${treaty.profitCommissionThreshold}%`} /></>}
                  {treaty.reinstatements > 0 && <KV label="Reinstatements" value={`${treaty.reinstatements} @ ${treaty.reinstatementPremiumPct}%`} />}
                  <KV label="Minimum Premium" value={`USD ${fmt(treaty.minimumPremium)}`} />
                  <KV label="Deposit Premium" value={`${treaty.depositPremiumPct}% of annual`} />
                </Panel>
                {treaty.notes && <Panel><SecHead>Notes & Conditions</SecHead><p className="text-xs text-slate-400 leading-relaxed">{treaty.notes}</p></Panel>}
              </div>
            </div>
          )}
          {tab === 'reinsurers' && (
            <div className="space-y-4">
              <Panel><SecHead icon={Building2}>Share Distribution</SecHead><ShareBar reinsurers={treaty.reinsurers} /></Panel>
              <div className="grid gap-3">
                {treaty.reinsurers.map((r, i) => (
                  <Panel key={i}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl ${RI_COLORS[i % RI_COLORS.length]}/20 border ${RI_COLORS[i % RI_COLORS.length].replace('bg-', 'border-')}/30 flex items-center justify-center flex-shrink-0`}>
                          <span className={`font-bold text-sm ${RI_TEXT[i % RI_TEXT.length]}`}>{r.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-200 text-sm">{r.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{r.country}</div>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-helix-400">Rating: {r.rating}</span>
                            {r.slipSigned ? <span className="text-xs text-emerald-400 flex items-center gap-1"><CheckCircle size={11} /> Slip Signed</span> : <span className="text-xs text-amber-400 flex items-center gap-1"><Clock size={11} /> Awaiting Signature</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-mono font-bold text-lg ${RI_TEXT[i % RI_TEXT.length]}`}>{r.share}%</div>
                        <div className="text-xs text-slate-500 mt-0.5">USD {fmt(r.premium)}</div>
                        <div className="text-[10px] text-slate-600 mt-0.5">{r.contact}</div>
                      </div>
                    </div>
                    <div className="mt-3"><div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className={`h-full ${RI_COLORS[i % RI_COLORS.length]} rounded-full`} style={{ width: `${r.share}%` }} /></div></div>
                  </Panel>
                ))}
                <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-700/30 flex justify-between items-center">
                  <span className="text-xs text-slate-500">Total Lines Signed / Total</span>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono font-bold ${totalSigned >= 100 ? 'text-emerald-400' : 'text-amber-400'}`}>{totalSigned}% / 100%</span>
                    {totalSigned < 100 && <span className="text-xs text-amber-400 flex items-center gap-1"><AlertTriangle size={11} />{100 - totalSigned}% unsigned</span>}
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab === 'losses' && (
            <div>
              {treaty.lossesNotified.length === 0
                ? <div className="text-center py-12 text-slate-600 text-sm">No losses notified under this treaty.</div>
                : <div className="space-y-3">{treaty.lossesNotified.map((l, i) => (<Panel key={i}><div className="flex justify-between items-start"><div><div className="font-mono text-xs text-helix-400">{l.ref}</div><div className="font-semibold text-slate-200 text-sm mt-1">{l.insured}</div><div className="text-xs text-slate-500 mt-0.5">{l.date}</div></div><div className="text-right"><div className="font-mono font-bold text-rose-400">USD {fmt(l.amount)}</div><span className="text-xs px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-600/30 mt-1 inline-block">{l.status}</span></div></div></Panel>))}</div>
              }
            </div>
          )}
          {tab === 'endorsements' && (
            <div>
              {treaty.endorsements.length === 0
                ? <div className="text-center py-12 text-slate-600 text-sm">No endorsements on this treaty.</div>
                : <div className="space-y-3">{treaty.endorsements.map((e, i) => (<Panel key={i}><div className="flex justify-between items-start"><div><div className="font-mono text-xs text-helix-400">{e.ref}</div><div className="text-sm text-slate-300 mt-1">{e.desc}</div></div><div className="text-xs text-slate-500">{e.date}</div></div></Panel>))}</div>
              }
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800/50 flex-shrink-0">
          <div className="text-[10px] text-slate-600 font-mono">{treaty.code} | {treaty.inceptionDate} — {treaty.expiryDate}</div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 glass-light text-slate-400 rounded-lg text-xs border border-slate-700 hover:text-slate-200 transition-colors"><Copy size={12} /> Copy Code</button>
            <button onClick={() => printTreatySlip(treaty)} className="flex items-center gap-1.5 px-4 py-1.5 bg-helix-600 hover:bg-helix-500 text-white rounded-lg text-xs font-semibold transition-colors"><Printer size={12} /> Print Treaty Slip</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FacDetail({ fac, onClose }) {
  const totalSigned = fac.reinsurers.filter(r => r.slipSigned).reduce((a, r) => a + r.share, 0)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(2,6,23,0.92)' }}>
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col glass rounded-2xl border border-slate-700/40 overflow-hidden">
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-800/50 flex-shrink-0">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-600/30 flex items-center justify-center flex-shrink-0">
              <Layers size={18} className="text-violet-400" />
            </div>
            <div>
              <div className="font-mono text-violet-400 text-xs mb-0.5">{fac.ref}</div>
              <div className="font-display text-xl font-bold text-white">{fac.insured}</div>
              <div className="flex items-center gap-2 mt-1.5">
                <StatusBadge status={fac.status} />
                <span className="text-xs text-slate-600">{fac.vehicleClass}</span>
                <span className="text-xs text-slate-600">•</span>
                <span className="text-xs text-slate-600">{fac.policyRef}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => printFacSlip(fac)} className="flex items-center gap-1.5 px-3 py-1.5 glass-light text-slate-300 rounded-lg text-xs border border-slate-700 hover:text-white transition-colors"><Printer size={12} /> Print Slip</button>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-200 transition-colors"><X size={16} /></button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 px-6 py-4 border-b border-slate-800/50 flex-shrink-0">
          {[
            { label: 'Sum Insured', value: `USD ${fmtM(fac.sumInsured)}`, color: 'text-slate-200' },
            { label: 'FAC Cession', value: `USD ${fmtM(fac.facCessionAmount)} (${fac.facCessionPct}%)`, color: 'text-violet-400' },
            { label: 'FAC Premium', value: `USD ${fmt(fac.facPremium)}`, color: 'text-emerald-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-3 bg-slate-800/30 rounded-xl border border-slate-700/30">
              <div className="text-[9.5px] text-slate-500 uppercase tracking-wide mb-1">{label}</div>
              <div className={`text-sm font-bold ${color}`}>{value}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Panel>
              <SecHead icon={Shield}>Risk Details</SecHead>
              <KV label="Insured" value={fac.insured} /><KV label="Policy Reference" value={fac.policyRef} mono /><KV label="Vehicle Class" value={fac.vehicleClass} /><KV label="Vehicle(s)" value={fac.makeModel} /><KV label="No. of Vehicles" value={fac.vehicles} /><KV label="Cover Type" value={fac.cover} /><KV label="Sum Insured" value={`USD ${fmt(fac.sumInsured)}`} /><KV label="Gross Premium" value={`USD ${fmt(fac.grossPremium)}`} /><KV label="Original Broker" value={fac.broker} />
            </Panel>
            <Panel>
              <SecHead icon={FileText}>Facultative Terms</SecHead>
              <KV label="FAC Cession %" value={`${fac.facCessionPct}%`} /><KV label="FAC Cession Amount" value={`USD ${fmt(fac.facCessionAmount)}`} /><KV label="FAC Premium" value={`USD ${fmt(fac.facPremium)}`} hi /><KV label="Inception Date" value={fac.inceptionDate || '—'} /><KV label="Expiry Date" value={fac.expiryDate || '—'} /><KV label="Request Date" value={fac.requestDate} /><KV label="Placed Date" value={fac.placedDate || 'Pending'} /><KV label="FAC Slip Ref." value={fac.slipRef || 'Not yet issued'} mono />
            </Panel>
          </div>
          <Panel>
            <SecHead icon={Building2}>Facultative Reinsurer Lines</SecHead>
            <ShareBar reinsurers={fac.reinsurers} />
            <div className="mt-4 space-y-2">
              {fac.reinsurers.map((r, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800/30 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-sm ${RI_COLORS[i % RI_COLORS.length]}`} />
                    <span className="text-sm text-slate-300 font-medium">{r.name}</span>
                    {r.slipSigned ? <span className="text-[10px] text-emerald-400 flex items-center gap-1"><CheckCircle size={10} /> Signed — {r.ref}</span> : <span className="text-[10px] text-amber-400 flex items-center gap-1"><Clock size={10} /> Awaiting signature</span>}
                  </div>
                  <div className="text-right">
                    <div className={`font-mono font-bold text-sm ${RI_TEXT[i % RI_TEXT.length]}`}>{r.share}%</div>
                    <div className="text-xs text-slate-500">USD {fmt(r.premium)}</div>
                  </div>
                </div>
              ))}
            </div>
            {totalSigned < 100 && <div className="mt-3 flex items-center gap-2 text-xs text-amber-400"><AlertTriangle size={12} />{100 - totalSigned}% of lines still unsigned</div>}
          </Panel>
          <Panel>
            <SecHead>Facultative Reason</SecHead>
            <p className="text-xs text-slate-400">{fac.reason}</p>
            {fac.notes && <p className="text-xs text-slate-500 mt-2 border-t border-slate-800/40 pt-2">{fac.notes}</p>}
          </Panel>
          {fac.endorsements.length > 0 && (
            <Panel>
              <SecHead icon={Edit3}>Endorsements</SecHead>
              {fac.endorsements.map((e, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-slate-800/30 last:border-0">
                  <div><div className="font-mono text-xs text-violet-400">{e.ref}</div><div className="text-xs text-slate-300 mt-0.5">{e.desc}</div></div>
                  <div className="text-xs text-slate-500 flex-shrink-0 ml-4">{e.date}</div>
                </div>
              ))}
            </Panel>
          )}
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800/50 flex-shrink-0">
          <div className="text-[10px] text-slate-600 font-mono">{fac.ref} | Policy: {fac.policyRef}</div>
          <button onClick={() => printFacSlip(fac)} className="flex items-center gap-1.5 px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold transition-colors"><Printer size={12} /> Print Fac Slip</button>
        </div>
      </div>
    </div>
  )
}

const treatyDefault = {
  name: '', code: '', type: 'Proportional', subType: 'Quota Share',
  classOfBusiness: 'Motor Insurance — All Classes', cedant: 'HELIX Motor Insurance',
  cedantCountry: 'Zimbabwe', inceptionDate: '', expiryDate: '', currency: 'USD',
  cessionPct: '', retentionPct: '', retentionAmount: '', layerFrom: '', layerTo: '',
  attachmentPoint: '', exhaustionPoint: '',
  riCommissionPct: '', profitCommissionPct: '', profitCommissionThreshold: '80',
  estimatedCedingPremium: '', riPremium: '', minimumPremium: '', depositPremiumPct: '80',
  reinstatements: '0', reinstatementPremiumPct: '100',
  cancellationNotice: '90', governing: 'English Law', arbitration: 'London',
  bordereau: 'monthly', notes: '',
  reinsurers: [{ name: '', country: '', rating: '', share: '', premium: '' }],
}

const TREATY_STEPS = [
  { id: 1, label: 'Treaty Type',     desc: 'Classification and identification' },
  { id: 2, label: 'Financial Terms', desc: 'Cession, retention and premium' },
  { id: 3, label: 'Reinsurer Panel', desc: 'Add reinsurers and signed lines' },
  { id: 4, label: 'Conditions',      desc: 'Commission, bordereau and clauses' },
  { id: 5, label: 'Review & Place',  desc: 'Final confirmation' },
]

function NewTreatyWizard({ onClose, onSave }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(treatyDefault)
  const [done, setDone] = useState(false)
  const [newCode, setNewCode] = useState('')
  const set = fn => setForm(prev => fn(prev))
  const isProportional = form.type === 'Proportional'
  const isXOL = form.subType.includes('Excess of Loss') || form.subType.includes('Catastrophe')
  const isStopLoss = form.subType === 'Stop Loss'
  const handlePlace = () => {
    const code = `${isProportional ? 'QS' : 'XOL'}-MOT-${new Date().getFullYear()}-${String(Math.floor(Math.random()*900)+100)}`
    setNewCode(code); setDone(true)
    onSave && onSave({ ...form, code, status: 'pending' })
  }
  const addRI = () => set(f => ({ ...f, reinsurers: [...f.reinsurers, { name: '', country: '', rating: '', share: '', premium: '' }] }))
  const removeRI = i => set(f => ({ ...f, reinsurers: f.reinsurers.filter((_, j) => j !== i) }))
  const setRI = (i, k, v) => set(f => ({ ...f, reinsurers: f.reinsurers.map((r, j) => j === i ? { ...r, [k]: v } : r) }))
  const totalShare = form.reinsurers.reduce((a, r) => a + (parseFloat(r.share) || 0), 0)
  return (
    <div className="fixed inset-0 z-[60] flex" style={{ background: 'rgba(2,6,23,0.97)' }}>
      <div className="w-56 border-r border-slate-800/50 flex flex-col glass min-h-screen flex-shrink-0">
        <div className="px-5 py-5 border-b border-slate-800/50">
          <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">Treaty Placement Wizard</div>
          <div className="font-display text-base font-bold text-white leading-tight">New Reinsurance<br />Treaty</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {TREATY_STEPS.map(s => {
            const d = step > s.id; const a = step === s.id
            return (
              <button key={s.id} onClick={() => d && setStep(s.id)}
                className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all ${a ? 'bg-helix-600/20 border border-helix-600/30' : d ? 'hover:bg-slate-800/40 cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5 ${a ? 'bg-helix-600 text-white' : d ? 'bg-emerald-600/20 text-emerald-400' : 'bg-slate-800 text-slate-600'}`}>{d ? '✓' : s.id}</div>
                <div>
                  <div className={`text-[11px] font-semibold ${a ? 'text-helix-300' : d ? 'text-slate-300' : 'text-slate-600'}`}>{s.label}</div>
                  <div className="text-[9.5px] text-slate-700 mt-0.5">{s.desc}</div>
                </div>
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-800/50">
          <button onClick={onClose} className="w-full flex items-center gap-2 text-slate-600 hover:text-slate-400 text-xs rounded-lg py-2 px-2 hover:bg-slate-800/40 transition-colors"><X size={12} /> Cancel</button>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-8 py-4 border-b border-slate-800/50 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="text-xs text-slate-500">Step {step} of {TREATY_STEPS.length} — {TREATY_STEPS[step-1].label}</div>
            <div className="text-slate-200 font-semibold text-sm mt-0.5">{TREATY_STEPS[step-1].desc}</div>
          </div>
          <div className="flex gap-1">{TREATY_STEPS.map(s => (<div key={s.id} className={`h-1.5 rounded-full transition-all ${s.id < step ? 'bg-emerald-500 w-7' : s.id === step ? 'bg-helix-500 w-9' : 'bg-slate-800 w-5'}`} />))}</div>
        </div>
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {done ? (
            <div className="max-w-md mx-auto text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5"><CheckCircle size={30} className="text-emerald-400" /></div>
              <h2 className="font-display text-2xl text-white mb-2">Treaty Created!</h2>
              <p className="text-slate-400 mb-1">Code: <span className="font-mono text-helix-400">{newCode}</span></p>
              <p className="text-slate-500 text-sm mb-6">{form.name} — Status: Pending placement</p>
              <button onClick={onClose} className="px-6 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors">Back to Treaties</button>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {step === 1 && (
                <Panel>
                  <SecHead>Treaty Identification</SecHead>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2"><Field label="Treaty Name" required><Inp value={form.name} onChange={e => set(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Quota Share Motor Treaty 2026" /></Field></div>
                    <Field label="Treaty Type" required><Sel value={form.type} onChange={e => set(f => ({ ...f, type: e.target.value, subType: TREATY_SUBTYPES[e.target.value][0] }))}>{TREATY_TYPES.map(t => <option key={t}>{t}</option>)}</Sel></Field>
                    <Field label="Sub-Type" required><Sel value={form.subType} onChange={e => set(f => ({ ...f, subType: e.target.value }))}>{(TREATY_SUBTYPES[form.type] || []).map(t => <option key={t}>{t}</option>)}</Sel></Field>
                    <Field label="Class of Business"><Sel value={form.classOfBusiness} onChange={e => set(f => ({ ...f, classOfBusiness: e.target.value }))}>{['Motor Insurance — All Classes', 'Motor Insurance — Private', 'Motor Insurance — Fleet', 'Motor Insurance — Commercial', 'Motor Insurance — PSV'].map(c => <option key={c}>{c}</option>)}</Sel></Field>
                    <Field label="Currency"><Sel value={form.currency} onChange={e => set(f => ({ ...f, currency: e.target.value }))}>{['USD', 'ZWG', 'GBP', 'EUR', 'ZAR'].map(c => <option key={c}>{c}</option>)}</Sel></Field>
                    <Field label="Inception Date" required><Inp type="date" value={form.inceptionDate} onChange={e => set(f => ({ ...f, inceptionDate: e.target.value }))} /></Field>
                    <Field label="Expiry Date" required><Inp type="date" value={form.expiryDate} onChange={e => set(f => ({ ...f, expiryDate: e.target.value }))} /></Field>
                    <Field label="Cedant"><Inp value={form.cedant} onChange={e => set(f => ({ ...f, cedant: e.target.value }))} /></Field>
                    <Field label="Governing Law"><Sel value={form.governing} onChange={e => set(f => ({ ...f, governing: e.target.value }))}>{['English Law', 'Zimbabwean Law', 'Swiss Law', 'French Law'].map(l => <option key={l}>{l}</option>)}</Sel></Field>
                  </div>
                </Panel>
              )}
              {step === 2 && (
                <Panel>
                  <SecHead>{isProportional ? 'Proportional — Cession & Retention' : isStopLoss ? 'Stop Loss — Attachment & Exhaustion' : 'XOL — Retention & Layer'}</SecHead>
                  <div className="grid grid-cols-2 gap-4">
                    {isProportional && <><Field label="Cession Rate (%)" required><Inp type="number" value={form.cessionPct} onChange={e => set(f => ({ ...f, cessionPct: e.target.value, retentionPct: String(100 - parseFloat(e.target.value || 0)) }))} placeholder="e.g. 65" /></Field><Field label="Retention Rate (%)"><Inp value={form.retentionPct ? `${form.retentionPct}%` : ''} readOnly className="opacity-60 cursor-not-allowed" /></Field><Field label="Estimated Ceding Premium (USD)"><Inp type="number" value={form.estimatedCedingPremium} onChange={e => set(f => ({ ...f, estimatedCedingPremium: e.target.value }))} placeholder="e.g. 2800000" /></Field></>}
                    {(isXOL && !isStopLoss) && <><Field label="Retention / Deductible (USD)" required><Inp type="number" value={form.retentionAmount} onChange={e => set(f => ({ ...f, retentionAmount: e.target.value }))} placeholder="e.g. 50000" /></Field><Field label="Layer Limit (USD)" required><Inp type="number" value={form.layerTo} onChange={e => set(f => ({ ...f, layerTo: e.target.value, layerFrom: form.retentionAmount }))} placeholder="e.g. 250000" /></Field><Field label="Reinstatements"><Sel value={form.reinstatements} onChange={e => set(f => ({ ...f, reinstatements: e.target.value }))}>{['0','1','2','3','Unlimited'].map(v => <option key={v}>{v}</option>)}</Sel></Field>{form.reinstatements !== '0' && <Field label="Reinstatement Premium (%)"><Inp type="number" value={form.reinstatementPremiumPct} onChange={e => set(f => ({ ...f, reinstatementPremiumPct: e.target.value }))} placeholder="100" /></Field>}</>}
                    {isStopLoss && <><Field label="Attachment Point (% LR)" required><Inp type="number" value={form.attachmentPoint} onChange={e => set(f => ({ ...f, attachmentPoint: e.target.value }))} placeholder="e.g. 75" /></Field><Field label="Exhaustion Point (% LR)" required><Inp type="number" value={form.exhaustionPoint} onChange={e => set(f => ({ ...f, exhaustionPoint: e.target.value }))} placeholder="e.g. 105" /></Field></>}
                    <Field label="RI Premium / ROL (USD)" required><Inp type="number" value={form.riPremium} onChange={e => set(f => ({ ...f, riPremium: e.target.value }))} placeholder="e.g. 284000" /></Field>
                    <Field label="Minimum Premium (USD)"><Inp type="number" value={form.minimumPremium} onChange={e => set(f => ({ ...f, minimumPremium: e.target.value }))} placeholder="e.g. 250000" /></Field>
                    <Field label="Deposit Premium (%)"><Inp type="number" value={form.depositPremiumPct} onChange={e => set(f => ({ ...f, depositPremiumPct: e.target.value }))} placeholder="80" /></Field>
                  </div>
                </Panel>
              )}
              {step === 3 && (
                <Panel>
                  <SecHead icon={Building2}>Reinsurer Lines</SecHead>
                  <div className="space-y-3">
                    {form.reinsurers.map((r, i) => (
                      <div key={i} className="p-3 bg-slate-900/40 rounded-xl border border-slate-700/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-bold ${RI_TEXT[i % RI_TEXT.length]} uppercase tracking-wide`}>Reinsurer {i + 1}</span>
                          {form.reinsurers.length > 1 && <button onClick={() => removeRI(i)} className="p-1 text-slate-600 hover:text-rose-400 transition-colors"><X size={12} /></button>}
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          <div className="col-span-2"><Field label="Reinsurer Name"><Sel value={r.name} onChange={e => setRI(i, 'name', e.target.value)}><option value="">Select...</option>{RI_MARKETS.map(m => <option key={m.name}>{m.name}</option>)}</Sel></Field></div>
                          <Field label="Country"><Inp value={r.country || RI_MARKETS.find(m => m.name === r.name)?.country || ''} onChange={e => setRI(i, 'country', e.target.value)} placeholder="Country" /></Field>
                          <Field label="Rating"><Inp value={r.rating || RI_MARKETS.find(m => m.name === r.name)?.rating || ''} onChange={e => setRI(i, 'rating', e.target.value)} placeholder="e.g. AA-" /></Field>
                          <Field label="Share %"><Inp type="number" value={r.share} onChange={e => setRI(i, 'share', e.target.value)} placeholder="e.g. 60" /></Field>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={addRI} className="mt-3 flex items-center gap-1.5 text-xs text-helix-400 hover:text-helix-300 transition-colors px-3 py-2 rounded-lg border border-helix-700/30 bg-helix-900/10"><Plus size={12} /> Add Reinsurer</button>
                  <div className="mt-4 p-3 rounded-xl bg-slate-900/30 flex justify-between items-center border border-slate-700/30">
                    <span className="text-xs text-slate-500">Total Lines Allocated</span>
                    <span className={`font-mono font-bold ${totalShare === 100 ? 'text-emerald-400' : totalShare > 100 ? 'text-rose-400' : 'text-amber-400'}`}>{totalShare.toFixed(0)}% / 100%{totalShare !== 100 && ` (${totalShare > 100 ? 'Over-placed!' : `${100 - totalShare}% unplaced`})`}</span>
                  </div>
                </Panel>
              )}
              {step === 4 && (
                <div className="space-y-6">
                  <Panel>
                    <SecHead>Commission Structure</SecHead>
                    <div className="grid grid-cols-2 gap-4">
                      {isProportional && <><Field label="RI Commission Rate (%)"><Inp type="number" value={form.riCommissionPct} onChange={e => set(f => ({ ...f, riCommissionPct: e.target.value }))} placeholder="e.g. 20" /></Field><Field label="Profit Commission Rate (%)"><Inp type="number" value={form.profitCommissionPct} onChange={e => set(f => ({ ...f, profitCommissionPct: e.target.value }))} placeholder="e.g. 10" /></Field><Field label="Profit Comm. LR Threshold (%)"><Inp type="number" value={form.profitCommissionThreshold} onChange={e => set(f => ({ ...f, profitCommissionThreshold: e.target.value }))} placeholder="80" /></Field></>}
                      <Field label="Bordereau Frequency"><Sel value={form.bordereau} onChange={e => set(f => ({ ...f, bordereau: e.target.value }))}>{['monthly', 'quarterly', 'annual'].map(b => <option key={b}>{b}</option>)}</Sel></Field>
                      <Field label="Cancellation Notice (Days)"><Inp type="number" value={form.cancellationNotice} onChange={e => set(f => ({ ...f, cancellationNotice: e.target.value }))} placeholder="90" /></Field>
                      <Field label="Arbitration"><Sel value={form.arbitration} onChange={e => set(f => ({ ...f, arbitration: e.target.value }))}>{['London', 'Zurich', 'Paris', 'Harare', 'Nairobi'].map(a => <option key={a}>{a}</option>)}</Sel></Field>
                    </div>
                  </Panel>
                  <Panel><SecHead>Notes & Special Conditions</SecHead><Txt rows={4} value={form.notes} onChange={e => set(f => ({ ...f, notes: e.target.value }))} placeholder="Enter any special conditions, warranties, clauses or underwriting notes..." /></Panel>
                </div>
              )}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2"><AlertTriangle size={13} className="text-amber-400 flex-shrink-0" /><span className="text-xs text-amber-400">Review all treaty details carefully before placing. The slip will be generated upon confirmation.</span></div>
                  <div className="grid grid-cols-2 gap-4">
                    <Panel><SecHead>Treaty Identity</SecHead><KV label="Name" value={form.name} /><KV label="Type" value={`${form.type} — ${form.subType}`} /><KV label="Class" value={form.classOfBusiness} /><KV label="Period" value={`${form.inceptionDate} — ${form.expiryDate}`} /><KV label="Currency" value={form.currency} /><KV label="Governing Law" value={form.governing} /></Panel>
                    <Panel><SecHead>Financial Terms</SecHead>{form.cessionPct && <KV label="Cession / Retention" value={`${form.cessionPct}% / ${form.retentionPct}%`} />}{form.retentionAmount && <KV label="Retention" value={`USD ${fmt(form.retentionAmount)}`} />}{form.layerTo && <KV label="Layer" value={`USD ${fmt(form.retentionAmount)} xs USD ${fmt(form.layerTo)}`} />}<KV label="RI Premium" value={`USD ${fmt(form.riPremium)}`} hi />{form.riCommissionPct && <KV label="RI Commission" value={`${form.riCommissionPct}%`} />}<KV label="Bordereau" value={form.bordereau} /></Panel>
                  </div>
                  <Panel>
                    <SecHead>Reinsurer Panel ({form.reinsurers.filter(r => r.name).length} reinsurers — {totalShare}% allocated)</SecHead>
                    {form.reinsurers.filter(r => r.name).map((r, i) => (
                      <div key={i} className="flex justify-between items-center py-1.5 border-b border-slate-800/30 last:border-0">
                        <div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-sm ${RI_COLORS[i % RI_COLORS.length]}`} /><span className="text-sm text-slate-300">{r.name}</span>{r.rating && <span className="text-[10px] font-mono text-slate-500">{r.rating}</span>}</div>
                        <span className={`font-mono font-bold text-sm ${RI_TEXT[i % RI_TEXT.length]}`}>{r.share}%</span>
                      </div>
                    ))}
                  </Panel>
                </div>
              )}
            </div>
          )}
        </div>
        {!done && (
          <div className="px-8 py-4 border-t border-slate-800/50 flex items-center justify-between flex-shrink-0">
            <button onClick={() => step > 1 ? setStep(s => s - 1) : onClose()} className="flex items-center gap-2 px-4 py-2 glass-light text-slate-400 hover:text-slate-200 rounded-xl text-sm border border-slate-700 transition-colors"><ArrowLeft size={13} />{step === 1 ? 'Cancel' : 'Back'}</button>
            <div className="text-xs text-slate-700 font-mono">{step}/{TREATY_STEPS.length}</div>
            {step === TREATY_STEPS.length
              ? <button onClick={handlePlace} className="flex items-center gap-2 px-6 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors"><CheckCircle size={14} /> Place Treaty</button>
              : <button onClick={() => setStep(s => s + 1)} className="flex items-center gap-2 px-5 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-medium transition-colors">Continue <ArrowRight size={13} /></button>
            }
          </div>
        )}
      </div>
    </div>
  )
}

const facDefault = {
  insured: '', policyRef: '', vehicleClass: 'Fleet', vehicles: '', makeModel: '',
  sumInsured: '', currency: 'USD', cover: 'Comprehensive', grossPremium: '', broker: 'Direct',
  reason: '', facCessionPct: '', facCessionAmount: '', facPremium: '', inceptionDate: '', expiryDate: '',
  notes: '',
  reinsurers: [{ name: '', country: '', rating: '', share: '', premium: '' }],
}

const FAC_STEPS = [
  { id: 1, label: 'Risk Details',   desc: 'Insured and vehicle information' },
  { id: 2, label: 'Fac Terms',      desc: 'Cession percentage and premium' },
  { id: 3, label: 'RI Lines',       desc: 'Facultative reinsurer allocation' },
  { id: 4, label: 'Review & Send',  desc: 'Confirm and generate slip' },
]

function NewFacWizard({ onClose, onSave }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(facDefault)
  const [done, setDone] = useState(false)
  const [newRef, setNewRef] = useState('')
  const set = fn => setForm(prev => fn(prev))
  const addRI = () => set(f => ({ ...f, reinsurers: [...f.reinsurers, { name: '', country: '', rating: '', share: '', premium: '' }] }))
  const removeRI = i => set(f => ({ ...f, reinsurers: f.reinsurers.filter((_, j) => j !== i) }))
  const setRI = (i, k, v) => set(f => ({ ...f, reinsurers: f.reinsurers.map((r, j) => j === i ? { ...r, [k]: v } : r) }))
  const totalShare = form.reinsurers.reduce((a, r) => a + (parseFloat(r.share) || 0), 0)
  const updateCessionAmt = (pct) => {
    const amt = ((parseFloat(form.sumInsured) || 0) * (parseFloat(pct) || 0) / 100).toFixed(2)
    const prem = ((parseFloat(form.grossPremium) || 0) * (parseFloat(pct) || 0) / 100).toFixed(2)
    set(f => ({ ...f, facCessionPct: pct, facCessionAmount: amt, facPremium: prem }))
  }
  const handleSend = () => {
    const ref = `FAC-${new Date().getFullYear()}-${String(Math.floor(Math.random()*900+100)).padStart(4,'0')}`
    setNewRef(ref); setDone(true)
    onSave && onSave({ ...form, ref, status: 'pending', requestDate: new Date().toISOString().split('T')[0] })
  }
  return (
    <div className="fixed inset-0 z-[60] flex" style={{ background: 'rgba(2,6,23,0.97)' }}>
      <div className="w-56 border-r border-slate-800/50 flex flex-col glass min-h-screen flex-shrink-0">
        <div className="px-5 py-5 border-b border-slate-800/50">
          <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">Facultative Wizard</div>
          <div className="font-display text-base font-bold text-white leading-tight">New Facultative<br />Placement</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {FAC_STEPS.map(s => {
            const d = step > s.id; const a = step === s.id
            return (
              <button key={s.id} onClick={() => d && setStep(s.id)}
                className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all ${a ? 'bg-violet-600/20 border border-violet-600/30' : d ? 'hover:bg-slate-800/40 cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5 ${a ? 'bg-violet-600 text-white' : d ? 'bg-emerald-600/20 text-emerald-400' : 'bg-slate-800 text-slate-600'}`}>{d ? '✓' : s.id}</div>
                <div>
                  <div className={`text-[11px] font-semibold ${a ? 'text-violet-300' : d ? 'text-slate-300' : 'text-slate-600'}`}>{s.label}</div>
                  <div className="text-[9.5px] text-slate-700 mt-0.5">{s.desc}</div>
                </div>
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-800/50">
          {form.sumInsured && form.facCessionPct && (
            <div className="p-2.5 bg-violet-900/20 border border-violet-700/20 rounded-lg mb-3 text-center">
              <div className="text-[9px] text-violet-500 uppercase tracking-wide">FAC Premium</div>
              <div className="font-mono text-sm font-bold text-violet-300">USD {fmt(form.facPremium)}</div>
            </div>
          )}
          <button onClick={onClose} className="w-full flex items-center gap-2 text-slate-600 hover:text-slate-400 text-xs rounded-lg py-2 px-2 hover:bg-slate-800/40 transition-colors"><X size={12} /> Cancel</button>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-8 py-4 border-b border-slate-800/50 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="text-xs text-slate-500">Step {step} of {FAC_STEPS.length} — {FAC_STEPS[step-1].label}</div>
            <div className="text-slate-200 font-semibold text-sm mt-0.5">{FAC_STEPS[step-1].desc}</div>
          </div>
          <div className="flex gap-1">{FAC_STEPS.map(s => (<div key={s.id} className={`h-1.5 rounded-full transition-all ${s.id < step ? 'bg-emerald-500 w-7' : s.id === step ? 'bg-violet-500 w-9' : 'bg-slate-800 w-5'}`} />))}</div>
        </div>
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {done ? (
            <div className="max-w-md mx-auto text-center py-12">
              <div className="w-16 h-16 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center mx-auto mb-5"><CheckCircle size={30} className="text-violet-400" /></div>
              <h2 className="font-display text-2xl text-white mb-2">Fac Request Sent!</h2>
              <p className="text-slate-400 mb-1">Reference: <span className="font-mono text-violet-400">{newRef}</span></p>
              <p className="text-slate-500 text-sm mb-6">{form.insured} — Awaiting reinsurer acceptance</p>
              <button onClick={onClose} className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold transition-colors">Back to Facultative</button>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {step === 1 && (
                <Panel>
                  <SecHead>Risk & Insured Details</SecHead>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2"><Field label="Insured Name" required><Inp value={form.insured} onChange={e => set(f => ({ ...f, insured: e.target.value }))} placeholder="e.g. CBZ Holdings Ltd" /></Field></div>
                    <Field label="Policy Reference"><Inp value={form.policyRef} onChange={e => set(f => ({ ...f, policyRef: e.target.value }))} placeholder="e.g. HLX-POL-004522" /></Field>
                    <Field label="Vehicle Class"><Sel value={form.vehicleClass} onChange={e => set(f => ({ ...f, vehicleClass: e.target.value }))}>{['Private','Fleet','Commercial','PSV','Motorcycle','Special Type'].map(c => <option key={c}>{c}</option>)}</Sel></Field>
                    <Field label="Make & Model"><Inp value={form.makeModel} onChange={e => set(f => ({ ...f, makeModel: e.target.value }))} placeholder="e.g. Toyota Land Cruiser (x45)" /></Field>
                    <Field label="No. of Vehicles"><Inp type="number" value={form.vehicles} onChange={e => set(f => ({ ...f, vehicles: e.target.value }))} placeholder="e.g. 45" min={1} /></Field>
                    <Field label="Cover Type" required><Sel value={form.cover} onChange={e => set(f => ({ ...f, cover: e.target.value }))}>{['Comprehensive','Third Party Only','Third Party Fire & Theft'].map(c => <option key={c}>{c}</option>)}</Sel></Field>
                    <Field label="Currency"><Sel value={form.currency} onChange={e => set(f => ({ ...f, currency: e.target.value }))}>{['USD','ZWG','GBP','EUR'].map(c => <option key={c}>{c}</option>)}</Sel></Field>
                    <Field label="Sum Insured" required><Inp type="number" value={form.sumInsured} onChange={e => set(f => ({ ...f, sumInsured: e.target.value }))} placeholder="e.g. 2250000" /></Field>
                    <Field label="Gross Premium" required><Inp type="number" value={form.grossPremium} onChange={e => set(f => ({ ...f, grossPremium: e.target.value }))} placeholder="e.g. 81000" /></Field>
                    <Field label="Inception Date"><Inp type="date" value={form.inceptionDate} onChange={e => set(f => ({ ...f, inceptionDate: e.target.value }))} /></Field>
                    <Field label="Expiry Date"><Inp type="date" value={form.expiryDate} onChange={e => set(f => ({ ...f, expiryDate: e.target.value }))} /></Field>
                    <Field label="Broker"><Sel value={form.broker} onChange={e => set(f => ({ ...f, broker: e.target.value }))}>{['Direct','Riskwise Brokers','AON Zimbabwe','Marsh Zimbabwe','Willis Towers Watson','Alexander Forbes'].map(b => <option key={b}>{b}</option>)}</Sel></Field>
                    <div className="col-span-2"><Field label="Reason for Facultative Placement" required><Txt rows={2} value={form.reason} onChange={e => set(f => ({ ...f, reason: e.target.value }))} placeholder="e.g. Sum insured exceeds QS treaty automatic acceptance limit..." /></Field></div>
                  </div>
                </Panel>
              )}
              {step === 2 && (
                <Panel>
                  <SecHead>Facultative Cession Terms</SecHead>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Facultative Cession (%)" required><Inp type="number" value={form.facCessionPct} onChange={e => updateCessionAmt(e.target.value)} placeholder="e.g. 55" min={1} max={100} step={0.5} /></Field>
                    <Field label="Cession Amount (auto-calculated)"><Inp value={form.facCessionAmount ? `USD ${fmt(form.facCessionAmount)}` : ''} readOnly className="opacity-60 cursor-not-allowed" /></Field>
                    <Field label="Facultative Premium (auto-calculated)"><Inp value={form.facPremium ? `USD ${fmt(form.facPremium)}` : ''} readOnly className="opacity-60 cursor-not-allowed" /></Field>
                    <div />
                    <div className="col-span-2"><Field label="Notes"><Txt rows={3} value={form.notes} onChange={e => set(f => ({ ...f, notes: e.target.value }))} placeholder="Any special conditions for this facultative placement..." /></Field></div>
                  </div>
                  {form.sumInsured && form.facCessionPct && (
                    <div className="mt-4 p-4 bg-violet-900/20 border border-violet-700/20 rounded-xl">
                      <div className="text-[10px] text-violet-500 uppercase tracking-widest mb-2">Live Calculation</div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div><div className="text-xs text-slate-500">Sum Insured</div><div className="font-mono text-slate-200 font-semibold">USD {fmt(form.sumInsured)}</div></div>
                        <div><div className="text-xs text-slate-500">Cession ({form.facCessionPct}%)</div><div className="font-mono text-violet-300 font-bold">USD {fmt(form.facCessionAmount)}</div></div>
                        <div><div className="text-xs text-slate-500">FAC Premium</div><div className="font-mono text-emerald-400 font-bold">USD {fmt(form.facPremium)}</div></div>
                      </div>
                    </div>
                  )}
                </Panel>
              )}
              {step === 3 && (
                <Panel>
                  <SecHead icon={Building2}>Facultative Reinsurer Lines</SecHead>
                  <div className="space-y-3">
                    {form.reinsurers.map((r, i) => (
                      <div key={i} className="p-3 bg-slate-900/40 rounded-xl border border-slate-700/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-bold ${RI_TEXT[i % RI_TEXT.length]} uppercase tracking-wide`}>Reinsurer {i + 1}</span>
                          {form.reinsurers.length > 1 && <button onClick={() => removeRI(i)} className="p-1 text-slate-600 hover:text-rose-400 transition-colors"><X size={12} /></button>}
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="col-span-2"><Field label="Name"><Sel value={r.name} onChange={e => { const m = RI_MARKETS.find(x => x.name === e.target.value); setRI(i, 'name', e.target.value); if (m) { setRI(i, 'country', m.country); setRI(i, 'rating', m.rating) } }}><option value="">Select...</option>{RI_MARKETS.map(m => <option key={m.name}>{m.name}</option>)}</Sel></Field></div>
                          <Field label="Rating"><Inp value={r.rating} onChange={e => setRI(i, 'rating', e.target.value)} placeholder="e.g. AA-" /></Field>
                          <Field label="Share %"><Inp type="number" value={r.share} onChange={e => setRI(i, 'share', e.target.value)} placeholder="60" min={1} max={100} /></Field>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={addRI} className="mt-3 flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 px-3 py-2 rounded-lg border border-violet-700/30 bg-violet-900/10 transition-colors"><Plus size={12} /> Add Reinsurer</button>
                  <div className="mt-4 p-3 rounded-xl bg-slate-900/30 flex justify-between border border-slate-700/30">
                    <span className="text-xs text-slate-500">Lines Allocated</span>
                    <span className={`font-mono font-bold text-sm ${totalShare === 100 ? 'text-emerald-400' : totalShare > 100 ? 'text-rose-400' : 'text-amber-400'}`}>{totalShare}% / 100%</span>
                  </div>
                </Panel>
              )}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2"><AlertTriangle size={13} className="text-amber-400 flex-shrink-0" /><span className="text-xs text-amber-400">Review and confirm before sending the facultative request to reinsurers.</span></div>
                  <div className="grid grid-cols-2 gap-4">
                    <Panel><SecHead>Risk Summary</SecHead><KV label="Insured" value={form.insured} /><KV label="Vehicle Class" value={form.vehicleClass} /><KV label="Vehicle(s)" value={form.makeModel} /><KV label="No. of Vehicles" value={form.vehicles} /><KV label="Cover" value={form.cover} /><KV label="Sum Insured" value={`USD ${fmt(form.sumInsured)}`} /><KV label="Gross Premium" value={`USD ${fmt(form.grossPremium)}`} /><KV label="Period" value={form.inceptionDate && form.expiryDate ? `${form.inceptionDate} — ${form.expiryDate}` : '—'} /></Panel>
                    <Panel><SecHead>Facultative Terms</SecHead><KV label="Cession %" value={`${form.facCessionPct}%`} /><KV label="Cession Amount" value={`USD ${fmt(form.facCessionAmount)}`} /><KV label="FAC Premium" value={`USD ${fmt(form.facPremium)}`} hi /><KV label="Total RI Lines" value={`${totalShare}%`} /><KV label="Placement Reason" value={form.reason} /></Panel>
                  </div>
                  <Panel>
                    <SecHead>Reinsurer Panel</SecHead>
                    {form.reinsurers.filter(r => r.name).map((r, i) => (
                      <div key={i} className="flex justify-between items-center py-1.5 border-b border-slate-800/30 last:border-0">
                        <div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-sm ${RI_COLORS[i % RI_COLORS.length]}`} /><span className="text-sm text-slate-300">{r.name}</span>{r.rating && <span className="text-[10px] font-mono text-slate-500">{r.rating}</span>}</div>
                        <span className={`font-mono font-bold ${RI_TEXT[i % RI_TEXT.length]}`}>{r.share}%</span>
                      </div>
                    ))}
                  </Panel>
                </div>
              )}
            </div>
          )}
        </div>
        {!done && (
          <div className="px-8 py-4 border-t border-slate-800/50 flex items-center justify-between flex-shrink-0">
            <button onClick={() => step > 1 ? setStep(s => s - 1) : onClose()} className="flex items-center gap-2 px-4 py-2 glass-light text-slate-400 hover:text-slate-200 rounded-xl text-sm border border-slate-700 transition-colors"><ArrowLeft size={13} />{step === 1 ? 'Cancel' : 'Back'}</button>
            <div className="text-xs text-slate-700 font-mono">{step}/{FAC_STEPS.length}</div>
            {step === FAC_STEPS.length
              ? <button onClick={handleSend} className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold transition-colors"><Send size={14} /> Send Fac Request</button>
              : <button onClick={() => setStep(s => s + 1)} className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-medium transition-colors">Continue <ArrowRight size={13} /></button>
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default function Reinsurance() {
  const [tab, setTab] = useState('treaties')
  const [treaties, setTreaties] = useState(TREATIES)
  const [faculties, setFaculties] = useState(FACULTIES)
  const [selectedTreaty, setSelectedTreaty] = useState(null)
  const [detailTreaty, setDetailTreaty] = useState(null)   // ✅ FIXED: separate state for modal
  const [selectedFac, setSelectedFac] = useState(null)
  const [showNewTreaty, setShowNewTreaty] = useState(false)
  const [showNewFac, setShowNewFac] = useState(false)
  const [search, setSearch] = useState('')

  const TABS = [
    { id: 'treaties',    label: 'Treaty Management',      count: treaties.length },
    { id: 'facultative', label: 'Facultative Placements', count: faculties.length },
    { id: 'bordereau',   label: 'Bordereau',              count: BORDEREAU.length },
    { id: 'markets',     label: 'RI Markets',             count: RI_MARKETS.length },
  ]

  const totalRiPremium = treaties.filter(t => t.status === 'active').reduce((a, t) => a + t.riPremium, 0)
  const totalFacPremium = faculties.filter(f => f.status === 'placed').reduce((a, f) => a + f.facPremium, 0)
  const totalCession = BORDEREAU.reduce((a, b) => a + b.cession, 0)
  const activeTreaties = treaties.filter(t => t.status === 'active').length
  const pendingFac = faculties.filter(f => f.status === 'pending').length
  const bordereauGWP = BORDEREAU.reduce((a, b) => a + b.gwp, 0)

  return (
    <>
      {/* ✅ FIXED: TreatyDetail modal uses detailTreaty, not selectedTreaty */}
      {detailTreaty && <TreatyDetail treaty={detailTreaty} onClose={() => setDetailTreaty(null)} />}
      {selectedFac && <FacDetail fac={selectedFac} onClose={() => setSelectedFac(null)} />}
      {showNewTreaty && <NewTreatyWizard onClose={() => setShowNewTreaty(false)} onSave={t => { setTreaties(p => [{ ...t, code: t.code || 'PENDING', riPremium: parseFloat(t.riPremium)||0, lossRatio: null, reinsurers: t.reinsurers.filter(r=>r.name).map(r=>({...r, slipSigned: false})), lossesNotified: [], endorsements: [] }, ...p]); setShowNewTreaty(false) }} />}
      {showNewFac && <NewFacWizard onClose={() => setShowNewFac(false)} onSave={f => { setFaculties(p => [{ ...f, ref: f.ref||'PENDING', facCessionAmount: parseFloat(f.facCessionAmount)||0, facPremium: parseFloat(f.facPremium)||0, grossPremium: parseFloat(f.grossPremium)||0, reinsurers: f.reinsurers.filter(r=>r.name).map(r=>({...r, slipSigned: false, ref: null})), slipIssued: false, slipRef: null, placedDate: null, endorsements: [] }, ...p]); setShowNewFac(false) }} />}

      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Reinsurance</h1>
            <p className="text-slate-500 text-sm mt-1">Treaty management, facultative placements, cessions and bordereaux</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowNewFac(true)} className="flex items-center gap-2 px-4 py-2.5 glass-light text-violet-300 hover:text-white rounded-xl border border-violet-700/40 hover:border-violet-600/60 text-sm transition-colors">
              <Layers size={14} /> New Fac Placement
            </button>
            <button onClick={() => setShowNewTreaty(true)} className="flex items-center gap-2 px-4 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors">
              <Plus size={15} /> New Treaty
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {[
            { label: 'Active Treaties',    value: activeTreaties,              color: 'text-helix-300' },
            { label: 'Treaty RI Premium',  value: `$${fmtM(totalRiPremium)}`,  color: 'text-emerald-400' },
            { label: 'Placed Fac Premium', value: `$${fmtM(totalFacPremium)}`, color: 'text-violet-400' },
            { label: 'Monthly Cessions',   value: `$${fmtM(totalCession)}`,    color: 'text-blue-400' },
            { label: 'Pending Fac',        value: pendingFac,                  color: pendingFac > 0 ? 'text-amber-400' : 'text-slate-500' },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-3 glass-light rounded-xl border border-slate-800/50">
              <div className={`font-display text-xl font-bold ${color}`}>{value}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-1 border-b border-slate-800/50">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-t-lg transition-colors whitespace-nowrap ${tab === t.id ? 'bg-helix-600/20 text-helix-300 border-b-2 border-helix-500' : 'text-slate-500 hover:text-slate-300'}`}>
              {t.label}
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${tab === t.id ? 'bg-helix-600/30 text-helix-300' : 'bg-slate-800 text-slate-500'}`}>{t.count}</span>
            </button>
          ))}
        </div>

        {tab === 'treaties' && (
          <div className="grid grid-cols-5 gap-5">
            <div className="col-span-2 space-y-3">
              {treaties.map((t, i) => {
                const selected = selectedTreaty?.code === t.code
                return (
                  <button key={i} onClick={() => setSelectedTreaty(selected ? null : t)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${selected ? 'bg-helix-600/10 border-helix-600/40' : 'glass-light border-slate-800/50 hover:border-slate-700/60'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-mono text-xs text-helix-400">{t.code}</span>
                      <StatusBadge status={t.status} />
                    </div>
                    <div className="text-sm font-semibold text-slate-200 mb-1">{t.name}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">{t.subType}</span>
                      <span className="font-mono text-xs text-emerald-400">USD {fmtM(t.riPremium)}</span>
                    </div>
                    <div className="mt-2"><ShareBar reinsurers={t.reinsurers} /></div>
                  </button>
                )
              })}
            </div>

            <div className="col-span-3">
              {selectedTreaty ? (
                <div className="glass-light rounded-2xl border border-slate-800/50 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/50">
                    <div>
                      <div className="font-mono text-xs text-helix-400">{selectedTreaty.code}</div>
                      <div className="font-semibold text-slate-200 text-sm mt-0.5">{selectedTreaty.name}</div>
                    </div>
                    <div className="flex gap-2">
                      {/* ✅ FIXED: "Full Detail" now correctly opens the TreatyDetail modal */}
                      <button onClick={() => setDetailTreaty(selectedTreaty)} className="flex items-center gap-1.5 px-3 py-1.5 glass-light text-slate-300 rounded-lg text-xs border border-slate-700 hover:text-white transition-colors">
                        <Eye size={12} /> Full Detail
                      </button>
                      <button onClick={() => printTreatySlip(selectedTreaty)} className="flex items-center gap-1.5 px-3 py-1.5 bg-helix-600 hover:bg-helix-500 text-white rounded-lg text-xs transition-colors">
                        <Printer size={12} /> Print Slip
                      </button>
                    </div>
                  </div>
                  <div className="p-5 space-y-5">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: selectedTreaty.cessionPct ? 'Cession Rate' : 'Retention', value: selectedTreaty.cessionPct ? `${selectedTreaty.cessionPct}%` : `USD ${fmtM(selectedTreaty.retentionAmount)}`, color: 'text-violet-400' },
                        { label: 'RI Premium', value: `USD ${fmtM(selectedTreaty.riPremium)}`, color: 'text-emerald-400' },
                        { label: 'Loss Ratio', value: selectedTreaty.lossRatio != null ? `${selectedTreaty.lossRatio}%` : 'N/A', color: selectedTreaty.lossRatio > 65 ? 'text-rose-400' : 'text-emerald-400' },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="p-3 bg-slate-800/40 rounded-xl text-center">
                          <div className="text-[9.5px] text-slate-500 uppercase tracking-wide mb-1">{label}</div>
                          <div className={`font-mono font-bold text-base ${color}`}>{value}</div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-3">Reinsurer Panel</div>
                      <ShareBar reinsurers={selectedTreaty.reinsurers} />
                      <div className="mt-3 space-y-2">
                        {selectedTreaty.reinsurers.map((r, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800/30 last:border-0">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-7 h-7 rounded-lg ${RI_COLORS[i % RI_COLORS.length]}/20 flex items-center justify-center`}>
                                <span className={`text-[10px] font-bold ${RI_TEXT[i % RI_TEXT.length]}`}>{r.name.charAt(0)}</span>
                              </div>
                              <div>
                                <div className="text-sm text-slate-300 font-medium">{r.name}</div>
                                <div className="text-[10px] text-slate-600">{r.country} • {r.rating}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`font-mono font-bold ${RI_TEXT[i % RI_TEXT.length]}`}>{r.share}%</div>
                              <div className="text-[10px] text-slate-500">USD {fmt(r.premium)}</div>
                              {r.slipSigned ? <div className="text-[10px] text-emerald-500 flex items-center gap-1 justify-end"><CheckCircle size={9} /> Signed</div> : <div className="text-[10px] text-amber-500 flex items-center gap-1 justify-end"><Clock size={9} /> Pending</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/30 font-mono text-[10.5px]">
                      <div className="text-slate-600 mb-3 text-[9px] uppercase tracking-widest">Slip Preview</div>
                      {[
                        ['RISK REF', selectedTreaty.code],
                        ['CLASS', selectedTreaty.classOfBusiness],
                        ['PERIOD', `${selectedTreaty.inceptionDate} — ${selectedTreaty.expiryDate}`],
                        ['TYPE', selectedTreaty.subType],
                        ...(selectedTreaty.cessionPct ? [['CESSION', `${selectedTreaty.cessionPct}%`], ['RETENTION', `${selectedTreaty.retentionPct}%`]] : []),
                        ...(selectedTreaty.retentionAmount ? [['RETENTION', `USD ${fmt(selectedTreaty.retentionAmount)}`]] : []),
                        ...(selectedTreaty.layerFrom ? [['LAYER', `USD ${fmt(selectedTreaty.layerFrom)} xs USD ${fmt(selectedTreaty.layerTo)}`]] : []),
                        ...(selectedTreaty.riCommissionPct ? [['RI COMMISSION', `${selectedTreaty.riCommissionPct}%`]] : []),
                        ['GROSS RI PREMIUM', `USD ${fmt(selectedTreaty.riPremium)}`],
                        ['GOVERNING LAW', selectedTreaty.governing],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between border-b border-slate-800/30 py-1 last:border-0">
                          <span className="text-slate-600">{k}</span>
                          <span className="text-slate-300">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-5 py-3 border-t border-slate-800/50">
                    {/* ✅ FIXED: "View Full Treaty Detail" link also opens modal cleanly */}
                    <button onClick={() => setDetailTreaty(selectedTreaty)} className="text-xs text-helix-400 hover:text-helix-300 flex items-center gap-1 transition-colors">
                      <Eye size={11} /> View Full Treaty Detail <ChevronRight size={11} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="glass-light rounded-2xl border border-slate-800/50 flex items-center justify-center h-64">
                  <div className="text-center">
                    <GitBranch size={28} className="text-slate-700 mx-auto mb-3" />
                    <div className="text-slate-600 text-sm">Select a treaty to preview details</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'facultative' && (
          <div className="space-y-3">
            <div className="flex gap-3 mb-2">
              <div className="relative flex-1">
                <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search facultative placements..."
                  className="w-full pl-10 pr-4 py-2.5 glass-light rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none border border-transparent focus:border-helix-600/40" />
              </div>
            </div>
            <div className="glass-light rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800/50">
                    {['FAC Ref', 'Insured', 'Class', 'Vehicle(s)', 'Sum Insured', 'Cession', 'FAC Premium', 'Reinsurers', 'Status', ''].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[9.5px] font-semibold text-slate-500 uppercase tracking-wide first:pl-5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {faculties.filter(f => !search || f.insured.toLowerCase().includes(search.toLowerCase()) || f.ref.toLowerCase().includes(search.toLowerCase())).map(f => (
                    <tr key={f.ref} onClick={() => setSelectedFac(f)} className="border-b border-slate-800/30 last:border-0 hover:bg-slate-800/25 cursor-pointer transition-colors group">
                      <td className="px-4 pl-5 py-4 font-mono text-xs text-violet-400 whitespace-nowrap">{f.ref}</td>
                      <td className="px-4 py-4"><div className="text-slate-200 font-medium text-sm">{f.insured}</div><div className="text-slate-600 text-xs">{f.policyRef}</div></td>
                      <td className="px-4 py-4"><span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">{f.vehicleClass}</span></td>
                      <td className="px-4 py-4 text-xs text-slate-400">{f.makeModel}</td>
                      <td className="px-4 py-4 font-mono text-xs text-slate-300 whitespace-nowrap">USD {fmtM(f.sumInsured)}</td>
                      <td className="px-4 py-4 font-mono text-xs text-violet-400 whitespace-nowrap">{f.facCessionPct}% / USD {fmtM(f.facCessionAmount)}</td>
                      <td className="px-4 py-4 font-mono text-xs text-emerald-400 whitespace-nowrap font-semibold">USD {fmt(f.facPremium)}</td>
                      <td className="px-4 py-4"><div className="space-y-0.5">{f.reinsurers.map((r, i) => (<div key={i} className={`text-[10px] ${RI_TEXT[i % RI_TEXT.length]}`}>{r.name} ({r.share}%)</div>))}</div></td>
                      <td className="px-4 py-4"><StatusBadge status={f.status} /></td>
                      <td className="px-4 py-4">
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={e => { e.stopPropagation(); setSelectedFac(f) }} className="p-1.5 rounded bg-slate-800 text-slate-500 hover:text-violet-400 transition-colors"><Eye size={12} /></button>
                          <button onClick={e => { e.stopPropagation(); printFacSlip(f) }} className="p-1.5 rounded bg-slate-800 text-slate-500 hover:text-slate-200 transition-colors"><Printer size={12} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'bordereau' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-300 font-semibold">Monthly Bordereau — February 2026</span>
                <span className="text-xs px-2 py-0.5 rounded bg-helix-600/20 text-helix-400 border border-helix-600/30">QS-MOT-2026</span>
              </div>
              <button onClick={() => exportBordereau(BORDEREAU)} className="flex items-center gap-2 px-3 py-2 glass-light text-slate-300 rounded-xl border border-slate-700 text-xs hover:text-white transition-colors">
                <Download size={13} /> Export CSV
              </button>
            </div>
            <div className="glass-light rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800/50">
                    {['Policy Ref', 'Insured', 'Class', 'GWP (USD)', 'Ceding %', 'RI Cession (USD)', 'RI Commission (USD)', 'Note'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[9.5px] font-semibold text-slate-500 uppercase tracking-wide first:pl-5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {BORDEREAU.map((b, i) => (
                    <tr key={i} className="border-b border-slate-800/30 last:border-0 hover:bg-slate-800/20 transition-colors">
                      <td className="px-4 pl-5 py-3.5 font-mono text-xs text-helix-400">{b.policyRef}</td>
                      <td className="px-4 py-3.5 text-slate-200 font-medium">{b.insured}</td>
                      <td className="px-4 py-3.5"><span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">{b.class}</span></td>
                      <td className="px-4 py-3.5 font-mono text-slate-300 text-xs">{fmt(b.gwp)}</td>
                      <td className="px-4 py-3.5 font-mono text-slate-400 text-xs">{b.cedingPct}%</td>
                      <td className="px-4 py-3.5 font-mono text-violet-400 text-xs font-semibold">{fmt(b.cession)}</td>
                      <td className="px-4 py-3.5 font-mono text-emerald-400 text-xs">{fmt(b.commission)}</td>
                      <td className="px-4 py-3.5 text-xs text-slate-600">{b.note || ''}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-slate-700/50 bg-slate-900/40">
                    <td colSpan={3} className="px-4 pl-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">MONTHLY TOTALS</td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-200">{fmt(bordereauGWP)}</td>
                    <td className="px-4 py-3" />
                    <td className="px-4 py-3 font-mono font-bold text-violet-300">{fmt(totalCession)}</td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-300">{fmt(BORDEREAU.reduce((a,b)=>a+b.commission,0))}</td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total GWP', value: `USD ${fmt(bordereauGWP)}`, color: 'text-slate-200' },
                { label: 'Total Cession', value: `USD ${fmt(totalCession)}`, color: 'text-violet-400' },
                { label: 'Total Commission', value: `USD ${fmt(BORDEREAU.reduce((a,b)=>a+b.commission,0))}`, color: 'text-emerald-400' },
              ].map(({ label, value, color }) => (
                <div key={label} className="p-4 glass-light rounded-xl border border-slate-800/50 flex justify-between items-center">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className={`font-mono font-bold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'markets' && (
          <div className="glass-light rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800/50">
                  {['Reinsurer', 'Country', 'S&P Rating', 'Type', 'Active Treaties', ''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[9.5px] font-semibold text-slate-500 uppercase tracking-wide first:pl-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RI_MARKETS.map((m, i) => {
                  const activeTreaty = TREATIES.filter(t => t.reinsurers.some(r => r.name === m.name))
                  const activeFac = FACULTIES.filter(f => f.reinsurers.some(r => r.name === m.name))
                  return (
                    <tr key={i} className="border-b border-slate-800/30 last:border-0 hover:bg-slate-800/20 transition-colors">
                      <td className="px-4 pl-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl ${RI_COLORS[i % RI_COLORS.length]}/20 flex items-center justify-center flex-shrink-0`}>
                            <span className={`text-xs font-bold ${RI_TEXT[i % RI_TEXT.length]}`}>{m.name.charAt(0)}</span>
                          </div>
                          <span className="font-semibold text-slate-200">{m.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-400 text-sm">{m.country}</td>
                      <td className="px-4 py-4"><span className="font-mono text-sm font-bold text-helix-400 bg-helix-900/20 px-2 py-0.5 rounded border border-helix-700/30">{m.rating}</span></td>
                      <td className="px-4 py-4"><span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">{m.type}</span></td>
                      <td className="px-4 py-4">
                        <div className="text-xs text-slate-400">{activeTreaty.length} treaties, {activeFac.length} fac</div>
                        {activeTreaty.slice(0,2).map(t => <div key={t.code} className="text-[10px] font-mono text-helix-500 mt-0.5">{t.code}</div>)}
                      </td>
                      <td className="px-4 py-4"><button className="p-1.5 rounded bg-slate-800 text-slate-500 hover:text-slate-200 transition-colors"><Send size={12} /></button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
