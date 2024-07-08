import React from "react";
import AddCategory from "./Components/AddCategory";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout";
// import Category from "./Components/Category";
import Detail from "./Components/Detail";
import Edit from "./Components/Edit";
import Signup from "./Components/Signup";
import Category from "./Components/Category";
import Login from "./Components/Login";
import { isLogin } from "./Util/CheckAuth";

const router = createBrowserRouter([
  { path: "signup", element: <Signup /> },
  { path: "login", element: <Login /> },
  { path: "", element: <Category />, loader: isLogin },
  {
    path: "dashboard",
    loader: isLogin,
    element: <Layout />,
    children: [
      { path: "", element: <Category /> },
      { path: "category", element: <Category /> },
      { path: "add-category", element: <AddCategory /> },
      { path: "detail/:id", element: <Detail /> },
      { path: "edit/:id", element: <Edit /> },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
