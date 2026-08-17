import React, { useState } from 'react';
import { ListTodo, Plus, Edit2, Trash2, CheckSquare, Square } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { ActionItem } from '../../types/dashboard';

export const ActionItemsSection: React.FC = () => {
  const { data, addActionItem, updateActionItem, deleteActionItem } = useMeeting();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ActionItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [actDesc, setActDesc] = useState('');
  const [actOwner, setActOwner] = useState('');
  const [actDueDate, setActDueDate] = useState('');
  const [actPriority, setActPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [actStatus, setActStatus] = useState<'Not Started' | 'In Progress' | 'Completed' | 'Blocked'>('In Progress');
  const [actNotes, setActNotes] = useState('');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setActDesc('');
    setActOwner('Account Lead');
    setActDueDate(new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10));
    setActPriority('High');
    setActStatus('Not Started');
    setActNotes('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (a: ActionItem) => {
    setEditingItem(a);
    setActDesc(a.action);
    setActOwner(a.owner);
    setActDueDate(a.dueDate);
    setActPriority(a.priority);
    setActStatus(a.status);
    setActNotes(a.notes);
    setIsModalOpen(true);
  };

  const toggleStatus = (a: ActionItem) => {
    const nextStatus = a.status === 'Completed' ? 'In Progress' : 'Completed';
    updateActionItem(a.id, { status: nextStatus });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actDesc.trim()) return;

    if (editingItem) {
      updateActionItem(editingItem.id, {
        action: actDesc,
        owner: actOwner,
        dueDate: actDueDate,
        priority: actPriority,
        status: actStatus,
        notes: actNotes
      });
    } else {
      addActionItem({
        action: actDesc,
        owner: actOwner || 'Unassigned',
        dueDate: actDueDate || new Date().toISOString().slice(0, 10),
        priority: actPriority,
        status: actStatus,
        notes: actNotes
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-amber-600" /> Section 11: Action-Item Tracker
          </h3>
          <p className="text-xs text-slate-500">Assign task responsibilities, completion due dates, and track progress</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Action Item
        </button>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-3 px-3.5 w-10 text-center">Done</th>
              <th className="py-3 px-3.5">Action Description</th>
              <th className="py-3 px-3.5">Owner</th>
              <th className="py-3 px-3.5">Due Date</th>
              <th className="py-3 px-3.5">Priority</th>
              <th className="py-3 px-3.5">Status</th>
              <th className="py-3 px-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.actionItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-slate-500">
                  No action items assigned yet.
                </td>
              </tr>
            ) : (
              data.actionItems.map(a => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3.5 text-center">
                    <button onClick={() => toggleStatus(a)} className="text-slate-400 hover:text-emerald-600">
                      {a.status === 'Completed' ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300" />
                      )}
                    </button>
                  </td>
                  <td className={`py-2.5 px-3.5 font-semibold ${a.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {a.action}
                  </td>
                  <td className="py-2.5 px-3.5 text-slate-700 font-medium whitespace-nowrap">{a.owner}</td>
                  <td className="py-2.5 px-3.5 text-slate-600 font-mono whitespace-nowrap">{a.dueDate}</td>
                  <td className="py-2.5 px-3.5"><Badge label={a.priority} variant="priority" /></td>
                  <td className="py-2.5 px-3.5"><Badge label={a.status} variant="status" /></td>
                  <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleOpenEdit(a)} className="p-1 text-slate-400 hover:text-indigo-600 rounded">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeletingId(a.id)} className="p-1 text-slate-400 hover:text-rose-600 rounded">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Action' : 'Add Action Item'} maxWidth="md">
        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Action Description *</label>
            <input type="text" value={actDesc} onChange={e => setActDesc(e.target.value)} required className="w-full p-2.5 border border-slate-300 rounded-lg" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Owner</label>
              <input type="text" value={actOwner} onChange={e => setActOwner(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Due Date</label>
              <input type="date" value={actDueDate} onChange={e => setActDueDate(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Priority</label>
              <select value={actPriority} onChange={e => setActPriority(e.target.value as any)} className="w-full p-2 border border-slate-300 rounded-lg">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg">Cancel</button>
            <button type="submit" className="px-3 py-1.5 bg-amber-600 text-white font-semibold rounded-lg">Save Action</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={Boolean(deletingId)} onClose={() => setDeletingId(null)} onConfirm={() => deletingId && deleteActionItem(deletingId)} title="Delete Action" message="Remove this action item?" />
    </div>
  );
};
