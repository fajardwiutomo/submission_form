import "./result.css";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";

export const Result = () => {
  const data = useSelector((state) => state.form?.status);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="title">Your Submission Status</h1>
        <table id="form">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Status</th>
          </tr>
          {data &&
            data.map((result, i) => (
              <tr key={i}>
                <td>{result.name}</td>
                <td>{result.email}</td>
                <td>{result.contactNumber}</td>
                <td>{result.status}</td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};
