'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { DeliveryJob } from '@/types/saas';
import { mockDeliveryJobs } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { SignaturePad } from '@/components/ui/SignaturePad';
import { useToast } from '@/components/ui/Toast';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  Phone,
  Check,
  Search,
  ArrowRight,
  Shield,
  Edit3
} from '@/components/icons';

export default function DeliveryRoutesPage() {
  const { success, info } = useToast();

  const [jobs, setJobs] = useState<DeliveryJob[]>(mockDeliveryJobs);
  const [selectedDriver, setSelectedDriver] = useState('Luis Morales');
  const [activeJobForPod, setActiveJobForPod] = useState<DeliveryJob | null>(null);

  const drivers = [
    { name: 'Luis Morales', vehicle: 'Motorcycle Moto-01', status: 'En Route', stops: 4, phone: '+507 6711-2299' },
    { name: 'Jorge Batista', vehicle: 'Van Express-04', status: 'En Route', stops: 6, phone: '+507 6822-4411' },
    { name: 'Alexis Herrera', vehicle: 'Truck Heavy-02', status: 'Available', stops: 0, phone: '+507 6900-5522' }
  ];

  const driverStops = jobs.filter((j) => j.driverName.includes(selectedDriver.split(' ')[0]));

  const handleCapturePod = (signatureUrl: string) => {
    if (!activeJobForPod) return;
    const updated = jobs.map((j) =>
      j.id === activeJobForPod.id
        ? { ...j, status: 'Delivered' as const, proofSignature: true }
        : j
    );
    setJobs(updated);
    setActiveJobForPod(null);
    success('Proof of Delivery Captured', `Digital signature archived for order ${activeJobForPod.orderNumber}.`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Active Delivery Routes & Dispatch</h1>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                Live GPS Routing
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dispatch couriers across Panama City corridors, track ETAs, and capture digital signatures.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/delivery">
              <Button variant="outline" size="sm">
                Jobs Table
              </Button>
            </Link>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/delivery" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Dispatch Board
          </Link>
          <Link href="/delivery/routes" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Live Route Planning & Drivers
          </Link>
        </div>

        {/* Main Grid: Left Map + Right Route Stops */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Simulated Panama City Route Map */}
          <div className="lg:col-span-2 bg-slate-900 rounded-3xl border border-slate-800 p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[460px]">
            {/* Map Top Header */}
            <div className="flex items-center justify-between z-10 bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white leading-tight">Panama City Metro Delivery Grid</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Corredor Sur • Costa del Este • Calle 50</p>
                </div>
              </div>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ● 2 DRIVERS LIVE
              </span>
            </div>

            {/* Simulated Interactive Vector Map Visual */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Coastal line */}
                <path d="M 0,350 Q 200,280 400,320 T 800,250" stroke="#3b82f6" strokeWidth="6" strokeDasharray="12 6" />
                {/* Roads */}
                <path d="M 100,50 L 300,450" stroke="#475569" strokeWidth="3" />
                <path d="M 50,200 L 750,200" stroke="#475569" strokeWidth="4" />
                <path d="M 400,50 L 600,450" stroke="#475569" strokeWidth="2" />
                <path d="M 250,150 L 550,350" stroke="#60a5fa" strokeWidth="3" />
              </svg>
            </div>

            {/* Simulated Waypoint Pins */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto pt-8">
              <div className="p-3 rounded-xl bg-slate-950/90 border border-blue-500/40 backdrop-blur-md space-y-1">
                <span className="text-[9px] font-bold text-blue-400 uppercase font-mono">STOP 1 • 10:15 AM</span>
                <p className="text-xs font-bold text-white">Ave. Balboa, PH Yoo</p>
                <p className="text-[11px] text-slate-400">Order #ORD-2026-0891</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/90 border border-emerald-500/40 backdrop-blur-md space-y-1">
                <span className="text-[9px] font-bold text-emerald-400 uppercase font-mono">STOP 2 • 11:30 AM</span>
                <p className="text-xs font-bold text-white">Costa del Este, Tower 3</p>
                <p className="text-[11px] text-slate-400">Order #ORD-2026-0894</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-500/40 backdrop-blur-md space-y-1">
                <span className="text-[9px] font-bold text-amber-400 uppercase font-mono">STOP 3 • 01:00 PM</span>
                <p className="text-xs font-bold text-white">Multiplaza Mall Pacific</p>
                <p className="text-[11px] text-slate-400">Order #ORD-2026-0902</p>
              </div>
            </div>

            {/* Map bottom bar */}
            <div className="z-10 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Average Transit Time: 22 mins</span>
              <span className="text-emerald-400 font-semibold font-mono">Optimal Fuel Route Active</span>
            </div>
          </div>

          {/* Right Column: Driver Switcher & Assigned Route Stops */}
          <div className="space-y-4">
            {/* Driver selector */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Select Active Courier
              </label>
              <div className="space-y-2">
                {drivers.map((d) => (
                  <button
                    key={d.name}
                    onClick={() => setSelectedDriver(d.name)}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      selectedDriver === d.name
                        ? 'bg-blue-50 border-blue-500 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-900 text-xs">{d.name}</p>
                      <Badge variant={d.status === 'En Route' ? 'success' : 'default'} size="sm">
                        {d.status}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{d.vehicle} • {d.stops} Stops</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Sequence of Stops for Selected Driver */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Stops Sequence ({driverStops.length})
              </h3>

              <div className="space-y-2.5">
                {driverStops.map((job, idx) => (
                  <div
                    key={job.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-blue-600">
                        Stop #{idx + 1} • {job.orderNumber}
                      </span>
                      <Badge variant={job.status === 'Delivered' ? 'success' : 'info'} size="sm">
                        {job.status}
                      </Badge>
                    </div>

                    <p className="font-bold text-slate-900">{job.customerName}</p>
                    <p className="text-[11px] text-slate-500 leading-tight">{job.address}</p>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-mono">ETA: {job.estimatedTime}</span>
                      {job.status !== 'Delivered' && (
                        <button
                          onClick={() => setActiveJobForPod(job)}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] flex items-center gap-1 transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Capture POD</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proof of Delivery (Signature Pad) Modal */}
      {activeJobForPod && (
        <Modal
          isOpen={!!activeJobForPod}
          onClose={() => setActiveJobForPod(null)}
          title="Digital Proof of Delivery (POD)"
          description={`Customer: ${activeJobForPod.customerName} (Order ${activeJobForPod.orderNumber})`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <p className="font-bold text-slate-900">Destination Address:</p>
              <p className="text-slate-600">{activeJobForPod.address}</p>
            </div>

            <SignaturePad
              label="Recipient Signature"
              onSave={handleCapturePod}
            />
          </div>
        </Modal>
      )}
    </AppShell>
  );
}
