// src/pages/LandingPage.js
import React from "react";
import { getAuth, signOut } from "firebase/auth";

function LandingPage() {
  const auth = getAuth();

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #6EE7B7, #3B82F6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        flexDirection: "column",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
        🌟 Welcome to Your App!
      </h1>
      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        You’ve successfully logged in with Firebase Authentication.
      </p>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "white",
          color: "#3B82F6",
          border: "none",
          padding: "12px 30px",
          borderRadius: "30px",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#E0E7FF")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
      >
        Logout
      </button>
    </div>
  );
}

export default LandingPage;
