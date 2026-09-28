'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Employee } from '@/types/saas';
import { mockEmployees } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Drawer } from '@/components/ui/Drawer';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import {
  UserCheck,
  Search,
  Plus,
  Mail,
  Phone,
  Clock,
  Building2,
  FileText,
  CheckCircle,
  Eye
} from '@/components/icons';

export default function HrEmployeesDirectoryPage() {
  const { success } = useToast();

  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Employee Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState<'Sales' | 'POS' | 'Inventory' | 'Operations' | 'Finance'>('Sales');
  const [role, setRole] = useState('Sales Representative');
  const [branchName, setBranchName] = useState('Main Flagship Store (Calle 50)');
  const [schedule, setSchedule] = useState('Mon - Fri | 8:30 AM - 5:30 PM');

  const departments = ['All', 'Sales', 'POS', 'Inventory', 'Operations', 'Finance'];

  const filtered = employees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || e.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newE: Employee = {
      id: `emp_${Date.now()}`,
      name,
      email,
      phone,
      department: department as any,
      role,
      branchName,
      hireDate: new Date().toISOString().split('T')[0],
      status: 'active',
      schedule,
      attendanceRate: 100
    };
    setEmployees([...employees, newE]);
    setIsAddOpen(false);
    setName('');
    setEmail('');
    setPhone('');
    success('Employee Enrolled', `${newE.name} has been added to personnel roster.`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Staff Personnel Directory</h1>
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                {employees.length} Active Staff
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Departmental assignments, shift schedules, labor contracts, and dynamic QR attendance linkages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/attendance">
              <Button variant="outline" size="sm">
                QR Attendance Kiosk
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddOpen(true)}
            >
              Add Staff Member
            </Button>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/hr" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Overview
          </Link>
          <Link href="/hr/employees" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Employee Directory
          </Link>
          <Link href="/attendance" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Attendance & Shifts
          </Link>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by staff name, role or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  deptFilter === dept
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Staff Member</th>
                  <th className="py-3.5 px-4">Role & Dept</th>
                  <th className="py-3.5 px-4">Assigned Branch</th>
                  <th className="py-3.5 px-4">Shift Schedule</th>
                  <th className="py-3.5 px-4">Attendance Rate</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                    onClick={() => setSelectedEmp(emp)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {emp.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{emp.name}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                            <span>{emp.email}</span>
                            <span>•</span>
                            <span className="font-mono">{emp.phone}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-900">{emp.role}</p>
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                        {emp.department}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {emp.branchName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                      {emp.schedule}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-emerald-600 text-sm">
                        {emp.attendanceRate || 100}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="success" size="sm">
                        Active
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEmp(emp);
                        }}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
                      >
                        View Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Employee Dossier Drawer */}
      {selectedEmp && (
        <Drawer
          isOpen={!!selectedEmp}
          onClose={() => setSelectedEmp(null)}
          title={selectedEmp.name}
          description={`${selectedEmp.role} • ${selectedEmp.department}`}
          width="xl"
          footer={
            <Button variant="primary" size="sm" onClick={() => setSelectedEmp(null)} className="w-full">
              Close Personnel File
            </Button>
          }
        >
          <div className="space-y-6 text-xs">
            {/* Quick Overview */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Hire Date:</span>
                <span className="font-mono font-bold text-slate-900">{selectedEmp.hireDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Branch Station:</span>
                <span className="font-semibold text-slate-900">{selectedEmp.branchName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Weekly Shift Schedule:</span>
                <span className="font-mono text-slate-800">{selectedEmp.schedule}</span>
              </div>
            </div>

            {/* Employment Contract Document */}
            <div className="space-y-2">
              <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Labor Contract Disclosures (Panama Mitradel)
              </p>
              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-600" /> Contrato_Laboral_2026.pdf
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Mitradel Registrado
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Permanent labor contract under the Labor Code of the Republic of Panama with CSS social security coverage and 13th-month bonus allocation.
                </p>
              </div>
            </div>

            {/* Attendance Performance */}
            <div className="space-y-2">
              <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Monthly Attendance & Dynamic QR Logs
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                  <span className="text-slate-500 text-[11px]">On-Time Shift Starts</span>
                  <p className="text-xl font-bold font-mono text-emerald-700 mt-1">98.4%</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
                  <span className="text-slate-500 text-[11px]">Overtime Hours (MTD)</span>
                  <p className="text-xl font-bold font-mono text-blue-700 mt-1">4.5 Hrs</p>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      )}

      {/* Add Employee Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Staff Personnel Record"
        description="Register a new employee for shift scheduling, payroll hours, and attendance check-in."
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreate}>
              Enroll Staff Member
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <Input
            label="Full Legal Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Gabriel Rios"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Work Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="g.rios@panamatech.pa"
            />
            <Input
              label="Contact Phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+507 6899-4411"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value as any)}
              options={[
                { value: 'Sales', label: 'Retail & Store Sales' },
                { value: 'POS', label: 'Cashier & Checkouts' },
                { value: 'Inventory', label: 'Inventory & Warehousing' },
                { value: 'Operations', label: 'Store Operations' },
                { value: 'Finance', label: 'Finance & Compliance' }
              ]}
            />
            <Input
              label="Position / Role Title"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Senior Cashier"
            />
          </div>

          <Input
            label="Shift Schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="Mon - Sat | 9:00 AM - 6:00 PM"
          />
        </form>
      </Modal>
    </AppShell>
  );
}
