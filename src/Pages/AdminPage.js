import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Divider from "../Components/Divider";

const AdminPage = () => {
  const { user } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  console.log(users);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.data.role !== "admin") {
      navigate("/");
    }

    const getAllUsers = () => {
      fetch(`https://intense-chamber-10541.herokuapp.com/user/users`)
        .then((res) => res.json())
        .then((json) => setUsers(json.data));
    };

    getAllUsers();
  }, []);

  return (
    <div className="admin">
      <h2>Users:- </h2>
      <Divider />
      <div className="users">
        {users?.map((userDoc) => (
          <div className="userCard">
            <h3>Name: {userDoc.name}</h3>
            <p>Email: {userDoc.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
