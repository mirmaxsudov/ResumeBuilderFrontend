import { Settings, Bell, Shield, HelpCircle } from "lucide-react";
import { Button } from "@/components/dashboard/ui/button";

export default function OtherPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Other</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Settings className="text-gray-500 mr-3" size={24} />
            <h2 className="text-lg font-medium">Account Settings</h2>
          </div>
          <p className="text-gray-500 mb-4">
            Manage your account preferences and settings
          </p>
          <Button variant="outline">Manage Settings</Button>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Bell className="text-gray-500 mr-3" size={24} />
            <h2 className="text-lg font-medium">Notifications</h2>
          </div>
          <p className="text-gray-500 mb-4">
            Configure your notification preferences
          </p>
          <Button variant="outline">Manage Notifications</Button>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="text-gray-500 mr-3" size={24} />
            <h2 className="text-lg font-medium">Privacy</h2>
          </div>
          <p className="text-gray-500 mb-4">
            Manage your privacy settings and data
          </p>
          <Button variant="outline">Privacy Settings</Button>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <HelpCircle className="text-gray-500 mr-3" size={24} />
            <h2 className="text-lg font-medium">Help & Support</h2>
          </div>
          <p className="text-gray-500 mb-4">Get help with using resume.io</p>
          <Button variant="outline">Get Help</Button>
        </div>
      </div>
    </>
  );
}
