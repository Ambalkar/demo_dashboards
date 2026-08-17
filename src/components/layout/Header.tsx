import React, { useState } from 'react';
import {
  Briefcase,
  Play,
  FileText,
  Zap,
  Download,
  Printer,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { WorkflowStage } from '../../types/dashboard';

export const Header: React.FC = () => {
  const {
    data,
    stage,
    setStage,
    viewMode,
    setViewMode,
    isSaved,
    lastSavedTime,
    resetToSampleData,
    clearAllData,
    healthStatus
  } = useMeeting();

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  // Helper for exporting meeting data to CSV
  const handleExportCSV = () => {
    const csvRows: string[] = [];

    // Client metadata
    csvRows.push(`CLIENT REQUIREMENT ANALYSIS REPORT`);
    csvRows.push(`Company,${data.clientInfo.companyName}`);
    csvRows.push(`Project,${data.clientInfo.projectName}`);
    csvRows.push(`Contact,${data.clientInfo.contactPerson}`);
    csvRows.push(`Date,${data.clientInfo.meetingDate}`);
    csvRows.push(``);

    // Requirements section
    csvRows.push(`REQUIREMENTS`);
    csvRows.push(`Req ID,Description,Category,Priority,Type,Status,Owner`);
    data.requirements.forEach(r => {
      csvRows.push(`"${r.reqId}","${r.description.replace(/"/g, '""')}","${r.category}","${r.priority}","${r.type}","${r.status}","${r.owner}"`);
    });
    csvRows.push(``);

    // Risks section
    csvRows.push(`RISKS & CONCERNS`);
    csvRows.push(`Risk,Severity,Impact,Probability,Mitigation,Owner`);
    data.risks.forEach(r => {
      csvRows.push(`"${r.risk.replace(/"/g, '""')}","${r.severity}","${r.impact}","${r.probability}","${r.mitigation.replace(/"/g, '""')}","${r.owner}"`);
    });
    csvRows.push(``);

    // Action items
    csvRows.push(`ACTION ITEMS`);
    csvRows.push(`Action,Owner,Due Date,Priority,Status`);
    data.actionItems.forEach(a => {
      csvRows.push(`"${a.action.replace(/"/g, '""')}","${a.owner}","${a.dueDate}","${a.priority}","${a.status}"`);
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `${data.clientInfo.companyName.replace(/\s+/g, '_')}_Requirement_Analysis.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Brand & Client Title */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-xs shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-slate-900 leading-snug">
                    {data.clientInfo.projectName || 'Client Requirement Workspace'}
                  </h1>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                    B2B SaaS Studio
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                  <span className="font-semibold text-slate-700">{data.clientInfo.companyName || 'Apex Logistics'}</span>
                  <span>•</span>
                  <span>{data.clientInfo.meetingType}</span>
                  <span>•</span>
                  <span>{data.clientInfo.meetingDate}</span>
                </p>
              </div>
            </div>

            {/* Stage Selector Pills */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setStage('pre-meeting')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  stage === 'pre-meeting'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Pre-Meeting
              </button>
              <button
                onClick={() => setStage('live-meeting')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  stage === 'live-meeting'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Live Discovery
              </button>
              <button
                onClick={() => setStage('post-meeting')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  stage === 'post-meeting'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Post-Meeting Summary
              </button>
            </div>

            {/* Quick Actions & Status */}
            <div className="flex items-center gap-2">
              {/* Auto Save Pill */}
              <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Saved {lastSavedTime}</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span>Saving...</span>
                  </>
                )}
              </div>

              {/* View Mode Toggle */}
              <button
                onClick={() => setViewMode(viewMode === 'full' ? 'live-meeting' : 'full')}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  viewMode === 'live-meeting'
                    ? 'bg-amber-50 text-amber-800 border-amber-300 font-semibold'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
                title="Toggle Live Rapid Mode"
              >
                <Zap className={`w-3.5 h-3.5 ${viewMode === 'live-meeting' ? 'text-amber-600 fill-current' : 'text-slate-500'}`} />
                {viewMode === 'live-meeting' ? 'Live Mode Active' : 'Live Focus Mode'}
              </button>

              {/* Export CSV */}
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                title="Export CSV"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden md:inline">CSV</span>
              </button>

              {/* Print / Export PDF */}
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                title="Print / Export PDF"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden md:inline">Print / PDF</span>
              </button>

              {/* Reset to Sample Data */}
              <button
                onClick={() => setIsResetConfirmOpen(true)}
                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Reset to Sample Data"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={resetToSampleData}
        title="Reset Meeting Data"
        message="This will overwrite current requirements, risks, decisions, and action items with the pre-populated sample discovery dataset. Continue?"
        confirmText="Reset to Sample Data"
      />
    </>
  );
};
