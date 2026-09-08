import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  CreditCard, 
  Banknote, 
  MapPin, 
  Upload, 
  Clock, 
  ArrowRight 
} from 'lucide-react';

interface CartCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (medicineId: string, delta: number) => void;
  onRemoveItem: (medicineId: string) => void;
  onPlaceOrder: (newOrder: Order) => void;
}

export const CartCheckoutModal: React.FC<CartCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'digital'>('card');
  const [deliveryAddress, setDeliveryAddress] = useState('742 Evergreen Terrace, Apt 4B, New York, NY 10001');
  const [hasRxAttached, setHasRxAttached] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<Order | null>(null);

  if (!isOpen) return null;

  const totalGenericPrice = cartItems.reduce((acc, item) => acc + (item.selectedPharmacy.price * item.quantity), 0);
  const totalBrandPrice = cartItems.reduce((acc, item) => acc + (item.medicine.brandPrice * item.quantity), 0);
  const totalSavings = totalBrandPrice - totalGenericPrice;
  const deliveryFee = totalGenericPrice > 20 ? 0 : 2.50;
  const grandTotal = totalGenericPrice + deliveryFee;

  const handleCheckout = () => {
    setIsOrdering(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: `GM-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: 'Just now',
        items: [...cartItems],
        totalAmount: grandTotal,
        totalSavings: totalSavings,
        status: 'Confirmed',
        deliveryAddress: deliveryAddress,
        estimatedDeliveryTime: '35 - 45 mins',
        pharmacyName: cartItems[0]?.selectedPharmacy.pharmacyName || 'MedDirect Express'
      };
      setIsOrdering(false);
      setOrderSuccess(newOrder);
      onPlaceOrder(newOrder);
    }, 1200);
  };

  return (
    <div id="cart-modal-overlay" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div 
        id="cart-modal-container" 
        className="bg-white text-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
              {orderSuccess ? 'Order Confirmation' : 'Your Generic Cart'}
            </h3>
            {!orderSuccess && cartItems.length > 0 && (
              <span className="bg-teal-100 text-teal-800 text-xs px-2 py-0.5 rounded-full font-bold">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            id="close-cart-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {orderSuccess ? (
          /* Order Confirmation Screen */
          <div className="p-6 text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                Order Placed Successfully
              </span>
              <h4 className="text-xl font-bold text-slate-900 mt-2 font-['Outfit']">Order #{orderSuccess.id}</h4>
              <p className="text-xs text-slate-500 mt-1">
                Fulfilling from <strong className="text-slate-800">{orderSuccess.pharmacyName}</strong>
              </p>
            </div>

            {/* Savings Celebration Box */}
            <div className="p-4 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-teal-100 font-medium">You Saved On This Order</p>
                  <p className="text-2xl font-black font-['Outfit']">${orderSuccess.totalSavings.toFixed(2)}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
              <p className="text-[11px] text-teal-100 mt-2 border-t border-white/20 pt-2">
                By purchasing generic bioequivalents instead of brand marketing markups.
              </p>
            </div>

            {/* Tracking Status Stepper */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Live Delivery Tracker</span>
                <span className="text-[11px] text-teal-700 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> ETA {orderSuccess.estimatedDeliveryTime}
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100"></div>
                  <span>Order Confirmed & Routed to Pharmacy</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <span>Licensed Pharmacist Verification</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <span>Tamper-proof Packaging & Courier Dispatch</span>
                </div>
              </div>
            </div>

            <button
              id="done-order-btn"
              onClick={onClose}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md"
            >
              Back to Home
            </button>
          </div>
        ) : (
          /* Normal Cart Body */
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-700">Your generic medicine cart is empty</p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Search medicines or scan your doctor's prescription to compare prices and save up to 90%.
                </p>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-2.5">
                  {cartItems.map((item) => {
                    const itemSavings = (item.medicine.brandPrice - item.selectedPharmacy.price) * item.quantity;
                    return (
                      <div 
                        key={item.medicine.id}
                        className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex-1 space-y-0.5">
                          <p className="text-xs font-bold text-slate-900">{item.medicine.name}</p>
                          <p className="text-[11px] text-slate-500">{item.medicine.strength} • {item.medicine.packSize}</p>
                          <p className="text-[10px] text-emerald-700 font-semibold">
                            Fulfilling via: {item.selectedPharmacy.pharmacyName}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Brand was ${item.medicine.brandPrice.toFixed(2)} → <span className="text-teal-700 font-bold">Save ${itemSavings.toFixed(2)}</span>
                          </p>
                        </div>

                        <div className="text-right space-y-2">
                          <p className="text-xs font-extrabold text-slate-900">
                            ${(item.selectedPharmacy.price * item.quantity).toFixed(2)}
                          </p>
                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                            <button
                              onClick={() => {
                                if (item.quantity === 1) {
                                  onRemoveItem(item.medicine.id);
                                } else {
                                  onUpdateQuantity(item.medicine.id, -1);
                                }
                              }}
                              className="p-1 text-slate-600 hover:text-rose-600"
                            >
                              {item.quantity === 1 ? <Trash2 className="w-3 h-3 text-rose-500" /> : <Minus className="w-3 h-3" />}
                            </button>
                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.medicine.id, 1)}
                              className="p-1 text-slate-600"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Prescription Attached Section */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <div>
                      <p className="font-bold text-slate-800">Doctor's Prescription</p>
                      <p className="text-[11px] text-slate-500">
                        {hasRxAttached ? 'Verified prescription on file' : 'Upload Rx to expedite fulfillment'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setHasRxAttached(!hasRxAttached)}
                    className="text-[11px] font-bold text-teal-700 hover:underline"
                  >
                    {hasRxAttached ? 'Change' : 'Upload'}
                  </button>
                </div>

                {/* Delivery Address */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      Delivery Destination
                    </span>
                    <span className="text-teal-700 font-bold">Edit</span>
                  </div>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* Payment Selection */}
                <div className="space-y-1.5 text-xs">
                  <p className="font-bold text-slate-700">Payment Option</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        paymentMethod === 'card'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[10px]">Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('digital')}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        paymentMethod === 'digital'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 mx-auto mb-1 text-amber-500" />
                      <span className="text-[10px]">Apple/UPI</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Banknote className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[10px]">Cash (COD)</span>
                    </button>
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Brand Equivalent Total</span>
                    <span className="line-through">${totalBrandPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>genericMed Direct Savings</span>
                    <span>-${totalSavings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Generic Medicines Subtotal</span>
                    <span>${totalGenericPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900 text-sm">
                    <span>To Pay</span>
                    <span className="text-teal-700">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer Action */}
        {!orderSuccess && cartItems.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-white">
            <button
              id="confirm-checkout-btn"
              disabled={isOrdering}
              onClick={handleCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-between shadow-md shadow-teal-600/20 active:scale-98 transition-all disabled:opacity-50"
            >
              <div className="text-left">
                <span className="block text-[10px] text-teal-100 uppercase">Save ${(totalSavings).toFixed(2)}</span>
                <span className="text-sm font-extrabold">${grandTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-1 font-bold">
                <span>{isOrdering ? 'Processing Order...' : 'Place Order at Lowest Price'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
