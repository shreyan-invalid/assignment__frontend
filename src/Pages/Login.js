import React, { useEffect } from "react";
import Form from "../Components/Form";
import "../Styles/Globalstyle.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const inputs = [
    { label: "Email", type: "text" },
    { label: "Password", type: "password" },
  ];
  return (
    <div style={{ zIndex: "300", height: "100vh" }} className="container">
      <Form inputs={inputs} formType={"login"} />
    </div>
  );
}

export default Login;
