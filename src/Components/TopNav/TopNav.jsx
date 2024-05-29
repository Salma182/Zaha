import React, { useEffect, useState } from "react"
import style from "./TopNav.module.css"
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function TopNav ({isOpen, setIsOpen}){

  function remove(e) {
    if (e.target.classList.contains("side")) {
      setIsOpen(false);
    }
  }
const[categories, setCategories] =useState("")

  async function Categories(){
    const{data}= await axios.get(`https://zahaback.com/api/allcategories`,
    {
      headers: {
        Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
      },
    }
    )
    setCategories(data.allcategories)
    console.log(data)
  
 }

useEffect(() => {
  Categories();
}, []);

    return <>

    <div className="container topnav">
    <div className={style.NavLinks}>
      <NavLink to="/" className={style.nav_link}>Home </NavLink>
      {categories ? categories.map(category => 
      
      <NavLink className={style.nav_link}>{category.name}</NavLink>
      )
      : ""}
 </div>
    </div>


    <div
        onClick={(e) => remove(e)}
        className={`${style.side} ${
          isOpen ? "visible opacity-1" : "invisible opacity-0"
        } side`}
      >
        <div
          className={`${style.links} animate__animated ${
            isOpen
              ? "animate__fadeInLeft delay-2s"
              : "animate__fadeOutLeft delay-2s"
          }`}
        >
          <h1 className="text-center text-uppercase">Zaha</h1>
          <div className="list-unstyled">
            <NavLink to="/" className={style.nav_link}>Home</NavLink>
          {categories ? categories.map(category => 
      
        <NavLink className={style.nav_link}>{category.name}</NavLink>
      )
      : ""}
          </div>
          <div
            className={`${style.toggle} test`}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <i className="fa-solid fa-angle-left test"></i>
          </div>
        </div>
      </div>
    </>
}