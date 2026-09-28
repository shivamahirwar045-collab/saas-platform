'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import {
  Shield,
  Lock,
  Smartphone,
  Laptop,
  CheckCircle,
  AlertTriangle,
  QrCode,
  Copy,
  Clock,
  LogOut,
  MapPin,
  Key
} from '@/components/icons';

interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

const initialSessions: ActiveSession[] = [
  {
    id: 'sess-01',
    device: 'MacBook Pro 16" (macOS Sequoia)',
    browser: 'Chrome 128.0 (Encrypted TLS 1.3)',
    ip: '190.141.22.84',
    location: 'Panama City, Bella Vista',
    lastActive: 'Active Now',
    isCurrent: true
  },
  {
    id: 'sess-02',
    device: 'POS Register #1 iPad Terminal',
    browser: 'KIAAN POS Native Shell (iOS 18)',
    ip: '190.141.22.85',
    location: 'Multiplaza Pacific Mall Branch',
    lastActive: '5 mins ago',
    isCurrent: false
  },
  {
    id: 'sess-03',
    device: 'Samsung Galaxy Tab S9 (Kiosk Terminal)',
    browser: 'Chrome Kiosk Mode',
    ip: '186.74.19.102',
    location: 'Colón Free Zone Warehouse Hub',
    lastActive: '12 mins ago',
    isCurrent: false
  }
];

