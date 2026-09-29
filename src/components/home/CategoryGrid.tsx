import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/products';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { setSelectedCategoryFilter, setCurrentView } = useStore();

  const handleCategoryClick = (categorySlug: string) => {
    setSelectedCategoryFilter(categorySlug);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showcaseCategories = CATEGORIES.filter((c) => c.slug !== 'all');

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Taxonomy of Design
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight mt-1">
              Curated Disciplines
            </h2>
          </div>
          <button
            onClick={() => handleCategoryClick('all')}
            className="text-xs font-semibold text-neutral-800 hover:text-neutral-950 flex items-center gap-1 group"
          >
            <span>View all collections</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="aspect-4/3 overflow-hidden bg-neutral-200 relative">
                <img
                  src={category.image}
                  alt={category.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-neutral-950/15 group-hover:bg-neutral-950/25 transition-colors" />
                
                <div className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-neutral-900" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                    <span>Series</span>
                    <span className="tabular-nums">{category.itemCount} Objects</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-neutral-900 group-hover:text-neutral-950">
                    {category.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
