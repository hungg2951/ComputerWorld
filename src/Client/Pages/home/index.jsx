import React from "react";
import BannerTopHome from "./banner";
import Products from "./products";

const HomePage = () => {

  return (
    <>
      <div className="max-w-[1220px] mx-auto my-4 mt-32">
        <BannerTopHome/>
        <Products/>
      </div>
    </>
  );
};

export default HomePage;
