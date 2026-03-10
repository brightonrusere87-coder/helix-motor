import React, { useState } from 'react'
import { PageHeader, Badge, Button } from '../components/UI'

const POLICIES = [
  { ref: 'POL-2026-0382', insured: 'Mutasa Logistics', class: 'Commercial', inception: '01 Feb 2026', expiry: '31 Jan 2027', premium: '8,800', status: 'active' },
  { ref: 'POL-2026-0381', insured: 'R. Dube', class: 'Private', inception: '15 Jan 2026', expiry: '14 Jan 2027', premium: '1,890', status: 'active' },
  { ref: 'POL-2026-0380', insured: 'Harare City Council', class: 'Fleet', inception: '01 Jan 2026', expiry: '31 Dec 2026', premium: '48,200', status: 'active' },
  { ref: 'POL-2026-0379', insured: 'T. Ncube', class: 'Private', inception: '10 Jan 2026', expiry: '09 Jan 2027', premium: '1,560', status: 'active' },
  { ref: 'POL-2025-0341', insured: 'Sun Safaris Ltd', class: 'Fleet', inception: '01 Mar 2025', expiry: '28 Feb 2026', premium: '22,400', status: 'danger' },
]

const DOCUMENTS = [
  { code: 'CN', name: 'Cover Note', description: 'Temporary proof of insurance', icon: '📄' },
  { code: 'CERT', name: 'Motor Certificate', description: 'Statutory windscreen disc', icon: '🪪' },
  { code: 'SCHED', name: 'Policy Schedule', description: 'Full terms and conditions', icon: '📋' },
  { code: 'DN', name: 'Debit Note', description: 'Premium invoice', icon: '💰' },
  { code: 'RI-SLIP', name: 'RI Slip', description: 'Reinsurance placement slip', icon: '🌐' },
  { code: 'WORDING', name: 'Policy Wording', description: 'Standard wording document', icon: '📑' },
  { code: 'RENEWAL', name: 'Renewal Notice', description: 'Pre-expiry renewal alert', icon: '🔄' },
  { code: 'ENDORSE', name: 'Endorsement', description: 'Mid-term amendment', icon: '✏️' },
]

