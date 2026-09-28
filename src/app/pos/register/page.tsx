'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSaaS } from '@/context/SaaSContext';
import { Product, POSCartItem } from '@/types/saas';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import {
  Monitor,
  Search,
  ShoppingCart,
  Plus,
  Trash2,
  Receipt,
  CreditCard,
  Check,
  X,
  Barcode,
  Clock,
  Printer,
  ChevronLeft,
  QrCode,
  Sparkles
} from '@/components/icons';

export default function PosRegisterFullscreen() {
  const {
    products,
    posCart,
    addToPosCart,
    updatePosCartQuantity,
    removePosCartItem,
    clearPosCart,
    posDiscountPercent,
    setPosDiscountPercent,
    currentBusiness,
    currentBranch,
    currentRegister,
    currentUser,
    addOrder,
    generateFiscalInvoice
  } = useSaaS();

  const { success, info } = useToast();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customer, setCustomer] = useState('Consumidor Final (Walk-in)');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Card' | 'Yappy'>('Card');
  const [tenderedAmount, setTenderedAmount] = useState<number>(0);
  const [completedSale, setCompletedSale] = useState<any | null>(null);

  // Sound feedback simulation using Web Audio API synthesized beep
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // Audio fallback
    }
  };

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      (p.barcode && p.barcode.includes(search));
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Calculations
  const subtotal = posCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * posDiscountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const tax7Percent = taxableAmount * 0.07;
  const grandTotal = taxableAmount + tax7Percent;
  const changeDue = Math.max(0, tenderedAmount - grandTotal);

  const handleBarcodeSimulation = () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    if (randomProduct) {
      playBeep();
      addToPosCart(randomProduct);
      success('Barcode Scanned', `Added ${randomProduct.name} (${randomProduct.barcode || '745001928'})`);
    }
  };

  const handleCompleteSale = () => {
    playBeep();
    const orderNum = `POS-${Math.floor(1000 + Math.random() * 9000)}`;

    const saleRecord = {
      orderNumber: orderNum,
      cashier: currentUser.name,
      branch: currentBranch.name,
      register: currentRegister.name,
      items: [...posCart],
      subtotal,
      discount: discountAmount,
      tax: tax7Percent,
      total: grandTotal,
      tenderMethod: paymentMethod,
      tenderedAmount: paymentMethod === 'Cash' ? tenderedAmount : grandTotal,
      changeDue: paymentMethod === 'Cash' ? changeDue : 0,
      timestamp: new Date().toLocaleTimeString(),
      cufe: 'CUFE-' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    };

    generateFiscalInvoice({
      invoiceNumber: orderNum,
      customerName: customer,
      customerRUC: '155789012-2-2021',
      customerDV: '44',
      subtotal,
      tax: tax7Percent,
      total: grandTotal,
      status: 'Issued',
      pacStatus: 'Authorized',
      branchId: currentBranch.id
    });

    setCompletedSale(saleRecord);
    setIsPaymentOpen(false);
    clearPosCart();
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-900 text-slate-100 flex flex-col font-sans select-none">
      {/* Cashier Top Navigation Bar */}
      <header className="h-14 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/pos"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Exit Fullscreen</span>
          </Link>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-white tracking-tight flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              {currentRegister.name}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">{currentBranch.name.split(' (')[0]}</span>
            <span className="text-slate-600">|</span>
            <span className="text-blue-400 font-mono">Cashier: {currentUser.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 text-xs py-1"
            leftIcon={<Barcode className="w-3.5 h-3.5 text-blue-400" />}
            onClick={handleBarcodeSimulation}
          >
            Scan Barcode (Beep)
          </Button>
          <Link
            href="/pos/sessions"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            Cash Drawer Shifts
          </Link>
        </div>
      </header>

      {/* Main Terminal Split (Products on Left, Cart/Keypad on Right) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Product Grid & Category Tabs */}
        <div className="flex-1 flex flex-col p-4 overflow-hidden border-r border-slate-800 space-y-3">
          {/* Search & Categories */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search products or scan barcode (EAN-13)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards */}
          <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pr-1">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  playBeep();
                  addToPosCart(p);
                }}
                className="p-3.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/50 rounded-2xl transition-all cursor-pointer flex flex-col justify-between active:scale-[0.98] group"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-semibold text-slate-400">
                      {p.sku}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${
                        p.stock <= p.minStockAlert ? 'bg-rose-950 text-rose-400' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {p.stock} in stock
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-xs mt-1.5 leading-snug group-hover:text-blue-300 line-clamp-2">
                    {p.name}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="font-bold font-mono text-emerald-400 text-sm">
                    ${p.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] bg-blue-600 text-white font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    +
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Cash Register Cart & Instant Tender Keypad */}
        <div className="w-96 bg-slate-950 flex flex-col justify-between shrink-0 p-4 space-y-4">
          {/* Customer / Bill Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Current Ticket ({posCart.length})
              </span>
              <button
                onClick={clearPosCart}
                disabled={posCart.length === 0}
                className="text-xs text-rose-400 hover:text-rose-300 disabled:opacity-30"
              >
                Clear Cart
              </button>
            </div>

            <select
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-1.5"
            >
              <option value="Consumidor Final (Walk-in)">Consumidor Final (Walk-in)</option>
              <option value="Mariana Vasquez (VIP Gold)">Mariana Vasquez (VIP Gold)</option>
              <option value="Banco Continental Panama (RUC Factura)">Banco Continental Panama (RUC Factura)</option>
            </select>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {posCart.length === 0 ? (
              <div className="py-20 text-center text-slate-600 text-xs">
                Scan barcode or tap items on left to register sale.
              </div>
            ) : (
              posCart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-white truncate">{item.product.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      ${item.product.price.toFixed(2)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-950">
                      <button
                        onClick={() => updatePosCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-slate-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updatePosCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-slate-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold font-mono text-emerald-400 w-14 text-right">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Financial Totals & Discounts */}
          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
            {/* Quick Discount buttons */}
            <div className="flex items-center gap-1.5 font-sans">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Discount:</span>
              {[0, 5, 10, 15].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setPosDiscountPercent(pct)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                    posDiscountPercent === pct
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>

            <div className="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {posDiscountPercent > 0 && (
              <div className="flex justify-between text-rose-400">
                <span>Discount ({posDiscountPercent}%):</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Panama 7% ITBMS:</span>
              <span>${tax7Percent.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-white">
              <span className="font-bold text-sm font-sans">GRAND TOTAL:</span>
              <span className="text-2xl font-black text-emerald-400">
                ${grandTotal.toFixed(2)}
              </span>
            </div>

            {/* Pay Button */}
            <Button
              variant="success"
              size="lg"
              disabled={posCart.length === 0}
              className="w-full py-4 text-base font-bold shadow-lg shadow-emerald-600/30"
              onClick={() => {
                setTenderedAmount(grandTotal);
                setIsPaymentOpen(true);
              }}
            >
              CHARGE ${grandTotal.toFixed(2)} [F12]
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Tender Modal */}
      <Modal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        title="Complete Checkout & Tender Split"
        description="Select tender method and issue Panama electronic PAC factura."
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'Card', label: 'Credit Card', icon: '💳' },
              { id: 'Yappy', label: 'Yappy Panama', icon: '📱' },
              { id: 'Cash', label: 'Cash Tender', icon: '💵' }
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPaymentMethod(m.id as any)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === m.id
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <span className="text-lg block mb-0.5">{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {paymentMethod === 'Cash' && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cash Tendered ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={tenderedAmount}
                  onChange={(e) => setTenderedAmount(parseFloat(e.target.value) || 0)}
                  className="w-full text-xl font-bold font-mono px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-600">Change Due to Customer:</span>
                <span className="text-emerald-600 font-mono text-lg">${changeDue.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 space-y-1 font-mono">
            <div className="flex justify-between">
              <span>Customer:</span>
              <span className="font-semibold text-slate-900">{customer}</span>
            </div>
            <div className="flex justify-between">
              <span>Fiscal Compliance:</span>
              <span className="text-emerald-600 font-bold">Panama PAC Direct Handshake</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full py-3.5 text-sm"
            onClick={handleCompleteSale}
          >
            Authorize Payment & Print Fiscal Factura →
          </Button>
        </div>
      </Modal>

      {/* 80mm CUFE Fiscal Thermal Receipt Modal */}
      {completedSale && (
        <Modal
          isOpen={!!completedSale}
          onClose={() => setCompletedSale(null)}
          title="Factura Electrónica Emitida (PAC)"
          description="DGI authorized receipt generated and transmitted."
          maxWidth="sm"
          footer={
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  info('Thermal Print Dispatched', 'Sent 80mm ESC/POS command to Star Micronics printer.');
                }}
              >
                Print 80mm Receipt
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={() => setCompletedSale(null)}
              >
                Next Customer [Enter]
              </Button>
            </div>
          }
        >
          {/* Simulated 80mm Thermal Paper Receipt */}
          <div className="p-4 bg-white border border-slate-300 rounded-xl font-mono text-[11px] text-slate-900 shadow-inner space-y-2">
            <div className="text-center space-y-0.5 border-b border-dashed border-slate-400 pb-2">
              <p className="font-bold text-sm uppercase">{currentBusiness.name}</p>
              <p className="text-[10px] text-slate-500">R.U.C. 155789012-2-2021 D.V. 44</p>
              <p className="text-[10px] text-slate-500">Ave. Balboa, Panama City</p>
              <p className="text-[10px] font-bold text-blue-700 mt-1">FACTURA ELECTRÓNICA DE PANAMA</p>
            </div>

            <div className="space-y-0.5 text-[10px] text-slate-600">
              <div className="flex justify-between">
                <span>Factura #:</span>
                <span className="font-bold text-slate-900">{completedSale.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Fecha / Hora:</span>
                <span>{new Date().toLocaleDateString()} {completedSale.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span>Caja / Terminal:</span>
                <span>{completedSale.register}</span>
              </div>
              <div className="flex justify-between">
                <span>Cajero:</span>
                <span>{completedSale.cashier}</span>
              </div>
            </div>

            {/* Line items */}
            <div className="border-t border-b border-dashed border-slate-300 py-2 space-y-1">
              {completedSale.items.map((it: any, idx: number) => (
                <div key={idx} className="flex justify-between">
                  <span className="truncate pr-2">{it.quantity}x {it.product.name}</span>
                  <span className="shrink-0 font-bold">${(it.product.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Tax totals */}
            <div className="space-y-0.5 pt-1">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>${completedSale.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ITBMS 7%:</span>
                <span>${completedSale.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xs pt-1 border-t border-slate-200">
                <span>TOTAL:</span>
                <span className="text-emerald-700">${completedSale.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 pt-0.5">
                <span>Forma de Pago:</span>
                <span>{completedSale.tenderMethod}</span>
              </div>
            </div>

            {/* CUFE & DGI QR Stamp */}
            <div className="pt-2 text-center border-t border-dashed border-slate-400 space-y-1">
              <p className="text-[9px] text-slate-500 leading-tight break-all font-mono">
                CUFE: {completedSale.cufe}
              </p>
              <div className="w-16 h-16 bg-slate-100 border border-slate-300 mx-auto rounded flex items-center justify-center font-bold text-xs">
                QR-DGI
              </div>
              <p className="text-[9px] text-slate-400">Autorizado por PAC The Factory HKA</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
