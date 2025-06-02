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

// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useWallet } from "@suiet/wallet-kit";

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const wallet = useWallet();
//   const [isReady, setIsReady] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const zkLoginFlag = localStorage.getItem("zklogin_loggedin");
//     const zkWallet = localStorage.getItem("zkloginWallet");

//     const connectedViaZk = zkLoginFlag === "true" && zkWallet?.startsWith("0x");
//     const connectedViaWallet = wallet.status === "connected";

//     if (connectedViaWallet || connectedViaZk) {
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

// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useWallet } from "@suiet/wallet-kit";

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const wallet = useWallet();
//   const [isReady, setIsReady] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = () => {
//       const storedBypass = localStorage.getItem("bypassWallet");
//       const storedZkWallet = localStorage.getItem("zkloginWallet");
//       const resolvedWallet =
//         wallet.account?.address ?? storedBypass ?? storedZkWallet;

//       console.log("🔐 [ProtectedRoute] Resolved:", resolvedWallet);

//       if (resolvedWallet?.startsWith("0x")) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }

//       setIsReady(true);
//     };

//     checkAuth(); // initial run
//     window.addEventListener("zklogin-success", checkAuth); // 🆕 re-run on zkLogin

//     return () => {
//       window.removeEventListener("zklogin-success", checkAuth); // 🆕 cleanup
//     };
//   }, [wallet.account?.address]);

//   if (!isReady) return null;

//   if (!isAuthenticated && isReady) {
//     console.log("🔄 Redirecting to /landing...");
//   }
//   return isAuthenticated ? <>{children}</> : <Navigate to="/landing" />;
// };

// export default ProtectedRoute;




// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useWallet } from "@suiet/wallet-kit";

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const wallet = useWallet();
//   const [isReady, setIsReady] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const checkAuth = () => {
//     const storedBypass = localStorage.getItem("bypassWallet");
//     const storedZkWallet = localStorage.getItem("zkloginWallet");
//     const resolvedWallet = wallet.account?.address ?? storedBypass ?? storedZkWallet;

//     console.log("🔐 [ProtectedRoute] Resolved:", resolvedWallet);
//     console.log("  ⤷ wallet.account?.address:", wallet.account?.address);
//     console.log("  ⤷ bypassWallet:", storedBypass);
//     console.log("  ⤷ zkloginWallet:", storedZkWallet);

//     const valid = resolvedWallet?.startsWith("0x") === true;
//     setIsAuthenticated(valid); 
//     setIsReady(true);
//   };

//   useEffect(() => {
//     checkAuth(); // initial check
//     window.addEventListener("zklogin-success", checkAuth); // listen to zkLogin event

//     // Optional: delay to allow for late localStorage sync
//     const fallbackTimer = setTimeout(() => checkAuth(), 300);

//     return () => {
//       clearTimeout(fallbackTimer);
//       window.removeEventListener("zklogin-success", checkAuth);
//     };
//   }, [wallet.account?.address]);

//   if (!isReady) return null;

//   if (!isAuthenticated) {
//     console.log("🔄 Redirecting to /landing...");
//   } else {
//     console.log("✅ Access granted to protected route");
//   }

//   return isAuthenticated ? <>{children}</> : <Navigate to="/landing" />;
// };

// export default ProtectedRoute;


import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useWallet } from "@suiet/wallet-kit";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wallet = useWallet();
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const storedBypass = localStorage.getItem("bypassWallet");
      const storedZkWallet = localStorage.getItem("zkloginWallet");

      const resolvedWallet =
        wallet.account?.address ?? storedBypass ?? storedZkWallet;

      console.log("🔐 [ProtectedRoute] Resolved:", resolvedWallet);
      console.log("  ⤷ wallet.account?.address:", wallet.account?.address);
      console.log("  ⤷ bypassWallet:", storedBypass);
      console.log("  ⤷ zkloginWallet:", storedZkWallet);

      const valid = resolvedWallet?.startsWith("0x") === true;
      setIsAuthenticated(valid);
      setIsReady(true);
    };

    checkAuth(); // run once immediately

    window.addEventListener("zklogin-success", checkAuth);

    // fallback timer in case wallet/account not populated yet
    const fallbackTimer = setTimeout(() => checkAuth(), 300);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener("zklogin-success", checkAuth);
    };
  }, [wallet.account?.address]);

  if (!isReady) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        ⏳ Checking authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("🔄 Redirecting to /landing...");
    return <Navigate to="/landing" replace />;
  }

  console.log("✅ Access granted to protected route");
  return <>{children}</>;
};

export default ProtectedRoute;
