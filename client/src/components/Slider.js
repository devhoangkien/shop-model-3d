import React, { useState } from "react";
import { motion } from "framer-motion";
import ShoeSider from "./Shoe-models/Index";

import { Helmet } from "react-helmet";

const Slider = () => {
  return (
    <>
      <div className="grid flex gap-14 md:grid-cols-2 pb-10">
        <ShoeSider />
        <div className="mx-auto max-w-sm md:max-w-full">
          <h3> Models</h3>
          <h2 className="text-4xl md:text-5xl text-gray-700 mt-5 mb-3">
            Shoe Draco
          </h2>
          <p className="text-gray-500 prose">
            {" "}
            Nissan S30 - a sports car produced by Nissan Motors in Japan from
            1969 to 1978. In the Japanese market it is presented under the name
            Fairlady Z, in other markets under the names Datsun 240z, and then
            Datsun 260z and Datsun 280z. Model is made in blender 2.92
          </p>
          <br />
          <a
            className=" bg-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-200 text-white px-5 py-2 rounded-md transition-shadow duration-300"
            href="#"
          >
            Download Models
          </a>
        </div>
      </div>
    </>
  );
};

export default Slider;
