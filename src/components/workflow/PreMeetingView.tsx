import React from 'react';
import {
  Clock,
  CheckCircle2,
  Calendar,
  UserCheck,
  FileQuestion,
  Lightbulb,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';

export const PreMeetingView: React.FC = () => {
  const { data, updateClientInfo, updateProjectOverview, updateBudget, setStage } = useMeeting();

  const checklistItems = [
    { label: 'Confirm Client & Stakeholder Attendees', done: Boolean(data.clientInfo.contactPerson && data.clientInfo.email) },
    { label: 'Define Primary Business Objective', done: Boolean(data.projectOverview.businessObjective) },
    { label: 'Prepare Initial Requirement Discovery Questions', done: data.questions.length > 0 },
    { label: 'Set Baseline Budget & Pricing Expectations', done: Boolean(data.budget.estimatedBudget > 0) },
    { label: 'Establish Target Delivery Timeline & Milestones', done: Boolean(data.timeline.targetCompletionDate) }
  ];

  const completedChecklistCount = checklistItems.filter(i => i.done).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Pre-Meeting Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-indigo-200 mb-2 border border-white/10">
              <Clock className="w-3.5 h-3.5" /> Stage 1: Pre-Meeting Preparation
            </div>
            <h2 className="text-2xl font-bold text-white">Discovery Meeting Setup & Alignment</h2>
            <p className="text-sm text-indigo-200 mt-1 max-w-2xl">
              Prepare meeting agenda, verify client metadata, specify expected budget constraints, and formulate key questions before starting the live discovery session.
            </p>
          </div>
          <button
            onClick={() => setStage('live-meeting')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-indigo-500/25 shrink-0"
          >
            Start Live Discovery Session <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Readiness Checklist */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" /> Meeting Readiness Checklist
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                {completedChecklistCount}/{checklistItems.length}
              </span>
            </div>
            <ul className="space-y-3">
              {checklistItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-xs">
                  <CheckCircle2
                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                      item.done ? 'text-emerald-500' : 'text-slate-300'
                    }`}
                  />
                  <span className={item.done ? 'text-slate-800 font-medium' : 'text-slate-500'}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900">
            <div className="font-semibold flex items-center gap-1.5 mb-1 text-indigo-700">
              <Lightbulb className="w-4 h-4 text-indigo-600" /> Pro Tip for Live Meetings
            </div>
            Use keyboard shortcuts during the meeting. Switch to <strong>Live Focus Mode</strong> at any point to minimize chrome and open quick-add entry modals.
          </div>
        </div>

        {/* Middle Column: Client & Project Setup */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 lg:col-span-2">
          <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-600" /> Quick Client & Meeting Parameters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Company / Organization</label>
              <input
                type="text"
                value={data.clientInfo.companyName}
                onChange={e => updateClientInfo({ companyName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Primary Contact Person</label>
              <input
                type="text"
                value={data.clientInfo.contactPerson}
                onChange={e => updateClientInfo({ contactPerson: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Meeting Type</label>
              <select
                value={data.clientInfo.meetingType}
                onChange={e => updateClientInfo({ meetingType: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800"
              >
                <option value="Discovery">Discovery</option>
                <option value="Requirement Gathering">Requirement Gathering</option>
                <option value="Scope Alignment">Scope Alignment</option>
                <option value="Budget Review">Budget Review</option>
                <option value="Final Sign-off">Final Sign-off</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Target Estimated Budget ($)</label>
              <input
                type="number"
                value={data.budget.estimatedBudget}
                onChange={e => updateBudget({ estimatedBudget: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1 text-xs">Primary Business Objective</label>
            <textarea
              value={data.projectOverview.businessObjective}
              onChange={e => updateProjectOverview({ businessObjective: e.target.value })}
              rows={3}
              placeholder="What core business problem does the client want solved?"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
