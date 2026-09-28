'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import {
  Monitor,
  Clock,
  Printer,
  Receipt,
  Plus,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  RefreshCw,
  ArrowRight
} from '@/components/icons';

interface SessionAuditLog {
  id: string;
  register: string;
  cashier: string;
  openedAt: string;
  closedAt: string;
  openingFloat: number;
  cashSales: number;
  cardSales: number;
  expectedCash: number;
  actualCash: number;
  discrepancy: number;
  status: 'Closed' | 'Active';
}

export default function PosSessionsPage() {
  const { currentRegister, currentBranch, currentUser, currentBusiness } = useSaaS();
  const { success, info } = useToast();

  const [activeSession, setActiveSession] = useState<{
    id: string;
    openedAt: string;
    openingFloat: number;
    cashSales: number;
    cardSales: number;
  }>({
    id: 'cs_live_01',
    openedAt: 'Today 08:30 AM',
    openingFloat: 200.0,
    cashSales: 642.5,
    cardSales: 1240.0
  });

  const [sessionLogs, setSessionLogs] = useState<SessionAuditLog[]>([
    {
      id: 'cs_prev_09',
      register: 'Register 1 - Storefront',
      cashier: 'Carlos Mendoza',
      openedAt: 'Yesterday 08:00 AM',
      closedAt: 'Yesterday 09:30 PM',
      openingFloat: 200.0,
      cashSales: 940.0,
      cardSales: 1820.0,
      expectedCash: 1140.0,
      actualCash: 1140.0,
      discrepancy: 0.0,
      status: 'Closed'
    },
    {
      id: 'cs_prev_08',
      register: 'Register 2 - Express Lane',
      cashier: 'Valeria Gomez',
      openedAt: '2 days ago 09:00 AM',
      closedAt: '2 days ago 09:00 PM',
      openingFloat: 150.0,
      cashSales: 520.0,
      cardSales: 1100.0,
      expectedCash: 670.0,
      actualCash: 668.5,
      discrepancy: -1.5,
      status: 'Closed'
    }
  ]);

  // Close shift modal
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [actualCountedCash, setActualCountedCash] = useState('842.50');

  // Print X/Z modal
  const [reportModal, setReportModal] = useState<'X' | 'Z' | null>(null);

  const expectedDrawerCash = activeSession.openingFloat + activeSession.cashSales;
  const counted = parseFloat(actualCountedCash) || 0;
  const discrepancy = counted - expectedDrawerCash;

  const handleCloseShift = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: SessionAuditLog = {
      id: `cs_${Date.now()}`,
      register: currentRegister.name,
      cashier: currentUser.name,
      openedAt: activeSession.openedAt,
      closedAt: `Today ${new Date().toLocaleTimeString()}`,
      openingFloat: activeSession.openingFloat,
      cashSales: activeSession.cashSales,
      cardSales: activeSession.cardSales,
      expectedCash: expectedDrawerCash,
      actualCash: counted,
      discrepancy,
      status: 'Closed'
    };

    setSessionLogs([newLog, ...sessionLogs]);
    setIsCloseModalOpen(false);
    success(
      'Cash Shift Closed (Z-Report)',
      `Drawer reconciled. Discrepancy: ${discrepancy >= 0 ? '+$' : '-$'}${Math.abs(discrepancy).toFixed(2)}`
    );
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Cash Register Shifts & Reconciliation</h1>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                Register 1 Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage cash float drawers, mid-day X-reports, end-of-shift Z-closures, and discrepancy audits.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Printer className="w-3.5 h-3.5" />}
              onClick={() => setReportModal('X')}
            >
              Print X-Report (Audit)
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setIsCloseModalOpen(true)}
            >
              End Shift & Close Drawer (Z)
            </Button>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/pos" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            POS Terminal
          </Link>
          <Link href="/pos/register" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Fullscreen Cashier Mode
          </Link>
          <Link href="/pos/sessions" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Cash Shifts & Reconciliation
          </Link>
        </div>

        {/* Live Shift Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
                ACTIVE TILL SESSION
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {currentRegister.name} ({currentBranch.name.split(' (')[0]})
              </h3>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Cashier: <span className="text-white font-semibold">{currentUser.name}</span> • Shift Started: {activeSession.openedAt}
            </div>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">Opening Float</span>
              <p className="text-lg font-bold font-mono text-white mt-0.5">
                ${activeSession.openingFloat.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">Cash Sales Today</span>
              <p className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                +${activeSession.cashSales.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">Card / Yappy Sales</span>
              <p className="text-lg font-bold font-mono text-blue-400 mt-0.5">
                ${activeSession.cardSales.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">Expected Drawer Cash</span>
              <p className="text-lg font-bold font-mono text-amber-400 mt-0.5">
                ${expectedDrawerCash.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Historical Shifts Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Shift Closure History (Z-Reports)
            </h3>
            <span className="text-xs text-slate-400 font-mono">DGI Fiscal PAC Matched</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Register & Cashier</th>
                  <th className="py-3 px-4">Session Duration</th>
                  <th className="py-3 px-4">Opening Float</th>
                  <th className="py-3 px-4">Cash Sales</th>
                  <th className="py-3 px-4">Expected Cash</th>
                  <th className="py-3 px-4">Actual Counted</th>
                  <th className="py-3 px-4">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {sessionLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{log.register}</p>
                      <p className="text-[11px] text-slate-400">{log.cashier}</p>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      <div>{log.openedAt}</div>
                      <div>{log.closedAt}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono">${log.openingFloat.toFixed(2)}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                      ${log.cashSales.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      ${log.expectedCash.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      ${log.actualCash.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      {log.discrepancy === 0 ? (
                        <span className="font-mono font-bold text-emerald-600 text-xs flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Perfect $0.00
                        </span>
                      ) : (
                        <span className="font-mono font-bold text-rose-600 text-xs">
                          {log.discrepancy > 0 ? '+' : ''}${log.discrepancy.toFixed(2)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Close Shift (Z-Report) Modal */}
      <Modal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        title="Close Register Shift (Z-Report)"
        description="Count the physical currency in the cash drawer and confirm end of shift."
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsCloseModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCloseShift}>
              Confirm & Lock Till
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCloseShift} className="space-y-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 font-mono">
            <div className="flex justify-between text-slate-600">
              <span>Opening Base Float:</span>
              <span>${activeSession.openingFloat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Recorded Cash Tender:</span>
              <span>+${activeSession.cashSales.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 pt-1.5 border-t border-slate-200">
              <span>Expected Total in Drawer:</span>
              <span>${expectedDrawerCash.toFixed(2)}</span>
            </div>
          </div>

          <Input
            label="Actual Physical Cash Counted ($ USD)"
            type="number"
            step="0.01"
            required
            value={actualCountedCash}
            onChange={(e) => setActualCountedCash(e.target.value)}
          />

          <div className="p-3 rounded-xl border text-center font-bold">
            <span className="text-slate-500 text-[11px] block">Till Discrepancy Variance:</span>
            <span
              className={`text-base font-mono mt-0.5 block ${
                discrepancy === 0
                  ? 'text-emerald-600'
                  : discrepancy > 0
                  ? 'text-blue-600'
                  : 'text-rose-600'
              }`}
            >
              {discrepancy === 0
                ? 'Balanced (Zero Variance)'
                : `${discrepancy > 0 ? 'Cash Surplus: +$' : 'Cash Shortage: -$'}${Math.abs(discrepancy).toFixed(2)}`}
            </span>
          </div>
        </form>
      </Modal>

      {/* X / Z Printable Audit Report Modal */}
      {reportModal && (
        <Modal
          isOpen={!!reportModal}
          onClose={() => setReportModal(null)}
          title={`Reporte ${reportModal} de Turno de Caja`}
          description={reportModal === 'X' ? 'Auditoría provisional a mitad de jornada' : 'Cierre fiscal definitivo Z'}
          maxWidth="sm"
          footer={
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  info('Print Command Dispatched', `Printing Reporte ${reportModal} on thermal paper...`);
                  setReportModal(null);
                }}
              >
                Imprimir en Térmica
              </Button>
              <Button variant="primary" size="sm" onClick={() => setReportModal(null)} className="flex-1">
                Cerrar
              </Button>
            </div>
          }
        >
          <div className="p-4 bg-white border border-slate-300 rounded-xl font-mono text-[11px] space-y-2">
            <div className="text-center pb-2 border-b border-dashed border-slate-400">
              <p className="font-bold text-sm uppercase">{currentBusiness.name}</p>
              <p className="text-[10px] text-slate-500">R.U.C. 155789012-2-2021 D.V. 44</p>
              <p className="text-xs font-bold text-blue-700 mt-1">REPORTE {reportModal} FISCAL DGI</p>
            </div>

            <div className="space-y-0.5 text-slate-600 text-[10px]">
              <div className="flex justify-between">
                <span>Caja:</span>
                <span>{currentRegister.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Sucursal:</span>
                <span>{currentBranch.name.split(' (')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>Cajero:</span>
                <span>{currentUser.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Fecha / Hora:</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t border-b border-dashed border-slate-300 py-2 space-y-1">
              <div className="flex justify-between">
                <span>Fondo Inicial:</span>
                <span>${activeSession.openingFloat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ventas Efectivo:</span>
                <span>${activeSession.cashSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ventas Tarjeta:</span>
                <span>${activeSession.cardSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-slate-200">
                <span>TOTAL RECAUDO:</span>
                <span>${(activeSession.cashSales + activeSession.cardSales).toFixed(2)}</span>
              </div>
            </div>

            <p className="text-[9px] text-center text-slate-400 pt-1">
              *** FIN DEL REPORTE {reportModal} ***
            </p>
          </div>
        </Modal>
      )}
    </AppShell>
  );
}
