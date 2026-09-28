'use client';

import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useSaaS } from '../../context/SaaSContext';
import { ModuleStatus } from '../../types/saas';
import { Badge } from '../../components/ui/Badge';
import {
  Layers,
  Check,
  X,
  Sliders,
  Sparkles,
  Shield,
  Building2,
  Lock
} from '../../components/icons';

import { useToast } from '../../components/ui/Toast';

export default function ModuleConfigPage() {
  const { modules, toggleModule, currentBusiness } = useSaaS();
  const { addToast } = useToast();

  const handleApplyPreset = (presetName: string) => {
    addToast(`Preset "${presetName}" applied! Feature flags updated for ${currentBusiness.name}.`, 'success');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Client-Specific Module Configuration
              </h1>
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                Plan: {currentBusiness.plan}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Enable, disable, and tailor capabilities per business tenant without maintaining separate codebases.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleApplyPreset('Retail & Omnichannel')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Apply Retail Preset
            </button>
            <button
              onClick={() => handleApplyPreset('Professional Services')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Apply Services Preset
            </button>
          </div>
        </div>

        {/* Modules Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Feature Flags &amp; Functional Modules</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Toggling a module updates menu navigation and disables background hooks for this tenant.
              </p>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {modules.filter(m => m.enabled).length} of {modules.length} Enabled
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="p-3.5 pl-6">Module Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Plan Required</th>
                  <th className="p-3.5">Custom Fields</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-6 text-right">Module Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {modules.map(mod => {
                  const isComingSoon = mod.status === 'coming_soon';

                  return (
                    <tr key={mod.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 pl-6">
                        <p className="font-bold text-slate-900 text-sm">{mod.name}</p>
                        <p className="text-slate-500 text-[11px] max-w-md mt-0.5 leading-relaxed">
                          {mod.description}
                        </p>
                      </td>
                      <td className="p-3.5">
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono uppercase text-[10px]">
                          {mod.category}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="font-semibold text-slate-700">
                          {mod.planRequired} Plan
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="text-slate-600">
                          {mod.customFieldsCount} configured
                        </span>
                      </td>
                      <td className="p-3.5">
                        <Badge
                          variant={
                            isComingSoon
                              ? 'purple'
                              : mod.enabled
                              ? 'success'
                              : 'default'
                          }
                        >
                          {isComingSoon
                            ? 'Coming Soon'
                            : mod.enabled
                            ? 'Enabled'
                            : 'Disabled'}
                        </Badge>
                      </td>
                      <td className="p-3.5 pr-6 text-right">
                        {isComingSoon ? (
                          <span className="text-xs text-slate-400 flex items-center justify-end gap-1">
                            <Lock className="w-3.5 h-3.5" /> Roadmap
                          </span>
                        ) : (
                          <button
                            onClick={() => toggleModule(mod.id)}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              mod.enabled ? 'bg-blue-600' : 'bg-slate-200'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                mod.enabled ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
