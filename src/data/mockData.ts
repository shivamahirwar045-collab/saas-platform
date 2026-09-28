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
  CashSession,
  PaymentTransaction,
  PaymentLink,
  FiscalInvoice,
  Warehouse,
  StockMovement,
  Supplier,
  PurchaseOrder,
  DeliveryJob,
  Employee,
  AttendanceRecord,
  MarketingCampaign,
  PartnerAffiliate,
  SalesChannelMetric,
  NotificationItem,
  AuditLogItem,
  SupportTicket,
  WebsitePage,
  WebsiteTemplate
} from '../types/saas';

export const mockBusinesses: BusinessAccount[] = [
  {
    id: 'biz_01',
    name: 'Acme Retail & Tech',
    slug: 'acme-retail',
    type: 'Retail',
    industry: 'Omnichannel Electronics & Lifestyle',
    logo: '🛍️',
    currency: 'USD',
    country: 'Panama',
    taxId: '155789012-2-2021',
    dv: '44',
    email: 'contact@acmeretail.com',
    phone: '+507 390-4400',
    address: 'Calle 50 y Ave. Balboa, Plaza Magna, Piso 8, Panama City',
    plan: 'Enterprise',
    status: 'active',
    brandColor: '#2563eb',
    createdAt: '2025-01-15'
  },
  {
    id: 'biz_02',
    name: 'Acme Advisory Services',
    slug: 'acme-services',
    type: 'Services',
    industry: 'Financial Consulting & Legal',
    logo: '💼',
    currency: 'USD',
    country: 'Panama',
    taxId: '249876543-1-2022',
    dv: '12',
    email: 'advisory@acmeservices.pa',
    phone: '+507 264-8899',
    address: 'Torre Global Bank, Piso 22, Calle 50, Panama City',
    plan: 'Growth',
    status: 'active',
    brandColor: '#0d9488',
    createdAt: '2025-03-10'
  },
  {
    id: 'biz_03',
    name: 'Bistro Gourmet Panama',
    slug: 'demo-restaurant',
    type: 'Restaurant',
    industry: 'Fine Dining & Catering',
    logo: '🍽️',
    currency: 'USD',
    country: 'Panama',
    taxId: '318765432-1-2023',
    dv: '89',
    email: 'reservations@bistrogourmet.pa',
    phone: '+507 301-2244',
    address: 'Casco Antiguo, Calle 4ta Este #12, Panama City',
    plan: 'Growth',
    status: 'active',
    brandColor: '#ea580c',
    createdAt: '2025-05-20'
  }
];

export const mockBranches: Branch[] = [
  {
    id: 'br_01',
    businessId: 'biz_01',
    name: 'Main Flagship Store (Calle 50)',
    code: 'B-MAIN-01',
    type: 'headquarters',
    address: 'Calle 50, Edificio Royal Center',
    city: 'Panama City',
    phone: '+507 390-4401',
    managerName: 'Elena Rostova',
    status: 'active',
    employeeCount: 18,
    registerCount: 4,
    monthlySales: 94500
  },
  {
    id: 'br_02',
    businessId: 'biz_01',
    name: 'Multiplaza Pacific Mall Branch',
    code: 'B-MAL-02',
    type: 'store',
    address: 'Multiplaza Pacific Mall, Luxury Wing #L24',
    city: 'Punta Pacifica, Panama City',
    phone: '+507 390-4402',
    managerName: 'Carlos Santillan',
    status: 'active',
    employeeCount: 12,
    registerCount: 3,
    monthlySales: 68200
  },
  {
    id: 'br_03',
    businessId: 'biz_01',
    name: 'Colon Free Zone Logistics Hub',
    code: 'B-COL-03',
    type: 'warehouse',
    address: 'Zona Libre de Colon, Manzana 14, Galera 8',
    city: 'Colon',
    phone: '+507 441-9988',
    managerName: 'Ricardo Mendez',
    status: 'active',
    employeeCount: 15,
    registerCount: 1,
    monthlySales: 132000
  },
  {
    id: 'br_04',
    businessId: 'biz_01',
    name: 'David Chiriqui Express Store',
    code: 'B-DAV-04',
    type: 'store',
    address: 'Plaza Terronal, Local 18',
    city: 'David, Chiriqui',
    phone: '+507 775-3310',
    managerName: 'Maritza Gomez',
    status: 'active',
    employeeCount: 8,
    registerCount: 2,
    monthlySales: 41800
  }
];

export const mockCashRegisters: CashRegister[] = [
  {
    id: 'reg_01',
    branchId: 'br_01',
    branchName: 'Main Flagship Store (Calle 50)',
    name: 'Register 01 - Front Counter',
    code: 'REG-50-01',
    status: 'open',
    currentCashier: 'Mateo Morales',
    openedAt: '2026-09-28 08:30',
    currentBalance: 840.50
  },
  {
    id: 'reg_02',
    branchId: 'br_01',
    branchName: 'Main Flagship Store (Calle 50)',
    name: 'Register 02 - Tech Zone',
    code: 'REG-50-02',
    status: 'open',
    currentCashier: 'Sofia Chen',
    openedAt: '2026-09-28 09:00',
    currentBalance: 1250.00
  },
  {
    id: 'reg_03',
    branchId: 'br_02',
    branchName: 'Multiplaza Pacific Mall Branch',
    name: 'Register 03 - Mall Main',
    code: 'REG-MAL-01',
    status: 'open',
    currentCashier: 'Diego Vargas',
    openedAt: '2026-09-28 10:00',
    currentBalance: 590.25
  },
  {
    id: 'reg_04',
    branchId: 'br_04',
    branchName: 'David Chiriqui Express Store',
    name: 'Register 04 - Express Checkout',
    code: 'REG-DAV-01',
    status: 'closed',
    currentBalance: 250.00
  }
];

