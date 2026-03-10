import React, { useState } from 'react'
import {
  Search, Download, Eye, Shield, Calendar, AlertTriangle, X,
  Printer, ChevronRight, Car, User, FileText, CheckCircle,
  Phone, Mail, MapPin, Hash, DollarSign, Edit3, Send,
  RefreshCw, Copy, Building2, Percent, FileStack, Zap
} from 'lucide-react'

// ─── Full Policy Dataset ──────────────────────────────────────────────────────
const POLICIES = [
  {
    id: 'HLX-POL-004521', quoteRef: 'QTE-2026-00089', status: 'active',
    insured: 'Mrs. Rutendo Moyo', idType: 'National ID', idNumber: '63-149821 B21',
    phone: '+263 77 234 5678', email: 'r.moyo@gmail.com',
    address: '14 Fife Ave, Belgravia, Harare', occupation: 'Civil Servant',
    broker: 'Direct', brokerRef: '',
    vehicleClass: 'Private', make: 'Toyota', model: 'Corolla 1.6 GLE', year: '2020',
    regNo: 'GRD 4821', chassisNo: 'JTDBZ3EE50J012345', engineNo: '1ZZE123456',
    bodyType: 'Saloon', use: 'Private Use', colour: 'Silver Metallic', seats: 5, cc: 1600,
    modified: false, modDetails: '', trackerInstalled: true, trackerProvider: 'Tracker Zimbabwe',
    driverName: 'Rutendo Moyo', driverLicenceNo: 'ZIM-2345678',
    licenceClass: 'Class 2 - Light Motor Vehicle', driverDOB: '1985-06-14',
    yearsLicensed: 12, claimsHistory: 'None',
    previousInsurer: 'Old Mutual Insurance', previousPolicyNo: 'OML-2025-POL-4421',
    cover: 'Comprehensive', currency: 'USD', sumInsured: 18000, agreedValue: false,
    startDate: '2026-01-15', endDate: '2027-01-14', thirdPartyLimit: 50000,
    extensions: ['Windscreen & Glass Cover', 'Emergency Roadside Rescue'],
    specialConditions: 'Vehicle to be kept in secured parking overnight.',
    warrantyConditions: 'Tracking device warranty applies.',
    basicRate: 4.5, ncdYears: 5, ncdPct: 30, youngDriverLoading: 0, highValueLoading: 0,
    stampDutyPct: 3, levyPct: 1,
    netRate: 3.5, netPremium: 630, extPremium: 180, stampDuty: 24.3, levy: 8.1,
    grossPremium: 1240, compulsoryExcess: 500, voluntaryExcess: 0,
    leadInsurer: 'Old Mutual Insurance', insurerShare: 100,
    reinsured: false, reinsurer: '', cedingPct: 0,
    issueDate: '2026-01-10', underwriter: 'T. Banda', endorsements: [],
  },
  {
    id: 'HLX-POL-004520', quoteRef: 'QTE-2026-00085', status: 'active',
    insured: 'Econet Wireless Zimbabwe', idType: 'Company (CRN)', idNumber: '1234/2001',
    phone: '+263 242 700 000', email: 'insurance@econet.co.zw',
    address: '2 Old Mutual Centre, Jason Moyo Ave, Harare', occupation: 'Telecommunications',
    broker: 'Riskwise Brokers', brokerRef: 'RW-2026-FL-0081',
    vehicleClass: 'Fleet', make: 'Toyota', model: 'Hilux (Fleet x28)', year: '2022/2023',
    regNo: 'Fleet x28', chassisNo: 'Multiple', engineNo: 'Multiple',
    bodyType: 'Pick-up / Truck', use: 'Business Use', colour: 'White', seats: 5, cc: 2400,
    modified: false, modDetails: '', trackerInstalled: true, trackerProvider: 'Ctrack Zimbabwe',
    driverName: 'Various Drivers', driverLicenceNo: 'Multiple',
    licenceClass: 'Class 2 - Light Motor Vehicle', driverDOB: '',
    yearsLicensed: 0, claimsHistory: '1 Claim',
    previousInsurer: 'ZIMNAT Insurance', previousPolicyNo: 'ZIM-2025-FL-0144',
    cover: 'Comprehensive', currency: 'USD', sumInsured: 1200000, agreedValue: false,
    startDate: '2026-01-01', endDate: '2026-12-31', thirdPartyLimit: 100000,
    extensions: ['Personal Accident (Driver & Occupants)', 'Emergency Roadside Rescue', 'Riot, Strike & Civil Commotion'],
    specialConditions: 'Fleet vehicles to be kept in secured Econet depot overnight.',
    warrantyConditions: 'Ctrack tracking device warranty. Vehicles must have valid ZRP roadworthiness.',
    basicRate: 4.5, ncdYears: 2, ncdPct: 20, youngDriverLoading: 0, highValueLoading: 0.25,
    stampDutyPct: 3, levyPct: 1,
    netRate: 3.75, netPremium: 39200, extPremium: 1560, stampDuty: 1222, levy: 407,
    grossPremium: 42800, compulsoryExcess: 1000, voluntaryExcess: 500,
    leadInsurer: 'Old Mutual Insurance', insurerShare: 60,
    reinsured: true, reinsurer: 'Munich Re', cedingPct: 40,
    issueDate: '2025-12-20', underwriter: 'J. Mutasa',
    endorsements: [{ ref: 'END-001', date: '2026-01-15', desc: 'Addition of 2 vehicles to fleet schedule' }],
  },
  {
    id: 'HLX-POL-004519', quoteRef: 'QTE-2026-00081', status: 'active',
    insured: 'Mr. Tatenda Sibanda', idType: 'National ID', idNumber: '44-201453 A73',
    phone: '+263 71 987 6543', email: 't.sibanda@yahoo.com',
    address: '8 Chiremba Rd, Waterfalls, Harare', occupation: 'Self-employed',
    broker: 'Direct', brokerRef: '',
    vehicleClass: 'Private', make: 'Honda', model: 'Fit 1.3', year: '2015',
    regNo: 'GCE 2218', chassisNo: 'JHMGD384X5S012345', engineNo: 'L13A9876543',
    bodyType: 'Saloon', use: 'Private Use', colour: 'Blue', seats: 5, cc: 1300,
    modified: false, modDetails: '', trackerInstalled: false, trackerProvider: '',
    driverName: 'Tatenda Sibanda', driverLicenceNo: 'ZIM-7654321',
    licenceClass: 'Class 2 - Light Motor Vehicle', driverDOB: '1995-03-22',
    yearsLicensed: 2, claimsHistory: 'None',
    previousInsurer: '', previousPolicyNo: '',
    cover: 'Third Party Fire & Theft', currency: 'USD', sumInsured: 12000, agreedValue: false,
    startDate: '2026-02-01', endDate: '2027-01-31', thirdPartyLimit: 50000,
    extensions: [], specialConditions: '', warrantyConditions: '',
    basicRate: 3.8, ncdYears: 0, ncdPct: 0, youngDriverLoading: 0.75, highValueLoading: 0,
    stampDutyPct: 3, levyPct: 1,
    netRate: 4.55, netPremium: 546, extPremium: 0, stampDuty: 16.38, levy: 5.46,
    grossPremium: 680, compulsoryExcess: 500, voluntaryExcess: 0,
    leadInsurer: 'ZIMNAT Insurance', insurerShare: 100,
    reinsured: false, reinsurer: '', cedingPct: 0,
    issueDate: '2026-01-28', underwriter: 'M. Dube', endorsements: [],
  },
  {
    id: 'HLX-POL-004518', quoteRef: 'QTE-2025-00198', status: 'expiring',
    insured: 'Harare City Council', idType: 'Company (CRN)', idNumber: '0001/1890',
    phone: '+263 242 703 500', email: 'fleet@hararecity.gov.zw',
    address: 'Town House, Julius Nyerere Way, Harare', occupation: 'Local Government',
    broker: 'Skybridge-Re', brokerRef: 'SKY-2025-PSV-0044',
    vehicleClass: 'PSV', make: 'Isuzu', model: 'NPR Bus (Fleet x14)', year: '2018',
    regNo: 'Fleet x14', chassisNo: 'Multiple', engineNo: 'Multiple',
    bodyType: 'Minibus', use: 'Public Hire', colour: 'Orange/White', seats: 30, cc: 3000,
    modified: false, modDetails: '', trackerInstalled: false, trackerProvider: '',
    driverName: 'Various Drivers', driverLicenceNo: 'Multiple',
    licenceClass: 'Class 5 - PSV', driverDOB: '',
    yearsLicensed: 0, claimsHistory: '2 Claims',
    previousInsurer: 'First Mutual Insurance', previousPolicyNo: 'FML-2024-PSV-0031',
    cover: 'Third Party Only', currency: 'USD', sumInsured: 0, agreedValue: false,
    startDate: '2025-12-01', endDate: '2026-11-30', thirdPartyLimit: 100000,
    extensions: ['Personal Accident (Driver & Occupants)'],
    specialConditions: 'All vehicles must have valid ZRP fitness certificate.',
    warrantyConditions: 'Roadworthiness warranty — all vehicles to pass annual ZRP inspection.',
    basicRate: 3.2, ncdYears: 1, ncdPct: 10, youngDriverLoading: 0, highValueLoading: 0,
    stampDutyPct: 3, levyPct: 1,
    netRate: 3.2, netPremium: 7700, extPremium: 420, stampDuty: 243, levy: 81,
    grossPremium: 8400, compulsoryExcess: 0, voluntaryExcess: 0,
    leadInsurer: 'Sanctuary Insurance', insurerShare: 100,
    reinsured: false, reinsurer: '', cedingPct: 0,
    issueDate: '2025-11-25', underwriter: 'J. Mutasa', endorsements: [],
  },
  {
    id: 'HLX-POL-004517', quoteRef: 'QTE-2025-00172', status: 'active',
    insured: 'Mr. Raymond Chimhanda', idType: 'National ID', idNumber: '75-330211 C48',
    phone: '+263 77 401 2233', email: 'rchimhanda@gmail.com',
    address: '22 Borrowdale Rd, Borrowdale, Harare', occupation: 'Business Executive',
    broker: 'Direct', brokerRef: '',
    vehicleClass: 'Private', make: 'Mazda', model: 'CX-5 2.5 AWD', year: '2023',
    regNo: 'GAB 4401', chassisNo: 'JM3KE4DY8P0012345', engineNo: 'SKYACTIV12345',
    bodyType: 'SUV / 4x4', use: 'Private Use', colour: 'Soul Red Crystal', seats: 5, cc: 2500,
    modified: false, modDetails: '', trackerInstalled: true, trackerProvider: 'Ctrack Zimbabwe',
    driverName: 'Raymond Chimhanda', driverLicenceNo: 'ZIM-4401122',
    licenceClass: 'Class 2 - Light Motor Vehicle', driverDOB: '1978-11-05',
    yearsLicensed: 20, claimsHistory: 'None',
    previousInsurer: 'ZIMNAT Insurance', previousPolicyNo: 'ZIM-2025-POL-7841',
    cover: 'Comprehensive', currency: 'USD', sumInsured: 32000, agreedValue: true,
    startDate: '2025-09-01', endDate: '2026-08-31', thirdPartyLimit: 50000,
    extensions: ['Windscreen & Glass Cover', 'Car Hire / Courtesy Vehicle', 'Emergency Roadside Rescue'],
    specialConditions: 'Agreed value basis — total loss settlement at USD 32,000.',
    warrantyConditions: 'Ctrack warranty. Agreed value subject to annual review.',
    basicRate: 4.5, ncdYears: 7, ncdPct: 40, youngDriverLoading: 0, highValueLoading: 0.5,
    stampDutyPct: 3, levyPct: 1,
    netRate: 3.1, netPremium: 2200, extPremium: 480, stampDuty: 80.4, levy: 26.8,
    grossPremium: 2400, compulsoryExcess: 750, voluntaryExcess: 250,
    leadInsurer: 'ZIMNAT Insurance', insurerShare: 100,
    reinsured: false, reinsurer: '', cedingPct: 0,
    issueDate: '2025-08-28', underwriter: 'T. Banda',
    endorsements: [{ ref: 'END-001', date: '2025-10-01', desc: 'Agreed value increased from USD 30,000 to USD 32,000' }],
  },
  {
    id: 'HLX-POL-004516', quoteRef: 'QTE-2025-00159', status: 'expired',
    insured: 'Delta Beverages Ltd', idType: 'Company (CRN)', idNumber: '3400/1997',
    phone: '+263 242 700 500', email: 'risk@delta.co.zw',
    address: '1 Seke Road, Graniteside, Harare', occupation: 'Manufacturing / FMCG',
    broker: 'Skybridge-Re', brokerRef: 'SKY-2025-CM-0092',
    vehicleClass: 'Commercial', make: 'Mercedes-Benz', model: 'Actros (Fleet x52)', year: '2019-2022',
    regNo: 'Fleet x52', chassisNo: 'Multiple', engineNo: 'Multiple',
    bodyType: 'Truck', use: 'Commercial Carriage', colour: 'Red/White', seats: 2, cc: 12000,
    modified: false, modDetails: '', trackerInstalled: true, trackerProvider: 'MixTelematics',
    driverName: 'Various Drivers', driverLicenceNo: 'Multiple',
    licenceClass: 'Class 3 - Heavy Motor Vehicle', driverDOB: '',
    yearsLicensed: 0, claimsHistory: '1 Claim',
    previousInsurer: 'Cell Insurance', previousPolicyNo: 'CEL-2024-CM-0055',
    cover: 'Comprehensive', currency: 'USD', sumInsured: 4800000, agreedValue: false,
    startDate: '2025-02-15', endDate: '2026-02-14', thirdPartyLimit: 200000,
    extensions: ['Personal Accident (Driver & Occupants)', 'Riot, Strike & Civil Commotion', 'Emergency Roadside Rescue'],
    specialConditions: 'All drivers must hold valid Class 3 licence. Vehicles restricted to designated trade routes.',
    warrantyConditions: 'MixTelematics tracking warranty. Speed governor warranty — max 100km/h.',
    basicRate: 4.8, ncdYears: 1, ncdPct: 10, youngDriverLoading: 0, highValueLoading: 0.5,
    stampDutyPct: 3, levyPct: 1,
    netRate: 5.3, netPremium: 90100, extPremium: 5220, stampDuty: 2859, levy: 953,
    grossPremium: 98400, compulsoryExcess: 2000, voluntaryExcess: 1000,
    leadInsurer: 'ZIMNAT Insurance', insurerShare: 50,
    reinsured: true, reinsurer: 'Swiss Re', cedingPct: 60,
    issueDate: '2025-02-10', underwriter: 'J. Mutasa', endorsements: [],
  },
]

