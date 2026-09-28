'use client';

import React, { useState } from 'react';
import { useSaaS } from '../../context/SaaSContext';
import { X, Check, ShoppingCart, Users, Package, Link2, HelpCircle } from '../icons';

interface QuickCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'product' | 'customer' | 'lead' | 'link' | 'ticket';
}

export function QuickCreateModal({ isOpen, onClose, defaultTab = 'lead' }: QuickCreateModalProps) {
  const { addProduct, addCustomer, addLead, createPaymentLink, createSupportTicket, currentBranch } = useSaaS();
  const [tab, setTab] = useState<'product' | 'customer' | 'lead' | 'link' | 'ticket'>(defaultTab);

  // Forms
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Laptops & Computers',
    price: 99.00,
    sku: 'SKU-' + Math.floor(1000 + Math.random() * 9000),
    stock: 10
  });

  const [customerForm, setCustomerForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: 'Panama City'
  });

  const [leadForm, setLeadForm] = useState({
    title: '',
    company: '',
    contactName: '',
    email: '',
    phone: '',
    value: 5000,
    priority: 'High' as const,
    notes: ''
  });

  const [linkForm, setLinkForm] = useState({
    title: '',
    amount: 150.00,
    description: '',
    customerName: ''
  });

  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'General' as const,
    priority: 'Medium' as const,
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'product') {
      if (!productForm.name) return;
      addProduct({
        businessId: 'biz_01',
        name: productForm.name,
        description: 'Added via quick create modal',
        category: productForm.category,
        price: Number(productForm.price),
        sku: productForm.sku,
        barcode: '745' + Math.floor(1000000000 + Math.random() * 9000000000),
        stock: Number(productForm.stock),
        minStockAlert: 5,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
        variants: [],
        channels: ['website', 'pos']
      });
    } else if (tab === 'customer') {
      if (!customerForm.name) return;
      addCustomer({
        name: customerForm.name,
        company: customerForm.company,
        email: customerForm.email,
        phone: customerForm.phone,
        city: customerForm.city,
        country: 'Panama',
        status: 'active',
        tags: ['New Customer'],
        notesCount: 0,
        assignedTo: 'Alexander Sterling'
      });
    } else if (tab === 'lead') {
      if (!leadForm.company) return;
      addLead({
        title: leadForm.title || `${leadForm.company} Solution`,
        company: leadForm.company,
        contactName: leadForm.contactName || 'Primary Representative',
        email: leadForm.email,
        phone: leadForm.phone,
        value: Number(leadForm.value),
        stage: 'New',
        priority: leadForm.priority,
        assignedTo: 'Alexander Sterling',
        probability: 20,
        nextFollowUp: 'Tomorrow, 9:00 AM',
        notes: leadForm.notes || 'Created via Quick Action modal'
      });
    } else if (tab === 'link') {
      if (!linkForm.title) return;
      createPaymentLink({
        title: linkForm.title,
        amount: Number(linkForm.amount),
        description: linkForm.description,
        customerName: linkForm.customerName
      });
    } else if (tab === 'ticket') {
      if (!ticketForm.subject) return;
      createSupportTicket({
        subject: ticketForm.subject,
        category: ticketForm.category,
        priority: ticketForm.priority,
        description: ticketForm.description
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-semibold text-slate-900">Quick Create Action</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 p-1 gap-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => setTab('lead')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              tab === 'lead' ? 'bg-white text-blue-600 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Lead
          </button>
          <button
            type="button"
            onClick={() => setTab('product')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              tab === 'product' ? 'bg-white text-blue-600 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-3.5 h-3.5" /> Product
          </button>
          <button
            type="button"
            onClick={() => setTab('customer')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              tab === 'customer' ? 'bg-white text-blue-600 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Customer
          </button>
          <button
            type="button"
            onClick={() => setTab('link')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              tab === 'link' ? 'bg-white text-blue-600 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" /> Pay Link
          </button>
          <button
            type="button"
            onClick={() => setTab('ticket')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              tab === 'ticket' ? 'bg-white text-blue-600 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> Ticket
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          {tab === 'lead' && (
            <>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Company / Organization *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Banco General Panama"
                  value={leadForm.company}
                  onChange={e => setLeadForm({ ...leadForm, company: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Contact Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Roberto Morales"
                    value={leadForm.contactName}
                    onChange={e => setLeadForm({ ...leadForm, contactName: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Estimated Value ($)</label>
                  <input
                    type="number"
                    value={leadForm.value}
                    onChange={e => setLeadForm({ ...leadForm, value: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="contact@company.pa"
                    value={leadForm.email}
                    onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Priority</label>
                  <select
                    value={leadForm.priority}
                    onChange={e => setLeadForm({ ...leadForm, priority: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {tab === 'product' && (
            <>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 4K Pro WebCam"
                  value={productForm.name}
                  onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Initial Stock Units</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={e => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          {tab === 'customer' && (
            <>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ana Victoria Ramos"
                  value={customerForm.name}
                  onChange={e => setCustomerForm({ ...customerForm, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="ana.ramos@gmail.com"
                    value={customerForm.email}
                    onChange={e => setCustomerForm({ ...customerForm, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="+507 6890-1122"
                    value={customerForm.phone}
                    onChange={e => setCustomerForm({ ...customerForm, phone: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          {tab === 'link' && (
            <>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Payment Link Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Corporate Retainer - Oct 2026"
                  value={linkForm.title}
                  onChange={e => setLinkForm({ ...linkForm, title: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Amount ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={linkForm.amount}
                    onChange={e => setLinkForm({ ...linkForm, amount: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Customer Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Inversiones Panama"
                    value={linkForm.customerName}
                    onChange={e => setLinkForm({ ...linkForm, customerName: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          {tab === 'ticket' && (
            <>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Ticket Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="Describe the issue or assistance needed"
                  value={ticketForm.subject}
                  onChange={e => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Category</label>
                  <select
                    value={ticketForm.category}
                    onChange={e => setTicketForm({ ...ticketForm, category: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                  >
                    <option value="General">General Inquiries</option>
                    <option value="POS Hardware">POS Hardware</option>
                    <option value="Fiscal PAC">Panama Fiscal PAC</option>
                    <option value="Billing">Billing & Subscription</option>
                    <option value="Website">Website & Custom Domain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Priority</label>
                  <select
                    value={ticketForm.priority}
                    onChange={e => setTicketForm({ ...ticketForm, priority: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 outline-none focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-3.5 h-3.5" /> Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