export default function SettingsSecurityPage() {
  const { addToast } = useToast();
  const [sessions, setSessions] = useState<ActiveSession[]>(initialSessions);

  // MFA Wizard State
  const [isMfaModalOpen, setIsMfaModalOpen] = useState(false);
  const [mfaSecret] = useState('JBSWY3DPEHPK3PXP');
  const [verifyCode, setVerifyCode] = useState('');
  const [mfaConfigured, setMfaConfigured] = useState(true);

  // Security Policies State
  const [requireMfaForAll, setRequireMfaForAll] = useState(true);
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState('30');
  const [ipWhitelisting, setIpWhitelisting] = useState('190.141.22.0/24, 186.74.19.0/24');

  const handleTerminateSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    addToast('Remote session revoked and cryptographic JWT invalidated', 'info');
  };

  const handleTerminateAllOther = () => {
    setSessions(prev => prev.filter(s => s.isCurrent));
    addToast('All other remote terminals and web sessions terminated', 'success');
  };

  const handleCopySecret = () => {
    navigator.clipboard?.writeText(mfaSecret);
    addToast('Base32 MFA secret key copied to clipboard', 'info');
  };

  const handleVerifyMfa = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyCode.length === 6) {
      setMfaConfigured(true);
      setIsMfaModalOpen(false);
      setVerifyCode('');
      addToast('TOTP Authenticator successfully validated and active', 'success');
    }
  };

  const handleSaveSecurityPolicies = () => {
    addToast('Enterprise access & password policy updated successfully', 'success');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Settings</span>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Security &amp; MFA</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Security Posture &amp; Authentication</h1>
            <p className="text-sm text-slate-500">
              Multi-factor authentication (MFA/TOTP), remote session kill switch, and Panama Law 81 data compliance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/audit-logs'}>
              View Security Audit Logs
            </Button>
            <Button size="sm" onClick={handleSaveSecurityPolicies}>
              Save Security Policies
            </Button>
          </div>
        </div>

        {/* Security Scorecard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Enterprise Security Score"
            value="94 / 100"
            subtitle="SOC 2 Type II Compliant"
            icon={<Shield className="w-5 h-5 text-emerald-600" />}
          />
          <StatCard
            title="MFA Status (Your Account)"
            value={mfaConfigured ? 'TOTP Active' : 'Unprotected'}
            subtitle="Authenticator App Enforced"
            icon={<Lock className="w-5 h-5 text-indigo-600" />}
          />
          <StatCard
            title="Active Hardware Terminals"
            value={`${sessions.length} Stations`}
            subtitle="Encrypted sessions"
            icon={<Laptop className="w-5 h-5 text-blue-600" />}
          />
          <StatCard
            title="Panama Law 81 Privacy"
            value="Audited"
            subtitle="ANTAI Regulatory Alignment"
            icon={<CheckCircle className="w-5 h-5 text-purple-600" />}
          />
        </div>

        {/* 2-Column: MFA Management + Password / Policy Config */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* MFA TOTP Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Two-Factor Authentication (2FA / TOTP)</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Protects managerial approvals, fiscal PAC invoice voids, and administrative login credentials.
                </p>
              </div>
              <Badge variant={mfaConfigured ? 'success' : 'danger'}>
                {mfaConfigured ? 'ENFORCED' : 'OFF'}
              </Badge>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">Authenticator App (TOTP)</span>
                  <span className="text-slate-500">Google Authenticator, Microsoft Authenticator, 1Password, or YubiKey</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                <Button size="sm" variant="outline" onClick={() => setIsMfaModalOpen(true)} className="text-xs">
                  {mfaConfigured ? 'Reconfigure 2FA Authenticator' : 'Setup 2FA Now'}
                </Button>
                {mfaConfigured && (
                  <Button size="sm" variant="ghost" className="text-xs text-rose-600" onClick={() => { setMfaConfigured(false); addToast('2FA has been disabled for this account', 'warning'); }}>
                    Disable 2FA
                  </Button>
                )}
              </div>
            </div>

            {/* Recovery Codes */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1">
              <div className="font-semibold text-amber-900 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-amber-600" /> Emergency Recovery Backup
              </div>
              <p className="text-[11px] text-amber-800">
                You have 8 active cryptographic recovery codes available in case your mobile device is lost or reset.
              </p>
            </div>
          </div>

          {/* Access Policies & Whitelist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Enterprise Access &amp; Device Policies</h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
                <div>
                  <span className="font-bold text-slate-800 block">Enforce 2FA for All Staff Members</span>
                  <span className="text-slate-500 text-[11px]">Prevent any user from accessing POS or Back-Office without 2FA</span>
                </div>
                <input
                  type="checkbox"
                  checked={requireMfaForAll}
                  onChange={e => setRequireMfaForAll(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
              </label>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Inactivity Session Auto-Lock (Minutes)
                </label>
                <Input
                  value={sessionTimeoutMinutes}
                  onChange={e => setSessionTimeoutMinutes(e.target.value)}
                  type="number"
                  placeholder="30"
                  className="text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  POS &amp; Back-Office Allowed IP Ranges (CIDR)
                </label>
                <Input
                  value={ipWhitelisting}
                  onChange={e => setIpWhitelisting(e.target.value)}
                  placeholder="e.g. 190.141.22.0/24"
                  className="text-xs font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Branch retail registers will only allow cashier shifts from these authorized ISP blocks.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Sessions Control & Remote Termination */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Active Terminals &amp; Logged-in Devices</h3>
              <p className="text-xs text-slate-500">
                Monitor live web sessions, cashier tablets, and warehouse scanner terminals.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleTerminateAllOther} className="text-rose-600 hover:text-rose-700">
              <LogOut className="w-4 h-4 mr-2" /> Terminate All Other Sessions
            </Button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {sessions.map(s => (
              <div key={s.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    s.isCurrent ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {s.device.includes('MacBook') ? <Laptop className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      {s.device}
                      {s.isCurrent && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.2 rounded-full">
                          This Session
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap items-center gap-x-2">
                      <span>{s.browser}</span>
                      <span>•</span>
                      <span className="font-mono">{s.ip}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {s.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <span className="text-slate-400 font-mono text-[11px]">{s.lastActive}</span>
                  {!s.isCurrent && (
                    <Button variant="ghost" size="sm" onClick={() => handleTerminateSession(s.id)} className="text-rose-600 text-xs">
                      Revoke Access
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setup MFA Modal */}
        <Modal
          isOpen={isMfaModalOpen}
          onClose={() => setIsMfaModalOpen(false)}
          title="Configure Two-Factor Authenticator (TOTP)"
        >
          <form onSubmit={handleVerifyMfa} className="space-y-4 text-xs">
            <p className="text-slate-600">
              Scan the QR code below using your authenticator application (Google Authenticator, 1Password, Duo) or manually copy the secret key.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center space-y-3">
              {/* Simulated QR Box */}
              <div className="w-36 h-36 bg-white p-2 border-2 border-slate-900 rounded-xl shadow-xs flex items-center justify-center">
                <QrCode className="w-28 h-28 text-slate-900" />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-slate-700">{mfaSecret}</span>
                <Button type="button" variant="ghost" size="sm" onClick={handleCopySecret} className="h-6 px-1.5">
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Enter 6-Digit Verification Code from Authenticator
              </label>
              <Input
                value={verifyCode}
                onChange={e => setVerifyCode(e.target.value.slice(0, 6))}
                placeholder="123456"
                className="text-center font-mono text-lg tracking-widest"
                maxLength={6}
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsMfaModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={verifyCode.length !== 6}>
                Verify &amp; Activate 2FA
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
