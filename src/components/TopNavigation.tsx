import React from 'react';
import { 
  Store, 
  ExternalLink, 
  Bell, 
  Search, 
  ShieldCheck, 
  Code2, 
  Layers, 
  Sparkles 
} from 'lucide-react';

interface TopNavigationProps {
  currentView: string;
  onSelectView: (view: string) => void;
  activeMode: 'admin' | 'storefront' | 'developer-guide';
  setActiveMode: (mode: 'admin' | 'storefront' | 'developer-guide') => void;
  storeName?: string;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeMode,
  setActiveMode,
  storeName = "herbivital-2-store"
}) => {
  return (
    <header className="bg-[#1a1a1a] text-white border-b border-neutral-800 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* Left: Shopify Logo & Store info */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-neutral-900 px-3 py-1.5 rounded-md border border-neutral-700">
            <svg className="w-5 h-5 text-[#95BF47] fill-current" viewBox="0 0 24 24">
              <path d="M19.64 6.78c-.04-.3-.32-.47-.56-.47-.23 0-3.32.22-3.32.22s-2.2-2.2-2.43-2.43c-.23-.23-.68-.16-.86.06-.03.04-1.28 1.74-2.18 2.97-.88-.41-1.89-.64-2.99-.64-3.52 0-6.38 2.86-6.38 6.38 0 2.9 1.94 5.35 4.6 6.13l1.83 5.4c.14.41.52.68.96.68.1 0 .2-.02.3-.05.53-.18 6.34-2.18 8.01-2.77.78-.28 1.34-1.01 1.34-1.85V7.07c0-.1-.01-.2-.04-.29z"/>
            </svg>
            <span className="text-xs font-semibold text-neutral-300">Shopify Admin</span>
            <span className="text-neutral-500 text-xs">/</span>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
              {storeName}.myshopify.com
            </span>
          </div>

          {/* App title badge */}
          <div className="hidden md:flex items-center space-x-2 pl-2 border-l border-neutral-700">
            <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              COD
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold text-sm tracking-wide text-white">COD Realistic</span>
              <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded font-mono border border-neutral-700">
                v2.4.0
              </span>
            </div>
          </div>
        </div>

        {/* Center: Interactive Mode Switcher for User Experience */}
        <div className="flex items-center bg-neutral-900 p-1 rounded-lg border border-neutral-700">
          <button
            onClick={() => setActiveMode('admin')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeMode === 'admin'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>App Admin</span>
          </button>

          <button
            onClick={() => setActiveMode('storefront')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeMode === 'storefront'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Live Store Preview</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </button>

          <button
            onClick={() => setActiveMode('developer-guide')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeMode === 'developer-guide'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="font-semibold">Developer Hosting Guide</span>
            <span className="text-[10px] bg-indigo-950 text-indigo-300 px-1 rounded border border-indigo-700">
              اردو / Eng
            </span>
          </button>
        </div>

        {/* Right controls */}
        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2 text-xs text-neutral-400 bg-neutral-900/90 border border-neutral-700/60 px-2.5 py-1 rounded">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>COD Security: Active</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-xs font-bold text-white shadow">
            CR
          </div>
        </div>
      </div>
    </header>
  );
};
