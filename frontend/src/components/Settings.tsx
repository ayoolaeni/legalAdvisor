import React, { useState } from 'react';
import { 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Download, 
  Trash2,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Eye,
  EyeOff
} from 'lucide-react';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);
  const [language, setLanguage] = useState('en');

  const settingSections = [
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          label: 'Dark Mode',
          description: 'Switch between light and dark themes',
          type: 'toggle',
          value: darkMode,
          onChange: setDarkMode,
          icon: darkMode ? Moon : Sun
        },
        {
          label: 'Language',
          description: 'Choose your preferred language',
          type: 'select',
          value: language,
          onChange: setLanguage,
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' },
            { value: 'fr', label: 'Français' },
            { value: 'de', label: 'Deutsch' }
          ],
          icon: Globe
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          label: 'Push Notifications',
          description: 'Receive notifications about important updates',
          type: 'toggle',
          value: notifications,
          onChange: setNotifications,
          icon: Bell
        },
        {
          label: 'Sound Effects',
          description: 'Play sounds for message notifications',
          type: 'toggle',
          value: soundEnabled,
          onChange: setSoundEnabled,
          icon: soundEnabled ? Volume2 : VolumeX
        }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      settings: [
        {
          label: 'Data Collection',
          description: 'Allow anonymous usage data collection to improve service',
          type: 'toggle',
          value: dataCollection,
          onChange: setDataCollection,
          icon: dataCollection ? Eye : EyeOff
        }
      ]
    }
  ];

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your LegalAdvisor experience</p>
        </div>

        <div className="space-y-6">
          {settingSections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <div key={section.title} className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <SectionIcon className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {section.settings.map((setting, index) => {
                    const SettingIcon = setting.icon;
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <SettingIcon className="h-5 w-5 text-gray-500 mt-1" />
                          <div>
                            <h3 className="font-medium text-gray-900">{setting.label}</h3>
                            <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {setting.type === 'toggle' && (
                            <button
                              onClick={() => setting.onChange(!setting.value)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                setting.value ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  setting.value ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          )}
                          {setting.type === 'select' && (
                            <select
                              value={setting.value}
                              onChange={(e) => setting.onChange(e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              {setting.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Data Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Data Management</h2>
            </div>
            <div className="p-6 space-y-4">
              <button className="flex items-center gap-3 w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Export Data</h3>
                  <p className="text-sm text-gray-600">Download all your conversation history</p>
                </div>
              </button>
              <button className="flex items-center gap-3 w-full p-4 text-left border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600">
                <Trash2 className="h-5 w-5" />
                <div>
                  <h3 className="font-medium">Delete Account</h3>
                  <p className="text-sm text-red-500">Permanently delete your account and all data</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}