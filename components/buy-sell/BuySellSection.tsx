import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { CurrencySelector } from "../ui/CurrencySelector";
import { CoinSelector } from "../ui/CoinSelector";
import { walletCoins, Coin, getCoinIcon } from "../wallet/coins";

// You may want to import these from a shared location
const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  // ... add more as needed
];

const paymentPartners = [
  {
    id: "guardarian",
    name: "Guardarian",
    logo: "/partner-logos/guardarian.svg",
    bestRate: true,
    methods: [
      { name: "VISA", logo: "/partner-logos/visa.svg" },
      { name: "Mastercard", logo: "/partner-logos/mastercard.svg" },
      { name: "SEPA", logo: "/partner-logos/sepa.svg" },
      { name: "Discover", logo: "/partner-logos/discover.svg" },
    ],
    rate: "1.75018 BSC",
    detailsUrl: "#",
  },
  {
    id: "simplex",
    name: "Simplex",
    logo: "/partner-logos/simplex.svg",
    bestRate: false,
    methods: [
      { name: "VISA", logo: "/partner-logos/visa.svg" },
      { name: "Mastercard", logo: "/partner-logos/mastercard.svg" },
      { name: "Apple Pay", logo: "/partner-logos/applepay.svg" },
    ],
    rate: "1.71943 BSC",
    detailsUrl: "#",
  },
];

export const BuySellSection: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState("1000");
  const [selectedCoin, setSelectedCoin] = useState<Coin>(walletCoins[0]);
  const [cryptoAmount, setCryptoAmount] = useState("1.34266");
  const [selectedPartner, setSelectedPartner] = useState(paymentPartners[0]);
  const [showPartnerDropdown, setShowPartnerDropdown] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-guarda-card rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Buy & Sell</h1>
        <div className="space-y-6">
          {/* Amount Section */}
          <div>
            <label className="text-sm text-guarda-text-muted mb-2 block font-medium">
              Amount
            </label>
            <div className="grid grid-cols-2 gap-4">
              <CurrencySelector
                currencies={currencies}
                value={selectedCurrency}
                onChange={setSelectedCurrency}
              />
              <div className="relative flex items-center h-16">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-guarda-input border-guarda-input-border pr-16 h-full text-2xl font-bold text-right focus:ring-0 focus:outline-none"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base font-semibold text-guarda-text-muted">
                  {selectedCurrency.code}
                </span>
              </div>
            </div>
          </div>

          {/* Switch Button */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-guarda-input"
              aria-label="Switch"
            >
              <ArrowUpDown className="w-5 h-5 text-guarda-blue-light" />
            </Button>
          </div>

          {/* I want Section */}
          <div>
            <label className="text-sm text-guarda-text-muted mb-2 block font-medium">
              I want
            </label>
            <div className="grid grid-cols-2 gap-4">
              <CoinSelector
                coins={walletCoins}
                value={selectedCoin}
                onChange={(coin: Coin) => setSelectedCoin(coin)}
                getCoinIcon={getCoinIcon}
              />
              <div className="relative flex items-center h-16">
                <Input
                  type="text"
                  value={cryptoAmount}
                  readOnly
                  className="bg-guarda-input border-guarda-input-border pr-16 h-full text-2xl font-bold text-right focus:ring-0 focus:outline-none"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base font-semibold text-guarda-text-muted">
                  {selectedCoin.symbol}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Partner Section */}
          <div className="mt-2">
            <div className="flex items-center mb-2">
              <span className="text-base font-semibold mr-2">
                Payment partner
              </span>
              <div className="flex-1"></div>
              {!showPartnerDropdown && (
                <div
                  className="flex items-center space-x-2 cursor-pointer select-none"
                  onClick={() => setShowPartnerDropdown(true)}
                >
                  {selectedPartner.bestRate && (
                    <Badge className="bg-gradient-to-r from-[#A78BFA] to-[#7B9DF6] text-white text-xs font-bold px-2 py-1 rounded mr-2">
                      BEST RATE
                    </Badge>
                  )}
                  <span className="font-medium text-base">
                    {selectedPartner.name}
                  </span>
                  <ChevronDown className="w-5 h-5 text-[#7B9DF6]" />
                </div>
              )}
              {showPartnerDropdown && (
                <div
                  className="flex items-center space-x-2 cursor-pointer select-none"
                  onClick={() => setShowPartnerDropdown(false)}
                >
                  {selectedPartner.bestRate && (
                    <Badge className="bg-gradient-to-r from-[#A78BFA] to-[#7B9DF6] text-white text-xs font-bold px-2 py-1 rounded mr-2">
                      BEST RATE
                    </Badge>
                  )}
                  <span className="font-medium text-base">
                    {selectedPartner.name}
                  </span>
                  <ChevronDown className="w-5 h-5 text-[#7B9DF6] rotate-180" />
                </div>
              )}
            </div>
            {showPartnerDropdown && (
              <div className="bg-white rounded-lg shadow border border-gray-200 p-2 mt-2">
                {paymentPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className={`flex items-center px-4 py-3 rounded-lg mb-1 transition-colors ${
                      selectedPartner.id === partner.id
                        ? "bg-[#F5F8FF]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedPartner.id === partner.id}
                      onChange={() => setSelectedPartner(partner)}
                      className="accent-[#7B9DF6] w-4 h-4 mr-4"
                    />
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span className="font-medium text-base mr-2">
                      {partner.name}
                    </span>
                    {partner.bestRate && (
                      <Badge className="bg-gradient-to-r from-[#A78BFA] to-[#7B9DF6] text-white text-xs font-bold px-2 py-1 rounded mr-2">
                        BEST RATE
                      </Badge>
                    )}
                    <div className="flex items-center space-x-2 ml-4">
                      {partner.methods.map((method) => (
                        <img
                          key={method.name}
                          src={method.logo}
                          alt={method.name}
                          className="h-6 w-auto"
                        />
                      ))}
                    </div>
                    <div className="ml-auto flex items-center space-x-2">
                      <a
                        href={partner.detailsUrl}
                        className="text-xs text-guarda-blue-light underline mr-2"
                      >
                        More details
                      </a>
                      <span className="font-semibold text-base text-gray-700">
                        ~{partner.rate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buy Button */}
          <div className="pt-4">
            <Button className="w-full bg-[#7B9DF6] hover:bg-[#5B7ED6] text-white text-lg font-semibold py-4 rounded-lg shadow-none">
              Buy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuySellSection;
