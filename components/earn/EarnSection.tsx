import React from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, Info, Search } from "lucide-react";
import { getCoinIcon } from "../wallet/coins";

const earnData = [
  {
    name: "TRON",
    symbol: "TRX",
    lockPeriod: "14 days",
    apy: "up to 3.9%",
    minAmount: "0.3 USD\n1 TRX",
    icon: "https://cryptologos.cc/logos/tron-trx-logo.png",
    color: "#000000",
    stake: true,
  },
  {
    name: "Cosmos",
    symbol: "ATOM",
    lockPeriod: "21 days",
    apy: "up to 5%",
    minAmount: "No min amount",
    icon: "https://cryptologos.cc/logos/cosmos-atom-logo.png",
    color: "#2E3148",
  },
  {
    name: "Tezos",
    symbol: "XTZ",
    lockPeriod: "No lock-up",
    apy: "up to 5.5%",
    minAmount: "No min amount",
    icon: "https://cryptologos.cc/logos/tezos-xtz-logo.png",
    color: "#2C7DF7",
  },
  {
    name: "Harmony",
    symbol: "ONE",
    lockPeriod: "~ 1,5 days",
    apy: "up to 8.3%",
    minAmount: "1.24 USD\n100 ONE",
    icon: "https://cryptologos.cc/logos/harmony-one-logo.png",
    color: "#00AEE9",
  },
  {
    name: "Ontology",
    symbol: "ONT",
    lockPeriod: "~ 7 days",
    apy: "up to 24.9%",
    minAmount: "0.15 USD\n1 ONT",
    icon: "https://cryptologos.cc/logos/ontology-ont-logo.png",
    color: "#32A4BE",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    lockPeriod: "No lock-up (possible to exchange GETH back to ETH)",
    apy: "up to 2.5%",
    minAmount: "328.69 USD\n0.1 ETH",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    color: "#627EEA",
  },
  {
    name: "Cardano Shelley",
    symbol: "ADA",
    lockPeriod: "No lock-up",
    apy: "up to 2.5%",
    minAmount: "0 USD\nADA",
    icon: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    color: "#0033AD",
  },
  {
    name: "Zilliqa",
    symbol: "ZIL",
    lockPeriod: "No lock-up",
    apy: "up to 11.4%",
    minAmount: "0.13 USD\n10 ZIL",
    icon: "https://cryptologos.cc/logos/zilliqa-zil-logo.png",
    color: "#49C1BF",
    stake: true,
  },
  {
    name: "NOW Token",
    symbol: "NOW",
    lockPeriod: "7 days",
    apy: "up to 25%",
    minAmount: "0 USD\n10 NOW",
    icon: "https://cryptologos.cc/logos/changenow-now-logo.png",
    color: "#00D4AA",
  },
  {
    name: "Komodo",
    symbol: "KMD",
    lockPeriod: "No lock-up",
    apy: "up to 5.1%",
    minAmount: "0.32 USD\n10 KMD",
    icon: "https://cryptologos.cc/logos/komodo-kmd-logo.png",
    color: "#326464",
  },
  {
    name: "Callisto",
    symbol: "CLO",
    lockPeriod: "1 month",
    apy: "up to 7%",
    minAmount: "No min amount",
    icon: "https://cryptologos.cc/logos/callisto-clo-logo.png",
    color: "#00D100",
  },
  {
    name: "Qtum",
    symbol: "QTUM",
    lockPeriod: "18 hours",
    apy: "up to 6.79%",
    minAmount: "No min amount",
    icon: "https://cryptologos.cc/logos/qtum-qtum-logo.png",
    color: "#2E9AD0",
  },
];

const EarnSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium">Start to Earn</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-guarda-text-muted" />
          <Input
            placeholder="Search"
            className="pl-10 bg-guarda-input border-guarda-input-border w-64"
          />
        </div>
      </div>
      <div className="bg-white rounded-lg overflow-hidden shadow border">
        <div className="grid grid-cols-4 gap-4 p-4 border-b text-sm text-gray-500 font-medium">
          <div className="flex items-center space-x-1">
            <span>CRYPTO</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="text-center">LOCK-UP PERIOD</div>
          <div className="flex items-center justify-center space-x-1">
            <span>APY</span>
            <Info className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-end space-x-1">
            <span>MIN AMOUNT</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        <div className="divide-y">
          {earnData.map((item, idx) => (
            <div
              key={item.symbol}
              className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50"
            >
              {/* Crypto */}
              <div className="flex items-center space-x-3">
                {getCoinIcon(item.symbol, item.icon, item.color)}
                <div>
                  <div className="font-medium text-gray-900 flex items-center">
                    {item.name}
                    <span className="ml-2 text-xs text-gray-400 font-bold tracking-widest">
                      {item.symbol}
                    </span>
                  </div>
                </div>
              </div>
              {/* Lock-up Period */}
              <div className="text-center text-sm text-gray-700">
                {item.lockPeriod}
              </div>
              {/* APY */}
              <div className="text-center text-sm font-semibold text-gray-900">
                {item.apy}
              </div>
              {/* Min Amount + Buy to Stake */}
              <div className="flex flex-col items-end">
                {item.minAmount.split("\n").map((line, i) => (
                  <div
                    key={i}
                    className={
                      i === 0
                        ? "text-sm font-medium text-gray-900"
                        : "text-xs text-gray-400"
                    }
                  >
                    {line}
                  </div>
                ))}
                {item.stake && (
                  <button className="mt-2 px-3 py-1 border border-blue-500 text-blue-600 rounded hover:bg-blue-50 text-xs font-semibold">
                    Buy to Stake
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarnSection;
