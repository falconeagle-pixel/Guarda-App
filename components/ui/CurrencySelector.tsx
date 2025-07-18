import React, { useState } from "react";
// @ts-expect-error: No types for react-world-flags
import WorldFlag from "react-world-flags";

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface CurrencySelectorProps {
  currencies: Currency[];
  value: Currency;
  onChange: (currency: Currency) => void;
  label?: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currencies,
  value,
  onChange,
  label,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = currencies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm text-guarda-text-muted mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        className="w-full flex items-center border rounded px-4 py-2 bg-white text-left"
        onClick={() => setShowDropdown((v) => !v)}
      >
        <WorldFlag
          code={value.code.slice(0, 2)}
          style={{
            width: 24,
            height: 18,
            marginRight: 8,
            borderRadius: 3,
            objectFit: "cover",
          }}
          fallback={<span className="mr-2 text-xl">{value.code}</span>}
        />
        <span className="font-medium mr-2">{value.name}</span>
        <span className="text-xs text-gray-500">{value.code}</span>
        <svg
          className="w-4 h-4 ml-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {showDropdown && (
        <div className="absolute z-10 mt-2 w-full bg-white border rounded shadow-lg">
          <input
            className="w-full p-2 border-b outline-none"
            placeholder="Search for currency"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="max-h-60 overflow-y-auto">
            {filtered.map((c) => (
              <button
                key={c.code}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  onChange(c);
                  setShowDropdown(false);
                }}
              >
                <WorldFlag
                  code={c.code.slice(0, 2)}
                  style={{
                    width: 24,
                    height: 18,
                    marginRight: 8,
                    borderRadius: 3,
                    objectFit: "cover",
                  }}
                  fallback={<span className="mr-2 text-xl">{c.code}</span>}
                />
                <span className="font-medium mr-2">{c.name}</span>
                <span className="text-xs text-gray-500">{c.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
