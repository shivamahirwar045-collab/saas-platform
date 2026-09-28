'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Employee } from '@/types/saas';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import {
  UserCheck,
  Plus,
  Search,
  Phone,
  Mail,
  Clock,
  Building2,
  Check,
  X,
  FileText
} from '@/components/icons';
import { mockEmployees } from '@/data/mockData';

export default function HRPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);

  const [employeeForm, setEmployeeForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Sales' as const,
    role: '',
    branchName: 'Main Flagship Store (Calle 50)',
    schedule: 'Mon - Fri | 8:30 AM - 5:30 PM'
  });

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeForm.name) return;

    const newEmp: Employee = {
      id: `emp_${Date.now()}`,
      name: employeeForm.name,
      email: employeeForm.email,
      phone: employeeForm.phone,
      department: employeeForm.department,
      role: employeeForm.role || 'Associate',
      branchName: employeeForm.branchName,
      hireDate: new Date().toISOString().split('T')[0],
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      schedule: employeeForm.schedule,
      attendanceRate: 100
    };

    setEmployees([...employees, newEmp]);
    setIsAddEmployeeOpen(false);
  };

  const employeeColumns: Column<Employee>[] = [
    {
      header: 'Staff Member',
      cell: (e) => (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={e.avatar} alt={e.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
          <div>
            <p className="font-bold text-slate-900">{e.name}</p>
            <p className="text-[11px] text-slate-400">{e.role}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Department',
      accessorKey: 'department'
    },
    {
      header: 'Branch Assigned',
      accessorKey: 'branchName'
    },
    {
      header: 'Shift Schedule',
      accessorKey: 'schedule'
    },
    {
      header: 'Attendance Punctuality',
      cell: (e) => (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              style={{ width: `${e.attendanceRate}%` }}
              className="bg-emerald-500 h-full rounded-full"
            ></div>
          </div>
          <span className="font-bold text-slate-800 text-[11px]">{e.attendanceRate}%</span>
        </div>
      )
    },
    {
      header: 'Status',
      cell: (e) => (
        <Badge variant={e.status === 'active' ? 'success' : 'default'}>
          {e.status}
        </Badge>
      )
    },
    {
      header: 'Action',
      cell: (e) => (
        <button
          onClick={(ev) => {
            ev.stopPropagation();
            setSelectedEmployee(e);
          }}
          className="text-blue-600 hover:text-blue-800 font-semibold text-xs"
        >
          View Profile
        </button>
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
              Human Resources &amp; Employee Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage personnel records, departments, work schedules, and staff compliance documents.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAddEmployeeOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Active Workforce"
            value="53 Staff"
            subtitle="Across all 4 branches"
            icon={<UserCheck className="w-5 h-5" />}
          />
          <StatCard
            title="Avg. Punctuality Rate"
            value="98.1%"
            isPositive={true}
            subtitle="Verified via Dynamic QR"
            icon={<Clock className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Departments"
            value="6 Active"
            subtitle="Operations, Sales, IT, etc."
            icon={<Building2 className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Panama CSS Status"
            value="Fully Registered"
            isPositive={true}
            subtitle="Social Security compliant"
            icon={<Check className="w-5 h-5" />}
            iconBg="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Employees Table */}
        <DataTable
          data={employees}
          columns={employeeColumns}
          searchPlaceholder="Search employees by name, role or department..."
          title="Personnel Registry"
          subtitle="Click on any staff member to review dossier and shift schedules"
          onRowClick={(e) => setSelectedEmployee(e)}
        />

        {/* EMPLOYEE DOSSIER DRAWER */}
        {selectedEmployee && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex justify-end">
            <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between border-l border-slate-200 overflow-y-auto">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedEmployee.avatar}
                      alt={selectedEmployee.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{selectedEmployee.name}</h3>
                      <p className="text-xs text-blue-600 font-semibold">{selectedEmployee.role}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedEmployee(null)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-3.5 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-700">
                  <p><strong>Department:</strong> {selectedEmployee.department}</p>
                  <p><strong>Branch Location:</strong> {selectedEmployee.branchName}</p>
                  <p><strong>Work Schedule:</strong> {selectedEmployee.schedule}</p>
                  <p><strong>Hire Date:</strong> {selectedEmployee.hireDate}</p>
                  <p><strong>Punctuality Score:</strong> {selectedEmployee.attendanceRate}%</p>
                </div>

                {/* Contact */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-800">Contact Information</span>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-slate-600">
                    <p>📧 {selectedEmployee.email}</p>
                    <p>📞 {selectedEmployee.phone}</p>
                  </div>
                </div>

                {/* Documents & Panama CSS */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-800">Compliance &amp; Documents</span>
                  <div className="space-y-1">
                    <div className="p-2 bg-slate-50 rounded-lg flex justify-between items-center text-slate-700">
                      <span>📄 Employment Contract (Signed)</span>
                      <span className="text-[10px] text-emerald-600 font-bold">Valid</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg flex justify-between items-center text-slate-700">
                      <span>🏥 Panama CSS Affiliation Slip</span>
                      <span className="text-[10px] text-emerald-600 font-bold">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => alert(`Shift schedule reminder sent to ${selectedEmployee.email}`)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold"
                >
                  Send Schedule Notification
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD EMPLOYEE */}
        {isAddEmployeeOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Add New Staff Member</h3>
                <button onClick={() => setIsAddEmployeeOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateEmployee} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mateo Morales"
                    value={employeeForm.name}
                    onChange={e => setEmployeeForm({ ...employeeForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="mateo@acmeretail.com"
                      value={employeeForm.email}
                      onChange={e => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Phone</label>
                    <input
                      type="text"
                      placeholder="+507 6890-4411"
                      value={employeeForm.phone}
                      onChange={e => setEmployeeForm({ ...employeeForm, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Department</label>
                    <select
                      value={employeeForm.department}
                      onChange={e => setEmployeeForm({ ...employeeForm, department: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                    >
                      <option value="Sales">Sales</option>
                      <option value="Operations">Operations</option>
                      <option value="Finance">Finance</option>
                      <option value="Customer Care">Customer Care</option>
                      <option value="IT">IT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Job Role</label>
                    <input
                      type="text"
                      placeholder="e.g. POS Cashier"
                      value={employeeForm.role}
                      onChange={e => setEmployeeForm({ ...employeeForm, role: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddEmployeeOpen(false)}
                    className="px-3.5 py-1.5 text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-xl font-semibold shadow-xs"
                  >
                    Enroll Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
