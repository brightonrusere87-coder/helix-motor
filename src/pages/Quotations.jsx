import React, { useState, useEffect } from 'react'
import {
  Search, Plus, X, Check, ArrowLeft, ArrowRight,
  FileText, Car, Shield, DollarSign, User,
  ChevronRight, CheckCircle, XCircle, AlertTriangle,
  Printer, Send, Percent, Zap
} from 'lucide-react'

const VEHICLE_CLASSES = ['Private', 'Fleet', 'Commercial', 'PSV', 'Motorcycle', 'Special Type']
const COVER_TYPES = ['Comprehensive', 'Third Party Only', 'Third Party Fire & Theft']
const BROKERS = ['Direct', 'Riskwise Brokers', 'AON Zimbabwe', 'Marsh Zimbabwe', 'Willis Towers Watson', 'Alexander Forbes', 'Industrial & Commercial']
const CURRENCIES = ['USD', 'ZWG', 'GBP', 'EUR', 'ZAR']
const BODY_TYPES = ['Saloon', 'SUV / 4x4', 'Pick-up / Truck', 'Minibus', 'Bus', 'Van', 'Motorcycle', 'Special']
const USE_TYPES = ['Private Use', 'Business Use', 'Commercial Carriage', 'Public Hire', 'Agricultural']
const ID_TYPES = ['National ID', 'Company (CRN)', 'Passport', 'Birth Certificate']
const LICENCE_CLASSES = ['Class 1 - Motorcycle', 'Class 2 - Light Motor Vehicle', 'Class 3 - Heavy Motor Vehicle', 'Class 4 - Articulated', 'Class 5 - PSV']

const NCD_SCHEDULE = [
  { years: 0, discount: 0 }, { years: 1, discount: 10 }, { years: 2, discount: 15 },
  { years: 3, discount: 20 }, { years: 4, discount: 25 }, { years: 5, discount: 30 },
  { years: 6, discount: 35 }, { years: 7, discount: 40 }, { years: '8+', discount: 50 },
]

const EXTENSIONS = {
  windscreen:       { label: 'Windscreen & Glass Cover', premium: 120 },
  radio:            { label: 'Radio / In-Car Entertainment', premium: 80 },
  personalAccident: { label: 'Personal Accident (Driver & Occupants)', premium: 150 },
  medicalExpenses:  { label: 'Emergency Medical Expenses', premium: 100 },
  carHire:          { label: 'Car Hire / Courtesy Vehicle', premium: 200 },
  emergencyRescue:  { label: 'Emergency Roadside Rescue', premium: 60 },
  riotStrike:       { label: 'Riot, Strike & Civil Commotion', premium: 90 },
  naturalDisaster:  { label: 'Earthquake, Flood & Storm', premium: 110 },
}

const INITIAL_QUOTES = [
  { ref: 'QTE-2026-00124', insured: 'Econet Wireless Zimbabwe', class: 'Fleet', vehicles: 28, cover: 'Comprehensive', premium: 'USD 42,800.00', currency: 'USD', sumInsured: 1200000, status: 'draft', broker: 'Riskwise Brokers', expires: '2026-03-01', created: '2026-02-20', underwriter: 'J. Mutasa', vehicleMake: 'Toyota', vehicleModel: 'Hilux', regNo: 'Fleet', basicRate: 4.5, ncdPct: 20, grossPremium: 42800, netPremium: 39200 },
  { ref: 'QTE-2026-00123', insured: 'Mrs. Chipo Ndlovu', class: 'Private', vehicles: 1, cover: 'Comprehensive', premium: 'USD 1,240.00', currency: 'USD', sumInsured: 18000, status: 'quoted', broker: 'Direct', expires: '2026-02-28', created: '2026-02-19', underwriter: 'T. Banda', vehicleMake: 'Honda', vehicleModel: 'Fit 1.3', regNo: 'GCE 2218', basicRate: 4.5, ncdPct: 30, grossPremium: 1240, netPremium: 1135 },
  { ref: 'QTE-2026-00122', insured: 'Harare City Council', class: 'PSV', vehicles: 14, cover: 'Third Party Only', premium: 'USD 8,400.00', currency: 'USD', sumInsured: 0, status: 'bound', broker: 'AON Zimbabwe', expires: '2026-02-25', created: '2026-02-18', underwriter: 'J. Mutasa', vehicleMake: 'Isuzu', vehicleModel: 'NPR Bus', regNo: 'Fleet', basicRate: 3.2, ncdPct: 10, grossPremium: 8400, netPremium: 7700 },
  { ref: 'QTE-2026-00121', insured: 'Mr. Takudzwa Moyo', class: 'Private', vehicles: 1, cover: 'Third Party Fire & Theft', premium: 'USD 680.00', currency: 'USD', sumInsured: 12000, status: 'declined', broker: 'Direct', expires: '2026-02-22', created: '2026-02-17', underwriter: 'M. Dube', vehicleMake: 'Mazda', vehicleModel: 'Demio', regNo: 'GRD 7712', basicRate: 3.8, ncdPct: 0, grossPremium: 680, netPremium: 622 },
  { ref: 'QTE-2026-00120', insured: 'Delta Beverages Ltd', class: 'Commercial', vehicles: 52, cover: 'Comprehensive', premium: 'USD 98,400.00', currency: 'USD', sumInsured: 4800000, status: 'quoted', broker: 'Marsh Zimbabwe', expires: '2026-02-28', created: '2026-02-16', underwriter: 'T. Banda', vehicleMake: 'Mercedes', vehicleModel: 'Actros Fleet', regNo: 'Fleet', basicRate: 4.8, ncdPct: 10, grossPremium: 98400, netPremium: 90100 },
  { ref: 'QTE-2026-00119', insured: 'CBZ Holdings', class: 'Fleet', vehicles: 8, cover: 'Comprehensive', premium: 'USD 12,000.00', currency: 'USD', sumInsured: 320000, status: 'bound', broker: 'Willis Towers Watson', expires: '2026-03-10', created: '2026-02-14', underwriter: 'J. Mutasa', vehicleMake: 'Toyota', vehicleModel: 'Land Cruiser', regNo: 'Fleet', basicRate: 4.2, ncdPct: 20, grossPremium: 12000, netPremium: 10990 },
]

const STEPS = [
  { id: 1, label: 'Insured Details',  icon: User,     desc: 'Client and broker information' },
  { id: 2, label: 'Vehicle Details',  icon: Car,      desc: 'Vehicle particulars and driver' },
  { id: 3, label: 'Cover & Terms',    icon: Shield,   desc: 'Coverage type and policy period' },
  { id: 4, label: 'Premium Rating',   icon: Percent,  desc: 'Rate calculation and loadings' },
  { id: 5, label: 'Review & Issue',   icon: FileText, desc: 'Final review and quotation issue' },
]

