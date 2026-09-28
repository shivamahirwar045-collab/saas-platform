'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Mail,
  Lock,
  CheckCircle,
  Globe,
  ArrowRight,
  Shield,
  Sparkles
} from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export default function SignupPage() {
  const router = useRouter();
  const { success } = useToast();

  const [companyName, setCompanyName] = useState('Panama Logistics & Retail Corp');
  const [fullName, setFullName] = useState('Alexander Sterling');
  const [email, setEmail] = useState('alexander.sterling@panamatech.pa');
  const [password, setPassword] = useState('Password123!');
  const [country, setCountry] = useState('Panama');
  const [currency, setCurrency] = useState('USD ($)');
  const [plan, setPlan] = useState<'starter' | 'growth' | 'enterprise'>('growth');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      success('Workspace Provisioned!', 'Redirecting to your 10-step onboarding setup...');
      router.push('/onboarding');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-blue-600 selection:text-white">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/15 to-cyan-400/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
            <span className="font-extrabold text-lg tracking-tight">OS</span>
          </div>
        </Link>
        <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Create Your Business Workspace
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Start your 7-day free trial. Unify your POS, website, and Panama fiscal PAC.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 sm:px-10 shadow-2xl rounded-3xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Plan Selector Radio Cards */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Selected Plan (Includes 7-Day Free Trial)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'starter', label: 'Starter', price: '$49/mo', desc: '1 Branch' },
                  { id: 'growth', label: 'Growth', price: '$149/mo', desc: '5 Branches' },
                  { id: 'enterprise', label: 'Enterprise', price: '$399/mo', desc: 'Unlimited' }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlan(p.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      plan === p.id
                        ? 'border-blue-500 bg-blue-950/40 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <p className="text-xs font-bold text-white">{p.label}</p>
                    <p className="text-[11px] text-blue-400 font-mono mt-0.5">{p.price}</p>
                    <p className="text-[10px] text-slate-500">{p.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Business / Legal Entity Name
                </label>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    placeholder="E.g. Inversiones Panama S.A."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Primary Contact Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  placeholder="Carlos Mendoza"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Country / Fiscal Jurisdiction
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                >
                  <option value="Panama">Panama (DGI PAC Factura Electrónica)</option>
                  <option value="Costa Rica">Costa Rica (Hacienda FE)</option>
                  <option value="Colombia">Colombia (DIAN Facturación)</option>
                  <option value="United States">United States (Standard Tax)</option>
                  <option value="International">Other / Global International</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Operating Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                >
                  <option value="USD ($)">USD ($) - US Dollar / Balboa</option>
                  <option value="EUR (€)">EUR (€) - Euro</option>
                  <option value="COP ($)">COP ($) - Colombian Peso</option>
                  <option value="CRC (₡)">CRC (₡) - Costa Rican Colón</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Work Email Address
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  placeholder="admin@panamatech.pa"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  placeholder="At least 8 characters"
                />
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-xs text-slate-400 leading-relaxed">
                I agree to the KIAAN BusinessOS Terms of Service, Privacy Policy, and DGI PAC authorized data processing agreement.
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              disabled={!agreeTerms}
              className="w-full py-3.5 mt-2"
            >
              <span>Continue to 10-Step Setup Wizard →</span>
            </Button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-400">
              Already have an active account?{' '}
              <Link href="/login" className="font-semibold text-blue-400 hover:text-blue-300">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
