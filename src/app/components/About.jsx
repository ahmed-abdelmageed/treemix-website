"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AboutImage from "../../assets/images/icons/about-img.png";
import { useRouter } from "next/navigation"; 
const AboutHome = () => {
  const router = useRouter(); 
  return (
    <motion.section
      className="min-h-screen flex justify-center items-center bg-white px-4 sm:px-6 lg:py-[23px] lg:px-[120px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <motion.div
          className="space-y-6 home-about-content text-start lg:text-left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="flex flex-col items-center lg:items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold">Tree Mix</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="88"
              height="24"
              viewBox="0 0 88 24"
              fill="none"
            >
              <path
                d="M76.7223 0.160479C42.4874 -0.95226 21.2534 3.88381 5.99276 9.64345C-2.34906 12.7918 -1.1699 23.5378 7.74331 23.7676C31.4581 24.3791 55.9719 16.45 78 13.5358C90.8919 11.8302 89.7197 0.582934 76.7223 0.160479Z"
                fill="#0F9144"
              />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Experience The Richness <br className="hidden sm:block" /> Of Our
            Products
          </h1>

          <p className="text-gray-600 text-base sm:text-lg">
            Discover our premium Herbs & Spices and enhance your creations with{" "}
            <span className="font-bold maincolor">High Quality.</span>
          </p>

          <p className="text-gray-600 text-base sm:text-lg">
            Our Products are sourced from the finest farms and are carefully
            processed to retain their natural flavors and aromas. Our Products
            are available in various cut sizes including:
          </p>

          <p>
            <span className="font-bold maincolor">
              “ Whole leaves, Flowers, Coarse Cut, TBC, Powder ”
            </span>
          </p>

          <p className="text-gray-600 text-base sm:text-lg">
            We are dedicated to ensuring that our natural products meet your
            specific requirements.
          </p>

          <motion.button
            className="px-6 py-2 border border-green-600 maincolor rounded-full w-full sm:w-auto hover:bg-green-100 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/about")} // Navigate to /about
          >
            About us
          </motion.button>
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="relative flex justify-end items-center"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-green-100 opacity-50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          ></motion.div>
          <motion.div
            className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-green-50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          ></motion.div>
          <Image
            src={AboutImage}
            alt="Fresh spices in a bowl"
            className="rounded-full z-10 object-cover"
            width={400}
            height={400}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutHome;
