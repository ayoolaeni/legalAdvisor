import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import { AlertTriangle, Sparkles, Zap } from 'lucide-react';
import { ChatMessage } from '../types';
import { fetchChatResponse } from '../api/chat'; // ⬅️ import the new API helper


export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm LegalAdvisor, your intelligent legal assistant powered by advanced AI. I'm here to provide comprehensive legal guidance and support.\n\n✨ **What I can help with:**\n• Contract analysis and review\n• Legal research and precedents\n• Compliance questions\n• Document drafting assistance\n• General legal advice\n\n⚖️ **Important:** I provide general legal information and cannot replace professional legal counsel. For specific legal matters, please consult with a licensed attorney.\n\nHow can I assist you with your legal questions today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 const handleSendMessage = async (content: string) => {
  const userMessage: ChatMessage = {
    id: Date.now().toString(),
    content,
    isUser: true,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  setMessages(prev => [...prev, userMessage]);
  setIsTyping(true);

  const aiContent = await fetchChatResponse(content);

  const botResponse: ChatMessage = {
    id: (Date.now() + 1).toString(),
    content: aiContent,
    isUser: false,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  setMessages(prev => [...prev, botResponse]);
  setIsTyping(false);
};


  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-white">
      {/* Enhanced Disclaimer Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2 bg-amber-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-amber-900 mb-1">Legal Disclaimer</h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                This AI provides general legal information only. It does not constitute legal advice and cannot replace consultation with a qualified attorney. Always consult with a licensed lawyer for specific legal matters.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {messages.length === 1 && (
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                AI-Powered Legal Assistant
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">How can I help you today?</h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Ask me about contracts, compliance, legal research, or any other legal questions you may have.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <Message
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {isTyping && (
            <div className="flex gap-4 mb-8">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg">
                <Zap className="h-5 w-5" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-6 py-4 shadow-sm max-w-xs">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span>AI is thinking...</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Enhanced Input Area */}
      <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
}