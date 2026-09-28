'use client';

import React, { useState } from 'react';
import { useSaaS } from '../../context/SaaSContext';
import {
  Search,
  Bell,
  Plus,
  ChevronDown,
  Building2,
  MapPin,
  Sparkles,
  Shield,
  Menu,
  Check,
  Globe,
  Sliders,
  Monitor
} from '../icons';
import { QuickCreateModal } from '../modals/QuickCreateModal';
import Link from 'next/link';

interface TopNavProps {
  onToggleMobileSidebar: () => void;
}

export function TopNav({ onToggleMobileSidebar }: TopNavProps) {
  const {
    businesses,
    currentBusiness,
    setCurrentBusiness,
    branches,
    currentBranch,
    setCurrentBranch,
    currentRegister,
    currentUser,
    switchUserRole,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setIsSearchOpen,
    setIsCopilotOpen
  } = useSaaS();

  const [isBizMenuOpen, setIsBizMenuOpen] = useState(false);
  const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);

  const availableRoles = [
    'Owner',
    'Administrator',
    'Manager',
    'Sales',
    'Cashier',
    'Inventory',
    'Finance',
    'HR',
    'Marketing',
    'Partner/Agency'
  ] as const;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
      {/* Left: Mobile trigger & Multi-Tenant Switchers */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Business Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setIsBizMenuOpen(!isBizMenuOpen);
              setIsBranchMenuOpen(false);
              setIsRoleMenuOpen(false);
              setIsNotifMenuOpen(false);
            }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
          >
            <span className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200/60 flex items-center justify-center text-sm">
              {currentBusiness.logo}
            </span>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[130px]">
                {currentBusiness.name}
              </p>
              <p className="text-[10px] text-blue-600 font-semibold tracking-wide uppercase">
                {currentBusiness.plan} Plan
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {isBizMenuOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                Switch Business Account
              </p>
              <div className="space-y-1">
                {businesses.map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setCurrentBusiness(b);
                      setIsBizMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors text-left ${b.id === currentBusiness.id
                      ? 'bg-blue-50/80 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base">{b.logo}</span>
                      <div className="truncate">
                        <p className="truncate">{b.name}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{b.industry}</p>
                      </div>
                    </div>
                    {b.id === currentBusiness.id && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Branch / Store Switcher */}
        <div className="relative hidden md:block">
          <button
            onClick={() => {
              setIsBranchMenuOpen(!isBranchMenuOpen);
              setIsBizMenuOpen(false);
              setIsRoleMenuOpen(false);
              setIsNotifMenuOpen(false);
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200/70 hover:bg-slate-50 text-left text-xs text-slate-700 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate max-w-[140px] font-medium">{currentBranch.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isBranchMenuOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                Select Active Branch / Location
              </p>
              <div className="space-y-1">
                {branches.map(br => (
                  <button
                    key={br.id}
                    onClick={() => {
                      setCurrentBranch(br);
                      setIsBranchMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors text-left ${br.id === currentBranch.id
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    <div>
                      <p>{br.name}</p>
                      <p className="text-[10px] text-slate-400 font-normal">{br.city} • Code: {br.code}</p>
                    </div>
                    {br.id === currentBranch.id && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cash Register indicator */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100/80 rounded-lg text-[11px] text-slate-600">
          <Monitor className="w-3.5 h-3.5 text-slate-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>{currentRegister.name.split(' - ')[0]}</span>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-md mx-2 min-w-0 hidden sm:block">
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="w-full h-9 flex items-center justify-between px-3 bg-slate-100/70 hover:bg-slate-100 border border-slate-200/70 rounded-xl text-xs text-slate-400 hover:text-slate-600 transition-colors text-left group min-w-0"
        >
          <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
            <Search className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-600" />
            <span className="truncate whitespace-nowrap">
              <span className="hidden xl:inline">Search products, orders, customers, or jump to...</span>
              <span className="xl:hidden">Search or jump to...</span>
            </span>
          </div>
          <kbd className="hidden md:inline-flex shrink-0 items-center px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Actions, Notifications, Role Switcher, Copilot & User */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Quick Search Mobile */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="sm:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          title="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Quick Action Button */}
        <button
          onClick={() => setIsQuickCreateOpen(true)}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Quick Create</span>
        </button>

        {/* AI Copilot Header Trigger */}
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 hover:border-blue-300 text-blue-700 rounded-xl text-xs font-medium transition-all shrink-0"
          title="Open AI Business Copilot"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin-slow" />
          <span className="hidden lg:inline">AI Copilot</span>
        </button>

        {/* Role Switcher (Simulate Multi-Role Granular Permissions) */}
        <div className="relative shrink-0">
          <button
            onClick={() => {
              setIsRoleMenuOpen(!isRoleMenuOpen);
              setIsBizMenuOpen(false);
              setIsBranchMenuOpen(false);
              setIsNotifMenuOpen(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 transition-colors"
            title="Switch Simulated Role"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-semibold text-slate-900 hidden md:inline">{currentUser.role}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isRoleMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                Simulate Role Permissions
              </p>
              <div className="space-y-0.5">
                {availableRoles.map(role => (
                  <button
                    key={role}
                    onClick={() => {
                      switchUserRole(role);
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${currentUser.role === role
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    <span>{role}</span>
                    {currentUser.role === role && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => {
              setIsNotifMenuOpen(!isNotifMenuOpen);
              setIsBizMenuOpen(false);
              setIsBranchMenuOpen(false);
              setIsRoleMenuOpen(false);
            }}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </button>

          {isNotifMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  {unreadNotificationsCount > 0 && (
                    <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold">
                      {unreadNotificationsCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-[11px] text-blue-600 hover:text-blue-800 font-medium"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 mt-1">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationAsRead(n.id)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-colors ${!n.read ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                      }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 text-center">
                <Link
                  href="/settings"
                  onClick={() => setIsNotifMenuOpen(false)}
                  className="text-[11px] text-slate-500 hover:text-slate-800 font-medium"
                >
                  Notification Preferences &amp; Webhooks →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile avatar */}
        <Link
          href="/settings"
          className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
          title="User Settings"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
        </Link>
      </div>

      {/* Quick Create Modal */}
      <QuickCreateModal isOpen={isQuickCreateOpen} onClose={() => setIsQuickCreateOpen(false)} />
    </header>
  );
}
