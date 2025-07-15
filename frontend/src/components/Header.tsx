import React from 'react';
import { Scale, MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Scale className="h-8 w-8 text-yellow-400" />
            <h1 className="text-2xl font-bold">LegalAdvisor</h1>
          </div>
          <MessageCircle className="h-6 w-6 text-blue-300 ml-auto" />
        </div>
        <p className="text-blue-100 text-sm mt-2">
          Professional legal guidance at your fingertips
        </p>
      </div>
    </header>
  );
}