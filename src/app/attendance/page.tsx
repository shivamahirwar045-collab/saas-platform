'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { AttendanceRecord } from '@/types/saas';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import {
  Clock,
  QrCode,
  MapPin,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  UserCheck
} from '@/components/icons';
import { mockAttendanceRecords } from '@/data/mockData';

export default function AttendancePage() {
  const { currentBranch, currentBusiness, currentUser } = useSaaS();
  const [activeTab, setActiveTab] = useState<'kiosk' | 'records' | 'geofence'>('kiosk');
  const [records, setRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);

  // Dynamic QR Code Simulator State
  const [qrCountdown, setQrCountdown] = useState(15);
  const [qrToken, setQrToken] = useState('PA-ATT-QR-9928174');
  const [userCheckedIn, setUserCheckedIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setQrCountdown(prev => {
        if (prev <= 1) {
          // Regenerate dynamic cryptographic QR token
          setQrToken(`PA-ATT-QR-${Math.floor(1000000 + Math.random() * 9000000)}`);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSimulateSelfCheckIn = () => {
    const newRec: AttendanceRecord = {
      id: `att_${Date.now()}`,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      department: 'Executive',
      branchName: currentBranch.name,
      date: new Date().toISOString().split('T')[0],
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      method: 'Dynamic QR',
      status: 'Present',
      locationValidated: true
    };

    setRecords([newRec, ...records]);
    setUserCheckedIn(true);
    alert(`Success: Check-in verified via Dynamic QR at ${currentBranch.name}. Anti-screenshot token validated.`);
  };

  const attendanceColumns: Column<AttendanceRecord>[] = [
    {
      header: 'Employee',
      cell: (r) => (
        <div>
          <p className="font-bold text-slate-900">{r.employeeName}</p>
          <p className="text-[10px] text-slate-400">{r.department}</p>
        </div>
      )
    },
    {
      header: 'Branch Facility',
      accessorKey: 'branchName'
    },
    {
      header: 'Check-In',
      cell: (r) => <span className="font-bold text-slate-800">{r.checkInTime}</span>
    },
    {
      header: 'Check-Out',
      cell: (r) => <span className="text-slate-500">{r.checkOutTime || 'On Shift'}</span>
    },
    {
      header: 'Verification Method',
      cell: (r) => (
        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono">
          {r.method}
        </span>
      )
    },
    {
      header: 'Geofence Validated',
      cell: (r) => (
        <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5" /> Inside Perimeter
        </span>
      )
    },
    {
      header: 'Status',
      cell: (r) => (
        <Badge variant={r.status === 'Present' ? 'success' : 'warning'}>
          {r.status}
        </Badge>
      )
    }
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Attendance &amp; Dynamic QR Check-in
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              In-store cycling QR display, GPS site geofencing validation, and automated shift logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!userCheckedIn ? (
              <button
                onClick={handleSimulateSelfCheckIn}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <QrCode className="w-4 h-4" />
                <span>Simulate App Scan</span>
              </button>
            ) : (
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold">
                ✓ You are Checked In
              </span>
            )}
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Present Today"
            value="48 / 53"
            change="90.5%"
            isPositive={true}
            subtitle="Punctual arrivals"
            icon={<UserCheck className="w-5 h-5" />}
          />
          <StatCard
            title="Late Check-ins"
            value="2 Staff"
            subtitle="Flagged by system"
            icon={<AlertTriangle className="w-5 h-5" />}
            iconBg="bg-amber-50 text-amber-600"
          />
          <StatCard
            title="Authorized Leave"
            value="3 Staff"
            subtitle="Approved by HR"
            icon={<Clock className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Dynamic QR Health"
            value="Cycling (15s)"
            isPositive={true}
            subtitle="Anti-screenshot token"
            icon={<QrCode className="w-5 h-5" />}
            iconBg="bg-teal-50 text-teal-600"
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 gap-2 text-xs font-semibold text-slate-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('kiosk')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'kiosk' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <QrCode className="w-4 h-4" /> In-Store Dynamic QR Screen (Kiosk)
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'records' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" /> Attendance Registry ({records.length})
          </button>
          <button
            onClick={() => setActiveTab('geofence')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'geofence' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" /> GPS Geofencing Parameters
          </button>
        </div>

        {/* TAB 1: KIOSK DYNAMIC QR */}
        {activeTab === 'kiosk' && (
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 text-center max-w-xl mx-auto space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-mono tracking-widest text-blue-400 uppercase font-bold">
                Storefront Attendance Kiosk
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold">{currentBranch.name}</h2>
              <p className="text-xs text-slate-400">
                Point your employee mobile app scanner at this screen to validate your shift start.
              </p>
            </div>

            {/* Simulated Live Cycling Dynamic QR */}
            <div className="bg-white p-6 rounded-2xl inline-block shadow-2xl relative border-4 border-blue-500/30">
              <QrCode className="w-48 h-48 text-slate-950 mx-auto" />
              <div className="mt-2 text-center">
                <span className="font-mono text-[10px] text-slate-500 font-bold tracking-wider">
                  {qrToken}
                </span>
              </div>
            </div>

            {/* Countdown timer & status */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-full border border-slate-700 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Token refreshes in: <strong className="font-mono text-emerald-400">{qrCountdown}s</strong></span>
              </div>

              <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                Protected with rolling cryptographic salt. Screenshots taken earlier will fail validation at scan time.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between text-xs text-slate-400 font-mono">
              <span>Site: {currentBranch.code}</span>
              <span>GPS Validated: ±15m</span>
              <span>Time: 08:30:14 AM</span>
            </div>
          </div>
        )}

        {/* TAB 2: RECORDS */}
        {activeTab === 'records' && (
          <DataTable
            data={records}
            columns={attendanceColumns}
            searchPlaceholder="Search attendance records by name or department..."
            title="Daily Attendance &amp; Shift Timestamps"
            subtitle="Validated using Dynamic QR codes and GPS coordinate matching"
          />
        )}

        {/* TAB 3: GEOFENCE */}
        {activeTab === 'geofence' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs max-w-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900">GPS Site Coordinates &amp; Geofencing Tolerances</h3>
            <p className="text-slate-500">
              Prevents check-in fraud by enforcing that staff mobile devices are physically within the verified branch radius.
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="font-bold text-slate-800">Branch Site Coordinates</span>
                <p className="font-mono text-slate-600">Latitude: 8.9824° N, Longitude: 79.5199° W (Calle 50 Flagship)</p>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Geofence Radius (Meters)</label>
                <input
                  type="number"
                  defaultValue={50}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
                <span className="text-[11px] text-slate-400">Recommended radius for multi-story buildings is 50-75m.</span>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-900 space-y-0.5">
                <p className="font-bold">Privacy Protection Standard:</p>
                <p>Location is only accessed at the exact moment of scanning. Background continuous tracking is strictly disabled.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
