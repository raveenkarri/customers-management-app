
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">CustomerApp</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Customers</Link>
        </li>
        <li>
          <Link to="/add-customer">Add Customer</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