export const mockUsers: User[] = [
  {
    id: 'usr_01',
    businessId: 'biz_01',
    name: 'Alexander Sterling',
    email: 'alex@acmeretail.com',
    role: 'Owner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    branchId: 'br_01',
    branchName: 'Main Flagship Store (Calle 50)',
    status: 'active',
    lastActive: 'Just now',
    twoFactorEnabled: true
  },
  {
    id: 'usr_02',
    businessId: 'biz_01',
    name: 'Elena Rostova',
    email: 'elena@acmeretail.com',
    role: 'Administrator',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    branchId: 'br_01',
    branchName: 'Main Flagship Store (Calle 50)',
    status: 'active',
    lastActive: '12 mins ago',
    twoFactorEnabled: true
  },
  {
    id: 'usr_03',
    businessId: 'biz_01',
    name: 'Carlos Santillan',
    email: 'carlos.s@acmeretail.com',
    role: 'Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    branchId: 'br_02',
    branchName: 'Multiplaza Pacific Mall Branch',
    status: 'active',
    lastActive: '45 mins ago',
    twoFactorEnabled: true
  },
  {
    id: 'usr_04',
    businessId: 'biz_01',
    name: 'Sofia Chen',
    email: 'sofia.c@acmeretail.com',
    role: 'Cashier',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    branchId: 'br_01',
    branchName: 'Main Flagship Store (Calle 50)',
    status: 'active',
    lastActive: '5 mins ago',
    twoFactorEnabled: false
  },
  {
    id: 'usr_05',
    businessId: 'biz_01',
    name: 'Ricardo Mendez',
    email: 'ricardo.m@acmeretail.com',
    role: 'Inventory',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    branchId: 'br_03',
    branchName: 'Colon Free Zone Logistics Hub',
    status: 'active',
    lastActive: '2 hours ago',
    twoFactorEnabled: true
  },
  {
    id: 'usr_06',
    businessId: 'biz_01',
    name: 'Valeria Rios',
    email: 'valeria.r@acmeretail.com',
    role: 'Finance',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    branchId: 'br_01',
    branchName: 'Main Flagship Store (Calle 50)',
    status: 'active',
    lastActive: '1 hour ago',
    twoFactorEnabled: true
  }
];

export const mockModules: ModuleStatus[] = [
  {
    id: 'mod_website',
    name: 'Website + AI Builder',
    description: 'Visual responsive landing pages, SEO, templates, domain mapping and AI site generator',
    category: 'core',
    enabled: true,
    planRequired: 'Starter',
    status: 'active',
    customFieldsCount: 6
  },
  {
    id: 'mod_ecommerce',
    name: 'Ecommerce & Catalog',
    description: 'Product catalog, digital cart, online checkout, coupons and customer accounts',
    category: 'sales',
    enabled: true,
    planRequired: 'Starter',
    status: 'active',
    customFieldsCount: 12
  },
  {
    id: 'mod_crm',
    name: 'CRM & Pipeline',
    description: '360° customer records, leads kanban, deal stages, activity timeline and AI follow-up insights',
    category: 'sales',
    enabled: true,
    planRequired: 'Growth',
    status: 'active',
    customFieldsCount: 8
  },
  {
    id: 'mod_pos',
    name: 'Point of Sale (POS)',
    description: 'Tablet-ready cash registers, barcode scanner, receipt printing and shift reconciliation',
    category: 'sales',
    enabled: true,
    planRequired: 'Growth',
    status: 'active',
    customFieldsCount: 4
  },
  {
    id: 'mod_payments',
    name: 'Payments & Payment Links',
    description: 'Card gateways, Yappy adapter, instant WhatsApp payment links and webhook sync',
    category: 'sales',
    enabled: true,
    planRequired: 'Starter',
    status: 'active',
    customFieldsCount: 5
  },
  {
    id: 'mod_fiscal',
    name: 'Panama Fiscal PAC Billing',
    description: 'Electronic invoicing compliant with DGI Panama, CUFE generator, PAC adapter and retry queues',
    category: 'operations',
    enabled: true,
    planRequired: 'Growth',
    status: 'active',
    customFieldsCount: 7
  },
  {
    id: 'mod_inventory',
    name: 'Inventory & Warehousing',
    description: 'Multi-branch stock tracking, variants, SKU barcode lookup and automated low-stock warnings',
    category: 'operations',
    enabled: true,
    planRequired: 'Starter',
    status: 'active',
    customFieldsCount: 9
  },
  {
    id: 'mod_purchasing',
    name: 'Purchasing & Suppliers',
    description: 'Vendor management, purchase orders (Draft -> Ordered -> Received) and cost history',
    category: 'operations',
    enabled: true,
    planRequired: 'Growth',
    status: 'active',
    customFieldsCount: 3
  },
  {
    id: 'mod_delivery',
    name: 'Delivery & Logistics',
    description: 'Dispatch dispatching, driver route tracking, ETA updates and signature proof of delivery',
    category: 'operations',
    enabled: true,
    planRequired: 'Growth',
    status: 'active',
    customFieldsCount: 4
  },
  {
    id: 'mod_hr',
    name: 'HR & Team Management',
    description: 'Staff directory, departments, shift schedules, permission matrix and contract docs',
    category: 'management',
    enabled: true,
    planRequired: 'Growth',
    status: 'active',
    customFieldsCount: 6
  },
  {
    id: 'mod_attendance',
    name: 'Attendance & Dynamic QR',
    description: 'In-store dynamic cycling QR code check-in, geofencing coordinates and shift logs',
    category: 'management',
    enabled: true,
    planRequired: 'Growth',
    status: 'active',
    customFieldsCount: 2
  },
  {
    id: 'mod_marketing',
    name: 'Marketing & WhatsApp Bot',
    description: 'Email broadcasts, automated WhatsApp campaigns, coupons, loyalty points and AI copy generator',
    category: 'marketing',
    enabled: true,
    planRequired: 'Enterprise',
    status: 'active',
    customFieldsCount: 5
  },
  {
    id: 'mod_affiliates',
    name: 'Affiliates & Influencer Hub',
    description: 'Custom referral codes, UTM tracking, tiered commission payouts and partner portal',
    category: 'marketing',
    enabled: true,
    planRequired: 'Enterprise',
    status: 'active',
    customFieldsCount: 4
  },
  {
    id: 'mod_analytics',
    name: 'Business Intelligence & BI',
    description: 'Executive dashboards, branch revenue breakdown, product velocity and AI diagnostic analyst',
    category: 'core',
    enabled: true,
    planRequired: 'Starter',
    status: 'active',
    customFieldsCount: 0
  },
  {
    id: 'mod_payroll',
    name: 'Payroll & Social Security (CSS)',
    description: 'Panama CSS deductions, XIII month calculations, bonuses, overtime and bank dispersals',
    category: 'management',
    enabled: false,
    planRequired: 'Enterprise',
    status: 'coming_soon',
    customFieldsCount: 0
  }
];

