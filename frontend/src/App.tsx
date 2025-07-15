import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthContainer from './components/auth/AuthContainer';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import ChatHistory from './components/ChatHistory';
import Profile from './components/Profile';
import Settings from './components/Settings';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  // Show auth pages if user is not authenticated
  if (!user) {
    return <AuthContainer />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'chat':
        return <ChatInterface />;
      case 'history':
        return <ChatHistory />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {currentPage === 'chat' && 'Legal Assistant'}
              {currentPage === 'history' && 'Chat History'}
              {currentPage === 'profile' && 'Profile'}
              {currentPage === 'settings' && 'Settings'}
            </h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 min-h-0">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;