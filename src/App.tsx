// import React, { useState, useEffect, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { Experience } from "./components/Experience";
// import Header from "./components/Header";
// import bgImage from "./assets/conversia-bg.png";
// import { MouthCue } from "./components/Avatar";
// import { motion, AnimatePresence } from "framer-motion";
// import { useWallet } from "@suiet/wallet-kit";
// import { MobileChatFrame } from "./components/MobileChatFrame";

// type Message = {
//   message: string;
//   sender: string;
//   direction: "incoming" | "outgoing";
// };

// type InterviewProps = {
//   interview_prompt: string | undefined;
// };

// type ChatHistoryItem = {
//   message: string;
//   sender: "user" | "system";
// };

// const App: React.FC<InterviewProps> = () => {
//   const wallet = useWallet();
//   const [modelId, setModelId] = useState<number>(1);
//   const [userId, setUserId] = useState<number>();
//   const [currentExpression, setCurrentExpression] = useState<string | null>(
//     null
//   );
//   const [modelUrl, setModelUrl] = useState<string>("/models/girl1.glb"); // default avatar
//   const [backgroundUrl, setBackgroundUrl] = useState<string>(bgImage); // use default bg as fallback
//   const storedBypass = localStorage.getItem("bypassWallet");
//   const walletAddress = wallet.account?.address ?? storedBypass;
//   const host = import.meta.env.VITE_HOST;

