import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const { loggedOut } = useContext(AppContext);
  const { pathname } = useLocation();
  return (
    <>
      <aside className="sidebar">
        <ul className="nav-aside">
          <p className="title">MAIN</p>
          <li>
            <Link
              className={`nav-item ${
                pathname === "/dashboard" || pathname === "/" ? "active" : ""
              }`}
              to="/dashboard"
            >
              <i className="fa fa-th-large"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">LISTS</p>
          <li>
            <Link
              className={`nav-item ${pathname === "/products" ? "active" : ""}`}
              to="/products"
            >
              <i className="fa fa-shopping-bag " aria-hidden="true"></i>
              <span>Products</span>
            </Link>
          </li>
          <li>
            <Link
              className={`nav-item ${
                pathname === "/new-product" ? "active" : ""
              }`}
              to="/new-product"
            >
              <i className="fa fa-cart-plus" aria-hidden="true"></i>
              <span>New Product</span>
            </Link>
          </li>
          <li>
            <Link
              className={`nav-item ${pathname === "/orders" ? "active" : ""}`}
              to="/orders"
            >
              <i className="fa fa-list-alt" aria-hidden="true"></i>
              <span>Order List</span>
            </Link>
          </li>
          <li>
            <Link
              className={`nav-item ${
                pathname === "/chatrooms" ? "active" : ""
              }`}
              to="/chatrooms"
            >
              <i className="fa fa-comments" aria-hidden="true"></i>
              <span>Chat</span>
            </Link>
          </li>
          <hr />
          <li
            className="nav-item"
            style={{ cursor: "pointer" }}
            onClick={() => loggedOut()}
          >
            <i className="fa fa-sign-out" aria-hidden="true"></i>
            <span>Sign Out</span>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
