import React, { useState } from "react";
import SideNav from "./../SideNav/SideNav";
import SearchInput from "../SearchInput/SearchInput";
import Cart from "./../Cart/Cart";
import style from "./Header.module.css";
import { Link } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import logo from '../../Images/Logo PNG.png'
import Wishlist from "../Wishlist/Wishlist";
import Navbar from "../Navbar/Navbar";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  return (
    <>
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <Wishlist wishlistOpen={wishlistOpen} setWishlistOpen={setWishlistOpen} />

      <nav
        className={`bg-color p-3 text-capitalize fixed-top dark-color shadowx`}
      >
        <div className="container d-flex justify-content-center align-items-center ">
      
          <div className="logo">
            <Link className={style.link} to="/">
          <img src={logo} alt=""  width={150}/>
            </Link>
          </div>

          <SearchInput searchOpen={searchOpen} setSearchOpen={setSearchOpen} />

          <div className="icons d-flex">
            <Link className="text-decoration-none text-dark fw-bold me-2" to="login">Login</Link>
            <Link className="text-decoration-none text-dark fw-bold me-2" to="register">Register</Link>
            <i
              onClick={() => setSearchOpen(true)}
              className="fa-solid fa-magnifying-glass fs-5 me-3 mt-1 pointer search-icon"
            ></i>
            <i
              onClick={() => setCartOpen((cart) => !cart)}
              className="fa-solid fa-cart-arrow-down fs-5 mt-1  me-3 small pointer"
            ></i>


        <i onClick={() => setWishlistOpen((wishlist) => !wishlist)}
        className="fa-regular fa-heart fs-5 mt-1 small pointer">
          </i>
          </div>
        </div>
        <TopNav />
      </nav>
      <TopNav isOpen={isOpen} setIsOpen={setIsOpen} setCartOpen={setCartOpen} cartOpen={cartOpen} setWishlistOpen={setWishlistOpen} wishlistOpen={wishlistOpen} />
    </>
  );
}
