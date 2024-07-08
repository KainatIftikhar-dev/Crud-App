import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loader from "../assets/loading.gif";
import "./style/Detail.css";

const Detail = () => {
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

  let params = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/category/" + params.id)
      .then((res) => {
        setIsLoading(false);
        setHasError(false);
        console.log(res.data.category);
        setCategory(res.data.category);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(true);
        console.log(err);
        setError(err.response.data.message);
      });
  }, []);
  return (
    <>
      {isLoading && (
        <div>
          <img className="img-load" src={loader} alt="loader" />
        </div>
      )}
      {!isLoading && (
        <div>
          <h2 className="detail">Detail Page</h2>
          <img className="photo" src={category.photo} alt="pic" />
          <h1>{category.name}</h1>
        </div>
      )}
      {hasError && (
        <div>
          <p className="paragraph">Error:- {error}</p>
        </div>
      )}
    </>
  );
};

export default Detail;
