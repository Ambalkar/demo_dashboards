import React, { useState } from 'react';
import { HelpCircle, Plus, Edit2, Trash2 } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { QuestionItem } from '../../types/dashboard';

export const QuestionsSection: React.FC = () => {
  const { data, addQuestion, updateQuestion, deleteQuestion } = useMeeting();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<QuestionItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [qQuestion, setQQuestion] = useState('');
  const [qAnswer, setQAnswer] = useState('');
  const [qAskedBy, setQAskedBy] = useState('');
  const [qStatus, setQStatus] = useState<'Open' | 'Answered' | 'Follow-up Required'>('Open');
  const [qDate, setQDate] = useState('');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setQQuestion('');
    setQAnswer('');
    setQAskedBy('Client');
    setQStatus('Open');
    setQDate(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
    setIsModalOpen(true);
  };

  const handleOpenEdit = (q: QuestionItem) => {
    setEditingItem(q);
    setQQuestion(q.question);
    setQAnswer(q.answer);
    setQAskedBy(q.askedBy);
    setQStatus(q.status);
    setQDate(q.followUpDate);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qQuestion.trim()) return;

    if (editingItem) {
      updateQuestion(editingItem.id, {
        question: qQuestion,
        answer: qAnswer,
        askedBy: qAskedBy,
        status: qAnswer.trim() ? 'Answered' : qStatus,
        followUpDate: qDate
      });
    } else {
      addQuestion({
        question: qQuestion,
        answer: qAnswer,
        askedBy: qAskedBy || 'Client',
        status: qAnswer.trim() ? 'Answered' : qStatus,
        followUpDate: qDate
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-600" /> Section 9: Questions & Open Clarifications
          </h3>
          <p className="text-xs text-slate-500">Track client questions, live responses, and pending follow-up deadlines</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" /> Raise Question
        </button>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-3 px-3.5">Question Raised</th>
              <th className="py-3 px-3.5">Live / Proposed Answer</th>
              <th className="py-3 px-3.5">Asked By</th>
              <th className="py-3 px-3.5">Status</th>
              <th className="py-3 px-3.5">Follow-up Date</th>
              <th className="py-3 px-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.questions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-slate-500">
                  No questions raised yet.
                </td>
              </tr>
            ) : (
              data.questions.map(q => (
                <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3.5 font-semibold text-slate-800">{q.question}</td>
                  <td className="py-2.5 px-3.5 text-slate-600">{q.answer || 'Pending response...'}</td>
                  <td className="py-2.5 px-3.5 text-slate-700 font-medium whitespace-nowrap">{q.askedBy}</td>
                  <td className="py-2.5 px-3.5"><Badge label={q.status} variant="status" /></td>
                  <td className="py-2.5 px-3.5 text-slate-600 font-mono whitespace-nowrap">{q.followUpDate}</td>
                  <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleOpenEdit(q)} className="p-1 text-slate-400 hover:text-indigo-600 rounded">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeletingId(q.id)} className="p-1 text-slate-400 hover:text-rose-600 rounded">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Question' : 'Raise Question'} maxWidth="md">
        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Question *</label>
            <input type="text" value={qQuestion} onChange={e => setQQuestion(e.target.value)} required className="w-full p-2.5 border border-slate-300 rounded-lg" />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">Answer</label>
            <textarea value={qAnswer} onChange={e => setQAnswer(e.target.value)} rows={2} className="w-full p-2 border border-slate-300 rounded-lg" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Asked By</label>
              <input type="text" value={qAskedBy} onChange={e => setQAskedBy(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Status</label>
              <select value={qStatus} onChange={e => setQStatus(e.target.value as any)} className="w-full p-2 border border-slate-300 rounded-lg">
                <option value="Open">Open</option>
                <option value="Answered">Answered</option>
                <option value="Follow-up Required">Follow-up Required</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Follow-up Date</label>
              <input type="date" value={qDate} onChange={e => setQDate(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg">Cancel</button>
            <button type="submit" className="px-3 py-1.5 bg-sky-600 text-white font-semibold rounded-lg">Save Question</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={Boolean(deletingId)} onClose={() => setDeletingId(null)} onConfirm={() => deletingId && deleteQuestion(deletingId)} title="Delete Question" message="Remove this question?" />
    </div>
  );
};
