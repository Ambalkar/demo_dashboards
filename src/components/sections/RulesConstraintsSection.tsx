import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Plus, X, Lock } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';

export const RulesConstraintsSection: React.FC = () => {
  const { data, updateRules } = useMeeting();
  const r = data.rulesConstraints;

  const [newNotDo, setNewNotDo] = useState('');
  const [newMandatory, setNewMandatory] = useState('');

  const handleAddNotDo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotDo.trim()) return;
    updateRules({ thingsNotToDo: [...r.thingsNotToDo, newNotDo.trim()] });
    setNewNotDo('');
  };

  const handleRemoveNotDo = (index: number) => {
    updateRules({ thingsNotToDo: r.thingsNotToDo.filter((_, i) => i !== index) });
  };

  const handleAddMandatory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMandatory.trim()) return;
    updateRules({ mandatoryItems: [...r.mandatoryItems, newMandatory.trim()] });
    setNewMandatory('');
  };

  const handleRemoveMandatory = (index: number) => {
    updateRules({ mandatoryItems: r.mandatoryItems.filter((_, i) => i !== index) });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600" /> Section 6: Governance, Rules & Constraints
        </h3>
        <span className="text-xs px-2.5 py-1 bg-rose-50 text-rose-700 rounded-full font-semibold">
          Compliance & Limits
        </span>
      </div>

      {/* Mandatory vs Things NOT To Do Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Things NOT To Do */}
        <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-2xl space-y-3">
          <h4 className="font-bold text-rose-900 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" /> Things That Must NOT Be Done (Prohibited)
          </h4>
          <form onSubmit={handleAddNotDo} className="flex gap-2 text-xs">
            <input
              type="text"
              value={newNotDo}
              onChange={e => setNewNotDo(e.target.value)}
              placeholder="e.g. Do NOT store plain-text credit cards..."
              className="w-full p-2 bg-white border border-rose-300 rounded-lg text-xs"
            />
            <button type="submit" className="px-3 py-1.5 bg-rose-600 text-white font-semibold rounded-lg shrink-0">
              Add
            </button>
          </form>
          <div className="space-y-1.5 max-h-[160px] overflow-y-auto custom-scrollbar">
            {r.thingsNotToDo.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-white border border-rose-200 rounded-lg text-xs">
                <span className="text-slate-800 font-medium">{item}</span>
                <button onClick={() => handleRemoveNotDo(idx)} className="text-slate-400 hover:text-rose-600 p-0.5">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Items */}
        <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-3">
          <h4 className="font-bold text-emerald-900 text-xs flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" /> Mandatory Requirements (Non-Negotiable)
          </h4>
          <form onSubmit={handleAddMandatory} className="flex gap-2 text-xs">
            <input
              type="text"
              value={newMandatory}
              onChange={e => setNewMandatory(e.target.value)}
              placeholder="e.g. Multi-factor Authentication for admin roles..."
              className="w-full p-2 bg-white border border-emerald-300 rounded-lg text-xs"
            />
            <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg shrink-0">
              Add
            </button>
          </form>
          <div className="space-y-1.5 max-h-[160px] overflow-y-auto custom-scrollbar">
            {r.mandatoryItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-white border border-emerald-200 rounded-lg text-xs">
                <span className="text-slate-800 font-medium">{item}</span>
                <button onClick={() => handleRemoveMandatory(idx)} className="text-slate-400 hover:text-emerald-700 p-0.5">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Structured Constraints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Client Business Rules</label>
          <textarea
            value={r.clientRules}
            onChange={e => updateRules({ clientRules: e.target.value })}
            rows={2}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Industry Regulations (SOC2 / GDPR)</label>
          <textarea
            value={r.industryRegulations}
            onChange={e => updateRules({ industryRegulations: e.target.value })}
            rows={2}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Technical Constraints</label>
          <textarea
            value={r.technicalConstraints}
            onChange={e => updateRules({ technicalConstraints: e.target.value })}
            rows={2}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Legal & Compliance</label>
          <textarea
            value={r.legalCompliance}
            onChange={e => updateRules({ legalCompliance: e.target.value })}
            rows={2}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Brand & Design Guidelines</label>
          <textarea
            value={r.brandGuidelines}
            onChange={e => updateRules({ brandGuidelines: e.target.value })}
            rows={2}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Operational Constraints</label>
          <textarea
            value={r.operationalConstraints}
            onChange={e => updateRules({ operationalConstraints: e.target.value })}
            rows={2}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};
