import { useState } from "react";
import "./login.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data)
      localStorage.setItem("access_token", response.data.token);
      navigate("/home")
    
      Swal.fire({
        title: "Success!",
        text: "login successfully",
        icon: "success",
        confirmButtonText: "Close",
      });
      setSuccess(true)
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "email or password invalid",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const token = localStorage.getItem("access_token")

  function handleSubmit(event) {
    event.preventDefault();
    login();
    setEmail("");
    setPassword("");
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="login">
        <h1>WEB PORTAL</h1>
        <div className="containerusername">
          <label className="title">Email</label>
          <input
            type="email"
            value={email}
            placeholder="email"
            id="email"
            className="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="containerPassword">
          <label className="title">Password</label>
          <input
            type="password"
            value={password}
            placeholder="password"
            id="password"
            className="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="buttonLogin" disabled={!validateForm()}>
          Login
        </button>
        <a href="/register">
          <p>Don't have account? register here</p>
        </a>
      </form>
    </div>
  );
};