export const mockProducts: Product[] = [
  {
    id: 'prod_01',
    businessId: 'biz_01',
    name: 'UltraBook Pro X1 Carbon (32GB / 1TB SSD)',
    description: 'Top tier ultra-lightweight business workstation with 4K OLED display and AI accelerator engine.',
    category: 'Laptops & Computers',
    price: 1899.00,
    compareAtPrice: 2099.00,
    sku: 'UBX1-32-1TB',
    barcode: '7453001899012',
    stock: 24,
    minStockAlert: 5,
    status: 'active',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
    channels: ['website', 'pos', 'whatsapp'],
    seoTitle: 'UltraBook Pro X1 Carbon | Acme Retail Panama',
    seoTags: ['ultrabook', 'laptop', 'oled', 'enterprise', 'panama'],
    createdAt: '2025-08-10',
    variants: [
      { id: 'var_01', name: 'Space Gray / 32GB', sku: 'UBX1-32-SG', price: 1899.00, stock: 14, barcode: '7453001899013' },
      { id: 'var_02', name: 'Silver Frost / 64GB', sku: 'UBX1-64-SF', price: 2199.00, stock: 10, barcode: '7453001899014' }
    ]
  },
  {
    id: 'prod_02',
    businessId: 'biz_01',
    name: 'AcousticPure Noise Cancelling Headphones',
    description: 'Industry leading active noise cancellation with 40-hour battery life and spatial audio.',
    category: 'Audio & Accessories',
    price: 349.50,
    compareAtPrice: 399.00,
    sku: 'APN-800-BLK',
    barcode: '7453003495011',
    stock: 42,
    minStockAlert: 10,
    status: 'active',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    channels: ['website', 'pos', 'whatsapp', 'social'],
    seoTitle: 'AcousticPure Wireless ANC Headphones',
    seoTags: ['headphones', 'anc', 'wireless', 'bluetooth', 'audio'],
    createdAt: '2025-09-01',
    variants: [
      { id: 'var_03', name: 'Midnight Black', sku: 'APN-800-BLK', price: 349.50, stock: 26, barcode: '7453003495012' },
      { id: 'var_04', name: 'Sand White', sku: 'APN-800-WHT', price: 349.50, stock: 16, barcode: '7453003495013' }
    ]
  },
  {
    id: 'prod_03',
    businessId: 'biz_01',
    name: 'OmniSmart Watch Series 5 (GPS + Cellular)',
    description: 'All-day health metrics, ECG monitor, water resistant up to 50 meters with titanium casing.',
    category: 'Wearables & Health',
    price: 499.00,
    sku: 'OSW-5-TIT',
    barcode: '7453004990022',
    stock: 3, // LOW STOCK
    minStockAlert: 8,
    status: 'active',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
    channels: ['website', 'pos'],
    seoTitle: 'OmniSmart Watch Series 5 Titanium',
    seoTags: ['smartwatch', 'fitness', 'titanium', 'apple', 'health'],
    createdAt: '2025-10-15',
    variants: []
  },
  {
    id: 'prod_04',
    businessId: 'biz_01',
    name: 'VisionPro 32-inch 4K Studio Display',
    description: 'Calibrated color precision (99% DCI-P3), Thunderbolt 4 hub, integrated 1080p webcam.',
    category: 'Laptops & Computers',
    price: 1299.00,
    compareAtPrice: 1450.00,
    sku: 'VPD-32-4K',
    barcode: '7453001299033',
    stock: 2, // LOW STOCK
    minStockAlert: 4,
    status: 'active',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'],
    channels: ['website', 'pos'],
    seoTitle: 'VisionPro 4K Studio Display Monitor',
    seoTags: ['monitor', '4k', 'studio', 'thunderbolt'],
    createdAt: '2025-11-05',
    variants: []
  },
  {
    id: 'prod_05',
    businessId: 'biz_01',
    name: 'ErgoWave Executive Mesh Chair',
    description: 'Dynamic lumbar support, 4D adjustable armrests, breathable Italian mesh with aluminum base.',
    category: 'Office Furniture',
    price: 580.00,
    sku: 'EWC-EXE-GRY',
    barcode: '7453005800044',
    stock: 18,
    minStockAlert: 4,
    status: 'active',
    images: ['https://images.unsplash.com/photo-1580481077195-c3f9a3206018?w=500'],
    channels: ['website', 'pos', 'whatsapp'],
    seoTitle: 'ErgoWave Ergonomic Office Chair Panama',
    seoTags: ['chair', 'ergonomic', 'office', 'furniture'],
    createdAt: '2025-12-01',
    variants: []
  },
  {
    id: 'prod_06',
    businessId: 'biz_01',
    name: 'CloudSync Mini POS Thermal Printer (80mm)',
    description: 'High-speed wireless receipt printer with USB, Bluetooth, Ethernet and automatic paper cutter.',
    category: 'POS Hardware',
    price: 185.00,
    sku: 'CSP-80-THM',
    barcode: '7453001850055',
    stock: 35,
    minStockAlert: 10,
    status: 'active',
    images: ['https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500'],
    channels: ['website', 'pos'],
    seoTitle: 'CloudSync 80mm Thermal Receipt Printer',
    seoTags: ['pos', 'printer', 'thermal', 'receipt'],
    createdAt: '2026-01-10',
    variants: []
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ord_101',
    orderNumber: 'ORD-2026-0891',
    customerId: 'cust_01',
    customerName: 'Roberto Castillero',
    customerEmail: 'roberto@castillero-group.com',
    channel: 'Website',
    branchName: 'Main Flagship Store (Calle 50)',
    items: [
      { productId: 'prod_01', productName: 'UltraBook Pro X1 Carbon', sku: 'UBX1-32-SG', quantity: 1, price: 1899.00, total: 1899.00 },
      { id: 'prod_02', productId: 'prod_02', productName: 'AcousticPure ANC Headphones', sku: 'APN-800-BLK', quantity: 1, price: 349.50, total: 349.50 }
    ],
    subtotal: 2248.50,
    tax: 157.40, // 7% ITBMS Panama
    discount: 50.00,
    total: 2355.90,
    status: 'Out for Delivery',
    paymentStatus: 'Paid',
    fiscalStatus: 'Authorized',
    cufe: 'CUFE-PA-000101-20260928-891044-88A',
    createdAt: '2026-09-28 09:14'
  },
  {
    id: 'ord_102',
    orderNumber: 'ORD-2026-0892',
    customerId: 'cust_02',
    customerName: 'Mariana De La Guardia',
    customerEmail: 'mariana.dlg@lawfirm.pa',
    channel: 'POS',
    branchName: 'Multiplaza Pacific Mall Branch',
    items: [
      { productId: 'prod_03', productName: 'OmniSmart Watch Series 5', sku: 'OSW-5-TIT', quantity: 1, price: 499.00, total: 499.00 }
    ],
    subtotal: 499.00,
    tax: 34.93,
    discount: 0,
    total: 533.93,
    status: 'Delivered',
    paymentStatus: 'Paid',
    fiscalStatus: 'Authorized',
    cufe: 'CUFE-PA-000102-20260928-112344-99B',
    createdAt: '2026-09-28 10:22'
  },
  {
    id: 'ord_103',
    orderNumber: 'ORD-2026-0893',
    customerId: 'cust_03',
    customerName: 'Constructora del Istmo S.A.',
    customerEmail: 'compras@istmoconstructora.pa',
    channel: 'Payment Link',
    branchName: 'Main Flagship Store (Calle 50)',
    items: [
      { productId: 'prod_04', productName: 'VisionPro 32-inch 4K Studio Display', sku: 'VPD-32-4K', quantity: 2, price: 1299.00, total: 2598.00 },
      { productId: 'prod_05', productName: 'ErgoWave Executive Chair', sku: 'EWC-EXE-GRY', quantity: 4, price: 580.00, total: 2320.00 }
    ],
    subtotal: 4918.00,
    tax: 344.26,
    discount: 200.00,
    total: 5062.26,
    status: 'Prepared',
    paymentStatus: 'Paid',
    fiscalStatus: 'Authorized',
    cufe: 'CUFE-PA-000103-20260928-774411-44C',
    createdAt: '2026-09-27 16:45'
  },
  {
    id: 'ord_104',
    orderNumber: 'ORD-2026-0894',
    customerId: 'cust_04',
    customerName: 'Dra. Gabriela Vasquez',
    customerEmail: 'clinica.vasquez@salud.pa',
    channel: 'WhatsApp',
    branchName: 'David Chiriqui Express Store',
    items: [
      { productId: 'prod_06', productName: 'CloudSync Mini POS Printer', sku: 'CSP-80-THM', quantity: 2, price: 185.00, total: 370.00 }
    ],
    subtotal: 370.00,
    tax: 25.90,
    discount: 0,
    total: 395.90,
    status: 'Received',
    paymentStatus: 'Pending',
    fiscalStatus: 'Pending',
    createdAt: '2026-09-28 11:05'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'cust_01',
    name: 'Roberto Castillero',
    company: 'Castillero & Asociados',
    email: 'roberto@castillero-group.com',
    phone: '+507 6612-8899',
    city: 'Panama City (Costa del Este)',
    country: 'Panama',
    totalSpent: 8450.00,
    ordersCount: 7,
    status: 'vip',
    tags: ['Corporate', 'VIP', 'Tech Buyer'],
    lastOrderDate: '2026-09-28',
    notesCount: 4,
    assignedTo: 'Alexander Sterling',
    createdAt: '2025-02-14'
  },
  {
    id: 'cust_02',
    name: 'Mariana De La Guardia',
    company: 'De La Guardia Real Estate',
    email: 'mariana.dlg@lawfirm.pa',
    phone: '+507 6744-1122',
    city: 'Punta Pacifica, Panama City',
    country: 'Panama',
    totalSpent: 3210.50,
    ordersCount: 3,
    status: 'active',
    tags: ['Retail', 'Multiplaza Regular'],
    lastOrderDate: '2026-09-28',
    notesCount: 2,
    assignedTo: 'Carlos Santillan',
    createdAt: '2025-06-20'
  },
  {
    id: 'cust_03',
    name: 'Constructora del Istmo S.A.',
    company: 'Constructora del Istmo',
    email: 'compras@istmoconstructora.pa',
    phone: '+507 395-8800',
    city: 'Colon Free Zone / Panama City',
    country: 'Panama',
    totalSpent: 28400.00,
    ordersCount: 14,
    status: 'vip',
    tags: ['B2B Enterprise', 'Credit 30 Days', 'High Volume'],
    lastOrderDate: '2026-09-27',
    notesCount: 9,
    assignedTo: 'Elena Rostova',
    createdAt: '2025-01-30'
  },
  {
    id: 'cust_04',
    name: 'Dra. Gabriela Vasquez',
    company: 'Centro Medico del Pacifico',
    email: 'clinica.vasquez@salud.pa',
    phone: '+507 6899-3344',
    city: 'David, Chiriqui',
    country: 'Panama',
    totalSpent: 1250.00,
    ordersCount: 2,
    status: 'active',
    tags: ['Medical', 'Regional Chiriqui'],
    lastOrderDate: '2026-09-28',
    notesCount: 1,
    assignedTo: 'Maritza Gomez',
    createdAt: '2026-04-12'
  }
];

