'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BusinessAccount,
  Branch,
  CashRegister,
  User,
  ModuleStatus,
  Product,
  Order,
  Customer,
  Lead,
  LeadStage,
  POSCartItem,
  PaymentTransaction,
  PaymentLink,
  FiscalInvoice,
  NotificationItem,
  SupportTicket
} from '../types/saas';
import {
  mockBusinesses,
  mockBranches,
  mockCashRegisters,
  mockUsers,
  mockModules,
  mockProducts,
  mockOrders,
  mockCustomers,
  mockLeads,
  mockTransactions,
  mockPaymentLinks,
  mockFiscalInvoices,
  mockNotifications,
  mockSupportTickets
} from '../data/mockData';

interface SaaSContextType {
  businesses: BusinessAccount[];
  currentBusiness: BusinessAccount;
  setCurrentBusiness: (biz: BusinessAccount) => void;
  branches: Branch[];
  currentBranch: Branch;
  setCurrentBranch: (branch: Branch) => void;
  setBranch: (branch: Branch) => void;
  registers: CashRegister[];
  currentRegister: CashRegister;
  setCurrentRegister: (reg: CashRegister) => void;
  currentUser: User;
  switchUserRole: (role: User['role']) => void;
  modules: ModuleStatus[];
  toggleModule: (moduleId: string) => void;
  
  // Data entities & state
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'orderNumber'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  customers: Customer[];
  addCustomer: (cust: Omit<Customer, 'id' | 'createdAt' | 'totalSpent' | 'ordersCount'>) => void;
  
  leads: Lead[];
  updateLeadStage: (leadId: string, newStage: LeadStage) => void;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;

  paymentLinks: PaymentLink[];
  createPaymentLink: (data: { title: string; amount: number; description: string; customerName?: string }) => PaymentLink;

  fiscalInvoices: FiscalInvoice[];
  generateFiscalInvoice: (orderId: string) => FiscalInvoice;

  // POS Cart
  posCart: POSCartItem[];
  addToPosCart: (product: Product, quantity?: number) => void;
  updatePosCartQuantity: (productId: string, quantity: number) => void;
  removePosCartItem: (productId: string) => void;
  clearPosCart: () => void;
  posDiscountPercent: number;
  setPosDiscountPercent: (pct: number) => void;

  // Global Copilot & Search & Notifications
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  copilotMessages: { sender: 'user' | 'ai'; text: string; timestamp: string }[];
  sendCopilotMessage: (text: string) => void;
  
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  supportTickets: SupportTicket[];
  createSupportTicket: (ticket: { subject: string; category: SupportTicket['category']; priority: SupportTicket['priority']; description: string }) => void;
}

const SaaSContext = createContext<SaaSContextType | undefined>(undefined);

