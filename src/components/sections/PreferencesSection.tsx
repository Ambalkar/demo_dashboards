import React, { useState } from 'react';
import { Sliders, ThumbsUp, ThumbsDown, Code2, MessageSquare, Check, X } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';

export const PreferencesSection: React.FC = () => {
  const { data, updatePreferences } = useMeeting();
  const pref = data.preferences;

  const [newDo, setNewDo] = useState('');
  const [newDont, setNewDont] = useState('');
  const [newTech, setNewTech] = useState('');

  const handleAddDo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDo.trim()) return;
    updatePreferences({ dos: [...pref.dos, newDo.trim()] });
    setNewDo('');
  };

  const handleAddDont = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDont.trim()) return;
    updatePreferences({ donts: [...pref.donts, newDont.trim()] });
    setNewDont('');
  };

  const handleAddTech = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTech.trim()) return;
    updatePreferences({ preferredTechnologies: [...pref.preferredTechnologies, newTech.trim()] });
    setNewTech('');
  };

  const handleRemoveTech = (tech: string) => {
    updatePreferences({ preferredTechnologies: pref.preferredTechnologies.filter(t => t !== tech) });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-600" /> Section 7: Client Preferences & Technical Stack
        </h3>
        <span className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full font-semibold">
          Stack & Design Norms
        </span>
      </div>

      {/* Tech Stack Badges */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
        <label className="block font-bold text-slate-800 text-xs flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-600" /> Preferred Technologies & Platforms
        </label>
        <form onSubmit={handleAddTech} className="flex gap-2 text-xs">
          <input
            type="text"
            value={newTech}
            onChange={e => setNewTech(e.target.value)}
            placeholder="Add technology (e.g. React, PostgreSQL, AWS)..."
            className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
          />
          <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white font-semibold rounded-lg shrink-0">
            Add Tech
          </button>
        </form>
        <div className="flex flex-wrap gap-2 pt-1">
          {pref.preferredTechnologies.map(tech => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-indigo-200 text-indigo-700 rounded-full text-xs font-semibold shadow-2xs"
            >
              {tech}
              <button onClick={() => handleRemoveTech(tech)} className="text-indigo-400 hover:text-rose-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Do's & Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Do's */}
        <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-3">
          <h4 className="font-bold text-emerald-900 flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-emerald-600" /> Best Practices (Do's)
          </h4>
          <form onSubmit={handleAddDo} className="flex gap-2">
            <input
              type="text"
              value={newDo}
              onChange={e => setNewDo(e.target.value)}
              placeholder="e.g. Provide visual loading skeletons..."
              className="w-full p-2 bg-white border border-emerald-300 rounded-lg text-xs"
            />
            <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg shrink-0">
              Add
            </button>
          </form>
          <div className="space-y-1.5 max-h-[140px] overflow-y-auto custom-scrollbar">
            {pref.dos.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-white border border-emerald-200 rounded-lg">
                <span className="text-slate-800 font-medium">{item}</span>
                <button onClick={() => updatePreferences({ dos: pref.dos.filter((_, i) => i !== idx) })} className="text-slate-400 hover:text-emerald-700">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Don'ts */}
        <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-2xl space-y-3">
          <h4 className="font-bold text-rose-900 flex items-center gap-2">
            <ThumbsDown className="w-4 h-4 text-rose-600" /> Avoid (Don'ts)
          </h4>
          <form onSubmit={handleAddDont} className="flex gap-2">
            <input
              type="text"
              value={newDont}
              onChange={e => setNewDont(e.target.value)}
              placeholder="e.g. Don't use distracting modal wizards..."
              className="w-full p-2 bg-white border border-rose-300 rounded-lg text-xs"
            />
            <button type="submit" className="px-3 py-1.5 bg-rose-600 text-white font-semibold rounded-lg shrink-0">
              Add
            </button>
          </form>
          <div className="space-y-1.5 max-h-[140px] overflow-y-auto custom-scrollbar">
            {pref.donts.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-white border border-rose-200 rounded-lg">
                <span className="text-slate-800 font-medium">{item}</span>
                <button onClick={() => updatePreferences({ donts: pref.donts.filter((_, i) => i !== idx) })} className="text-slate-400 hover:text-rose-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Design & UX Preferences</label>
          <textarea
            value={pref.designPreferences}
            onChange={e => updatePreferences({ designPreferences: e.target.value })}
            rows={2}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Communication Channel Preferences</label>
          <textarea
            value={pref.communicationPreferences}
            onChange={e => updatePreferences({ communicationPreferences: e.target.value })}
            rows={2}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Reference Examples & Benchmarks</label>
          <textarea
            value={pref.examplesReferences}
            onChange={e => updatePreferences({ examplesReferences: e.target.value })}
            rows={2}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};
