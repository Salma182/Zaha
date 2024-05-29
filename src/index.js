import React from "react";
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import "jquery/dist/jquery.slim.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { CartProvider } from "./CartContext/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <CartProvider>
            <App />
    </CartProvider>
);
