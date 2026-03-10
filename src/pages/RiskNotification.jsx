import React, { useState } from 'react'
import { PageHeader, Panel, Badge, Button, Input, Select } from '../components/UI'

const STEPS = ['Enquiry Details', 'Vehicle Data', 'KYC & Assessment', 'Convert to Quote']

const NOTIFICATIONS = [
  { ref: 'NTF-2026-0091', insured: 'Chisipiti Holdings', source: 'Broker', date: '20 Feb 2026', status: 'pending', risk: 'Fleet' },
  { ref: 'NTF-2026-0090', insured: 'R. Dube', source: 'Direct', date: '19 Feb 2026', status: 'active', risk: 'Private' },
  { ref: 'NTF-2026-0089', insured: 'Eastgate PSV Ltd', source: 'Portal', date: '19 Feb 2026', status: 'pending', risk: 'PSV' },
  { ref: 'NTF-2026-0088', insured: 'T. Ncube', source: 'Direct', date: '18 Feb 2026', status: 'active', risk: 'Private' },
  { ref: 'NTF-2026-0087', insured: 'ZimFreight (Pvt)', source: 'Broker', date: '18 Feb 2026', status: 'danger', risk: 'Commercial' },
  { ref: 'NTF-2026-0086', insured: 'A. Marondera', source: 'Renewal', date: '17 Feb 2026', status: 'active', risk: 'Private' },
]

