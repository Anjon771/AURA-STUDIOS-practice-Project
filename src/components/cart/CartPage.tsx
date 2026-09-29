import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, Tag, ShieldCheck, Truck } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    freeShippingThreshold,
    formatPrice,
    couponCode,
    applyCoupon,
    removeCoupon,
    setCurrentView,
    products
  } = useStore();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyCoupon(inputCode);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setInputCode('');
    }
  };

  const handleCheckout = () => {
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const crossSells = products
    .filter((p) => !cart.some((c) => c.product.id === p.id))
    .slice(0, 3);

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 sm:py-16 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="pb-8 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Review Bag
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 tracking-tight mt-1">
              Your Curated Bag
            </h1>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-neutral-500 hover:text-red-600 transition-colors self-start sm:self-auto"
            >
              Empty Bag
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-5">
            <div className="w-16 h-16 rounded-full bg-neutral-200/80 mx-auto flex items-center justify-center text-neutral-500">
              <Tag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-neutral-900">
                Your bag is empty
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                Explore our catalog of architectural seating, lathe-spun brass pendants, and Japanese shuttle-loom textiles.
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Collection</span>
            </button>
          </div>
        ) : (
          <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Free Shipping Alert Bar */}
              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-800 font-medium">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-neutral-600" />
                    {remainingForFreeShipping === 0
                      ? 'Complimentary white-glove courier shipping unlocked'
                      : `Add ${formatPrice(remainingForFreeShipping)} more to qualify for complimentary white-glove shipping`}
                  </span>
                  <span className="tabular-nums font-semibold">{freeShippingProgress}%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-neutral-900 h-full rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-2xl border border-neutral-200 divide-y divide-neutral-100 overflow-hidden shadow-2xs">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                    <div className="flex gap-5 items-center min-w-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl object-cover bg-neutral-100 shrink-0 border border-neutral-200/60"
                      />
                      <div className="space-y-1 min-w-0">
                        <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                          {item.product.category}
                        </span>
                        <h3 className="font-serif font-bold text-base sm:text-lg text-neutral-900 truncate">
                          {item.product.name}
                        </h3>
                        <div className="text-xs text-neutral-500 space-x-2">
                          <span>Finish: {item.selectedColor.name}</span>
                          {item.selectedSize && (
                            <>
                              <span>·</span>
                              <span>Size: {item.selectedSize}</span>
                            </>
                          )}
                        </div>
                        <div className="text-xs text-neutral-400">
                          Unit: {formatPrice(item.product.price)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-neutral-300 rounded-lg bg-neutral-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-neutral-600 hover:text-neutral-950 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-neutral-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-neutral-600 hover:text-neutral-950 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for item */}
                      <span className="text-base font-bold text-neutral-950 tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping button */}
              <button
                onClick={() => {
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-neutral-700 hover:text-neutral-950 inline-flex items-center gap-2 py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue browsing collection</span>
              </button>
            </div>

            {/* Right Order Summary Column */}
            <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-6 sticky top-28">
              <h2 className="text-lg font-serif font-bold text-neutral-900 pb-3 border-b border-neutral-100">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <div>
                {couponCode ? (
                  <div className="flex items-center justify-between bg-neutral-100 p-3 rounded-xl text-xs">
                    <div className="flex items-center gap-2 font-medium text-neutral-900">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>Coupon <strong className="font-mono">{couponCode}</strong> applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-neutral-500 hover:text-neutral-900 text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Coupon (e.g. AURA15)"
                        className="flex-1 bg-white border border-neutral-200 rounded-xl px-3 py-2.5 text-xs text-neutral-900 uppercase focus:outline-none focus:border-neutral-900"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && <p className="text-xs text-red-500">{promoError}</p>}
                    <p className="text-[11px] text-neutral-400">
                      Tip: Use promo code <code className="text-neutral-700 font-bold">AURA15</code> for 15% off.
                    </p>
                  </form>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="tabular-nums font-semibold text-neutral-900">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Curator Savings</span>
                    <span className="tabular-nums font-semibold">
                      -{formatPrice(cartDiscount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>White-Glove Shipping</span>
                  <span className="tabular-nums font-medium text-neutral-900">
                    {cartShipping === 0 ? 'Complimentary' : formatPrice(cartShipping)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="tabular-nums font-medium text-neutral-900">
                    {formatPrice(cartTax)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-neutral-950 pt-3 border-t border-neutral-200">
                  <span>Total Due</span>
                  <span className="tabular-nums">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-neutral-600" />
                <span>Encrypted 256-bit SSL Checkout</span>
              </div>
            </div>

          </div>
        )}

        {/* Cross Sell Recommendations */}
        {cart.length > 0 && crossSells.length > 0 && (
          <div className="mt-24 pt-16 border-t border-neutral-200">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                Suggested Pairings
              </span>
              <h2 className="text-2xl font-serif font-bold text-neutral-900 tracking-tight mt-1">
                Complete Your Living Space
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {crossSells.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
