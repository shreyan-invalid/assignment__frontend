import React, { useEffect, useState } from "react";
import CollectionComponent from "../Components/CollectionComponent";
import Divider from "../Components/Divider";
import { useSelector } from "react-redux";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";
import Loader from "../Components/Loader/Loader";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Dashboard = () => {
  const testArr = [1, 2, 3, 4, 5];
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log(collections);
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const collectionsCollectionRef = collection(db, "collections");

  useEffect(() => {
    setLoading(true);
    const getCollections = async () => {
      const data = await getDocs(collectionsCollectionRef, {
        userId: user.data.id,
      });
      setCollections(
        data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((doc) => doc.userId === user?.data.id)
      );
    };

    const getCollections2 = async () => {
      fetch(`https://intense-chamber-10541.herokuapp.com/collection/${user.data.id}/collections`)
        .then((res) => res.json())
        .then((data) => setCollections(data.data));
    };

    getCollections2();
    setLoading(false);
  }, [collections]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="dashBoard">
        <div className="dashBoard__container">
          <div className="dashBoard__title">
            <h2>Dashboard</h2>
            <p>Welcome {user?.data.name}</p>
          </div>
          <button
            onClick={() => navigate("/newCollection")}
            style={{ marginBottom: "10px" }}
            type="button"
            class="btn btn-outline-dark"
          >
            Add New collection
          </button>
          <Divider />
          <div className="dashboard__collections">
            {collections.map((collection) => (
              <CollectionComponent info={collection} key={collection.id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
