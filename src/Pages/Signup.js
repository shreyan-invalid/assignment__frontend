import React,{useEffect} from "react";
import Form from "../Components/Form";
import "../Styles/Globalstyle.css";
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function Signup() {
  const {user} = useSelector((state) => state.user);
  const navigate= useNavigate();


  useEffect(() => {
    if(user){
      navigate('/');
    }
  }, [])
  const inputs = [
    { label: "Name", type: "text" },
    { label: "Email", type: "text" },
    { label: "Password", type: "password" },
    { label: "Confirm Password", type: "confirmPassword" },
  ];
  return (
    <div style={{ zIndex: "300", height: "100vh" }} className="container">
      <Form inputs={inputs} formType="signup" />
    </div>
  );
}

export default Signup;
