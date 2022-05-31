import React, { useState, useEffect } from "react";
import { selectProducts } from "../features/product/productSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../Styles/ProductPage.css";
// import Navbar from "../Components/Navbar";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import ProductReview from "../Components/ProductReview";

const ProductPage2 = () => {
  return (
    <div>ProductPage2</div>
  )
}

export default ProductPage2