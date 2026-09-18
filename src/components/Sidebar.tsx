import React from 'react';
import { 
  Palette, 
  TrendingUp, 
  ShieldAlert, 
  Truck, 
  BarChart3, 
  Settings, 
  CreditCard, 
  ShoppingBag, 
  FileCode, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  pendingOrdersCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  pendingOrdersCount = 1
}) => {
  const navItems = [
    { id: 'form-designer', label: 'Form Designer', icon: Palette },
    { id: 'sales-booster', label: 'Sales Booster', icon: TrendingUp },
    { id: 'fraud-prevention', label: 'Fraud Prevention', icon: ShieldAlert },
    { id: 'delivery-success', label: 'Delivery Success', icon: Truck },
    { id: 'analytics', label: 'Analytics & Orders', icon: BarChart3, badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : undefined },
    { id: 'settings', label: 'Settings & Integrations', icon: Settings },
    { id: 'billing-plans', label: 'Billing Plans', icon: CreditCard, highlight: true },
    { id: 'developer-guide', label: 'Hosting & Partner Guide', icon: FileCode, special: true }
  ];

  return (
    <aside className="w-64 bg-[#ebebeb] dark:bg-[#1c1c1c] border-r border-neutral-200 dark:border-neutral-800 flex flex-col h-[calc(100vh-50px)] select-none">
      {/* App Header in Sidebar */}
      <div className="p-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-xs text-neutral-900 dark:text-white leading-tight flex items-center gap-1.5">
                COD Realistic
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                1-Click Cash on Delivery
              </div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        <div className="px-3 pb-1 text-[10px] font-semibold tracking-wider uppercase text-neutral-400">
          Core Features
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm border border-neutral-200/80 dark:border-neutral-700 font-semibold'
                  : item.special
                  ? 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : item.special ? 'text-indigo-500' : 'text-neutral-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {item.highlight && (
                <span className="text-[9px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-1.5 py-0.5 rounded border border-amber-300 dark:border-amber-800 font-bold">
                  Plans
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Status / Help widget at bottom */}
      <div className="p-3 m-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-semibold text-emerald-900 dark:text-emerald-300">
            Active Store Plan
          </span>
          <span className="text-[10px] bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.2 rounded font-bold">
            Free
          </span>
        </div>
        <p className="text-[10px] text-emerald-700 dark:text-emerald-400 mb-2 leading-relaxed">
          Pakistan Free Plan: 4 / 100 orders used this month
        </p>
        <div className="w-full bg-emerald-200 dark:bg-emerald-900 rounded-full h-1.5 overflow-hidden">
          <div className="bg-emerald-600 h-1.5 rounded-full w-[4%]"></div>
        </div>
      </div>
    </aside>
  );
};
