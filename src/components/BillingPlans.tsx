import React, { useState } from 'react';
import { BillingPlan } from '../types';
import { Check, Sparkles, HelpCircle, Tag, ArrowRight, ShieldCheck, CheckCircle2, DollarSign } from 'lucide-react';

interface BillingPlansProps {
  plans: BillingPlan[];
  activePlanId: string;
  onSelectPlan: (planId: string) => void;
}

export const BillingPlans: React.FC<BillingPlansProps> = ({
  plans,
  activePlanId,
  onSelectPlan
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountMessage, setDiscountMessage] = useState('');
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<BillingPlan | null>(null);
  const [isProcessingApproval, setIsProcessingApproval] = useState(false);
  const [approvalSuccess, setApprovalSuccess] = useState(false);

  const handleApplyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    if (code === 'SAVE20' || code === 'COD20' || code === 'PAKISTAN') {
      setDiscountApplied(true);
      setDiscountPercent(20);
      setDiscountMessage('Promo code applied! 20% extra discount on all paid plans.');
    } else if (code === 'RAMADAN' || code === 'SPECIAL50') {
      setDiscountApplied(true);
      setDiscountPercent(50);
      setDiscountMessage('Promo code applied! 50% discount for first 3 months.');
    } else if (code === '') {
      setDiscountMessage('Please enter a voucher code.');
    } else {
      setDiscountApplied(false);
      setDiscountMessage('Invalid or expired coupon code. Try "COD20".');
    }
  };

  const handlePlanClick = (plan: BillingPlan) => {
    if (plan.id === activePlanId) return;
    setSelectedPlanForModal(plan);
  };

  const handleApproveSubscription = () => {
    setIsProcessingApproval(true);
    setTimeout(() => {
      if (selectedPlanForModal) {
        onSelectPlan(selectedPlanForModal.id);
      }
      setIsProcessingApproval(false);
      setApprovalSuccess(true);
      setTimeout(() => {
        setApprovalSuccess(false);
        setSelectedPlanForModal(null);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header section matching Screenshot 1 */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Shopify App Billing API Integrated</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Billing Plans
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
          Change your plan here. If you need help or you have any doubts or questions don't hesitate to contact us!
        </p>
      </div>

      {/* Monthly / Annual Toggle & Discount Code bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        {/* Toggle Pill */}
        <div className="bg-neutral-200 dark:bg-neutral-800 p-1 rounded-lg flex items-center shadow-inner">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
              billingCycle === 'annual'
                ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <span>Annual</span>
            <span className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
              -25%
            </span>
          </button>
        </div>

        {/* Discount Code Input matching Screenshot 1 */}
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs px-3 py-1.5 rounded-l-md focus:outline-none focus:ring-1 focus:ring-emerald-500 w-44"
            />
          </div>
          <button
            onClick={handleApplyDiscount}
            className="bg-neutral-700 hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-1.5 rounded-r-md transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      {discountMessage && (
        <div className={`text-center text-xs font-medium ${discountApplied ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
          {discountMessage}
        </div>
      )}

      {/* 4 Cards Grid - Replicating Screenshot 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {plans.map((plan) => {
          const isCurrent = plan.id === activePlanId;
          const basePrice = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnual;
          const finalPrice = discountApplied && basePrice > 0 
            ? Math.max(0, +(basePrice * (1 - discountPercent / 100)).toFixed(2)) 
            : basePrice;

          return (
            <div
              key={plan.id}
              className={`relative rounded-xl bg-white dark:bg-[#1a1a1a] border transition-all duration-200 flex flex-col justify-between ${
                isCurrent
                  ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                  : plan.isPopular
                  ? 'border-neutral-400 dark:border-neutral-600 shadow-sm'
                  : 'border-neutral-200 dark:border-neutral-800 shadow-sm'
              }`}
            >
              {/* CURRENT PLAN BADGE */}
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-0.5 rounded-full shadow border border-neutral-700">
                  Your Current Plan
                </div>
              )}

              {plan.isPopular && !isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-0.5 rounded-full shadow">
                  Most Popular
                </div>
              )}

              <div className="p-5 flex-1">
                {/* Plan Title */}
                <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-tight min-h-[44px] flex items-center">
                  {plan.name}
                </h3>

                {/* Price Display */}
                <div className="mt-3 mb-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                  {plan.priceMonthly === 0 ? (
                    <div className="flex items-baseline">
                      <span className="text-2xl font-extrabold text-neutral-900 dark:text-white">Free</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-neutral-900 dark:text-white">
                        ${finalPrice}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        / month
                      </span>
                      {discountApplied && (
                        <span className="text-[10px] line-through text-neutral-400 ml-1">
                          ${basePrice}
                        </span>
                      )}
                    </div>
                  )}
                  {billingCycle === 'annual' && plan.priceMonthly > 0 && (
                    <span className="text-[10px] text-emerald-600 font-medium">
                      Billed annually (-25%)
                    </span>
                  )}
                </div>

                {/* Feature list */}
                <ul className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action button */}
              <div className="p-5 pt-0 mt-auto">
                <button
                  onClick={() => handlePlanClick(plan)}
                  disabled={isCurrent}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-all ${
                    isCurrent
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-default'
                      : 'bg-neutral-900 hover:bg-black dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white shadow'
                  }`}
                >
                  {isCurrent ? 'Active Plan' : 'Select plan'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Developer Insight Banner explaining how Shopify Billing works for the owner */}
      <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-emerald-600 text-white rounded-lg">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-950 dark:text-emerald-200 uppercase tracking-wide">
              How You Collect Real Money from Merchants (Shopify Billing API)
            </h4>
            <p className="text-xs text-emerald-800 dark:text-emerald-300/90 mt-0.5">
              When store owners install <strong>COD Realistic</strong> and click "Select plan", Shopify charges their credit card automatically. 
              Shopify pays <strong>85% to 100%</strong> of the revenue directly to your bank account via your Shopify Partner Dashboard every month!
            </p>
          </div>
        </div>
      </div>

      {/* Simulated Shopify Billing Confirmation Modal */}
      {selectedPlanForModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-md w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Shopify Billing Header */}
            <div className="bg-[#1a1a1a] text-white p-4 flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#95BF47] rounded flex items-center justify-center text-black font-bold text-xs">
                  S
                </div>
                <span className="text-xs font-semibold">Shopify App Subscription Approval</span>
              </div>
              <span className="text-[10px] bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded font-mono">
                API: appSubscriptionCreate
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Approve Subscription
                </h3>
                <p className="text-xs text-neutral-500">
                  Store: <span className="font-mono font-medium text-neutral-800 dark:text-neutral-200">herbivital-2-store.myshopify.com</span>
                </p>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-800/60 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500">App Name</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">COD Realistic</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500">Selected Tier</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedPlanForModal.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500">Orders Included</span>
                  <span className="font-semibold">{selectedPlanForModal.ordersLimit}</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-center text-sm font-bold">
                  <span>Recurring Charge:</span>
                  <span className="text-emerald-600 text-base">
                    ${billingCycle === 'monthly' ? selectedPlanForModal.priceMonthly : selectedPlanForModal.priceAnnual} USD / month
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-neutral-500 text-center leading-relaxed">
                By approving, your Shopify account will be billed monthly. You can upgrade, downgrade or cancel anytime from your Shopify Admin.
              </p>

              {approvalSuccess ? (
                <div className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 p-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Subscription Approved! Plan is now active.</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setSelectedPlanForModal(null)}
                    className="flex-1 py-2 text-xs font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApproveSubscription}
                    disabled={isProcessingApproval}
                    className="flex-1 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow flex items-center justify-center gap-1.5"
                  >
                    {isProcessingApproval ? (
                      <span>Authorizing with Shopify...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Approve Charge</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
