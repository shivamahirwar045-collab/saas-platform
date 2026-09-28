export type BusinessType =
  | 'Retail'
  | 'Restaurant'
  | 'Services'
  | 'Professional'
  | 'Distributor'
  | 'Agency'
  | 'Healthcare'
  | 'Other';

export interface BusinessAccount {
  id: string;
  name: string;
  slug: string;
  type: BusinessType;
  industry: string;
  logo: string;
  currency: string;
  country: string;
  taxId: string; // RUC in Panama
  dv: string; // Digit Verifier
  email: string;
  phone: string;
  address: string;
  plan: 'Starter' | 'Growth' | 'Enterprise';
  status: 'active' | 'trial' | 'suspended';
  brandColor: string;
  createdAt: string;
}

export interface Branch {
  id: string;
  businessId: string;
  name: string;
  code: string;
  type: 'store' | 'warehouse' | 'headquarters' | 'hybrid';
  address: string;
  city: string;
  phone: string;
  managerName: string;
  status: 'active' | 'inactive';
  employeeCount: number;
  registerCount: number;
  monthlySales: number;
}

export interface CashRegister {
  id: string;
  branchId: string;
  branchName: string;
  name: string;
  code: string;
  status: 'open' | 'closed';
  currentCashier?: string;
  openedAt?: string;
  currentBalance: number;
}

export type UserRole =
  | 'Owner'
  | 'Administrator'
  | 'Manager'
  | 'Sales'
  | 'Cashier'
  | 'Inventory'
  | 'HR'
  | 'Finance'
  | 'Marketing'
  | 'Partner/Agency';

export interface PermissionMatrix {
  create: boolean;
  view: boolean;
  edit: boolean;
  approve: boolean;
  export: boolean;
  delete: boolean;
}

export interface User {
  id: string;
  businessId: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  branchId: string;
  branchName: string;
  status: 'active' | 'invited' | 'disabled' | 'suspended';
  lastActive: string;
  lastLogin?: string;
  twoFactorEnabled: boolean;
  mfaEnabled?: boolean;
  permissions?: Record<string, PermissionMatrix>;
}

// Module Configuration
export interface ModuleStatus {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'sales' | 'operations' | 'marketing' | 'management';
  enabled: boolean;
  planRequired: 'Starter' | 'Growth' | 'Enterprise';
  status: 'active' | 'disabled' | 'coming_soon';
  customFieldsCount: number;
}

// Website & AI Builder
export type SectionType =
  | 'Hero'
  | 'About'
  | 'Services'
  | 'Products'
  | 'Gallery'
  | 'Video'
  | 'Testimonials'
  | 'FAQs'
  | 'Contact'
  | 'Map'
  | 'CTA'
  | 'Features'
  | 'Pricing'
  | 'Footer';

export interface PageSection {
  id: string;
  type: SectionType;
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  buttonText?: string;
  buttonUrl?: string;
  isVisible: boolean;
  order: number;
  settings?: Record<string, any>;
}

export interface WebsitePage {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'Draft' | 'Published';
  sections: PageSection[];
  seoTitle?: string;
  seoDescription?: string;
  updatedAt?: string;
}

export interface WebsiteTemplate {
  id: string;
  name: string;
  industry: BusinessType;
  category?: string;
  description: string;
  previewUrl: string;
  sectionsCount: number;
  popular: boolean;
}

// Ecommerce & Products
export interface ProductVariant {
  id: string;
  name: string; // e.g. "Size: M / Color: Blue"
  sku: string;
  price: number;
  stock: number;
  barcode: string;
}

export interface Product {
  id: string;
  businessId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  costPrice?: number;
  compareAtPrice?: number;
  sku: string;
  barcode: string;
  stock: number;
  minStockAlert: number;
  status: 'active' | 'draft' | 'archived';
  images: string[];
  variants: ProductVariant[];
  channels: ('website' | 'pos' | 'whatsapp' | 'social')[];
  seoTitle?: string;
  seoTags?: string[];
  rating?: number;
  reviewsCount?: number;
  createdAt: string;
}

export interface OrderItem {
  id?: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  unitPrice?: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  channel: 'Website' | 'POS' | 'WhatsApp' | 'Payment Link' | 'App';
  branchName: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'Received' | 'Prepared' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded' | 'Failed';
  paymentMethod?: string;
  fiscalStatus: 'Authorized' | 'Pending' | 'Exempt' | 'Rejected';
  cufe?: string;
  createdAt: string;
}

// CRM
export interface Customer {
  id: string;
  businessId?: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  totalSpent: number;
  ordersCount: number;
  status: 'active' | 'lead' | 'vip' | 'inactive';
  segment?: string;
  tags: string[];
  lastOrderDate?: string;
  notesCount: number;
  assignedTo: string;
  createdAt: string;
}

export type LeadStage =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Proposal'
  | 'Negotiation'
  | 'Won'
  | 'Lost';

export interface Lead {
  id: string;
  businessId?: string;
  title: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  value: number;
  stage: LeadStage;
  priority: 'High' | 'Medium' | 'Low';
  assignedTo: string;
  probability: number;
  nextFollowUp: string;
  notes: string;
  createdAt: string;
}

// POS
export interface POSCartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  discountPercent: number;
}

export interface CashSession {
  id: string;
  registerId: string;
  registerName: string;
  cashierName: string;
  openedAt: string;
  closedAt?: string;
  openingBalance: number;
  closingBalance?: number;
  expectedCash: number;
  cashSales: number;
  cardSales: number;
  otherSales: number;
  transactionsCount: number;
  status: 'open' | 'closed';
}

