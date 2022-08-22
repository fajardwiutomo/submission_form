import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/home" style={{color: "inherit", textDecoration:"none"}}>
          <span className="logo">Company XYZ Pte Ltd</span>
        </Link>
        <div className="navItems">
          <Link to="/status">
            <button className="navButton">Check Status Submission</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
