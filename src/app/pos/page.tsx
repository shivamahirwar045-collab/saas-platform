'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useSaaS } from '@/context/SaaSContext';
import { Product, POSCartItem, CashSession } from '@/types/saas';
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
  RefreshCw,
  QrCode
} from '@/components/icons';

export default function POSPage() {
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
    setCurrentRegister,
    registers,
    currentUser,
    addOrder,
    generateFiscalInvoice
  } = useSaaS();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCustomer, setSelectedCustomer] = useState('Consumidor Final (Walk-in)');

  // Modals
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Card' | 'Yappy'>('Card');
  const [tenderedAmount, setTenderedAmount] = useState<number>(0);
  const [completedSale, setCompletedSale] = useState<any | null>(null);

  // Cash Session State
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [sessionData, setSessionData] = useState<CashSession>({
    id: 'cs_01',
    registerId: currentRegister.id,
    registerName: currentRegister.name,
    cashierName: currentUser.name,
    openedAt: '2026-09-28 08:30',
    openingBalance: 250.00,
    expectedCash: 840.50,
    cashSales: 590.50,
    cardSales: 1820.00,
    otherSales: 450.00,
    transactionsCount: 28,
    status: 'open'
  });

  // Categories
  const categories = ['All', 'Laptops & Computers', 'Audio & Accessories', 'Wearables & Health', 'Office Furniture', 'POS Hardware'];

  const filteredProducts = products.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search) || p.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Cart Calculations
  const rawSubtotal = posCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (rawSubtotal * posDiscountPercent) / 100;
  const subtotal = rawSubtotal - discountAmount;
  const tax = subtotal * 0.07; // 7% ITBMS Panama
  const total = subtotal + tax;

  const handleSimulateBarcodeScan = () => {
    // Pick first product and add to cart
    if (products.length > 0) {
      const randomProd = products[Math.floor(Math.random() * products.length)];
      addToPosCart(randomProd, 1);
    }
  };

  const handleProcessPayment = () => {
    const newOrd = addOrder({
      customerId: 'cust_pos',
      customerName: selectedCustomer,
      customerEmail: 'pos.terminal@acmeretail.com',
      channel: 'POS',
      branchName: currentBranch.name,
      items: posCart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        sku: item.product.sku,
        quantity: item.quantity,
        price: item.product.price,
        total: item.product.price * item.quantity
      })),
      subtotal,
      tax,
      discount: discountAmount,
      total,
      status: 'Delivered',
      paymentStatus: 'Paid',
      fiscalStatus: 'Authorized'
    });

    const fiscInv = generateFiscalInvoice(newOrd.id);

    setCompletedSale({
      order: newOrd,
      fiscal: fiscInv,
      method: paymentMethod,
      change: paymentMethod === 'Cash' ? Math.max(0, tenderedAmount - total) : 0
    });

    setIsPaymentOpen(false);
    clearPosCart();
  };

  return (
    <AppShell>
      <div className="space-y-4">
        {/* Top Control Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 leading-tight">
                  Point of Sale Terminal
                </h1>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                  Shift Active
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {currentBranch.name} • {currentRegister.name} • Cashier: {currentUser.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Register Selector */}
            <select
              value={currentRegister.id}
              onChange={(e) => {
                const reg = registers.find(r => r.id === e.target.value);
                if (reg) setCurrentRegister(reg);
              }}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 outline-none text-slate-700"
            >
              {registers.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>

            {/* Simulated Barcode Trigger */}
            <button
              onClick={handleSimulateBarcodeScan}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
              title="Simulate hardware handheld barcode trigger"
            >
              <Barcode className="w-4 h-4 text-slate-600" />
              <span>Simulate Scan</span>
            </button>

            {/* Session Management */}
            <button
              onClick={() => setIsSessionModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-blue-300" />
              <span>Register Shift ($840.50)</span>
            </button>
          </div>
        </div>

        {/* POS Grid & Cart Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left: Product Selector (7 cols on lg) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            {/* Search & Categories */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Scan barcode or type product name, SKU..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>

              {/* Category Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[600px] overflow-y-auto pr-1">
              {filteredProducts.map(prod => (
                <div
                  key={prod.id}
                  onClick={() => addToPosCart(prod, 1)}
                  className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-blue-400 cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-28 object-cover rounded-xl border border-slate-100 mb-2"
                    />
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600">
                      {prod.name}
                    </h4>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">
                      ${prod.price.toFixed(2)}
                    </span>
                    <span className={`text-[10px] font-semibold ${prod.stock <= prod.minStockAlert ? 'text-rose-600' : 'text-slate-400'}`}>
                      {prod.stock} in stock
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Cart & Tender Register (5 cols on lg) */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 flex flex-col justify-between min-h-[580px]">
            <div className="space-y-4">
              {/* Cart Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">Current Sale Cart</h3>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full">
                    {posCart.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                </div>
                {posCart.length > 0 && (
                  <button
                    onClick={clearPosCart}
                    className="text-xs text-rose-500 hover:text-rose-700 font-medium"
                  >
                    Clear Cart
                  </button>
                )}
              </div>

              {/* Customer Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Customer / Fiscal RUC</label>
                <select
                  value={selectedCustomer}
                  onChange={e => setSelectedCustomer(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium text-slate-800 outline-none"
                >
                  <option value="Consumidor Final (Walk-in)">Consumidor Final (Walk-in General)</option>
                  <option value="Roberto Castillero (RUC: 155421098-1-2019)">Roberto Castillero (VIP B2B)</option>
                  <option value="Constructora del Istmo (RUC: 879102431-1-2014)">Constructora del Istmo S.A.</option>
                  <option value="Mariana De La Guardia (RUC: 239841209-2-2020)">Mariana De La Guardia</option>
                </select>
              </div>

              {/* Cart Items List */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {posCart.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    <p className="font-medium text-slate-600">Cart is empty</p>
                    <p className="text-[11px] mt-0.5">Click products or simulate scan to add items</p>
                  </div>
                ) : (
                  posCart.map(item => (
                    <div
                      key={item.product.id}
                      className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-100 flex items-center justify-between text-xs"
                    >
                      <div className="truncate mr-2 flex-1">
                        <p className="font-bold text-slate-800 truncate">{item.product.name}</p>
                        <p className="text-[10px] text-slate-400">${item.product.price.toFixed(2)} each</p>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => updatePosCartQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 hover:bg-slate-100 font-bold text-slate-700 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => updatePosCartQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 hover:bg-slate-100 font-bold text-slate-700 flex items-center justify-center"
                        >
                          +
                        </button>
                        <span className="font-bold text-slate-900 ml-2 w-16 text-right">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removePosCartItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bottom Calculations & Charge Button */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              {/* Discount selector */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Discount:</span>
                <div className="flex gap-1">
                  {[0, 5, 10, 15].map(pct => (
                    <button
                      key={pct}
                      onClick={() => setPosDiscountPercent(pct)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        posDiscountPercent === pct
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({posDiscountPercent}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Panama ITBMS (7%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-1.5 border-t border-slate-100">
                  <span>Total Amount:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Complete Sale Action */}
              <button
                disabled={posCart.length === 0}
                onClick={() => {
                  setTenderedAmount(total);
                  setIsPaymentOpen(true);
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Charge ${total.toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>

        {/* MODAL: PAYMENT TENDER */}
        {isPaymentOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Process Sale Payment</h3>
                <button onClick={() => setIsPaymentOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center py-2">
                <span className="text-xs uppercase text-slate-400 font-bold">Total Due</span>
                <p className="text-3xl font-extrabold text-slate-900 mt-0.5">${total.toFixed(2)}</p>
                <p className="text-xs text-slate-500 mt-1">Customer: {selectedCustomer.split(' (')[0]}</p>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['Card', 'Cash', 'Yappy'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    className={`p-3 rounded-xl border text-center font-bold transition-all ${
                      paymentMethod === m
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {m === 'Card' ? '💳 Card' : m === 'Cash' ? '💵 Cash' : '📱 Yappy'}
                  </button>
                ))}
              </div>

              {paymentMethod === 'Cash' && (
                <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 text-xs">
                  <label className="block font-bold text-slate-700">Cash Tendered ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={tenderedAmount}
                    onChange={e => setTenderedAmount(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-base font-bold text-slate-900"
                  />
                  <div className="flex justify-between font-bold text-slate-800 pt-1">
                    <span>Change to Return:</span>
                    <span className="text-emerald-600">${Math.max(0, tenderedAmount - total).toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-[11px] space-y-0.5">
                <p className="font-bold">Panama PAC Fiscal Invoice Linkage:</p>
                <p>An electronic invoice with CUFE &amp; QR verification will be issued immediately via The Factory HKA PAC.</p>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setIsPaymentOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProcessPayment}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Confirm &amp; Print Receipt
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: COMPLETED RECEIPT PREVIEW */}
        {completedSale && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-sm p-6 space-y-4">
              <div className="text-center pb-2 border-b border-dashed border-slate-300">
                <span className="text-2xl">{currentBusiness.logo}</span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{currentBusiness.name}</h3>
                <p className="text-[11px] text-slate-500 font-mono">RUC: {currentBusiness.taxId} DV: {currentBusiness.dv}</p>
                <p className="text-[10px] text-slate-400">{currentBranch.name}</p>
              </div>

              {/* Receipt Body */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Order: {completedSale.order.orderNumber}</span>
                  <span>{completedSale.order.createdAt}</span>
                </div>

                <div className="border-t border-b border-dashed border-slate-200 py-2 space-y-1">
                  {completedSale.order.items.map((it: any, i: number) => (
                    <div key={i} className="flex justify-between">
                      <span className="truncate max-w-[180px]">{it.quantity}x {it.productName}</span>
                      <span>${it.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-0.5 pt-1 text-slate-700">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${completedSale.order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ITBMS 7%:</span>
                    <span>${completedSale.order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-slate-900 pt-1 border-t border-slate-200">
                    <span>TOTAL:</span>
                    <span>${completedSale.order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                    <span>Paid via: {completedSale.method}</span>
                    {completedSale.change > 0 && <span>Change: ${completedSale.change.toFixed(2)}</span>}
                  </div>
                </div>

                {/* Fiscal Verification Badge */}
                <div className="p-2.5 bg-slate-50 rounded-lg text-center space-y-1 pt-2">
                  <p className="text-[10px] font-bold text-slate-700">FACTURA ELECTRÓNICA DE PANAMÁ</p>
                  <p className="text-[9px] text-slate-400 break-all">{completedSale.fiscal.cufe}</p>
                  <div className="flex justify-center pt-1">
                    <QrCode className="w-12 h-12 text-slate-800" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => alert('Receipt sent to 80mm thermal printer spooler.')}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print 80mm
                </button>
                <button
                  onClick={() => setCompletedSale(null)}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                >
                  Done / Next Sale
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: REGISTER SESSION RECONCILIATION */}
        {isSessionModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Cash Register Shift Reconciliation</h3>
                <button onClick={() => setIsSessionModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Shift Opened:</span>
                    <span className="font-semibold text-slate-900">{sessionData.openedAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cashier:</span>
                    <span className="font-semibold text-slate-900">{sessionData.cashierName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Starting Float:</span>
                    <span className="font-semibold text-slate-900">${sessionData.openingBalance.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-1.5 text-blue-900">
                  <div className="flex justify-between">
                    <span>Total Cash Collected:</span>
                    <span className="font-bold">${sessionData.cashSales.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Card Sales Settled:</span>
                    <span className="font-bold">${sessionData.cardSales.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yappy / Mobile Settled:</span>
                    <span className="font-bold">${sessionData.otherSales.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-blue-200 font-extrabold text-sm">
                    <span>Expected Drawer Cash:</span>
                    <span>${sessionData.expectedCash.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <button
                  onClick={() => alert('X-Report snapshot printed.')}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Print X-Report
                </button>
                <button
                  onClick={() => {
                    alert('Register shift reconciled and closed. Z-Report printed.');
                    setIsSessionModalOpen(false);
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  Close Register Shift (Z-Report)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
