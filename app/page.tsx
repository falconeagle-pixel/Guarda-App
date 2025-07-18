"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  MoreHorizontal,
  Copy,
  ExternalLink,
  ChevronDown,
  Info,
  ArrowUpDown,
  Home,
  Sun,
  HelpCircle,
  Lock,
  Moon,
} from "lucide-react";
import { WalletList } from "../components/wallet/WalletList";
import { WalletDetails } from "../components/wallet/WalletDetails";
import { Portfolio } from "../components/portfolio/Portfolio";
import { useNavigate } from "react-router-dom";
import BuySellSection from "../components/buy-sell/BuySellSection";
import ExchangeSection from "../components/exchange/ExchangeSection";
import EarnSection from "../components/earn/EarnSection";
import LoanSection from "../components/loan/LoanSection";
import SettingsSection from "../components/settings/SettingsSection";
import { useTheme } from "next-themes";
import { ThemeToggle } from "../components/ThemeToggle";

// Cryptocurrency data
type Coin = {
  name: string;
  symbol: string;
  balance: string;
  usdBalance: string;
  color: string;
  icon: string;
  network?: string;
};

const cryptoData = [
  {
    name: "Ripple",
    symbol: "XRP",
    balance: "0",
    usdBalance: "$0",
    color: "#23292F",
    icon: "🔷",
  },
  {
    name: "Tether",
    symbol: "USDT",
    balance: "0",
    usdBalance: "$0",
    color: "#26A17B",
    icon: "₮",
    network: "ETH - Ethereum",
  },
  {
    name: "Tether",
    symbol: "USDT",
    balance: "0",
    usdBalance: "$0",
    color: "#26A17B",
    icon: "₮",
    network: "TRX - TRON",
  },
  {
    name: "Tether",
    symbol: "USDT",
    balance: "0",
    usdBalance: "$0",
    color: "#26A17B",
    icon: "₮",
    network: "TRX - TRON",
  },
  {
    name: "Tether",
    symbol: "USDT",
    balance: "0",
    usdBalance: "$0",
    color: "#26A17B",
    icon: "₮",
    network: "BNB - Binance Smart Chain",
  },
  {
    name: "TRON",
    symbol: "TRX",
    balance: "0",
    usdBalance: "$0",
    color: "#FF060A",
    icon: "⚡",
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    balance: "0",
    usdBalance: "$0",
    color: "#2775CA",
    icon: "$",
    network: "ETH - Ethereum",
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    balance: "0",
    usdBalance: "$0",
    color: "#F3BA2F",
    icon: "🔶",
  },
  {
    name: "Solana",
    symbol: "SOL",
    balance: "0",
    usdBalance: "$0",
    color: "#9945FF",
    icon: "◉",
  },
  {
    name: "ADA Old",
    symbol: "ADA",
    balance: "0",
    usdBalance: "$0",
    color: "#0033AD",
    icon: "□",
  },
  {
    name: "Binance Smart Chain",
    symbol: "BNB",
    balance: "0",
    usdBalance: "$0",
    color: "#F3BA2F",
    icon: "🔶",
  },
  {
    name: "Binance USD",
    symbol: "BUSD",
    balance: "0",
    usdBalance: "$0",
    color: "#F0B90B",
    icon: "●",
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    balance: "0",
    usdBalance: "$0",
    color: "#F7931A",
    icon: "₿",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    balance: "0",
    usdBalance: "$0",
    color: "#C2A633",
    icon: "Ð",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: "0",
    usdBalance: "$0",
    color: "#627EEA",
    icon: "◆",
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    balance: "0",
    usdBalance: "$0",
    color: "#BFBBBB",
    icon: "Ł",
  },
  {
    name: "Monero",
    symbol: "XMR",
    balance: "0",
    usdBalance: "$0",
    color: "#FF6600",
    icon: "ⓜ",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    balance: "0",
    usdBalance: "$0",
    color: "#E6007A",
    icon: "●",
  },
  {
    name: "Polygon",
    symbol: "MATIC",
    balance: "0",
    usdBalance: "$0",
    color: "#8247E5",
    icon: "⬟",
  },
];

