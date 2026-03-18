/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LayoutDashboard, Globe, Settings, Bell, User, Menu } from 'lucide-react';
import OverseasOrdersTab from './components/OverseasOrdersTab';
import SettingsTab from './components/SettingsTab';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('overseas');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors hidden md:block"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-600 rounded-lg text-white">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">GlobalPay Admin</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-slate-500 p-2 rounded-full hover:bg-slate-100 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold border border-indigo-200">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside 
          className={cn(
            "bg-white border-r border-slate-200 flex-shrink-0 hidden md:flex flex-col transition-all duration-300 ease-in-out",
            isSidebarCollapsed ? "w-20" : "w-64"
          )}
        >
          <nav className="flex-1 px-3 py-6 space-y-2">
            <button
              onClick={() => setActiveTab('overseas')}
              className={cn(
                "w-full flex items-center rounded-lg text-sm font-medium transition-colors",
                isSidebarCollapsed ? "justify-center py-3" : "gap-3 px-3 py-2.5",
                activeTab === 'overseas'
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
              title={isSidebarCollapsed ? "海外支付订单统计" : undefined}
            >
              <Globe className={cn("h-5 w-5 flex-shrink-0", activeTab === 'overseas' ? "text-indigo-600" : "text-slate-400")} />
              {!isSidebarCollapsed && <span className="truncate">海外支付订单统计</span>}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={cn(
                "w-full flex items-center rounded-lg text-sm font-medium transition-colors",
                isSidebarCollapsed ? "justify-center py-3" : "gap-3 px-3 py-2.5",
                activeTab === 'settings'
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
              title={isSidebarCollapsed ? "设置" : undefined}
            >
              <Settings className={cn("h-5 w-5 flex-shrink-0", activeTab === 'settings' ? "text-indigo-600" : "text-slate-400")} />
              {!isSidebarCollapsed && <span>设置</span>}
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in duration-300">
            {activeTab === 'overseas' && <OverseasOrdersTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </main>
      </div>
    </div>
  );
}
