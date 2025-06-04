// // import React, { useState, useEffect } from "react";
// // import { GoogleLogin } from "@react-oauth/google";
// // // import { jwtDecode } from "jwt-decode";
// // import { jwtToAddress } from "@mysten/sui/zklogin";

// // import bgImage from "../assets/landing-bg.jpg";
// // import logo from "../assets/conversia-lg.png";
// // import Wallet from "../components/Wallet";

// // // const ISSUER = "https://accounts.google.com";
// // // const AUDIENCE =
// // //   "990468881493-c98ech5p3srgtur82p33g6ckvdoucikn.apps.googleusercontent.com";
// // const HOST = import.meta.env.VITE_HOST;

// // const LandingPage: React.FC = () => {
// //   const [walletAddress, setWalletAddress] = useState<string | null>(null);

// //   useEffect(() => {
// //     const storedZk = localStorage.getItem("zkloginWallet");
// //     if (storedZk) setWalletAddress(storedZk);
// //   }, []);

// //   const handleZkLogin = async (credential: string) => {
// //     try {
// //       // const decoded = jwtDecode(credential);
// //       const userSalt = BigInt("12345678901234567890"); // ⚠️ Replace with secure logic in production

// //       const address = jwtToAddress(credential, userSalt);
// //       localStorage.setItem("zkloginWallet", address);
// //       localStorage.setItem("zkloginJWT", credential);
// //       setWalletAddress(address);

// //       await fetch(`${HOST}/api/conversia/users`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           sui_id: address,
// //           username: "zklogin_user",
// //         }),
// //       });

// //       window.location.href = "/";
// //     } catch (err) {
// //       console.error("zkLogin failed:", err);
// //     }
// //   };

// //   return (
// //     <div
// //       className="h-screen flex items-center justify-center bg-cover bg-center text-white"
// //       style={{ backgroundImage: `url(${bgImage})` }}
// //     >
// //       <div className="flex flex-col items-center">
// //         <img src={logo} alt="Conversia Logo" className="w-82 h-32 mb-6" />

// //         {!walletAddress ? (
// //           <div className="flex flex-col gap-3 items-center">
// //             <Wallet />
// //             <GoogleLogin
// //               onSuccess={(credentialResponse) => {
// //                 if (credentialResponse.credential) {
// //                   handleZkLogin(credentialResponse.credential);
// //                 }
// //               }}
// //               onError={() => console.log("Google Login Failed")}
// //             />
// //           </div>
// //         ) : (
// //           <p className="text-sm bg-white/10 px-4 py-2 rounded text-center">
// //             Using wallet:
// //             <br />
// //             <code className="text-xs break-all font-mono">{walletAddress}</code>
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LandingPage;

// // import React, { useState, useEffect } from "react";
// // import { GoogleLogin } from "@react-oauth/google";
// // import { jwtToAddress } from "@mysten/sui/zklogin";
// // import { useNavigate } from "react-router-dom";

// // import bgImage from "../assets/landing-bg.jpg";
// // import logo from "../assets/conversia-lg.png";
// // import Wallet from "../components/Wallet";

// // const HOST = import.meta.env.VITE_HOST;

// // const LandingPage: React.FC = () => {
// //   const [walletAddress, setWalletAddress] = useState<string | null>(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const storedZk = localStorage.getItem("zkloginWallet");
// //     if (storedZk) setWalletAddress(storedZk);
// //   }, []);

// //   const handleZkLogin = async (credential: string) => {
// //     try {
// //       const userSalt = BigInt("12345678901234567890"); // ⚠️ Replace with secure salt logic

// //       const address = jwtToAddress(credential, userSalt);
// //       localStorage.setItem("zkloginWallet", address);
// //       localStorage.setItem("zkloginJWT", credential);
// //       setWalletAddress(address);

// //       await fetch(`${HOST}/api/conversia/users`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           sui_id: address,
// //           username: "zklogin_user",
// //         }),
// //       });

// //       navigate("/"); // ✅ Proper redirect using React Router
// //     } catch (err) {
// //       console.error("zkLogin failed:", err);
// //     }
// //   };

// //   return (
// //     <div
// //       className="h-screen flex items-center justify-center bg-cover bg-center text-white"
// //       style={{ backgroundImage: `url(${bgImage})` }}
// //     >
// //       <div className="flex flex-col items-center">
// //         <img src={logo} alt="Conversia Logo" className="w-82 h-32 mb-6" />

// //         {!walletAddress ? (
// //           <div className="flex flex-col gap-3 items-center">
// //             <Wallet />
// //             <GoogleLogin
// //               onSuccess={(credentialResponse) => {
// //                 if (credentialResponse.credential) {
// //                   handleZkLogin(credentialResponse.credential);
// //                 }
// //               }}
// //               onError={() => console.log("Google Login Failed")}
// //             />
// //           </div>
// //         ) : (
// //           <p className="text-sm bg-white/10 px-4 py-2 rounded text-center">
// //             Using wallet:
// //             <br />
// //             <code className="text-xs break-all font-mono">{walletAddress}</code>
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LandingPage;

// import React from "react";
// import Wallet from "../components/Wallet";
// import ZkLogin from "../components/ZKLogin"; // ✅ Import this

// import bgImage from "../assets/landing-bg.jpg";
// import logo from "../assets/conversia-lg.png";

// const LandingPage: React.FC = () => {
//   return (
//     <div
//       className="h-screen flex items-center justify-center bg-cover bg-center text-white"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       <div className="flex flex-col items-center">
//         <img src={logo} alt="Conversia Logo" className="w-82 h-32 mb-6" />

