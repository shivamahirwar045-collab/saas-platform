'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Lock,
  Mail,
  Eye,
  CheckCircle,
  ArrowRight,
  Shield,
  Sparkles,
  UserCheck
} from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useSaaS } from '@/context/SaaSContext';
import { useToast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const { switchUserRole } = useSaaS();
  const { success, info } = useToast();

  const [email, setEmail] = useState('alexander.sterling@panamatech.pa');
  const [password, setPassword] = useState('demopassword123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMfaModal, setShowMfaModal] = useState(false);
  const [mfaCode, setMfaCode] = useState('');

  // Quick Role Presets for easy evaluation
  const rolePresets = [
    { role: 'Owner' as const, email: 'alexander.sterling@panamatech.pa', label: 'Owner (Full Access)' },
    { role: 'Manager' as const, email: 'valeria.gomez@panamatech.pa', label: 'Store Manager' },
    { role: 'Cashier' as const, email: 'carlos.mendoza@panamatech.pa', label: 'POS Cashier' },
    { role: 'Inventory' as const, email: 'esteban.villarreal@panamatech.pa', label: 'Warehouse Tech' }
  ];

  const handleRoleSelect = (preset: typeof rolePresets[0]) => {
    setEmail(preset.email);
    setPassword('demopassword123');
    switchUserRole(preset.role);
    info('Quick-Login Profile Selected', `Switched active role preview to ${preset.role}`);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate MFA challenge check
    setTimeout(() => {
      setIsLoading(false);
      setShowMfaModal(true);
    }, 600);
  };

  const handleMfaVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaCode.length < 6) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowMfaModal(false);
      success('Authentication Successful', 'Welcome back to KIAAN BusinessOS');
      router.push('/dashboard');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-blue-600 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
            <span className="font-extrabold text-lg tracking-tight">OS</span>
          </div>
        </Link>
        <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Sign in to BusinessOS
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Enter your enterprise credentials or pick a role demo profile
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 sm:px-10 shadow-2xl rounded-3xl space-y-6">
          {/* Quick-Login Preset Bar */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              ⚡ Quick-Demo Role Presets (Instant Fill)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {rolePresets.map((p) => (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => handleRoleSelect(p)}
                  className={`p-2 rounded-xl text-left border text-xs font-medium transition-all ${
                    email === p.email
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <p className="leading-tight">{p.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-3 text-slate-400 font-medium">Or email sign in</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember this workstation for 30 days</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full py-3"
            >
              Sign In to Workspace →
            </Button>
          </form>

          {/* Social SSO Placeholders */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-3 text-slate-400 font-medium">Enterprise SSO</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  window.open('https://accounts.google.com/signin', '_blank', 'noopener,noreferrer');
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-850 text-xs font-semibold text-slate-300 transition-colors"
              >
                <span>Google SSO</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  window.open('https://login.microsoftonline.com', '_blank', 'noopener,noreferrer');
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-850 text-xs font-semibold text-slate-300 transition-colors"
              >
                <span>Microsoft 365</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-400">
              Don't have an enterprise account?{' '}
              <Link href="/signup" className="font-semibold text-blue-400 hover:text-blue-300">
                Start 7-Day Free Trial
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* MFA Challenge Modal (Frontend Simulation) */}
      {showMfaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-white">Multi-Factor Authentication (MFA)</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter the 6-digit security code generated by your Authenticator app (Google Authenticator / 1Password)
              </p>
            </div>

            <form onSubmit={handleMfaVerify} className="space-y-4">
              <div>
                <input
                  type="text"
                  maxLength={6}
                  autoFocus
                  placeholder="• • • • • •"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center text-2xl font-mono tracking-[0.5em] py-3 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-[11px] text-center text-slate-500 mt-1.5 font-mono">
                  Demo hint: Type any 6 digits (e.g. 123456)
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setShowMfaModal(false)}
                  className="flex-1 border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  disabled={mfaCode.length < 6}
                  className={`flex-1 transition-opacity ${mfaCode.length < 6 ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  Verify &amp; Enter
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
