import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, Heart, ArrowRight, Check } from 'lucide-react';
import { ProductVariantColor } from '../../types';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    formatPrice,
    toggleWishlist,
    isInWishlist,
    navigateToProduct
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<ProductVariantColor | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]);
      setSelectedImage(quickViewProduct.image);
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const inWish = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor || undefined);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleGoToDetails = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    navigateToProduct(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FAF9F6] rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-neutral-900 bg-white/80 backdrop-blur-xs rounded-full shadow-xs transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery / Image view */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-neutral-100/50">
          <div className="aspect-square rounded-xl overflow-hidden bg-white border border-neutral-200/60 relative">
            <img
              src={selectedImage}
              alt={quickViewProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {quickViewProduct.badge && (
              <span className="absolute top-3 left-3 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-white/95 text-neutral-900 rounded-md shadow-xs">
                {quickViewProduct.badge}
              </span>
            )}
          </div>

          {/* Mini thumbnails */}
          {quickViewProduct.gallery && quickViewProduct.gallery.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {quickViewProduct.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border shrink-0 transition-all ${
                    selectedImage === img
                      ? 'border-neutral-950 ring-1 ring-neutral-950'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <img
                    src={img}
                    alt="Thumbnail"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details side */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                <span className="capitalize">{quickViewProduct.category}</span>
                <span>·</span>
                <div className="flex items-center gap-1 text-neutral-800">
                  <Star className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />
                  <span className="font-semibold tabular-nums">{quickViewProduct.rating}</span>
                  <span className="text-neutral-400">({quickViewProduct.reviewCount})</span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900">
                {quickViewProduct.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                {quickViewProduct.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-xl font-bold text-neutral-950 tabular-nums">
                {formatPrice(quickViewProduct.price)}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-neutral-400 line-through tabular-nums">
                  {formatPrice(quickViewProduct.originalPrice)}
                </span>
              )}
            </div>

            {/* Color variants */}
            {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
              <div>
                <div className="text-xs font-medium text-neutral-700 mb-2">
                  Finish / Color: <span className="font-semibold">{selectedColor?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center ${
                        selectedColor?.name === c.name
                          ? 'ring-2 ring-neutral-900 ring-offset-2 scale-105'
                          : 'hover:scale-105 border border-black/10'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Short highlight bullet points */}
            <ul className="text-xs text-neutral-600 space-y-1.5 pt-2 border-t border-neutral-200">
              {quickViewProduct.highlights.slice(0, 2).map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-neutral-400 mt-0.5">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Row */}
          <div className="pt-6 space-y-3">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={!quickViewProduct.inStock}
                className="flex-1 py-3 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag</span>
                )}
              </button>
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  inWish
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-300 text-neutral-700 hover:border-neutral-900'
                }`}
                title={inWish ? 'Saved to Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-4 h-4 ${inWish ? 'fill-white' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleGoToDetails}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-950 py-1 transition-colors"
            >
              <span>View complete specifications & reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
