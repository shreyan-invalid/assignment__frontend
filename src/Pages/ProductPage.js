import React, { useState, useEffect } from "react";
import { selectProducts } from "../features/product/productSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../Styles/ProductPage.css";
import Navbar from "../Components/Navbar";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Modal from "../Components/Modal";
import { collection, getDocs, addDoc } from "firebase/firestore";
import ProductReview from "../Components/ProductReview";
import Loading from '../Components/Loader/Loader';

const ProductPage = (props) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [currentProduct, setCurrentProduct] = useState();
  const [rating, setRating] = useState(-1);
  const [productReviews, setProductReviews] = useState([]);
  console.log(productReviews);
  const [color, setColor] = useState("#fc6");
  const [review, setReview] = useState("");
  const { productid } = useParams();
  const [loading, setLoading] = useState();
  const reviewsCollectionRef = collection(db, "reviews");

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${productid}`)
      .then((res) => res.json())
      .then((json) => setCurrentProduct(json));

    const getReviews = async () => {
      const data = await getDocs(reviewsCollectionRef);
      setProductReviews(
        data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((doc) => doc.productId === currentProduct?.id)
      );
    };

    const getReview2 = async () => {
      fetch(`https://intense-chamber-10541.herokuapp.com/review/getReview/${productid}`)
        .then((res) => res.json())
        .then((json) => setProductReviews(json.data));
    };

    getReview2();

    setLoading(false);
  }, [productReviews]);

  const postReview = async () => {
    if (!user) {
      alert("Please log in first");
      navigate("/login");
    } else {
      await addDoc(reviewsCollectionRef, {
        userid: user.data._id,
        review: review,
        date: Date.now(),
        name: user.data.name,
        email: user.data.email,
        rating: rating,
        productId: currentProduct.id,
      });
      setReview("");
      setRating(-1);
    }
  };

  const postReview2 = async (e) => {
    try {
      // await addDoc(collectionCollectionRef, { title: title, image: imageURL, description: description, date: Date.now(), userId: user.data.id, userEmail: user.data.email, products: []});
      setLoading(true);
      if (!user) navigate("/login");
      else {
        e.preventDefault();
        if (review.trim() === "" || rating === -1) {
          alert("Please fill all the fields");
          return;
        }
        fetch(`https://intense-chamber-10541.herokuapp.com/review/postReview`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            userid: user.data._id,
            reviews: review,
            date: Date.now(),
            name: user.data.name,
            email: user.data.email,
            rating: rating,
            productId: currentProduct.id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setReview("");
            setRating(-1);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      alert(err);
    }
  };

  // const currentProduct= products.find( product => product.id === productid)
  if(loading){
    return(
      <Loading/>
    )
  }else{
  return (
    <div className="productPage">
      <div className="productPage__Container">
        <div className="productPage__left">
          <img src={currentProduct?.image} />
        </div>
        <div className="productPage__right">
          <div className="productPage__right__title">
            <h2>{currentProduct?.title}</h2>
          </div>
          <div className="productPage__right__description">
            <p>
              <strong>Description: </strong>
              {currentProduct?.description}
            </p>
          </div>

          <div className="productPage__right__details">
            <p>
              <strong>Price:</strong> {currentProduct?.price}
            </p>
          </div>
          <div className="productPage__right__ratings">
            <p>
              <strong>Ratings: </strong> {currentProduct?.rating?.rate}
            </p>
            <p>
              <strong>Category: </strong> {currentProduct?.category}
            </p>
          </div>
          <div className="productPage__right__button">
            <Modal product={currentProduct} />
          </div>
        </div>
      </div>
      <div className="productPage__review">
        <form>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Reviews
            </label>
            <ReactStars
              size={40}
              value={0}
              color1={"#cccccc"}
              color2={color}
              onChange={(newRating) => {
                setRating(newRating);
                setColor("#f0c600");
              }}
            />
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="3"
            ></textarea>
            <div className="productPage__right__button">
              <button
                onClick={postReview2}
                type="button"
                class="btn btn-outline-dark"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="productPage__review">
        {productReviews.map((productReview) => (
          <ProductReview data={productReview} />
        ))}
      </div>
    </div>
  );
        }
};

export default ProductPage;
