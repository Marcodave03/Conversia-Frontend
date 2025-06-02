// import React from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtToAddress } from "@mysten/sui/zklogin";
// import { useNavigate } from "react-router-dom";

// const host = import.meta.env.VITE_HOST;

// const ZkLogin: React.FC = () => {
//   const navigate = useNavigate();

//   // Google Login Success Handler
//   const handleZkLogin = async (credential: string) => {
//     try {
//       const userSalt = BigInt("12345678901234567890"); // 🔒 Replace with real salt logic
//       const address = jwtToAddress(credential, userSalt);

//       // ✅ Save login state for ProtectedRoute
//       localStorage.setItem("zklogin_loggedin", "true");

//       // Create or verify user via backend
//       const res = await fetch(`${host}/api/conversia/users`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           sui_id: address,
//           username: "zklogin_user",
//         }),
//       });

//       const data = await res.json();
//       console.log("✅ ZK user created or verified:", data);

//       // Redirect same as wallet
//       navigate("/");
//     } catch (err) {
//       console.error("❌ zkLogin failed:", err);
//     }
//   };

//   return (
//     <GoogleLogin
//       onSuccess={(res) => {
//         if (res.credential) handleZkLogin(res.credential);
//       }}
//       onError={() => console.log("Google Login Failed")}
//     />
//   );
// };

// export default ZkLogin;



// import React from "react";
// import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import { jwtToAddress } from "@mysten/sui/zklogin";
// import { useNavigate } from "react-router-dom";

// const host = import.meta.env.VITE_HOST;

// const ZkLogin: React.FC = () => {
//   const navigate = useNavigate();

//   const handleZkLogin = async (credential: string) => {
//     try {
//       const userSalt = BigInt("12345678901234567890");
//       const address = jwtToAddress(credential, userSalt);

//       localStorage.setItem("zklogin_loggedin", "true");
//       localStorage.setItem("zkloginWallet", address);
//       localStorage.setItem("zkloginJWT", credential);

//       const res = await fetch(`${host}/api/conversia/users`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           sui_id: address,
//           username: "zklogin_user",
//         }),
//       });

//       const data = await res.json();
//       console.log("✅ ZK user created or verified:", data);

//       navigate("/"); // ✅ This must be hit
//     } catch (err) {
//       console.error("❌ zkLogin failed:", err);
//     }
//   };

//   return (
//     <GoogleLogin
//       onSuccess={(response: CredentialResponse) => {
//         console.log("✅ Google login success", response);
//         if (response.credential) {
//           handleZkLogin(response.credential);
//         } else {
//           console.error("❌ Missing credential from Google");
//         }
//       }}
//       onError={() => console.error("❌ Google Login Failed")}
//       useOneTap
//     />
//   );
// };

// export default ZkLogin;


import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtToAddress } from "@mysten/sui/zklogin";
// import { useNavigate } from "react-router-dom";

const host = import.meta.env.VITE_HOST;

const ZkLogin: React.FC = () => {
// const navigate = useNavigate();

  const handleZkLogin = async (credential: string) => {
    try {
      const userSalt = BigInt("12345678901234567890"); // Replace with dynamic salt in prod
      const address = jwtToAddress(credential, userSalt);

      // ✅ Save login state
      localStorage.setItem("zklogin_loggedin", "true");
      localStorage.setItem("zkloginWallet", address);
      localStorage.setItem("zkloginJWT", credential);
      window.dispatchEvent(new Event("zklogin-success"));
      // ✅ Send to backend
      const res = await fetch(`${host}/api/conversia/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sui_id: address,
          username: "zklogin_user",
        }),
      });

      const data = await res.json();
      console.log("✅ ZK user created or verified:", data);

      // ✅ Redirect to main page
      window.location.replace("/");
    } catch (err) {
      console.error("❌ zkLogin failed:", err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={(response: CredentialResponse) => {
        console.log("✅ Google login success:", response);
        if (response.credential) {
          handleZkLogin(response.credential);
        } else {
          console.error("❌ Missing credential field from Google");
        }
      }}
      onError={() => {
        console.error("❌ Google Login Failed (popup closed or blocked)");
      }}
      // 🔥 FIXED: remove useOneTap to prevent AbortError issues
    />
  );
};

export default ZkLogin;

