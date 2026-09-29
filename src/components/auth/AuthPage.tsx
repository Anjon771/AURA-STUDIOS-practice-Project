import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { heroImg } from '../../data/products';
import { Lock, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login, setCurrentView, addToast } = useStore();
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(email || 'patron@studio.com', 'customer');
      setCurrentView('account');
    } else if (authMode === 'register') {
      login(email || 'new.collector@studio.com', 'customer');
      addToast('Welcome to AURA Studios', 'Your collector membership has been created.');
      setCurrentView('account');
    } else if (authMode === 'forgot') {
      setResetSent(true);
      addToast('Reset Dispatch Sent', 'Please review your email inbox for security links.');
    }
  };

  const handleDemoCustomer = () => {
    login('sophia.vance@studio.com', 'customer');
    setCurrentView('account');
  };

  const handleDemoAdmin = () => {
    login('director.cole@aurastudios.com', 'admin');
    setCurrentView('admin');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8 border-b border-neutral-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
          Patron Access
        </span>
        <h2 className="text-3xl font-serif font-bold text-neutral-950 tracking-tight mt-1">
          {authMode === 'login' && 'Sign in to your account'}
          {authMode === 'register' && 'Register your patronage'}
          {authMode === 'forgot' && 'Reset your credentials'}
        </h2>
        <p className="text-xs text-neutral-500 mt-2">
          {authMode === 'login' && 'Access order history, saved curations, and private sales.'}
          {authMode === 'register' && 'Join an exclusive circle of architectural design patrons.'}
          {authMode === 'forgot' && 'Enter your registered email to receive an access token.'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-neutral-200/80 shadow-xs space-y-6">
          
          {/* Quick 1-Click Demo Buttons for reviewers & testing */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 space-y-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
              1-Click Demo Profiles
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={handleDemoCustomer}
                className="p-2.5 bg-white border border-neutral-200 hover:border-neutral-900 rounded-xl text-neutral-900 font-medium transition-colors text-left"
              >
                <div className="font-semibold">Sophia Vance</div>
                <div className="text-[10px] text-neutral-400">Collector Account</div>
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="p-2.5 bg-white border border-neutral-200 hover:border-neutral-900 rounded-xl text-neutral-900 font-medium transition-colors text-left"
              >
                <div className="font-semibold">Marcus Cole</div>
                <div className="text-[10px] text-neutral-400">Store Director (Admin)</div>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-neutral-400 uppercase tracking-wider text-[10px]">
                Or enter credentials
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {authMode === 'register' && (
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Henrik Vane"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                />
              </div>
            )}

            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@domain.com"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
              />
            </div>

            {authMode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-neutral-700 font-semibold">
                    Password
                  </label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-[11px] text-neutral-500 hover:text-neutral-900 underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                />
              </div>
            )}

            {resetSent && authMode === 'forgot' && (
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instructions dispatched to {email}. Check your spam or inbox.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>
                {authMode === 'login' && 'Sign In to Atelier'}
                {authMode === 'register' && 'Complete Registration'}
                {authMode === 'forgot' && 'Send Reset Token'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle between Login and Register */}
          <div className="pt-2 text-center text-xs text-neutral-500 space-y-2">
            {authMode === 'login' ? (
              <p>
                Not registered yet?{' '}
                <button
                  onClick={() => setAuthMode('register')}
                  className="font-semibold text-neutral-900 underline ml-1"
                >
                  Create Patron Account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setAuthMode('login')}
                  className="font-semibold text-neutral-900 underline ml-1"
                >
                  Return to Sign In
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
