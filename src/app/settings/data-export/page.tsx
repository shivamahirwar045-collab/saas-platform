'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import {
  Download,
  Database,
  Receipt,
  Users,
  Package,
  CheckCircle,
  Clock,
  Lock,
  FileText,
  AlertTriangle
} from '@/components/icons';

interface PastExportArchive {
  id: string;
  name: string;
  category: string;
  format: string;
  size: string;
  checksum: string;
  createdAt: string;
  downloadUrl: string;
}

const pastExports: PastExportArchive[] = [
  {
    id: 'exp-01',
    name: 'Panama_DGI_Fiscal_Facturas_Q3_2026.zip',
    category: 'Fiscal Billing (CUFE XML)',
    format: 'ZIP (XML + PDF)',
    size: '42.8 MB',
    checksum: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    createdAt: '2026-09-25 18:30',
    downloadUrl: '#'
  },
  {
    id: 'exp-02',
    name: 'Complete_SKU_Catalog_MultiWarehouse_2026.xlsx',
    category: 'Inventory & Warehouses',
    format: 'Excel XLSX',
    size: '8.4 MB',
    checksum: 'sha256:a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
    createdAt: '2026-09-20 10:15',
    downloadUrl: '#'
  },
  {
    id: 'exp-03',
    name: 'CRM_Customer_Ledger_Law81_Compliant.csv',
    category: 'CRM & Client Records',
    format: 'CSV',
    size: '14.2 MB',
    checksum: 'sha256:4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
    createdAt: '2026-09-15 09:00',
    downloadUrl: '#'
  }
];

export default function SettingsDataExportPage() {
  const { addToast } = useToast();
  const [archives, setArchives] = useState<PastExportArchive[]>(pastExports);
  const [exportingCategory, setExportingCategory] = useState<string | null>(null);
  const [exportProgress, setExportProgress] = useState(0);

  const exportCategories = [
    {
      id: 'fiscal',
      title: 'Panama DGI Fiscal Invoices & CUFE XMLs',
      description: 'Official signed XML documents, CUFE identifiers, and client tax retention certificates.',
      recordsEstimate: '3,410 e-Facturas',
      icon: <Receipt className="w-6 h-6 text-indigo-600" />
    },
    {
      id: 'inventory',
      title: 'Inventory, SKUs & Warehouse Bins',
      description: 'Product definitions, serial numbers, barcodes, cost basis (COGS), and multi-bin balances.',
      recordsEstimate: '2,840 Items',
      icon: <Package className="w-6 h-6 text-emerald-600" />
    },
    {
      id: 'crm',
      title: 'CRM Contacts & Enterprise Buyer Ledger',
      description: 'Customer profiles, Panama RUC/DV, purchase histories, and WhatsApp contact permissions.',
      recordsEstimate: '9,840 Accounts',
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      id: 'accounting',
      title: 'General Ledger & POS Cashier Reconciliations',
      description: 'Tender splits, shift cash floats, card merchant fees, and daily Z-reports.',
      recordsEstimate: '18,290 Transactions',
      icon: <FileText className="w-6 h-6 text-purple-600" />
    }
  ];

  const handleStartExport = (catId: string, title: string) => {
    setExportingCategory(catId);
    setExportProgress(10);

    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            const newArchive: PastExportArchive = {
              id: `exp-${Date.now().toString().slice(-4)}`,
              name: `${catId}_export_${new Date().toISOString().split('T')[0]}.zip`,
              category: title,
              format: 'ZIP (CSV + JSON)',
              size: '18.6 MB',
              checksum: `sha256:${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
              createdAt: 'Just now',
              downloadUrl: '#'
            };
            setArchives([newArchive, ...archives]);
            setExportingCategory(null);
            setExportProgress(0);
            addToast(`Archive package ready: ${newArchive.name}`, 'success');
          }, 600);
          return 100;
        }
        return prev + 25;
      });
    }, 350);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Settings</span>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Data Backup &amp; Portability</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise Data Export &amp; Backup</h1>
            <p className="text-sm text-slate-500">
              Download complete, encrypted snapshots of your business catalog, customer ledgers, and DGI tax records.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> Automated Nightly Cloud Backup Active
            </span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {exportCategories.map(cat => {
            const isProcessing = exportingCategory === cat.id;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                      {cat.icon}
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                      {cat.recordsEstimate}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{cat.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {isProcessing && (
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-semibold text-indigo-600">
                        <span>Compiling cryptographic archive...</span>
                        <span>{exportProgress}%</span>
                      </div>
                      <div className="w-full bg-indigo-100 h-2 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${exportProgress}%` }}
                          className="bg-indigo-600 h-full transition-all duration-300"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">AES-256 GCM encrypted</span>
                  <Button
                    size="sm"
                    disabled={!!exportingCategory}
                    onClick={() => handleStartExport(cat.id, cat.title)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isProcessing ? 'Generating...' : 'Export Snapshot'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Past Generated Archives Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Archive History &amp; Download Vault</h3>
              <p className="text-xs text-slate-500">
                Snapshots retained for 30 days before automatic cryptographic shredding.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Archive Filename</th>
                  <th className="py-3 px-4">Category Domain</th>
                  <th className="py-3 px-4">Format</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">SHA-256 Integrity Checksum</th>
                  <th className="py-3 px-4">Generated</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {archives.map(arch => (
                  <tr key={arch.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 font-mono">
                      {arch.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {arch.category}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="primary">{arch.format}</Badge>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {arch.size}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400 max-w-xs truncate" title={arch.checksum}>
                      {arch.checksum}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono">
                      {arch.createdAt}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => addToast(`Downloading ${arch.name}`, 'info')}
                      >
                        <Download className="w-3.5 h-3.5 mr-1" /> Download
                      </Button>
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
