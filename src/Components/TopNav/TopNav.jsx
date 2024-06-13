import React, { useContext, useEffect, useState } from "react";
import style from "./TopNav.module.css"
import { NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import logo from '../../Images/Logo PNG.png';
import SearchInput from "./../SearchInput/SearchInput";
import Cart from "./../Cart/Cart";
import Wishlist from './../Wishlist/Wishlist';
import { AuthContext } from "../../AuthContext/AuthContext";
import CategoriesContext from "../../CategoriesContext/CategoriesContext";
import axios from "axios";

export default function TopNav({isOpen, setIsOpen,wishlistOpen,setWishlistOpen }) {
  // const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  // const [wishlistOpen, setWishlistOpen] = useState(false);
  const [categories, setCategories] = useState("");
const navigate =useNavigate()
  const { isAdmin, isAuthenticated } = useContext(AuthContext);
  const { categoryName, setCategoryName, setProducts, setOptions , setloading} = useContext(CategoriesContext);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await axios.get(`https://zahaback.com/api/allcategories`);
      setCategories(data.allcategories);
      const names = data.allcategories.map((category) => category.name);
      setCategoryName(names);
    }

    fetchCategories();
  }, []);

  const specifiCategory = async (categoryName) => {
    setloading(true)
    try{
      const { data } = await axios.get(`https://zahaback.com/api/products/category/navbar/${categoryName}`);
      setProducts(data.products);
        const subcategories = data.products.map(product => product.subcategory);
  
      const uniqueSubcategories = [...new Set(subcategories)];
      
      const formattedOptions = [
        { value: 'All', label: 'All' },
        ...uniqueSubcategories.map(subcategory => ({
          value: subcategory,
          label: subcategory,
        })),
      ];
      setCategoryName(categoryName)
      setOptions(formattedOptions);
    }catch(e){
    }finally{
      setloading(false)
    }
    }
   

  const handleCategoriesClick = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const remove = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };
  const handleprofile = () => {
    navigate("/profile");
  };

  const handlelogin = () => {
    navigate("login");
  };

  return (
    <>
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <Wishlist wishlistOpen={wishlistOpen} setWishlistOpen={setWishlistOpen} />

      <nav className="bg-color p-3 text-capitalize fixed-top dark-color shadowx">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" width={150} />
            </Link>
          </div>

          <SearchInput searchOpen={searchOpen} setSearchOpen={setSearchOpen} />

          <div className="icons d-flex">
            <i onClick={handlelogin}
            className="fa-solid fa-user fs-5 mt-1 me-3 small pointer loginicon"
            ></i>

          {/* <Link className="text-decoration-none text-dark fw-bold me-2" to="login">Login</Link> */}
          {/* <Link className="text-decoration-none text-dark fw-bold me-2" to="register">Register</Link> */}

            <i
              onClick={() => setSearchOpen(true)}
              className="fa-solid fa-magnifying-glass fs-5 me-3 mt-1 pointer search-icon"
            ></i>

            <i
              onClick={() => setCartOpen((cart) => !cart)}
              className={`fa-solid fa-cart-arrow-down fs-5 mt-1  me-3 small pointer carticon`}
            ></i>

            <i
              onClick={() => setWishlistOpen((wishlist) => !wishlist)}
              className={`fa-regular fa-heart fs-5 mt-1 small pointer wishlisticon`}
            ></i>

          </div>
        </div>
        <div className="container topnav">
          <div className={style.NavLinks}>
            <NavLink to="/" className={style.nav_link}>Home</NavLink>
            {categories ? categories.map(category => 
              <NavLink 
                key={category.name} 
                to={`/category/${category.name}`} 
                className={style.nav_link} 
                onClick={() => specifiCategory(category.name)}
              >
                {category.name}
              </NavLink>
            ) : ""}
            {isAdmin && isAuthenticated ?
              <NavLink to="dashboard" className={style.nav_link}>Dashboard</NavLink>
            : ""}
          </div>
        </div>
      </nav>

      <nav className={`bg-color p-2 text-capitalize fixed-bottom bottom-navbar`}>
        <div className="container d-flex justify-content-around align-items-center">
          <div className="ico d-flex align-items-center justify-content-center small flex-column dark-color pointer">
            <i className="fa-solid fs-4 fa-layer-group mt-1 pointer" onClick={(e)=>handleCategoriesClick(e)}></i>
          </div>
          {/* <div className="ico d-flex align-items-center justify-content-center small flex-column dark-color pointer">
            <i onClick={handleprofile}
            className="fa-solid fa-circle-user fs-4 mt-1 pointer"> </i>
          </div> */}
          <div className="ico small d-flex align-items-center justify-content-center small flex-column dark-color pointer">
          <i onClick={() => setWishlistOpen((wishlist) => !wishlist)}
           className="fa-regular fa-heart fs-4  mt-1 pointer">
          </i>
          </div>
          <div className="ico small d-flex align-items-center justify-content-center small flex-column dark-color pointer">
          <i
              onClick={() => setCartOpen((cart) => !cart)}
              className="fa-solid fs-4 fa-cart-arrow-down mt-1 me-3 pointer"
            ></i>
          </div>
        </div>
      </nav>

      <div
        onClick={(e) => remove(e)}
        className={`${style.side} ${isOpen ? 'visible opacity-1' : 'invisible opacity-0'} side`}
      >
        <div
          className={`${style.links} animate__animated ${isOpen ? 'animate__fadeInLeft delay-2s' : 'animate__fadeOutLeft delay-2s'}`}
        >
          <img width={150} src={logo} alt="Logo" />
          <div className={style.NavLinks}>
            <NavLink to="/" onClick={() => setIsOpen(false)} className={style.nav_link}>Home</NavLink>
            {categories ? categories.map(category => (
              <NavLink
                key={category.name}
                to={`/category/${category.name}`}
                className={style.nav_link}
                onClick={() => {
                  setIsOpen(false);
                  specifiCategory(category.name);
                }}
              >
                {category.name}
              </NavLink>
            )) : ""}
            {isAdmin && isAuthenticated ? (
              <NavLink to="dashboard" className={style.nav_link}>Dashboard</NavLink>
            ) : ""}
          </div>
          <div
            className={`${style.toggle} test`}
            onClick={() => setIsOpen(false)}
          >
            <i className="fa-solid fa-angle-left test"></i>
          </div>
        </div>
      </div>
    </>
  );
}









