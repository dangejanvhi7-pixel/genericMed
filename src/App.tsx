import React, { useState, useMemo } from 'react';
import { Medicine, MedicineCategory, PharmacyOffer, CartItem, Order } from './types';
import { MEDICINES_DATA } from './data/mockData';
import { MobileFrame } from './components/MobileFrame';
import { AppHeader } from './components/AppHeader';
import { BottomNav, TabType } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { CompareTab } from './components/CompareTab';
import { RxScannerTab } from './components/RxScannerTab';
import { OrdersTab } from './components/OrdersTab';
import { ProfileTab } from './components/ProfileTab';
import { PartnerStoreView } from './components/PartnerStoreView';
import { MedicineDetailModal } from './components/MedicineDetailModal';
import { CartCheckoutModal } from './components/CartCheckoutModal';
import { PrdViewerModal } from './components/PrdViewerModal';

export default function App() {
  const [medicines, setMedicines] = useState<Medicine[]>(MEDICINES_DATA);
  const [selectedCategory, setSelectedCategory] = useState<MedicineCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'price' | 'savings' | 'rating' | 'fastest'>('price');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeRole, setActiveRole] = useState<'customer' | 'partner'>('customer');

  // Modals
  const [selectedMedicineForModal, setSelectedMedicineForModal] = useState<Medicine | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isPrdOpen, setIsPrdOpen] = useState<boolean>(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      medicine: MEDICINES_DATA[0], // Atorvastatin
      selectedPharmacy: MEDICINES_DATA[0].pharmacies[0],
      quantity: 1
    }
  ]);

  // Initial order history
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'GM-829104',
      createdAt: 'Yesterday, 3:15 PM',
      items: [
        {
          medicine: MEDICINES_DATA[1], // Metformin
          selectedPharmacy: MEDICINES_DATA[1].pharmacies[0],
          quantity: 1
        },
        {
          medicine: MEDICINES_DATA[3], // Esomeprazole
          selectedPharmacy: MEDICINES_DATA[3].pharmacies[0],
          quantity: 1
        }
      ],
      totalAmount: 10.40,
      totalSavings: 125.60,
      status: 'Delivered',
      deliveryAddress: '742 Evergreen Terrace, Apt 4B, New York, NY',
      estimatedDeliveryTime: 'Delivered',
      pharmacyName: 'MedDirect Express'
    }
  ]);

  // Filter and sort medicines
  const filteredAndSortedMedicines = useMemo(() => {
    let result = [...medicines];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(m => m.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.name.toLowerCase().includes(q) ||
        m.brandNameEquivalent.toLowerCase().includes(q) ||
        m.activeIngredient.toLowerCase().includes(q) ||
        m.usages.some(u => u.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      const lowestA = Math.min(...a.pharmacies.map(p => p.price));
      const lowestB = Math.min(...b.pharmacies.map(p => p.price));
      const savingsA = a.brandPrice - lowestA;
      const savingsB = b.brandPrice - lowestB;
      const savingsPctA = savingsA / a.brandPrice;
      const savingsPctB = savingsB / b.brandPrice;

      if (sortBy === 'price') {
        return lowestA - lowestB;
      }
      if (sortBy === 'savings') {
        return savingsPctB - savingsPctA;
      }
      if (sortBy === 'rating') {
        return b.feedbackRankScore - a.feedbackRankScore;
      }
      if (sortBy === 'fastest') {
        const timeA = parseInt(a.pharmacies[0]?.deliveryTime || '60', 10);
        const timeB = parseInt(b.pharmacies[0]?.deliveryTime || '60', 10);
        return timeA - timeB;
      }
      return 0;
    });

    return result;
  }, [medicines, selectedCategory, searchQuery, sortBy]);

  // Cart operations
  const handleAddToCart = (medicine: Medicine, pharmacy: PharmacyOffer, quantity: number) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.medicine.id === medicine.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        updated[existingIdx].selectedPharmacy = pharmacy;
        return updated;
      }
      return [...prev, { medicine, selectedPharmacy: pharmacy, quantity }];
    });
  };

  const handleQuickAddToCart = (medicine: Medicine, pharmacy: PharmacyOffer) => {
    handleAddToCart(medicine, pharmacy, 1);
    setIsCartOpen(true);
  };

  const handleAddMultipleToCart = (items: { medicine: Medicine; pharmacy: PharmacyOffer; quantity: number }[]) => {
    setCartItems(prev => {
      const updated = [...prev];
      items.forEach(newItem => {
        const existingIdx = updated.findIndex(item => item.medicine.id === newItem.medicine.id);
        if (existingIdx > -1) {
          updated[existingIdx].quantity += newItem.quantity;
        } else {
          updated.push(newItem);
        }
      });
      return updated;
    });
  };

  const handleUpdateQuantity = (medicineId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.medicine.id === medicineId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const handleRemoveItem = (medicineId: string) => {
    setCartItems(prev => prev.filter(item => item.medicine.id !== medicineId));
  };

  const handlePlaceOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
  };

  // Partner store price updates (dynamic marketplace recalculation)
  const handleUpdatePharmacyPrice = (medId: string, newPrice: number) => {
    setMedicines(prev => prev.map(med => {
      if (med.id !== medId) return med;
      const updatedPharmacies = med.pharmacies.map(p => {
        if (p.pharmacyName === 'MedDirect Express') {
          return { ...p, price: newPrice };
        }
        return p;
      });
      // Recalculate which pharmacy is lowest
      const minPrice = Math.min(...updatedPharmacies.map(p => p.price));
      const withLowestFlag = updatedPharmacies.map(p => ({
        ...p,
        isLowestPrice: p.price === minPrice
      }));
      return {
        ...med,
        pharmacies: withLowestFlag,
        genericLowestPrice: minPrice
      };
    }));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <MobileFrame
      activeRole={activeRole}
      onToggleRole={setActiveRole}
      onOpenPrd={() => setIsPrdOpen(true)}
      cartCount={totalCartCount}
    >
      {activeRole === 'partner' ? (
        /* Medical Store / Partner Dashboard View */
        <PartnerStoreView
          medicines={medicines}
          onUpdatePharmacyPrice={handleUpdatePharmacyPrice}
          onSwitchToCustomer={() => setActiveRole('customer')}
        />
      ) : (
        /* Customer Mobile App Experience */
        <div className="flex flex-col min-h-full">
          {/* Header */}
          <AppHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
          />

          {/* Active Tab View */}
          <div className="flex-1">
            {activeTab === 'home' && (
              <HomeTab
                medicines={filteredAndSortedMedicines}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onSelectMedicine={setSelectedMedicineForModal}
                onOpenRxScanner={() => setActiveTab('scan')}
                onQuickAddToCart={handleQuickAddToCart}
              />
            )}

            {activeTab === 'compare' && (
              <CompareTab
                medicines={medicines}
                onSelectMedicine={setSelectedMedicineForModal}
                onAddToCart={(med, ph, qty) => {
                  handleAddToCart(med, ph, qty);
                  setIsCartOpen(true);
                }}
              />
            )}

            {activeTab === 'scan' && (
              <RxScannerTab
                medicines={medicines}
                onAddMultipleToCart={handleAddMultipleToCart}
                onGoToCart={() => setIsCartOpen(true)}
              />
            )}

            {activeTab === 'orders' && (
              <OrdersTab
                orders={orders}
                medicines={medicines}
                onQuickAddBundle={(meds) => {
                  const bundle = meds.map(m => ({
                    medicine: m,
                    pharmacy: m.pharmacies.find(p => p.isLowestPrice) || m.pharmacies[0],
                    quantity: 1
                  }));
                  handleAddMultipleToCart(bundle);
                }}
                onGoToCart={() => setIsCartOpen(true)}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileTab
                onOpenPrd={() => setIsPrdOpen(true)}
                onSwitchToPartner={() => setActiveRole('partner')}
              />
            )}
          </div>

          {/* Bottom Nav Bar */}
          <BottomNav
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            cartItemCount={totalCartCount}
          />
        </div>
      )}

      {/* Medicine Detail Modal / Bottom Sheet */}
      <MedicineDetailModal
        medicine={selectedMedicineForModal}
        isOpen={Boolean(selectedMedicineForModal)}
        onClose={() => setSelectedMedicineForModal(null)}
        onAddToCart={(med, ph, qty) => {
          handleAddToCart(med, ph, qty);
          setIsCartOpen(true);
        }}
      />

      {/* Cart & Checkout Modal */}
      <CartCheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* PRD Specification Viewer Modal (Satisfies 18-page PRD prompt) */}
      <PrdViewerModal
        isOpen={isPrdOpen}
        onClose={() => setIsPrdOpen(false)}
      />
    </MobileFrame>
  );
}
