import React, { useEffect, useState } from 'react';
import { User, Mail, Calendar, MessageSquare, Crown, Shield, Award } from 'lucide-react';
import { UserProfile } from '../types';

export default function Profile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5200/api/profile', {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setUserProfile(data);
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getSubscriptionBadge = (subscription: string) => {
    switch (subscription) {
      case 'premium':
        return { icon: Crown, color: 'text-yellow-600 bg-yellow-50 border-yellow-200', label: 'Premium' };
      case 'enterprise':
        return { icon: Shield, color: 'text-purple-600 bg-purple-50 border-purple-200', label: 'Enterprise' };
      default:
        return { icon: User, color: 'text-gray-600 bg-gray-50 border-gray-200', label: 'Free' };
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-red-500">Failed to load profile</p>
      </div>
    );
  }

  const subscriptionBadge = getSubscriptionBadge(userProfile.subscription);
  const BadgeIcon = subscriptionBadge.icon;

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}</h2>
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${subscriptionBadge.color}`}>
                      <BadgeIcon className="h-4 w-4" />
                      {subscriptionBadge.label}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{userProfile.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Member since{' '}
                        {new Date(userProfile.joinDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessageSquare className="h-4 w-4" />
                      <span>{userProfile.totalChats} conversations</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Stats and Achievements (unchanged) */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Conversations</span>
                  <span className="font-semibold text-gray-900">{userProfile.totalChats}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold text-gray-900">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Average Rating</span>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">4.8</span>
                    <div className="flex text-yellow-400">{'★'.repeat(5)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Award className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Legal Explorer</p>
                    <p className="text-sm text-gray-600">Asked 25+ questions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Award className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Active User</p>
                    <p className="text-sm text-gray-600">Used for 6+ months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
