import React from "react";
import "../Styles/Error.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h3>Oops!</h3>
          <h1>
            <span>#</span>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <h2>Sorry, the page you requested was not found</h2>
        <button
          onClick={() => navigate("/")}
          type="button"
          class="btn btn-outline-dark"
        >
          Take me Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