export const mockLeads: Lead[] = [
  {
    id: 'lead_01',
    title: '50-Seat Enterprise Workstation Refresh',
    company: 'Banco Continental Panama',
    contactName: 'Lic. Fernando Icaza',
    email: 'f.icaza@continentalbank.pa',
    phone: '+507 215-6000',
    value: 65000.00,
    stage: 'Negotiation',
    priority: 'High',
    assignedTo: 'Alexander Sterling',
    probability: 80,
    nextFollowUp: 'Today, 2:30 PM',
    notes: 'Reviewed legal procurement terms. Waiting for final board approval of Q4 budget.',
    createdAt: '2026-09-10'
  },
  {
    id: 'lead_02',
    title: 'POS Hardware & Fiscal Software Deployment',
    company: 'Supermercados del Pacifico (6 Branches)',
    contactName: 'Ernesto Valenzuela',
    email: 'evalenzuela@mercadospacifico.pa',
    phone: '+507 6620-4411',
    value: 28500.00,
    stage: 'Proposal',
    priority: 'High',
    assignedTo: 'Carlos Santillan',
    probability: 60,
    nextFollowUp: 'Tomorrow, 10:00 AM',
    notes: 'Sent formal proposal covering 18 POS terminals with Panama PAC integration.',
    createdAt: '2026-09-18'
  },
  {
    id: 'lead_03',
    title: 'Audio-Visual Boardroom Fitout',
    company: 'Panama Canal Maritime Law Group',
    contactName: 'Patricia Arango',
    email: 'parango@canalmaritime.com',
    phone: '+507 263-5500',
    value: 14200.00,
    stage: 'Qualified',
    priority: 'Medium',
    assignedTo: 'Elena Rostova',
    probability: 45,
    nextFollowUp: 'Oct 2, 2026',
    notes: 'Architectural blueprints submitted. Demo scheduled next week.',
    createdAt: '2026-09-22'
  },
  {
    id: 'lead_04',
    title: 'Logistics Warehouse Barcode Scanners',
    company: 'Isthmus Logistics Services',
    contactName: 'Jorge Guardia',
    email: 'jguardia@isthmuslogistics.com',
    phone: '+507 433-2211',
    value: 9800.00,
    stage: 'Contacted',
    priority: 'Medium',
    assignedTo: 'Ricardo Mendez',
    probability: 30,
    nextFollowUp: 'Oct 3, 2026',
    notes: 'Initial discovery call completed. Need specs for rugged Android scanners.',
    createdAt: '2026-09-25'
  },
  {
    id: 'lead_05',
    title: 'Executive Ergonomic Chair Fleet',
    company: 'Morgan & Morgan Partners',
    contactName: 'Claudia Morales',
    email: 'cmorales@legalpartners.pa',
    phone: '+507 265-7788',
    value: 22000.00,
    stage: 'Won',
    priority: 'High',
    assignedTo: 'Alexander Sterling',
    probability: 100,
    nextFollowUp: 'PO Received - In Fulfillment',
    notes: 'Purchase order confirmed and 50% advance invoice issued via PAC.',
    createdAt: '2026-08-20'
  }
];

