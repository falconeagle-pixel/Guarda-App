import React from "react";

interface Coin {
  name: string;
  symbol: string;
  balance: string;
  usdBalance: string;
  color: string;
  icon: string;
  network?: string;
}

interface WalletListProps {
  coins: Coin[];
  selectedCoin: Coin;
  setSelectedCoin: (coin: Coin) => void;
  theme: string;
  getCoinIcon: (symbol: string) => React.ReactNode;
}

export const WalletList: React.FC<WalletListProps> = ({
  coins,
  selectedCoin,
  setSelectedCoin,
  theme,
  getCoinIcon,
}) => (
  <div className="bg-guarda-card rounded-lg p-4">
    <div className="text-xs text-gray-500 mb-4">
      {coins.length} wallets | 0 hidden | 0 watch-only | 0 ledger
    </div>
    <div className="space-y-2">
      {coins.map((crypto, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-2 hover:bg-guarda-input rounded cursor-pointer ${
            selectedCoin.symbol === crypto.symbol
              ? theme === "dark"
                ? "bg-guarda-input"
                : "bg-white shadow"
              : ""
          }`}
          onClick={() => setSelectedCoin(crypto)}
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-guarda-text-primary text-sm font-bold"
              style={{ backgroundColor: crypto.color }}
            >
              {getCoinIcon(crypto.symbol) || crypto.icon}
            </div>
            <div>
              <div className="text-sm font-medium">{crypto.name}</div>
              <div className="text-xs text-guarda-text-muted">
                {crypto.network
                  ? `${crypto.symbol} - ${crypto.network}`
                  : crypto.symbol}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm">{crypto.balance}</div>
            <div className="text-xs text-guarda-text-muted">
              {crypto.usdBalance}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
