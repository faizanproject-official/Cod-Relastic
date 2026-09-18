import React, { useState } from 'react';
import { FormSettings } from '../types';
import { TrendingUp, Zap, Sparkles, Clock, ShoppingCart, Percent, Check, AlertCircle } from 'lucide-react';

interface SalesBoosterProps {
  settings: FormSettings;
  onUpdateSettings: (newSettings: FormSettings) => void;
}

export const SalesBooster: React.FC<SalesBoosterProps> = ({ settings, onUpdateSettings }) => {
  const [stickyBarEnabled, setStickyBarEnabled] = useState(true);
  const [liveVisitorsCounter, setLiveVisitorsCounter] = useState(true);
  const [visitorCount, setVisitorCount] = useState(14);
  const [countdownUrgency, setCountdownUrgency] = useState(true);
  const [upsellInPopup, setUpsellInPopup] = useState(true);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
            Sales Booster &amp; Conversion Optimizer
          </h1>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-2 py-0.5 rounded">
            Average +38% COD Orders
          </span>
        </div>
        <p className="text-xs text-neutral-500 mt-0.5">
          Tools and widgets designed to increase Average Order Value (AOV) and push impulsive cash on delivery orders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quantity Bundles Configuration */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              Quantity Offers &amp; Bundle Discounts
            </h3>
          </div>
          <p className="text-xs text-neutral-500">
            Show tiered quantity pricing directly inside the COD popup form so customers buy 2 or 3 items instead of 1.
          </p>

          <div className="space-y-2">
            {settings.quantityOffers.map((offer, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-neutral-900 dark:text-white">{offer.title}</span>
                  <span className="text-neutral-500 block text-[11px]">{offer.discountText}</span>
                </div>
                <div className="font-bold text-emerald-600">
                  Rs. {offer.price}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky COD Bar on Mobile */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                Sticky COD Bottom Bar (Mobile)
              </h3>
            </div>
            <input
              type="checkbox"
              checked={stickyBarEnabled}
              onChange={(e) => setStickyBarEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
          </div>
          <p className="text-xs text-neutral-500">
            Pins a floating "🚚 Cash on Delivery" button at the bottom of customer's mobile screen when they scroll down the product description.
          </p>
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs flex items-center justify-between">
            <span className="font-medium text-neutral-700 dark:text-neutral-300">Sticky Bar Status:</span>
            <span className={`font-bold ${stickyBarEnabled ? 'text-emerald-600' : 'text-neutral-400'}`}>
              {stickyBarEnabled ? 'Active on All Mobile Devices' : 'Disabled'}
            </span>
          </div>
        </div>

        {/* Urgency Timer */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                Delivery Urgency &amp; Countdown
              </h3>
            </div>
            <input
              type="checkbox"
              checked={countdownUrgency}
              onChange={(e) => setCountdownUrgency(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
          </div>
          <p className="text-xs text-neutral-500">
            Calculates the estimated delivery window automatically based on current time (e.g., "Order within 14h 38m for Monday delivery").
          </p>
        </div>

        {/* Social Proof Live Visitors */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                Live Viewers Social Proof
              </h3>
            </div>
            <input
              type="checkbox"
              checked={liveVisitorsCounter}
              onChange={(e) => setLiveVisitorsCounter(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
          </div>
          <p className="text-xs text-neutral-500">
            Displays a subtle notification on product page: "🔥 {visitorCount} people are viewing this product right now".
          </p>
        </div>
      </div>
    </div>
  );
};
