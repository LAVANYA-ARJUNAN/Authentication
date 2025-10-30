import React, { useState } from "react";

function ResetPassword({ onLogin }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgClass, setMsgClass] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/reset-password", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, newPassword }),
})


      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setMsg(data.message);
      setMsgClass(data.success ? "text-success" : "text-danger");

      if (data.success) {
        setTimeout(() => {
          setEmail("");
          setNewPassword("");
          setMsg("");
          onLogin(); 
        }, 1500);
      }
    } catch (err) {
  console.error("Reset password fetch error:", err);
  setMsg("Server error. Check console for details.");
  setMsgClass("text-danger");
}

  };

  return (
    <form onSubmit={handleReset}>
      <h3 className="text-center mb-3">Reset Password</h3>
      <input
        type="email"
        className="form-control mb-2"
        placeholder="Registered Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="form-control mb-2"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-warning w-100 mb-2">
        Reset Password
      </button>
      {msg && <p className={`text-center ${msgClass}`}>{msg}</p>}
    </form>
  );
}

export default ResetPassword;
