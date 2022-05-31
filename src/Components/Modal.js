import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import CollectionComponent from "./CollectionComponent";
import "../Styles/Globalstyle.css";

const Model = ({ product }) => {
  const [collections, setCollections] = useState([]);
  const { user } = useSelector((state) => state.user);
  const collectionsCollectionRef = collection(db, "collections");
  const navigate = useNavigate();
  useEffect(() => {
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
      fetch(`http://localhost:3010/collection/${user.data.id}/collections`)
        .then((res) => res.json())
        .then((data) => setCollections(data.data));
    };

    getCollections2();
  }, [collections]);

  const updateCollection = async (collectionId, product, e) => {
    try {
      // await addDoc(collectionCollectionRef, { title: title, image: imageURL, description: description, date: Date.now(), userId: user.data.id, userEmail: user.data.email, products: []});
      e.preventDefault();
      fetch(`http://localhost:3010/collection/update/${collectionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          productId: product?.id,
          type: "image"
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate('/dashboard');
        })
        .catch((err) => console.log(err));
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Choose a collection
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                {collections.map((collection) => (
                  <div
                    onClick={(e) =>
                      updateCollection(collection?._id, product, e)
                    }
                    data-bs-dismiss="modal"
                  >
                    <CollectionComponent
                      info={collection}
                      key={collection.id}
                    />
                  </div>
                ))}
              </form>
            </div>
            <div class="modal-footer">
              <button
                onClick={() => navigate("/newCollection")}
                type="button"
                data-bs-dismiss="modal"
                class="btn btn-outline-dark"
              >
                Create new Collection
              </button>
            </div>
          </div>
        </div>
      </div>
      {user ? (
        <button
          type="button"
          class="btn btn-outline-dark"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
        >
          Add to Collection
        </button>
      ) : (
        <button onClick={() => alert("Please log in")} type="button" class="btn btn-outline-dark">
          Add to collection
        </button>
      )}
    </>
  );
};

export default Model;
