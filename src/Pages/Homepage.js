import React, { useState, useEffect } from "react";
import { selectProducts } from "../features/product/productSlice";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header/Header";
import Carousel from "../Components/Carousel";
import "../Styles/Globalstyle.css";
import { ShowroomComponent } from "../Components/ShowroomComponent";

function Homepage() {

  const {products} = useSelector((state) => state.products.products);
 
  return (
    <div className="Homepage">
      <Carousel />
      <h3>SHOP NOW</h3>
      <ShowroomComponent products={products?.slice().splice(5, 5)} />
    </div>
  );
}

export default Homepage;
