"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Leaf } from "lucide-react";
import Navbar from "../components/usable/navbar";
import Footer from "../components/usable/footer";
import API from "../../lib/api";

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState("signin");
  const [signInStep, setSignInStep] = useState("credentials");
  const [signUpStep, setSignUpStep] = useState("details");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInOtp, setSignInOtp] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [authMethod, setAuthMethod] = useState(null);
  const [signInErrors, setSignInErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpOtp, setSignUpOtp] = useState("");
  const [signUpErrors, setSignUpErrors] = useState({});
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone.replace(/\D/g, ""));
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (password.length > 15) errors.push("Maximum 15 characters");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("One number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("One special character (!@#$%^&*)");
    return errors;
  };
  const validateOtp = (otp) => /^\d{6}$/.test(otp);

  const getErrorMessage = (error, fallback) =>
    error?.response?.data?.message || error?.response?.data?.error || fallback;

  const saveAuthData = (data) => {
    if (typeof window === "undefined") return;
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
      localStorage.setItem("token", token);
      if (rememberMe) localStorage.setItem("rememberMe", "true");
      else localStorage.removeItem("rememberMe");
    }
    if (user) localStorage.setItem("user", JSON.stringify(user));
  };

  const redirectAfterLogin = (user) => {
    if (user?.isAdmin || user?.role === "admin") router.push("/admin");
    else router.push("/user");
  };

  const resetSignIn = () => {
    setSignInEmail("");
    setSignInPassword("");
    setSignInOtp("");
    setRememberMe(false);
    setAuthMethod(null);
    setSignInStep("credentials");
    setSignInSuccess(false);
    setSignInErrors({});
    setSignInLoading(false);
  };

  const resetSignUp = () => {
    setSignUpName("");
    setSignUpEmail("");
    setSignUpPhone("");
    setSignUpPassword("");
    setSignUpOtp("");
    setSignUpStep("details");
    setSignUpSuccess(false);
    setSignUpErrors({});
    setSignUpLoading(false);
  };

  const handleSignInNext = async () => {
    const errors = {};
    if (!signInEmail.trim()) errors.email = "Email or mobile number required";
    else if (!validateEmail(signInEmail) && !validatePhone(signInEmail))
      errors.email = "Enter valid email or 10-digit mobile number";
    if (Object.keys(errors).length) {
      setSignInErrors(errors);
      return;
    }
    try {
      setSignInLoading(true);
      setSignInErrors({});
      const response = await API.post("/users/check-user", { identifier: signInEmail });
      if (!response?.data?.exists) {
        setSignInErrors({ email: "User not found. Please sign up first." });
        return;
      }
      if (!response?.data?.isEmailVerified) {
        setSignInErrors({ email: "Please verify your email first before signing in." });
        return;
      }
      setSignInStep("authmethod");
    } catch (error) {
      setSignInErrors({ api: getErrorMessage(error, "Unable to verify user.") });
    } finally {
      setSignInLoading(false);
    }
  };

  const handleAuthMethodSelect = async (method) => {
    setAuthMethod(method);
    setSignInErrors({});
    if (method === "password") {
      setSignInStep("password");
      return;
    }
    try {
      setSignInLoading(true);
      await API.post("/users/send-login-otp", { identifier: signInEmail });
      setSignInStep("otp");
    } catch (error) {
      setSignInErrors({ api: getErrorMessage(error, "Unable to send OTP. Please try again.") });
    } finally {
      setSignInLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    const errors = {};
    if (!signInPassword.trim()) errors.password = "Password required";
    else {
      const passwordErrors = validatePassword(signInPassword);
      if (passwordErrors.length) errors.password = `Password must have: ${passwordErrors.join(", ")}`;
    }
    if (Object.keys(errors).length) {
      setSignInErrors(errors);
      return;
    }
    try {
      setSignInLoading(true);
      setSignInErrors({});
      const response = await API.post("/users/login", {
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
      setTimeout(() => redirectAfterLogin(user), 1000);
    } catch (error) {
      setSignInErrors({ api: getErrorMessage(error, "Login failed. Please check your credentials.") });
    } finally {
      setSignInLoading(false);
    }
  };

  const handleSignInOtpSubmit = async () => {
    const errors = {};
    if (!signInOtp.trim()) errors.otp = "OTP required";
    else if (!validateOtp(signInOtp)) errors.otp = "OTP must be 6 digits";
    if (Object.keys(errors).length) {
      setSignInErrors(errors);
      return;
    }
    try {
      setSignInLoading(true);
      setSignInErrors({});
      const response = await API.post("/users/verify-login-otp", {
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
      setTimeout(() => redirectAfterLogin(user), 1000);
    } catch (error) {
      setSignInErrors({ api: getErrorMessage(error, "OTP verification failed.") });
    } finally {
      setSignInLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!signInEmail.trim()) {
      setSignInErrors({ email: "Enter email or mobile number first" });
      return;
    }
    try {
      setSignInLoading(true);
      setSignInErrors({});
      await API.post("/users/send-login-otp", { identifier: signInEmail });
      setAuthMethod("otp");
      setSignInStep("otp");
    } catch (error) {
      setSignInErrors({ api: getErrorMessage(error, "Unable to send OTP.") });
    } finally {
      setSignInLoading(false);
    }
  };

  const handleSignUpDetailsSubmit = async () => {
    const errors = {};
    if (!signUpName.trim()) errors.name = "Name required";
    if (!signUpEmail.trim()) errors.email = "Email required";
    else if (!validateEmail(signUpEmail)) errors.email = "Enter valid email";
    if (!signUpPhone.trim()) errors.phone = "Mobile number required";
    else if (!validatePhone(signUpPhone)) errors.phone = "Enter valid 10-digit mobile number";
    if (!signUpPassword.trim()) errors.password = "Password required";
    else {
      const passwordErrors = validatePassword(signUpPassword);
      if (passwordErrors.length) errors.password = `Password must have: ${passwordErrors.join(", ")}`;
    }
    if (Object.keys(errors).length) {
      setSignUpErrors(errors);
      return;
    }
    try {
      setSignUpLoading(true);
      setSignUpErrors({});
      const response = await API.post("/users/register", {
        name: signUpName,
        email: signUpEmail,
        mobile: signUpPhone,
        password: signUpPassword,
      });
      if (response?.data?.email) setSignUpEmail(response.data.email);
      setSignUpStep("otp");
    } catch (error) {
      setSignUpErrors({ api: getErrorMessage(error, "Unable to create account.") });
    } finally {
      setSignUpLoading(false);
    }
  };

  const handleSignUpOtpSubmit = async () => {
    const errors = {};
    if (!signUpOtp.trim()) errors.otp = "OTP required";
    else if (!validateOtp(signUpOtp)) errors.otp = "OTP must be 6 digits";
    if (Object.keys(errors).length) {
      setSignUpErrors(errors);
      return;
    }
    try {
      setSignUpLoading(true);
      setSignUpErrors({});
      const response = await API.post("/users/verify-signup-otp", {
        email: signUpEmail,
        otp: signUpOtp,
      });
      saveAuthData(response.data);
      setSignUpSuccess(true);
      const user =
        response?.data?.user ||
        response?.data?.data?.user ||
        response?.data?.result?.user ||
        null;
      setTimeout(() => redirectAfterLogin(user), 1000);
    } catch (error) {
      setSignUpErrors({ api: getErrorMessage(error, "OTP verification failed.") });
    } finally {
      setSignUpLoading(false);
    }
  };

  const handleResendSignupOtp = async () => {
    try {
      setSignUpLoading(true);
      setSignUpErrors({});
      await API.post("/users/resend-signup-otp", { email: signUpEmail });
      setSignUpErrors({ api: "OTP resent successfully. Please check your email." });
    } catch (error) {
      setSignUpErrors({ api: getErrorMessage(error, "Unable to resend OTP.") });
    } finally {
      setSignUpLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-white flex pt-20">
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-8 py-8 sm:py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  Spirulina Lab
                </h1>
              </div>
              <p className="text-gray-500 text-sm sm:text-base font-light italic">
                The Living Laboratory
              </p>
            </div>

            <div className="flex gap-1 mb-8 border-b border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  resetSignIn();
                }}
                className={`px-4 py-3 font-semibold text-sm transition-all duration-300 relative cursor-pointer ${
                  mode === "signin" ? "text-teal-600" : "text-gray-500"
                }`}
              >
                Sign In
                {mode === "signin" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  resetSignUp();
                }}
                className={`px-4 py-3 font-semibold text-sm transition-all duration-300 relative cursor-pointer ${
                  mode === "signup" ? "text-teal-600" : "text-gray-500"
                }`}
              >
                Sign Up
                {mode === "signup" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                )}
              </button>
            </div>

            {mode === "signin" && (
              <div className="space-y-6">
                {signInErrors.api && <p className="text-red-500 text-sm">{signInErrors.api}</p>}

                {signInStep === "credentials" && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                        Email Address or Mobile
                      </label>
                      <input
                        type="text"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="name@laboratory.com or 9876543210"
                        className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:bg-white transition-all duration-300 text-sm"
                      />
                      {signInErrors.email && (
                        <p className="text-red-500 text-xs mt-2">{signInErrors.email}</p>
                      )}
                    </div>

                    <button
                      onClick={handleSignInNext}
                      disabled={signInLoading}
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      {signInLoading ? "Please wait..." : "Continue"}
                    </button>
                  </>
                )}

                {signInStep === "authmethod" && (
                  <>
                    <div className="space-y-4">
                      <p className="text-gray-600 text-sm">
                        Choose your authentication method for{" "}
                        <span className="font-semibold text-gray-800">{signInEmail}</span>
                      </p>
                      <button
                        onClick={() => handleAuthMethodSelect("password")}
                        disabled={signInLoading}
                        className="w-full border-2 border-teal-500 text-teal-600 font-semibold py-3 rounded-lg hover:bg-teal-50 transition-all duration-300 disabled:opacity-50"
                      >
                        <Lock className="w-5 h-5 inline mr-2" />
                        Use Password
                      </button>
                      <button
                        onClick={() => handleAuthMethodSelect("otp")}
                        disabled={signInLoading}
                        className="w-full border-2 border-emerald-500 text-emerald-600 font-semibold py-3 rounded-lg hover:bg-emerald-50 transition-all duration-300 disabled:opacity-50"
                      >
                        <Mail className="w-5 h-5 inline mr-2" />
                        {signInLoading ? "Sending OTP..." : "Use OTP"}
                      </button>
                    </div>

                    <button
                      onClick={() => setSignInStep("credentials")}
                      className="w-full text-gray-600 font-medium py-2 hover:text-gray-800 transition-colors"
                    >
                      Back
                    </button>
                  </>
                )}

                {signInStep === "password" && (
                  <>
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Password
                        </label>
                        <button
                          onClick={handleForgotPassword}
                          disabled={signInLoading}
                          className="text-xs text-teal-600 hover:text-teal-700 font-semibold disabled:opacity-50"
                        >
                          Forgot?
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:bg-white transition-all duration-300 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {signInErrors.password && (
                        <p className="text-red-500 text-xs mt-2">{signInErrors.password}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-5 h-5 accent-teal-500 rounded cursor-pointer"
                      />
                      <label htmlFor="remember" className="text-sm text-gray-700 cursor-pointer">
                        Stay connected to this lab
                      </label>
                    </div>

                    <button
                      onClick={handlePasswordSubmit}
                      disabled={signInSuccess || signInLoading}
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      {signInLoading ? "Please wait..." : signInSuccess ? "✓ Welcome!" : "Enter Laboratory"}
                    </button>

                    <button
                      onClick={() => setSignInStep("authmethod")}
                      className="w-full text-gray-600 font-medium py-2 hover:text-gray-800 transition-colors"
                    >
                      Back
                    </button>
                  </>
                )}

                {signInStep === "otp" && authMethod === "otp" && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                        OTP Verification
                      </label>
                      <input
                        type="text"
                        value={signInOtp}
                        onChange={(e) => setSignInOtp(e.target.value.slice(0, 6))}
                        placeholder="000000"
                        maxLength="6"
                        className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:bg-white transition-all duration-300 text-sm tracking-widest text-center text-lg"
                      />
                      <p className="text-gray-500 text-xs mt-2 text-center">
                        Enter the 6-digit code sent to your registered email
                      </p>
                      {signInErrors.otp && (
                        <p className="text-red-500 text-xs mt-2">{signInErrors.otp}</p>
                      )}
                    </div>

                    <button
                      onClick={handleSignInOtpSubmit}
                      disabled={signInSuccess || signInLoading}
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      {signInLoading ? "Verifying..." : signInSuccess ? "✓ Verified!" : "Verify & Enter Laboratory"}
                    </button>

                    <button
                      onClick={() => setSignInStep("authmethod")}
                      className="w-full text-gray-600 font-medium py-2 hover:text-gray-800 transition-colors"
                    >
                      Back
                    </button>
                  </>
                )}
              </div>
            )}

            {mode === "signup" && (
              <div className="space-y-6">
                {signUpErrors.api && <p className="text-red-500 text-sm">{signUpErrors.api}</p>}

                {signUpStep === "details" && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:bg-white transition-all duration-300 text-sm"
                      />
                      {signUpErrors.name && (
                        <p className="text-red-500 text-xs mt-2">{signUpErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        placeholder="name@laboratory.com"
                        className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:bg-white transition-all duration-300 text-sm"
                      />
                      {signUpErrors.email && (
                        <p className="text-red-500 text-xs mt-2">{signUpErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={signUpPhone}
                        onChange={(e) => setSignUpPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:bg-white transition-all duration-300 text-sm"
                      />
                      {signUpErrors.phone && (
                        <p className="text-red-500 text-xs mt-2">{signUpErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showSignUpPassword ? "text" : "password"}
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:bg-white transition-all duration-300 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showSignUpPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {signUpPassword && (
                        <div className="mt-2 space-y-1">
                          {validatePassword(signUpPassword).length > 0 && (
                            <p className="text-orange-500 text-xs">
                              Password needs: {validatePassword(signUpPassword).join(", ")}
                            </p>
                          )}
                          {validatePassword(signUpPassword).length === 0 && (
                            <p className="text-green-500 text-xs">✓ Strong password</p>
                          )}
                        </div>
                      )}
                      {signUpErrors.password && (
                        <p className="text-red-500 text-xs mt-2">{signUpErrors.password}</p>
                      )}
                    </div>

                    <button
                      onClick={handleSignUpDetailsSubmit}
                      disabled={signUpLoading}
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      {signUpLoading ? "Please wait..." : "Continue to Verification"}
                    </button>
                  </>
                )}

                {signUpStep === "otp" && (
                  <>
                    <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded mb-6">
                      <p className="text-sm text-teal-800">
                        A 6-digit OTP has been sent to your email:{" "}
                        <span className="font-semibold">{signUpEmail}</span>
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                        OTP Verification
                      </label>
                      <input
                        type="text"
                        value={signUpOtp}
                        onChange={(e) => setSignUpOtp(e.target.value.slice(0, 6))}
                        placeholder="000000"
                        maxLength="6"
                        className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:bg-white transition-all duration-300 text-sm tracking-widest text-center text-lg"
                      />
                      {signUpErrors.otp && (
                        <p className="text-red-500 text-xs mt-2">{signUpErrors.otp}</p>
                      )}
                    </div>

                    <button
                      onClick={handleSignUpOtpSubmit}
                      disabled={signUpSuccess || signUpLoading}
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      {signUpLoading ? "Verifying..." : signUpSuccess ? "✓ Welcome!" : "Complete Sign Up"}
                    </button>

                    <button
                      type="button"
                      onClick={handleResendSignupOtp}
                      disabled={signUpLoading}
                      className="w-full text-teal-600 font-medium py-2 hover:text-teal-700 transition-colors disabled:opacity-50"
                    >
                      Resend OTP
                    </button>

                    <button
                      onClick={() => setSignUpStep("details")}
                      className="w-full text-gray-600 font-medium py-2 hover:text-gray-800 transition-colors"
                    >
                      Back
                    </button>
                  </>
                )}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
              <p>© 2024 Spirulina Lab. All rights reserved.</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700">
          <img
            src="/auth-hero.jpg"
            alt="Spirulina Laboratory"
            className="w-full h-full object-cover opacity-90"
          />

          <div className="absolute bottom-8 right-8 bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 max-w-sm shadow-2xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Purity in every <span className="italic text-teal-600">particle</span>
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Join a community of 50,000+ biohackers and wellness enthusiasts optimizing their life with microscopic precision.
            </p>
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-teal-900 via-transparent to-transparent opacity-40"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
