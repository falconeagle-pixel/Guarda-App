import React, { useState } from "react";
import { Coin } from "../wallet/coins";

interface CoinSelectorProps {
  coins: Coin[];
  value: Coin;
  onChange: (coin: Coin) => void;
  label?: string;
  getCoinIcon?: (
    symbol: string,
    fallbackUrl?: string,
    color?: string
  ) => React.ReactNode;
}

export const CoinSelector: React.FC<CoinSelectorProps> = ({
  coins,
  value,
  onChange,
  label,
  getCoinIcon,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = coins.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
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
        {getCoinIcon ? (
          getCoinIcon(value.symbol, value.icon, value.color)
        ) : (
          <span className="mr-2 text-xl">{value.icon}</span>
        )}
        <span className="font-medium mr-2">{value.name}</span>
        <span className="text-xs text-gray-500">{value.symbol}</span>
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
            placeholder="Search for coin"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="max-h-60 overflow-y-auto">
            {filtered.map((c) => (
              <button
                key={c.symbol + (c.network || "")}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  onChange(c);
                  setShowDropdown(false);
                }}
              >
                {getCoinIcon ? (
                  getCoinIcon(c.symbol, c.icon, c.color)
                ) : (
                  <span className="mr-2 text-xl">{c.icon}</span>
                )}
                <span className="font-medium mr-2">{c.name}</span>
                <span className="text-xs text-gray-500">{c.symbol}</span>
                {c.network && (
                  <span className="ml-2 text-xs text-gray-400">
                    {c.network}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
