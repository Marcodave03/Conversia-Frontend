import React from 'react';
import { Navigate } from 'react-router-dom';
import { useWallet } from '@suiet/wallet-kit';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wallet = useWallet();
  const zkWallet = localStorage.getItem("zkloginWallet");

  const isAuthenticated = wallet.status === 'connected' || !!zkWallet;

  return isAuthenticated ? <>{children}</> : <Navigate to="/landing" />;
};

export default ProtectedRoute;
