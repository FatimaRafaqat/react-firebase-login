import express from "express";
import admin from "firebase-admin";
import client from "prom-client";
import cors from "cors";
import fs from "fs";
import path from "path";

// Read the Firebase service account JSON
const serviceAccountPath = path.resolve('./serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Prometheus metric
const loginCounter = new client.Counter({
  name: "user_login_total",
  help: "Total number of logins",
});

// Signup API
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await admin.auth().createUser({ email, password });
    await db.collection("users").doc(user.uid).set({
      email,
      createdAt: new Date(),
    });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login API (tracking)
app.post("/api/login", async (req, res) => {
  loginCounter.inc();
  res.json({ message: "Login counted" });
});

// Metrics endpoint for Prometheus
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// Start the server
app.listen(5000, () => console.log("Backend running on port 5000"));
