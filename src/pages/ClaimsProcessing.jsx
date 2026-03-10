import React, { useState } from 'react'
import { PageHeader, Badge, Button } from '../components/UI'

const CLAIMS = [
  { ref: 'CLM-2026-0091', policy: 'POL-2026-0382', insured: 'Mutasa Logistics', type: 'Own Damage', dateOfLoss: '17 Feb 2026', reported: '18 Feb 2026', reserve: '8,200', status: 'active', days: 3, cause: 'Collision' },
  { ref: 'CLM-2026-0090', policy: 'POL-2026-0381', insured: 'R. Dube', type: 'Third Party', dateOfLoss: '12 Feb 2026', reported: '13 Feb 2026', reserve: '15,000', status: 'pending', days: 7, cause: 'TP Injury' },
  { ref: 'CLM-2026-0089', policy: 'POL-2026-0378', insured: 'Eastgate PSV', type: 'Theft', dateOfLoss: '08 Feb 2026', reported: '08 Feb 2026', reserve: '45,000', status: 'pending', days: 12, cause: 'Theft' },
  { ref: 'CLM-2026-0088', policy: 'POL-2026-0375', insured: 'T. Ncube', type: 'Own Damage', dateOfLoss: '19 Feb 2026', reported: '20 Feb 2026', reserve: '3,100', status: 'active', days: 1, cause: 'Fire' },
  { ref: 'CLM-2026-0087', policy: 'POL-2026-0361', insured: 'Sun Safaris Ltd', type: 'Own Damage', dateOfLoss: '01 Feb 2026', reported: '03 Feb 2026', reserve: '28,000', status: 'danger', days: 19, cause: 'Flood' },
]

const CLAIM_STEPS = [
  { id: 'notification', label: 'Loss Notification', done: true, date: '18 Feb 2026' },
  { id: 'acknowledge', label: 'Acknowledgement', done: true, date: '18 Feb 2026' },
  { id: 'inspection', label: 'Vehicle Inspection', done: true, date: '19 Feb 2026' },
  { id: 'assessment', label: 'Loss Assessment', done: false, date: null },
  { id: 'settlement', label: 'Settlement Approval', done: false, date: null },
  { id: 'payment', label: 'Payment', done: false, date: null },
]

