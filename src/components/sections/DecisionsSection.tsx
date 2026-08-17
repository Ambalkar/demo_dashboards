import React, { useState } from 'react';
import { CheckCircle, Plus, Edit2, Trash2 } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { DecisionItem } from '../../types/dashboard';

export const DecisionsSection: React.FC = () => {
  const { data, addDecision, updateDecision, deleteDecision } = useMeeting();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DecisionItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [decDesc, setDecDesc] = useState('');
  const [decRationale, setDecRationale] = useState('');
  const [decMaker, setDecMaker] = useState('');
  const [decImpact, setDecImpact] = useState<'High' | 'Medium' | 'Low'>('High');
  const [decStatus, setDecStatus] = useState<'Proposed' | 'Approved' | 'Under Review' | 'Rejected'>('Approved');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setDecDesc('');
    setDecRationale('');
    setDecMaker('Stakeholder Team');
    setDecImpact('High');
    setDecStatus('Approved');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (d: DecisionItem) => {
    setEditingItem(d);
    setDecDesc(d.decision);
    setDecRationale(d.rationale);
    setDecMaker(d.decisionMaker);
    setDecImpact(d.impact);
    setDecStatus(d.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decDesc.trim()) return;

    if (editingItem) {
      updateDecision(editingItem.id, {
        decision: decDesc,
        rationale: decRationale,
        decisionMaker: decMaker,
        impact: decImpact,
        status: decStatus
      });
    } else {
      addDecision({
        decision: decDesc,
        date: new Date().toISOString().slice(0, 10),
        rationale: decRationale,
        decisionMaker: decMaker || 'Stakeholders',
        impact: decImpact,
        status: decStatus
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" /> Section 10: Official Decision Log
          </h3>
          <p className="text-xs text-slate-500">Document approved choices, technical decisions, and rationale</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" /> Log Decision
        </button>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-3 px-3.5">Decision Made</th>
              <th className="py-3 px-3.5">Date</th>
              <th className="py-3 px-3.5">Rationale & Context</th>
              <th className="py-3 px-3.5">Decision Maker</th>
              <th className="py-3 px-3.5">Impact</th>
              <th className="py-3 px-3.5">Status</th>
              <th className="py-3 px-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.decisions.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-slate-500">
                  No decisions recorded yet.
                </td>
              </tr>
            ) : (
              data.decisions.map(d => (
                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3.5 font-bold text-slate-800">{d.decision}</td>
                  <td className="py-2.5 px-3.5 text-slate-600 font-mono whitespace-nowrap">{d.date}</td>
                  <td className="py-2.5 px-3.5 text-slate-600">{d.rationale}</td>
                  <td className="py-2.5 px-3.5 text-slate-700 font-medium whitespace-nowrap">{d.decisionMaker}</td>
                  <td className="py-2.5 px-3.5 text-slate-700">{d.impact}</td>
                  <td className="py-2.5 px-3.5"><Badge label={d.status} variant="status" /></td>
                  <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleOpenEdit(d)} className="p-1 text-slate-400 hover:text-indigo-600 rounded">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeletingId(d.id)} className="p-1 text-slate-400 hover:text-rose-600 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Decision' : 'Log Decision'} maxWidth="md">
        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Decision Made *</label>
            <input type="text" value={decDesc} onChange={e => setDecDesc(e.target.value)} required className="w-full p-2.5 border border-slate-300 rounded-lg" />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">Rationale</label>
            <textarea value={decRationale} onChange={e => setDecRationale(e.target.value)} rows={2} className="w-full p-2 border border-slate-300 rounded-lg" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Decision Maker</label>
              <input type="text" value={decMaker} onChange={e => setDecMaker(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Impact</label>
              <select value={decImpact} onChange={e => setDecImpact(e.target.value as any)} className="w-full p-2 border border-slate-300 rounded-lg">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Status</label>
              <select value={decStatus} onChange={e => setDecStatus(e.target.value as any)} className="w-full p-2 border border-slate-300 rounded-lg">
                <option value="Approved">Approved</option>
                <option value="Proposed">Proposed</option>
                <option value="Under Review">Under Review</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg">Cancel</button>
            <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg">Save Decision</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={Boolean(deletingId)} onClose={() => setDeletingId(null)} onConfirm={() => deletingId && deleteDecision(deletingId)} title="Delete Decision" message="Remove this decision entry?" />
    </div>
  );
};
