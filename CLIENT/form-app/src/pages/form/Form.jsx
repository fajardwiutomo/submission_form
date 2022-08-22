import "./form.css";
import { React, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../navbar/Navbar";
import { useDispatch } from "react-redux";
import { getData } from "../../redux/form/formSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
export const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch();

  const createForm = async () => {
    try {
      await axios.post("http://localhost:4000/api/form", {
        name: name,
        email: email,
        contactNumber: contact,
        agencyName: agencyName,
        feedback: feedback,
      });
      Swal.fire({
        title: "Success!",
        text: "your submission created successfully",
        icon: "success",
        confirmButtonText: "Close",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error to submit",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  // const getAllForm = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:4000/api/form`);
  //     dispatch(getData(response.data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const checkFeedback = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://codeify.dev/submit-feedback.php?feedback=${feedback}`,
        withCredentials: false,
      }
      );
      console.log(feedback,">>>")
      dispatch(getData(response.data));
    } catch (error) {}
  };

  function validateForm() {
    return (
      email.length > 0 &&
      name.length > 0 &&
      contact.length > 0 &&
      feedback.length > 0
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    createForm();
    checkFeedback();
    setName("");
    setEmail("");
    setContact("");
    setAgencyName("");
    setFeedback("");
  }

  return (
    <>
      <Navbar />
      <div className="container-form">
        <form onSubmit={handleSubmit}>
          <div className="form">
            <h1>Submission Form</h1>
            <div className="input">
              <input
                type="text"
                value={name}
                placeholder="Name*"
                id="username"
                className="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <input
              type="text"
              value={agencyName}
              placeholder="Agency Name"
              id="agency"
              className="agency"
              onChange={(e) => setAgencyName(e.target.value)}
            />
            <textarea
              type="textarea"
              value={feedback}
              placeholder="Feedback*"
              id="feedback"
              className="feedback"
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button type="submit" disabled={!validateForm()}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
