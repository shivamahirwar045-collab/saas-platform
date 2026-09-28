'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { GlobalSearchModal } from '../modals/GlobalSearchModal';
import { AICopilotDrawer } from '../modals/AICopilotDrawer';
import { Breadcrumbs } from '../ui/Breadcrumbs';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Sidebar for Desktop & Mobile */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area offset by Sidebar on lg screens */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopNav onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-4">
          <Breadcrumbs />
          {children}
        </main>
      </div>

      {/* Global Modals & Copilot Drawer */}
      <GlobalSearchModal />
      <AICopilotDrawer />
    </div>
  );
}
