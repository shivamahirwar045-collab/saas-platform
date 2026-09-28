'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertTriangle, X, Sparkles } from '../icons';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toast: (options: Omit<ToastMessage, 'id'>) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ type, title, description, duration = 4000 }: Omit<ToastMessage, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, title, description, duration }]);
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast]
  );

  const success = useCallback((title: string, description?: string) => {
    toast({ type: 'success', title, description });
  }, [toast]);

  const error = useCallback((title: string, description?: string) => {
    toast({ type: 'error', title, description });
  }, [toast]);

  const warning = useCallback((title: string, description?: string) => {
    toast({ type: 'warning', title, description });
  }, [toast]);

  const info = useCallback((title: string, description?: string) => {
    toast({ type: 'info', title, description });
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          const icons = {
            success: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />,
            error: <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />,
            warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
            info: <Sparkles className="w-5 h-5 text-blue-500 shrink-0" />
          };

          const borders = {
            success: 'border-emerald-200 bg-white shadow-emerald-500/10',
            error: 'border-rose-200 bg-white shadow-rose-500/10',
            warning: 'border-amber-200 bg-white shadow-amber-500/10',
            info: 'border-blue-200 bg-white shadow-blue-500/10'
          };

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-lg transition-all animate-in slide-in-from-bottom-2 ${borders[t.type]}`}
            >
              {icons[t.type]}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{t.title}</h4>
                {t.description && (
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{t.description}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      toast: () => {},
      success: (title: string) => console.log('Toast success:', title),
      error: (title: string) => console.error('Toast error:', title),
      warning: (title: string) => console.warn('Toast warning:', title),
      info: (title: string) => console.info('Toast info:', title)
    };
  }
  return context;
}
