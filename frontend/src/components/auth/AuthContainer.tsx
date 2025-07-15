import React, { useState } from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import EmailVerificationPage from './EmailVerificationPage';
import ResetPasswordPage from './ResetPasswordPage';
import TermsOfService from '../legal/TermsOfService';
import PrivacyPolicy from '../legal/PrivacyPolicy';

type AuthView = 'login' | 'signup' | 'forgot-password' | 'email-verification' | 'reset-password' | 'terms' | 'privacy';

export default function AuthContainer() {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [userEmail, setUserEmail] = useState('');
  const [resetToken, setResetToken] = useState('');

  const handleEmailVerification = async () => {
    // Simulate email resend
    return new Promise<void>((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  const handlePasswordReset = async (password: string) => {
    // Simulate password reset
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCurrentView('login');
        resolve();
      }, 1000);
    });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginPage
            onSwitchToSignup={() => setCurrentView('signup')}
            onSwitchToForgotPassword={() => setCurrentView('forgot-password')}
          />
        );
      case 'signup':
        return (
          <SignupPage
            onSwitchToLogin={() => setCurrentView('login')}
            onShowTerms={() => setCurrentView('terms')}
            onShowPrivacy={() => setCurrentView('privacy')}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordPage
            onSwitchToLogin={() => setCurrentView('login')}
          />
        );
      case 'email-verification':
        return (
          <EmailVerificationPage
            email={userEmail}
            onVerificationComplete={() => setCurrentView('login')}
            onResendEmail={handleEmailVerification}
          />
        );
      case 'reset-password':
        return (
          <ResetPasswordPage
            token={resetToken}
            onPasswordReset={handlePasswordReset}
          />
        );
      case 'terms':
        return (
          <TermsOfService
            onBack={() => setCurrentView('signup')}
          />
        );
      case 'privacy':
        return (
          <PrivacyPolicy
            onBack={() => setCurrentView('signup')}
          />
        );
      default:
        return null;
    }
  };

  return renderCurrentView();
}