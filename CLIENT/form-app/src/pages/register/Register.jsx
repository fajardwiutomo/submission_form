import axios from "axios";
import { useState } from "react";
import "./register.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const register = async () => {
    try {
      await axios.post("http://localhost:4000/api/users/register", {
        username: username,
        email: email,
        password: password,
      });
      Swal.fire({
        title: "Success!",
        text: "register successfully",
        icon: "success",
        confirmButtonText: "Close",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error to register",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    register();
    setUsername("");
    setEmail("");
    setPassword("");
    navigate("/")
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  return (
    <div className="container">
        <form action="POST" onSubmit={handleSubmit} className="login">
          <h1>WEB PORTAL</h1>
          <div className="containerusername">
            <label className="title">Username</label>
            <input
              type="text"
              value={username}
              placeholder="username"
              id="username"
              className="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="containeremail">
            <label className="title">Email</label>
            <input
              type="email"
              value={email}
              placeholder="username"
              id="username"
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
          <button type="submit" className="buttonLogin" disabled={!validateForm()}>
            Register
          </button>
          <a href="/">
            <p>Back to login</p>
          </a>
        </form>
    </div>
  );
};
