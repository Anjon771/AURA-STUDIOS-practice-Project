import React from 'react';
import { useStore } from '../../context/StoreContext';
import { lightingImg } from '../../data/products';
import { Compass, Feather, Hammer, Sparkles } from 'lucide-react';

export const EditorialStory: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter } = useStore();

  const handleLearnMore = () => {
    setSelectedCategoryFilter('lighting');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 sm:py-28 bg-[#18181B] text-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative">
              <img
                src={lightingImg}
                alt="Architectural lighting and craftsmanship details"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-xs text-neutral-300">
                <span className="font-semibold text-white">Horizon Series · No. 04</span>
                <span className="mx-2 text-neutral-500">/</span>
                <span>Lathe-spun raw solid brass</span>
              </div>
            </div>
          </div>

          {/* Right Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
              <span>Materiality & Philosophy</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] text-balance">
              Designed to age with grace, engineered without compromise.
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              We reject the planned obsolescence of disposable consumerism. Every object is created in dialogue with specialist craft ateliers in Copenhagen, Porto, and Okayama, honoring raw natural textures that develop a rich, personal patina over decades.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800">
              <div className="space-y-1.5">
                <Hammer className="w-5 h-5 text-neutral-300" />
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Honest Joinery
                </h4>
                <p className="text-[11px] text-neutral-400 leading-normal">
                  Traditional mortise-and-tenon joints without visible synthetic fasteners.
                </p>
              </div>

              <div className="space-y-1.5">
                <Feather className="w-5 h-5 text-neutral-300" />
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Organic Fibers
                </h4>
                <p className="text-[11px] text-neutral-400 leading-normal">
                  Low-tension loom Japanese selvedge and 19.5-micron combed merino wool.
                </p>
              </div>

              <div className="space-y-1.5">
                <Compass className="w-5 h-5 text-neutral-300" />
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Lifetime Service
                </h4>
                <p className="text-[11px] text-neutral-400 leading-normal">
                  Component restoration, re-lamping modules, and parts guarantee.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleLearnMore}
                className="px-6 py-3.5 bg-white text-neutral-950 hover:bg-neutral-200 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <span>Explore the Horizon Series</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