export const mockTransactions: PaymentTransaction[] = [
  {
    id: 'tx_901',
    transactionNumber: 'TXN-2026-9011',
    customerId: 'cust_01',
    customerName: 'Roberto Castillero',
    amount: 2355.90,
    currency: 'USD',
    method: 'Credit Card',
    status: 'Successful',
    channel: 'Website',
    gateway: 'Stripe Adapter',
    orderId: 'ord_101',
    referenceId: 'ch_3N1K09F83811',
    createdAt: '2026-09-28 09:15'
  },
  {
    id: 'tx_902',
    transactionNumber: 'TXN-2026-9012',
    customerId: 'cust_02',
    customerName: 'Mariana De La Guardia',
    amount: 533.93,
    currency: 'USD',
    method: 'Yappy',
    status: 'Successful',
    channel: 'POS Register 03',
    gateway: 'Panama PAC Engine',
    orderId: 'ord_102',
    referenceId: 'yp_9928172648',
    createdAt: '2026-09-28 10:23'
  },
  {
    id: 'tx_903',
    transactionNumber: 'TXN-2026-9013',
    customerId: 'cust_03',
    customerName: 'Constructora del Istmo S.A.',
    amount: 5062.26,
    currency: 'USD',
    method: 'Bank Transfer',
    status: 'Successful',
    channel: 'Payment Link #PL-902',
    gateway: 'Authorize.Net',
    orderId: 'ord_103',
    referenceId: 'ach_881928374',
    createdAt: '2026-09-27 17:02'
  },
  {
    id: 'tx_904',
    transactionNumber: 'TXN-2026-9014',
    customerId: 'cust_05',
    customerName: 'Alfonso Nuñez',
    amount: 349.50,
    currency: 'USD',
    method: 'Credit Card',
    status: 'Failed',
    channel: 'Website',
    gateway: 'Stripe Adapter',
    referenceId: 'ch_fail_3N29104',
    createdAt: '2026-09-28 07:44'
  }
];

export const mockPaymentLinks: PaymentLink[] = [
  {
    id: 'pl_01',
    code: 'PL-ACME-081',
    title: 'Consulting Retainer & Hardware Deposit',
    description: 'Q4 2026 Hardware advisory package and reserved staging server',
    amount: 1500.00,
    customerName: 'Inversiones Balboa S.A.',
    customerEmail: 'finanzas@inversionesbalboa.com',
    status: 'active',
    views: 18,
    paymentCount: 0,
    expiresAt: '2026-10-15',
    createdAt: '2026-09-26'
  },
  {
    id: 'pl_02',
    code: 'PL-ACME-082',
    title: 'Executive Ergonomic Chair Fleet Invoice',
    description: 'Constructora del Istmo office setup installment 1 of 2',
    amount: 5062.26,
    customerName: 'Constructora del Istmo S.A.',
    customerEmail: 'compras@istmoconstructora.pa',
    status: 'paid',
    views: 4,
    paymentCount: 1,
    expiresAt: '2026-10-01',
    createdAt: '2026-09-27'
  }
];

export const mockFiscalInvoices: FiscalInvoice[] = [
  {
    id: 'fisc_01',
    invoiceNumber: 'FE-001-002-00049281',
    orderNumber: 'ORD-2026-0891',
    customerName: 'Roberto Castillero',
    customerRuc: '155421098-1-2019',
    dv: '33',
    amount: 2355.90,
    taxAmount: 157.40,
    pacProvider: 'The Factory HKA',
    cufe: 'CUFE-PA-000101-20260928-891044-88A9B2C4D8E9F1012',
    authorizationCode: 'DGI-PAC-AUTH-9948217',
    pacStatus: 'Authorized',
    qrCodeUrl: 'https://dgi-fe.mef.gob.pa/consultas/fe/CUFE-PA-000101-20260928-891044-88A9B2C4D8E9F1012',
    issuedAt: '2026-09-28 09:15:30',
    pdfUrl: '/fiscal/docs/FE-00049281.pdf'
  },
  {
    id: 'fisc_02',
    invoiceNumber: 'FE-001-003-00018442',
    orderNumber: 'ORD-2026-0892',
    customerName: 'Mariana De La Guardia',
    customerRuc: '239841209-2-2020',
    dv: '19',
    amount: 533.93,
    taxAmount: 34.93,
    pacProvider: 'Digifact',
    cufe: 'CUFE-PA-000102-20260928-112344-99B8C7D6E5F4A3B21',
    authorizationCode: 'DGI-PAC-AUTH-8831902',
    pacStatus: 'Authorized',
    qrCodeUrl: 'https://dgi-fe.mef.gob.pa/consultas/fe/CUFE-PA-000102-20260928-112344-99B8C7D6E5F4A3B21',
    issuedAt: '2026-09-28 10:23:15'
  },
  {
    id: 'fisc_03',
    invoiceNumber: 'FE-001-001-00092104',
    orderNumber: 'ORD-2026-0893',
    customerName: 'Constructora del Istmo S.A.',
    customerRuc: '879102431-1-2014',
    dv: '77',
    amount: 5062.26,
    taxAmount: 344.26,
    pacProvider: 'The Factory HKA',
    cufe: 'CUFE-PA-000103-20260928-774411-44C1D2E3F4A5B6C7D',
    authorizationCode: 'DGI-PAC-AUTH-7719204',
    pacStatus: 'Authorized',
    qrCodeUrl: 'https://dgi-fe.mef.gob.pa/consultas/fe/CUFE-PA-000103-20260928-774411-44C1D2E3F4A5B6C7D',
    issuedAt: '2026-09-27 17:03:00'
  }
];

