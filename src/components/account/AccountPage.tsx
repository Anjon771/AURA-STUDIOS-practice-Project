import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Package,
  Heart,
  MapPin,
  CreditCard,
  User,
  LogOut,
  ChevronRight,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';
import { Order, UserAddress } from '../../types';

export const AccountPage: React.FC = () => {
  const {
    user,
    logout,
    orders,
    wishlist,
    products,
    formatPrice,
    addToCart,
    toggleWishlist,
    updateProfile,
    setCurrentView,
    navigateToProduct
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Address modal form
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPostal, setNewPostal] = useState('');

  // Profile edit form
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');

  if (!user) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen py-24 text-center px-4">
        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-2">
          Patron Account Portal
        </h2>
        <p className="text-xs text-neutral-500 mb-6">
          Please sign in to view your orders, saved curations, and addresses.
        </p>
        <button
          onClick={() => setCurrentView('auth')}
          className="px-6 py-3 bg-neutral-950 text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      phone: profilePhone
    });
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newPostal) return;
    const newAddr: UserAddress = {
      id: 'addr-' + Date.now(),
      isDefault: user.addresses.length === 0,
      fullName: user.name,
      street: newStreet,
      city: newCity,
      state: newState || 'NY',
      postalCode: newPostal,
      country: 'United States',
      phone: user.phone || '+1 (555) 234-8901'
    };
    updateProfile({
      addresses: [...user.addresses, newAddr]
    });
    setIsAddressModalOpen(false);
    setNewStreet('');
    setNewCity('');
    setNewPostal('');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 sm:py-14 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-2xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover border-2 border-neutral-200 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-950">
                  {user.name}
                </h1>
                {user.role === 'admin' && (
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-neutral-900 text-white rounded">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">{user.email}</p>
              <p className="text-[11px] text-neutral-400 mt-1">Patron since February 2025 · Verified Collector</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <button
                onClick={() => setCurrentView('admin')}
                className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-xl text-xs font-semibold transition-colors"
              >
                Go to Store Admin
              </button>
            )}
            <button
              onClick={logout}
              className="px-4 py-2.5 border border-neutral-300 hover:border-neutral-900 text-neutral-700 hover:text-neutral-950 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'orders'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>Orders & Tracking</span>
              </span>
              <span className="tabular-nums opacity-75">{orders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'wishlist'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Heart className="w-4 h-4" />
                <span>Saved Pieces</span>
              </span>
              <span className="tabular-nums opacity-75">{wishlist.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" />
                <span>Delivery Addresses</span>
              </span>
              <span className="tabular-nums opacity-75">{user.addresses.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>Account Profile</span>
              </span>
            </button>
          </aside>

          {/* Main Tab Content */}
          <main className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-2xs">
            
            {/* Tab: Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <h2 className="text-lg font-serif font-bold text-neutral-950">
                    Acquisition History
                  </h2>
                  <span className="text-xs text-neutral-500 tabular-nums">
                    {orders.length} Completed Orders
                  </span>
                </div>

                {orders.length === 0 ? (
                  <p className="text-xs text-neutral-500 py-8 text-center">
                    No orders placed yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-5 rounded-2xl border border-neutral-200/80 hover:border-neutral-300 transition-colors space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100 text-xs">
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-neutral-950">
                              {ord.orderNumber}
                            </span>
                            <span className="text-neutral-400">·</span>
                            <span className="text-neutral-500">{ord.date}</span>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            <span
                              className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                                ord.status === 'delivered'
                                  ? 'bg-emerald-50 text-emerald-800'
                                  : ord.status === 'shipped'
                                  ? 'bg-blue-50 text-blue-800'
                                  : 'bg-neutral-100 text-neutral-800'
                              }`}
                            >
                              {ord.status}
                            </span>
                            <button
                              onClick={() => setSelectedOrderDetails(ord)}
                              className="text-[11px] font-semibold text-neutral-700 hover:text-neutral-950 underline ml-2"
                            >
                              Details
                            </button>
                          </div>
                        </div>

                        {/* Items in order */}
                        <div className="flex flex-wrap items-center gap-4">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <img
                                src={it.productImage}
                                alt={it.productName}
                                referrerPolicy="no-referrer"
                                className="w-12 h-14 rounded-lg object-cover bg-neutral-100 shrink-0 border border-neutral-200/60"
                              />
                              <div className="text-xs">
                                <p className="font-medium text-neutral-900 truncate max-w-[180px]">
                                  {it.productName}
                                </p>
                                <p className="text-[11px] text-neutral-500">
                                  {it.colorName} · Qty {it.quantity}
                                </p>
                              </div>
                            </div>
                          ))}

                          <div className="sm:ml-auto text-right text-xs pt-2 sm:pt-0">
                            <span className="text-neutral-500">Total: </span>
                            <span className="font-bold text-neutral-950 tabular-nums">
                              {formatPrice(ord.total)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <h2 className="text-lg font-serif font-bold text-neutral-950">
                    Saved Pieces ({wishlistProducts.length})
                  </h2>
                </div>

                {wishlistProducts.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <p className="text-sm font-medium text-neutral-800">
                      Your saved list is empty
                    </p>
                    <p className="text-xs text-neutral-500">
                      Click the heart icon on any piece to save it to your wishlist.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistProducts.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-2xl border border-neutral-200 flex gap-4 items-center justify-between"
                      >
                        <div
                          onClick={() => navigateToProduct(p.id)}
                          className="flex items-center gap-3 cursor-pointer min-w-0"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-18 rounded-lg object-cover bg-neutral-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-semibold text-neutral-900 truncate">
                              {p.name}
                            </h4>
                            <p className="text-xs text-neutral-500 tabular-nums">
                              {formatPrice(p.price)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 shrink-0">
                          <button
                            onClick={() => addToCart(p)}
                            className="px-3 py-1.5 bg-neutral-950 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                          >
                            Add to Bag
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="text-[11px] text-neutral-400 hover:text-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <h2 className="text-lg font-serif font-bold text-neutral-950">
                    Saved Delivery Addresses
                  </h2>
                  <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="px-3.5 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-5 rounded-2xl border border-neutral-200 relative space-y-1.5 text-xs text-neutral-600"
                    >
                      {addr.isDefault && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded inline-block mb-1">
                          Default Shipping
                        </span>
                      )}
                      <p className="font-semibold text-neutral-900">{addr.fullName}</p>
                      <p>{addr.street} {addr.apartment}</p>
                      <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                      <p>{addr.country}</p>
                      <p className="text-neutral-400 pt-1">{addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-6 max-w-lg">
                <div className="pb-4 border-b border-neutral-100">
                  <h2 className="text-lg font-serif font-bold text-neutral-950">
                    Personal Information
                  </h2>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full bg-neutral-100 border border-neutral-200 rounded-lg p-2.5 text-neutral-500 cursor-not-allowed"
                    />
                    <span className="text-[11px] text-neutral-400 mt-0.5">Contact concierge to alter verified email.</span>
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-neutral-950 text-white rounded-xl font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#FAF9F6] p-6 sm:p-8 rounded-3xl shadow-2xl border border-neutral-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pb-4 border-b border-neutral-200">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                Order Overview
              </span>
              <h3 className="text-xl font-serif font-bold text-neutral-900">
                {selectedOrderDetails.orderNumber}
              </h3>
              <p className="text-xs text-neutral-500">
                Placed on {selectedOrderDetails.date} · Status: <span className="font-semibold capitalize text-neutral-900">{selectedOrderDetails.status}</span>
              </p>
            </div>

            <div className="py-4 divide-y divide-neutral-100">
              {selectedOrderDetails.items.map((it, i) => (
                <div key={i} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={it.productImage}
                      alt={it.productName}
                      className="w-12 h-14 rounded-lg object-cover bg-neutral-100"
                    />
                    <div>
                      <p className="font-semibold text-neutral-900">{it.productName}</p>
                      <p className="text-neutral-500">{it.colorName} · Qty {it.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-neutral-900 tabular-nums">
                    {formatPrice(it.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-200 space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">{formatPrice(selectedOrderDetails.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-100">
                <span>Total Paid</span>
                <span>{formatPrice(selectedOrderDetails.total)}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 text-xs text-neutral-500">
              <p className="font-semibold text-neutral-800 mb-1">Courier Address</p>
              <p>{selectedOrderDetails.shippingAddress.street}</p>
              <p>{selectedOrderDetails.shippingAddress.city}, {selectedOrderDetails.shippingAddress.state} {selectedOrderDetails.shippingAddress.postalCode}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#FAF9F6] p-6 sm:p-8 rounded-3xl shadow-2xl border border-neutral-200 relative">
            <button
              onClick={() => setIsAddressModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-serif font-bold text-neutral-900 mb-4">
              New Shipping Address
            </h3>

            <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Street</label>
                <input
                  type="text"
                  required
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  placeholder="e.g. 742 Evergreen Terrace"
                  className="w-full bg-white border border-neutral-200 rounded-lg p-2.5 text-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="e.g. Portland"
                    className="w-full bg-white border border-neutral-200 rounded-lg p-2.5 text-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={newPostal}
                    onChange={(e) => setNewPostal(e.target.value)}
                    placeholder="e.g. 97201"
                    className="w-full bg-white border border-neutral-200 rounded-lg p-2.5 text-neutral-900"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-neutral-950 text-white rounded-xl font-semibold uppercase tracking-wider"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2.5 border border-neutral-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
