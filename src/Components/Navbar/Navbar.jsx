// import React, { useContext, useState } from "react";
// import style from './Navbar.module.css'
// import SearchInput from "./../SearchInput/SearchInput";
// import { NavLink } from "react-router-dom";
// import logo from '../../Images/Logo PNG.png'
// import { AuthContext } from "../../AuthContext/AuthContext";
// import CategoriesContext from "../../CategoriesContext/CategoriesContext";
// import axios from "axios";

// export default function Navbar({isOpen , setIsOpen, setCartOpen, cartOpen}) {

//   const { isAdmin, isAuthenticated } = useContext(AuthContext);
//   const[categories, setCategories] =useState("")
//   const { categoryName, setCategoryName, products, setProducts } = useContext(CategoriesContext);


//   // function remove(e) {
//   //   if (e.target.classList.contains("side")) {
//   //     setIsOpen(false);
//   //   }
//   // }

//   const remove = (e) => {
//     e.stopPropagation();
//     setIsOpen(false);
//   };

//   async function specifiCategory(categoryName){
//     const{data} = await axios.get(`https://zahaback.com/api/products/category/navbar/${categoryName}`
//     )
//     setProducts(data.products)
//     // setIsOpen(false)
//   }

//   async function Categories(){
//     const{data}= await axios.get(`https://zahaback.com/api/allcategories`
//     )
//     setCategories(data.allcategories)
//     const name = data.allcategories.map((category) => category.name)
//     setCategoryName(name)

//     //console.log("categories",categoryName)
//  }

//  const handleCategoriesClick = (e) =>{
//   e.preventdefault()
//   setIsOpen(true);
//  }

//   return (
//     <>
//     <div> 
//       <nav className={`bg-color p-2 text-capitalize fixed-bottom bottom-navbar`}>
//         <div className="container d-flex justify-content-around align-items-center ">
//           <div className="ico d-flex align-items-center justify-content-center small flex-column dark-color pointer">
//             <i className="fa-solid small fa-layer-group"></i>
//             <NavLink onClick={handleCategoriesClick} className={style.nav_link}>Categories</NavLink>
//           </div>
//           <div className="ico d-flex align-items-center justify-content-center small flex-column dark-color pointer">
//             <i className="fa-solid small fa-circle-user"></i>
//             <NavLink className={style.nav_link}>Account</NavLink>
//           </div>
//           <div className="ico small d-flex align-items-center justify-content-center small flex-column dark-color pointer">
//             <i className="fa-solid small fa-heart"></i>
//             <NavLink className={style.nav_link} >Wishlist</NavLink>
//           </div>

//           <div className="ico small d-flex align-items-center justify-content-center small flex-column dark-color pointer">
//             <i className="fa-solid small fa-heart"></i>
//             <NavLink
//              onClick={() => setCartOpen((cart) => !cart)}
//              className={style.nav_link}>Cart</NavLink>
//           </div>
//         </div>
//       </nav>

//       <div
//         onClick={(e) => remove(e)}
//         className={`${style.side} ${isOpen ? 'visible opacity-1' : 'invisible opacity-0'} side`}
//       >
//         <div
//           className={`${style.links} animate__animated ${
//             isOpen ? 'animate__fadeInLeft delay-2s' : 'animate__fadeOutLeft delay-2s'
//           }`}
//         >
//           <img width={150} src={logo} alt="" />
//           <div className={style.NavLinks}>
//             <NavLink to="/" onClick={() => setIsOpen(false)} className={style.nav_link}>Home</NavLink>
//             {categories ? categories.map(category => (
//               <NavLink
//                 key={category.name}
//                 to={`/category/${category.name}`}
//                 className={style.nav_link}
//                 onClick={() => {
//                   setIsOpen(false);
//                   specifiCategory(category.name);
//                 }}
//               >
//                 {category.name}
//               </NavLink>
//             )) : ""}
//             {isAdmin && isAuthenticated ? (
//               <NavLink to="dashboard" className={style.nav_link}>Dashboard</NavLink>
//             ) : ""}
//           </div>
//           <div
//             className={`${style.toggle} test`}
//             onClick={() => {
//               setIsOpen(false);
//             }}
//           >
//             <i className="fa-solid fa-angle-left test"></i>
//           </div>
//         </div>
//       </div>
//       </div>
//     </>
//   );
// }
