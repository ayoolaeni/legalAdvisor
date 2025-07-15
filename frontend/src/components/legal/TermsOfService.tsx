import React from 'react';
import { Scale, ArrowLeft, FileText, Shield, AlertTriangle } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
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
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
                <p className="text-gray-600">Last updated: January 15, 2025</p>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-900 mb-1">Important Legal Notice</h3>
                <p className="text-sm text-amber-800">
                  LegalAdvisor provides general legal information only and does not constitute legal advice. 
                  Always consult with a qualified attorney for specific legal matters.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using LegalAdvise AI ("Service"), you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              LegalAdvisor is an artificial intelligence-powered platform that provides general legal information 
              and guidance. Our service includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>General legal information and explanations</li>
              <li>Document analysis and review assistance</li>
              <li>Legal research support</li>
              <li>Compliance guidance</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Limitations and Disclaimers</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-red-900 mb-2">Not Legal Advice</h3>
              <p className="text-sm text-red-800">
                The information provided by LegalAdvise AI is for general informational purposes only and 
                does not constitute legal advice. We are not a law firm and do not provide legal representation.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">You agree to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Use the service only for lawful purposes</li>
              <li>Provide accurate information when using our services</li>
              <li>Not share your account credentials with others</li>
              <li>Respect intellectual property rights</li>
              <li>Not attempt to reverse engineer or hack our systems</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-6">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
              use, and protect your information. By using our service, you consent to the collection and use 
              of information in accordance with our Privacy Policy.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Subscription and Payment</h2>
            <p className="text-gray-700 mb-4">
              LegalAdvisor offers both free and premium subscription tiers:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Free tier includes basic legal information and limited queries</li>
              <li>Premium subscriptions provide unlimited access and advanced features</li>
              <li>Payments are processed securely through our payment partners</li>
              <li>Subscriptions auto-renew unless cancelled</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              In no event shall LegalAdvisor, its officers, directors, employees, or agents be liable for any 
              indirect, incidental, special, consequential, or punitive damages, including without limitation, 
              loss of profits, data, use, goodwill, or other intangible losses.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Termination</h2>
            <p className="text-gray-700 mb-6">
              We may terminate or suspend your account immediately, without prior notice or liability, for any 
              reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@legaladvisor.com<br />
                <strong>Address:</strong> 123 Legal Street, Law City, LC 12345<br />
                <strong>Phone:</strong> (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}