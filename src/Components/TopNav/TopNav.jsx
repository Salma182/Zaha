import React, { useContext, useEffect, useState } from "react"
import style from "./TopNav.module.css"
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../Images/Logo PNG.png'
import CategoriesContext from "../../CategoriesContext/CategoriesContext";
import { AuthContext } from "../../AuthContext/AuthContext";

export default function TopNav ({isOpen, setIsOpen}){

const[categories, setCategories] =useState("")
const { isAdmin, isLoading } = useContext(AuthContext);
const { categoryName, setCategoryName, products, setProducts } = useContext(CategoriesContext);
const navigate= useNavigate()

  function remove(e) {
    if (e.target.classList.contains("side")) {
      setIsOpen(false);
    }
  }

async function specifiCategory(categoryName){
  const{data} = await axios.get(`https://zahaback.com/api/products/category/navbar/${categoryName}`,
  {
    headers: {
      Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
    },
  }
  )
  setProducts(data.products)
  // setIsOpen(false)
}

  async function Categories(){
    const{data}= await axios.get(`https://zahaback.com/api/allcategories`,
    {
      headers: {
        Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
      },
    }
    )
    setCategories(data.allcategories)
    const name = data.allcategories.map((category) => category.name)
    setCategoryName(name)

    console.log("categories",categoryName)
 }

useEffect(() => {
  Categories();
}, []);

    return <>

    <div className="container topnav">
    <div className={style.NavLinks}>
      <NavLink to="/" onClick={()=> setIsOpen(false)} className={style.nav_link}>Home </NavLink>

      {categories ? categories.map(category => 
      <NavLink to={`/category/${category.name}`}
      className={style.nav_link} onClick={() => specifiCategory(category.name)} >{category.name}</NavLink>
      )
      : ""}

      {isAdmin ?
            <NavLink to="dashboard" className={style.nav_link}>Dashboard</NavLink>
         : "" }
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
          <img width={150} src={logo} alt="" />
          <div className={style.NavLinks}>
            <NavLink to="/" onClick={() => setIsOpen(false)} className={style.nav_link}>Home</NavLink>
          {categories ? categories.map(category => 
      
      <NavLink to={`/category/${category.name}`}
      className={style.nav_link} onClick={() => specifiCategory(category.name)} >{category.name}</NavLink>      )
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