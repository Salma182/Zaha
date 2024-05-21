import React, { useState, useEffect } from "react";
import style from "./BackToTop.module.css";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  function back() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  useEffect(() => {
    // component did mount
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // component will unmount ==> remove Event
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      onClick={() => back()}
      className={`${style.back} ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <i className="fa-solid fa-angle-up"></i>
    </div>
  );
}
