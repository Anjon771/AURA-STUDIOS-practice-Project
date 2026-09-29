import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      id: 1,
      quote:
        'The Sculptural Oak Lounge Chair transformed our living room. The grain quality and paper cord tension exceed anything available from mass luxury houses.',
      author: 'Lars Mikkelsen',
      role: 'Principal Architect',
      studio: 'Studio Mikkelsen, Stockholm',
      item: 'Sculptural Oak Lounge Chair'
    },
    {
      id: 2,
      quote:
        'The Horizon Brass Pendant provides the most flattering, natural light cast. The spun brass is substantial, and dimming to 1% creates absolute warmth.',
      author: 'Clara Delacroix',
      role: 'Interior Designer',
      studio: 'Atelier Delacroix, Paris',
      item: 'Brushed Brass Horizon Pendant'
    },
    {
      id: 3,
      quote:
        'The ANC headphones offer the acoustic precision of monitor studio gear paired with a tactile aluminum feel that makes Zoom and music playback a genuine pleasure.',
      author: 'David Zhang',
      role: 'Sound Designer & Editor',
      studio: 'Echo Chamber, San Francisco',
      item: 'Studio Precision ANC Acoustic Headphones'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
            Patron Chronicles
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight">
            Endorsed by architects & collectors.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Real feedback from spaces furnished with AURA creations across 24 countries.
          </p>
        </div>

        {/* 3 Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white p-7 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5 Stars + Verified */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-medium">
                    Verified Acquisition
                  </span>
                </div>

                <Quote className="w-6 h-6 text-neutral-200 stroke-[1.5]" />

                <p className="text-sm text-neutral-700 leading-relaxed italic">
                  "{r.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 space-y-1">
                <div className="text-sm font-semibold text-neutral-950">{r.author}</div>
                <div className="text-xs text-neutral-500">
                  {r.role} · {r.studio}
                </div>
                <div className="text-[11px] text-neutral-400 pt-1">
                  Acquired: <span className="text-neutral-700 font-medium">{r.item}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