export function SaaSProvider({ children }: { children: React.ReactNode }) {
  const [businesses, setBusinesses] = useState<BusinessAccount[]>(mockBusinesses);
  const [currentBusiness, setCurrentBusiness] = useState<BusinessAccount>(mockBusinesses[0]);
  const [branches, setBranches] = useState<Branch[]>(mockBranches);
  const [currentBranch, setCurrentBranch] = useState<Branch>(mockBranches[0]);
  const [registers, setRegisters] = useState<CashRegister[]>(mockCashRegisters);
  const [currentRegister, setCurrentRegister] = useState<CashRegister>(mockCashRegisters[0]);
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [modules, setModules] = useState<ModuleStatus[]>(mockModules);

  // Entities
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>(mockPaymentLinks);
  const [fiscalInvoices, setFiscalInvoices] = useState<FiscalInvoice[]>(mockFiscalInvoices);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(mockSupportTickets);

  // POS Cart
  const [posCart, setPosCart] = useState<POSCartItem[]>([]);
  const [posDiscountPercent, setPosDiscountPercent] = useState<number>(0);

  // Copilot State
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotMessages, setCopilotMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; timestamp: string }>>([
    {
      sender: 'ai',
      text: 'Hello Alexander! I am your AI Business Copilot. Today sales are tracking 18.4% above target, but 2 high-value products are low on inventory. How can I assist you right now?',
      timestamp: 'Just now'
    }
  ]);

  // Notifications & Search
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const switchUserRole = (role: User['role']) => {
    setCurrentUser(prev => ({ ...prev, role }));
  };

  const toggleModule = (moduleId: string) => {
    setModules(prev =>
      prev.map(m => (m.id === moduleId ? { ...m, enabled: !m.enabled } : m))
    );
  };

  const addProduct = (newProd: Omit<Product, 'id' | 'createdAt'>) => {
    const prod: Product = {
      ...newProd,
      id: `prod_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [prod, ...prev]);
  };

  const updateProductStock = (productId: string, newStock: number) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, stock: newStock } : p))
    );
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'orderNumber'>) => {
    const newOrd: Order = {
      ...orderData,
      id: `ord_${Date.now()}`,
      orderNumber: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setOrders(prev => [newOrd, ...prev]);
    return newOrd;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const addCustomer = (custData: Omit<Customer, 'id' | 'createdAt' | 'totalSpent' | 'ordersCount'>) => {
    const newCust: Customer = {
      ...custData,
      id: `cust_${Date.now()}`,
      totalSpent: 0,
      ordersCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCustomers(prev => [newCust, ...prev]);
  };

  const updateLeadStage = (leadId: string, newStage: LeadStage) => {
    setLeads(prev =>
      prev.map(l => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const createPaymentLink = (data: { title: string; amount: number; description: string; customerName?: string }) => {
    const newLink: PaymentLink = {
      id: `pl_${Date.now()}`,
      code: `PL-ACME-${Math.floor(100 + Math.random() * 900)}`,
      title: data.title,
      description: data.description,
      amount: data.amount,
      customerName: data.customerName,
      status: 'active',
      views: 0,
      paymentCount: 0,
      expiresAt: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPaymentLinks(prev => [newLink, ...prev]);
    return newLink;
  };

  const generateFiscalInvoice = (orderId: string): FiscalInvoice => {
    const targetOrder = orders.find(o => o.id === orderId);
    const invoiceNumber = `FE-001-00${Math.floor(1 + Math.random() * 4)}-000${Math.floor(10000 + Math.random() * 90000)}`;
    const cufe = `CUFE-PA-000${Math.floor(100 + Math.random() * 900)}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    const newInv: FiscalInvoice = {
      id: `fisc_${Date.now()}`,
      invoiceNumber,
      orderNumber: targetOrder ? targetOrder.orderNumber : `ORD-${orderId}`,
      customerName: targetOrder ? targetOrder.customerName : 'Consumidor Final',
      customerRuc: '155789012-2-2021',
      dv: '44',
      amount: targetOrder ? targetOrder.total : 150.00,
      taxAmount: targetOrder ? targetOrder.tax : 10.50,
      pacProvider: 'The Factory HKA',
      cufe,
      authorizationCode: `DGI-PAC-AUTH-${Math.floor(1000000 + Math.random() * 9000000)}`,
      pacStatus: 'Authorized',
      qrCodeUrl: `https://dgi-fe.mef.gob.pa/consultas/fe/${cufe}`,
      issuedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    setFiscalInvoices(prev => [newInv, ...prev]);
    if (targetOrder) {
      updateOrderStatus(targetOrder.id, targetOrder.status);
      setOrders(prev => prev.map(o => o.id === targetOrder.id ? { ...o, fiscalStatus: 'Authorized', cufe } : o));
    }
    return newInv;
  };

  // POS Cart Methods
  const addToPosCart = (product: Product, quantity = 1) => {
    setPosCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, discountPercent: 0 }];
    });
  };

  const updatePosCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removePosCartItem(productId);
      return;
    }
    setPosCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removePosCartItem = (productId: string) => {
    setPosCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearPosCart = () => {
    setPosCart([]);
    setPosDiscountPercent(0);
  };

  // Copilot Chat
  const sendCopilotMessage = (text: string) => {
    const userMsg = {
      sender: 'user' as const,
      text,
      timestamp: 'Just now'
    };

    setCopilotMessages(prev => [...prev, userMsg]);

    // Simulated Smart SaaS AI Response
    setTimeout(() => {
      let reply = `I have analyzed your business records for "${text}". `;
      const lower = text.toLowerCase();

      if (lower.includes('sales') || lower.includes('revenue')) {
        reply += `Current month gross sales stand at $340,350 across all 4 branches. Website and POS are leading channel performance, with Multiplaza branch experiencing a 22% spike in wearable transactions.`;
      } else if (lower.includes('stock') || lower.includes('inventory')) {
        reply += `Stock alerts: 2 items are currently below minimum safety thresholds — OmniSmart Watch Series 5 (3 units left) and VisionPro 4K Studio Display (2 units left). A purchase order PO-2026-0341 is currently in transit from Shenzhen MicroTech.`;
      } else if (lower.includes('lead') || lower.includes('deal') || lower.includes('crm')) {
        reply += `Your active sales pipeline holds $139,500 in deal value. The highest priority is Banco Continental Panama ($65,000) currently in Negotiation with Alexander Sterling. Would you like me to draft a follow-up email?`;
      } else if (lower.includes('pac') || lower.includes('fiscal') || lower.includes('invoice')) {
        reply += `All 3 electronic invoices processed today have been successfully authorized by Panama DGI via The Factory HKA PAC adapter with 0 retry failures.`;
      } else {
        reply += `Across your All-in-One system, your team of 53 employees is operating normally, cash registers are balanced, and delivery routes are on schedule with an average ETA of 38 minutes.`;
      }

      setCopilotMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          timestamp: 'Just now'
        }
      ]);
    }, 700);
  };

  const createSupportTicket = (ticket: {
    subject: string;
    category: SupportTicket['category'];
    priority: SupportTicket['priority'];
    description: string;
  }) => {
    const newTicket: SupportTicket = {
      id: `tkt_${Date.now()}`,
      ticketNumber: `SUP-${Math.floor(5000 + Math.random() * 4000)}`,
      subject: ticket.subject,
      category: ticket.category,
      priority: ticket.priority,
      status: 'Open',
      createdAt: 'Just now',
      lastReply: 'Ticket logged. Automated triage initialized.'
    };
    setSupportTickets(prev => [newTicket, ...prev]);
  };

  return (
    <SaaSContext.Provider
      value={{
        businesses,
        currentBusiness,
        setCurrentBusiness,
        branches,
        currentBranch,
        setCurrentBranch,
        setBranch: setCurrentBranch,
        registers,
        currentRegister,
        setCurrentRegister,
        currentUser,
        switchUserRole,
        modules,
        toggleModule,
        products,
        setProducts,
        addProduct,
        updateProductStock,
        orders,
        addOrder,
        updateOrderStatus,
        customers,
        addCustomer,
        leads,
        updateLeadStage,
        addLead,
        paymentLinks,
        createPaymentLink,
        fiscalInvoices,
        generateFiscalInvoice,
        posCart,
        addToPosCart,
        updatePosCartQuantity,
        removePosCartItem,
        clearPosCart,
        posDiscountPercent,
        setPosDiscountPercent,
        isCopilotOpen,
        setIsCopilotOpen,
        copilotMessages,
        sendCopilotMessage,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        supportTickets,
        createSupportTicket
      }}
    >
      {children}
    </SaaSContext.Provider>
  );
}

export function useSaaS() {
  const context = useContext(SaaSContext);
  if (!context) {
    throw new Error('useSaaS must be used within a SaaSProvider');
  }
  return context;
}
