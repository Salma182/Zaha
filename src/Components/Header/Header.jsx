import React, { useState } from "react";
import SideNav from "./../SideNav/SideNav";
import SearchInput from "../SearchInput/SearchInput";
import Cart from "./../Cart/Cart";
import style from "./Header.module.css";
import { Link } from "react-router-dom";
import TopNav from "../TopNav/TopNav";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
      
      <nav
        className={`bg-color p-3 text-capitalize fixed-top dark-color shadowx`}
      >
        <div className="container d-flex justify-content-between align-items-center ">
          <div className="bar small sidebar" onClick={() => setIsOpen(true)}>
            <i className="fa-solid fa-bars fs-5 pointer small"></i>
          </div>
          <div className="logo">
            <Link className={style.link} to="/">
              <h2 className="my-0 pointer text-dark fw-bold text-uppercase logo">
                ZAHA
              </h2>
            </Link>
          </div>

          <SearchInput searchOpen={searchOpen} setSearchOpen={setSearchOpen} />

          <div className="icons">
            <Link className="text-decoration-none text-dark mx-2" to="login">Login</Link>
            <Link className="text-decoration-none text-dark mx-2" to="register">Register</Link>
            <i
              onClick={() => setSearchOpen(true)}
              className="fa-solid fa-magnifying-glass me-3 pointer search-icon"
            ></i>
            <i
              onClick={() => setCartOpen((cart) => !cart)}
              className="fa-solid fa-cart-arrow-down small pointer"
            ></i>
          </div>
        </div>
        <TopNav />
      </nav>
      <SideNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
