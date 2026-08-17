import React, { useState } from 'react';
import { AlertTriangle, Plus, Edit2, Trash2 } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { RiskItem } from '../../types/dashboard';

export const RisksSection: React.FC = () => {
  const { data, addRisk, updateRisk, deleteRisk } = useMeeting();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RiskItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [riskDesc, setRiskDesc] = useState('');
  const [riskImpact, setRiskImpact] = useState<'High' | 'Medium' | 'Low'>('High');
  const [riskProb, setRiskProb] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [riskSeverity, setRiskSeverity] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('High');
  const [riskMitigation, setRiskMitigation] = useState('');
  const [riskOwner, setRiskOwner] = useState('');
  const [riskStatus, setRiskStatus] = useState<'Identified' | 'Mitigated' | 'Monitoring' | 'Closed'>('Identified');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setRiskDesc('');
    setRiskImpact('High');
    setRiskProb('Medium');
    setRiskSeverity('High');
    setRiskMitigation('');
    setRiskOwner('Lead Architect');
    setRiskStatus('Identified');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (r: RiskItem) => {
    setEditingItem(r);
    setRiskDesc(r.risk);
    setRiskImpact(r.impact);
    setRiskProb(r.probability);
    setRiskSeverity(r.severity);
    setRiskMitigation(r.mitigation);
    setRiskOwner(r.owner);
    setRiskStatus(r.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riskDesc.trim()) return;

    if (editingItem) {
      updateRisk(editingItem.id, {
        risk: riskDesc,
        impact: riskImpact,
        probability: riskProb,
        severity: riskSeverity,
        mitigation: riskMitigation,
        owner: riskOwner,
        status: riskStatus
      });
    } else {
      addRisk({
        risk: riskDesc,
        impact: riskImpact,
        probability: riskProb,
        severity: riskSeverity,
        mitigation: riskMitigation,
        owner: riskOwner || 'Project Lead',
        status: riskStatus
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" /> Section 8: Dynamic Risk & Bottleneck Tracker
          </h3>
          <p className="text-xs text-slate-500">Track probability, impact, and mitigation actions for potential bottlenecks</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Risk Item
        </button>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-3 px-3.5">Risk Description</th>
              <th className="py-3 px-3.5">Severity</th>
              <th className="py-3 px-3.5">Impact</th>
              <th className="py-3 px-3.5">Probability</th>
              <th className="py-3 px-3.5">Mitigation Strategy</th>
              <th className="py-3 px-3.5">Owner</th>
              <th className="py-3 px-3.5">Status</th>
              <th className="py-3 px-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.risks.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-6 text-center text-slate-500">
                  No risks logged yet.
                </td>
              </tr>
            ) : (
              data.risks.map(r => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3.5 font-semibold text-slate-800">{r.risk}</td>
                  <td className="py-2.5 px-3.5"><Badge label={r.severity} variant="severity" /></td>
                  <td className="py-2.5 px-3.5 text-slate-600 font-medium">{r.impact}</td>
                  <td className="py-2.5 px-3.5 text-slate-600 font-medium">{r.probability}</td>
                  <td className="py-2.5 px-3.5 text-slate-700">{r.mitigation || 'TBD'}</td>
                  <td className="py-2.5 px-3.5 text-slate-700 font-medium whitespace-nowrap">{r.owner}</td>
                  <td className="py-2.5 px-3.5"><Badge label={r.status} variant="status" /></td>
                  <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEdit(r)}
                        className="p-1 text-slate-400 hover:text-indigo-600 rounded"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingId(r.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded"
                      >
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Risk' : 'Add Risk'} maxWidth="md">
        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Risk Description *</label>
            <input
              type="text"
              value={riskDesc}
              onChange={e => setRiskDesc(e.target.value)}
              required
              className="w-full p-2.5 border border-slate-300 rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Severity</label>
              <select value={riskSeverity} onChange={e => setRiskSeverity(e.target.value as any)} className="w-full p-2 border border-slate-300 rounded-lg">
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Impact</label>
              <select value={riskImpact} onChange={e => setRiskImpact(e.target.value as any)} className="w-full p-2 border border-slate-300 rounded-lg">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Probability</label>
              <select value={riskProb} onChange={e => setRiskProb(e.target.value as any)} className="w-full p-2 border border-slate-300 rounded-lg">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">Mitigation Plan</label>
            <textarea value={riskMitigation} onChange={e => setRiskMitigation(e.target.value)} rows={2} className="w-full p-2 border border-slate-300 rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Owner</label>
              <input type="text" value={riskOwner} onChange={e => setRiskOwner(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Status</label>
              <select value={riskStatus} onChange={e => setRiskStatus(e.target.value as any)} className="w-full p-2 border border-slate-300 rounded-lg">
                <option value="Identified">Identified</option>
                <option value="Monitoring">Monitoring</option>
                <option value="Mitigated">Mitigated</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg">Cancel</button>
            <button type="submit" className="px-3 py-1.5 bg-rose-600 text-white font-semibold rounded-lg">Save Risk</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={Boolean(deletingId)} onClose={() => setDeletingId(null)} onConfirm={() => deletingId && deleteRisk(deletingId)} title="Delete Risk" message="Remove this risk item?" />
    </div>
  );
};