export default function RiskNotification() {
  const [step, setStep] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    source: 'direct', vehicleClass: 'private', coverType: 'comprehensive',
    insuredName: '', idNumber: '', phone: '', email: '', broker: '',
    vehicleReg: '', make: '', model: '', year: '', engineCC: '', colour: '',
    sumInsured: '', usage: 'private',
  })

  const update = (field) => (e) => setFormData(d => ({ ...d, [field]: e.target.value }))

  return (
    <div className="p-8">
      <PageHeader
        badge="Module: NTF"
        title="RISK NOTIFICATION"
        subtitle="Capture incoming motor insurance enquiries and initiate the underwriting workflow"
        actions={
          <>
            <Button variant="ghost" small>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Search
            </Button>
            <Button variant="primary" small onClick={() => setShowForm(true)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              New Notification
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-3 gap-6">
        {/* Left: notification list */}
        <div className="col-span-1">
          <div
            className="rounded-lg overflow-hidden"
            style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid #1A2A45' }}
          >
            <div className="px-4 py-3 border-b border-[#1A2A45] flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#4A6080]">Pending Notifications</span>
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                style={{ background: 'rgba(14,165,233,0.1)', color: '#0EA5E9', border: '1px solid rgba(14,165,233,0.2)' }}
              >
                6
              </span>
            </div>
            <div className="divide-y divide-[#1A2A45] divide-opacity-50">
              {NOTIFICATIONS.map((n, i) => (
                <div
                  key={i}
                  className="px-4 py-3 hover:bg-[#0D1526] cursor-pointer transition-colors group"
                  onClick={() => setShowForm(true)}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-[11px] font-mono text-[#0EA5E9]">{n.ref}</span>
                    <Badge label={n.status} type={n.status} />
                  </div>
                  <div className="text-[12px] text-[#CBD5E1] font-medium mb-0.5">{n.insured}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#4A6080]">{n.risk}</span>
                    <span className="text-[#1A2A45]">·</span>
                    <span className="text-[10px] text-[#4A6080]">{n.source}</span>
                    <span className="text-[#1A2A45]">·</span>
                    <span className="text-[10px] text-[#4A6080]">{n.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form or empty state */}
        <div className="col-span-2">
          {!showForm ? (
            <div
              className="rounded-lg flex flex-col items-center justify-center h-96"
              style={{ background: 'rgba(13,21,38,0.9)', border: '1px dashed #1A2A45' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.1)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <p className="text-[#4A6080] text-sm mb-4">Select a notification or create a new one</p>
              <Button variant="primary" onClick={() => setShowForm(true)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                New Notification
              </Button>
            </div>
          ) : (
            <div
              className="rounded-lg overflow-hidden"
              style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid #1A2A45' }}
            >
              {/* Step header */}
              <div className="px-6 py-4 border-b border-[#1A2A45]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#4A6080]">New Notification Wizard</span>
                  <button onClick={() => setShowForm(false)} className="text-[#4A6080] hover:text-[#CBD5E1]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
                {/* Steps */}
                <div className="flex items-center gap-0">
                  {STEPS.map((s, i) => (
                    <React.Fragment key={i}>
                      <button
                        onClick={() => setStep(i)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors ${
                          i === step
                            ? 'text-white'
                            : i < step
                            ? 'text-[#10B981]'
                            : 'text-[#4A6080]'
                        }`}
                        style={i === step ? {
                          background: 'rgba(14,165,233,0.1)',
                          border: '1px solid rgba(14,165,233,0.2)',
                        } : {}}
                      >
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                          style={{
                            background: i === step ? '#0EA5E9' : i < step ? '#10B981' : 'rgba(26,42,69,0.5)',
                            color: 'white',
                          }}
                        >
                          {i < step ? '✓' : i + 1}
                        </span>
                        {s}
                      </button>
                      {i < STEPS.length - 1 && (
                        <div className="w-6 h-px mx-1" style={{ background: i < step ? '#10B981' : '#1A2A45' }} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {step === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        label="Notification Source"
                        value={formData.source}
                        onChange={update('source')}
                        options={[
                          { value: 'direct', label: 'Direct Client Walk-In' },
                          { value: 'broker', label: 'Broker Submission' },
                          { value: 'portal', label: 'Online Portal' },
                          { value: 'renewal', label: 'Renewal Notification' },
                          { value: 'referral', label: 'Referral' },
                        ]}
                      />
                      <Select
                        label="Vehicle Class"
                        value={formData.vehicleClass}
                        onChange={update('vehicleClass')}
                        options={[
                          { value: 'private', label: 'Private Motor' },
                          { value: 'commercial', label: 'Commercial Vehicle' },
                          { value: 'psv', label: 'Public Service Vehicle (PSV)' },
                          { value: 'special', label: 'Special Vehicle' },
                          { value: 'motorcycle', label: 'Motorcycle' },
                        ]}
                      />
                      <Input label="Insured Name / Company" placeholder="Full legal name" value={formData.insuredName} onChange={update('insuredName')} />
                      <Input label="ID Number / Registration" placeholder="National ID or Reg number" value={formData.idNumber} onChange={update('idNumber')} monospace />
                      <Input label="Phone Number" placeholder="+263 7X XXX XXXX" value={formData.phone} onChange={update('phone')} />
                      <Input label="Email Address" placeholder="insured@example.co.zw" value={formData.email} onChange={update('email')} />
                    </div>
                    {formData.source === 'broker' && (
                      <Input label="Broker Name / Code" placeholder="e.g. Marsh Zimbabwe — BRK-0042" value={formData.broker} onChange={update('broker')} />
                    )}
                    <Select
                      label="Cover Type"
                      value={formData.coverType}
                      onChange={update('coverType')}
                      options={[
                        { value: 'comprehensive', label: 'Comprehensive' },
                        { value: 'tponly', label: 'Third Party Only' },
                        { value: 'tpfire', label: 'Third Party, Fire & Theft' },
                      ]}
                    />
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <Input label="Vehicle Registration" placeholder="e.g. AAA 1234" value={formData.vehicleReg} onChange={update('vehicleReg')} monospace />
                      <Input label="Make" placeholder="e.g. Toyota" value={formData.make} onChange={update('make')} />
                      <Input label="Model" placeholder="e.g. Hilux 2.4 GD" value={formData.model} onChange={update('model')} />
                      <Input label="Year of Manufacture" placeholder="2022" value={formData.year} onChange={update('year')} type="number" />
                      <Input label="Engine CC" placeholder="2400" value={formData.engineCC} onChange={update('engineCC')} monospace />
                      <Input label="Colour" placeholder="White" value={formData.colour} onChange={update('colour')} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Sum Insured (USD)" placeholder="45,000" value={formData.sumInsured} onChange={update('sumInsured')} monospace />
                      <Select
                        label="Primary Use"
                        value={formData.usage}
                        onChange={update('usage')}
                        options={[
                          { value: 'private', label: 'Private/Personal Use' },
                          { value: 'business', label: 'Business Use' },
                          { value: 'hire', label: 'Hire / Commercial' },
                          { value: 'agricultural', label: 'Agricultural' },
                        ]}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div
                      className="flex items-start gap-3 p-4 rounded-lg"
                      style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" className="mt-0.5 shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <div>
                        <div className="text-[#10B981] text-xs font-mono font-medium">KYC CHECK PASSED</div>
                        <div className="text-[#4A6080] text-xs mt-0.5">Insured identity verified against national register. No sanctions matches found.</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Previous Losses (5yr)', value: '1 claim — 2022, Own Damage', ok: true },
                        { label: 'NCD Standing', value: '20% — 3 years claim free', ok: true },
                        { label: 'High Risk Indicators', value: 'None detected', ok: true },
                        { label: 'Regulatory Compliance', value: 'All documents in order', ok: true },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg"
                          style={{ background: 'rgba(8,12,20,0.8)', border: '1px solid #1A2A45' }}
                        >
                          <div className="text-[9px] font-mono tracking-widest uppercase text-[#4A6080] mb-1">{item.label}</div>
                          <div className="text-[12px] text-[#CBD5E1]">{item.value}</div>
                        </div>
                      ))}
                    </div>
                    <Input label="Underwriter Notes" placeholder="Add any risk observations..." />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div
                      className="p-5 rounded-lg"
                      style={{ background: 'rgba(14,165,233,0.03)', border: '1px solid rgba(14,165,233,0.15)' }}
                    >
                      <div className="text-[10px] font-mono tracking-widest uppercase text-[#4A6080] mb-3">Notification Summary</div>
                      <div className="grid grid-cols-2 gap-y-2 text-sm">
                        {[
                          ['Reference', 'NTF-2026-0092'],
                          ['Source', formData.source.charAt(0).toUpperCase() + formData.source.slice(1)],
                          ['Insured', formData.insuredName || '—'],
                          ['Vehicle', formData.vehicleReg || '—'],
                          ['Cover', formData.coverType],
                          ['Sum Insured', formData.sumInsured ? `USD ${formData.sumInsured}` : '—'],
                        ].map(([k, v]) => (
                          <React.Fragment key={k}>
                            <span className="text-[#4A6080]">{k}</span>
                            <span className="text-[#CBD5E1] font-mono">{v}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <p className="text-[#4A6080] text-sm">
                      Converting to quotation will assign a QTN reference and open the rating screen. The notification status will update to <span style={{ color: '#10B981' }}>Quoted</span>.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-[#1A2A45] flex items-center justify-between">
                <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} small>
                  ← Back
                </Button>
                <div className="flex gap-3">
                  <Button variant="secondary" small onClick={() => setShowForm(false)}>Save Draft</Button>
                  {step < STEPS.length - 1 ? (
                    <Button variant="primary" small onClick={() => setStep(step + 1)}>
                      Continue →
                    </Button>
                  ) : (
                    <Button variant="primary" small>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      Convert to Quotation
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
