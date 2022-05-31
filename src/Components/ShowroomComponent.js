import "../Styles/Globalstyle.css";

import React from "react";
import Product from "./Product";

export const ShowroomComponent = ({products}) => {
  return (
    
      <div className="showroomContainer">
        {products?.map((product) => (
          <Product key={product.id} info={product} />
        ))}
      </div>
  );
};
