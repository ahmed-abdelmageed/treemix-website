"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Import images
import sliderBackground from "../../assets/images/slider-background.png";
import image1 from "../../assets/images/slider-img1.png";
import image2 from "../../assets/images/slider4.png";
import image3 from "../../assets/images/sliderimg-3.png";
import Separator from "./Separator";
import { useRouter } from "next/navigation";

const images = [
  { src: image1, alt: "Image 1" },
  { src: image2, alt: "Image 2" },
  { src: image3, alt: "Image 3" },
];

export default function Slider() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    if (!isHovered && !isClicked) {
      const interval = setInterval(nextSlide, 2000); // Change every 2 seconds
      return () => clearInterval(interval);
    }
  }, [isHovered, isClicked, nextSlide]);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000); // Pause for 2 seconds
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) nextSlide();
    else if (touchEndX - touchStartX > 50) prevSlide();
  };

  return (
    <div
      className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:h-screen bg-cover bg-center slider-container"
      style={{ backgroundImage: `url(${sliderBackground.src})` }}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative flex flex-col-reverse sm:flex-row justify-between items-center px-4 sm:px-10 lg:px-20 h-full">
        {/* Left Section: Text */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center text-center sm:text-left z-10">
          <div className="mb-[90px]">
            <h1 className="slider-text text-2xl sm:text-4xl lg:text-5xl font-semibold leading-snug mb-4">
              High-Quality Herbs and Seeds Worldwide
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6">
              Certified Excellence for Global Markets
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            <button
                className="explor-btn bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 text-sm sm:text-base transition"
                onClick={() => router.push("/products")} 
              >
                Explore Our Products
              </button>
              <button
                className="service-btn border-b-2 border-gray-500 text-gray-600 hover:border-gray-700 hover:text-gray-700 px-4 py-2 text-sm"
                onClick={() => {
                  document.getElementById("our-services")?.scrollIntoView({ behavior: "smooth" });
                }}   
              >
                View All Services
              </button>
            </div>
          </div>

          {/* Sidebar Totals */}
          <div className="sidebar-totals hidden sm:flex justify-between items-center bg-white shadow-md rounded-lg px-4 py-3 max-w-lg mx-auto sm:mx-0">
            {[
              { value: "300 +", label: "Products" },
              { value: "200 +", label: "Positive Feedback" },
              { value: "200 +", label: "Satisfied Customer" },
            ].map(({ value, label }, idx) => (
              <div key={idx} className="flex items-center">
                <div className="text-center mx-4">
                  <h6 className="font-semibold text-lg">{value}</h6>
                  <p className="text-sm text-gray-700">{label}</p>
                </div>
                {idx < 2 && <Separator />}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="relative w-full sm:w-1/2 flex justify-center items-center mb-8 sm:mb-0">
          <div className="w-10/12 sm:w-9/12 md:w-7/12 lg:w-6/12">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              layout="responsive"
              width={900}
              height={600}
              className="rounded-lg cursor-pointer"
              onClick={() => handleImageClick(currentIndex)}
            />
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-6 rounded-full cursor-pointer ${
              index === currentIndex ? "dot-slider-bg" : "bg-gray-300"
            }`}
            onClick={() => handleImageClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
