import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, setCurrentView } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 sm:py-16 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="pb-8 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Curated Selection
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 tracking-tight mt-1">
              Saved Works
            </h1>
          </div>
          <span className="text-xs text-neutral-500 tabular-nums">
            {savedProducts.length} {savedProducts.length === 1 ? 'object saved' : 'objects saved'}
          </span>
        </div>

        {savedProducts.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-neutral-100 mx-auto flex items-center justify-center text-neutral-400">
              <Heart className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-serif font-bold text-neutral-900">
                Your wishlist is empty
              </h2>
              <p className="text-xs text-neutral-500">
                Tap the heart on any product across our catalog to preserve it for later inspection.
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-neutral-950 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Collection</span>
            </button>
          </div>
        ) : (
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
