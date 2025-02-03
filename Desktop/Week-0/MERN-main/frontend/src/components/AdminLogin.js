import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });
      console.log(response.data);
      if (response.data.username == username) {
        throw new Error("Access denied: Not an admin");
      }
      localStorage.setItem("token", response.data.token);
      alert("Admin login successful!");
      navigate(`/admin`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    }
    
  };


  const handleSignupRedirect = () => {
    navigate("/adminsignup"); // Change the path to your signup page
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>

      {/* Add a Sign Up button that redirects to the signup page */}
      <button onClick={handleSignupRedirect}>
        Don't have an account? Sign up
      </button>
    </div>
  );
};

export default AdminLogin;