// Payments & Fiscal (Panama PAC)
export interface PaymentTransaction {
  id: string;
  transactionNumber: string;
  customerId: string;
  customerName: string;
  amount: number;
  currency: string;
  method: 'Credit Card' | 'Debit Card' | 'Cash' | 'Bank Transfer' | 'Yappy' | 'Crypto';
  status: 'Successful' | 'Pending' | 'Failed' | 'Refunded' | 'Disputed' | 'Succeeded';
  channel: string;
  gateway: 'Stripe Adapter' | 'Authorize.Net' | 'Panama PAC Engine' | 'Local POS';
  orderId?: string;
  referenceId: string;
  reference?: string;
  createdAt: string;
}

export interface PaymentLink {
  id: string;
  code: string;
  title: string;
  description: string;
  amount: number;
  url?: string;
  customerName?: string;
  customerEmail?: string;
  status: 'active' | 'paid' | 'expired' | 'Active' | 'Paid' | 'Expired';
  views: number;
  paymentCount: number;
  expiresAt: string;
  createdAt: string;
}

export interface FiscalInvoice {
  id: string;
  invoiceNumber: string;
  orderNumber: string;
  customerName: string;
  customerRuc: string;
  dv: string;
  amount: number;
  taxAmount: number;
  pacProvider: 'The Factory HKA' | 'Digifact' | 'E-Sign PAC' | 'GuruSoft';
  cufe: string; // Codigo Unico de Factura Electronica
  authorizationCode: string;
  pacStatus: 'Authorized' | 'Pending' | 'Rejected' | 'Retrying';
  qrCodeUrl: string;
  issuedAt: string;
  pdfUrl?: string;
}

// Inventory & Purchasing
export interface Warehouse {
  id: string;
  name: string;
  code: string;
  branchName: string;
  capacity: number;
  utilizedPercent: number;
  manager: string;
  type?: string;
  status?: string;
  address?: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  type: 'Inbound' | 'Outbound' | 'Transfer' | 'Adjustment' | 'Sale';
  quantity: number;
  fromLocation: string;
  toLocation: string;
  reason: string;
  performedBy: string;
  timestamp: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  contactName?: string;
  email: string;
  phone: string;
  taxId: string;
  categories: string[];
  category?: string;
  rating: number;
  leadTimeDays: number;
  activeOrders: number;
  status: 'active' | 'inactive' | 'Active' | 'Inactive';
  paymentTerms?: string;
  createdAt?: string;
}

export type PurchaseOrderStatus = 'Draft' | 'Ordered' | 'Partially Received' | 'Received' | 'Cancelled';

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  warehouseName: string;
  status: PurchaseOrderStatus;
  itemsCount: number;
  totalAmount: number;
  issueDate: string;
  expectedDeliveryDate: string;
  notes: string;
}

// Delivery
export interface DeliveryJob {
  id: string;
  orderNumber: string;
  customerName: string;
  address: string;
  city: string;
  driverName: string;
  driverPhone: string;
  vehicle: string;
  status: 'Received' | 'Prepared' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Failed';
  eta: string;
  estimatedTime?: string;
  notes: string;
  proofSignature: boolean;
  proofPhoto: boolean;
}

// HR & Attendance
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: 'Operations' | 'Sales' | 'Kitchen' | 'Finance' | 'Customer Care' | 'IT' | 'Executive';
  role: string;
  branchName: string;
  hireDate: string;
  status: 'active' | 'on_leave' | 'terminated';
  avatar?: string;
  schedule: string;
  attendanceRate: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  branchName: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  method: 'Dynamic QR' | 'GPS Geofence' | 'Biometric' | 'Manual Override';
  status: 'Present' | 'Late' | 'Early Leave' | 'Absent' | 'On Leave';
  locationValidated: boolean;
}

// Marketing & Affiliates
export interface MarketingCampaign {
  id: string;
  name: string;
  channel: 'Email' | 'WhatsApp' | 'SMS' | 'Social';
  targetAudience: string;
  status: 'Draft' | 'Scheduled' | 'Active' | 'Completed';
  sentCount: number;
  openRate: number;
  clickRate: number;
  conversions: number;
  scheduledDate: string;
}

export interface PartnerAffiliate {
  id: string;
  name: string;
  type: 'Affiliate' | 'Influencer' | 'Agency Partner';
  referralCode: string;
  clicks: number;
  signups: number;
  payingCustomers: number;
  grossRevenue: number;
  commissionRate: number; // e.g. 15%
  earnedCommission: number;
  paidCommission: number;
  status: 'Active' | 'Pending Review' | 'Paused';
}

// Multichannel
export interface SalesChannelMetric {
  id: string;
  channel: 'Website' | 'Ecommerce' | 'POS' | 'Mobile App' | 'WhatsApp' | 'Social' | 'Payment Links';
  status: 'Connected' | 'Configured' | 'Attention' | 'Disconnected';
  monthlySales: number;
  orderCount: number;
  customerReach: number;
  lastSync: string;
}

// Notifications & Audits
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'inventory' | 'customer' | 'lead' | 'attendance' | 'ai' | 'security';
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  entity: string;
  ipAddress: string;
  status: 'Success' | 'Denied' | 'Warning';
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: 'Billing' | 'POS Hardware' | 'Website' | 'Fiscal PAC' | 'Integration' | 'General';
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Awaiting Merchant' | 'Resolved';
  createdAt: string;
  lastReply: string;
}
