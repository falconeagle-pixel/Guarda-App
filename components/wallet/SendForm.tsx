import React, { useState, isValidElement } from "react";
import { Button } from "@/components/ui/button";

interface Coin {
  name: string;
  symbol: string;
  balance: string;
  usdBalance: string;
  color: string;
  icon: string;
  network?: string;
}

interface SendFormProps {
  selectedCoin: Coin;
  sortedCryptoData: Coin[];
  getCoinIcon: (symbol: string) => React.ReactNode;
  setSelectedCoin: (coin: Coin) => void;
}

export const SendForm: React.FC<SendFormProps> = ({
  selectedCoin,
  sortedCryptoData,
  getCoinIcon,
  setSelectedCoin,
}) => {
  const [showCoinDropdown, setShowCoinDropdown] = useState(false);
  return (
    <div className="bg-guarda-card rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Send form */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-bold text-blue-500 mb-2 block">
              From
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCoinDropdown((v) => !v)}
                className="flex items-center w-full space-x-2 p-3 border rounded bg-white focus:outline-none"
              >
                <img
                  src={(() => {
                    const icon = getCoinIcon(selectedCoin.symbol);
                    return isValidElement(icon) &&
                      (icon as React.ReactElement<any, any>).props &&
                      (icon as React.ReactElement<any, any>).props.src
                      ? (icon as React.ReactElement<any, any>).props.src
                      : "";
                  })()}
                  alt={selectedCoin.symbol}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{selectedCoin.name}</span>
                <span className="text-xs text-guarda-text-muted ml-2">
                  0 {selectedCoin.symbol}
                </span>
                <span className="ml-auto text-gray-300">▼</span>
              </button>
              {showCoinDropdown && (
                <div className="absolute z-10 mt-2 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                  {sortedCryptoData.map((coin) => (
                    <button
                      key={coin.symbol}
                      type="button"
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedCoin(coin);
                        setShowCoinDropdown(false);
                      }}
                    >
                      <img
                        src={(() => {
                          const icon = getCoinIcon(coin.symbol);
                          return isValidElement(icon) &&
                            (icon as React.ReactElement<any, any>).props &&
                            (icon as React.ReactElement<any, any>).props.src
                            ? (icon as React.ReactElement<any, any>).props.src
                            : "";
                        })()}
                        alt={coin.symbol}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="font-medium">{coin.name}</span>
                      <span className="ml-auto text-xs text-guarda-text-muted">
                        {coin.symbol}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-blue-500">To</label>
              <span className="text-blue-500 text-sm cursor-pointer">
                To My Wallet
              </span>
            </div>
            <div className="flex items-center justify-between mb-2 border rounded px-3 py-2 bg-white">
              <input
                className="flex-1 outline-none bg-transparent"
                placeholder={`Enter ${selectedCoin.symbol} or HRA`}
              />
              <span
                className="text-guarda-blue-light cursor-pointer ml-2"
                style={{ fontSize: "0.875rem" }}
              >
                Paste
              </span>
              <img
                src="https://guarda.com/app/c61d6d760630ffa83fc641105101d67c.svg"
                alt="QR code"
                width={24}
                height={24}
                className="ml-2 cursor-pointer"
                style={{ display: "inline-block", verticalAlign: "middle" }}
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-guarda-text-muted mb-2 block">
              Amount <span className="ml-1">{selectedCoin.symbol} ▼</span>
            </label>
            <div className="flex items-center border rounded px-3 py-2">
              <input className="flex-1 outline-none" placeholder="0" />
              <span className="ml-2 text-guarda-text-muted">0 USD</span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-guarda-text-muted mt-1">
            <span>
              Available:{" "}
              <span className="text-guarda-blue-light">
                0 {selectedCoin.symbol}
              </span>
            </span>
            <span>Network fee: —</span>
          </div>
          <div className="border-t my-4"></div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-guarda-text-muted">Step 1 of 3</span>
            <Button className="bg-guarda-blue hover:bg-guarda-blue-hover px-8">
              Next
            </Button>
          </div>
        </div>
        {/* Right: SVG and description */}
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://guarda.com/app/a48d39703498414f14ac55b6f0121a3c.svg"
            alt="Send Illustration"
            className="w-40 h-40 mb-4"
          />
          <span className="text-guarda-text-muted text-center">
            Instantly send your coins or tokens
          </span>
        </div>
      </div>
    </div>
  );
};
