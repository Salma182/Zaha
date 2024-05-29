import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Sets from "./Components/Sets/Sets";
import Shop from "./Components/Shop/Shop";
import Login from "./Components/Login/Login";
import Coats from "./Components/Coats/Coats";
import Layout from "./Components/Layout/Layout";
import Dresses from "./Components/Dresses/Dresses";
import Wishlist from "./Components/Wishlist/Wishlist";
import Notfound from "./Components/Notfound/Notfound";
import Register from "./Components/Register/Register";
import Orders from "./Components/Admin/Orders/Orders.jsx";
import Coupon from "./Components/Admin/Coupon/Coupon.jsx";
import Slider from "./Components/Admin/Slider/Slider.jsx";
import Categories from "./Components/Categories/Categories";
import Reviews from "./Components/Admin/Reviews/Reviews.jsx";
import Questions from "./Components/Admin/Questions/Questions";
import Dashboard from "./Components/Admin/Dashboard/Dashboard.jsx";
import SubCategory from "./Components/Admin/SubCategory/SubCategory";
import SocialLinks from "./Components/Admin/SocialLinks/SocialLinks";
import RecentlyViewd from "./Components/RecentlyViewd/RecentlyViewd";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import EsimateArea from "./Components/Admin/EsimateArea/EsimateArea.jsx";
import ImgForDashboard from "./Components/Admin/ImgForInsta/ImgForInsta.jsx";
import ProductsForDashboard from "./Components/Admin/ProductsForDashboard/ProductsForDashboard";
import CallbacksForDashboard from "./Components/Admin/CallbacksForDashboard/CallbacksForDashboard";
import Checkout from "./Components/Checkout/Checkout.jsx";
import SearchedProducts from "./Components/SearchedProducts/SearchedProducts.jsx";
import { CartProvider } from './CartContext/CartContext.jsx';

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "sets", element: <Sets /> },
      { path: "shop", element: <Shop /> },
      { path: "coats", element: <Coats /> },
      { path: "login", element: <Login /> },
      { path: "dresses", element: <Dresses /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "register", element: <Register /> },
      { path: "recentlyviewd", element: <RecentlyViewd /> },
      { path: `productdetails/:productId`, element: <ProductDetails /> },
      { path: `checkout`, element: <Checkout /> },
      { path: `searchedproducts`, element: <SearchedProducts /> },

      { path: "*", element: <Notfound /> },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <Orders /> },
      { path: "reviews", element: <Reviews /> },
      { path: "slider", element: <Slider /> },
      { path: "area", element: <EsimateArea /> },
      { path: "products", element: <ProductsForDashboard /> },
      { path: "questions", element: <Questions /> },
      { path: "categories", element: <Categories /> },
      { path: "callbacks", element: <CallbacksForDashboard /> },
      { path: "subcategory", element: <SubCategory /> },
      { path: "coupon", element: <Coupon /> },
      { path: "sociallinks", element: <SocialLinks /> },
      { path: "imageforinsta", element: <ImgForDashboard /> },
    ],
  },
]);

export default function App() {

  return <RouterProvider router={routers}></RouterProvider>

}
