export type MedicineCategory = 
  | 'All'
  | 'Cardiovascular'
  | 'Diabetes'
  | 'Antibiotics'
  | 'Gastrointestinal'
  | 'Pain & Inflammation'
  | 'Respiratory'
  | 'Neurology';

export interface PharmacyOffer {
  pharmacyId: string;
  pharmacyName: string;
  distanceKm: number;
  deliveryTime: string; // e.g. "30 mins", "2 hours"
  rating: number; // e.g. 4.8
  reviewCount: number;
  price: number; // in USD
  originalPrice: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  isLowestPrice: boolean;
  isVerifiedPartner: boolean;
  address: string;
}

export interface MedicineReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  verifiedPurchase: boolean;
  comment: string;
  conditionTreated: string;
  durationUsed: string;
  efficacyRating: number; // 1-5
  sideEffectsReported: 'None' | 'Mild' | 'Moderate';
}

export interface Medicine {
  id: string;
  name: string; // Generic name, e.g. "Atorvastatin Calcium"
  brandNameEquivalent: string; // e.g. "Lipitor"
  brandPrice: number; // e.g. $85.00
  genericLowestPrice: number; // e.g. $7.20
  activeIngredient: string; // e.g. "Atorvastatin (20mg)"
  strength: string; // e.g. "20mg"
  dosageForm: string; // "Tablet", "Capsule", "Syrup"
  packSize: string; // e.g. "30 Tablets"
  category: MedicineCategory;
  manufacturer: string; // e.g. "Zydus Lifesciences / Teva"
  bioequivalenceScore: number; // e.g. 99.4%
  overallRating: number; // e.g. 4.8
  reviewCount: number;
  prescriptionRequired: boolean;
  description: string;
  usages: string[];
  sideEffects: string[];
  pharmacies: PharmacyOffer[];
  reviews: MedicineReview[];
  imageUrl?: string;
  feedbackRankScore: number; // 0-100 composite ranking
}

export interface CartItem {
  medicine: Medicine;
  selectedPharmacy: PharmacyOffer;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  totalAmount: number;
  totalSavings: number;
  status: 'Confirmed' | 'Pharmacy Verifying' | 'Packed' | 'Out for Delivery' | 'Delivered';
  deliveryAddress: string;
  estimatedDeliveryTime: string;
  pharmacyName: string;
}

export interface ScannedRxDrug {
  prescribedBrand: string;
  activeSalt: string;
  strength: string;
  brandEstimatedPrice: number;
  matchedGeneric: Medicine;
  savingsPercentage: number;
}
