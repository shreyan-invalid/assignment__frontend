import React from "react";
import "../Styles/Globalstyle.css";
import Form from "./Form";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewCollection = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const inputs = [
    { label: "Title", type: "text" },
    { label: "Description", type: "text" },
    { label: "Image(url)", type: "text" },
  ];

  useEffect(() => {
    if (!user) {
      alert("please log in first");
      navigate("/login");
    }
  }, []);
  return (
    <div style={{ zIndex: "300", height: "100vh" }} className="container">
      <Form inputs={inputs} formType="collection" />
    </div>
  );
};

export default NewCollection;