export default function ClaimsProcessing() {
  const [selected, setSelected] = useState(CLAIMS[0])

  return (
    <div className="p-8">
      <PageHeader
        badge="Module: CLM"
        title="CLAIMS PROCESSING"
        subtitle="Manage motor insurance claims from first notification to final settlement"
        actions={
          <div className="flex gap-3">
            <Button variant="ghost" small>Register FNOL</Button>
            <Button variant="primary" small>New Claim</Button>
          </div>
        }
      />

      <div className="grid grid-cols-5 gap-5">
        {/* Claims list */}
        <div className="col-span-2 space-y-2">
          {CLAIMS.map((c, i) => (
            <div
              key={i}
              onClick={() => setSelected(c)}
              className="p-4 rounded-lg cursor-pointer transition-all"
              style={{
                background: selected?.ref === c.ref ? 'rgba(14,165,233,0.04)' : 'rgba(13,21,38,0.9)',
                border: `1px solid ${selected?.ref === c.ref ? 'rgba(14,165,233,0.3)' : '#1A2A45'}`,
              }}
            >
              <div className="flex items-start justify-between mb-1.5">
                <span className="text-[11px] font-mono text-[#F59E0B]">{c.ref}</span>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: c.days > 14 ? '#EF4444' : c.days > 7 ? '#F59E0B' : '#4A6080' }}
                  >
                    {c.days}d
                  </span>
                  <Badge label={c.status} type={c.status} />
                </div>
              </div>
              <div className="text-[13px] text-white font-medium mb-0.5">{c.insured}</div>
              <div className="flex items-center justify-between">
                <div className="text-[11px] text-[#4A6080]">{c.type} · {c.cause}</div>
                <span className="text-[12px] font-mono text-[#CBD5E1]">USD {c.reserve}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Claim detail */}
        <div className="col-span-3 space-y-4">
          {selected && (
            <>
              {/* Header */}
              <div
                className="rounded-lg p-5"
                style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid #1A2A45' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-display text-2xl text-white tracking-wider">{selected.insured}</div>
                    <div className="text-[#4A6080] text-sm mt-0.5 font-mono">{selected.ref} · {selected.policy}</div>
                  </div>
                  <Badge label={selected.status} type={selected.status} />
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'Type', value: selected.type },
                    { label: 'Cause', value: selected.cause },
                    { label: 'Date of Loss', value: selected.dateOfLoss, mono: true },
                    { label: 'Reserve (USD)', value: selected.reserve, mono: true, color: '#F59E0B' },
                  ].map(item => (
                    <div key={item.label} className="p-3 rounded-lg" style={{ background: 'rgba(8,12,20,0.6)', border: '1px solid #1A2A45' }}>
                      <div className="text-[9px] font-mono tracking-widest uppercase text-[#4A6080] mb-1">{item.label}</div>
                      <div className={`text-[13px] ${item.mono ? 'font-mono' : ''}`} style={{ color: item.color || '#CBD5E1' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Claims workflow */}
              <div
                className="rounded-lg p-5"
                style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid #1A2A45' }}
              >
                <div className="text-[10px] font-mono tracking-widest uppercase text-[#4A6080] mb-4">Claims Workflow</div>
                <div className="relative">
                  {/* Connector line */}
                  <div
                    className="absolute left-3.5 top-3 bottom-3 w-px"
                    style={{ background: 'linear-gradient(to bottom, #10B981, #1A2A45)' }}
                  />
                  <div className="space-y-4">
                    {CLAIM_STEPS.map((step, i) => (
                      <div key={i} className="flex items-start gap-4 relative">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 relative z-10"
                          style={{
                            background: step.done ? '#10B981' : i === CLAIM_STEPS.findIndex(s => !s.done) ? 'rgba(14,165,233,0.2)' : 'rgba(26,42,69,0.5)',
                            border: `2px solid ${step.done ? '#10B981' : i === CLAIM_STEPS.findIndex(s => !s.done) ? '#0EA5E9' : '#1A2A45'}`,
                            boxShadow: step.done ? '0 0 8px rgba(16,185,129,0.3)' : '',
                          }}
                        >
                          {step.done ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                          ) : (
                            <div className={`w-2 h-2 rounded-full ${i === CLAIM_STEPS.findIndex(s => !s.done) ? 'bg-[#0EA5E9]' : 'bg-[#1A2A45]'}`} />
                          )}
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between">
                            <span
                              className="text-[13px] font-medium"
                              style={{ color: step.done ? '#CBD5E1' : i === CLAIM_STEPS.findIndex(s => !s.done) ? '#0EA5E9' : '#4A6080' }}
                            >
                              {step.label}
                            </span>
                            {step.date ? (
                              <span className="text-[10px] font-mono text-[#10B981]">{step.date}</span>
                            ) : i === CLAIM_STEPS.findIndex(s => !s.done) ? (
                              <Button variant="primary" small>Action</Button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reserve & settlement */}
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="rounded-lg p-4"
                  style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid #1A2A45' }}
                >
                  <div className="text-[9px] font-mono tracking-widest uppercase text-[#4A6080] mb-3">Reserve Analysis</div>
                  {[
                    { label: 'Initial Reserve', amount: selected.reserve, color: '#F59E0B' },
                    { label: 'RI Recovery (65%)', amount: (parseFloat(selected.reserve.replace(',','')) * 0.65).toLocaleString('en-US', {minimumFractionDigits:0, maximumFractionDigits:0}), color: '#A78BFA' },
                    { label: 'Net Retention', amount: (parseFloat(selected.reserve.replace(',','')) * 0.35).toLocaleString('en-US', {minimumFractionDigits:0, maximumFractionDigits:0}), color: '#0EA5E9' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-[#1A2A45] border-opacity-40 last:border-0">
                      <span className="text-[11px] text-[#4A6080]">{r.label}</span>
                      <span className="text-[12px] font-mono" style={{ color: r.color }}>USD {r.amount}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-lg p-4"
                  style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid #1A2A45' }}
                >
                  <div className="text-[9px] font-mono tracking-widest uppercase text-[#4A6080] mb-3">Settlement Basis</div>
                  <div className="space-y-2 text-[11px]">
                    {[
                      ['Settlement Type', 'Partial Loss'],
                      ['Basis', 'Cost of Repairs'],
                      ['Excess Applicable', 'USD 500'],
                      ['Depreciation', '5% (2022 vehicle)'],
                      ['Excess Waiver', 'No'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-[#4A6080]">{k}</span>
                        <span className="text-[#CBD5E1] font-mono">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
