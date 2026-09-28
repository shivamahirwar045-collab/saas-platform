'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSaaS } from '../../context/SaaSContext';
import {
  LayoutDashboard,
  Globe,
  ShoppingCart,
  Users,
  Monitor,
  CreditCard,
  Receipt,
  Package,
  Truck,
  UserCheck,
  Clock,
  Megaphone,
  Share2,
  BarChart3,
  Layers,
  Settings,
  Shield,
  HelpCircle,
  X,
  Sparkles,
  Zap,
  Building2,
  FileText
} from '../icons';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

// Module-level cache to survive client-side route transitions instantly
let cachedSidebarScroll: number | null = null;

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ isMobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { currentBusiness, modules } = useSaaS();
  const navRef = useRef<HTMLElement>(null);
  const isRestoringRef = useRef(false);

  // Restore scroll position on mount and route change
  useIsomorphicLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let targetScroll = cachedSidebarScroll;
    if (targetScroll === null && typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('sidebar_scroll_top');
        if (saved !== null) {
          targetScroll = parseInt(saved, 10);
          cachedSidebarScroll = targetScroll;
        }
      } catch {}
    }

    if (targetScroll !== null && !isNaN(targetScroll)) {
      isRestoringRef.current = true;
      nav.scrollTop = targetScroll;

      const raf = requestAnimationFrame(() => {
        if (navRef.current && targetScroll !== null && !isNaN(targetScroll)) {
          navRef.current.scrollTop = targetScroll;
        }
        setTimeout(() => {
          isRestoringRef.current = false;
        }, 100);
      });

      return () => cancelAnimationFrame(raf);
    } else {
      const activeEl = nav.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [pathname]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (isRestoringRef.current) return;
    const top = e.currentTarget.scrollTop;
    cachedSidebarScroll = top;
    try {
      sessionStorage.setItem('sidebar_scroll_top', String(top));
    } catch {}
  };

  const handleLinkClick = () => {
    if (navRef.current) {
      const top = navRef.current.scrollTop;
      cachedSidebarScroll = top;
      try {
        sessionStorage.setItem('sidebar_scroll_top', String(top));
      } catch {}
    }
    onCloseMobile();
  };

  // Helper to check if a module is enabled
  const isModuleActive = (modId: string) => {
    const found = modules.find(m => m.id === modId);
    return found ? found.enabled : true;
  };

  const navGroups = [
    {
      group: 'Core',
      items: [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, moduleId: 'mod_analytics' },
        { label: 'Analytics / BI', path: '/analytics', icon: BarChart3, moduleId: 'mod_analytics' },
        { label: 'Multichannel Hub', path: '/multichannel', icon: Zap, moduleId: 'mod_ecommerce' },
        { label: 'Onboarding Flow', path: '/onboarding', icon: Sparkles, moduleId: 'mod_website', badge: '10 Steps' }
      ]
    },
    {
      group: 'Digital & Sales',
      items: [
        { label: 'Website + AI Builder', path: '/website', icon: Globe, moduleId: 'mod_website' },
        { label: 'Ecommerce & Orders', path: '/ecommerce', icon: ShoppingCart, moduleId: 'mod_ecommerce' },
        { label: 'Point of Sale (POS)', path: '/pos', icon: Monitor, moduleId: 'mod_pos' },
        { label: 'CRM & Pipeline', path: '/crm', icon: Users, moduleId: 'mod_crm' },
        { label: 'Payments & Links', path: '/payments', icon: CreditCard, moduleId: 'mod_payments' },
        { label: 'Fiscal PAC (Panama)', path: '/fiscal', icon: Receipt, moduleId: 'mod_fiscal', badge: 'PAC' }
      ]
    },
    {
      group: 'Operations',
      items: [
        { label: 'Inventory & Stock', path: '/inventory', icon: Package, moduleId: 'mod_inventory' },
        { label: 'Purchasing & POs', path: '/purchasing', icon: FileText, moduleId: 'mod_purchasing' },
        { label: 'Delivery & Logistics', path: '/delivery', icon: Truck, moduleId: 'mod_delivery' }
      ]
    },
    {
      group: 'Human Resources',
      items: [
        { label: 'HR & Directory', path: '/hr', icon: UserCheck, moduleId: 'mod_hr' },
        { label: 'Attendance & Dynamic QR', path: '/attendance', icon: Clock, moduleId: 'mod_attendance', badge: 'Live QR' }
      ]
    },
    {
      group: 'Growth & Partners',
      items: [
        { label: 'Marketing & WhatsApp', path: '/marketing', icon: Megaphone, moduleId: 'mod_marketing' },
        { label: 'Affiliates & Influencers', path: '/partners', icon: Share2, moduleId: 'mod_affiliates' }
      ]
    },
    {
      group: 'Management',
      items: [
        { label: 'Branches & Locations', path: '/branches', icon: Building2, moduleId: 'core' },
        { label: 'Module Activation', path: '/modules-config', icon: Layers, moduleId: 'core', badge: 'Configure' },
        { label: 'Audit Logs', path: '/audit-logs', icon: Shield, moduleId: 'core' },
        { label: 'Settings', path: '/settings', icon: Settings, moduleId: 'core' },
        { label: 'Help & Support', path: '/support', icon: HelpCircle, moduleId: 'core' }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-2xs lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/40">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <span className="font-extrabold text-sm tracking-tight">OS</span>
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                KIAAN <span className="text-blue-400 font-semibold text-xs">SaaS</span>
              </span>
              <p className="text-[10px] text-slate-400 font-mono">Business Operating System</p>
            </div>
          </Link>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Tenant Badge */}
        <div className="px-4 py-2.5 bg-slate-800/40 border-b border-slate-800/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="text-sm">{currentBusiness.logo}</span>
            <span className="font-medium text-slate-200 truncate">{currentBusiness.name}</span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800 px-1.5 py-0.5 rounded">
            Live
          </span>
        </div>

        {/* Scrollable Navigation */}
        <nav
          ref={navRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-3 py-4 space-y-5"
        >
          {navGroups.map((grp, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
                {grp.group}
              </p>

              {grp.items.map((item, iIdx) => {
                const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
                const isEnabled = item.moduleId === 'core' || isModuleActive(item.moduleId);
                const Icon = item.icon;

                return (
                  <Link
                    key={iIdx}
                    href={item.path}
                    onClick={handleLinkClick}
                    data-active={isActive ? 'true' : undefined}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-xs shadow-blue-600/30'
                        : isEnabled
                        ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? 'text-white'
                            : isEnabled
                            ? 'text-slate-400 group-hover:text-blue-400'
                            : 'text-slate-600'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold uppercase ${
                          isActive
                            ? 'bg-blue-700 text-blue-100'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {!isEnabled && (
                      <span className="text-[9px] px-1 bg-slate-800/70 text-slate-500 rounded">
                        Off
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer info */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-400">
          <div>
            <p className="font-semibold text-slate-300">Panama Fiscal PAC</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> DGI Certified v2.1
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-400">v1.0-FE</span>
        </div>
      </aside>
    </>
  );
}
