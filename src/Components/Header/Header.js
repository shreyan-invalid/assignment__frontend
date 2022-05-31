import React from "react";
import "./Header.css";
import SearchBar from "../Searchbar/Searchbar";
import PrimaryButton from "../Buttons/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../../features/user/userSlice";

function Click() {
  var navbar = document.querySelector(".main-nav ul");
  navbar.classList.toggle("active");
}

function Navbar() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(deleteUser());
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <header className="main-header">
      <a href="/" className="brand-logo">
        <div className="brand-logo-name">
          <h1>Logo</h1>
        </div>
      </a>
      <div href="#" className="toggle-button" onClick={Click}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <nav className="main-nav">
        <ul>
          <Link to="/">
            <li>
              <a href="#">Home</a>
            </li>
          </Link>
          <Link to="/showroom">
            <li>
              <a href="#">Store</a>
            </li>
          </Link>
          {user && (
            <Link to="/dashboard">
              <li>
                <a href="#">Collections</a>
              </li>
            </Link>
          )}
          {
            user && user.data.role === "admin"
            && 
            <Link to="/adminPage">
            <li>
              <li>
                <a href="#">Admin</a>
              </li>
            </li>
          </Link>
          }
          {user ? (
            <li onClick={handleClick}>
              <li>
                <a href="#">Sign Out</a>
              </li>
            </li>
          ) : (
            <Link to="/login">
              <li>
                <li>
                  <a href="#">Sign In</a>
                </li>
              </li>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
