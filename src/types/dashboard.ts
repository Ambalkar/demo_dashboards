export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type RequirementType = 'Functional' | 'Non-functional' | 'Business' | 'Technical' | 'Compliance';
export type RequirementStatus = 'Proposed' | 'Confirmed' | 'Pending' | 'Rejected';

export type WorkflowStage = 'pre-meeting' | 'live-meeting' | 'post-meeting';
export type ViewMode = 'full' | 'live-meeting';
export type HealthStatus = 'On Track' | 'Needs Attention' | 'At Risk';

export interface ClientInfo {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  projectName: string;
  meetingDate: string;
  meetingType: 'Discovery' | 'Requirement Gathering' | 'Scope Alignment' | 'Budget Review' | 'Final Sign-off';
  accountManager: string;
  meetingStatus: 'Scheduled' | 'In Progress' | 'Completed' | 'Follow-up Needed';
}

export interface ProjectOverview {
  businessObjective: string;
  problemStatement: string;
  projectBackground: string;
  expectedOutcome: string;
  successCriteria: string;
  projectScope: string;
  outOfScopeItems: string;
}

export interface RequirementItem {
  id: string;
  reqId: string;
  description: string;
  category: string;
  priority: PriorityLevel;
  type: RequirementType;
  status: RequirementStatus;
  notes: string;
  dependencies: string;
  owner: string;
  createdAt?: string;
}

export interface BudgetCommercials {
  estimatedBudget: number;
  minBudget: number;
  maxBudget: number;
  currency: string;
  pricingModel: 'Fixed Price' | 'Time & Materials' | 'Dedicated Team' | 'Milestone-based' | 'Retainer';
  paymentTerms: string;
  approvedBudget: number;
  budgetFlexibility: 'Strict' | 'Moderate' | 'Flexible';
  additionalNotes: string;
}

export interface MilestoneItem {
  id: string;
  title: string;
  targetDate: string;
  status: 'Upcoming' | 'In Progress' | 'Achieved' | 'Delayed';
  description: string;
}

export interface TimelineDeadlines {
  startDate: string;
  targetCompletionDate: string;
  milestones: MilestoneItem[];
  criticalDeadlines: string;
  clientAvailability: string;
  dependencies: string;
  deliveryExpectations: string;
}

export interface RulesConstraints {
  clientRules: string;
  industryRegulations: string;
  internalPolicies: string;
  technicalConstraints: string;
  legalCompliance: string;
  brandGuidelines: string;
  operationalConstraints: string;
  thingsNotToDo: string[];
  mandatoryItems: string[];
}

export interface ClientPreferences {
  preferredTechnologies: string[];
  designPreferences: string;
  communicationPreferences: string;
  preferredVendors: string;
  examplesReferences: string;
  dos: string[];
  donts: string[];
}

export interface RiskItem {
  id: string;
  risk: string;
  impact: 'High' | 'Medium' | 'Low';
  probability: 'High' | 'Medium' | 'Low';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  mitigation: string;
  owner: string;
  status: 'Identified' | 'Mitigated' | 'Monitoring' | 'Closed';
  createdAt?: string;
}

export interface QuestionItem {
  id: string;
  question: string;
  answer: string;
  askedBy: string;
  status: 'Open' | 'Answered' | 'Follow-up Required';
  followUpDate: string;
  createdAt?: string;
}

export interface DecisionItem {
  id: string;
  decision: string;
  date: string;
  rationale: string;
  decisionMaker: string;
  impact: 'High' | 'Medium' | 'Low';
  status: 'Proposed' | 'Approved' | 'Under Review' | 'Rejected';
  createdAt?: string;
}

export interface ActionItem {
  id: string;
  action: string;
  owner: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked';
  notes: string;
  createdAt?: string;
}

export interface MeetingNotes {
  mainNotes: string;
  quickScratchpad: string;
}

export interface QuickActivityLog {
  id: string;
  type: 'Requirement' | 'Risk' | 'Decision' | 'Question' | 'ActionItem' | 'Note';
  title: string;
  timestamp: string;
}

export interface MeetingData {
  clientInfo: ClientInfo;
  projectOverview: ProjectOverview;
  requirements: RequirementItem[];
  budget: BudgetCommercials;
  timeline: TimelineDeadlines;
  rulesConstraints: RulesConstraints;
  preferences: ClientPreferences;
  risks: RiskItem[];
  questions: QuestionItem[];
  decisions: DecisionItem[];
  actionItems: ActionItem[];
  notes: MeetingNotes;
  quickLog: QuickActivityLog[];
}
