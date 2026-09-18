export interface FormSettings {
  formTitle: string;
  formSubtitle: string;
  buttonText: string;
  buttonSubtext: string;
  buttonColor: string;
  buttonHoverColor: string;
  buttonTextColor: string;
  buttonBorderRadius: number;
  showCodBadge: boolean;
  codBadgeText: string;
  showUrgencyTimer: boolean;
  urgencyText: string;
  urgencyHours: number;
  urgencyMinutes: number;
  requireFullName: boolean;
  requirePhone: boolean;
  phoneFormat: string;
  requireOtp: boolean;
  requireAddress: boolean;
  requireCity: boolean;
  citiesList: string[];
  requireProvince: boolean;
  provincesList: string[];
  requirePostalCode: boolean;
  requireNotes: boolean;
  showQuantityOffers: boolean;
  quantityOffers: {
    qty: number;
    title: string;
    discountText: string;
    price: number;
    badge?: string;
  }[];
  primaryCurrency: string;
  themeStyle: 'modern' | 'minimal' | 'rounded' | 'dark';
}

export interface BillingPlan {
  id: string;
  name: string;
  subtitle?: string;
  priceMonthly: number;
  priceAnnual: number;
  isCurrent?: boolean;
  isPopular?: boolean;
  features: string[];
  ordersLimit: string;
  supportLevel: string;
}

export interface CodOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  currency: string;
  status: 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled' | 'Fake/RTO';
  createdAt: string;
  paymentMethod: 'Cash on Delivery';
  notes?: string;
}

export interface FraudSettings {
  enableOtpVerification: boolean;
  blockDuplicateOrdersMinutes: number;
  maxOrdersPerIpPerDay: number;
  minPhoneDigits: number;
  blockedPhoneNumbers: string[];
  blockedPincodes: string[];
  requireWhatsappConfirmation: boolean;
  autoDetectVpn: boolean;
}

export interface CourierIntegration {
  id: string;
  name: string;
  country: string;
  status: 'connected' | 'not_connected';
  logoText: string;
  autoBookConsignment: boolean;
}
