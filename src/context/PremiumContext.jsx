import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'

// ─── Initial Premium Ledger ───────────────────────────────────────────────────
// One record per policy / RI arrangement. paymentHistory[] grows with every payment recorded.
const INITIAL_LEDGER = [
  {
    id: 'PRM-2026-00001',
    policyId: 'HLX-POL-004520', placementId: 'PLC-2026-00089',
    type: 'policy',
    insured: 'Econet Wireless Zimbabwe',
    clientId: 'CLT-2026-00001',
    broker: 'AON Zimbabwe', brokerRef: 'AON-2026-4412',
    cover: 'Fleet Comprehensive',
    currency: 'USD',
    inceptionDate: '2026-01-01', expiryDate: '2026-12-31',
    dueDate: '2026-01-31',
    // Gross breakdown
    netPremium: 39200, extPremium: 1560,
    stampDuty: 1222, levy: 407,
    grossPremium: 42800,
    brokerCommission: 6420, brokerCommissionPct: 15,
    // RI
    hasRI: true, reinsurer: 'Munich Re', cedingPct: 40,
    riPremium: 17120, riCommissionPct: 25, riCommission: 4280,
    riNetDue: 12840,
    riPaidDate: '2026-02-16', riSettled: true,
    // Collection
    amountReceived: 42800, balance: 0,
    cedantPaid: 42800, cedantPaidDate: '2026-01-28',
    status: 'paid',
    paymentHistory: [
      { id: 'PAY-001', date: '2026-01-28', amount: 42800, method: 'EFT', ref: 'CBZ-TXN-44521', note: 'Full premium received via EFT', type: 'collection', by: 'J. Mutasa' },
      { id: 'PAY-002', date: '2026-02-16', amount: 12840, method: 'EFT', ref: 'SCB-RI-MR-0221', note: 'RI net premium remitted to Munich Re', type: 'ri_settlement', by: 'Brighton Rusere' },
    ],
    createdDate: '2026-01-01', createdBy: 'J. Mutasa',
    notes: 'Annual fleet policy. Paid in full on inception.',
  },
  {
    id: 'PRM-2026-00002',
    policyId: 'HLX-POL-004521', placementId: '',
    type: 'policy',
    insured: 'Mrs. Rutendo Moyo',
    clientId: 'CLT-2026-00003',
    broker: 'Direct', brokerRef: '',
    cover: 'Comprehensive',
    currency: 'USD',
    inceptionDate: '2026-01-15', expiryDate: '2027-01-14',
    dueDate: '2026-02-14',
    netPremium: 630, extPremium: 180,
    stampDuty: 24.3, levy: 8.1,
    grossPremium: 1240,
    brokerCommission: 0, brokerCommissionPct: 0,
    hasRI: false, reinsurer: '', cedingPct: 0,
    riPremium: 0, riCommissionPct: 0, riCommission: 0,
    riNetDue: 0, riPaidDate: null, riSettled: false,
    amountReceived: 1240, balance: 0,
    cedantPaid: 1240, cedantPaidDate: '2026-01-15',
    status: 'paid',
    paymentHistory: [
      { id: 'PAY-003', date: '2026-01-15', amount: 1240, method: 'Card', ref: 'CARD-TXN-00892', note: 'Online card payment at policy inception', type: 'collection', by: 'T. Banda' },
    ],
    createdDate: '2026-01-10', createdBy: 'T. Banda',
    notes: 'Direct retail client. Card payment online.',
  },
  {
    id: 'PRM-2026-00003',
    policyId: 'HLX-POL-004518', placementId: '',
    type: 'policy',
    insured: 'Harare City Council',
    clientId: 'CLT-2026-00005',
    broker: 'Skybridge-Re', brokerRef: 'SKY-2025-PSV-0044',
    cover: 'Third Party Only',
    currency: 'USD',
    inceptionDate: '2025-12-01', expiryDate: '2026-11-30',
    dueDate: '2025-12-31',
    netPremium: 7700, extPremium: 420,
    stampDuty: 243, levy: 81,
    grossPremium: 8400,
    brokerCommission: 1260, brokerCommissionPct: 15,
    hasRI: false, reinsurer: '', cedingPct: 0,
    riPremium: 0, riCommissionPct: 0, riCommission: 0,
    riNetDue: 0, riPaidDate: null, riSettled: false,
    amountReceived: 5000, balance: 3400,
    cedantPaid: 5000, cedantPaidDate: '2025-12-10',
    status: 'partial',
    paymentHistory: [
      { id: 'PAY-004', date: '2025-12-10', amount: 5000, method: 'EFT', ref: 'HCC-EFT-0012', note: 'Partial payment — PSV fleet budget constraints', type: 'collection', by: 'J. Mutasa' },
    ],
    createdDate: '2025-11-25', createdBy: 'J. Mutasa',
    notes: 'PSV fleet. Balance of USD 3,400 overdue. Follow up with fleet manager.',
  },
  {
    id: 'PRM-2026-00004',
    policyId: 'HLX-POL-004519', placementId: '',
    type: 'policy',
    insured: 'Mr. Tatenda Sibanda',
    clientId: 'CLT-2026-00004',
    broker: 'Direct', brokerRef: '',
    cover: 'Third Party Fire & Theft',
    currency: 'USD',
    inceptionDate: '2026-02-01', expiryDate: '2027-01-31',
    dueDate: '2026-03-03',
    netPremium: 546, extPremium: 0,
    stampDuty: 16.38, levy: 5.46,
    grossPremium: 680,
    brokerCommission: 0, brokerCommissionPct: 0,
    hasRI: false, reinsurer: '', cedingPct: 0,
    riPremium: 0, riCommissionPct: 0, riCommission: 0,
    riNetDue: 0, riPaidDate: null, riSettled: false,
    amountReceived: 0, balance: 680,
    cedantPaid: 0, cedantPaidDate: null,
    status: 'outstanding',
    paymentHistory: [],
    createdDate: '2026-01-28', createdBy: 'M. Dube',
    notes: 'Young driver. Premium payment warranty expires 03 March 2026.',
  },
  {
    id: 'PRM-2026-00005',
    policyId: 'HLX-POL-004521-RI', placementId: 'PLC-2026-00088',
    type: 'reinsurance',
    insured: 'Delta Beverages Ltd',
    clientId: 'CLT-2026-00002',
    broker: 'Marsh Zimbabwe', brokerRef: 'MZW-2026-0088',
    cover: 'Commercial Comprehensive — RI Cession',
    currency: 'USD',
    inceptionDate: '2026-02-12', expiryDate: '2027-02-11',
    dueDate: '2026-03-14',
    netPremium: 59040, extPremium: 0,
    stampDuty: 0, levy: 0,
    grossPremium: 98400,
    brokerCommission: 0, brokerCommissionPct: 0,
    hasRI: true, reinsurer: 'Swiss Re', cedingPct: 60,
    riPremium: 59040, riCommissionPct: 22.5, riCommission: 13284,
    riNetDue: 45756,
    riPaidDate: null, riSettled: false,
    amountReceived: 98400, balance: 0,
    cedantPaid: 98400, cedantPaidDate: '2026-02-12',
    status: 'ri_pending',
    paymentHistory: [
      { id: 'PAY-005', date: '2026-02-12', amount: 98400, method: 'EFT', ref: 'MZW-EFT-0088', note: 'Full gross premium received via Marsh', type: 'collection', by: 'Brighton Rusere' },
    ],
    createdDate: '2026-02-12', createdBy: 'Brighton Rusere',
    notes: 'Gross premium collected. RI net premium of USD 45,756 due to Swiss Re by 14 March 2026.',
  },
  {
    id: 'PRM-2026-00006',
    policyId: '', placementId: 'PLC-2026-00076',
    type: 'reinsurance',
    insured: 'Innscor Africa Ltd',
    clientId: 'CLT-2026-00006',
    broker: 'Riskwise Brokers', brokerRef: 'RWB-2026-0076',
    cover: 'Fleet Comprehensive — RI Cession',
    currency: 'USD',
    inceptionDate: '2026-01-20', expiryDate: '2027-01-19',
    dueDate: '2026-02-20',
    netPremium: 31200, extPremium: 0,
    stampDuty: 0, levy: 0,
    grossPremium: 31200,
    brokerCommission: 4680, brokerCommissionPct: 15,
    hasRI: true, reinsurer: 'Hannover Re', cedingPct: 45,
    riPremium: 14040, riCommissionPct: 25, riCommission: 3510,
    riNetDue: 10530,
    riPaidDate: '2026-02-22', riSettled: true,
    amountReceived: 31200, balance: 0,
    cedantPaid: 31200, cedantPaidDate: '2026-01-22',
    status: 'paid',
    paymentHistory: [
      { id: 'PAY-006', date: '2026-01-22', amount: 31200, method: 'EFT', ref: 'RWB-TXN-0076', note: 'Full premium received via Riskwise Brokers', type: 'collection', by: 'Brighton Rusere' },
      { id: 'PAY-007', date: '2026-02-22', amount: 10530, method: 'EFT', ref: 'SCB-HR-ZW-0076', note: 'RI net premium remitted to Hannover Re', type: 'ri_settlement', by: 'Brighton Rusere' },
    ],
    createdDate: '2026-01-20', createdBy: 'Brighton Rusere',
    notes: 'Fully settled including RI. Clean file.',
  },
]

