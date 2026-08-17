import React, { useState } from 'react';
import { Calendar, Clock, Flag, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const TimelineSection: React.FC = () => {
  const { data, updateTimeline, addMilestone, deleteMilestone } = useMeeting();
  const t = data.timeline;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [msTitle, setMsTitle] = useState('');
  const [msDate, setMsDate] = useState('');
  const [msStatus, setMsStatus] = useState<'Upcoming' | 'In Progress' | 'Achieved' | 'Delayed'>('Upcoming');
  const [msDesc, setMsDesc] = useState('');

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msTitle.trim()) return;
    addMilestone({
      title: msTitle,
      targetDate: msDate || new Date().toISOString().slice(0, 10),
      status: msStatus,
      description: msDesc
    });
    setMsTitle('');
    setMsDesc('');
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600" /> Section 5: Timeline, Deadlines & Milestones
        </h3>
        <span className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full font-semibold">
          Schedule & Roadmap
        </span>
      </div>

      {/* Dates Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Target Project Start Date</label>
          <input
            type="date"
            value={t.startDate}
            onChange={e => updateTimeline({ startDate: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Target Go-Live / Completion Date</label>
          <input
            type="date"
            value={t.targetCompletionDate}
            onChange={e => updateTimeline({ targetCompletionDate: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-indigo-700 font-bold"
          />
        </div>
      </div>

      {/* Visual Roadmap / Timeline Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
            <Flag className="w-4 h-4 text-indigo-600" /> Key Project Milestones ({t.milestones.length})
          </h4>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5" /> Add Milestone
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {t.milestones.map((ms, idx) => (
            <div
              key={ms.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-300 transition-all flex flex-col justify-between space-y-2 relative"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                  <span>Step {idx + 1}</span>
                  <span className="font-bold text-indigo-600">{ms.targetDate}</span>
                </div>
                <h5 className="font-bold text-slate-900 text-xs leading-snug">{ms.title}</h5>
                {ms.description && <p className="text-[11px] text-slate-500 mt-1">{ms.description}</p>}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                <Badge label={ms.status} variant="status" />
                <button
                  onClick={() => deleteMilestone(ms.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title="Remove milestone"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Constraints & Expectations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Critical Deadlines / Hard Freezes</label>
          <textarea
            value={t.criticalDeadlines}
            onChange={e => updateTimeline({ criticalDeadlines: e.target.value })}
            rows={2}
            placeholder="e.g. Black Friday freeze mandated by Nov 20th..."
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Client Stakeholder Availability</label>
          <textarea
            value={t.clientAvailability}
            onChange={e => updateTimeline({ clientAvailability: e.target.value })}
            rows={2}
            placeholder="e.g. Sprint reviews on Tuesdays 10 AM EST..."
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Delivery & Sprint Expectations</label>
          <textarea
            value={t.deliveryExpectations}
            onChange={e => updateTimeline({ deliveryExpectations: e.target.value })}
            rows={2}
            placeholder="e.g. Bi-weekly staging deploys with demo..."
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      {/* Milestone Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Milestone" maxWidth="sm">
        <form onSubmit={handleAddMilestone} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Milestone Title *</label>
            <input
              type="text"
              value={msTitle}
              onChange={e => setMsTitle(e.target.value)}
              placeholder="e.g. Phase 1: Prototype Sign-off"
              required
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">Target Date</label>
            <input
              type="date"
              value={msDate}
              onChange={e => setMsDate(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">Status</label>
            <select
              value={msStatus}
              onChange={e => setMsStatus(e.target.value as any)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="In Progress">In Progress</option>
              <option value="Achieved">Achieved</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">Description</label>
            <textarea
              value={msDesc}
              onChange={e => setMsDesc(e.target.value)}
              rows={2}
              placeholder="Deliverables included in this milestone..."
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-3 py-1.5 text-slate-600 bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white font-semibold rounded-lg">
              Save Milestone
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
