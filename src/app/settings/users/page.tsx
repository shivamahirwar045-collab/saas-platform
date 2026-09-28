'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { User, UserRole } from '@/types/saas';
import { mockUsers, mockBranches } from '@/data/mockData';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import {
  Users,
  Plus,
  Search,
  Filter,
  Shield,
  Building2,
  CheckCircle,
  Clock,
  Lock,
  Mail,
  Edit3,
  Trash2,
  ArrowRight,
  UserCheck
} from '@/components/icons';

export default function SettingsUsersPage() {
  const { currentUser, switchUserRole } = useSaaS();
  const { addToast } = useToast();

  const [userList, setUserList] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All');

  // Invite Modal
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('Sales');
  const [inviteBranch, setInviteBranch] = useState('Multiplaza Pacific Mall');

  const filteredUsers = userList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesBranch = branchFilter === 'All' || u.branchName === branchFilter;
    return matchesSearch && matchesRole && matchesBranch;
  });

  const activeCount = userList.filter(u => u.status === 'active').length;
  const mfaCount = userList.filter(u => u.mfaEnabled).length;

  const handleToggleStatus = (userId: string) => {
    setUserList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'suspended' : 'active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    addToast('User account status updated', 'info');
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    const newUser: User = {
      id: `usr_${Date.now().toString().slice(-4)}`,
      businessId: 'biz_01',
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`,
      branchId: 'br_01',
      branchName: inviteBranch,
      status: 'active',
      lastActive: 'Just now',
      lastLogin: 'Pending Invitation Acceptance',
      twoFactorEnabled: true,
      mfaEnabled: true
    };

    setUserList([newUser, ...userList]);
    setIsInviteOpen(false);
    setInviteName('');
    setInviteEmail('');
    addToast(`Invitation and setup link dispatched to ${newUser.email}`, 'success');
  };

  const handleSimulateRoleSwitch = (role: UserRole) => {
    switchUserRole(role);
    addToast(`Switched active session preview to role "${role}"`, 'info');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Navigation Breadcrumbs / Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Settings</span>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Team Members & Access</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Team Members & Permissions</h1>
            <p className="text-sm text-slate-500">
              Manage enterprise staff accounts, assign 10 distinct RBAC roles, and bind facility scopes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/settings/roles'}>
              <Shield className="w-4 h-4 mr-2 text-indigo-600" /> View RBAC Matrix
            </Button>
            <Button size="sm" onClick={() => setIsInviteOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Invite Team Member
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Staff Users"
            value={userList.length}
            subtitle="Across all branch locations"
            icon={<Users className="w-5 h-5 text-indigo-600" />}
          />
          <StatCard
            title="Active Accounts"
            value={`${activeCount} / ${userList.length}`}
            subtitle="Compliant with license"
            icon={<UserCheck className="w-5 h-5 text-emerald-600" />}
          />
          <StatCard
            title="2FA / MFA Adoption"
            value={`${Math.round((mfaCount / (userList.length || 1)) * 100)}%`}
            subtitle={`${mfaCount} enforced accounts`}
            icon={<Lock className="w-5 h-5 text-blue-600" />}
          />
          <StatCard
            title="Current Session Role"
            value={currentUser.role}
            subtitle="Testing persona active"
            icon={<Shield className="w-5 h-5 text-amber-600" />}
          />
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <Input
                placeholder="Search staff by name or email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <Select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              options={[
                { value: 'All', label: 'All Roles' },
                { value: 'Owner', label: 'Owner' },
                { value: 'Administrator', label: 'Administrator' },
                { value: 'Manager', label: 'Manager' },
                { value: 'Sales', label: 'Sales' },
                { value: 'Cashier', label: 'Cashier' },
                { value: 'Inventory', label: 'Inventory' },
                { value: 'Finance', label: 'Finance' },
                { value: 'HR', label: 'HR' }
              ]}
            />

            <Select
              value={branchFilter}
              onChange={e => setBranchFilter(e.target.value)}
              options={[
                { value: 'All', label: 'All Branch Locations' },
                ...mockBranches.map(b => ({ value: b.name, label: b.name }))
              ]}
            />
          </div>

          <span className="text-xs text-slate-500 whitespace-nowrap">
            Showing {filteredUsers.length} staff accounts
          </span>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Assigned Role</th>
                  <th className="py-3 px-4">Branch Facility</th>
                  <th className="py-3 px-4">Security (2FA)</th>
                  <th className="py-3 px-4">Last Activity</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-semibold text-slate-900">{user.name}</div>
                          <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold">
                        <Shield className="w-3 h-3" />
                        {user.role}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-700">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {user.branchName || 'All Corporate Locations'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {user.mfaEnabled ? (
                        <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> MFA Enabled
                        </span>
                      ) : (
                        <span className="text-xs text-amber-700 font-medium">
                          SMS Only
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-500 font-mono">
                      {user.lastLogin}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                        {user.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-indigo-600 hover:text-indigo-800"
                          onClick={() => handleSimulateRoleSwitch(user.role)}
                          title="Simulate session as this role"
                        >
                          Simulate
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-slate-600"
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          {user.status === 'active' ? 'Suspend' : 'Activate'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invite User Modal */}
        <Modal
          isOpen={isInviteOpen}
          onClose={() => setIsInviteOpen(false)}
          title="Invite New Team Member"
        >
          <form onSubmit={handleSendInvite} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <Input
                placeholder="e.g. Sofia Rodriguez"
                value={inviteName}
                onChange={e => setInviteName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Email</label>
              <Input
                type="email"
                placeholder="e.g. s.rodriguez@kiaan.pa"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Permissions</label>
                <Select
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value as UserRole)}
                  options={[
                    { value: 'Owner', label: 'Owner (Full Access)' },
                    { value: 'Administrator', label: 'Administrator' },
                    { value: 'Manager', label: 'Manager' },
                    { value: 'Sales', label: 'Sales Executive' },
                    { value: 'Cashier', label: 'POS Cashier' },
                    { value: 'Inventory', label: 'Inventory Controller' },
                    { value: 'Finance', label: 'Finance & Invoicing' },
                    { value: 'HR', label: 'HR & Payroll' }
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Branch Facility Scope</label>
                <Select
                  value={inviteBranch}
                  onChange={e => setInviteBranch(e.target.value)}
                  options={mockBranches.map(b => ({ value: b.name, label: b.name }))}
                />
              </div>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-900 space-y-1">
              <span className="font-semibold block">Automated Onboarding Sequence:</span>
              <p className="text-[11px] text-indigo-700">
                The recipient will receive a cryptographic one-time invitation link to set up their password, register their dynamic 2FA authenticator, and download the POS/Attendance mobile app.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsInviteOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Send Invitation &amp; Setup Link
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
