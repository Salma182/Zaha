import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import style from "./Carousel.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function Carousel() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getProductsFromPage(page) {
    try {
      const { data } = await axios.get(`https://zahaback.com/api/allSlider?page=${page}`);
      console.log(`Data from page ${page}:`, data.slider.data);
      return data.slider.data;
    } catch (error) {
      console.error(`Error fetching products from page ${page}:`, error.response || error);
      return [];
    }
  }

  async function getImgs() {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://zahaback.com/api/allSlider`);
      const { data } = response;
      console.log("API Response:", data);

      if (data && data.sliders) {
        setProducts(data.sliders);
      } else {
        console.error("Unexpected API response structure:", data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getImgs();
    getProductsFromPage()
  }, []);

  const options = {
    margin: 20,
    responsiveClass: true,
    loop: true,
    autoplay: true,
    smartSpeed: 500,
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      550: { items:1 },
      750: { items: 1 },
      1000: { items: 1 },
      1200: { items: 1 },
    },
  };

  return (
   <div className="slider">
      <div className="mt-5"></div>
      {isLoading ? (
        <Loading />
      ) : (
        <OwlCarousel {...options}>
          {products.map((product) => (
            <div
              key={product.id}
              className="mt-5 rounded rounded-3 overflow-hidden position-relative"
            >
              <img
                className="object-fit-cover w-100"
                src={product.path}
                height={700}
                alt="img"
              />
              {/* <div
                className="border-0 d-flex justify-content-center align-items-center"
              >
                <div
                  className="btn fw-bold text-white text-capitalize"
                >
                  View More
                </div>
              </div> */}
            </div>
          ))}
        </OwlCarousel>
      )}
    </div>
  );
}
