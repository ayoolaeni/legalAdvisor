import React, { useState, useEffect } from 'react';
import { Scale, Mail, CheckCircle, RefreshCw, ArrowRight } from 'lucide-react';

interface EmailVerificationPageProps {
  email: string;
  onVerificationComplete: () => void;
  onResendEmail: () => Promise<void>;
}

export default function EmailVerificationPage({ 
  email, 
  onVerificationComplete, 
  onResendEmail 
}: EmailVerificationPageProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      await onResendEmail();
      setResendCooldown(60); // 60 second cooldown
    } catch (error) {
      console.error('Failed to resend email:', error);
    } finally {
      setIsResending(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }

      // Auto-verify when all fields are filled
      if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
        setTimeout(() => {
          onVerificationComplete();
        }, 500);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LegalAdvisor</h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verify your email</h2>
          <p className="text-gray-600">
            We've sent a 6-digit code to{' '}
            <span className="font-medium text-gray-900">{email}</span>
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Enter verification code
            </label>
            <div className="flex gap-3 justify-center">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  maxLength={1}
                />
              ))}
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Didn't receive the code?
            </p>
            
            <button
              onClick={handleResendEmail}
              disabled={isResending || resendCooldown > 0}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              {resendCooldown > 0 
                ? `Resend in ${resendCooldown}s` 
                : isResending 
                  ? 'Sending...' 
                  : 'Resend code'
              }
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onVerificationComplete}
              disabled={verificationCode.some(digit => digit === '')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center gap-2 group"
            >
              Verify Email
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}