const STATUS = {
  active:   { label: 'Active',        color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-600/30', dot: 'bg-emerald-400' },
  expiring: { label: 'Expiring Soon', color: 'text-amber-400',   bg: 'bg-amber-400/10',   border: 'border-amber-600/30',   dot: 'bg-amber-400'   },
  expired:  { label: 'Expired',       color: 'text-rose-400',    bg: 'bg-rose-400/10',    border: 'border-rose-600/30',    dot: 'bg-rose-400'    },
}

function fmt(v) {
  return (parseFloat(v) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function daysUntil(d) {
  return Math.ceil((new Date(d) - new Date()) / 86400000)
}

// ─── Print Policy Schedule ────────────────────────────────────────────────────
function printPolicy(p) {
  const s = STATUS[p.status]
  const badgeBg = p.status === 'active' ? '#d1fae5' : p.status === 'expiring' ? '#fef3c7' : '#fee2e2'
  const badgeClr = p.status === 'active' ? '#065f46' : p.status === 'expiring' ? '#92400e' : '#991b1b'
  const rows = (arr) => arr.map(([l, v]) => `<div class="row"><span class="lbl">${l}</span><span class="val">${v || '—'}</span></div>`).join('')
  const html = `<!DOCTYPE html><html><head><title>Policy Schedule — ${p.id}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;padding:30px;font-size:11px;line-height:1.6}
.header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:18px;border-bottom:3px solid #2563eb;margin-bottom:22px}
.logo{font-size:22px;font-weight:900;color:#0f172a;letter-spacing:-1px}.logo span{color:#2563eb}
.co-sub{font-size:9.5px;color:#94a3b8;margin-top:2px}
.pno{font-size:18px;font-weight:800;color:#2563eb;font-family:monospace;letter-spacing:1px;margin-top:10px}
.badge{display:inline-block;padding:2px 10px;border-radius:20px;font-size:9.5px;font-weight:700;letter-spacing:.05em;background:${badgeBg};color:${badgeClr};margin-top:4px;text-transform:uppercase}
.hdr-r{text-align:right;font-size:10px;color:#64748b;line-height:2}
.hdr-r strong{color:#1e293b}
.sec-title{font-size:9px;font-weight:800;color:#2563eb;text-transform:uppercase;letter-spacing:.1em;border-left:3px solid #2563eb;padding-left:7px;margin-bottom:8px}
.card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;height:100%}
.row{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid #f1f5f9;padding:3.5px 0}
.lbl{color:#64748b;font-size:10px;flex-shrink:0;padding-right:8px}
.val{color:#1e293b;font-weight:500;font-size:10px;text-align:right}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
.prem-box{background:linear-gradient(135deg,#eff6ff,#dbeafe);border:2px solid #93c5fd;border-radius:8px;padding:14px;text-align:center;margin-top:10px}
.gross-label{font-size:9px;color:#1e40af;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px}
.gross-val{font-size:24px;font-weight:900;color:#1e40af;font-family:monospace;letter-spacing:1px}
.ext{display:inline-block;background:#dbeafe;color:#1e40af;border:1px solid #bfdbfe;border-radius:3px;padding:1px 7px;font-size:9.5px;margin:2px;font-weight:500}
.cond{background:#fff;border:1px solid #e2e8f0;border-radius:5px;padding:8px;color:#475569;line-height:1.5;margin-top:4px;font-size:10px}
.cond-lbl{font-size:8.5px;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;margin-top:8px;margin-bottom:2px;font-weight:700}
table{width:100%;border-collapse:collapse;font-size:10px}
th{background:#2563eb;color:#fff;padding:6px 8px;text-align:left;font-size:8.5px;text-transform:uppercase;letter-spacing:.08em}
td{padding:5px 8px;border-bottom:1px solid #f1f5f9}
tr:nth-child(even) td{background:#f8fafc}
.sig-area{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-top:36px}
.sig-box{border-top:1px solid #cbd5e1;padding-top:5px;font-size:9px;color:#94a3b8;line-height:1.9}
.sig-box strong{color:#475569}
.footer{margin-top:20px;padding-top:10px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;font-size:9px;color:#94a3b8}
@media print{body{padding:16px}@page{margin:.8cm;size:A4}}
</style></head><body>

<div class="header">
  <div>
    <div class="logo">HELIX<span>.</span></div>
    <div class="co-sub">Motor Insurance &amp; Reinsurance System — Zimbabwe</div>
    <div class="pno">${p.id}</div>
    <div class="badge">${s.label}</div>
  </div>
  <div class="hdr-r">
    <div style="font-size:15px;font-weight:800;color:#0f172a;letter-spacing:-.5px">POLICY SCHEDULE</div>
    <div>Issue Date: <strong>${p.issueDate}</strong></div>
    <div>Underwriter: <strong>${p.underwriter}</strong></div>
    <div>Quote Ref: <strong>${p.quoteRef}</strong></div>
    <div>Broker: <strong>${p.broker}${p.brokerRef ? ' — ' + p.brokerRef : ''}</strong></div>
  </div>
</div>

<div class="grid2">
  <div class="card">
    <div class="sec-title">Insured Details</div>
    ${rows([['Insured Name', p.insured], ['ID Type', p.idType], ['ID Number', p.idNumber], ['Phone', p.phone], ['Email', p.email], ['Address', p.address], ['Occupation / Business', p.occupation]])}
  </div>
  <div class="card">
    <div class="sec-title">Vehicle Particulars</div>
    ${rows([['Vehicle Class', p.vehicleClass], ['Make', p.make], ['Model', p.model], ['Year of Manufacture', p.year], ['Registration No.', p.regNo], ['Chassis / VIN No.', p.chassisNo], ['Engine No.', p.engineNo], ['Body Type', p.bodyType], ['Use of Vehicle', p.use], ['Engine Capacity', p.cc ? p.cc + ' cc' : '—'], ['Colour', p.colour], ['Number of Seats', p.seats], ['Tracking Device', p.trackerInstalled ? 'Yes — ' + p.trackerProvider : 'None fitted']])}
  </div>
</div>

<div class="grid2">
  <div class="card">
    <div class="sec-title">Principal Driver</div>
    ${rows([['Driver Name', p.driverName], ['Licence No.', p.driverLicenceNo], ['Licence Class', p.licenceClass], ['Date of Birth', p.driverDOB || '—'], ['Years Licensed', p.yearsLicensed || '—'], ['Claims History (3yr)', p.claimsHistory]])}
    ${p.previousInsurer ? `<div class="sec-title" style="margin-top:10px">Previous Insurance</div>${rows([['Previous Insurer', p.previousInsurer], ['Previous Policy No.', p.previousPolicyNo]])}` : ''}
  </div>
  <div class="card">
    <div class="sec-title">Cover &amp; Policy Period</div>
    ${rows([['Cover Type', p.cover], ['Currency', p.currency], ['Sum Insured', p.sumInsured > 0 ? p.currency + ' ' + fmt(p.sumInsured) : 'N/A (TP)'], ['Agreed Value Basis', p.agreedValue ? 'Yes' : 'No'], ['Inception Date', p.startDate], ['Expiry Date', p.endDate], ['Third Party Prop. Limit', p.currency + ' ' + fmt(p.thirdPartyLimit)], ['Compulsory Excess', p.currency + ' ' + fmt(p.compulsoryExcess)], ['Voluntary Excess', p.currency + ' ' + fmt(p.voluntaryExcess)]])}
    <div style="margin-top:8px"><div class="sec-title" style="margin-bottom:5px">Extensions &amp; Additional Covers</div>
    ${p.extensions.length ? p.extensions.map(e => `<span class="ext">${e}</span>`).join('') : '<span style="color:#94a3b8;font-size:9.5px">No extensions selected</span>'}
    </div>
  </div>
</div>

<div class="grid2">
  <div class="card">
    <div class="sec-title">Premium Rating &amp; Breakdown</div>
    ${rows([['Basic Rate', p.basicRate + '%'], ['NCD Discount', p.ncdPct + '% (' + p.ncdYears + ' yr)'], ...(p.youngDriverLoading > 0 ? [['Young Driver Loading', '+' + p.youngDriverLoading + '%']] : []), ...(p.highValueLoading > 0 ? [['High Value Loading', '+' + p.highValueLoading + '%']] : []), ['Effective Net Rate', p.netRate + '%'], ['Net Premium', p.currency + ' ' + fmt(p.netPremium)], ['Extensions Premium', p.currency + ' ' + fmt(p.extPremium)], ['Stamp Duty (' + p.stampDutyPct + '%)', p.currency + ' ' + fmt(p.stampDuty)], ['Regulatory Levy (' + p.levyPct + '%)', p.currency + ' ' + fmt(p.levy)]])}
    <div class="prem-box">
      <div class="gross-label">Gross Annual Premium Payable</div>
      <div class="gross-val">${p.currency} ${fmt(p.grossPremium)}</div>
    </div>
  </div>
  <div class="card">
    <div class="sec-title">Placement &amp; Reinsurance</div>
    ${rows([['Lead Insurer', p.leadInsurer], ['Insurer Share', p.insurerShare + '%'], ['Reinsurance', p.reinsured ? 'Required' : 'Not Required'], ...(p.reinsured ? [['Reinsurer', p.reinsurer], ['Premium Ceded', p.cedingPct + '%'], ['Retention', (100 - p.cedingPct) + '%']] : [])])}
    ${p.specialConditions ? `<div class="cond-lbl">Special Conditions</div><div class="cond">${p.specialConditions}</div>` : ''}
    ${p.warrantyConditions ? `<div class="cond-lbl">Warranty Conditions</div><div class="cond">${p.warrantyConditions}</div>` : ''}
  </div>
</div>

${p.endorsements.length > 0 ? `
<div class="card" style="margin-bottom:14px">
  <div class="sec-title">Policy Endorsements</div>
  <table><thead><tr><th>Endorsement Ref.</th><th>Date</th><th>Description</th></tr></thead><tbody>
  ${p.endorsements.map(e => `<tr><td style="font-family:monospace;font-weight:700">${e.ref}</td><td>${e.date}</td><td>${e.desc}</td></tr>`).join('')}
  </tbody></table>
</div>` : ''}

<div class="sig-area">
  <div><div class="sig-box"><strong>Policyholder</strong><br>${p.insured}<br><br>Signature: _________________<br>Date: ____________________</div></div>
  <div><div class="sig-box"><strong>Authorised Signatory</strong><br>HELIX Motor Insurance<br><br>Signature: _________________<br>Date: ____________________</div></div>
  <div><div class="sig-box"><strong>Broker / Intermediary</strong><br>${p.broker}<br><br>Signature: _________________<br>Date: ____________________</div></div>
</div>

<div class="footer">
  <span>HELIX Motor Insurance &amp; Reinsurance System — Computer generated document. Valid without wet signature unless otherwise stipulated by endorsement.</span>
  <span>${p.id} | Issued: ${p.issueDate}</span>
</div>
</body></html>`

  const w = window.open('', '_blank', 'width=1060,height=820')
  w.document.write(html)
  w.document.close()
  w.focus()
  setTimeout(() => w.print(), 600)
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SecHead({ icon: Icon, children, sub }) {
  return (
    <div className="mb-4 pb-2.5 border-b border-slate-800/60 flex items-center gap-2.5">
      {Icon && <Icon size={13} className="text-helix-500 flex-shrink-0" />}
      <div>
        <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">{children}</div>
        {sub && <div className="text-[10px] text-slate-600 mt-0.5">{sub}</div>}
      </div>
    </div>
  )
}

// ─── Info Row ─────────────────────────────────────────────────────────────────
function InfoRow({ label, value, mono, highlight }) {
  return (
    <div className="flex justify-between items-baseline gap-4 py-1.5 border-b border-slate-800/25 last:border-0">
      <span className="text-[11px] text-slate-500 flex-shrink-0">{label}</span>
      <span className={`text-[11px] text-right truncate ${highlight ? 'text-helix-300 font-bold font-mono text-sm' : mono ? 'font-mono text-slate-300' : 'text-slate-300'}`}>
        {value || '—'}
      </span>
    </div>
  )
}

// ─── Panel ────────────────────────────────────────────────────────────────────
function Panel({ children, className = '' }) {
  return (
    <div className={`p-4 bg-slate-800/30 rounded-xl border border-slate-700/40 ${className}`}>
      {children}
    </div>
  )
}

// ─── Full Policy Modal ────────────────────────────────────────────────────────
function PolicyModal({ policy: p, onClose }) {
  const [activeTab, setActiveTab] = useState('overview')
  const s = STATUS[p.status]
  const days = daysUntil(p.endDate)

  const tabs = [
    { id: 'overview',   label: 'Overview' },
    { id: 'vehicle',    label: 'Vehicle & Driver' },
    { id: 'cover',      label: 'Cover & Terms' },
    { id: 'premium',    label: 'Premium' },
    { id: 'placement',  label: 'Placement' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(2,6,23,0.92)' }}>
      <div className="w-full max-w-5xl max-h-[94vh] flex flex-col glass rounded-2xl border border-slate-700/40 overflow-hidden">

        {/* Modal Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-800/50 flex-shrink-0">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-helix-600/20 border border-helix-600/30 flex items-center justify-center flex-shrink-0">
              <Shield size={18} className="text-helix-400" />
            </div>
            <div>
              <div className="font-mono text-helix-400 text-xs mb-0.5 tracking-wider">{p.id}</div>
              <div className="font-display text-xl font-bold text-white">{p.insured}</div>
              <div className="flex items-center gap-3 mt-1.5">
                <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${s.bg} ${s.color} ${s.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
                </span>
                <span className="text-slate-600 text-xs">{p.cover}</span>
                <span className="text-slate-700 text-xs">•</span>
                <span className="text-slate-600 text-xs">{p.vehicleClass}</span>
                {days > 0 && days < 60 && (
                  <span className="text-amber-400 text-xs flex items-center gap-1">
                    <AlertTriangle size={11} /> {days}d remaining
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => printPolicy(p)}
              className="flex items-center gap-1.5 px-3 py-1.5 glass-light text-slate-300 rounded-lg text-xs border border-slate-700 hover:text-white hover:border-helix-600/40 transition-colors">
              <Printer size={13} /> Print / Export
            </button>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-200 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-3 pb-0 border-b border-slate-800/50 flex-shrink-0 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === t.id ? 'bg-helix-600/20 text-helix-300 border-b-2 border-helix-500' : 'text-slate-500 hover:text-slate-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* ── OVERVIEW ── */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Key metrics */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Sum Insured', value: p.sumInsured > 0 ? `${p.currency} ${fmt(p.sumInsured)}` : 'N/A', color: 'text-helix-300' },
                  { label: 'Gross Premium', value: `${p.currency} ${fmt(p.grossPremium)}`, color: 'text-emerald-400' },
                  { label: 'Policy Period', value: `${p.startDate} → ${p.endDate}`, color: 'text-slate-300' },
                  { label: days > 0 ? 'Days Remaining' : 'Expired', value: days > 0 ? `${days} days` : `${Math.abs(days)}d ago`, color: days > 30 ? 'text-emerald-400' : days > 0 ? 'text-amber-400' : 'text-rose-400' },
                ].map(({ label, value, color }) => (
                  <Panel key={label}>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">{label}</div>
                    <div className={`text-sm font-bold ${color}`}>{value}</div>
                  </Panel>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Panel>
                  <SecHead icon={User}>Insured Details</SecHead>
                  <InfoRow label="Full Name" value={p.insured} />
                  <InfoRow label="ID Type" value={p.idType} />
                  <InfoRow label="ID Number" value={p.idNumber} mono />
                  <InfoRow label="Phone" value={p.phone} />
                  <InfoRow label="Email" value={p.email} />
                  <InfoRow label="Address" value={p.address} />
                  <InfoRow label="Occupation" value={p.occupation} />
                  <InfoRow label="Broker" value={p.broker} />
                  {p.brokerRef && <InfoRow label="Broker Reference" value={p.brokerRef} mono />}
                </Panel>
                <Panel>
                  <SecHead icon={FileText}>Policy Summary</SecHead>
                  <InfoRow label="Policy Number" value={p.id} mono />
                  <InfoRow label="Quote Reference" value={p.quoteRef} mono />
                  <InfoRow label="Issue Date" value={p.issueDate} />
                  <InfoRow label="Underwriter" value={p.underwriter} />
                  <InfoRow label="Cover Type" value={p.cover} />
                  <InfoRow label="Vehicle Class" value={p.vehicleClass} />
                  <InfoRow label="Inception Date" value={p.startDate} />
                  <InfoRow label="Expiry Date" value={p.endDate} />
                  <InfoRow label="Lead Insurer" value={p.leadInsurer} />
                  {p.reinsured && <InfoRow label="Reinsurer" value={p.reinsurer} />}
                </Panel>
              </div>

              {p.endorsements.length > 0 && (
                <Panel>
                  <SecHead icon={Edit3}>Endorsements</SecHead>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="text-left py-1.5 text-slate-500 font-medium">Ref.</th>
                        <th className="text-left py-1.5 text-slate-500 font-medium">Date</th>
                        <th className="text-left py-1.5 text-slate-500 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.endorsements.map(e => (
                        <tr key={e.ref} className="border-b border-slate-800/30">
                          <td className="py-2 font-mono text-helix-400">{e.ref}</td>
                          <td className="py-2 text-slate-400">{e.date}</td>
                          <td className="py-2 text-slate-300">{e.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Panel>
              )}
            </div>
          )}

          {/* ── VEHICLE & DRIVER ── */}
          {activeTab === 'vehicle' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Panel>
                  <SecHead icon={Car}>Vehicle Particulars</SecHead>
                  <InfoRow label="Vehicle Class" value={p.vehicleClass} />
                  <InfoRow label="Make" value={p.make} />
                  <InfoRow label="Model" value={p.model} />
                  <InfoRow label="Year of Manufacture" value={p.year} />
                  <InfoRow label="Registration No." value={p.regNo} mono />
                  <InfoRow label="Chassis / VIN No." value={p.chassisNo} mono />
                  <InfoRow label="Engine Number" value={p.engineNo} mono />
                  <InfoRow label="Body Type" value={p.bodyType} />
                  <InfoRow label="Use of Vehicle" value={p.use} />
                  <InfoRow label="Engine Capacity" value={p.cc ? `${p.cc} cc` : '—'} />
                  <InfoRow label="Colour" value={p.colour} />
                  <InfoRow label="Number of Seats" value={p.seats} />
                </Panel>
                <Panel>
                  <SecHead>Tracking & Security</SecHead>
                  <InfoRow label="Tracking Device Installed" value={p.trackerInstalled ? 'Yes' : 'No'} />
                  {p.trackerInstalled && <InfoRow label="Tracking Provider" value={p.trackerProvider} />}
                  <InfoRow label="Modified / Non-Standard" value={p.modified ? 'Yes' : 'No'} />
                  {p.modified && <InfoRow label="Modification Details" value={p.modDetails} />}
                </Panel>
              </div>
              <div className="space-y-4">
                <Panel>
                  <SecHead icon={User}>Principal Driver</SecHead>
                  <InfoRow label="Full Name" value={p.driverName} />
                  <InfoRow label="Licence Number" value={p.driverLicenceNo} mono />
                  <InfoRow label="Licence Class" value={p.licenceClass} />
                  <InfoRow label="Date of Birth" value={p.driverDOB || '—'} />
                  <InfoRow label="Years Licensed" value={p.yearsLicensed > 0 ? `${p.yearsLicensed} years` : '—'} />
                  <InfoRow label="Claims History (3yr)" value={p.claimsHistory} />
                </Panel>
                {(p.previousInsurer || p.previousPolicyNo) && (
                  <Panel>
                    <SecHead>Previous Insurance</SecHead>
                    <InfoRow label="Previous Insurer" value={p.previousInsurer} />
                    <InfoRow label="Previous Policy No." value={p.previousPolicyNo} mono />
                  </Panel>
                )}
              </div>
            </div>
          )}

          {/* ── COVER & TERMS ── */}
          {activeTab === 'cover' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Panel>
                  <SecHead icon={Shield}>Cover Details</SecHead>
                  <InfoRow label="Cover Type" value={p.cover} />
                  <InfoRow label="Currency" value={p.currency} />
                  <InfoRow label="Sum Insured" value={p.sumInsured > 0 ? `${p.currency} ${fmt(p.sumInsured)}` : 'N/A (Third Party)'} />
                  <InfoRow label="Agreed Value Basis" value={p.agreedValue ? 'Yes — Settled at agreed value' : 'No'} />
                  <InfoRow label="Inception Date" value={p.startDate} />
                  <InfoRow label="Expiry Date" value={p.endDate} />
                  <InfoRow label="Third Party Property Limit" value={`${p.currency} ${fmt(p.thirdPartyLimit)}`} />
                </Panel>
                <Panel>
                  <SecHead>Excess / Deductibles</SecHead>
                  <InfoRow label="Compulsory Excess" value={`${p.currency} ${fmt(p.compulsoryExcess)}`} />
                  <InfoRow label="Voluntary Excess" value={`${p.currency} ${fmt(p.voluntaryExcess)}`} />
                  <InfoRow label="Total Excess per Claim" value={`${p.currency} ${fmt(p.compulsoryExcess + p.voluntaryExcess)}`} highlight />
                </Panel>
              </div>
              <Panel>
                <SecHead>Extensions & Additional Covers</SecHead>
                {p.extensions.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {p.extensions.map(e => (
                      <span key={e} className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-helix-600/15 text-helix-300 border border-helix-600/30 rounded-lg">
                        <CheckCircle size={10} className="text-helix-400" />{e}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-600">No extensions selected for this policy.</p>
                )}
              </Panel>
              {(p.specialConditions || p.warrantyConditions) && (
                <div className="grid grid-cols-2 gap-4">
                  {p.specialConditions && (
                    <Panel>
                      <SecHead>Special Conditions</SecHead>
                      <p className="text-xs text-slate-400 leading-relaxed">{p.specialConditions}</p>
                    </Panel>
                  )}
                  {p.warrantyConditions && (
                    <Panel>
                      <SecHead>Warranty Conditions</SecHead>
                      <p className="text-xs text-slate-400 leading-relaxed">{p.warrantyConditions}</p>
                    </Panel>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── PREMIUM ── */}
          {activeTab === 'premium' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Panel>
                  <SecHead icon={Percent}>Rate Calculation</SecHead>
                  <InfoRow label="Basic Rate" value={`${p.basicRate}%`} />
                  <InfoRow label="NCD Discount" value={`— ${p.ncdPct}% (${p.ncdYears} year${p.ncdYears !== 1 ? 's' : ''})`} />
                  {p.youngDriverLoading > 0 && <InfoRow label="Young Driver Loading" value={`+ ${p.youngDriverLoading}%`} />}
                  {p.highValueLoading > 0 && <InfoRow label="High Value Loading" value={`+ ${p.highValueLoading}%`} />}
                  <div className="mt-2 pt-2 border-t border-slate-700/40">
                    <InfoRow label="Effective Net Rate" value={`${p.netRate}%`} highlight />
                  </div>
                </Panel>
                <Panel>
                  <SecHead icon={DollarSign}>Premium Breakdown</SecHead>
                  <InfoRow label="Sum Insured" value={`${p.currency} ${fmt(p.sumInsured)}`} />
                  <InfoRow label="Net Premium" value={`${p.currency} ${fmt(p.netPremium)}`} />
                  {p.extPremium > 0 && <InfoRow label="Extensions Premium" value={`${p.currency} ${fmt(p.extPremium)}`} />}
                  <InfoRow label={`Stamp Duty (${p.stampDutyPct}%)`} value={`${p.currency} ${fmt(p.stampDuty)}`} />
                  <InfoRow label={`Regulatory Levy (${p.levyPct}%)`} value={`${p.currency} ${fmt(p.levy)}`} />
                  <div className="mt-3 p-4 bg-helix-900/20 border border-helix-700/20 rounded-xl text-center">
                    <div className="text-[10px] text-helix-500 uppercase tracking-widest mb-1">Gross Annual Premium</div>
                    <div className="font-mono text-2xl font-black text-helix-300">{p.currency} {fmt(p.grossPremium)}</div>
                  </div>
                </Panel>
              </div>
              <div>
                <Panel className="h-full">
                  <SecHead>Visual Rate Breakdown</SecHead>
                  <div className="space-y-3 mt-2">
                    {[
                      { label: 'Net Premium', amount: p.netPremium, color: 'bg-helix-600', pct: (p.netPremium / p.grossPremium * 100) },
                      ...(p.extPremium > 0 ? [{ label: 'Extensions', amount: p.extPremium, color: 'bg-blue-500', pct: (p.extPremium / p.grossPremium * 100) }] : []),
                      { label: `Stamp Duty (${p.stampDutyPct}%)`, amount: p.stampDuty, color: 'bg-slate-500', pct: (p.stampDuty / p.grossPremium * 100) },
                      { label: `Levy (${p.levyPct}%)`, amount: p.levy, color: 'bg-slate-600', pct: (p.levy / p.grossPremium * 100) },
                    ].map(({ label, amount, color, pct }) => (
                      <div key={label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">{label}</span>
                          <span className="font-mono text-slate-300">{p.currency} {fmt(amount)}</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-slate-700/40">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-slate-200">TOTAL</span>
                        <span className="font-mono text-helix-300">{p.currency} {fmt(p.grossPremium)}</span>
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>
            </div>
          )}

          {/* ── PLACEMENT ── */}
          {activeTab === 'placement' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Panel>
                  <SecHead icon={Building2}>Lead Insurer</SecHead>
                  <InfoRow label="Lead Insurer" value={p.leadInsurer} />
                  <InfoRow label="Insurer Share" value={`${p.insurerShare}%`} />
                  <div className="mt-3">
                    <div className="text-[10px] text-slate-500 mb-1.5">Share Allocation</div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-helix-600 rounded-full" style={{ width: `${p.insurerShare}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                      <span>{p.leadInsurer}: {p.insurerShare}%</span>
                      {p.reinsured && <span>Ceded: {p.cedingPct}%</span>}
                    </div>
                  </div>
                </Panel>
                <Panel>
                  <SecHead>Reinsurance</SecHead>
                  <InfoRow label="Reinsurance Required" value={p.reinsured ? 'Yes' : 'No'} />
                  {p.reinsured ? (
                    <>
                      <InfoRow label="Reinsurer" value={p.reinsurer} />
                      <InfoRow label="Premium Ceded" value={`${p.cedingPct}%`} />
                      <InfoRow label="Retention" value={`${100 - p.cedingPct}%`} />
                      <InfoRow label="Premium Ceded Amount" value={`${p.currency} ${fmt(p.grossPremium * p.cedingPct / 100)}`} highlight />
                      <InfoRow label="Premium Retained" value={`${p.currency} ${fmt(p.grossPremium * (100 - p.cedingPct) / 100)}`} />
                      <div className="mt-3">
                        <div className="text-[10px] text-slate-500 mb-1.5">Risk Distribution</div>
                        <div className="h-3 rounded-full overflow-hidden flex">
                          <div className="h-full bg-emerald-600 transition-all" style={{ width: `${100 - p.cedingPct}%` }} />
                          <div className="h-full bg-blue-500 transition-all" style={{ width: `${p.cedingPct}%` }} />
                        </div>
                        <div className="flex justify-between text-[10px] mt-1">
                          <span className="text-emerald-500">Retained: {100 - p.cedingPct}%</span>
                          <span className="text-blue-400">Ceded ({p.reinsurer}): {p.cedingPct}%</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-slate-600 mt-2">No reinsurance arrangement for this policy. Risk fully retained.</p>
                  )}
                </Panel>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800/50 flex-shrink-0">
          <div className="text-[10px] text-slate-600 font-mono">{p.id} — Issued {p.issueDate} by {p.underwriter}</div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 glass-light text-slate-400 rounded-lg text-xs border border-slate-700 hover:text-slate-200 transition-colors">
              <Send size={12} /> Email Schedule
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 glass-light text-slate-400 rounded-lg text-xs border border-slate-700 hover:text-slate-200 transition-colors">
              <Copy size={12} /> Copy Policy No.
            </button>
            <button onClick={() => printPolicy(p)} className="flex items-center gap-1.5 px-4 py-1.5 bg-helix-600 hover:bg-helix-500 text-white rounded-lg text-xs font-semibold transition-colors">
              <Printer size={12} /> Print Policy Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Policies() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterClass, setFilterClass] = useState('all')
  const [filterCover, setFilterCover] = useState('all')
  const [viewing, setViewing] = useState(null)

  const classes = ['All', 'Private', 'Fleet', 'Commercial', 'PSV', 'Motorcycle']
  const covers = ['All', 'Comprehensive', 'Third Party Only', 'Third Party Fire & Theft']

  const filtered = POLICIES.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      p.insured.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.regNo.toLowerCase().includes(q) ||
      p.make.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q)
    const matchStatus = filterStatus === 'all' || p.status === filterStatus
    const matchClass = filterClass === 'all' || p.vehicleClass === filterClass
    const matchCover = filterCover === 'all' || p.cover === filterCover
    return matchSearch && matchStatus && matchClass && matchCover
  })

  const counts = {
    total: POLICIES.length,
    active: POLICIES.filter(p => p.status === 'active').length,
    expiring: POLICIES.filter(p => p.status === 'expiring').length,
    expired: POLICIES.filter(p => p.status === 'expired').length,
    gwp: POLICIES.filter(p => p.status === 'active').reduce((a, p) => a + p.grossPremium, 0),
  }

  const exportCSV = () => {
    const headers = ['Policy No.', 'Insured', 'Vehicle Class', 'Make', 'Model', 'Reg No.', 'Cover', 'Sum Insured', 'Gross Premium', 'Start Date', 'End Date', 'Status', 'Underwriter', 'Broker', 'Lead Insurer']
    const rows = POLICIES.map(p => [
      p.id, p.insured, p.vehicleClass, p.make, p.model, p.regNo, p.cover,
      p.sumInsured, p.grossPremium, p.startDate, p.endDate, p.status, p.underwriter, p.broker, p.leadInsurer
    ].map(v => `"${v}"`).join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'helix-policies.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {viewing && <PolicyModal policy={viewing} onClose={() => setViewing(null)} />}

      <div className="space-y-5">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Policies</h1>
            <p className="text-slate-500 text-sm mt-1">Active motor insurance policy register — view, print and export</p>
          </div>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 glass-light text-slate-300 hover:text-white rounded-xl border border-slate-700 text-sm transition-colors">
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-3">
          {[
            { label: 'Total Policies',    value: counts.total,   color: 'text-slate-300',   click: 'all'      },
            { label: 'Active',            value: counts.active,  color: 'text-emerald-400', click: 'active'   },
            { label: 'Expiring (30d)',    value: counts.expiring,color: 'text-amber-400',   click: 'expiring' },
            { label: 'Expired',           value: counts.expired, color: 'text-rose-400',    click: 'expired'  },
            { label: 'Active GWP',        value: `$${(counts.gwp / 1000).toFixed(0)}K`, color: 'text-helix-400', click: null },
          ].map(({ label, value, color, click }) => (
            <button key={label} onClick={() => click && setFilterStatus(filterStatus === click ? 'all' : click)}
              className={`p-3 rounded-xl border text-left transition-all ${click && filterStatus === click ? STATUS[click] ? `${STATUS[click].bg} ${STATUS[click].border}` : 'glass-light border-helix-600/40' : 'glass-light border-slate-800/50 hover:border-slate-700'}`}>
              <div className={`font-display text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{label}</div>
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by insured, policy no., reg no., make or model..."
              className="w-full pl-10 pr-4 py-2.5 glass-light rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none border border-transparent focus:border-helix-600/40" />
          </div>
          {[
            { val: filterClass, set: setFilterClass, opts: classes, placeholder: 'All Classes' },
            { val: filterCover, set: setFilterCover, opts: covers,  placeholder: 'All Cover Types' },
          ].map(({ val, set, opts, placeholder }, i) => (
            <select key={i} value={val} onChange={e => set(e.target.value)}
              className="px-3 py-2.5 bg-slate-900/60 border border-slate-700/60 rounded-xl text-sm text-slate-200 outline-none focus:border-helix-500/50 appearance-none">
              {opts.map(o => <option key={o} value={o === opts[0] ? 'all' : o}>{o}</option>)}
            </select>
          ))}
        </div>

        {/* Table */}
        <div className="glass-light rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800/50">
                {['Policy No.', 'Insured', 'Vehicle', 'Reg No.', 'Cover', 'Sum Insured', 'Premium', 'NCD', 'Expiry', 'Status', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wide first:pl-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={11} className="px-5 py-12 text-center text-slate-600 text-sm">No policies match your search.</td></tr>
              )}
              {filtered.map(p => {
                const s = STATUS[p.status]
                const days = daysUntil(p.endDate)
                return (
                  <tr key={p.id} onClick={() => setViewing(p)}
                    className="border-b border-slate-800/30 last:border-0 hover:bg-slate-800/25 cursor-pointer transition-colors group">
                    <td className="px-4 pl-5 py-4 font-mono text-xs text-helix-400 whitespace-nowrap">{p.id}</td>
                    <td className="px-4 py-4">
                      <div className="text-slate-200 font-medium text-sm">{p.insured}</div>
                      <div className="text-slate-600 text-xs mt-0.5">{p.vehicleClass}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-slate-300 text-xs">{p.make} {p.model}</div>
                      <div className="text-slate-600 text-xs">{p.year}</div>
                    </td>
                    <td className="px-4 py-4 font-mono text-slate-400 text-xs">{p.regNo}</td>
                    <td className="px-4 py-4">
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 whitespace-nowrap">{p.cover}</span>
                    </td>
                    <td className="px-4 py-4 font-mono text-slate-300 text-xs whitespace-nowrap">
                      {p.sumInsured > 0 ? `${p.currency} ${fmt(p.sumInsured)}` : 'N/A'}
                    </td>
                    <td className="px-4 py-4 font-mono text-slate-200 font-semibold text-xs whitespace-nowrap">
                      {p.currency} {fmt(p.grossPremium)}
                    </td>
                    <td className="px-4 py-4 font-mono text-emerald-400 text-xs">{p.ncdPct}%</td>
                    <td className="px-4 py-4">
                      <div className="text-slate-500 text-xs">{p.endDate}</div>
                      {days > 0 && days <= 60 && (
                        <div className="text-amber-500 text-[10px] mt-0.5">{days}d left</div>
                      )}
                      {days <= 0 && (
                        <div className="text-rose-500 text-[10px] mt-0.5">Expired</div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border whitespace-nowrap ${s.bg} ${s.color} ${s.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={e => { e.stopPropagation(); setViewing(p) }}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-helix-400 transition-colors">
                          <Eye size={13} />
                        </button>
                        <button onClick={e => { e.stopPropagation(); printPolicy(p) }}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors">
                          <Printer size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-600 px-1">
          <span>Showing {filtered.length} of {POLICIES.length} policies</span>
          <span className="font-mono">Active GWP: USD {fmt(counts.gwp)}</span>
        </div>
      </div>
    </>
  )
}
