// pages/about.js

"use client";

import React, { useEffect, useState } from "react";
import "./About.scss";
import Image from "next/image";
import HeaderImage from "../../assets/images/header.png";
import HerbImage from "../../assets/images/herbs.png";
import WhoWeAre from "../../assets/images/whoWeAre.png";
import HistoryImage from "../../assets/images/history.png";
import menVector from "../../assets/images/vector-men.png";
import womenVector from "../../assets/images/vector-women.png";
import successImage from "../../assets/images/successImage.png";
import successImg from "../../assets/images/successImg.png";
import left from "../../assets/images/left.png";
import right from "../../assets/images/right.png";
import CountUp from "react-countup";
import Slider from "react-slick";
import { Breadcrumb } from "antd";
import { motion } from "framer-motion";
const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 },
    },
  ],
};

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [ourExperience, setOurExperience] = useState([]);
  const [whoWeAreDescription, setWhoWeAreDescription] = useState("");
  const [breadcrumbItems, setBreadcrumbItems] = useState(["Home", "About"]);

  useEffect(() => {
    // Fetch experience data from API
    const fetchOurExperience = async () => {
      try {
        const response = await fetch(
          "https://backend.treemix-eg.com/api/ourExperience.index"
        );
        const data = await response.json();

        if (data.success && data.ourExperience) {
          setOurExperience(data.ourExperience);
        } else {
          console.error("Failed to fetch our experience data");
        }
      } catch (error) {
        console.error("Error fetching our experience data:", error);
      }
    };

    fetchOurExperience();
  }, []);
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("https://backend.treemix-eg.com/api/about.index");
        const data = await response.json();

        if (data.success && data.about.length > 0) {
          const whoWeAre = data.about.find((item) => item.title === "Who We Are");
          if (whoWeAre) {
            setWhoWeAreDescription(whoWeAre.description);
          }
        } else {
          console.error("Failed to fetch About data");
        }
      } catch (error) {
        console.error("Error fetching About data:", error);
      }
    };

    fetchAboutData();
  }, []);
  useEffect(() => {
    // Fetch data from API
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(
          "https://backend.treemix-eg.com/api/team.index"
        );
        const data = await response.json();

        if (data.success && data.team) {
          setTeamMembers(data.team);
        } else {
          console.error("Failed to fetch team members");
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);
  return (
    <div className="about-container">
      {/* Header Section */}
      <div className="about-head flex flex-col lg:flex-row items-center mt-12 h-[150px] lg:h-[200px]">
      <div className="flex w-full justify-between items-center relative h-full">
                   <div className="absolute left-0 lg:static">
                     <Image
                       src={left}
                       alt="Left Image"
                       width={200}
                       height={100}
                       className="left-image"
                     />
                   </div>
       
                   <div className="flex flex-col items-center mx-auto h-full justify-center">
                     <Breadcrumb
                       separator={
                         <span
                           className="mx-4"
                           style={{ color: "#1e874c", fontSize: "24px" }}
                         >
                           &gt;
                         </span>
                       }
                     >
                       {breadcrumbItems.map((item, index) => (
                         <Breadcrumb.Item
                           key={index}
                           onClick={() => item === "Home" && router.push("/")}
                           className="cursor-pointer text-green-600 text-[24px]"
                           style={{ color: "#1e874c", fontSize: "24px" }}
                         >
                           {item}
                         </Breadcrumb.Item>
                       ))}
                     </Breadcrumb>
                   </div>
       
                   <div className="absolute right-0 lg:static">
                     <Image
                       src={right}
                       alt="Right Image"
                       width={200}
                       height={100}
                       className="right-image"
                     />
                   </div>
                 </div>
      </div>

      {/* Who We Are Section */}
      <motion.div
        className="section who-we-are mb-8 px-2 mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="content w-full lg:w-1/2  sm:mx-6 md:mx-8 lg:mx-12 xl:mx-8">
          <motion.h2
            className="section-title text-2xl lg:text-4xl font-semibold text-primary"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Who We Are ?
          </motion.h2>
          <motion.p
          className="section-text text-base lg:text-lg mt-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          dangerouslySetInnerHTML={{ __html: whoWeAreDescription }}
        />
        </div>

        <motion.div
          className="image-container w-full lg:w-1/2 mt-6 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Image
            src={WhoWeAre}
            alt="Herbs Bowl"
            className="herb-image mx-auto lg:mx-0"
          />
        </motion.div>
      </motion.div>

      {/* Trusted Herbs Section */}
      <motion.div
        className="section trusted-herbs mx-4 md:mx-12 mb-12 flex flex-col md:flex-row items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.div
          className="image-container ml-0 md:ml-12 mb-6 md:mb-0 w-full md:w-2/5"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Image
            src={HerbImage}
            alt="Trusted Organic Herbs"
            className="trusted-herbs-image w-full h-auto rounded-lg shadow-md"
          />
        </motion.div>
        <motion.div
          className="content w-full md:w-3/5 md:mr-14"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl text-bold mb-4 font-medium ">
          Our Services
          </h2>
          <p className="section-text  text-sm md:text-base text-gray-600 mb-2">
            We provide premium-quality herbs, ensuring the highest standards of
            freshness and purity. Our commitment guarantees exceptional quality
            and trust.
          </p>
          <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "🌿 Quality  ",
              "📦 Export",
              "🚢 Shipping",
              "💼 Commitments",
              "💳 Payment Term",
              "🛠️ Sterilization",
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature flex items-center gap-4  rounded-lg "
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 * index,
                }}
              >
                <span className="icon bg-green-200 p-3 rounded-full">
                  {feature.split(" ")[0]}
                </span>
                <p className="text-sm md:text-base text-gray-600">
                  <strong className="text-gray-900">
                    {feature.split(" ")[1]}
                  </strong>
                  <br />{" "}
                  {index === 0
                    ? "Premium Products"
                    : index === 1
                    ? "Export over the world."
                    : index === 2
                    ? "Sea (FCL - LCL - River) / Air."
                    : index === 3
                    ? "Follow up with our customers."
                    : index === 4
                    ? "Advanced / CAD / LC."
                    : "Steam & ETO & CO2."}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Our Experience Section */}
      <motion.div
        className="our-experience mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 mb-12 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileInView={{ duration: 1 }}
        >
          Our Experience
        </motion.h2>
        <div className="experience-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-14">
          {ourExperience.map((experience) => (
            <motion.div
              key={experience.id}
              className="experience-card bg-white shadow-md rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: experience.id * 0.2,
              }}
            >
              <h3 className="text-4xl font-bold text-primary mb-2">
                <CountUp
                  start={0}
                  end={parseInt(experience.years)}
                  duration={2.5}
                />
              </h3>
              <p className="text-gray-700 text-lg">{experience.title}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Our History Section */}
      <div className="section our-history mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 mb-8">
        <div className="content mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16">
          <h2 className="section-title justify-center flex flex-row gap-2 mt-8 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="41"
                viewBox="0 0 40 41"
                fill="none"
              >
                <g clipPath="url(#clip0_578_10604)">
                  <path
                    d="M3.50985 1.03895C3.56312 0.843152 3.69569 0.678413 3.87571 0.584636C4.23092 0.396679 4.67126 0.532269 4.85932 0.887478C4.85982 0.888382 4.86032 0.889287 4.86073 0.890192C4.86073 0.910294 8.5475 8.06272 19.8651 9.30906C21.3415 9.46657 22.7845 9.85173 24.1429 10.4509C26.5744 11.508 28.5825 13.3477 29.848 15.6775C31.0294 17.8659 31.5187 20.3614 31.2511 22.8339C31.054 24.6363 30.452 26.3709 29.4902 27.9078C31.5004 29.3511 37.8769 34.3405 38.4518 39.6958C38.494 40.0954 38.2041 40.4537 37.8045 40.4959C37.4048 40.5381 37.0466 40.2482 37.0044 39.8486C36.4777 35.0682 30.4953 30.4326 28.6298 29.0898C26.3904 31.8398 23.0373 33.3917 19.439 33.645C17.0171 33.8013 14.5924 33.3883 12.3589 32.4389C9.93436 31.4216 7.79306 29.8308 6.11913 27.8032C1.80516 22.5766 -0.249298 13.7919 3.50985 1.03895ZM28.2116 27.1881C28.4891 26.7512 28.7336 26.2943 28.9434 25.8211C29.3848 24.8228 29.6696 23.7624 29.7877 22.6771C30.0339 20.4995 29.6134 18.2984 28.5815 16.365C27.4662 14.3152 25.6971 12.6975 23.5559 11.7696C22.3318 11.2366 21.0326 10.8962 19.7043 10.7605C12.2343 9.95636 7.8399 6.63143 5.57235 4.21914C6.90464 8.60538 9.19842 12.6393 12.2865 16.0273L12.7288 11.5726C12.7513 11.1713 13.0949 10.8643 13.4961 10.8868C13.8973 10.9093 14.2044 11.2529 14.1819 11.6541C14.1808 11.6739 14.1789 11.6937 14.1762 11.7133L13.6093 17.4385C16.9905 20.8679 21.6904 24.3135 28.2116 27.1881ZM7.24487 26.8705V26.8745C8.76581 28.7262 10.714 30.1806 12.9218 31.1121C14.952 31.9701 17.1555 32.3391 19.3545 32.1896C22.4158 32.0345 25.2886 30.6639 27.3352 28.3822C24.9368 27.3209 22.6178 26.0888 20.3958 24.6954L14.0073 25.9016C13.6103 25.9638 13.238 25.6923 13.1758 25.2953C13.1158 24.9123 13.3665 24.5495 13.746 24.4703L18.655 23.5415C16.3883 21.9848 14.2784 20.2115 12.3549 18.2466C12.3196 18.2162 12.2873 18.1826 12.2584 18.1461C7.18456 12.8632 5.02556 7.63655 4.12498 4.42017C1.64032 15.0181 3.54201 22.3917 7.24487 26.8705Z"
                    fill="#00B307"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_578_10604">
                    <rect
                      width="40"
                      height="40"
                      fill="white"
                      transform="matrix(-1 0 0 1 40.0002 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
            Our History
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="41"
                viewBox="0 0 40 41"
                fill="none"
              >
                <g clipPath="url(#clip0_578_10609)">
                  <path
                    d="M36.4905 1.03895C36.4372 0.843152 36.3046 0.678413 36.1246 0.584636C35.7694 0.396679 35.3291 0.532269 35.141 0.887478C35.1405 0.888382 35.14 0.889287 35.1396 0.890192C35.1396 0.910294 31.4528 8.06272 20.1352 9.30906C18.6589 9.46657 17.2158 9.85173 15.8574 10.4509C13.4259 11.508 11.4178 13.3477 10.1524 15.6775C8.97095 17.8659 8.48165 20.3614 8.74922 22.8339C8.94632 24.6363 9.54829 26.3709 10.5102 27.9078C8.49995 29.3511 2.12348 34.3405 1.54855 39.6958C1.50633 40.0954 1.79621 40.4537 2.19584 40.4959C2.59558 40.5381 2.9537 40.2482 2.99592 39.8486C3.5226 35.0682 9.50507 30.4326 11.3706 29.0898C13.61 31.8398 16.963 33.3917 20.5614 33.645C22.9832 33.8013 25.408 33.3883 27.6414 32.4389C30.066 31.4216 32.2073 29.8308 33.8812 27.8032C38.1952 22.5766 40.2496 13.7919 36.4905 1.03895ZM11.7887 27.1881C11.5113 26.7512 11.2667 26.2943 11.057 25.8211C10.6155 24.8228 10.3308 23.7624 10.2127 22.6771C9.96642 20.4995 10.387 18.2984 11.4188 16.365C12.5341 14.3152 14.3032 12.6975 16.4444 11.7696C17.6685 11.2366 18.9678 10.8962 20.296 10.7605C27.7661 9.95636 32.1604 6.63143 34.428 4.21914C33.0957 8.60538 30.8019 12.6393 27.7138 16.0273L27.2715 11.5726C27.249 11.1713 26.9055 10.8643 26.5042 10.8868C26.103 10.9093 25.7959 11.2529 25.8184 11.6541C25.8195 11.6739 25.8215 11.6937 25.8242 11.7133L26.3911 17.4385C23.0098 20.8679 18.3099 24.3135 11.7887 27.1881ZM32.7555 26.8705V26.8745C31.2345 28.7262 29.2863 30.1806 27.0786 31.1121C25.0483 31.9701 22.8448 32.3391 20.6458 32.1896C17.5845 32.0345 14.7118 30.6639 12.6652 28.3822C15.0636 27.3209 17.3826 26.0888 19.6045 24.6954L25.993 25.9016C26.3901 25.9638 26.7624 25.6923 26.8246 25.2953C26.8846 24.9123 26.6338 24.5495 26.2544 24.4703L21.3454 23.5415C23.612 21.9848 25.722 20.2115 27.6454 18.2466C27.6807 18.2162 27.713 18.1826 27.7419 18.1461C32.8158 12.8632 34.9748 7.63655 35.8754 4.42017C38.36 15.0181 36.4583 22.3917 32.7555 26.8705Z"
                    fill="#00B307"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_578_10609">
                    <rect
                      width="40"
                      height="40"
                      fill="white"
                      transform="translate(0.000183105 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="section-text">
            Tree Mix is a company that specializes in the export and import of
            both organic and conventional crops, including herbs, spices, and
            seeds. Established in 1980, we initially focused on local trading of
            herbs and spices, but since 2000, we have expanded our operations to
            include global exports of our products and we take pride in holding
            certifications such as Organic, USDA NOP, HACCP, ISO, FDA and Fairtrade.
          </p>
          <p className="section-text">
            Our commitment to providing processed products of the highest
            quality is unwavering and to ensure consistent standards, we work
            with approved raw material suppliers and meticulously process each
            product in accordance with your company’s specific requirements,
            guaranteeing that all herbs and spices meet the desired
            specifications.
          </p>
          <p className="section-text">
            At Tree Mix , we strive to enhance your business by delivering
            exceptional agricultural products that meet your needs.
          </p>
          <button className="contact-button mt-6  gap-8">
            <span className="mr-2">Contact Us </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M14.2502 6.75L19.7502 12L14.2502 17.25M19.5002 12H5.25018"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
        <div className="image-container ">
          <Image
            src={HistoryImage}
            alt="Our History"
            className="history-image"
          />
        </div>
      </div>

      {/* Our Team Section */}
      <motion.section
        className="our-team sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex justify-center flex-col items-center gap-3 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-center">Our Team</h1>
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
        </motion.div>

        <div className="px-4 md:px-12">
          <Slider {...sliderSettings} className="mx-4">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className="px-2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: member.id * 0.1,
                }}
              >
                <div className="team-card">
                  <div className="relative w-full" style={{ height: "250px" }}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                      className="card-img"
                    />
                  </div>
                  <div className="p-0 text-start">
                    <h3 className="text-lg font-semibold mb-2">
                      {member.name}
                    </h3>
                    <p className="text-xsm text-gray-500">{member.jobTitle}</p>
                    <div className="flex gap-1 mt-4">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.7554 3.21948C5.08406 3.21948 2.91852 5.38503 2.91852 8.05636V22.567C2.91852 25.2383 5.08406 27.4039 7.7554 27.4039H22.266C24.9373 27.4039 27.1029 25.2383 27.1029 22.567V8.05636C27.1029 5.38503 24.9373 3.21948 22.266 3.21948H7.7554ZM5.33696 8.05636C5.33696 6.72069 6.41973 5.63792 7.7554 5.63792H22.266C23.6017 5.63792 24.6845 6.72069 24.6845 8.05636V22.567C24.6845 23.9027 23.6017 24.9854 22.266 24.9854H7.7554C6.41973 24.9854 5.33696 23.9027 5.33696 22.567V8.05636ZM11.3831 14.1025C11.3831 13.4346 10.8417 12.8932 10.1738 12.8932C9.50601 12.8932 8.96462 13.4346 8.96462 14.1025V21.3578C8.96462 22.0256 9.50601 22.567 10.1738 22.567C10.8417 22.567 11.3831 22.0256 11.3831 21.3578V14.1025ZM11.9877 9.87019C11.9877 10.8719 11.1756 11.684 10.1738 11.684C9.17208 11.684 8.36001 10.8719 8.36001 9.87019C8.36001 8.86844 9.17208 8.05636 10.1738 8.05636C11.1756 8.05636 11.9877 8.86844 11.9877 9.87019ZM15.0107 12.8932C15.4212 12.8932 15.784 13.0978 16.0026 13.4107C16.6225 13.0749 17.3126 12.8932 18.0338 12.8932C20.645 12.8932 22.266 15.222 22.266 17.2118V17.221V17.2301V17.2393V17.2485V17.2577V17.267V17.2762V17.2855V17.2948V17.3041V17.3135V17.3229V17.3323V17.3417V17.3512V17.3606V17.37V17.3796V17.3891V17.3986V17.4082V17.4178V17.4273V17.437V17.4466V17.4562V17.4659V17.4757V17.4854V17.4952V17.5048V17.5146V17.5244V17.5342V17.5441V17.5539V17.5639V17.5736V17.5836V17.5935V17.6035V17.6134V17.6233V17.6334V17.6434V17.6533V17.6634V17.6735V17.6836V17.6936V17.7038V17.7139V17.724V17.7341V17.7443V17.7544V17.7647V17.7749V17.7851V17.7953V17.8056V17.8159V17.8261V17.8364V17.8467V17.857V17.8674V17.8776V17.888V17.8984V17.9088V17.9191V17.9296V17.94V17.9504V17.9608V17.9714V17.9818V17.9923V18.0027V18.0132V18.0237V18.0342V18.0448V18.0553V18.0658V18.0764V18.087V18.0976V18.1081V18.1188V18.1293V18.1399V18.1506V18.1612V18.1718V18.1825V18.1931V18.2038V18.2144V18.2251V18.2358V18.2465V18.2572V18.2679V18.2786V18.2893V18.3V18.3108V18.3216V18.3322V18.343V18.3537V18.3645V18.3752V18.386V18.3968V18.4075V18.4184V18.4292V18.4399V18.4507V18.4616V18.4723V18.4831V18.494V18.5047V18.5156V18.5264V18.5372V18.548V18.5589V18.5697V18.5806V18.5913V18.6022V18.6131V18.6239V18.6347V18.6455V18.6564V18.6673V18.678V18.6889V18.6998V18.7106V18.7214V18.7323V18.7432V18.754V18.7648V18.7757V18.7865V18.7974V18.8083V18.819V18.8299V18.8407V18.8516V18.8623V18.8732V18.8841V18.8948V18.9057V18.9165V18.9272V18.9381V18.9489V18.9598V18.9705V18.9813V18.9921V19.0029V19.0137V19.0245V19.0352V19.046V19.0568V19.0675V19.0783V19.089V19.0998V19.1106V19.1212V19.132V19.1427V19.1534V19.1641V19.1748V19.1855V19.1962V19.2069V19.2176V19.2282V19.2389V19.2495V19.2601V19.2708V19.2814V19.2921V19.3027V19.3132V19.3239V19.3344V19.345V19.3556V19.3661V19.3766V19.3871V19.3976V19.4082V19.4187V19.4292V19.4397V19.4501V19.4606V19.471V19.4814V19.492V19.5024V19.5128V19.523V19.5334V19.5438V19.5542V19.5645V19.5748V19.5852V19.5955V19.6057V19.616V19.6263V19.6365V19.6467V19.6569V19.6672V19.6773V19.6875V19.6976V19.7078V19.718V19.728V19.7381V19.7482V19.7582V19.7683V19.7783V19.7883V19.7984V19.8083V19.8183V19.8282V19.8382V19.8481V19.858V19.8679V19.8777V19.8876V19.8974V19.9072V19.917V19.9268V19.9365V19.9463V19.9559V19.9656V19.9753V19.985V19.9946V20.0042V20.0137V20.0234V20.033V20.0424V20.0519V20.0615V20.0709V20.0804V20.0898V20.0992V20.1085V20.118V20.1273V20.1366V20.1459V20.1552V20.1644V20.1737V20.1829V20.1921V20.2012V20.2104V20.2194V20.2285V20.2376V20.2466V20.2557V20.2646V20.2736V20.2825V20.2915V20.3003V20.3093V20.3181V20.3269V20.3356V20.3445V20.3532V20.3619V20.3706V20.3793V20.3879V20.3965V20.405V20.4136V20.4221V20.4305V20.439V20.4475V20.4559V20.4643V20.4726V20.481V20.4893V20.4975V20.5058V20.514V20.5222V20.5303V20.5384V20.5465V20.5546V20.5627V20.5707V20.5787V20.5865V20.5945V20.6024V20.6102V20.618V20.6258V20.6336V20.6413V20.6489V20.6567V20.6643V20.6719V20.6794V20.6869V20.6944V20.7019V20.7094V20.7168V20.7241V20.7314V20.7388V20.746V20.7532V20.7604V20.7676V20.7747V20.7818V20.7888V20.7959V20.8029V20.8098V20.8167V20.8235V20.8304V20.8372V20.844V20.8508V20.8574V20.8641V20.8707V20.8772V20.8839V20.8903V20.8968V20.9032V20.9096V20.9161V20.9223V20.9286V20.9349V20.9411V20.9472V20.9534V20.9595V20.9655V20.9716V20.9775V20.9834V20.9893V20.9951V21.0009V21.0067V21.0124V21.0181V21.0238V21.0294V21.0349V21.0405V21.0459V21.0514V21.0568V21.0621V21.0674V21.0728V21.078V21.0832V21.0882V21.0933V21.0984V21.1035V21.1084V21.1133V21.1182V21.1231V21.1278V21.1326V21.1373V21.1419V21.1465V21.1511V21.1556V21.1601V21.1645V21.1689V21.1733V21.1776V21.1818V21.1861V21.1902V21.1943V21.1984V21.2024V21.2064V21.2103V21.2141V21.218V21.2217V21.2255V21.2291V21.2327V21.2364V21.2399V21.2434V21.2469V21.2503V21.2535V21.2568V21.2601V21.2633V21.2665V21.2695V21.2725V21.2756V21.2785V21.2814V21.2843V21.287V21.2898V21.2925V21.295V21.2977V21.3002V21.3026V21.3051V21.3075V21.3098V21.3121V21.3142V21.3164V21.3186V21.3207V21.3226V21.3245V21.3265V21.3283V21.3301V21.3318V21.3335V21.3352V21.3367V21.3382V21.3396V21.3411V21.3424V21.3438V21.345V21.3473V21.3493V21.3512V21.3528V21.3543V21.3558V21.3573C22.266 22.0251 21.7247 22.567 21.0568 22.567C20.389 22.567 19.8476 22.0256 19.8476 21.3578V21.3563V21.3549V21.3535V21.3521V21.3503V21.3483V21.3462V21.3438V21.3424V21.3411V21.3396V21.3382V21.3367V21.3352V21.3335V21.3318V21.3301V21.3283V21.3265V21.3245V21.3226V21.3207V21.3186V21.3164V21.3142V21.3121V21.3098V21.3075V21.3051V21.3026V21.3002V21.2977V21.295V21.2925V21.2898V21.287V21.2843V21.2814V21.2785V21.2756V21.2725V21.2695V21.2665V21.2633V21.2601V21.2568V21.2535V21.2503V21.2469V21.2434V21.2399V21.2364V21.2327V21.2291V21.2255V21.2217V21.218V21.2141V21.2103V21.2064V21.2024V21.1984V21.1943V21.1902V21.1861V21.1818V21.1776V21.1733V21.1689V21.1645V21.1601V21.1556V21.1511V21.1465V21.1419V21.1373V21.1326V21.1278V21.1231V21.1182V21.1133V21.1084V21.1035V21.0984V21.0933V21.0882V21.0832V21.078V21.0728V21.0674V21.0621V21.0568V21.0514V21.0459V21.0405V21.0349V21.0294V21.0238V21.0181V21.0124V21.0067V21.0009V20.9951V20.9893V20.9834V20.9775V20.9716V20.9655V20.9595V20.9534V20.9472V20.9411V20.9349V20.9286V20.9223V20.9161V20.9096V20.9032V20.8968V20.8903V20.8839V20.8772V20.8707V20.8641V20.8574V20.8508V20.844V20.8372V20.8304V20.8235V20.8167V20.8098V20.8029V20.7959V20.7888V20.7818V20.7747V20.7676V20.7604V20.7532V20.746V20.7388V20.7314V20.7241V20.7168V20.7094V20.7019V20.6944V20.6869V20.6794V20.6719V20.6643V20.6567V20.6489V20.6413V20.6336V20.6258V20.618V20.6102V20.6024V20.5945V20.5865V20.5787V20.5707V20.5627V20.5546V20.5465V20.5384V20.5303V20.5222V20.514V20.5058V20.4975V20.4893V20.481V20.4726V20.4643V20.4559V20.4475V20.439V20.4305V20.4221V20.4136V20.405V20.3965V20.3879V20.3793V20.3706V20.3619V20.3532V20.3445V20.3356V20.3269V20.3181V20.3093V20.3003V20.2915V20.2825V20.2736V20.2646V20.2557V20.2466V20.2376V20.2285V20.2194V20.2104V20.2012V20.1921V20.1829V20.1737V20.1644V20.1552V20.1459V20.1366V20.1273V20.118V20.1085V20.0992V20.0898V20.0804V20.0709V20.0615V20.0519V20.0424V20.033V20.0234V20.0137V20.0042V19.9946V19.985V19.9753V19.9656V19.9559V19.9463V19.9365V19.9268V19.917V19.9072V19.8974V19.8876V19.8777V19.8679V19.858V19.8481V19.8382V19.8282V19.8183V19.8083V19.7984V19.7883V19.7783V19.7683V19.7582V19.7482V19.7381V19.728V19.718V19.7078V19.6976V19.6875V19.6773V19.6672V19.6569V19.6467V19.6365V19.6263V19.616V19.6057V19.5955V19.5852V19.5748V19.5645V19.5542V19.5438V19.5334V19.523V19.5128V19.5024V19.492V19.4814V19.471V19.4606V19.4501V19.4397V19.4292V19.4187V19.4082V19.3976V19.3871V19.3766V19.3661V19.3556V19.345V19.3344V19.3239V19.3132V19.3027V19.2921V19.2814V19.2708V19.2601V19.2495V19.2389V19.2282V19.2176V19.2069V19.1962V19.1855V19.1748V19.1641V19.1534V19.1427V19.132V19.1212V19.1106V19.0998V19.089V19.0783V19.0675V19.0568V19.046V19.0352V19.0245V19.0137V19.0029V18.9921V18.9813V18.9705V18.9598V18.9489V18.9381V18.9272V18.9165V18.9057V18.8948V18.8841V18.8732V18.8623V18.8516V18.8407V18.8299V18.819V18.8083V18.7974V18.7865V18.7757V18.7648V18.754V18.7432V18.7323V18.7214V18.7106V18.6998V18.6889V18.678V18.6673V18.6564V18.6455V18.6347V18.6239V18.6131V18.6022V18.5913V18.5806V18.5697V18.5589V18.548V18.5372V18.5264V18.5156V18.5047V18.494V18.4831V18.4723V18.4616V18.4507V18.4399V18.4292V18.4184V18.4075V18.3968V18.386V18.3752V18.3645V18.3537V18.343V18.3322V18.3216V18.3108V18.3V18.2893V18.2786V18.2679V18.2572V18.2465V18.2358V18.2251V18.2144V18.2038V18.1931V18.1825V18.1718V18.1612V18.1506V18.1399V18.1293V18.1188V18.1081V18.0976V18.087V18.0764V18.0658V18.0553V18.0448V18.0342V18.0237V18.0132V18.0027V17.9923V17.9818V17.9714V17.9608V17.9504V17.94V17.9296V17.9191V17.9088V17.8984V17.888V17.8776V17.8674V17.857V17.8467V17.8364V17.8261V17.8159V17.8056V17.7953V17.7851V17.7749V17.7647V17.7544V17.7443V17.7341V17.724V17.7139V17.7038V17.6936V17.6836V17.6735V17.6634V17.6533V17.6434V17.6334V17.6233V17.6134V17.6035V17.5935V17.5836V17.5736V17.5639V17.5539V17.5441V17.5342V17.5244V17.5146V17.5048V17.4952V17.4854V17.4757V17.4659V17.4562V17.4466V17.437V17.4273V17.4178V17.4082V17.3986V17.3891V17.3796V17.37V17.3606V17.3512V17.3417V17.3323V17.3229V17.3135V17.3041V17.2948V17.2855V17.2762V17.267V17.2577V17.2485V17.2393V17.2301V17.221V17.2118C19.8476 16.2829 19.0502 15.3117 18.0338 15.3117C17.4 15.3117 16.7005 15.6562 16.2199 16.4763V16.4795V16.492V16.5045V16.5169V16.5295V16.5419V16.5545V16.5671V16.5798V16.5924V16.6049V16.6176V16.6303V16.643V16.6557V16.6684V16.6812V16.6941V16.7068V16.7196V16.7324V16.7452V16.7582V16.771V16.7839V16.7968V16.8097V16.8227V16.8357V16.8486V16.8615V16.8746V16.8877V16.9006V16.9137V16.9267V16.9398V16.953V16.966V16.9792V16.9923V17.0054V17.0186V17.0318V17.045V17.0582V17.0713V17.0846V17.0978V17.1111V17.1243V17.1376V17.1509V17.1642V17.1775V17.1908V17.2041V17.2175V17.2308V17.2441V17.2576V17.271V17.2843V17.2977V17.3111V17.3245V17.338V17.3514V17.3648V17.3782V17.3918V17.4052V17.4186V17.4322V17.4456V17.4591V17.4727V17.4861V17.4996V17.5132V17.5267V17.5402V17.5537V17.5672V17.5808V17.5944V17.608V17.6215V17.6351V17.6486V17.6622V17.6758V17.6894V17.7029V17.7166V17.7301V17.7438V17.7573V17.771V17.7845V17.7981V17.8117V17.8254V17.839V17.8526V17.8662V17.8798V17.8934V17.907V17.9207V17.9342V17.9479V17.9614V17.9751V17.9888V18.0023V18.016V18.0295V18.0432V18.0567V18.0704V18.0839V18.0976V18.1111V18.1248V18.1384V18.152V18.1656V18.1792V18.1928V18.2063V18.2199V18.2335V18.2471V18.2606V18.2741V18.2877V18.3012V18.3148V18.3283V18.3419V18.3554V18.369V18.3825V18.3959V18.4095V18.423V18.4364V18.45V18.4634V18.4769V18.4904V18.5038V18.5172V18.5306V18.5442V18.5576V18.5709V18.5843V18.5977V18.6112V18.6245V18.6379V18.6512V18.6646V18.6779V18.6912V18.7045V18.7178V18.7311V18.7444V18.7577V18.7709V18.7842V18.7974V18.8107V18.8239V18.837V18.8502V18.8634V18.8766V18.8896V18.9028V18.9159V18.9291V18.9421V18.9552V18.9682V18.9813V18.9944V19.0073V19.0204V19.0333V19.0462V19.0592V19.0721V19.0851V19.098V19.1109V19.1237V19.1366V19.1494V19.1622V19.175V19.1878V19.2007V19.2133V19.226V19.2387V19.2514V19.2641V19.2768V19.2894V19.302V19.3147V19.3273V19.3397V19.3523V19.3649V19.3773V19.3898V19.4022V19.4147V19.427V19.4395V19.4518V19.4641V19.4765V19.4888V19.501V19.5134V19.5256V19.5378V19.5499V19.5621V19.5742V19.5863V19.5984V19.6105V19.6225V19.6345V19.6465V19.6585V19.6704V19.6823V19.6943V19.7061V19.718V19.7297V19.7415V19.7533V19.765V19.7767V19.7883V19.8001V19.8117V19.8233V19.8348V19.8464V19.8579V19.8694V19.8808V19.8922V19.9036V19.9149V19.9263V19.9377V19.9489V19.9602V19.9713V19.9825V19.9937V20.0048V20.0159V20.0269V20.038V20.049V20.0599V20.0709V20.0818V20.0927V20.1035V20.1143V20.1251V20.1359V20.1465V20.1571V20.1678V20.1784V20.1889V20.1995V20.21V20.2205V20.2309V20.2413V20.2517V20.262V20.2723V20.2825V20.2928V20.303V20.3131V20.3232V20.3332V20.3432V20.3533V20.3633V20.3732V20.383V20.3929V20.4027V20.4125V20.4222V20.4319V20.4416V20.4512V20.4608V20.4703V20.4798V20.4892V20.4986V20.5081V20.5174V20.5267V20.5359V20.5452V20.5544V20.5634V20.5725V20.5816V20.5907V20.5996V20.6084V20.6174V20.6262V20.635V20.6437V20.6524V20.6611V20.6697V20.6783V20.6868V20.6954V20.7037V20.7122V20.7205V20.7289V20.7371V20.7453V20.7534V20.7616V20.7697V20.7777V20.7857V20.7937V20.8015V20.8094V20.8171V20.8249V20.8326V20.8404V20.8479V20.8555V20.863V20.8705V20.8778V20.8852V20.8926V20.8998V20.907V20.9142V20.9214V20.9284V20.9354V20.9424V20.9493V20.9562V20.963V20.9697V20.9765V20.9832V20.9897V20.9963V21.0028V21.0093V21.0157V21.022V21.0283V21.0346V21.0407V21.0469V21.0529V21.059V21.0649V21.0708V21.0768V21.0826V21.0884V21.094V21.0996V21.1053V21.1107V21.1163V21.1217V21.1271V21.1324V21.1376V21.1428V21.148V21.1531V21.158V21.1631V21.1679V21.1728V21.1776V21.1823V21.187V21.1916V21.1962V21.2007V21.2052V21.2095V21.2139V21.2181V21.2223V21.2265V21.2306V21.2346V21.2386V21.2424V21.2463V21.25V21.2538V21.2574V21.261V21.2645V21.2681V21.2714V21.2747V21.2781V21.2812V21.2844V21.2875V21.2905V21.2934V21.2964V21.2993V21.302V21.3047V21.3074V21.3099V21.3124V21.3149V21.3173V21.3196V21.3219V21.324V21.3261V21.3282V21.3301V21.332V21.334V21.3357V21.3373V21.339V21.3406V21.3422V21.3436V21.345V21.3463V21.3475V21.3498V21.3517V21.3534V21.3549V21.3564V21.3577C16.2199 22.0255 15.6786 22.567 15.0107 22.567C14.3429 22.567 13.8015 22.0256 13.8015 21.3578V21.3564V21.3549V21.3534V21.3517V21.3498V21.3475V21.3463V21.345V21.3436V21.3422V21.3406V21.339V21.3373V21.3357V21.334V21.332V21.3301V21.3282V21.3261V21.324V21.3219V21.3196V21.3173V21.3149V21.3124V21.3099V21.3074V21.3047V21.302V21.2993V21.2964V21.2934V21.2905V21.2875V21.2844V21.2812V21.2781V21.2747V21.2714V21.2681V21.2645V21.261V21.2574V21.2538V21.25V21.2463V21.2424V21.2386V21.2346V21.2306V21.2265V21.2223V21.2181V21.2139V21.2095V21.2052V21.2007V21.1962V21.1916V21.187V21.1823V21.1776V21.1728V21.1679V21.1631V21.158V21.1531V21.148V21.1428V21.1376V21.1324V21.1271V21.1217V21.1163V21.1107V21.1053V21.0996V21.094V21.0884V21.0826V21.0768V21.0708V21.0649V21.059V21.0529V21.0469V21.0407V21.0346V21.0283V21.022V21.0157V21.0093V21.0028V20.9963V20.9897V20.9832V20.9765V20.9697V20.963V20.9562V20.9493V20.9424V20.9354V20.9284V20.9214V20.9142V20.907V20.8998V20.8926V20.8852V20.8778V20.8705V20.863V20.8555V20.8479V20.8404V20.8326V20.8249V20.8171V20.8094V20.8015V20.7937V20.7857V20.7777V20.7697V20.7616V20.7534V20.7453V20.7371V20.7289V20.7205V20.7122V20.7037V20.6954V20.6868V20.6783V20.6697V20.6611V20.6524V20.6437V20.635V20.6262V20.6174V20.6084V20.5996V20.5907V20.5816V20.5725V20.5634V20.5544V20.5452V20.5359V20.5267V20.5174V20.5081V20.4986V20.4892V20.4798V20.4703V20.4608V20.4512V20.4416V20.4319V20.4222V20.4125V20.4027V20.3929V20.383V20.3732V20.3633V20.3533V20.3432V20.3332V20.3232V20.3131V20.303V20.2928V20.2825V20.2723V20.262V20.2517V20.2413V20.2309V20.2205V20.21V20.1995V20.1889V20.1784V20.1678V20.1571V20.1465V20.1359V20.1251V20.1143V20.1035V20.0927V20.0818V20.0709V20.0599V20.049V20.038V20.0269V20.0159V20.0048V19.9937V19.9825V19.9713V19.9602V19.9489V19.9377V19.9263V19.9149V19.9036V19.8922V19.8808V19.8694V19.8579V19.8464V19.8348V19.8233V19.8117V19.8001V19.7883V19.7767V19.765V19.7533V19.7415V19.7297V19.718V19.7061V19.6943V19.6823V19.6704V19.6585V19.6465V19.6345V19.6225V19.6105V19.5984V19.5863V19.5742V19.5621V19.5499V19.5378V19.5256V19.5134V19.501V19.4888V19.4765V19.4641V19.4518V19.4395V19.427V19.4147V19.4022V19.3898V19.3773V19.3649V19.3523V19.3397V19.3273V19.3147V19.302V19.2894V19.2768V19.2641V19.2514V19.2387V19.226V19.2133V19.2007V19.1878V19.175V19.1622V19.1494V19.1366V19.1237V19.1109V19.098V19.0851V19.0721V19.0592V19.0462V19.0333V19.0204V19.0073V18.9944V18.9813V18.9682V18.9552V18.9421V18.9291V18.9159V18.9028V18.8896V18.8766V18.8634V18.8502V18.837V18.8239V18.8107V18.7974V18.7842V18.7709V18.7577V18.7444V18.7311V18.7178V18.7045V18.6912V18.6779V18.6646V18.6512V18.6379V18.6245V18.6112V18.5977V18.5843V18.5709V18.5576V18.5442V18.5306V18.5172V18.5038V18.4904V18.4769V18.4634V18.45V18.4364V18.423V18.4095V18.3959V18.3825V18.369V18.3554V18.3419V18.3283V18.3148V18.3012V18.2877V18.2741V18.2606V18.2471V18.2335V18.2199V18.2063V18.1928V18.1792V18.1656V18.152V18.1384V18.1248V18.1111V18.0976V18.0839V18.0704V18.0567V18.0432V18.0295V18.016V18.0023V17.9888V17.9751V17.9614V17.9479V17.9342V17.9207V17.907V17.8934V17.8798V17.8662V17.8526V17.839V17.8254V17.8117V17.7981V17.7845V17.771V17.7573V17.7438V17.7301V17.7166V17.7029V17.6894V17.6758V17.6622V17.6486V17.6351V17.6215V17.608V17.5944V17.5808V17.5672V17.5537V17.5402V17.5267V17.5132V17.4996V17.4861V17.4727V17.4591V17.4456V17.4322V17.4186V17.4052V17.3918V17.3782V17.3648V17.3514V17.338V17.3245V17.3111V17.2977V17.2843V17.271V17.2576V17.2441V17.2308V17.2175V17.2041V17.1908V17.1775V17.1642V17.1509V17.1376V17.1243V17.1111V17.0978V17.0846V17.0713V17.0582V17.045V17.0318V17.0186V17.0054V16.9923V16.9792V16.966V16.953V16.9398V16.9267V16.9137V16.9006V16.8877V16.8746V16.8615V16.8486V16.8357V16.8227V16.8097V16.7968V16.7839V16.771V16.7582V16.7452V16.7324V16.7196V16.7068V16.6941V16.6812V16.6684V16.6557V16.643V16.6303V16.6176V16.6049V16.5924V16.5798V16.5671V16.5545V16.5419V16.5295V16.5169V16.5045V16.492V16.4795V16.4671V16.4546V16.4422V16.4298V16.4175V16.4052V16.3928V16.3806V16.3683V16.3561V16.3439V16.3317V16.3196V16.3074V16.2953V16.2832V16.2711V16.259V16.247V16.235V16.2231V16.2111V16.1991V16.1873V16.1754V16.1707V16.1659V16.1612V16.1563V16.1516V16.1468V16.1419V16.1371V16.1323V16.1274V16.1226V16.1177V16.1129V16.1081V16.1031V16.0983V16.0933V16.0884V16.0835V16.0786V16.0736V16.0687V16.0637V16.0587V16.0538V16.0488V16.0439V16.0388V16.0338V16.0287V16.0238V16.0187V16.0136V16.0087V16.0036V15.9985V15.9934V15.9884V15.9833V15.9782V15.9731V15.9679V15.9628V15.9578V15.9526V15.9475V15.9423V15.9372V15.932V15.9268V15.9217V15.9165V15.9113V15.9061V15.9009V15.8957V15.8905V15.8853V15.8801V15.8748V15.8696V15.8644V15.8592V15.8539V15.8487V15.8434V15.8382V15.8329V15.8275V15.8223V15.817V15.8117V15.8065V15.8012V15.7959V15.7905V15.7852V15.7799V15.7746V15.7692V15.7639V15.7586V15.7533V15.7478V15.7425V15.7372V15.7319V15.7264V15.7211V15.7158V15.7104V15.705V15.6996V15.6943V15.6888V15.6835V15.6781V15.6728V15.6673V15.6619V15.6566V15.6511V15.6457V15.6403V15.6349V15.6295V15.624V15.6187V15.6133V15.6078V15.6024V15.5969V15.5915V15.5862V15.5807V15.5753V15.5698V15.5644V15.559V15.5535V15.5481V15.5426V15.5372V15.5318V15.5263V15.5209V15.5154V15.51V15.5046V15.4991V15.4937V15.4882V15.4828V15.4773V15.4719V15.4665V15.461V15.4556V15.4501V15.4447V15.4393V15.4337V15.4282V15.4228V15.4174V15.4119V15.4065V15.401V15.3956V15.3902V15.3847V15.3794V15.374V15.3685V15.3631V15.3576V15.3522V15.3467V15.3413V15.3359V15.3304V15.3251V15.3197V15.3142V15.3088V15.3035V15.298V15.2926V15.2871V15.2818V15.2764V15.2709V15.2656V15.2602V15.2548V15.2494V15.2441V15.2386V15.2333V15.2279V15.2226V15.2172V15.2118V15.2065V15.2012V15.1957V15.1904V15.1851V15.1798V15.1744V15.1691V15.1638V15.1585V15.1532V15.1478V15.1425V15.1372V15.1319V15.1267V15.1213V15.116V15.1107V15.1055V15.1002V15.095V15.0897V15.0845V15.0791V15.0739V15.0687V15.0635V15.0582V15.053V15.0478V15.0426V15.0374V15.0322V15.027V15.0218V15.0168V15.0116V15.0064V15.0013V14.9961V14.9909V14.9858V14.9807V14.9755V14.9704V14.9654V14.9603V14.9552V14.95V14.9449V14.94V14.9349V14.9298V14.9247V14.9198V14.9147V14.9096V14.9047V14.8997V14.8946V14.8897V14.8847V14.8797V14.8748V14.8698V14.8649V14.8599V14.855V14.8501V14.8452V14.8402V14.8354V14.8305V14.8256V14.8207V14.8159V14.8111V14.8062V14.8014V14.7966V14.7917V14.787V14.7822V14.7774V14.7726V14.7679V14.7632V14.7583V14.7536V14.7489V14.7443V14.7396V14.7349V14.7302V14.7256V14.7209V14.7163V14.7117V14.7071V14.7025V14.6979V14.6933V14.6887V14.6841V14.6796V14.675V14.6706V14.6661V14.6615V14.657V14.6525V14.6481V14.6437V14.6392V14.6348V14.6304V14.6259V14.6216V14.6172V14.6129V14.6085V14.6042V14.5998V14.5956V14.5912V14.587V14.5826V14.5784V14.5742V14.5699V14.5657V14.5616V14.5574V14.5533V14.549V14.5449V14.5408V14.5367V14.5326V14.5285V14.5244V14.5204V14.5163V14.5123V14.5083V14.5043V14.5003V14.4963V14.4923V14.4884V14.4845V14.4806V14.4767V14.4728V14.469V14.4651V14.4612V14.4575V14.4536V14.4499V14.4461V14.4424V14.4386V14.4349V14.4312V14.4275V14.4239V14.4202V14.4166V14.413V14.4094V14.4057V14.4022V14.3986V14.3951V14.3916V14.3881V14.3846V14.3812V14.3777V14.3743V14.3708V14.3674V14.364V14.3608V14.3574V14.3541V14.3507V14.3474V14.3442V14.3409V14.3377V14.3345V14.3312V14.3281V14.325V14.3218V14.3187V14.3156V14.3125V14.3095V14.3065V14.3034V14.3004V14.2974V14.2945V14.2915V14.2886V14.2857V14.2828V14.2799V14.2771V14.2742V14.2714V14.2686V14.2658V14.2632V14.2604V14.2577V14.2549V14.2523V14.2496V14.2471V14.2444V14.2419V14.2393V14.2368V14.2343V14.2317V14.2293V14.2268V14.2243V14.2219V14.2196V14.2172V14.2149V14.2125V14.2102V14.208V14.2057V14.2034V14.2013V14.1991V14.1969V14.1947V14.1927V14.1905V14.1884V14.1864V14.1843V14.1824V14.1803V14.1784V14.1765V14.1745V14.1726V14.1708V14.169V14.1672V14.1653V14.1635V14.1617V14.16V14.1583V14.1566V14.1549V14.1534V14.1518V14.1501V14.1487V14.1471V14.1455V14.1441V14.1426V14.1412V14.1397V14.1384V14.137V14.1357V14.1344V14.1331V14.1318V14.1305V14.1293V14.127V14.1248V14.1227V14.1206V14.1187V14.1169V14.1152V14.1135V14.112V14.1106V14.1087V14.1075V14.1061V14.1049V14.1034C13.8015 13.4356 14.3429 12.8932 15.0107 12.8932Z"
                            fill="#0F9144"
                          />
                        </svg>
                      </a>
                      <a
                        href={member.email}
                        className="text-green-600 hover:text-green-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                        >
                          <path
                            d="M4.14081 12.8931L12.8427 18.7175C13.6184 19.2347 14.0063 19.4932 14.4256 19.5937C14.7959 19.6824 15.1822 19.6824 15.5527 19.5937C15.9719 19.4932 16.3598 19.2347 17.1355 18.7175L25.8375 12.8931M12.9316 5.721L5.91815 10.1256C5.25679 10.5409 4.92612 10.7486 4.68627 11.0293C4.47399 11.2778 4.31426 11.5667 4.21674 11.8786C4.10657 12.231 4.10657 12.6215 4.10657 13.4025V21.1158C4.10657 22.4703 4.10657 23.1476 4.37017 23.6649C4.60202 24.1199 4.97199 24.4899 5.42706 24.7217C5.94439 24.9853 6.62161 24.9853 7.97607 24.9853H22.003C23.3575 24.9853 24.0348 24.9853 24.5521 24.7217C25.0071 24.4899 25.3771 24.1199 25.6089 23.6649C25.8725 23.1476 25.8725 22.4703 25.8725 21.1158V13.4025C25.8725 12.6215 25.8725 12.231 25.7624 11.8786C25.6648 11.5667 25.5052 11.2778 25.2928 11.0293C25.053 10.7486 24.7223 10.5409 24.061 10.1256L17.0475 5.721C16.3011 5.25227 15.9279 5.01791 15.5275 4.92656C15.1733 4.84577 14.8057 4.84577 14.4516 4.92656C14.0512 5.01791 13.678 5.25227 12.9316 5.721Z"
                            stroke="#0F9144"
                            strokeWidth="1.97872"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>
      </motion.section>

      {/* "Our Success Story" Section */}
      <div className="section success-story w-full mb-14">
        <div className="image-container mb-10 sm:mb-12 md:mb-14">
          <div className="success-story-wrapper">
            <Image
              src={successImage}
              alt="Success Story Image"
              className="success-story-image w-full h-auto"
            />
            <div className="success-story-title flex items-center justify-center mt-8 sm:mt-10 md:mt-12 text-lg sm:text-xl md:text-2xl">
              <span>🌿</span>
              <span className="mx-2">Our Commitment  </span>
              <span>🌿</span>
            </div>
          </div>
        </div>

        <div className="our-success-head mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            <strong className="maincolor font-bold">Tree Mix</strong> was
            established in 1980, We are a reliable supplier of herbs, spices,
            and seeds all compliant with EU regulations. We have an experienced
            and professional team working hard to ensure the best quality,
            ensuring that our product always meets your requirements.
          </p>
        </div>

        <div className="our-success-body flex flex-col lg:flex-row items-start justify-between gap-6 mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 mt-10">
          <div className="content w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="section-title text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 mb-4 sm:mb-6">
              Global Result of Our Dedication
            </h2>
            <p className="section-text text-sm sm:text-base md:text-lg leading-relaxed">
              We export our products to the world such as
              <strong className="maincolor font-semibold mx-1">
                (Australia, Austria, France, Germany, India, Ireland, New
                Zealand, Portugal, Sri Lanka, Tunisia, the UK, etc.)
              </strong>
              We have an experienced and professional team working hard to
              ensure the best quality.
            </p>
          </div>

          <div className="success-img w-full lg:w-1/2 flex justify-center mt-6 lg:mt-0">
            <Image
              src={successImg}
              alt="Our History"
              className="history-image w-full max-w-md lg:max-w-full h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
