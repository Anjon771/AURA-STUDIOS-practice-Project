import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { CATEGORIES } from '../../data/products';
import {
  SlidersHorizontal,
  Grid3X3,
  List,
  Search,
  X,
  RotateCcw,
  Check,
  ChevronRight
} from 'lucide-react';
import { Product } from '../../types';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    formatPrice,
    setCurrentView,
    navigateToProduct,
    addToCart
  } = useStore();

  // Local Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategoryFilter !== 'all' && p.category !== selectedCategoryFilter) {
          return false;
        }
        // Search
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.tagline.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q);
          if (!match) return false;
        }
        // Price
        if (p.price > maxPrice) return false;
        // Rating
        if (minRating > 0 && p.rating < minRating) return false;
        // In Stock
        if (inStockOnly && !p.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === 'price-asc') return a.price - b.price;
        if (selectedSort === 'price-desc') return b.price - a.price;
        if (selectedSort === 'rating') return b.rating - a.rating;
        if (selectedSort === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // featured default
      });
  }, [products, selectedCategoryFilter, searchTerm, maxPrice, minRating, inStockOnly, selectedSort]);

  const resetFilters = () => {
    setSelectedCategoryFilter('all');
    setSearchTerm('');
    setMaxPrice(1500);
    setMinRating(0);
    setInStockOnly(false);
    setSelectedSort('featured');
  };

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategoryFilter) || CATEGORIES[0];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 sm:py-12 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-neutral-900 transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-neutral-900 font-medium capitalize">
            {selectedCategoryFilter === 'all' ? 'Complete Collection' : activeCategoryObj.name}
          </span>
        </nav>

        {/* Page Header */}
        <div className="pb-8 border-b border-neutral-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              The Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 tracking-tight mt-1">
              {activeCategoryObj.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl mt-1.5 leading-relaxed">
              {activeCategoryObj.description}
            </p>
          </div>

          <div className="text-xs text-neutral-500 font-medium tabular-nums">
            Showing {filteredProducts.length} of {products.length} objects
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="py-5 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          {/* Search bar inside shop */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search in collection..."
              className="w-full bg-white border border-neutral-200 rounded-lg pl-9 pr-8 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-medium text-neutral-800"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs text-neutral-600 bg-white border border-neutral-200 px-3 py-2 rounded-lg">
              <span className="text-neutral-400 hidden sm:inline">Sort:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as any)}
                className="bg-transparent focus:outline-none cursor-pointer font-medium text-neutral-900"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-white border border-neutral-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Body: Desktop Sidebar + Product List */}
        <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-7 sticky top-28 bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-2xs">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Filter Catalog
              </span>
              <button
                onClick={resetFilters}
                className="text-[11px] text-neutral-400 hover:text-neutral-900 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Categories Filter */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-neutral-800">Series & Disciplines</span>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategoryFilter(cat.slug)}
                    className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-md transition-colors text-left ${
                      selectedCategoryFilter === cat.slug
                        ? 'bg-neutral-900 text-white font-medium'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] opacity-60 tabular-nums">
                      {cat.slug === 'all'
                        ? products.length
                        : products.filter((p) => p.category === cat.slug).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 pt-3 border-t border-neutral-100">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-neutral-800">Max Price</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-neutral-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400">
                <span>$100</span>
                <span>$1,500</span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-2 pt-3 border-t border-neutral-100">
              <span className="text-xs font-semibold text-neutral-800">Rating</span>
              <div className="space-y-1">
                {[0, 4.8, 4.9].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    onClick={() => setMinRating(ratingVal)}
                    className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-md transition-colors ${
                      minRating === ratingVal
                        ? 'bg-neutral-100 text-neutral-950 font-semibold'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{ratingVal === 0 ? 'All Ratings' : `${ratingVal} Stars & Above`}</span>
                    {minRating === ratingVal && <Check className="w-3.5 h-3.5 text-neutral-900" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Availability Toggle */}
            <div className="pt-3 border-t border-neutral-100">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700 select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-0"
                />
                <span className="font-medium">In-Stock Pieces Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid / List Content */}
          <main className="lg:col-span-9">
            {isLoading ? (
              // Loading Skeleton State
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse bg-white p-4 rounded-2xl border border-neutral-200 space-y-4">
                    <div className="aspect-4/3 bg-neutral-200 rounded-xl" />
                    <div className="h-4 bg-neutral-200 rounded w-3/4" />
                    <div className="h-3 bg-neutral-100 rounded w-1/2" />
                    <div className="h-5 bg-neutral-200 rounded w-1/4 mt-4" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              // Empty State
              <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200 max-w-lg mx-auto space-y-4">
                <p className="text-lg font-serif font-bold text-neutral-900">
                  No objects match your criteria
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Try broadening your price limit or clearing the active category filters to view other curated works.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              // Responsive Grid View
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              // List View Mode
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigateToProduct(product.id)}
                    className="group bg-white p-5 rounded-2xl border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-6 cursor-pointer"
                  >
                    <div className="w-full sm:w-44 aspect-4/3 sm:aspect-square rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <span className="uppercase tracking-wider font-medium text-[11px]">
                          {product.category}
                        </span>
                        <span>·</span>
                        <span>Rating {product.rating}</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-neutral-900 group-hover:text-neutral-950">
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="w-full sm:w-auto text-left sm:text-right shrink-0 flex sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                      <div>
                        <div className="text-lg font-bold text-neutral-950 tabular-nums">
                          {formatPrice(product.price)}
                        </div>
                        {product.originalPrice && (
                          <div className="text-xs text-neutral-400 line-through tabular-nums">
                            {formatPrice(product.originalPrice)}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Bottom Sheet / Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-neutral-950/50 backdrop-blur-xs"
          />

          <div className="relative ml-auto w-full max-w-xs bg-[#FAF9F6] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Filters
                </span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-neutral-800">Category</span>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        setSelectedCategoryFilter(cat.slug);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between text-xs py-2 px-2.5 rounded-lg ${
                        selectedCategoryFilter === cat.slug
                          ? 'bg-neutral-900 text-white font-medium'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="space-y-2 pt-4 border-t border-neutral-200">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Max Price</span>
                  <span>{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-neutral-900"
                />
              </div>

              {/* In stock */}
              <div className="pt-4 border-t border-neutral-200">
                <label className="flex items-center gap-2 text-xs font-medium text-neutral-800">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-neutral-900"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-neutral-950 text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={() => {
                  resetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2 text-xs text-neutral-500 hover:text-neutral-900 text-center"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
