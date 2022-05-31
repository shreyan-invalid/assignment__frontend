import React from "react";
import "../Styles/Product.css";
import {Link} from 'react-router-dom';


function Product({ info }) {
  return (
    
      <div
        style={{ background: `url(${info.image})` }}
        className="product"
      >
        <Link to={`/product/${info.id}`}>
        <div className="productContainer">
          <div className="productDetails">
            <div className="title">
              <h2>{info.title}</h2>
            </div>

            <div className="category">
              <p>{info.category}</p>
            </div>
          </div>
        </div>
        </Link>
      </div>
    
  );
}

export default Product;
