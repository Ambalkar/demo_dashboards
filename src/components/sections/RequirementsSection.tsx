import React, { useState } from 'react';
import { ListChecks, Plus, Edit2, Trash2, ArrowUpDown, CheckCircle, Clock } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import { FilterBar } from '../common/FilterBar';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { RequirementItem, PriorityLevel, RequirementType, RequirementStatus } from '../../types/dashboard';

export const RequirementsSection: React.FC = () => {
  const {
    data,
    addRequirement,
    updateRequirement,
    deleteRequirement,
    searchTerm,
    filterPriority,
    filterStatus,
    filterCategory,
    filterOwner
  } = useMeeting();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RequirementItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form states
  const [reqDesc, setReqDesc] = useState('');
  const [reqCategory, setReqCategory] = useState('Core Feature');
  const [reqPriority, setReqPriority] = useState<PriorityLevel>('High');
  const [reqType, setReqType] = useState<RequirementType>('Functional');
  const [reqStatus, setReqStatus] = useState<RequirementStatus>('Proposed');
  const [reqNotes, setReqNotes] = useState('');
  const [reqDeps, setReqDeps] = useState('');
  const [reqOwner, setReqOwner] = useState('');

  // Sorting
  const [sortField, setSortField] = useState<'reqId' | 'priority' | 'status' | 'category'>('reqId');
  const [sortAsc, setSortAsc] = useState(true);

  const categories = Array.from(new Set(data.requirements.map(r => r.category))).filter(Boolean);
  const owners = Array.from(new Set(data.requirements.map(r => r.owner))).filter(Boolean);

  // Filter requirements
  const filteredRequirements = data.requirements.filter(r => {
    const matchesSearch =
      !searchTerm ||
      r.reqId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.owner.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority = filterPriority === 'all' || r.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || r.category === filterCategory;
    const matchesOwner = filterOwner === 'all' || r.owner === filterOwner;

    return matchesSearch && matchesPriority && matchesStatus && matchesCategory && matchesOwner;
  });

  // Sort requirements
  const sortedRequirements = [...filteredRequirements].sort((a, b) => {
    let result = 0;
    if (sortField === 'reqId') {
      result = a.reqId.localeCompare(b.reqId);
    } else if (sortField === 'category') {
      result = a.category.localeCompare(b.category);
    } else if (sortField === 'priority') {
      const pMap = { Critical: 1, High: 2, Medium: 3, Low: 4 };
      result = pMap[a.priority] - pMap[b.priority];
    } else if (sortField === 'status') {
      result = a.status.localeCompare(b.status);
    }
    return sortAsc ? result : -result;
  });

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setReqDesc('');
    setReqCategory('Core Feature');
    setReqPriority('High');
    setReqType('Functional');
    setReqStatus('Proposed');
    setReqNotes('');
    setReqDeps('');
    setReqOwner('Client Lead');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: RequirementItem) => {
    setEditingItem(item);
    setReqDesc(item.description);
    setReqCategory(item.category);
    setReqPriority(item.priority);
    setReqType(item.type);
    setReqStatus(item.status);
    setReqNotes(item.notes);
    setReqDeps(item.dependencies);
    setReqOwner(item.owner);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqDesc.trim()) return;

    if (editingItem) {
      updateRequirement(editingItem.id, {
        description: reqDesc,
        category: reqCategory,
        priority: reqPriority,
        type: reqType,
        status: reqStatus,
        notes: reqNotes,
        dependencies: reqDeps,
        owner: reqOwner
      });
    } else {
      addRequirement({
        description: reqDesc,
        category: reqCategory || 'General',
        priority: reqPriority,
        type: reqType,
        status: reqStatus,
        notes: reqNotes,
        dependencies: reqDeps,
        owner: reqOwner || 'Client Lead'
      });
    }

    setIsModalOpen(false);
  };

  const toggleSort = (field: 'reqId' | 'priority' | 'status' | 'category') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-indigo-600" /> Section 3: Requirements Alignment Grid
          </h3>
          <p className="text-xs text-slate-500">Capture, filter, and prioritize functional and technical specifications</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Requirement
        </button>
      </div>

      {/* Filter Bar */}
      <FilterBar categories={categories} owners={owners} />

      {/* Requirements Data Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold select-none">
                <th
                  onClick={() => toggleSort('reqId')}
                  className="py-3 px-3.5 cursor-pointer hover:bg-slate-200 transition-colors w-24"
                >
                  <div className="flex items-center gap-1">
                    Req ID <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3.5">Description</th>
                <th
                  onClick={() => toggleSort('category')}
                  className="py-3 px-3.5 cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Category <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('priority')}
                  className="py-3 px-3.5 cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Priority <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3.5">Type</th>
                <th
                  onClick={() => toggleSort('status')}
                  className="py-3 px-3.5 cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Status <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3.5">Owner</th>
                <th className="py-3 px-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {sortedRequirements.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No requirements match your current search and filter criteria.
                  </td>
                </tr>
              ) : (
                sortedRequirements.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3.5 font-mono font-bold text-indigo-700 whitespace-nowrap">
                      {r.reqId}
                    </td>
                    <td className="py-2.5 px-3.5 font-medium text-slate-800">
                      <div>{r.description}</div>
                      {r.notes && <div className="text-[11px] text-slate-500 italic mt-0.5">Notes: {r.notes}</div>}
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-600 font-medium whitespace-nowrap">{r.category}</td>
                    <td className="py-2.5 px-3.5"><Badge label={r.priority} variant="priority" /></td>
                    <td className="py-2.5 px-3.5"><Badge label={r.type} variant="type" /></td>
                    <td className="py-2.5 px-3.5"><Badge label={r.status} variant="status" /></td>
                    <td className="py-2.5 px-3.5 text-slate-700 whitespace-nowrap">{r.owner}</td>
                    <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEditModal(r)}
                          className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingId(r.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Delete"
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
      </div>

      {/* Requirement Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? `Edit ${editingItem.reqId}` : 'Add New Requirement'}
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Requirement Description *</label>
            <textarea
              value={reqDesc}
              onChange={e => setReqDesc(e.target.value)}
              rows={3}
              placeholder="e.g. Real-time multi-warehouse inventory search..."
              required
              className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Category</label>
              <input
                type="text"
                value={reqCategory}
                onChange={e => setReqCategory(e.target.value)}
                placeholder="e.g. Inventory / Billing"
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Owner / Lead</label>
              <input
                type="text"
                value={reqOwner}
                onChange={e => setReqOwner(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Priority</label>
              <select
                value={reqPriority}
                onChange={e => setReqPriority(e.target.value as PriorityLevel)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Requirement Type</label>
              <select
                value={reqType}
                onChange={e => setReqType(e.target.value as RequirementType)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              >
                <option value="Functional">Functional</option>
                <option value="Non-functional">Non-functional</option>
                <option value="Business">Business</option>
                <option value="Technical">Technical</option>
                <option value="Compliance">Compliance</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Status</label>
              <select
                value={reqStatus}
                onChange={e => setReqStatus(e.target.value as RequirementStatus)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              >
                <option value="Proposed">Proposed</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Dependencies</label>
              <input
                type="text"
                value={reqDeps}
                onChange={e => setReqDeps(e.target.value)}
                placeholder="e.g. ERP API v2"
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Additional Notes</label>
            <textarea
              value={reqNotes}
              onChange={e => setReqNotes(e.target.value)}
              rows={2}
              placeholder="Internal clarifications or technical gotchas..."
              className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-xs"
            >
              Save Requirement
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deletingId && deleteRequirement(deletingId)}
        title="Delete Requirement"
        message="Are you sure you want to remove this requirement item?"
      />
    </div>
  );
};
