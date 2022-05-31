import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { setProducts } from "./features/product/productSlice";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { getProducts } from "./Services/ProductService";
import "./Styles/Globalstyle.css";
import Homepage from "./Pages/Homepage";
import ProductPage from "./Pages/ProductPage";
import Showroom from "./Pages/Showroom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header/Header";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Components/Layout";
import NewCollection from "./Components/NewCollection";
import Collection from "./Pages/Collection";
import AdminPage from "./Pages/AdminPage";
import Loader from "./Components/Loader/Loader";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  fetch("https://fakestoreapi.com/products?limit=15", {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      dispatch(setProducts({ products: json }));
      setLoading(false);
    });

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<Layout children={<Homepage />} />}
            ></Route>
            <Route
              exact
              path="/product/:productid"
              element={<Layout children={<ProductPage />} />}
            ></Route>
            <Route
              exact
              path="/showroom"
              element={<Layout children={<Showroom />} />}
            ></Route>

            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route
              exact
              path="/newCollection"
              element={<NewCollection />}
            ></Route>
            <Route exact path="/admin" element={<ProductPage />}></Route>
            <Route
              exact
              path="/dashboard"
              element={<Layout children={<Dashboard />} />}
            ></Route>
            <Route
              exact
              path="/collection/:collectionId"
              element={<Layout children={<Collection />} />}
            ></Route>
            <Route
              exact
              path="/adminPage"
              element={<Layout children={<AdminPage />} />}
            ></Route>
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
