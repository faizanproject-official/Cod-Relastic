import { BillingPlan, FormSettings, CodOrder, FraudSettings, CourierIntegration } from '../types';

export const initialFormSettings: FormSettings = {
  formTitle: "Cash on Delivery Fast Order",
  formSubtitle: "Please fill in your delivery details to receive your order at your doorstep",
  buttonText: "Buy with Cash on Delivery",
  buttonSubtext: "",
  buttonSubtitle: "",
  buttonAnimation: "Shaker",
  buttonIcon: "cart",
  stickyButtonPosition: "Bottom",
  buttonColor: "rgba(0,0,0,1)", // black as in screenshot
  buttonHoverColor: "#171717",
  buttonTextColor: "rgba(255,255,255,1)",
  buttonBorderRadius: 24,
  buttonBorderWidth: 0,
  buttonBorderColor: "rgba(0,0,0,1)",
  buttonFontSize: 15,
  buttonShadow: 2,
  enableStickyMobile: true,
  showCodBadge: true,
  codBadgeText: "Verified Cash on Delivery Available",
  showUrgencyTimer: true,
  urgencyText: "Order in the next 14 hours 38 minutes to get it by Monday",
  urgencyHours: 14,
  urgencyMinutes: 38,
  requireFullName: true,
  requirePhone: true,
  phoneFormat: "03XXXXXXXXX (11 digits)",
  requireOtp: false,
  requireAddress: true,
  requireCity: true,
  citiesList: [
    "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", 
    "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Other City"
  ],
  requireProvince: true,
  provincesList: ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad Capital Territory", "Azad Kashmir", "Gilgit-Baltistan"],
  requirePostalCode: false,
  requireNotes: true,
  showQuantityOffers: true,
  quantityOffers: [
    { qty: 1, title: "1 Bottle (Standard)", discountText: "Standard Price", price: 1500 },
    { qty: 2, title: "2 Bottles (Popular Pack)", discountText: "Save Rs. 300 + Free Delivery", price: 2700, badge: "Most Popular" },
    { qty: 3, title: "3 Bottles (Ultimate Saver)", discountText: "Save Rs. 800 + Free Gift", price: 3700, badge: "Best Value" },
  ],
  primaryCurrency: "Rs.",
  themeStyle: "legacy",
  formMode: 'popup',
  selectedCountry: 'Pakistan',
  enableMultiCountry: false,
  formStyle: {
    textColor: 'rgba(0,0,0,1)',
    fontSize: 14,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,1)',
    shadow: 4,
    hideCloseButton: false,
    hideFieldLabels: false,
    enableRtl: false,
    enableFullScreenMobile: false,
  },
  formTexts: {
    requiredFieldError: 'This field is required.',
    invalidGenericError: 'Enter a valid value.',
  },
  blocks: [
    { id: 'summary', name: 'ORDER SUMMARY', label: 'ORDER SUMMARY', type: 'summary', enabled: false, canEdit: false },
    { id: 'totals', name: 'TOTALS SUMMARY', label: 'TOTALS SUMMARY', type: 'totals', enabled: false, canEdit: true },
    { id: 'shipping_rates', name: 'SHIPPING RATES', label: 'SHIPPING RATES', type: 'shipping_rates', enabled: true, canEdit: true },
    { id: 'discount_codes', name: 'DISCOUNT CODES', label: 'DISCOUNT CODES', type: 'discount', enabled: false, canEdit: true },
    { id: 'section_address', name: 'Enter your shipping address', label: 'Enter your shipping address', type: 'section_header', enabled: true, canEdit: true },
    { id: 'fullname', name: 'Full Name', label: 'Full Name', type: 'field', enabled: true, required: true, canEdit: true, placeholder: 'Full Name', icon: 'user' },
    { id: 'lastname', name: 'Last name', label: 'Last name', type: 'field', enabled: false, required: false, canEdit: true, placeholder: 'Last Name', icon: 'user' },
    { id: 'phone', name: 'Phone number', label: 'Phone number', type: 'field', enabled: true, required: true, canEdit: true, placeholder: 'Phone', icon: 'phone' },
    { id: 'address', name: 'Address', label: 'Address', type: 'field', enabled: true, required: true, canEdit: true, placeholder: 'Full Address', icon: 'map-pin' },
    { id: 'address2', name: 'Address 2', label: 'Address 2', type: 'field', enabled: false, required: false, canEdit: true, placeholder: 'Apartment, suite, etc.' },
    { id: 'province', name: 'Province', label: 'Province', type: 'field', enabled: true, required: true, canEdit: true, placeholder: 'Province' },
    { id: 'city', name: 'City', label: 'City', type: 'field', enabled: true, required: true, canEdit: true, placeholder: 'City', icon: 'map-pin' },
    { id: 'zip', name: 'Zip code', label: 'Zip code', type: 'field', enabled: false, required: false, canEdit: true, placeholder: 'Zip code' },
    { id: 'email', name: 'Email', label: 'Email', type: 'field', enabled: false, required: false, canEdit: true, placeholder: 'Email' },
    { id: 'order_note', name: 'Order note', label: 'Order note', type: 'field', enabled: false, required: false, canEdit: true, placeholder: 'Order note' },
    { id: 'subscribe', name: 'Subscribe to stay updated...', label: 'Subscribe to stay updated with new products and offers!', type: 'checkbox', enabled: true, canEdit: true },
    { id: 'terms', name: 'Accept our <a...', label: 'I accept terms and conditions', type: 'checkbox', enabled: false, canEdit: true },
    { id: 'submit', name: 'COMPLETE ORDER - {order_total}', label: 'COMPLETE ORDER - {order_total}', type: 'button', enabled: true, canEdit: true },
  ]
};

