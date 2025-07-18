// Coin type for wallet and selectors
export interface Coin {
  name: string;
  symbol: string;
  icon: string;
  balance: string;
  usdBalance: string;
  color: string;
  network?: string;
}

export const walletCoins: Coin[] = [
  {
    name: "Binance Coin",
    symbol: "BNB",
    icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
    balance: "0",
    usdBalance: "$0.00",
    color: "#F3BA2F",
    network: undefined,
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    balance: "0",
    usdBalance: "$0.00",
    color: "#F7931A",
    network: undefined,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    balance: "0",
    usdBalance: "$0.00",
    color: "#627EEA",
    network: undefined,
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    balance: "0",
    usdBalance: "$0.00",
    color: "#2775CA",
    network: undefined,
  },
  {
    name: "Tether",
    symbol: "USDT",
    icon: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    balance: "0",
    usdBalance: "$0.00",
    color: "#26A17B",
    network: undefined,
  },
  {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    icon: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png",
    balance: "0",
    usdBalance: "$0.00",
    color: "#342C2C",
    network: undefined,
  },
  {
    name: "Wrapped Ether",
    symbol: "WETH",
    icon: "https://cryptologos.cc/logos/weth-weth-logo.png",
    balance: "0",
    usdBalance: "$0.00",
    color: "#627EEA",
    network: undefined,
  },
];

// Robust coin icon renderer
export function getCoinIcon(
  symbol: string,
  fallbackUrl?: string,
  color?: string
) {
  try {
    // Try to load local SVG from cryptocurrency-icons
    return (
      <img
        src={new URL(
          `../../node_modules/cryptocurrency-icons/svg/color/${symbol.toLowerCase()}.svg`,
          import.meta.url
        ).toString()}
        alt={symbol}
        className="w-8 h-8"
        onError={(e) => {
          if (fallbackUrl) {
            (e.target as HTMLImageElement).src = fallbackUrl;
          } else {
            (e.target as HTMLImageElement).style.display = "none";
          }
        }}
      />
    );
  } catch {
    if (fallbackUrl) {
      return <img src={fallbackUrl} alt={symbol} className="w-8 h-8" />;
    }
    // Fallback: colored circle with symbol
    return (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
        style={{ backgroundColor: color || "#888" }}
      >
        {symbol}
      </div>
    );
  }
}
