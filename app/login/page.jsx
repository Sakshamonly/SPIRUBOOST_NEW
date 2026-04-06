'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';
import Navbar from '../components/usable/navbar';
import Footer from '../components/usable/footer';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState('signin');
  const [signInStep, setSignInStep] = useState('credentials');
  const [signUpStep, setSignUpStep] = useState('details');
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

  useEffect(() => {
    const storedRedirect = sessionStorage.getItem('redirectAfterLogin');
    if (storedRedirect) {
      setRedirectAfterLogin(storedRedirect);
    }
  }, []);

  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInOtp, setSignInOtp] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [authMethod, setAuthMethod] = useState(null);
  const [signInErrors, setSignInErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);

  // Sign Up State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpOtp, setSignUpOtp] = useState('');
  const [signUpErrors, setSignUpErrors] = useState({});
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  // Validation Functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

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

  const validateOtp = (otp) => {
    return /^\d{6}$/.test(otp);
  };

  // Sign In Functions
  const handleSignInNext = () => {
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

    setSignInErrors({});
    setSignInStep('authmethod');
  };

  const handleAuthMethodSelect = (method) => {
    setAuthMethod(method);
    setSignInStep(method === 'password' ? 'password' : 'otp');
  };

  const handlePasswordSubmit = () => {
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

    setSignInErrors({});
    setSignInSuccess(true);
    setTimeout(() => {
      const destination = redirectAfterLogin || '/user';
      sessionStorage.removeItem('redirectAfterLogin');
      router.push(destination);
    }, 1500);
  };

  const handleSignInOtpSubmit = () => {
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

    setSignInErrors({});
    setSignInSuccess(true);
    setTimeout(() => {
      const destination = redirectAfterLogin || '/user';
      sessionStorage.removeItem('redirectAfterLogin');
      router.push(destination);
    }, 1500);
  };

  const resetSignIn = () => {
    setSignInEmail('');
    setSignInPassword('');
    setSignInOtp('');
    setRememberMe(false);
    setAuthMethod(null);
    setSignInStep('credentials');
    setSignInSuccess(false);
  };

  const handleForgotPassword = () => {
    alert(`Password reset link sent to: ${signInEmail}`);
  };

  // Sign Up Functions
  const handleSignUpDetailsSubmit = () => {
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

    setSignUpErrors({});
    setSignUpStep('otp');
  };

  const handleSignUpOtpSubmit = () => {
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

    setSignUpErrors({});
    setSignUpSuccess(true);
    setTimeout(() => {
      router.push('/user');
    }, 1500);
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
  };

  return (
    <>
      <Navbar />
      
      <div className="flex flex-col min-h-[calc(100vh-80px)]">
        {/* Mobile View */}
        <div className="lg:hidden flex-1 relative pb-20 pt-16">
          {/* Background gradient */}
          <div className="absolute inset-0 top-0 h-64 bg-linear-to-b from-green-300 via-emerald-200 to-white opacity-80"></div>
          
          <div className="relative z-10 px-4 py-12 flex flex-col items-center">
            {/* Logo */}
            <div className="mb-6 text-center w-full">
              <img 
                src="/Spiruboost_Logo.png" 
                alt="Spiruboost Logo" 
                className="h-16 w-auto mx-auto mb-2"
              />
              <p className="text-gray-600 text-sm font-medium">Enter into the world of wellness</p>
            </div>

            {/* Form Card */}
            <div className={`w-full transition-all duration-300 ${
              mode === 'signup' ? 'max-w-lg' : 'max-w-sm'
            } bg-white rounded-3xl shadow-lg p-6 sm:p-8 mx-auto`}>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              {mode === 'signin' ? 'Login to Spiruboost' : 'Join Spiruboost'}
            </h2>

            {/* Tabs - Only show on Sign In */}
            {mode === 'signin' && (
              <div className="flex gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    resetSignIn();
                  }}
                  className={`flex-1 py-2 font-semibold text-sm transition-all text-green-700 border-b-2 border-green-600`}
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Sign In Form - Mobile */}
            {mode === 'signin' && (
              <div className="space-y-4">
                {signInStep === 'credentials' && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
                      <input
                        type="text"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                      />
                      {signInErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{signInErrors.email}</p>
                      )}
                    </div>

                    <button
                      onClick={handleSignInNext}
                      className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm mt-4"
                    >
                      Continue
                    </button>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </button>
                  </>
                )}

                {signInStep === 'authmethod' && (
                  <>
                    <p className="text-sm text-gray-600 text-center mb-4">Choose authentication method</p>
                    <button
                      onClick={() => handleAuthMethodSelect('password')}
                      className="w-full border-2 border-green-600 text-green-600 font-semibold py-2.5 rounded-lg hover:bg-green-50 transition-all text-sm"
                    >
                      Use Password
                    </button>
                    <button
                      onClick={() => handleAuthMethodSelect('otp')}
                      className="w-full border-2 border-green-600 text-green-600 font-semibold py-2.5 rounded-lg hover:bg-green-50 transition-all text-sm"
                    >
                      Use OTP
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
                          className="text-xs text-green-600 hover:text-green-700 font-semibold"
                        >
                          Forgot?
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
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
                      disabled={signInSuccess}
                      className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50 mt-4"
                    >
                      {signInSuccess ? '✓ Welcome!' : 'Log In'}
                    </button>
                    
                    <button
                      onClick={() => setSignInStep('authmethod')}
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
                      disabled={signInSuccess}
                      className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50 mt-4"
                    >
                      {signInSuccess ? '✓ Verified!' : 'Verify'}
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

            {/* Sign Up Form - Mobile */}
            {mode === 'signup' && (
              <div className="space-y-4">
                {signUpStep === 'details' && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Full Name</label>
                      <input
                        type="text"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
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
                      className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm mt-4"
                    >
                      Continue to Verification
                    </button>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
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
                      disabled={signUpSuccess}
                      className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50 mt-4"
                    >
                      {signUpSuccess ? '✓ Welcome!' : 'Complete Sign Up'}
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
        
        {/* Web View - Centered Form with Hero Background */}
        <div className="hidden lg:flex flex-1 relative bg-cover bg-center items-center justify-center px-8 py-24 mt-8" style={{backgroundImage: 'url(/login_hero.png)', backgroundAttachment: 'fixed', minHeight: 'calc(100vh - 80px)'}}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Form Container */}
          <div className={`relative z-10 w-full transition-all duration-300 bg-white rounded-2xl shadow-2xl p-8 md:p-12 ${
            mode === 'signup' ? 'max-w-xl' : 'max-w-md'
          }`}>
          {/* Logo */}
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

          {/* Tabs - Only show on Sign In */}
          {mode === 'signin' && (
            <div className="flex gap-4 mb-8 border-b border-gray-300">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  resetSignIn();
                }}
                className={`flex-1 py-3 font-semibold text-sm transition-all border-b-2 text-green-700 border-green-600`}
              >
                Sign In
              </button>
            </div>
          )}

          {/* Sign In Form */}
            {mode === 'signin' && (
              <div className="space-y-5">
                {signInStep === 'credentials' && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
                      <input
                        type="text"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-sm"
                      />
                      {signInErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{signInErrors.email}</p>
                      )}
                    </div>

                    <button
                      onClick={handleSignInNext}
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all text-sm"
                    >
                      Continue
                    </button>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </button>
                  </>
                )}

                {signInStep === 'authmethod' && (
                  <>
                    <p className="text-sm text-gray-600 text-center mb-4">Choose authentication method</p>
                    <button
                      onClick={() => handleAuthMethodSelect('password')}
                      className="w-full border-2 border-green-600 text-green-600 font-semibold py-3 rounded-lg hover:bg-green-50 transition-all text-sm"
                    >
                      Use Password
                    </button>
                    <button
                      onClick={() => handleAuthMethodSelect('otp')}
                      className="w-full border-2 border-green-600 text-green-600 font-semibold py-3 rounded-lg hover:bg-green-50 transition-all text-sm"
                    >
                      Use OTP
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
                          className="text-xs text-green-600 hover:text-green-700 font-semibold"
                        >
                          Forgot?
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
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
                      disabled={signInSuccess}
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50"
                    >
                      {signInSuccess ? '✓ Welcome!' : 'Log In'}
                    </button>
                    
                    <button
                      onClick={() => setSignInStep('authmethod')}
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
                      disabled={signInSuccess}
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50"
                    >
                      {signInSuccess ? '✓ Verified!' : 'Verify'}
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

            {/* Sign Up Form */}
            {mode === 'signup' && (
              <div className="space-y-5">
                {signUpStep === 'details' && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Full Name</label>
                      <input
                        type="text"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
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
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all text-sm"
                    >
                      Continue to Verification
                    </button>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
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
                      disabled={signUpSuccess}
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all text-sm disabled:opacity-50"
                    >
                      {signUpSuccess ? '✓ Welcome!' : 'Complete Sign Up'}
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
