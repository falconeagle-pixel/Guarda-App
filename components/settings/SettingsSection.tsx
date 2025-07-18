import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Lock,
  Book,
  Star,
  File,
  Key,
  User,
  Eye,
  EyeOff,
  Home,
  CreditCard,
  Clock,
} from "lucide-react";

const settingsMenu = [
  {
    section: "BACKUP",
    items: [
      {
        key: "download",
        label: "Download backup",
        icon: <File className="w-5 h-5" />,
      },
      { key: "restore", label: "Restore", icon: <File className="w-5 h-5" /> },
    ],
  },
  {
    section: "SECURITY",
    items: [
      {
        key: "changePassword",
        label: "Change password",
        icon: <Lock className="w-5 h-5" />,
      },
      {
        key: "addressBook",
        label: "Address Book",
        icon: <Book className="w-5 h-5" />,
      },
      {
        key: "askPassword",
        label: "Ask password on transaction",
        icon: <Key className="w-5 h-5" />,
      },
      {
        key: "sessionTimeout",
        label: "Set session timeout to 15 mins",
        icon: <Lock className="w-5 h-5" />,
      },
    ],
  },
  {
    section: "OTHER",
    items: [
      { key: "rateUs", label: "Rate Us", icon: <Star className="w-5 h-5" /> },
    ],
  },
];

const backupInfo = {
  lastUpdate: "15 Jul 2025, 01:36 pm",
  wallets: 11,
  size: "10.65 KB",
};

