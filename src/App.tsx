import React from 'react';
import { MeetingProvider, useMeeting } from './context/MeetingContext';
import { Header } from './components/layout/Header';
import { KpiSummaryBar } from './components/layout/KpiSummaryBar';
import { NavigationTabs } from './components/layout/NavigationTabs';
import { PreMeetingView } from './components/workflow/PreMeetingView';
import { LiveMeetingMode } from './components/workflow/LiveMeetingMode';
import { PostMeetingSummary } from './components/workflow/PostMeetingSummary';

import { ClientInfoSection } from './components/sections/ClientInfoSection';
import { ProjectOverviewSection } from './components/sections/ProjectOverviewSection';
import { RequirementsSection } from './components/sections/RequirementsSection';
import { BudgetSection } from './components/sections/BudgetSection';
import { TimelineSection } from './components/sections/TimelineSection';
import { RulesConstraintsSection } from './components/sections/RulesConstraintsSection';
import { PreferencesSection } from './components/sections/PreferencesSection';
import { RisksSection } from './components/sections/RisksSection';
import { QuestionsSection } from './components/sections/QuestionsSection';
import { DecisionsSection } from './components/sections/DecisionsSection';
import { ActionItemsSection } from './components/sections/ActionItemsSection';
import { NotesSection } from './components/sections/NotesSection';

const MainContent: React.FC = () => {
  const { stage, viewMode, activeTab } = useMeeting();

  if (stage === 'pre-meeting') {
    return <PreMeetingView />;
  }

  if (stage === 'post-meeting') {
    return <PostMeetingSummary />;
  }

  // Live Discovery Stage
  if (viewMode === 'live-meeting') {
    return <LiveMeetingMode />;
  }

  return (
    <>
      <NavigationTabs />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {activeTab === 'all' && (
          <>
            <ClientInfoSection />
            <ProjectOverviewSection />
            <RequirementsSection />
            <BudgetSection />
            <TimelineSection />
            <RulesConstraintsSection />
            <PreferencesSection />
            <RisksSection />
            <QuestionsSection />
            <DecisionsSection />
            <ActionItemsSection />
            <NotesSection />
          </>
        )}

        {activeTab === 'client' && <ClientInfoSection />}
        {activeTab === 'overview' && <ProjectOverviewSection />}
        {activeTab === 'requirements' && <RequirementsSection />}
        {activeTab === 'budget' && <BudgetSection />}
        {activeTab === 'timeline' && <TimelineSection />}
        {activeTab === 'rules' && <RulesConstraintsSection />}
        {activeTab === 'preferences' && <PreferencesSection />}
        {activeTab === 'risks' && <RisksSection />}
        {activeTab === 'questions' && <QuestionsSection />}
        {activeTab === 'decisions' && <DecisionsSection />}
        {activeTab === 'actions' && <ActionItemsSection />}
        {activeTab === 'notes' && <NotesSection />}
      </main>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <MeetingProvider>
      <div className="min-h-screen bg-slate-100/70 text-slate-900 pb-12 flex flex-col font-sans">
        <Header />
        <KpiSummaryBar />
        <MainContent />
      </div>
    </MeetingProvider>
  );
};

export default App;