//   // Hide intro after animation finishes
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowIntro(false);
//     }, 3500); // typing duration + slide

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const ensureUserExists = async () => {
//       const walletAddress = wallet.account?.address;
//       if (!walletAddress) return;

//       try {
//         // Create or get user by wallet address
//         const res = await fetch(`${host}/api/conversia/users`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             sui_id: walletAddress,
//             username: "anonymous", // or get username from somewhere else
//           }),
//         });

//         const data = await res.json();
//         if (data.user?.user_id) {
//           setUserId(data.user.user_id);
//         }
//       } catch (err) {
//         console.error("Failed to ensure user:", err);
//       }
//     };

//     // if (wallet.status === "connected") {
//     //   ensureUserExists();
//     // }
//     if (walletAddress) {
//       ensureUserExists();
//     }
//   }, [wallet]);

//   useEffect(() => {
//     const loadChatHistory = async () => {
//       if (!userId || !modelId) return;

//       try {
//         const res = await fetch(
//           `${host}/api/conversia/chat-history/${userId}/${modelId}`
//         );
//         const data = await res.json();

//         const formatted = (data as ChatHistoryItem[]).map(
//           (msg): Message => ({
//             message: msg.message,
//             sender: msg.sender === "user" ? "Aku" : "Maya",
//             direction: msg.sender === "user" ? "outgoing" : "incoming",
//           })
//         );

//         setMessages(formatted);
//       } catch (error) {
//         console.error("Failed to load chat history:", error);
//       }
//     };

//     loadChatHistory();
//   }, [userId, modelId]);

//   const [currentAnimation, setCurrentAnimation] = useState<string | null>(null);
//   const [currentMouthCues, setCurrentMouthCues] = useState<MouthCue[]>([]);
//   const [audioDuration, setAudioDuration] = useState<number>(0);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [userInput, setUserInput] = useState("");
//   const [typingText, setTypingText] = useState("");
//   const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
//     null
//   );
//   const [loadingTranscription, setLoadingTranscription] = useState(false);
//   const [showIntro, setShowIntro] = useState(true);
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   const handleSend = async () => {
//     if (!userInput.trim()) return;

//     const newMessage: Message = {
//       message: userInput,
//       direction: "outgoing",
//       sender: "Aku",
//     };

//     const newMessages = [...messages, newMessage];

//     setMessages(newMessages);
//     setUserInput("");
//     setIsTyping(true);

//     await processMessageToChatGPT(newMessages);
//   };

//   async function processMessageToChatGPT(chatMessages: Message[]) {
//     try {
//       const lastMessage = chatMessages[chatMessages.length - 1];

//       const response = await fetch(
//         `${host}/api/conversia/chat-history/${userId}/${modelId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             message: lastMessage.message,
//             sender: "user",
//           }),
//         }
//       );

//       const data = await response.json();
//       const fullText = data.system?.message || "Maya belum bicara ya...";
//       const soundDuration = data.system?.lipsync?.metadata?.duration || 2;
//       const mouthCues = data.system?.lipsync?.mouthCues || [];
//       const facialExpression = data.system?.facialExpression || "default";
//       const animation = data.system?.animation || "Idle";
//       const audioUrl = `${host}/audios/response.mp3`;

//       setTypingText("");
//       setCurrentExpression(facialExpression);
//       setCurrentAnimation(animation);
//       setCurrentMouthCues(mouthCues);
//       setAudioDuration(soundDuration * 1000);
//       setIsTyping(true);

//       // Play audio if enabled
//       let audioDuration = 0;
//       if (isSpeechEnabled && audioUrl) {
//         try {
//           const freshAudioUrl = `${audioUrl}?t=${new Date().getTime()}`;
//           const audioResponse = await fetch(freshAudioUrl);
//           const audioBlob = await audioResponse.blob();
//           const audioObjectUrl = URL.createObjectURL(audioBlob);
//           const audio = new Audio(audioObjectUrl);

//           audio.onplay = () => setIsSpeaking(true);
//           audio.onended = () => setIsSpeaking(false);

//           await new Promise((resolve) => {
//             audio.onloadedmetadata = () => {
//               const safeDuration = audio.duration * 1000;
//               setAudioDuration(safeDuration);
//               resolve(audio.play());
//             };
//           });
//           await audio.play();
//           audioDuration = audio.duration * 1000 || 2000;
//         } catch (err) {
//           console.error("Error playing audio:", err);
//         }
//       }

//       // Typing effect
//       const duration = audioDuration || fullText.length * 50;
//       const interval = duration / fullText.length;

//       let index = 0;
//       let lastTime = performance.now();

//       const typeChar = (time: number) => {
//         if (time - lastTime >= interval && index < fullText.length) {
//           setTypingText((prev) => prev + fullText.charAt(index));
//           index++;
//           lastTime = time;
//         }

//         if (index < fullText.length) {
//           requestAnimationFrame(typeChar);
//         } else {
//           const aiMessage: Message = {
//             message: fullText,
//             sender: "Maya",
//             direction: "incoming",
//           };
//           setMessages((prev) => [...prev, aiMessage]);
//           setTypingText("");
//           setIsTyping(false);
//         }
//       };

//       requestAnimationFrame(typeChar);
//     } catch (error) {
//       console.error("Error talking to backend:", error);
//       setIsTyping(false);
//     }
//   }

//   const toggleSpeech = () => {
//     setIsSpeechEnabled(!isSpeechEnabled);
//   };

//   const toggleRecording = async () => {
//     if (isRecording) {
//       mediaRecorder?.stop();
//       setIsRecording(false);
//     } else {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//         });
//         const recorder = new MediaRecorder(stream);
//         const audioChunks: Blob[] = [];

//         recorder.ondataavailable = (event) => {
//           audioChunks.push(event.data);
//         };

//         recorder.onstop = async () => {
//           const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
//           const formData = new FormData();
//           formData.append("audio", audioBlob, "recording.webm");

//           try {
//             setLoadingTranscription(true); // === ADD THIS ===

//             const response = await fetch(
//               `${host}/api/conversia/speech-to-text/${userId}/${modelId}`,
//               {
//                 method: "POST",
//                 body: formData,
//               }
//             );

//             const data = await response.json();

//             if (data?.system?.message) {
//               // Push user and system messages
//               const newMessage: Message = {
//                 message: data.user.message,
//                 direction: "outgoing",
//                 sender: "Aku",
//               };
//               const systemMessage: Message = {
//                 message: data.system.message,
//                 direction: "incoming",
//                 sender: "Maya",
//               };

//               setMessages((prev) => [...prev, newMessage, systemMessage]);
//               setCurrentExpression(data.system.facialExpression || "default");
//               setCurrentAnimation(data.system.animation || "Talking_1");
//               setCurrentMouthCues(data.system.lipsync?.mouthCues || []);
//               setAudioDuration(
//                 data.system.lipsync?.metadata?.duration * 1000 || 2000
//               );

//               // Play audio
//               if (isSpeechEnabled && data.system.audio) {
//                 const audioBlob = new Blob(
//                   [
//                     Uint8Array.from(atob(data.system.audio), (c) =>
//                       c.charCodeAt(0)
//                     ),
//                   ],
//                   { type: "audio/mpeg" }
//                 );
//                 const audioUrl = URL.createObjectURL(audioBlob);
//                 const audio = new Audio(audioUrl);
//                 audio.onplay = () => setIsSpeaking(true);
//                 audio.onended = () => setIsSpeaking(false);
//                 await audio.play();
//               }
//             }
//           } catch (err) {
//             console.error("Speech-to-Text failed:", err);
//           } finally {
//             setLoadingTranscription(false); // === ADD THIS ===
//           }
//         };

//         recorder.start();
//         setMediaRecorder(recorder);
//         setIsRecording(true);
//       } catch (err) {
//         console.error("Failed to start recording:", err);
//       }
//     }
//   };

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, typingText]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     handleResize(); // initialize on mount
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       <AnimatePresence>
//         {showIntro && (
//           <motion.div
//             className="fixed inset-0 bg-black flex justify-center items-center z-[1001]"
//             initial={{ y: 0 }}
//             animate={{ y: 0 }}
//             exit={{ y: "-100%" }}
//             transition={{ duration: 1 }}
//           >
//             <h1 className="text-blue-500 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold typing-effect">
//               Conversia
//             </h1>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div
//         className="h-screen w-full flex flex-col overflow-hidden"
//         style={{
//           backgroundImage: `url(${backgroundUrl})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           transition: "background-image 0.5s ease",
//         }}
//       >
//         <Header
//           setModelUrl={setModelUrl}
//           setBackgroundUrl={setBackgroundUrl}
//           setModelId={setModelId}
//           userId={userId!}
//         />

//         {isMobile && (
//           <MobileChatFrame
//             expression={currentExpression}
//             animation={currentAnimation}
//             mouthCues={currentMouthCues}
//             audioDuration={audioDuration}
//             modelUrl={modelUrl}
//             messages={messages}
//             isChatOpen={isChatOpen}
//             setIsChatOpen={setIsChatOpen}
//             typingText={typingText}
//             isTyping={isTyping}
//             userInput={userInput}
//             setUserInput={setUserInput}
//             handleSend={handleSend}
//             isSpeechEnabled={isSpeechEnabled}
//             toggleSpeech={toggleSpeech}
//             isSpeaking={isSpeaking}
//             isRecording={isRecording}
//             toggleRecording={toggleRecording}
//             loadingTranscription={loadingTranscription}
//           />
//         )}

//         {/* ===== Render DESKTOP layout only if not mobile ===== */}
//         {!isMobile && (
//           <div className="flex-1 flex">
//             <div className="w-full h-full relative">
//               {/* Desktop Avatar */}
//               <div className="absolute left-0 bottom-0 w-full md:w-[50vw] h-full z-0 bg-transparent">
//                 <Canvas
//                   shadows
//                   camera={{ position: [0, -0.5, 1], fov: 10 }}
//                   style={{ width: "100%", height: "100%" }}
//                   gl={{ alpha: true, preserveDrawingBuffer: true }}
//                 >
//                   <Experience
//                     expression={currentExpression}
//                     animation={currentAnimation}
//                     mouthCues={currentMouthCues}
//                     audioDuration={audioDuration}
//                     modelUrl={modelUrl}
//                   />
//                 </Canvas>
//               </div>

//               {/* Desktop Chat Frame */}
//               <div
//                 className="absolute top-0 left-[55%] w-[43%] z-30 overflow-y-auto space-y-4 px-4 pt-4 pb-[4vh]"
//                 style={{
//                   top: "96px",
//                   height: "calc(100% - 160px)",
//                   scrollbarWidth: "thin",
//                   scrollbarColor: "#FFFFFF transparent",
//                   scrollPaddingBottom: "2vh",
//                 }}
//               >
//                 {messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`flex ${
//                       msg.direction === "outgoing"
//                         ? "justify-end"
//                         : "justify-start"
//                     }`}
//                   >
//                     <div
//                       className={`max-w-[80%] sm:max-w-[70%] md:max-w-[60%] p-3 rounded-xl text-base sm:text-lg ${
//                         msg.sender === "Maya"
//                           ? "bg-white text-gray-900"
//                           : "bg-blue-600 text-white"
//                       }`}
//                     >
//                       {msg.message}
//                     </div>
//                   </div>
//                 ))}

//                 {isTyping && (
//                   <div className="flex justify-start">
//                     <div className="bg-white p-3 rounded-xl text-lg flex items-center gap-1 min-h-[40px]">
//                       {typingText || (
//                         <div className="flex items-center space-x-1">
//                           <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
//                           <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
//                           <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {loadingTranscription && (
//                   <div className="flex justify-center py-4">
//                     <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//                   </div>
//                 )}

//                 <div ref={bottomRef} className="scroll-mb-[72px]" />
//               </div>
//             </div>
//           </div>
//         )}

//         {!isMobile && (
//           <div className="absolute z-40 bottom-4 left-4 right-4 md:right-10 md:left-auto md:w-[43%] chats input-container bg-gray-800 bg-opacity-90 h-[60px] sm:h-[64px] flex items-center rounded-full px-4">
//             <input
//               type="text"
//               value={userInput}
//               onChange={(e) => setUserInput(e.target.value)}
//               placeholder="Start typing ..."
//               className="border-none bg-transparent w-full text-white placeholder-white placeholder-opacity-70 text-2xl focus:outline-none px-4 py-2"
//               onKeyPress={(e) => {
//                 if (e.key === "Enter") {
//                   handleSend();
//                 }
//               }}
//               style={{
//                 paddingLeft: "50px",
//                 paddingTop: "4px",
//               }}
//             />

//             <div className="flex gap-4 items-center">
//               {/* Recording button */}
//               <span
//                 className={`text-white text-4xl cursor-pointer transition-opacity duration-300 ${
//                   isRecording ? "text-red-500 animate-pulse" : "opacity-50"
//                 }`}
//                 onClick={toggleRecording}
//               >
//                 🎙️
//               </span>

//               {/* Text-to-Speech toggle */}
//               <span
//                 className={`text-white text-4xl cursor-pointer transition-opacity duration-300 ${
//                   isSpeechEnabled ? "opacity-100" : "opacity-50"
//                 } ${isSpeaking ? "animate-pulse" : ""}`}
//                 onClick={toggleSpeech}
//               >
//                 🔈
//               </span>

//               {/* Recording Status */}
//               {isRecording && (
//                 <div className="flex items-center ml-2 animate-pulse">
//                   <span className="text-red-500 text-2xl">🎤</span>
//                   <span className="text-red-500 font-semibold ml-2">
//                     Recording...
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default App;



"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Experience } from "./components/Experience"
import Header from "./components/Header"
import bgImage from "./assets/conversia-bg.png"
import type { MouthCue } from "./components/Avatar"
import { motion, AnimatePresence } from "framer-motion"
import { useWallet } from "@suiet/wallet-kit"
import { MobileChatFrame } from "./components/MobileChatFrame"

type Message = {
  message: string
  sender: string
  direction: "incoming" | "outgoing"
}

type InterviewProps = {
  interview_prompt: string | undefined
}

type ChatHistoryItem = {
  message: string
  sender: "user" | "system"
}

const App: React.FC<InterviewProps> = () => {
  const wallet = useWallet()
  const [modelId, setModelId] = useState<number>(1)
  const [userId, setUserId] = useState<number>()
  const [currentExpression, setCurrentExpression] = useState<string | null>(null)
  const [modelUrl, setModelUrl] = useState<string>("/models/girl1.glb")
  const [backgroundUrl, setBackgroundUrl] = useState<string>(bgImage)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isZkLogin, setIsZkLogin] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false)
  const host = import.meta.env.VITE_HOST

  // Animation and UI states
  const [currentAnimation, setCurrentAnimation] = useState<string | null>(null)
  const [currentMouthCues, setCurrentMouthCues] = useState<MouthCue[]>([])
  const [audioDuration, setAudioDuration] = useState<number>(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [typingText, setTypingText] = useState("")
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [loadingTranscription, setLoadingTranscription] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // Simplified wallet resolution
  // const resolveWalletAddress = (): string | null => {
  //   return wallet.account?.address || localStorage.getItem("zkloginWallet") || localStorage.getItem("bypassWallet")
  // }

  const resolveWalletAddress = (): string | null => {
    if (wallet.account?.address) return wallet.account.address;
    if (localStorage.getItem("zkloginWallet")) {
      setIsZkLogin(true); // Mark as zkLogin user
      return localStorage.getItem("zkloginWallet");
    }
    return localStorage.getItem("bypassWallet");
  };

  // Initialize wallet address and user
  useEffect(() => {
    const initializeApp = async () => {
      const address = resolveWalletAddress()
      console.log("🔍 Resolved wallet address:", address)

      if (address?.startsWith("0x")) {
        setWalletAddress(address)
        await createOrGetUser(address)
      }

      setIsInitialized(true)
    }

    initializeApp()

    // Listen for zkLogin success events
    const handleZkLoginSuccess = () => {
      console.log("🎉 zkLogin success event received")
      initializeApp()
    }

    window.addEventListener("zklogin-success", handleZkLoginSuccess)
    return () => window.removeEventListener("zklogin-success", handleZkLoginSuccess)
  }, [wallet.account?.address])

  useEffect(() => {
    if (isZkLogin && !userId) {
      console.log("🔑 Initializing zkLogin session");
      const address = localStorage.getItem("zkloginWallet");
      if (address) createOrGetUser(address);
    }
  }, [isZkLogin, userId]);

  // Create or get user from backend
  const createOrGetUser = async (address: string) => {
    try {
      console.log("👤 Creating/fetching user for address:", address)

      const res = await fetch(`${host}/api/conversia/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sui_id: address,
          username: address.startsWith("0x") ? `user_${address.slice(2, 8)}` : "anonymous",
        }),
      })

      const data = await res.json()
      console.log("📨 User response:", data)

      if (data.user?.user_id) {
        const newUserId = data.user.user_id
        setUserId(newUserId)
        localStorage.setItem("userId", newUserId.toString())
        console.log("✅ User ID set:", newUserId)

        // Force a small delay to ensure state is updated before chat history loads
        setTimeout(() => {
          console.log("🔄 Triggering chat history load after userId update")
        }, 100)
      }
    } catch (err) {
      console.error("❌ Failed to create/get user:", err)
    }
  }

  // Load chat history when userId and modelId are available
  useEffect(() => {
    const loadChatHistory = async () => {
      if (!userId || !modelId) {
        console.log("⏭️ Skipping chat history load - missing userId or modelId", { userId, modelId })
        return
      }

      try {
        console.log("📥 Loading chat history for user:", userId, "model:", modelId)

        const res = await fetch(`${host}/api/conversia/chat-history/${userId}/${modelId}`)

        if (!res.ok) {
          console.error("❌ Chat history fetch failed:", res.status)
          return
        }

        const data = await res.json()
        console.log("📨 Chat history loaded:", data)

        if (Array.isArray(data)) {
          const formatted = data.map(
            (msg: ChatHistoryItem): Message => ({
              message: msg.message,
              sender: msg.sender === "user" ? "Aku" : "Maya",
              direction: msg.sender === "user" ? "outgoing" : "incoming",
            }),
          )

          setMessages(formatted)
          console.log("✅ Chat history formatted and set")
        }
      } catch (error) {
        console.error("❌ Failed to load chat history:", error)
      }
    }

    // Increase delay to ensure userId state is properly set
    const timeout = setTimeout(loadChatHistory, 500)
    return () => clearTimeout(timeout)
  }, [userId, modelId])

  // Hide intro after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  // Handle mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typingText])

  const handleSend = async () => {
    if (!userInput.trim() || !userId) return

    const newMessage: Message = {
      message: userInput,
      direction: "outgoing",
      sender: "Aku",
    }

    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
    setUserInput("")
    setIsTyping(true)

    await processMessageToChatGPT(newMessages)
  }

  const processMessageToChatGPT = async (chatMessages: Message[]) => {
    try {
      const lastMessage = chatMessages[chatMessages.length - 1]

      const response = await fetch(`${host}/api/conversia/chat-history/${userId}/${modelId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: lastMessage.message,
          sender: "user",
        }),
      })

      const data = await response.json()
      const fullText = data.system?.message || "Maya belum bicara ya..."
      const soundDuration = data.system?.lipsync?.metadata?.duration || 2
      const mouthCues = data.system?.lipsync?.mouthCues || []
      const facialExpression = data.system?.facialExpression || "default"
      const animation = data.system?.animation || "Idle"
      const audioUrl = `${host}/audios/response.mp3`

      setTypingText("")
      setCurrentExpression(facialExpression)
      setCurrentAnimation(animation)
      setCurrentMouthCues(mouthCues)
      setAudioDuration(soundDuration * 1000)
      setIsTyping(true)

      // Play audio if enabled
      let audioDuration = 0
      if (isSpeechEnabled && audioUrl) {
        try {
          const freshAudioUrl = `${audioUrl}?t=${new Date().getTime()}`
          const audioResponse = await fetch(freshAudioUrl)
          const audioBlob = await audioResponse.blob()
          const audioObjectUrl = URL.createObjectURL(audioBlob)
          const audio = new Audio(audioObjectUrl)

          audio.onplay = () => setIsSpeaking(true)
          audio.onended = () => setIsSpeaking(false)

          await new Promise((resolve) => {
            audio.onloadedmetadata = () => {
              const safeDuration = audio.duration * 1000
              setAudioDuration(safeDuration)
              resolve(audio.play())
            }
          })
          await audio.play()
          audioDuration = audio.duration * 1000 || 2000
        } catch (err) {
          console.error("Error playing audio:", err)
        }
      }

      // Typing effect
      const duration = audioDuration || fullText.length * 50
      const interval = duration / fullText.length

      let index = 0
      let lastTime = performance.now()

      const typeChar = (time: number) => {
        if (time - lastTime >= interval && index < fullText.length) {
          setTypingText((prev) => prev + fullText.charAt(index))
          index++
          lastTime = time
        }

        if (index < fullText.length) {
          requestAnimationFrame(typeChar)
        } else {
          const aiMessage: Message = {
            message: fullText,
            sender: "Maya",
            direction: "incoming",
          }
          setMessages((prev) => [...prev, aiMessage])
          setTypingText("")
          setIsTyping(false)
        }
      }

      requestAnimationFrame(typeChar)
    } catch (error) {
      console.error("Error talking to backend:", error)
      setIsTyping(false)
    }
  }

  const toggleSpeech = () => {
    setIsSpeechEnabled(!isSpeechEnabled)
  }

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorder?.stop()
      setIsRecording(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        const audioChunks: Blob[] = []

        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data)
        }

        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" })
          const formData = new FormData()
          formData.append("audio", audioBlob, "recording.webm")

          try {
            setLoadingTranscription(true)

            const response = await fetch(`${host}/api/conversia/speech-to-text/${userId}/${modelId}`, {
              method: "POST",
              body: formData,
            })

            const data = await response.json()

            if (data?.system?.message) {
              const newMessage: Message = {
                message: data.user.message,
                direction: "outgoing",
                sender: "Aku",
              }
              const systemMessage: Message = {
                message: data.system.message,
                direction: "incoming",
                sender: "Maya",
              }

              setMessages((prev) => [...prev, newMessage, systemMessage])
              setCurrentExpression(data.system.facialExpression || "default")
              setCurrentAnimation(data.system.animation || "Talking_1")
              setCurrentMouthCues(data.system.lipsync?.mouthCues || [])
              setAudioDuration(data.system.lipsync?.metadata?.duration * 1000 || 2000)

              if (isSpeechEnabled && data.system.audio) {
                const audioBlob = new Blob([Uint8Array.from(atob(data.system.audio), (c) => c.charCodeAt(0))], {
                  type: "audio/mpeg",
                })
                const audioUrl = URL.createObjectURL(audioBlob)
                const audio = new Audio(audioUrl)
                audio.onplay = () => setIsSpeaking(true)
                audio.onended = () => setIsSpeaking(false)
                await audio.play()
              }
            }
          } catch (err) {
            console.error("Speech-to-Text failed:", err)
          } finally {
            setLoadingTranscription(false)
          }
        }

        recorder.start()
        setMediaRecorder(recorder)
        setIsRecording(true)
      } catch (err) {
        console.error("Failed to start recording:", err)
      }
    }
  }

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
          <p>🔄 Initializing your session...</p>
        </div>
      </div>
    )
  }

  // Show error state if no wallet found
  if (!walletAddress) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-red-400 mb-4">❌ No wallet address found</p>
          <p className="text-sm opacity-70">Please connect your wallet or use Google login</p>
        </div>
      </div>
    )
  }

  // Show loading state while fetching user
  if (!userId) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
          <p>👤 Setting up your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 bg-black flex justify-center items-center z-[1001]"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-blue-500 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold typing-effect">
              Conversia
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="h-screen w-full flex flex-col overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.5s ease",
        }}
      >
        <Header setModelUrl={setModelUrl} setBackgroundUrl={setBackgroundUrl} setModelId={setModelId} userId={userId} />

        {isMobile && (
          <MobileChatFrame
            expression={currentExpression}
            animation={currentAnimation}
            mouthCues={currentMouthCues}
            audioDuration={audioDuration}
            modelUrl={modelUrl}
            messages={messages}
            isChatOpen={isChatOpen}
            setIsChatOpen={setIsChatOpen}
            typingText={typingText}
            isTyping={isTyping}
            userInput={userInput}
            setUserInput={setUserInput}
            handleSend={handleSend}
            isSpeechEnabled={isSpeechEnabled}
            toggleSpeech={toggleSpeech}
            isSpeaking={isSpeaking}
            isRecording={isRecording}
            toggleRecording={toggleRecording}
            loadingTranscription={loadingTranscription}
          />
        )}

        {!isMobile && (
          <div className="flex-1 flex">
            <div className="w-full h-full relative">
              {/* Desktop Avatar */}
              <div className="absolute left-0 bottom-0 w-full md:w-[50vw] h-full z-0 bg-transparent">
                <Canvas
                  shadows
                  camera={{ position: [0, -0.5, 1], fov: 10 }}
                  style={{ width: "100%", height: "100%" }}
                  gl={{ alpha: true, preserveDrawingBuffer: true }}
                >
                  <Experience
                    expression={currentExpression}
                    animation={currentAnimation}
                    mouthCues={currentMouthCues}
                    audioDuration={audioDuration}
                    modelUrl={modelUrl}
                  />
                </Canvas>
              </div>

              {/* Desktop Chat Frame */}
              <div
                className="absolute top-0 left-[55%] w-[43%] z-30 overflow-y-auto space-y-4 px-4 pt-4 pb-[4vh]"
                style={{
                  top: "96px",
                  height: "calc(100% - 160px)",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#FFFFFF transparent",
                  scrollPaddingBottom: "2vh",
                }}
              >
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.direction === "outgoing" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] sm:max-w-[70%] md:max-w-[60%] p-3 rounded-xl text-base sm:text-lg ${
                        msg.sender === "Maya" ? "bg-white text-gray-900" : "bg-blue-600 text-white"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-xl text-lg flex items-center gap-1 min-h-[40px]">
                      {typingText || (
                        <div className="flex items-center space-x-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {loadingTranscription && (
                  <div className="flex justify-center py-4">
                    <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                  </div>
                )}

                <div ref={bottomRef} className="scroll-mb-[72px]" />
              </div>
            </div>
          </div>
        )}

        {!isMobile && (
          <div className="absolute z-40 bottom-4 left-4 right-4 md:right-10 md:left-auto md:w-[43%] chats input-container bg-gray-800 bg-opacity-90 h-[60px] sm:h-[64px] flex items-center rounded-full px-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Start typing ..."
              className="border-none bg-transparent w-full text-white placeholder-white placeholder-opacity-70 text-2xl focus:outline-none px-4 py-2"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSend()
                }
              }}
              style={{
                paddingLeft: "50px",
                paddingTop: "4px",
              }}
            />

            <div className="flex gap-4 items-center">
              <span
                className={`text-white text-4xl cursor-pointer transition-opacity duration-300 ${
                  isRecording ? "text-red-500 animate-pulse" : "opacity-50"
                }`}
                onClick={toggleRecording}
              >
                🎙️
              </span>

              <span
                className={`text-white text-4xl cursor-pointer transition-opacity duration-300 ${
                  isSpeechEnabled ? "opacity-100" : "opacity-50"
                } ${isSpeaking ? "animate-pulse" : ""}`}
                onClick={toggleSpeech}
              >
                🔈
              </span>

              {isRecording && (
                <div className="flex items-center ml-2 animate-pulse">
                  <span className="text-red-500 text-2xl">🎤</span>
                  <span className="text-red-500 font-semibold ml-2">Recording...</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