const defaultForm = {
  insuredName: '', idType: 'National ID', idNumber: '', phone: '', email: '', address: '', occupation: '',
  brokerName: 'Direct', brokerRef: '', existingClient: false, clientRef: '',
  vehicleClass: 'Private', vehicleMake: '', vehicleModel: '', vehicleYear: '', vehicleRegNo: '',
  vehicleChassisNo: '', vehicleEngineNo: '', bodyType: 'Saloon', vehicleUse: 'Private Use',
  colour: '', seats: '', cc: '', modified: false, modDetails: '', trackerInstalled: false, trackerProvider: '',
  driverName: '', driverLicenceNo: '', licenceClass: '', driverDOB: '', yearsLicensed: '',
  claimsHistory: 'None', previousInsurer: '', previousPolicyNo: '',
  coverType: 'Comprehensive', currency: 'USD', sumInsured: '', agreedValue: false,
  inceptionDate: '', expiryDate: '', thirdPartyLimit: '50000',
  extensions: Object.fromEntries(Object.keys(EXTENSIONS).map(k => [k, false])),
  specialConditions: '', warrantyConditions: '',
  basicRate: '', ncdYears: '0', ncdPct: '0',
  youngDriverLoading: '0', highValueLoading: '0', fleetLoading: '0', claimsLoading: '0',
  otherLoading: '0', otherLoadingDesc: '', stampDutyPct: '3', levyPct: '1', vatPct: '0',
  discountPct: '0', discountReason: '', voluntaryExcess: '', compulsoryExcess: '',
  underwriterNotes: '', validityDays: '30',
}

