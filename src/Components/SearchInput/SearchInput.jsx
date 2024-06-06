import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./SearchInput.module.css";
import "animate.css";
import axios from "axios";
import SearchedProducts from "../SearchedProducts/SearchedProducts";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../SearchContext/SearchContext";

export default function SearchInput({ searchOpen, setSearchOpen }) {
  const {
    input, setInput,
    products, setProducts,
    showResults, setShowResults,
    loading, setLoading
  } = useContext(SearchContext);
  const token = localStorage.getItem('token');
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();

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
  
    if (value === "" || value === " ") {
      setShowResults(false);
    } else {
      handleSearchDebounced(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      setShowResults(false);
      setSearchOpen(false);
    } else {
      setShowResults(false); 
       setSearchOpen(false);
      navigate("/searchedproducts");
    }
  }

  const Search = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://zahaback.com/api/userproduct/search?search=`, {
        params: { search: input },
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(data.products);
      setShowResults(data.products.length > 0 ? true : false);
      console.log(data.products);
    } catch (error) {
      setShowResults(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchDebounced = debounce(Search, 3000);

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setShowResults(false);
    }
  };

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
        onKeyDown={handleSearchDebounced}
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
            <form onSubmit={handleSearchSubmit} className="w-100">
              <input
                type="search"
                className={style.search_input}
                placeholder="I'm shopping for ..."
                onChange={(e)=>handleSearchChange(e)}
              />
              </form>
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