export const billingPlansData: BillingPlan[] = [
  {
    id: "forever-free",
    name: "Forever Free for Pakistan",
    subtitle: "Ideal for starting out with zero risk",
    priceMonthly: 0,
    priceAnnual: 0,
    isCurrent: true,
    ordersLimit: "100 Orders/Month",
    supportLevel: "24/7 Email support",
    features: [
      "100 Orders/Month included",
      "Original Form Design & Modal",
      "Basic Fraud Prevention",
      "Address Validation & Cart Recovery",
      "Conversion Boosters & SMS Notifications",
      "Insights & Analytics dashboard",
      "Google Sheets & Ad Pixel (Meta & TikTok)",
      "New Form Design (Drag & Drop)",
      "Basic Form Shape Templates",
      "24/7 Email support (exclude custom code assistance)"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "For growing stores scaling COD orders",
    priceMonthly: 9.99,
    priceAnnual: 7.49,
    ordersLimit: "420 Orders/Month",
    supportLevel: "24/7 Live Chat Support",
    features: [
      "ALL Free Plan Features",
      "420 Orders/Month included",
      "Quantity Offers on Product Page",
      "Advanced Fraud Prevention (Block repeat fake numbers)",
      "Personalized Coverages & OTP Verification",
      "Special Form Fields Customization",
      "Advanced Form Templates & Custom CSS",
      "24/7 Live Chat Support (< 15 min response)"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    subtitle: "High-volume stores needing robust scale",
    priceMonthly: 29.99,
    priceAnnual: 22.49,
    ordersLimit: "10,000 Orders/Month",
    supportLevel: "24/7 Priority Live Chat Support (< 5 min response)",
    isPopular: true,
    features: [
      "ALL Premium Plan Features",
      "10,000 Orders/Month included",
      "Custom Code Assistance from our engineers",
      "Full Automated Courier API Sync (TCS, Trax, Leopard)",
      "Abandoned COD Form Push Recovery",
      "Dedicated Account Manager",
      "24/7 Live Chat Support (< 5 min response)"
    ]
  },
  {
    id: "unlimited",
    name: "Unlimited",
    subtitle: "Top-tier enterprise e-commerce brands",
    priceMonthly: 69.99,
    priceAnnual: 52.49,
    ordersLimit: "Unlimited Orders/Month",
    supportLevel: "24/7 VIP Live Chat Support (< 2 min response)",
    features: [
      "ALL Enterprise Plan Features",
      "Unlimited Orders/Month",
      "A/B Testing for one click upsell",
      "Multiple Form Versions across product collections",
      "Custom Code Assistance & White-labeling",
      "24/7 Live Chat Support (< 2 min response)",
      "Direct WhatsApp developer hotline"
    ]
  }
];

export const initialOrders: CodOrder[] = [
  {
    id: "ORD-9801",
    orderNumber: "#COD-1049",
    customerName: "Muhammad Bilal Khan",
    phone: "03001234567",
    address: "House 42-B, Street 7, Phase 5 DHA",
    city: "Lahore",
    province: "Punjab",
    productName: "Herbal Vitality Oil - 50ml",
    quantity: 2,
    totalAmount: 2700,
    currency: "Rs.",
    status: "Confirmed",
    createdAt: "Today at 01:24 PM",
    paymentMethod: "Cash on Delivery",
    notes: "Please call before delivering."
  },
  {
    id: "ORD-9802",
    orderNumber: "#COD-1048",
    customerName: "Ayesha Tariq",
    phone: "03217654321",
    address: "Apartment 402, Al-Razi Tower, Gulshan-e-Iqbal Block 6",
    city: "Karachi",
    province: "Sindh",
    productName: "Herbal Vitality Oil - 50ml",
    quantity: 1,
    totalAmount: 1500,
    currency: "Rs.",
    status: "Dispatched",
    createdAt: "Today at 11:42 AM",
    paymentMethod: "Cash on Delivery",
    notes: "Leave with security if not home."
  },
  {
    id: "ORD-9803",
    orderNumber: "#COD-1047",
    customerName: "Usman Ghani",
    phone: "03339876543",
    address: "Sector F-8/2, Street 19, House 14",
    city: "Islamabad",
    province: "Islamabad Capital Territory",
    productName: "Herbal Vitality Oil - 50ml",
    quantity: 3,
    totalAmount: 3700,
    currency: "Rs.",
    status: "Delivered",
    createdAt: "Yesterday at 04:15 PM",
    paymentMethod: "Cash on Delivery"
  },
  {
    id: "ORD-9804",
    orderNumber: "#COD-1046",
    customerName: "Farhan Saeed",
    phone: "03451122334",
    address: "Millat Town, Near Madina Mosque",
    city: "Faisalabad",
    province: "Punjab",
    productName: "Herbal Vitality Oil - 50ml",
    quantity: 1,
    totalAmount: 1500,
    currency: "Rs.",
    status: "Pending",
    createdAt: "Yesterday at 09:30 AM",
    paymentMethod: "Cash on Delivery",
    notes: "Delivery after 5 PM please."
  }
];

export const initialFraudSettings: FraudSettings = {
  enableOtpVerification: false,
  blockDuplicateOrdersMinutes: 15,
  maxOrdersPerIpPerDay: 3,
  minPhoneDigits: 11,
  blockedPhoneNumbers: ["03000000000", "03123456789"],
  blockedPincodes: ["00000", "99999"],
  requireWhatsappConfirmation: true,
  autoDetectVpn: true
};

export const initialCouriers: CourierIntegration[] = [
  { id: "trax", name: "Trax Logistics", country: "Pakistan", status: "connected", logoText: "TRAX", autoBookConsignment: true },
  { id: "leopard", name: "Leopard Courier", country: "Pakistan", status: "connected", logoText: "LEOPARD", autoBookConsignment: false },
  { id: "tcs", name: "TCS Express", country: "Pakistan", status: "not_connected", logoText: "TCS", autoBookConsignment: false },
  { id: "postex", name: "PostEx Financial COD", country: "Pakistan", status: "connected", logoText: "POSTEX", autoBookConsignment: true },
  { id: "callcourier", name: "Call Courier", country: "Pakistan", status: "not_connected", logoText: "CC", autoBookConsignment: false },
];
