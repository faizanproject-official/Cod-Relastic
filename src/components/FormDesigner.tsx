import React, { useState } from 'react';
import { FormSettings, FormBlockItem, FormStyleConfig, FormTextsConfig } from '../types';
import { FormFieldSettings } from './FormFieldSettings';
import { 
  FileText,
  Truck,
  Layers,
  Check, 
  Eye, 
  EyeOff,
  Pencil, 
  GripVertical,
  ArrowUp,
  ArrowDown,
  Info,
  X,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Plus,
  MessageCircle,
  ExternalLink,
  User,
  Phone,
  MapPin,
  Mail,
  FileQuestion,
  HelpCircle,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  ArrowRight,
  Smartphone,
  Navigation,
  Hash,
  AlignLeft,
  Trash2
} from 'lucide-react';

interface FormDesignerProps {
  settings: FormSettings;
  onUpdateSettings: (newSettings: FormSettings) => void;
  onPreviewInStore: () => void;
}

export const FormDesigner: React.FC<FormDesignerProps> = ({
  settings,
  onUpdateSettings,
  onPreviewInStore
}) => {
  // Top Sub-Tabs: "Form Designer" or "Shipping Rates"
  const [activeSubTab, setActiveSubTab] = useState<'form-designer' | 'shipping-rates'>('form-designer');

  // Dismissible notifications
  const [showPopupInfo, setShowPopupInfo] = useState(true);
  const [showProvinceInfo, setShowProvinceInfo] = useState(true);
  const [showEnglishInfo, setShowEnglishInfo] = useState(true);

  // Buy Button Accordion toggle & Preview mode ('form' | 'button')
  const [showBuyButtonSettings, setShowBuyButtonSettings] = useState(true);
  const [activePreviewMode, setActivePreviewMode] = useState<'form' | 'button'>('button');
  const [isButtonShaking, setIsButtonShaking] = useState(false);

  // Inline Block Editing (Pencil opens, Check ✓ closes)
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null);
  const [editingBlock, setEditingBlock] = useState<FormBlockItem | null>(null);
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  // Dragging state for visual feedback
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);

  // Default values fallback
  const formMode = settings.formMode || 'popup';
  const selectedCountry = settings.selectedCountry || 'Pakistan';
  const formBlocks = settings.blocks || [
    { id: 'summary', name: 'ORDER SUMMARY', label: 'ORDER SUMMARY', type: 'summary', enabled: true, canEdit: false },
    { id: 'totals', name: 'TOTALS SUMMARY', label: 'TOTALS SUMMARY', type: 'totals', enabled: true, canEdit: true },
    { id: 'shipping_rates', name: 'SHIPPING RATES', label: 'SHIPPING RATES', type: 'shipping_rates', enabled: true, canEdit: true },
    { 
      id: 'discount_codes', 
      name: 'DISCOUNT CODES', 
      label: 'Discount code', 
      type: 'discount', 
      enabled: false, 
      canEdit: true,
      limitOnePerOrder: true,
      discountsLineText: 'Discounts',
      applyButtonText: 'Apply',
      applyButtonBgColor: 'rgba(0,0,0,1)',
      invalidDiscountErrorText: 'Enter a valid discount code.',
      oneDiscountAllowedErrorText: 'Only 1 discount per order is allowed.'
    },
    { 
      id: 'section_address', 
      name: 'Enter your shipping address', 
      label: 'Enter your shipping address', 
      type: 'section_header', 
      enabled: true, 
      canEdit: true,
      alignment: 'Center',
      fontSize: 14,
      fontWeight: 'Bold',
      textColor: 'rgba(0,0,0,1)'
    },
    { 
      id: 'fullname', 
      name: 'Full Name', 
      label: 'Full Name', 
      type: 'field', 
      enabled: true, 
      required: true, 
      canEdit: true, 
      placeholder: 'Full Name', 
      showIcon: true,
      icon: 'user',
      minLength: 2,
      maxLength: 250,
      regexValidation: '',
      invalidErrorText: ''
    },
    { 
      id: 'lastname', 
      name: 'Last name', 
      label: 'Last name', 
      type: 'field', 
      enabled: false, 
      required: false, 
      canEdit: true, 
      placeholder: 'Last Name', 
      showIcon: true,
      icon: 'user',
      minLength: 2,
      maxLength: 250
    },
    { 
      id: 'phone', 
      name: 'Phone number', 
      label: 'Phone number', 
      type: 'field', 
      enabled: true, 
      required: true, 
      canEdit: true, 
      placeholder: 'Phone', 
      showIcon: true,
      icon: 'phone',
      minLength: 1,
      maxLength: 15,
      prefixText: '',
      invalidErrorText: 'Enter a valid phone number.'
    },
    { 
      id: 'address', 
      name: 'Address', 
      label: 'Address', 
      type: 'field', 
      enabled: true, 
      required: true, 
      canEdit: true, 
      placeholder: 'Full Address', 
      showIcon: true,
      icon: 'map-pin',
      minLength: 2,
      maxLength: 250,
      regexValidation: '',
      prefixText: '',
      invalidErrorText: ''
    },
    { 
      id: 'address2', 
      name: 'Address 2', 
      label: 'Address 2', 
      type: 'field', 
      enabled: false, 
      required: false, 
      canEdit: true, 
      placeholder: 'Apartment, suite, etc.',
      showIcon: true,
      icon: 'map-pin',
      minLength: 2,
      maxLength: 250
    },
    { 
      id: 'province', 
      name: 'Province', 
      label: 'Province', 
      type: 'field', 
      enabled: false, 
      required: true, 
      canEdit: true, 
      placeholder: 'Province',
      disableDropdown: false,
      removedProvinces: ''
    },
    { 
      id: 'city', 
      name: 'City', 
      label: 'City', 
      type: 'field', 
      enabled: true, 
      required: true, 
      canEdit: true, 
      placeholder: 'City', 
      showIcon: true,
      icon: 'map-pin',
      minLength: 2,
      maxLength: 250,
      regexValidation: '',
      prefixText: '',
      invalidErrorText: ''
    },
    { 
      id: 'zip', 
      name: 'Zip code', 
      label: 'Zip code', 
      type: 'field', 
      enabled: false, 
      required: true, 
      canEdit: true, 
      placeholder: 'Zip code', 
      showIcon: true,
      icon: 'map-pin',
      minLength: 2,
      maxLength: 250,
      regexValidation: '',
      prefixText: '',
      invalidErrorText: ''
    },
    { 
      id: 'email', 
      name: 'Email', 
      label: 'Email', 
      type: 'field', 
      enabled: false, 
      required: false, 
      canEdit: true, 
      placeholder: 'Email',
      showIcon: true,
      icon: 'mail',
      minLength: 5,
      maxLength: 250
    },
    { 
      id: 'order_note', 
      name: 'Order note', 
      label: 'Order note', 
      type: 'field', 
      enabled: false, 
      required: false, 
      canEdit: true, 
      placeholder: 'Order note',
      showIcon: false,
      minLength: 0,
      maxLength: 500
    },
    { 
      id: 'subscribe', 
      name: 'Subscribe to stay updated...', 
      label: 'Subscribe to stay updated with new products and offers!', 
      type: 'checkbox', 
      enabled: false, 
      canEdit: true,
      preselected: false
    },
    { 
      id: 'terms', 
      name: 'Accept our <a...', 
      label: 'Accept our <a href="/policies/terms-of-service">terms of service</a>', 
      type: 'checkbox', 
      enabled: false, 
      required: true, 
      canEdit: true 
    },
    { 
      id: 'submit', 
      name: 'COMPLETE ORDER - {order_total}', 
      label: 'COMPLETE ORDER - {order_total}', 
      type: 'button', 
      enabled: true, 
      canEdit: true,
      subtitle: '',
      animation: 'None',
      icon: 'Button icon',
      backgroundColor: 'rgba(0,0,0,1)',
      textColor: 'rgba(255,255,255,1)',
      fontSize: 14,
      borderRadius: 8,
      borderWidth: 0,
      borderColor: 'rgba(0,0,0,1)',
      shadow: 2
    },
  ];

  const formStyle: FormStyleConfig = settings.formStyle || {
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
  };

  const formTexts: FormTextsConfig = settings.formTexts || {
    requiredFieldError: 'This field is required.',
    invalidGenericError: 'Enter a valid value.',
  };

  const updateSetting = <K extends keyof FormSettings>(key: K, value: FormSettings[K]) => {
    onUpdateSettings({
      ...settings,
      [key]: value
    });
  };

  const updateFormStyle = (updates: Partial<FormStyleConfig>) => {
    updateSetting('formStyle', {
      ...formStyle,
      ...updates
    });
  };

  const updateFormTexts = (updates: Partial<FormTextsConfig>) => {
    updateSetting('formTexts', {
      ...formTexts,
      ...updates
    });
  };

  // Toggle block enabled/disabled (matching Eye icon button)
  const toggleBlockEnabled = (blockId: string) => {
    const updated = formBlocks.map(b => b.id === blockId ? { ...b, enabled: !b.enabled } : b);
    updateSetting('blocks', updated);
  };

  // Update specific block settings in real-time
  const updateBlock = (blockId: string, updates: Partial<FormBlockItem>) => {
    const updated = formBlocks.map(b => b.id === blockId ? { ...b, ...updates } : b);
    updateSetting('blocks', updated);
  };

  // Move block up
  const moveBlockUp = (index: number) => {
    if (index === 0) return;
    const updated = [...formBlocks];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    updateSetting('blocks', updated);
  };

  // Move block down
  const moveBlockDown = (index: number) => {
    if (index === formBlocks.length - 1) return;
    const updated = [...formBlocks];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    updateSetting('blocks', updated);
  };

  // Save changes to edited block
  const handleSaveBlockEdit = () => {
    if (!editingBlock) return;
    const updated = formBlocks.map(b => b.id === editingBlock.id ? editingBlock : b);
    updateSetting('blocks', updated);
    setEditingBlock(null);
  };

  // Reset Form Style to default
  const handleResetStyle = () => {
    updateFormStyle({
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
    });
  };

  // Delete block (supports custom and removable blocks)
  const deleteBlock = (blockId: string) => {
    const updated = formBlocks.filter(b => b.id !== blockId);
    updateSetting('blocks', updated);
    if (expandedBlockId === blockId) {
      setExpandedBlockId(null);
    }
  };

  // Add new custom field / element from modal
  const handleAddCustomBlock = (customBlock: FormBlockItem) => {
    const submitIndex = formBlocks.findIndex(b => b.id === 'submit' || b.type === 'button');
    const updated = [...formBlocks];
    if (submitIndex !== -1) {
      updated.splice(submitIndex, 0, customBlock);
    } else {
      updated.push(customBlock);
    }
    updateSetting('blocks', updated);
    setShowAddFieldModal(false);
    // Expand the newly added block so user can immediately view/edit settings
    setExpandedBlockId(customBlock.id);
  };

  // Custom field templates exactly matching reference screenshot
  const customFieldOptions = [
    {
      id: 'title_or_text',
      name: 'Title or text',
      description: 'Add a custom heading, paragraph or informative text block.',
      create: (): FormBlockItem => ({
        id: `custom_title_${Date.now()}`,
        name: 'Title or text',
        label: 'Your text title',
        type: 'section_header',
        enabled: true,
        canEdit: true,
        canDelete: true,
        isCustom: true,
        alignment: 'Center',
        fontSize: 14,
        fontWeight: 'Bold',
        textColor: 'rgba(0,0,0,1)'
      })
    },
    {
      id: 'image_or_gif',
      name: 'Image or GIF',
      description: 'Display an image banner, trust badges, guarantee icons or animated GIF.',
      create: (): FormBlockItem => ({
        id: `custom_image_${Date.now()}`,
        name: 'Image or GIF',
        label: 'Image or GIF',
        type: 'image',
        enabled: true,
        canEdit: true,
        canDelete: true,
        isCustom: true,
        imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
        imageAlt: 'Promotional Banner',
        alignment: 'Center',
        borderRadius: 8
      })
    },
    {
      id: 'shopify_checkout_button',
      name: 'Shopify checkout button',
      description: 'Add a secondary button to redirect directly to regular Shopify checkout.',
      create: (): FormBlockItem => ({
        id: `custom_shopify_${Date.now()}`,
        name: 'Shopify checkout button',
        label: 'CHECKOUT WITH SHOPIFY',
        type: 'shopify_button',
        enabled: true,
        canEdit: true,
        canDelete: true,
        isCustom: true,
        backgroundColor: '#5c6ac4',
        textColor: '#ffffff',
        borderRadius: 8,
        fontSize: 13
      })
    },
    {
      id: 'whatsapp_button',
      name: 'WhatsApp button',
      description: 'Allow customers to order or message your team directly on WhatsApp.',
      create: (): FormBlockItem => ({
        id: `custom_wa_${Date.now()}`,
        name: 'WhatsApp button',
        label: 'Order on WhatsApp',
        type: 'whatsapp_button',
        enabled: true,
        canEdit: true,
        canDelete: true,
        isCustom: true,
        whatsappNumber: '+92 300 1234567',
        whatsappMessage: 'Hi! I would like to order {product_name} for {order_total}',
        backgroundColor: '#25D366',
        textColor: '#ffffff',
        borderRadius: 8,
        fontSize: 13
      })
    },
    {
      id: 'quantity_selector_field',
      name: 'Quantity selector field',
      description: 'Let customers choose or change the product quantity before placing order.',
      create: (): FormBlockItem => ({
        id: `custom_qty_${Date.now()}`,
        name: 'Quantity selector field',
        label: 'Quantity',
        type: 'quantity',
        enabled: true,
        canEdit: true,
        canDelete: true,
        isCustom: true,
        minQty: 1,
        maxQty: 10,
        defaultQty: 1
      })
    },
    {
      id: 'text_input',
      name: 'Text input',
      description: 'Single-line text input field (e.g. CNIC, landmark, delivery notes).',
      create: (): FormBlockItem => ({
        id: `custom_text_${Date.now()}`,
        name: 'Your field name',
        label: 'Your field name',
        placeholder: 'Your field name',
        type: 'field',
        enabled: true,
        canEdit: true,
        canDelete: true,
        isCustom: true,
        showIcon: true,
        icon: 'align-left',
        required: false,
        minLength: 0,
        maxLength: 250
      })
    },
    {
      id: 'dropdown_list',
      name: 'Dropdown list',
      description: 'Create a dropdown select menu with customizable options.',
      create: (): FormBlockItem => ({
        id: `custom_dropdown_${Date.now()}`,
        name: 'Dropdown list',
        label: 'Select an option',
        placeholder: 'Select an option...',
        type: 'dropdown',
        options: ['Option 1', 'Option 2', 'Option 3'],
        enabled: true,
        canEdit: true,
        canDelete: true,
        isCustom: true,
        required: false
      })
    },
    {
      id: 'single_choice_input',
      name: 'Single-choice input',
      description: 'Radio buttons for customer to pick one mutually exclusive option.',
      create: (): FormBlockItem => ({
        id: `custom_radio_${Date.now()}`,
        name: 'Single-choice input',
        label: 'Choose an option',
        type: 'radio',
        options: ['Option 1', 'Option 2'],
        enabled: true,
        canEdit: true,
        canDelete: true,
        isCustom: true,
        required: false
      })
    },
    {
      id: 'checkbox',
      name: 'Checkbox',
      description: 'Add a standalone checkbox or agreement consent toggle.',
      create: (): FormBlockItem => ({
        id: `custom_checkbox_${Date.now()}`,
        name: 'Checkbox',
        label: 'I agree to the terms and conditions',
        type: 'checkbox',
        enabled: true,
        canEdit: true,
        canDelete: true,
        isCustom: true,
        preselected: false,
        required: false
      })
    },
    {
      id: 'date_selector',
      name: 'Date selector',
      description: 'Date picker input for preferred delivery date or scheduled occasion.',
      create: (): FormBlockItem => ({
        id: `custom_date_${Date.now()}`,
        name: 'Date selector',
        label: 'Preferred delivery date',
        type: 'date',
        enabled: true,
        canEdit: true,
        canDelete: true,
        isCustom: true,
        required: false
      })
    },
    {
      id: 'link_button',
      name: 'Link button',
      description: 'A customizable button linking to an external website, size guide or FAQs.',
      create: (): FormBlockItem => ({
        id: `custom_link_${Date.now()}`,
        name: 'Link button',
        label: 'View Size Guide & FAQs',
        type: 'link_button',
        linkUrl: 'https://example.com',
        openInNewTab: true,
        enabled: true,
        canEdit: true,
        canDelete: true,
        isCustom: true,
        backgroundColor: '#f3f4f6',
        textColor: '#111827',
        borderRadius: 8
      })
    },
    {
      id: 'textarea',
      name: 'Multi-line text area',
      description: 'Multi-line text box for longer messages or special delivery instructions.',
      create: (): FormBlockItem => ({
        id: `custom_textarea_${Date.now()}`,
        name: 'Special instructions',
        label: 'Special delivery instructions',
        placeholder: 'Enter special delivery instructions...',
        type: 'field',
        fieldInputType: 'textarea',
        enabled: true,
        canEdit: true,
        canDelete: true,
        isCustom: true,
        required: false
      })
    }
  ];

  // Shipping Rates mock data for Shipping Rates tab
  const [shippingRatesList, setShippingRatesList] = useState([
    { id: '1', name: 'Free shipping', price: 0, minOrder: 0, active: true },
    { id: '2', name: 'Standard Delivery (Pakistan)', price: 150, minOrder: 0, active: true },
    { id: '3', name: 'Express 24h Delivery (Karachi & Lahore)', price: 300, minOrder: 0, active: true },
  ]);

  return (
    <div className="min-h-screen bg-[#f6f6f7] text-neutral-900 font-sans pb-16">
      {/* 1. TOP SEGMENTED CONTROLS BAR MATCHING SCREENSHOT */}
      <div className="pt-4 pb-2 flex justify-center">
        <div className="bg-white border border-neutral-200/90 rounded-xl p-1 shadow-2xs inline-flex items-center gap-1">
          <button
            onClick={() => setActiveSubTab('form-designer')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'form-designer'
                ? 'bg-[#e4e4e7] text-neutral-900 shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Form Designer</span>
          </button>

          <button
            onClick={() => setActiveSubTab('shipping-rates')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'shipping-rates'
                ? 'bg-[#e4e4e7] text-neutral-900 shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Shipping Rates</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* SUBTAB 2: SHIPPING RATES VIEW */}
        {activeSubTab === 'shipping-rates' ? (
          <div className="py-6 space-y-6 max-w-3xl mx-auto">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Shipping Rates
              </h1>
              <p className="text-xs text-neutral-500 mt-1">
                Configure delivery rates shown on the COD order form for different regions and cart thresholds.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  Active Shipping Methods
                </span>
                <button
                  onClick={() => {
                    const newRate = {
                      id: `${Date.now()}`,
                      name: 'Flat Rate Courier',
                      price: 200,
                      minOrder: 0,
                      active: true
                    };
                    setShippingRatesList([...shippingRatesList, newRate]);
                  }}
                  className="px-3 py-1 bg-black text-white text-xs font-medium rounded-lg hover:bg-neutral-800 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Rate</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {shippingRatesList.map((rate, idx) => (
                  <div key={rate.id} className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-neutral-900">{rate.name}</div>
                      <div className="text-[11px] text-neutral-500">
                        {rate.price === 0 ? 'Free Shipping' : `Rs. ${rate.price.toFixed(2)}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        Active
                      </span>
                      {idx > 0 && (
                        <button
                          onClick={() => setShippingRatesList(shippingRatesList.filter(r => r.id !== rate.id))}
                          className="text-xs text-red-500 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* SUBTAB 1: FORM DESIGNER (MATCHING SCREENSHOT) */
          <div className="py-4">
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mb-5">
              Form Designer
            </h1>

            {/* 2-COLUMN LAYOUT: Left = Controls, Right = Sticky Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT COLUMN: Controls (approx 58%) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. SELECT YOUR FORM MODE */}
                <div className="space-y-3">
                  <h2 className="text-sm font-bold text-neutral-900">
                    1. Select your form mode
                  </h2>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Popup Card */}
                    <button
                      type="button"
                      onClick={() => updateSetting('formMode', 'popup')}
                      className={`p-4 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        formMode === 'popup'
                          ? 'bg-[#d8d8d8]/80 border-neutral-500 text-neutral-900 shadow-2xs font-bold'
                          : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded border border-neutral-400 bg-white/80 flex items-center justify-center">
                        <div className="w-5 h-4 border border-neutral-700 rounded-xs flex flex-col">
                          <div className="h-1 bg-neutral-400 border-b border-neutral-700 flex justify-end px-0.5">
                            <span className="w-0.5 h-0.5 bg-neutral-800 block"></span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold">Popup</span>
                    </button>

                    {/* Embedded Card */}
                    <button
                      type="button"
                      onClick={() => updateSetting('formMode', 'embedded')}
                      className={`p-4 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        formMode === 'embedded'
                          ? 'bg-[#d8d8d8]/80 border-neutral-500 text-neutral-900 shadow-2xs font-bold'
                          : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded border border-neutral-300 bg-white flex items-center justify-center">
                        <div className="w-5 h-5 border border-neutral-500 rounded-xs p-0.5 flex flex-col gap-0.5">
                          <div className="h-1 bg-neutral-300 w-full"></div>
                          <div className="h-2 bg-neutral-200 w-full"></div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold">Embedded</span>
                    </button>
                  </div>

                  {/* Blue Info Notice with Close (X) */}
                  {showPopupInfo && (
                    <div className="p-3 bg-[#eef6fc] border border-[#cbe3f7] rounded-xl text-xs text-[#1c4772] flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-[#206095] shrink-0 mt-0.5" />
                        <span>
                          When your customers click on the app's <strong className="font-semibold text-neutral-900">Buy Button</strong> the form will open as a popup on the page.
                        </span>
                      </div>
                      <button
                        onClick={() => setShowPopupInfo(false)}
                        className="text-neutral-400 hover:text-neutral-700 cursor-pointer p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Buy Button Accordion Card - Exactly matching user screenshot */}
                  <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
                    <div className="p-3.5 flex items-center justify-between">
                      <div>
                        <div className="text-xs sm:text-[13px] font-bold text-neutral-900">
                          Buy Button
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Customize the form Buy Now button
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const willOpen = !showBuyButtonSettings;
                          setShowBuyButtonSettings(willOpen);
                          setActivePreviewMode(willOpen ? 'button' : 'form');
                        }}
                        className="text-xs text-[#1c4772] hover:text-blue-800 flex items-center gap-1 cursor-pointer font-medium"
                      >
                        <span>Preview</span>
                        {showBuyButtonSettings ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Accordion Expanded Settings matching Screenshot */}
                    {showBuyButtonSettings && (
                      <div className="p-4 bg-neutral-50/50 border-t border-neutral-200 space-y-3.5">
                        {/* Row 1: Button text & Button subtitle */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                              Button text
                            </label>
                            <input
                              type="text"
                              value={settings.buttonText || 'Buy with Cash on Delivery'}
                              onChange={(e) => updateSetting('buttonText', e.target.value)}
                              className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 outline-none focus:border-neutral-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                              Button subtitle
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              value={settings.buttonSubtitle || ''}
                              onChange={(e) => updateSetting('buttonSubtitle', e.target.value)}
                              className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 outline-none focus:border-neutral-500"
                            />
                          </div>
                        </div>

                        {/* Row 2: Button animation & Button icon */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                              Button animation
                            </label>
                            <select
                              value={settings.buttonAnimation || 'Shaker'}
                              onChange={(e) => updateSetting('buttonAnimation', e.target.value)}
                              className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 outline-none cursor-pointer"
                            >
                              <option value="Shaker">Shaker</option>
                              <option value="Pulse">Pulse</option>
                              <option value="Bounce">Bounce</option>
                              <option value="None">None</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                              Button icon
                            </label>
                            <select
                              value={settings.buttonIcon || 'Button icon'}
                              onChange={(e) => updateSetting('buttonIcon', e.target.value)}
                              className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 outline-none cursor-pointer"
                            >
                              <option value="Button icon">Button icon (Cart)</option>
                              <option value="Bag icon">Bag icon</option>
                              <option value="Truck icon">Truck icon</option>
                              <option value="No icon">No icon</option>
                            </select>
                          </div>
                        </div>

                        {/* Row 3: Sticky button position & Background color */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                              Sticky button position
                            </label>
                            <select
                              value={settings.stickyButtonPosition || 'Bottom'}
                              onChange={(e) => updateSetting('stickyButtonPosition', e.target.value as 'Top' | 'Bottom')}
                              className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 outline-none cursor-pointer"
                            >
                              <option value="Bottom">Bottom</option>
                              <option value="Top">Top</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                              Background color
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value="#000000"
                                onChange={(e) => updateSetting('buttonColor', e.target.value)}
                                className="w-7 h-7 rounded-full border border-neutral-300 cursor-pointer shrink-0"
                              />
                              <input
                                type="text"
                                value={settings.buttonColor || 'rgba(0,0,0,1)'}
                                onChange={(e) => updateSetting('buttonColor', e.target.value)}
                                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-neutral-300 font-mono text-neutral-800"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Row 4: Text color & Font size */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                              Text color
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value="#ffffff"
                                onChange={(e) => updateSetting('buttonTextColor', e.target.value)}
                                className="w-7 h-7 rounded-full border border-neutral-300 cursor-pointer shrink-0"
                              />
                              <input
                                type="text"
                                value={settings.buttonTextColor || 'rgba(255,255,255,1)'}
                                onChange={(e) => updateSetting('buttonTextColor', e.target.value)}
                                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-neutral-300 font-mono text-neutral-800"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center text-[11px] font-semibold text-neutral-700 mb-1">
                              <span>Font size</span>
                              <span className="text-neutral-500 font-normal">{settings.buttonFontSize || 15}px</span>
                            </div>
                            <input
                              type="range"
                              min="12"
                              max="24"
                              value={settings.buttonFontSize || 15}
                              onChange={(e) => updateSetting('buttonFontSize', Number(e.target.value))}
                              className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800"
                            />
                          </div>
                        </div>

                        {/* Row 5: Border radius & Border width */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <div className="flex justify-between items-center text-[11px] font-semibold text-neutral-700 mb-1">
                              <span>Border radius</span>
                              <span className="text-neutral-500 font-normal">{settings.buttonBorderRadius ?? 24}px</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="32"
                              value={settings.buttonBorderRadius ?? 24}
                              onChange={(e) => updateSetting('buttonBorderRadius', Number(e.target.value))}
                              className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between items-center text-[11px] font-semibold text-neutral-700 mb-1">
                              <span>Border width</span>
                              <span className="text-neutral-500 font-normal">{settings.buttonBorderWidth ?? 0}px</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="6"
                              value={settings.buttonBorderWidth ?? 0}
                              onChange={(e) => updateSetting('buttonBorderWidth', Number(e.target.value))}
                              className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800"
                            />
                          </div>
                        </div>

                        {/* Row 6: Border color & Shadow */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                              Border color
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value="#000000"
                                onChange={(e) => updateSetting('buttonBorderColor', e.target.value)}
                                className="w-7 h-7 rounded-full border border-neutral-300 cursor-pointer shrink-0"
                              />
                              <input
                                type="text"
                                value={settings.buttonBorderColor || 'rgba(0,0,0,1)'}
                                onChange={(e) => updateSetting('buttonBorderColor', e.target.value)}
                                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-neutral-300 font-mono text-neutral-800"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center text-[11px] font-semibold text-neutral-700 mb-1">
                              <span>Shadow</span>
                              <span className="text-neutral-500 font-normal">{settings.buttonShadow ?? 2}px</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="16"
                              value={settings.buttonShadow ?? 2}
                              onChange={(e) => updateSetting('buttonShadow', Number(e.target.value))}
                              className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800"
                            />
                          </div>
                        </div>

                        {/* Row 7: Checkbox */}
                        <div className="pt-2">
                          <label className="flex items-start gap-2.5 text-xs text-neutral-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.enableStickyMobile ?? true}
                              onChange={(e) => updateSetting('enableStickyMobile', e.target.checked)}
                              className="w-4 h-4 mt-0.5 rounded text-neutral-900 focus:ring-neutral-500"
                            />
                            <span className="leading-snug">
                              Enable sticky button on mobile devices (only on product pages)
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. SELECT YOUR FORM COUNTRY */}
                <div className="space-y-3">
                  <h2 className="text-sm font-bold text-neutral-900">
                    2. Select your form country
                  </h2>

                  <div className="bg-white rounded-xl border border-neutral-200 p-4 space-y-2.5 shadow-2xs">
                    <label className="block text-xs font-semibold text-neutral-800">
                      Country
                    </label>

                    <select
                      value={selectedCountry}
                      onChange={(e) => updateSetting('selectedCountry', e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 outline-none cursor-pointer"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="India">India</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Other">Other Country</option>
                    </select>

                    <p className="text-[11px] text-neutral-500 italic leading-relaxed">
                      All orders placed with the form will be registered with the country you select here. If you can't find your country don't hesitate to contact us, our support team will add your country immediately!
                    </p>
                  </div>

                  {/* Notification Card 1: Province and City Dropdown */}
                  {showProvinceInfo && (
                    <div className="p-3.5 bg-[#eef6fc] border border-[#cbe3f7] rounded-xl text-xs text-[#1c4772] space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-[#206095] shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-neutral-900">
                              Do you need a province and city dropdown?
                            </div>
                            <div className="text-[11px] text-[#24527d] mt-0.5 leading-relaxed">
                              Contact us below, we will help you apply provinces / cities / zip codes dropdowns on your form based on your needs so that you can obtain more accurate address information from your customers!
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowProvinceInfo(false)}
                          className="text-neutral-400 hover:text-neutral-700 cursor-pointer p-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => setShowContactModal(true)}
                        className="px-3 py-1.5 bg-white border border-[#bedbf4] text-[#1c4772] rounded-lg text-xs font-semibold hover:bg-neutral-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Contact us</span>
                      </button>
                    </div>
                  )}

                  {/* Notification Card 2: English Characters Tutorial */}
                  {showEnglishInfo && (
                    <div className="p-3 bg-[#eef6fc] border border-[#cbe3f7] rounded-xl text-xs text-[#1c4772] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-[#206095] shrink-0" />
                        <span>
                          To only allow <strong className="font-semibold text-neutral-900">English characters</strong> in your form fields follow this tutorial:
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setShowTutorialModal(true)}
                          className="px-2.5 py-1 bg-white border border-[#bedbf4] text-[#1c4772] rounded-lg text-xs font-semibold hover:bg-neutral-50 flex items-center gap-1 cursor-pointer shadow-2xs"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Open tutorial</span>
                        </button>
                        <button
                          onClick={() => setShowEnglishInfo(false)}
                          className="text-neutral-400 hover:text-neutral-700 cursor-pointer p-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Multi-country card */}
                  <div className="bg-white rounded-xl border border-neutral-200 p-3.5 space-y-1.5 shadow-2xs">
                    <div className="text-xs font-bold text-neutral-900">
                      Do you sell in multiple countries?
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      Enable multi-country on the form here:
                    </div>
                    <div className="pt-1">
                      <button
                        onClick={() => {
                          const updated = !settings.enableMultiCountry;
                          updateSetting('enableMultiCountry', updated);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          settings.enableMultiCountry
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-neutral-900 text-white hover:bg-black'
                        }`}
                      >
                        {settings.enableMultiCountry ? '✓ Multi-country Enabled' : 'Enable multi-country'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. CUSTOMIZE YOUR FORM */}
                <div className="space-y-3">
                  <h2 className="text-sm font-bold text-neutral-900">
                    3. Customize your form
                  </h2>

                  {/* Instruction Legend Box matching screenshot */}
                  <div className="bg-[#f4f4f4] border border-neutral-200/90 rounded-xl p-3.5 text-xs text-neutral-700 space-y-1.5 leading-relaxed">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-xs bg-[#e0e0e0] border border-neutral-300 inline-block shrink-0"></span>
                      <span>Gray blocks are <strong className="font-semibold text-neutral-900">disabled</strong> on your form. Use the eye button to enable them.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-xs bg-white border border-neutral-300 inline-block shrink-0"></span>
                      <span>White blocks are <strong className="font-semibold text-neutral-900">active</strong> on your form.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-xs bg-blue-500 inline-block shrink-0"></span>
                      <span>Blue blocks are activated when a card is being dragged across the form. Release the card to complete the action.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-neutral-600 shrink-0">
                        <Pencil className="w-3.5 h-3.5" />
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>Click the <strong className="font-semibold text-neutral-900">pencil</strong> button to open settings, and click the <strong className="font-semibold text-neutral-900">tick (✓)</strong> to save and close.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span>Press and move the <strong className="font-semibold text-neutral-900">dragger</strong> button to move a block.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-neutral-500 shrink-0">
                        <ArrowUp className="w-3 h-3" />
                        <ArrowDown className="w-3 h-3" />
                      </div>
                      <span>Click the <strong className="font-semibold text-neutral-900">arrows</strong> buttons to change the position of a block.</span>
                    </div>
                  </div>

                  {/* Form Blocks List */}
                  <div className="space-y-1.5">
                    {/* Header bar */}
                    <div className="p-2.5 px-3 bg-neutral-200/60 rounded-lg flex items-center justify-between text-xs text-neutral-700 font-semibold tracking-wider uppercase">
                      <span>CASH ON DELIVERY</span>
                      <button
                        onClick={() => {
                          const newTitle = prompt('Enter Form Title:', settings.formTitle || 'CASH ON DELIVERY');
                          if (newTitle) updateSetting('formTitle', newTitle);
                        }}
                        className="text-neutral-500 hover:text-neutral-900 p-0.5 cursor-pointer"
                        title="Edit Form Title"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Block Rows */}
                    <div className="space-y-1.5">
                      {formBlocks.map((block, index) => {
                        const isDragging = draggedBlockId === block.id;
                        const isExpanded = expandedBlockId === block.id;

                        return (
                          <div
                            key={block.id}
                            className={`rounded-lg border text-xs overflow-hidden transition-all shadow-2xs ${
                              isDragging
                                ? 'bg-blue-100 border-blue-400 shadow-sm'
                                : block.enabled
                                ? 'bg-white border-neutral-200 text-neutral-800'
                                : 'bg-[#ededed] border-neutral-200/80 text-neutral-500'
                            }`}
                          >
                            {/* Block Header Row */}
                            <div
                              draggable
                              onDragStart={() => setDraggedBlockId(block.id)}
                              onDragEnd={() => setDraggedBlockId(null)}
                              className={`px-3 py-2 flex items-center justify-between select-none ${
                                !block.enabled ? 'bg-[#ededed]' : 'bg-white'
                              }`}
                            >
                              {/* Left: Dragger + Eye + Name */}
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="cursor-grab active:cursor-grabbing text-neutral-400 hover:text-neutral-600">
                                  <GripVertical className="w-3.5 h-3.5" />
                                </span>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBlockEnabled(block.id);
                                  }}
                                  className={`p-0.5 rounded cursor-pointer ${
                                    block.enabled
                                      ? 'text-neutral-700 hover:text-black'
                                      : 'text-neutral-400 hover:text-neutral-600'
                                  }`}
                                  title={block.enabled ? 'Click to disable' : 'Click to enable'}
                                >
                                  {block.enabled ? (
                                    <Eye className="w-3.5 h-3.5" />
                                  ) : (
                                    <EyeOff className="w-3.5 h-3.5" />
                                  )}
                                </button>

                                <span className={`truncate font-medium ${block.enabled ? 'text-neutral-900' : 'text-neutral-500'}`}>
                                  {block.name}
                                </span>
                              </div>

                              {/* Right: Pencil / Tick (✓) (if canEdit) + Up/Down arrows */}
                              <div className="flex items-center gap-1.5 shrink-0">
                                {block.canEdit && (
                                  <button
                                    type="button"
                                    onClick={() => setExpandedBlockId(isExpanded ? null : block.id)}
                                    className={`p-1 rounded cursor-pointer transition-colors ${
                                      isExpanded
                                        ? 'text-neutral-900 bg-neutral-100 hover:bg-neutral-200'
                                        : 'text-neutral-400 hover:text-neutral-800 hover:bg-neutral-50'
                                    }`}
                                    title={isExpanded ? 'Save and close settings' : 'Edit Block'}
                                  >
                                    {isExpanded ? (
                                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                    ) : (
                                      <Pencil className="w-3 h-3" />
                                    )}
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => moveBlockUp(index)}
                                  disabled={index === 0}
                                  className="text-neutral-400 hover:text-neutral-800 disabled:opacity-30 disabled:hover:text-neutral-400 p-0.5 cursor-pointer"
                                  title="Move Up"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => moveBlockDown(index)}
                                  disabled={index === formBlocks.length - 1}
                                  className="text-neutral-400 hover:text-neutral-800 disabled:opacity-30 disabled:hover:text-neutral-400 p-0.5 cursor-pointer"
                                  title="Move Down"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>

                                {(block.canDelete || block.isCustom || block.id.startsWith('custom_')) && (
                                  <button
                                    type="button"
                                    onClick={() => deleteBlock(block.id)}
                                    className="text-neutral-400 hover:text-red-600 hover:bg-red-50 p-1 rounded cursor-pointer transition-colors"
                                    title="Delete Block"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Inline Settings Body */}
                            {isExpanded && (
                              <FormFieldSettings
                                block={block}
                                onUpdate={(updates) => updateBlock(block.id, updates)}
                                onClose={() => setExpandedBlockId(null)}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Add custom field button matching screenshot */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddFieldModal(true)}
                        className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add a custom field, button, text or image</span>
                      </button>
                    </div>
                  </div>

                  {/* Form Style Card matching screenshot */}
                  <div className="bg-white rounded-xl border border-neutral-200 p-4 space-y-4 shadow-2xs">
                    <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                      <span className="text-xs font-bold text-neutral-900">
                        Form style
                      </span>
                      <button
                        onClick={handleResetStyle}
                        className="text-xs text-neutral-600 hover:text-neutral-900 flex items-center gap-1 cursor-pointer font-medium"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset to default</span>
                      </button>
                    </div>

                    {/* Controls Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Text color */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-neutral-700">
                          Text color
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value="#000000"
                            onChange={(e) => updateFormStyle({ textColor: e.target.value })}
                            className="w-7 h-7 rounded-full border border-neutral-300 cursor-pointer shrink-0"
                          />
                          <input
                            type="text"
                            value={formStyle.textColor}
                            onChange={(e) => updateFormStyle({ textColor: e.target.value })}
                            className="w-full text-xs px-2 py-1.5 rounded-lg border border-neutral-300 font-mono text-neutral-800"
                          />
                        </div>
                      </div>

                      {/* Font size */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[11px] font-semibold text-neutral-700">
                          <span>Font size</span>
                          <span className="text-neutral-500 font-normal">{formStyle.fontSize}px</span>
                        </div>
                        <input
                          type="range"
                          min="11"
                          max="20"
                          value={formStyle.fontSize}
                          onChange={(e) => updateFormStyle({ fontSize: Number(e.target.value) })}
                          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800"
                        />
                      </div>

                      {/* Background color */}
                      <div className="space-y-1 sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-neutral-700">
                          Background color
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value="#ffffff"
                            onChange={(e) => updateFormStyle({ backgroundColor: e.target.value })}
                            className="w-7 h-7 rounded border border-neutral-300 cursor-pointer shrink-0"
                          />
                          <input
                            type="text"
                            value={formStyle.backgroundColor}
                            onChange={(e) => updateFormStyle({ backgroundColor: e.target.value })}
                            className="w-full text-xs px-2 py-1.5 rounded-lg border border-neutral-300 font-mono text-neutral-800"
                          />
                        </div>
                        <p className="text-[11px] text-neutral-500 italic mt-0.5">
                          <strong className="font-semibold text-neutral-700">Important:</strong> changing the background color of your form could negatively affect your conversion rate.
                        </p>
                      </div>

                      {/* Border radius */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[11px] font-semibold text-neutral-700">
                          <span>Border radius</span>
                          <span className="text-neutral-500 font-normal">{formStyle.borderRadius}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="24"
                          value={formStyle.borderRadius}
                          onChange={(e) => updateFormStyle({ borderRadius: Number(e.target.value) })}
                          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800"
                        />
                      </div>

                      {/* Border width */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[11px] font-semibold text-neutral-700">
                          <span>Border width</span>
                          <span className="text-neutral-500 font-normal">{formStyle.borderWidth}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="4"
                          value={formStyle.borderWidth}
                          onChange={(e) => updateFormStyle({ borderWidth: Number(e.target.value) })}
                          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800"
                        />
                      </div>

                      {/* Border color */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-neutral-700">
                          Border color
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value="#000000"
                            onChange={(e) => updateFormStyle({ borderColor: e.target.value })}
                            className="w-7 h-7 rounded-full border border-neutral-300 cursor-pointer shrink-0"
                          />
                          <input
                            type="text"
                            value={formStyle.borderColor}
                            onChange={(e) => updateFormStyle({ borderColor: e.target.value })}
                            className="w-full text-xs px-2 py-1.5 rounded-lg border border-neutral-300 font-mono text-neutral-800"
                          />
                        </div>
                      </div>

                      {/* Shadow */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[11px] font-semibold text-neutral-700">
                          <span>Shadow</span>
                          <span className="text-neutral-500 font-normal">{formStyle.shadow}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={formStyle.shadow}
                          onChange={(e) => updateFormStyle({ shadow: Number(e.target.value) })}
                          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800"
                        />
                      </div>
                    </div>

                    {/* Style Checkboxes matching screenshot */}
                    <div className="pt-2 border-t border-neutral-100 space-y-2">
                      <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formStyle.hideCloseButton}
                          onChange={(e) => updateFormStyle({ hideCloseButton: e.target.checked })}
                          className="w-3.5 h-3.5 rounded text-neutral-800 focus:ring-neutral-500"
                        />
                        <span>Hide close form button</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formStyle.hideFieldLabels}
                          onChange={(e) => updateFormStyle({ hideFieldLabels: e.target.checked })}
                          className="w-3.5 h-3.5 rounded text-neutral-800 focus:ring-neutral-500"
                        />
                        <span>Hide fields labels</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formStyle.enableRtl}
                          onChange={(e) => updateFormStyle({ enableRtl: e.target.checked })}
                          className="w-3.5 h-3.5 rounded text-neutral-800 focus:ring-neutral-500"
                        />
                        <span>Enable RTL support (for Arabic languages)</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs text-neutral-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formStyle.enableFullScreenMobile}
                          onChange={(e) => updateFormStyle({ enableFullScreenMobile: e.target.checked })}
                          className="w-3.5 h-3.5 rounded text-neutral-800 focus:ring-neutral-500"
                        />
                        <span>Enable the full screen form on mobile devices</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* 4. CUSTOMIZE THE GENERIC FORM TEXTS */}
                <div className="space-y-3">
                  <h2 className="text-sm font-bold text-neutral-900">
                    4. Customize the generic form texts
                  </h2>

                  <div className="bg-white rounded-xl border border-neutral-200 p-4 space-y-3.5 shadow-2xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        Required field error text
                      </label>
                      <input
                        type="text"
                        value={formTexts.requiredFieldError}
                        onChange={(e) => updateFormTexts({ requiredFieldError: e.target.value })}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                        Invalid generic field error text
                      </label>
                      <input
                        type="text"
                        value={formTexts.invalidGenericError}
                        onChange={(e) => updateFormTexts({ invalidGenericError: e.target.value })}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 outline-none"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: STICKY LIVE PREVIEW (APPROX 42%) */}
              <div className="lg:col-span-5 sticky top-4 self-start space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-neutral-800">
                    Live preview:
                  </div>

                  {/* Switch between Form Preview and Button Preview */}
                  <div className="inline-flex p-0.5 bg-neutral-200/70 rounded-lg text-[11px] font-medium">
                    <button
                      type="button"
                      onClick={() => setActivePreviewMode('form')}
                      className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                        activePreviewMode === 'form'
                          ? 'bg-white text-neutral-900 font-semibold shadow-2xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Form
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePreviewMode('button')}
                      className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                        activePreviewMode === 'button'
                          ? 'bg-white text-neutral-900 font-semibold shadow-2xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Buy Button
                    </button>
                  </div>
                </div>

                {/* CONDITION 1: BUY BUTTON LIVE PREVIEW (MATCHING SCREENSHOT) */}
                {activePreviewMode === 'button' ? (
                  <div className="w-full max-w-sm mx-auto bg-white rounded-xl border border-neutral-200 p-8 sm:p-10 shadow-2xs flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-full">
                      <button
                        type="button"
                        onClick={() => {
                          setIsButtonShaking(true);
                          setTimeout(() => setIsButtonShaking(false), 600);
                        }}
                        style={{
                          backgroundColor: settings.buttonColor || '#000000',
                          color: settings.buttonTextColor || '#ffffff',
                          borderRadius: `${settings.buttonBorderRadius ?? 24}px`,
                          borderWidth: `${settings.buttonBorderWidth ?? 0}px`,
                          borderColor: settings.buttonBorderColor || '#000000',
                          fontSize: `${settings.buttonFontSize || 15}px`,
                          boxShadow: settings.buttonShadow ? `0 ${settings.buttonShadow * 2}px ${settings.buttonShadow * 4}px rgba(0,0,0,0.2)` : 'none'
                        }}
                        className={`w-full py-3.5 px-5 font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99] select-none ${
                          isButtonShaking
                            ? 'animate-shaker'
                            : settings.buttonAnimation === 'Shaker'
                              ? 'animate-shaker'
                              : settings.buttonAnimation === 'Pulse'
                                ? 'animate-pulse'
                                : settings.buttonAnimation === 'Bounce'
                                  ? 'animate-bounce'
                                  : ''
                        }`}
                      >
                        {settings.buttonIcon !== 'No icon' && (
                          settings.buttonIcon === 'Truck icon' ? (
                            <Truck className="w-4 h-4 shrink-0" />
                          ) : settings.buttonIcon === 'Bag icon' ? (
                            <ShoppingBag className="w-4 h-4 shrink-0" />
                          ) : (
                            <ShoppingCart className="w-4 h-4 shrink-0" />
                          )
                        )}
                        <span className="truncate">{settings.buttonText || 'Buy with Cash on Delivery'}</span>
                        {settings.buttonSubtitle && (
                          <span className="text-[11px] font-normal opacity-85 block truncate">
                            {settings.buttonSubtitle}
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="pt-2 text-center space-y-2">
                      <p className="text-[11px] text-neutral-400">
                        {settings.buttonAnimation || 'Shaker'} Animation active • Real-time preview
                      </p>
                      <button
                        type="button"
                        onClick={() => setActivePreviewMode('form')}
                        className="inline-flex items-center gap-1 text-xs text-[#1c4772] hover:text-blue-800 font-medium cursor-pointer hover:underline"
                      >
                        <span>Switch to COD Form preview</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* CONDITION 2: FULL COD FORM PREVIEW */
                  <div
                    style={{
                      backgroundColor: formStyle.backgroundColor || '#ffffff',
                      color: formStyle.textColor || '#000000',
                      borderRadius: `${formStyle.borderRadius || 8}px`,
                      borderWidth: `${formStyle.borderWidth !== undefined ? formStyle.borderWidth : 1}px`,
                      borderColor: formStyle.borderColor || '#000000',
                      boxShadow: `0 ${formStyle.shadow || 4}px 20px -2px rgba(0, 0, 0, 0.15)`
                    }}
                    className="w-full max-w-sm mx-auto overflow-hidden text-left"
                  >
                  {/* Top Bar: CASH ON DELIVERY + Close Button */}
                  <div className="p-3 px-4 flex items-center justify-between border-b border-neutral-100">
                    <span className="font-bold text-xs uppercase tracking-wider text-neutral-900">
                      {settings.formTitle || 'CASH ON DELIVERY'}
                    </span>

                    {!formStyle.hideCloseButton && (
                      <button
                        type="button"
                        className="text-neutral-400 hover:text-neutral-800 p-0.5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Form Scrollable Body */}
                  <div className="p-4 space-y-3.5 max-h-[70vh] overflow-y-auto">
                    
                    {/* Render blocks in exact active order */}
                    {formBlocks.map((block) => {
                      if (!block.enabled) return null;

                      // 1. ORDER SUMMARY BLOCK
                      if (block.id === 'summary') {
                        return (
                          <div key={block.id} className="flex items-center justify-between gap-3 pb-1">
                            <div className="flex items-center gap-2.5">
                              {/* Thumbnail with yellow 1 badge */}
                              <div className="relative w-10 h-10 rounded border border-neutral-200 overflow-hidden shrink-0 bg-neutral-100">
                                <img
                                  src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=150&q=80"
                                  alt="Product"
                                  className="w-full h-full object-cover"
                                />
                                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-400 text-neutral-900 text-[9px] font-bold rounded-bl flex items-center justify-center">
                                  1
                                </span>
                              </div>
                              <span className="text-xs font-semibold text-neutral-900 underline underline-offset-2">
                                Knitted Throw Pillows
                              </span>
                            </div>
                            <span className="text-xs font-bold text-neutral-900 shrink-0">
                              Rs.19.99
                            </span>
                          </div>
                        );
                      }

                      // 2. TOTALS SUMMARY BLOCK
                      if (block.id === 'totals') {
                        return (
                          <div key={block.id} className="p-3 bg-[#f5f5f5] rounded-lg text-xs space-y-1.5 border border-neutral-200/80">
                            <div className="flex justify-between text-neutral-700">
                              <span>Subtotal</span>
                              <span className="font-semibold text-neutral-900">Rs.19.99</span>
                            </div>
                            <div className="flex justify-between text-neutral-700">
                              <span>Shipping</span>
                              <span className="font-semibold text-neutral-900">Free</span>
                            </div>
                            <div className="pt-1 border-t border-neutral-300 flex justify-between font-bold text-neutral-900">
                              <span>Total</span>
                              <span>Rs.19.99</span>
                            </div>
                          </div>
                        );
                      }

                      // 3. SHIPPING RATES BLOCK
                      if (block.id === 'shipping_rates') {
                        return (
                          <div key={block.id} className="space-y-1">
                            {!formStyle.hideFieldLabels && (
                              <div className="text-xs font-semibold text-neutral-800">
                                Shipping method
                              </div>
                            )}
                            <div className="p-2.5 px-3 rounded-lg border border-neutral-300 flex items-center justify-between text-xs bg-white">
                              <label className="flex items-center gap-2 cursor-pointer font-medium text-neutral-800">
                                <input
                                  type="radio"
                                  checked={true}
                                  readOnly
                                  className="w-3.5 h-3.5 text-neutral-900 accent-neutral-900"
                                />
                                <span>Free shipping</span>
                              </label>
                              <span className="font-bold text-neutral-900">Free</span>
                            </div>
                          </div>
                        );
                      }

                      // 4. DISCOUNT CODES BLOCK
                      if (block.id === 'discount_codes' || block.type === 'discount') {
                        return (
                          <div key={block.id} className="flex gap-2">
                            <input
                              type="text"
                              placeholder={block.label || "Discount code"}
                              className="flex-1 text-xs px-3 py-1.5 border border-neutral-300 rounded-lg outline-none bg-white text-neutral-900"
                            />
                            <button
                              type="button"
                              style={{ backgroundColor: block.applyButtonBgColor || '#000000', color: '#ffffff' }}
                              className="px-4 py-1.5 text-xs font-semibold rounded-lg shadow-2xs hover:opacity-90 transition-opacity cursor-pointer"
                            >
                              {block.applyButtonText || 'Apply'}
                            </button>
                          </div>
                        );
                      }

                      // 5. SECTION ADDRESS / TEXT / IMAGE HEADER
                      if (block.id === 'section_address' || block.type === 'section_header') {
                        const alignClass = block.alignment === 'Left' ? 'text-left' : block.alignment === 'Right' ? 'text-right' : 'text-center';
                        const weightClass = block.fontWeight === 'Normal' ? 'font-normal' : block.fontWeight === 'Semi-bold' ? 'font-semibold' : 'font-bold';
                        const textContent = (block.label || 'Enter your shipping address')
                          .replace(/{order_total}/g, 'Rs.19.99')
                          .replace(/{product_name}/g, 'Knitted Throw Pillows');

                        return (
                          <div 
                            key={block.id} 
                            style={{ 
                              fontSize: `${block.fontSize || 14}px`,
                              color: block.textColor || '#000000'
                            }}
                            className={`pt-1 ${alignClass} ${weightClass}`}
                          >
                            {textContent}
                          </div>
                        );
                      }

                      // 6. FORM FIELDS (Full Name, Phone, Address, City, Province, etc.)
                      if (block.type === 'field') {
                        const hasIcon = block.showIcon !== false;
                        const isPhone = block.id === 'phone' || block.icon === 'phone' || block.icon === 'smartphone';
                        const isProvince = block.id === 'province';

                        return (
                          <div key={block.id} className="space-y-0.5">
                            {!formStyle.hideFieldLabels && (
                              <label className="block text-[11px] font-semibold text-neutral-700">
                                {block.label || block.name} {block.required && <span className="text-red-500">*</span>}
                              </label>
                            )}

                            {isProvince && !block.disableDropdown ? (
                              <div className="relative">
                                <select 
                                  defaultValue=""
                                  className="w-full text-xs py-2 px-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 outline-none appearance-none cursor-pointer"
                                >
                                  <option value="" disabled>{block.placeholder || 'Select Province...'}</option>
                                  {['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Islamabad Capital Territory', 'Gilgit-Baltistan', 'Azad Kashmir']
                                    .filter(p => !block.removedProvinces?.toLowerCase().includes(p.toLowerCase()))
                                    .map(prov => (
                                      <option key={prov} value={prov}>{prov}</option>
                                    ))
                                  }
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-2.5 pointer-events-none" />
                              </div>
                            ) : (
                              <div className="relative flex items-center">
                                {block.prefixText && (
                                  <span className="inline-flex items-center px-2 py-1.5 border border-r-0 border-neutral-300 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-l-lg shrink-0">
                                    {block.prefixText}
                                  </span>
                                )}

                                <div className="relative w-full">
                                  {hasIcon && (
                                    <>
                                      {(block.icon === 'user' || (!block.icon && block.id === 'fullname')) && (
                                        <User className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                                      )}
                                      {(block.icon === 'phone' || (!block.icon && isPhone)) && (
                                        <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                                      )}
                                      {block.icon === 'smartphone' && (
                                        <Smartphone className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                                      )}
                                      {(block.icon === 'map-pin' || (!block.icon && (block.id === 'address' || block.id === 'city' || block.id === 'zip'))) && (
                                        <MapPin className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                                      )}
                                      {block.icon === 'navigation' && (
                                        <Navigation className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                                      )}
                                      {block.icon === 'hash' && (
                                        <Hash className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                                      )}
                                      {block.icon === 'align-left' && (
                                        <AlignLeft className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                                      )}
                                      {(block.icon === 'mail' || (!block.icon && block.id === 'email')) && (
                                        <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                                      )}
                                    </>
                                  )}

                                  {block.fieldInputType === 'textarea' ? (
                                    <textarea
                                      rows={2}
                                      placeholder={block.placeholder || block.name}
                                      className="w-full text-xs py-2 px-3 border border-neutral-300 bg-white text-neutral-900 outline-none rounded-lg"
                                    />
                                  ) : (
                                    <input
                                      type={isPhone ? 'tel' : block.id === 'email' ? 'email' : block.fieldInputType === 'number' ? 'number' : 'text'}
                                      placeholder={block.placeholder || block.name}
                                      className={`w-full text-xs py-2 px-3 border border-neutral-300 bg-white text-neutral-900 outline-none ${
                                        block.prefixText ? 'rounded-r-lg' : 'rounded-lg'
                                      } ${hasIcon ? 'pl-8' : ''}`}
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }

                      // IMAGE OR GIF
                      if (block.type === 'image') {
                        const alignClass = block.alignment === 'Left' ? 'justify-start' : block.alignment === 'Right' ? 'justify-end' : 'justify-center';
                        return (
                          <div key={block.id} className={`flex ${alignClass} py-1`}>
                            <img
                              src={block.imageUrl || 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80'}
                              alt={block.imageAlt || 'Banner'}
                              style={{ borderRadius: `${block.borderRadius ?? 8}px` }}
                              className="max-w-full max-h-48 object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        );
                      }

                      // WHATSAPP BUTTON
                      if (block.type === 'whatsapp_button') {
                        return (
                          <div key={block.id} className="pt-1.5">
                            <a
                              href={`https://wa.me/${(block.whatsappNumber || '').replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                backgroundColor: block.backgroundColor || '#25D366',
                                color: block.textColor || '#ffffff',
                                borderRadius: `${block.borderRadius ?? 8}px`,
                                fontSize: block.fontSize ? `${block.fontSize}px` : '13px'
                              }}
                              className="w-full py-2.5 px-4 font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-all cursor-pointer"
                            >
                              <MessageCircle className="w-4 h-4 fill-white/20" />
                              <span>{block.label || 'Order on WhatsApp'}</span>
                            </a>
                          </div>
                        );
                      }

                      // SHOPIFY CHECKOUT BUTTON
                      if (block.type === 'shopify_button') {
                        return (
                          <div key={block.id} className="pt-1.5">
                            <button
                              type="button"
                              style={{
                                backgroundColor: block.backgroundColor || '#5c6ac4',
                                color: block.textColor || '#ffffff',
                                borderRadius: `${block.borderRadius ?? 8}px`,
                                fontSize: block.fontSize ? `${block.fontSize}px` : '13px'
                              }}
                              className="w-full py-2.5 px-4 font-bold flex items-center justify-center gap-2 uppercase tracking-wider shadow-sm hover:opacity-95 transition-all cursor-pointer"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span>{block.label || 'CHECKOUT WITH SHOPIFY'}</span>
                            </button>
                          </div>
                        );
                      }

                      // QUANTITY SELECTOR
                      if (block.type === 'quantity') {
                        return (
                          <div key={block.id} className="space-y-1">
                            <label className="block text-xs font-semibold text-neutral-800">
                              {block.label || 'Quantity'}
                            </label>
                            <div className="flex items-center border border-neutral-300 rounded-lg w-28 overflow-hidden bg-white">
                              <button type="button" className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 font-bold text-xs">-</button>
                              <span className="flex-1 text-center text-xs font-semibold">{block.defaultQty ?? 1}</span>
                              <button type="button" className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 font-bold text-xs">+</button>
                            </div>
                          </div>
                        );
                      }

                      // DROPDOWN LIST
                      if (block.type === 'dropdown') {
                        const options = block.options || ['Option 1', 'Option 2', 'Option 3'];
                        return (
                          <div key={block.id} className="space-y-1">
                            <label className="block text-xs font-semibold text-neutral-800">
                              {block.label || block.name} {block.required && <span className="text-red-500">*</span>}
                            </label>
                            <select className="w-full text-xs py-2 px-3 border border-neutral-300 rounded-lg bg-white text-neutral-900 outline-none">
                              <option value="">{block.placeholder || 'Select an option...'}</option>
                              {options.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        );
                      }

                      // RADIO / SINGLE CHOICE
                      if (block.type === 'radio') {
                        const options = block.options || ['Option 1', 'Option 2'];
                        return (
                          <div key={block.id} className="space-y-1.5">
                            <label className="block text-xs font-semibold text-neutral-800">
                              {block.label || block.name} {block.required && <span className="text-red-500">*</span>}
                            </label>
                            <div className="space-y-1 pl-1">
                              {options.map((opt, i) => (
                                <label key={i} className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                                  <input type="radio" name={block.id} defaultChecked={i === 0} className="w-3.5 h-3.5 accent-neutral-900" />
                                  <span>{opt}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      // DATE SELECTOR
                      if (block.type === 'date') {
                        return (
                          <div key={block.id} className="space-y-1">
                            <label className="block text-xs font-semibold text-neutral-800">
                              {block.label || block.name} {block.required && <span className="text-red-500">*</span>}
                            </label>
                            <input
                              type="date"
                              className="w-full text-xs py-2 px-3 border border-neutral-300 rounded-lg bg-white text-neutral-900 outline-none"
                            />
                          </div>
                        );
                      }

                      // LINK BUTTON
                      if (block.type === 'link_button') {
                        return (
                          <div key={block.id} className="pt-1">
                            <a
                              href={block.linkUrl || '#'}
                              target={block.openInNewTab ? '_blank' : '_self'}
                              rel="noreferrer"
                              style={{
                                backgroundColor: block.backgroundColor || '#f3f4f6',
                                color: block.textColor || '#111827',
                                borderRadius: `${block.borderRadius ?? 8}px`
                              }}
                              className="w-full py-2.5 px-4 font-semibold text-xs flex items-center justify-center gap-1.5 border border-neutral-200 hover:opacity-90 transition-all cursor-pointer"
                            >
                              <span>{block.label || 'Click here'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        );
                      }

                      // 7. CHECKBOX BLOCKS (Terms, Subscribe)
                      if (block.type === 'checkbox') {
                        return (
                          <label key={block.id} className="flex items-start gap-2 text-xs text-neutral-700 cursor-pointer pt-0.5">
                            <input
                              type="checkbox"
                              defaultChecked={Boolean(block.preselected)}
                              className="w-3.5 h-3.5 rounded mt-0.5 text-neutral-900 accent-neutral-900"
                            />
                            <span>{block.label || block.name}</span>
                          </label>
                        );
                      }

                      // 8. COMPLETE ORDER BUTTON / CUSTOM BUTTON
                      if (block.id === 'submit' || block.type === 'button') {
                        const btnLabel = (block.label || 'COMPLETE ORDER - {order_total}')
                          .replace(/{order_total}/g, 'Rs.19.99')
                          .replace(/{product_name}/g, 'Knitted Throw Pillows');

                        const buttonBg = block.backgroundColor || 'rgba(0,0,0,1)';
                        const buttonColor = block.textColor || 'rgba(255,255,255,1)';
                        const buttonRadius = block.borderRadius !== undefined ? `${block.borderRadius}px` : '8px';
                        const buttonFontSize = block.fontSize ? `${block.fontSize}px` : '14px';
                        const buttonBorderWidth = block.borderWidth ? `${block.borderWidth}px` : '0px';
                        const buttonBorderColor = block.borderColor || '#000000';
                        const buttonShadow = block.shadow ? `0 ${block.shadow * 2}px ${block.shadow * 4}px rgba(0,0,0,0.15)` : 'none';

                        return (
                          <div key={block.id} className="pt-2">
                            <button
                              type="button"
                              onClick={onPreviewInStore}
                              style={{
                                backgroundColor: buttonBg,
                                color: buttonColor,
                                borderRadius: buttonRadius,
                                fontSize: buttonFontSize,
                                borderWidth: buttonBorderWidth,
                                borderColor: buttonBorderColor,
                                boxShadow: buttonShadow
                              }}
                              className="w-full py-3 px-4 font-bold flex flex-col items-center justify-center gap-0.5 tracking-wider uppercase transition-all cursor-pointer hover:opacity-95"
                            >
                              <div className="flex items-center justify-center gap-2">
                                {block.icon === 'Shopping bag' && <ShoppingBag className="w-4 h-4" />}
                                {block.icon === 'Shopping cart' && <ShoppingCart className="w-4 h-4" />}
                                {block.icon === 'Arrow' && <ArrowRight className="w-4 h-4" />}
                                {block.icon === 'Button icon' && <Sparkles className="w-3.5 h-3.5" />}
                                <span>{btnLabel}</span>
                              </div>
                              {block.subtitle && (
                                <span className="text-[10px] font-normal normal-case opacity-80">
                                  {block.subtitle.replace(/{order_total}/g, 'Rs.19.99')}
                                </span>
                              )}
                            </button>
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </div>
                )}

                {/* Footer preview note */}
                <div className="text-center pt-2">
                  <button
                    onClick={onPreviewInStore}
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Test on Storefront Product Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER MATCHING SCREENSHOT: Releasit 2026 */}
      <footer className="mt-16 text-center text-xs text-neutral-500 space-y-1">
        <div className="font-bold text-neutral-700 flex items-center justify-center gap-1">
          <span>releasit</span>
        </div>
        <div className="text-[11px] text-neutral-400">
          © Releasit 2026
        </div>
      </footer>

      {/* FLOATING CHAT BUBBLE (BOTTOM RIGHT) */}
      <button
        onClick={() => setShowContactModal(true)}
        className="fixed bottom-5 right-5 w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-emerald-500 to-indigo-600 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-all cursor-pointer z-40"
        title="Live Support Chat"
      >
        <MessageCircle className="w-5 h-5 fill-white/20" />
      </button>

      {/* MODAL 2: ADD A CUSTOM FIELD, BUTTON, TEXT OR IMAGE (MATCHING SCREENSHOT) */}
      {showAddFieldModal && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150"
          onClick={() => setShowAddFieldModal(false)}
        >
          <div 
            className="bg-white rounded-xl max-w-[460px] w-full shadow-2xl border border-neutral-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '85vh' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-neutral-100 shrink-0">
              <h3 className="font-semibold text-[13px] text-neutral-900 tracking-tight">
                Add a custom field, button, text or image
              </h3>
              <button
                type="button"
                onClick={() => setShowAddFieldModal(false)}
                className="text-neutral-400 hover:text-neutral-700 p-0.5 rounded cursor-pointer transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable list */}
            <div className="overflow-y-auto divide-y divide-neutral-100 flex-1 max-h-[480px]">
              {customFieldOptions.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-3 flex items-center justify-between hover:bg-neutral-50/70 transition-colors"
                >
                  {/* Left: Name and Info Icon */}
                  <div className="flex items-center gap-1.5 min-w-0 pr-3">
                    <span className="text-[13px] text-neutral-800 font-medium truncate">
                      {item.name}
                    </span>
                    <span 
                      className="inline-flex text-neutral-400 hover:text-neutral-600 cursor-help shrink-0"
                      title={item.description}
                    >
                      <Info className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Right: Add Button */}
                  <button
                    type="button"
                    onClick={() => handleAddCustomBlock(item.create())}
                    className="px-3.5 py-1 text-xs font-medium text-neutral-800 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-md shadow-2xs transition-all cursor-pointer shrink-0 active:scale-95"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CONTACT US */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl border border-neutral-200">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-bold text-sm text-neutral-900">
                Contact Releasit Support
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              Our Pakistan dedicated team will configure custom city and province dropdowns directly on your store within 15 minutes!
            </p>

            <div className="space-y-2">
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="w-full p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+92 300 1234567)</span>
              </a>

              <a
                href="mailto:support@releasit.org"
                className="w-full p-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Email support@releasit.org</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ENGLISH CHARACTERS TUTORIAL */}
      {showTutorialModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-xl border border-neutral-200">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-bold text-sm text-neutral-900">
                Tutorial: Allow Only English Characters in Form
              </h3>
              <button
                onClick={() => setShowTutorialModal(false)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-neutral-700 space-y-3 leading-relaxed">
              <p>
                To prevent courier consignment booking errors with TCS, Leopards, Trax, or Call Courier, input fields should use English standard alphabets:
              </p>

              <ol className="list-decimal pl-4 space-y-1.5 font-medium">
                <li>Go to <strong>Customize your form</strong> below.</li>
                <li>Click the <strong>pencil (edit)</strong> button next to <strong>Full Name</strong> or <strong>Address</strong>.</li>
                <li>Under regex validation, select <strong>English Alphabets Only ([a-zA-Z0-9\s])</strong>.</li>
                <li>Save changes. The form will automatically guide the customer if they type non-English characters.</li>
              </ol>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowTutorialModal(false)}
                className="px-4 py-1.5 bg-neutral-900 hover:bg-black text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
