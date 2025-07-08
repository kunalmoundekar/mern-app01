import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getProfile = async () => {
    const res = await fetch("/profile", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // 🔸 Logout function inside this file
  const handleLogout = async () => {
    try {
      const res = await fetch("/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      alert(data.message);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center bg-dark text-white p-3">User Profile</h2>
      {user ? (
        <div>
          <div className="card p-3 shadow">
            <h5>Name: {user.name}</h5>
            <h6>Email: {user.email}</h6>
            <p>Address: {user.address}, {user.city}, {user.country}</p>
            <p>Phone: {user.phone}</p>
          </div>

          <div>
            <button className="btn btn-danger mt-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default Profile;