// Sort coins alphabetically by name
const sortedCryptoData = [...cryptoData].sort((a, b) =>
  a.name.localeCompare(b.name)
);

const earnData = [
  {
    name: "TRON",
    symbol: "TRX",
    lockPeriod: "14 days",
    apy: "up to 3.9%",
    minAmount: "0.3 USD",
    icon: "⚡",
    color: "#FF060A",
  },
  {
    name: "Cosmos",
    symbol: "ATOM",
    lockPeriod: "21 days",
    apy: "up to 5%",
    minAmount: "No min amount",
    icon: "⚛",
    color: "#2E3148",
  },
  {
    name: "Tezos",
    symbol: "XTZ",
    lockPeriod: "No lock-up",
    apy: "up to 5.5%",
    minAmount: "No min amount",
    icon: "🔷",
    color: "#2C7DF7",
  },
  {
    name: "Harmony",
    symbol: "ONE",
    lockPeriod: "~ 1,5 days",
    apy: "up to 8.3%",
    minAmount: "1.15 USD",
    icon: "🔵",
    color: "#00AEE9",
  },
  {
    name: "Ontology",
    symbol: "ONT",
    lockPeriod: "~ 7 days",
    apy: "up to 24.9%",
    minAmount: "0.14 USD",
    icon: "🔵",
    color: "#32A4BE",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    lockPeriod: "No lock-up (possible to exchange GETH back to ETH)",
    apy: "up to 2.5%",
    minAmount: "297.66 USD",
    icon: "◆",
    color: "#627EEA",
  },
  {
    name: "Cardano Shelley",
    symbol: "ADA",
    lockPeriod: "No lock-up",
    apy: "up to 2.5%",
    minAmount: "0 USD",
    icon: "□",
    color: "#0033AD",
  },
  {
    name: "Zilliqa",
    symbol: "ZIL",
    lockPeriod: "No lock-up",
    apy: "up to 11.4%",
    minAmount: "0.12 USD",
    icon: "🔷",
    color: "#49C1BF",
  },
  {
    name: "NOW Token",
    symbol: "NOW",
    lockPeriod: "7 days",
    apy: "up to 25%",
    minAmount: "0 USD",
    icon: "⭕",
    color: "#00D4AA",
  },
  {
    name: "Komodo",
    symbol: "KMD",
    lockPeriod: "No lock-up",
    apy: "up to 5.1%",
    minAmount: "0.29 USD",
    icon: "🔵",
    color: "#326464",
  },
  {
    name: "Callisto",
    symbol: "CLO",
    lockPeriod: "1 month",
    apy: "up to 7%",
    minAmount: "No min amount",
    icon: "▶",
    color: "#00D100",
  },
  {
    name: "Qtum",
    symbol: "QTUM",
    lockPeriod: "18 hours",
    apy: "up to 6.79%",
    minAmount: "No min amount",
    icon: "🔵",
    color: "#2E9AD0",
  },
];

