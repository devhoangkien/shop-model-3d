import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  return (
    <>
      <div class="container mx-auto px-4">
        <div class="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
          <div class="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6">
            <h5 class="text-xl font-bold mb-6">Features</h5>
            <ul class="list-none footer-links">
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Cool stuff
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Random feature
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Team feature
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Stuff for developers
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Another one
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Last time
                </a>
              </li>
            </ul>
          </div>
          <div class="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 sm:mt-0">
            <h5 class="text-xl font-bold mb-6">Resources</h5>
            <ul class="list-none footer-links">
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Resource
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Resource name
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Another resource
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Final resource
                </a>
              </li>
            </ul>
          </div>
          <div class="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
            <h5 class="text-xl font-bold mb-6">About</h5>
            <ul class="list-none footer-links">
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Team
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Locations
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Privacy
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
          <div class="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
            <h5 class="text-xl font-bold mb-6">Help</h5>
            <ul class="list-none footer-links">
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Support
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Help Center
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div class="px-4 mt-4 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto">
            <h5 class="text-xl font-bold mb-6 sm:text-center xl:text-left">
              Stay connected
            </h5>
            <div class="flex sm:justify-center xl:justify-start">
              <a
                href=""
                class="w-8 h-8 border border-2 border-gray-400 rounded-full text-center py-1 text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600"
              >
                <i class="fab fa-facebook"></i>
              </a>
              <a
                href=""
                class="w-8 h-8 border border-2 border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-blue-400 hover:border-blue-400"
              >
                <i class="fab fa-twitter"></i>
              </a>
              <a
                href=""
                class="w-8 h-8 border border-2 border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-red-600 hover:border-red-600"
              >
                <i class="fab fa-google-plus-g"></i>
              </a>
            </div>
          </div>
        </div>
        <hr />
        <p className="sm:items-center text-gray-500 ">
          @Copy right by Team TTCN
        </p>
        <br />
      </div>
    </>
  );
}

export default Footer;