const SettingsSection: React.FC = () => {
  const [activeKey, setActiveKey] = useState("download");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [restoreTab, setRestoreTab] = useState("file");
  const [addressBook, setAddressBook] = useState([]);
  const [rating, setRating] = useState(0);
  const [askPassword, setAskPassword] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(false);

  // Render left sidebar
  const renderSidebar = () => (
    <div className="w-80 bg-white rounded-l-lg border-r p-6 flex flex-col min-h-[600px]">
      <h2 className="text-lg font-semibold mb-6">Settings</h2>
      {settingsMenu.map((section) => (
        <div key={section.section} className="mb-6">
          <div className="text-xs text-gray-400 font-bold mb-2 uppercase tracking-wider">
            {section.section}
          </div>
          <div className="space-y-1">
            {section.items.map((item) => {
              if (item.key === "askPassword") {
                return (
                  <div
                    key={item.key}
                    className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50"
                  >
                    <button
                      className="flex items-center space-x-3 text-left focus:outline-none"
                      onClick={() => setActiveKey(item.key)}
                    >
                      <span className="relative flex items-center">
                        <CreditCard className="w-5 h-5 mr-1" />
                        <Lock className="w-3 h-3 absolute left-3 top-2.5 text-gray-500" />
                      </span>
                      <span className="ml-2 text-sm text-gray-700">
                        Ask password on transaction
                      </span>
                    </button>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={askPassword}
                        onChange={() => setAskPassword((v) => !v)}
                      />
                      <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
                      <div className="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-all peer-checked:translate-x-4"></div>
                    </label>
                  </div>
                );
              }
              if (item.key === "sessionTimeout") {
                return (
                  <div
                    key={item.key}
                    className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50"
                  >
                    <button
                      className="flex items-center space-x-3 text-left focus:outline-none"
                      onClick={() => setActiveKey(item.key)}
                    >
                      <span className="relative flex items-center">
                        <Lock className="w-5 h-5 mr-1" />
                        <Clock className="w-3 h-3 absolute left-3 top-2.5 text-gray-500" />
                      </span>
                      <span className="ml-2 text-sm text-gray-700">
                        Set session timeout to 15 mins
                      </span>
                    </button>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={sessionTimeout}
                        onChange={() => setSessionTimeout((v) => !v)}
                      />
                      <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
                      <div className="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-all peer-checked:translate-x-4"></div>
                    </label>
                  </div>
                );
              }
              // Default button for other items
              return (
                <button
                  key={item.key}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeKey === item.key
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                  onClick={() => setActiveKey(item.key)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  // Render right content
  const renderContent = () => {
    switch (activeKey) {
      case "download":
        return (
          <div className="flex flex-col items-center justify-center w-full p-12">
            <h2 className="text-xl font-bold mb-2">Guarda Wallet Backup</h2>
            <div className="text-sm text-gray-500 text-center mb-4 max-w-xl">
              The backup contains all your private keys that give you access to
              your money.
              <br />
              <span className="text-orange-500 font-bold">
                ⚠️⚠️⚠️ Guarda cannot restore your backup. Keep it safe and
                secure.
              </span>
            </div>
            <div className="flex space-x-4 mb-8">
              <Button variant="outline">Copy mnemonic</Button>
              <Button variant="outline">Copy backup text</Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Download backup file
              </Button>
            </div>
            <div className="border-dashed border-2 border-gray-200 rounded-lg p-8 flex items-center space-x-8 bg-gray-50">
              <div className="flex items-center justify-center w-24 h-24 bg-white rounded-full border shadow">
                <File className="w-12 h-12 text-blue-400" />
                <span className="absolute bottom-2 right-2 bg-green-400 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                  <svg width="20" height="20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="#34D399" />
                    <path
                      d="M6 10.5l2.5 2.5L14 8"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <div className="text-left space-y-2">
                <div>
                  <span className="text-gray-500">Last Update:</span>{" "}
                  <span className="font-semibold">{backupInfo.lastUpdate}</span>
                </div>
                <div>
                  <span className="text-gray-500">Wallets:</span>{" "}
                  <span className="font-semibold">{backupInfo.wallets}</span>
                </div>
                <div>
                  <span className="text-gray-500">Backup size:</span>{" "}
                  <span className="font-semibold">{backupInfo.size}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "restore":
        return (
          <div className="flex flex-col items-center justify-center w-full p-12">
            <h2 className="text-xl font-bold mb-2">
              Restore with Guarda backup
            </h2>
            <div className="text-sm text-gray-500 text-center mb-4 max-w-xl">
              Upload Guarda backup file or text to restore your wallets.
              <br />
              <span className="text-gray-400">
                They will be merged to your current backup.
              </span>
            </div>
            <div className="flex space-x-4 mb-8">
              <Button
                variant={restoreTab === "file" ? "default" : "outline"}
                onClick={() => setRestoreTab("file")}
              >
                Browse
              </Button>
              <Button
                variant={restoreTab === "text" ? "default" : "outline"}
                onClick={() => setRestoreTab("text")}
              >
                Enter backup text
              </Button>
            </div>
            <div className="border-dashed border-2 border-gray-200 rounded-lg p-8 flex flex-col items-center bg-gray-50 w-full max-w-md mb-6">
              <File className="w-16 h-16 text-blue-400 mb-4" />
              {restoreTab === "file" ? (
                <>
                  <div className="mb-2 text-gray-500">
                    Drag and drop file or
                  </div>
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    Browse
                  </Button>
                </>
              ) : (
                <Input placeholder="Paste backup text here" className="mb-2" />
              )}
            </div>
            <div className="w-full max-w-md mb-6">
              <label className="block text-gray-500 mb-1">
                Backup password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-400"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full max-w-md">
              Restore
            </Button>
          </div>
        );
      case "changePassword":
        return (
          <div className="flex flex-col items-center justify-center w-full p-12">
            <h2 className="text-xl font-bold mb-2">Change Password</h2>
            <div className="text-sm text-gray-500 text-center mb-4 max-w-xl">
              You will only change the password on this device. Don't forget to
              do the same on your other devices with Guarda app.
            </div>
            <div className="w-full max-w-md space-y-4">
              <Input type="password" placeholder="Enter old password" />
              <Input type="password" placeholder="Enter new password" />
              <Input type="password" placeholder="Repeat new password" />
              <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full">
                Change password
              </Button>
            </div>
          </div>
        );
      case "addressBook":
        return (
          <div className="flex flex-col items-center justify-center w-full p-12">
            <h2 className="text-xl font-bold mb-2">Address Book</h2>
            <div className="text-sm text-gray-500 text-center mb-4 max-w-xl">
              Name and organize frequently used wallet addresses for
              convenience.
              <br />
              All saved addresses can be securely imported and exported via a
              separate backup file.
            </div>
            <div className="flex space-x-4 mb-8">
              <Button variant="outline">Import</Button>
              <Button variant="outline">Export</Button>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Add first address
            </Button>
          </div>
        );
      case "askPassword":
        return (
          <div className="flex flex-col items-center justify-center w-full p-12">
            <h2 className="text-xl font-bold mb-2">
              Ask password on transaction
            </h2>
            <div className="text-sm text-gray-500 text-center mb-4 max-w-xl">
              Turn on password protection for outgoing transactions.
            </div>
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-lg">Enable protection</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={() => setShowPasswordModal(true)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
              </label>
            </div>
            {showPasswordModal && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-sm relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400"
                    onClick={() => setShowPasswordModal(false)}
                  >
                    &times;
                  </button>
                  <h3 className="text-lg font-semibold mb-2">
                    Enter password to confirm changes
                  </h3>
                  <div className="text-gray-500 mb-4">
                    Turn on password protection for outgoing transactions
                  </div>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    className="mb-4"
                  />
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full">
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      case "sessionTimeout":
        return (
          <div className="flex flex-col items-center justify-center w-full p-12">
            <h2 className="text-xl font-bold mb-2">
              Set session timeout to 15 mins
            </h2>
            <div className="text-sm text-gray-500 text-center mb-4 max-w-xl">
              Enable or disable session timeout for extra security.
            </div>
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-lg">Enable timeout</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>
        );
      case "rateUs":
        return (
          <div className="flex flex-col items-center justify-center w-full p-12">
            <h2 className="text-xl font-bold mb-2">Rate Us</h2>
            <div className="text-sm text-gray-500 text-center mb-4 max-w-xl">
              You can make Guarda Wallet better.
              <br />
              Please rate us on{" "}
              <span className="font-semibold text-blue-600">Trustpilot</span>.
            </div>
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 flex items-center justify-center mb-2">
                <Star className="w-24 h-24 text-blue-400" />
              </div>
              <div className="text-lg font-semibold text-yellow-500 mb-1">
                ★★★★★
              </div>
              <div className="text-gray-500 mb-2">
                Over <span className="font-bold">500</span> reviews
              </div>
              <div className="flex space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button key={i} onClick={() => setRating(i)}>
                    {i <= rating ? (
                      <Star
                        className="w-6 h-6 text-yellow-400"
                        fill="#FBBF24"
                      />
                    ) : (
                      <Star className="w-6 h-6 text-gray-300" />
                    )}
                  </button>
                ))}
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Rate Us
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex bg-white rounded-lg shadow border overflow-hidden">
      {renderSidebar()}
      <div className="flex-1 min-h-[600px]">{renderContent()}</div>
    </div>
  );
};

export default SettingsSection;
