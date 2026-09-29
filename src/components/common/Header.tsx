import React, { useState } from 'react';
import { useStore, NavigationTarget } from '../../context/StoreContext';
import { Search, ShoppingBag, Heart, User, Menu, X, ShieldAlert } from 'lucide-react';
import { Currency } from '../../types';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    currency,
    setCurrency,
    user
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: NavigationTarget; filter?: string }[] = [
    { label: 'Shop', view: 'shop' },
    { label: 'Living', view: 'shop', filter: 'furniture' },
    { label: 'Lighting', view: 'shop', filter: 'lighting' },
    { label: 'Apparel', view: 'shop', filter: 'apparel' },
    { label: 'Acoustics', view: 'shop', filter: 'tech' }
  ];

  const handleNavClick = (view: NavigationTarget) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Editorial Announcement Bar */}
      <div className="bg-neutral-950 text-neutral-300 text-xs py-2 px-4 text-center font-normal tracking-wide flex items-center justify-center gap-3">
        <span>Complimentary white-glove shipping on orders over $150</span>
        <span className="hidden sm:inline opacity-30">|</span>
        <span className="hidden sm:inline text-neutral-400">Code AURA15 for 15% off first curation</span>
      </div>

      {/* Main Sticky Header: 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Zone 1: Single text element Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-neutral-950 hover:opacity-85 transition-opacity text-left"
            >
              AURA STUDIOS
            </button>
          </div>

          {/* Zone 2: Clean 4–6 text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-neutral-950 transition-colors py-1 relative ${
                currentView === 'home' ? 'text-neutral-950 font-semibold' : ''
              }`}
            >
              Home
              {currentView === 'home' && (
                <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-neutral-950" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`hover:text-neutral-950 transition-colors py-1 relative ${
                currentView === 'shop' ? 'text-neutral-950 font-semibold' : ''
              }`}
            >
              Collection
              {currentView === 'shop' && (
                <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-neutral-950" />
              )}
            </button>
            {navLinks.slice(1).map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view)}
                className="hover:text-neutral-950 transition-colors py-1 text-neutral-600"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1–2 primary action clusters */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Currency Switcher */}
            <div className="hidden lg:flex items-center text-xs font-medium text-neutral-500 hover:text-neutral-900 border-r border-neutral-200 pr-3 mr-1">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent cursor-pointer focus:outline-none pr-1"
                aria-label="Currency"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            {/* Instant Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors"
              title="Search catalog"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors relative"
              title="Saved items"
              aria-label="Saved items"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white text-[10px] font-medium flex items-center justify-center rounded-full tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account / Admin Portal Dropdown */}
            <button
              onClick={() => handleNavClick(user ? 'account' : 'auth')}
              className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-1.5"
              title={user ? `Account (${user.name})` : 'Sign in'}
              aria-label="User Account"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
              {user && (
                <span className="hidden xl:inline text-xs font-medium text-neutral-800 max-w-[80px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Admin Switcher shortcut */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors hidden sm:flex items-center text-xs gap-1 ${
                currentView === 'admin' ? 'bg-neutral-200/80 font-semibold' : ''
              }`}
              title="Admin Portal"
            >
              <ShieldAlert className="w-4 h-4 text-neutral-600" />
              <span className="text-[11px] font-medium text-neutral-600">Admin</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors rounded-lg text-xs font-medium tracking-wide shadow-sm"
              aria-label="View bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              <span className="hidden sm:inline">Bag</span>
              <span className="tabular-nums font-semibold">({cartItemCount})</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 hover:bg-neutral-100 rounded-lg md:hidden"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-[#FAF9F6] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-150">
            <div className="space-y-3">
              <button
                onClick={() => handleNavClick('home')}
                className="block w-full text-left text-base font-medium text-neutral-900 py-1"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop')}
                className="block w-full text-left text-base font-medium text-neutral-900 py-1"
              >
                Complete Collection
              </button>
              {navLinks.slice(1).map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.view)}
                  className="block w-full text-left text-sm text-neutral-600 py-1"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-200 flex flex-col gap-3 text-sm">
              <button
                onClick={() => handleNavClick('wishlist')}
                className="flex items-center justify-between py-1 text-neutral-800"
              >
                <span>Wishlist</span>
                <span className="text-xs bg-neutral-200 px-2 py-0.5 rounded text-neutral-700">
                  {wishlist.length} saved
                </span>
              </button>
              <button
                onClick={() => handleNavClick(user ? 'account' : 'auth')}
                className="flex items-center justify-between py-1 text-neutral-800"
              >
                <span>{user ? `Account (${user.name})` : 'Sign In / Register'}</span>
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center justify-between py-1 text-neutral-800"
              >
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-neutral-500" />
                  Store Admin Portal
                </span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-neutral-500">
              <span>Currency:</span>
              <div className="flex gap-2">
                {(['USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-1 rounded ${
                      currency === c
                        ? 'bg-neutral-900 text-white font-semibold'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
