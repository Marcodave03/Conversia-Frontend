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












// import React from "react";
// import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import { jwtToAddress } from "@mysten/sui/zklogin";
// import { useNavigate } from "react-router-dom";

// const host = import.meta.env.VITE_HOST;

// const ZkLogin: React.FC = () => {
//   const navigate = useNavigate();

//   const handleZkLogin = async (credential: string) => {
//     try {
//       const userSalt = BigInt("12345678901234567890"); // Replace with secure dynamic salt in prod
//       const address = jwtToAddress(credential, userSalt);

//       // ✅ Save login state to localStorage
//       localStorage.setItem("zklogin_loggedin", "true");
//       localStorage.setItem("zkloginWallet", address);
//       localStorage.setItem("zkloginJWT", credential);

//       // ✅ Fire event to inform components like ProtectedRoute
//       window.dispatchEvent(new Event("zklogin-success"));

//       // ✅ Send user to backend
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

//       // ✅ Navigate using React Router
//       setTimeout(() => navigate("/"), 100); // instead of window.location.replace
//     } catch (err) {
//       console.error("❌ zkLogin failed:", err);
//     }
//   };

//   return (
//     <GoogleLogin
//       onSuccess={(response: CredentialResponse) => {
//         console.log("✅ Google login success:", response);
//         if (response.credential) {
//           handleZkLogin(response.credential);
//         } else {
//           console.error("❌ Missing credential field from Google");
//         }
//       }}
//       onError={() => {
//         console.error("❌ Google Login Failed (popup closed or blocked)");
//       }}
//     />
//   );
// };

// export default ZkLogin;








import type React from "react"
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google"
import { jwtToAddress } from "@mysten/sui/zklogin"
import { useNavigate } from "react-router-dom"

const host = import.meta.env.VITE_HOST

const ZkLogin: React.FC = () => {
  const navigate = useNavigate()

  const handleZkLogin = async (credential: string) => {
    try {
      const userSalt = BigInt("12345678901234567890") // Replace with secure dynamic salt in prod
      const address = jwtToAddress(credential, userSalt)

      console.log("🔐 [ZkLogin] Generated address:", address)

      // ✅ Save login state to localStorage
      localStorage.setItem("zklogin_loggedin", "true")
      localStorage.setItem("zkloginWallet", address)
      localStorage.setItem("zkloginJWT", credential)

      // ✅ Send user to backend
      const res = await fetch(`${host}/api/conversia/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sui_id: address,
          username: "zklogin_user",
        }),
      })

      const data = await res.json()
      console.log("✅ ZK user created or verified:", data)

      // ✅ Fire event to inform components like ProtectedRoute
      console.log("🎉 [ZkLogin] Dispatching zklogin-success event")
      window.dispatchEvent(new Event("zklogin-success"))

      // ✅ Add a small delay before navigation to ensure ProtectedRoute processes the event
      setTimeout(() => {
        console.log("🔄 [ZkLogin] Attempting navigation to /")
        navigate("/", { replace: true })
      }, 200)
    } catch (err) {
      console.error("❌ zkLogin failed:", err)
    }
  }

  return (
    <GoogleLogin
      onSuccess={(response: CredentialResponse) => {
        console.log("✅ Google login success:", response)
        if (response.credential) {
          handleZkLogin(response.credential)
        } else {
          console.error("❌ Missing credential field from Google")
        }
      }}
      onError={() => {
        console.error("❌ Google Login Failed (popup closed or blocked)")
      }}
    />
  )
}

export default ZkLogin


