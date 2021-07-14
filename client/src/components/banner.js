import React, { useState } from "react";
import { motion } from "framer-motion";
import BannerModel from "./Banner/index";

import { Helmet } from "react-helmet";

const Banner = () => {
  return (
    <>
      <div className="text-center flex container">
        {/* <h1>Let's find Models.</h1> */}
        <div className=" mx-auto px-4">
          <BannerModel />
        </div>
      </div>
    </>
  );
};

export default Banner;
