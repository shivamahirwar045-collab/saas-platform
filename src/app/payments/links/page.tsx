'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { PaymentLink } from '@/types/saas';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import {
  Link2,
  Plus,
  Copy,
  Share2,
  Trash2,
  CheckCircle,
  ExternalLink,
  QrCode,
  CreditCard
} from '@/components/icons';

export default function PaymentLinksPage() {
  const { paymentLinks, createPaymentLink, currentBusiness } = useSaaS();
  const { success, info } = useToast();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedShare, setSelectedShare] = useState<PaymentLink | null>(null);

  // New Link form
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('185.00');
  const [customerName, setCustomerName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createPaymentLink({
      title,
      amount: parseFloat(amount) || 0,
      description: description || 'Commercial payment settlement',
      customerName: customerName || 'Valued Client'
    });
    setIsAddOpen(false);
    setTitle('');
    setCustomerName('');
    setDescription('');
    success('Payment Link Generated', 'Unique checkout link ready for WhatsApp or email dispatch.');
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard?.writeText(url);
    success('Link Copied', 'Checkout URL copied to clipboard.');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Payment Links (WhatsApp & Web)</h1>
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                {paymentLinks.length} Active Links
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Send instant checkout links for remote sales, social commerce, and fast B2B collections.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddOpen(true)}
            >
              Generate Payment Link
            </Button>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/payments" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Overview
          </Link>
          <Link href="/payments/links" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Payment Links
          </Link>
          <Link href="/payments/transactions" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Transactions & Refunds
          </Link>
        </div>

        {/* Payment Links List Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Title & Client</th>
                  <th className="py-3.5 px-4">Amount ($ USD)</th>
                  <th className="py-3.5 px-4">Link URL</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Created Date</th>
                  <th className="py-3.5 px-4 text-right">Share & Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {paymentLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900 text-sm leading-snug">{link.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Client: {link.customerName || 'Open Recipient'}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 text-sm">
                      ${link.amount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-blue-600">
                      <span className="truncate max-w-[200px] inline-block">{link.url}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={link.status === 'Active' ? 'success' : 'default'} size="sm">
                        {link.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleCopyLink(link.url || `https://pay.kiaan.com/l/${link.code}`)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Copy Link"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedShare(link)}
                          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                          title="Share on WhatsApp"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Share Modal with QR and WhatsApp */}
      {selectedShare && (
        <Modal
          isOpen={!!selectedShare}
          onClose={() => setSelectedShare(null)}
          title="Share Payment Link"
          description={`Payment of $${selectedShare.amount.toFixed(2)} for ${selectedShare.title}`}
          maxWidth="sm"
          footer={
            <Button variant="primary" size="sm" onClick={() => setSelectedShare(null)} className="w-full">
              Done
            </Button>
          }
        >
          <div className="space-y-4 text-xs text-center py-2">
            <div className="w-36 h-36 bg-slate-100 border border-slate-300 rounded-2xl mx-auto flex flex-col items-center justify-center p-3 shadow-inner">
              <QrCode className="w-20 h-20 text-slate-800 mb-1" />
              <span className="text-[10px] font-mono text-slate-500">Scan to Pay via Yappy</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left font-mono break-all text-[11px] text-slate-600">
              {selectedShare.url || `https://pay.kiaan.com/l/${selectedShare.code}`}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Copy className="w-3.5 h-3.5" />}
                onClick={() => handleCopyLink(selectedShare.url || `https://pay.kiaan.com/l/${selectedShare.code}`)}
              >
                Copy URL
              </Button>
              <Button
                variant="success"
                size="sm"
                onClick={() => {
                  info('WhatsApp Opened', 'Redirected to WhatsApp message composer with pre-filled payment link.');
                }}
              >
                WhatsApp Share
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Link Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Generate Direct Payment Link"
        description="Creates an encrypted checkout URL with automated Panama PAC invoice generation."
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreate}>
              Generate Link
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <Input
            label="Payment Description / Concept"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Deposit for 2x UltraBook Pro"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Amount ($ USD)"
              type="number"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Input
              label="Customer Name (Optional)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Mariana Vasquez"
            />
          </div>

          <Input
            label="Internal Notes"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Reference PO or ticket number..."
          />
        </form>
      </Modal>
    </AppShell>
  );
}
