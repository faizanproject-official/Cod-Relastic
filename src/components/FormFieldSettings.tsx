import React from 'react';
import { FormBlockItem } from '../types';
import { 
  AlertOctagon, 
  Phone, 
  Smartphone, 
  MessageCircle, 
  MapPin, 
  Navigation, 
  Hash, 
  AlignLeft, 
  Info, 
  ExternalLink
} from 'lucide-react';

interface FormFieldSettingsProps {
  block: FormBlockItem;
  onUpdate: (updates: Partial<FormBlockItem>) => void;
  onClose: () => void;
}

export const FormFieldSettings: React.FC<FormFieldSettingsProps> = ({
  block,
  onUpdate
}) => {
  // If block is disabled, show warning banner matching screenshots 5 and 12
  const showDisabledWarning = !block.enabled;

  // 1. CUSTOM TEXT (Image 1 & 11)
  if (block.id === 'section_address' || block.type === 'section_header') {
    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          CUSTOM TEXT
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Text</label>
          <input
            type="text"
            value={block.label ?? block.name ?? ''}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900 transition-colors"
          />
          <div className="text-[11px] text-neutral-500 space-y-0.5 pt-1 leading-normal">
            <div className="font-semibold text-neutral-600">Shortcodes:</div>
            <div>{'{order_total}'} to insert the order total</div>
            <div>{'{product_name}'} to insert the product name</div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Alignment</label>
          <select
            value={block.alignment || 'Center'}
            onChange={(e) => onUpdate({ alignment: e.target.value as 'Left' | 'Center' | 'Right' })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          >
            <option value="Center">Center</option>
            <option value="Left">Left</option>
            <option value="Right">Right</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-neutral-700">
            <span>Font size</span>
            <span>{block.fontSize || 14}px</span>
          </div>
          <input
            type="range"
            min="10"
            max="26"
            value={block.fontSize || 14}
            onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
            className="w-full accent-neutral-900 cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Font weight</label>
          <select
            value={block.fontWeight || 'Bold'}
            onChange={(e) => onUpdate({ fontWeight: e.target.value as 'Bold' | 'Normal' | 'Semi-bold' })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          >
            <option value="Bold">Bold</option>
            <option value="Normal">Normal</option>
            <option value="Semi-bold">Semi-bold</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Text color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={block.textColor?.startsWith('#') ? block.textColor : '#000000'}
              onChange={(e) => onUpdate({ textColor: e.target.value })}
              className="w-8 h-8 rounded border border-neutral-300 p-0.5 cursor-pointer bg-white"
            />
            <input
              type="text"
              value={block.textColor || 'rgba(0,0,0,1)'}
              onChange={(e) => onUpdate({ textColor: e.target.value })}
              className="flex-1 px-3 py-1.5 border border-neutral-300 rounded-lg text-xs font-mono text-neutral-900 outline-none focus:border-neutral-900"
            />
          </div>
        </div>
      </div>
    );
  }

  // 2. PHONE FIELD (Image 3)
  if (block.id === 'phone') {
    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          PHONE FIELD
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Label</label>
          <input
            type="text"
            value={block.label ?? 'Phone number'}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Placeholder</label>
          <input
            type="text"
            value={block.placeholder ?? 'Phone'}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
            <input
              type="checkbox"
              checked={block.showIcon !== false}
              onChange={(e) => onUpdate({ showIcon: e.target.checked })}
              className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
            />
            <span>Show field icon</span>
          </label>

          {/* 3 icons group */}
          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => onUpdate({ icon: 'phone' })}
              className={`p-2.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                block.icon === 'phone' || !block.icon
                  ? 'bg-neutral-900 border-neutral-900 text-white'
                  : 'bg-white border-neutral-300 text-neutral-600 hover:bg-neutral-50'
              }`}
              title="Phone Handset"
            >
              <Phone className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onUpdate({ icon: 'smartphone' })}
              className={`p-2.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                block.icon === 'smartphone'
                  ? 'bg-neutral-900 border-neutral-900 text-white'
                  : 'bg-white border-neutral-300 text-neutral-600 hover:bg-neutral-50'
              }`}
              title="Smartphone"
            >
              <Smartphone className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onUpdate({ icon: 'message-circle' })}
              className={`p-2.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                block.icon === 'message-circle'
                  ? 'bg-neutral-900 border-neutral-900 text-white'
                  : 'bg-white border-neutral-300 text-neutral-600 hover:bg-neutral-50'
              }`}
              title="WhatsApp / Message"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={block.required !== false}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Required</span>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-neutral-700">Min length</label>
            <input
              type="number"
              value={block.minLength ?? 1}
              onChange={(e) => onUpdate({ minLength: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-neutral-700">Max length</label>
            <input
              type="number"
              value={block.maxLength ?? 15}
              onChange={(e) => onUpdate({ maxLength: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Prefix text</label>
          <input
            type="text"
            value={block.prefixText ?? ''}
            onChange={(e) => onUpdate({ prefixText: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            placeholder=""
          />
          <div className="text-[11px] text-neutral-500">
            Text that your customers can't change.
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Invalid phone error text</label>
          <input
            type="text"
            value={block.invalidErrorText ?? 'Enter a valid phone number.'}
            onChange={(e) => onUpdate({ invalidErrorText: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>
      </div>
    );
  }

  // 3. ADDRESS FIELD & ZIP CODE FIELD & CITY FIELD (Image 4, 5, 10)
  if (block.id === 'address' || block.id === 'address2' || block.id === 'city' || block.id === 'zip') {
    const isZip = block.id === 'zip';
    const isCity = block.id === 'city';
    const title = isZip ? 'ZIP CODE FIELD' : isCity ? 'CITY FIELD' : 'ADDRESS FIELD';

    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          {title}
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Label</label>
          <input
            type="text"
            value={block.label ?? block.name}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Placeholder</label>
          <input
            type="text"
            value={block.placeholder ?? ''}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
            <input
              type="checkbox"
              checked={block.showIcon !== false}
              onChange={(e) => onUpdate({ showIcon: e.target.checked })}
              className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
            />
            <span>Show field icon</span>
          </label>

          {/* 4 icons group */}
          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => onUpdate({ icon: 'map-pin' })}
              className={`p-2.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                block.icon === 'map-pin' || !block.icon
                  ? 'bg-neutral-900 border-neutral-900 text-white'
                  : 'bg-white border-neutral-300 text-neutral-600 hover:bg-neutral-50'
              }`}
              title="Location Pin"
            >
              <MapPin className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onUpdate({ icon: 'navigation' })}
              className={`p-2.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                block.icon === 'navigation'
                  ? 'bg-neutral-900 border-neutral-900 text-white'
                  : 'bg-white border-neutral-300 text-neutral-600 hover:bg-neutral-50'
              }`}
              title="Navigation Cursor"
            >
              <Navigation className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onUpdate({ icon: 'hash' })}
              className={`p-2.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                block.icon === 'hash'
                  ? 'bg-neutral-900 border-neutral-900 text-white'
                  : 'bg-white border-neutral-300 text-neutral-600 hover:bg-neutral-50'
              }`}
              title="Hash Number"
            >
              <Hash className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onUpdate({ icon: 'align-left' })}
              className={`p-2.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                block.icon === 'align-left'
                  ? 'bg-neutral-900 border-neutral-900 text-white'
                  : 'bg-white border-neutral-300 text-neutral-600 hover:bg-neutral-50'
              }`}
              title="Text Lines"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={block.required !== false}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Required</span>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-neutral-700">Min length</label>
            <input
              type="number"
              value={block.minLength ?? 2}
              onChange={(e) => onUpdate({ minLength: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-neutral-700">Max length</label>
            <input
              type="number"
              value={block.maxLength ?? 250}
              onChange={(e) => onUpdate({ maxLength: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Regex validation</label>
          <input
            type="text"
            value={block.regexValidation ?? ''}
            onChange={(e) => onUpdate({ regexValidation: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            placeholder=""
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Prefix text</label>
          <input
            type="text"
            value={block.prefixText ?? ''}
            onChange={(e) => onUpdate({ prefixText: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            placeholder=""
          />
          <div className="text-[11px] text-neutral-500">
            Text that your customers can't change.
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Invalid value error text</label>
          <input
            type="text"
            value={block.invalidErrorText ?? ''}
            onChange={(e) => onUpdate({ invalidErrorText: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            placeholder=""
          />
          <p className="text-[11px] text-neutral-500 leading-relaxed pt-1">
            If you leave this field empty the app will use your <strong className="font-semibold text-neutral-700">Invalid generic field error text</strong> if the customer enters an invalid value. You can edit the generic error text at the bottom of the general settings section.
          </p>
        </div>
      </div>
    );
  }

  // 4. FIRST NAME & LAST NAME FIELD (Image 2)
  if (block.id === 'fullname' || block.id === 'lastname') {
    const isFirst = block.id === 'fullname';
    const title = isFirst ? 'FIRST NAME FIELD' : 'LAST NAME FIELD';

    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          {title}
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Label</label>
          <input
            type="text"
            value={block.label ?? block.name}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Placeholder</label>
          <input
            type="text"
            value={block.placeholder ?? ''}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={block.showIcon !== false}
            onChange={(e) => onUpdate({ showIcon: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Show field icon</span>
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={block.required !== false}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Required</span>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-neutral-700">Min length</label>
            <input
              type="number"
              value={block.minLength ?? 2}
              onChange={(e) => onUpdate({ minLength: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-neutral-700">Max length</label>
            <input
              type="number"
              value={block.maxLength ?? 250}
              onChange={(e) => onUpdate({ maxLength: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Regex validation</label>
          <input
            type="text"
            value={block.regexValidation ?? ''}
            onChange={(e) => onUpdate({ regexValidation: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            placeholder=""
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Invalid value error text</label>
          <input
            type="text"
            value={block.invalidErrorText ?? ''}
            onChange={(e) => onUpdate({ invalidErrorText: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            placeholder=""
          />
          <p className="text-[11px] text-neutral-500 leading-relaxed pt-1">
            If you leave this field empty the app will use your <strong className="font-semibold text-neutral-700">Invalid generic field error text</strong> if the customer enters an invalid value. You can edit the generic error text at the bottom of the general settings section.
          </p>
        </div>
      </div>
    );
  }

  // 5. PROVINCE FIELD (Image 9)
  if (block.id === 'province') {
    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          PROVINCE FIELD
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Label</label>
          <input
            type="text"
            value={block.label ?? 'Province'}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Placeholder</label>
          <input
            type="text"
            value={block.placeholder ?? 'Province'}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={block.required !== false}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Required</span>
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={block.disableDropdown || false}
            onChange={(e) => onUpdate({ disableDropdown: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Disable dropdown</span>
        </label>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-neutral-700">
            Remove the following provinces or states:
          </label>
          <textarea
            rows={3}
            value={block.removedProvinces ?? ''}
            onChange={(e) => onUpdate({ removedProvinces: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900 leading-normal"
            placeholder="Punjab&#10;Sindh"
          />
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            Enter the names of the provinces you want to remove from your dropdown <strong className="font-semibold text-neutral-700">separated by a new line</strong>. The province names must be the same as in your form.
          </p>
        </div>
      </div>
    );
  }

  // 6. NEWSLETTER FIELD (Image 6)
  if (block.id === 'subscribe') {
    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          NEWSLETTER FIELD
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Label</label>
          <input
            type="text"
            value={block.label ?? 'Subscribe to stay updated with new products and offers!'}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={block.preselected || false}
            onChange={(e) => onUpdate({ preselected: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Preselect checkbox</span>
        </label>
      </div>
    );
  }

  // 7. ACCEPT TERMS FIELD (Image 7)
  if (block.id === 'terms') {
    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          ACCEPT TERMS FIELD
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Label</label>
          <input
            type="text"
            value={block.label ?? 'Accept our <a href="/policies/terms-of-service">terms of service</a>'}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={block.required !== false}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Required</span>
        </label>
      </div>
    );
  }

  // 8. SUBMIT BUTTON (Image 8)
  if (block.id === 'submit' || block.type === 'button') {
    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          SUBMIT BUTTON
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Button text</label>
          <input
            type="text"
            value={block.label ?? block.name ?? 'COMPLETE ORDER - {order_total}'}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
          <p className="text-[11px] text-neutral-500 leading-relaxed pt-0.5">
            Use <strong className="font-semibold text-neutral-700">{'{order_total}'}</strong> to dynamically insert the order total and <strong className="font-semibold text-neutral-700">{'{order_subtotal}'}</strong> to insert the order subtotal.
          </p>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Button subtitle</label>
          <input
            type="text"
            value={block.subtitle ?? ''}
            onChange={(e) => onUpdate({ subtitle: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            placeholder=""
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Button animation</label>
          <select
            value={block.animation || 'None'}
            onChange={(e) => onUpdate({ animation: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          >
            <option value="None">None</option>
            <option value="Shaker">Shaker</option>
            <option value="Pulse">Pulse</option>
            <option value="Bounce">Bounce</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Button icon</label>
          <select
            value={block.icon || 'Button icon'}
            onChange={(e) => onUpdate({ icon: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          >
            <option value="Button icon">Button icon</option>
            <option value="Cart icon">Cart icon</option>
            <option value="Bag icon">Bag icon</option>
            <option value="Truck icon">Truck icon</option>
            <option value="No icon">No icon</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Background color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={block.backgroundColor?.startsWith('#') ? block.backgroundColor : '#000000'}
              onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
              className="w-8 h-8 rounded border border-neutral-300 p-0.5 cursor-pointer bg-white"
            />
            <input
              type="text"
              value={block.backgroundColor || 'rgba(0,0,0,1)'}
              onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
              className="flex-1 px-3 py-1.5 border border-neutral-300 rounded-lg text-xs font-mono text-neutral-900 outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Text color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={block.textColor?.startsWith('#') ? block.textColor : '#ffffff'}
              onChange={(e) => onUpdate({ textColor: e.target.value })}
              className="w-8 h-8 rounded border border-neutral-300 p-0.5 cursor-pointer bg-white"
            />
            <input
              type="text"
              value={block.textColor || 'rgba(255,255,255,1)'}
              onChange={(e) => onUpdate({ textColor: e.target.value })}
              className="flex-1 px-3 py-1.5 border border-neutral-300 rounded-lg text-xs font-mono text-neutral-900 outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-neutral-700">
            <span>Font size</span>
            <span>{block.fontSize || 14}px</span>
          </div>
          <input
            type="range"
            min="10"
            max="24"
            value={block.fontSize || 14}
            onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
            className="w-full accent-neutral-900 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-neutral-700">
            <span>Border radius</span>
            <span>{block.borderRadius ?? 8}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            value={block.borderRadius ?? 8}
            onChange={(e) => onUpdate({ borderRadius: Number(e.target.value) })}
            className="w-full accent-neutral-900 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-neutral-700">
            <span>Border width</span>
            <span>{block.borderWidth ?? 0}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            value={block.borderWidth ?? 0}
            onChange={(e) => onUpdate({ borderWidth: Number(e.target.value) })}
            className="w-full accent-neutral-900 cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Border color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={block.borderColor?.startsWith('#') ? block.borderColor : '#000000'}
              onChange={(e) => onUpdate({ borderColor: e.target.value })}
              className="w-8 h-8 rounded border border-neutral-300 p-0.5 cursor-pointer bg-white"
            />
            <input
              type="text"
              value={block.borderColor || 'rgba(0,0,0,1)'}
              onChange={(e) => onUpdate({ borderColor: e.target.value })}
              className="flex-1 px-3 py-1.5 border border-neutral-300 rounded-lg text-xs font-mono text-neutral-900 outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-neutral-700">
            <span>Shadow</span>
            <span>{block.shadow ?? 2}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={block.shadow ?? 2}
            onChange={(e) => onUpdate({ shadow: Number(e.target.value) })}
            className="w-full accent-neutral-900 cursor-pointer"
          />
        </div>
      </div>
    );
  }

  // 9. DISCOUNT CODES (Image 12 & 13)
  if (block.id === 'discount_codes' || block.type === 'discount') {
    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          DISCOUNT CODES
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={block.limitOnePerOrder !== false}
            onChange={(e) => onUpdate({ limitOnePerOrder: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Limit to 1 discount code per order</span>
        </label>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Discounts line text</label>
          <input
            type="text"
            value={block.discountsLineText ?? 'Discounts'}
            onChange={(e) => onUpdate({ discountsLineText: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Discount code field label</label>
          <input
            type="text"
            value={block.label ?? 'Discount code'}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Apply button text</label>
          <input
            type="text"
            value={block.applyButtonText ?? 'Apply'}
            onChange={(e) => onUpdate({ applyButtonText: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Apply button background color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={block.applyButtonBgColor?.startsWith('#') ? block.applyButtonBgColor : '#000000'}
              onChange={(e) => onUpdate({ applyButtonBgColor: e.target.value })}
              className="w-8 h-8 rounded border border-neutral-300 p-0.5 cursor-pointer bg-white"
            />
            <input
              type="text"
              value={block.applyButtonBgColor || 'rgba(0,0,0,1)'}
              onChange={(e) => onUpdate({ applyButtonBgColor: e.target.value })}
              className="flex-1 px-3 py-1.5 border border-neutral-300 rounded-lg text-xs font-mono text-neutral-900 outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Invalid discount code error text</label>
          <input
            type="text"
            value={block.invalidDiscountErrorText ?? 'Enter a valid discount code.'}
            onChange={(e) => onUpdate({ invalidDiscountErrorText: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">1 discount code allowed error text</label>
          <input
            type="text"
            value={block.oneDiscountAllowedErrorText ?? 'Only 1 discount per order is allowed.'}
            onChange={(e) => onUpdate({ oneDiscountAllowedErrorText: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        {/* Info Box matching Image 12 */}
        <div className="p-3 bg-[#eef6fc] border border-[#cbe3f7] rounded-xl text-xs text-[#1c4772] space-y-2">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-[#206095] shrink-0 mt-0.5" />
            <span>
              The app will accept all your discount codes from Shopify. To create discount codes in Shopify click here:
            </span>
          </div>
          <div className="pt-0.5">
            <a
              href="https://admin.shopify.com/discounts"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-white border border-[#bedbf4] text-[#1c4772] rounded-lg text-xs font-semibold hover:bg-neutral-50 inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Create discount codes</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 10. IMAGE OR GIF SETTINGS
  if (block.type === 'image') {
    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          IMAGE OR GIF SETTINGS
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Image / GIF URL</label>
          <input
            type="text"
            value={block.imageUrl ?? ''}
            onChange={(e) => onUpdate({ imageUrl: e.target.value })}
            placeholder="https://example.com/banner.png"
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        {block.imageUrl && (
          <div className="p-2 border border-neutral-200 rounded-lg bg-neutral-50 flex items-center justify-center max-h-36 overflow-hidden">
            <img 
              src={block.imageUrl} 
              alt={block.imageAlt || 'Preview'} 
              className="max-h-32 object-contain rounded"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Alt text</label>
          <input
            type="text"
            value={block.imageAlt ?? ''}
            onChange={(e) => onUpdate({ imageAlt: e.target.value })}
            placeholder="Promotional banner, trust seal, etc."
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Alignment</label>
          <select
            value={block.alignment || 'Center'}
            onChange={(e) => onUpdate({ alignment: e.target.value as 'Left' | 'Center' | 'Right' })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          >
            <option value="Center">Center</option>
            <option value="Left">Left</option>
            <option value="Right">Right</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-neutral-700">
            <span>Border radius</span>
            <span>{block.borderRadius ?? 8}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="24"
            value={block.borderRadius ?? 8}
            onChange={(e) => onUpdate({ borderRadius: Number(e.target.value) })}
            className="w-full accent-neutral-900 cursor-pointer"
          />
        </div>
      </div>
    );
  }

  // 11. WHATSAPP BUTTON SETTINGS
  if (block.type === 'whatsapp_button') {
    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          WHATSAPP BUTTON SETTINGS
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Button text</label>
          <input
            type="text"
            value={block.label ?? 'Order on WhatsApp'}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">WhatsApp Phone Number</label>
          <input
            type="text"
            value={block.whatsappNumber ?? '+92 300 1234567'}
            onChange={(e) => onUpdate({ whatsappNumber: e.target.value })}
            placeholder="+923001234567"
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
          <span className="text-[11px] text-neutral-500">Include country code without spaces or dashes</span>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Pre-filled message template</label>
          <textarea
            rows={2}
            value={block.whatsappMessage ?? 'Hi! I would like to order {product_name} for {order_total}'}
            onChange={(e) => onUpdate({ whatsappMessage: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
          <span className="text-[11px] text-neutral-500">Supports {'{product_name}'} and {'{order_total}'}</span>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Button background color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={block.backgroundColor?.startsWith('#') ? block.backgroundColor : '#25D366'}
              onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
              className="w-8 h-8 rounded border border-neutral-300 p-0.5 cursor-pointer bg-white"
            />
            <input
              type="text"
              value={block.backgroundColor || '#25D366'}
              onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
              className="flex-1 px-3 py-1.5 border border-neutral-300 rounded-lg text-xs font-mono text-neutral-900 outline-none"
            />
          </div>
        </div>
      </div>
    );
  }

  // 12. SHOPIFY CHECKOUT BUTTON SETTINGS
  if (block.type === 'shopify_button') {
    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          SHOPIFY CHECKOUT BUTTON SETTINGS
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Button text</label>
          <input
            type="text"
            value={block.label ?? 'CHECKOUT WITH SHOPIFY'}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Background color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={block.backgroundColor?.startsWith('#') ? block.backgroundColor : '#5c6ac4'}
              onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
              className="w-8 h-8 rounded border border-neutral-300 p-0.5 cursor-pointer bg-white"
            />
            <input
              type="text"
              value={block.backgroundColor || '#5c6ac4'}
              onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
              className="flex-1 px-3 py-1.5 border border-neutral-300 rounded-lg text-xs font-mono text-neutral-900 outline-none"
            />
          </div>
        </div>
      </div>
    );
  }

  // 13. QUANTITY SELECTOR SETTINGS
  if (block.type === 'quantity') {
    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          QUANTITY SELECTOR SETTINGS
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Label</label>
          <input
            type="text"
            value={block.label ?? 'Quantity'}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-neutral-700">Min Quantity</label>
            <input
              type="number"
              min="1"
              value={block.minQty ?? 1}
              onChange={(e) => onUpdate({ minQty: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-neutral-700">Max Quantity</label>
            <input
              type="number"
              min="1"
              value={block.maxQty ?? 10}
              onChange={(e) => onUpdate({ maxQty: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            />
          </div>
        </div>
      </div>
    );
  }

  // 14. DROPDOWN LIST SETTINGS
  if (block.type === 'dropdown') {
    const optionsText = (block.options || ['Option 1', 'Option 2', 'Option 3']).join('\n');

    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          DROPDOWN LIST SETTINGS
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Label</label>
          <input
            type="text"
            value={block.label ?? 'Select an option'}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Placeholder Text</label>
          <input
            type="text"
            value={block.placeholder ?? 'Select an option...'}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Options (one per line)</label>
          <textarea
            rows={4}
            value={optionsText}
            onChange={(e) => {
              const opts = e.target.value.split('\n').filter(Boolean);
              onUpdate({ options: opts });
            }}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900 font-mono"
            placeholder="Option 1&#10;Option 2&#10;Option 3"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(block.required)}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Required field</span>
        </label>
      </div>
    );
  }

  // 15. SINGLE-CHOICE / RADIO SETTINGS
  if (block.type === 'radio') {
    const optionsText = (block.options || ['Option 1', 'Option 2']).join('\n');

    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          SINGLE-CHOICE RADIO SETTINGS
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Label / Question</label>
          <input
            type="text"
            value={block.label ?? 'Choose an option'}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Options (one per line)</label>
          <textarea
            rows={3}
            value={optionsText}
            onChange={(e) => {
              const opts = e.target.value.split('\n').filter(Boolean);
              onUpdate({ options: opts });
            }}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900 font-mono"
            placeholder="Option 1&#10;Option 2"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(block.required)}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Required field</span>
        </label>
      </div>
    );
  }

  // 16. CHECKBOX SETTINGS
  if (block.type === 'checkbox') {
    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          CHECKBOX SETTINGS
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Label text (HTML allowed)</label>
          <textarea
            rows={2}
            value={block.label ?? block.name}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(block.preselected)}
            onChange={(e) => onUpdate({ preselected: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Checked by default</span>
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(block.required)}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Required (must be checked to complete order)</span>
        </label>
      </div>
    );
  }

  // 17. DATE SELECTOR SETTINGS
  if (block.type === 'date') {
    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          DATE SELECTOR SETTINGS
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Label</label>
          <input
            type="text"
            value={block.label ?? 'Select date'}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(block.required)}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Required field</span>
        </label>
      </div>
    );
  }

  // 18. LINK BUTTON SETTINGS
  if (block.type === 'link_button') {
    return (
      <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
        {showDisabledWarning && (
          <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
            <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
            <p className="leading-snug">
              This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
            </p>
          </div>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
          LINK BUTTON SETTINGS
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Button label</label>
          <input
            type="text"
            value={block.label ?? 'Click here'}
            onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-neutral-700">Link URL</label>
          <input
            type="url"
            value={block.linkUrl ?? 'https://example.com'}
            onChange={(e) => onUpdate({ linkUrl: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
          <input
            type="checkbox"
            checked={block.openInNewTab !== false}
            onChange={(e) => onUpdate({ openInNewTab: e.target.checked })}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
          />
          <span>Open link in new browser tab</span>
        </label>
      </div>
    );
  }

  // 19. GENERIC / FALLBACK FOR ANY OTHER CUSTOM FIELD (e.g. Email, Order Note, Totals, Shipping Rates, Text input)
  return (
    <div className="p-4 bg-white border-t border-neutral-200 text-xs space-y-4">
      {showDisabledWarning && (
        <div className="p-3 bg-[#fff4f2] border border-[#fbd4cd] rounded-xl flex items-start gap-2.5 text-xs text-[#9a2c16]">
          <AlertOctagon className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
          <p className="leading-snug">
            This block is <strong className="font-semibold text-neutral-900">disabled</strong> and will not appear on your form. To enable this block click on the <strong className="font-semibold text-neutral-900">eye</strong> button above.
          </p>
        </div>
      )}

      <div className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
        {block.name} FIELD
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-semibold text-neutral-700">Label</label>
        <input
          type="text"
          value={block.label ?? block.name}
          onChange={(e) => onUpdate({ label: e.target.value, name: e.target.value })}
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
        />
      </div>

      {block.type === 'field' && (
        <>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-neutral-700">Placeholder</label>
            <input
              type="text"
              value={block.placeholder ?? ''}
              onChange={(e) => onUpdate({ placeholder: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-neutral-800 cursor-pointer">
            <input
              type="checkbox"
              checked={block.required || false}
              onChange={(e) => onUpdate({ required: e.target.checked })}
              className="w-4 h-4 rounded text-neutral-900 accent-neutral-900"
            />
            <span>Required</span>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-neutral-700">Min length</label>
              <input
                type="number"
                value={block.minLength ?? 0}
                onChange={(e) => onUpdate({ minLength: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-neutral-700">Max length</label>
              <input
                type="number"
                value={block.maxLength ?? 250}
                onChange={(e) => onUpdate({ maxLength: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white text-neutral-900 outline-none focus:border-neutral-900"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
