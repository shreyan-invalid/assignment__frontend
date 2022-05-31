import React from "react";
import "../Styles/Collection.css";
import { useNavigate, Link } from "react-router-dom";
import { collection } from "firebase/firestore";

const CollectionComponent = ({ info, add }) => {
  const navigate = useNavigate();
  const plusImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Dcc3d5Lb1latb57H6sLv9iRIyIzrHNXDfw&usqp=CAU";

  return (
    <Link to={`/collection/${info?._id}`}>
      <div
        onClick={() => add && navigate("/newCollection")}
        className="collection"
      >
        <img src={add ? plusImage : info.image} />
        {add ? (
          <div className="collection__details">
            <h2>Add a collection</h2>
          </div>
        ) : (
          <div className="collection__details">
            <h2>{info.title}</h2>
            <p>{info.description}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CollectionComponent;