function getCoinIcon(symbol: string) {
  try {
    // cryptocurrency-icons uses lowercase symbols and has svg/color directory
    return (
      <img
        src={new URL(
          `../node_modules/cryptocurrency-icons/svg/color/${symbol.toLowerCase()}.svg`,
          import.meta.url
        ).toString()}
        alt={symbol}
        className="w-8 h-8"
        onError={(e) => {
          // fallback to text icon if SVG not found
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    );
  } catch {
    return null;
  }
}

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

// Add payment partners data
const paymentPartners = [
  {
    id: "guardarian",
    name: "Guardarian",
    logo: "/partner-logos/guardarian.svg", // You can use a local SVG or emoji as placeholder
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

export default function GuardaPlatform() {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [selectedAsset, setSelectedAsset] = useState("assets");
  const [selectedCoin, setSelectedCoin] = useState(sortedCryptoData[0]);
  const [walletTab, setWalletTab] = useState("receive");
  const [showCoinDropdown, setShowCoinDropdown] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  // Add handlers for faded header buttons
  const handleSearch = () => {
    alert("Search clicked!");
  };
  const handleFilter = () => {
    alert("Filter clicked!");
  };
  const handleAdd = () => {
    alert("Add clicked!");
  };
  const handleSettings = () => {
    alert("Settings clicked!");
  };

  // In GuardaPlatform component, add state for selectedCurrency and selectedCoin for Buy & Sell
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [buySellCoin, setBuySellCoin] = useState({
    name: sortedCryptoData[0].name,
    symbol: sortedCryptoData[0].symbol,
    icon: sortedCryptoData[0].icon,
    balance: sortedCryptoData[0].balance || "",
    color: sortedCryptoData[0].color || "",
    network: sortedCryptoData[0].network || "",
  });
  const [amount, setAmount] = useState("1000");
  const [cryptoAmount, setCryptoAmount] = useState("0");

  const [selectedPartner, setSelectedPartner] = useState(paymentPartners[0]);
  const [showPartnerDropdown, setShowPartnerDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-background text-guarda-text-primary">
      {/* Header */}
      <header className="bg-guarda-card border-b border-guarda-border">
        <div className="flex items-center px-6 py-4">
          {/* Logo left */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-guarda-blue rounded-lg flex items-center justify-center">
              <img src="/images/logo.svg" alt="Guarda Logo" className="w-5 h-5" />
            </div>
          </div>
          {/* Centered nav */}
          <nav className="flex-1 flex justify-center items-center space-x-10">
            <button
              onClick={() => setActiveTab("wallets")}
              className={`text-sm font-medium tracking-wide px-2 pb-1 transition-colors ${
                activeTab === "wallets"
                  ? "text-guarda-text-primary border-b border-guarda-blue"
                  : "text-guarda-text-muted hover:text-guarda-text-primary"
              }`}
            >
              WALLETS
            </button>
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`text-sm font-medium tracking-wide px-2 pb-1 transition-colors ${
                activeTab === "portfolio"
                  ? "text-guarda-text-primary border-b border-guarda-blue"
                  : "text-guarda-text-muted hover:text-guarda-text-primary"
              }`}
            >
              PORTFOLIO
            </button>
            <button
              onClick={() => setActiveTab("buy-sell")}
              className={`text-sm font-medium tracking-wide px-2 pb-1 transition-colors ${
                activeTab === "buy-sell"
                  ? "text-guarda-text-primary border-b border-guarda-blue"
                  : "text-guarda-text-muted hover:text-guarda-text-primary"
              }`}
            >
              BUY & SELL
            </button>
            <button
              onClick={() => setActiveTab("exchange")}
              className={`text-sm font-medium tracking-wide px-2 pb-1 transition-colors ${
                activeTab === "exchange"
                  ? "text-guarda-text-primary border-b border-guarda-blue"
                  : "text-guarda-text-muted hover:text-guarda-text-primary"
              }`}
            >
              EXCHANGE
            </button>
            <button
              onClick={() => setActiveTab("earn")}
              className={`text-sm font-medium tracking-wide px-2 pb-1 transition-colors ${
                activeTab === "earn"
                  ? "text-guarda-text-primary border-b border-guarda-blue"
                  : "text-guarda-text-muted hover:text-guarda-text-primary"
              }`}
            >
              EARN
            </button>
            <button
              onClick={() => setActiveTab("loan")}
              className={`text-sm font-medium tracking-wide px-2 pb-1 transition-colors ${
                activeTab === "loan"
                  ? "text-guarda-text-primary border-b border-guarda-blue"
                  : "text-guarda-text-muted hover:text-guarda-text-primary"
              }`}
            >
              LOAN
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`text-sm font-medium tracking-wide px-2 pb-1 transition-colors ${
                activeTab === "settings"
                  ? "text-guarda-text-primary border-b border-guarda-blue"
                  : "text-guarda-text-muted hover:text-guarda-text-primary"
              }`}
            >
              SETTINGS
            </button>
          </nav>
          {/* Faded icon buttons right */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-guarda-text-muted hover:text-guarda-text-primary"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2 12L7 7L12 12L17 7L22 12" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-guarda-text-muted hover:text-guarda-text-primary"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12L12 8L16 12L12 16L8 12" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-guarda-text-muted hover:text-guarda-text-primary"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
            <ThemeToggle className="text-guarda-text-muted hover:text-guarda-text-primary" iconClass="w-5 h-5" />
            <Button
              variant="ghost"
              size="icon"
              className="text-guarda-text-muted hover:text-guarda-text-primary"
            >
              <Lock className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === "portfolio" && (
          <Portfolio
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
          />
        )}

        {activeTab === "wallets" && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Sidebar - Wallet List */}
              <div className="lg:col-span-1">
                <WalletList
                  coins={sortedCryptoData}
                  selectedCoin={selectedCoin}
                  setSelectedCoin={(coin) =>
                    setSelectedCoin({
                      name: coin.name,
                      symbol: coin.symbol,
                      balance: coin.balance,
                      usdBalance: coin.usdBalance,
                      color: coin.color,
                      icon: coin.icon,
                      network: coin.network || "",
                    })
                  }
                  theme={theme}
                  getCoinIcon={getCoinIcon}
                />
              </div>
              {/* Right Content - Wallet Details */}
              <WalletDetails
                selectedCoin={selectedCoin}
                walletTab={walletTab}
                setWalletTab={setWalletTab}
                sortedCryptoData={sortedCryptoData}
                getCoinIcon={getCoinIcon}
                theme={theme}
                setSelectedCoin={(coin) =>
                  setSelectedCoin({
                    name: coin.name,
                    symbol: coin.symbol,
                    balance: coin.balance,
                    usdBalance: coin.usdBalance,
                    color: coin.color,
                    icon: coin.icon,
                    network: coin.network || "",
                  })
                }
                setActiveTab={setActiveTab}
              />
            </div>
          </div>
        )}

        {activeTab === "buy-sell" && <BuySellSection />}

        {activeTab === "earn" && <EarnSection />}

        {activeTab === "loan" && <LoanSection />}

        {activeTab === "exchange" && <ExchangeSection />}

        {activeTab === "settings" && <SettingsSection />}
      </main>

      {/* Footer */}
      <footer className="bg-guarda-card border-t border-guarda-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-guarda-text-muted">
              <button
                className="flex items-center space-x-1 hover:text-guarda-text-primary"
                onClick={() => navigate("/wallet")}
              >
                <Home className="w-4 h-4" />
                <span>Back to Guarda.com</span>
              </button>
              <button className="hover:text-guarda-text-primary">
                Support
              </button>
              <button className="hover:text-guarda-text-primary">
                Coin Status
              </button>
              <button className="hover:text-guarda-text-primary">
                Privacy Policy
              </button>
              <button className="hover:text-guarda-text-primary">
                Terms of Service
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <img src="/images/google-play-badge.png" alt="Get it on Google Play" className="h-8" />
              </a>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <img src="/images/app-store-badge.png" alt="Download on the App Store" className="h-8" />
              </a>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-guarda-blue">
                  VISA
                </span>
                <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-guarda-border text-xs text-gray-500">
            <div className="mb-2">© 2017-2025 Guarda. All rights reserved</div>
            <div>
              GUARDACO LDA, provides virtual currency wallet service and
              services related to it. Legal entity ID - 516439965, whose
              registered office is Portugal, 1050-134 Lisboa, Rua Latino Coelho,
              str. 87.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
