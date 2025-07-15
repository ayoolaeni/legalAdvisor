import React from 'react';
import { Shield, ArrowLeft, Lock, Eye, Database, UserCheck } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
                <p className="text-gray-600">Last updated: January 15, 2025</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-900 mb-1">Your Privacy Matters</h3>
                <p className="text-sm text-green-800">
                  We are committed to protecting your privacy and ensuring the security of your personal information. 
                  This policy explains how we collect, use, and safeguard your data.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              1. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">We collect information you provide directly to us, such as:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, password</li>
              <li><strong>Profile Data:</strong> Professional information, preferences</li>
              <li><strong>Communication Data:</strong> Messages, chat history, support requests</li>
              <li><strong>Usage Information:</strong> How you interact with our service</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Personalize your experience and provide relevant content</li>
              <li>Monitor and analyze trends, usage, and activities</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-900 mb-2">We Do Not Sell Your Data</h3>
              <p className="text-sm text-blue-800">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                for marketing purposes.
              </p>
            </div>
            <p className="text-gray-700 mb-4">We may share your information only in these limited circumstances:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With service providers who assist our operations</li>
              <li>In connection with a business transfer or merger</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-4">We implement appropriate security measures to protect your information:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and assessments</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Retention</h2>
            <p className="text-gray-700 mb-6">
              We retain your personal information for as long as necessary to provide our services and fulfill 
              the purposes outlined in this policy. When you delete your account, we will delete or anonymize 
              your personal information within 30 days, except where we are required to retain it by law.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-blue-600" />
              6. Your Rights and Choices
            </h2>
            <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your data</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Analyze how our service is used</li>
              <li>Provide personalized content</li>
              <li>Improve our service performance</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>
            <p className="text-gray-700 mb-6">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your information in accordance 
              with this privacy policy.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 mb-6">
              Our service is not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If we become aware that we have collected personal 
              information from a child under 13, we will take steps to delete such information.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this privacy policy from time to time. We will notify you of any changes by 
              posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@legaladvisor.com<br />
                <strong>Address:</strong> 123 Legal Street, Law City, LC 12345<br />
                <strong>Phone:</strong> (555) 123-4567<br />
                <strong>Data Protection Officer:</strong> dpo@legaladviseai.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}