// import React, { useContext, useEffect, useState } from "react"
// import style from "./TopNav.module.css"
// import axios from "axios";
// import { NavLink, useNavigate } from "react-router-dom";
// import logo from '../../Images/Logo PNG.png'
// import CategoriesContext from "../../CategoriesContext/CategoriesContext";
// import { AuthContext } from "../../AuthContext/AuthContext";

// export default function TopNav ({isOpen, setIsOpen}){

// const[categories, setCategories] =useState("")
// const { isAdmin, isAuthenticated } = useContext(AuthContext);
// const { categoryName, setCategoryName, products, setProducts } = useContext(CategoriesContext);
// const navigate= useNavigate()

//   function remove(e) {
//     if (e.target.classList.contains("side")) {
//       setIsOpen(false);
//     }
//   }

// async function specifiCategory(categoryName){
//   const{data} = await axios.get(`https://zahaback.com/api/products/category/navbar/${categoryName}`
//   )
//   setProducts(data.products)
//   // setIsOpen(false)
// }

//   async function Categories(){
//     const{data}= await axios.get(`https://zahaback.com/api/allcategories`
//     )
//     setCategories(data.allcategories)
//     const name = data.allcategories.map((category) => category.name)
//     setCategoryName(name)

//     //console.log("categories",categoryName)
//  }

// useEffect(() => {
//   Categories();
// }, []);

//     return <>

//     <div className="container topnav">
//     <div className={style.NavLinks}>
//       <NavLink to="/" className={style.nav_link}>Home </NavLink>

//       {categories ? categories.map(category => 
//       <NavLink to={`/category/${category.name}`}
//       className={style.nav_link} onClick={() => specifiCategory(category.name)} >{category.name}</NavLink>
//       )
//       : ""}

//       {isAdmin && isAuthenticated ?
//             <NavLink to="dashboard" className={style.nav_link}>Dashboard</NavLink>
//          : "" }
//  </div>
//     </div>


//     <div
//         onClick={(e) => remove(e)}
//         className={`${style.side} ${
//           isOpen ? "visible opacity-1" : "invisible opacity-0"
//         } side`}
//       >
//         <div
//           className={`${style.links} animate__animated ${
//             isOpen
//               ? "animate__fadeInLeft delay-2s"
//               : "animate__fadeOutLeft delay-2s"
//           }`}
//         >
//           <img width={150} src={logo} alt="" />
//           <div className={style.NavLinks}>
//             <NavLink to="/" onClick={() => setIsOpen(false)} className={style.nav_link}>Home</NavLink>
//           {categories ? categories.map(category => 
      
//       <NavLink to={`/category/${category.name}`}
//       className={style.nav_link} onClick={() =>{
//         setIsOpen(false);
//         specifiCategory(category.name)}}>
//           {category.name}</NavLink>      )
//       : ""}

//        {isAdmin && isAuthenticated ?
//             <NavLink to="dashboard" className={style.nav_link}>Dashboard</NavLink>
//          : "" }
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
//     </>
// }