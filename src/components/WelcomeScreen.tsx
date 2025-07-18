
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onCreateWallet: () => void;
  onRestoreWallet: () => void;
}

export const WelcomeScreen = ({ onCreateWallet, onRestoreWallet }: WelcomeScreenProps) => {
  return (
    <div className="flex items-center justify-center min-h-[600px] p-8 bg-background">
      <div className="max-w-lg w-full">
        {/* Welcome and Actions Section */}
        <div className="bg-[#303132] rounded-lg p-8 text-center">
          <h1 className="text-2xl font-semibold text-blue-400 mb-6">
            Hello! Welcome to Guarda Wallet
          </h1>
          <div className="space-y-4 text-gray-300 mb-8 text-left">
            <p>
              This wallet makes it easy to access your crypto and interact with
              blockchain. Guarda does not have access to your funds.
            </p>
            <p>
              Restore your existing Guarda Wallet, import private key from any other one
              to create a new Wallet right now!
            </p>
          </div>
          <div className="space-y-4">
            <Button 
              onClick={onCreateWallet}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            >
              Create a new wallet
            </Button>
            <button 
              onClick={onRestoreWallet}
              className="w-full text-blue-400 hover:text-blue-300 py-2 text-sm"
            >
              Restore or Import
            </button>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="bg-[#111111] rounded-lg p-6 mt-0">
          <ul className="space-y-2 text-gray-400 text-sm text-left">
            <li>• What exactly is Guarda Wallet?</li>
            <li>• How to import another wallet here?</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
