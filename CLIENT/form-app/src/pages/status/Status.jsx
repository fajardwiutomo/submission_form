import "./status.css";
import axios from "axios";
import { React, useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getStatus } from "../../redux/form/formSlice";

export const Status = () => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const checkStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/form/status?email=${email}&contactNumber=${contact}`,
      );
      dispatch(getStatus(response.data))
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "please check your input",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  function validateForm() {
    return email.length > 0 && contact.length > 0;
  }

  function handleCheck(event) {
    event.preventDefault();
    checkStatus();
    setEmail("");
    setContact("");
    navigate("/result")
  }

  return (
    <div>
      <Navbar />
      <div className="container-form">
        <form onSubmit={handleCheck}>
          <div className="form">
            <h1>Submission Form</h1>
            <input
              type="email"
              value={email}
              placeholder="Email*"
              id="password"
              className="password"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              value={contact}
              placeholder="Contact Number*"
              id="contact"
              className="contact"
              onChange={(e) => setContact(e.target.value)}
            />
            <button type="submit" disabled={!validateForm()}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