function PolicyCard({ policy, isSelected, onClick }) {
  const daysToExpiry = Math.floor((new Date(policy.expiry) - new Date()) / 86400000)
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer transition-all ${isSelected ? 'border-[#0EA5E9]' : 'border-[#1A2A45] hover:border-[#2A3A50]'}`}
      style={{
        background: isSelected ? 'rgba(14,165,233,0.05)' : 'rgba(8,12,20,0.5)',
        border: `1px solid ${isSelected ? 'rgba(14,165,233,0.3)' : '#1A2A45'}`,
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-[11px] font-mono text-[#0EA5E9]">{policy.ref}</span>
        <Badge label={policy.status} type={policy.status} />
      </div>
      <div className="text-[13px] text-white font-medium mb-1">{policy.insured}</div>
      <div className="text-[11px] text-[#4A6080] mb-2">{policy.class} · {policy.inception} – {policy.expiry}</div>
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-mono text-[#CBD5E1]">USD {policy.premium}</span>
        <span
          className="text-[10px] font-mono"
          style={{ color: daysToExpiry < 30 ? '#EF4444' : daysToExpiry < 60 ? '#F59E0B' : '#4A6080' }}
        >
          {daysToExpiry < 0 ? 'EXPIRED' : `${daysToExpiry}d left`}
        </span>
      </div>
    </div>
  )
}

export default function PolicyIssuance() {
  const [selected, setSelected] = useState(POLICIES[0])
  const [printed, setPrinted] = useState(new Set())

  const markPrinted = (code) => {
    setPrinted(p => new Set([...p, code]))
  }

  return (
    <div className="p-8">
      <PageHeader
        badge="Module: POL"
        title="POLICY ISSUANCE"
        subtitle="Manage policy lifecycle, document generation, and endorsements"
        actions={
          <div className="flex gap-3">
            <Button variant="ghost" small>Endorsement</Button>
            <Button variant="ghost" small>Cancellation</Button>
            <Button variant="primary" small>Issue Policy</Button>
          </div>
        }
      />

      <div className="grid grid-cols-5 gap-5">
        {/* Policy list */}
        <div className="col-span-2 space-y-3">
          {POLICIES.map((p, i) => (
            <PolicyCard
              key={i}
              policy={p}
              isSelected={selected?.ref === p.ref}
              onClick={() => { setSelected(p); setPrinted(new Set()) }}
            />
          ))}
        </div>

        {/* Policy detail */}
        <div className="col-span-3 space-y-4">
          {selected && (
            <>
              {/* Policy header */}
              <div
                className="rounded-lg p-5"
                style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid #1A2A45' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-display text-2xl text-white tracking-wider">{selected.insured}</div>
                    <div className="text-[#4A6080] text-sm mt-0.5">{selected.class} Motor Insurance</div>
                  </div>
                  <Badge label={selected.status} type={selected.status} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Policy No', value: selected.ref, mono: true, color: '#0EA5E9' },
                    { label: 'Inception', value: selected.inception, mono: true },
                    { label: 'Expiry', value: selected.expiry, mono: true },
                    { label: 'Annual Premium', value: `USD ${selected.premium}`, mono: true },
                    { label: 'Class', value: selected.class },
                    { label: 'Assigned To', value: 'K. Mutasa' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="text-[9px] font-mono tracking-widest uppercase text-[#4A6080] mb-1">{item.label}</div>
                      <div
                        className={`text-[13px] ${item.mono ? 'font-mono' : ''}`}
                        style={{ color: item.color || '#CBD5E1' }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document generation */}
              <div
                className="rounded-lg overflow-hidden"
                style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid #1A2A45' }}
              >
                <div className="px-5 py-3.5 border-b border-[#1A2A45] flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#4A6080]">Document Generation</span>
                  <Button variant="ghost" small>Generate All</Button>
                </div>
                <div className="p-4 grid grid-cols-2 gap-3">
                  {DOCUMENTS.map((doc) => {
                    const isPrinted = printed.has(doc.code)
                    return (
                      <div
                        key={doc.code}
                        className="flex items-center justify-between p-3 rounded-lg transition-all"
                        style={{
                          background: isPrinted ? 'rgba(16,185,129,0.05)' : 'rgba(8,12,20,0.5)',
                          border: `1px solid ${isPrinted ? 'rgba(16,185,129,0.2)' : '#1A2A45'}`,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{doc.icon}</span>
                          <div>
                            <div className={`text-[12px] font-medium ${isPrinted ? 'text-[#10B981]' : 'text-[#CBD5E1]'}`}>
                              {doc.name}
                            </div>
                            <div className="text-[10px] text-[#4A6080]">{doc.description}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => markPrinted(doc.code)}
                          className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wide transition-all ${
                            isPrinted
                              ? 'text-[#10B981]'
                              : 'text-[#0EA5E9] hover:bg-[#0EA5E9] hover:bg-opacity-10'
                          }`}
                          style={{
                            border: `1px solid ${isPrinted ? 'rgba(16,185,129,0.3)' : 'rgba(14,165,233,0.3)'}`,
                          }}
                        >
                          {isPrinted ? '✓ DONE' : 'GENERATE'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Three-party acceptance */}
              <div
                className="rounded-lg overflow-hidden"
                style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid #1A2A45' }}
              >
                <div className="px-5 py-3.5 border-b border-[#1A2A45]">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#4A6080]">Three-Party Acceptance Status</span>
                </div>
                <div className="p-5 grid grid-cols-3 gap-4">
                  {[
                    { party: 'Insured', name: 'R. Dube', date: '15 Jan 2026', status: 'Accepted', color: '#10B981' },
                    { party: 'Insurer', name: 'ZB Life Assurance', date: '14 Jan 2026', status: 'Accepted', color: '#10B981' },
                    { party: 'Reinsurer', name: 'Africa Re', date: '16 Jan 2026', status: 'Accepted', color: '#10B981' },
                  ].map((p, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg text-center"
                      style={{
                        background: `rgba(${p.color === '#10B981' ? '16,185,129' : '245,158,11'},0.05)`,
                        border: `1px solid rgba(${p.color === '#10B981' ? '16,185,129' : '245,158,11'},0.15)`,
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                        style={{ background: `rgba(${p.color === '#10B981' ? '16,185,129' : '245,158,11'},0.1)` }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <div className="text-[9px] font-mono tracking-widest uppercase text-[#4A6080] mb-1">{p.party}</div>
                      <div className="text-[12px] text-[#CBD5E1] font-medium">{p.name}</div>
                      <div className="text-[10px] font-mono mt-1" style={{ color: p.color }}>{p.status}</div>
                      <div className="text-[9px] text-[#4A6080] mt-0.5">{p.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
