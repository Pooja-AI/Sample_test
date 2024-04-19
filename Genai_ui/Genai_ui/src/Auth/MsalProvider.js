// MsalProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './authConfig';



export const MsalProvider = ({ children }) => {
    const MsalContext = createContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const msalInstance = new PublicClientApplication(msalConfig);

  const handleLogin = (response) => {
    if (response.eventType === EventType.LOGIN_SUCCESS) {
      setIsAuthenticated(true);
      setUser(response.payload.account);
    }
  };

  useEffect(() => {
    const initializeMsal = async () => {
      await msalInstance.handleRedirectPromise(); // Handle redirect if there is any
      const accounts = msalInstance.getAllAccounts();

      if (accounts.length > 0) {
        setIsAuthenticated(true);
        setUser(accounts[0]);
      }
    };

    initializeMsal();

    msalInstance.addEventCallback(handleLogin);

    return () => {
      msalInstance.removeEventCallback(handleLogin);
    };
  }, []);

  const login = async () => {
    await msalInstance.loginPopup();
  };

  const logout = () => {
    msalInstance.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <MsalContext.Provider value={value}>{children}</MsalContext.Provider>;
};

export const useMsal = () => {
  const context = useContext(MsalContext);
  if (!context) {
    throw new Error('useMsal must be used within a MsalProvider');
  }
  return context;
};
