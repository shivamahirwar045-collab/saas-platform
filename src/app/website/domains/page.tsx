'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import {
  Globe,
  CheckCircle,
  Copy,
  RefreshCw,
  Lock,
  Plus,
  AlertTriangle,
  ExternalLink
} from '@/components/icons';

export default function WebsiteDomainsPage() {
  const { success, info } = useToast();

  const [domains, setDomains] = useState([
    {
      domain: 'store.panamatech.pa',
      type: 'Primary Domain',
      status: 'Verified & Active',
      ssl: 'Let\'s Encrypt Wildcard (Active)',
      sslExpires: '2026-12-15'
    },
    {
      domain: 'panamatech.kiaan.os',
      type: 'Default Subdomain',
      status: 'System Managed',
      ssl: 'Automated Cloudflare Edge',
      sslExpires: 'Never'
    }
  ]);

  const [newDomain, setNewDomain] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const dnsRecords = [
    { type: 'A', host: '@', value: '76.76.21.21', ttl: '3600', status: 'Valid' },
    { type: 'CNAME', host: 'store', value: 'cname.kiaan.os', ttl: '3600', status: 'Valid' },
    { type: 'TXT', host: '_kiaan-challenge', value: 'kiaan-verification=99824fa10e', ttl: 'Auto', status: 'Verified' }
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    info('Copied to Clipboard', `${label}: ${text}`);
  };

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain) return;
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      const added = {
        domain: newDomain.toLowerCase().trim(),
        type: 'Secondary Alias',
        status: 'Pending DNS Propagation',
        ssl: 'Issuing Certificate...',
        sslExpires: '2027-01-01'
      };
      setDomains([...domains, added]);
      setNewDomain('');
      success('Domain Added', `Verification records generated for ${added.domain}.`);
    }, 700);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Custom Domains & SSL Encryption</h1>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                SSL Enforced (TLS 1.3)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Connect your brand’s custom domain, configure DNS records, and maintain zero-configuration SSL certificates.
            </p>
          </div>

          <Link href="/website">
            <Button variant="outline" size="sm">
              Visual Builder
            </Button>
          </Link>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/website" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Visual Editor
          </Link>
          <Link href="/website/pages" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            All Pages
          </Link>
          <Link href="/website/templates" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Templates
          </Link>
          <Link href="/website/seo" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            SEO & Social Cards
          </Link>
          <Link href="/website/domains" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Domains & SSL
          </Link>
        </div>

        {/* Add Domain Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-2">Connect a Custom Domain</h3>
          <p className="text-xs text-slate-500 mb-4">
            Enter your domain (e.g. shop.yourbusiness.com or yourbusiness.pa) to point to this SaaS instance.
          </p>
          <form onSubmit={handleAddDomain} className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <input
              type="text"
              required
              placeholder="e.g. compras.tienda.pa"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isVerifying}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Domain
            </Button>
          </form>
        </div>

        {/* Domains List */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Active Connected Domains ({domains.length})
            </h3>
            <button
              onClick={() => success('DNS Check Complete', 'All domain root servers queried. Zero downtime detected.')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Re-check DNS
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {domains.map((d, idx) => (
              <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span>{d.domain}</span>
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.2 rounded">
                        {d.type}
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      <span>{d.ssl}</span>
                      <span>•</span>
                      <span>Expires: {d.sslExpires}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={d.status.includes('Active') || d.status.includes('Managed') ? 'success' : 'warning'}>
                    {d.status}
                  </Badge>
                  <a
                    href={`https://${d.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-slate-400 hover:text-slate-600"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Required DNS Records Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">DNS Configuration Records</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Add these DNS records to your domain registrar (GoDaddy, Namecheap, Cloudflare, or Nic.pa).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-bold uppercase">
                <tr>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Host / Name</th>
                  <th className="py-2.5 px-3">Target Value</th>
                  <th className="py-2.5 px-3">TTL</th>
                  <th className="py-2.5 px-3 text-right">Copy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {dnsRecords.map((rec, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-blue-600">{rec.type}</td>
                    <td className="py-3 px-3">{rec.host}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">{rec.value}</td>
                    <td className="py-3 px-3 text-slate-500">{rec.ttl}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleCopy(rec.value, `${rec.type} Record`)}
                        className="p-1 text-slate-400 hover:text-slate-700"
                        title="Copy Value"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
