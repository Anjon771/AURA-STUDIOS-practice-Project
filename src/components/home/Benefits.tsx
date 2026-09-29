import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'White-Glove Delivery',
      desc: 'Complimentary shipping over $150. Room-of-choice placement and packaging removal.'
    },
    {
      icon: ShieldCheck,
      title: 'Certified Security',
      desc: 'End-to-end encrypted checkout with Apple Pay, 3D Secure, and 0% Klarna installments.'
    },
    {
      icon: RotateCcw,
      title: '30-Day In-Home Trial',
      desc: 'Live with each piece in your natural light. Effortless returns with prepaid courier pickup.'
    },
    {
      icon: Headphones,
      title: 'Atelier Concierge',
      desc: 'Direct consultation on spatial dimensions, custom finishes, and architectural orders.'
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-[#F5F4F0] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl border border-neutral-200/80 shadow-2xs shrink-0">
                  <Icon className="w-5 h-5 text-neutral-800 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 tracking-tight">
                    {b.title}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
