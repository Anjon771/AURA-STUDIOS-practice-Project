import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    navigateToProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const [activeImage, setActiveImage] = useState(product.image);
  const [activeColor, setActiveColor] = useState(product.colors[0]);
  const [isAdding, setIsAdding] = useState(false);

  const inWish = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    setIsAdding(true);
    addToCart(product, 1, activeColor);
    setTimeout(() => setIsAdding(false), 900);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      onClick={() => navigateToProduct(product.id)}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-200/70 hover:border-neutral-300 hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      {/* Visual Image Container */}
      <div className="relative aspect-4/3 w-full bg-[#F5F4F0] overflow-hidden">
        <img
          src={activeImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Subtle Badge Tag (Single unboxed or soft tag, no pill clusters) */}
        {product.badge && (
          <span className="absolute top-3 left-3 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-white/95 text-neutral-900 rounded-md shadow-xs backdrop-blur-xs">
            {product.badge}
          </span>
        )}

        {/* Floating Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full shadow-md backdrop-blur-xs transition-transform hover:scale-110 ${
              inWish
                ? 'bg-neutral-900 text-white'
                : 'bg-white/90 text-neutral-800 hover:text-neutral-950'
            }`}
            title={inWish ? 'Saved' : 'Save to wishlist'}
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-4 h-4 ${inWish ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={handleQuickView}
            className="p-2 rounded-full bg-white/90 text-neutral-800 hover:text-neutral-950 shadow-md backdrop-blur-xs transition-transform hover:scale-110"
            title="Quick view"
            aria-label="Quick preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Bar on Image Bottom */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 hidden sm:block">
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="w-full py-2.5 bg-neutral-950/95 hover:bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md backdrop-blur-xs flex items-center justify-center gap-2 transition-colors disabled:bg-neutral-400"
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added to Bag</span>
              </>
            ) : product.inStock ? (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            ) : (
              <span>Out of Stock</span>
            )}
          </button>
        </div>
      </div>

      {/* Card Content & Typography */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Metadata Row: Category and Rating (zero pill discipline) */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
            <span className="uppercase tracking-wider text-[11px] font-medium text-neutral-500">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-neutral-800">
              <Star className="w-3 h-3 fill-neutral-900 text-neutral-900" />
              <span className="font-semibold text-xs tabular-nums">{product.rating}</span>
              <span className="text-[11px] text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-medium text-sm sm:text-base text-neutral-900 group-hover:text-neutral-950 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Bottom Row: Color Swatches & Price */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
          {/* Color Preview Swatches */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.slice(0, 3).map((col) => (
              <button
                key={col.name}
                onClick={() => {
                  setActiveColor(col);
                  if (product.gallery && product.gallery.length > 1) {
                    // switch image if gallery exists
                    const idx = product.colors.indexOf(col);
                    if (product.gallery[idx]) {
                      setActiveImage(product.gallery[idx]);
                    }
                  }
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  activeColor.name === col.name
                    ? 'ring-1 ring-neutral-900 ring-offset-1 scale-110'
                    : 'border-black/15 hover:scale-110'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
                aria-label={col.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-neutral-400 ml-0.5">
                +{product.colors.length - 3}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold text-neutral-900 tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Quick Add (visible on touch devices) */}
        <button
          onClick={handleQuickAdd}
          disabled={!product.inStock}
          className="sm:hidden w-full py-2 bg-neutral-900 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors disabled:bg-neutral-300"
        >
          {isAdding ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <ShoppingBag className="w-3.5 h-3.5" />
          )}
          <span>{isAdding ? 'Added' : 'Add to Bag'}</span>
        </button>
      </div>
    </div>
  );
};
