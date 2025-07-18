import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CoinSelector } from "../ui/CoinSelector";
import { Info, ExternalLink, ChevronDown, Search } from "lucide-react";
import { getCoinIcon } from "../wallet/coins";
import { walletCoins, Coin } from "../wallet/coins";

// Placeholder for the price graph
const CoinPriceGraph: React.FC<{ coin: Coin }> = ({ coin }) => (
  <div className="bg-white rounded-lg p-6 shadow border min-h-[260px] flex flex-col items-center justify-center">
    <div className="text-2xl font-bold mb-2">${"2.973"}</div>
    <div className="text-green-500 text-sm font-semibold mb-1">
      22.94% <span className="text-gray-400 font-normal">Past month</span>
    </div>
    <div className="text-lg font-semibold mb-2">
      {coin.name} ({coin.symbol})
    </div>
    <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
      {/* Replace with real chart */}
      <span>Graph coming soon</span>
    </div>
    <div className="flex space-x-4 mt-4 text-xs text-gray-500">
      <button className="font-bold text-blue-600">1D</button>
      <button>1W</button>
      <button className="font-bold border-b-2 border-blue-600">1M</button>
      <button>6M</button>
      <button>1Y</button>
    </div>
  </div>
);

const ltvOptions = ["50%", "65%", "80%", "90%"];

const LoanSection: React.FC = () => {
  const [collateralCoin, setCollateralCoin] = useState(walletCoins[0]);
  const [collateralAmount, setCollateralAmount] = useState("0");
  const [borrowCoin, setBorrowCoin] = useState(walletCoins[1]);
  const [borrowAmount, setBorrowAmount] = useState("");
  const [ltv, setLtv] = useState(ltvOptions[0]);
  const [search, setSearch] = useState("");

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Loan Form */}
        <div className="bg-white rounded-lg p-6 shadow border">
          <h1 className="text-xl font-bold mb-6">Loan Crypto</h1>
          <div className="space-y-6">
            {/* Collateral amount */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                Collateral amount
              </label>
              <div className="grid grid-cols-2 gap-4">
                <CoinSelector
                  coins={walletCoins}
                  value={collateralCoin}
                  onChange={(coin) =>
                    setCollateralCoin({
                      name: coin.name,
                      symbol: coin.symbol,
                      icon: coin.icon,
                      balance: coin.balance ?? "0",
                      usdBalance: coin.usdBalance ?? "$0.00",
                      color: coin.color ?? "#888",
                      network: coin.network,
                    })
                  }
                  getCoinIcon={getCoinIcon}
                />
                <div className="relative flex items-center">
                  <Input
                    type="number"
                    value={collateralAmount}
                    onChange={(e) => setCollateralAmount(e.target.value)}
                    className="bg-gray-50 border-gray-200 pr-16 h-12 text-xl font-bold text-right focus:ring-0 focus:outline-none"
                    min={0}
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base font-semibold text-gray-400">
                    {collateralCoin.symbol}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span className="cursor-pointer">Min</span>
                <span className="cursor-pointer">All</span>
              </div>
              {collateralAmount === "0" && (
                <div className="text-xs text-red-500 mt-1">
                  The value must be greater than 0
                </div>
              )}
            </div>
            {/* I want to borrow */}
            <div>
              <label className="text-sm text-gray-500 mb-2 block">
                I want to borrow
              </label>
              <div className="grid grid-cols-2 gap-4">
                <CoinSelector
                  coins={walletCoins}
                  value={borrowCoin}
                  onChange={(coin) =>
                    setBorrowCoin({
                      name: coin.name,
                      symbol: coin.symbol,
                      icon: coin.icon,
                      balance: coin.balance ?? "0",
                      usdBalance: coin.usdBalance ?? "$0.00",
                      color: coin.color ?? "#888",
                      network: coin.network,
                    })
                  }
                  getCoinIcon={getCoinIcon}
                />
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    value={borrowAmount}
                    onChange={(e) => setBorrowAmount(e.target.value)}
                    className="bg-gray-50 border-gray-200 pr-16 h-12 text-xl font-bold text-right focus:ring-0 focus:outline-none"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base font-semibold text-gray-400">
                    {borrowCoin.symbol}
                  </span>
                </div>
              </div>
            </div>
            {/* LTV selector */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm">LTV</span>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex space-x-2">
                {ltvOptions.map((option) => (
                  <Button
                    key={option}
                    variant={ltv === option ? "default" : "outline"}
                    size="sm"
                    className={
                      ltv === option
                        ? "bg-blue-100 text-blue-700 border-blue-400"
                        : ""
                    }
                    onClick={() => setLtv(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            {/* Info/error message */}
            <div className="bg-blue-50 text-blue-700 p-3 rounded text-sm">
              The minimum amount for the loan is 30 USDT [TRX], please increase
              your collateral amount.
            </div>
            {/* Network fee info */}
            <div className="text-xs text-gray-400 flex items-center space-x-2">
              <Info className="w-4 h-4" />
              <span>Network fee excluded: ... ≈ ... USD</span>
            </div>
            {/* Get loan button */}
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-white font-semibold rounded-lg"
              disabled={collateralAmount === "0"}
            >
              Get loan
            </Button>
          </div>
        </div>
        {/* Right: Graph and Info */}
        <div className="space-y-6">
          <CoinPriceGraph coin={collateralCoin} />
          <div className="bg-white rounded-lg p-6 shadow border">
            <div className="text-sm font-medium mb-4">
              Use crypto as a collateral asset to receive 50% of it in
              stablecoin.
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-4 h-4 bg-green-400 rounded-full flex-shrink-0 mt-0.5"></div>
                <span>
                  No credit checks. Borrow money without the traditional
                  approval process.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-4 h-4 bg-green-400 rounded-full flex-shrink-0 mt-0.5"></div>
                <span>Top-tier security, Cold wallet storage.</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-4 h-4 bg-green-400 rounded-full flex-shrink-0 mt-0.5"></div>
                <span>
                  Receive 3-level notifications in case of the risk of the
                  collateral liquidation.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-4 h-4 bg-green-400 rounded-full flex-shrink-0 mt-0.5"></div>
                <span>Service is provided by CoinRabbit.</span>
              </div>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="text-blue-500 text-sm flex items-center space-x-1"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Learn more in our Help Center</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Your Loans Table */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-4">Your Loans</h2>
        <div className="flex items-center mb-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by currency name"
              className="pl-10 bg-gray-50 border-gray-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg overflow-hidden border">
          <div className="grid grid-cols-6 gap-4 p-4 border-b text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <div>Loan Amount</div>
            <div>Status</div>
            <div>Date & Time</div>
            <div>Collateral</div>
            <div>Price Down Limit</div>
            <div>APR</div>
          </div>
          <div className="text-center text-gray-400 py-8">Loans not found</div>
        </div>
      </div>
    </div>
  );
};

export default LoanSection;
