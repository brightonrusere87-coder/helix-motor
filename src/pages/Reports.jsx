import React, { useState, useRef } from 'react'
import {
  BarChart3, Download, Calendar, TrendingUp, TrendingDown,
  Printer, X, CheckCircle, FileText, Filter, ChevronDown,
  Eye, RefreshCw, AlertCircle
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts'

// ─── Data ────────────────────────────────────────────────────────────────────
const lossRatioData = [
  { month: 'Aug', ratio: 42.9 }, { month: 'Sep', ratio: 55.3 }, { month: 'Oct', ratio: 32.4 },
  { month: 'Nov', ratio: 40.4 }, { month: 'Dec', ratio: 39.3 }, { month: 'Jan', ratio: 31.5 },
  { month: 'Feb', ratio: 35.3 }
]

const premiumData = [
  { month: 'Aug', written: 420, earned: 390, claims: 180 },
  { month: 'Sep', written: 380, earned: 360, claims: 210 },
  { month: 'Oct', written: 510, earned: 480, claims: 165 },
  { month: 'Nov', written: 470, earned: 450, claims: 190 },
  { month: 'Dec', written: 560, earned: 530, claims: 220 },
  { month: 'Jan', written: 620, earned: 590, claims: 195 },
  { month: 'Feb', written: 680, earned: 640, claims: 240 },
]

const cessionData = [
  { month: 'Aug', ceded: 120, retained: 180 }, { month: 'Sep', ceded: 95, retained: 145 },
  { month: 'Oct', ceded: 160, retained: 240 }, { month: 'Nov', ceded: 140, retained: 210 },
  { month: 'Dec', ceded: 175, retained: 262 }, { month: 'Jan', ceded: 200, retained: 300 },
  { month: 'Feb', ceded: 215, retained: 322 },
]

const coverMix = [
  { name: 'Comprehensive', value: 48, color: '#3d5eff' },
  { name: 'Third Party', value: 29, color: '#6b8eff' },
  { name: 'TPFT', value: 15, color: '#1e3aff' },
  { name: 'Fleet', value: 8, color: '#9bb5ff' },
]

// Detailed report content for each report type
const REPORT_TEMPLATES = {
  'Monthly Premium Register': {
    subtitle: 'Premium Register — February 2026',
    type: 'PDF',
    sections: [
      {
        title: 'Premium Summary',
        table: {
          headers: ['Policy No.', 'Insured', 'Class', 'Cover Type', 'Inception', 'Expiry', 'Sum Insured', 'Gross Premium', 'Status'],
          rows: [
            ['HLX-POL-004521', 'Mrs. R. Moyo', 'Private', 'Comprehensive', '15-Jan-26', '14-Jan-27', 'USD 18,000', 'USD 1,240', 'Active'],
            ['HLX-POL-004520', 'Econet Wireless Zim', 'Fleet', 'Comprehensive', '01-Jan-26', '31-Dec-26', 'USD 1,200,000', 'USD 42,800', 'Active'],
            ['HLX-POL-004519', 'Mr. T. Moyo', 'Private', 'TPFT', '01-Feb-26', '31-Jan-27', 'USD 12,000', 'USD 680', 'Active'],
            ['HLX-POL-004518', 'Harare City Council', 'PSV', 'Third Party', '01-Dec-25', '30-Nov-26', 'N/A', 'USD 8,400', 'Active'],
            ['HLX-POL-004517', 'Mr. R. Chimhanda', 'Private', 'Comprehensive', '01-Sep-25', '31-Aug-26', 'USD 32,000', 'USD 2,400', 'Active'],
            ['HLX-POL-004516', 'Delta Beverages Ltd', 'Commercial', 'Comprehensive', '15-Feb-26', '14-Feb-27', 'USD 4,800,000', 'USD 98,400', 'Active'],
          ]
        }
      },
      {
        title: 'Monthly Totals',
        table: {
          headers: ['Category', 'Policies', 'Sum Insured', 'Gross Premium', 'Net Premium'],
          rows: [
            ['Private Motor', '812', 'USD 14,620,000', 'USD 48,240', 'USD 44,100'],
            ['Fleet', '42', 'USD 84,000,000', 'USD 142,800', 'USD 130,560'],
            ['Commercial', '198', 'USD 32,400,000', 'USD 58,320', 'USD 53,340'],
            ['PSV', '195', 'N/A', 'USD 35,100', 'USD 32,130'],
            ['TOTAL', '1,247', 'USD 131,020,000', 'USD 284,460', 'USD 260,130'],
          ]
        }
      }
    ],
    kpis: [
      { label: 'Total Policies', value: '1,247' },
      { label: 'Gross Written Premium', value: 'USD 284,460' },
      { label: 'Net Premium', value: 'USD 260,130' },
      { label: 'New Policies (Feb)', value: '84' },
    ]
  },
  'Claims Paid Statement': {
    subtitle: 'Claims Paid Statement — February 2026',
    type: 'XLSX',
    sections: [
      {
        title: 'Claims Register',
        table: {
          headers: ['Claim No.', 'Policy No.', 'Insured', 'Type', 'Date of Loss', 'Reserve', 'Paid', 'Status'],
          rows: [
            ['CLM-2026-00289', 'HLX-POL-004521', 'Mrs. R. Moyo', 'Own Damage', '18-Feb-26', 'USD 4,200', '—', 'Processing'],
            ['CLM-2026-00288', 'HLX-POL-003847', 'Econet Wireless Zim', 'Third Party', '16-Feb-26', 'USD 18,500', '—', 'Assessment'],
            ['CLM-2026-00287', 'HLX-POL-005102', 'Mr. F. Chikwanda', 'Theft', '14-Feb-26', 'USD 9,800', 'USD 9,800', 'Settled'],
            ['CLM-2026-00286', 'HLX-POL-002391', 'Delta Beverages Ltd', 'Own Damage', '12-Feb-26', 'USD 32,000', 'USD 32,000', 'Settled'],
            ['CLM-2026-00285', 'HLX-POL-004820', 'Mrs. Sithole', 'Third Party', '10-Feb-26', 'USD 2,100', '—', 'Declined'],
          ]
        }
      },
      {
        title: 'Claims Summary by Type',
        table: {
          headers: ['Claim Type', 'No. of Claims', 'Total Reserved', 'Total Paid', 'Outstanding'],
          rows: [
            ['Own Damage', '34', 'USD 186,400', 'USD 142,800', 'USD 43,600'],
            ['Third Party', '28', 'USD 224,000', 'USD 168,000', 'USD 56,000'],
            ['Theft', '12', 'USD 96,000', 'USD 72,000', 'USD 24,000'],
            ['Fire & Explosion', '4', 'USD 48,000', 'USD 36,000', 'USD 12,000'],
            ['TOTAL', '83', 'USD 554,400', 'USD 418,800', 'USD 135,600'],
          ]
        }
      }
    ],
    kpis: [
      { label: 'Open Claims', value: '83' },
      { label: 'Total Reserved', value: 'USD 554,400' },
      { label: 'Total Paid (YTD)', value: 'USD 418,800' },
      { label: 'Loss Ratio', value: '38.2%' },
    ]
  },
  'Reinsurance Cession Summary Q1': {
    subtitle: 'Reinsurance Cession Summary — Q1 2026',
    type: 'PDF',
    sections: [
      {
        title: 'Treaty Cession Statement',
        table: {
          headers: ['Treaty', 'Reinsurer', 'Type', 'Ceding %', 'Premium Ceded', 'Claims Recovered', 'Balance'],
          rows: [
            ['TRY-2026-Q1', 'Munich Re', 'Quota Share', '40%', 'USD 284,000', 'USD 98,000', 'USD 186,000'],
            ['TRY-2026-Q2', 'Swiss Re', 'Excess of Loss', '80%', 'USD 42,000', 'USD 0', 'USD 42,000'],
            ['FAC-2026-001', 'Hannover Re', 'Facultative', '60%', 'USD 25,680', 'USD 4,200', 'USD 21,480'],
            ['TOTAL', '—', '—', '—', 'USD 351,680', 'USD 102,200', 'USD 249,480'],
          ]
        }
      },
      {
        title: 'Facultative Placements',
        table: {
          headers: ['Risk Ref', 'Insured', 'Sum Insured', 'Reinsurer', 'Ceding %', 'Slip No.', 'Status'],
          rows: [
            ['PLC-2026-00089', 'Econet Wireless Zim', 'USD 1,200,000', 'Munich Re', '40%', 'MR-2026-SLP-0221', 'Accepted'],
            ['PLC-2026-00088', 'Delta Beverages Ltd', 'USD 4,800,000', 'Swiss Re', '60%', 'SR-2026-SLP-0189', 'Accepted'],
          ]
        }
      }
    ],
    kpis: [
      { label: 'Total Premium Ceded', value: 'USD 351,680' },
      { label: 'Claims Recovered', value: 'USD 102,200' },
      { label: 'Net Cession Balance', value: 'USD 249,480' },
      { label: 'Cession Ratio', value: '32.4%' },
    ]
  },
  'Regulatory Submission — IPEC': {
    subtitle: 'IPEC Regulatory Submission — February 2026',
    type: 'PDF',
    sections: [
      {
        title: 'Statutory Returns Summary',
        table: {
          headers: ['Return Type', 'Period', 'Gross Premium', 'Net Premium', 'Claims', 'Submission Date', 'Status'],
          rows: [
            ['Motor Premium Return', 'Feb 2026', 'USD 284,460', 'USD 260,130', 'USD 108,720', '20-Feb-26', 'Submitted'],
            ['Claims Return', 'Feb 2026', 'N/A', 'N/A', 'USD 108,720', '20-Feb-26', 'Submitted'],
            ['Solvency Return', 'Q4 2025', 'N/A', 'N/A', 'N/A', '31-Jan-26', 'Submitted'],
          ]
        }
      },
      {
        title: 'Minimum Capital Requirement',
        table: {
          headers: ['Requirement', 'Threshold', 'Current Position', 'Surplus / (Deficit)', 'Compliant'],
          rows: [
            ['Minimum Capital', 'USD 2,000,000', 'USD 8,400,000', 'USD 6,400,000', '✓ Yes'],
            ['Solvency Margin', '20% of NPE', 'USD 640,000', 'USD 588,000', '✓ Yes'],
            ['Premium Reserve', '40% of UPR', 'USD 420,000', 'USD 380,000', '✓ Yes'],
          ]
        }
      }
    ],
    kpis: [
      { label: 'Submission Status', value: 'Compliant' },
      { label: 'Capital Adequacy', value: '420%' },
      { label: 'Solvency Margin', value: '24.6%' },
      { label: 'Returns Filed', value: '3 / 3' },
    ]
  },
  'Fleet Policy Performance Analysis': {
    subtitle: 'Fleet Policy Performance Analysis — YTD 2026',
    type: 'XLSX',
    sections: [
      {
        title: 'Fleet Portfolio Summary',
        table: {
          headers: ['Fleet Policy', 'Insured', 'Vehicles', 'Premium', 'Claims', 'Loss Ratio', 'NCD', 'Renewal Date'],
          rows: [
            ['HLX-POL-004520', 'Econet Wireless Zim', '28', 'USD 42,800', 'USD 8,400', '19.6%', '20%', '31-Dec-26'],
            ['HLX-POL-003210', 'Delta Beverages Ltd', '52', 'USD 98,400', 'USD 32,000', '32.5%', '10%', '14-Feb-27'],
            ['HLX-POL-002841', 'Harare City Council', '14', 'USD 8,400', 'USD 4,200', '50.0%', '10%', '30-Nov-26'],
            ['HLX-POL-003991', 'CBZ Holdings', '8', 'USD 12,000', 'USD 2,400', '20.0%', '30%', '10-Mar-27'],
            ['HLX-POL-002112', 'Innscor Africa Ltd', '34', 'USD 24,480', 'USD 9,840', '40.2%', '15%', '01-Apr-26'],
          ]
        }
      }
    ],
    kpis: [
      { label: 'Fleet Policies', value: '42' },
      { label: 'Total Vehicles', value: '136' },
      { label: 'Fleet Premium', value: 'USD 186,080' },
      { label: 'Fleet Loss Ratio', value: '28.4%' },
    ]
  },
  'NCD Position Report': {
    subtitle: 'No-Claim Discount Position Report — February 2026',
    type: 'PDF',
    sections: [
      {
        title: 'NCD Distribution',
        table: {
          headers: ['NCD Level', 'No. of Policies', '% of Portfolio', 'Avg Premium', 'Total Premium'],
          rows: [
            ['0% (No NCD)', '312', '25.0%', 'USD 1,840', 'USD 574,080'],
            ['10% NCD', '186', '14.9%', 'USD 1,640', 'USD 304,960'],
            ['15% NCD', '148', '11.9%', 'USD 1,560', 'USD 230,880'],
            ['20% NCD', '224', '18.0%', 'USD 1,480', 'USD 331,520'],
            ['25% NCD', '168', '13.5%', 'USD 1,380', 'USD 231,840'],
            ['30% NCD', '142', '11.4%', 'USD 1,288', 'USD 182,896'],
            ['40%+ NCD', '67', '5.4%', 'USD 1,104', 'USD 73,968'],
            ['TOTAL', '1,247', '100%', 'USD 1,552', 'USD 1,930,144'],
          ]
        }
      }
    ],
    kpis: [
      { label: 'Avg NCD Discount', value: '18.4%' },
      { label: 'Premium at Risk (NCD)', value: 'USD 354,747' },
      { label: 'Policies with NCD', value: '935 (75%)' },
      { label: 'NCD Clawbacks (YTD)', value: '12' },
    ]
  },
}

const REPORT_LIST = [
  { name: 'Monthly Premium Register', type: 'PDF', size: '142 KB', date: 'Feb 20, 2026', category: 'Premium' },
  { name: 'Claims Paid Statement', type: 'XLSX', size: '84 KB', date: 'Feb 20, 2026', category: 'Claims' },
  { name: 'Reinsurance Cession Summary Q1', type: 'PDF', size: '218 KB', date: 'Feb 15, 2026', category: 'Reinsurance' },
  { name: 'Regulatory Submission — IPEC', type: 'PDF', size: '1.2 MB', date: 'Feb 10, 2026', category: 'Regulatory' },
  { name: 'Fleet Policy Performance Analysis', type: 'XLSX', size: '332 KB', date: 'Feb 05, 2026', category: 'Portfolio' },
  { name: 'NCD Position Report', type: 'PDF', size: '96 KB', date: 'Feb 01, 2026', category: 'Portfolio' },
]

const GENERATE_TYPES = [
  { id: 'premium', label: 'Premium Register', icon: '💰', desc: 'Monthly GWP, policies in force, UPR' },
  { id: 'claims', label: 'Claims Statement', icon: '🚗', desc: 'Claims paid, outstanding, loss ratio' },
  { id: 'reinsurance', label: 'Reinsurance Cession', icon: '🛡', desc: 'Treaty cession, facultative placements' },
  { id: 'regulatory', label: 'IPEC Regulatory Return', icon: '📋', desc: 'Statutory submissions and compliance' },
  { id: 'fleet', label: 'Fleet Performance', icon: '🚐', desc: 'Fleet policy analysis and loss ratios' },
  { id: 'ncd', label: 'NCD Position', icon: '📊', desc: 'No-claim discount distribution' },
]

// ─── Print helper ─────────────────────────────────────────────────────────────
function triggerPrint(reportName, template) {
  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${template.subtitle}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; padding: 32px; font-size: 12px; }
        .header { border-bottom: 3px solid #1e3aff; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
        .header-left h1 { font-size: 22px; font-weight: 700; color: #0f172a; }
        .header-left p { color: #64748b; font-size: 11px; margin-top: 4px; }
        .header-right { text-align: right; font-size: 10px; color: #94a3b8; line-height: 1.6; }
        .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
        .kpi { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; }
        .kpi-value { font-size: 18px; font-weight: 700; color: #1e3aff; }
        .kpi-label { font-size: 10px; color: #64748b; margin-top: 2px; }
        .section { margin-bottom: 24px; }
        .section-title { font-size: 13px; font-weight: 600; color: #1e293b; border-left: 3px solid #1e3aff; padding-left: 8px; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; font-size: 10.5px; }
        th { background: #1e3aff; color: white; padding: 7px 10px; text-align: left; font-weight: 600; font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; }
        td { padding: 7px 10px; border-bottom: 1px solid #e2e8f0; color: #334155; }
        tr:nth-child(even) td { background: #f8fafc; }
        tr:last-child td { font-weight: 600; color: #0f172a; background: #f1f5f9; }
        .footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="header-left">
          <h1>HELIX Motor Insurance System</h1>
          <p>${template.subtitle}</p>
        </div>
        <div class="header-right">
          <div>Generated: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          <div>Time: ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</div>
          <div>Classification: Internal</div>
        </div>
      </div>

      <div class="kpis">
        ${template.kpis.map(k => `
          <div class="kpi">
            <div class="kpi-value">${k.value}</div>
            <div class="kpi-label">${k.label}</div>
          </div>
        `).join('')}
      </div>

      ${template.sections.map(section => `
        <div class="section">
          <div class="section-title">${section.title}</div>
          <table>
            <thead>
              <tr>${section.table.headers.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${section.table.rows.map(row => `
                <tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `).join('')}

      <div class="footer">
        <span>HELIX Motor Insurance & Reinsurance System — Confidential</span>
        <span>Report: ${reportName}</span>
      </div>
    </body>
    </html>
  `
  const printWindow = window.open('', '_blank', 'width=900,height=700')
  printWindow.document.write(printContent)
  printWindow.document.close()
  printWindow.focus()
  setTimeout(() => {
    printWindow.print()
  }, 500)
}

// ─── Generate Report Modal ────────────────────────────────────────────────────
function GenerateModal({ onClose, onGenerate }) {
  const [selected, setSelected] = useState(null)
  const [period, setPeriod] = useState('February 2026')
  const [format, setFormat] = useState('PDF')
  const [generating, setGenerating] = useState(false)

  const handleGenerate = () => {
    if (!selected) return
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      onGenerate(selected, period, format)
      onClose()
    }, 1400)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="glass rounded-2xl border border-slate-700/50 w-full max-w-2xl mx-4 overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60">
          <div>
            <h2 className="font-semibold text-slate-200">Generate New Report</h2>
            <p className="text-xs text-slate-500 mt-0.5">Select report type, period and output format</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-200 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Report type grid */}
          <div>
            <div className="text-xs font-medium text-slate-400 mb-3">Report Type</div>
            <div className="grid grid-cols-3 gap-2">
              {GENERATE_TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${selected === t.id ? 'border-helix-600/50 bg-helix-600/15' : 'border-slate-700/40 bg-slate-800/20 hover:border-slate-600/60'}`}
                >
                  <div className="text-lg mb-1">{t.icon}</div>
                  <div className={`text-xs font-semibold ${selected === t.id ? 'text-helix-300' : 'text-slate-300'}`}>{t.label}</div>
                  <div className="text-[10px] text-slate-600 mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Period & Format */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Reporting Period</label>
              <select
                value={period}
                onChange={e => setPeriod(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 outline-none focus:border-helix-500/60"
              >
                {['February 2026', 'January 2026', 'December 2025', 'Q1 2026', 'Q4 2025', 'YTD 2026'].map(p => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Output Format</label>
              <div className="flex gap-2">
                {['PDF', 'XLSX'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${format === f ? 'bg-helix-600/20 border-helix-600/40 text-helix-300' : 'border-slate-700/40 text-slate-500 hover:text-slate-300'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800/50 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 text-slate-500 hover:text-slate-300 text-sm transition-colors">Cancel</button>
          <button
            onClick={handleGenerate}
            disabled={!selected || generating}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${selected && !generating ? 'bg-helix-600 hover:bg-helix-500 text-white' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
          >
            {generating ? (
              <><RefreshCw size={14} className="animate-spin" /> Generating...</>
            ) : (
              <><BarChart3 size={14} /> Generate Report</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Report Viewer Modal ──────────────────────────────────────────────────────
function ReportViewer({ report, template, onClose, onPrint }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(2,6,23,0.9)', backdropFilter: 'blur(8px)' }}>
      <div className="glass rounded-2xl border border-slate-700/50 w-full max-w-5xl mx-4 overflow-hidden animate-fade-up flex flex-col" style={{ maxHeight: '90vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${report.type === 'PDF' ? 'bg-rose-600/20 text-rose-400' : 'bg-emerald-600/20 text-emerald-400'}`}>
              {report.type}
            </div>
            <div>
              <h2 className="font-semibold text-slate-200">{report.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{report.date} · {report.size}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPrint(report.name, template)}
              className="flex items-center gap-2 px-4 py-2 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-medium transition-colors glow-blue"
            >
              <Printer size={14} /> Print / Export
            </button>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-200 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {template.kpis.map(kpi => (
              <div key={kpi.label} className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/30">
                <div className="font-mono text-lg font-bold text-helix-300 mb-1">{kpi.value}</div>
                <div className="text-xs text-slate-500">{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* Tables */}
          {template.sections.map((section, si) => (
            <div key={si} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-helix-500 rounded-full" />
                <h3 className="text-sm font-semibold text-slate-200">{section.title}</h3>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-700/40">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-helix-600/15 border-b border-slate-700/40">
                      {section.table.headers.map(h => (
                        <th key={h} className="px-3 py-2.5 text-left text-[10px] font-semibold text-helix-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, ri) => {
                      const isTotal = row[0]?.toString().toUpperCase().includes('TOTAL')
                      return (
                        <tr key={ri} className={`border-b border-slate-800/40 last:border-0 ${isTotal ? 'bg-slate-700/30 font-semibold' : 'hover:bg-slate-800/20'}`}>
                          {row.map((cell, ci) => (
                            <td key={ci} className={`px-3 py-2.5 ${isTotal ? 'text-slate-200' : 'text-slate-400'} whitespace-nowrap`}>{cell}</td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800/50 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-slate-600">HELIX Motor Insurance & Reinsurance — Internal Use Only</span>
          <button
            onClick={() => onPrint(report.name, template)}
            className="flex items-center gap-1.5 text-xs text-helix-400 hover:text-helix-300 transition-colors"
          >
            <Printer size={12} /> Print this report
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Toast notification ───────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  React.useEffect(() => {
    const t = setTimeout(onClose, 3500)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 glass rounded-xl border border-emerald-500/30 bg-emerald-500/10 animate-fade-up shadow-xl">
      <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
      <span className="text-sm text-emerald-300">{message}</span>
      <button onClick={onClose} className="text-emerald-600 hover:text-emerald-400 ml-1">
        <X size={13} />
      </button>
    </div>
  )
}

// ─── Main Reports Component ───────────────────────────────────────────────────
export default function Reports() {
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [viewingReport, setViewingReport] = useState(null)
  const [reportList, setReportList] = useState(REPORT_LIST)
  const [toast, setToast] = useState(null)
  const [filterCat, setFilterCat] = useState('All')
  const [printing, setPrinting] = useState(null)

  const categories = ['All', ...Array.from(new Set(REPORT_LIST.map(r => r.category)))]

  const filtered = reportList.filter(r => filterCat === 'All' || r.category === filterCat)

  const handleView = (report) => {
    const template = REPORT_TEMPLATES[report.name]
    if (template) setViewingReport(report)
  }

  const handlePrint = (reportName, template) => {
    setPrinting(reportName)
    triggerPrint(reportName, template)
    setTimeout(() => {
      setPrinting(null)
      setToast(`Sent "${reportName}" to printer`)
    }, 800)
  }

  const handleDownload = (report) => {
    const template = REPORT_TEMPLATES[report.name]
    if (template) {
      triggerPrint(report.name, template)
      setToast(`"${report.name}" opened for print/save`)
    }
  }

  const handleGenerate = (typeId, period, format) => {
    const typeLabel = GENERATE_TYPES.find(t => t.id === typeId)?.label || typeId
    const newReport = {
      name: `${typeLabel} — ${period}`,
      type: format,
      size: `${Math.floor(Math.random() * 300 + 80)} KB`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: 'Generated',
    }
    setReportList(prev => [newReport, ...prev])
    setToast(`Report "${newReport.name}" generated successfully`)
  }

  const viewingTemplate = viewingReport ? REPORT_TEMPLATES[viewingReport.name] : null

  return (
    <>
      {/* Modals */}
      {showGenerateModal && (
        <GenerateModal
          onClose={() => setShowGenerateModal(false)}
          onGenerate={handleGenerate}
        />
      )}
      {viewingReport && viewingTemplate && (
        <ReportViewer
          report={viewingReport}
          template={viewingTemplate}
          onClose={() => setViewingReport(null)}
          onPrint={handlePrint}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Reports</h1>
            <p className="text-slate-500 text-sm mt-1">Analytics, regulatory reports & performance metrics</p>
          </div>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-helix-600 hover:bg-helix-500 text-white rounded-xl text-sm font-medium transition-colors glow-blue"
          >
            <BarChart3 size={15} /> Generate Report
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Loss Ratio (YTD)', value: '38.2%', trend: 'down', delta: '-4.1pp', note: 'vs prior year' },
            { label: 'Combined Ratio', value: '82.4%', trend: 'down', delta: '-6.2pp', note: 'vs prior year' },
            { label: 'Earned Premium', value: '$2.18M', trend: 'up', delta: '+21.4%', note: 'YTD Feb 2026' },
            { label: 'Claims Incurred', value: '$832K', trend: 'up', delta: '+8.1%', note: 'YTD Feb 2026' },
          ].map(({ label, value, trend, delta, note }) => (
            <div key={label} className="glass-light rounded-2xl p-5">
              <div className="font-display text-2xl font-bold text-white mb-1">{value}</div>
              <div className="text-xs text-slate-500 mb-2">{label}</div>
              <div className={`flex items-center gap-1 text-xs ${trend === 'down' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {trend === 'down' ? <TrendingDown size={11} /> : <TrendingUp size={11} />}
                <span className="font-mono">{delta}</span>
                <span className="text-slate-600 ml-1">{note}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-light rounded-2xl p-5">
            <h3 className="font-semibold text-slate-200 mb-1">Monthly Loss Ratio</h3>
            <p className="text-xs text-slate-500 mb-4">Claims incurred / Earned premium (%)</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lossRatioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} domain={[20, 65]} />
                <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="ratio" stroke="#3d5eff" strokeWidth={2.5} dot={{ fill: '#3d5eff', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-light rounded-2xl p-5">
            <h3 className="font-semibold text-slate-200 mb-1">Premium vs Claims</h3>
            <p className="text-xs text-slate-500 mb-4">Written premium vs claims incurred (USD thousands)</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={premiumData}>
                <defs>
                  <linearGradient id="gW" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3d5eff" stopOpacity={0.2} /><stop offset="95%" stopColor="#3d5eff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.15} /><stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="written" name="Written Premium" stroke="#3d5eff" fill="url(#gW)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="claims" name="Claims" stroke="#f87171" fill="url(#gC)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Report Library */}
        <div className="glass-light rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-200">Report Library</h3>
            <div className="flex gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCat(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filterCat === cat ? 'bg-helix-600/20 text-helix-300 border border-helix-600/30' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            {filtered.map((r, i) => {
              const hasTemplate = !!REPORT_TEMPLATES[r.name]
              const isPrinting = printing === r.name
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2.5 px-3 -mx-1 rounded-xl hover:bg-slate-800/30 transition-colors group cursor-pointer"
                  onClick={() => hasTemplate && handleView(r)}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${r.type === 'PDF' ? 'bg-rose-600/20 text-rose-400' : 'bg-emerald-600/20 text-emerald-400'}`}>
                    {r.type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-300 truncate">{r.name}</div>
                    <div className="text-xs text-slate-600">{r.date} · {r.size}
                      {r.category && <span className="ml-2 px-1.5 py-0.5 rounded bg-slate-800 text-slate-600 text-[10px]">{r.category}</span>}
                    </div>
                  </div>

                  {/* Action buttons — visible on hover */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {hasTemplate && (
                      <button
                        onClick={e => { e.stopPropagation(); handleView(r) }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-colors"
                        title="View report"
                      >
                        <Eye size={12} /> View
                      </button>
                    )}
                    <button
                      onClick={e => { e.stopPropagation(); handleDownload(r) }}
                      disabled={!hasTemplate || isPrinting}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${hasTemplate && !isPrinting ? 'bg-helix-600/20 hover:bg-helix-600/30 text-helix-400 hover:text-helix-300' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
                      title="Print / Export"
                    >
                      {isPrinting ? <RefreshCw size={12} className="animate-spin" /> : <Printer size={12} />}
                      {isPrinting ? 'Printing...' : 'Print'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-8 text-slate-600 text-sm">No reports in this category.</div>
          )}
        </div>
      </div>
    </>
  )
}
