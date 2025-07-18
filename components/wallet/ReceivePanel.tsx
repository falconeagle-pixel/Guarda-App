import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Coin {
  name: string;
  symbol: string;
  balance: string;
  usdBalance: string;
  color: string;
  icon: string;
  network?: string;
}

interface ReceivePanelProps {
  selectedCoin: Coin;
  setWalletTab: (tab: string) => void;
  setActiveTab: (tab: string) => void;
}

export const ReceivePanel: React.FC<ReceivePanelProps> = ({
  selectedCoin,
  setWalletTab,
  setActiveTab,
}) => (
  <>
    <div className="bg-guarda-card rounded-lg p-6">
      <h2 className="text-lg font-medium text-blue-600 mb-4">
        {selectedCoin.name}
      </h2>
      {/* QR code, balance, address, etc. */}
      <div className="flex flex-col md:flex-row md:space-x-8 items-start">
        <div className="mb-4 md:mb-0">
          {/* Placeholder for QR code */}
          <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded">
            <span className="text-gray-400">QR</span>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <span className="font-medium">Balance</span>
            <div className="flex items-center space-x-2">
              <span className="font-bold">
                {selectedCoin.balance} {selectedCoin.symbol}
              </span>
            </div>
            <div className="text-sm text-gray-400">
              {selectedCoin.usdBalance}
            </div>
          </div>
          <div>
            <span className="font-medium">Wallet address:</span>
            <span className="ml-2 font-mono">
              1AU8GY1YeTx7Bh9FkU2obqPgF3f4Dhdjdx
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <Button variant="outline" onClick={() => setWalletTab("send")}>
          Send
        </Button>
        <Button
          className="bg-guarda-blue hover:bg-guarda-blue-hover"
          onClick={() => setActiveTab("exchange")}
        >
          Exchange
        </Button>
        <Button
          className="bg-guarda-blue hover:bg-guarda-blue-hover"
          onClick={() => setActiveTab("buy-sell")}
        >
          Buy
        </Button>
      </div>
    </div>
    <div className="bg-guarda-card rounded-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-guarda-blue-light">
          Wallet transactions
        </h3>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-guarda-text-muted">Type:</span>
          <span className="text-sm">All</span>
        </div>
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search by hash, address"
            className="bg-guarda-input border-guarda-input-border"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 border-2 border-dashed border-guarda-border rounded-lg flex items-center justify-center mb-4">
          <div className="w-8 h-8 border-2 border-guarda-blue rounded-full flex items-center justify-center">
            <ArrowUpDown className="w-4 h-4 text-guarda-blue" />
          </div>
        </div>
        <p className="text-guarda-text-muted text-center mb-4">
          Top up your wallet or{" "}
          <button className="text-guarda-blue-light underline">
            share your public address
          </button>
          <br />
          with somebody to get coins or tokens.
        </p>
        <div className="flex flex-col items-center w-full space-y-2">
          <Button className="bg-guarda-blue hover:bg-guarda-blue-hover w-40">
            Buy crypto
          </Button>
          <Button variant="outline" className="w-40">
            Load transactions
          </Button>
        </div>
      </div>
    </div>
  </>
);
