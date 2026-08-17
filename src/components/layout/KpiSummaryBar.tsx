import React from 'react';
import {
  ListChecks,
  AlertTriangle,
  DollarSign,
  CheckSquare,
  Activity,
  Percent,
  ShieldAlert
} from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import { Badge } from '../common/Badge';

export const KpiSummaryBar: React.FC = () => {
  const { data, healthStatus, completionPercentage } = useMeeting();

  const totalReqs = data.requirements.length;
  const criticalReqs = data.requirements.filter(r => r.priority === 'Critical').length;

  const openRisks = data.risks.filter(r => r.status !== 'Closed' && r.status !== 'Mitigated').length;
  const highRisks = data.risks.filter(r => r.severity === 'Critical' || r.severity === 'High').length;

  const pendingItems =
    data.requirements.filter(r => r.status === 'Pending' || r.status === 'Proposed').length +
    data.questions.filter(q => q.status === 'Open' || q.status === 'Follow-up Required').length;

  const totalActions = data.actionItems.length;
  const pendingActions = data.actionItems.filter(a => a.status !== 'Completed').length;

  const formattedBudget = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: data.budget.currency || 'USD',
    maximumFractionDigits: 0
  }).format(data.budget.estimatedBudget || 0);

  const formattedApproved = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: data.budget.currency || 'USD',
    maximumFractionDigits: 0
  }).format(data.budget.approvedBudget || 0);

  return (
    <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 shadow-xs no-print">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1: Requirements */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Requirements</span>
            <ListChecks className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">{totalReqs}</span>
            <span className="text-xs font-medium text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">
              {criticalReqs} Critical
            </span>
          </div>
        </div>

        {/* KPI 2: Open Risks */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Open Risks</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">{openRisks}</span>
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
              {highRisks} High Sev
            </span>
          </div>
        </div>

        {/* KPI 3: Action Items */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Action Items</span>
            <CheckSquare className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">{totalActions}</span>
            <span className="text-xs font-medium text-slate-600 bg-slate-200 px-1.5 py-0.5 rounded">
              {pendingActions} Open
            </span>
          </div>
        </div>

        {/* KPI 4: Pending / Questions */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Items</span>
            <ShieldAlert className="w-4 h-4 text-sky-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">{pendingItems}</span>
            <span className="text-xs font-medium text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">
              To Confirm
            </span>
          </div>
        </div>

        {/* KPI 5: Budget */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Est. Budget</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900">{formattedBudget}</span>
            <span className="text-[10px] text-slate-500 truncate">
              Appr: <span className="font-semibold text-slate-700">{formattedApproved}</span>
            </span>
          </div>
        </div>

        {/* KPI 6: Health & Readiness */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-indigo-600" /> Health
            </span>
            <Badge label={healthStatus} variant="health" size="sm" />
          </div>

          <div>
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 mb-1">
              <span>Readiness</span>
              <span className="font-bold text-indigo-600">{completionPercentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-500 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
