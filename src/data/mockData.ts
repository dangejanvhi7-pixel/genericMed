import { Medicine, MedicineCategory, PharmacyOffer } from '../types';

export const CATEGORIES: MedicineCategory[] = [
  'All',
  'Cardiovascular',
  'Diabetes',
  'Antibiotics',
  'Gastrointestinal',
  'Pain & Inflammation',
  'Respiratory',
  'Neurology'
];

export const PARTNER_PHARMACIES = [
  { id: 'ph-1', name: 'MedDirect Express', address: '42 Market St, Central', rating: 4.9, reviewCount: 820 },
  { id: 'ph-2', name: 'CarePlus Pharmacy', address: '180 Health Ave, North', rating: 4.8, reviewCount: 1240 },
  { id: 'ph-3', name: 'GreenCross Medical', address: '95 Oak Blvd, Westside', rating: 4.7, reviewCount: 650 },
  { id: 'ph-4', name: 'Apollo Discount Chemist', address: '12 Metro Plaza, South', rating: 4.8, reviewCount: 930 },
  { id: 'ph-5', name: 'Wellness Rx Hub', address: '500 University Rd', rating: 4.6, reviewCount: 410 },
];

export const MEDICINES_DATA: Medicine[] = [
  {
    id: 'med-1',
    name: 'Atorvastatin Calcium',
    brandNameEquivalent: 'Lipitor (Pfizer)',
    brandPrice: 86.50,
    genericLowestPrice: 6.80,
    activeIngredient: 'Atorvastatin (20mg)',
    strength: '20mg',
    dosageForm: 'Film-Coated Tablet',
    packSize: '30 Tablets (1 Month Pack)',
    category: 'Cardiovascular',
    manufacturer: 'Teva / Cipla Pharmaceuticals',
    bioequivalenceScore: 99.8,
    overallRating: 4.9,
    reviewCount: 1428,
    feedbackRankScore: 98,
    prescriptionRequired: true,
    description: 'Gold standard HMG-CoA reductase inhibitor (statin) used to lower bad LDL cholesterol and triglycerides, reducing heart attack risk.',
    usages: ['High Cholesterol', 'Coronary Artery Disease Prevention', 'Stroke Prevention'],
    sideEffects: ['Mild muscle aches (transient)', 'Digestive discomfort'],
    pharmacies: [
      {
        pharmacyId: 'ph-1',
        pharmacyName: 'MedDirect Express',
        distanceKm: 1.2,
        deliveryTime: '35 mins',
        rating: 4.9,
        reviewCount: 820,
        price: 6.80,
        originalPrice: 86.50,
        stockStatus: 'in_stock',
        isLowestPrice: true,
        isVerifiedPartner: true,
        address: '42 Market St, Central'
      },
      {
        pharmacyId: 'ph-2',
        pharmacyName: 'CarePlus Pharmacy',
        distanceKm: 2.8,
        deliveryTime: '45 mins',
        rating: 4.8,
        reviewCount: 1240,
        price: 7.50,
        originalPrice: 86.50,
        stockStatus: 'in_stock',
        isLowestPrice: false,
        isVerifiedPartner: true,
        address: '180 Health Ave, North'
      },
      {
        pharmacyId: 'ph-4',
        pharmacyName: 'Apollo Discount Chemist',
        distanceKm: 3.4,
        deliveryTime: '2 hours',
        rating: 4.8,
        reviewCount: 930,
        price: 8.20,
        originalPrice: 86.50,
        stockStatus: 'in_stock',
        isLowestPrice: false,
        isVerifiedPartner: true,
        address: '12 Metro Plaza, South'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Robert Vance, 58',
        rating: 5,
        date: '3 days ago',
        verifiedPurchase: true,
        comment: 'My cardiologist switched me from brand Lipitor to generic Atorvastatin. My LDL dropped by 42 points in 3 months—identical effect, but I save $80 every month!',
        conditionTreated: 'High Cholesterol',
        durationUsed: '6 months',
        efficacyRating: 5,
        sideEffectsReported: 'None'
      },
      {
        id: 'rev-2',
        userName: 'Evelyn Taylor, 64',
        rating: 5,
        date: '1 week ago',
        verifiedPurchase: true,
        comment: 'Purchased through MedDirect via genericMed. Delivery came in 30 minutes, tamper-proof seal, lab certification included.',
        conditionTreated: 'Cardiovascular care',
        durationUsed: '1 year+',
        efficacyRating: 5,
        sideEffectsReported: 'None'
      }
    ]
  },
  {
    id: 'med-2',
    name: 'Metformin Hydrochloride (ER)',
    brandNameEquivalent: 'Glucophage XR (Merck)',
    brandPrice: 62.00,
    genericLowestPrice: 4.50,
    activeIngredient: 'Metformin HCl Extended Release (500mg)',
    strength: '500mg',
    dosageForm: 'Extended Release Tablet',
    packSize: '60 Tablets (1 Month Pack)',
    category: 'Diabetes',
    manufacturer: 'Sun Pharma / Torrent',
    bioequivalenceScore: 99.6,
    overallRating: 4.8,
    reviewCount: 2150,
    feedbackRankScore: 96,
    prescriptionRequired: true,
    description: 'First-line biguanide antidiabetic medication that controls blood glucose levels by decreasing hepatic glucose production.',
    usages: ['Type 2 Diabetes Mellitus', 'Insulin Resistance', 'Prediabetes'],
    sideEffects: ['Mild nausea initially', 'Metallic taste (rare)'],
    pharmacies: [
      {
        pharmacyId: 'ph-3',
        pharmacyName: 'GreenCross Medical',
        distanceKm: 1.8,
        deliveryTime: '40 mins',
        rating: 4.7,
        reviewCount: 650,
        price: 4.50,
        originalPrice: 62.00,
        stockStatus: 'in_stock',
        isLowestPrice: true,
        isVerifiedPartner: true,
        address: '95 Oak Blvd, Westside'
      },
      {
        pharmacyId: 'ph-1',
        pharmacyName: 'MedDirect Express',
        distanceKm: 1.2,
        deliveryTime: '35 mins',
        rating: 4.9,
        reviewCount: 820,
        price: 5.10,
        originalPrice: 62.00,
        stockStatus: 'in_stock',
        isLowestPrice: false,
        isVerifiedPartner: true,
        address: '42 Market St, Central'
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        userName: 'David Chen, 52',
        rating: 5,
        date: '2 days ago',
        verifiedPurchase: true,
        comment: 'HbA1c remained stable at 6.2%. The extended release causes zero stomach upset. Huge savings over Glucophage.',
        conditionTreated: 'Type 2 Diabetes',
        durationUsed: '2 years',
        efficacyRating: 5,
        sideEffectsReported: 'None'
      }
    ]
  },
  {
    id: 'med-3',
    name: 'Amoxicillin & Clavulanate Potassium',
    brandNameEquivalent: 'Augmentin 625 (GSK)',
    brandPrice: 48.00,
    genericLowestPrice: 7.90,
    activeIngredient: 'Amoxicillin 500mg + Clavulanic Acid 125mg',
    strength: '625mg',
    dosageForm: 'Tablet',
    packSize: '14 Tablets (Complete Course)',
    category: 'Antibiotics',
    manufacturer: 'Alkem Laboratories / Sandoz',
    bioequivalenceScore: 99.2,
    overallRating: 4.7,
    reviewCount: 980,
    feedbackRankScore: 92,
    prescriptionRequired: true,
    description: 'Broad-spectrum penicillin antibiotic combined with beta-lactamase inhibitor to combat resistant bacterial infections.',
    usages: ['Bacterial Sinusitis', 'Respiratory Tract Infections', 'Dental Infections', 'Skin Infections'],
    sideEffects: ['Mild diarrhea', 'Take with meals to minimize stomach upset'],
    pharmacies: [
      {
        pharmacyId: 'ph-1',
        pharmacyName: 'MedDirect Express',
        distanceKm: 1.2,
        deliveryTime: '35 mins',
        rating: 4.9,
        reviewCount: 820,
        price: 7.90,
        originalPrice: 48.00,
        stockStatus: 'in_stock',
        isLowestPrice: true,
        isVerifiedPartner: true,
        address: '42 Market St, Central'
      },
      {
        pharmacyId: 'ph-4',
        pharmacyName: 'Apollo Discount Chemist',
        distanceKm: 3.4,
        deliveryTime: '2 hours',
        rating: 4.8,
        reviewCount: 930,
        price: 8.80,
        originalPrice: 48.00,
        stockStatus: 'in_stock',
        isLowestPrice: false,
        isVerifiedPartner: true,
        address: '12 Metro Plaza, South'
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        userName: 'Sarah Jenkins, 34',
        rating: 5,
        date: '5 days ago',
        verifiedPurchase: true,
        comment: 'Cured severe ear infection within 4 days. Exactly same active molecules as Augmentin for a fraction of cost.',
        conditionTreated: 'Ear & Throat Infection',
        durationUsed: '7 days course',
        efficacyRating: 5,
        sideEffectsReported: 'Mild'
      }
    ]
  },
  {
    id: 'med-4',
    name: 'Esomeprazole Magnesium',
    brandNameEquivalent: 'Nexium (AstraZeneca)',
    brandPrice: 74.00,
    genericLowestPrice: 5.90,
    activeIngredient: 'Esomeprazole (40mg)',
    strength: '40mg',
    dosageForm: 'Delayed-Release Capsule',
    packSize: '28 Capsules',
    category: 'Gastrointestinal',
    manufacturer: 'Lupin / Dr. Reddy\'s',
    bioequivalenceScore: 99.5,
    overallRating: 4.9,
    reviewCount: 1640,
    feedbackRankScore: 97,
    prescriptionRequired: false,
    description: 'Proton pump inhibitor (PPI) that decreases the amount of acid produced in the stomach, treating severe heartburn and GERD.',
    usages: ['Gastroesophageal Reflux Disease (GERD)', 'Acid Reflux', 'Peptic Ulcer Disease'],
    sideEffects: ['Headache (mild)', 'Dry mouth'],
    pharmacies: [
      {
        pharmacyId: 'ph-2',
        pharmacyName: 'CarePlus Pharmacy',
        distanceKm: 2.8,
        deliveryTime: '45 mins',
        rating: 4.8,
        reviewCount: 1240,
        price: 5.90,
        originalPrice: 74.00,
        stockStatus: 'in_stock',
        isLowestPrice: true,
        isVerifiedPartner: true,
        address: '180 Health Ave, North'
      },
      {
        pharmacyId: 'ph-5',
        pharmacyName: 'Wellness Rx Hub',
        distanceKm: 4.1,
        deliveryTime: '1 hour',
        rating: 4.6,
        reviewCount: 410,
        price: 6.40,
        originalPrice: 74.00,
        stockStatus: 'in_stock',
        isLowestPrice: false,
        isVerifiedPartner: true,
        address: '500 University Rd'
      }
    ],
    reviews: [
      {
        id: 'rev-5',
        userName: 'Michael Gomez, 47',
        rating: 5,
        date: '1 week ago',
        verifiedPurchase: true,
        comment: 'Immediate relief from severe nighttime reflux. Why pay $74 for the purple pill when the generic is $5.90?',
        conditionTreated: 'Severe Acid Reflux',
        durationUsed: '3 months',
        efficacyRating: 5,
        sideEffectsReported: 'None'
      }
    ]
  },
  {
    id: 'med-5',
    name: 'Montelukast Sodium',
    brandNameEquivalent: 'Singulair (Merck)',
    brandPrice: 89.00,
    genericLowestPrice: 8.50,
    activeIngredient: 'Montelukast Sodium (10mg)',
    strength: '10mg',
    dosageForm: 'Film-Coated Tablet',
    packSize: '30 Tablets',
    category: 'Respiratory',
    manufacturer: 'Glenmark Pharmaceuticals',
    bioequivalenceScore: 99.1,
    overallRating: 4.8,
    reviewCount: 1120,
    feedbackRankScore: 94,
    prescriptionRequired: true,
    description: 'Leukotriene receptor antagonist that blocks substances in the lungs causing asthma symptoms and allergic rhinitis.',
    usages: ['Chronic Asthma Maintenance', 'Seasonal Allergic Rhinitis', 'Exercise-Induced Bronchospasm'],
    sideEffects: ['Vivid dreams (infrequent)', 'Drowsiness'],
    pharmacies: [
      {
        pharmacyId: 'ph-1',
        pharmacyName: 'MedDirect Express',
        distanceKm: 1.2,
        deliveryTime: '35 mins',
        rating: 4.9,
        reviewCount: 820,
        price: 8.50,
        originalPrice: 89.00,
        stockStatus: 'in_stock',
        isLowestPrice: true,
        isVerifiedPartner: true,
        address: '42 Market St, Central'
      },
      {
        pharmacyId: 'ph-3',
        pharmacyName: 'GreenCross Medical',
        distanceKm: 1.8,
        deliveryTime: '40 mins',
        rating: 4.7,
        reviewCount: 650,
        price: 9.20,
        originalPrice: 89.00,
        stockStatus: 'in_stock',
        isLowestPrice: false,
        isVerifiedPartner: true,
        address: '95 Oak Blvd, Westside'
      }
    ],
    reviews: [
      {
        id: 'rev-6',
        userName: 'Clara Oswald, 29',
        rating: 5,
        date: '2 weeks ago',
        verifiedPurchase: true,
        comment: 'Keeps my seasonal allergies and tight chest completely calm during pollen season. Unbeatable price.',
        conditionTreated: 'Allergic Asthma',
        durationUsed: '8 months',
        efficacyRating: 5,
        sideEffectsReported: 'None'
      }
    ]
  },
  {
    id: 'med-6',
    name: 'Amlodipine Besylate',
    brandNameEquivalent: 'Norvasc (Pfizer)',
    brandPrice: 55.00,
    genericLowestPrice: 3.80,
    activeIngredient: 'Amlodipine Besylate (5mg)',
    strength: '5mg',
    dosageForm: 'Tablet',
    packSize: '30 Tablets',
    category: 'Cardiovascular',
    manufacturer: 'Cadila / Mylan',
    bioequivalenceScore: 99.7,
    overallRating: 4.9,
    reviewCount: 1890,
    feedbackRankScore: 97,
    prescriptionRequired: true,
    description: 'Long-acting calcium channel blocker that relaxes vascular smooth muscle, dilating coronary and peripheral arteries.',
    usages: ['Hypertension (High BP)', 'Angina Pectoris', 'Coronary Artery Disease'],
    sideEffects: ['Mild ankle swelling (monitor)', 'Flushing'],
    pharmacies: [
      {
        pharmacyId: 'ph-4',
        pharmacyName: 'Apollo Discount Chemist',
        distanceKm: 3.4,
        deliveryTime: '2 hours',
        rating: 4.8,
        reviewCount: 930,
        price: 3.80,
        originalPrice: 55.00,
        stockStatus: 'in_stock',
        isLowestPrice: true,
        isVerifiedPartner: true,
        address: '12 Metro Plaza, South'
      },
      {
        pharmacyId: 'ph-2',
        pharmacyName: 'CarePlus Pharmacy',
        distanceKm: 2.8,
        deliveryTime: '45 mins',
        rating: 4.8,
        reviewCount: 1240,
        price: 4.20,
        originalPrice: 55.00,
        stockStatus: 'in_stock',
        isLowestPrice: false,
        isVerifiedPartner: true,
        address: '180 Health Ave, North'
      }
    ],
    reviews: [
      {
        id: 'rev-7',
        userName: 'James Wilson, 61',
        rating: 5,
        date: '4 days ago',
        verifiedPurchase: true,
        comment: 'Blood pressure brought down to 118/76 with zero side effects. Norvasc was costing me $55/month!',
        conditionTreated: 'Hypertension',
        durationUsed: '1 year',
        efficacyRating: 5,
        sideEffectsReported: 'None'
      }
    ]
  },
  {
    id: 'med-7',
    name: 'Pregabalin',
    brandNameEquivalent: 'Lyrica (Pfizer)',
    brandPrice: 112.00,
    genericLowestPrice: 12.40,
    activeIngredient: 'Pregabalin (75mg)',
    strength: '75mg',
    dosageForm: 'Capsule',
    packSize: '30 Capsules',
    category: 'Neurology',
    manufacturer: 'Torrent Pharmaceuticals',
    bioequivalenceScore: 99.0,
    overallRating: 4.7,
    reviewCount: 750,
    feedbackRankScore: 91,
    prescriptionRequired: true,
    description: 'Neuropathic pain modulator binding to alpha-2-delta subunit of voltage-gated calcium channels in central nervous system.',
    usages: ['Diabetic Peripheral Neuropathy', 'Post-Herpetic Neuralgia', 'Fibromyalgia', 'Spinal Nerve Pain'],
    sideEffects: ['Dizziness when starting', 'Mild somnolence'],
    pharmacies: [
      {
        pharmacyId: 'ph-1',
        pharmacyName: 'MedDirect Express',
        distanceKm: 1.2,
        deliveryTime: '35 mins',
        rating: 4.9,
        reviewCount: 820,
        price: 12.40,
        originalPrice: 112.00,
        stockStatus: 'in_stock',
        isLowestPrice: true,
        isVerifiedPartner: true,
        address: '42 Market St, Central'
      }
    ],
    reviews: [
      {
        id: 'rev-8',
        userName: 'Patricia Moore, 67',
        rating: 5,
        date: '3 weeks ago',
        verifiedPurchase: true,
        comment: 'Relieved the agonizing burning sensation in my feet. Saves me almost $100 per refill.',
        conditionTreated: 'Diabetic Neuropathy',
        durationUsed: '4 months',
        efficacyRating: 5,
        sideEffectsReported: 'Mild'
      }
    ]
  },
  {
    id: 'med-8',
    name: 'Ibuprofen & Paracetamol Dual Action',
    brandNameEquivalent: 'Combiflam / Advil Dual',
    brandPrice: 18.50,
    genericLowestPrice: 2.20,
    activeIngredient: 'Ibuprofen 400mg + Paracetamol 325mg',
    strength: '400mg/325mg',
    dosageForm: 'Caplet',
    packSize: '20 Caplets',
    category: 'Pain & Inflammation',
    manufacturer: 'Sanofi / Micro Labs',
    bioequivalenceScore: 99.9,
    overallRating: 4.9,
    reviewCount: 3420,
    feedbackRankScore: 99,
    prescriptionRequired: false,
    description: 'Synergistic combination of NSAID anti-inflammatory and central antipyretic/analgesic for fast relief of acute pain and fever.',
    usages: ['Headaches & Migraines', 'Dental Pain', 'Muscle Soreness & Sprains', 'Fever Reduction'],
    sideEffects: ['Take after food to protect gastric lining'],
    pharmacies: [
      {
        pharmacyId: 'ph-1',
        pharmacyName: 'MedDirect Express',
        distanceKm: 1.2,
        deliveryTime: '35 mins',
        rating: 4.9,
        reviewCount: 820,
        price: 2.20,
        originalPrice: 18.50,
        stockStatus: 'in_stock',
        isLowestPrice: true,
        isVerifiedPartner: true,
        address: '42 Market St, Central'
      },
      {
        pharmacyId: 'ph-3',
        pharmacyName: 'GreenCross Medical',
        distanceKm: 1.8,
        deliveryTime: '40 mins',
        rating: 4.7,
        reviewCount: 650,
        price: 2.50,
        originalPrice: 18.50,
        stockStatus: 'in_stock',
        isLowestPrice: false,
        isVerifiedPartner: true,
        address: '95 Oak Blvd, Westside'
      }
    ],
    reviews: [
      {
        id: 'rev-9',
        userName: 'Marcus Sterling, 41',
        rating: 5,
        date: 'Yesterday',
        verifiedPurchase: true,
        comment: 'Instant relief from dental post-op pain. 10x cheaper than buying brand packs at the counter.',
        conditionTreated: 'Dental Pain',
        durationUsed: '3 days',
        efficacyRating: 5,
        sideEffectsReported: 'None'
      }
    ]
  }
];

export const SAMPLE_PRESCRIPTIONS = [
  {
    id: 'rx-1',
    doctor: 'Dr. Sarah Miller, MD (Cardiology)',
    clinic: 'Metropolitan Heart & Vascular Institute',
    date: 'Recent',
    items: [
      { brandName: 'Lipitor 20mg', genericMatchId: 'med-1' },
      { brandName: 'Norvasc 5mg', genericMatchId: 'med-6' },
    ],
    originalTotal: 141.50,
    genericTotal: 10.60,
    totalSavings: 130.90,
    savingsPercent: 92
  },
  {
    id: 'rx-2',
    doctor: 'Dr. Rajesh Patel, MD (Endocrinology)',
    clinic: 'Apex Diabetes & Metabolic Clinic',
    date: 'Recent',
    items: [
      { brandName: 'Glucophage XR 500mg', genericMatchId: 'med-2' },
      { brandName: 'Nexium 40mg', genericMatchId: 'med-4' },
    ],
    originalTotal: 136.00,
    genericTotal: 10.40,
    totalSavings: 125.60,
    savingsPercent: 92
  }
];
