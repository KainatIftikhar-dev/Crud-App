import axios from "axios";
import React, { useState } from "react";
import loader from "../assets/loading.gif";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post("http://localhost:3000/user/signup", {
        userName: userName,
        password: password,
        email: email,
        phone: phone,
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setHasError(false);
        navigate("/login");
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
        <div className="label">
          <img
            className="load"
            // style={{ width: "200px" }}
            src={loader}
            alt="loading"
          />
        </div>
      )}
      {!isLoading && (
        <div>
          <h1>Create Account</h1>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />
            <br />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />
            <input
              type="number"
              placeholder="fone-number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <br />
            <button type="submit">Create Account</button>
            <p>
              If you have already account! <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      )}
      {hasError && (
        <div>
          <p className="para">Error :-{error} </p>
        </div>
      )}
    </>
  );
};

export default Signup;
