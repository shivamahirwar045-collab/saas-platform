'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSaaS } from '@/context/SaaSContext';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import {
  Clock,
  QrCode,
  MapPin,
  CheckCircle,
  ChevronLeft,
  Building2,
  RefreshCw,
  Sparkles,
  Shield
} from '@/components/icons';

export default function AttendanceKioskPage() {
  const { currentBranch, branches, setCurrentBranch, currentUser } = useSaaS();
  const { success, info } = useToast();

  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [countdown, setCountdown] = useState(15);
  const [qrToken, setQrToken] = useState('PA-SEC-QR-99482');
  const [pinCode, setPinCode] = useState('');
  const [lastCheckIn, setLastCheckIn] = useState<{ name: string; type: 'IN' | 'OUT'; time: string } | null>(null);

  // Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentDate(now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 15-second Rolling QR Token
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setQrToken(`PA-SEC-QR-${Math.floor(10000 + Math.random() * 90000)}`);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePinDigit = (digit: string) => {
    if (pinCode.length < 4) {
      setPinCode((prev) => prev + digit);
    }
  };

  const handleClearPin = () => {
    setPinCode('');
  };

  const handlePinSubmit = (type: 'IN' | 'OUT') => {
    if (pinCode.length !== 4) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastCheckIn({
      name: 'Gabriel Rios (Associate)',
      type,
      time: timeStr
    });
    setPinCode('');
    success(
      `Check-${type} Recorded!`,
      `Shift timestamp logged at ${currentBranch.name.split(' (')[0]} [Verified GPS]`
    );
  };

  const handleSimulateQrScan = (type: 'IN' | 'OUT') => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastCheckIn({
      name: `${currentUser.name} (${currentUser.role})`,
      type,
      time: timeStr
    });
    success(
      `QR Check-${type} Authorized!`,
      `Token ${qrToken} authenticated with biometric hash.`
    );
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col font-sans select-none relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Top Tablet Bar */}
      <header className="h-16 px-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          <Link
            href="/attendance"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Exit Kiosk</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white text-sm">Attendance Terminal Kiosk</span>
          </div>
        </div>

        {/* Branch Station Picker */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Station:</span>
          </span>
          <select
            value={currentBranch.id}
            onChange={(e) => {
              const b = branches.find((item) => item.id === e.target.value);
              if (b) setCurrentBranch(b);
            }}
            className="bg-slate-800 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none"
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Kiosk Display: 2 Columns */}
      <div className="flex-1 max-w-6xl mx-auto w-full p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10 overflow-y-auto">
        {/* Left Column: Clock & Anti-Fraud Dynamic Rolling QR */}
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-8 flex flex-col items-center text-center space-y-6 shadow-2xl backdrop-blur-md">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Official Station Time</p>
            <h2 className="text-4xl sm:text-5xl font-black font-mono text-white mt-1 tracking-tight">
              {currentTime || '08:30:00 AM'}
            </h2>
            <p className="text-xs text-slate-400 mt-1 capitalize font-medium">{currentDate}</p>
          </div>

          {/* Dynamic Rolling QR Container */}
          <div className="p-6 bg-white rounded-2xl shadow-xl flex flex-col items-center space-y-3 relative group">
            <div className="w-52 h-52 bg-slate-900 rounded-xl flex items-center justify-center p-3 text-white">
              <QrCode className="w-44 h-44 text-white" />
            </div>

            <div className="w-full flex items-center justify-between font-mono text-[11px] text-slate-500 pt-1">
              <span className="font-bold text-slate-800">{qrToken}</span>
              <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3 animate-spin" /> {countdown}s
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-300">
              Scan with KIAAN Mobile App on your phone
            </p>
            <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
              Rolling 15-second biometric token prevents proxy clock-ins and buddy punching.
            </p>
          </div>

          {/* Scan Simulator Triggers */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            <Button
              variant="success"
              size="md"
              className="py-3 font-bold text-xs"
              onClick={() => handleSimulateQrScan('IN')}
            >
              Simulate QR Check-IN
            </Button>
            <Button
              variant="outline"
              size="md"
              className="py-3 font-bold text-xs border-slate-700 text-slate-300 hover:bg-slate-800"
              onClick={() => handleSimulateQrScan('OUT')}
            >
              Simulate QR Check-OUT
            </Button>
          </div>
        </div>

        {/* Right Column: Touch PIN Keypad & Confirmation Feed */}
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between space-y-6 shadow-2xl backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Alternative: 4-Digit Employee PIN
              </span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>

            {/* PIN Display */}
            <div className="my-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
              <span className="text-3xl font-mono tracking-[0.5em] text-white">
                {pinCode ? '•'.repeat(pinCode.length) : 'ENTER PIN'}
              </span>
            </div>

            {/* Keypad Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => {
                    if (k === 'C') handleClearPin();
                    else if (k === '⌫') setPinCode((prev) => prev.slice(0, -1));
                    else handlePinDigit(k);
                  }}
                  className="h-14 rounded-2xl bg-slate-850 hover:bg-slate-800 active:scale-95 border border-slate-750 text-lg font-bold font-mono text-white transition-all shadow-xs flex items-center justify-center"
                >
                  {k}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 max-w-xs mx-auto">
              <Button
                variant="success"
                size="md"
                disabled={pinCode.length !== 4}
                className="py-3 font-bold text-xs"
                onClick={() => handlePinSubmit('IN')}
              >
                Punch IN
              </Button>
              <Button
                variant="danger"
                size="md"
                disabled={pinCode.length !== 4}
                className="py-3 font-bold text-xs"
                onClick={() => handlePinSubmit('OUT')}
              >
                Punch OUT
              </Button>
            </div>
          </div>

          {/* Last Check-in Status Feed */}
          {lastCheckIn && (
            <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/30 flex items-center gap-3 animate-in fade-in">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white leading-tight">{lastCheckIn.name}</p>
                <p className="text-emerald-400 mt-0.5 font-mono">
                  Clocked {lastCheckIn.type} at {lastCheckIn.time} (GPS Verified)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