export const mockWarehouses: Warehouse[] = [
  {
    id: 'wh_01',
    name: 'Colon Free Zone Distribution Center',
    code: 'WH-COLON-MAIN',
    branchName: 'Colon Free Zone Logistics Hub',
    capacity: 50000,
    utilizedPercent: 68,
    manager: 'Ricardo Mendez'
  },
  {
    id: 'wh_02',
    name: 'Calle 50 Store Vault & Staging',
    code: 'WH-C50-LOC',
    branchName: 'Main Flagship Store (Calle 50)',
    capacity: 8000,
    utilizedPercent: 82,
    manager: 'Elena Rostova'
  },
  {
    id: 'wh_03',
    name: 'Chiriqui Regional Depository',
    code: 'WH-DAV-REG',
    branchName: 'David Chiriqui Express Store',
    capacity: 12000,
    utilizedPercent: 44,
    manager: 'Maritza Gomez'
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: 'sup_01',
    name: 'Shenzhen MicroTech Components Ltd.',
    contactPerson: 'David Wong',
    email: 'sales@microtech-sz.com',
    phone: '+86 755 8390 1200',
    taxId: 'CN-91440300MA5FB7',
    categories: ['Laptops', 'Audio', 'Electronics'],
    rating: 4.9,
    leadTimeDays: 18,
    activeOrders: 2,
    status: 'active'
  },
  {
    id: 'sup_02',
    name: 'ComfortSeating Italia S.p.A.',
    contactPerson: 'Marco Bellini',
    email: 'export@comfortseating.it',
    phone: '+39 02 8844 1920',
    taxId: 'IT-09823410155',
    categories: ['Office Furniture', 'Ergonomic Solutions'],
    rating: 4.8,
    leadTimeDays: 25,
    activeOrders: 1,
    status: 'active'
  },
  {
    id: 'sup_03',
    name: 'ThermalPrint Systems Miami Corp',
    contactPerson: 'Jessica Morales',
    email: 'jessica@tpsystems-fl.com',
    phone: '+1 305 554 9911',
    taxId: 'US-65-0981244',
    categories: ['POS Hardware', 'Consumables'],
    rating: 4.7,
    leadTimeDays: 7,
    activeOrders: 0,
    status: 'active'
  }
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'po_01',
    poNumber: 'PO-2026-0341',
    supplierId: 'sup_01',
    supplierName: 'Shenzhen MicroTech Components Ltd.',
    warehouseName: 'Colon Free Zone Distribution Center',
    status: 'Ordered',
    itemsCount: 150,
    totalAmount: 48500.00,
    issueDate: '2026-09-15',
    expectedDeliveryDate: '2026-10-05',
    notes: 'Q4 holiday inventory replenishment for laptops and wireless headphones.'
  },
  {
    id: 'po_02',
    poNumber: 'PO-2026-0342',
    supplierId: 'sup_02',
    supplierName: 'ComfortSeating Italia S.p.A.',
    warehouseName: 'Colon Free Zone Distribution Center',
    status: 'Partially Received',
    itemsCount: 40,
    totalAmount: 18400.00,
    issueDate: '2026-09-02',
    expectedDeliveryDate: '2026-09-29',
    notes: 'Container arrived at Puerto Cristobal. 25 chairs inspected and transferred.'
  },
  {
    id: 'po_03',
    poNumber: 'PO-2026-0343',
    supplierId: 'sup_03',
    supplierName: 'ThermalPrint Systems Miami Corp',
    warehouseName: 'Calle 50 Store Vault & Staging',
    status: 'Received',
    itemsCount: 60,
    totalAmount: 7200.00,
    issueDate: '2026-09-10',
    expectedDeliveryDate: '2026-09-20',
    notes: 'Order received in full and tested with POS registers.'
  }
];

export const mockDeliveryJobs: DeliveryJob[] = [
  {
    id: 'del_01',
    orderNumber: 'ORD-2026-0891',
    customerName: 'Roberto Castillero',
    address: 'Costa del Este, Ave. Paseo del Mar, Edificio Titanium #14A',
    city: 'Panama City',
    driverName: 'Manuel Santana',
    driverPhone: '+507 6590-1288',
    vehicle: 'Nissan Van Express [PA-9281]',
    status: 'Out for Delivery',
    eta: '12:45 PM Today',
    notes: 'Call reception upon arrival. Customer requested unboxing check.',
    proofSignature: false,
    proofPhoto: false
  },
  {
    id: 'del_02',
    orderNumber: 'ORD-2026-0893',
    customerName: 'Constructora del Istmo S.A.',
    address: 'Obarrio, Calle 54 Este, Torre Optima, Piso 15',
    city: 'Panama City',
    driverName: 'Jorge Alvarado',
    driverPhone: '+507 6812-4455',
    vehicle: 'Freightliner 2-Ton Truck [PA-1049]',
    status: 'Prepared',
    eta: 'Tomorrow 9:00 AM',
    notes: 'Heavy items (4 ergonomic chairs, 2 displays). Use freight elevator #3.',
    proofSignature: false,
    proofPhoto: false
  },
  {
    id: 'del_03',
    orderNumber: 'ORD-2026-0888',
    customerName: 'Lic. Fernando Icaza',
    address: 'Marbella, Calle Aquilino de la Guardia, Torre Banco Continental',
    city: 'Panama City',
    driverName: 'Manuel Santana',
    driverPhone: '+507 6590-1288',
    vehicle: 'Nissan Van Express [PA-9281]',
    status: 'Delivered',
    eta: 'Delivered at 09:30 AM',
    notes: 'Received by Assistant Claudia Rios. Signature and digital stamp recorded.',
    proofSignature: true,
    proofPhoto: true
  }
];

export const mockEmployees: Employee[] = [
  {
    id: 'emp_01',
    name: 'Elena Rostova',
    email: 'elena@acmeretail.com',
    phone: '+507 6500-1122',
    department: 'Operations',
    role: 'Operations Director',
    branchName: 'Main Flagship Store (Calle 50)',
    hireDate: '2024-03-01',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    schedule: 'Mon - Fri | 8:00 AM - 5:00 PM',
    attendanceRate: 98.5
  },
  {
    id: 'emp_02',
    name: 'Carlos Santillan',
    email: 'carlos.s@acmeretail.com',
    phone: '+507 6611-3344',
    department: 'Sales',
    role: 'Mall Branch Store Manager',
    branchName: 'Multiplaza Pacific Mall Branch',
    hireDate: '2024-06-15',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    schedule: 'Mon - Sat | 10:00 AM - 7:00 PM',
    attendanceRate: 96.0
  },
  {
    id: 'emp_03',
    name: 'Sofia Chen',
    email: 'sofia.c@acmeretail.com',
    phone: '+507 6822-5566',
    department: 'Sales',
    role: 'Head Cashier & POS Lead',
    branchName: 'Main Flagship Store (Calle 50)',
    hireDate: '2025-01-10',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    schedule: 'Mon - Fri | 8:30 AM - 5:30 PM',
    attendanceRate: 100
  },
  {
    id: 'emp_04',
    name: 'Ricardo Mendez',
    email: 'ricardo.m@acmeretail.com',
    phone: '+507 6733-7788',
    department: 'Operations',
    role: 'Logistics & Warehouse Chief',
    branchName: 'Colon Free Zone Logistics Hub',
    hireDate: '2024-01-20',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    schedule: 'Mon - Fri | 7:30 AM - 4:30 PM',
    attendanceRate: 97.2
  },
  {
    id: 'emp_05',
    name: 'Valeria Rios',
    email: 'valeria.r@acmeretail.com',
    phone: '+507 6944-9900',
    department: 'Finance',
    role: 'Senior Accountant & Fiscal Comptroller',
    branchName: 'Main Flagship Store (Calle 50)',
    hireDate: '2024-08-01',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    schedule: 'Mon - Fri | 8:00 AM - 5:00 PM',
    attendanceRate: 99.1
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'att_01',
    employeeId: 'emp_01',
    employeeName: 'Elena Rostova',
    department: 'Operations',
    branchName: 'Main Flagship Store (Calle 50)',
    date: '2026-09-28',
    checkInTime: '07:55 AM',
    method: 'Dynamic QR',
    status: 'Present',
    locationValidated: true
  },
  {
    id: 'att_02',
    employeeId: 'emp_02',
    employeeName: 'Carlos Santillan',
    department: 'Sales',
    branchName: 'Multiplaza Pacific Mall Branch',
    date: '2026-09-28',
    checkInTime: '09:48 AM',
    method: 'Dynamic QR',
    status: 'Present',
    locationValidated: true
  },
  {
    id: 'att_03',
    employeeId: 'emp_03',
    employeeName: 'Sofia Chen',
    department: 'Sales',
    branchName: 'Main Flagship Store (Calle 50)',
    date: '2026-09-28',
    checkInTime: '08:24 AM',
    method: 'GPS Geofence',
    status: 'Present',
    locationValidated: true
  },
  {
    id: 'att_04',
    employeeId: 'emp_04',
    employeeName: 'Ricardo Mendez',
    department: 'Operations',
    branchName: 'Colon Free Zone Logistics Hub',
    date: '2026-09-28',
    checkInTime: '07:22 AM',
    method: 'Dynamic QR',
    status: 'Present',
    locationValidated: true
  }
];

