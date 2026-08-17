import React from 'react';
import { Target, AlertCircle, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';

export const ProjectOverviewSection: React.FC = () => {
  const { data, updateProjectOverview } = useMeeting();
  const overview = data.projectOverview;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600" /> Section 2: Project Overview & Scope Definition
        </h3>
        <span className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full font-semibold">
          High Level Scope
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-600" /> Primary Business Objective
          </label>
          <textarea
            value={overview.businessObjective}
            onChange={e => updateProjectOverview({ businessObjective: e.target.value })}
            rows={3}
            placeholder="What core business problem or growth target does the client want to solve?"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Current Problem Statement
          </label>
          <textarea
            value={overview.problemStatement}
            onChange={e => updateProjectOverview({ problemStatement: e.target.value })}
            rows={3}
            placeholder="What pain points, bottlenecks, or legacy limitations exist currently?"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Expected Outcome & Impact
          </label>
          <textarea
            value={overview.expectedOutcome}
            onChange={e => updateProjectOverview({ expectedOutcome: e.target.value })}
            rows={3}
            placeholder="What will success look like upon system launch?"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-500" /> Success Criteria & KPIs
          </label>
          <textarea
            value={overview.successCriteria}
            onChange={e => updateProjectOverview({ successCriteria: e.target.value })}
            rows={3}
            placeholder="Quantitative metrics (e.g. 60% faster checkout, sub-second sync)..."
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50/40 border border-emerald-200 rounded-xl space-y-1.5">
            <label className="block font-bold text-emerald-900 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> In-Scope Items
            </label>
            <textarea
              value={overview.projectScope}
              onChange={e => updateProjectOverview({ projectScope: e.target.value })}
              rows={3}
              placeholder="List modules, features, integrations, and deliverables included in this phase..."
              className="w-full p-2.5 bg-white border border-emerald-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="p-4 bg-rose-50/40 border border-rose-200 rounded-xl space-y-1.5">
            <label className="block font-bold text-rose-900 text-xs flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" /> Out-of-Scope Items (Exclusions)
            </label>
            <textarea
              value={overview.outOfScopeItems}
              onChange={e => updateProjectOverview({ outOfScopeItems: e.target.value })}
              rows={3}
              placeholder="Explicitly list features or items NOT included in this engagement phase..."
              className="w-full p-2.5 bg-white border border-rose-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
