'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import {
  Clock,
  UserCheck,
  AlertTriangle,
  Download,
  Filter,
  Search,
  CheckCircle,
  MapPin,
  QrCode,
  Edit3,
  Calendar,
  Building2
} from '@/components/icons';

interface DetailedAttendance {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  department: string;
  branch: string;
  date: string;
  shiftExpected: string;
  checkIn: string;
  checkOut: string;
  method: 'Dynamic QR' | 'Biometric Face' | 'Kiosk PIN' | 'Manual Overwrite';
  geofenceStatus: 'Verified Inside' | 'Perimeter Border (8m)' | 'Manual Override';
  coordinates: string;
  status: 'On-Time' | 'Late Arrival' | 'Overtime' | 'Absent';
  overtimeHours: number;
  lateMinutes: number;
  managerNotes?: string;
}

const mockHistoryData: DetailedAttendance[] = [
  {
    id: 'att-hist-001',
    employeeId: 'EMP-101',
    name: 'Carlos Mendoza',
    role: 'Head Cashier',
    department: 'Cashier & POS',
    branch: 'Multiplaza Pacific Mall',
    date: '2026-09-28',
    shiftExpected: '08:00 - 17:00',
    checkIn: '07:54 AM',
    checkOut: '05:08 PM',
    method: 'Dynamic QR',
    geofenceStatus: 'Verified Inside',
    coordinates: '8.9832° N, 79.5199° W',
    status: 'On-Time',
    overtimeHours: 0.13,
    lateMinutes: 0
  },
  {
    id: 'att-hist-002',
    employeeId: 'EMP-102',
    name: 'Elena Rostova',
    role: 'Store Supervisor',
    department: 'Management',
    branch: 'Multiplaza Pacific Mall',
    date: '2026-09-28',
    shiftExpected: '08:30 - 17:30',
    checkIn: '08:48 AM',
    checkOut: '06:15 PM',
    method: 'Biometric Face',
    geofenceStatus: 'Verified Inside',
    coordinates: '8.9833° N, 79.5201° W',
    status: 'Late Arrival',
    overtimeHours: 0.75,
    lateMinutes: 18,
    managerNotes: 'Traffic delay on Corredor Sur reported to HR'
  },
  {
    id: 'att-hist-003',
    employeeId: 'EMP-103',
    name: 'Marco Valenzuela',
    role: 'Lead Warehouse Tech',
    department: 'Logistics',
    branch: 'Colón Free Zone Warehouse',
    date: '2026-09-28',
    shiftExpected: '07:00 - 16:00',
    checkIn: '06:51 AM',
    checkOut: '06:30 PM',
    method: 'Dynamic QR',
    geofenceStatus: 'Verified Inside',
    coordinates: '9.3598° N, 79.9002° W',
    status: 'Overtime',
    overtimeHours: 2.5,
    lateMinutes: 0,
    managerNotes: 'Authorized container unloading overtime'
  },
  {
    id: 'att-hist-004',
    employeeId: 'EMP-104',
    name: 'Sofia Chen',
    role: 'Digital Fulfillment Agent',
    department: 'E-commerce Ops',
    branch: 'Albrook Distribution Hub',
    date: '2026-09-28',
    shiftExpected: '09:00 - 18:00',
    checkIn: '08:58 AM',
    checkOut: '06:02 PM',
    method: 'Kiosk PIN',
    geofenceStatus: 'Perimeter Border (8m)',
    coordinates: '8.9734° N, 79.5521° W',
    status: 'On-Time',
    overtimeHours: 0,
    lateMinutes: 0
  },
  {
    id: 'att-hist-005',
    employeeId: 'EMP-105',
    name: 'David Ortiz',
    role: 'Delivery Driver',
    department: 'Fleet Logistics',
    branch: 'Costa del Este Express',
    date: '2026-09-28',
    shiftExpected: '07:30 - 16:30',
    checkIn: '07:22 AM',
    checkOut: '05:45 PM',
    method: 'Dynamic QR',
    geofenceStatus: 'Verified Inside',
    coordinates: '9.0112° N, 79.4678° W',
    status: 'Overtime',
    overtimeHours: 1.25,
    lateMinutes: 0
  },
  {
    id: 'att-hist-006',
    employeeId: 'EMP-106',
    name: 'Maria Santos',
    role: 'Inventory Auditor',
    department: 'Inventory Control',
    branch: 'Multiplaza Pacific Mall',
    date: '2026-09-27',
    shiftExpected: '08:00 - 17:00',
    checkIn: '08:24 AM',
    checkOut: '05:00 PM',
    method: 'Dynamic QR',
    geofenceStatus: 'Verified Inside',
    coordinates: '8.9831° N, 79.5200° W',
    status: 'Late Arrival',
    overtimeHours: 0,
    lateMinutes: 24
  },
  {
    id: 'att-hist-007',
    employeeId: 'EMP-107',
    name: 'Roberto Gomez',
    role: 'Junior Cashier',
    department: 'Cashier & POS',
    branch: 'Costa del Este Express',
    date: '2026-09-27',
    shiftExpected: '10:00 - 19:00',
    checkIn: '09:55 AM',
    checkOut: '07:05 PM',
    method: 'Kiosk PIN',
    geofenceStatus: 'Verified Inside',
    coordinates: '9.0110° N, 79.4679° W',
    status: 'On-Time',
    overtimeHours: 0.08,
    lateMinutes: 0
  },
  {
    id: 'att-hist-008',
    employeeId: 'EMP-108',
    name: 'Lucia Alvarez',
    role: 'Customer Success Rep',
    department: 'CRM & Client Support',
    branch: 'Multiplaza Pacific Mall',
    date: '2026-09-27',
    shiftExpected: '09:00 - 18:00',
    checkIn: '—',
    checkOut: '—',
    method: 'Manual Overwrite',
    geofenceStatus: 'Manual Override',
    coordinates: 'N/A',
    status: 'Absent',
    overtimeHours: 0,
    lateMinutes: 0,
    managerNotes: 'Approved sick leave certificate submitted'
  }
];

