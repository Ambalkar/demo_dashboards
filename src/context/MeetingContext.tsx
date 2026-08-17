import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type {
  MeetingData,
  WorkflowStage,
  ViewMode,
  ClientInfo,
  ProjectOverview,
  BudgetCommercials,
  TimelineDeadlines,
  RulesConstraints,
  ClientPreferences,
  MeetingNotes,
  RequirementItem,
  RiskItem,
  QuestionItem,
  DecisionItem,
  ActionItem,
  MilestoneItem,
  HealthStatus
} from '../types/dashboard';
import { INITIAL_SAMPLE_DATA } from '../data/sampleData';

const LOCAL_STORAGE_KEY = 'CLIENT_REQUIREMENT_ANALYSIS_DATA_V1';

interface MeetingContextType {
  data: MeetingData;
  stage: WorkflowStage;
  setStage: (stage: WorkflowStage) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Search & Filter
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterPriority: string;
  setFilterPriority: (priority: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterOwner: string;
  setFilterOwner: (owner: string) => void;

  // Auto save metadata
  isSaved: boolean;
  lastSavedTime: string;

  // Updaters for single structures
  updateClientInfo: (info: Partial<ClientInfo>) => void;
  updateProjectOverview: (overview: Partial<ProjectOverview>) => void;
  updateBudget: (budget: Partial<BudgetCommercials>) => void;
  updateTimeline: (timeline: Partial<TimelineDeadlines>) => void;
  updateRules: (rules: Partial<RulesConstraints>) => void;
  updatePreferences: (preferences: Partial<ClientPreferences>) => void;
  updateNotes: (notes: Partial<MeetingNotes>) => void;

  // CRUD for Dynamic Items
  addRequirement: (req: Omit<RequirementItem, 'id' | 'reqId' | 'createdAt'>) => void;
  updateRequirement: (id: string, req: Partial<RequirementItem>) => void;
  deleteRequirement: (id: string) => void;

  addRisk: (risk: Omit<RiskItem, 'id' | 'createdAt'>) => void;
  updateRisk: (id: string, risk: Partial<RiskItem>) => void;
  deleteRisk: (id: string) => void;

  addQuestion: (q: Omit<QuestionItem, 'id' | 'createdAt'>) => void;
  updateQuestion: (id: string, q: Partial<QuestionItem>) => void;
  deleteQuestion: (id: string) => void;

  addDecision: (dec: Omit<DecisionItem, 'id' | 'createdAt'>) => void;
  updateDecision: (id: string, dec: Partial<DecisionItem>) => void;
  deleteDecision: (id: string) => void;

  addActionItem: (act: Omit<ActionItem, 'id' | 'createdAt'>) => void;
  updateActionItem: (id: string, act: Partial<ActionItem>) => void;
  deleteActionItem: (id: string) => void;

  addMilestone: (ms: Omit<MilestoneItem, 'id'>) => void;
  updateMilestone: (id: string, ms: Partial<MilestoneItem>) => void;
  deleteMilestone: (id: string) => void;

  // Global Actions
  resetToSampleData: () => void;
  clearAllData: () => void;
  
  // Health & Metrics helper
  healthStatus: HealthStatus;
  completionPercentage: number;
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export const MeetingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<MeetingData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse localStorage data', e);
    }
    return INITIAL_SAMPLE_DATA;
  });

  const [stage, setStage] = useState<WorkflowStage>('live-meeting');
  const [viewMode, setViewMode] = useState<ViewMode>('full');
  const [activeTab, setActiveTab] = useState<string>('all');

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterOwner, setFilterOwner] = useState<string>('all');

  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [lastSavedTime, setLastSavedTime] = useState<string>(new Date().toLocaleTimeString());

  // Save to localStorage
  useEffect(() => {
    setIsSaved(false);
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        setIsSaved(true);
        setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [data]);

  const updateClientInfo = (info: Partial<ClientInfo>) => {
    setData(prev => ({ ...prev, clientInfo: { ...prev.clientInfo, ...info } }));
  };

  const updateProjectOverview = (overview: Partial<ProjectOverview>) => {
    setData(prev => ({ ...prev, projectOverview: { ...prev.projectOverview, ...overview } }));
  };

  const updateBudget = (budget: Partial<BudgetCommercials>) => {
    setData(prev => ({ ...prev, budget: { ...prev.budget, ...budget } }));
  };

  const updateTimeline = (timeline: Partial<TimelineDeadlines>) => {
    setData(prev => ({ ...prev, timeline: { ...prev.timeline, ...timeline } }));
  };

  const updateRules = (rules: Partial<RulesConstraints>) => {
    setData(prev => ({ ...prev, rulesConstraints: { ...prev.rulesConstraints, ...rules } }));
  };

  const updatePreferences = (preferences: Partial<ClientPreferences>) => {
    setData(prev => ({ ...prev, preferences: { ...prev.preferences, ...preferences } }));
  };

  const updateNotes = (notes: Partial<MeetingNotes>) => {
    setData(prev => ({ ...prev, notes: { ...prev.notes, ...notes } }));
  };

  const logActivity = (type: any, title: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const logItem = {
      id: `log-${Date.now()}`,
      type,
      title,
      timestamp
    };
    return logItem;
  };

  // Requirements CRUD
  const addRequirement = (req: Omit<RequirementItem, 'id' | 'reqId' | 'createdAt'>) => {
    const id = `req-${Date.now()}`;
    const count = data.requirements.length + 1;
    const reqId = `REQ-${count.toString().padStart(3, '0')}`;
    const createdAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newReq: RequirementItem = { ...req, id, reqId, createdAt };
    
    setData(prev => ({
      ...prev,
      requirements: [newReq, ...prev.requirements],
      quickLog: [logActivity('Requirement', `Added ${reqId}: ${req.description.slice(0, 35)}...`), ...prev.quickLog]
    }));
  };

  const updateRequirement = (id: string, req: Partial<RequirementItem>) => {
    setData(prev => ({
      ...prev,
      requirements: prev.requirements.map(item => (item.id === id ? { ...item, ...req } : item))
    }));
  };

  const deleteRequirement = (id: string) => {
    setData(prev => ({
      ...prev,
      requirements: prev.requirements.filter(item => item.id !== id)
    }));
  };

  // Risks CRUD
  const addRisk = (risk: Omit<RiskItem, 'id' | 'createdAt'>) => {
    const id = `risk-${Date.now()}`;
    const createdAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newRisk: RiskItem = { ...risk, id, createdAt };

    setData(prev => ({
      ...prev,
      risks: [newRisk, ...prev.risks],
      quickLog: [logActivity('Risk', `Identified Risk: ${risk.risk.slice(0, 35)}...`), ...prev.quickLog]
    }));
  };

  const updateRisk = (id: string, risk: Partial<RiskItem>) => {
    setData(prev => ({
      ...prev,
      risks: prev.risks.map(item => (item.id === id ? { ...item, ...risk } : item))
    }));
  };

  const deleteRisk = (id: string) => {
    setData(prev => ({
      ...prev,
      risks: prev.risks.filter(item => item.id !== id)
    }));
  };

  // Questions CRUD
  const addQuestion = (q: Omit<QuestionItem, 'id' | 'createdAt'>) => {
    const id = `q-${Date.now()}`;
    const createdAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newQ: QuestionItem = { ...q, id, createdAt };

    setData(prev => ({
      ...prev,
      questions: [newQ, ...prev.questions],
      quickLog: [logActivity('Question', `Raised Q: ${q.question.slice(0, 35)}...`), ...prev.quickLog]
    }));
  };

  const updateQuestion = (id: string, q: Partial<QuestionItem>) => {
    setData(prev => ({
      ...prev,
      questions: prev.questions.map(item => (item.id === id ? { ...item, ...q } : item))
    }));
  };

  const deleteQuestion = (id: string) => {
    setData(prev => ({
      ...prev,
      questions: prev.questions.filter(item => item.id !== id)
    }));
  };

  // Decisions CRUD
  const addDecision = (dec: Omit<DecisionItem, 'id' | 'createdAt'>) => {
    const id = `dec-${Date.now()}`;
    const createdAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newDec: DecisionItem = { ...dec, id, createdAt };

    setData(prev => ({
      ...prev,
      decisions: [newDec, ...prev.decisions],
      quickLog: [logActivity('Decision', `Logged Decision: ${dec.decision.slice(0, 35)}...`), ...prev.quickLog]
    }));
  };

  const updateDecision = (id: string, dec: Partial<DecisionItem>) => {
    setData(prev => ({
      ...prev,
      decisions: prev.decisions.map(item => (item.id === id ? { ...item, ...dec } : item))
    }));
  };

  const deleteDecision = (id: string) => {
    setData(prev => ({
      ...prev,
      decisions: prev.decisions.filter(item => item.id !== id)
    }));
  };

  // Action Items CRUD
  const addActionItem = (act: Omit<ActionItem, 'id' | 'createdAt'>) => {
    const id = `act-${Date.now()}`;
    const createdAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newAct: ActionItem = { ...act, id, createdAt };

    setData(prev => ({
      ...prev,
      actionItems: [newAct, ...prev.actionItems],
      quickLog: [logActivity('ActionItem', `Assigned Action: ${act.action.slice(0, 35)}...`), ...prev.quickLog]
    }));
  };

  const updateActionItem = (id: string, act: Partial<ActionItem>) => {
    setData(prev => ({
      ...prev,
      actionItems: prev.actionItems.map(item => (item.id === id ? { ...item, ...act } : item))
    }));
  };

  const deleteActionItem = (id: string) => {
    setData(prev => ({
      ...prev,
      actionItems: prev.actionItems.filter(item => item.id !== id)
    }));
  };

  // Milestones CRUD
  const addMilestone = (ms: Omit<MilestoneItem, 'id'>) => {
    const id = `ms-${Date.now()}`;
    const newMs: MilestoneItem = { ...ms, id };
    setData(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        milestones: [...prev.timeline.milestones, newMs]
      }
    }));
  };

  const updateMilestone = (id: string, ms: Partial<MilestoneItem>) => {
    setData(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        milestones: prev.timeline.milestones.map(item => (item.id === id ? { ...item, ...ms } : item))
      }
    }));
  };

  const deleteMilestone = (id: string) => {
    setData(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        milestones: prev.timeline.milestones.filter(item => item.id !== id)
      }
    }));
  };

  // Reset & Clear
  const resetToSampleData = () => {
    setData(INITIAL_SAMPLE_DATA);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_DATA));
  };

  const clearAllData = () => {
    const emptyData: MeetingData = {
      clientInfo: {
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        industry: '',
        projectName: '',
        meetingDate: new Date().toISOString().slice(0, 10),
        meetingType: 'Requirement Gathering',
        accountManager: '',
        meetingStatus: 'In Progress'
      },
      projectOverview: {
        businessObjective: '',
        problemStatement: '',
        projectBackground: '',
        expectedOutcome: '',
        successCriteria: '',
        projectScope: '',
        outOfScopeItems: ''
      },
      requirements: [],
      budget: {
        estimatedBudget: 0,
        minBudget: 0,
        maxBudget: 0,
        currency: 'USD',
        pricingModel: 'Fixed Price',
        paymentTerms: '',
        approvedBudget: 0,
        budgetFlexibility: 'Moderate',
        additionalNotes: ''
      },
      timeline: {
        startDate: '',
        targetCompletionDate: '',
        milestones: [],
        criticalDeadlines: '',
        clientAvailability: '',
        dependencies: '',
        deliveryExpectations: ''
      },
      rulesConstraints: {
        clientRules: '',
        industryRegulations: '',
        internalPolicies: '',
        technicalConstraints: '',
        legalCompliance: '',
        brandGuidelines: '',
        operationalConstraints: '',
        thingsNotToDo: [],
        mandatoryItems: []
      },
      preferences: {
        preferredTechnologies: [],
        designPreferences: '',
        communicationPreferences: '',
        preferredVendors: '',
        examplesReferences: '',
        dos: [],
        donts: []
      },
      risks: [],
      questions: [],
      decisions: [],
      actionItems: [],
      notes: { mainNotes: '', quickScratchpad: '' },
      quickLog: []
    };
    setData(emptyData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(emptyData));
  };

  // Metric Computations
  const criticalRisksCount = data.risks.filter(r => r.severity === 'Critical' || r.impact === 'High').length;
  const pendingReqsCount = data.requirements.filter(r => r.status === 'Pending' || r.status === 'Proposed').length;
  const unapprovedBudget = data.budget.approvedBudget === 0 && data.budget.estimatedBudget > 0;

  let healthStatus: HealthStatus = 'On Track';
  if (criticalRisksCount > 1 || pendingReqsCount > 4 || unapprovedBudget) {
    healthStatus = 'At Risk';
  } else if (criticalRisksCount === 1 || pendingReqsCount > 2) {
    healthStatus = 'Needs Attention';
  }

  // Calculate completion percentage
  let score = 0;
  let totalScore = 7;
  if (data.clientInfo.companyName.trim()) score++;
  if (data.projectOverview.businessObjective.trim()) score++;
  if (data.requirements.length > 0) score++;
  if (data.budget.estimatedBudget > 0) score++;
  if (data.timeline.targetCompletionDate.trim()) score++;
  if (data.decisions.length > 0) score++;
  if (data.actionItems.length > 0) score++;

  const completionPercentage = Math.round((score / totalScore) * 100);

  return (
    <MeetingContext.Provider
      value={{
        data,
        stage,
        setStage,
        viewMode,
        setViewMode,
        activeTab,
        setActiveTab,
        searchTerm,
        setSearchTerm,
        filterPriority,
        setFilterPriority,
        filterStatus,
        setFilterStatus,
        filterCategory,
        setFilterCategory,
        filterOwner,
        setFilterOwner,
        isSaved,
        lastSavedTime,
        updateClientInfo,
        updateProjectOverview,
        updateBudget,
        updateTimeline,
        updateRules,
        updatePreferences,
        updateNotes,
        addRequirement,
        updateRequirement,
        deleteRequirement,
        addRisk,
        updateRisk,
        deleteRisk,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        addDecision,
        updateDecision,
        deleteDecision,
        addActionItem,
        updateActionItem,
        deleteActionItem,
        addMilestone,
        updateMilestone,
        deleteMilestone,
        resetToSampleData,
        clearAllData,
        healthStatus,
        completionPercentage
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeeting = () => {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error('useMeeting must be used within a MeetingProvider');
  }
  return context;
};
