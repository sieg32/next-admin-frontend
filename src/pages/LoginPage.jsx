import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../apis/auth";
import { AuthContext } from "../components/AuthProvider";
const LoginPage = () => {
    const { setAuth } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(form, setAuth);
      
      
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
