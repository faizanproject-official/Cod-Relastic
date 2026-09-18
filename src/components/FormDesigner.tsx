import React, { useState } from 'react';
import { FormSettings } from '../types';
import { 
  Palette, 
  Type, 
  Sliders, 
  Smartphone, 
  Clock, 
  ShieldCheck, 
  Check, 
  Eye, 
  Sparkles,
  Layers,
  Plus,
  Trash2,
  Package
} from 'lucide-react';

interface FormDesignerProps {
  settings: FormSettings;
  onUpdateSettings: (newSettings: FormSettings) => void;
  onPreviewInStore: () => void;
}

export const FormDesigner: React.FC<FormDesignerProps> = ({
  settings,
  onUpdateSettings,
  onPreviewInStore
}) => {
  const [activeTab, setActiveTab] = useState<'button' | 'fields' | 'offers' | 'styling'>('button');
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');

  // Preview form state
  const [testQty, setTestQty] = useState(1);
  const [testFullName, setTestFullName] = useState('');
  const [testPhone, setTestPhone] = useState('');
  const [testCity, setTestCity] = useState(settings.citiesList[0] || 'Karachi');
  const [testAddress, setTestAddress] = useState('');
  const [orderPlacedAlert, setOrderPlacedAlert] = useState(false);

  const updateSetting = <K extends keyof FormSettings>(key: K, value: FormSettings[K]) => {
    onUpdateSettings({
      ...settings,
      [key]: value
    });
  };

  const addQuantityOffer = () => {
    const nextQty = settings.quantityOffers.length + 1;
    const newOffer = {
      qty: nextQty,
      title: `${nextQty} Bottles Pack`,
      discountText: `Save Rs. ${nextQty * 200}`,
      price: nextQty * 1200,
      badge: nextQty === 2 ? 'Popular' : undefined
    };
    updateSetting('quantityOffers', [...settings.quantityOffers, newOffer]);
  };

  const removeQuantityOffer = (index: number) => {
    const updated = settings.quantityOffers.filter((_, idx) => idx !== index);
    updateSetting('quantityOffers', updated);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
              Form Designer
            </h1>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-2 py-0.5 rounded">
              High Converting
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Customize how the 1-Click COD button and order popup looks on your Shopify storefront.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPreviewInStore}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Test on HerbiVital Storefront</span>
          </button>
        </div>
      </div>

      {/* 2-Column Layout: Controls on Left, Live Interactive Mockup on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Controls Tabs & Customization */}
        <div className="lg:col-span-6 space-y-4">
          {/* Sub-Tabs */}
          <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/40 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('button')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'button'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              COD Button
            </button>
            <button
              onClick={() => setActiveTab('fields')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'fields'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Order Fields
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'offers'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Quantity Bundles
            </button>
            <button
              onClick={() => setActiveTab('styling')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'styling'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Urgency & Badges
            </button>
          </div>

          {/* TAB 1: COD Button */}
          {activeTab === 'button' && (
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Main Button Text (As seen on Product Page)
                </label>
                <input
                  type="text"
                  value={settings.buttonText}
                  onChange={(e) => updateSetting('buttonText', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                />
                <p className="text-[11px] text-neutral-500 mt-1">
                  Releasit standard is: "🚚 Buy with Cash on Delivery"
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Subtext under Button (Trust Booster)
                </label>
                <input
                  type="text"
                  value={settings.buttonSubtext}
                  onChange={(e) => updateSetting('buttonSubtext', e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Button Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.buttonColor}
                      onChange={(e) => updateSetting('buttonColor', e.target.value)}
                      className="w-9 h-9 rounded cursor-pointer border border-neutral-300"
                    />
                    <input
                      type="text"
                      value={settings.buttonColor}
                      onChange={(e) => updateSetting('buttonColor', e.target.value)}
                      className="w-24 text-xs px-2 py-1.5 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Button Text Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.buttonTextColor}
                      onChange={(e) => updateSetting('buttonTextColor', e.target.value)}
                      className="w-9 h-9 rounded cursor-pointer border border-neutral-300"
                    />
                    <input
                      type="text"
                      value={settings.buttonTextColor}
                      onChange={(e) => updateSetting('buttonTextColor', e.target.value)}
                      className="w-24 text-xs px-2 py-1.5 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Corner Border Radius ({settings.buttonBorderRadius}px)
                </label>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={settings.buttonBorderRadius}
                  onChange={(e) => updateSetting('buttonBorderRadius', Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>Square (0px)</span>
                  <span>Rounded (8px)</span>
                  <span>Pill (24px)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Order Fields */}
          {activeTab === 'fields' && (
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
                Required Checkout Information
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer">
                  <div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">Customer Full Name</div>
                    <div className="text-[11px] text-neutral-500">Receiver's first and last name</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.requireFullName}
                    onChange={(e) => updateSetting('requireFullName', e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer">
                  <div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">Phone Number (Mandatory for Courier)</div>
                    <div className="text-[11px] text-neutral-500">Includes automatic 11-digit validation for Pakistan</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.requirePhone}
                    onChange={(e) => updateSetting('requirePhone', e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer">
                  <div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">City Selector (Dropdown)</div>
                    <div className="text-[11px] text-neutral-500">Prepopulated with major cities to prevent courier rejection</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.requireCity}
                    onChange={(e) => updateSetting('requireCity', e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer">
                  <div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">Complete Street Address</div>
                    <div className="text-[11px] text-neutral-500">House number, street, sector, landmark</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.requireAddress}
                    onChange={(e) => updateSetting('requireAddress', e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer">
                  <div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">Order Special Instructions / Notes</div>
                    <div className="text-[11px] text-neutral-500">Allow customer to specify preferred delivery time</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.requireNotes}
                    onChange={(e) => updateSetting('requireNotes', e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </label>
              </div>
            </div>
          )}

          {/* TAB 3: Quantity Offers & Bundles */}
          {activeTab === 'offers' && (
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
                    Quantity Discount Offers
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Encourages buyers to purchase 2 or 3 items at a discount directly in the COD popup!
                  </div>
                </div>
                <button
                  onClick={addQuantityOffer}
                  className="flex items-center gap-1 text-xs bg-emerald-600 text-white px-2.5 py-1.5 rounded-md font-semibold hover:bg-emerald-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Tier</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {settings.quantityOffers.map((offer, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-between gap-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-neutral-900 dark:text-white">
                          Qty: {offer.qty}
                        </span>
                        {offer.badge && (
                          <span className="text-[10px] bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-bold px-1.5 rounded">
                            {offer.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                        {offer.title} - <span className="text-emerald-600 font-bold">Rs. {offer.price}</span> ({offer.discountText})
                      </div>
                    </div>

                    {settings.quantityOffers.length > 1 && (
                      <button
                        onClick={() => removeQuantityOffer(idx)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Styling & Urgency */}
          {activeTab === 'styling' && (
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 cursor-pointer">
                  <div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">Show Delivery Urgency Timer</div>
                    <div className="text-[11px] text-neutral-500">"Order in next 14 hours 38 mins to get it by Monday"</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showUrgencyTimer}
                    onChange={(e) => updateSetting('showUrgencyTimer', e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 cursor-pointer">
                  <div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">Display COD Trust Badge</div>
                    <div className="text-[11px] text-neutral-500">Assures customer they only pay upon delivery at their door</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showCodBadge}
                    onChange={(e) => updateSetting('showCodBadge', e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </label>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Urgency Banner Text
                  </label>
                  <input
                    type="text"
                    value={settings.urgencyText}
                    onChange={(e) => updateSetting('urgencyText', e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Live Interactive Preview of COD Form */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wide flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-500" />
              Live Interactive Form Preview
            </span>
            <div className="flex items-center bg-neutral-200 dark:bg-neutral-800 rounded-md p-0.5 text-[11px]">
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`px-2.5 py-1 rounded font-medium ${previewDevice === 'mobile' ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-500'}`}
              >
                Mobile View
              </button>
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`px-2.5 py-1 rounded font-medium ${previewDevice === 'desktop' ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-500'}`}
              >
                Desktop Modal
              </button>
            </div>
          </div>

          {/* Interactive Form Card */}
          <div className={`mx-auto bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-xl overflow-hidden ${previewDevice === 'mobile' ? 'max-w-sm' : 'max-w-md'}`}>
            {/* Form Top Bar */}
            <div className="bg-emerald-800 text-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-700 px-2 py-0.5 rounded">
                  Cash on Delivery Express
                </span>
                <span className="text-xs opacity-80 font-mono">1-Click Fast Checkout</span>
              </div>
              <h3 className="text-base font-bold mt-1.5 leading-snug">
                {settings.formTitle}
              </h3>
              <p className="text-[11px] text-emerald-100 mt-0.5">
                {settings.formSubtitle}
              </p>
            </div>

            {/* Urgency countdown bar */}
            {settings.showUrgencyTimer && (
              <div className="bg-amber-50 dark:bg-amber-950/50 border-b border-amber-200 dark:border-amber-800/60 p-2.5 flex items-center gap-2 text-xs text-amber-900 dark:text-amber-200 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="text-[11px] leading-tight">{settings.urgencyText}</span>
              </div>
            )}

            <div className="p-4 space-y-3.5">
              {/* Product preview & bundle selector */}
              {settings.showQuantityOffers && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Select Package & Discount:
                  </label>
                  <div className="space-y-1.5">
                    {settings.quantityOffers.map((offer) => (
                      <div
                        key={offer.qty}
                        onClick={() => setTestQty(offer.qty)}
                        className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                          testQty === offer.qty
                            ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 text-neutral-900 dark:text-white'
                            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="previewQty"
                            checked={testQty === offer.qty}
                            onChange={() => setTestQty(offer.qty)}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-xs font-semibold">{offer.title}</span>
                          {offer.badge && (
                            <span className="text-[9px] bg-amber-500 text-white font-bold px-1.5 py-0.2 rounded">
                              {offer.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                            Rs. {offer.price}
                          </span>
                          <span className="block text-[10px] text-neutral-400">
                            {offer.discountText}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Input fields */}
              <div className="space-y-2.5 pt-1">
                {settings.requireFullName && (
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Muhammad Bilal"
                      value={testFullName}
                      onChange={(e) => setTestFullName(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                )}

                {settings.requirePhone && (
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Phone Number (Mobile for courier delivery) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="03001234567"
                      value={testPhone}
                      onChange={(e) => setTestPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  {settings.requireCity && (
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={testCity}
                        onChange={(e) => setTestCity(e.target.value)}
                        className="w-full text-xs px-2.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                      >
                        {settings.citiesList.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Payment
                    </label>
                    <div className="text-xs px-2.5 py-2 rounded-lg border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Cash on Delivery</span>
                    </div>
                  </div>
                </div>

                {settings.requireAddress && (
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Complete Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="House #, Street #, Sector / Area"
                      value={testAddress}
                      onChange={(e) => setTestAddress(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Trust Badge */}
              {settings.showCodBadge && (
                <div className="text-center py-1">
                  <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{settings.codBadgeText}</span>
                  </span>
                </div>
              )}

              {/* Submit Button Styled by Merchant */}
              <button
                onClick={() => {
                  setOrderPlacedAlert(true);
                  setTimeout(() => setOrderPlacedAlert(false), 3000);
                }}
                style={{
                  backgroundColor: settings.buttonColor,
                  color: settings.buttonTextColor,
                  borderRadius: `${settings.buttonBorderRadius}px`
                }}
                className="w-full py-3 px-4 text-xs font-bold shadow-md hover:brightness-105 transition-all text-center flex flex-col items-center justify-center cursor-pointer"
              >
                <span>{settings.buttonText}</span>
                {settings.buttonSubtext && (
                  <span className="text-[10px] font-normal opacity-90 mt-0.5">
                    {settings.buttonSubtext}
                  </span>
                )}
              </button>

              {orderPlacedAlert && (
                <div className="bg-emerald-100 text-emerald-800 p-2.5 rounded text-xs text-center font-bold animate-in fade-in">
                  🎉 Test COD Order simulated! Order placed successfully.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
