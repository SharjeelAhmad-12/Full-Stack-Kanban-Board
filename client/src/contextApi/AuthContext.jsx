import React, { createContext, useState, useEffect } from "react";
import { authService } from "../api/Service"; 

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        setUser({ token });
      }
      setLoading(false);
    };
    getUserFromLocalStorage();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { token, userData } = response.data; 
      localStorage.setItem("access_token", token);
      setUser({ token, ...userData });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const signup = async (data) => {
    try {
      const response = await authService.signup(data);
      const { token, userData } = response.data;

      localStorage.setItem("access_token", token);
      setUser({ token, ...userData });
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    // window.location.reload();
  };

  const forgotPassword = async (email) => {
    try {
      await authService.forgotPassword( email );
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };

  const resetPassword = async (data) => {
    try {
      await authService.resetPassword(data);
    } catch (error) {
      console.error("Reset password error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
