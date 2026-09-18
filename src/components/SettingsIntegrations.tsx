import React, { useState } from 'react';
import { Settings, FileCode, Check, Copy, Sparkles, ExternalLink, Globe, ShieldCheck } from 'lucide-react';

export const SettingsIntegrations: React.FC = () => {
  const [googleSheetsConnected, setGoogleSheetsConnected] = useState(true);
  const [metaPixelId, setMetaPixelId] = useState('149203948572019');
  const [tiktokPixelId, setTiktokPixelId] = useState('C8J301KD93N102');
  const [copiedScript, setCopiedScript] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const embedScript = `<!-- COD Realistic 1-Click Fast Checkout Embed -->
<script>
  window.CodRealisticConfig = {
    shop: "herbivital-2-store.myshopify.com",
    appUrl: "https://your-app-domain.run.app",
    primaryColor: "#059669",
    buttonText: "🚚 Buy with Cash on Delivery",
    pixelEvent: "Purchase"
  };
</script>
<script src="https://your-app-domain.run.app/cdn/cod-realistic.min.js" async></script>
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
            Settings &amp; Integrations
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Connect Ad tracking pixels, Google Sheets for dispatch team, and embed scripts.
          </p>
        </div>

        {saveSuccess && (
          <div className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            <span>Settings saved successfully</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ad Pixels Tracking */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
          <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Ad Pixels (Meta &amp; TikTok Purchase Events)</span>
          </h3>
          <p className="text-xs text-neutral-500">
            Fires standard <strong>Purchase</strong> events into your Facebook / Meta and TikTok ads manager with the exact COD order value immediately upon form submission!
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Meta / Facebook Pixel ID
              </label>
              <input
                type="text"
                value={metaPixelId}
                onChange={(e) => setMetaPixelId(e.target.value)}
                placeholder="e.g. 149203948572019"
                className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                TikTok Pixel ID
              </label>
              <input
                type="text"
                value={tiktokPixelId}
                onChange={(e) => setTiktokPixelId(e.target.value)}
                placeholder="e.g. C8J301KD93N102"
                className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-mono"
              />
            </div>

            <button
              onClick={handleSave}
              className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              Save Pixel Settings
            </button>
          </div>
        </div>

        {/* Google Sheets Integration */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
          <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>Google Sheets Auto-Sync for Warehouse</span>
          </h3>
          <p className="text-xs text-neutral-500">
            Every time a customer places an order via COD Realistic, a new row is automatically appended to your shared Google Sheet for packing and printing labels.
          </p>

          <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600 dark:text-neutral-400">Sync Status:</span>
              <span className="font-bold text-emerald-600">Active (Live Syncing)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600 dark:text-neutral-400">Sheet:</span>
              <span className="font-mono text-neutral-800 dark:text-neutral-200">HerbiVital_COD_Orders_2026</span>
            </div>
          </div>

          <button
            onClick={() => setGoogleSheetsConnected(!googleSheetsConnected)}
            className="py-2 px-4 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg text-xs font-semibold"
          >
            {googleSheetsConnected ? 'Reconnect Google Account' : 'Connect Google Sheets'}
          </button>
        </div>

        {/* Manual HTML / Liquid Embed Code */}
        <div className="md:col-span-2 bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-600" />
              <span>Theme Embed Code Snippet</span>
            </h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-xs font-semibold"
            >
              {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedScript ? 'Copied' : 'Copy Script'}</span>
            </button>
          </div>
          <p className="text-xs text-neutral-500">
            For older Shopify Vintage themes (or custom headless storefronts), paste this code snippet right before the <code>&lt;/body&gt;</code> tag in your <code>theme.liquid</code> file.
          </p>
          <pre className="text-[11px] font-mono bg-neutral-950 text-neutral-200 p-4 rounded-xl overflow-x-auto">
            {embedScript}
          </pre>
        </div>
      </div>
    </div>
  );
};
