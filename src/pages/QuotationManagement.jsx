import React, { useState } from 'react'
import { PageHeader, Badge, Button, Input, Select } from '../components/UI'

const QUOTES = [
  { ref: 'QTN-2026-0211', insured: 'Chisipiti Holdings', class: 'Fleet', vehicles: 8, sumInsured: '580,000', gwp: '14,200', status: 'pending', exp: '27 Feb 2026' },
  { ref: 'QTN-2026-0210', insured: 'R. Dube', class: 'Private', vehicles: 1, sumInsured: '42,000', gwp: '1,890', status: 'active', exp: '26 Feb 2026' },
  { ref: 'QTN-2026-0209', insured: 'Eastgate PSV Ltd', class: 'PSV', vehicles: 12, sumInsured: '960,000', gwp: '38,400', status: 'pending', exp: '25 Feb 2026' },
  { ref: 'QTN-2026-0208', insured: 'ZimFreight (Pvt)', class: 'Commercial', vehicles: 5, sumInsured: '220,000', gwp: '8,800', status: 'danger', exp: '22 Feb 2026' },
  { ref: 'QTN-2026-0207', insured: 'J. Mazowe', class: 'Private', vehicles: 1, sumInsured: '28,000', gwp: '1,260', status: 'active', exp: '20 Feb 2026' },
]

const NCD_SCHEDULE = [
  { years: '1 Year', discount: '10%' },
  { years: '2 Years', discount: '15%' },
  { years: '3 Years', discount: '20%' },
  { years: '4 Years', discount: '25%' },
  { years: '5+ Years', discount: '30%' },
]

const RATING_COMPONENTS = [
  { component: 'Basic Premium', rate: '3.50%', base: 'Sum Insured', amount: '1,470.00' },
  { component: 'Fire & Theft Loading', rate: '0.25%', base: 'Sum Insured', amount: '105.00' },
  { component: 'Third Party Extension', rate: 'Flat', base: 'Statutory', amount: '85.00' },
  { component: 'Windscreen Extension', rate: 'Flat', base: 'Extension', amount: '50.00' },
  { component: 'NCD Discount (20%)', rate: '-20%', base: 'Basic Premium', amount: '-294.00' },
  { component: 'Excess Buyback', rate: 'Flat', base: 'Optional', amount: '120.00' },
]

