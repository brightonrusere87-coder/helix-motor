import React, { useState } from 'react'
import {
  Shield, CheckCircle, Clock, XCircle, ChevronRight, Users,
  Plus, ArrowLeft, ArrowRight, Car, FileText, Building2,
  AlertTriangle, X, Check, Info, Percent, DollarSign,
  Calendar, Hash, User, Briefcase, Globe, Phone, Mail,
  ChevronsRight, Save, Eye, Printer, RotateCcw, Download,
  Stamp, Layers, AlertCircle, TrendingUp, Zap, BookOpen
} from 'lucide-react'

// ─── Data ───────────────────────────────────────────────────────────────────
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
    specialConditions: 'Tracking device warranty applies to all fleet vehicles. Vehicles to be kept in secured compound overnight.',
    extensions: ['Windscreen & Glass', 'Emergency Roadside Rescue', 'Personal Accident (Drivers)'],
    ncdPct: '20', basicRate: '3.5',
    reinsuranceRequired: true,
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
    ncdPct: '30', basicRate: '2.8',
    reinsuranceRequired: true,
  },
]

const VEHICLE_CLASSES = ['Private', 'Fleet', 'Commercial', 'PSV', 'Motorcycle', 'Special Type']
const COVER_TYPES = ['Comprehensive', 'Third Party Only', 'Third Party Fire & Theft']
const INSURERS = ['Old Mutual Insurance', 'ZIMNAT Insurance', 'Sanctuary Insurance', 'First Mutual Insurance', 'Cell Insurance', 'RM Insurance']
const REINSURERS = ['Munich Re', 'Swiss Re', 'Hannover Re', 'African Re', 'ZEP-RE', 'Tropical Re']
const BROKERS = ['Direct', 'Riskwise Brokers', 'AON Zimbabwe', 'Marsh Zimbabwe', 'Willis Towers Watson', 'Alexander Forbes']
const CURRENCIES = ['USD', 'ZWG', 'GBP', 'EUR', 'ZAR']
const TREATY_TYPES = ['Quota Share', 'Excess of Loss', 'Facultative']
const USE_TYPES = ['Private Use', 'Business Use', 'Commercial Carriage', 'Public Hire', 'Agricultural']
const BODY_TYPES = ['Saloon', 'SUV / 4x4', 'Pick-up / Truck', 'Minibus', 'Bus', 'Van', 'Motorcycle', 'Special']

const STEPS = [
  { id: 1, label: 'Risk Details',    icon: Car,         desc: 'Vehicle & insured information' },
  { id: 2, label: 'Cover & Premium', icon: Shield,      desc: 'Coverage terms and premium' },
  { id: 3, label: 'Insurer(s)',      icon: Building2,   desc: 'Lead insurer & co-insurers' },
  { id: 4, label: 'Reinsurance',     icon: Globe,       desc: 'Treaty or facultative cession' },
  { id: 5, label: 'Acceptance',      icon: CheckCircle, desc: 'Three-party confirmations' },
  { id: 6, label: 'Review & Bind',   icon: FileText,    desc: 'Final review and binding' },
]

const defaultForm = {
  insuredName: '', insuredIdType: 'Company', insuredIdNumber: '', insuredPhone: '',
  insuredEmail: '', insuredAddress: '', brokerName: 'Direct', brokerRef: '',
  vehicleClass: 'Private', vehicleMake: '', vehicleModel: '', vehicleYear: '',
  vehicleRegNo: '', vehicleChassisNo: '', vehicleEngineNo: '', vehicleBodyType: 'Saloon',
  vehicleUse: 'Private Use', vehicleColour: '', vehicleSeats: '', vehicleCc: '',
  vehicleModified: false, vehicleModDetails: '',
  driverName: '', driverLicenceNo: '', driverLicenceClass: '', driverDOB: '',
  driverYearsLicensed: '', namedDrivers: [],
  coverType: 'Comprehensive', currency: 'USD', sumInsured: '', agreedValue: false,
  inceptionDate: '', expiryDate: '', periodMonths: 12,
  basicRate: '', ncdPct: '0', youngDriverLoading: '0', highValueLoading: '0',
  otherLoading: '0', otherLoadingDesc: '',
  stampDutyPct: '3', levyPct: '1',
  extensions: { windscreen: false, radio: false, personalAccident: false, medicalExpenses: false,
    carHire: false, emergencyRescue: false, riotStrike: false, naturalDisaster: false },
  excessOwn: '', excessThirdParty: '', excessYoungDriver: '', thirdPartyLimit: '50000',
  specialConditions: '',
  leadInsurer: '', leadInsurerShare: '100', leadInsurerRef: '',
  coinsurers: [],
  reinsuranceRequired: false, treatyType: 'Quota Share', reinsurer: '',
  reinsurerRef: '', cedingPct: '', retentionPct: '', facultativeReason: '', slipNumber: '',
  insuredAcceptanceStatus: 'pending', insuredSignatory: '', insuredAcceptDate: '',
  insurerAcceptanceStatus: 'pending', insurerSignatory: '', insurerAcceptDate: '',
  reinsurerAcceptanceStatus: 'pending', reinsurerSignatory: '', reinsurerAcceptDate: '',
  underwriterNotes: '', referredTo: '',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
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

function today() {
  return new Date().toISOString().split('T')[0]
}

// ─── Document Generator ───────────────────────────────────────────────────────
// Returns structured data for each document type
function buildDocData(placement, docType) {
  const p = placement
  const curr = p.currency || 'USD'
  const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
  const grossFmt = p.grossPremiumNum ? fmtMoney(p.grossPremiumNum) : p.premium

  const base = {
    docRef: `${docType.toUpperCase().replace(/\s/g, '-')}-${p.id}`,
    placementRef: p.id,
    policyRef: `MOT-${p.id.slice(4)}`,
    quoteRef: p.ref,
    issuedDate: now,
    insuredName: p.insured,
    vehicleClass: p.class,
    coverType: p.coverType,
    currency: curr,
    sumInsured: p.sumInsuredNum ? fmtMoney(p.sumInsuredNum) : p.sumInsured,
    grossPremium: grossFmt,
    inceptionDate: p.inceptionDate,
    expiryDate: p.expiryDate,
    vehicleDetails: `${p.vehicleYear} ${p.vehicleMake} ${p.vehicleModel}`,
    regNo: p.vehicleRegNo,
    chassisNo: p.vehicleChassisNo,
    leadInsurer: p.insurer?.name,
    leadInsurerShare: p.insurer?.share,
    coinsurer: p.coinsurer,
    reinsurer: p.reinsurer,
    excessOwn: p.excessOwn,
    thirdPartyLimit: p.thirdPartyLimit,
    brokerName: p.brokerName,
    brokerRef: p.brokerRef,
    specialConditions: p.specialConditions,
    extensions: p.extensions || [],
    insuredSignatory: p.insuredAcceptance?.signatory,
    insurerSignatory: p.insurer?.signatory,
  }

  if (docType === 'Cover Note') {
    return { ...base, docTitle: 'MOTOR INSURANCE COVER NOTE', validDays: 30,
      driverName: p.driverName, sections: ['cover_terms', 'vehicle', 'parties', 'conditions'] }
  }
  if (docType === 'Debit Note') {
    const net = p.grossPremiumNum ? (p.grossPremiumNum / 1.04).toFixed(2) : '—'
    const stamp = p.grossPremiumNum ? fmtMoney(p.grossPremiumNum * 0.03 / 1.04) : '—'
    const levy = p.grossPremiumNum ? fmtMoney(p.grossPremiumNum * 0.01 / 1.04) : '—'
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 30)
    return { ...base, docTitle: 'MOTOR PREMIUM DEBIT NOTE',
      debitNoteNo: `DN-${p.id}`,
      netPremium: p.grossPremiumNum ? fmtMoney(parseFloat(net)) : '—',
      stampDuty: stamp, levy,
      dueDate: dueDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
      paymentTerms: '30 days from date of issue',
      brokerCommission: p.grossPremiumNum ? fmtMoney(p.grossPremiumNum * 0.15) : '—',
      brokerCommissionPct: '15%',
    }
  }
  if (docType === 'Reinsurance Slip') {
    const riPremium = p.reinsurer?.cedingPct && p.grossPremiumNum
      ? fmtMoney(p.grossPremiumNum * p.reinsurer.cedingPct / 100) : '—'
    const riCommission = p.reinsurer?.cedingPct && p.grossPremiumNum
      ? fmtMoney(p.grossPremiumNum * p.reinsurer.cedingPct / 100 * 0.25) : '—'
    return { ...base, docTitle: 'MOTOR REINSURANCE PLACEMENT SLIP',
      slipNo: p.reinsurer?.slipNo || `SLIP-${p.id}`,
      reinsurerName: p.reinsurer?.name,
      cedingPct: p.reinsurer?.cedingPct,
      retentionPct: 100 - (p.reinsurer?.cedingPct || 0),
      riPremium, riCommission,
      riCommissionPct: '25%',
      treatyType: p.reinsurer?.cedingPct >= 50 ? 'Quota Share Treaty' : 'Facultative Proportional',
      riRef: p.reinsurer?.ref,
      eml: p.sumInsuredNum ? fmtMoney(p.sumInsuredNum * 0.75) : '—',
    }
  }
  if (docType === 'Signing Slip') {
    const participants = [
      { name: p.insurer?.name, written: p.insurer?.share, signed: p.insurer?.share, ref: p.insurer?.ref, date: p.insurer?.date, signatory: p.insurer?.signatory, status: p.insurer?.status },
      p.coinsurer?.name ? { name: p.coinsurer.name, written: p.coinsurer.share, signed: p.coinsurer.share, ref: p.coinsurer.ref || '—', date: p.coinsurer.date, signatory: p.coinsurer.signatory || '—', status: p.coinsurer.status } : null,
    ].filter(Boolean)
    return { ...base, docTitle: 'MARKET SIGNING SLIP',
      signingSlipNo: `SGN-${p.id}`,
      participants,
      totalSigned: participants.reduce((a, c) => a + (c.signed || 0), 0),
      signingDeadline: p.expiryDate,
    }
  }
  return base
}

