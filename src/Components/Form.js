import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../Styles/Form.css";
import { setUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Loader from "./Loader/Loader";

function Form({ inputs, formType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURl] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  console.log(user);

  function authorizedMethod(userData) {
    localStorage.setItem("jwtToken", userData.accessToken);
    dispatch(setUser({ user: userData }));
    const userObj = JSON.stringify(userData);
    localStorage.setItem("user", userObj);
    navigate("/");
  }

  const collectionCollectionRef = collection(db, "collections");

  const createCollection = async () => {
    try {
      setLoading(true);
      // await addDoc(collectionCollectionRef, { title: title, image: imageURL, description: description, date: Date.now(), userId: user.data.id, userEmail: user.data.email, products: []});
      if (
        title.trim() === "" ||
        description.trim() === "" ||
        imageURL.trim() === ""
      ) {
        alert("Please fill all the fields");
        return;
      }
      fetch("https://intense-chamber-10541.herokuapp.com/collection/postCollection", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: user.data.email,
          userId: user.data.id,
          title: title,
          description: description,
          image: imageURL,
        }),
      })
        .then((res) => res.json())
        .then((data) => setLoading(false))
        .catch((err) => console.log(err));
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (formType === "login") {
      if (email.trim() === "" || password.trim() === "") {
        alert("Please fill all the fields");
        return;
      }
      fetch("https://intense-chamber-10541.herokuapp.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((userData) => authorizedMethod(userData))
        .catch((error) => {alert("Wrong credentials");
        });
    } else if (formType === "signup") {
      if (
        email.trim() === "" ||
        password.trim() === "" ||
        confirmPassword.trim() === ""
      ) {
        alert("Please fill all the fields");
        return;
      }
      console.log(email, password, confirmPassword, name);
      if (password === confirmPassword) {
        fetch("https://intense-chamber-10541.herokuapp.com/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            email: email,
            password: password,
            name: name,
          }),
        })
          .then((res) => res.json())
          .then((userData) => authorizedMethod(userData))
          .catch((error) => alert("Please fill all fields"));
      } else {
        alert("Password does not match");
      }
    } else if (formType === "collection") {
      createCollection();
      navigate("/dashboard");
    }

    setLoading(false);
  };

  function setParameter(e, inputType) {
    if (inputType.label === "Email") {
      setEmail(e.target.value);
    } else if (inputType.label === "Name") {
      setName(e.target.value);
    } else if (inputType.label === "Password") {
      setPassword(e.target.value);
    } else if (inputType.label === "Confirm Password") {
      setConfirmPassword(e.target.value);
    } else if (inputType.label === "Title") {
      setTitle(e.target.value);
    } else if (inputType.label === "Description") {
      setDescription(e.target.value);
    } else if (inputType.label === "Image(url)") {
      setImageURl(e.target.value);
    }
  }

  function setVariable(inputType) {
    if (inputType.label === "Email") {
      return email;
    } else if (inputType.label === "Name") {
      return name;
    } else if (inputType.label === "Password") {
      return password;
    } else if (inputType.label === "Confirm Password") {
      return confirmPassword;
    } else if (inputType.label === "Title") {
      return title;
    } else if (inputType.label === "Description") {
      return description;
    } else if (inputType.label === "Image(url)") {
      return imageURL;
    }
  }

  function getTitle() {
    if (formType === "login") {
      return "SIGN IN";
    } else if (formType === "signup") {
      return "SIGN UP";
    } else if (formType === "collection") {
      return "Add new Collection";
    }
  }

  if (loading) {
    return <Loader />;
  } else {
    return (
      <form onSubmit={handleSubmit} className="formContainer">
        <div className="formContainer__title">
          <h2>{getTitle()}</h2>
        </div>
        {inputs.map((input) => (
          <div className="mb-3">
            {input.label === "Description" ? (
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={setVariable(input)}
                onChange={(e) => setParameter(e, input)}
                placeholder={`${input.label}`}
              ></textarea>
            ) : (
              <input
                type={input.type === "text" ? "text" : "password"}
                className="form-control"
                id="formGroupExampleInput"
                value={setVariable(input)}
                onChange={(e) => setParameter(e, input)}
                placeholder={`${input.label}`}
              />
            )}
          </div>
        ))}
        <div className="col-3">
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        </div>

        <div className="col-6">
          <div style={{ marginTop: "10px" }}>
            {formType === "login" || ("signup" && formType === "login") ? (
              <p onClick={() => navigate("/signup")}>
                Dont have an account? Sign up
              </p>
            ) : (
              <p onClick={() => navigate("/login")}>
                Already have an account? Sign in
              </p>
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
