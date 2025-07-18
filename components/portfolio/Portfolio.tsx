import React, { useState } from "react";
// @ts-expect-error: No types for react-world-flags
import WorldFlag from "react-world-flags";

// Major world currencies with flags, codes, names, and symbols
const currencies = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", symbol: "$" },
  { code: "EUR", name: "Euro", flag: "🇪🇺", symbol: "€" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭", symbol: "Fr" },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿", symbol: "NZ$" },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", flag: "🇳🇴", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", flag: "🇩🇰", symbol: "kr" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰", symbol: "HK$" },
  { code: "KRW", name: "South Korean Won", flag: "🇰🇷", symbol: "₩" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳", symbol: "₹" },
  { code: "RUB", name: "Russian Ruble", flag: "🇷🇺", symbol: "₽" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷", symbol: "R$" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦", symbol: "R" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷", symbol: "₺" },
  { code: "MXN", name: "Mexican Peso", flag: "🇲🇽", symbol: "$" },
  { code: "PLN", name: "Polish Zloty", flag: "🇵🇱", symbol: "zł" },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭", symbol: "฿" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "🇮🇩", symbol: "Rp" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾", symbol: "RM" },
  { code: "PHP", name: "Philippine Peso", flag: "🇵🇭", symbol: "₱" },
  { code: "CZK", name: "Czech Koruna", flag: "🇨🇿", symbol: "Kč" },
  { code: "HUF", name: "Hungarian Forint", flag: "🇭🇺", symbol: "Ft" },
  { code: "ILS", name: "Israeli New Shekel", flag: "🇮🇱", symbol: "₪" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦", symbol: "ر.س" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", symbol: "د.إ" },
  { code: "EGP", name: "Egyptian Pound", flag: "🇪🇬", symbol: "ج.م" },
  { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬", symbol: "₦" },
  { code: "PKR", name: "Pakistani Rupee", flag: "🇵🇰", symbol: "₨" },
  { code: "BDT", name: "Bangladeshi Taka", flag: "🇧🇩", symbol: "৳" },
  { code: "VND", name: "Vietnamese Dong", flag: "🇻🇳", symbol: "₫" },
  { code: "UAH", name: "Ukrainian Hryvnia", flag: "🇺🇦", symbol: "₴" },
  { code: "BGN", name: "Bulgarian Lev", flag: "🇧🇬", symbol: "лв" },
  { code: "RON", name: "Romanian Leu", flag: "🇷🇴", symbol: "lei" },
  { code: "HRK", name: "Croatian Kuna", flag: "🇭🇷", symbol: "kn" },
  { code: "ISK", name: "Icelandic Krona", flag: "🇮🇸", symbol: "kr" },
  { code: "CLP", name: "Chilean Peso", flag: "🇨🇱", symbol: "$" },
  { code: "COP", name: "Colombian Peso", flag: "🇨🇴", symbol: "$" },
  { code: "PEN", name: "Peruvian Sol", flag: "🇵🇪", symbol: "S/." },
  { code: "ARS", name: "Argentine Peso", flag: "🇦🇷", symbol: "$" },
  { code: "DZD", name: "Algerian Dinar", flag: "🇩🇿", symbol: "دج" },
  { code: "MAD", name: "Moroccan Dirham", flag: "🇲🇦", symbol: "د.م." },
  { code: "KWD", name: "Kuwaiti Dinar", flag: "🇰🇼", symbol: "د.ك" },
  { code: "QAR", name: "Qatari Riyal", flag: "🇶🇦", symbol: "ر.ق" },
  { code: "OMR", name: "Omani Rial", flag: "🇴🇲", symbol: "ر.ع." },
  { code: "JOD", name: "Jordanian Dinar", flag: "🇯🇴", symbol: "د.ا" },
  { code: "LBP", name: "Lebanese Pound", flag: "🇱🇧", symbol: "ل.ل" },
  { code: "TWD", name: "New Taiwan Dollar", flag: "🇹🇼", symbol: "NT$" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦", symbol: "ر.س" },
  { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪", symbol: "KSh" },
  { code: "TZS", name: "Tanzanian Shilling", flag: "🇹🇿", symbol: "TSh" },
  { code: "GHS", name: "Ghanaian Cedi", flag: "🇬🇭", symbol: "₵" },
  { code: "UGX", name: "Ugandan Shilling", flag: "🇺🇬", symbol: "USh" },
  { code: "SDG", name: "Sudanese Pound", flag: "🇸🇩", symbol: "ج.س." },
  { code: "ETB", name: "Ethiopian Birr", flag: "🇪🇹", symbol: "Br" },
  { code: "AOA", name: "Angolan Kwanza", flag: "🇦🇴", symbol: "Kz" },
  { code: "MZN", name: "Mozambican Metical", flag: "🇲🇿", symbol: "MT" },
  { code: "XOF", name: "West African CFA franc", flag: "🇸🇳", symbol: "CFA" },
  {
    code: "XAF",
    name: "Central African CFA franc",
    flag: "🇨🇲",
    symbol: "FCFA",
  },
  { code: "XPF", name: "CFP franc", flag: "🇵🇫", symbol: "₣" },
  // ...add more as needed
];

interface PortfolioProps {
  selectedAsset: string;
  setSelectedAsset: (asset: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  selectedAsset,
  setSelectedAsset,
}) => {
  const [currency, setCurrency] = useState(currencies[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCurrencies = currencies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div
        className="bg-guarda-card rounded-lg p-8"
        style={{ width: "1000px", height: "500px" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-medium text-guarda-blue-light">
            Asset allocation
          </h1>
          <div className="relative">
            <button
              className="border px-4 py-2 rounded bg-white text-sm flex items-center"
              onClick={() => setShowDropdown((v) => !v)}
            >
              Show stat in{" "}
              <span className="mx-1 font-bold">
                {currency.symbol} {currency.code}
              </span>
              <svg
                className="w-4 h-4 ml-1"
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
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-10">
                <input
                  className="w-full p-2 border-b outline-none"
                  placeholder="Search for quote currency"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="max-h-60 overflow-y-auto">
                  {filteredCurrencies.map((c) => (
                    <button
                      key={c.code}
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setCurrency(c);
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
                        fallback={
                          <span className="mr-2 text-xl">{c.flag}</span>
                        }
                      />
                      <span className="font-medium">{c.name}</span>
                      <span className="ml-auto text-xs text-gray-500">
                        {c.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setSelectedAsset("assets")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedAsset === "assets"
                    ? "bg-guarda-blue text-guarda-text-primary"
                    : "bg-guarda-input text-guarda-text-muted"
                }`}
              >
                Assets
              </button>
              <button
                onClick={() => setSelectedAsset("chains")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedAsset === "chains"
                    ? "bg-guarda-blue text-guarda-text-primary"
                    : "bg-guarda-input text-guarda-text-muted"
                }`}
              >
                Chains
              </button>
            </div>
            {/* Placeholder for asset/chains grid */}
            <div className="grid grid-cols-2 gap-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-100 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-80 h-80 flex items-center justify-center">
              <svg viewBox="0 0 320 320" className="absolute w-full h-full">
                <circle cx="160" cy="160" r="140" fill="#F4F4F7" />
                <circle cx="160" cy="160" r="100" fill="#fff" />
              </svg>
              <div className="absolute flex flex-col items-center justify-center w-full h-full">
                <span className="text-gray-400 text-lg mb-1">
                  Total Balance
                </span>
                <span className="text-3xl font-bold">{currency.symbol}0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
