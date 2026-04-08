export const AUTH_CHANGED_EVENT = "spiruboost-auth-changed";

export function dispatchAuthChanged(detail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(AUTH_CHANGED_EVENT, { detail }));
}

export function saveAuthSession({ token, user, rememberMe = false } = {}) {
  if (typeof window === "undefined") return;

  if (token) {
    localStorage.setItem("token", token);
  }

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  if (rememberMe) {
    localStorage.setItem("rememberMe", "true");
  } else {
    localStorage.removeItem("rememberMe");
  }

  dispatchAuthChanged({ authenticated: true, user });
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("rememberMe");
  sessionStorage.removeItem("redirectAfterLogin");

  dispatchAuthChanged({ authenticated: false });
}

export function readAuthSession() {
  if (typeof window === "undefined") {
    return { token: null, user: null, rememberMe: false };
  }

  const token = localStorage.getItem("token");
  const rememberMe = localStorage.getItem("rememberMe") === "true";
  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    return { token, user: null, rememberMe };
  }

  try {
    return {
      token,
      user: JSON.parse(savedUser),
      rememberMe,
    };
  } catch (error) {
    console.error("Failed to parse stored user session:", error);
    return { token, user: null, rememberMe };
  }
}
