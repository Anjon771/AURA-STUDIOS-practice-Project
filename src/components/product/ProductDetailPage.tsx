import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  Plus,
  Minus,
  MessageSquarePlus,
  X
} from 'lucide-react';
import { ProductVariantColor } from '../../types';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
    addReviewToProduct,
    recentlyViewedIds
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<ProductVariantColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes ? product.sizes[0] : undefined);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'shipping' | 'reviews'>('details');
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedEffect, setAddedEffect] = useState(false);

  // Review modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedColor(product.colors[0]);
      if (product.sizes) setSelectedSize(product.sizes[0]);
      setQuantity(1);
    }
  }, [product]);

  const inWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity, selectedColor, selectedSize);
    setAddedEffect(true);
    setTimeout(() => setAddedEffect(false), 1200);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    addToCart(product, quantity, selectedColor, selectedSize);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment || !reviewTitle) return;
    addReviewToProduct(product.id, {
      author: reviewAuthor,
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
      verified: true
    });
    setIsReviewModalOpen(false);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 4);

  // Recently viewed
  const recentlyViewed = products
    .filter((p) => p.id !== product.id && recentlyViewedIds.includes(p.id))
    .slice(0, 4);

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 sm:py-12 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-neutral-900 transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <button
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-neutral-900 transition-colors capitalize"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span className="text-neutral-900 font-medium truncate max-w-[200px] sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Top Product Hero: Sticky Gallery Left + Contiguous Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Gallery & Zoom */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
            {/* Primary Main Viewport */}
            <div
              onClick={() => setIsZoomed(!isZoomed)}
              className="relative aspect-4/3 sm:aspect-16/12 bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-xs cursor-zoom-in"
              title="Click to toggle high-res inspect"
            >
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'hover:scale-103'
                }`}
              />
              {product.badge && (
                <span className="absolute top-4 left-4 text-xs font-semibold tracking-wider uppercase px-3 py-1.5 bg-white/95 text-neutral-900 rounded-lg shadow-xs backdrop-blur-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImage(img);
                      setIsZoomed(false);
                    }}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border bg-white shrink-0 transition-all ${
                      activeImage === img
                        ? 'border-neutral-950 ring-2 ring-neutral-950/20 scale-102'
                        : 'border-neutral-200 hover:border-neutral-400 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail view"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                <span className="uppercase tracking-widest font-semibold text-[11px] text-neutral-400">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-neutral-800">
                  <Star className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />
                  <span className="font-semibold tabular-nums">{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewCount} Reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 tracking-tight leading-snug">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Price Row */}
            <div className="py-3 border-y border-neutral-100 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-neutral-950 tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-neutral-400 line-through tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* In Stock status */}
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-neutral-800">
                In Stock & Ready for White-Glove Dispatch ({product.stockQuantity} remaining)
              </span>
            </div>

            {/* Variant: Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-600">Material Finish:</span>
                  <span className="font-semibold text-neutral-900">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full transition-all ${
                        selectedColor.name === c.name
                          ? 'ring-2 ring-neutral-900 ring-offset-2 scale-105'
                          : 'border border-black/10 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Variant: Sizes (if applicable) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-600">Architectural Fit:</span>
                  <span className="font-semibold text-neutral-900">{selectedSize}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                        selectedSize === s
                          ? 'border-neutral-900 bg-neutral-900 text-white font-semibold'
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-neutral-300 rounded-xl bg-neutral-50 px-2 py-1.5 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-neutral-600 hover:text-neutral-950 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-neutral-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-neutral-600 hover:text-neutral-950 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {addedEffect ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-colors shrink-0 ${
                    inWish
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-300 text-neutral-700 hover:border-neutral-900'
                  }`}
                  title={inWish ? 'Saved to wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${inWish ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now CTA */}
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-neutral-900 text-neutral-900" />
                <span>Instant Purchase</span>
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-4 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center text-[11px] text-neutral-500">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-neutral-800" />
                <span>White-Glove Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-neutral-800" />
                <span>30-Day Home Trial</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-neutral-800" />
                <span>Lifetime Warranty</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Tabs: Overview, Specifications, Shipping, Reviews */}
        <div className="mt-16 sm:mt-24">
          <div className="border-b border-neutral-200 flex items-center gap-8 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-4 text-sm font-semibold transition-colors relative whitespace-nowrap ${
                activeTab === 'details' ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Curated Details
              {activeTab === 'details' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-950" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-sm font-semibold transition-colors relative whitespace-nowrap ${
                activeTab === 'specs' ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Architectural Specifications
              {activeTab === 'specs' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-950" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 text-sm font-semibold transition-colors relative whitespace-nowrap ${
                activeTab === 'shipping' ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Delivery & In-Home Trial
              {activeTab === 'shipping' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-950" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-semibold transition-colors relative whitespace-nowrap ${
                activeTab === 'reviews' ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Patron Reviews ({product.reviewCount})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-950" />
              )}
            </button>
          </div>

          <div className="py-8 bg-white p-6 sm:p-10 rounded-2xl border border-neutral-200/80 mt-6">
            {/* Tab: Details */}
            {activeTab === 'details' && (
              <div className="space-y-6 max-w-3xl">
                <h3 className="text-xl font-serif font-bold text-neutral-900">
                  Concept & Material Philosophy
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="pt-4 space-y-3">
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-400">
                    Design Highlights
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: Specs */}
            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <h3 className="text-xl font-serif font-bold text-neutral-900 mb-6">
                  Technical Specifications
                </h3>
                <dl className="divide-y divide-neutral-200">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="py-3.5 flex justify-between text-xs sm:text-sm">
                      <dt className="text-neutral-500 font-medium">{key}</dt>
                      <dd className="text-neutral-900 font-semibold text-right">{val}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Tab: Shipping */}
            {activeTab === 'shipping' && (
              <div className="space-y-6 max-w-3xl text-xs sm:text-sm text-neutral-600 leading-relaxed">
                <h3 className="text-xl font-serif font-bold text-neutral-900">
                  Delivery & Installation Protocols
                </h3>
                <p>{product.shippingInfo}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
                  <div className="space-y-1.5">
                    <h4 className="font-semibold text-neutral-900">30-Day Living Trial</h4>
                    <p className="text-xs text-neutral-500">
                      Take 30 days to test the object in your space under diverse natural and evening lighting conditions. If it does not harmonize, we provide scheduled courier pickup.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-semibold text-neutral-900">Lifetime Warranty</h4>
                    <p className="text-xs text-neutral-500">
                      Covers structural timber frames, mechanical driver components, and brass housings against defects for the life of the piece.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-neutral-900">
                      Patron Verified Reviews
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-neutral-900 text-neutral-900" />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-neutral-950 tabular-nums">
                        {product.rating} out of 5.0
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 self-start sm:self-auto transition-colors"
                  >
                    <MessageSquarePlus className="w-4 h-4" />
                    <span>Write a Review</span>
                  </button>
                </div>

                {/* Review items list */}
                <div className="space-y-6">
                  {product.reviewsList && product.reviewsList.length > 0 ? (
                    product.reviewsList.map((rev) => (
                      <div key={rev.id} className="pb-6 border-b border-neutral-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-neutral-900">
                              {rev.author}
                            </span>
                            {rev.verified && (
                              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                Verified Collector
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-neutral-400">{rev.date}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />
                          ))}
                        </div>

                        <h4 className="text-sm font-semibold text-neutral-900">{rev.title}</h4>
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-neutral-400">
                      Be the first patron to share an architectural impression of this piece.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 sm:mt-28">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                Harmonious Pairings
              </span>
              <h2 className="text-2xl font-serif font-bold text-neutral-900 tracking-tight mt-1">
                You May Also Admire
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Products */}
        {recentlyViewed.length > 0 && (
          <div className="mt-16 sm:mt-20 pt-16 border-t border-neutral-200">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                Browsing Trail
              </span>
              <h2 className="text-xl font-serif font-bold text-neutral-900 tracking-tight mt-1">
                Recently Viewed Works
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#FAF9F6] p-6 sm:p-8 rounded-2xl shadow-2xl border border-neutral-200 relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-neutral-900 mb-1">
              Write a Review
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              Sharing thoughts on {product.name}
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">
                  Overall Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setReviewRating(num)}
                      className={`p-2 rounded-lg border flex items-center gap-1 ${
                        reviewRating >= num
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 text-neutral-700'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{num}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">
                  Your Full Name / Title
                </label>
                <input
                  type="text"
                  required
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  placeholder="e.g. Henrik Vane, Architect"
                  className="w-full bg-white border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">
                  Headline / Title
                </label>
                <input
                  type="text"
                  required
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Heirloom centerpiece"
                  className="w-full bg-white border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">
                  Detailed Impressions
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe the tactile feel, finish quality, ergonomics, and how it sits in your space..."
                  className="w-full bg-white border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-neutral-950 text-white rounded-xl font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-3 border border-neutral-300 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-100"
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
