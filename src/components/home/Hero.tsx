import React from 'react';
import { useStore } from '../../context/StoreContext';
import { heroImg } from '../../data/products';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter } = useStore();

  const handleExplore = () => {
    setSelectedCategoryFilter('all');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLighting = () => {
    setSelectedCategoryFilter('lighting');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#F5F4F0] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
              <span>Spring / Summer 2026 Collection</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-neutral-950 tracking-tight leading-[1.1] text-balance">
              Architectural presence for modern living spaces.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              Precision-joined European white oaks, hand-spun solid brass luminaires, and shuttle-loom Japanese textiles. Built for lifetimes, not seasons.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={handleExplore}
                className="px-7 py-4 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-sm transition-all group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleLighting}
                className="px-6 py-4 bg-white/80 hover:bg-white text-neutral-900 border border-neutral-300/80 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors text-center"
              >
                View Lighting Series
              </button>
            </div>

            {/* Quiet trust markers (zero pill) */}
            <div className="pt-6 border-t border-neutral-300/60 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-500 font-medium">
              <span>FSC European White Oak</span>
              <span className="text-neutral-300">/</span>
              <span>Spun Solid Brass</span>
              <span className="text-neutral-300">/</span>
              <span>Carbon-Neutral Delivery</span>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-16/11 rounded-2xl overflow-hidden shadow-2xl border border-neutral-300/70 bg-neutral-200">
              <img
                src={heroImg}
                alt="Modern minimalist architectural living space"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700 ease-out"
              />
              
              {/* Floating Curated Piece Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-neutral-200/80">
                <div className="flex items-center justify-between text-[11px] text-neutral-500 uppercase tracking-wider mb-1">
                  <span>Featured Centerpiece</span>
                  <span className="font-semibold text-neutral-900">$890</span>
                </div>
                <p className="text-sm font-semibold text-neutral-900 truncate">
                  Sculptural Oak Lounge Chair
                </p>
                <p className="text-xs text-neutral-500 line-clamp-1">
                  Solid European white oak & Danish woven cord
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
