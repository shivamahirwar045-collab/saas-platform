import type { Metadata } from 'next';
import './globals.css';
import { SaaSProvider } from '../context/SaaSContext';
import { ToastProvider } from '../components/ui/Toast';

export const metadata: Metadata = {
  title: 'KIAAN All-in-One SaaS Platform | Business Operating System',
  description:
    'One unified platform where a business can manage its digital presence, website, ecommerce, CRM, POS, payments, fiscal billing, inventory, HR, attendance, and marketing powered by AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <SaaSProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </SaaSProvider>
      </body>
    </html>
  );
}
