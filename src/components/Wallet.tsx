import React, { useEffect } from "react";
import { useWallet, ConnectButton, addressEllipsis } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { useNavigate } from "react-router-dom";

const Wallet: React.FC = () => {
  const wallet = useWallet();
  const navigate = useNavigate();
  const HOST = process.env.HOST || "http://localhost:5555";

  useEffect(() => {
    const createUserAndRedirect = async () => {
      if (wallet.status === "connected" && wallet.account?.address) {
        try {
          // Send user info to backend
          const res = await fetch(`${HOST}/api/conversia/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sui_id: wallet.account.address,
              username: addressEllipsis(wallet.account.address),
            }),
          });

          const data = await res.json();
          console.log("✅ User created or already exists:", data);

          // Redirect to main app page
          navigate("/");
        } catch (error) {
          console.error("❌ Failed to create user or redirect:", error);
        }
      }
    };

    createUserAndRedirect();
  }, [wallet.status, wallet.account, navigate]);

  return (
    <div className="text-white px-4 py-2 rounded-lg z-[50]">
      <ConnectButton />
      <p className="text-center">Wallet Status: {wallet.status}</p>
    </div>
  );
};

export default Wallet;
