import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Search,
  X,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { Product, OrderStatus, ProductCategory } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    formatPrice,
    setCurrentView
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderStatusFilter, setSelectedOrderStatusFilter] = useState<string>('all');

  // Add Product Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('furniture');
  const [newPrice, setNewPrice] = useState(450);
  const [newTagline, setNewTagline] = useState('');
  const [newStock, setNewStock] = useState(15);
  const [newDescription, setNewDescription] = useState('');

  // Calculations for stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
  const lowStockProducts = products.filter((p) => p.stockQuantity <= 12);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    addProduct({
      name: newTitle,
      category: newCategory,
      price: Number(newPrice),
      tagline: newTagline || 'Custom studio creation',
      rating: 5.0,
      reviewCount: 1,
      image: products[0].image,
      gallery: [products[0].image],
      inStock: true,
      stockQuantity: Number(newStock),
      colors: [{ name: 'Studio Natural', hex: '#D2B48C' }],
      description: newDescription || 'Crafted with premium materials and exacting specifications.',
      highlights: ['Master craftsmanship', 'Sustainable materials'],
      specifications: { 'Origin': 'Studio Atelier' },
      shippingInfo: 'Standard white-glove courier dispatch.'
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewPrice(450);
    setNewTagline('');
    setNewDescription('');
  };

  const filteredOrders = orders.filter((o) => {
    if (selectedOrderStatusFilter === 'all') return true;
    return o.status === selectedOrderStatusFilter;
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 sm:py-12 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="pb-8 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Management Console
            </span>
            <h1 className="text-3xl font-serif font-bold text-neutral-950 tracking-tight mt-1">
              Atelier Store Director
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 border border-neutral-300 hover:border-neutral-900 bg-white text-neutral-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>View Live Storefront</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dashboard Layout: Sidebar + Main Stage */}
        <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Admin Navigation Sidebar */}
          <aside className="lg:col-span-3 bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview & Sales</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'products'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>Product Catalog</span>
              </span>
              <span className="tabular-nums opacity-75">{products.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'orders'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4" />
                <span>Customer Orders</span>
              </span>
              <span className="tabular-nums opacity-75">{orders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'customers'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Patron Registry</span>
              </span>
              <span className="tabular-nums opacity-75">1</span>
            </button>
          </aside>

          {/* Main Stage */}
          <main className="lg:col-span-9 space-y-8">
            
            {/* TAB: Overview & Sales Statistics */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* 4 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      Total Revenue
                    </span>
                    <div className="text-2xl font-bold text-neutral-950 tabular-nums">
                      {formatPrice(totalRevenue)}
                    </div>
                    <div className="text-[11px] text-emerald-700 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+18.4% this quarter</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      Completed Orders
                    </span>
                    <div className="text-2xl font-bold text-neutral-950 tabular-nums">
                      {orders.length}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      100% white-glove fulfilled
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      Active Catalog
                    </span>
                    <div className="text-2xl font-bold text-neutral-950 tabular-nums">
                      {products.length} Pieces
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      5 Distinct Disciplines
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      Inventory Alert
                    </span>
                    <div className="text-2xl font-bold text-amber-700 tabular-nums">
                      {lowStockProducts.length} Pieces
                    </div>
                    <div className="text-[11px] text-amber-700">
                      Stock under 15 units
                    </div>
                  </div>
                </div>

                {/* Revenue Simulation Chart (Pure HTML/CSS clean bars) */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-2xs space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-neutral-900">
                        Monthly Acquisition Volume
                      </h3>
                      <p className="text-xs text-neutral-500">Gross transaction volume by month (USD)</p>
                    </div>
                    <span className="text-xs font-semibold text-neutral-900 bg-neutral-100 px-3 py-1 rounded-lg">
                      2026 Season
                    </span>
                  </div>

                  <div className="grid grid-cols-6 gap-3 items-end h-48 pt-6 border-b border-neutral-100">
                    {[
                      { month: 'Oct', val: 4200, height: '45%' },
                      { month: 'Nov', val: 6800, height: '65%' },
                      { month: 'Dec', val: 9400, height: '90%' },
                      { month: 'Jan', val: 5100, height: '52%' },
                      { month: 'Feb', val: 7800, height: '75%' },
                      { month: 'Mar', val: 10200, height: '100%' }
                    ].map((bar) => (
                      <div key={bar.month} className="flex flex-col items-center gap-2 h-full justify-end group">
                        <span className="text-[10px] font-mono text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          ${(bar.val / 1000).toFixed(1)}k
                        </span>
                        <div
                          className="w-full bg-neutral-900 group-hover:bg-neutral-800 rounded-t-lg transition-all"
                          style={{ height: bar.height }}
                        />
                        <span className="text-xs font-medium text-neutral-600 mt-2">{bar.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Orders in Overview */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <h3 className="font-serif font-bold text-lg text-neutral-900">
                      Recent Orders
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-semibold text-neutral-700 hover:text-neutral-950"
                    >
                      View All ({orders.length})
                    </button>
                  </div>

                  <div className="divide-y divide-neutral-100">
                    {orders.slice(0, 3).map((ord) => (
                      <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-mono font-bold text-neutral-900">{ord.orderNumber}</p>
                          <p className="text-neutral-500">{ord.shippingAddress.fullName} · {ord.items.length} items</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-neutral-900 tabular-nums">{formatPrice(ord.total)}</p>
                          <span className="text-[10px] uppercase font-semibold text-neutral-500">{ord.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Products Management */}
            {activeTab === 'products' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-neutral-900">
                      Catalog Management
                    </h3>
                    <p className="text-xs text-neutral-500">Live inventory and pricing adjustments</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search product..."
                        className="bg-neutral-50 border border-neutral-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-neutral-900"
                      />
                    </div>

                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-neutral-800 transition-colors shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Product</span>
                    </button>
                  </div>
                </div>

                {/* Table of products */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-neutral-100 text-neutral-400 uppercase tracking-wider text-[10px]">
                        <th className="pb-3 font-semibold">Object</th>
                        <th className="pb-3 font-semibold">Category</th>
                        <th className="pb-3 font-semibold">Price</th>
                        <th className="pb-3 font-semibold">Stock</th>
                        <th className="pb-3 font-semibold">Rating</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-neutral-50/70 transition-colors">
                          <td className="py-3.5 pr-4 flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-12 rounded-lg object-cover bg-neutral-100 shrink-0"
                            />
                            <div>
                              <p className="font-semibold text-neutral-900 truncate max-w-xs">{p.name}</p>
                              <p className="text-[11px] text-neutral-400">{p.id}</p>
                            </div>
                          </td>
                          <td className="py-3.5 pr-4 capitalize text-neutral-600 font-medium">
                            {p.category}
                          </td>
                          <td className="py-3.5 pr-4 font-bold text-neutral-900 tabular-nums">
                            {formatPrice(p.price)}
                          </td>
                          <td className="py-3.5 pr-4 tabular-nums">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                p.stockQuantity < 10
                                  ? 'bg-amber-50 text-amber-800'
                                  : 'bg-emerald-50 text-emerald-800'
                              }`}
                            >
                              {p.stockQuantity} units
                            </span>
                          </td>
                          <td className="py-3.5 pr-4 tabular-nums text-neutral-700">
                            ★ {p.rating} ({p.reviewCount})
                          </td>
                          <td className="py-3.5 text-right space-x-2">
                            <button
                              onClick={() => {
                                const newPriceStr = prompt('Enter new price ($):', p.price.toString());
                                if (newPriceStr && !isNaN(Number(newPriceStr))) {
                                  updateProduct(p.id, { price: Number(newPriceStr) });
                                }
                              }}
                              className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                              title="Update price"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Remove ${p.name} from catalog?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: Orders Management */}
            {activeTab === 'orders' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-neutral-900">
                      Fulfillment & Orders
                    </h3>
                    <p className="text-xs text-neutral-500">Live order status dispatch and courier allocation</p>
                  </div>

                  {/* Filter by status */}
                  <div className="flex items-center gap-2 text-xs">
                    <Filter className="w-3.5 h-3.5 text-neutral-400" />
                    <select
                      value={selectedOrderStatusFilter}
                      onChange={(e) => setSelectedOrderStatusFilter(e.target.value)}
                      className="bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-neutral-800"
                    >
                      <option value="all">All Statuses ({orders.length})</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-5 rounded-2xl border border-neutral-200 space-y-4 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                        <div>
                          <span className="font-mono font-bold text-neutral-950 text-sm">
                            {ord.orderNumber}
                          </span>
                          <span className="text-neutral-400 mx-2">·</span>
                          <span className="text-neutral-500">Date: {ord.date}</span>
                        </div>

                        {/* Interactive Status Changer */}
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-500">Change Status:</span>
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="bg-neutral-100 border border-neutral-200 rounded-md px-2 py-1 font-semibold text-neutral-900 cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-neutral-900">{ord.shippingAddress.fullName}</p>
                          <p className="text-neutral-500">
                            {ord.shippingAddress.street}, {ord.shippingAddress.city} {ord.shippingAddress.postalCode}
                          </p>
                          <p className="text-[11px] text-neutral-400">Payment: {ord.paymentMethod}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-neutral-400 text-[11px]">Total Amount</p>
                          <p className="text-base font-bold text-neutral-950 tabular-nums">
                            {formatPrice(ord.total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Customers */}
            {activeTab === 'customers' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-2xs space-y-6">
                <div className="pb-4 border-b border-neutral-100">
                  <h3 className="font-serif font-bold text-lg text-neutral-900">
                    Patron Registry
                  </h3>
                  <p className="text-xs text-neutral-500">Registered collectors and VIP accounts</p>
                </div>

                <div className="divide-y divide-neutral-100 text-xs">
                  <div className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold">
                        SV
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">Sophia Vance</p>
                        <p className="text-neutral-500">sophia.vance@studio.com</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-medium text-[11px]">
                        Collector Tier
                      </span>
                      <p className="text-neutral-400 text-[11px] mt-0.5">2 Orders · $709.00 spent</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#FAF9F6] p-6 sm:p-8 rounded-3xl shadow-2xl border border-neutral-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-neutral-900 mb-1">
              Publish New Object
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              Enter specification details for storefront publication.
            </p>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Spun Bronze Desk Luminaire"
                  className="w-full bg-white border border-neutral-200 rounded-lg p-2.5 text-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                    className="w-full bg-white border border-neutral-200 rounded-lg p-2.5 text-neutral-900"
                  >
                    <option value="furniture">Furniture</option>
                    <option value="lighting">Lighting</option>
                    <option value="apparel">Apparel</option>
                    <option value="tech">Acoustics / Tech</option>
                    <option value="objects">Objects</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Price (USD) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-white border border-neutral-200 rounded-lg p-2.5 text-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Tagline</label>
                  <input
                    type="text"
                    value={newTagline}
                    onChange={(e) => setNewTagline(e.target.value)}
                    placeholder="Short architectural subtitle"
                    className="w-full bg-white border border-neutral-200 rounded-lg p-2.5 text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Initial Stock Units</label>
                  <input
                    type="number"
                    min={1}
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-white border border-neutral-200 rounded-lg p-2.5 text-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Material provenance, dimensions, and craft details..."
                  className="w-full bg-white border border-neutral-200 rounded-lg p-2.5 text-neutral-900"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-neutral-950 text-white rounded-xl font-semibold uppercase tracking-wider hover:bg-neutral-800"
                >
                  Publish to Catalog
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-3 border border-neutral-300 rounded-xl font-semibold"
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
