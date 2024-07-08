import axios from "axios";
import React, { useState } from "react";
import loader from "../assets/loading.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "../Components/style/passwordEye.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [visible, setVisible] = useState(false);

  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // console.log(userName, password, email, phone);
    axios
      .post("http://localhost:3000/user/login", {
        userName: userName,
        password: password,
      })
      .then((res) => {
        setHasError(false);
        setIsLoading(false);
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.userName);

        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
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

      {!isLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "500px",
            justifyContent: "center",
          }}>
          <form
            onSubmit={submitHandler}
            style={{
              border: "1px solid black",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
            }}>
            <h1>Login Form</h1>
            <input
              type="text"
              style={{ width: "300px", height: "30px" }}
              placeholder="username"
              onChange={(ab) => {
                setUserName(ab.target.value);
              }}
            />
            <br />
            <br />
            <div className="ps_box">
              <input
                style={{ width: "300px", height: "30px" }}
                type={visible ? "text" : "password"}
                placeholder="password"
                onChange={(ab) => {
                  setPassword(ab.target.value);
                }}
              />
              <div className="eye_box" onClick={() => setVisible(!visible)}>
                {visible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <br />
            <br />
            <button type="submit">Login</button>
            <p>
              If you want to create account?{" "}
              <Link to="/signup">Create account</Link>
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

export default Login;
