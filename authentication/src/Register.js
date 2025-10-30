import React, { useState } from "react";

function Register({ onLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [msgClass, setMsgClass] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMsg(data.message);
    setMsgClass(data.success ? "text-success" : "text-danger");
    if (data.success) setTimeout(onLogin, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="shadow-sm">
      <h3 className="text-center mb-3">Register</h3>
      <input type="text" name="name" className="form-control mb-2 border border-danger" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" className="form-control mb-2 border border-danger" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" className="form-control mb-2 border border-danger" placeholder="Password" onChange={handleChange} required />
      <button className="btn btn-info w-100 mb-2 border border-danger">Register</button>
      {msg && <p className={`text-center ${msgClass}`}>{msg}</p>}
    </form>
  );
}

export default Register;
