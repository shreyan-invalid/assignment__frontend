import React, { useState, useEffect } from "react";
import Product from "../Components/Product";
import "../Styles/Globalstyle.css";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import { ShowroomComponent } from "../Components/ShowroomComponent";

function Showroom() {
  const [search, setSearch] = useState("");
  const [searchProducts, setSearchProducts] = useState();
  console.log(searchProducts);
  const { products } = useSelector((state) => state.products.products);

  function onChange(e) {
    setSearch(e.target.value);

    setSearchProducts(products?.filter((prod) => prod.title.includes(search)));
  }

  return (
    <>
      <div className="showroom">
        <div className="showroom__search">
          <div className="search">
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
            >
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
            </svg>
            <input
              value={search}
              onChange={(e) => onChange(e)}
              type="text"
              placeholder="Search…"
            />
          </div>
        </div>
      {search.trim().length> 0 && <p>Your search results...</p>}
        <ShowroomComponent
          products={search.trim().length > 1 ? searchProducts : products}
        />
      </div>
    </>
  );
}

export default Showroom;
