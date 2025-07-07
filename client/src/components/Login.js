// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";//1


const Login = () => {
  const navigate = useNavigate(); //2

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    
    if (res.ok) {
      alert("Login successful");
      navigate("/Profile");
    } else {
      alert(data.message || "Login failed");
    }

  };

  return (
    <div className="container mt-5">
      <h2 className="text-center bg-dark text-white p-3">Login</h2>
      <form onSubmit={handleLogin} className="border p-4 shadow">
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
