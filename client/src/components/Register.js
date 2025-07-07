// src/pages/Register.js
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";  //1

const Register = () => {

  const navigate = useNavigate(); //2

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    city: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    alert(data.message);

    if (res.ok) {  //3
      navigate("/login");
    }

  };

  return (
    <div className="container mt-5">
      <h2 className="text-center bg-dark text-white p-3">Register</h2>
      <form onSubmit={handleSubmit} className="border p-4 shadow">
        {Object.entries(formData).map(([key, value]) => (
          <div className="mb-3" key={key}>
            <label className="form-label text-capitalize">{key}</label>
            <input
              type={key === "password" ? "password" : key === "phone" ? "number" : "text"}
              name={key}
              value={value}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