export const mockMarketingCampaigns: MarketingCampaign[] = [
  {
    id: 'camp_01',
    name: 'Black November Tech VIP Preview (WhatsApp Broadcast)',
    channel: 'WhatsApp',
    targetAudience: 'VIP & High Spenders (1,450 contacts)',
    status: 'Active',
    sentCount: 1450,
    openRate: 94.2,
    clickRate: 38.6,
    conversions: 89,
    scheduledDate: '2026-09-26'
  },
  {
    id: 'camp_02',
    name: 'New Fiscal Year Ergo Chair Office Upgrades',
    channel: 'Email',
    targetAudience: 'B2B Corporate Legal & Finance (3,200 leads)',
    status: 'Scheduled',
    sentCount: 3200,
    openRate: 46.8,
    clickRate: 14.2,
    conversions: 24,
    scheduledDate: '2026-10-02'
  },
  {
    id: 'camp_03',
    name: 'Flash Weekend Store Pickup 10% Off [FLASH10]',
    channel: 'SMS',
    targetAudience: 'Panama City Local Shoppers (5,800 numbers)',
    status: 'Completed',
    sentCount: 5800,
    openRate: 98.0,
    clickRate: 22.4,
    conversions: 142,
    scheduledDate: '2026-09-20'
  }
];

export const mockPartners: PartnerAffiliate[] = [
  {
    id: 'part_01',
    name: 'TechReviews Panama (Gabriel Arosemena)',
    type: 'Influencer',
    referralCode: 'TECHPANAMA',
    clicks: 12480,
    signups: 620,
    payingCustomers: 148,
    grossRevenue: 84200.00,
    commissionRate: 10,
    earnedCommission: 8420.00,
    paidCommission: 6500.00,
    status: 'Active'
  },
  {
    id: 'part_02',
    name: 'Chamber of Digital Commerce & Fintech',
    type: 'Agency Partner',
    referralCode: 'CAMARADIGITAL',
    clicks: 4120,
    signups: 190,
    payingCustomers: 74,
    grossRevenue: 52100.00,
    commissionRate: 12,
    earnedCommission: 6252.00,
    paidCommission: 4800.00,
    status: 'Active'
  },
  {
    id: 'part_03',
    name: 'StartupHub Casco Coworking',
    type: 'Affiliate',
    referralCode: 'CASCOHUB',
    clicks: 1850,
    signups: 85,
    payingCustomers: 28,
    grossRevenue: 16800.00,
    commissionRate: 8,
    earnedCommission: 1344.00,
    paidCommission: 1344.00,
    status: 'Active'
  }
];

export const mockSalesChannels: SalesChannelMetric[] = [
  {
    id: 'ch_web',
    channel: 'Website',
    status: 'Connected',
    monthlySales: 98450.00,
    orderCount: 312,
    customerReach: 48900,
    lastSync: 'Real-time sync'
  },
  {
    id: 'ch_pos',
    channel: 'POS',
    status: 'Connected',
    monthlySales: 142800.00,
    orderCount: 840,
    customerReach: 12400,
    lastSync: 'Real-time sync'
  },
  {
    id: 'ch_wa',
    channel: 'WhatsApp',
    status: 'Connected',
    monthlySales: 38200.00,
    orderCount: 118,
    customerReach: 8600,
    lastSync: '2 mins ago'
  },
  {
    id: 'ch_plink',
    channel: 'Payment Links',
    status: 'Connected',
    monthlySales: 45600.00,
    orderCount: 64,
    customerReach: 1400,
    lastSync: 'Real-time sync'
  },
  {
    id: 'ch_app',
    channel: 'Mobile App',
    status: 'Configured',
    monthlySales: 21900.00,
    orderCount: 92,
    customerReach: 5200,
    lastSync: '10 mins ago'
  },
  {
    id: 'ch_soc',
    channel: 'Social',
    status: 'Connected',
    monthlySales: 16400.00,
    orderCount: 58,
    customerReach: 32000,
    lastSync: '1 hour ago'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif_01',
    title: 'High-Value Order Received ($2,355.90)',
    message: 'Roberto Castillero completed checkout via Website for UltraBook Pro & Headphones.',
    type: 'order',
    read: false,
    timestamp: '12m ago',
    actionUrl: '/ecommerce/orders'
  },
  {
    id: 'notif_02',
    title: 'PAC Fiscal Invoice Authorized (CUFE Confirmed)',
    message: 'Panama DGI PAC issued authorization code DGI-PAC-AUTH-9948217.',
    type: 'payment',
    read: false,
    timestamp: '11m ago',
    actionUrl: '/fiscal'
  },
  {
    id: 'notif_03',
    title: 'Low Stock Alert: OmniSmart Watch Series 5',
    message: 'Only 3 units remaining across all warehouses. Minimum threshold is 8.',
    type: 'inventory',
    read: false,
    timestamp: '45m ago',
    actionUrl: '/inventory'
  },
  {
    id: 'notif_04',
    title: 'AI Business Summary Generated',
    message: 'Weekly sales velocity is +18.4% above target. Multiplaza branch leads conversion.',
    type: 'ai',
    read: true,
    timestamp: '2h ago',
    actionUrl: '/analytics'
  },
  {
    id: 'notif_05',
    title: 'New Enterprise Deal Moved to Negotiation',
    message: 'Banco Continental Panama ($65,000) reached 80% win probability.',
    type: 'lead',
    read: true,
    timestamp: '4h ago',
    actionUrl: '/crm/pipeline'
  }
];

