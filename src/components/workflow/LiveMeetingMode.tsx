import React, { useState } from 'react';
import {
  Zap,
  Plus,
  ListChecks,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ListTodo,
  Clock,
  Trash2,
  Edit2,
  FileText
} from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import { QuickAddModal } from '../common/QuickAddModal';
import { Badge } from '../common/Badge';

export const LiveMeetingMode: React.FC = () => {
  const { data, updateNotes, deleteRequirement, deleteRisk, deleteDecision, deleteQuestion, deleteActionItem } = useMeeting();
  
  const [quickAddType, setQuickAddType] = useState<'Requirement' | 'Risk' | 'Decision' | 'Question' | 'ActionItem' | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
      {/* Live Rapid Controls Toolbar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-lg border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-slate-900 rounded-xl font-bold animate-pulse">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Live Meeting Mode Active
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h2>
            <p className="text-xs text-slate-400">Click any quick-add action below for zero-friction timestamped entry</p>
          </div>
        </div>

        {/* Quick Add Buttons Group */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setQuickAddType('Requirement')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" /> Requirement
          </button>
          <button
            onClick={() => setQuickAddType('Risk')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" /> Risk
          </button>
          <button
            onClick={() => setQuickAddType('Decision')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" /> Decision
          </button>
          <button
            onClick={() => setQuickAddType('Question')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" /> Question
          </button>
          <button
            onClick={() => setQuickAddType('ActionItem')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" /> Action Item
          </button>
        </div>
      </div>

      {/* Main Grid: Left side live stream & requirements; Right side quick notes & activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Captured Feed (Requirements, Risks, Decisions) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Active Requirements List */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                <ListChecks className="w-4 h-4 text-indigo-600" /> Captured Requirements ({data.requirements.length})
              </h3>
              <button
                onClick={() => setQuickAddType('Requirement')}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Requirement
              </button>
            </div>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
              {data.requirements.map(r => (
                <div
                  key={r.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 font-mono">
                        {r.reqId}
                      </span>
                      <Badge label={r.priority} variant="priority" />
                      <Badge label={r.status} variant="status" />
                      <span className="text-slate-400">• {r.category}</span>
                    </div>
                    <p className="font-medium text-slate-800 leading-snug">{r.description}</p>
                    {r.notes && <p className="text-[11px] text-slate-500 italic">Notes: {r.notes}</p>}
                  </div>
                  <button
                    onClick={() => deleteRequirement(r.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50"
                    title="Delete Requirement"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Feed for Decisions & Action Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Decisions Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Logged Decisions
                </h4>
                <button
                  onClick={() => setQuickAddType('Decision')}
                  className="text-[11px] text-emerald-600 hover:underline font-semibold"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar">
                {data.decisions.map(d => (
                  <div key={d.id} className="p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-lg text-xs space-y-1">
                    <p className="font-semibold text-slate-800">{d.decision}</p>
                    <p className="text-[11px] text-slate-500">{d.rationale}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risks Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" /> Raised Risks
                </h4>
                <button
                  onClick={() => setQuickAddType('Risk')}
                  className="text-[11px] text-rose-600 hover:underline font-semibold"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar">
                {data.risks.map(r => (
                  <div key={r.id} className="p-2.5 bg-rose-50/50 border border-rose-100 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{r.risk}</span>
                      <Badge label={r.severity} variant="severity" />
                    </div>
                    <p className="text-[11px] text-slate-500">Mitigation: {r.mitigation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Notes & Live Stream */}
        <div className="space-y-4">
          {/* Quick Scratchpad Note */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col h-[280px]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
              <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-500" /> Live Meeting Scratchpad
              </h3>
              <span className="text-[10px] text-slate-400">Auto-saved</span>
            </div>
            <textarea
              value={data.notes.quickScratchpad}
              onChange={e => updateNotes({ quickScratchpad: e.target.value })}
              placeholder="Jot down quick bullet points, raw client feedback, or verbal mentions here live during discussion..."
              className="w-full flex-1 p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none font-mono"
            />
          </div>

          {/* Activity Timestamp Stream */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 border-b border-slate-100 pb-2 mb-3">
              <Clock className="w-4 h-4 text-indigo-600" /> Real-time Activity Log
            </h3>
            <div className="space-y-2 max-h-[240px] overflow-y-auto custom-scrollbar">
              {data.quickLog.map(log => (
                <div key={log.id} className="flex items-start gap-2 text-xs">
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                    {log.timestamp}
                  </span>
                  <p className="text-slate-700 text-[11px] leading-tight">
                    <strong className="text-slate-900 font-semibold">{log.type}:</strong> {log.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Add Modal */}
      {quickAddType && (
        <QuickAddModal
          isOpen={Boolean(quickAddType)}
          onClose={() => setQuickAddType(null)}
          initialType={quickAddType}
        />
      )}
    </div>
  );
};