const STATUS = {
  draft:    { label: 'Draft',    color: 'text-slate-400',   bg: 'bg-slate-400/10',   border: 'border-slate-600/30',   dot: 'bg-slate-400' },
  quoted:   { label: 'Quoted',   color: 'text-amber-400',   bg: 'bg-amber-400/10',   border: 'border-amber-600/30',   dot: 'bg-amber-400' },
  bound:    { label: 'Bound',    color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-600/30', dot: 'bg-emerald-400' },
  declined: { label: 'Declined', color: 'text-rose-400',    bg: 'bg-rose-400/10',    border: 'border-rose-600/30',    dot: 'bg-rose-400' },
  expired:  { label: 'Expired',  color: 'text-slate-500',   bg: 'bg-slate-500/10',   border: 'border-slate-700/30',   dot: 'bg-slate-500' },
}

function calcPremium(form) {
  const si = parseFloat(form.sumInsured) || 0
  const basic = parseFloat(form.basicRate) || 0
  const ncd = parseFloat(form.ncdPct) || 0
  const yd = parseFloat(form.youngDriverLoading) || 0
  const hv = parseFloat(form.highValueLoading) || 0
  const fl = parseFloat(form.fleetLoading) || 0
  const cl = parseFloat(form.claimsLoading) || 0
  const oth = parseFloat(form.otherLoading) || 0
  const disc = parseFloat(form.discountPct) || 0
  const sd = parseFloat(form.stampDutyPct) || 0
  const lv = parseFloat(form.levyPct) || 0
  const vat = parseFloat(form.vatPct) || 0
  const netRate = Math.max(0, basic - ncd + yd + hv + fl + cl + oth - disc)
  const netPremium = (si * netRate) / 100
  const extPremium = Object.entries(form.extensions || {}).filter(([, v]) => v).reduce((a, [k]) => a + (EXTENSIONS[k]?.premium || 0), 0)
  const subtotal = netPremium + extPremium
  const stampDuty = (subtotal * sd) / 100
  const levy = (subtotal * lv) / 100
  const vatAmt = ((subtotal + stampDuty + levy) * vat) / 100
  const gross = subtotal + stampDuty + levy + vatAmt
  return {
    netRate: netRate.toFixed(3), netPremium: netPremium.toFixed(2),
    extPremium: extPremium.toFixed(2), subtotal: subtotal.toFixed(2),
    stampDuty: stampDuty.toFixed(2), levy: levy.toFixed(2),
    vatAmt: vatAmt.toFixed(2), gross: gross.toFixed(2),
  }
}

function fmt(v) { return (parseFloat(v) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
function genRef() { return 'QTE-2026-' + String(Math.floor(Math.random() * 900) + 100).padStart(5, '0') }
function today() { return new Date().toISOString().split('T')[0] }
function addDays(d, n) { if (!d) return ''; const x = new Date(d); x.setDate(x.getDate() + n); return x.toISOString().split('T')[0] }
function addYears(d, n) { if (!d) return ''; const x = new Date(d); x.setFullYear(x.getFullYear() + n); x.setDate(x.getDate() - 1); return x.toISOString().split('T')[0] }

function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">
        {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10px] text-slate-600 mt-1">{hint}</p>}
    </div>
  )
}
const Inp = ({ className = '', ...p }) => (
  <input className={`w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-helix-500/50 focus:bg-slate-900 transition-colors ${className}`} {...p} />
)
const Sel = ({ className = '', children, ...p }) => (
  <select className={`w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 outline-none focus:border-helix-500/50 transition-colors appearance-none ${className}`} {...p}>{children}</select>
)
const Txt = ({ className = '', ...p }) => (
  <textarea className={`w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-helix-500/50 transition-colors resize-none ${className}`} {...p} />
)
function Toggle({ checked, onChange, label, sub }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <button type="button" onClick={() => onChange(!checked)} className={`mt-0.5 relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-helix-600' : 'bg-slate-700'}`}>
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : ''}`} />
      </button>
      <div>
        <div className="text-sm text-slate-300">{label}</div>
        {sub && <div className="text-[10px] text-slate-600 mt-0.5">{sub}</div>}
      </div>
    </label>
  )
}
function SecHead({ children, sub }) {
  return (
    <div className="mb-5 pb-3 border-b border-slate-800/60">
      <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
        <span className="w-1 h-4 bg-helix-500 rounded-full inline-block" />{children}
      </h3>
      {sub && <p className="text-xs text-slate-500 mt-1 ml-3">{sub}</p>}
    </div>
  )
}

function Step1({ form, set }) {
  return (
    <div className="space-y-7">
      <div>
        <SecHead sub="Personal or corporate details of the insured">Insured Information</SecHead>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Field label="Full Name / Company Name" required>
              <Inp value={form.insuredName} onChange={e => set(f => ({ ...f, insuredName: e.target.value }))} placeholder="e.g. Mrs. Chipo Ndlovu or Econet Wireless Zimbabwe" />
            </Field>
          </div>
          <Field label="ID / Registration Type">
            <Sel value={form.idType} onChange={e => set(f => ({ ...f, idType: e.target.value }))}>
              {ID_TYPES.map(t => <option key={t}>{t}</option>)}
            </Sel>
          </Field>
          <Field label="ID / Registration Number" required>
            <Inp value={form.idNumber} onChange={e => set(f => ({ ...f, idNumber: e.target.value }))} placeholder="e.g. 63-149821 B21" />
          </Field>
          <Field label="Mobile / Phone Number">
            <Inp value={form.phone} onChange={e => set(f => ({ ...f, phone: e.target.value }))} placeholder="+263 77 123 4567" />
          </Field>
          <Field label="Email Address">
            <Inp type="email" value={form.email} onChange={e => set(f => ({ ...f, email: e.target.value }))} placeholder="client@email.com" />
          </Field>
          <div className="col-span-2">
            <Field label="Physical / Postal Address" required>
              <Txt rows={2} value={form.address} onChange={e => set(f => ({ ...f, address: e.target.value }))} placeholder="e.g. 12 Baines Ave, Harare, Zimbabwe" />
            </Field>
          </div>
          <Field label="Occupation / Business Type" hint="Used for risk assessment">
            <Inp value={form.occupation} onChange={e => set(f => ({ ...f, occupation: e.target.value }))} placeholder="e.g. Civil Servant / Retail Business" />
          </Field>
          <div className="flex items-end pb-1">
            <Toggle checked={form.existingClient} onChange={v => set(f => ({ ...f, existingClient: v }))} label="Existing Client" sub="Link to existing client record" />
          </div>
          {form.existingClient && (
            <div className="col-span-2 animate-fade-up">
              <Field label="Existing Client Reference" hint="Enter Helix client ID">
                <Inp value={form.clientRef} onChange={e => set(f => ({ ...f, clientRef: e.target.value }))} placeholder="e.g. CLT-2024-00841" />
              </Field>
            </div>
          )}
        </div>
      </div>
      <div>
        <SecHead sub="How was this quotation request received?">Submission and Broker</SecHead>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Broker / Submission Source" required>
            <Sel value={form.brokerName} onChange={e => set(f => ({ ...f, brokerName: e.target.value }))}>
              {BROKERS.map(b => <option key={b}>{b}</option>)}
            </Sel>
          </Field>
          <Field label="Broker Reference No." hint="Broker's own reference if applicable">
            <Inp value={form.brokerRef} onChange={e => set(f => ({ ...f, brokerRef: e.target.value }))} placeholder="e.g. RW-2026-QTE-4421" />
          </Field>
        </div>
      </div>
    </div>
  )
}

function Step2({ form, set }) {
  return (
    <div className="space-y-7">
      <div>
        <SecHead sub="Full particulars of the vehicle to be insured">Vehicle Particulars</SecHead>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Vehicle Class" required>
            <Sel value={form.vehicleClass} onChange={e => set(f => ({ ...f, vehicleClass: e.target.value }))}>
              {VEHICLE_CLASSES.map(c => <option key={c}>{c}</option>)}
            </Sel>
          </Field>
          <Field label="Make" required>
            <Inp value={form.vehicleMake} onChange={e => set(f => ({ ...f, vehicleMake: e.target.value }))} placeholder="e.g. Toyota" />
          </Field>
          <Field label="Model" required>
            <Inp value={form.vehicleModel} onChange={e => set(f => ({ ...f, vehicleModel: e.target.value }))} placeholder="e.g. Hilux 2.4GD-6 D/C" />
          </Field>
          <Field label="Year of Manufacture" required>
            <Inp type="number" value={form.vehicleYear} onChange={e => set(f => ({ ...f, vehicleYear: e.target.value }))} placeholder="e.g. 2022" min="1950" max="2030" />
          </Field>
          <Field label="Registration Number" required>
            <Inp value={form.vehicleRegNo} onChange={e => set(f => ({ ...f, vehicleRegNo: e.target.value.toUpperCase() }))} placeholder="e.g. GRD 4821" />
          </Field>
          <Field label="Chassis / VIN Number" required hint="17-character vehicle identification number">
            <Inp value={form.vehicleChassisNo} onChange={e => set(f => ({ ...f, vehicleChassisNo: e.target.value.toUpperCase() }))} placeholder="e.g. JTFBT3EJ80K012345" maxLength={17} />
          </Field>
          <Field label="Engine Number">
            <Inp value={form.vehicleEngineNo} onChange={e => set(f => ({ ...f, vehicleEngineNo: e.target.value.toUpperCase() }))} placeholder="e.g. 2GD1234567" />
          </Field>
          <Field label="Body Type">
            <Sel value={form.bodyType} onChange={e => set(f => ({ ...f, bodyType: e.target.value }))}>
              {BODY_TYPES.map(b => <option key={b}>{b}</option>)}
            </Sel>
          </Field>
          <Field label="Use of Vehicle" required>
            <Sel value={form.vehicleUse} onChange={e => set(f => ({ ...f, vehicleUse: e.target.value }))}>
              {USE_TYPES.map(u => <option key={u}>{u}</option>)}
            </Sel>
          </Field>
          <Field label="Colour">
            <Inp value={form.colour} onChange={e => set(f => ({ ...f, colour: e.target.value }))} placeholder="e.g. White Pearl" />
          </Field>
          <Field label="Number of Seats">
            <Inp type="number" value={form.seats} onChange={e => set(f => ({ ...f, seats: e.target.value }))} placeholder="e.g. 5" min={1} max={100} />
          </Field>
          <Field label="Engine Capacity (cc)">
            <Inp type="number" value={form.cc} onChange={e => set(f => ({ ...f, cc: e.target.value }))} placeholder="e.g. 2400" />
          </Field>
        </div>
        <div className="mt-5 space-y-3">
          <Toggle checked={form.modified} onChange={v => set(f => ({ ...f, modified: v }))} label="Vehicle has modifications or non-standard accessories" sub="Aftermarket modifications, custom paint, upgraded audio etc." />
          {form.modified && (
            <div className="ml-12 animate-fade-up">
              <Field label="Modification Details">
                <Txt rows={2} value={form.modDetails} onChange={e => set(f => ({ ...f, modDetails: e.target.value }))} placeholder="Describe modifications and approximate values..." />
              </Field>
            </div>
          )}
          <Toggle checked={form.trackerInstalled} onChange={v => set(f => ({ ...f, trackerInstalled: v }))} label="Vehicle tracking device installed" sub="May qualify for a premium reduction" />
          {form.trackerInstalled && (
            <div className="ml-12 animate-fade-up">
              <Field label="Tracking Provider">
                <Inp value={form.trackerProvider} onChange={e => set(f => ({ ...f, trackerProvider: e.target.value }))} placeholder="e.g. Tracker Zimbabwe, Ctrack" />
              </Field>
            </div>
          )}
        </div>
      </div>
      <div>
        <SecHead sub="Principal driver to be named on the policy">Principal Driver</SecHead>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Full Name" required>
            <Inp value={form.driverName} onChange={e => set(f => ({ ...f, driverName: e.target.value }))} placeholder="Full name as on licence" />
          </Field>
          <Field label="Licence Number" required>
            <Inp value={form.driverLicenceNo} onChange={e => set(f => ({ ...f, driverLicenceNo: e.target.value }))} placeholder="e.g. ZIM-2345678" />
          </Field>
          <Field label="Licence Class">
            <Sel value={form.licenceClass} onChange={e => set(f => ({ ...f, licenceClass: e.target.value }))}>
              <option value="">Select...</option>
              {LICENCE_CLASSES.map(c => <option key={c}>{c}</option>)}
            </Sel>
          </Field>
          <Field label="Date of Birth" required hint="Used to assess young driver loading">
            <Inp type="date" value={form.driverDOB} onChange={e => set(f => ({ ...f, driverDOB: e.target.value }))} />
          </Field>
          <Field label="Years Licensed">
            <Inp type="number" value={form.yearsLicensed} onChange={e => set(f => ({ ...f, yearsLicensed: e.target.value }))} placeholder="e.g. 5" min={0} />
          </Field>
          <Field label="Claims History (Last 3 Years)">
            <Sel value={form.claimsHistory} onChange={e => set(f => ({ ...f, claimsHistory: e.target.value }))}>
              {['None', '1 Claim', '2 Claims', '3+ Claims', 'Major Claim (>50% SI)'].map(c => <option key={c}>{c}</option>)}
            </Sel>
          </Field>
        </div>
      </div>
      <div>
        <SecHead sub="Previous motor insurance for NCD verification">Previous Insurance</SecHead>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Previous Insurer">
            <Inp value={form.previousInsurer} onChange={e => set(f => ({ ...f, previousInsurer: e.target.value }))} placeholder="e.g. Old Mutual Insurance" />
          </Field>
          <Field label="Previous Policy Number">
            <Inp value={form.previousPolicyNo} onChange={e => set(f => ({ ...f, previousPolicyNo: e.target.value }))} placeholder="e.g. OML-2025-POL-8821" />
          </Field>
        </div>
      </div>
    </div>
  )
}

function Step3({ form, set }) {
  const handleInception = (val) => { set(f => ({ ...f, inceptionDate: val, expiryDate: addYears(val, 1) })) }
  const setExt = (k, v) => set(f => ({ ...f, extensions: { ...f.extensions, [k]: v } }))
  const activeExts = Object.entries(form.extensions).filter(([, v]) => v)
  const extTotal = activeExts.reduce((a, [k]) => a + (EXTENSIONS[k]?.premium || 0), 0)
  return (
    <div className="space-y-7">
      <div>
        <SecHead sub="Section of cover and basis of insurance">Cover Section</SecHead>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Cover Type" required>
            <Sel value={form.coverType} onChange={e => set(f => ({ ...f, coverType: e.target.value }))}>
              {COVER_TYPES.map(c => <option key={c}>{c}</option>)}
            </Sel>
          </Field>
          <Field label="Currency">
            <Sel value={form.currency} onChange={e => set(f => ({ ...f, currency: e.target.value }))}>
              {CURRENCIES.map(c => <option key={c}>{c}</option>)}
            </Sel>
          </Field>
          <Field label="Sum Insured / Market Value" required hint={form.coverType === 'Third Party Only' ? 'Not applicable for TP Only' : 'Current market value'}>
            <Inp type="number" value={form.sumInsured} onChange={e => set(f => ({ ...f, sumInsured: e.target.value }))}
              placeholder={form.coverType === 'Third Party Only' ? 'N/A' : '25000'}
              disabled={form.coverType === 'Third Party Only'} />
          </Field>
          <Field label="Policy Inception Date" required>
            <Inp type="date" value={form.inceptionDate} onChange={e => handleInception(e.target.value)} />
          </Field>
          <Field label="Policy Expiry Date" hint="Auto-set to 12 months from inception">
            <Inp type="date" value={form.expiryDate} onChange={e => set(f => ({ ...f, expiryDate: e.target.value }))} />
          </Field>
          <Field label="Third Party Property Limit">
            <Inp type="number" value={form.thirdPartyLimit} onChange={e => set(f => ({ ...f, thirdPartyLimit: e.target.value }))} placeholder="50000" />
          </Field>
        </div>
        <div className="mt-4">
          <Toggle checked={form.agreedValue} onChange={v => set(f => ({ ...f, agreedValue: v }))} label="Agreed Value Basis" sub="Insurer pays agreed value on total loss without market value deduction" />
        </div>
      </div>
      <div>
        <SecHead sub="Optional extensions to be endorsed onto this policy">Extensions and Additional Covers</SecHead>
        <div className="grid grid-cols-2 gap-2.5">
          {Object.entries(EXTENSIONS).map(([key, ext]) => (
            <label key={key} className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${form.extensions[key] ? 'border-helix-600/50 bg-helix-600/10' : 'border-slate-700/40 bg-slate-800/20 hover:border-slate-600/50'}`}>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={form.extensions[key]} onChange={e => setExt(key, e.target.checked)} className="accent-helix-500 w-4 h-4 flex-shrink-0" />
                <span className={`text-sm ${form.extensions[key] ? 'text-slate-200' : 'text-slate-400'}`}>{ext.label}</span>
              </div>
              <span className={`text-xs font-mono flex-shrink-0 ${form.extensions[key] ? 'text-helix-400' : 'text-slate-600'}`}>+{form.currency} {ext.premium}</span>
            </label>
          ))}
        </div>
        {activeExts.length > 0 && (
          <div className="mt-3 p-3 bg-helix-900/20 border border-helix-700/20 rounded-xl flex justify-between text-sm animate-fade-up">
            <span className="text-slate-400">{activeExts.length} extension{activeExts.length > 1 ? 's' : ''} selected</span>
            <span className="font-mono text-helix-400">+{form.currency} {fmt(extTotal)} additional premium</span>
          </div>
        )}
      </div>
      <div>
        <SecHead sub="Endorsements, warranties or underwriting conditions">Special Conditions and Warranties</SecHead>
        <div className="space-y-4">
          <Field label="Special Conditions">
            <Txt rows={2} value={form.specialConditions} onChange={e => set(f => ({ ...f, specialConditions: e.target.value }))} placeholder="e.g. Vehicle to be kept in secured parking overnight..." />
          </Field>
          <Field label="Warranty Conditions">
            <Txt rows={2} value={form.warrantyConditions} onChange={e => set(f => ({ ...f, warrantyConditions: e.target.value }))} placeholder="e.g. Tracking device warranty - tracker must remain operational..." />
          </Field>
        </div>
      </div>
    </div>
  )
}

