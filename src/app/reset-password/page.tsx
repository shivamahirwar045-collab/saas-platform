'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, CheckCircle, Eye } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { success } = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      success('Password Updated', 'Your security credentials have been refreshed.');
      router.push('/login');
    }, 700);
  };

  // Password strength calculation
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-blue-600 selection:text-white">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
            <span className="font-extrabold text-lg tracking-tight">OS</span>
          </div>
        </Link>
        <h2 className="mt-4 text-2xl font-extrabold text-white tracking-tight">
          Set New Password
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Create a secure password for your enterprise workspace
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 sm:px-10 shadow-2xl rounded-3xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                New Password
              </label>
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
                  placeholder="At least 8 characters"
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

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  placeholder="Repeat your password"
                />
              </div>
            </div>

            {/* Password Requirements Checklist */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
              <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-400' : 'text-slate-500'}`}>
                <CheckCircle className="w-3.5 h-3.5" /> At least 8 characters
              </div>
              <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-400' : 'text-slate-500'}`}>
                <CheckCircle className="w-3.5 h-3.5" /> Contains a number
              </div>
              <div className={`flex items-center gap-1.5 ${hasSpecial ? 'text-emerald-400' : 'text-slate-500'}`}>
                <CheckCircle className="w-3.5 h-3.5" /> Contains a special symbol
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              disabled={!hasMinLength || password !== confirmPassword}
              className="w-full py-3"
            >
              Update Password & Sign In →
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
