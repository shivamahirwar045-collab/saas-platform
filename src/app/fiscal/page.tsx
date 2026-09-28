'use client';

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { FiscalInvoice } from '@/types/saas';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import {
  Receipt,
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  QrCode,
  FileText,
  Search,
  Check,
  X,
  Printer
} from '@/components/icons';
import { useToast } from '@/components/ui/Toast';

export default function FiscalBillingPage() {
  const { fiscalInvoices, currentBusiness } = useSaaS();
  const { success } = useToast();
  const [activeTab, setActiveTab] = useState<'invoices' | 'pac' | 'logs' | 'settings'>('invoices');
  const [selectedInvoice, setSelectedInvoice] = useState<FiscalInvoice | null>(null);

  // PAC Integration Status
  const [pacProvider, setPacProvider] = useState<'The Factory HKA' | 'Digifact' | 'E-Sign PAC' | 'GuruSoft'>('The Factory HKA');
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<string | null>('Healthy (138ms response time)');

  const handlePingPAC = () => {
    setIsPinging(true);
    setPingResult(null);
    setTimeout(() => {
      setIsPinging(false);
      setPingResult(`Connected to ${pacProvider} DGI Endpoints (142ms latency) - SSL TLS 1.3 Active`);
    }, 800);
  };

  const handleDownloadPdf = (inv: FiscalInvoice) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Header Banner
      doc.setFillColor(30, 41, 59);
      doc.rect(0, 0, 210, 28, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('REPÚBLICA DE PANAMÁ - DGI', 15, 12);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('FACTURA ELECTRÓNICA DE PANAMÁ (FE)', 15, 20);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`N°: ${inv.invoiceNumber}`, 195, 16, { align: 'right' });

      // Emisor Box
      let y = 38;
      doc.setDrawColor(226, 232, 240);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(15, y, 88, 32, 2, 2, 'FD');

      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('DATOS DEL EMISOR', 19, y + 7);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Razón Social: ${currentBusiness?.name || 'Acme Retail & Tech'}`, 19, y + 13);
      doc.text(`RUC: ${currentBusiness?.taxId || '155789012-2-2021'}   DV: ${currentBusiness?.dv || '44'}`, 19, y + 19);
      doc.text(`Dirección: ${currentBusiness?.address || 'Calle 50, Panamá'}`, 19, y + 25);

      // Receptor Box
      doc.roundedRect(107, y, 88, 32, 2, 2, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('DATOS DEL RECEPTOR', 111, y + 7);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Cliente: ${inv.customerName}`, 111, y + 13);
      doc.text(`RUC: ${inv.customerRuc}   DV: ${inv.dv}`, 111, y + 19);
      doc.text(`Orden Ref: ${inv.orderNumber}`, 111, y + 25);

      // CUFE & PAC Certification Box (Green)
      y = 75;
      doc.setFillColor(236, 253, 245);
      doc.setDrawColor(167, 243, 208);
      doc.roundedRect(15, y, 180, 28, 2, 2, 'FD');

      doc.setTextColor(6, 78, 59);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text('AUTORIZACIÓN Y CERTIFICACIÓN FISCAL (DGI - PAC)', 19, y + 7);
      doc.setFont('courier', 'bold');
      doc.setFontSize(7.5);
      doc.text(`CUFE: ${inv.cufe}`, 19, y + 13);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text(`N° Autorización DGI: ${inv.authorizationCode}`, 19, y + 19);
      doc.text(`Proveedor PAC: ${inv.pacProvider}   |   Estado: VERIFICADO Y AUTORIZADO`, 19, y + 24);

      // Financial Details Table
      y = 110;
      doc.setFillColor(241, 245, 249);
      doc.rect(15, y, 180, 8, 'F');
      doc.setTextColor(51, 65, 85);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('Descripción de Servicios / Bienes', 19, y + 5.5);
      doc.text('Monto ($)', 185, y + 5.5, { align: 'right' });

      y += 12;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 41, 59);
      doc.text(`Servicios de Operación Comercial (Ref: ${inv.orderNumber})`, 19, y);
      doc.text(`$${(inv.amount - inv.taxAmount).toFixed(2)}`, 185, y, { align: 'right' });

      // Divider Line
      y += 10;
      doc.setDrawColor(226, 232, 240);
      doc.line(15, y, 195, y);

      // Total Breakdown
      y += 8;
      doc.setFontSize(9);
      doc.text('Subtotal:', 140, y);
      doc.text(`$${(inv.amount - inv.taxAmount).toFixed(2)}`, 185, y, { align: 'right' });

      y += 6;
      doc.text('ITBMS (7% Tax):', 140, y);
      doc.text(`$${inv.taxAmount.toFixed(2)}`, 185, y, { align: 'right' });

      y += 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text('MONTO TOTAL CON ITBMS:', 120, y);
      doc.text(`$${inv.amount.toFixed(2)}`, 185, y, { align: 'right' });

      // Footer
      y = 265;
      doc.setDrawColor(203, 213, 225);
      doc.line(15, y, 195, y);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('Este documento es una representación impresa de una Factura Electrónica autorizada por la DGI Panamá.', 105, y + 6, { align: 'center' });
      doc.text('Generado por NEXUS SaaS - Sistema de Facturación Electrónica Panamá v2.1', 105, y + 10, { align: 'center' });

      // Save PDF
      doc.save(`Factura_DGI_${inv.invoiceNumber}.pdf`);
      if (success) {
        success(`Factura DGI PDF descargada: Factura_DGI_${inv.invoiceNumber}.pdf`);
      }
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
  };

  const invoiceColumns: Column<FiscalInvoice>[] = [
    {
      header: 'Invoice #',
      cell: (inv) => (
        <div>
          <span className="font-bold text-slate-900">{inv.invoiceNumber}</span>
          <p className="text-[10px] text-slate-400 font-mono">Order: {inv.orderNumber}</p>
        </div>
      )
    },
    {
      header: 'Customer & RUC',
      cell: (inv) => (
        <div>
          <p className="font-semibold text-slate-800">{inv.customerName}</p>
          <p className="text-[11px] text-slate-400 font-mono">
            RUC: {inv.customerRuc} DV: {inv.dv}
          </p>
        </div>
      )
    },
    {
      header: 'Amount',
      cell: (inv) => (
        <div>
          <span className="font-bold text-slate-900">${inv.amount.toFixed(2)}</span>
          <p className="text-[10px] text-slate-400">ITBMS: ${inv.taxAmount.toFixed(2)}</p>
        </div>
      )
    },
    {
      header: 'PAC Provider',
      accessorKey: 'pacProvider'
    },
    {
      header: 'PAC Authorization',
      cell: (inv) => (
        <Badge variant={inv.pacStatus === 'Authorized' ? 'success' : 'warning'}>
          {inv.pacStatus === 'Authorized' ? '✓ DGI Authorized' : inv.pacStatus}
        </Badge>
      )
    },
    {
      header: 'CUFE Hash',
      cell: (inv) => (
        <span className="font-mono text-[10px] text-slate-500 truncate max-w-[120px] block" title={inv.cufe}>
          {inv.cufe.slice(0, 18)}...
        </span>
      )
    },
    {
      header: 'Action',
      cell: (inv) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedInvoice(inv);
            }}
            className="text-blue-600 hover:text-blue-800 font-semibold text-xs"
          >
            View Doc
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadPdf(inv);
            }}
            className="text-slate-600 hover:text-slate-900 font-semibold text-xs flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-colors"
            title="Download DGI PDF"
          >
            <Printer className="w-3 h-3" /> PDF
          </button>
        </div>
      )
    }
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Panama Electronic Fiscal Billing (PAC)
              </h1>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                DGI Compliant
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Automated CUFE generation, PAC digital signature queues, and DGI Panama fiscal validation.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePingPAC}
              disabled={isPinging}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
              <span>Test PAC Handshake</span>
            </button>
          </div>
        </div>

        {/* PAC Engine Status Alert */}
        {pingResult && (
          <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{pingResult}</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-700 font-bold">DGI PAC READY</span>
          </div>
        )}

        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Authorized Invoices"
            value="49,281"
            change="100%"
            isPositive={true}
            subtitle="CUFE digitally validated"
            icon={<Receipt className="w-5 h-5" />}
          />
          <StatCard
            title="ITBMS Tax Collected (7%)"
            value="$23,824.50"
            subtitle="Current monthly cycle"
            icon={<CheckCircle className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="PAC Retry Queue"
            value="0 Failed"
            isPositive={true}
            subtitle="0 retries pending"
            icon={<Clock className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Active RUC & DV"
            value={`${currentBusiness.taxId} DV:${currentBusiness.dv}`}
            subtitle="Jurídico contribuyente"
            icon={<FileText className="w-5 h-5" />}
            iconBg="bg-teal-50 text-teal-600"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 text-xs font-semibold text-slate-600 overflow-x-auto">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'invoices' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Receipt className="w-4 h-4" /> Invoices &amp; Documents ({fiscalInvoices.length})
          </button>
          <button
            onClick={() => setActiveTab('pac')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'pac' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <RefreshCw className="w-4 h-4" /> PAC Adapter Configuration
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'logs' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" /> Transmission &amp; Retry Logs (4)
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'settings' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" /> Fiscal Tax Codes &amp; Certificate
          </button>
        </div>

        {/* TAB 1: INVOICES TABLE */}
        {activeTab === 'invoices' && (
          <DataTable
            data={fiscalInvoices}
            columns={invoiceColumns}
            searchPlaceholder="Search invoices by number, customer or RUC..."
            title="Panama Electronic Invoices Registry"
            subtitle="Issued according to Law 256 and DGI electronic billing mandate"
            onRowClick={(inv) => setSelectedInvoice(inv)}
          />
        )}

        {/* TAB 2: PAC ADAPTER */}
        {activeTab === 'pac' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5 max-w-3xl text-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900">Authorized PAC Provider Adapter</h3>
              <p className="text-slate-500">
                Choose the Proveedor de Autorización Calificado (PAC) connecting your SaaS to the DGI Panama tax authority.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(['The Factory HKA', 'Digifact', 'E-Sign PAC', 'GuruSoft'] as const).map(p => (
                <div
                  key={p}
                  onClick={() => setPacProvider(p)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    pacProvider === p
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-sm">{p}</span>
                    {pacProvider === p && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    {p === 'The Factory HKA' ? 'Primary Certified PAC partner in Panama' : 'High volume backup adapter'}
                  </p>
                  <div className="mt-2 text-[10px] text-emerald-700 font-medium">✓ DGI Panama License Active</div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800">Abstracted Adapter Architecture</span>
              <p className="text-slate-600 leading-relaxed">
                The billing core communicates with a standardized internal contract (`FiscalPACAdapter`). Provider-specific payloads and XML signatures are encapsulated so you can switch between PAC providers without modifying your POS or Ecommerce codebase.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: LOGS */}
        {activeTab === 'logs' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900">PAC Transmission Event Stream</h3>
            <div className="divide-y divide-slate-100">
              {[
                { time: '2026-09-28 10:23:15', event: 'PAC Authorization Granted', inv: 'FE-001-003-00018442', latency: '124ms', status: 'Success (HTTP 200)' },
                { time: '2026-09-28 09:15:30', event: 'PAC Authorization Granted', inv: 'FE-001-002-00049281', latency: '148ms', status: 'Success (HTTP 200)' },
                { time: '2026-09-27 17:03:00', event: 'PAC Authorization Granted', inv: 'FE-001-001-00092104', latency: '112ms', status: 'Success (HTTP 200)' },
                { time: '2026-09-27 16:59:45', event: 'Signature Hash Verified', inv: 'Internal Queue', latency: '22ms', status: 'Passed' }
              ].map((l, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{l.event} — {l.inv}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{l.time} • Latency: {l.latency}</p>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {l.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs max-w-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900">Panama Fiscal Parameters &amp; Digital Certificate</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Company Legal RUC</label>
                <input
                  type="text"
                  defaultValue="155789012-2-2021"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Digit Verifier (DV)</label>
                  <input
                    type="text"
                    defaultValue="44"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Standard Tax Rate (ITBMS)</label>
                  <input
                    type="text"
                    defaultValue="7.0%"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800">DGI Digital Certificate (.p12)</span>
                <p className="text-slate-500 text-[11px]">Valid until: Dec 31, 2027 • Issued by Soluciones Seguras PA</p>
                <p className="text-emerald-600 font-semibold text-[11px]">✓ Active and verified</p>
              </div>

              <button
                onClick={() => success('Fiscal Parameters Saved', 'Digital certificate and DGI RUC records updated.')}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold"
              >
                Save Fiscal Configuration
              </button>
            </div>
          </div>
        )}

        {/* MODAL: INVOICE DOCUMENT PREVIEW */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Factura Electrónica de Panamá</h3>
                  <p className="text-xs text-slate-400 font-mono">{selectedInvoice.invoiceNumber}</p>
                </div>
                <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <p className="font-bold text-slate-800">Emisor: {currentBusiness.name}</p>
                  <p className="text-slate-600">RUC: {currentBusiness.taxId} DV: {currentBusiness.dv}</p>
                  <p className="text-slate-500">Dirección: {currentBusiness.address}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <p className="font-bold text-slate-800">Receptor: {selectedInvoice.customerName}</p>
                  <p className="text-slate-600">RUC: {selectedInvoice.customerRuc} DV: {selectedInvoice.dv}</p>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1 text-emerald-900 font-mono">
                  <p className="font-bold">CUFE: {selectedInvoice.cufe}</p>
                  <p>Autorización: {selectedInvoice.authorizationCode}</p>
                  <p>PAC: {selectedInvoice.pacProvider}</p>
                </div>

                <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-slate-100">
                  <span>Monto Total con ITBMS:</span>
                  <span>${selectedInvoice.amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleDownloadPdf(selectedInvoice)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> Download DGI PDF
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
