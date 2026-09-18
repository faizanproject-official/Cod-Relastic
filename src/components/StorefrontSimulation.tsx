import React, { useState } from 'react';
import { FormSettings, CodOrder } from '../types';
import { 
  ShoppingBag, 
  Heart, 
  Share2, 
  Truck, 
  ShieldCheck, 
  Minus, 
  Plus, 
  Check, 
  Clock, 
  X, 
  CheckCircle2, 
  ArrowLeft,
  ChevronRight,
  PackageCheck,
  PhoneCall
} from 'lucide-react';

interface StorefrontSimulationProps {
  settings: FormSettings;
  onPlaceOrder: (order: Omit<CodOrder, 'id' | 'orderNumber' | 'createdAt'>) => void;
  onBackToAdmin: () => void;
}

export const StorefrontSimulation: React.FC<StorefrontSimulationProps> = ({
  settings,
  onPlaceOrder,
  onBackToAdmin
}) => {
  // Storefront Product State (HerbiVital Herbal Vitality Oil - matching Screenshot 2)
  const [productQty, setProductQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isCodModalOpen, setIsCodModalOpen] = useState(false);

  // COD Form State inside Modal
  const [selectedOfferIndex, setSelectedOfferIndex] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(settings.citiesList[0] || 'Lahore');
  const [province, setProvince] = useState(settings.provincesList[0] || 'Punjab');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<CodOrder | null>(null);
  const [formError, setFormError] = useState('');

  const productImages = [
    "https://images.unsplash.com/photo-1608248597359-2e6977ec3093?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80"
  ];

  const handleOpenCodModal = () => {
    setIsCodModalOpen(true);
    setConfirmedOrder(null);
    setFormError('');
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setFormError('Please enter a valid 11-digit mobile phone number');
      return;
    }
    if (!address.trim()) {
      setFormError('Please enter your complete delivery street address');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    const chosenOffer = settings.quantityOffers[selectedOfferIndex] || {
      qty: productQty,
      price: 1500 * productQty,
      title: `${productQty} Bottle(s)`
    };

    setTimeout(() => {
      const orderPayload = {
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city,
        province,
        productName: "Herbal Vitality Oil - 50ml",
        quantity: chosenOffer.qty,
        totalAmount: chosenOffer.price,
        currency: "Rs.",
        status: "Confirmed" as const,
        paymentMethod: "Cash on Delivery" as const,
        notes: notes.trim() || undefined
      };

      onPlaceOrder(orderPayload);

      setConfirmedOrder({
        ...orderPayload,
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        orderNumber: `#COD-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: "Just now"
      });

      setIsSubmitting(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-16">
      {/* Storefront Top Announcement Bar */}
      <div className="bg-emerald-900 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-between">
        <button
          onClick={onBackToAdmin}
          className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 px-3 py-1 rounded text-white text-[11px] font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopify App Admin</span>
        </button>
        <span className="hidden sm:inline">
          🌿 Free Shipping Across Pakistan on Orders above Rs. 2,000 | Cash on Delivery Available
        </span>
        <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded text-emerald-300 font-mono">
          herbivital.com
        </span>
      </div>

      {/* Store Header matching Screenshot 2 */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow">
              🌿
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-neutral-900 flex items-center gap-1">
                HerbiVital
              </span>
              <span className="block text-[10px] text-neutral-500 uppercase tracking-wider">
                100% Herbal & Natural Wellness
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-neutral-700">
            <span className="text-emerald-700 cursor-pointer">Home</span>
            <span className="hover:text-emerald-700 cursor-pointer">Herbal Vitality Oil</span>
            <span className="hover:text-emerald-700 cursor-pointer">Contact</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700 bg-neutral-100 px-3 py-1.5 rounded-full">
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              <span>Cart (0)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Product Page (Herbal Vitality Oil - Exact representation of user's Image 2) */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-xs text-neutral-500 mb-6 flex items-center gap-1">
          <span>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span>Products</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-neutral-900 font-medium">Herbal Vitality Oil</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Product Media Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-neutral-900 aspect-square shadow-lg border border-neutral-200">
              <img
                src={productImages[selectedImage]}
                alt="Herbal Vitality Oil"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                -32% OFF
              </span>
              <span className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg">
                100% Herbal Blend &amp; Organic Extracts
              </span>
            </div>

            {/* Thumbnail previews */}
            <div className="flex gap-3">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-emerald-600 ring-2 ring-emerald-600/30' : 'border-neutral-200 opacity-70'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details & COD Button Action */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Premium Herbal Formulation
                </span>
                <span className="text-[11px] text-amber-600 font-semibold">
                  ★★★★★ (4.9/5 from 342 reviews)
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
                Herbal Vitality Oil
              </h1>
              <div className="text-xs text-neutral-500 mt-1">
                Vendor: <span className="font-semibold text-neutral-800">Herbi Vital</span> | SKU: HV-OIL-01
              </div>
            </div>

            {/* Price section matching Screenshot 2 */}
            <div className="flex items-baseline gap-3 py-2 border-y border-neutral-200">
              <span className="text-2xl text-neutral-400 line-through font-semibold">
                Rs. 2,200.00
              </span>
              <span className="text-3xl font-black text-red-600">
                Rs. 1,500.00
              </span>
              <span className="text-xs bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
                Save Rs. 700
              </span>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              Herbal Vitality Oil is a natural blend designed to support stamina, energy, and overall vitality. 
              It helps promote strength and daily wellness through consistent external use and herbal nourishment.
            </p>

            {/* Quantity Stepper & Add to Cart button */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white shadow-xs">
                <button
                  onClick={() => setProductQty(Math.max(1, productQty - 1))}
                  className="px-3 py-2.5 text-neutral-600 hover:bg-neutral-100"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-2.5 text-xs font-bold text-neutral-900">
                  {productQty}
                </span>
                <button
                  onClick={() => setProductQty(productQty + 1)}
                  className="px-3 py-2.5 text-neutral-600 hover:bg-neutral-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button className="flex-1 bg-lime-700 hover:bg-lime-800 text-white text-xs font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all">
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART</span>
              </button>
            </div>

            {/* THE SIGNATURE COD REALISTIC BUTTON (Matching Screenshot 2) */}
            <div className="pt-2">
              <button
                onClick={handleOpenCodModal}
                style={{
                  backgroundColor: settings.buttonColor,
                  color: settings.buttonTextColor,
                  borderRadius: `${settings.buttonBorderRadius}px`
                }}
                className="w-full py-3.5 px-4 text-sm font-bold shadow-lg hover:brightness-105 active:scale-[0.99] transition-all flex flex-col items-center justify-center cursor-pointer border border-emerald-700"
              >
                <div className="flex items-center gap-2">
                  <span>{settings.buttonText}</span>
                </div>
                {settings.buttonSubtext && (
                  <span className="text-[11px] font-normal opacity-90 mt-0.5">
                    {settings.buttonSubtext}
                  </span>
                )}
              </button>
            </div>

            {/* Delivery Estimation Banner matching Screenshot 2 */}
            {settings.showUrgencyTimer && (
              <div className="bg-neutral-100 p-3 rounded-lg flex items-start gap-2.5 text-xs text-neutral-700">
                <Truck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span>Order in the next </span>
                  <span className="font-bold text-neutral-900">14 hours 38 minutes </span>
                  <span>to get it between </span>
                  <span className="font-bold text-neutral-900 underline">Monday, 21st September</span>
                  <span> and </span>
                  <span className="font-bold text-neutral-900 underline">Tuesday, 22nd September</span>.
                </div>
              </div>
            )}

            {/* Trust Points */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="p-2.5 rounded-lg border border-neutral-200 bg-white">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <div className="text-[11px] font-bold text-neutral-800">Cash on Delivery</div>
                <div className="text-[10px] text-neutral-500">Pay when you receive</div>
              </div>
              <div className="p-2.5 rounded-lg border border-neutral-200 bg-white">
                <Truck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <div className="text-[11px] font-bold text-neutral-800">Express Courier</div>
                <div className="text-[10px] text-neutral-500">2-3 days delivery</div>
              </div>
              <div className="p-2.5 rounded-lg border border-neutral-200 bg-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <div className="text-[11px] font-bold text-neutral-800">100% Original</div>
                <div className="text-[10px] text-neutral-500">Guaranteed quality</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* COD REALISTIC 1-CLICK CHECKOUT MODAL POPUP */}
      {isCodModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
            {/* Modal Header */}
            <div className="bg-emerald-800 text-white p-4 relative">
              <button
                onClick={() => setIsCodModalOpen(false)}
                className="absolute top-3.5 right-3.5 text-white/80 hover:text-white bg-black/20 p-1.5 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-emerald-200">
                <Truck className="w-3.5 h-3.5" />
                <span>Fast 1-Click Order</span>
              </div>
              <h3 className="text-lg font-bold mt-1">
                {settings.formTitle}
              </h3>
              <p className="text-xs text-emerald-100">
                No credit card needed. Pay cash when package arrives at your home.
              </p>
            </div>

            {confirmedOrder ? (
              /* Order Confirmation View */
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    Order Placed Successfully!
                  </span>
                  <h4 className="text-xl font-black text-neutral-900 mt-1">
                    Tracking ID: {confirmedOrder.orderNumber}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Thank you, <span className="font-semibold text-neutral-800">{confirmedOrder.customerName}</span>! Our courier will deliver your order soon.
                  </p>
                </div>

                <div className="bg-neutral-50 p-4 rounded-xl text-left border border-neutral-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Product:</span>
                    <span className="font-semibold">{confirmedOrder.productName} (x{confirmedOrder.quantity})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Total COD Amount:</span>
                    <span className="font-bold text-emerald-700 text-sm">Rs. {confirmedOrder.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Delivery Address:</span>
                    <span className="font-medium text-right max-w-[200px]">{confirmedOrder.address}, {confirmedOrder.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Contact Number:</span>
                    <span className="font-medium">{confirmedOrder.phone}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsCodModalOpen(false);
                      onBackToAdmin();
                    }}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow"
                  >
                    View this Order in COD Realistic Admin
                  </button>
                  <button
                    onClick={() => setIsCodModalOpen(false)}
                    className="text-xs text-neutral-500 hover:text-neutral-800 py-1"
                  >
                    Close &amp; Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              /* Order Form Form Fields */
              <form onSubmit={handleOrderSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                {formError && (
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {formError}
                  </div>
                )}

                {/* Package / Quantity Bundle Selector */}
                {settings.showQuantityOffers && (
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-2">
                      1. Select Quantity &amp; Save Money:
                    </label>
                    <div className="space-y-2">
                      {settings.quantityOffers.map((offer, idx) => (
                        <div
                          key={offer.qty}
                          onClick={() => setSelectedOfferIndex(idx)}
                          className={`p-3 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                            selectedOfferIndex === idx
                              ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                              : 'border-neutral-200 hover:border-neutral-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="orderBundle"
                              checked={selectedOfferIndex === idx}
                              onChange={() => setSelectedOfferIndex(idx)}
                              className="text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-neutral-900">{offer.title}</span>
                                {offer.badge && (
                                  <span className="text-[9px] bg-amber-500 text-white font-black px-1.5 py-0.2 rounded-full">
                                    {offer.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-emerald-700 font-medium">
                                {offer.discountText}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-black text-neutral-900">
                              Rs. {offer.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shipping Details */}
                <div className="space-y-3 pt-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    2. Where should we deliver your order?
                  </label>

                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Mobile Phone (03XXXXXXXXX) *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none font-medium"
                    />
                    <span className="text-[10px] text-neutral-500 block mt-0.5">
                      The courier will call this number prior to delivery.
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-neutral-300 focus:border-emerald-600 outline-none"
                    >
                      {settings.citiesList.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>

                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-neutral-300 focus:border-emerald-600 outline-none"
                    >
                      {settings.provincesList.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <textarea
                      placeholder="Complete Street Address (House #, Street #, Colony/Sector, Landmark) *"
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 outline-none"
                    />
                  </div>

                  {settings.requireNotes && (
                    <div>
                      <input
                        type="text"
                        placeholder="Delivery instructions (e.g. Call after 4 PM) (Optional)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 focus:border-emerald-600 outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: settings.buttonColor,
                      color: settings.buttonTextColor,
                      borderRadius: `${settings.buttonBorderRadius}px`
                    }}
                    className="w-full py-3.5 px-4 text-sm font-bold shadow-lg hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Placing your order...</span>
                    ) : (
                      <>
                        <Truck className="w-4 h-4" />
                        <span>Confirm Order (Pay Cash on Delivery)</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-neutral-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      No advance payment
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Inspect parcel before pay
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
