export interface FormBlockItem {
  id: string;
  name: string;
  label?: string;
  type: 'summary' | 'totals' | 'shipping_rates' | 'discount' | 'section_header' | 'field' | 'checkbox' | 'button' | string;
  enabled: boolean;
  required?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  isCustom?: boolean;
  placeholder?: string;
  icon?: string;
  showIcon?: boolean;
  minLength?: number;
  maxLength?: number;
  regexValidation?: string;
  invalidErrorText?: string;
  prefixText?: string;
  alignment?: 'Left' | 'Center' | 'Right';
  fontSize?: number;
  fontWeight?: 'Normal' | 'Bold' | 'Semi-bold';
  textColor?: string;
  subtitle?: string;
  animation?: string;
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  shadow?: number;
  preselected?: boolean;
  disableDropdown?: boolean;
  removedProvinces?: string;
  limitOnePerOrder?: boolean;
  discountsLineText?: string;
  applyButtonText?: string;
  applyButtonBgColor?: string;
  invalidDiscountErrorText?: string;
  oneDiscountAllowedErrorText?: string;
  imageUrl?: string;
  imageAlt?: string;
  options?: string[];
  whatsappNumber?: string;
  whatsappMessage?: string;
  linkUrl?: string;
  openInNewTab?: boolean;
  minQty?: number;
  maxQty?: number;
  defaultQty?: number;
  fieldInputType?: 'text' | 'number' | 'textarea' | 'date';
}

export interface FormStyleConfig {
  textColor: string;
  fontSize: number;
  backgroundColor: string;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  shadow: number;
  hideCloseButton: boolean;
  hideFieldLabels: boolean;
  enableRtl: boolean;
  enableFullScreenMobile: boolean;
}

export interface FormTextsConfig {
  requiredFieldError: string;
  invalidGenericError: string;
}

export interface FormSettings {
  formTitle: string;
  formSubtitle: string;
  buttonText: string;
  buttonSubtext: string;
  buttonColor: string;
  buttonHoverColor: string;
  buttonTextColor: string;
  buttonBorderRadius: number;
  buttonSubtitle?: string;
  buttonAnimation?: string;
  buttonIcon?: string;
  stickyButtonPosition?: 'Top' | 'Bottom';
  buttonFontSize?: number;
  buttonBorderWidth?: number;
  buttonBorderColor?: string;
  buttonShadow?: number;
  enableStickyMobile?: boolean;
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
  themeStyle: 'legacy' | 'modern' | 'minimal' | 'rounded' | 'dark';
  formMode?: 'popup' | 'embedded';
  selectedCountry?: string;
  enableMultiCountry?: boolean;
  blocks?: FormBlockItem[];
  formStyle?: FormStyleConfig;
  formTexts?: FormTextsConfig;
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