function Step4({ form, set }) {
  const calc = calcPremium(form)
  const handleNcdYears = (yrs) => {
    const entry = NCD_SCHEDULE.find(n => String(n.years) === yrs) || NCD_SCHEDULE[0]
    set(f => ({ ...f, ncdYears: yrs, ncdPct: String(entry.discount) }))
  }
  return (
    <div>
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-3 space-y-6">
          <div>
            <SecHead sub="Base tariff rate applied to sum insured">Basic Premium Rate</SecHead>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Basic Rate (%)" required hint="Standard tariff rate before adjustments">
                <Inp type="number" value={form.basicRate} onChange={e => set(f => ({ ...f, basicRate: e.target.value }))} placeholder="e.g. 4.50" step="0.01" min="0" />
              </Field>
              <Field label="Sum Insured (from Step 3)">
                <Inp value={form.sumInsured ? `${form.currency} ${fmt(form.sumInsured)}` : '—'} readOnly className="opacity-60 cursor-not-allowed" />
              </Field>
            </div>
          </div>
          <div>
            <SecHead sub="No-Claim Discount based on claims-free years">NCD — No Claim Discount</SecHead>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Claims-Free Years">
                <Sel value={form.ncdYears} onChange={e => handleNcdYears(e.target.value)}>
                  {NCD_SCHEDULE.map(n => (
                    <option key={n.years} value={String(n.years)}>
                      {n.years === '8+' ? '8+ years' : n.years === 0 ? 'No NCD (0 years)' : `${n.years} year${n.years > 1 ? 's' : ''}`}
                    </option>
                  ))}
                </Sel>
              </Field>
              <Field label="NCD Discount (%)">
                <Inp value={`${form.ncdPct}%`} readOnly className="opacity-70 cursor-not-allowed text-emerald-400" />
              </Field>
            </div>
            <div className="mt-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/30">
              <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-wide">Quick NCD Select</div>
              <div className="flex gap-1 flex-wrap">
                {NCD_SCHEDULE.map(n => (
                  <button key={n.years} type="button" onClick={() => handleNcdYears(String(n.years))}
                    className={`px-2 py-1 rounded-md text-[10px] transition-colors ${String(n.years) === form.ncdYears ? 'bg-helix-600/30 text-helix-300 border border-helix-600/40' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}>
                    {n.years === '8+' ? '8+yr' : `${n.years}yr`} = {n.discount}%
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <SecHead sub="Additional loadings applied to the risk">Risk Loadings</SecHead>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Young Driver Loading (%)" hint="Driver under 25 or less than 3 years licensed">
                <Inp type="number" value={form.youngDriverLoading} onChange={e => set(f => ({ ...f, youngDriverLoading: e.target.value }))} placeholder="e.g. 0.75" step="0.01" min="0" />
              </Field>
              <Field label="High Value Vehicle Loading (%)" hint="Vehicles above market value threshold">
                <Inp type="number" value={form.highValueLoading} onChange={e => set(f => ({ ...f, highValueLoading: e.target.value }))} placeholder="e.g. 0.25" step="0.01" min="0" />
              </Field>
              <Field label="Fleet Loading (%)">
                <Inp type="number" value={form.fleetLoading} onChange={e => set(f => ({ ...f, fleetLoading: e.target.value }))} placeholder="e.g. 0.50" step="0.01" min="0" />
              </Field>
              <Field label="Claims History Loading (%)">
                <Inp type="number" value={form.claimsLoading} onChange={e => set(f => ({ ...f, claimsLoading: e.target.value }))} placeholder="e.g. 1.00" step="0.01" min="0" />
              </Field>
              <Field label="Other Loading (%)">
                <Inp type="number" value={form.otherLoading} onChange={e => set(f => ({ ...f, otherLoading: e.target.value }))} placeholder="e.g. 0.00" step="0.01" min="0" />
              </Field>
              <Field label="Other Loading Description">
                <Inp value={form.otherLoadingDesc} onChange={e => set(f => ({ ...f, otherLoadingDesc: e.target.value }))} placeholder="Reason for loading" disabled={!form.otherLoading || form.otherLoading === '0'} />
              </Field>
            </div>
          </div>
          <div>
            <SecHead sub="Discounts and statutory charges">Discounts and Levies</SecHead>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Premium Discount (%)" hint="Approved discretionary discount">
                <Inp type="number" value={form.discountPct} onChange={e => set(f => ({ ...f, discountPct: e.target.value }))} placeholder="e.g. 0" step="0.01" min="0" max="30" />
              </Field>
              <Field label="Discount Reason">
                <Inp value={form.discountReason} onChange={e => set(f => ({ ...f, discountReason: e.target.value }))} placeholder="e.g. Loyalty discount" disabled={!form.discountPct || form.discountPct === '0'} />
              </Field>
              <Field label="Stamp Duty (%)">
                <Inp type="number" value={form.stampDutyPct} onChange={e => set(f => ({ ...f, stampDutyPct: e.target.value }))} placeholder="3" step="0.01" />
              </Field>
              <Field label="Regulatory Levy (%)">
                <Inp type="number" value={form.levyPct} onChange={e => set(f => ({ ...f, levyPct: e.target.value }))} placeholder="1" step="0.01" />
              </Field>
              <Field label="VAT (%)" hint="If applicable">
                <Inp type="number" value={form.vatPct} onChange={e => set(f => ({ ...f, vatPct: e.target.value }))} placeholder="0" step="0.01" />
              </Field>
            </div>
          </div>
          <div>
            <SecHead sub="Excess amounts the insured bears per claim">Excess / Deductibles</SecHead>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Compulsory Excess" hint="Mandatory deductible applied to all claims">
                <Inp type="number" value={form.compulsoryExcess} onChange={e => set(f => ({ ...f, compulsoryExcess: e.target.value }))} placeholder="e.g. 500" />
              </Field>
              <Field label="Voluntary Excess" hint="Additional excess insured agrees to bear">
                <Inp type="number" value={form.voluntaryExcess} onChange={e => set(f => ({ ...f, voluntaryExcess: e.target.value }))} placeholder="e.g. 0" />
              </Field>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="sticky top-0 space-y-4">
            <div className="p-4 bg-helix-900/20 border border-helix-700/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={14} className="text-helix-400" />
                <span className="text-xs font-semibold text-helix-400 uppercase tracking-wide">Live Premium Calculator</span>
              </div>
              {!form.sumInsured || !form.basicRate ? (
                <div className="text-center py-6">
                  <DollarSign size={24} className="text-slate-700 mx-auto mb-2" />
                  <p className="text-xs text-slate-600">Enter Sum Insured and Basic Rate to calculate</p>
                </div>
              ) : (
                <div>
                  <div className="space-y-1 mb-3 text-xs">
                    {[
                      ['Sum Insured', `${form.currency} ${fmt(form.sumInsured)}`, 'text-slate-300'],
                      ['Basic Rate', `${form.basicRate}%`, 'text-slate-300'],
                      [`NCD (${form.ncdYears}yr)`, `- ${form.ncdPct}%`, 'text-emerald-400'],
                      ...(parseFloat(form.youngDriverLoading) > 0 ? [['Young Driver', `+ ${form.youngDriverLoading}%`, 'text-amber-400']] : []),
                      ...(parseFloat(form.highValueLoading) > 0 ? [['High Value', `+ ${form.highValueLoading}%`, 'text-amber-400']] : []),
                      ...(parseFloat(form.fleetLoading) > 0 ? [['Fleet Loading', `+ ${form.fleetLoading}%`, 'text-amber-400']] : []),
                      ...(parseFloat(form.claimsLoading) > 0 ? [['Claims Loading', `+ ${form.claimsLoading}%`, 'text-amber-400']] : []),
                      ...(parseFloat(form.discountPct) > 0 ? [['Discount', `- ${form.discountPct}%`, 'text-emerald-400']] : []),
                    ].map(([l, v, c]) => (
                      <div key={l} className="flex justify-between border-b border-slate-800/30 pb-1">
                        <span className="text-slate-500">{l}</span>
                        <span className={`font-mono ${c}`}>{v}</span>
                      </div>
                    ))}
                    <div className="p-2 bg-helix-800/20 rounded-lg flex justify-between mt-1">
                      <span className="text-slate-400">Net Rate</span>
                      <span className="text-helix-300 font-mono font-bold">{calc.netRate}%</span>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs border-t border-slate-700/40 pt-3">
                    {[
                      ['Net Premium', `${form.currency} ${fmt(calc.netPremium)}`, 'text-slate-300'],
                      ...(parseFloat(calc.extPremium) > 0 ? [['Extensions', `+ ${form.currency} ${fmt(calc.extPremium)}`, 'text-helix-400']] : []),
                      [`Stamp Duty (${form.stampDutyPct}%)`, `${form.currency} ${fmt(calc.stampDuty)}`, 'text-slate-400'],
                      [`Levy (${form.levyPct}%)`, `${form.currency} ${fmt(calc.levy)}`, 'text-slate-400'],
                      ...(parseFloat(form.vatPct) > 0 ? [[`VAT (${form.vatPct}%)`, `${form.currency} ${fmt(calc.vatAmt)}`, 'text-slate-400']] : []),
                    ].map(([l, v, c]) => (
                      <div key={l} className="flex justify-between">
                        <span className="text-slate-500">{l}</span>
                        <span className={`font-mono ${c}`}>{v}</span>
                      </div>
                    ))}
                    <div className="border-t border-slate-700/50 pt-2 mt-1 flex justify-between">
                      <span className="text-slate-200 font-semibold text-sm">GROSS PREMIUM</span>
                      <span className="text-helix-300 font-mono font-bold text-base">{form.currency} {fmt(calc.gross)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
              <Field label="Quotation Validity (Days)" hint="Days this quotation remains valid">
                <Inp type="number" value={form.validityDays} onChange={e => set(f => ({ ...f, validityDays: e.target.value }))} placeholder="30" min={1} max={90} />
              </Field>
              <div className="mt-2 text-[10px] text-slate-600">Quote expiry: {addDays(today(), parseInt(form.validityDays) || 30)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Step5({ form, set }) {
  const calc = calcPremium(form)
  const activeExts = Object.entries(form.extensions).filter(([, v]) => v).map(([k]) => EXTENSIONS[k]?.label)
  const Block = ({ title, rows }) => (
    <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
      <div className="text-[10px] text-helix-500 font-bold uppercase tracking-widest mb-3">{title}</div>
      <div className="space-y-1.5">
        {rows.map(([l, v, hi]) => (
          <div key={l} className="flex justify-between gap-4 border-b border-slate-800/30 pb-1.5 last:border-0 last:pb-0">
            <span className="text-xs text-slate-500 flex-shrink-0">{l}</span>
            <span className={`text-xs text-right truncate ${hi ? 'text-helix-300 font-mono font-bold' : 'text-slate-300'}`}>{v || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <div className="space-y-4">
      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5">
        <AlertTriangle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-400">Review all details carefully. Once issued the quotation will be assigned a reference and can be sent to the client.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Block title="Insured and Submission" rows={[
          ['Insured Name', form.insuredName], ['ID Type', form.idType], ['ID Number', form.idNumber],
          ['Phone', form.phone], ['Email', form.email], ['Broker', form.brokerName], ['Broker Ref.', form.brokerRef],
        ]} />
        <Block title="Vehicle Details" rows={[
          ['Class', form.vehicleClass], ['Make and Model', `${form.vehicleMake} ${form.vehicleModel}`],
          ['Year', form.vehicleYear], ['Reg. No.', form.vehicleRegNo], ['Chassis No.', form.vehicleChassisNo],
          ['Body Type', form.bodyType], ['Use', form.vehicleUse], ['Principal Driver', form.driverName],
        ]} />
        <Block title="Cover and Period" rows={[
          ['Cover Type', form.coverType],
          ['Sum Insured', form.sumInsured ? `${form.currency} ${fmt(form.sumInsured)}` : 'N/A'],
          ['Agreed Value', form.agreedValue ? 'Yes' : 'No'],
          ['Inception', form.inceptionDate], ['Expiry', form.expiryDate],
          ['TP Property Limit', `${form.currency} ${fmt(form.thirdPartyLimit)}`],
          ['Extensions', activeExts.length ? `${activeExts.length} selected` : 'None'],
        ]} />
        <Block title="Premium Breakdown" rows={[
          ['Basic Rate', `${form.basicRate}%`],
          ['NCD Discount', `${form.ncdPct}% (${form.ncdYears}yr)`],
          ['Net Rate', `${calc.netRate}%`],
          ['Net Premium', `${form.currency} ${fmt(calc.netPremium)}`],
          ['Extensions', `${form.currency} ${fmt(calc.extPremium)}`],
          ['Stamp Duty', `${form.currency} ${fmt(calc.stampDuty)}`],
          ['Regulatory Levy', `${form.currency} ${fmt(calc.levy)}`],
          ['GROSS PREMIUM', `${form.currency} ${fmt(calc.gross)}`, true],
        ]} />
      </div>
      <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
        <Field label="Underwriter Notes / Internal Remarks">
          <Txt rows={2} value={form.underwriterNotes} onChange={e => set(f => ({ ...f, underwriterNotes: e.target.value }))} placeholder="Any internal notes about this quotation..." />
        </Field>
      </div>
    </div>
  )
}

function QuoteDrawer({ quote, onClose, onStatusChange }) {
  const s = STATUS[quote.status]
  const [confirmBind, setConfirmBind] = useState(false)
  const [confirmDecline, setConfirmDecline] = useState(false)
  return (
    <div className="fixed inset-y-0 right-0 w-[420px] glass border-l border-slate-800/50 flex flex-col z-30 animate-slide-in">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/50 flex-shrink-0">
        <div>
          <div className="font-mono text-xs text-helix-500 mb-0.5">{quote.ref}</div>
          <div className="font-semibold text-slate-200 text-sm">{quote.insured}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full border ${s.bg} ${s.color} ${s.border}`}>{s.label}</span>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-200 transition-colors"><X size={15} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        <div className="grid grid-cols-2 gap-2.5">
          {[['Cover Type', quote.cover], ['Vehicle Class', quote.class], ['Broker', quote.broker], ['Underwriter', quote.underwriter], ['Created', quote.created], ['Expires', quote.expires]].map(([l, v]) => (
            <div key={l} className="p-3 bg-slate-800/40 rounded-xl">
              <div className="text-[10px] text-slate-500 mb-0.5">{l}</div>
              <div className="text-sm text-slate-200 font-medium">{v || '—'}</div>
            </div>
          ))}
        </div>
        <div className="p-3 bg-slate-800/30 rounded-xl border border-slate-700/30">
          <div className="text-[10px] text-helix-500 uppercase tracking-wide font-semibold mb-2">Vehicle</div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{quote.vehicleMake} {quote.vehicleModel}</span>
            <span className="font-mono text-slate-500">{quote.regNo}</span>
          </div>
          <div className="text-xs text-slate-600">{quote.vehicles > 1 ? `${quote.vehicles} vehicles` : '1 vehicle'}</div>
        </div>
        <div className="p-3 bg-helix-900/20 border border-helix-700/20 rounded-xl">
          <div className="text-[10px] text-helix-500 uppercase tracking-wide font-semibold mb-3">Premium Breakdown</div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between"><span className="text-slate-500">Sum Insured</span><span className="text-slate-300 font-mono">{quote.currency} {fmt(quote.sumInsured)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Basic Rate</span><span className="text-slate-300 font-mono">{quote.basicRate}%</span></div>
            <div className="flex justify-between"><span className="text-slate-500">NCD Discount</span><span className="text-emerald-400 font-mono">-{quote.ncdPct}%</span></div>
            <div className="border-t border-slate-700/40 pt-1.5 flex justify-between">
              <span className="text-slate-500">Net Premium</span><span className="text-slate-300 font-mono">{quote.currency} {fmt(quote.netPremium)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Gross Premium</span><span className="text-helix-300 font-mono">{quote.currency} {fmt(quote.grossPremium)}</span>
            </div>
          </div>
        </div>
        {quote.status === 'quoted' && !confirmBind && !confirmDecline && (
          <div className="space-y-2">
            <button onClick={() => setConfirmBind(true)} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-colors">
              Accept and Bind Risk
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="py-2 glass-light text-slate-300 rounded-xl text-xs border border-slate-700 hover:text-white transition-colors flex items-center justify-center gap-1.5">
                <Printer size={12} /> Print Quote
              </button>
              <button className="py-2 glass-light text-slate-300 rounded-xl text-xs border border-slate-700 hover:text-white transition-colors flex items-center justify-center gap-1.5">
                <Send size={12} /> Email Client
              </button>
              <button onClick={() => setConfirmDecline(true)} className="col-span-2 py-2 glass-light text-rose-400 rounded-xl text-xs border border-rose-900/30 hover:bg-rose-900/20 transition-colors flex items-center justify-center gap-1.5">
                <XCircle size={12} /> Decline Quotation
              </button>
            </div>
          </div>
        )}
        {confirmBind && (
          <div className="p-4 bg-emerald-900/20 border border-emerald-600/30 rounded-xl animate-fade-up">
            <p className="text-sm text-emerald-300 mb-3">Confirm binding this risk and converting to a policy?</p>
            <div className="flex gap-2">
              <button onClick={() => { onStatusChange(quote.ref, 'bound'); setConfirmBind(false); onClose() }} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold transition-colors">
                Confirm Bind
              </button>
              <button onClick={() => setConfirmBind(false)} className="px-4 py-2 glass-light text-slate-400 rounded-lg text-sm border border-slate-700">Cancel</button>
            </div>
          </div>
        )}
        {confirmDecline && (
          <div className="p-4 bg-rose-900/20 border border-rose-600/30 rounded-xl animate-fade-up">
            <p className="text-sm text-rose-300 mb-3">Confirm declining this quotation?</p>
            <div className="flex gap-2">
              <button onClick={() => { onStatusChange(quote.ref, 'declined'); setConfirmDecline(false); onClose() }} className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-semibold transition-colors">
                Confirm Decline
              </button>
              <button onClick={() => setConfirmDecline(false)} className="px-4 py-2 glass-light text-slate-400 rounded-lg text-sm border border-slate-700">Cancel</button>
            </div>
          </div>
        )}
        {quote.status === 'draft' && (
          <button onClick={() => onStatusChange(quote.ref, 'quoted')} className="w-full py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors">
            Issue Quotation
          </button>
        )}
      </div>
    </div>
  )
}

function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t) }, [onClose])
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 glass rounded-xl border border-emerald-500/30 bg-emerald-500/10 animate-fade-up shadow-xl">
      <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
      <span className="text-sm text-emerald-300">{msg}</span>
      <button onClick={onClose} className="text-emerald-600 hover:text-emerald-300 ml-1"><X size={12} /></button>
    </div>
  )
}

