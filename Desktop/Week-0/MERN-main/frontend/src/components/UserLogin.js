import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
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
      //if (response.data.role !== "user") {
        //throw new Error("Access denied: Not a user");
      //}
      localStorage.setItem("token", response.data.token);
      alert("User login successful!");
      navigate("/userdashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/usersignup"); // Change the path to your signup page
  };

  return (
    <div>
      <h2>User Login</h2>
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

export default UserLogin;
