
import { useState } from "react";
import { Home, HelpCircle, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { CreateWalletFlow } from "@/components/CreateWalletFlow";
import { RestoreWalletFlow } from "@/components/RestoreWalletFlow";

type Screen = 'welcome' | 'create' | 'restore';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen 
            onCreateWallet={() => setCurrentScreen('create')}
            onRestoreWallet={() => setCurrentScreen('restore')}
          />
        );
      case 'create':
        return <CreateWalletFlow onBack={() => setCurrentScreen('welcome')} />;
      case 'restore':
        return <RestoreWalletFlow onBack={() => setCurrentScreen('welcome')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-white">
      {/* Header */}
      <header className="w-full" style={{ backgroundColor: '#303132' }}>
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between px-8 py-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <img src="/images/logo.svg" alt="Guarda Logo" className="w-8 h-8" />
            </div>
            <nav className="flex space-x-8">
              <button 
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  currentScreen === 'create' 
                    ? 'border-blue-500 text-white' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
                onClick={() => setCurrentScreen('create')}
              >
                CREATE WALLET
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  currentScreen === 'restore' 
                    ? 'border-blue-500 text-white' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
                onClick={() => setCurrentScreen('restore')}
              >
                RESTORE OR IMPORT
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <HelpCircle className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <Sun className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <div className="flex items-center space-x-2 text-gray-400 hover:text-white cursor-pointer">
              <Home className="w-4 h-4" />
              <span className="text-sm">Back to Guarda.com</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center w-full">
        <div className="w-full flex items-center justify-center">
          <div className="max-w-2xl w-full">
            {renderScreen()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-wallet-header border-t border-gray-800">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-6">
          <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400 justify-center md:justify-start">
            <a href="#" className="hover:text-white flex items-center space-x-1">
              <Home className="w-4 h-4" />
              <span>Back to Guarda.com</span>
            </a>
            <a href="#" className="hover:text-white">Support</a>
            <a href="#" className="hover:text-white">Coin Status</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
              <img src="/images/google-play-badge.png" alt="Get it on Google Play" className="h-8" />
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img src="/images/app-store-badge.png" alt="Download on the App Store" className="h-8" />
            </a>
            <img src="/visa.svg" alt="Visa" className="h-6 ml-4" />
            <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-4">
          © 2017-2025 Guarda. All rights reserved
        </div>
      </footer>
      {/* Cookie Bar */}
      <div className="w-full bg-[hsl(var(--cookie-bar))] py-6 px-4 flex items-center justify-center rounded-b-lg">
        <span className="text-gray-300 text-sm mr-4">
          Our website uses cookies to improve your experience. By continuing you agree to our{' '}
          <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>.
        </span>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1 text-sm">
          Ok
        </Button>
      </div>
    </div>
  );
};

export default Index;
