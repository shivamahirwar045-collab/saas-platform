'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle, ChevronLeft } from '@/components/icons';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('alexander.sterling@panamatech.pa');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

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
          Reset Your Password
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Enter your registered work email to receive a password recovery link
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 sm:px-10 shadow-2xl rounded-3xl space-y-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="w-full py-3"
              >
                Send Recovery Instructions →
              </Button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Recovery Email Dispatched</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We've sent password reset instructions to <span className="text-white font-mono">{email}</span>. Click the link in your email within 15 minutes.
              </p>
              <div className="pt-2">
                <Link
                  href="/reset-password"
                  className="inline-block text-xs font-semibold text-blue-400 hover:text-blue-300 underline"
                >
                  (Demo: Continue to New Password screen)
                </Link>
              </div>
            </div>
          )}

          <div className="text-center pt-2 border-t border-slate-800">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
