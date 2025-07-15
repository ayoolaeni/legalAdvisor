import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, Clock, Trash2, Star, Filter } from 'lucide-react';
import { ChatSession } from '../types';

export default function ChatHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch real chat history from backend
  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/history', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to fetch chat history');

      const data = await response.json();

      const mapped: ChatSession[] = data.map((chat: any) => ({
        id: chat._id,
        title: chat.message.length > 50 ? chat.message.slice(0, 50) + '...' : chat.message,
        messages: [],
        lastMessage: chat.response,
        timestamp: chat.timestamp,
      }));

      setChatSessions(mapped);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      setChatSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDeleteChat = async (sessionId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/history/${sessionId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setChatSessions(prev => prev.filter(session => session.id !== sessionId));
        setShowDeleteModal(null);
      } else {
        console.error('Failed to delete chat');
      }
    } catch (err) {
      console.error('Error deleting chat:', err);
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const filteredSessions = chatSessions.filter(session =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinueChat = (sessionId: string) => {
    console.log('Continue chat:', sessionId);
    alert(`Continuing chat: ${chatSessions.find(s => s.id === sessionId)?.title}`);
  };

  const handleStarChat = (sessionId: string) => {
    console.log('Star chat:', sessionId);
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chat History</h1>
          <p className="text-gray-600">Review your previous legal consultations and conversations</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Conversations</option>
                <option value="recent">Recent</option>
                <option value="starred">Starred</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading and Chat Sessions */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading chat history...</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => handleContinueChat(session.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {session.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{session.lastMessage}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(session.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStarChat(session.id);
                        }}
                        className="p-2 text-gray-400 hover:text-yellow-500 transition-colors rounded-lg hover:bg-gray-100"
                        title="Star conversation"
                      >
                        <Star className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteModal(session.id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-100"
                        title="Delete conversation"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredSessions.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations found</h3>
                <p className="text-gray-600">Try adjusting your search terms or start a new conversation</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Conversation</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete "
              {chatSessions.find(s => s.id === showDeleteModal)?.title}"? This will permanently
              remove the conversation and all its messages.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteChat(showDeleteModal)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