// ─── Document Modal ───────────────────────────────────────────────────────────
function DocumentModal({ placement, docType, onClose }) {
  const [printing, setPrinting] = useState(false)
  const data = buildDocData(placement, docType)

  const handlePrint = () => {
    setPrinting(true)
    setTimeout(() => { setPrinting(false); }, 1200)
  }

  const docColors = {
    'Cover Note':          { header: '#0f766e', badge: '#134e4a', icon: '📋', accent: '#14b8a6' },
    'Debit Note':          { header: '#1d4ed8', badge: '#1e3a8a', icon: '💰', accent: '#3b82f6' },
    'Reinsurance Slip':    { header: '#7c3aed', badge: '#4c1d95', icon: '🛡', accent: '#8b5cf6' },
    'Signing Slip':        { header: '#b45309', badge: '#78350f', icon: '✍️', accent: '#f59e0b' },
  }
  const dc = docColors[docType] || docColors['Cover Note']

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}>
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl" style={{ background: '#0d1117' }}>
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60" style={{ background: dc.header }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{dc.icon}</span>
            <div>
              <div className="text-xs text-white/60 font-mono uppercase tracking-widest">{data.docRef}</div>
              <div className="text-lg font-bold text-white">{data.docTitle}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all"
              style={{ background: printing ? '#16a34a' : 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
              {printing ? <><Check size={14} /> Sent to Print</> : <><Printer size={14} /> Print / PDF</>}
            </button>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Document Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-0">
          {docType === 'Cover Note' && <CoverNoteDoc data={data} dc={dc} />}
          {docType === 'Debit Note' && <DebitNoteDoc data={data} dc={dc} />}
          {docType === 'Reinsurance Slip' && <ReinsuranceSlipDoc data={data} dc={dc} />}
          {docType === 'Signing Slip' && <SigningSlipDoc data={data} dc={dc} />}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-600" style={{ background: '#0a0f1a' }}>
          <span>Helix Insurance Management System · Generated {data.issuedDate}</span>
          <span className="font-mono">{data.docRef}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Cover Note Document ──────────────────────────────────────────────────────
function CoverNoteDoc({ data, dc }) {
  return (
    <div className="space-y-5 font-mono text-sm" style={{ color: '#e2e8f0' }}>
      {/* Letterhead */}
      <div className="flex items-start justify-between pb-4 border-b-2" style={{ borderColor: dc.accent }}>
        <div>
          <div className="text-xl font-bold" style={{ color: dc.accent }}>HELIX INSURANCE</div>
          <div className="text-xs text-slate-500 mt-1">Registered Insurance Company · IRA Reg. No. IRA-0012-ZW</div>
          <div className="text-xs text-slate-500">12 Samora Machel Avenue, Harare, Zimbabwe</div>
          <div className="text-xs text-slate-500">Tel: +263 242 123 456 · insurance@helixzim.co.zw</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Cover Note No.</div>
          <div className="text-lg font-bold" style={{ color: dc.accent }}>{data.docRef}</div>
          <div className="text-xs text-slate-500 mt-1">Issued: {data.issuedDate}</div>
          <div className="mt-2 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: dc.header }}>
            TEMPORARY COVER
          </div>
        </div>
      </div>

      {/* Parties */}
      <DocSection title="INSURED DETAILS" accent={dc.accent}>
        <DocRow label="Insured Name" value={data.insuredName} />
        <DocRow label="Broker / Agent" value={data.brokerName} />
        <DocRow label="Broker Reference" value={data.brokerRef || 'Direct'} />
        <DocRow label="Policy Reference" value={data.policyRef} />
      </DocSection>

      {/* Vehicle */}
      <DocSection title="VEHICLE PARTICULARS" accent={dc.accent}>
        <DocRow label="Vehicle" value={data.vehicleDetails} />
        <DocRow label="Registration No." value={data.regNo} />
        <DocRow label="Chassis / VIN" value={data.chassisNo} />
        <DocRow label="Driver" value={data.driverName || '—'} />
        <DocRow label="Vehicle Class" value={data.vehicleClass} />
        <DocRow label="Use of Vehicle" value={data.coverType} />
      </DocSection>

      {/* Cover Terms */}
      <DocSection title="COVER TERMS" accent={dc.accent}>
        <DocRow label="Type of Cover" value={data.coverType} highlight />
        <DocRow label="Sum Insured" value={`${data.currency} ${data.sumInsured}`} highlight />
        <DocRow label="Inception Date" value={data.inceptionDate} />
        <DocRow label="Expiry Date" value={data.expiryDate} />
        <DocRow label="Cover Note Valid" value={`${data.validDays} days from inception`} />
        <DocRow label="Own Damage Excess" value={data.excessOwn ? `${data.currency} ${fmtMoney(data.excessOwn)}` : 'Standard table'} />
        <DocRow label="TP Property Limit" value={data.thirdPartyLimit ? `${data.currency} ${fmtMoney(data.thirdPartyLimit)}` : '—'} />
        {data.extensions?.length > 0 && <DocRow label="Extensions" value={data.extensions.join(' · ')} />}
      </DocSection>

      {/* Premium */}
      <DocSection title="PREMIUM SUMMARY" accent={dc.accent}>
        <DocRow label="Gross Premium" value={`${data.currency} ${data.grossPremium}`} highlight />
        <DocRow label="Lead Insurer" value={`${data.leadInsurer} (${data.leadInsurerShare}%)`} />
        {data.coinsurer?.name && <DocRow label="Co-Insurer" value={`${data.coinsurer.name} (${data.coinsurer.share}%)`} />}
      </DocSection>

      {/* Conditions */}
      {data.specialConditions && (
        <DocSection title="SPECIAL CONDITIONS / WARRANTIES" accent={dc.accent}>
          <div className="text-xs text-slate-400 leading-relaxed mt-1 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {data.specialConditions}
          </div>
        </DocSection>
      )}

      {/* Signature blocks */}
      <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800/60">
        <SignatureBlock label="FOR AND ON BEHALF OF INSURED" name={data.insuredSignatory || '________________________'} note="Authorised Signatory / Date" />
        <SignatureBlock label="FOR AND ON BEHALF OF INSURER" name={data.insurerSignatory || '________________________'} note="Authorised Signatory / Date" />
      </div>

      <div className="text-[10px] text-slate-700 pt-2 leading-relaxed">
        This cover note is issued subject to the terms and conditions of the standard motor insurance policy wording held on file. Coverage is provisional and subject to full underwriting review. This document does not constitute a final policy. Cover will lapse if premium is not received within 30 days of the inception date.
      </div>
    </div>
  )
}

// ─── Debit Note Document ──────────────────────────────────────────────────────
function DebitNoteDoc({ data, dc }) {
  return (
    <div className="space-y-5 font-mono text-sm" style={{ color: '#e2e8f0' }}>
      <div className="flex items-start justify-between pb-4 border-b-2" style={{ borderColor: dc.accent }}>
        <div>
          <div className="text-xl font-bold" style={{ color: dc.accent }}>HELIX INSURANCE</div>
          <div className="text-xs text-slate-500 mt-1">Registered Insurance Company · IRA Reg. No. IRA-0012-ZW</div>
          <div className="text-xs text-slate-500">12 Samora Machel Avenue, Harare, Zimbabwe</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Debit Note No.</div>
          <div className="text-lg font-bold" style={{ color: dc.accent }}>{data.debitNoteNo}</div>
          <div className="text-xs text-slate-500 mt-1">Date: {data.issuedDate}</div>
          <div className="text-xs text-slate-500">Due: {data.dueDate}</div>
        </div>
      </div>

      <DocSection title="BILLED TO" accent={dc.accent}>
        <DocRow label="Insured / Client" value={data.insuredName} />
        <DocRow label="Broker" value={`${data.brokerName} · Ref: ${data.brokerRef || 'Direct'}`} />
        <DocRow label="Policy Reference" value={data.policyRef} />
        <DocRow label="Placement Reference" value={data.placementRef} />
      </DocSection>

      <DocSection title="RISK DETAILS" accent={dc.accent}>
        <DocRow label="Class of Business" value={`Motor — ${data.vehicleClass}`} />
        <DocRow label="Cover Type" value={data.coverType} />
        <DocRow label="Vehicle" value={data.vehicleDetails} />
        <DocRow label="Registration No." value={data.regNo} />
        <DocRow label="Period of Insurance" value={`${data.inceptionDate} to ${data.expiryDate}`} />
        <DocRow label="Sum Insured" value={`${data.currency} ${data.sumInsured}`} />
      </DocSection>

      {/* Premium table */}
      <DocSection title="PREMIUM SCHEDULE" accent={dc.accent}>
        <div className="rounded-xl overflow-hidden mt-2" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: dc.badge }}>
                <th className="text-left p-3 text-white/70 font-semibold">Description</th>
                <th className="text-right p-3 text-white/70 font-semibold">Amount ({data.currency})</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Net Premium (before statutory charges)', data.netPremium, false],
                ['Stamp Duty (3%)', data.stampDuty, false],
                ['IRA Regulatory Levy (1%)', data.levy, false],
              ].map(([label, value, bold], i) => (
                <tr key={label} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td className="p-3 text-slate-400">{label}</td>
                  <td className={`p-3 text-right font-mono ${bold ? 'font-bold text-white' : 'text-slate-300'}`}>{value}</td>
                </tr>
              ))}
              <tr style={{ background: dc.badge, borderTop: `2px solid ${dc.accent}` }}>
                <td className="p-3 font-bold text-white">GROSS PREMIUM DUE</td>
                <td className="p-3 text-right font-bold font-mono text-white text-base">{data.grossPremium}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="BROKER COMMISSION DISCLOSURE" accent={dc.accent}>
        <DocRow label="Broker Commission Rate" value={data.brokerCommissionPct} />
        <DocRow label="Commission Amount" value={`${data.currency} ${data.brokerCommission}`} />
        <DocRow label="Payment Terms" value={data.paymentTerms} />
        <DocRow label="Due Date" value={data.dueDate} highlight />
      </DocSection>

      <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
        ⚠ PREMIUM PAYMENT WARRANTY: Premium must be received within 30 days of inception. Failure to pay by the due date will result in automatic cancellation of the policy from the date of inception. Any claims arising during a lapsed warranty period will not be entertained.
      </div>

      <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800/60">
        <SignatureBlock label="FOR AND ON BEHALF OF INSURER" name={data.insurerSignatory || '________________________'} note="Authorised Signatory" />
        <SignatureBlock label="RECEIVED BY / ACKNOWLEDGED" name="________________________" note="Client Signature / Date" />
      </div>
    </div>
  )
}

