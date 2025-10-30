import React, { useState } from "react";

function Login({ onReset, onRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [msgClass, setMsgClass] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMsg(data.message);
    setMsgClass(data.success ? "text-success" : "text-danger");
  };

  return (
    <form onSubmit={handleLogin} >
      <h3 className="text-center m-4 fs-1">Login</h3>
      <input type="email" name="email" className="form-control mb-2 border border-danger" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" className="form-control mb-2 border border-danger" placeholder="Password" onChange={handleChange} required />
      <button className="btn btn-info border border-danger w-100 mb-2">Login</button>
    <div className="d-flex"> <p className="text-primary mb-1 " style={{ cursor: "pointer" }} onClick={onReset}>Forgot Password?</p>
      <p className="text-dark mx-5 mb-1 text-end text-decoration-underline" style={{ cursor: "pointer" }} onClick={onRegister}>Register</p></div> 
      {msg && <p className={`text-center ${msgClass}`}>{msg}</p>}
    </form>
  );
}

export default Login;
