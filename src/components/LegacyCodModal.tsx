import React, { useState } from 'react';
import { FormSettings, CodOrder } from '../types';
import { X, User, Phone, MapPin, CheckCircle2 } from 'lucide-react';

interface LegacyCodModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    price: number;
    image: string;
    quantity: number;
  };
  settings: FormSettings;
  onPlaceOrder: (order: Omit<CodOrder, 'id' | 'orderNumber' | 'createdAt'>) => void;
  onViewInAdmin?: () => void;
}

export const LegacyCodModal: React.FC<LegacyCodModalProps> = ({
  isOpen,
  onClose,
  product,
  settings,
  onPlaceOrder,
  onViewInAdmin
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [shippingMethod] = useState<'free'>('free');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<CodOrder | null>(null);

  if (!isOpen) return null;

  const itemTotal = product.price * product.quantity;
  const shippingCost = 0;
  const grandTotal = itemTotal + shippingCost;
  const formattedPrice = `Rs.${grandTotal.toLocaleString('en-US')}.00`;
  const formattedSubtotal = `Rs.${itemTotal.toLocaleString('en-US')}.00`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setFormError('Please enter a valid mobile phone number');
      return;
    }
    if (!address.trim()) {
      setFormError('Please enter your full street address');
      return;
    }
    if (!city.trim()) {
      setFormError('Please enter your city');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    setTimeout(() => {
      const randomNum = Math.floor(1050 + Math.random() * 8900);
      const newOrderPayload = {
        customerName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        province: 'Punjab',
        productName: product.title,
        quantity: product.quantity,
        totalAmount: grandTotal,
        currency: 'Rs.',
        status: 'Confirmed' as const,
        paymentMethod: 'Cash on Delivery' as const,
        notes: subscribeNewsletter ? 'Subscribed to updates' : undefined
      };

      onPlaceOrder(newOrderPayload);

      setConfirmedOrder({
        ...newOrderPayload,
        id: `ORD-${randomNum}`,
        orderNumber: `#COD-${randomNum}`,
        createdAt: 'Just now'
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        style={{
          backgroundColor: settings.formStyle?.backgroundColor || '#ffffff',
          color: settings.formStyle?.textColor || '#000000',
          borderRadius: `${settings.formStyle?.borderRadius !== undefined ? settings.formStyle.borderRadius : 16}px`,
          borderWidth: `${settings.formStyle?.borderWidth || 0}px`,
          borderColor: settings.formStyle?.borderColor || '#000000'
        }}
        className="text-neutral-900 max-w-[480px] w-full shadow-2xl overflow-hidden my-4 transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: CASH ON DELIVERY & Close Icon */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-neutral-100">
          <h2 className="text-xs sm:text-[13px] font-bold tracking-wider uppercase font-sans" style={{ color: settings.formStyle?.textColor || '#171717' }}>
            {settings.formTitle || 'CASH ON DELIVERY'}
          </h2>
          {!settings.formStyle?.hideCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded-md"
              aria-label="Close"
            >
              <X className="w-4 h-4 stroke-[2.2]" />
            </button>
          )}
        </div>

        {confirmedOrder ? (
          /* Order Confirmation View */
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                Order Received
              </span>
              <h3 className="text-lg font-bold text-neutral-900 mt-1">
                Order {confirmedOrder.orderNumber}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Thank you, <span className="font-semibold text-neutral-800">{confirmedOrder.customerName}</span>! We have received your Cash on Delivery order and will dispatch it shortly.
              </p>
            </div>

            <div className="bg-[#f9f9fa] p-4 rounded-xl text-left border border-neutral-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Item:</span>
                <span className="font-medium text-neutral-800">{confirmedOrder.productName} (x{confirmedOrder.quantity})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total COD to Pay:</span>
                <span className="font-bold text-neutral-900 text-sm">Rs. {confirmedOrder.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery Address:</span>
                <span className="font-medium text-neutral-800 text-right max-w-[220px]">{confirmedOrder.address}, {confirmedOrder.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Phone:</span>
                <span className="font-mono text-neutral-800">{confirmedOrder.phone}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {onViewInAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewInAdmin();
                  }}
                  className="w-full py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                >
                  View in Shopify COD Admin
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-medium rounded-lg"
              >
                Close &amp; Return to Store
              </button>
            </div>
          </div>
        ) : (
          /* Exact Legacy Releasit Style Form */
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3.5">
            {formError && (
              <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {formError}
              </div>
            )}

            {/* Product Summary Row */}
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-3">
                {/* Product thumbnail with quantity badge overlapping top right */}
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 border border-neutral-200 rounded-lg overflow-visible bg-neutral-50 shrink-0 flex items-center justify-center p-1">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain rounded"
                  />
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-neutral-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {product.quantity}
                  </span>
                </div>
                <span className="text-xs sm:text-[13px] font-semibold text-neutral-800 leading-snug">
                  {product.title}
                </span>
              </div>
              <span className="text-xs sm:text-[13px] font-semibold text-neutral-900 shrink-0 ml-2">
                {formattedSubtotal}
              </span>
            </div>

            {/* Subtotal, Shipping, Total Gray Card */}
            <div className="bg-[#f6f6f7] border border-neutral-200/80 rounded-lg p-3 text-xs space-y-1.5 text-neutral-700">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-neutral-900">{formattedSubtotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="text-neutral-700 font-medium">Free</span>
              </div>
              <div className="border-t border-neutral-200/80 pt-1.5 flex items-center justify-between font-semibold text-neutral-900">
                <span>Total</span>
                <span>{formattedPrice}</span>
              </div>
            </div>

            {/* Shipping Method Section */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-neutral-800">
                Shipping method
              </label>
              <div className="border border-neutral-300 rounded-lg px-3 py-2.5 flex items-center justify-between bg-white text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  {/* Styled Radio Button matching Screenshot */}
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-black flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                  </span>
                  <span className="font-medium text-neutral-800">Free shipping</span>
                </label>
                <span className="text-neutral-700 font-medium">Free</span>
              </div>
            </div>

            {/* Enter your shipping address Header */}
            <div className="pt-1 text-center">
              <h3 className="text-xs sm:text-sm font-semibold text-neutral-900">
                Enter your shipping address
              </h3>
            </div>

            {/* Form Fields - 2 Column Table-like Layout with Icon Prefixes */}
            <div className="space-y-2.5">
              {/* Full Name */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label className="sm:w-28 text-xs font-medium text-neutral-800 shrink-0">
                  Full Name<span className="text-red-500 font-bold ml-0.5">*</span>
                </label>
                <div className="flex-1 flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white focus-within:border-black focus-within:ring-1 focus-within:ring-black/20 transition-all">
                  <div className="w-9 h-9 bg-[#f4f4f4] border-r border-neutral-300 flex items-center justify-center text-neutral-600 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 outline-none bg-transparent"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label className="sm:w-28 text-xs font-medium text-neutral-800 shrink-0 leading-tight">
                  Phone<br className="hidden sm:inline" /> number<span className="text-red-500 font-bold ml-0.5">*</span>
                </label>
                <div className="flex-1 flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white focus-within:border-black focus-within:ring-1 focus-within:ring-black/20 transition-all">
                  <div className="w-9 h-9 bg-[#f4f4f4] border-r border-neutral-300 flex items-center justify-center text-neutral-600 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full px-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 outline-none bg-transparent font-mono sm:font-sans"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label className="sm:w-28 text-xs font-medium text-neutral-800 shrink-0">
                  Address<span className="text-red-500 font-bold ml-0.5">*</span>
                </label>
                <div className="flex-1 flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white focus-within:border-black focus-within:ring-1 focus-within:ring-black/20 transition-all">
                  <div className="w-9 h-9 bg-[#f4f4f4] border-r border-neutral-300 flex items-center justify-center text-neutral-600 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Full Address"
                    className="w-full px-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 outline-none bg-transparent"
                    required
                  />
                </div>
              </div>

              {/* City */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label className="sm:w-28 text-xs font-medium text-neutral-800 shrink-0">
                  City<span className="text-red-500 font-bold ml-0.5">*</span>
                </label>
                <div className="flex-1 flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white focus-within:border-black focus-within:ring-1 focus-within:ring-black/20 transition-all">
                  <div className="w-9 h-9 bg-[#f4f4f4] border-r border-neutral-300 flex items-center justify-center text-neutral-600 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full px-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 outline-none bg-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Newsletter Subscription Checkbox */}
            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-neutral-700">
                <input
                  type="checkbox"
                  checked={subscribeNewsletter}
                  onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-neutral-300 text-black focus:ring-black"
                />
                <span>Subscribe to stay updated with new products and offers!</span>
              </label>
            </div>

            {/* Complete Order Button - Solid Black full width button matching screenshot */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-black hover:bg-neutral-900 text-white font-bold text-xs sm:text-[13px] uppercase tracking-wider rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <span>COMPLETE ORDER - {formattedPrice}</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
