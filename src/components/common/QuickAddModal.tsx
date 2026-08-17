import React, { useState } from 'react';
import { Modal } from './Modal';
import { useMeeting } from '../../context/MeetingContext';
import { PriorityLevel, RequirementType, RequirementStatus } from '../../types/dashboard';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'Requirement' | 'Risk' | 'Decision' | 'Question' | 'ActionItem';
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  initialType = 'Requirement'
}) => {
  const [entryType, setEntryType] = useState<'Requirement' | 'Risk' | 'Decision' | 'Question' | 'ActionItem'>(initialType);

  const {
    addRequirement,
    addRisk,
    addDecision,
    addQuestion,
    addActionItem
  } = useMeeting();

  // Requirement form state
  const [reqDesc, setReqDesc] = useState('');
  const [reqCategory, setReqCategory] = useState('Core Feature');
  const [reqPriority, setReqPriority] = useState<PriorityLevel>('High');
  const [reqType, setReqType] = useState<RequirementType>('Functional');
  const [reqStatus, setReqStatus] = useState<RequirementStatus>('Proposed');
  const [reqOwner, setReqOwner] = useState('');
  const [reqNotes, setReqNotes] = useState('');

  // Risk form state
  const [riskDesc, setRiskDesc] = useState('');
  const [riskImpact, setRiskImpact] = useState<'High' | 'Medium' | 'Low'>('High');
  const [riskProb, setRiskProb] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [riskSeverity, setRiskSeverity] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('High');
  const [riskMitigation, setRiskMitigation] = useState('');
  const [riskOwner, setRiskOwner] = useState('');

  // Decision form state
  const [decDesc, setDecDesc] = useState('');
  const [decRationale, setDecRationale] = useState('');
  const [decMaker, setDecMaker] = useState('');
  const [decImpact, setDecImpact] = useState<'High' | 'Medium' | 'Low'>('High');

  // Question form state
  const [qQuestion, setQQuestion] = useState('');
  const [qAskedBy, setQAskedBy] = useState('');
  const [qAnswer, setQAnswer] = useState('');
  const [qStatus, setQStatus] = useState<'Open' | 'Answered' | 'Follow-up Required'>('Open');

  // Action item form state
  const [actDesc, setActDesc] = useState('');
  const [actOwner, setActOwner] = useState('');
  const [actDueDate, setActDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [actPriority, setActPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (entryType === 'Requirement') {
      if (!reqDesc.trim()) return;
      addRequirement({
        description: reqDesc,
        category: reqCategory || 'General',
        priority: reqPriority,
        type: reqType,
        status: reqStatus,
        notes: reqNotes,
        dependencies: '',
        owner: reqOwner || 'Client Lead'
      });
      setReqDesc('');
      setReqNotes('');
    } else if (entryType === 'Risk') {
      if (!riskDesc.trim()) return;
      addRisk({
        risk: riskDesc,
        impact: riskImpact,
        probability: riskProb,
        severity: riskSeverity,
        mitigation: riskMitigation,
        owner: riskOwner || 'Project Lead',
        status: 'Identified'
      });
      setRiskDesc('');
      setRiskMitigation('');
    } else if (entryType === 'Decision') {
      if (!decDesc.trim()) return;
      addDecision({
        decision: decDesc,
        date: new Date().toISOString().slice(0, 10),
        rationale: decRationale,
        decisionMaker: decMaker || 'Stakeholder Team',
        impact: decImpact,
        status: 'Approved'
      });
      setDecDesc('');
      setDecRationale('');
    } else if (entryType === 'Question') {
      if (!qQuestion.trim()) return;
      addQuestion({
        question: qQuestion,
        answer: qAnswer,
        askedBy: qAskedBy || 'Client',
        status: qAnswer.trim() ? 'Answered' : qStatus,
        followUpDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10)
      });
      setQQuestion('');
      setQAnswer('');
    } else if (entryType === 'ActionItem') {
      if (!actDesc.trim()) return;
      addActionItem({
        action: actDesc,
        owner: actOwner || 'Unassigned',
        dueDate: actDueDate,
        priority: actPriority,
        status: 'Not Started',
        notes: ''
      });
      setActDesc('');
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Capture Item" subtitle="Rapid entry mode for live meetings" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Entry Type Selector Tabs */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Item Type</label>
          <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            {(['Requirement', 'Risk', 'Decision', 'Question', 'ActionItem'] as const).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setEntryType(type)}
                className={`py-1.5 rounded-md transition-all ${
                  entryType === type
                    ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type === 'ActionItem' ? 'Action' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Fields Based on Type */}
        {entryType === 'Requirement' && (
          <>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Requirement Description *</label>
              <textarea
                value={reqDesc}
                onChange={e => setReqDesc(e.target.value)}
                placeholder="e.g. System must lock inventory stock immediately upon cart checkout..."
                rows={3}
                required
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
                <input
                  type="text"
                  value={reqCategory}
                  onChange={e => setReqCategory(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Priority</label>
                <select
                  value={reqPriority}
                  onChange={e => setReqPriority(e.target.value as PriorityLevel)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Type</label>
                <select
                  value={reqType}
                  onChange={e => setReqType(e.target.value as RequirementType)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Functional">Functional</option>
                  <option value="Non-functional">Non-functional</option>
                  <option value="Business">Business</option>
                  <option value="Technical">Technical</option>
                  <option value="Compliance">Compliance</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
                <select
                  value={reqStatus}
                  onChange={e => setReqStatus(e.target.value as RequirementStatus)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Proposed">Proposed</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Owner / Lead</label>
              <input
                type="text"
                value={reqOwner}
                onChange={e => setReqOwner(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </>
        )}

        {entryType === 'Risk' && (
          <>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Risk Description *</label>
              <input
                type="text"
                value={riskDesc}
                onChange={e => setRiskDesc(e.target.value)}
                placeholder="e.g. Legacy ERP API speed limits could bottleneck checkouts..."
                required
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Severity</label>
                <select
                  value={riskSeverity}
                  onChange={e => setRiskSeverity(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Impact</label>
                <select
                  value={riskImpact}
                  onChange={e => setRiskImpact(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Probability</label>
                <select
                  value={riskProb}
                  onChange={e => setRiskProb(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Proposed Mitigation</label>
              <textarea
                value={riskMitigation}
                onChange={e => setRiskMitigation(e.target.value)}
                placeholder="e.g. Architect a Redis caching layer for stock queries..."
                rows={2}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </>
        )}

        {entryType === 'Decision' && (
          <>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Decision Made *</label>
              <input
                type="text"
                value={decDesc}
                onChange={e => setDecDesc(e.target.value)}
                placeholder="e.g. Adopt Tailwind CSS & React component architecture..."
                required
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Rationale</label>
              <textarea
                value={decRationale}
                onChange={e => setDecRationale(e.target.value)}
                placeholder="Why was this decision made?"
                rows={2}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Decision Maker</label>
                <input
                  type="text"
                  value={decMaker}
                  onChange={e => setDecMaker(e.target.value)}
                  placeholder="e.g. Sarah Jenkins & VP of IT"
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Impact Level</label>
                <select
                  value={decImpact}
                  onChange={e => setDecImpact(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </>
        )}

        {entryType === 'Question' && (
          <>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Question Raised *</label>
              <input
                type="text"
                value={qQuestion}
                onChange={e => setQQuestion(e.target.value)}
                placeholder="e.g. What are the specific compliance rules for Canadian shipping?"
                required
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Answer (if provided live)</label>
              <textarea
                value={qAnswer}
                onChange={e => setQAnswer(e.target.value)}
                placeholder="Leave empty if open question..."
                rows={2}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Asked By</label>
                <input
                  type="text"
                  value={qAskedBy}
                  onChange={e => setQAskedBy(e.target.value)}
                  placeholder="e.g. Michael Chang"
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
                <select
                  value={qStatus}
                  onChange={e => setQStatus(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                >
                  <option value="Open">Open</option>
                  <option value="Answered">Answered</option>
                  <option value="Follow-up Required">Follow-up Required</option>
                </select>
              </div>
            </div>
          </>
        )}

        {entryType === 'ActionItem' && (
          <>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Action Description *</label>
              <input
                type="text"
                value={actDesc}
                onChange={e => setActDesc(e.target.value)}
                placeholder="e.g. Send SAP API documentation to lead architect..."
                required
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Owner</label>
                <input
                  type="text"
                  value={actOwner}
                  onChange={e => setActOwner(e.target.value)}
                  placeholder="e.g. Michael Chang"
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={actDueDate}
                  onChange={e => setActDueDate(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Priority</label>
                <select
                  value={actPriority}
                  onChange={e => setActPriority(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-xs"
          >
            Save & Add Item
          </button>
        </div>
      </form>
    </Modal>
  );
};
