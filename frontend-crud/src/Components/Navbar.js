import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/Nav.css";

const Navbar = () => {
  let navigate = useNavigate();

  const LogoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="nav">
        <Link className="link" to="/dashboard/category">
          Category
        </Link>
        <Link className="link" to="/dashboard/add-category">
          Add More Category
        </Link>
      </div>
      <div>
        <p> Hello {localStorage.getItem("userName")}!</p>
        <button onClick={LogoutHandler}>Logout</button>
      </div>
    </>
  );
};

export default Navbar;
