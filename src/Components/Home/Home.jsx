import React from "react";
import Carousel from "../Carousel/Carousel.jsx";
import NavsAndTabs from "../NavsAndTabs/NavsAndTabs.jsx";
import Instgram from "./../Instgram/Instgram";
import Contacts from "./../Contacts/Contacts";
import Delivery from "./../Delivery/Delivery";
import BackToTop from "../BackToTop/BackToTop.jsx";

export default function Home() {
  return (
    <>
      <Carousel />
      <NavsAndTabs />
      <Instgram />
      <Contacts />
      <Delivery />
      <BackToTop />
    </>
  );
}
