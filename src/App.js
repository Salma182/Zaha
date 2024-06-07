import React, { Suspense, useState } from "react";
import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
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
import { SearchProvider } from "./SearchContext/SearchContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import { AuthProvider } from "./AuthContext/AuthContext.jsx";
import { CategoriesProvider } from "./CategoriesContext/CategoriesContext.jsx";
import ChosenCategory from "./Components/ChosenCategory/ChosenCategory.jsx";
import Loading from "./Components/Loading/Loading.jsx";
import { WishlistProvider } from "./WishlistContext/WishlistContext.jsx";
import { CommonProvider } from "./CommonContext/CommonContext.jsx";


const LazyComponent = ({ Component }) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <LazyComponent Component={Home} /> },
      { path: "cart", element: <LazyComponent Component={Cart} /> },
      { path: "sets", element: <LazyComponent Component={Sets} /> },
      { path: "shop", element: <LazyComponent Component={Shop} /> },
      { path: "coats", element: <LazyComponent Component={Coats} /> },
      { path: "login", element: <LazyComponent Component={Login} /> },
      { path: "dresses", element: <LazyComponent Component={Dresses} /> },
      { path: "wishlist", element: <LazyComponent Component={Wishlist} /> },
      { path: "register", element: <LazyComponent Component={Register} /> },
      { path: "productdetails/:productId", element: <LazyComponent Component={ProductDetails} /> },
      { path: "checkout", element: <LazyComponent Component={Checkout} /> },
      { path: "searchedproducts", element: <LazyComponent Component={SearchedProducts} /> },
      { path: "category/:categoryName", element: <LazyComponent Component={ChosenCategory} /> },
      { path: "*", element: <LazyComponent Component={Notfound} /> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <LazyComponent Component={EsimateArea} /> },
      { path: "reviews", element: <LazyComponent Component={Reviews} /> },
      { path: "slider", element: <LazyComponent Component={Slider} /> },
      { path: "area", element: <LazyComponent Component={EsimateArea} /> },
      { path: "orders", element: <LazyComponent Component={Orders} /> },
      { path: "products", element: <LazyComponent Component={ProductsForDashboard} /> },
      { path: "questions", element: <LazyComponent Component={Questions} /> },
      { path: "categories", element: <LazyComponent Component={Categories} /> },
      { path: "callbacks", element: <LazyComponent Component={CallbacksForDashboard} /> },
      { path: "subcategory", element: <LazyComponent Component={SubCategory} /> },
      { path: "coupon", element: <LazyComponent Component={Coupon} /> },
      { path: "sociallinks", element: <LazyComponent Component={SocialLinks} /> },
      { path: "imageforinsta", element: <LazyComponent Component={ImgForDashboard} /> },
      { path: "*", element: <LazyComponent Component={Notfound} /> },

    ],
  },
]);

//   <PrivateRoute path="/dashboard" element={<Dashboard />}>
//   <PrivateRoute index element={<Orders />} />
//   <PrivateRoute path="reviews" element={<Reviews />} />
//   <PrivateRoute path="slider" element={<Slider />} />
//   <PrivateRoute path="area" element={<EsimateArea />} />
//   <PrivateRoute path="products" element={<ProductsForDashboard />} />
//   <PrivateRoute path="questions" element={<Questions />} />
//   <PrivateRoute path="categories" element={<Categories />} />
//   <PrivateRoute path="callbacks" element={<CallbacksForDashboard />} />
//   <PrivateRoute path="subcategory" element={<SubCategory />} />
//   <PrivateRoute path="coupon" element={<Coupon />} />
//   <PrivateRoute path="sociallinks" element={<SocialLinks />} />
//   <PrivateRoute path="imageforinsta" element={<ImgForDashboard />} />
// </PrivateRoute>


export default function App() {
  
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);


  // const authContextValue = { isAuthenticated, isAdmin };

  return <CategoriesProvider>
    <AuthProvider>
     <SearchProvider>
      <CommonProvider>
      <WishlistProvider>
        <CartProvider> 
             <RouterProvider router={routers}></RouterProvider>
         </CartProvider> 
         </WishlistProvider> 
      </CommonProvider>
        </SearchProvider> 
      </AuthProvider> 
    </CategoriesProvider>
}





// const routers = createBrowserRouter(

//   <Routes>
//   <Route path="/" element={<Layout />}>
//     <Route index element={<LazyComponent Component={Home} />} />
//     <Route path="cart" element={<LazyComponent Component={Cart} />} />
//     <Route path="sets" element={<LazyComponent Component={Sets} />} />
//     <Route path="shop" element={<LazyComponent Component={Shop} />} />
//     <Route path="coats" element={<LazyComponent Component={Coats} />} />
//     <Route path="login" element={<LazyComponent Component={Login} />} />
//     <Route path="dresses" element={<LazyComponent Component={Dresses} />} />
//     <Route path="wishlist" element={<LazyComponent Component={Wishlist} />} />
//     <Route path="register" element={<LazyComponent Component={Register} />} />
//     <Route path="productdetails/:productId" element={<LazyComponent Component={ProductDetails} />} />
//     <Route path="checkout" element={<LazyComponent Component={Checkout} />} />
//     <Route path="searchedproducts" element={<LazyComponent Component={SearchedProducts} />} />
//     <Route path="category/:categoryName" element={<LazyComponent Component={ChosenCategory} />} />
//     <Route path="*" element={<LazyComponent Component={Notfound} />} />

//     {/* Dashboard Routes */}
//     <Route path="dashboard" element={<ProtectedRoute element={<Dashboard />} adminOnly />}>
//       <Route index element={<ProtectedRoute element={<Orders />} adminOnly />} />
//       <Route path="reviews" element={<ProtectedRoute element={<Reviews />} adminOnly />} />
//       <Route path="slider" element={<ProtectedRoute element={<Slider />} adminOnly />} />
//       <Route path="area" element={<ProtectedRoute element={<EsimateArea />} adminOnly />} />
//       <Route path="products" element={<ProtectedRoute element={<ProductsForDashboard />} adminOnly />} />
//       <Route path="questions" element={<ProtectedRoute element={<Questions />} adminOnly />} />
//       <Route path="categories" element={<ProtectedRoute element={<Categories />} adminOnly />} />
//       <Route path="callbacks" element={<ProtectedRoute element={<CallbacksForDashboard />} adminOnly />} />
//       <Route path="subcategory" element={<ProtectedRoute element={<SubCategory />} adminOnly />} />
//       <Route path="coupon" element={<ProtectedRoute element={<Coupon />} adminOnly />} />
//       <Route path="sociallinks" element={<ProtectedRoute element={<SocialLinks />} adminOnly />} />
//       <Route path="imageforinsta" element={<ProtectedRoute element={<ImgForDashboard />} adminOnly />} />
//     </Route>
//   </Route>
// </Routes>
  
// );
