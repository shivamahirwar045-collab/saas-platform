'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { DeliveryJob } from '@/types/saas';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  Phone,
  Check,
  X,
  FileText,
  Search,
  Eye
} from '@/components/icons';
import { mockDeliveryJobs } from '@/data/mockData';

export default function DeliveryPage() {
  const [deliveryJobs, setDeliveryJobs] = useState<DeliveryJob[]>(mockDeliveryJobs);
  const [selectedJob, setSelectedJob] = useState<DeliveryJob | null>(null);

  const updateDeliveryStatus = (id: string, status: DeliveryJob['status']) => {
    setDeliveryJobs(prev =>
      prev.map(j =>
        j.id === id
          ? {
              ...j,
              status,
              proofSignature: status === 'Delivered' ? true : j.proofSignature,
              proofPhoto: status === 'Delivered' ? true : j.proofPhoto
            }
          : j
      )
    );
  };

  const deliveryColumns: Column<DeliveryJob>[] = [
    {
      header: 'Order Ref',
      cell: (j) => (
        <div>
          <span className="font-bold text-slate-900">{j.orderNumber}</span>
          <p className="text-[10px] text-slate-400 font-mono">Vehicle: {j.vehicle}</p>
        </div>
      )
    },
    {
      header: 'Customer',
      cell: (j) => (
        <div>
          <p className="font-semibold text-slate-800">{j.customerName}</p>
          <p className="text-[11px] text-slate-500 truncate max-w-[180px]">{j.address}</p>
        </div>
      )
    },
    {
      header: 'Assigned Driver',
      cell: (j) => (
        <div>
          <p className="font-semibold text-slate-800">{j.driverName}</p>
          <p className="text-[10px] text-slate-400">{j.driverPhone}</p>
        </div>
      )
    },
    {
      header: 'ETA / Arrival',
      accessorKey: 'eta'
    },
    {
      header: 'Delivery Status',
      cell: (j) => (
        <Badge
          variant={
            j.status === 'Delivered'
              ? 'success'
              : j.status === 'Out for Delivery'
              ? 'info'
              : j.status === 'Prepared'
              ? 'purple'
              : 'warning'
          }
        >
          {j.status}
        </Badge>
      )
    },
    {
      header: 'Proof of Delivery',
      cell: (j) => (
        <span
          className={`text-[11px] font-bold ${
            j.proofSignature ? 'text-emerald-600' : 'text-slate-400'
          }`}
        >
          {j.proofSignature ? '✓ Signature & Photo' : 'Pending Drop-off'}
        </span>
      )
    },
    {
      header: 'Actions',
      cell: (j) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedJob(j);
          }}
          className="text-blue-600 hover:text-blue-800 font-semibold text-xs"
        >
          Dispatch Info
        </button>
      )
    }
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Delivery Logistics &amp; Driver Dispatch
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Order workflow (Received → Prepared → Shipped → Out for Delivery → Delivered) with digital proof of delivery.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Fleet GPS Active: 2 Vehicles En Route
            </span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Dispatches"
            value={deliveryJobs.filter(j => j.status !== 'Delivered').length}
            subtitle="Today delivery queue"
            icon={<Truck className="w-5 h-5" />}
          />
          <StatCard
            title="Delivered Today"
            value="1 Completed"
            isPositive={true}
            subtitle="With photo proof &amp; signature"
            icon={<CheckCircle className="w-5 h-5" />}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Avg Delivery Time"
            value="38 Mins"
            subtitle="Within Panama City metro"
            icon={<Clock className="w-5 h-5" />}
            iconBg="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="On-Time Delivery Rate"
            value="98.4%"
            isPositive={true}
            subtitle="Against scheduled ETA"
            icon={<Check className="w-5 h-5" />}
            iconBg="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Deliveries Table */}
        <DataTable
          data={deliveryJobs}
          columns={deliveryColumns}
          searchPlaceholder="Search by order number or customer name..."
          title="Active Dispatch Board"
          subtitle="Track progress from store packaging to front door handover"
          onRowClick={(j) => setSelectedJob(j)}
        />

        {/* DRAWER: DISPATCH DETAILS & STATUS CHANGER */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex justify-end">
            <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between border-l border-slate-200 overflow-y-auto">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{selectedJob.orderNumber}</h3>
                    <p className="text-xs text-slate-400">Driver: {selectedJob.driverName}</p>
                  </div>
                  <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Destination */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Delivery Destination</span>
                  <p className="font-bold text-slate-900">{selectedJob.customerName}</p>
                  <p className="text-slate-600">{selectedJob.address}, {selectedJob.city}</p>
                  <p className="text-blue-600 font-semibold pt-1">ETA: {selectedJob.eta}</p>
                </div>

                {/* Driver & Vehicle */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Courier Dispatch</span>
                  <p className="font-bold text-slate-900">{selectedJob.driverName}</p>
                  <p className="text-slate-600">Phone: {selectedJob.driverPhone}</p>
                  <p className="text-slate-600 font-mono">Vehicle: {selectedJob.vehicle}</p>
                </div>

                {/* Delivery Notes */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-0.5">
                  <p className="font-bold">Courier Instructions:</p>
                  <p>{selectedJob.notes}</p>
                </div>

                {/* Proof of Delivery Status */}
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1.5">
                  <span className="font-bold text-emerald-900">Proof of Delivery (POD)</span>
                  <div className="flex items-center justify-between text-emerald-800">
                    <span>Digital Signature:</span>
                    <span className="font-bold">{selectedJob.proofSignature ? '✓ Recorded' : 'Pending Handover'}</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-800">
                    <span>Drop-off Photo:</span>
                    <span className="font-bold">{selectedJob.proofPhoto ? '✓ Uploaded' : 'Pending Handover'}</span>
                  </div>
                </div>

                {/* Status Progression Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Progress Delivery State</label>
                  <div className="flex flex-wrap gap-1.5">
                    {(['Received', 'Prepared', 'Shipped', 'Out for Delivery', 'Delivered'] as const).map(st => (
                      <button
                        key={st}
                        onClick={() => {
                          updateDeliveryStatus(selectedJob.id, st);
                          setSelectedJob({ ...selectedJob, status: st });
                        }}
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium border ${
                          selectedJob.status === st
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => alert(`Dialing driver: ${selectedJob.driverPhone}`)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold"
                >
                  Call Courier
                </button>
                <button
                  onClick={() => {
                    updateDeliveryStatus(selectedJob.id, 'Delivered');
                    setSelectedJob({ ...selectedJob, status: 'Delivered', proofSignature: true, proofPhoto: true });
                  }}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  Mark Delivered (POD)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