export default function QuotationManagement() {
  const [selected, setSelected] = useState(QUOTES[0])
  const [sumInsured, setSumInsured] = useState('42000')
  const [ncdYears, setNcdYears] = useState('3')
  const [coverType, setCoverType] = useState('comprehensive')

  const si = parseFloat(sumInsured.replace(/,/g, '')) || 0
  const basicPremium = si * 0.035
  const ncdPct = [0, 0.1, 0.15, 0.2, 0.25, 0.3][parseInt(ncdYears)] || 0
  const ncdDiscount = basicPremium * ncdPct
  const totalPremium = basicPremium - ncdDiscount + 240

  return (
    <div className="p-8">
      <PageHeader
        badge="Module: QTN"
        title="QUOTATION MANAGEMENT"
        subtitle="Rate, price, and manage motor insurance quotations across all vehicle classes"
        actions={
          <Button variant="primary" small>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Quotation
          </Button>
        }
      />

      <div className="grid grid-cols-5 gap-5">
        {/* Quote list */}
        <div className="col-span-2">
          <div
            className="rounded-lg overflow-hidden"
            style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid #1A2A45' }}
          >
            <div className="px-4 py-3 border-b border-[#1A2A45]">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#4A6080]">Active Quotations</span>
            </div>
            <div className="divide-y divide-[#1A2A45] divide-opacity-50">
              {QUOTES.map((q, i) => (
                <div
                  key={i}
                  onClick={() => setSelected(q)}
                  className={`px-4 py-3.5 cursor-pointer transition-all ${
                    selected?.ref === q.ref
                      ? 'border-l-2 border-[#0EA5E9]'
                      : 'hover:bg-[#0D1526] border-l-2 border-transparent'
                  }`}
                  style={selected?.ref === q.ref ? { background: 'rgba(14,165,233,0.04)' } : {}}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-[11px] font-mono text-[#0EA5E9]">{q.ref}</span>
                    <Badge label={q.status} type={q.status} />
                  </div>
                  <div className="text-[13px] text-[#CBD5E1] font-medium">{q.insured}</div>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-2 text-[10px] text-[#4A6080]">
                      <span>{q.class}</span>
                      <span>·</span>
                      <span>{q.vehicles} vehicle{q.vehicles > 1 ? 's' : ''}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#CBD5E1]">USD {q.gwp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rating engine */}
        <div className="col-span-3 space-y-4">
          {/* Rating inputs */}
          <div
            className="rounded-lg overflow-hidden"
            style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid #1A2A45' }}
          >
            <div className="px-5 py-3.5 border-b border-[#1A2A45] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#4A6080]">Premium Rating Engine</span>
                {selected && (
                  <span className="ml-3 text-[11px] font-mono text-[#0EA5E9]">{selected.ref}</span>
                )}
              </div>
              <Badge label="LIVE CALCULATOR" type="active" />
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Sum Insured (USD)"
                  value={sumInsured}
                  onChange={(e) => setSumInsured(e.target.value)}
                  placeholder="42,000"
                  monospace
                />
                <Select
                  label="Cover Type"
                  value={coverType}
                  onChange={(e) => setCoverType(e.target.value)}
                  options={[
                    { value: 'comprehensive', label: 'Comprehensive' },
                    { value: 'tponly', label: 'Third Party Only' },
                    { value: 'tpfire', label: 'TP Fire & Theft' },
                  ]}
                />
                <Select
                  label="NCD Years"
                  value={ncdYears}
                  onChange={(e) => setNcdYears(e.target.value)}
                  options={[
                    { value: '0', label: '0 — No Discount' },
                    { value: '1', label: '1 Year — 10%' },
                    { value: '2', label: '2 Years — 15%' },
                    { value: '3', label: '3 Years — 20%' },
                    { value: '4', label: '4 Years — 25%' },
                    { value: '5', label: '5+ Years — 30%' },
                  ]}
                />
              </div>

              {/* Rating breakdown table */}
              <div>
                <div className="text-[9px] font-mono tracking-widest uppercase text-[#4A6080] mb-2">Premium Breakdown</div>
                <div
                  className="rounded-lg overflow-hidden"
                  style={{ border: '1px solid #1A2A45' }}
                >
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr style={{ background: 'rgba(8,12,20,0.5)' }}>
                        {['Component', 'Rate', 'Base', 'Amount (USD)'].map(h => (
                          <th key={h} className="text-left px-4 py-2 text-[9px] font-mono tracking-widest uppercase text-[#4A6080]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {RATING_COMPONENTS.map((r, i) => (
                        <tr key={i} className="border-t border-[#1A2A45] border-opacity-50">
                          <td className="px-4 py-2.5 text-[#CBD5E1]">{r.component}</td>
                          <td className="px-4 py-2.5 font-mono" style={{ color: r.rate.startsWith('-') ? '#EF4444' : '#10B981' }}>{r.rate}</td>
                          <td className="px-4 py-2.5 text-[#4A6080]">{r.base}</td>
                          <td className="px-4 py-2.5 font-mono" style={{ color: r.amount.startsWith('-') ? '#EF4444' : '#CBD5E1' }}>{r.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total */}
              <div
                className="flex items-center justify-between p-4 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(14,165,233,0.03))',
                  border: '1px solid rgba(14,165,233,0.2)',
                }}
              >
                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-[#4A6080]">Gross Annual Premium</div>
                  <div className="font-display text-3xl text-white tracking-wider mt-0.5" style={{ textShadow: '0 0 20px rgba(14,165,233,0.3)' }}>
                    USD {totalPremium.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" small>Save Quote</Button>
                  <Button variant="primary" small>
                    Bind Risk
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* NCD Schedule */}
          <div
            className="rounded-lg overflow-hidden"
            style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid #1A2A45' }}
          >
            <div className="px-5 py-3 border-b border-[#1A2A45]">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#4A6080]">NCD Schedule Reference</span>
            </div>
            <div className="p-4 flex gap-3">
              {NCD_SCHEDULE.map((n, i) => (
                <div
                  key={i}
                  className="flex-1 text-center p-3 rounded-lg transition-all"
                  style={{
                    background: parseInt(ncdYears) === i + 1 ? 'rgba(14,165,233,0.1)' : 'rgba(8,12,20,0.5)',
                    border: `1px solid ${parseInt(ncdYears) === i + 1 ? 'rgba(14,165,233,0.3)' : '#1A2A45'}`,
                  }}
                >
                  <div
                    className="font-display text-lg tracking-wider"
                    style={{ color: parseInt(ncdYears) === i + 1 ? '#0EA5E9' : '#CBD5E1' }}
                  >
                    {n.discount}
                  </div>
                  <div className="text-[10px] text-[#4A6080] mt-0.5">{n.years}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
