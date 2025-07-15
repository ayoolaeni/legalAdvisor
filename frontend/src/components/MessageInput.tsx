import React, { useState } from 'react';
import { Send, Paperclip, Mic, Smile } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickPrompts = [
    "Help me review a contract",
    "What are my rights as a tenant?",
    "Employment law question",
    "Business compliance help"
  ];

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Quick Prompts */}
        {message === '' && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-3">Quick prompts:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(prompt)}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex items-end gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                title="Attach file"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                title="Voice input"
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your legal question in detail..."
                disabled={disabled}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed max-h-32 min-h-[52px] transition-all"
                rows={1}
              />
              <button
                type="button"
                className="absolute right-3 top-3 p-1 text-gray-400 hover:text-gray-600 transition-colors rounded"
                title="Add emoji"
              >
                <Smile className="h-4 w-4" />
              </button>
            </div>
            
            <button
              type="submit"
              disabled={!message.trim() || disabled}
              className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}