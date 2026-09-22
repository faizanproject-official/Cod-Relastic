import React, { useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { AppDashboard } from './components/AppDashboard';
import { Sidebar } from './components/Sidebar';
import { FormDesigner } from './components/FormDesigner';
import { BillingPlans } from './components/BillingPlans';
import { StorefrontSimulation } from './components/StorefrontSimulation';
import { DeveloperGuide } from './components/DeveloperGuide';
import { SalesBooster } from './components/SalesBooster';
import { FraudPrevention } from './components/FraudPrevention';
import { DeliverySuccess } from './components/DeliverySuccess';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsIntegrations } from './components/SettingsIntegrations';

import { 
  initialFormSettings, 
  billingPlansData, 
  initialOrders, 
  initialFraudSettings 
} from './data/mockData';
import { FormSettings, CodOrder, FraudSettings } from './types';

export default function App() {
  const [activeMode, setActiveMode] = useState<'admin' | 'storefront' | 'developer-guide'>('admin');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [formSettings, setFormSettings] = useState<FormSettings>(initialFormSettings);
  const [activePlanId, setActivePlanId] = useState<string>('forever-free');
  const [orders, setOrders] = useState<CodOrder[]>(initialOrders);
  const [fraudSettings, setFraudSettings] = useState<FraudSettings>(initialFraudSettings);

  const handlePlaceOrder = (newOrderData: Omit<CodOrder, 'id' | 'orderNumber' | 'createdAt'>) => {
    const randomNum = Math.floor(1050 + Math.random() * 8900);
    const newOrder: CodOrder = {
      ...newOrderData,
      id: `ORD-${randomNum}`,
      orderNumber: `#COD-${randomNum}`,
      createdAt: 'Just now'
    };

    setOrders(prev => [newOrder, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: CodOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleSelectTab = (tab: string) => {
    if (tab === 'developer-guide') {
      setActiveMode('developer-guide');
    } else {
      setActiveMode('admin');
      setCurrentTab(tab);
    }
  };

  // When in Storefront mode, show full-screen realistic HerbiVital storefront
  if (activeMode === 'storefront') {
    return (
      <StorefrontSimulation
        settings={formSettings}
        onPlaceOrder={handlePlaceOrder}
        onBackToAdmin={() => setActiveMode('admin')}
      />
    );
  }

  // When in Developer Guide mode
  if (activeMode === 'developer-guide') {
    return (
      <div className="min-h-screen bg-[#f6f6f7] text-neutral-900 flex flex-col font-sans">
        <AppHeader
          currentTab="developer-guide"
          onSelectTab={handleSelectTab}
          onOpenStorePreview={() => setActiveMode('storefront')}
          onOpenDeveloperGuide={() => setActiveMode('developer-guide')}
        />
        <div className="flex-1 overflow-y-auto">
          <DeveloperGuide />
        </div>
      </div>
    );
  }

  // Shopify Embedded App mode - Layout with left sidebar matching Image 1
  return (
    <div className="min-h-screen bg-[#f6f6f7] text-neutral-900 flex flex-col font-sans">
      <AppHeader
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenStorePreview={() => setActiveMode('storefront')}
        onOpenDeveloperGuide={() => setActiveMode('developer-guide')}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Fixed vertical sidebar on the left matching Image 1 (hidden on Form Designer for full-width layout matching screenshot) */}
        {currentTab !== 'form-designer' && (
          <Sidebar
            currentTab={currentTab}
            onSelectTab={handleSelectTab}
            onOpenStorePreview={() => setActiveMode('storefront')}
            onOpenDeveloperGuide={() => setActiveMode('developer-guide')}
            pendingOrdersCount={orders.filter(o => o.status === 'Pending').length}
          />
        )}

        {/* Main Dashboard Content to its right */}
        <main className="flex-1 overflow-y-auto bg-[#f6f6f7]">
          {currentTab === 'dashboard' && (
            <AppDashboard
              settings={formSettings}
              orders={orders}
              onNavigate={handleSelectTab}
              onOpenStorePreview={() => setActiveMode('storefront')}
              merchantEmail="pickhubfazig@gmail.com"
              storeName="herbivital-2-store"
            />
          )}

          {currentTab === 'billing-plans' && (
            <div className="max-w-6xl mx-auto px-4 py-6">
              <BillingPlans
                plans={billingPlansData}
                activePlanId={activePlanId}
                onSelectPlan={setActivePlanId}
              />
            </div>
          )}

          {currentTab === 'form-designer' && (
            <FormDesigner
              settings={formSettings}
              onUpdateSettings={setFormSettings}
              onPreviewInStore={() => setActiveMode('storefront')}
            />
          )}

          {currentTab === 'sales-booster' && (
            <SalesBooster
              settings={formSettings}
              onUpdateSettings={setFormSettings}
            />
          )}

          {currentTab === 'fraud-prevention' && (
            <FraudPrevention
              settings={fraudSettings}
              onUpdateSettings={setFraudSettings}
            />
          )}

          {currentTab === 'delivery-success' && (
            <DeliverySuccess />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsIntegrations />
          )}
        </main>
      </div>
    </div>
  );
}
