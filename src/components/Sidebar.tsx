import React from 'react';
import { 
  Palette, 
  TrendingUp, 
  ShieldAlert, 
  Truck, 
  BarChart3, 
  Settings, 
  CreditCard, 
  Store, 
  FileCode,
  Layers
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenStorePreview?: () => void;
  onOpenDeveloperGuide?: () => void;
  pendingOrdersCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenStorePreview,
  onOpenDeveloperGuide,
  pendingOrdersCount = 1
}) => {
  const navItems = [
    { id: 'form-designer', label: 'Form Designer' },
    { id: 'sales-booster', label: 'Sales Booster' },
    { id: 'fraud-prevention', label: 'Fraud Prevention' },
    { id: 'delivery-success', label: 'Delivery Success' },
    { id: 'analytics', label: 'Analytics', badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : undefined },
    { id: 'settings', label: 'Settings & Integrations' },
    { id: 'billing-plans', label: 'Billing Plans' },
  ];

  return (
    <aside className="w-56 sm:w-60 bg-[#ededed] border-r border-neutral-200/90 flex flex-col h-[calc(100vh-50px)] select-none shrink-0 overflow-y-auto">
      <div className="p-3 pt-3.5 space-y-1">
        {/* Top Active Card/Button matching Image 1: Stacked Icon + COD Realistic */}
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-[13px] font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
            currentTab === 'dashboard'
              ? 'bg-white text-neutral-900 shadow-2xs'
              : 'text-neutral-800 hover:bg-neutral-200/70'
          }`}
          title="Go to Dashboard"
        >
          {/* Custom Stacked Plates Icon matching Releasit logo in Image 1 */}
          <div className="w-4 h-4 flex flex-col justify-center gap-[2.5px] shrink-0">
            <span className="w-4 h-[3px] bg-neutral-800 rounded-xs"></span>
            <span className="w-4 h-[3px] bg-neutral-800 rounded-xs"></span>
            <span className="w-4 h-[3px] bg-neutral-800 rounded-xs"></span>
          </div>
          <span className="truncate">COD Realistic</span>
        </button>

        {/* Navigation list matching Image 1 */}
        <div className="space-y-0.5 pt-1 pl-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs sm:text-[13px] transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-white text-neutral-900 font-semibold shadow-2xs'
                    : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/60 font-medium'
                }`}
              >
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtle Bottom Utilities */}
      <div className="mt-auto p-3 pt-2 space-y-1 border-t border-neutral-200/80">
        {onOpenStorePreview && (
          <button
            onClick={onOpenStorePreview}
            className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 font-medium flex items-center gap-2 transition-all cursor-pointer"
          >
            <Store className="w-3.5 h-3.5 text-emerald-600" />
            <span>Store Preview</span>
          </button>
        )}

        {onOpenDeveloperGuide && (
          <button
            onClick={onOpenDeveloperGuide}
            className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 font-medium flex items-center gap-2 transition-all cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-600" />
            <span>Developer Guide</span>
          </button>
        )}
      </div>
    </aside>
  );
};