//         <div className="flex flex-col gap-3 items-center">
//           <Wallet />
//           <ZkLogin /> {/* ✅ Add this */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  Wallet,
  Shield,
  Zap,
  Globe,
  Users,
  Sparkles,
  Twitter,
  PartyPopper,
} from "lucide-react";
import Wallets from "../components/Wallet";
import ZkLogin from "../components/ZKLogin";
import logo from "../assets/conversia-lg.png";



const ConversiaLanding = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "3D Avatar Conversations",
      description:
        "Engage with lifelike 3D avatars that respond with emotions, voice, and facial expressions",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "zkLogin Security",
      description:
        "Secure, privacy-preserving authentication using zero-knowledge proofs",
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Sui Wallet Integration",
      description:
        "Seamless blockchain integration with Sui-compatible wallets",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "NFT Ownership",
      description:
        "Own, trade, and customize your avatars as unique NFTs on Sui blockchain",
    },
  ];

  const stats = [
    { number: "$112", label: "AI Avatar" },
    { number: "100%", label: "Decentralized" },
    { number: "3D", label: "Immersive Experience" },
    { number: "∞", label: "Possibilities" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-800 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={logo} className="w-44 object-cover" />

              {/* <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                CONVERSIA
              </span> */}
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="hover:text-blue-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="hover:text-blue-400 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section
          className={`container mx-auto px-6 py-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered 3D
              </span>
              <br />
              <span className="text-white">Conversational Bot</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Experience the future of digital interaction with lifelike 3D
              avatars powered by blockchain technology. Own, customize, and
              trade your AI companions as NFTs on the Sui blockchain.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-col gap-6 justify-center items-center mb-16">
              <button className="group border-2 border-indigo-400 bg-blue-500  px-1 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Wallets />
              </button>

              <div className="flex items-center w-full max-w-xs text-white">
                <hr className="flex-grow border-t border-gray-500" />
                <span className="px-3 text-gray-300 text-sm font-medium">
                  or
                </span>
                <hr className="flex-grow border-t border-gray-500" />
              </div>

              <button className="group border-2 border-indigo-400 bg-white px-16 py-3 rounded-full font-semibold text-lg transition-all transform hover:scale-105 duration-300 flex items-center space-x-2">
                <ZkLogin />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Conversia?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unlike static chatbots, Conversia creates living, breathing
              digital companions that you truly own.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                  currentFeature === index
                    ? "bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 scale-105"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
                onMouseEnter={() => setCurrentFeature(index)}
              >
                <div
                  className={`mb-6 p-3 rounded-xl w-fit transition-colors ${
                    currentFeature === index
                      ? "bg-indigo-500/20 text-indigo-400"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="container mx-auto px-6 py-20">
          <div className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-3xl p-12 backdrop-blur-sm border border-white/10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">
                Powered by Cutting-Edge Technology
              </h2>
              <p className="text-xl text-gray-300">
                Built on the Sui blockchain for ultimate security and ownership
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Sui Blockchain</h3>
                <p className="text-gray-300">
                  Secure, fast, and scalable blockchain infrastructure for true
                  digital ownership
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Zero-Knowledge Login</h3>
                <p className="text-gray-300">
                  Privacy-preserving authentication that keeps your identity
                  secure
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">3D AI Avatars</h3>
                <p className="text-gray-300">
                  Emotionally intelligent avatars with realistic expressions and
                  voice
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="about" className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Our{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                  Vision
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                To revolutionize digital communication by creating AI companions
                that feel genuinely alive. We're building a future where your
                digital interactions are as meaningful as real-world
                conversations.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <span className="text-gray-300">
                    True digital ownership through NFTs
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">
                    Emotionally intelligent AI interactions
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">
                    Seamless blockchain integration
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-3xl flex items-center justify-center border border-white/10 backdrop-blur-sm">
                <div className="text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 text-indigo-400" />
                  <h3 className="text-2xl font-bold mb-2">5000 +</h3>
                  <p className="text-gray-300">Expected User by 2025</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center bg-gradient-to-r from-indigo-600/20 to-blue-600/20 rounded-3xl p-16 backdrop-blur-sm border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Meet Your{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                AI Companion?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join the future of digital interaction. Connect your wallet or use
              zkLogin to start your journey.
            </p>
            <div className="flex flex-col sm:flex-col gap-6 justify-center items-center mb-16">
              <button className="group border-2 border-indigo-400 bg-blue-500  px-1 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Wallets />
              </button>

              <div className="flex items-center w-full max-w-xs text-white">
                <hr className="flex-grow border-t border-gray-500" />
                <span className="px-3 text-gray-300 text-sm font-medium">
                  or
                </span>
                <hr className="flex-grow border-t border-gray-500" />
              </div>

              <button className="group border-2 border-indigo-400 bg-white px-16 py-3 rounded-full font-semibold text-lg transition-all transform hover:scale-105 duration-300 flex items-center space-x-2">
                <ZkLogin />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          id="contact"
          className="container mx-auto px-6 py-12 border-t border-white/20"
        >
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-3 mb-6">
              <img
                src={logo}
                className="w-60 object-cover"
                alt="Conversia Logo"
              />
            </div>

            {/* Tagline */}
            <p className="text-gray-400 mb-6">
              Building the future of AI interaction, one conversation at a time.
            </p>

            {/* Social Links */}
            <div className="flex justify-center space-x-8">
              <a
                href="https://x.com/Conversia__"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span>Follow our X</span>
              </a>
              <a
                href="https://discord.gg/EyvSgsPv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <PartyPopper className="w-5 h-5" />
                <span>Join Discord</span>
              </a>
              {/* <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Conversia Channel
              </a> */}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ConversiaLanding;
