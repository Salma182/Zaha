import React, { useEffect, useRef, useState } from "react";
import style from "./SearchInput.module.css";
import "animate.css";
import axios from "axios";
import SearchedProducts from "../SearchedProducts/SearchedProducts";
import { useNavigate } from "react-router-dom";

export default function SearchInput({ searchOpen, setSearchOpen }) {
  const[input, setInput] =useState("")
    const [products, setProducts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchBoxRef = useRef(null);
    const [loading, setLoading] = useState(false);
  const navigate= useNavigate()

  function remove(e) {
    if (e.target.classList.contains("search")) {
      setSearchOpen(false);
    }
  }

  const debounce = (func, delay) => {
    let timer;
    const debouncedFunction = (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
    debouncedFunction.cancel = () => clearTimeout(timer);
    return debouncedFunction;
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setShowResults(true);
  
    if (value === "") {
      setShowResults(false);
    } else {
      handleSearchDebounced(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/searchedproducts")
    setShowResults(false);
    Search();
  };

  async function Search(){
    setLoading(true);
    try{
      const {data}= await axios.get(`https://zahaback.com/api/userproduct/search?search=`,
      {
        params: {
          search: input,
        },
        headers: {
          Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
        },
      }
        )  
        setProducts(data.products);
        setShowResults(data.products.length > 0); 
        console.log(data.products);
    }catch(error){
      setShowResults(false);
    console.error(error)
    }finally {
      setLoading(false);
    }
  }

  const handleSearchDebounced = debounce(Search, 2000);

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setShowResults(false);
    }
  };

  // if (products && products.length > 0) 
  // {navigate("/searchedProducts")}
   

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      handleSearchDebounced.cancel(); 
    };
    
  }, []);


  return (
    <>
<div className="d-flex flex-column w-75">
<div className={style.search_bar}>
  <form onSubmit={handleSearchSubmit} className="w-100">
  <input
        type="text"
        className={style.search_input}
        placeholder="I'm shopping for ..."
        onChange={(e)=>handleSearchChange(e)}
      />
  </form>
  <button className={style.search_button}>
        <i className="fa fa-search"></i>
      </button>
    </div>

    {showResults && (
        <div ref={searchBoxRef} className={`${style.searchbox} ${style.searchbox_visible}`}>
           {loading && <div>Loading...</div>}
          {products ? products.map((product) => (
            <div key={product.id} className="d-flex col">
              <img width={80} src={product.images[0]} alt={product.name} />
              <div className="d-flex flex-column">
                <h5>{product.name}</h5>
                <h6>{product.price}</h6>
              </div>
            </div>
          )):
        
          <div ref={searchBoxRef} className={`${style.searchbox} ${style.searchbox_visible}`}>
          <h5>Sorry. No Results match your search</h5>
           </div>
           }
        </div>
      )}

      {/* {products ? <SearchedProducts products={products} /> : ""} */}

</div>



      <div
        onClick={(e) => remove(e)}
        className={`${style.side} ${
          searchOpen ? "visible opacity-1 " : "invisible opacity-0 "
        } search`}
      >
    <div className={`${style.links} p-3 animate__animated`}>  
          <div className="container">
            <div className="d-flex align-items-center justify-content-center">
              <input
                type="search"
                className={style.search_input}
                placeholder="I'm shopping for ..."
                onChange={(e)=>handleSearchChange(e)}
              />
              <i
                // onClick={() => setSearchOpen(false)}  
                onClick={() => setShowResults(false)}
                className="fa-regular fa-circle-xmark text-white ms-3 pointer fs-3"
              ></i>
            </div>

           </div>
    </div>
       
      </div>
    </>
  );
}
