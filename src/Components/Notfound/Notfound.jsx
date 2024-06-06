import React from "react";
import style from "./Notfound.module.css";

export default function Notfound() {
  return (
    <>
 <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="not-found-title">404</h1>
      <p class="not-found-text">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" class="not-found-link">Go back to Home</a>
    </div>
  </div>    </>
  );
}
