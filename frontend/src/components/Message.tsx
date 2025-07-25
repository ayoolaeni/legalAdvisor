import React from 'react';
import { User, Sparkles, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp: string;
}

export default function Message({ content, isUser, timestamp }: MessageProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className={`flex gap-4 mb-8 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
        isUser 
          ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-white' 
          : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
      }`}>
        {isUser ? <User className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </div>
      
      <div className={`max-w-[75%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block px-6 py-4 rounded-2xl shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-br-md'
            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
        }`}>
          <div className="prose prose-sm max-w-none">
            {content.split('\n').map((line, index) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <h4 key={index} className={`font-semibold mb-2 mt-3 first:mt-0 ${
                    isUser ? 'text-white' : 'text-gray-900'
                  }`}>
                    {line.replace(/\*\*/g, '')}
                  </h4>
                );
              }
              if (line.startsWith('• ')) {
                return (
                  <div key={index} className={`flex items-start gap-2 mb-1 ${
                    isUser ? 'text-gray-100' : 'text-gray-700'
                  }`}>
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-xl">{line.substring(2)}</span>
                  </div>
                );
              }
              if (line.startsWith('✨') || line.startsWith('⚖️')) {
                return (
                  <p key={index} className={`text-sm mb-2 ${
                    isUser ? 'text-gray-100' : 'text-gray-700'
                  }`}>
                    {line}
                  </p>
                );
              }
              return line ? (
                <p key={index} className={`text-xl leading-relaxed mb-2 last:mb-0 ${
                  isUser ? 'text-gray-100' : 'text-gray-700'
                }`}>
                  {line}
                </p>
              ) : (
                <br key={index} />
              );
            })}
          </div>
        </div>
        
        <div className={`flex items-center gap-2 mt-2 ${
          isUser ? 'justify-end' : 'justify-start'
        }`}>
          <span className="text-xl text-gray-500">{timestamp}</span>
          {!isUser && (
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded"
                title="Copy message"
              >
                <Copy className="h-3 w-3" />
              </button>
              <button
                className="p-1 text-gray-400 hover:text-green-600 transition-colors rounded"
                title="Helpful"
              >
                <ThumbsUp className="h-3 w-3" />
              </button>
              <button
                className="p-1 text-gray-400 hover:text-red-600 transition-colors rounded"
                title="Not helpful"
              >
                <ThumbsDown className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}