// ─── Reinsurance Slip Document ────────────────────────────────────────────────
function ReinsuranceSlipDoc({ data, dc }) {
  return (
    <div className="space-y-5 font-mono text-sm" style={{ color: '#e2e8f0' }}>
      <div className="flex items-start justify-between pb-4 border-b-2" style={{ borderColor: dc.accent }}>
        <div>
          <div className="text-xl font-bold" style={{ color: dc.accent }}>HELIX INSURANCE</div>
          <div className="text-xs text-slate-500 mt-1">Cedant — Registered Insurance Company · IRA Reg. No. IRA-0012-ZW</div>
          <div className="text-xs text-slate-500">12 Samora Machel Avenue, Harare, Zimbabwe</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Slip No.</div>
          <div className="text-lg font-bold" style={{ color: dc.accent }}>{data.slipNo}</div>
          <div className="text-xs text-slate-500 mt-1">Date: {data.issuedDate}</div>
          <div className="mt-2 px-3 py-1 rounded-full text-xs font-bold text-white inline-block" style={{ background: dc.header }}>
            {data.treatyType?.toUpperCase()}
          </div>
        </div>
      </div>

      <DocSection title="REINSURANCE RISK PARTICULARS" accent={dc.accent}>
        <DocRow label="Class of Business" value={`Motor Insurance — ${data.vehicleClass}`} />
        <DocRow label="Cedant Reference" value={data.placementRef} />
        <DocRow label="Reinsurer Reference" value={data.riRef || '—'} />
        <DocRow label="Insured" value={data.insuredName} />
        <DocRow label="Cover Type" value={data.coverType} />
        <DocRow label="Vehicle / Risk Description" value={data.vehicleDetails} />
        <DocRow label="Registration No." value={data.regNo} />
        <DocRow label="Period of Reinsurance" value={`${data.inceptionDate} to ${data.expiryDate}`} />
        <DocRow label="Territorial Limit" value="Republic of Zimbabwe and COMESA member states" />
      </DocSection>

      <DocSection title="FINANCIAL DETAILS" accent={dc.accent}>
        <DocRow label="Sum Insured (100%)" value={`${data.currency} ${data.sumInsured}`} highlight />
        <DocRow label="Estimated Maximum Loss (EML)" value={`${data.currency} ${data.eml}`} />
        <DocRow label="Gross Premium (100%)" value={`${data.currency} ${data.grossPremium}`} />
        <DocRow label="Cession Percentage" value={`${data.cedingPct}%`} highlight />
        <DocRow label="Cedant Retention" value={`${data.retentionPct}%`} />
        <DocRow label="RI Premium Ceded" value={`${data.currency} ${data.riPremium}`} highlight />
        <DocRow label="RI Commission Rate" value={data.riCommissionPct} />
        <DocRow label="RI Commission Amount" value={`${data.currency} ${data.riCommission}`} />
      </DocSection>

      <DocSection title="REINSURANCE CONDITIONS" accent={dc.accent}>
        <DocRow label="Reinsurer" value={data.reinsurerName} highlight />
        <DocRow label="Arrangement Type" value={data.treatyType} />
        <DocRow label="Own Damage Excess (cedant)" value={data.excessOwn ? `${data.currency} ${fmtMoney(data.excessOwn)}` : 'Standard'} />
        <DocRow label="TP Property Limit" value={data.thirdPartyLimit ? `${data.currency} ${fmtMoney(data.thirdPartyLimit)}` : '—'} />
        {data.extensions?.length > 0 && <DocRow label="Extensions Covered" value={data.extensions.join(' · ')} />}
      </DocSection>

      {data.specialConditions && (
        <DocSection title="SPECIAL CONDITIONS" accent={dc.accent}>
          <div className="text-xs text-slate-400 leading-relaxed mt-1 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {data.specialConditions}
          </div>
        </DocSection>
      )}

      {/* Reinsurer signing block */}
      <DocSection title="REINSURER ACCEPTANCE" accent={dc.accent}>
        <div className="mt-3 p-4 rounded-xl" style={{ border: `1px solid ${dc.accent}33`, background: `${dc.header}22` }}>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="text-slate-500 mb-1">Reinsurer</div>
              <div className="font-bold text-white">{data.reinsurerName}</div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Written Line</div>
              <div className="font-bold" style={{ color: dc.accent }}>{data.cedingPct}%</div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Signed Line</div>
              <div className="font-bold" style={{ color: dc.accent }}>{data.cedingPct}%</div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60">
            <div className="text-xs text-slate-500 mb-1">Authorised Signatory (Reinsurer)</div>
            <div className="text-slate-300">_________________________ &nbsp;&nbsp; Date: _____________</div>
          </div>
        </div>
      </DocSection>

      <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800/60">
        <SignatureBlock label="FOR AND ON BEHALF OF CEDANT" name="________________________" note="Chief Underwriter / Date" />
        <SignatureBlock label="FOR AND ON BEHALF OF REINSURER" name="________________________" note="Authorised Signatory / Date" />
      </div>
    </div>
  )
}

