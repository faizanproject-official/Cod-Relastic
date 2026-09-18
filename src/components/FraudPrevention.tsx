import React, { useState } from 'react';
import { FraudSettings } from '../types';
import { ShieldAlert, PhoneCall, Ban, MessageSquare, Check, Plus, Trash2, ShieldCheck, AlertTriangle } from 'lucide-react';

interface FraudPreventionProps {
  settings: FraudSettings;
  onUpdateSettings: (newSettings: FraudSettings) => void;
}

export const FraudPrevention: React.FC<FraudPreventionProps> = ({ settings, onUpdateSettings }) => {
  const [newBlockedNumber, setNewBlockedNumber] = useState('');
  const [newBlockedPincode, setNewBlockedPincode] = useState('');
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  const updateSetting = <K extends keyof FraudSettings>(key: K, value: FraudSettings[K]) => {
    onUpdateSettings({
      ...settings,
      [key]: value
    });
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 2000);
  };

  const handleAddBlockedNumber = () => {
    if (!newBlockedNumber.trim()) return;
    updateSetting('blockedPhoneNumbers', [...settings.blockedPhoneNumbers, newBlockedNumber.trim()]);
    setNewBlockedNumber('');
  };

  const handleRemoveBlockedNumber = (number: string) => {
    updateSetting('blockedPhoneNumbers', settings.blockedPhoneNumbers.filter(n => n !== number));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
              Fraud Prevention &amp; RTO Reducer
            </h1>
            <span className="text-[10px] bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 font-bold px-2 py-0.5 rounded">
              Stops Fake COD Orders
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Prevent Return To Origin (RTO) parcels, block repeat prank orders, and verify phone numbers before dispatching.
          </p>
        </div>

        {showSaveAlert && (
          <div className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            <span>Settings saved</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OTP Verification */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                SMS OTP Verification (One-Time Password)
              </h3>
            </div>
            <input
              type="checkbox"
              checked={settings.enableOtpVerification}
              onChange={(e) => updateSetting('enableOtpVerification', e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Sends a 4-digit SMS OTP code to customer's mobile number before accepting the COD order. Ensures the phone number is active and genuine.
          </p>
          <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-xs space-y-1">
            <span className="text-neutral-500">Supported SMS Gateways:</span>
            <div className="font-medium text-neutral-800 dark:text-neutral-200">
              Twilio, BrandSMS Pakistan, Sendinblue, Telesign
            </div>
          </div>
        </div>

        {/* Duplicate Order Limiter */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              Prevent Duplicate Impulsive Clicks
            </h3>
          </div>
          <p className="text-xs text-neutral-500">
            Blocks customers from accidentally placing 2 or 3 duplicate orders for the same item within minutes.
          </p>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Block identical orders for {settings.blockDuplicateOrdersMinutes} minutes
            </label>
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={settings.blockDuplicateOrdersMinutes}
              onChange={(e) => updateSetting('blockDuplicateOrdersMinutes', Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>
        </div>

        {/* WhatsApp Confirmation Link */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                1-Click WhatsApp Order Confirmation
              </h3>
            </div>
            <input
              type="checkbox"
              checked={settings.requireWhatsappConfirmation}
              onChange={(e) => updateSetting('requireWhatsappConfirmation', e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
          </div>
          <p className="text-xs text-neutral-500">
            Automatically sends a pre-filled WhatsApp message link to the customer immediately after placing the order so they confirm their address.
          </p>
        </div>

        {/* Blacklisted Numbers */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Ban className="w-4 h-4 text-red-600" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              Blocked Fake Phone Numbers Blacklist
            </h3>
          </div>
          <p className="text-xs text-neutral-500">
            Numbers that repeatedly reject parcels at the doorstep will be instantly blocked from placing COD orders.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="03XXXXXXXXX"
              value={newBlockedNumber}
              onChange={(e) => setNewBlockedNumber(e.target.value)}
              className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
            />
            <button
              onClick={handleAddBlockedNumber}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Block</span>
            </button>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pt-1">
            {settings.blockedPhoneNumbers.map((num) => (
              <div key={num} className="flex items-center justify-between p-2 rounded bg-neutral-100 dark:bg-neutral-800 text-xs font-mono">
                <span>{num}</span>
                <button
                  onClick={() => handleRemoveBlockedNumber(num)}
                  className="text-neutral-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
