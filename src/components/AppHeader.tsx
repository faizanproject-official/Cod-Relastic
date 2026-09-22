import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreHorizontal, 
  Palette, 
  CreditCard, 
  TrendingUp, 
  ShieldAlert, 
  Truck, 
  BarChart3, 
  Settings, 
  FileCode, 
  Store, 
  LayoutDashboard, 
  ExternalLink,
  ChevronDown,
  Check
} from 'lucide-react';

interface AppHeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenStorePreview: () => void;
  onOpenDeveloperGuide: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenStorePreview,
  onOpenDeveloperGuide
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'form-designer', label: 'Form Designer', icon: Palette },
    { id: 'billing-plans', label: 'Billing Plans', icon: CreditCard },
    { id: 'sales-booster', label: 'Sales Booster', icon: TrendingUp },
    { id: 'fraud-prevention', label: 'Fraud Prevention', icon: ShieldAlert },
    { id: 'delivery-success', label: 'Delivery Success', icon: Truck },
    { id: 'analytics', label: 'Analytics & Orders', icon: BarChart3 },
    { id: 'settings', label: 'Settings & Integrations', icon: Settings },
  ];

  return (
    <header className="bg-white border-b border-neutral-200/80 sticky top-0 z-30 px-4 sm:px-6 py-2.5 flex items-center justify-between">
      {/* Left: App Identity matching Releasit Screenshot (Icon + Name) */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onSelectTab('dashboard')}
          className="flex items-center gap-2 text-left group cursor-pointer"
        >
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-amber-500 via-orange-500 to-sky-500 text-white flex items-center justify-center font-bold text-[11px] shadow-xs">
            <span className="tracking-tight font-black">R</span>
          </div>
          <span className="font-bold text-sm text-neutral-900 tracking-tight group-hover:text-blue-600 transition-colors">
            Releasit COD Form
          </span>
        </button>

        {currentTab !== 'dashboard' && currentTab !== 'form-designer' && (
          <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 font-medium transition-colors"
            >
              <span>← Back to Dashboard</span>
            </button>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-semibold text-neutral-900 capitalize">
              {currentTab.replace('-', ' ')}
            </span>
          </div>
        )}
      </div>

      {/* Right: Quick actions and Shopify-style "..." overflow menu */}
      <div className="flex items-center gap-2">
        {/* Quick shortcut to Live Store Preview */}
        <button
          onClick={onOpenStorePreview}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200/80 text-neutral-800 rounded-lg text-xs font-semibold transition-all shadow-2xs"
          title="Preview on HerbiVital Store"
        >
          <Store className="w-3.5 h-3.5 text-emerald-600" />
          <span>Live Store Preview</span>
        </button>

        {/* Developer Hosting Guide */}
        <button
          onClick={onOpenDeveloperGuide}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100/80 text-indigo-900 border border-indigo-200/80 rounded-lg text-xs font-semibold transition-all"
        >
          <FileCode className="w-3.5 h-3.5 text-indigo-600" />
          <span>Developer Guide</span>
        </button>

        {/* "..." Overflow Menu matching Shopify Polaris pattern in Screenshot */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-8 h-8 rounded-lg hover:bg-neutral-100 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="More actions"
            title="App Navigation & Actions"
          >
            <MoreHorizontal className="w-5 h-5 text-neutral-600" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 text-[10px] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100">
                App Navigation
              </div>

              {menuItems.map(item => {
                const Icon = item.icon;
                const isSelected = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 flex items-center justify-between text-left transition-colors ${
                      isSelected 
                        ? 'bg-neutral-100 text-neutral-900 font-semibold' 
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-neutral-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                );
              })}

              <div className="my-1 border-t border-neutral-100"></div>

              <button
                onClick={() => {
                  onOpenStorePreview();
                  setIsMenuOpen(false);
                }}
                className="w-full px-3 py-2 flex items-center gap-2.5 text-left text-emerald-800 hover:bg-emerald-50 transition-colors font-medium"
              >
                <Store className="w-4 h-4 text-emerald-600" />
                <span>Open Live Store Preview</span>
              </button>

              <button
                onClick={() => {
                  onOpenDeveloperGuide();
                  setIsMenuOpen(false);
                }}
                className="w-full px-3 py-2 flex items-center gap-2.5 text-left text-indigo-800 hover:bg-indigo-50 transition-colors font-medium"
              >
                <FileCode className="w-4 h-4 text-indigo-600" />
                <span>Developer Hosting Guide</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
