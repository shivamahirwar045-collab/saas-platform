'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Order } from '@/types/saas';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Drawer } from '@/components/ui/Drawer';
import { useToast } from '@/components/ui/Toast';
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Truck,
  Receipt,
  CheckCircle,
  Download,
  Printer,
  ChevronRight
} from '@/components/icons';

export default function EcommerceOrdersPage() {
  const { orders, updateOrderStatus } = useSaaS();
  const { success, info } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statuses = ['All', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Refunded'];

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (orderId: string, newStatus: any) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    success('Order Status Updated', `Order marked as "${newStatus}".`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Orders & Dispatch</h1>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                {orders.length} Total Orders
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fulfillment pipeline covering online sales, POS store pickups, and home delivery dispatches.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Printer className="w-3.5 h-3.5" />}
              onClick={() => info('Bulk Printing', 'Generating thermal packaging slips for pending dispatch...')}
            >
              Print Packing Slips
            </Button>
          </div>
        </div>

        {/* Sub-nav Links */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
          <Link href="/ecommerce" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Overview
          </Link>
          <Link href="/ecommerce/products" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Products
          </Link>
          <Link href="/ecommerce/orders" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            Orders
          </Link>
          <Link href="/ecommerce/categories" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Categories
          </Link>
          <Link href="/ecommerce/storefront" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            Live Storefront
          </Link>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by order # (e.g. ORD-9842) or client name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Order ID & Date</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Channel</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Fulfillment Status</th>
                  <th className="py-3.5 px-4">Payment Tender</th>
                  <th className="py-3.5 px-4 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredOrders.map((order) => {
                  const getBadgeVariant = (st: string) => {
                    switch (st) {
                      case 'Paid':
                      case 'Delivered':
                        return 'success';
                      case 'Shipped':
                      case 'Processing':
                        return 'info';
                      case 'Refunded':
                        return 'danger';
                      default:
                        return 'default';
                    }
                  };

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 font-mono text-sm block">
                          {order.orderNumber}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-900 block">{order.customerName}</span>
                        <span className="text-[11px] text-slate-400">{order.customerEmail}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {order.channel}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 font-mono text-sm">
                          ${order.total.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          ITBMS: ${(order.tax || 0).toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={getBadgeVariant(order.status) as any}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-700 capitalize flex items-center gap-1">
                          <Receipt className="w-3.5 h-3.5 text-slate-400" />
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Drawer */}
      {selectedOrder && (
        <Drawer
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={`Order: ${selectedOrder.orderNumber}`}
          description={`Placed on ${new Date(selectedOrder.createdAt).toLocaleString()}`}
          width="xl"
          footer={
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedOrder(null)}
                className="flex-1"
              >
                Close
              </Button>
              {selectedOrder.status !== 'Shipped' && selectedOrder.status !== 'Delivered' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'Shipped')}
                  className="flex-1"
                >
                  Mark as Shipped
                </Button>
              )}
            </div>
          }
        >
          <div className="space-y-6 text-xs">
            {/* Status overview banner */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-[11px]">Current Status:</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">{selectedOrder.status}</p>
              </div>
              <Badge variant="info">{selectedOrder.channel} Order</Badge>
            </div>

            {/* Quick Status actions */}
            <div>
              <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-2">
                Update Fulfillment Pipeline
              </p>
              <div className="grid grid-cols-3 gap-2">
                {['Processing', 'Shipped', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedOrder.id, st)}
                    className={`py-1.5 px-2 rounded-lg border text-center font-semibold transition-all ${
                      selectedOrder.status === st
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-2">
              <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Customer Dossier
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">{selectedOrder.customerName}</p>
                <p className="text-slate-500">{selectedOrder.customerEmail}</p>
                <p className="text-slate-500 font-mono text-[11px]">+507 6842-1920 (WhatsApp verified)</p>
                <p className="text-slate-700 text-[11px] pt-1">
                  Delivery Destination: Ave. Balboa, PH Yoo Tower, Panama City
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-2">
              <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Line Items ({selectedOrder.items?.length || 0})
              </p>
              <div className="space-y-2">
                {selectedOrder.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{item.productName}</p>
                      <p className="text-slate-400 font-mono text-[11px]">Qty: {item.quantity} × ${(item.unitPrice ?? item.price ?? 0).toFixed(2)}</p>
                    </div>
                    <span className="font-bold font-mono text-slate-900">
                      ${item.total.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>${selectedOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Panama 7% ITBMS:</span>
                <span>${(selectedOrder.tax || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t border-slate-200">
                <span>Grand Total Paid:</span>
                <span>${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Drawer>
      )}
    </AppShell>
  );
}
