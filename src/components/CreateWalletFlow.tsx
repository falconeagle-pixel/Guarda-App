
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Shield, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CreateWalletFlowProps {
  onBack: () => void;
}

export const CreateWalletFlow = ({ onBack }: CreateWalletFlowProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleComplete = () => {
    if (password && password === confirmPassword) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[600px] p-8 bg-background">
      <div className="max-w-lg w-full">
        <div className="bg-wallet-card rounded-lg p-8">
          <h1 className="text-2xl font-semibold text-blue-400 mb-4">
            Protect your wallet with a password
          </h1>
          
          <p className="text-gray-300 mb-8">
            The password you enter encrypts your private key and gives access to
            your funds. Please store your password in a safe place. We don't keep
            your information and can't restore it.
          </p>

          <div className="space-y-6">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <div className="flex items-center mt-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 mr-1 text-blue-500" />
                <span>Secure encryption</span>
              </div>
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
            
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              disabled={!password || password !== confirmPassword}
              onClick={handleComplete}
            >
              I've written it down
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
