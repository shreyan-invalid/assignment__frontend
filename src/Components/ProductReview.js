import React from "react";
import "../Styles/Productreview.css";
import ReactStars from "react-rating-stars-component";
import Divider from './Divider';

const ProductReview = ({ data }) => {
  return (
      <>
    <Divider/>
    <div className="review">
      <div className="review__upperDetails">
        <h2>{data.name}</h2>
        <p>{data.email}</p>
        <p>Date: {data.date}</p>
        <ReactStars
          size={30}
          half={true}
          value={data.rating || 0}
          color2={"#fc6"}
          edit={false}
          onChange={(newRating) => {
            console.log(newRating);
          }}
        />
      </div>
      <div className="review__lowerDetails">
        <p>{data.review}</p>
      </div>
      
    </div>
    </>
  );
};

export default ProductReview;