export const mockAuditLogs: AuditLogItem[] = [
  {
    id: 'audit_01',
    timestamp: '2026-09-28 11:15:22',
    user: 'Alexander Sterling',
    role: 'Owner',
    action: 'PAC Fiscal Settings Updated',
    module: 'Fiscal Billing',
    entity: 'Provider Configuration [The Factory HKA]',
    ipAddress: '190.140.88.12 (Panama)',
    status: 'Success'
  },
  {
    id: 'audit_02',
    timestamp: '2026-09-28 10:45:09',
    user: 'Sofia Chen',
    role: 'Cashier',
    action: 'Cash Register Session Opened',
    module: 'POS',
    entity: 'Register 01 (Float $500.00)',
    ipAddress: '10.0.1.42 (Internal POS Terminal)',
    status: 'Success'
  },
  {
    id: 'audit_03',
    timestamp: '2026-09-28 09:30:18',
    user: 'Carlos Santillan',
    role: 'Manager',
    action: 'Discount Applied (Over limit)',
    module: 'Ecommerce',
    entity: 'Order #ORD-2026-0891 ($50.00 VIP Coupon)',
    ipAddress: '190.140.88.54 (Panama)',
    status: 'Success'
  },
  {
    id: 'audit_04',
    timestamp: '2026-09-28 08:12:00',
    user: 'External System',
    role: 'API Key',
    action: 'Webhook Delivery Retry',
    module: 'Payments API',
    entity: 'Event: invoice.payment_succeeded',
    ipAddress: '54.210.12.8 (Cloudflare Edge)',
    status: 'Success'
  }
];

export const mockSupportTickets: SupportTicket[] = [
  {
    id: 'tkt_01',
    ticketNumber: 'SUP-4091',
    subject: 'Panama DGI PAC Certificate Renewal Sync',
    category: 'Fiscal PAC',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-09-27 14:20',
    lastReply: 'Support Tier 2: Validating digital signature chain.'
  },
  {
    id: 'tkt_02',
    ticketNumber: 'SUP-4092',
    subject: 'Bluetooth Barcode Scanner Pair Disconnect at Mall Branch',
    category: 'POS Hardware',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-09-28 08:45',
    lastReply: 'Awaiting Merchant response on hardware model.'
  },
  {
    id: 'tkt_03',
    ticketNumber: 'SUP-4088',
    subject: 'Custom Domain SSL Auto-Provisioning for store.acmeretail.com',
    category: 'Website',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-09-24 11:00',
    lastReply: 'Certificate active via Let’s Encrypt edge proxy.'
  }
];

export const mockWebsitePages: WebsitePage[] = [
  {
    id: 'pg_home',
    title: 'Home - Premium Lifestyle & Tech',
    slug: '/',
    status: 'published',
    seoTitle: 'Acme Retail | Premium Electronics & Smart Living Panama',
    seoDescription: 'Discover the latest ultrabooks, ANC audio, ergonomic furniture and smart tech in Panama with fast nationwide delivery.',
    updatedAt: '2026-09-28',
    sections: [
      {
        id: 'sec_01',
        type: 'Hero',
        title: 'Empowering Modern Enterprise with Next-Gen Hardware',
        subtitle: 'Experience precision engineering, seamless ergonomics, and instant local delivery in Panama.',
        content: 'Discover our curated selection of flagship workstations, executive furniture, and audio systems.',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200',
        buttonText: 'Explore Catalog',
        buttonUrl: '/ecommerce',
        isVisible: true,
        order: 1
      },
      {
        id: 'sec_02',
        type: 'Features',
        title: 'Why Panama’s Top Enterprises Trust Acme',
        content: 'Official warranties, authorized DGI fiscal invoicing, same-day express delivery, and dedicated business concierge.',
        isVisible: true,
        order: 2
      },
      {
        id: 'sec_03',
        type: 'Products',
        title: 'Featured Business Essentials',
        content: 'Top rated gear selected by our enterprise specialists.',
        isVisible: true,
        order: 3
      },
      {
        id: 'sec_04',
        type: 'Testimonials',
        title: 'Trusted by Over 500+ Regional Companies',
        content: 'Hear how leading law firms, banks, and creative studios outfitted their teams with Acme.',
        isVisible: true,
        order: 4
      },
      {
        id: 'sec_05',
        type: 'CTA',
        title: 'Ready to Upgrade Your Corporate Tech Fleet?',
        content: 'Connect with an enterprise account executive today for special B2B corporate pricing.',
        buttonText: 'Request Business Quote',
        buttonUrl: '/crm/leads',
        isVisible: true,
        order: 5
      }
    ]
  },
  {
    id: 'pg_about',
    title: 'About Acme Retail',
    slug: '/about',
    status: 'published',
    seoTitle: 'About Us | Acme Retail Panama',
    seoDescription: 'Our story, values, and commitment to business technological advancement in Central America.',
    updatedAt: '2026-09-20',
    sections: [
      {
        id: 'sec_ab_01',
        type: 'About',
        title: 'Pioneering Enterprise Retail in Panama since 2021',
        content: 'Founded with a mission to eliminate fragmented vendor networks, Acme Retail brings international hardware standards to local businesses.',
        isVisible: true,
        order: 1
      }
    ]
  },
  {
    id: 'pg_b2b',
    title: 'Corporate & B2B Solutions',
    slug: '/b2b',
    status: 'published',
    seoTitle: 'B2B Solutions & Procurement | Acme Retail',
    seoDescription: 'Tailored procurement, credit terms, and fiscal PAC integration for corporate clients in Panama.',
    updatedAt: '2026-09-22',
    sections: []
  }
];

export const mockWebsiteTemplates: WebsiteTemplate[] = [
  {
    id: 'tmpl_01',
    name: 'Apex Enterprise Modern',
    industry: 'Retail',
    description: 'Sleek dark/light minimalist design tailored for high-ticket electronics, luxury retail and hardware.',
    previewUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
    sectionsCount: 12,
    popular: true
  },
  {
    id: 'tmpl_02',
    name: 'Velox Corporate Advisory',
    industry: 'Services',
    description: 'Prestigious layout for consulting, legal, financial firms and professional service providers.',
    previewUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
    sectionsCount: 10,
    popular: true
  },
  {
    id: 'tmpl_03',
    name: 'Artisan Bistro & Table',
    industry: 'Restaurant',
    description: 'Sensory photography, dynamic menu sections, online table reservations, and delivery showcase.',
    previewUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
    sectionsCount: 9,
    popular: false
  },
  {
    id: 'tmpl_04',
    name: 'OmniDistro Industrial',
    industry: 'Distributor',
    description: 'Bulk catalog navigation, SKU quick search, tiered dealer pricing and warehouse inventory indicators.',
    previewUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600',
    sectionsCount: 14,
    popular: false
  }
];
