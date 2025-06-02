import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtToAddress } from "@mysten/sui/zklogin";
import { useNavigate } from "react-router-dom";

const host = import.meta.env.VITE_HOST;

const ZkLogin: React.FC = () => {
  const navigate = useNavigate();

  // Google Login Success Handler
  const handleZkLogin = async (credential: string) => {
    try {
      const userSalt = BigInt("12345678901234567890"); // 🔒 Replace with real salt logic
      const address = jwtToAddress(credential, userSalt);

      // Create or verify user via backend
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

      // Redirect same as wallet
      navigate("/");
    } catch (err) {
      console.error("❌ zkLogin failed:", err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={(res) => {
        if (res.credential) handleZkLogin(res.credential);
      }}
      onError={() => console.log("Google Login Failed")}
    />
  );
};

export default ZkLogin;
