"use client";

import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import herbsIcon from "../../assets/images/icons/Herbs.png";
import spicesIcon from "../../assets/images/icons/spicesIcon.png";
import seedsIcon from "../../assets/images/icons/seeeds.png";
import driedIcon from "../../assets/images/icons/dried.png";
import Link from "next/link";

const Divider = () => (
  <div
    className="divider"
    style={{
      width: "1px",
      height: "37px",
      border: "2px solid var(--primarry, #0F9144)",
      margin: "0 8px",
    }}
  />
);

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://backend.treemix-eg.com/api/category.home"
        );
        if (response.data.success) {
          const allProducts = response.data.categories.flatMap(
            (category) => category.products
          );
          const formattedCategories = [
            { id: "all", name: "All", products: allProducts },
            ...response.data.categories,
          ];

          setCategories(formattedCategories);
          setProducts(formattedCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const tabIcons = {
    all: null,
    herbs: herbsIcon,
    spices: spicesIcon,
    seeds: seedsIcon,
    dried: driedIcon,
  };

  return (
    <section className="w-full sec-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-green-600 font-semibold text-sm sm:text-base mb-2">
            Tree Mix Products
          </h2>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Explore <span className="text-green-600">Our Products</span>
          </h1>
        </div>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          centered
          items={products.flatMap((category, index) => {
            const categoryKey = category.name.toLowerCase();
            const tabItem = {
              key: category.id.toString(),
              label: (
                <span
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === category.id.toString()
                      ? "active-tab-home-products"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tabIcons[categoryKey] && (
                    <Image
                      src={tabIcons[categoryKey]}
                      alt={category.name}
                      width={20}
                      height={20}
                    />
                  )}
                  <span className="capitalize text-sm md:text-base">
                    {category.name}
                  </span>
                </span>
              ),
              children: <ProductCarousel products={category.products} />,
            };

            return index < products.length - 1
              ? [tabItem, { key: `divider-${index}`, label: <Divider /> }]
              : [tabItem];
          })}
          className="custom-tabs"
          tabBarStyle={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        />
      </div>
    </section>
  );
};

const ProductCarousel = ({ products }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, 
  autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full px-4 lg:px-8 xl:px-14">
      {products && products.length > 0 ? (
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="p-2">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer">
                <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80">
                  <Image
                    src={product.image || "/default-product.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-start">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p
                    className="text-gray-600 text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html:
                        product.shortDescription
                          ?.replace(/<p>\s*<\/p>/g, "")
                          .trim() || product.description?.trim(),
                    }}
                  />
                </div>
                <div className="px-4 pb-4">
                  <Link href={`/products/${product.id}`} passHref>
                    <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No products available in this category.
        </div>
      )}
    </div>
  );
};

export default ProductTabs;
