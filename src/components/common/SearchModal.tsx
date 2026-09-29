import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigateToProduct, formatPrice } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (productId: string) => {
    setIsSearchOpen(false);
    navigateToProduct(productId);
  };

  const suggestions = ['Lounge Chair', 'Pendant', 'Raw Cotton', 'Travertine', 'Acoustics', 'Incense'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-neutral-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#FAF9F6] rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-neutral-200">
          <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, materials, or categories..."
            className="w-full bg-transparent text-base sm:text-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-700 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 px-2 py-1 bg-neutral-100 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {!query.trim() ? (
            <div className="space-y-4">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Popular Inquiries
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setQuery(sug)}
                    className="text-xs px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-200/80">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  Curated Catalog Highlights
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {products.slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect(p.id)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-100 text-left transition-colors group"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover bg-neutral-100 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-neutral-900 truncate group-hover:text-neutral-950">
                          {p.name}
                        </p>
                        <p className="text-xs text-neutral-500 tabular-nums">
                          {formatPrice(p.price)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : filtered.length > 0 ? (
            <div className="space-y-2">
              <div className="text-xs text-neutral-400 mb-2">
                Found {filtered.length} {filtered.length === 1 ? 'object' : 'objects'}
              </div>
              {filtered.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelect(product.id)}
                  className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-100 text-left transition-colors group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg object-cover bg-neutral-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <span className="capitalize">{product.category}</span>
                      <span>·</span>
                      <span>Rating {product.rating}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-neutral-900 truncate group-hover:underline">
                      {product.name}
                    </h4>
                    <p className="text-xs text-neutral-500 truncate">{product.tagline}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-semibold text-neutral-900 tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all mt-1 ml-auto" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600 font-medium">No objects matching "{query}"</p>
              <p className="text-xs text-neutral-400 mt-1">
                Try searching by material, such as 'oak', 'brass', 'cotton', or browse all pieces.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
