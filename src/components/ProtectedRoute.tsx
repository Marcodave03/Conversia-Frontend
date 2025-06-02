// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useWallet } from '@suiet/wallet-kit';

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const wallet = useWallet();
//   const zkWallet = localStorage.getItem("zkloginWallet");

//   const isAuthenticated = wallet.status === 'connected' || !!zkWallet;

//   return isAuthenticated ? <>{children}</> : <Navigate to="/landing" />;
// };

// export default ProtectedRoute;

// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useWallet } from '@suiet/wallet-kit';

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const wallet = useWallet();
//   const [isReady, setIsReady] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const zkWallet = localStorage.getItem("zkloginWallet");

//     const authenticated =
//       wallet.status === 'connected' || (typeof zkWallet === 'string' && zkWallet.startsWith('0x'));

//     setIsAuthenticated(authenticated);
//     setIsReady(true);
//   }, [wallet.status, wallet.account]);

//   if (!isReady) return null;

//   return isAuthenticated ? <>{children}</> : <Navigate to="/landing" />;
// };

// export default ProtectedRoute;


// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useWallet } from '@suiet/wallet-kit';

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const wallet = useWallet();
//   const [isReady, setIsReady] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // ✅ Only wallet login currently tracked
//     if (wallet.status === 'connected') {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//     setIsReady(true);
//   }, [wallet.status]);

//   if (!isReady) return null;

//   return isAuthenticated ? <>{children}</> : <Navigate to="/landing" />;
// };

// export default ProtectedRoute;


// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useWallet } from '@suiet/wallet-kit';

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const wallet = useWallet();
//   const [isReady, setIsReady] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const zkLoginFlag = localStorage.getItem("zklogin_loggedin");

//     if (wallet.status === 'connected' || zkLoginFlag === 'true') {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//     setIsReady(true);
//   }, [wallet.status]);

//   if (!isReady) return null;

//   return isAuthenticated ? <>{children}</> : <Navigate to="/landing" />;
// };

// export default ProtectedRoute;



import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useWallet } from '@suiet/wallet-kit';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wallet = useWallet();
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const zkLoginFlag = localStorage.getItem("zklogin_loggedin");
    console.log("✅ zklogin_loggedin =", zkLoginFlag);
    console.log("✅ wallet.status =", wallet.status);

    const isLoggedIn =
      wallet.status === 'connected' || zkLoginFlag === 'true';

    setIsAuthenticated(isLoggedIn);
    setIsReady(true);
  }, []); // ✅ only on mount to ensure it catches localStorage right after redirect

  if (!isReady) return null;

  return isAuthenticated ? <>{children}</> : <Navigate to="/landing" />;
};

export default ProtectedRoute;
