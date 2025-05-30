import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { jwtToAddress } from "@mysten/sui/zklogin";

import bgImage from "../assets/landing-bg.jpg";
import logo from "../assets/conversia-lg.png";
import Wallet from "../components/Wallet";

const ISSUER = "https://accounts.google.com";
const AUDIENCE =
  "990468881493-c98ech5p3srgtur82p33g6ckvdoucikn.apps.googleusercontent.com";
const HOST = import.meta.env.VITE_HOST;

const LandingPage: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const storedZk = localStorage.getItem("zkloginWallet");
    if (storedZk) setWalletAddress(storedZk);
  }, []);

  const handleZkLogin = async (credential: string) => {
    try {
      const decoded = jwtDecode(credential);
      const userSalt = "fixedSalt123"; // ⚠️ Replace with secure logic in production

      const address = jwtToAddress(credential, userSalt);
      localStorage.setItem("zkloginWallet", address);
      localStorage.setItem("zkloginJWT", credential);
      setWalletAddress(address);

      await fetch(`${HOST}/api/conversia/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sui_id: address,
          username: "zklogin_user",
        }),
      });

      window.location.href = "/";
    } catch (err) {
      console.error("zkLogin failed:", err);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col items-center">
        <img src={logo} alt="Conversia Logo" className="w-82 h-32 mb-6" />

        {!walletAddress ? (
          <div className="flex flex-col gap-3 items-center">
            <Wallet />
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  handleZkLogin(credentialResponse.credential);
                }
              }}
              onError={() => console.log("Google Login Failed")}
            />
          </div>
        ) : (
          <p className="text-sm bg-white/10 px-4 py-2 rounded text-center">
            Using wallet:
            <br />
            <code className="text-xs break-all font-mono">{walletAddress}</code>
          </p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
