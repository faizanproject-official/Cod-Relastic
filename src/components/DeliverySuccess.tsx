import React, { useState } from 'react';
import { CourierIntegration } from '../types';
import { initialCouriers } from '../data/mockData';
import { Truck, CheckCircle2, RefreshCw, ExternalLink, Settings2, ShieldCheck, MapPin } from 'lucide-react';

export const DeliverySuccess: React.FC = () => {
  const [couriers, setCouriers] = useState<CourierIntegration[]>(initialCouriers);
  const [selectedCourierForConfig, setSelectedCourierForConfig] = useState<CourierIntegration | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState('');

  const toggleConnection = (id: string) => {
    setCouriers(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: c.status === 'connected' ? 'not_connected' : 'connected'
        };
      }
      return c;
    }));
  };

  const toggleAutoBook = (id: string) => {
    setCouriers(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          autoBookConsignment: !c.autoBookConsignment
        };
      }
      return c;
    }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
            Delivery Success &amp; Courier Logistics
          </h1>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-2 py-0.5 rounded">
            Auto Consignment Booking
          </span>
        </div>
        <p className="text-xs text-neutral-500 mt-0.5">
          Connect your courier API accounts to auto-generate tracking numbers, shipping air waybills (AWB), and book rider pickups.
        </p>
      </div>

      {/* Courier Integrations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {couriers.map((courier) => (
          <div
            key={courier.id}
            className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-black text-xs tracking-wider">
                    {courier.logoText}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                      {courier.name}
                    </h3>
                    <span className="text-[10px] text-neutral-500">{courier.country} Logistics</span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  courier.status === 'connected'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                }`}>
                  {courier.status === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </div>

              <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
                <label className="flex items-center justify-between cursor-pointer p-2 rounded bg-neutral-50 dark:bg-neutral-800/50">
                  <span>Auto-book parcel on order confirmation</span>
                  <input
                    type="checkbox"
                    checked={courier.autoBookConsignment}
                    disabled={courier.status !== 'connected'}
                    onChange={() => toggleAutoBook(courier.id)}
                    className="w-3.5 h-3.5 rounded text-emerald-600"
                  />
                </label>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex gap-2">
              <button
                onClick={() => toggleConnection(courier.id)}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  courier.status === 'connected'
                    ? 'border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                }`}
              >
                {courier.status === 'connected' ? 'Disconnect' : 'Connect API'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
