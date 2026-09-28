'use client';

import React, { useEffect, useState } from 'react';
import { useSaaS } from '../../context/SaaSContext';
import { Search, X, ShoppingCart, Users, Package, FileText, ArrowRight, Shield, Globe } from '../icons';
import Link from 'next/link';

export function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen, products, orders, customers, leads } = useSaaS();
  const [query, setQuery] = useState('');

  // Close on Escape, Open on Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredProducts = q ? products.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)) : [];
  const filteredCustomers = q ? customers.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)) : [];
  const filteredOrders = q ? orders.filter(o => o.orderNumber.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q)) : [];
  const filteredLeads = q ? leads.filter(l => l.company.toLowerCase().includes(q) || l.title.toLowerCase().includes(q)) : [];

  const modulesList = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Website + AI Builder', path: '/website', icon: '🌐' },
    { name: 'Ecommerce & Orders', path: '/ecommerce', icon: '🛍️' },
    { name: 'CRM & Pipeline', path: '/crm', icon: '👥' },
    { name: 'Point of Sale (POS)', path: '/pos', icon: '💻' },
    { name: 'Payments & Links', path: '/payments', icon: '💳' },
    { name: 'Panama Fiscal PAC', path: '/fiscal', icon: '🧾' },
    { name: 'Inventory & Warehouses', path: '/inventory', icon: '📦' },
    { name: 'Suppliers & POs', path: '/purchasing', icon: '🏭' },
    { name: 'Delivery Dispatch', path: '/delivery', icon: '🚚' },
    { name: 'HR & Employees', path: '/hr', icon: '👔' },
    { name: 'Attendance & Dynamic QR', path: '/attendance', icon: '⏱️' },
    { name: 'Marketing & WhatsApp', path: '/marketing', icon: '📢' },
    { name: 'Affiliates & Influencers', path: '/partners', icon: '🤝' },
    { name: 'Business Intelligence (BI)', path: '/analytics', icon: '📈' },
    { name: 'Module Configuration', path: '/modules-config', icon: '⚙️' },
    { name: 'System Settings', path: '/settings', icon: '🔧' },
    { name: 'Onboarding Wizard', path: '/onboarding', icon: '🚀' }
  ].filter(m => !q || m.name.toLowerCase().includes(q));

  const totalResults = filteredProducts.length + filteredCustomers.length + filteredOrders.length + filteredLeads.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-200 p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products, orders, customers, leads, or jump to module..."
            autoFocus
            className="w-full text-sm bg-transparent outline-none text-slate-900 placeholder-slate-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 hover:bg-slate-100 rounded text-slate-400">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="sm:hidden p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {/* Quick Module Jump */}
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Navigation & Modules
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {modulesList.slice(0, 6).map(mod => (
                <Link
                  key={mod.path}
                  href={mod.path}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors text-xs font-medium text-slate-700"
                >
                  <span>{mod.icon}</span>
                  <span className="truncate">{mod.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {q && (
            <>
              {/* Products */}
              {filteredProducts.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-blue-500" /> Products ({filteredProducts.length})
                  </p>
                  <div className="space-y-1">
                    {filteredProducts.slice(0, 3).map(prod => (
                      <Link
                        key={prod.id}
                        href="/ecommerce"
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-xs transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                            📦
                          </span>
                          <div>
                            <p className="font-semibold text-slate-800">{prod.name}</p>
                            <p className="text-[11px] text-slate-400">SKU: {prod.sku} • Stock: {prod.stock}</p>
                          </div>
                        </div>
                        <span className="font-bold text-slate-900">${prod.price.toFixed(2)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Customers */}
              {filteredCustomers.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-500" /> Customers ({filteredCustomers.length})
                  </p>
                  <div className="space-y-1">
                    {filteredCustomers.slice(0, 3).map(cust => (
                      <Link
                        key={cust.id}
                        href="/crm"
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-xs transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-slate-800">{cust.name}</p>
                          <p className="text-[11px] text-slate-400">{cust.email} • {cust.city}</p>
                        </div>
                        <span className="text-[11px] text-emerald-600 font-medium">${cust.totalSpent.toFixed(2)} spent</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Orders */}
              {filteredOrders.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShoppingCart className="w-3.5 h-3.5 text-amber-500" /> Orders ({filteredOrders.length})
                  </p>
                  <div className="space-y-1">
                    {filteredOrders.slice(0, 3).map(order => (
                      <Link
                        key={order.id}
                        href="/ecommerce"
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-xs transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-slate-800">{order.orderNumber} - {order.customerName}</p>
                          <p className="text-[11px] text-slate-400">{order.channel} • {order.status}</p>
                        </div>
                        <span className="font-bold text-slate-900">${order.total.toFixed(2)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Leads */}
              {filteredLeads.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-500" /> CRM Leads ({filteredLeads.length})
                  </p>
                  <div className="space-y-1">
                    {filteredLeads.slice(0, 3).map(lead => (
                      <Link
                        key={lead.id}
                        href="/crm"
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-xs transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-slate-800">{lead.title}</p>
                          <p className="text-[11px] text-slate-400">{lead.company} • Stage: {lead.stage}</p>
                        </div>
                        <span className="font-bold text-purple-700">${lead.value.toLocaleString()}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {totalResults === 0 && modulesList.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No matches found for &quot;{query}&quot;. Try another keyword.
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="bg-slate-50 border-t border-slate-100 p-2.5 px-4 flex items-center justify-between text-[11px] text-slate-500">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-semibold text-slate-700">ESC</kbd> to close</span>
          <span className="flex items-center gap-1">
            Navigate with <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-semibold text-slate-700">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-semibold text-slate-700">↓</kbd>
          </span>
        </div>
      </div>
    </div>
  );
}
