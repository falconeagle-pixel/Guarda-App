import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";
import { ReceivePanel } from "./ReceivePanel";
import { SendForm } from "./SendForm";

interface Coin {
  name: string;
  symbol: string;
  balance: string;
  usdBalance: string;
  color: string;
  icon: string;
  network?: string;
}

interface WalletDetailsProps {
  selectedCoin: Coin;
  walletTab: string;
  setWalletTab: (tab: string) => void;
  sortedCryptoData: Coin[];
  getCoinIcon: (symbol: string) => React.ReactNode;
  theme: string;
  setSelectedCoin: (coin: Coin) => void;
  setActiveTab: (tab: string) => void;
}

export const WalletDetails: React.FC<WalletDetailsProps> = ({
  selectedCoin,
  walletTab,
  setWalletTab,
  sortedCryptoData,
  getCoinIcon,
  theme,
  setSelectedCoin,
  setActiveTab,
}) => {
  // Placeholder: will split out SendForm and ReceivePanel later
  return (
    <div className="lg:col-span-2 space-y-6">
      <Tabs value={walletTab} onValueChange={setWalletTab} className="w-full">
        <TabsList className="inline-flex border-b border-gray-200 bg-transparent p-0 gap-8">
          <TabsTrigger
            value="receive"
            className="text-left px-4 py-2 text-base font-normal bg-transparent border-none shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 data-[state=inactive]:text-gray-500 data-[state=inactive]:bg-transparent"
          >
            Receive
          </TabsTrigger>
          <TabsTrigger
            value="send"
            className="text-left px-4 py-2 text-base font-normal bg-transparent border-none shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 data-[state=inactive]:text-gray-500 data-[state=inactive]:bg-transparent"
          >
            Send
          </TabsTrigger>
        </TabsList>
        {/* TODO: Move ReceivePanel and SendForm to their own components */}
        <TabsContent value="receive">
          <ReceivePanel
            selectedCoin={selectedCoin}
            setWalletTab={setWalletTab}
            setActiveTab={setActiveTab}
          />
        </TabsContent>
        <TabsContent value="send">
          <SendForm
            selectedCoin={selectedCoin}
            sortedCryptoData={sortedCryptoData}
            getCoinIcon={getCoinIcon}
            setSelectedCoin={setSelectedCoin}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