export default function Quotations() {
  const [quotes, setQuotes] = useState(INITIAL_QUOTES)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterClass, setFilterClass] = useState('all')
  const [viewing, setViewing] = useState(null)
  const [showWizard, setShowWizard] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(defaultForm)
  const [issued, setIssued] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [toast, setToast] = useState(null)

  const resetWizard = () => { setStep(1); setForm(defaultForm); setIssued(null); setShowSuccess(false) }

  const filtered = quotes.filter(q => {
    const matchSearch = q.insured.toLowerCase().includes(search.toLowerCase()) ||
      q.ref.toLowerCase().includes(search.toLowerCase()) ||
      (q.regNo || '').toUpperCase().includes(search.toUpperCase())
    const matchStatus = filterStatus === 'all' || q.status === filterStatus
    const matchClass = filterClass === 'all' || q.class === filterClass
    return matchSearch && matchStatus && matchClass
  })

  const handleIssue = () => {
    const calc = calcPremium(form)
    const ref = genRef()
    const newQ = {
      ref, insured: form.insuredName, class: form.vehicleClass, vehicles: 1,
      cover: form.coverType, premium: `${form.currency} ${fmt(calc.gross)}`,
      currency: form.currency, sumInsured: parseFloat(form.sumInsured) || 0,
      status: 'quoted', broker: form.brokerName,
      expires: addDays(today(), parseInt(form.validityDays) || 30),
      created: today(), underwriter: 'J. Mutasa',
      vehicleMake: form.vehicleMake, vehicleModel: form.vehicleModel, regNo: form.vehicleRegNo,
      basicRate: parseFloat(form.basicRate) || 0, ncdPct: parseFloat(form.ncdPct) || 0,
      grossPremium: parseFloat(calc.gross), netPremium: parseFloat(calc.netPremium),
    }
    setQuotes(prev => [newQ, ...prev])
    setIssued(newQ)
    setShowSuccess(true)
  }

  const handleStatusChange = (ref, newStatus) => {
    setQuotes(prev => prev.map(q => q.ref === ref ? { ...q, status: newStatus } : q))
    setToast(`Quotation ${ref} ${newStatus === 'bound' ? 'bound successfully' : newStatus}`)
  }

  const statusCounts = Object.keys(STATUS).reduce((acc, s) => {
    acc[s] = quotes.filter(q => q.status === s).length; return acc
  }, {})

  if (showWizard) return (
    <div className="fixed inset-0 z-50 flex" style={{ background: 'rgba(2,6,23,0.97)' }}>
      <div className="w-60 border-r border-slate-800/50 flex flex-col glass min-h-screen flex-shrink-0">
        <div className="px-5 py-5 border-b border-slate-800/50">
          <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">New Quotation Wizard</div>
          <div className="font-display text-lg text-white leading-tight">Motor Insurance<br />Quotation</div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {STEPS.map(s => {
            const done = step > s.id; const active = step === s.id; const Icon = s.icon
            return (
              <button key={s.id} onClick={() => done && setStep(s.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${active ? 'bg-helix-600/20 border border-helix-600/30' : done ? 'hover:bg-slate-800/40 cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${active ? 'bg-helix-600 text-white' : done ? 'bg-emerald-600/20 text-emerald-400' : 'bg-slate-800 text-slate-600'}`}>
                  {done ? <Check size={11} /> : s.id}
                </div>
                <div>
                  <div className={`text-xs font-semibold ${active ? 'text-helix-300' : done ? 'text-slate-300' : 'text-slate-600'}`}>{s.label}</div>
                  <div className="text-[10px] text-slate-600 mt-0.5">{s.desc}</div>
                </div>
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-800/50">
          {form.sumInsured && form.basicRate && (() => {
            const c = calcPremium(form)
            return (
              <div className="p-3 bg-helix-900/20 border border-helix-700/20 rounded-xl mb-3">
                <div className="text-[10px] text-helix-500 uppercase tracking-wide mb-1">Est. Gross Premium</div>
                <div className="font-mono text-base font-bold text-helix-300">{form.currency} {fmt(c.gross)}</div>
              </div>
            )
          })()}
          <button onClick={() => { setShowWizard(false); resetWizard() }} className="w-full flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-slate-300 text-xs rounded-lg hover:bg-slate-800/40 transition-colors">
            <X size={13} /> Cancel
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-8 py-4 border-b border-slate-800/50 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="text-xs text-slate-500">Step {step} of {STEPS.length} — {STEPS[step - 1].label}</div>
            <div className="text-slate-200 font-semibold text-sm mt-0.5">{STEPS[step - 1].desc}</div>
          </div>
          <div className="flex items-center gap-1.5">
            {STEPS.map(s => (
              <div key={s.id} className={`h-1.5 rounded-full transition-all ${s.id < step ? 'bg-emerald-500 w-8' : s.id === step ? 'bg-helix-500 w-10' : 'bg-slate-800 w-6'}`} />
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {showSuccess && issued ? (
            <div className="max-w-xl mx-auto text-center py-12 animate-fade-up">
              <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={36} className="text-emerald-400" />
              </div>
              <h2 className="font-display text-3xl text-white mb-2">Quotation Issued!</h2>
              <p className="text-slate-400 mb-1">Reference: <span className="font-mono text-helix-400">{issued.ref}</span></p>
              <p className="text-slate-500 text-sm mb-6">Valid for {form.validityDays} days — expires {addDays(today(), parseInt(form.validityDays) || 30)}</p>
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-8">
                {[['Insured', issued.insured], ['Premium', issued.premium], ['Cover', issued.cover], ['Expires', issued.expires]].map(([l, v]) => (
                  <div key={l} className="p-3 bg-slate-800/40 rounded-xl">
                    <div className="text-xs text-slate-500 mb-1">{l}</div>
                    <div className="text-slate-200 font-medium text-sm">{v}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-3 mb-6">
                {[['Print Quote', '🖨️'], ['Email Client', '📧'], ['Convert to Policy', '📋']].map(([lbl, ico]) => (
                  <button key={lbl} className="flex items-center gap-1.5 px-4 py-2 glass-light text-slate-300 rounded-xl text-xs border border-slate-700 hover:text-white hover:border-helix-600/30 transition-colors">
                    <span>{ico}</span>{lbl}
                  </button>
                ))}
              </div>
              <button onClick={() => { setShowWizard(false); resetWizard() }} className="px-6 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-medium transition-colors">
                Back to Quotations
              </button>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              {step === 1 && <Step1 form={form} set={setForm} />}
              {step === 2 && <Step2 form={form} set={setForm} />}
              {step === 3 && <Step3 form={form} set={setForm} />}
              {step === 4 && <Step4 form={form} set={setForm} />}
              {step === 5 && <Step5 form={form} set={setForm} />}
            </div>
          )}
        </div>

        {!showSuccess && (
          <div className="px-8 py-4 border-t border-slate-800/50 flex items-center justify-between flex-shrink-0">
            <button onClick={() => step > 1 ? setStep(s => s - 1) : (setShowWizard(false), resetWizard())}
              className="flex items-center gap-2 px-4 py-2 glass-light text-slate-400 hover:text-slate-200 rounded-xl text-sm border border-slate-700 transition-colors">
              <ArrowLeft size={13} />{step === 1 ? 'Cancel' : 'Back'}
            </button>
            <div className="text-xs text-slate-700 font-mono">{step}/{STEPS.length}</div>
            {step === STEPS.length ? (
              <button onClick={handleIssue} className="flex items-center gap-2 px-6 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors glow-blue">
                <FileText size={14} /> Issue Quotation
              </button>
            ) : (
              <button onClick={() => setStep(s => s + 1)} className="flex items-center gap-2 px-5 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-medium transition-colors">
                Continue <ArrowRight size={13} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {viewing && <QuoteDrawer quote={viewing} onClose={() => setViewing(null)} onStatusChange={handleStatusChange} />}
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
      <div className={`space-y-5 transition-all ${viewing ? 'mr-[440px]' : ''}`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Quotations</h1>
            <p className="text-slate-500 text-sm mt-1">Motor insurance quotations — draft, issue and bind</p>
          </div>
          <button onClick={() => { resetWizard(); setShowWizard(true) }} className="flex items-center gap-2 px-4 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-semibold transition-colors glow-blue">
            <Plus size={15} /> New Quotation
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {Object.entries(STATUS).map(([key, s]) => (
            <button key={key} onClick={() => setFilterStatus(filterStatus === key ? 'all' : key)}
              className={`p-3 rounded-xl border text-left transition-all ${filterStatus === key ? `${s.bg} ${s.border}` : 'glass-light border-slate-800/50 hover:border-slate-700'}`}>
              <div className={`font-display text-2xl font-bold ${s.color}`}>{statusCounts[key] || 0}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{s.label}</div>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by client, reference or registration..."
              className="w-full pl-10 pr-4 py-2.5 glass-light rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none border border-transparent focus:border-helix-600/40" />
          </div>
          <Sel value={filterClass} onChange={e => setFilterClass(e.target.value)} className="w-40">
            <option value="all">All Classes</option>
            {VEHICLE_CLASSES.map(c => <option key={c}>{c}</option>)}
          </Sel>
        </div>

        <div className="glass-light rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800/50">
                {['Reference', 'Insured', 'Class', 'Veh.', 'Cover', 'Broker', 'Premium', 'Created', 'Expires', 'Status', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wide first:pl-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={11} className="px-5 py-12 text-center text-slate-600 text-sm">No quotations match your search.</td></tr>
              )}
              {filtered.map(q => {
                const s = STATUS[q.status]
                const isSelected = viewing?.ref === q.ref
                return (
                  <tr key={q.ref} onClick={() => setViewing(isSelected ? null : q)}
                    className={`border-b border-slate-800/30 last:border-0 cursor-pointer transition-colors ${isSelected ? 'bg-helix-600/10' : 'hover:bg-slate-800/25'}`}>
                    <td className="px-4 pl-5 py-3.5 font-mono text-xs text-helix-400 whitespace-nowrap">{q.ref}</td>
                    <td className="px-4 py-3.5 text-slate-200 font-medium max-w-36 truncate">{q.insured}</td>
                    <td className="px-4 py-3.5"><span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">{q.class}</span></td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs text-center">{q.vehicles}</td>
                    <td className="px-4 py-3.5 text-slate-400 text-xs whitespace-nowrap">{q.cover}</td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs truncate max-w-20">{q.broker}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-200 font-medium whitespace-nowrap">{q.premium}</td>
                    <td className="px-4 py-3.5 text-slate-600 text-xs whitespace-nowrap">{q.created}</td>
                    <td className="px-4 py-3.5 text-slate-600 text-xs whitespace-nowrap">{q.expires}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border whitespace-nowrap ${s.bg} ${s.color} ${s.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <ChevronRight size={14} className={`transition-transform ${isSelected ? 'rotate-90 text-helix-400' : 'text-slate-700'}`} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-600 px-1">
          <span>Showing {filtered.length} of {quotes.length} quotations</span>
          <span className="font-mono">Page 1 of 1</span>
        </div>
      </div>
    </>
  )
}