// ─── Context ──────────────────────────────────────────────────────────────────
const PremiumContext = createContext(null)

export function PremiumProvider({ children }) {
  const [ledger, setLedger] = useState(INITIAL_LEDGER)

  // ── Record a new payment ──────────────────────────────────────────────────
  const recordPayment = useCallback((ledgerId, payment) => {
    setLedger(prev => prev.map(rec => {
      if (rec.id !== ledgerId) return rec
      const newPay = {
        ...payment,
        id: 'PAY-' + String(Date.now()).slice(-6),
        date: payment.date || new Date().toISOString().split('T')[0],
      }
      const newHistory = [...rec.paymentHistory, newPay]

      let newReceived = rec.amountReceived
      let newCedantPaid = rec.cedantPaid
      let riSettled = rec.riSettled
      let riPaidDate = rec.riPaidDate

      if (payment.type === 'collection') {
        newReceived = Math.min(rec.amountReceived + payment.amount, rec.grossPremium)
        newCedantPaid = newReceived
      }
      if (payment.type === 'ri_settlement') {
        riSettled = true
        riPaidDate = payment.date || new Date().toISOString().split('T')[0]
      }

      const newBalance = Math.max(rec.grossPremium - newReceived, 0)
      let newStatus = 'outstanding'
      if (newReceived >= rec.grossPremium) {
        newStatus = rec.hasRI && !riSettled ? 'ri_pending' : 'paid'
      } else if (newReceived > 0) {
        newStatus = 'partial'
      }
      if (riSettled && newReceived >= rec.grossPremium) newStatus = 'paid'

      return {
        ...rec,
        amountReceived: newReceived,
        balance: newBalance,
        cedantPaid: newCedantPaid,
        cedantPaidDate: payment.type === 'collection' ? (payment.date || rec.cedantPaidDate) : rec.cedantPaidDate,
        riSettled,
        riPaidDate,
        status: newStatus,
        paymentHistory: newHistory,
      }
    }))
  }, [])

  // ── Add new ledger entry ──────────────────────────────────────────────────
  const addEntry = useCallback((entry) => {
    const newEntry = {
      ...entry,
      id: 'PRM-2026-' + String(Date.now()).slice(-5),
      amountReceived: 0, balance: entry.grossPremium,
      cedantPaid: 0, cedantPaidDate: null,
      riSettled: false, riPaidDate: null,
      status: 'outstanding',
      paymentHistory: [],
      createdDate: new Date().toISOString().split('T')[0],
    }
    setLedger(prev => [newEntry, ...prev])
  }, [])

  // ── Aggregated stats (computed from ledger) ───────────────────────────────
  const stats = useMemo(() => {
    const policies = ledger.filter(r => r.type === 'policy')
    const ri       = ledger.filter(r => r.type === 'reinsurance')
    const gwp = ledger.reduce((a, r) => a + r.grossPremium, 0)
    const collected = ledger.reduce((a, r) => a + r.amountReceived, 0)
    const outstanding = ledger.reduce((a, r) => a + r.balance, 0)
    const riGross = ri.reduce((a, r) => a + r.riPremium, 0)
    const riSettledAmt = ri.filter(r => r.riSettled).reduce((a, r) => a + r.riNetDue, 0)
    const riPending = ri.filter(r => r.hasRI && !r.riSettled).reduce((a, r) => a + r.riNetDue, 0)
    const totalClaims = 34000 + 8500  // from claims data
    const lossRatio = gwp > 0 ? ((totalClaims / gwp) * 100).toFixed(1) : '0.0'
    const brokerComm = ledger.reduce((a, r) => a + (r.brokerCommission || 0), 0)
    const overdue = ledger.filter(r => r.status !== 'paid' && r.balance > 0 && new Date(r.dueDate) < new Date())

    // Monthly breakdown (last 7 months)
    const months = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setMonth(d.getMonth() - i)
      const label = d.toLocaleDateString('en-GB', { month: 'short' })
      const mPolicies = ledger.filter(r => r.type === 'policy' && r.inceptionDate && new Date(r.inceptionDate).getMonth() === d.getMonth())
      months.push({
        month: label,
        premium: Math.round(mPolicies.reduce((a,r) => a + r.grossPremium, 0) / 1000),
        collected: Math.round(mPolicies.reduce((a,r) => a + r.amountReceived, 0) / 1000),
        ri: Math.round(mPolicies.filter(r=>r.hasRI).reduce((a,r)=>a+r.riPremium,0)/1000),
      })
    }

    return {
      gwp, collected, outstanding, riGross, riSettledAmt, riPending, lossRatio,
      brokerComm, totalPolicies: policies.length, totalRI: ri.length,
      paidCount: ledger.filter(r => r.status === 'paid').length,
      partialCount: ledger.filter(r => r.status === 'partial').length,
      outstandingCount: ledger.filter(r => r.status === 'outstanding').length,
      riPendingCount: ledger.filter(r => r.status === 'ri_pending').length,
      overdueCount: overdue.length,
      overdueAmt: overdue.reduce((a, r) => a + r.balance, 0),
      collectionRate: gwp > 0 ? ((collected / gwp) * 100).toFixed(1) : '0.0',
      monthlyData: months,
    }
  }, [ledger])

  return (
    <PremiumContext.Provider value={{ ledger, recordPayment, addEntry, stats }}>
      {children}
    </PremiumContext.Provider>
  )
}

export function usePremium() {
  const ctx = useContext(PremiumContext)
  if (!ctx) throw new Error('usePremium must be used inside PremiumProvider')
  return ctx
}
