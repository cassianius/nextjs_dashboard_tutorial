// app/ui/applicants/phone-input.tsx
import React from 'react';
import { PhoneIcon } from '@heroicons/react/24/outline';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  errors?: string[];
}

export default function PhoneInput({ value, onChange, hasError, errors }: PhoneInputProps) {
  // Format phone number as user types
  const formatPhoneNumber = (input: string) => {
    // Strip all non-numeric characters
    const cleaned = input.replace(/\D/g, '');
    
    // Limit to 10 digits
    const truncated = cleaned.slice(0, 10);
    
    // Format the number
    if (truncated.length === 0) return '';
    if (truncated.length <= 3) return truncated;
    if (truncated.length <= 6) return `(${truncated.slice(0, 3)}) ${truncated.slice(3)}`;
    return `(${truncated.slice(0, 3)}) ${truncated.slice(3, 6)}-${truncated.slice(6)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    onChange(formattedNumber);
  };

  return (
    <div className="relative">
      <input
        className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
          hasError ? 'border-red-500' : 'border-gray-600'
        }`}
        id="phone"
        type="tel"
        name="phone"
        placeholder="(555) 555-5555"
        value={value}
        onChange={handleChange}
        required
      />
      <PhoneIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
      {hasError && errors && (
        <div className="mt-1 text-xs text-red-500">
          {errors.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}