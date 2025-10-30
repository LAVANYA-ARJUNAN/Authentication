import React, { useState } from "react";

function ForgotPassword({ onReset }) {
  const [email, setEmail] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      alert("Password reset link sent (mock)!");
      onReset();
    } else {
      alert("Email not found!");
    }
  };

  return (
    <form onSubmit={handleForgot}>
      <h3 className="text-center mb-3">Forgot Password</h3>
      <input className="form-control mb-3" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button className="btn btn-dark w-100">Send Reset Link</button>
    </form>
  );
}

export default ForgotPassword;
