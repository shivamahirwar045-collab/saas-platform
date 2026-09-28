'use client';

import React, { useState } from 'react';
import { useSaaS } from '../../context/SaaSContext';
import { Bot, Sparkles, X, Check, ArrowRight, Shield, AlertTriangle } from '../icons';

export function AICopilotDrawer() {
  const { isCopilotOpen, setIsCopilotOpen, copilotMessages, sendCopilotMessage, currentBusiness } = useSaaS();
  const [inputText, setInputText] = useState('');
  const [pendingApproval, setPendingApproval] = useState<string | null>(
    'Auto-create Replenishment Purchase Order PO-2026-0344 for OmniSmart Watch (50 units)'
  );

  const quickPrompts = [
    'Explain inventory status',
    'How are today sales?',
    'Check Panama PAC invoices',
    'Review top enterprise leads',
    'Show branch efficiency'
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendCopilotMessage(text);
    setInputText('');
  };

  return (
    <>
      {/* Floating Copilot Button */}
      <button
        onClick={() => setIsCopilotOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full p-3.5 shadow-xl hover:shadow-2xl flex items-center gap-2.5 transition-all duration-300 group cursor-pointer"
        title="AI Business Copilot"
      >
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="text-xs font-semibold pr-1 hidden sm:inline-block">AI Copilot</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1 right-1 border-2 border-white"></span>
      </button>

      {/* Drawer */}
      {isCopilotOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-2xs flex justify-end animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">AI Business Copilot</h3>
                    <span className="text-[10px] bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate max-w-[200px]">
                    {currentBusiness.name} Intelligence
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCopilotOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Approval Banner (Permission Matrix) */}
            {pendingApproval && (
              <div className="bg-amber-50 border-b border-amber-200/80 p-3.5 flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-amber-900">Action Requires Owner Approval</span>
                    <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">{pendingApproval}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => setPendingApproval(null)}
                    className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-800"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => {
                      alert('Action Approved! Simulated PO-2026-0344 created and queued for supplier transmission.');
                      setPendingApproval(null);
                    }}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-medium flex items-center gap-1 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve & Execute
                  </button>
                </div>
              </div>
            )}

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
              {copilotMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-xs shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-blue-600 mb-1">
                        <Sparkles className="w-3 h-3" /> Copilot Intelligence
                      </div>
                    )}
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Quick Prompts */}
            <div className="p-3 border-t border-slate-100 bg-white">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Suggested Inquiries
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200/80 text-slate-700 px-2.5 py-1 rounded-full transition-colors text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3.5 border-t border-slate-200 bg-white flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSend(inputText);
                }}
                placeholder="Ask about sales, low stock, PAC invoices..."
                className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
              <button
                onClick={() => handleSend(inputText)}
                disabled={!inputText.trim()}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
