import axios from "axios";
import React, { useEffect, useState } from "react";
import loader from "../assets/loading.gif";
import { useNavigate } from "react-router-dom";
import "./style/Category.css";

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

  let navigate = useNavigate();

  const detailRoute = (id) => {
    navigate("/dashboard/detail/" + id);
  };

  const editRoute = (id) => {
    navigate("/dashboard/edit/" + id);
  };

  const deleteData = (id, imgLink) => {
    if (window.confirm("are you sure?")) {
      axios
        .delete(
          "http://localhost:3000/category?" +
            "id=" +
            id +
            "&imageUrl=" +
            imgLink
        )
        .then((res) => {
          console.log(res);
          getData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  //
  const getData = () => {
    axios
      .get("http://localhost:3000/category", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setHasError(false);
        setCategoryList(res.data.category);
        console.log(res.data.category);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setIsLoading(false);
        setHasError(true);
        setError(err.response.data.msg);
      });
  };
  //
  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="label">
          <img className="load" src={loader} alt="loader" />
        </div>
      )}
      {!isLoading && !hasError && (
        <div>
          <h1 className="list">Category List</h1>
          <table>
            <thead>
              <tr className="tr">
                <th>Name</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {categoryList?.map((value) => (
                <Row
                  key={value._id}
                  detail={value}
                  detailReq={detailRoute}
                  editReq={editRoute}
                  deleteReq={deleteData}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {hasError && (
        <div>
          <p className="error">Error:- {error}</p>
        </div>
      )}
    </>
  );
};

const Row = (props) => {
  return (
    <>
      <tr>
        <td>{props.detail.name}</td>
        <td>
          <img
            style={{ width: "120px" }}
            src={props.detail.photo}
            alt="photo"
          />
        </td>
        <td>
          <button
            className="btns"
            onClick={() => {
              props.detailReq(props.detail._id);
            }}>
            Detail
          </button>
        </td>
        <td>
          <button
            className="btns"
            onClick={() => {
              props.editReq(props.detail._id);
            }}>
            Edit
          </button>
        </td>
        <td>
          <button
            className="btns"
            onClick={() => {
              props.deleteReq(props.detail._id, props.detail.photo);
            }}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};
export default Category;
