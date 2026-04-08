'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/usable/navbar';
import Footer from '../components/usable/footer';
import API from '../../lib/api';

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09A7.02 7.02 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l4.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const googleButtonRefs = useRef({});
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  const [mode, setMode] = useState('signin');
  const [signInStep, setSignInStep] = useState('credentials');
  const [signUpStep, setSignUpStep] = useState('details');
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInOtp, setSignInOtp] = useState('');
  const [resetPasswordOtp, setResetPasswordOtp] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [authMethod, setAuthMethod] = useState(null);
  const [signInErrors, setSignInErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);

  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpOtp, setSignUpOtp] = useState('');
  const [signUpErrors, setSignUpErrors] = useState({});
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedRedirect = sessionStorage.getItem('redirectAfterLogin');
    if (storedRedirect) {
      setRedirectAfterLogin(storedRedirect);
    }
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone.replace(/\D/g, ''));
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (password.length > 15) errors.push('Maximum 15 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('One number');
    if (!/[!@#$%^&*]/.test(password)) errors.push('One special character (!@#$%^&*)');
    return errors;
  };
  const validateOtp = (otp) => /^\d{6}$/.test(otp);
  const handleEnterAction = (event, action) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      action();
    }
  };

  const getErrorMessage = (error, fallback) =>
    error?.response?.data?.message || error?.response?.data?.error || fallback;

  const saveAuthData = (data, shouldRemember = rememberMe) => {
    if (typeof window === 'undefined') return;

    const token =
      data?.token ||
      data?.accessToken ||
      data?.data?.token ||
      data?.data?.accessToken;
    const user =
      data?.user ||
      data?.data?.user ||
      data?.result?.user ||
      null;

    if (token) {
      localStorage.setItem('token', token);
      if (shouldRemember) localStorage.setItem('rememberMe', 'true');
      else localStorage.removeItem('rememberMe');
    }

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  const redirectUser = (user) => {
    const destination =
      redirectAfterLogin ||
      (user?.isAdmin || user?.role === 'admin' ? '/admin' : '/user');

    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('redirectAfterLogin');
    }

    router.push(destination);
  };

  const handleGoogleCredentialResponse = async (googleResponse) => {
    try {
      if (!googleResponse?.credential) {
        setSignInErrors({ api: 'Google sign-in did not return a valid credential.' });
        return;
      }

      setGoogleLoading(true);
      setSignInErrors({});

      const response = await API.post('/users/google-login', {
        credential: googleResponse.credential,
      });

      saveAuthData(response.data, true);
      setSignInSuccess(true);

      const user =
        response?.data?.user ||
        response?.data?.data?.user ||
        response?.data?.result?.user ||
        null;

      setTimeout(() => redirectUser(user), 800);
    } catch (error) {
      setSignInErrors({ api: getErrorMessage(error, 'Google sign-in failed. Please try again.') });
    } finally {
      setGoogleLoading(false);
    }
  };

  useEffect(() => {
    if (!googleScriptLoaded || !googleClientId) return;
    if (typeof window === 'undefined' || !window.google?.accounts?.id) return;

    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleGoogleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    ['signin-mobile', 'signin-web', 'signup-mobile', 'signup-web'].forEach((key) => {
      const node = googleButtonRefs.current[key];
      if (!node) return;

      node.innerHTML = '';
      window.google.accounts.id.renderButton(node, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        shape: 'rectangular',
        text: 'continue_with',
        logo_alignment: 'left',
        width: node.offsetWidth || 320,
      });
    });
  }, [googleClientId, googleScriptLoaded]);

  const handleSignInNext = async () => {
    const errors = {};

    if (!signInEmail.trim()) {
      errors.email = 'Email or mobile number required';
    } else if (!validateEmail(signInEmail) && !validatePhone(signInEmail)) {
      errors.email = 'Enter valid email or 10-digit mobile number';
    }

    if (Object.keys(errors).length > 0) {
      setSignInErrors(errors);
      return;
    }

    try {
      setSignInLoading(true);
      setSignInErrors({});
      const response = await API.post('/users/check-user', { identifier: signInEmail });

      if (!response?.data?.exists) {
        setSignInErrors({ email: 'User not found. Please sign up first.' });
        return;
      }

      if (!response?.data?.isEmailVerified) {
        setSignInErrors({ email: 'Please verify your email first before signing in.' });
        return;
      }

      setSignInStep('authmethod');
    } catch (error) {
      setSignInErrors({ api: getErrorMessage(error, 'Unable to verify user.') });
    } finally {
      setSignInLoading(false);
    }
  };

  const handleAuthMethodSelect = async (method) => {
    setAuthMethod(method);
    setSignInErrors({});

    if (method === 'password') {
      setSignInStep('password');
      return;
    }

    try {
      setSignInLoading(true);
      await API.post('/users/send-login-otp', { identifier: signInEmail });
      setSignInStep('otp');
    } catch (error) {
      setSignInErrors({ api: getErrorMessage(error, 'Unable to send OTP. Please try again.') });
    } finally {
      setSignInLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    const errors = {};

    if (!signInPassword.trim()) {
      errors.password = 'Password required';
    } else {
      const passwordErrors = validatePassword(signInPassword);
      if (passwordErrors.length > 0) {
        errors.password = `Password must have: ${passwordErrors.join(', ')}`;
      }
    }

    if (Object.keys(errors).length > 0) {
      setSignInErrors(errors);
      return;
    }

    try {
      setSignInLoading(true);
      setSignInErrors({});

      const response = await API.post('/users/login', {
        identifier: signInEmail,
        password: signInPassword,
      });

      saveAuthData(response.data);
      setSignInSuccess(true);

      const user =
        response?.data?.user ||
        response?.data?.data?.user ||
        response?.data?.result?.user ||
        null;

      setTimeout(() => redirectUser(user), 1000);
    } catch (error) {
      setSignInErrors({ api: getErrorMessage(error, 'Login failed. Please check your credentials.') });
    } finally {
      setSignInLoading(false);
    }
  };

  const handleSignInOtpSubmit = async () => {
    const errors = {};

    if (!signInOtp.trim()) {
      errors.otp = 'OTP required';
    } else if (!validateOtp(signInOtp)) {
      errors.otp = 'OTP must be 6 digits';
    }

    if (Object.keys(errors).length > 0) {
      setSignInErrors(errors);
      return;
    }

    try {
      setSignInLoading(true);
      setSignInErrors({});

      const response = await API.post('/users/verify-login-otp', {
        identifier: signInEmail,
        otp: signInOtp,
      });

      saveAuthData(response.data);
      setSignInSuccess(true);

      const user =
        response?.data?.user ||
        response?.data?.data?.user ||
        response?.data?.result?.user ||
        null;

      setTimeout(() => redirectUser(user), 1000);
    } catch (error) {
      setSignInErrors({ api: getErrorMessage(error, 'OTP verification failed.') });
    } finally {
      setSignInLoading(false);
    }
  };

  const resetSignIn = () => {
    setSignInEmail('');
    setSignInPassword('');
    setSignInOtp('');
    setResetPasswordOtp('');
    setResetNewPassword('');
    setResetConfirmPassword('');
    setRememberMe(false);
    setAuthMethod(null);
    setSignInStep('credentials');
    setSignInSuccess(false);
    setSignInErrors({});
    setSignInLoading(false);
    setShowPassword(false);
    setShowResetPassword(false);
    setShowResetConfirmPassword(false);
  };

  const handleForgotPassword = async () => {
    if (!signInEmail.trim()) {
      setSignInErrors({ email: 'Enter email or mobile number first' });
      return;
    }

    try {
      setSignInLoading(true);
      setSignInErrors({});
      await API.post('/users/send-reset-password-otp', { identifier: signInEmail });
      setSignInStep('forgot-otp');
    } catch (error) {
      setSignInErrors({ api: getErrorMessage(error, 'Unable to send password reset OTP.') });
    } finally {
      setSignInLoading(false);
    }
  };

  const handleVerifyResetOtp = async () => {
    const errors = {};

    if (!resetPasswordOtp.trim()) {
      errors.otp = 'OTP required';
    } else if (!validateOtp(resetPasswordOtp)) {
      errors.otp = 'OTP must be 6 digits';
    }

    if (Object.keys(errors).length > 0) {
      setSignInErrors(errors);
      return;
    }

    try {
      setSignInLoading(true);
      setSignInErrors({});
      await API.post('/users/verify-reset-password-otp', {
        identifier: signInEmail,
        otp: resetPasswordOtp,
      });
      setSignInStep('forgot-reset');
    } catch (error) {
      setSignInErrors({ api: getErrorMessage(error, 'OTP verification failed.') });
    } finally {
      setSignInLoading(false);
    }
  };

  const handleResetPasswordSubmit = async () => {
    const errors = {};
    const passwordErrors = validatePassword(resetNewPassword);

    if (!resetNewPassword.trim()) {
      errors.password = 'New password required';
    } else if (passwordErrors.length > 0) {
      errors.password = `Password must have: ${passwordErrors.join(', ')}`;
    }

    if (!resetConfirmPassword.trim()) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (resetConfirmPassword !== resetNewPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setSignInErrors(errors);
      return;
    }

    try {
      setSignInLoading(true);
      setSignInErrors({});
      await API.post('/users/reset-password', {
        identifier: signInEmail,
        otp: resetPasswordOtp,
        newPassword: resetNewPassword,
      });
      setSignInErrors({ api: 'Password reset successful. Please sign in with your new password.' });
      setSignInPassword('');
      setResetPasswordOtp('');
      setResetNewPassword('');
      setResetConfirmPassword('');
      setSignInStep('password');
      setAuthMethod('password');
    } catch (error) {
      setSignInErrors({ api: getErrorMessage(error, 'Unable to reset password.') });
    } finally {
      setSignInLoading(false);
    }
  };

  const handleSignUpDetailsSubmit = async () => {
    const errors = {};

    if (!signUpName.trim()) {
      errors.name = 'Name required';
    }

    if (!signUpEmail.trim()) {
      errors.email = 'Email required';
    } else if (!validateEmail(signUpEmail)) {
      errors.email = 'Enter valid email';
    }

    if (!signUpPhone.trim()) {
      errors.phone = 'Mobile number required';
    } else if (!validatePhone(signUpPhone)) {
      errors.phone = 'Enter valid 10-digit mobile number';
    }

    if (!signUpPassword.trim()) {
      errors.password = 'Password required';
    } else {
      const passwordErrors = validatePassword(signUpPassword);
      if (passwordErrors.length > 0) {
        errors.password = `Password must have: ${passwordErrors.join(', ')}`;
      }
    }

    if (Object.keys(errors).length > 0) {
      setSignUpErrors(errors);
      return;
    }

    try {
      setSignUpLoading(true);
      setSignUpErrors({});

      const response = await API.post('/users/register', {
        name: signUpName,
        email: signUpEmail,
        mobile: signUpPhone,
        password: signUpPassword,
      });

      if (response?.data?.email) {
        setSignUpEmail(response.data.email);
      }

      setSignUpStep('otp');
    } catch (error) {
      setSignUpErrors({ api: getErrorMessage(error, 'Unable to create account.') });
    } finally {
      setSignUpLoading(false);
    }
  };

  const handleSignUpOtpSubmit = async () => {
    const errors = {};

    if (!signUpOtp.trim()) {
      errors.otp = 'OTP required';
    } else if (!validateOtp(signUpOtp)) {
      errors.otp = 'OTP must be 6 digits';
    }

    if (Object.keys(errors).length > 0) {
      setSignUpErrors(errors);
      return;
    }

    try {
      setSignUpLoading(true);
      setSignUpErrors({});

      const response = await API.post('/users/verify-signup-otp', {
        email: signUpEmail,
        otp: signUpOtp,
      });

      saveAuthData(response.data, true);
      setSignUpSuccess(true);

      const user =
        response?.data?.user ||
        response?.data?.data?.user ||
        response?.data?.result?.user ||
        null;

      setTimeout(() => redirectUser(user), 1000);
    } catch (error) {
      setSignUpErrors({ api: getErrorMessage(error, 'OTP verification failed.') });
    } finally {
      setSignUpLoading(false);
    }
  };

  const handleResendSignupOtp = async () => {
    try {
      setSignUpLoading(true);
      setSignUpErrors({});
      await API.post('/users/resend-signup-otp', { email: signUpEmail });
      setSignUpErrors({ api: 'OTP resent successfully. Please check your email.' });
    } catch (error) {
      setSignUpErrors({ api: getErrorMessage(error, 'Unable to resend OTP.') });
    } finally {
      setSignUpLoading(false);
    }
  };

  const resetSignUp = () => {
    setSignUpName('');
    setSignUpEmail('');
    setSignUpPhone('');
    setSignUpPassword('');
    setSignUpOtp('');
    setSignUpStep('details');
    setSignUpSuccess(false);
    setSignUpErrors({});
    setSignUpLoading(false);
  };

  const GoogleButton = ({ buttonKey }) => (
    <div className="space-y-2">
      <div className="relative">
        <button
          type="button"
          disabled={!googleClientId || googleLoading}
          className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all text-sm flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <GoogleIcon />
          {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
        </button>
        <div
          ref={(node) => {
            googleButtonRefs.current[buttonKey] = node;
          }}
          className="absolute inset-0 overflow-hidden rounded-lg opacity-0"
          aria-hidden="true"
        />
      </div>
      {!googleClientId && (
        <p className="text-xs text-amber-600">
          Add <code>NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> to enable Google sign-in.
        </p>
      )}
    </div>
  );

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setGoogleScriptLoaded(true)}
      />
      <Navbar />

      <div className="flex flex-col min-h-[calc(100vh-80px)]">
        <div className="lg:hidden flex-1 relative pb-20 pt-16">
          <div className="absolute inset-0 top-0 h-64 bg-linear-to-b from-green-300 via-emerald-200 to-white opacity-80"></div>

          <div className="relative z-10 px-4 py-12 flex flex-col items-center">
            <div className="mb-6 text-center w-full">
              <img
                src="/Spiruboost_Logo.png"
                alt="Spiruboost Logo"
                className="h-16 w-auto mx-auto mb-2"
              />
              <p className="text-gray-600 text-sm font-medium">Enter into the world of wellness</p>
            </div>

            <div
              className={`w-full transition-all duration-300 ${
                mode === 'signup' ? 'max-w-lg' : 'max-w-sm'
              } bg-white rounded-3xl shadow-lg p-6 sm:p-8 mx-auto`}
            >
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                {mode === 'signin' ? 'Login to Spiruboost' : 'Join Spiruboost'}
              </h2>

              {mode === 'signin' && (
                <div className="flex gap-4 mb-8">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      resetSignIn();
                    }}
                    className="flex-1 py-2 font-semibold text-sm transition-all text-green-700 border-b-2 border-green-600"
                  >
                    Sign In
                  </button>
                </div>
              )}

              {mode === 'signin' && (
                <div className="space-y-4">
                  {signInErrors.api && <p className="text-red-500 text-sm">{signInErrors.api}</p>}

                  {signInStep === 'credentials' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
                        <input
                          type="text"
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          onKeyDown={(e) => handleEnterAction(e, handleSignInNext)}
                          placeholder="your@email.com"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                        />
                        {signInErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{signInErrors.email}</p>
                        )}
                      </div>

                      <button
                        onClick={handleSignInNext}
                        disabled={signInLoading}
                        className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm mt-4 disabled:opacity-50"
                      >
                        {signInLoading ? 'Please wait...' : 'Continue'}
                      </button>

                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or</span>
                        </div>
                      </div>

                      <GoogleButton buttonKey="signin-mobile" />
                    </>
                  )}

                  {signInStep === 'authmethod' && (
                    <>
                      <p className="text-sm text-gray-600 text-center mb-4">Choose authentication method</p>
                      <button
                        onClick={() => handleAuthMethodSelect('password')}
                        disabled={signInLoading}
                        className="w-full border-2 border-green-600 text-green-600 font-semibold py-2.5 rounded-lg hover:bg-green-50 transition-all text-sm disabled:opacity-50"
                      >
                        Use Password
                      </button>
                      <button
                        onClick={() => handleAuthMethodSelect('otp')}
                        disabled={signInLoading}
                        className="w-full border-2 border-green-600 text-green-600 font-semibold py-2.5 rounded-lg hover:bg-green-50 transition-all text-sm disabled:opacity-50"
                      >
                        {signInLoading ? 'Sending OTP...' : 'Use OTP'}
                      </button>
                      <button
                        onClick={() => setSignInStep('credentials')}
                        className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
                      >
                        Back
                      </button>
                    </>
                  )}

                  {signInStep === 'password' && (
                    <>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700">Password</label>
                          <button
                            onClick={handleForgotPassword}
                            disabled={signInLoading}
                            className="text-xs text-green-600 hover:text-green-700 font-semibold disabled:opacity-50"
                          >
                            Forgot?
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={signInPassword}
                            onChange={(e) => setSignInPassword(e.target.value)}
                            onKeyDown={(e) => handleEnterAction(e, handlePasswordSubmit)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {signInErrors.password && (
                          <p className="text-red-500 text-xs mt-1">{signInErrors.password}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="remember-mobile"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 accent-green-600 rounded"
                        />
                        <label htmlFor="remember-mobile" className="text-sm text-gray-700">Remember me</label>
                      </div>

                      <button
                        onClick={handlePasswordSubmit}
                        disabled={signInSuccess || signInLoading}
                        className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50 mt-4"
                      >
                        {signInLoading ? 'Please wait...' : signInSuccess ? '✓ Welcome!' : 'Log In'}
                      </button>

                      <button
                        onClick={() => setSignInStep('authmethod')}
                        className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
                      >
                        Back
                      </button>
                    </>
                  )}

                  {signInStep === 'forgot-otp' && (
                    <>
                      <div className="bg-green-50 border border-green-300 rounded-lg p-3 mb-4">
                        <p className="text-sm text-green-800">
                          6-digit password reset OTP sent to your registered email
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Reset OTP</label>
                        <input
                          type="text"
                          value={resetPasswordOtp}
                          onChange={(e) => setResetPasswordOtp(e.target.value.slice(0, 6))}
                          onKeyDown={(e) => handleEnterAction(e, handleVerifyResetOtp)}
                          placeholder="000000"
                          maxLength="6"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-center text-lg tracking-widest"
                        />
                        {signInErrors.otp && (
                          <p className="text-red-500 text-xs mt-1">{signInErrors.otp}</p>
                        )}
                      </div>

                      <button
                        onClick={handleVerifyResetOtp}
                        disabled={signInLoading}
                        className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50 mt-4"
                      >
                        {signInLoading ? 'Verifying...' : 'Verify OTP'}
                      </button>

                      <button
                        onClick={() => setSignInStep('password')}
                        className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
                      >
                        Back
                      </button>
                    </>
                  )}

                  {signInStep === 'forgot-reset' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">New Password</label>
                        <div className="relative">
                          <input
                            type={showResetPassword ? 'text' : 'password'}
                            value={resetNewPassword}
                            onChange={(e) => setResetNewPassword(e.target.value)}
                            onKeyDown={(e) => handleEnterAction(e, handleResetPasswordSubmit)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowResetPassword(!showResetPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showResetPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {signInErrors.password && (
                          <p className="text-red-500 text-xs mt-1">{signInErrors.password}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Confirm Password</label>
                        <div className="relative">
                          <input
                            type={showResetConfirmPassword ? 'text' : 'password'}
                            value={resetConfirmPassword}
                            onChange={(e) => setResetConfirmPassword(e.target.value)}
                            onKeyDown={(e) => handleEnterAction(e, handleResetPasswordSubmit)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowResetConfirmPassword(!showResetConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showResetConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {signInErrors.confirmPassword && (
                          <p className="text-red-500 text-xs mt-1">{signInErrors.confirmPassword}</p>
                        )}
                      </div>

                      <button
                        onClick={handleResetPasswordSubmit}
                        disabled={signInLoading}
                        className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50 mt-4"
                      >
                        {signInLoading ? 'Resetting...' : 'Reset Password'}
                      </button>

                      <button
                        onClick={() => setSignInStep('forgot-otp')}
                        className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
                      >
                        Back
                      </button>
                    </>
                  )}

                  {signInStep === 'otp' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">OTP Verification</label>
                        <input
                          type="text"
                          value={signInOtp}
                          onChange={(e) => setSignInOtp(e.target.value.slice(0, 6))}
                          onKeyDown={(e) => handleEnterAction(e, handleSignInOtpSubmit)}
                          placeholder="000000"
                          maxLength="6"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-center text-lg tracking-widest"
                        />
                        <p className="text-gray-500 text-xs mt-2 text-center">6-digit code sent to your email</p>
                        {signInErrors.otp && (
                          <p className="text-red-500 text-xs mt-1">{signInErrors.otp}</p>
                        )}
                      </div>

                      <button
                        onClick={handleSignInOtpSubmit}
                        disabled={signInSuccess || signInLoading}
                        className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50 mt-4"
                      >
                        {signInLoading ? 'Verifying...' : signInSuccess ? '✓ Verified!' : 'Verify'}
                      </button>

                      <button
                        onClick={() => setSignInStep('authmethod')}
                        className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
                      >
                        Back
                      </button>
                    </>
                  )}

                  <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <button
                      onClick={() => {
                        setMode('signup');
                        resetSignUp();
                      }}
                      className="text-green-600 font-semibold hover:text-green-700"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              )}

              {mode === 'signup' && (
                <div className="space-y-4">
                  {signUpErrors.api && <p className="text-red-500 text-sm">{signUpErrors.api}</p>}

                  {signUpStep === 'details' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Full Name</label>
                        <input
                          type="text"
                          value={signUpName}
                          onChange={(e) => setSignUpName(e.target.value)}
                          onKeyDown={(e) => handleEnterAction(e, handleSignUpDetailsSubmit)}
                          placeholder="Your name"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                        />
                        {signUpErrors.name && (
                          <p className="text-red-500 text-xs mt-1">{signUpErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
                        <input
                          type="email"
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          onKeyDown={(e) => handleEnterAction(e, handleSignUpDetailsSubmit)}
                          placeholder="your@email.com"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                        />
                        {signUpErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{signUpErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Mobile Number</label>
                        <input
                          type="tel"
                          value={signUpPhone}
                          onChange={(e) => setSignUpPhone(e.target.value)}
                          onKeyDown={(e) => handleEnterAction(e, handleSignUpDetailsSubmit)}
                          placeholder="9876543210"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                        />
                        {signUpErrors.phone && (
                          <p className="text-red-500 text-xs mt-1">{signUpErrors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Password</label>
                        <div className="relative">
                          <input
                            type={showSignUpPassword ? 'text' : 'password'}
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            onKeyDown={(e) => handleEnterAction(e, handleSignUpDetailsSubmit)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {signUpPassword && (
                          <div className="mt-1">
                            {validatePassword(signUpPassword).length > 0 ? (
                              <p className="text-orange-500 text-xs">
                                Password needs: {validatePassword(signUpPassword).join(', ')}
                              </p>
                            ) : (
                              <p className="text-green-500 text-xs">✓ Strong password</p>
                            )}
                          </div>
                        )}
                        {signUpErrors.password && (
                          <p className="text-red-500 text-xs mt-1">{signUpErrors.password}</p>
                        )}
                      </div>

                      <button
                        onClick={handleSignUpDetailsSubmit}
                        disabled={signUpLoading}
                        className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm mt-4 disabled:opacity-50"
                      >
                        {signUpLoading ? 'Please wait...' : 'Continue to Verification'}
                      </button>

                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or</span>
                        </div>
                      </div>

                      <GoogleButton buttonKey="signup-mobile" />

                      <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{' '}
                        <button
                          onClick={() => {
                            setMode('signin');
                            resetSignIn();
                          }}
                          className="text-green-600 font-semibold hover:text-green-700"
                        >
                          Sign In
                        </button>
                      </p>
                    </>
                  )}

                  {signUpStep === 'otp' && (
                    <>
                      <div className="bg-green-50 border border-green-300 rounded-lg p-3 mb-4">
                        <p className="text-sm text-green-800">
                          6-digit OTP sent to your email
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Verify OTP</label>
                        <input
                          type="text"
                          value={signUpOtp}
                          onChange={(e) => setSignUpOtp(e.target.value.slice(0, 6))}
                          onKeyDown={(e) => handleEnterAction(e, handleSignUpOtpSubmit)}
                          placeholder="000000"
                          maxLength="6"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-center text-lg tracking-widest"
                        />
                        {signUpErrors.otp && (
                          <p className="text-red-500 text-xs mt-1">{signUpErrors.otp}</p>
                        )}
                      </div>

                      <button
                        onClick={handleSignUpOtpSubmit}
                        disabled={signUpSuccess || signUpLoading}
                        className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50 mt-4"
                      >
                        {signUpLoading ? 'Verifying...' : signUpSuccess ? '✓ Welcome!' : 'Complete Sign Up'}
                      </button>

                      <button
                        type="button"
                        onClick={handleResendSignupOtp}
                        disabled={signUpLoading}
                        className="w-full text-green-600 font-medium py-2 text-sm hover:text-green-700 disabled:opacity-50"
                      >
                        Resend OTP
                      </button>

                      <button
                        onClick={() => setSignUpStep('details')}
                        className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
                      >
                        Back
                      </button>

                      <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{' '}
                        <button
                          onClick={() => {
                            setMode('signin');
                            resetSignIn();
                          }}
                          className="text-green-600 font-semibold hover:text-green-700"
                        >
                          Sign In
                        </button>
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className="hidden lg:flex flex-1 relative bg-cover bg-center items-center justify-center px-8 py-24 mt-8"
          style={{
            backgroundImage: 'url(/login_hero.png)',
            backgroundAttachment: 'fixed',
            minHeight: 'calc(100vh - 80px)',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div
            className={`relative z-10 w-full transition-all duration-300 bg-white rounded-2xl shadow-2xl p-8 md:p-12 ${
              mode === 'signup' ? 'max-w-xl' : 'max-w-md'
            }`}
          >
            <div className="mb-8 text-center">
              <img
                src="/Spiruboost_Logo.png"
                alt="Spiruboost Logo"
                className="h-16 w-auto mx-auto mb-3"
              />
              <p className="text-gray-600 text-sm font-medium">Enter into the world of wellness</p>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 transition-all duration-300">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>

            {mode === 'signin' && (
              <div className="flex gap-4 mb-8 border-b border-gray-300">
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    resetSignIn();
                  }}
                  className="flex-1 py-3 font-semibold text-sm transition-all border-b-2 text-green-700 border-green-600"
                >
                  Sign In
                </button>
              </div>
            )}

            {mode === 'signin' && (
              <div className="space-y-5">
                {signInErrors.api && <p className="text-red-500 text-sm">{signInErrors.api}</p>}

                {signInStep === 'credentials' && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
                      <input
                        type="text"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        onKeyDown={(e) => handleEnterAction(e, handleSignInNext)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                      />
                      {signInErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{signInErrors.email}</p>
                      )}
                    </div>

                    <button
                      onClick={handleSignInNext}
                      disabled={signInLoading}
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50"
                    >
                      {signInLoading ? 'Please wait...' : 'Continue'}
                    </button>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                      </div>
                    </div>

                    <GoogleButton buttonKey="signin-web" />
                  </>
                )}

                {signInStep === 'authmethod' && (
                  <>
                    <p className="text-sm text-gray-600 text-center mb-4">Choose authentication method</p>
                    <button
                      onClick={() => handleAuthMethodSelect('password')}
                      disabled={signInLoading}
                      className="w-full border-2 border-green-600 text-green-600 font-semibold py-3 rounded-lg hover:bg-green-50 transition-all text-sm disabled:opacity-50"
                    >
                      Use Password
                    </button>
                    <button
                      onClick={() => handleAuthMethodSelect('otp')}
                      disabled={signInLoading}
                      className="w-full border-2 border-green-600 text-green-600 font-semibold py-3 rounded-lg hover:bg-green-50 transition-all text-sm disabled:opacity-50"
                    >
                      {signInLoading ? 'Sending OTP...' : 'Use OTP'}
                    </button>
                    <button
                      onClick={() => setSignInStep('credentials')}
                      className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
                    >
                      Back
                    </button>
                  </>
                )}

                {signInStep === 'password' && (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <button
                          onClick={handleForgotPassword}
                          disabled={signInLoading}
                          className="text-xs text-green-600 hover:text-green-700 font-semibold disabled:opacity-50"
                        >
                          Forgot?
                        </button>
                      </div>
                      <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={signInPassword}
                            onChange={(e) => setSignInPassword(e.target.value)}
                            onKeyDown={(e) => handleEnterAction(e, handlePasswordSubmit)}
                            placeholder="••••••••"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {signInErrors.password && (
                        <p className="text-red-500 text-xs mt-1">{signInErrors.password}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 accent-green-600 rounded"
                      />
                      <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
                    </div>

                    <button
                      onClick={handlePasswordSubmit}
                      disabled={signInSuccess || signInLoading}
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50"
                    >
                      {signInLoading ? 'Please wait...' : signInSuccess ? '✓ Welcome!' : 'Log In'}
                    </button>

                    <button
                      onClick={() => setSignInStep('authmethod')}
                      className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
                    >
                      Back
                    </button>
                  </>
                )}

                {signInStep === 'forgot-otp' && (
                  <>
                    <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-4">
                      <p className="text-sm text-green-800">
                        6-digit password reset OTP sent to your registered email
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Reset OTP</label>
                      <input
                        type="text"
                        value={resetPasswordOtp}
                        onChange={(e) => setResetPasswordOtp(e.target.value.slice(0, 6))}
                        onKeyDown={(e) => handleEnterAction(e, handleVerifyResetOtp)}
                        placeholder="000000"
                        maxLength="6"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-center text-lg tracking-widest"
                      />
                      {signInErrors.otp && (
                        <p className="text-red-500 text-xs mt-1">{signInErrors.otp}</p>
                      )}
                    </div>

                    <button
                      onClick={handleVerifyResetOtp}
                      disabled={signInLoading}
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50"
                    >
                      {signInLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>

                    <button
                      onClick={() => setSignInStep('password')}
                      className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
                    >
                      Back
                    </button>
                  </>
                )}

                {signInStep === 'forgot-reset' && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showResetPassword ? 'text' : 'password'}
                          value={resetNewPassword}
                          onChange={(e) => setResetNewPassword(e.target.value)}
                          onKeyDown={(e) => handleEnterAction(e, handleResetPasswordSubmit)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowResetPassword(!showResetPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showResetPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {signInErrors.password && (
                        <p className="text-red-500 text-xs mt-1">{signInErrors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showResetConfirmPassword ? 'text' : 'password'}
                          value={resetConfirmPassword}
                          onChange={(e) => setResetConfirmPassword(e.target.value)}
                          onKeyDown={(e) => handleEnterAction(e, handleResetPasswordSubmit)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowResetConfirmPassword(!showResetConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showResetConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {signInErrors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{signInErrors.confirmPassword}</p>
                      )}
                    </div>

                    <button
                      onClick={handleResetPasswordSubmit}
                      disabled={signInLoading}
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50"
                    >
                      {signInLoading ? 'Resetting...' : 'Reset Password'}
                    </button>

                    <button
                      onClick={() => setSignInStep('forgot-otp')}
                      className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
                    >
                      Back
                    </button>
                  </>
                )}

                {signInStep === 'otp' && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">OTP Verification</label>
                      <input
                        type="text"
                        value={signInOtp}
                        onChange={(e) => setSignInOtp(e.target.value.slice(0, 6))}
                        onKeyDown={(e) => handleEnterAction(e, handleSignInOtpSubmit)}
                        placeholder="000000"
                        maxLength="6"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-center text-lg tracking-widest"
                      />
                      <p className="text-gray-500 text-xs mt-2 text-center">6-digit code sent to your email</p>
                      {signInErrors.otp && (
                        <p className="text-red-500 text-xs mt-1">{signInErrors.otp}</p>
                      )}
                    </div>

                    <button
                      onClick={handleSignInOtpSubmit}
                      disabled={signInSuccess || signInLoading}
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50"
                    >
                      {signInLoading ? 'Verifying...' : signInSuccess ? '✓ Verified!' : 'Verify'}
                    </button>

                    <button
                      onClick={() => setSignInStep('authmethod')}
                      className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
                    >
                      Back
                    </button>
                  </>
                )}

                <p className="text-center text-sm text-gray-600 mt-6">
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setMode('signup');
                      resetSignUp();
                    }}
                    className="text-green-600 font-semibold hover:text-green-700"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-5">
                {signUpErrors.api && <p className="text-red-500 text-sm">{signUpErrors.api}</p>}

                {signUpStep === 'details' && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Full Name</label>
                      <input
                        type="text"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        onKeyDown={(e) => handleEnterAction(e, handleSignUpDetailsSubmit)}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                      />
                      {signUpErrors.name && (
                        <p className="text-red-500 text-xs mt-1">{signUpErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
                      <input
                        type="email"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        onKeyDown={(e) => handleEnterAction(e, handleSignUpDetailsSubmit)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                      />
                      {signUpErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{signUpErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Mobile Number</label>
                      <input
                        type="tel"
                        value={signUpPhone}
                        onChange={(e) => setSignUpPhone(e.target.value)}
                        onKeyDown={(e) => handleEnterAction(e, handleSignUpDetailsSubmit)}
                        placeholder="9876543210"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                      />
                      {signUpErrors.phone && (
                        <p className="text-red-500 text-xs mt-1">{signUpErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Password</label>
                      <div className="relative">
                        <input
                          type={showSignUpPassword ? 'text' : 'password'}
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          onKeyDown={(e) => handleEnterAction(e, handleSignUpDetailsSubmit)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {signUpPassword && (
                        <div className="mt-1">
                          {validatePassword(signUpPassword).length > 0 ? (
                            <p className="text-orange-500 text-xs">
                              Password needs: {validatePassword(signUpPassword).join(', ')}
                            </p>
                          ) : (
                            <p className="text-green-500 text-xs">✓ Strong password</p>
                          )}
                        </div>
                      )}
                      {signUpErrors.password && (
                        <p className="text-red-500 text-xs mt-1">{signUpErrors.password}</p>
                      )}
                    </div>

                    <button
                      onClick={handleSignUpDetailsSubmit}
                      disabled={signUpLoading}
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50"
                    >
                      {signUpLoading ? 'Please wait...' : 'Continue to Verification'}
                    </button>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                      </div>
                    </div>

                    <GoogleButton buttonKey="signup-web" />

                    <p className="text-center text-sm text-gray-600 mt-6">
                      Already have an account?{' '}
                      <button
                        onClick={() => {
                          setMode('signin');
                          resetSignIn();
                        }}
                        className="text-green-600 font-semibold hover:text-green-700"
                      >
                        Sign In
                      </button>
                    </p>
                  </>
                )}

                {signUpStep === 'otp' && (
                  <>
                    <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-4">
                      <p className="text-sm text-green-800">
                        6-digit OTP sent to your email
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Verify OTP</label>
                      <input
                        type="text"
                        value={signUpOtp}
                        onChange={(e) => setSignUpOtp(e.target.value.slice(0, 6))}
                        onKeyDown={(e) => handleEnterAction(e, handleSignUpOtpSubmit)}
                        placeholder="000000"
                        maxLength="6"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-center text-lg tracking-widest"
                      />
                      {signUpErrors.otp && (
                        <p className="text-red-500 text-xs mt-1">{signUpErrors.otp}</p>
                      )}
                    </div>

                    <button
                      onClick={handleSignUpOtpSubmit}
                      disabled={signUpSuccess || signUpLoading}
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50"
                    >
                      {signUpLoading ? 'Verifying...' : signUpSuccess ? '✓ Welcome!' : 'Complete Sign Up'}
                    </button>

                    <button
                      type="button"
                      onClick={handleResendSignupOtp}
                      disabled={signUpLoading}
                      className="w-full text-green-600 font-medium py-2 text-sm hover:text-green-700 disabled:opacity-50"
                    >
                      Resend OTP
                    </button>

                    <button
                      onClick={() => setSignUpStep('details')}
                      className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
                    >
                      Back
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-6">
                      Already have an account?{' '}
                      <button
                        onClick={() => {
                          setMode('signin');
                          resetSignIn();
                        }}
                        className="text-green-600 font-semibold hover:text-green-700"
                      >
                        Sign In
                      </button>
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
