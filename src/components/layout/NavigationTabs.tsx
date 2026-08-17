import React from 'react';
import {
  Building2,
  Target,
  ListChecks,
  DollarSign,
  Calendar,
  ShieldAlert,
  Sliders,
  AlertTriangle,
  HelpCircle,
  CheckCircle,
  ListTodo,
  FileText,
  Grid
} from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';

export const NavigationTabs: React.FC = () => {
  const { activeTab, setActiveTab, data } = useMeeting();

  const tabs = [
    { id: 'all', label: 'All Sections', icon: Grid, count: null },
    { id: 'client', label: 'Client Info', icon: Building2, count: null },
    { id: 'overview', label: 'Project Scope', icon: Target, count: null },
    { id: 'requirements', label: 'Requirements', icon: ListChecks, count: data.requirements.length },
    { id: 'budget', label: 'Budget', icon: DollarSign, count: null },
    { id: 'timeline', label: 'Timeline', icon: Calendar, count: data.timeline.milestones.length },
    { id: 'rules', label: 'Rules & Rules', icon: ShieldAlert, count: null },
    { id: 'preferences', label: 'Preferences', icon: Sliders, count: null },
    { id: 'risks', label: 'Risks', icon: AlertTriangle, count: data.risks.length },
    { id: 'questions', label: 'Questions', icon: HelpCircle, count: data.questions.length },
    { id: 'decisions', label: 'Decisions', icon: CheckCircle, count: data.decisions.length },
    { id: 'actions', label: 'Action Items', icon: ListTodo, count: data.actionItems.length },
    { id: 'notes', label: 'Notes', icon: FileText, count: null }
  ];

  return (
    <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 no-print">
      <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto custom-scrollbar py-2 text-xs font-medium">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-indigo-200 text-indigo-800' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
