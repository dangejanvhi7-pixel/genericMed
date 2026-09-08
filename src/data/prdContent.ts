export interface PrdSection {
  id: string;
  number: number;
  title: string;
  summary: string;
  details: string[];
  tables?: {
    headers: string[];
    rows: string[][];
  };
}

export const PRD_DOCUMENT: PrdSection[] = [
  {
    id: 'doc-control',
    number: 1,
    title: 'Document Control & Stakeholders',
    summary: 'Executive document control, revision history, and product stakeholder matrix for genericMed.',
    details: [
      'Product Name: genericMed (Mobile Frontend Application)',
      'Version: 1.0.0-MVP | Status: Approved for Engineering Implementation',
      'Document Owner: Senior Product Manager & Clinical Healthtech Architect',
      'Target Audience: Engineering, UI/UX, QA, Medical Partners, Compliance, Investors'
    ],
    tables: {
      headers: ['Role', 'Responsibility', 'Sign-off'],
      rows: [
        ['Lead Product Manager', 'Feature specs, prioritization, pricing model', 'Approved'],
        ['Engineering Lead', 'Mobile architecture, APIs, latency SLAs', 'Approved'],
        ['Head of Clinical Pharmacy', 'Bioequivalence validation, regulatory safety', 'Approved'],
        ['Chief Compliance Officer', 'Prescription validation, medical licensing', 'Approved']
      ]
    }
  },
  {
    id: 'vision',
    number: 2,
    title: 'Introduction & Product Vision',
    summary: 'Democratizing healthcare affordability by eliminating brand-name drug markup.',
    details: [
      'Purpose: Bridging the massive price disparity between expensive branded drugs and certified generic equivalents.',
      'Product Vision: Become the most trusted generic medicine marketplace where every patient easily discovers identical molecular equivalents at guaranteed lowest local pharmacy prices.',
      'Product Summary: An online mobile generic medicine marketplace comparing prices across certified pharmacies, highlighting lowest cost, and ranking drugs on verified clinical efficacy & feedback.'
    ]
  },
  {
    id: 'problem',
    number: 3,
    title: 'Problem Statement & Market Context',
    summary: 'Patients overpay 70%–90% for identical active pharmaceutical ingredients due to information asymmetry.',
    details: [
      'Customer Pain Point: Patients with chronic conditions (hypertension, diabetes, cholesterol) spend hundreds monthly on branded medicines without knowing bioequivalent generics exist for 1/10th the cost.',
      'Pharmacy Pain Point: Local pharmacies struggle against mega-chains; genericMed connects them to high-intent local orders via fair commission.',
      'Information Asymmetry: Customers lack confidence in generic safety without verified reviews, bioequivalence scores, and transparent store comparisons.'
    ]
  },
  {
    id: 'goals',
    number: 4,
    title: 'Goals, Objectives & Non-Goals',
    summary: 'Clear business & product goals with strict release boundaries.',
    details: [
      'Business Goal 1: Enable average user basket savings of 75%+ versus brand MRP.',
      'Business Goal 2: Onboard 50+ certified local medical stores per metro cluster.',
      'Product Goal: 3-tap discovery from brand search to lowest-priced generic checkout.',
      'Non-Goal for MVP: Manufacturing own drugs; physical distribution fleets (fulfilled by partner pharmacies).'
    ]
  },
  {
    id: 'metrics',
    number: 5,
    title: 'Success Metrics & KPIs',
    summary: 'North Star: Total Dollars Saved by Patients on Generic Prescriptions.',
    details: [
      'North Star Metric: Cumulative Patient Savings ($) delivered via generic substitutions.',
      'Acquisition: Cost per app install < $1.40; organic referral share > 35%.',
      'Activation: Search-to-Generic-Comparison rate > 72%.',
      'Conversion: Rx upload to completed order conversion > 38%.',
      'Guardrail Metric: Prescription rejection / medication mismatch error rate must remain < 0.05%.'
    ]
  },
  {
    id: 'functional-reqs',
    number: 9,
    title: 'Core Functional Requirements',
    summary: 'P0 & P1 functional specifications with acceptance criteria.',
    details: [
      'FR-CORE-01 (P0): Brand-to-Generic Equivalent Matcher with bioequivalence rating.',
      'FR-PRICE-01 (P0): Multi-Pharmacy Price Comparison displaying Lowest Guaranteed Price badge.',
      'FR-SORT-01 (P0): Sorting by Price (Lowest first), Savings %, Delivery Speed, and Feedback Rank.',
      'FR-RANK-01 (P0): Medicine Ranking based on verified patient reviews and clinical efficacy.',
      'FR-RX-01 (P0): Prescription scanner with automated drug extraction and generic replacement cart.',
      'FR-ORD-01 (P0): Transparent checkout with local pharmacy order routing and status tracker.'
    ],
    tables: {
      headers: ['ID', 'Requirement', 'Priority', 'Acceptance Criteria'],
      rows: [
        ['FR-CORE-01', 'Generic Equivalent Lookup', 'P0', 'User typing brand (e.g. Lipitor) sees generic (Atorvastatin) with active salt and strength within < 200ms.'],
        ['FR-PRICE-01', 'Lowest Price Aggregation', 'P0', 'System queries all licensed local pharmacies and highlights the lowest unit price prominently.'],
        ['FR-RANK-01', 'Feedback-based Ranking', 'P0', 'Medicines are scored 0-100 combining verified patient ratings, bioequivalence, and side-effect tolerability.'],
        ['FR-RX-01', 'Prescription OCR Matching', 'P1', 'Prescription upload automatically identifies drugs and calculates basket savings before checkout.']
      ]
    }
  },
  {
    id: 'edge-cases',
    number: 10,
    title: 'Edge Cases & Exception Handling',
    summary: 'Critical failure modes, prescription rejections, and pharmacy stockouts.',
    details: [
      'Out of Stock: If lowest-price pharmacy runs out of stock, auto-failover to next lowest verified pharmacy with explicit user notification.',
      'Prescription Mismatch: If doctor prescribed a controlled non-substitutable molecule, display legal warning requiring explicit doctor authorization.',
      'Network Disconnection: Cache cart items in localStorage for seamless offline-to-online recovery.'
    ]
  },
  {
    id: 'roadmap',
    number: 19,
    title: 'Release Plan & Roadmap',
    summary: 'Phased rollout from MVP to nationwide generic ecosystem.',
    details: [
      'Phase 1 (Current MVP): Price comparison engine, brand-generic matcher, feedback ranking, prescription savings calculator, order simulation.',
      'Phase 2 (Trust & Growth): Live pharmacy inventory integration, instant digital doctor prescription consultation.',
      'Phase 3 (Scale & Optimization): Chronic refill auto-delivery subscription, insurance co-pay auto-deduction.'
    ]
  }
];