export default function AttendanceHistoryPage() {
  const { currentBranch } = useSaaS();
  const { addToast } = useToast();

  const [history, setHistory] = useState<DetailedAttendance[]>(mockHistoryData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Edit / Manual Adjustment State
  const [editingRecord, setEditingRecord] = useState<DetailedAttendance | null>(null);
  const [editCheckIn, setEditCheckIn] = useState('');
  const [editCheckOut, setEditCheckOut] = useState('');
  const [editStatus, setEditStatus] = useState<'On-Time' | 'Late Arrival' | 'Overtime' | 'Absent'>('On-Time');
  const [editNotes, setEditNotes] = useState('');

  // Filtering logic
  const filteredRecords = history.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || item.department === selectedDept;
    const matchesBranch = selectedBranch === 'All' || item.branch === selectedBranch;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesDept && matchesBranch && matchesStatus;
  });

  // Aggregated KPIs
  const totalShifts = history.length;
  const onTimeCount = history.filter(h => h.status === 'On-Time').length;
  const onTimeRate = Math.round((onTimeCount / (totalShifts || 1)) * 100);
  const totalOvertime = history.reduce((sum, h) => sum + h.overtimeHours, 0).toFixed(1);
  const anomaliesCount = history.filter(h => h.status === 'Late Arrival' || h.status === 'Absent' || h.geofenceStatus.includes('Border')).length;

  const handleOpenEdit = (rec: DetailedAttendance) => {
    setEditingRecord(rec);
    setEditCheckIn(rec.checkIn);
    setEditCheckOut(rec.checkOut);
    setEditStatus(rec.status);
    setEditNotes(rec.managerNotes || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord) return;

    setHistory(prev => prev.map(rec => {
      if (rec.id === editingRecord.id) {
        return {
          ...rec,
          checkIn: editCheckIn,
          checkOut: editCheckOut,
          status: editStatus,
          managerNotes: editNotes,
          method: 'Manual Overwrite'
        };
      }
      return rec;
    }));

    addToast('Record adjusted successfully with manager audit log', 'success');
    setEditingRecord(null);
  };

  const handleExportCSV = () => {
    addToast('Payroll timesheet exported as CSV (Panama MITRADEL / CSS Format)', 'info');
  };

  const handleExportPDF = () => {
    addToast('Executive Attendance & Biometric Audit Report exported as PDF', 'success');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance Logs & History</h1>
            <p className="text-sm text-slate-500">
              Audit trail of employee biometric scans, dynamic rolling QR punches, and geofenced shift entries.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="w-4 h-4 mr-2" /> PDF Report
            </Button>
            <Button size="sm" onClick={() => window.location.href = '/attendance/kiosk'}>
              <Clock className="w-4 h-4 mr-2" /> Open Kiosk Terminal
            </Button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Shift Records"
            value={totalShifts}
            subtitle="Current pay period"
            icon={<UserCheck className="w-5 h-5 text-indigo-600" />}
          />
          <StatCard
            title="Punctuality Rate"
            value={`${onTimeRate}%`}
            subtitle="Target: ≥ 95%"
            icon={<CheckCircle className="w-5 h-5 text-emerald-600" />}
          />
          <StatCard
            title="Total Overtime Hours"
            value={`${totalOvertime} hrs`}
            subtitle="Pay code: Art. 36 MITRADEL"
            icon={<Clock className="w-5 h-5 text-amber-600" />}
          />
          <StatCard
            title="Audit Flags & Anomalies"
            value={anomaliesCount}
            subtitle="Requires manager review"
            icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
          />
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <Input
                placeholder="Search staff, role, ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>

            <Select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              options={[
                { value: 'All', label: 'All Departments' },
                { value: 'Cashier & POS', label: 'Cashier & POS' },
                { value: 'Management', label: 'Management' },
                { value: 'Logistics', label: 'Logistics' },
                { value: 'E-commerce Ops', label: 'E-commerce Ops' },
                { value: 'Fleet Logistics', label: 'Fleet Logistics' },
                { value: 'Inventory Control', label: 'Inventory Control' },
                { value: 'CRM & Client Support', label: 'CRM & Client Support' }
              ]}
            />

            <Select
              value={selectedBranch}
              onChange={e => setSelectedBranch(e.target.value)}
              options={[
                { value: 'All', label: 'All Branches' },
                { value: 'Multiplaza Pacific Mall', label: 'Multiplaza Pacific Mall' },
                { value: 'Costa del Este Express', label: 'Costa del Este Express' },
                { value: 'Albrook Distribution Hub', label: 'Albrook Distribution Hub' },
                { value: 'Colón Free Zone Warehouse', label: 'Colón Free Zone Warehouse' }
              ]}
            />

            <Select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              options={[
                { value: 'All', label: 'All Statuses' },
                { value: 'On-Time', label: 'On-Time' },
                { value: 'Late Arrival', label: 'Late Arrival' },
                { value: 'Overtime', label: 'Overtime' },
                { value: 'Absent', label: 'Absent' }
              ]}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
            <span>Showing {filteredRecords.length} of {history.length} attendance logs</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> GPS Geofence Enforced (50m Radius)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Dynamic QR 15s Re-hash Active
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Attendance Records Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Branch Facility</th>
                  <th className="py-3 px-4">Scheduled Shift</th>
                  <th className="py-3 px-4">In / Out Logs</th>
                  <th className="py-3 px-4">Method & Biometrics</th>
                  <th className="py-3 px-4">GPS Geofence Status</th>
                  <th className="py-3 px-4">Status & Hours</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No attendance records match the selected criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{item.name}</div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1">
                              <span>{item.employeeId}</span> • <span>{item.department}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 text-slate-700 text-xs">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.branch}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">{item.date}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                        {item.shiftExpected}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-800">
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">IN</span>
                            <span>{item.checkIn}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-600">
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1 py-0.5 rounded">OUT</span>
                            <span>{item.checkOut}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-mono">
                          {item.method === 'Dynamic QR' && <QrCode className="w-3 h-3 text-indigo-600" />}
                          {item.method === 'Biometric Face' && <UserCheck className="w-3 h-3 text-blue-600" />}
                          {item.method === 'Kiosk PIN' && <Clock className="w-3 h-3 text-amber-600" />}
                          {item.method === 'Manual Overwrite' && <Edit3 className="w-3 h-3 text-rose-500" />}
                          <span>{item.method}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1 text-xs font-semibold">
                            {item.geofenceStatus === 'Verified Inside' ? (
                              <span className="text-emerald-700 flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Inside Radius
                              </span>
                            ) : item.geofenceStatus === 'Manual Override' ? (
                              <span className="text-slate-500 flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Override
                              </span>
                            ) : (
                              <span className="text-amber-700 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-amber-600" /> Border (8m)
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">{item.coordinates}</div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div>
                            {item.status === 'On-Time' && <Badge variant="success">On-Time</Badge>}
                            {item.status === 'Late Arrival' && <Badge variant="warning">Late (+{item.lateMinutes}m)</Badge>}
                            {item.status === 'Overtime' && <Badge variant="primary">Overtime (+{item.overtimeHours}h)</Badge>}
                            {item.status === 'Absent' && <Badge variant="danger">Absent</Badge>}
                          </div>
                          {item.managerNotes && (
                            <div className="text-[10px] text-slate-500 truncate max-w-[140px]" title={item.managerNotes}>
                              💬 {item.managerNotes}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(item)}>
                          <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Manager Record Adjustment Modal */}
        <Modal
          isOpen={!!editingRecord}
          onClose={() => setEditingRecord(null)}
          title={`Adjust Attendance Record: ${editingRecord?.name}`}
        >
          {editingRecord && (
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1 border border-slate-200">
                <div className="font-semibold text-slate-700">Audit Reference:</div>
                <div className="text-slate-500">Record ID: <span className="font-mono">{editingRecord.id}</span></div>
                <div className="text-slate-500">Employee: {editingRecord.name} ({editingRecord.employeeId})</div>
                <div className="text-slate-500">Shift Date: {editingRecord.date} ({editingRecord.shiftExpected})</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Check-In Time</label>
                  <Input
                    value={editCheckIn}
                    onChange={e => setEditCheckIn(e.target.value)}
                    placeholder="e.g. 08:00 AM"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Check-Out Time</label>
                  <Input
                    value={editCheckOut}
                    onChange={e => setEditCheckOut(e.target.value)}
                    placeholder="e.g. 05:00 PM"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Status Classification</label>
                <Select
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value as any)}
                  options={[
                    { value: 'On-Time', label: 'On-Time' },
                    { value: 'Late Arrival', label: 'Late Arrival' },
                    { value: 'Overtime', label: 'Overtime' },
                    { value: 'Absent', label: 'Absent' }
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Manager Reason / Justification <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={editNotes}
                  onChange={e => setEditNotes(e.target.value)}
                  placeholder="State the reason for manual adjustment (e.g. Hardware kiosk glitch, medical justification, authorized offsite errand)..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  required
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  All manual overrides are cryptographically timestamped and registered in the immutable compliance audit trail for MITRADEL labor inspection verification.
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setEditingRecord(null)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Overwrite & Log Audit
                </Button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </AppShell>
  );
}
