import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebaseConfig";
import LandingPage from "./pages/LandingPage";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/landing");
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/landing");
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  useEffect(() => {
    const testFirestore = async () => {
      try {
        const snapshot = await getDocs(collection(db, "test"));
        console.log("✅ Firestore connected! Documents:", snapshot.docs.length);
      } catch (error) {
        console.error("❌ Firestore connection failed:", error);
      }
    };
    testFirestore();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "Poppins, sans-serif" }}>
      <h2>🔐 Login to Continue</h2>
      <form style={{ marginTop: "20px" }}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", margin: "5px", width: "250px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", margin: "5px", width: "250px" }}
        />
        <br />
        <button onClick={handleLogin} style={{ padding: "10px 20px", margin: "5px" }}>
          Login
        </button>
        <button onClick={handleRegister} style={{ padding: "10px 20px", margin: "5px" }}>
          Register
        </button>
      </form>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
