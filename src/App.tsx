import React, { useState } from 'react';
import { TopNavigation } from './components/TopNavigation';
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
  const [currentTab, setCurrentTab] = useState<string>('billing-plans');
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

  const handleSelectSidebarTab = (tab: string) => {
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
      <div className="min-h-screen bg-[#f6f6f7] dark:bg-[#121212] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans">
        <TopNavigation
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          currentView="developer-guide"
          onSelectView={handleSelectSidebarTab}
        />
        <div className="flex-1 overflow-y-auto">
          <DeveloperGuide />
        </div>
      </div>
    );
  }

  // Otherwise in Shopify Admin App mode
  return (
    <div className="min-h-screen bg-[#f6f6f7] dark:bg-[#121212] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans">
      <TopNavigation
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        currentView={currentTab}
        onSelectView={handleSelectSidebarTab}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar matching Releasit Shopify Admin */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={handleSelectSidebarTab}
          pendingOrdersCount={orders.filter(o => o.status === 'Pending').length}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#f6f6f7] dark:bg-[#121212]">
          {currentTab === 'billing-plans' && (
            <BillingPlans
              plans={billingPlansData}
              activePlanId={activePlanId}
              onSelectPlan={setActivePlanId}
            />
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
