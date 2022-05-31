import React from "react";
import "../Styles/CollectionPage.css";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShowroomComponent } from "../Components/ShowroomComponent";
import Divider from "../Components/Divider";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loader/Loader";

const Collection = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentCollection, setCollection] = useState();
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products.products);

  useEffect(() => {
    setLoading(true);
    function getCollection() {
      fetch(`https://intense-chamber-10541.herokuapp.com/collection/${collectionId}`)
        .then((res) => res.json())
        .then((data) => setCollection(data.data));
    }
    console.log(
      products?.filter((prod) =>
        currentCollection?.products.includes(String(prod.id))
      )
    );

    getCollection();
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="collectionPage">
        <div className="collectionPage__title">
          <h2>Title: {currentCollection?.title}</h2>
          <p>Description: {currentCollection?.description}</p>
          <button
            onClick={() => navigate("/showroom")}
            type="button"
            class="btn btn-outline-dark"
          >
            Go to store
          </button>
          <Divider />
        </div>

        <div className="collectionPage__products">
          <h2>Your product Collections:</h2>
          <ShowroomComponent
            products={products?.filter((prod) =>
              currentCollection?.products.includes(String(prod.id))
            )}
          />
        </div>
      </div>
    );
  }
};

export default Collection;
