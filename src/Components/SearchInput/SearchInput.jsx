import React from "react";
import style from "./SearchInput.module.css";
import "animate.css";

export default function SearchInput({ searchOpen, setSearchOpen }) {
  function remove(e) {
    if (e.target.classList.contains("search")) {
      setSearchOpen(false);
    }
  }
  return (
    <>

<div className={style.search_bar}>
      <input
        type="text"
        className={style.search_input}
        placeholder="I'm shopping for ..."
      />
      <button className={style.search_button}>
        <i className="fa fa-search"></i>
      </button>
    </div>


      <div
        onClick={(e) => remove(e)}
        // className={`${style.side}`}
        className={`${style.side} ${
          searchOpen ? "visible opacity-1 " : "invisible opacity-0 "
        } search`}
      >

        <div className={`${style.links} p-3 animate__animated`}>
          <div className="container">
            <div className="d-flex align-items-center justify-content-center">
              <input
                type="search"
                className="form-control p-2 mx-auto"
                placeholder="Search By Name.."
              />
              <i
                onClick={() => setSearchOpen(false)}
                className="fa-regular fa-circle-xmark text-white ms-3 pointer fs-3"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
