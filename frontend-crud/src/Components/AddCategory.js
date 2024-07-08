import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loading.gif";
import imageLogo from "../assets/logo (2).jpg";
import style from "./style/Add.css";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(imageLogo);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasErro, setHasError] = useState(false);

  const fileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };
  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formdata = new FormData();
    formdata.append("name", category);
    formdata.append("photo", selectedFile);

    axios
      .post("http://localhost:3000/category", formdata, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setHasError(false);
        navigate("/dashboard/category");
      })
      .catch((err) => {
        console.log(err.messages);
        setIsLoading(false);
        setHasError(true);
        setError(err.response.data.msg);
      });
  };
  return (
    <>
      {isLoading && (
        <div className="label">
          <img
            className="load"
            // style={{ width: "200px" }}
            src={loader}
            alt="loading"
          />
        </div>
      )}
      {!isLoading && !hasErro && (
        <div>
          <h1 className="heading">Add More Category</h1>
          <div className="form-input">
            <form onSubmit={submitHandler}>
              <input
                type="text"
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
              <button className="btn" type="submit">
                Submit
              </button>
              <br />
              <img className="img" src={imageUrl} alt="logo" />
            </form>
          </div>
        </div>
      )}
      {hasErro && (
        <div>
          <p className="para">Error :-{error} </p>
        </div>
      )}
    </>
  );
};

export default AddCategory;
