import React, { useState } from 'react';
import { 
  BarChart3, 
  Copy, 
  Check, 
  MessageSquare, 
  ExternalLink, 
  Eye, 
  Globe, 
  HelpCircle, 
  Info, 
  X, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Play, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  CreditCard, 
  Palette, 
  SlidersHorizontal,
  FileCode,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { FormSettings, CodOrder } from '../types';

interface AppDashboardProps {
  settings: FormSettings;
  orders: CodOrder[];
  onNavigate: (tab: string) => void;
  onOpenStorePreview: () => void;
  merchantEmail?: string;
  storeName?: string;
}

export const AppDashboard: React.FC<AppDashboardProps> = ({
  settings,
  orders,
  onNavigate,
  onOpenStorePreview,
  merchantEmail = "pickhubfazig@gmail.com",
  storeName = "herbivital-2-store"
}) => {
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [copiedAffiliate, setCopiedAffiliate] = useState(false);
  const [affiliateCode, setAffiliateCode] = useState('');
  const [showBalanceInfo, setShowBalanceInfo] = useState(true);
  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  const [coverageOption, setCoverageOption] = useState('none');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isContactsEditOpen, setIsContactsEditOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [emailInput, setEmailInput] = useState(merchantEmail);
  const [whatsappInput, setWhatsappInput] = useState('+92 300 1234567');
  const [themeEmbedEnabled, setThemeEmbedEnabled] = useState(true);

  // Statistics calculation (matching reference screenshot)
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0) + 16300;
  const ordersCount = orders.length + 10;
  const formOpens = ordersCount * 2 + 2;
  const conversionRate = ((ordersCount / formOpens) * 100).toFixed(1);

  const referralLink = "https://codrealistic.com/invite/pakistan-store";

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-5 text-neutral-900 font-sans">
      {/* 1. Page Title matching Image 2 */}
      <div className="pb-1">
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* 2. Theme App Embed Status Card (Matching Releasit Screenshot Top Block) */}
      <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs p-3.5 px-4 flex items-center justify-between transition-all">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-neutral-800">
            Theme App Embed
          </span>
          <button
            onClick={() => setThemeEmbedEnabled(!themeEmbedEnabled)}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all cursor-pointer ${
              themeEmbedEnabled 
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
            }`}
          >
            {themeEmbedEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('form-designer')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-lg transition-all"
          >
            <Palette className="w-3.5 h-3.5 text-neutral-500" />
            <span>Edit Form</span>
          </button>
          <button
            onClick={onOpenStorePreview}
            className="px-3.5 py-1.5 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300/90 text-xs font-semibold rounded-lg shadow-xs transition-all flex items-center gap-1.5"
          >
            <span>Open Theme</span>
          </button>
        </div>
      </div>

      {/* 3. Statistics Row ("Last 7 days:") */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-semibold px-0.5">
          <BarChart3 className="w-3.5 h-3.5 text-neutral-500" />
          <span>Last 7 days:</span>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs overflow-hidden grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          <div className="p-4 sm:p-5 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              {formOpens}
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              Form opens
            </div>
          </div>

          <div className="p-4 sm:p-5 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              {ordersCount}
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              Orders
            </div>
          </div>

          <div className="p-4 sm:p-5 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              PKR {totalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              Revenue
            </div>
          </div>

          <div className="p-4 sm:p-5 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              {conversionRate}%
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              Form conversion rate
            </div>
          </div>
        </div>
      </div>

      {/* 4. Referral / Extended Free Plan Card */}
      <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs p-4 sm:p-5 space-y-3">
        <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
          Share COD Realistic with your friends and give them an <strong className="text-neutral-900 font-bold">EXTENDED FREE PLAN</strong> with <strong className="text-neutral-900 font-bold">200 free orders</strong> / month. The offer will be applied automatically after the app is installed from the link on the right.
        </p>

        <div className="flex items-center gap-2 max-w-lg">
          <div className="flex-1 bg-neutral-100 border border-neutral-200 rounded-lg px-3 py-1.5 text-xs font-mono text-neutral-700 truncate select-all">
            {referralLink}
          </div>
          <button
            onClick={handleCopyReferral}
            className="px-3.5 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
          >
            {copiedReferral ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-500" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5. Billing Plans Announcement Card */}
      <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs p-4 sm:p-5 space-y-3">
        <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
          COD Realistic has new billing plans for Pakistan with <strong className="text-neutral-900 font-bold">lower prices</strong> and <strong className="text-neutral-900 font-bold">more free orders</strong>. Check them out on the <button onClick={() => onNavigate('billing-plans')} className="text-neutral-900 font-bold underline hover:text-emerald-700 cursor-pointer">Billing Plans</button> page, if you have any questions or you need help feel free to contact us!
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="px-3.5 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-neutral-500" />
            <span>Contact us</span>
          </button>
          <button
            onClick={() => onNavigate('billing-plans')}
            className="px-3 py-1.5 text-neutral-700 hover:text-neutral-900 text-xs font-semibold hover:underline"
          >
            View Billing Plans →
          </button>
        </div>
      </div>

      {/* 6. "Your plan:" Card */}
      <div className="space-y-1.5">
        <div className="text-xs font-semibold text-neutral-600 px-0.5">
          Your plan:
        </div>

        <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">
              Forever Free
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              Your active plan on the app is <strong className="text-neutral-900 font-semibold">Forever Free for Pakistan</strong> with <strong className="text-neutral-900 font-semibold">100</strong> processed orders each month. This is your current progress this month:
            </p>
          </div>

          {/* Progress bar matching Screenshot */}
          <div className="space-y-1.5 max-w-md">
            <div className="text-xs font-bold text-neutral-800">
              28 / 100
            </div>
            <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                style={{ width: '28%' }}
              ></div>
            </div>
          </div>

          {/* Limit and Notification Details */}
          <div className="space-y-1 text-xs text-neutral-600 leading-relaxed pt-1">
            <p>
              When you reach your limit the app will <strong className="text-neutral-900 font-semibold">stop creating orders</strong>.
            </p>
            <p>
              The order limit will be reset every first day of the month.
            </p>
            <p className="pt-0.5">
              You will receive 2 automatic notifications when you reach <strong className="text-neutral-900 font-semibold">85%</strong> and <strong className="text-neutral-900 font-semibold">100%</strong> of your limit at <span className="bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-800 font-mono text-[11px]">{merchantEmail}</span>
            </p>
          </div>

          {/* Contact Button */}
          <div className="pt-1 flex items-center gap-3">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-3.5 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-neutral-500" />
              <span>Contact us</span>
            </button>
            <button
              onClick={() => onNavigate('billing-plans')}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
            >
              Upgrade for unlimited orders
            </button>
          </div>
        </div>
      </div>

      {/* 7. Lower Dashboard Grid (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Column 1: Your COD Realistic balance */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-neutral-600 px-0.5">
            Your COD Realistic balance:
          </div>

          <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs p-5 space-y-3.5">
            <div>
              <div className="text-xs text-neutral-500">
                Your account balance:
              </div>
              <div className="text-2xl font-black text-neutral-900 mt-0.5">
                $1.00
              </div>
            </div>

            {/* Blue Informational Box matching Screenshot */}
            {showBalanceInfo && (
              <div className="bg-sky-50 border border-sky-200/90 rounded-lg p-3 text-xs text-sky-900 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    Your balance will be used for your <strong className="font-semibold">SMS messages</strong> and <strong className="font-semibold">Google Autocomplete sessions</strong> (if you have enabled these options).
                  </p>
                </div>
                <button
                  onClick={() => setShowBalanceInfo(false)}
                  className="text-sky-400 hover:text-sky-700 shrink-0 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="text-xs text-neutral-500 leading-relaxed">
              You will receive a notification when your balance is low at
              <div className="mt-1">
                <span className="bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded text-neutral-800 font-mono text-[11px]">
                  {merchantEmail}
                </span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="pt-1 flex flex-wrap gap-2">
              <button
                onClick={() => setIsContactsEditOpen(true)}
                className="px-3 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>✎ Change your contacts</span>
              </button>
              <button
                onClick={() => setIsContactsEditOpen(true)}
                className="px-3 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-300 text-emerald-700 text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Add your WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column 1: Your language */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-neutral-600 px-0.5">
            Your language:
          </div>

          <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs p-5 space-y-4">
            <div>
              <label className="text-xs text-neutral-600 block mb-1.5 font-medium">
                Change app language
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'en' | 'ur')}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-800 appearance-none focus:border-neutral-900 outline-none pr-8 cursor-pointer font-medium"
                >
                  <option value="en">🌐 English</option>
                  <option value="ur">🌐 Urdu (اردو)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-100">
              <div className="text-xs text-neutral-700 font-semibold mb-2">
                Learn how to use the app in 14 minutes:
              </div>
              <button
                onClick={() => setIsTutorialOpen(true)}
                className="w-full py-2.5 bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-neutral-600" />
                <span>Watch tutorial</span>
              </button>
            </div>
          </div>
        </div>

        {/* Left Column 2: Your affiliate code */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-neutral-600 px-0.5">
            Your affiliate code:
          </div>

          <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600 font-medium">
                Register your affiliate code
              </span>
              <span className="text-[10px] text-neutral-500 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-full font-medium">
                {affiliateCode ? 'Registered' : 'Not registered'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter affiliate code..."
                value={affiliateCode}
                onChange={(e) => setAffiliateCode(e.target.value)}
                className="flex-1 bg-white border border-neutral-300 rounded-lg px-3 py-1.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-900 outline-none"
              />
              <button
                onClick={() => {
                  if (affiliateCode) {
                    setCopiedAffiliate(true);
                    setTimeout(() => setCopiedAffiliate(false), 2000);
                  }
                }}
                className="px-3.5 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition-all"
              >
                {copiedAffiliate ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column 2: Your coverage */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-neutral-600 px-0.5">
            Your coverage:
          </div>

          <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs p-5 space-y-3">
            <div>
              <label className="text-xs text-neutral-600 block mb-1.5 font-medium">
                Apply your coverage
              </label>
              <div className="relative">
                <select
                  value={coverageOption}
                  onChange={(e) => setCoverageOption(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-800 appearance-none focus:border-neutral-900 outline-none pr-8 cursor-pointer"
                >
                  <option value="none">No coverage</option>
                  <option value="standard">Standard Pakistan Courier Coverage</option>
                  <option value="trax">Trax Guaranteed Return Insurance</option>
                  <option value="full">Full Delivery Protection</option>
                </select>
                <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Bottom Footer (Matching Reference Screenshot) */}
      <footer className="pt-8 pb-6 text-center space-y-1 select-none">
        <div className="text-sm font-black tracking-tight text-neutral-700">
          COD Realistic
        </div>
        <div className="text-[11px] text-neutral-400">
          © COD Realistic 2026
        </div>
      </footer>

      {/* Floating Support Bubble in Bottom-Right */}
      <button
        onClick={() => setIsContactModalOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 hover:scale-105 active:scale-95 text-white shadow-xl flex items-center justify-center transition-all z-30 cursor-pointer"
        aria-label="Support chat"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* CONTACT US MODAL */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Contact COD Realistic Support</span>
              </h3>
              <button onClick={() => setIsContactModalOpen(false)} className="text-neutral-400 hover:text-neutral-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              We are here to help you set up your Cash on Delivery form, Trax/Leopard integrations, and custom billing plans for your Shopify store.
            </p>

            <div className="space-y-2 text-xs">
              <a 
                href="https://wa.me/923001234567" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100/70 text-emerald-900 transition-all font-semibold"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Live Support (Pakistan)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </a>

              <a 
                href="mailto:support@codrealistic.com" 
                className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 transition-all font-semibold"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-neutral-600" />
                  <span>Email Support (24/7 Response)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-600" />
              </a>
            </div>

            <button
              onClick={() => setIsContactModalOpen(false)}
              className="w-full py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* CHANGE CONTACTS MODAL */}
      {isContactsEditOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-bold text-base text-neutral-900">
                Update Notification Contacts
              </h3>
              <button onClick={() => setIsContactsEditOpen(false)} className="text-neutral-400 hover:text-neutral-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Email address</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-xs focus:border-neutral-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">WhatsApp phone number</label>
                <input
                  type="tel"
                  value={whatsappInput}
                  onChange={(e) => setWhatsappInput(e.target.value)}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-xs focus:border-neutral-900 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsContactsEditOpen(false)}
                className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsContactsEditOpen(false)}
                className="px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-lg text-xs font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WATCH TUTORIAL MODAL */}
      {isTutorialOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-600" />
                <span>COD Realistic Quick Walkthrough</span>
              </h3>
              <button onClick={() => setIsTutorialOpen(false)} className="text-neutral-400 hover:text-neutral-700 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-700 leading-relaxed">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                <strong className="text-neutral-900 block font-semibold">1. Form Customization</strong>
                <p>Open <strong>Form Designer</strong> to change your COD button color, layout (Legacy or Modern), and enable 1-Click order confirmation.</p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                <strong className="text-neutral-900 block font-semibold">2. Fraud Protection &amp; OTP</strong>
                <p>Prevent fake and bogus orders by turning on SMS OTP or blocking repeated non-serious phone numbers.</p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                <strong className="text-neutral-900 block font-semibold">3. Shopify Theme Embed</strong>
                <p>Enable the App Embed in your Shopify Theme Editor to activate the "Buy with Cash on Delivery" button on all product pages instantly.</p>
              </div>
            </div>

            <button
              onClick={() => setIsTutorialOpen(false)}
              className="w-full py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-lg"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
