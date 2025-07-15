import React from 'react';
import { 
  MessageSquare, 
  History, 
  User, 
  Settings, 
  Scale,
  Plus,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ currentPage, onPageChange, isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'chat', label: 'New Chat', icon: Plus },
    { id: 'history', label: 'Chat History', icon: History },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Scale className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">LegalAdvisor</h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onPageChange(item.id);
                        onClose();
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                        ${isActive 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-900 mb-1">Need Legal Help?</p>
              <p className="text-xs text-gray-600 mb-3">Connect with qualified Lawyer in your area</p>
             <a
                href="https://www.nigerianbar.org.ng/find-a-lawyer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Find Lawyer
                </button>
              </a>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors"
            >
              <LogOut className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}