import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, addToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Invalid Email', 'Please provide a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Subscription Confirmed', 'You have been enrolled in our seasonal catalogue preview.');
    setEmail('');
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Manifesto Row */}
        <div className="pb-12 border-b border-neutral-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              The Atelier Journal
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Invitations to archival drops and design previews.
            </h3>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              Curated monthly dispatches exploring architecture, tactile materiality, and newly released limited-run pieces.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md lg:ml-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-500 px-4 py-3 rounded-xl text-xs flex-1 focus:outline-none focus:border-neutral-400 transition-colors"
              />
              <button
                type="submit"
                className="bg-white hover:bg-neutral-200 text-neutral-950 font-semibold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <span>Join Atelier</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Collection
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  All Objects
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Furniture & Seating
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Architectural Lighting
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Japanese Raw Textiles
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Acoustic Audio Instruments
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Studio & Philosophy
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Material Provenance
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-white transition-colors">
                  Copenhagen Workshop
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-white transition-colors">
                  Zero-Waste Commitments
                </a>
              </li>
              <li>
                <a href="#trade" className="hover:text-white transition-colors">
                  Architectural Trade Program
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-neutral-500"
                >
                  Internal Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => setCurrentView('account')}
                  className="hover:text-white transition-colors"
                >
                  Track Order
                </button>
              </li>
              <li>
                <span className="text-neutral-400">White-Glove Delivery</span>
              </li>
              <li>
                <span className="text-neutral-400">30-Day Home Trial</span>
              </li>
              <li>
                <span className="text-neutral-400">Lifetime Frame Guarantee</span>
              </li>
              <li>
                <span className="text-neutral-400">Direct Atelier Line</span>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Headquarters
            </h4>
            <p className="text-neutral-400 leading-relaxed">
              AURA Studios ApS<br />
              Bredgade 34, 1260<br />
              Copenhagen, Denmark
            </p>
            <p className="text-neutral-400">
              concierge@aurastudios.com<br />
              Mon–Fri 09:00–18:00 CET
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} AURA Studios. All rights reserved. Crafted with architectural discipline.
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span>Visa</span>
            <span>·</span>
            <span>Mastercard</span>
            <span>·</span>
            <span>American Express</span>
            <span>·</span>
            <span>Apple Pay</span>
            <span>·</span>
            <span>Klarna 0%</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
