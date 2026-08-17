import React from 'react';
import { FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';

export const NotesSection: React.FC = () => {
  const { data, updateNotes, isSaved } = useMeeting();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" /> Section 12: Comprehensive Meeting Notes & Key Takeaways
          </h3>
          <p className="text-xs text-slate-500">Free-form rich text editor area for unformatted discovery discussion</p>
        </div>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          {isSaved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
          Auto-saved
        </span>
      </div>

      <div className="space-y-2">
        <textarea
          value={data.notes.mainNotes}
          onChange={e => updateNotes({ mainNotes: e.target.value })}
          rows={12}
          placeholder="Type detailed meeting notes, key stakeholder quotes, technical architecture highlights, or raw transcripts here..."
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white custom-scrollbar font-mono leading-relaxed"
        />
      </div>
    </div>
  );
};
