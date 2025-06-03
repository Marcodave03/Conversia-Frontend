import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import { WalletProvider } from "@suiet/wallet-kit";
import ProtectedRoute from './components/ProtectedRoute';
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "990468881493-c98ech5p3srgtur82p33g6ckvdoucikn.apps.googleusercontent.com";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <WalletProvider>
        <Router>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <App interview_prompt="You are my girlfriend" />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </WalletProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
