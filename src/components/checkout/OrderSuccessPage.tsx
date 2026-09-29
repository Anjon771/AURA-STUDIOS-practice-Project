import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, PackageCheck, Truck, ArrowRight, Printer, Home } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { lastCompletedOrder, setCurrentView, formatPrice } = useStore();

  if (!lastCompletedOrder) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen py-24 text-center px-4">
        <p className="text-base text-neutral-600 mb-4">No recent order found.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-3 bg-neutral-950 text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  const order = lastCompletedOrder;

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 sm:py-20 border-b border-neutral-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Header Card */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-neutral-200/80 shadow-xs text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 stroke-[1.75]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
              Acquisition Confirmed
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 tracking-tight">
              Thank you for your patronage.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto pt-1 leading-relaxed">
              Order <strong className="text-neutral-900 font-mono">{order.orderNumber}</strong> has been allocated in our Copenhagen fulfillment atelier.
            </p>
          </div>

          {/* Timeline Status */}
          <div className="pt-8 pb-4">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-neutral-950 text-white mx-auto flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <p className="font-semibold text-neutral-900">Received</p>
              </div>
              <div className="space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-neutral-950 text-white mx-auto flex items-center justify-center text-[10px] font-bold">
                  2
                </div>
                <p className="font-semibold text-neutral-900">Preparing</p>
              </div>
              <div className="space-y-1.5 opacity-40">
                <div className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-700 mx-auto flex items-center justify-center text-[10px] font-bold">
                  3
                </div>
                <p className="font-medium text-neutral-600">Transit</p>
              </div>
              <div className="space-y-1.5 opacity-40">
                <div className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-700 mx-auto flex items-center justify-center text-[10px] font-bold">
                  4
                </div>
                <p className="font-medium text-neutral-600">Delivered</p>
              </div>
            </div>
            <div className="w-full bg-neutral-200 h-1 rounded-full mt-2 relative overflow-hidden">
              <div className="bg-neutral-950 h-full rounded-full w-2/5" />
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500">
            <span>Tracking Reference: <strong className="text-neutral-800 font-mono">{order.trackingNumber}</strong></span>
            <span>·</span>
            <span>Estimated Window: <strong className="text-neutral-800">{order.estimatedDelivery}</strong></span>
          </div>
        </div>

        {/* Itemized Order Receipt Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs mt-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <h3 className="font-serif font-bold text-lg text-neutral-950">
              Receipt Details
            </h3>
            <button
              onClick={() => window.print()}
              className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
          </div>

          {/* Items List */}
          <div className="divide-y divide-neutral-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between gap-4 first:pt-0">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-14 rounded-lg object-cover bg-neutral-100 shrink-0 border border-neutral-200/60"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-neutral-900 truncate">
                      {item.productName}
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      Finish: {item.colorName} · Qty {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-neutral-950 tabular-nums">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums font-semibold text-neutral-900">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Curation Discount</span>
                <span className="tabular-nums font-semibold">-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping & White-Glove Handover</span>
              <span className="tabular-nums font-medium text-neutral-900">{formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span className="tabular-nums font-medium text-neutral-900">{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-200">
              <span>Final Total Paid</span>
              <span className="tabular-nums">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Destination Details */}
          <div className="pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600">
            <div>
              <p className="font-semibold text-neutral-900 mb-1">Delivering to:</p>
              <p>{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street} {order.shippingAddress.apartment}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900 mb-1">Payment Method:</p>
              <p>{order.paymentMethod}</p>
              <p className="text-[11px] text-neutral-400 mt-2">
                A formal PDF invoice has been sent to your contact address.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setCurrentView('account');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <PackageCheck className="w-4 h-4" />
            <span>View in Order History</span>
          </button>

          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 border border-neutral-300 hover:border-neutral-900 text-neutral-900 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>
        </div>

      </div>
    </div>
  );
};
