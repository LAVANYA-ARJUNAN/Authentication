const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://lavanya:lavu@cluster0.jd6lcuu.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

let usersCollection;

async function initDB() {
  try {
    await client.connect();
    const db = client.db("authdb");
    usersCollection = db.collection("users");
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

initDB();


app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields required" });
    }

    const existing = await usersCollection.findOne({ email: email.trim() });
    if (existing) return res.json({ success: false, message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ name, email: email.trim(), password: hashed });

    res.json({ success: true, message: "Registration successful" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ success: false, message: "Email and password required" });

    const user = await usersCollection.findOne({ email: email.trim() });
    if (!user) return res.json({ success: false, message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.json({ success: false, message: "Invalid credentials" });

    res.json({ success: true, message: `Welcome ${user.name}!` });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res.json({ success: false, message: "Email and new password required" });

    const user = await usersCollection.findOne({ email: email.trim() });
    if (!user) return res.json({ success: false, message: "Email not registered" });

    const hashed = await bcrypt.hash(newPassword, 10);

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(user._id) },
      { $set: { password: hashed } }
    );

    console.log("Reset password result:", result);

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
