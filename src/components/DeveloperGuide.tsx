import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  DollarSign, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  FileCode, 
  ShieldCheck, 
  HelpCircle, 
  Globe, 
  Server, 
  Zap,
  ArrowRight,
  Download
} from 'lucide-react';

export const DeveloperGuide: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'billing' | 'hosting' | 'theme-extension' | 'code-files'>('overview');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const tomlCode = `# shopify.app.toml - Configuration for COD Realistic
client_id = "YOUR_SHOPIFY_CLIENT_ID"
name = "COD Realistic"
handle = "cod-realistic"
application_url = "https://your-app-domain.run.app"
embedded = true

[build]
automatically_update_urls_on_dev = true
dev_store_url = "herbivital-2-store.myshopify.com"

[access_scopes]
scopes = "read_products,read_orders,write_orders,read_customers,write_customers,read_themes,write_themes"

[auth]
redirect_urls = [
  "https://your-app-domain.run.app/api/auth/callback",
  "https://your-app-domain.run.app/auth/shopify/callback"
]

[webhooks]
api_version = "2024-04"

[pos]
embedded = false
`;

  const liquidBlockCode = `{% comment %}
  extensions/cod-realistic/blocks/cod-button.liquid
  App Embed Block for COD Realistic
{% endcomment %}

<div id="cod-realistic-container" class="cod-realistic-wrapper" data-product-id="{{ product.id }}" data-product-price="{{ product.price | money_without_currency }}">
  <button 
    type="button" 
    id="cod-realistic-trigger-btn"
    style="
      background-color: {{ block.settings.button_bg_color }};
      color: {{ block.settings.button_text_color }};
      border-radius: {{ block.settings.border_radius }}px;
      padding: 14px 20px;
      width: 100%;
      font-weight: bold;
      border: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
      font-size: 15px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.12);
    "
  >
    <span>{{ block.settings.button_label | default: "🚚 Buy with Cash on Delivery" }}</span>
    <span style="font-size: 11px; opacity: 0.85; font-weight: normal; margin-top: 2px;">
      {{ block.settings.button_subtext | default: "Pay cash at your doorstep" }}
    </span>
  </button>
</div>

<script src="https://your-app-domain.run.app/widget.js" defer="defer"></script>

{% schema %}
{
  "name": "COD Realistic Button",
  "target": "section",
  "stylesheet": "cod-realistic.css",
  "javascript": "cod-realistic.js",
  "settings": [
    { "type": "text", "id": "button_label", "label": "Button Label", "default": "🚚 Buy with Cash on Delivery" },
    { "type": "text", "id": "button_subtext", "label": "Button Subtext", "default": "Pay cash when package arrives" },
    { "type": "color", "id": "button_bg_color", "label": "Button Background Color", "default": "#059669" },
    { "type": "color", "id": "button_text_color", "label": "Button Text Color", "default": "#ffffff" },
    { "type": "range", "id": "border_radius", "label": "Border Radius (px)", "min": 0, "max": 25, "step": 1, "default": 8 }
  ]
}
{% endschema %}
`;

  const billingMutationCode = `// Backend GraphQL Mutation to charge the Merchant via Shopify Billing API
// Jab merchant "Select Plan" par click karega:
import { shopifyApi } from "@shopify/shopify-api";

export async function createSubscription(session, planName, planPrice) {
  const client = new shopifyApi.clients.Graphql({ session });

  const query = \`
    mutation appSubscriptionCreate($name: String!, $returnUrl: URL!, $price: Decimal!) {
      appSubscriptionCreate(
        name: $name
        returnUrl: $returnUrl
        test: true # Set to false in production
        lineItems: [
          {
            plan: {
              appRecurringPricingDetails: {
                price: { amount: $price, currencyCode: USD }
                interval: EVERY_30_DAYS
              }
            }
          }
        ]
      ) {
        appSubscription {
          id
        }
        confirmationUrl
        userErrors {
          field
          message
        }
      }
    }
  \`;

  const response = await client.request(query, {
    variables: {
      name: \`COD Realistic - \${planName}\`,
      returnUrl: "https://your-app-domain.run.app/billing/callback",
      price: planPrice
    }
  });

  // Redirect merchant to this confirmation URL:
  return response.data.appSubscriptionCreate.confirmationUrl;
}
`;

  const orderApiCode = `// Backend API endpoint that creates the order in Shopify Admin
// when customer submits the COD form on the storefront:
app.post('/api/storefront/orders/create', async (req, res) => {
  const { shop, customerName, phone, address, city, items, totalAmount } = req.body;

  try {
    const session = await getShopSession(shop);
    const client = new shopify.clients.Rest({ session });

    // Creates genuine COD Order in Merchant's Shopify Admin
    const response = await client.post({
      path: 'orders',
      data: {
        order: {
          line_items: items,
          financial_status: 'pending', // Pending COD payment
          tags: 'COD_Realistic, Cash_on_Delivery',
          shipping_address: {
            first_name: customerName,
            address1: address,
            city: city,
            phone: phone,
            country: 'Pakistan'
          },
          customer: {
            first_name: customerName,
            phone: phone
          },
          note: 'Placed via COD Realistic 1-Click Fast Checkout'
        }
      }
    });

    res.json({ success: true, order: response.body.order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
`;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-emerald-950 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-800/80 text-indigo-200 text-xs font-semibold mb-3 border border-indigo-600/50">
            <Code2 className="w-3.5 h-3.5 text-indigo-300" />
            <span>Complete Developer Deployment &amp; Monetization Blueprint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            COD Realistic: Shopify Developer Guide
          </h1>
          <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
            آپ کے سوال کا مکمل عملی حل: اپنی خود کی ایپ <strong>COD Realistic</strong> بنائیں، Shopify Partner اکاؤنٹ بنائیں، 
            اسے مفت یا کم خرچ ہوسٹنگ پر لگائیں، اور مرچنٹس سے <strong>Shopify Billing API</strong> کے ذریعے ماہانہ فیس کما کر اپنے بینک میں حاصل کریں!
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 space-x-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-2 px-4 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          1. Step-by-Step Road Map (اردو گائیڈ)
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`py-2 px-4 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'billing'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          2. Shopify Billing API (پیسے کیسے بنیں گے؟)
        </button>
        <button
          onClick={() => setActiveTab('hosting')}
          className={`py-2 px-4 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'hosting'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          3. App Hosting &amp; Domain Setup
        </button>
        <button
          onClick={() => setActiveTab('theme-extension')}
          className={`py-2 px-4 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'theme-extension'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          4. Theme App Extension (COD Button)
        </button>
        <button
          onClick={() => setActiveTab('code-files')}
          className={`py-2 px-4 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'code-files'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          5. Complete Code Files &amp; Config
        </button>
      </div>

      {/* TAB 1: OVERVIEW & STEP BY STEP ROAD MAP */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                Shopify Partner Account
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                partners.shopify.com پر مفت اکاؤنٹ بنائیں۔ وہاں "Apps" میں جا کر "Create App" پر کلک کریں اور نام <strong>COD Realistic</strong> رکھیں۔
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                Deploy / Host Backend
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                اس پروجیکٹ کے کوڈ کو GitHub پر پش کریں، اور Google Cloud Run، Railway یا Render پر 1-Click کے ساتھ ہوسٹ کریں۔
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                Shopify App Store Launch
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                App Embed Extension انسٹال کر کے Shopify App Review کے لیے جمع کروائیں۔ منظور ہونے پر ہزاروں دکانیں اسے انسٹال کر سکیں گی!
              </p>
            </div>
          </div>

          {/* Urdu Detailed Explanation Card */}
          <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>تفصیلی اردو گائیڈ: ری لیس اِٹ (Releasit) جیسی ایپ بنانے کا طریقہ</span>
            </h3>

            <div className="space-y-3 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <p>
                <strong>ری لیس اِٹ (Releasit) اصل میں کیا کرتی ہے؟</strong><br />
                Releasit ایک Shopify App ہے جو عام Shopify Checkout کو بائی پاس (bypass) کر کے سیدھا پروڈکٹ پیج پر ایک فاسٹ 
                <strong>"Buy with Cash on Delivery"</strong> بٹن لگا دیتی ہے۔ جب خریدار اس بٹن کو دباتا ہے، تو ایک پوپ اپ (Modal) کھلتا ہے جس میں وہ صرف اپنا نام، فون نمبر اور پتہ لکھ کر آرڈر کنفرم کر دیتا ہے۔
              </p>
              <p>
                <strong>آپ کی ایپ "COD Realistic" کیسے کام کرے گی؟</strong><br />
                ہم نے آپ کے لیے پورا فریم ورک، ڈیزائنر، پلانز اور سٹور فرنٹ وجیٹ بنا دیا ہے۔ یہ ایپ دو حصوں پر مشتمل ہے:
              </p>
              <ol className="list-decimal pl-5 space-y-1.5 font-medium">
                <li>
                  <strong>App Admin Panel (جو آپ اوپر دیکھ رہے ہیں):</strong> یہاں مرچنٹ فارم کے رنگ، ٹیکسٹ، فیلڈز اور فراڈ پروٹیکشن کنفیگر کرتا ہے اور پلان خریدتا ہے۔
                </li>
                <li>
                  <strong>Storefront Embed Widget (جو HerbiVital پر لگی ہے):</strong> یہ چھوٹا جاوا سکرپٹ کوڈ پروڈکٹ پیج پر COD بٹن دکھاتا ہے اور آرڈر کو مرچنٹ کے شاپائفائی ایڈمن میں پش کرتا ہے۔
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BILLING API EXPLAINER */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800/80">
            <div className="flex items-start gap-3">
              <DollarSign className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                  لوگ پلان کیسے خریدیں گے اور پیسے آپ کو کیسے ملیں گے؟ (Shopify Billing API)
                </h3>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1 leading-relaxed">
                  آپ کو الگ سے پے پال یا سٹرائپ کا کوئی پیمنٹ گیٹ وے لگانے کی ضرورت نہیں ہوتی! Shopify کا اپنا <strong>App Billing API</strong> ہوتا ہے۔ 
                  جب مرچنٹ "Select Plan" کلک کرتا ہے، Shopify خود ان کے کریڈٹ کارڈ یا سٹور بل میں رقم شامل کر دیتا ہے۔
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Shopify Billing ورک فلو (Step-by-Step)
              </h4>
              <ul className="space-y-3 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex gap-2">
                  <span className="font-bold text-indigo-600">1.</span>
                  <span>مرچنٹ نے <strong>Premium ($9.99/mo)</strong> سلیکٹ کیا۔</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-indigo-600">2.</span>
                  <span>آپ کا بیک اینڈ شاپائفائی کو GraphQL میوٹیشن <code>appSubscriptionCreate</code> بھیجتا ہے۔</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-indigo-600">3.</span>
                  <span>شاپائفائی مرچنٹ کو آفیشل اپروول پیج دکھاتا ہے جس پر وہ "Approve Charge" دبائیں گے۔</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-indigo-600">4.</span>
                  <span>ہر 30 دن بعد شاپائفائی خود بخود ان سے پیسے کاٹ کر آپ کے Partner Payouts میں جمع کرواتا رہتا ہے۔</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-emerald-600">5.</span>
                  <span><strong>کمانے کا شیئر:</strong> شاپائفائی پہلے $1,000,000 (دس لاکھ ڈالر) سالانہ پر <strong>0% کمیشن</strong> لیتا ہے! یعنی 100% منافع آپ کا ہے! بعد میں صرف 15% شاپائفائی کا اور 85% آپ کا ہوتا ہے۔</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  GraphQL میوٹیشن کوڈ
                </h4>
                <button
                  onClick={() => copyToClipboard(billingMutationCode, 'billing-code')}
                  className="flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  {copiedSection === 'billing-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'billing-code' ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono bg-neutral-950 text-neutral-200 p-3 rounded-lg overflow-x-auto max-h-72">
                {billingMutationCode}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HOSTING & DOMAIN SETUP */}
      {activeTab === 'hosting' && (
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-5">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            شاپائفائی ایپ کو کہاں اور کیسے ہوسٹ کریں؟ (Hosting Recommendations)
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            شاپائفائی ایپس کو چلانے کے لیے ایک 24/7 آن لائن سرور (Node.js/Express) اور ایک HTTPS ڈومین چاہیے ہوتی ہے:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/40 space-y-2">
              <div className="text-xs font-bold text-emerald-600">Option 1 (Recommended)</div>
              <h4 className="font-bold text-sm">Google Cloud Run</h4>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                فری ٹائر میں 20 لاکھ مفت ریکویسٹ ماہانہ۔ جب تک ٹریفک نہیں ہوگی سرور سلیپ پر رہے گا اور 0 روپے خرچ ہوں گے۔
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/40 space-y-2">
              <div className="text-xs font-bold text-indigo-600">Option 2 (Easiest)</div>
              <h4 className="font-bold text-sm">Railway.app</h4>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                GitHub ریپوزٹری کو کنیکٹ کریں، Railway خود کار طریقے سے Docker کنٹینر بنا کر ایک HTTPS یو آر ایل فراہم کر دیتا ہے۔
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/40 space-y-2">
              <div className="text-xs font-bold text-amber-600">Option 3 (VPS)</div>
              <h4 className="font-bold text-sm">Hetzner / DigitalOcean</h4>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                $4/month میں مکمل لینکس سرور۔ Ubuntu پر PM2 اور Nginx ریورس پراکسی کے ذریعے لامحدود ایپس چلائیں۔
              </p>
            </div>
          </div>

          {/* Your Live Railway Deployment Status */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  Your Live Railway Hosted URL:
                </span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
                Online &amp; Active
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-white dark:bg-neutral-900 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800 font-mono text-xs text-neutral-800 dark:text-neutral-200">
              <span className="truncate">https://cod-relastic-production.up.railway.app</span>
              <button
                type="button"
                onClick={() => copyToClipboard('https://cod-relastic-production.up.railway.app', 'railway-url')}
                className="shrink-0 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-sans font-semibold flex items-center justify-center gap-1 shadow-xs"
              >
                {copiedSection === 'railway-url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'railway-url' ? 'Copied' : 'Copy URL'}</span>
              </button>
            </div>
          </div>

          <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-xl text-xs space-y-3">
            <div className="font-bold text-neutral-900 dark:text-white flex items-center justify-between">
              <span>Shopify Partner Dev Dashboard میں یہ ویلیوز ڈالیں:</span>
              <span className="text-[11px] text-neutral-500 font-normal">Dev Dashboard &gt; App setup</span>
            </div>
            
            <div className="space-y-2">
              <div className="bg-white dark:bg-neutral-900 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase block">App URL</span>
                  <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold select-all">
                    https://cod-relastic-production.up.railway.app
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard('https://cod-relastic-production.up.railway.app', 'app-url')}
                  className="p-1.5 text-neutral-500 hover:text-neutral-800"
                >
                  {copiedSection === 'app-url' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="bg-white dark:bg-neutral-900 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase block">Allowed redirection URL(s)</span>
                  <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold select-all">
                    https://cod-relastic-production.up.railway.app/api/auth/callback
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard('https://cod-relastic-production.up.railway.app/api/auth/callback', 'redirect-url')}
                  className="p-1.5 text-neutral-500 hover:text-neutral-800"
                >
                  {copiedSection === 'redirect-url' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-[11px] text-neutral-600 dark:text-neutral-400 pt-1 leading-relaxed bg-white/60 dark:bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <strong className="text-neutral-900 dark:text-neutral-200">Shopify Partner Dev Dashboard گائیڈ:</strong><br />
              1. <strong>partners.shopify.com</strong> لاگ ان کریں۔<br />
              2. لیفٹ مینیو سے <strong>Apps</strong> میں جائیں اور <strong>COD Realistic</strong> پر کلک کریں۔<br />
              3. اگر نیا ڈیش بورڈ نظر آ رہا ہے تو اوپر دائیں جانب <strong>"Dev Dashboard"</strong> پر کلک کریں۔<br />
              4. <strong>Configuration / App setup</strong> سیکشن میں <strong>App URL</strong> اور <strong>Allowed redirection URL</strong> درج کر کے <strong>Save</strong> کریں۔<br />
              5. پھر <strong>"Test your app"</strong> پر کلک کریں اور اپنا ڈویلپمنٹ سٹور منتخب کر کے انسٹال کر لیں۔
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: THEME APP EXTENSION */}
      {activeTab === 'theme-extension' && (
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Theme App Extension (Online Store 2.0 App Block)
              </h3>
              <p className="text-xs text-neutral-500">
                یہ کوڈ وہ ہے جو مرچنٹ کے تھیم ایڈیٹر میں 1-Click App Embed بناتا ہے۔ مرچنٹ کو تھیم کا کوڈ کھولنے کی ضرورت نہیں پڑتی!
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(liquidBlockCode, 'liquid-block')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow"
            >
              {copiedSection === 'liquid-block' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'liquid-block' ? 'Copied' : 'Copy Liquid Block'}</span>
            </button>
          </div>

          <pre className="text-[11px] font-mono bg-neutral-950 text-neutral-200 p-4 rounded-xl overflow-x-auto max-h-96">
            {liquidBlockCode}
          </pre>
        </div>
      )}

      {/* TAB 5: CODE FILES */}
      {activeTab === 'code-files' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold font-mono text-neutral-800 dark:text-neutral-200">
                1. shopify.app.toml
              </div>
              <button
                onClick={() => copyToClipboard(tomlCode, 'toml-code')}
                className="text-xs text-indigo-600 font-semibold flex items-center gap-1"
              >
                {copiedSection === 'toml-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'toml-code' ? 'Copied' : 'Copy toml'}</span>
              </button>
            </div>
            <pre className="text-[11px] font-mono bg-neutral-950 text-neutral-200 p-3 rounded-lg overflow-x-auto">
              {tomlCode}
            </pre>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold font-mono text-neutral-800 dark:text-neutral-200">
                2. Order Creation API (server.ts)
              </div>
              <button
                onClick={() => copyToClipboard(orderApiCode, 'order-api')}
                className="text-xs text-indigo-600 font-semibold flex items-center gap-1"
              >
                {copiedSection === 'order-api' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'order-api' ? 'Copied' : 'Copy API'}</span>
              </button>
            </div>
            <pre className="text-[11px] font-mono bg-neutral-950 text-neutral-200 p-3 rounded-lg overflow-x-auto">
              {orderApiCode}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
