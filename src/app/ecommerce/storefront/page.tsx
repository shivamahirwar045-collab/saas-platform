'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSaaS } from '@/context/SaaSContext';
import { Product } from '@/types/saas';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Drawer } from '@/components/ui/Drawer';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import {
  ShoppingCart,
  Search,
  Package,
  Plus,
  Trash2,
  CheckCircle,
  CreditCard,
  Receipt,
  Star,
  ChevronLeft,
  ArrowRight,
  Shield,
  Truck
} from '@/components/icons';

export default function StorefrontPreviewPage() {
  const { products, currentBusiness, addOrder } = useSaaS();
  const { success } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  // Cart State
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([
    { product: products[0], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Product Detail Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Checkout Modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [lastOrderNum, setLastOrderNum] = useState('');

  // Checkout form
  const [custName, setCustName] = useState('Mariana Vasquez');
  const [custEmail, setCustEmail] = useState('mariana.v@gmail.com');
  const [custPhone, setCustPhone] = useState('+507 6234-9988');
  const [custAddress, setCustAddress] = useState('PH Grand Tower, Apt 18B, Punta Pacifica, Panama City');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'yappy' | 'cash'>('yappy');

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTax = cartSubtotal * 0.07; // 7% ITBMS
  const cartTotal = cartSubtotal + cartTax;

  const addToCart = (product: Product) => {
    const existing = cart.find((c) => c.product.id === product.id);
    if (existing) {
      setCart(cart.map((c) => (c.product.id === product.id ? { ...c, quantity: c.quantity + 1 } : c)));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    success('Added to Cart', `${product.name} is now in your shopping bag.`);
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart(
      cart
        .map((c) => {
          if (c.product.id === productId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as any
    );
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNum = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setLastOrderNum(orderNum);

    const newOrder = {
      customerId: 'cust_web_guest',
      customerName: custName,
      customerEmail: custEmail,
      status: 'Received' as const,
      paymentStatus: 'Paid' as const,
      paymentMethod,
      fiscalStatus: 'Authorized' as const,
      channel: 'Website' as const,
      branchName: 'Online Web Store',
      items: cart.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        sku: c.product.sku,
        quantity: c.quantity,
        price: c.product.price,
        unitPrice: c.product.price,
        total: c.product.price * c.quantity
      })),
      subtotal: cartSubtotal,
      tax: cartTax,
      discount: 0,
      total: cartTotal
    };

    addOrder(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Top Bar for Admin Return */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-2 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white">Live Storefront Customer Mode</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Connected to {currentBusiness.name}</span>
        </div>
        <Link
          href="/ecommerce"
          className="text-blue-400 hover:text-white font-semibold flex items-center gap-1 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Exit to Admin Dashboard</span>
        </Link>
      </div>

      {/* Storefront Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-lg font-bold shadow-md shadow-blue-500/20">
              {currentBusiness.logo || '🛍️'}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                {currentBusiness.name}
              </h2>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Official Online Store</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, brands and electronics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Cart Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-bold font-mono">${cartTotal.toFixed(2)}</span>
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300"
          />
        </div>
      </header>

      {/* Hero Storefront Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full">
              Panama Nationwide Express Delivery
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Enterprise Tech & High-Performance Lifestyle
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Official manufacturer warranties on all ultrabooks, studio audio, and smart devices.
              Every purchase includes a DGI-authorized Panama electronic fiscal receipt.
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-400" />
              <span>Same-Day Metro Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span>100% PAC Fiscal Factura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full space-y-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCat === cat
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const isOutOfStock = p.stock <= 0;
            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                {/* Image Placeholder */}
                <div
                  onClick={() => setSelectedProduct(p)}
                  className="h-48 bg-slate-100 p-6 flex items-center justify-center relative cursor-pointer group-hover:bg-blue-50/40 transition-colors"
                >
                  <Package className="w-16 h-16 text-slate-400 group-hover:text-blue-600 group-hover:scale-105 transition-all" />
                  <span className="absolute top-3 left-3 text-[10px] font-semibold bg-white/90 backdrop-blur-xs text-slate-700 px-2 py-0.5 rounded shadow-2xs">
                    {p.category}
                  </span>
                  {p.stock <= p.minStockAlert && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded shadow-2xs">
                      Only {p.stock} left!
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="text-slate-700 font-bold text-xs">{p.rating || 5.0}</span>
                      <span className="text-slate-400 text-[10px]">({p.reviewsCount || 12} reviews)</span>
                    </div>

                    <h3
                      onClick={() => setSelectedProduct(p)}
                      className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {p.name}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400 mt-1">SKU: {p.sku}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-black text-slate-900 font-mono">
                        ${p.price.toFixed(2)}
                      </p>
                      {p.compareAtPrice && (
                        <p className="text-xs text-slate-400 line-through font-mono">
                          ${p.compareAtPrice.toFixed(2)}
                        </p>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant="primary"
                      disabled={isOutOfStock}
                      leftIcon={<Plus className="w-3.5 h-3.5" />}
                      onClick={() => addToCart(p)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Cart Drawer */}
      <Drawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        title="Your Shopping Cart"
        description={`${cart.reduce((s, c) => s + c.quantity, 0)} items in bag`}
        footer={
          <div className="w-full space-y-3">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Panama 7% ITBMS:</span>
                <span>${cartTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-base pt-2 border-t border-slate-200">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full py-3.5"
              disabled={cart.length === 0}
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
            >
              Proceed to Checkout (${cartTotal.toFixed(2)}) →
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          {cart.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              Your shopping bag is currently empty.
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900">{item.product.name}</h4>
                  <p className="text-slate-500 font-mono text-[11px] mt-0.5">
                    ${item.product.price.toFixed(2)} each
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                    <button
                      onClick={() => updateCartQty(item.product.id, -1)}
                      className="px-2 py-1 text-slate-600 hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="px-2 font-mono font-bold text-slate-900">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQty(item.product.id, 1)}
                      className="px-2 py-1 text-slate-600 hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold font-mono text-slate-900 w-16 text-right">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </Drawer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Modal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          title={selectedProduct.name}
          description={`SKU: ${selectedProduct.sku}`}
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-xl font-bold font-mono text-slate-900">
                ${selectedProduct.price.toFixed(2)}
              </span>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                Add to Cart
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="h-56 bg-slate-100 rounded-xl flex items-center justify-center">
              <Package className="w-20 h-20 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Product Specifications</h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Flagship enterprise equipment with official distributor warranty and fast nationwide dispatch.
                Compliant with Panama DGI fiscal standards.
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Checkout Modal */}
      <Modal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title="Checkout & Delivery Dispatch"
        description="Provide your delivery destination and select tender method."
        maxWidth="xl"
      >
        <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={custEmail}
                onChange={(e) => setCustEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">WhatsApp Contact Phone</label>
            <input
              type="text"
              required
              value={custPhone}
              onChange={(e) => setCustPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Panama Delivery Address</label>
            <textarea
              rows={2}
              required
              value={custAddress}
              onChange={(e) => setCustAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'yappy', label: 'Yappy Panama', icon: '📱' },
                { id: 'card', label: 'Credit Card', icon: '💳' },
                { id: 'cash', label: 'Cash on Delivery', icon: '💵' }
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
                  <span className="text-base block mb-0.5">{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 font-mono">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Panama 7% ITBMS:</span>
              <span>${cartTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t border-slate-200">
              <span>Total to Pay:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full py-3">
            Confirm & Pay Order (${cartTotal.toFixed(2)}) →
          </Button>
        </form>
      </Modal>

      {/* Order Confirmation Screen */}
      <Modal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Order Confirmed!"
        description="Your order was accepted and is being prepared for dispatch."
        maxWidth="md"
        footer={
          <Button variant="primary" size="sm" onClick={() => setIsSuccessOpen(false)} className="w-full">
            Back to Storefront
          </Button>
        }
      >
        <div className="text-center py-4 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase font-mono text-slate-400 font-bold">Order Tracking Number</span>
            <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{lastOrderNum}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Customer:</span>
              <span className="font-semibold text-slate-900">{custName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Panama PAC CUFE:</span>
              <span className="font-mono text-emerald-600 font-semibold">Generated (DGI Valid)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Fulfillment:</span>
              <span className="font-semibold text-blue-600">Dispatched to Driver Route</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