// ─── Signing Slip Document ────────────────────────────────────────────────────
function SigningSlipDoc({ data, dc }) {
  return (
    <div className="space-y-5 font-mono text-sm" style={{ color: '#e2e8f0' }}>
      <div className="flex items-start justify-between pb-4 border-b-2" style={{ borderColor: dc.accent }}>
        <div>
          <div className="text-xl font-bold" style={{ color: dc.accent }}>HELIX INSURANCE</div>
          <div className="text-xs text-slate-500 mt-1">Market Signing Slip · IRA Reg. No. IRA-0012-ZW</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Signing Slip No.</div>
          <div className="text-lg font-bold" style={{ color: dc.accent }}>{data.signingSlipNo}</div>
          <div className="text-xs text-slate-500 mt-1">Date: {data.issuedDate}</div>
        </div>
      </div>

      <DocSection title="RISK IDENTIFICATION" accent={dc.accent}>
        <DocRow label="Placement Reference" value={data.placementRef} />
        <DocRow label="Policy Reference" value={data.policyRef} />
        <DocRow label="Insured" value={data.insuredName} />
        <DocRow label="Class" value={`Motor — ${data.vehicleClass}`} />
        <DocRow label="Cover Type" value={data.coverType} />
        <DocRow label="Vehicle" value={data.vehicleDetails} />
        <DocRow label="Sum Insured" value={`${data.currency} ${data.sumInsured}`} highlight />
        <DocRow label="Gross Premium (100%)" value={`${data.currency} ${data.grossPremium}`} highlight />
        <DocRow label="Period" value={`${data.inceptionDate} to ${data.expiryDate}`} />
        <DocRow label="Signing Deadline" value={data.signingDeadline} />
      </DocSection>

      {/* Participants table */}
      <DocSection title="INSURER PARTICIPATION & SIGNING RECORD" accent={dc.accent}>
        <div className="rounded-xl overflow-hidden mt-2" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: dc.badge }}>
                {['Insurer', 'Written Line', 'Signed Line', 'Reference', 'Date Signed', 'Signatory', 'Status'].map(h => (
                  <th key={h} className="text-left p-2.5 text-white/70 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.participants?.map((ins, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <td className="p-2.5 text-slate-300 font-medium">{ins.name}</td>
                  <td className="p-2.5 font-mono" style={{ color: dc.accent }}>{ins.written}%</td>
                  <td className="p-2.5 font-mono text-white font-bold">{ins.signed}%</td>
                  <td className="p-2.5 text-slate-500">{ins.ref || '—'}</td>
                  <td className="p-2.5 text-slate-500">{ins.date || '—'}</td>
                  <td className="p-2.5 text-slate-400">{ins.signatory || '—'}</td>
                  <td className="p-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${ins.status === 'accepted' ? 'bg-emerald-500/20 text-emerald-400' : ins.status === 'declined' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {ins.status?.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
              {/* Totals row */}
              <tr style={{ background: dc.badge, borderTop: `2px solid ${dc.accent}` }}>
                <td className="p-2.5 font-bold text-white" colSpan={2}>TOTAL SIGNED LINES</td>
                <td className="p-2.5 font-bold font-mono text-white">{data.totalSigned}%</td>
                <td colSpan={4} className="p-2.5 text-xs text-slate-500">
                  {data.totalSigned === 100 ? '✓ Fully subscribed' : data.totalSigned > 100 ? `⚠ Over-subscribed by ${data.totalSigned - 100}%` : `⚠ Under-subscribed — ${100 - data.totalSigned}% unplaced`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocSection>

      {/* Reinsurance summary if applicable */}
      {data.reinsurer?.name && data.reinsurer.name !== 'N/A' && (
        <DocSection title="REINSURANCE STRUCTURE" accent={dc.accent}>
          <DocRow label="Reinsurer" value={data.reinsurer.name} />
          <DocRow label="RI Cession" value={`${data.reinsurer.cedingPct}% of 100%`} />
          <DocRow label="Net Retention" value={`${100 - data.reinsurer.cedingPct}% retained by lead insurer`} />
          <DocRow label="RI Slip Reference" value={data.reinsurer.ref || '—'} />
          <DocRow label="RI Status" value={data.reinsurer.status?.toUpperCase()} highlight />
        </DocSection>
      )}

      <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800/60">
        <SignatureBlock label="LEAD INSURER — SLIP LEADER" name={data.insurerSignatory || '________________________'} note="Authorised Signatory / Date" />
        <SignatureBlock label="PLACING BROKER / CEDANT" name="________________________" note="Authorised Signatory / Date" />
      </div>
    </div>
  )
}

// ─── Doc Primitives ───────────────────────────────────────────────────────────
function DocSection({ title, accent, children }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-widest mb-2 pb-1 border-b" style={{ color: accent, borderColor: `${accent}44` }}>{title}</div>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

function DocRow({ label, value, highlight }) {
  return (
    <div className="flex gap-4 text-xs border-b py-1.5" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
      <span className="text-slate-500 w-44 flex-shrink-0">{label}</span>
      <span className={`font-mono ${highlight ? 'font-bold text-white' : 'text-slate-300'}`}>{value || '—'}</span>
    </div>
  )
}

function SignatureBlock({ label, name, note }) {
  return (
    <div className="text-xs">
      <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">{label}</div>
      <div className="text-slate-300 border-b border-slate-700/60 pb-1 mb-1 font-mono">{name}</div>
      <div className="text-slate-600">{note}</div>
    </div>
  )
}

// ─── Efficiency Guide Panel ───────────────────────────────────────────────────
function EfficiencyGuide({ onClose }) {
  const tips = [
    { icon: '⚡', title: 'Pre-qualify the Risk', color: '#f59e0b',
      points: ['Confirm vehicle details (reg, chassis, VIN) before opening the wizard — reduces back-and-forth', 'Verify NCD certificate is current and matches previous insurer records', 'Confirm sum insured with a recent valuation (max 90 days old)'] },
    { icon: '🏦', title: 'Prepare Insurer Panel Early', color: '#3b82f6',
      points: ['Contact lead insurer before wizard to confirm capacity and rate appetite', 'Have co-insurer names and target shares pre-agreed to avoid delay at Step 3', 'Confirm 100% = lead + co-insurers before entering shares'] },
    { icon: '🛡', title: 'Reinsurance Ready-State', color: '#8b5cf6',
      points: ['Check treaty capacity for sum insured BEFORE placement — use facultative if above treaty limit', 'RI commission rate should be confirmed with RI broker in advance', 'For fleet risks over USD 500k SI, always trigger RI regardless of class'] },
    { icon: '✅', title: 'Acceptance Best Practice', color: '#10b981',
      points: ['Collect insured acceptance (signature/email) before marking as Accepted', 'Insurer acceptance date should match the binding date in their system', 'RI acceptance must be obtained before the policy is issued — never issue first'] },
    { icon: '📄', title: 'Document Generation Order', color: '#06b6d4',
      points: ['1 → Cover Note (issue immediately on binding for temp proof of cover)', '2 → Debit Note (issue same day to trigger payment warranty clock)', '3 → Reinsurance Slip (circulate to RI within 24hrs of binding)', '4 → Signing Slip (circulate to all co-insurers within 48hrs)', '5 → Policy Schedule (issue once all acceptances are confirmed)'] },
    { icon: '⚠️', title: 'Common Errors to Avoid', color: '#ef4444',
      points: ['Never bind if insurer shares do not total exactly 100%', 'Do not issue policy before full premium payment or signed acceptance', 'Verify VIN (17 chars, no I/O/Q) before binding — incorrect VIN voids claim', 'Confirm driver DOB matches licence — young driver loading may be missed', 'Always select treaty type correctly — facultative has different RI accounting'] },
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}>
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl" style={{ background: '#0d1117' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60" style={{ background: '#0f172a' }}>
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="text-helix-400" />
            <div>
              <div className="text-lg font-bold text-white">Placement Efficiency Guide</div>
              <div className="text-xs text-slate-500">Best practices for fast, accurate motor risk placement</div>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-slate-800 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {tips.map((tip, i) => (
            <div key={i} className="rounded-xl p-4" style={{ border: `1px solid ${tip.color}22`, background: `${tip.color}08` }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{tip.icon}</span>
                <div className="font-bold text-sm" style={{ color: tip.color }}>{tip.title}</div>
              </div>
              <ul className="space-y-1.5">
                {tip.points.map((pt, pi) => (
                  <li key={pi} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="mt-0.5 flex-shrink-0 w-1 h-1 rounded-full mt-2" style={{ background: tip.color }} />
                    {pt}
                  </li>
                ))}
              </ul>
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

// ─── UI Primitives ────────────────────────────────────────────────────────────
function Field({ label, required, children, hint }) {
  return (
    <div>
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
    <input
      className={`w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-helix-500/60 focus:bg-slate-900 transition-colors ${className}`}
      {...props}
    />
  )
}

function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 outline-none focus:border-helix-500/60 transition-colors appearance-none ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-helix-500/60 transition-colors resize-none ${className}`}
      {...props}
    />
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors ${checked ? 'bg-helix-600' : 'bg-slate-700'}`}
      >
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
    pending:  { icon: Clock,        color: 'text-amber-400',   bg: 'bg-amber-400/10' },
    declined: { icon: XCircle,      color: 'text-rose-400',    bg: 'bg-rose-400/10' },
  }
  const { icon: Icon, color, bg } = conf[status] || conf.pending
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${bg} ${color}`}>
      <Icon size={11} /> <span className="capitalize">{status}</span>
    </span>
  )
}

// ─── Wizard Steps (reusing original, abbreviated here) ───────────────────────
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
          <Field label="Broker / Source"><Select value={form.brokerName} onChange={e => set(f => ({ ...f, brokerName: e.target.value }))}>{BROKERS.map(b => <option key={b}>{b}</option>)}</Select></Field>
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
          <Field label="Years Licensed" hint="Used for young driver loading assessment"><Input type="number" value={form.driverYearsLicensed} onChange={e => set(f => ({ ...f, driverYearsLicensed: e.target.value }))} placeholder="e.g. 3" /></Field>
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
            <button type="button" onClick={() => removeDriver(i)} className="absolute top-2 right-2 text-slate-600 hover:text-rose-400 transition-colors"><X size={12} /></button>
            <Field label={`Driver ${i + 2} — Full Name`}><Input value={d.name} onChange={e => updateDriver(i, 'name', e.target.value)} placeholder="Full name" /></Field>
            <Field label="Licence Number"><Input value={d.licence} onChange={e => updateDriver(i, 'licence', e.target.value)} placeholder="Licence no." /></Field>
            <Field label="Date of Birth"><Input type="date" value={d.dob} onChange={e => updateDriver(i, 'dob', e.target.value)} /></Field>
          </div>
        ))}
      </div>
    </div>
  )
}

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
          <Field label="Sum Insured / Market Value" required hint={`Current market value in ${form.currency}`}><Input type="number" value={form.sumInsured} onChange={e => set(f => ({ ...f, sumInsured: e.target.value }))} placeholder="e.g. 25000" /></Field>
          <Field label="Inception Date" required><Input type="date" value={form.inceptionDate} onChange={e => updateInception(e.target.value)} /></Field>
          <Field label="Expiry Date" required hint="Auto-filled to 1 year from inception"><Input type="date" value={form.expiryDate} onChange={e => set(f => ({ ...f, expiryDate: e.target.value }))} /></Field>
          <div className="flex items-end pb-1"><Toggle checked={form.agreedValue} onChange={v => set(f => ({ ...f, agreedValue: v }))} label="Agreed Value basis" /></div>
        </div>
      </div>
      <div>
        <SectionTitle sub="Rate components used to calculate the net premium">Premium Rating Components</SectionTitle>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Basic Premium Rate (%)" required hint="Tariff rate before adjustments"><Input type="number" value={form.basicRate} onChange={e => set(f => ({ ...f, basicRate: e.target.value }))} placeholder="e.g. 4.50" step="0.01" /></Field>
          <Field label="NCD Discount (%)" hint="No-Claim Discount earned"><Select value={form.ncdPct} onChange={e => set(f => ({ ...f, ncdPct: e.target.value }))}>{['0','10','15','20','25','30','35','40','50'].map(n => <option key={n} value={n}>{n}% NCD</option>)}</Select></Field>
          <Field label="Young Driver Loading (%)" hint="For drivers under 25 or <3yrs"><Input type="number" value={form.youngDriverLoading} onChange={e => set(f => ({ ...f, youngDriverLoading: e.target.value }))} placeholder="e.g. 0.75" step="0.01" min="0" /></Field>
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
          <Field label="Third Party Property Damage Limit"><Input type="number" value={form.thirdPartyLimit} onChange={e => set(f => ({ ...f, thirdPartyLimit: e.target.value }))} placeholder="50000" /></Field>
          <Field label="Third Party Excess"><Input type="number" value={form.excessThirdParty} onChange={e => set(f => ({ ...f, excessThirdParty: e.target.value }))} placeholder="e.g. 0" /></Field>
          <Field label="Young Driver Excess"><Input type="number" value={form.excessYoungDriver} onChange={e => set(f => ({ ...f, excessYoungDriver: e.target.value }))} placeholder="e.g. 1000" /></Field>
        </div>
      </div>
      <div>
        <SectionTitle sub="Optional covers to be endorsed onto the policy">Extensions & Optional Covers</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries({ windscreen:'Windscreen & Glass Cover', radio:'Radio & In-Car Entertainment', personalAccident:'Personal Accident (Driver & Occupants)', medicalExpenses:'Emergency Medical Expenses', carHire:'Car Hire / Courtesy Vehicle', emergencyRescue:'Emergency Roadside Rescue', riotStrike:'Riot, Strike & Civil Commotion', naturalDisaster:'Earthquake, Flood & Storm' }).map(([key, label]) => (
            <label key={key} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${form.extensions[key] ? 'border-helix-600/40 bg-helix-600/10' : 'border-slate-700/40 bg-slate-800/20 hover:border-slate-600/60'}`}>
              <input type="checkbox" checked={form.extensions[key]} onChange={e => setExt(key, e.target.checked)} className="accent-helix-500 w-4 h-4" />
              <span className="text-sm text-slate-300">{label}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <SectionTitle sub="Endorsements, warranties or special conditions">Special Conditions</SectionTitle>
        <Textarea value={form.specialConditions} onChange={e => set(f => ({ ...f, specialConditions: e.target.value }))} rows={3} placeholder="e.g. Vehicle to be kept in locked garage overnight. Tracking device warranty applies." />
      </div>
    </div>
  )
}

function StepInsurers({ form, set }) {
  const leadShare = parseFloat(form.leadInsurerShare) || 0
  const coShare = form.coinsurers.reduce((a, c) => a + (parseFloat(c.share) || 0), 0)
  const totalShare = leadShare + coShare
  const remaining = 100 - totalShare
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
        {totalShare !== 100 && totalShare > 0 && <p className="text-xs mt-1.5 text-amber-400">{totalShare > 100 ? `Over-allocated by ${(totalShare-100).toFixed(0)}%` : `${remaining.toFixed(0)}% remaining`}</p>}
        {totalShare === 100 && <p className="text-xs mt-1.5 text-emerald-400">✓ Full 100% allocated</p>}
      </div>
      <div>
        <SectionTitle sub="The leading insurer responsible for policy administration">Lead Insurer</SectionTitle>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Lead Insurer" required><Select value={form.leadInsurer} onChange={e => set(f => ({ ...f, leadInsurer: e.target.value }))}><option value="">Select insurer...</option>{INSURERS.map(i => <option key={i}>{i}</option>)}</Select></Field>
          <Field label="Share (%)" required><Input type="number" value={form.leadInsurerShare} onChange={e => set(f => ({ ...f, leadInsurerShare: e.target.value }))} placeholder="e.g. 60" /></Field>
          <Field label="Insurer Reference No."><Input value={form.leadInsurerRef} onChange={e => set(f => ({ ...f, leadInsurerRef: e.target.value }))} placeholder="e.g. OM-2026-44521" /></Field>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <SectionTitle sub="Additional insurers sharing in the risk">Co-Insurers</SectionTitle>
          <button type="button" onClick={addCoinsurer} className="flex items-center gap-1.5 px-3 py-1.5 bg-helix-600/15 text-helix-400 rounded-lg text-xs border border-helix-600/20 hover:bg-helix-600/25 transition-colors"><Plus size={12} /> Add Co-insurer</button>
        </div>
        {form.coinsurers.length === 0 && <p className="text-xs text-slate-600 italic">No co-insurers added. Lead insurer holds 100% if none added.</p>}
        {form.coinsurers.map((co, i) => (
          <div key={i} className="grid grid-cols-4 gap-3 mb-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/40 relative">
            <button type="button" onClick={() => removeCoinsurer(i)} className="absolute top-2 right-2 text-slate-600 hover:text-rose-400 transition-colors"><X size={12} /></button>
            <Field label={`Co-insurer ${i+1}`}><Select value={co.name} onChange={e => updateCo(i,'name',e.target.value)}><option value="">Select...</option>{INSURERS.filter(ins => ins !== form.leadInsurer).map(ins => <option key={ins}>{ins}</option>)}</Select></Field>
            <Field label="Share (%)"><Input type="number" value={co.share} onChange={e => updateCo(i,'share',e.target.value)} placeholder="e.g. 40" /></Field>
            <Field label="Reference No."><Input value={co.ref} onChange={e => updateCo(i,'ref',e.target.value)} placeholder="Co-insurer ref" /></Field>
            <Field label="Status"><Select value={co.status} onChange={e => updateCo(i,'status',e.target.value)}>{['pending','accepted','declined'].map(s => <option key={s}>{s}</option>)}</Select></Field>
          </div>
        ))}
      </div>
    </div>
  )
}

function StepReinsurance({ form, set }) {
  const calc = calcPremium(form)
  const cedingPct = parseFloat(form.cedingPct) || 0
  const retentionPct = 100 - cedingPct
  const premiumCeded = parseFloat(calc.gross) * cedingPct / 100
  const premiumRetained = parseFloat(calc.gross) * retentionPct / 100
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/40">
        <Toggle checked={form.reinsuranceRequired} onChange={v => set(f => ({ ...f, reinsuranceRequired: v }))} label="Reinsurance placement required for this risk" />
      </div>
      {form.reinsuranceRequired && (
        <div className="space-y-6">
          <div>
            <SectionTitle sub="Type and structure of the reinsurance arrangement">Reinsurance Structure</SectionTitle>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Treaty / Arrangement Type" required><Select value={form.treatyType} onChange={e => set(f => ({ ...f, treatyType: e.target.value }))}>{TREATY_TYPES.map(t => <option key={t}>{t}</option>)}</Select></Field>
              <Field label="Reinsurer" required><Select value={form.reinsurer} onChange={e => set(f => ({ ...f, reinsurer: e.target.value }))}><option value="">Select reinsurer...</option>{REINSURERS.map(r => <option key={r}>{r}</option>)}</Select></Field>
              <Field label="Reinsurer Reference / Slip No."><Input value={form.reinsurerRef} onChange={e => set(f => ({ ...f, reinsurerRef: e.target.value }))} placeholder="e.g. MR-2026-SLP-0221" /></Field>
              <Field label="Ceding Percentage (%)" required><Input type="number" value={form.cedingPct} onChange={e => { const v = Math.min(100, Math.max(0, parseFloat(e.target.value)||0)); set(f => ({ ...f, cedingPct: String(v), retentionPct: String(100-v) })) }} placeholder="e.g. 40" /></Field>
              <Field label="Retention Percentage (%)"><Input value={retentionPct.toFixed(0)} readOnly className="opacity-60 cursor-not-allowed" /></Field>
              {form.treatyType === 'Facultative' && <Field label="Facultative Reason"><Input value={form.facultativeReason} onChange={e => set(f => ({ ...f, facultativeReason: e.target.value }))} placeholder="e.g. Sum insured exceeds treaty capacity" /></Field>}
            </div>
          </div>
          {cedingPct > 0 && (
            <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
              <div className="text-xs text-slate-400 font-medium mb-3">Risk Distribution</div>
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
                    <div className="text-slate-500 mt-0.5">retained net</div>
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

function StepAcceptance({ form, set }) {
  const parties = [
    { key:'insured', label:'Insured Acceptance', icon:User, color:'text-slate-400', statusKey:'insuredAcceptanceStatus', signatoryKey:'insuredSignatory', dateKey:'insuredAcceptDate', desc:`Formal acceptance by ${form.insuredName||'the insured'} of the terms and premium quoted.` },
    { key:'insurer', label:'Insurer Acceptance', icon:Building2, color:'text-helix-400', statusKey:'insurerAcceptanceStatus', signatoryKey:'insurerSignatory', dateKey:'insurerAcceptDate', desc:`Acceptance by ${form.leadInsurer||'the lead insurer'} of the risk presented.` },
    { key:'reinsurer', label:'Reinsurer Acceptance', icon:Globe, color:'text-violet-400', statusKey:'reinsurerAcceptanceStatus', signatoryKey:'reinsurerSignatory', dateKey:'reinsurerAcceptDate', desc:form.reinsuranceRequired ? `Acceptance by ${form.reinsurer||'the reinsurer'} of the ceded portion.` : 'Not applicable — no reinsurance required.' },
  ]
  const allAccepted = form.insuredAcceptanceStatus==='accepted' && form.insurerAcceptanceStatus==='accepted' && (!form.reinsuranceRequired || form.reinsurerAcceptanceStatus==='accepted')
  return (
    <div className="space-y-6">
      {allAccepted && <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400 flex-shrink-0" /><p className="text-sm text-emerald-400">All required parties have accepted. Risk is ready to bind.</p></div>}
      <div className="space-y-4">
        {parties.map(({ key, label, icon: Icon, color, statusKey, signatoryKey, dateKey, desc }) => {
          const disabled = key === 'reinsurer' && !form.reinsuranceRequired
          const status = form[statusKey]
          return (
            <div key={key} className={`rounded-2xl border overflow-hidden transition-all ${disabled?'opacity-40':status==='accepted'?'border-emerald-600/30 bg-emerald-500/5':status==='declined'?'border-rose-600/30 bg-rose-500/5':'border-slate-700/40 bg-slate-800/20'}`}>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2"><Icon size={15} className={color}/><span className="text-sm font-semibold text-slate-200">{label}</span></div>
                  <AcceptBadge status={disabled?'pending':status} />
                </div>
                <p className="text-xs text-slate-500 mb-4">{desc}</p>
                {!disabled && (
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Acceptance Status"><Select value={form[statusKey]} onChange={e => set(f => ({ ...f, [statusKey]: e.target.value }))}><option value="pending">Pending</option><option value="accepted">Accepted</option><option value="declined">Declined</option></Select></Field>
                    <Field label="Signatory Name / Title"><Input value={form[signatoryKey]} onChange={e => set(f => ({ ...f, [signatoryKey]: e.target.value }))} placeholder="e.g. CEO — T. Masiyiwa" /></Field>
                    <Field label="Date of Acceptance"><Input type="date" value={form[dateKey]} onChange={e => set(f => ({ ...f, [dateKey]: e.target.value }))} /></Field>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StepReview({ form }) {
  const calc = calcPremium(form)
  const enabledExts = Object.entries(form.extensions).filter(([,v])=>v).map(([k])=>({windscreen:'Windscreen',radio:'Radio',personalAccident:'Personal Accident',medicalExpenses:'Medical',carHire:'Car Hire',emergencyRescue:'Emergency Rescue',riotStrike:'Riot & Strike',naturalDisaster:'Flood & Storm'}[k]))
  const Section = ({ title, children }) => <div className="mb-5"><div className="text-[10px] text-helix-500 font-semibold uppercase tracking-widest mb-2">{title}</div><div className="space-y-1.5 text-sm">{children}</div></div>
  const Row = ({ label, value, highlight }) => <div className="flex justify-between gap-4 border-b border-slate-800/30 pb-1.5"><span className="text-slate-500 flex-shrink-0">{label}</span><span className={`text-right truncate ${highlight?'text-helix-300 font-mono font-bold':'text-slate-300'}`}>{value||'—'}</span></div>
  return (
    <div className="space-y-4">
      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2">
        <AlertTriangle size={15} className="text-amber-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-400">Review all details carefully before binding. Once bound, a policy number is issued and documents become available.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
          <Section title="Insured & Vehicle">
            <Row label="Insured" value={form.insuredName} /><Row label="Vehicle" value={`${form.vehicleYear} ${form.vehicleMake} ${form.vehicleModel}`} />
            <Row label="Reg No." value={form.vehicleRegNo} /><Row label="Chassis No." value={form.vehicleChassisNo} />
            <Row label="Class" value={form.vehicleClass} /><Row label="Use" value={form.vehicleUse} />
            <Row label="Driver" value={form.driverName} /><Row label="Broker" value={form.brokerName} />
          </Section>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
          <Section title="Cover & Period">
            <Row label="Cover Type" value={form.coverType} /><Row label="Sum Insured" value={`${form.currency} ${fmtMoney(form.sumInsured)}`} />
            <Row label="Inception" value={form.inceptionDate} /><Row label="Expiry" value={form.expiryDate} />
            <Row label="Extensions" value={enabledExts.length ? enabledExts.join(', ') : 'None'} />
            <Row label="OD Excess" value={form.excessOwn ? `${form.currency} ${fmtMoney(form.excessOwn)}` : 'Standard'} />
            <Row label="TP Limit" value={`${form.currency} ${fmtMoney(form.thirdPartyLimit)}`} />
          </Section>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
          <Section title="Premium Breakdown">
            <Row label="Basic Rate" value={`${form.basicRate}%`} /><Row label="NCD Discount" value={`${form.ncdPct}%`} />
            <Row label="Net Rate" value={`${calc.netRate}%`} /><Row label="Net Premium" value={`${form.currency} ${fmtMoney(calc.netPremium)}`} />
            <Row label="Stamp Duty" value={`${form.currency} ${fmtMoney(calc.stampDuty)}`} /><Row label="Levy" value={`${form.currency} ${fmtMoney(calc.levy)}`} />
            <Row label="GROSS PREMIUM" value={`${form.currency} ${fmtMoney(calc.gross)}`} highlight />
          </Section>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
          <Section title="Placement & Acceptance">
            <Row label="Lead Insurer" value={form.leadInsurer} /><Row label="Insurer Share" value={`${form.leadInsurerShare}%`} />
            <Row label="Reinsurance" value={form.reinsuranceRequired ? `${form.cedingPct}% → ${form.reinsurer}` : 'None'} />
            <Row label="Insured Accept." value={form.insuredAcceptanceStatus} /><Row label="Insurer Accept." value={form.insurerAcceptanceStatus} />
            {form.reinsuranceRequired && <Row label="RI Accept." value={form.reinsurerAcceptanceStatus} />}
          </Section>
        </div>
      </div>
      {form.specialConditions && <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40"><div className="text-[10px] text-helix-500 font-semibold uppercase tracking-widest mb-2">Special Conditions</div><p className="text-sm text-slate-400">{form.specialConditions}</p></div>}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Placement() {
  const [placements, setPlacements] = useState(initialPlacements)
  const [expanded, setExpanded] = useState(initialPlacements[0]?.id)
  const [showWizard, setShowWizard] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(defaultForm)
  const [bound, setBound] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [docModal, setDocModal] = useState(null) // { placement, docType }
  const [showGuide, setShowGuide] = useState(false)

  const resetWizard = () => { setStep(1); setForm(defaultForm); setBound(null); setShowSuccess(false) }
  const openWizard = () => { resetWizard(); setShowWizard(true) }
  const closeWizard = () => { setShowWizard(false); resetWizard() }

  const openDoc = (placement, docType) => setDocModal({ placement, docType })
  const closeDoc = () => setDocModal(null)

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
    }
    setPlacements(prev => [newPlacement, ...prev])
    setBound(newPlacement)
    setShowSuccess(true)
  }

  const DOC_BUTTONS = [
    { label: 'Cover Note',           emoji: '📋', type: 'Cover Note',        color: '#0d9488' },
    { label: 'Debit Note',           emoji: '💰', type: 'Debit Note',         color: '#2563eb' },
    { label: 'Reinsurance Slip',     emoji: '🛡', type: 'Reinsurance Slip',   color: '#7c3aed' },
    { label: 'Signing Slip',         emoji: '✍️', type: 'Signing Slip',       color: '#b45309' },
  ]

  if (showWizard) return (
    <>
      <div className="fixed inset-0 z-50 flex" style={{ background: 'rgba(2,6,23,0.97)' }}>
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
                  className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${active?'bg-helix-600/20 border border-helix-600/30':done?'hover:bg-slate-800/40 cursor-pointer':'opacity-40 cursor-not-allowed'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${active?'bg-helix-600 text-white':done?'bg-emerald-600/20 text-emerald-400':'bg-slate-800 text-slate-500'}`}>
                    {done ? <Check size={12} /> : s.id}
                  </div>
                  <div>
                    <div className={`text-xs font-semibold ${active?'text-helix-300':done?'text-slate-300':'text-slate-600'}`}>{s.label}</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">{s.desc}</div>
                  </div>
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
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-800/50 flex items-center justify-between flex-shrink-0">
            <div>
              <div className="text-xs text-slate-500 mb-0.5">Step {step} of {STEPS.length} — {STEPS[step-1].label}</div>
              <div className="text-slate-200 font-semibold">{STEPS[step-1].desc}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-slate-600 mr-2">Progress</div>
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
                  {[['Insured',bound.insured],['Premium',bound.premium],['Class',bound.class],['Sum Insured',bound.sumInsured]].map(([l,v]) => (
                    <div key={l} className="p-3 bg-slate-800/40 rounded-xl"><div className="text-xs text-slate-500 mb-1">{l}</div><div className="text-slate-200 font-medium">{v}</div></div>
                  ))}
                </div>
                {/* Document buttons after binding */}
                <div className="mb-4">
                  <div className="text-xs text-slate-500 mb-3 uppercase tracking-widest">Generate Documents</div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {DOC_BUTTONS.map(({ label, emoji, type, color }) => (
                      <button key={type} onClick={() => openDoc(bound, type)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
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
                {step === 1 && <StepRiskDetails form={form} set={setForm} />}
                {step === 2 && <StepCoverPremium form={form} set={setForm} />}
                {step === 3 && <StepInsurers form={form} set={setForm} />}
                {step === 4 && <StepReinsurance form={form} set={setForm} />}
                {step === 5 && <StepAcceptance form={form} set={setForm} />}
                {step === 6 && <StepReview form={form} />}
              </div>
            )}
          </div>
          {!showSuccess && (
            <div className="px-8 py-4 border-t border-slate-800/50 flex items-center justify-between flex-shrink-0">
              <button onClick={() => step > 1 ? setStep(s => s-1) : closeWizard()}
                className="flex items-center gap-2 px-4 py-2 glass-light text-slate-400 hover:text-slate-200 rounded-xl text-sm border border-slate-700 transition-colors">
                <ArrowLeft size={14} /> {step === 1 ? 'Cancel' : 'Back'}
              </button>
              <div className="text-xs text-slate-700 font-mono">Step {step}/{STEPS.length}</div>
              {step === STEPS.length ? (
                <button onClick={handleBind} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-colors">
                  <Shield size={14} /> Bind Risk & Issue Policy
                </button>
              ) : (
                <button onClick={() => setStep(s => s+1)} className="flex items-center gap-2 px-5 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-medium transition-colors">
                  Continue <ArrowRight size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {docModal && <DocumentModal placement={docModal.placement} docType={docModal.docType} onClose={closeDoc} />}
      {showGuide && <EfficiencyGuide onClose={() => setShowGuide(false)} />}
    </>
  )

  // ─── List View ────────────────────────────────────────────────────────────
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Risk Placement</h1>
            <p className="text-slate-500 text-sm mt-1">Three-party acceptance: Insured · Insurer · Reinsurer</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowGuide(true)}
              className="flex items-center gap-2 px-3 py-2 text-helix-400 rounded-xl text-sm border border-helix-600/20 hover:bg-helix-600/10 transition-colors">
              <BookOpen size={14} /> Best Practices
            </button>
            <button onClick={openWizard}
              className="flex items-center gap-2 px-4 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors glow-blue">
              <Plus size={15} /> Place New Risk
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            [placements.length, 'Total Placements', 'text-helix-400'],
            [placements.filter(p => p.insuredAcceptance.status==='accepted' && p.insurer.status==='accepted').length, 'Fully Accepted', 'text-emerald-400'],
            [placements.filter(p => p.insurer.status==='pending' || p.insuredAcceptance.status==='pending').length, 'Awaiting Acceptance', 'text-amber-400'],
          ].map(([v,l,c]) => (
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
              <div className="p-5 cursor-pointer flex items-center justify-between hover:bg-slate-800/10 transition-colors" onClick={() => setExpanded(expanded===p.id ? null : p.id)}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-helix-500">{p.id}</span>
                    <span className="text-xs text-slate-600">·</span>
                    <span className="font-mono text-xs text-slate-600">{p.ref}</span>
                  </div>
                  <div className="font-semibold text-slate-200">{p.insured}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{p.class} · {p.premium} premium · SI {p.sumInsured}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    {[{label:'Insured',status:p.insuredAcceptance.status},{label:'Insurer',status:p.insurer.status},{label:'Reinsurer',status:p.reinsurer.status}].map(({label,status}) => (
                      <div key={label} className="text-center">
                        <div className="text-[10px] text-slate-600 mb-1">{label}</div>
                        <AcceptBadge status={status} />
                      </div>
                    ))}
                  </div>
                  <ChevronRight size={16} className={`text-slate-600 transition-transform duration-200 ${expanded===p.id?'rotate-90':''}`} />
                </div>
              </div>

              {expanded === p.id && (
                <div className="border-t border-slate-800/50 p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {/* Insured */}
                    <div className="bg-slate-800/40 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3"><Users size={14} className="text-slate-400" /><span className="text-sm font-medium text-slate-300">Insured Acceptance</span></div>
                      <AcceptBadge status={p.insuredAcceptance.status} />
                      <div className="mt-2 text-xs text-slate-500">{p.insuredAcceptance.signatory||'—'}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{p.insuredAcceptance.date||'Awaiting'}</div>
                    </div>
                    {/* Insurer */}
                    <div className="bg-slate-800/40 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3"><Shield size={14} className="text-helix-400" /><span className="text-sm font-medium text-slate-300">Insurer(s)</span></div>
                      {[p.insurer, p.coinsurer].filter(i => i?.name).map((ins, i) => (
                        <div key={i} className="mb-2 last:mb-0">
                          <div className="flex items-center justify-between"><span className="text-xs text-slate-400">{ins.name}</span><span className="font-mono text-xs text-helix-400">{ins.share}%</span></div>
                          <AcceptBadge status={ins.status} />
                          {ins.date && <div className="text-xs text-slate-600 mt-0.5">{ins.date}</div>}
                        </div>
                      ))}
                    </div>
                    {/* Reinsurer */}
                    <div className="bg-slate-800/40 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3"><Shield size={14} className="text-violet-400" /><span className="text-sm font-medium text-slate-300">Reinsurer</span></div>
                      {p.reinsurer?.name && p.reinsurer.name !== 'N/A' ? (
                        <>
                          <div className="font-medium text-slate-300 text-sm">{p.reinsurer.name}</div>
                          <div className="text-xs text-slate-500 mt-1">Ceding {p.reinsurer.cedingPct}% of risk</div>
                          <div className="mt-2"><AcceptBadge status={p.reinsurer.status} /></div>
                          {p.reinsurer.date && <div className="text-xs text-slate-600 mt-1">{p.reinsurer.date}</div>}
                        </>
                      ) : (
                        <p className="text-xs text-slate-600 italic">No reinsurance — full retention</p>
                      )}
                    </div>
                  </div>

                  {/* Document Action Buttons — FULLY FUNCTIONAL */}
                  <div className="pt-2 border-t border-slate-800/40">
                    <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-3">Documents & Actions</div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => setDocModal(null) || setTimeout(() => setDocModal({ placement: p, docType: 'Debit Note' }), 0)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-medium transition-colors">
                        Issue Policy
                      </button>
                      {DOC_BUTTONS.map(({ label, emoji, type, color }) => (
                        <button key={type} onClick={() => openDoc(p, type)}
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

      {docModal && <DocumentModal placement={docModal.placement} docType={docModal.docType} onClose={closeDoc} />}
      {showGuide && <EfficiencyGuide onClose={() => setShowGuide(false)} />}
    </>
  )
}
