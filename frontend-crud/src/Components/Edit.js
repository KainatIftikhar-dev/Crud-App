import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import loader from "../assets/loading.gif";
import imageLogo from "../assets/logo (2).jpg";
import "./style/Edit.css";
import axios from "axios";

const Edit = () => {
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [imageUrl, setImageUrl] = useState(imageLogo);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/category/" + params.id)
      .then((res) => {
        setIsLoading(false);
        setHasError(false);
        console.log(res.data.category);
        setCategory(res.data.category.name);
        setImageUrl(res.data.category.photo);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(true);
        console.log(err);
        setError(err.response.data.message);
      });
  }, []);

  const fileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formdata = new FormData();
    formdata.append("name", category);
    formdata.append("photo", selectedFile);
    axios
      .put("http://localhost:3000/category/" + params.id, formdata)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setHasError(false);
        navigate("/category");
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
        setHasError(true);
        setError(err.message);
      });
  };

  return (
    <>
      {isLoading && (
        <div>
          <img className="edit-img" src={loader} alt="loader" />
        </div>
      )}
      {!isLoading && !hasError && (
        <div>
          <h1 className="edit-paragraph">Add All Type Of Category</h1>

          <form className="input" onSubmit={submitHandler}>
            <input
              type="text"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <input
              type="file"
              onChange={(e) => {
                fileHandler(e);
              }}
            />
            <button className="edit-btn" type="submit">
              Submit file
            </button>
            {/* <br /> */}
            <img
              // style={{ width: "120px" }}
              src={imageUrl}
              alt="imageLogo"
            />
          </form>
        </div>
      )}

      {hasError && (
        <div>
          <p style={{ color: "red" }}>Error :-{error}</p>
        </div>
      )}
    </>
  );
};

export default Edit;
