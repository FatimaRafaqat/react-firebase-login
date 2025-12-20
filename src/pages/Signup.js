import { useState } from "react";
import { auth } from "../firebaseConfig";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
  e.preventDefault();
  try {
    await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    alert("✅ Account create successfully!");
  } catch (err) {
    alert("❌ Signup failed");
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
