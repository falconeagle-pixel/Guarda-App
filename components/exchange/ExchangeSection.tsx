import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import { CoinSelector } from "../ui/CoinSelector";
import { walletCoins, Coin, getCoinIcon } from "../wallet/coins";

const hotPairs = [
  [
    {
      symbol: "USDC",
      network: "BSC",
      icon: walletCoins.find((c) => c.symbol === "USDC")?.icon,
    },
    {
      symbol: "WBTC",
      network: "ETH",
      icon: walletCoins.find((c) => c.symbol === "WBTC")?.icon,
    },
  ],
  [
    {
      symbol: "USDC",
      network: "ETH",
      icon: walletCoins.find((c) => c.symbol === "USDC")?.icon,
    },
    {
      symbol: "USDT",
      network: "ETH",
      icon: walletCoins.find((c) => c.symbol === "USDT")?.icon,
    },
  ],
  [
    {
      symbol: "USDT",
      network: "ETH",
      icon: walletCoins.find((c) => c.symbol === "USDT")?.icon,
    },
    {
      symbol: "WETH",
      network: "ETH",
      icon: walletCoins.find((c) => c.symbol === "WETH")?.icon,
    },
  ],
];

const ExchangeSection: React.FC = () => {
  const [fromCoin, setFromCoin] = useState<Coin>(walletCoins[0]);
  const [toCoin, setToCoin] = useState<Coin>(walletCoins[1]);
  const [fromAmount, setFromAmount] = useState("0");
  const [toAmount] = useState("-");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-guarda-card rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Exchange Crypto</h1>
        <div className="space-y-6">
          {/* I have */}
          <div>
            <label className="text-sm text-guarda-text-muted mb-2 block font-medium">
              I have
            </label>
            <div className="grid grid-cols-2 gap-0 border rounded-lg overflow-hidden">
              <div className="flex items-center px-4 py-3 w-full">
                <CoinSelector
                  coins={walletCoins}
                  value={fromCoin}
                  onChange={(coin: Coin) => setFromCoin(coin)}
                />
              </div>
              <div className="flex items-center justify-end bg-gray-50 px-6 py-3 w-full relative">
                <Input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="bg-transparent border-none text-2xl font-bold text-right focus:ring-0 focus:outline-none w-full"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                />
                <span className="ml-2 text-base font-semibold text-guarda-text-muted">
                  {fromCoin.symbol}
                </span>
              </div>
            </div>
            <div className="flex justify-end text-xs text-guarda-text-muted mt-1">
              Available:{" "}
              <span className="ml-1 text-guarda-blue-light cursor-pointer">
                0 {fromCoin.symbol}
              </span>
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

          {/* I want */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-guarda-text-muted font-medium">
                I want
              </label>
              <a href="#" className="text-sm text-guarda-blue-light">
                To address
              </a>
            </div>
            <div className="grid grid-cols-2 gap-0 border rounded-lg overflow-hidden">
              <div className="flex items-center px-4 py-3 w-full">
                <CoinSelector
                  coins={walletCoins}
                  value={toCoin}
                  onChange={(coin: Coin) => setToCoin(coin)}
                />
              </div>
              <div className="flex items-center justify-end bg-gray-50 px-6 py-3 w-full relative">
                <span className="text-2xl font-bold text-guarda-text-muted">
                  {toAmount}
                </span>
                <span className="ml-2 text-base font-semibold text-guarda-text-muted">
                  {toCoin.symbol}
                </span>
              </div>
            </div>
          </div>

          {/* Exchange rate and network fee */}
          <div className="space-y-1 text-sm text-guarda-text-muted">
            <div className="flex justify-between">
              <span>Exchange rate:</span>
              <span>-</span>
            </div>
            <div className="flex justify-between">
              <span>Network fee:</span>
              <span>-</span>
            </div>
          </div>

          {/* Exchange Button */}
          <Button className="w-full bg-[#7B9DF6] hover:bg-[#5B7ED6] text-white text-lg font-semibold py-4 rounded-lg shadow-none mt-2">
            Exchange
          </Button>

          {/* Hot 24h Section */}
          <div className="mt-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-guarda-yellow-warning">🔥</span>
              <span className="font-medium">Hot 24h</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {hotPairs.map((pair, idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-gray-50 rounded-lg px-4 py-2 min-w-[180px]"
                >
                  {getCoinIcon(pair[0].symbol, pair[0].icon)}
                  <span className="font-medium">{pair[0].symbol}</span>
                  <span className="text-xs text-gray-400 ml-1">
                    {pair[0].network}
                  </span>
                  <span className="mx-2 text-gray-400">→</span>
                  {getCoinIcon(pair[1].symbol, pair[1].icon)}
                  <span className="font-medium">{pair[1].symbol}</span>
                  <span className="text-xs text-gray-400 ml-1">
                    {pair[1].network}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeSection;
