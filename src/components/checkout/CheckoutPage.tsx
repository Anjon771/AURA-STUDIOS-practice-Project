import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { UserAddress } from '../../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    formatPrice,
    couponCode,
    createOrder,
    setCurrentView,
    user
  } = useStore();

  // Multi-step or accordion form states
  const [email, setEmail] = useState(user?.email || 'sophia.vance@studio.com');
  const [fullName, setFullName] = useState(user?.name || 'Sophia Vance');
  const [street, setStreet] = useState(user?.addresses[0]?.street || '428 Mercer Street');
  const [apartment, setApartment] = useState(user?.addresses[0]?.apartment || 'Apt 4B');
  const [city, setCity] = useState(user?.addresses[0]?.city || 'New York');
  const [state, setState] = useState(user?.addresses[0]?.state || 'NY');
  const [postalCode, setPostalCode] = useState(user?.addresses[0]?.postalCode || '10013');
  const [country, setCountry] = useState('United States');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-8901');

  // Delivery method
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'assembly'>('standard');

  // Payment method
  const [paymentType, setPaymentType] = useState<'card' | 'apple_pay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('883');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect to shop
  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen py-24 text-center px-4">
        <p className="text-lg font-serif font-bold text-neutral-900 mb-4">
          There are no objects in your checkout queue.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-3 bg-neutral-950 text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  const deliveryCostAddon = deliveryMethod === 'express' ? 35 : deliveryMethod === 'assembly' ? 65 : 0;
  const finalTotal = Number((cartTotal + deliveryCostAddon).toFixed(2));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const shippingAddress: UserAddress = {
      id: 'addr-' + Date.now(),
      isDefault: true,
      fullName,
      street,
      apartment,
      city,
      state,
      postalCode,
      country,
      phone
    };

    setTimeout(() => {
      createOrder({
        shippingAddress,
        paymentMethod:
          paymentType === 'card'
            ? `Visa ending in ${cardNumber.slice(-4)}`
            : paymentType === 'apple_pay'
            ? 'Apple Pay'
            : 'Cash on Delivery / In-Home Signature',
        total: finalTotal
      });
      setIsSubmitting(false);
      setCurrentView('order-success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 sm:py-16 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8">
          <button onClick={() => setCurrentView('shop')} className="hover:text-neutral-900">
            Catalog
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <button onClick={() => setCurrentView('cart')} className="hover:text-neutral-900">
            Bag
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-neutral-950 font-semibold">Secure Checkout</span>
        </nav>

        {/* Page Title & Trust Badge */}
        <div className="pb-8 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Final Verification
            </span>
            <h1 className="text-3xl font-serif font-bold text-neutral-950 tracking-tight mt-1">
              Atelier Checkout
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-600 bg-white px-3.5 py-2 rounded-xl border border-neutral-200">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>256-bit Encrypted Protocol</span>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <form onSubmit={handlePlaceOrder} className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Form: Customer Details, Address, Shipping, Payment */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Contact Information */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h3 className="text-base font-serif font-bold text-neutral-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-sans font-semibold">
                    1
                  </span>
                  <span>Contact Information</span>
                </h3>
                {user && (
                  <span className="text-xs text-neutral-500">
                    Logged in as <strong className="text-neutral-800">{user.email}</strong>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Email for Shipment Tracking *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Mobile Phone (Delivery Notifications) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
              <div className="pb-3 border-b border-neutral-100">
                <h3 className="text-base font-serif font-bold text-neutral-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-sans font-semibold">
                    2
                  </span>
                  <span>Shipping Destination</span>
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-neutral-700 font-semibold mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">
                      Apt / Suite
                    </label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">
                      State / Province *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Courier & White-Glove Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
              <div className="pb-3 border-b border-neutral-100">
                <h3 className="text-base font-serif font-bold text-neutral-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-sans font-semibold">
                    3
                  </span>
                  <span>Delivery Protocol</span>
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-neutral-900 bg-neutral-50/80 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-neutral-700" />
                    <div>
                      <p className="font-semibold text-neutral-900">Standard White-Glove Courier</p>
                      <p className="text-[11px] text-neutral-500">Delivered in 3–5 business days</p>
                    </div>
                  </div>
                  <span className="font-semibold text-neutral-900">
                    {cartShipping === 0 ? 'Complimentary' : formatPrice(cartShipping)}
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-neutral-900 bg-neutral-50/80 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-neutral-700" />
                    <div>
                      <p className="font-semibold text-neutral-900">Express Priority Transit</p>
                      <p className="text-[11px] text-neutral-500">Delivered within 48 hours</p>
                    </div>
                  </div>
                  <span className="font-semibold text-neutral-900">+$35.00</span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('assembly')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    deliveryMethod === 'assembly'
                      ? 'border-neutral-900 bg-neutral-50/80 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-neutral-700" />
                    <div>
                      <p className="font-semibold text-neutral-900">In-Room White-Glove Assembly</p>
                      <p className="text-[11px] text-neutral-500">Room-of-choice placement, unboxing, and crate removal</p>
                    </div>
                  </div>
                  <span className="font-semibold text-neutral-900">+$65.00</span>
                </label>
              </div>
            </div>

            {/* Step 4: Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
              <div className="pb-3 border-b border-neutral-100">
                <h3 className="text-base font-serif font-bold text-neutral-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-sans font-semibold">
                    4
                  </span>
                  <span>Payment Method</span>
                </h3>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentType('card')}
                  className={`py-2.5 px-3 rounded-xl border font-medium flex items-center justify-center gap-2 transition-all ${
                    paymentType === 'card'
                      ? 'border-neutral-900 bg-neutral-900 text-white font-semibold'
                      : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('apple_pay')}
                  className={`py-2.5 px-3 rounded-xl border font-medium flex items-center justify-center gap-1 transition-all ${
                    paymentType === 'apple_pay'
                      ? 'border-neutral-900 bg-neutral-900 text-white font-semibold'
                      : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('cod')}
                  className={`py-2.5 px-3 rounded-xl border font-medium flex items-center justify-center gap-1 transition-all ${
                    paymentType === 'cod'
                      ? 'border-neutral-900 bg-neutral-900 text-white font-semibold'
                      : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  <span>In-Person / COD</span>
                </button>
              </div>

              {paymentType === 'card' && (
                <div className="space-y-4 pt-3 text-xs">
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 font-mono tracking-wider focus:outline-none focus:bg-white focus:border-neutral-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-700 font-semibold mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / YY"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 font-mono focus:outline-none focus:bg-white focus:border-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-700 font-semibold mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="883"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 font-mono focus:outline-none focus:bg-white focus:border-neutral-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentType === 'apple_pay' && (
                <div className="p-4 bg-neutral-50 rounded-xl text-xs text-neutral-600 space-y-1">
                  <p className="font-semibold text-neutral-900">Apple Pay Express Authorization</p>
                  <p>You will authenticate seamlessly with Touch ID or Face ID upon placing order.</p>
                </div>
              )}

              {paymentType === 'cod' && (
                <div className="p-4 bg-neutral-50 rounded-xl text-xs text-neutral-600 space-y-1">
                  <p className="font-semibold text-neutral-900">Payment on White-Glove Handover</p>
                  <p>Pay upon delivery inspection via card reader or bank draft with the courier.</p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Summary & Confirmation CTA */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-6 sticky top-28">
            <h2 className="text-lg font-serif font-bold text-neutral-900 pb-3 border-b border-neutral-100">
              Bag Summary ({cart.length} items)
            </h2>

            {/* Thumbnail items */}
            <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-neutral-100 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-16 rounded-lg object-cover bg-neutral-100 shrink-0 border border-neutral-200/60"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-neutral-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500">
                      {item.selectedColor.name} · Qty {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-neutral-900 tabular-nums">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-semibold text-neutral-900">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Curation Discount ({couponCode})</span>
                  <span className="tabular-nums font-semibold">
                    -{formatPrice(cartDiscount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Courier Service</span>
                <span className="tabular-nums font-medium text-neutral-900">
                  {deliveryCostAddon === 0 && cartShipping === 0
                    ? 'Complimentary'
                    : formatPrice(cartShipping + deliveryCostAddon)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Taxes</span>
                <span className="tabular-nums font-medium text-neutral-900">
                  {formatPrice(cartTax)}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-neutral-950 pt-3 border-t border-neutral-200">
                <span>Total Payment</span>
                <span className="tabular-nums">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm disabled:bg-neutral-400"
            >
              {isSubmitting ? (
                <span>Authorizing Security Protocol...</span>
              ) : (
                <>
                  <span>Authorize & Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-2 flex flex-col items-center gap-1.5 text-center text-[11px] text-neutral-400">
              <div className="flex items-center gap-1.5 text-neutral-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Risk-Free 30-Day Living Space Guarantee</span>
              </div>
              <p>Return pickup arranged at no cost if the piece does not suit your space.</p>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
