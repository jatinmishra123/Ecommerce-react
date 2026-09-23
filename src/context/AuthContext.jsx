import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "./authContextObject";
import { getCustomerProfile, loginCustomer, registerCustomer } from "../api";

const TOKEN_KEY = "clothstore.customerToken";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback((activeToken) => {
    if (!activeToken) {
      setCustomer(null);
      setLoading(false);
      return;
    }

    getCustomerProfile(activeToken)
      .then(setCustomer)
      .catch(() => {
        setCustomer(null);
        setToken(null);
        try {
          localStorage.removeItem(TOKEN_KEY);
        } catch {
          /* ignore */
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadProfile(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    const newToken = await loginCustomer({ email, password });
    try {
      localStorage.setItem(TOKEN_KEY, newToken);
    } catch {
      /* ignore */
    }
    setToken(newToken);
    setLoading(true);
    loadProfile(newToken);
  };

  const register = async (name, email, password) => {
    await registerCustomer({ name, email, password });
    await login(email, password);
  };

  const logout = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
    setToken(null);
    setCustomer(null);
  };

  const refreshProfile = () => loadProfile(token);

  const value = {
    token,
    customer,
    isAuthenticated: !!customer,
    loading,
    login,
    register,
    logout,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
