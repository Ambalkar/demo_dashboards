import type { MeetingData } from '../types/dashboard';

export const INITIAL_SAMPLE_DATA: MeetingData = {
  clientInfo: {
    companyName: 'Apex Retail Logistics Inc.',
    contactPerson: 'Sarah Jenkins (VP of Digital Transformation)',
    email: 's.jenkins@apexlogistics.com',
    phone: '+1 (555) 382-9104',
    industry: 'Supply Chain & E-Commerce',
    projectName: 'Omnichannel B2B Fulfillment Portal',
    meetingDate: '2026-08-15',
    meetingType: 'Requirement Gathering',
    accountManager: 'David Vance (Senior Solutions Architect)',
    meetingStatus: 'In Progress'
  },
  projectOverview: {
    businessObjective: 'Streamline wholesale order management and provide 3PL clients with real-time inventory visibility, automated order routing, and AI-driven stock forecasting.',
    problemStatement: 'Current legacy ERP integration causes up to 4 hours of delay in sync, resulting in over-selling, manual phone/email support bottlenecks, and customer churn.',
    projectBackground: 'Apex operates 12 regional distribution hubs across North America. The current customer-facing portal was built 7 years ago on an unmaintained legacy stack.',
    expectedOutcome: 'Modern web & mobile-responsive portal handling 50,000 daily active orders with sub-second API sync and automated EDI invoice generation.',
    successCriteria: 'Order processing speed accelerated by 60%, stockout incidents reduced by 85%, and portal adoption reaching 90%+ within 90 days of launch.',
    projectScope: 'Customer portal dashboard, inventory search, custom pricing engine, ERP integration API adapter, warehouse webhooks, order tracking, and export analytics.',
    outOfScopeItems: 'Physical IoT hardware installation in regional warehouses, end-consumer B2C mobile apps, and legacy AS400 direct database refactoring (read via existing REST gateway).'
  },
  requirements: [
    {
      id: 'req-1',
      reqId: 'REQ-001',
      description: 'Real-time multi-warehouse inventory search with instant stock lock upon cart checkout.',
      category: 'Inventory Management',
      priority: 'Critical',
      type: 'Functional',
      status: 'Confirmed',
      notes: 'Must interface with SAP S/4HANA via Kafka event stream.',
      dependencies: 'ERP Gateway API v2.4',
      owner: 'Sarah Jenkins',
      createdAt: '2026-08-15 10:15'
    },
    {
      id: 'req-2',
      reqId: 'REQ-002',
      description: 'Role-Based Access Control (RBAC) supporting Enterprise Admin, Warehouse Manager, and Client Buyer personas.',
      category: 'Security & Auth',
      priority: 'High',
      type: 'Functional',
      status: 'Confirmed',
      notes: 'SAML 2.0 / Okta Single Sign-On integration mandatory.',
      dependencies: 'Client Identity Provider credentials',
      owner: 'Michael Chang (IT Director)',
      createdAt: '2026-08-15 10:22'
    },
    {
      id: 'req-3',
      reqId: 'REQ-003',
      description: 'Sub-500ms response time for global search queries across 200k SKUs under peak loading.',
      category: 'Performance',
      priority: 'Critical',
      type: 'Non-functional',
      status: 'Confirmed',
      notes: 'Requires Elasticsearch or Redis Caching cluster.',
      dependencies: 'Cloud Infrastructure Provisioning',
      owner: 'David Vance',
      createdAt: '2026-08-15 10:35'
    },
    {
      id: 'req-4',
      reqId: 'REQ-004',
      description: 'Automated PDF Invoice generation with custom customer tax exempt rules and net-30 terms.',
      category: 'Billing & Commercials',
      priority: 'Medium',
      type: 'Business',
      status: 'Proposed',
      notes: 'Awaiting finance sign-off on automated credit hold rules.',
      dependencies: 'Finance team policy document',
      owner: 'Elena Rostova (Finance Lead)',
      createdAt: '2026-08-15 10:48'
    },
    {
      id: 'req-5',
      reqId: 'REQ-005',
      description: 'SOC2 Type II compliance auditing log for all pricing modifications and bulk discount overrides.',
      category: 'Compliance',
      priority: 'High',
      type: 'Compliance',
      status: 'Confirmed',
      notes: 'Audit trails must be immutable and stored for 7 years.',
      dependencies: 'Security Compliance Framework',
      owner: 'Michael Chang',
      createdAt: '2026-08-15 11:05'
    },
    {
      id: 'req-6',
      reqId: 'REQ-006',
      description: 'Automated CSV/Excel bulk order upload supporting up to 5,000 rows with validation highlighting.',
      category: 'Order Management',
      priority: 'Medium',
      type: 'Functional',
      status: 'Pending',
      notes: 'Need sample customer spreadsheets for parser template definition.',
      dependencies: 'Client sample order sheets',
      owner: 'Sarah Jenkins',
      createdAt: '2026-08-15 11:20'
    }
  ],
  budget: {
    estimatedBudget: 185000,
    minBudget: 150000,
    maxBudget: 220000,
    currency: 'USD',
    pricingModel: 'Time & Materials',
    paymentTerms: '30% upfront, 40% mid-project milestone, 30% upon final UAT acceptance.',
    approvedBudget: 180000,
    budgetFlexibility: 'Moderate',
    additionalNotes: 'Additional $25,000 contingency reserve earmarked for potential custom SAP middleware connector if legacy API performance throttles.'
  },
  timeline: {
    startDate: '2026-09-01',
    targetCompletionDate: '2026-12-18',
    milestones: [
      {
        id: 'ms-1',
        title: 'Phase 1: Architecture & UI Prototype Sign-off',
        targetDate: '2026-09-25',
        status: 'Achieved',
        description: 'Design system, database schema, wireframes, and API contract specifications.'
      },
      {
        id: 'ms-2',
        title: 'Phase 2: Core Inventory & ERP Event Adapter',
        targetDate: '2026-10-30',
        status: 'In Progress',
        description: 'Real-time sync engine, Redis cache layer, and customer portal frontend.'
      },
      {
        id: 'ms-3',
        title: 'Phase 3: Billing, RBAC & SOC2 Logging',
        targetDate: '2026-11-20',
        status: 'Upcoming',
        description: 'Invoicing engine, Okta SSO integration, and security audit log.'
      },
      {
        id: 'ms-4',
        title: 'Phase 4: UAT, Penetration Testing & Production Launch',
        targetDate: '2026-12-18',
        status: 'Upcoming',
        description: 'End-to-end client UAT, load testing, and go-live deployment.'
      }
    ],
    criticalDeadlines: 'Black Friday readiness freeze mandated by November 20th, 2026.',
    clientAvailability: 'Weekly sprint reviews on Tuesdays at 10 AM EST; UAT leads available dedicated 5 hours/week.',
    dependencies: 'Okta SSO tenant provisioning by Sept 10; SAP Gateway test environment access by Sept 5.',
    deliveryExpectations: 'Bi-weekly staging deployments with automated test coverage reports (>80%).'
  },
  rulesConstraints: {
    clientRules: 'All cloud resources must reside within US-East AWS datacenter region.',
    industryRegulations: 'SOC2 Type II, HIPAA (for pharmaceutical shipments), and GDPR data privacy compliant.',
    internalPolicies: 'No third-party SaaS tools without IT Security Risk Assessment sign-off.',
    technicalConstraints: 'Must run on AWS EKS Kubernetes cluster; frontend built in React + TypeScript.',
    legalCompliance: 'All data at rest must be encrypted with AWS KMS customer-managed keys (AES-256).',
    brandGuidelines: 'Strict adherence to Apex Corporate Brand Book v3.2 (Slate #1E293B & Indigo #4F46E5).',
    operationalConstraints: 'Maintenance deployments allowed only during Sunday 02:00-04:00 EST maintenance window.',
    thingsNotToDo: [
      'Do NOT store plain-text credit card numbers or raw billing credentials in application database.',
      'Do NOT allow unauthenticated API endpoints for stock queries.',
      'Do NOT hardcode environment secrets or API keys in repository source.'
    ],
    mandatoryItems: [
      'Multi-factor Authentication (MFA) enforcement for all admin roles.',
      'Automated daily database snapshots with 30-day point-in-time recovery.',
      'Responsive design supporting mobile tablets used by warehouse staff.'
    ]
  },
  preferences: {
    preferredTechnologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    designPreferences: 'Sleek dark/light executive SaaS dashboard aesthetic, high contrast tables, quick keyboard shortcuts, minimum modal nesting.',
    communicationPreferences: 'Slack shared channel #proj-apex-portal for daily sync, Jira for task tracking, Email for formal milestone sign-offs.',
    preferredVendors: 'AWS for cloud hosting, Okta for Auth, Datadog for observability, Databricks for analytics.',
    examplesReferences: 'Flexport Customer Dashboard, Stripe Billing Console, Salesforce Commerce Cloud.',
    dos: [
      'Provide visual loading skeletons for tables.',
      'Include instant CSV export for every data grid.',
      'Add quick inline status editing for live meetings.'
    ],
    donts: [
      'Don’t use distracting auto-playing modal popups.',
      'Don’t hide critical error messages behind hover tooltips.',
      'Don’t require page refresh after editing dynamic items.'
    ]
  },
  risks: [
    {
      id: 'risk-1',
      risk: 'Legacy SAP S/4HANA REST API rate limits could bottleneck peak checkouts during sales events.',
      impact: 'High',
      probability: 'High',
      severity: 'Critical',
      mitigation: 'Implement Redis caching layer and asynchronous queue worker (BullMQ / AWS SQS) for order staging.',
      owner: 'David Vance',
      status: 'Monitoring',
      createdAt: '2026-08-15 10:40'
    },
    {
      id: 'risk-2',
      risk: 'Delay in client security team approving Okta OAuth scopes for multi-tenant access.',
      impact: 'Medium',
      probability: 'Medium',
      severity: 'Medium',
      mitigation: 'Set up temporary Auth0 fallback tenant for development sprint testing.',
      owner: 'Michael Chang',
      status: 'Identified',
      createdAt: '2026-08-15 11:10'
    },
    {
      id: 'risk-3',
      risk: 'Scope creep regarding automated custom tax calculation engine for multi-state shipping.',
      impact: 'High',
      probability: 'Medium',
      severity: 'High',
      mitigation: 'Utilize TaxJar / Avalara REST integration rather than building custom tax rules engine.',
      owner: 'Elena Rostova',
      status: 'Mitigated',
      createdAt: '2026-08-15 11:30'
    }
  ],
  questions: [
    {
      id: 'q-1',
      question: 'Will Apex provide dedicated staging credentials for the SAP integration environment by Sept 5?',
      answer: 'Yes, IT lead confirmed access will be granted during next Monday setup window.',
      askedBy: 'David Vance',
      status: 'Answered',
      followUpDate: '2026-08-20',
      createdAt: '2026-08-15 10:25'
    },
    {
      id: 'q-2',
      question: 'What are the exact custom invoice field rules required for international cross-border shipments to Canada?',
      answer: 'Awaiting documentation from Apex international logistics counsel.',
      askedBy: 'Elena Rostova',
      status: 'Follow-up Required',
      followUpDate: '2026-08-22',
      createdAt: '2026-08-15 11:15'
    },
    {
      id: 'q-3',
      question: 'Does the portal need to support multi-language localizations (Spanish / French) in Phase 1?',
      answer: 'Phase 1 is English-only; multi-language is deferred to Phase 2 roadmap.',
      askedBy: 'Sarah Jenkins',
      status: 'Answered',
      followUpDate: '2026-09-01',
      createdAt: '2026-08-15 11:45'
    }
  ],
  decisions: [
    {
      id: 'dec-1',
      decision: 'Adopt Tailwind CSS and React Component Architecture for frontend UI design system.',
      date: '2026-08-15',
      rationale: 'Faster development cycle, standardized design tokens, and clean responsive layout control.',
      decisionMaker: 'David Vance & Sarah Jenkins',
      impact: 'High',
      status: 'Approved',
      createdAt: '2026-08-15 10:30'
    },
    {
      id: 'dec-2',
      decision: 'De-scope direct hardware handheld scanner Bluetooth pairing from web portal.',
      date: '2026-08-15',
      rationale: 'Warehouse staff utilize native Android rugged hardware; web app will consume barcode data via standard USB/keyboard emulated inputs.',
      decisionMaker: 'Michael Chang',
      impact: 'Medium',
      status: 'Approved',
      createdAt: '2026-08-15 11:00'
    }
  ],
  actionItems: [
    {
      id: 'act-1',
      action: 'Send SAP API OpenAPI 3.0 specification docs to vendor architecture team.',
      owner: 'Michael Chang',
      dueDate: '2026-08-18',
      priority: 'High',
      status: 'In Progress',
      notes: 'Security scrub of API keys required before external sharing.',
      createdAt: '2026-08-15 10:50'
    },
    {
      id: 'act-2',
      action: 'Finalize Statement of Work (SOW) milestone payment schedule with legal.',
      owner: 'Sarah Jenkins',
      dueDate: '2026-08-22',
      priority: 'High',
      status: 'Not Started',
      notes: 'Align with 30/40/30 payment structure agreed in discovery.',
      createdAt: '2026-08-15 11:35'
    },
    {
      id: 'act-3',
      action: 'Set up weekly recurring Zoom steering committee meeting invite.',
      owner: 'David Vance',
      dueDate: '2026-08-16',
      priority: 'Medium',
      status: 'Completed',
      notes: 'Tuesdays 10:00 AM EST recurring calendar event created.',
      createdAt: '2026-08-15 11:50'
    }
  ],
  notes: {
    mainNotes: `### Discovery Session Key Takeaways
- Client is very enthusiastic about replacing the legacy portal before Q4 peak shopping volume.
- Key stakeholder alignment: Sarah Jenkins driving business requirements, Michael Chang handling IT/Security, Elena Rostova overseeing invoicing & commercial logic.
- Biggest technical risk is SAP S/4HANA event bus throttling; we will architect a Redis buffer to decouple checkout from synchronous ERP writes.
- UX preference is modern, clean, with dark sidebar and light high-contrast workspace tables. Fast keyboard input and minimal multi-click wizards preferred.`,
    quickScratchpad: 'Check with Sarah on Avalara API license key. Confirm Okta sandbox admin email address by Friday.'
  },
  quickLog: [
    { id: 'log-1', type: 'Requirement', title: 'Added REQ-001 Real-time multi-warehouse inventory search', timestamp: '10:15 AM' },
    { id: 'log-2', type: 'Question', title: 'Raised Q-1 regarding SAP staging credentials access', timestamp: '10:25 AM' },
    { id: 'log-3', type: 'Decision', title: 'Approved Tailwind CSS React UI Architecture', timestamp: '10:30 AM' },
    { id: 'log-4', type: 'Risk', title: 'Identified Risk-1 Legacy SAP REST rate limits', timestamp: '10:40 AM' },
    { id: 'log-5', type: 'ActionItem', title: 'Assigned Act-1 Send SAP API docs to Michael Chang', timestamp: '10:50 AM' }
  ]
};
