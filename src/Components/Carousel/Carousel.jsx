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
      const { data } = await axios.get(
        `https://zahaback.com/api/slider/all?page=${page}`,
        {
          headers: {
            Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
          },
        }
      );
      return data.slider.data;
    } catch (error) {
      console.error(`Error fetching products from page ${page}:`, error);
      return [];
    }
  }

  async function getImgs() {
    try {
      const { data } = await axios.get(
        `https://zahaback.com/api/slider/all`,
        {
          headers: {
            Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
          },
        }
      );

      const { slider } = data;
      const { last_page } = slider;

      let allProducts = [];
      for (let page = 1; page <= last_page; page++) {
        const productsFromPage = await getProductsFromPage(page);
        allProducts = [...allProducts, ...productsFromPage];
      }

      setProducts(allProducts);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getImgs();
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
              className={`${style.item} mt-5 rounded rounded-3 overflow-hidden position-relative`}
            >
              <img
                className="object-fit-cover w-100"
                src={product.path}
                height={700}
                alt="img"
              />
              {/* <div
                className={`${style.layer} border-0 d-flex justify-content-center align-items-center`}
              >
                <div
                  className={`btn ${style.btn} fw-bold text-white text-capitalize`}
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
