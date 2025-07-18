
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload, Shield, Eye, EyeOff, QrCode } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface RestoreWalletFlowProps {
  onBack: () => void;
}

export const RestoreWalletFlow = ({ onBack }: RestoreWalletFlowProps) => {
  const [backupPassword, setBackupPassword] = useState("");
  const [showBackupPassword, setShowBackupPassword] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const navigate = useNavigate();

  // Handlers for each flow
  const handleRestore = () => {
    if (backupPassword) {
      navigate("/wallet");
    }
  };
  const handleAddWallet = () => {
    if (privateKey && selectedCurrency) {
      navigate("/wallet");
    }
  };
  const handleImportMnemonic = () => {
    if (mnemonic) {
      navigate("/wallet");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[600px] p-8 bg-background">
      <div className="max-w-2xl w-full">
        <Tabs defaultValue="backup" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-wallet-card mb-8">
            <TabsTrigger value="backup" className="data-[state=active]:bg-blue-600">
              Restore from Guarda Backup
            </TabsTrigger>
            <TabsTrigger value="currency" className="data-[state=active]:bg-blue-600">
              Import by Currency
            </TabsTrigger>
            <TabsTrigger value="mnemonic" className="data-[state=active]:bg-blue-600">
              Import Mnemonic
            </TabsTrigger>
          </TabsList>

          <TabsContent value="backup">
            <div className="bg-wallet-card rounded-lg p-8">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">Restore</h2>
              <p className="text-gray-300 mb-8">
                You will be able to restore your wallet by using a backup if you are a user of
                Guarda Wallet.
              </p>

              <div className="mb-6">
                <div className="w-full border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-gray-500 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center space-y-4">
                    <Upload className="w-12 h-12 text-blue-500" />
                    <div>
                      <p className="text-gray-300 mb-2">Drag and drop file or</p>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Browse
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mb-8">
                <Input
                  type={showBackupPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={backupPassword}
                  onChange={(e) => setBackupPassword(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowBackupPassword(!showBackupPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showBackupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <label className="block text-sm text-gray-400 mb-2">Backup password</label>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleRestore} disabled={!backupPassword}>
                Restore
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="currency">
            <div className="bg-wallet-card rounded-lg p-8">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">Import your funds</h2>
              <p className="text-gray-300 mb-8">
                You can import the private keys from external wallets. This will allow
                you to receive, send, purchase and exchange crypto. Your private
                keys are held encrypted on this browser local storage, not by a
                company.
              </p>

              <div className="space-y-6">
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                    <SelectItem value="ltc">Litecoin (LTC)</SelectItem>
                    <SelectItem value="xrp">Ripple (XRP)</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Input
                    placeholder="Private Key, Mnemonic, WIF or XPRV"
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-24"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button className="text-blue-400 hover:text-blue-300 text-sm">Paste</button>
                    <QrCode className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                    <button
                      type="button"
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                      className="text-gray-400 hover:text-white"
                    >
                      {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-400">
                  <Shield className="w-4 h-4 mr-1 text-blue-500" />
                  <span>Secure encryption</span>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAddWallet} disabled={!privateKey || !selectedCurrency}>
                  Add wallet
                </Button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-blue-400 mb-4">Wallets</h3>
                <div className="text-center py-8 text-gray-400">
                  No wallets have been added
                </div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-gray-400 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8" onClick={handleAddWallet} disabled={!privateKey || !selectedCurrency}>
                  Import
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mnemonic">
            <div className="bg-wallet-card rounded-lg p-8">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">
                Import Using Mnemonic Phrase
              </h2>
              <p className="text-gray-300 mb-8">
                You can restore your crypto wallet using your mnemonic phrase.
                This enables you to manage, send, purchase, and swap your
                cryptocurrency seamlessly. Your mnemonic phrase remains
                encrypted in browser's local storage and is not held by any third-
                party organization.
              </p>

              <div className="space-y-6">
                <div className="relative">
                  <Input
                    placeholder="Mnemonic"
                    value={mnemonic}
                    onChange={(e) => setMnemonic(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-24"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button className="text-blue-400 hover:text-blue-300 text-sm">Paste</button>
                    <QrCode className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                    <Eye className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-400">
                  <Shield className="w-4 h-4 mr-1 text-blue-500" />
                  <span>Secure encryption</span>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleImportMnemonic} disabled={!mnemonic}>
                  Add wallets by mnemonic
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
