import React from 'react';
import {
  FileText,
  Printer,
  Download,
  Building2,
  Target,
  ListChecks,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ListTodo,
  Calendar,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import { Badge } from '../common/Badge';

export const PostMeetingSummary: React.FC = () => {
  const { data } = useMeeting();

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvRows: string[] = [];
    csvRows.push(`MEETING SUMMARY REPORT`);
    csvRows.push(`Company,${data.clientInfo.companyName}`);
    csvRows.push(`Project,${data.clientInfo.projectName}`);
    csvRows.push(`Date,${data.clientInfo.meetingDate}`);
    csvRows.push(``);
    csvRows.push(`REQUIREMENTS`);
    data.requirements.forEach(r => csvRows.push(`"${r.reqId}","${r.description.replace(/"/g, '""')}","${r.priority}","${r.status}"`));
    
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `Summary_${data.clientInfo.companyName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formattedBudget = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: data.budget.currency || 'USD',
    maximumFractionDigits: 0
  }).format(data.budget.estimatedBudget || 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Action Bar for PDF / Print */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between no-print">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" /> Executive Meeting Summary Report
          </h2>
          <p className="text-xs text-slate-500">Automatically generated post-meeting alignment briefing</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 shadow-xs"
          >
            <Download className="w-4 h-4 text-slate-500" /> Export CSV
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-600/20"
          >
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Document Body (Print Friendly) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-8 print-card">
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print-header">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">{data.clientInfo.projectName}</h1>
            <p className="text-sm font-semibold text-indigo-600 mt-0.5">{data.clientInfo.companyName}</p>
            <p className="text-xs text-slate-500 mt-1">
              Industry: {data.clientInfo.industry} • Account Mgr: {data.clientInfo.accountManager}
            </p>
          </div>
          <div className="text-left sm:text-right text-xs text-slate-500 space-y-1">
            <p><strong className="text-slate-700">Meeting Date:</strong> {data.clientInfo.meetingDate}</p>
            <p><strong className="text-slate-700">Meeting Type:</strong> {data.clientInfo.meetingType}</p>
            <p><strong className="text-slate-700">Contact:</strong> {data.clientInfo.contactPerson}</p>
          </div>
        </div>

        {/* Section 1: Executive Overview */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
            <Target className="w-4 h-4 text-indigo-600" /> 1. Project Objective & Scope Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <strong className="block text-slate-700 mb-1">Primary Business Objective:</strong>
              <p className="text-slate-600">{data.projectOverview.businessObjective || 'N/A'}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <strong className="block text-slate-700 mb-1">Expected Outcome & Success Criteria:</strong>
              <p className="text-slate-600">{data.projectOverview.expectedOutcome || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Section 2: Key Requirements Summary Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
            <ListChecks className="w-4 h-4 text-indigo-600" /> 2. Confirmed & Proposed Requirements ({data.requirements.length})
          </h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                  <th className="py-2.5 px-3">ID</th>
                  <th className="py-2.5 px-3">Requirement Description</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Priority</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.requirements.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-mono font-bold text-indigo-700">{r.reqId}</td>
                    <td className="py-2 px-3 font-medium text-slate-800">{r.description}</td>
                    <td className="py-2 px-3 text-slate-600">{r.category}</td>
                    <td className="py-2 px-3"><Badge label={r.priority} variant="priority" /></td>
                    <td className="py-2 px-3"><Badge label={r.status} variant="status" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Budget & Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Commercials Summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <DollarSign className="w-4 h-4 text-emerald-600" /> 3. Budget & Commercial Terms
            </h3>
            <div className="p-4 bg-emerald-50/40 border border-emerald-200 rounded-xl text-xs space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-600">Estimated Budget:</span>
                <span className="text-base font-extrabold text-emerald-700">{formattedBudget}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Pricing Model:</span>
                <span className="font-semibold text-slate-800">{data.budget.pricingModel}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Terms:</span>
                <span className="font-medium text-slate-800">{data.budget.paymentTerms || 'Standard'}</span>
              </div>
            </div>
          </div>

          {/* Timeline Summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <Calendar className="w-4 h-4 text-indigo-600" /> 4. Timeline & Target Launch
            </h3>
            <div className="p-4 bg-indigo-50/40 border border-indigo-200 rounded-xl text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Project Start:</span>
                <span className="font-semibold text-slate-800">{data.timeline.startDate || 'TBD'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Target Go-Live:</span>
                <span className="font-semibold text-indigo-700">{data.timeline.targetCompletionDate || 'TBD'}</span>
              </div>
              <div className="pt-1 text-slate-500 text-[11px]">
                Critical Deadline: {data.timeline.criticalDeadlines || 'None noted'}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Decisions & Action Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Decisions */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> 5. Agreed Decisions
            </h3>
            <div className="space-y-2 text-xs">
              {data.decisions.map(d => (
                <div key={d.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="font-semibold text-slate-800">{d.decision}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{d.rationale}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <ListTodo className="w-4 h-4 text-amber-600" /> 6. Action Items & Next Steps
            </h3>
            <div className="space-y-2 text-xs">
              {data.actionItems.map(a => (
                <div key={a.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800 block">{a.action}</span>
                    <span className="text-[11px] text-slate-500">Owner: {a.owner} • Due: {a.dueDate}</span>
                  </div>
                  <Badge label={a.status} variant="status" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 5: Risk Matrix & Mitigation */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" /> 7. Key Identified Risks & Mitigation
          </h3>
          <div className="space-y-2 text-xs">
            {data.risks.map(r => (
              <div key={r.id} className="p-3 bg-rose-50/40 border border-rose-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-800 flex items-center gap-2">
                    {r.risk}
                    <Badge label={r.severity} variant="severity" />
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">Mitigation: {r.mitigation}</div>
                </div>
                <div className="text-right text-[11px] text-slate-500 shrink-0">
                  Owner: {r.owner}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
