"use client";

import axios from "axios";
import { Tabs, Spin, message, Breadcrumb, Badge } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import "./Products.scss";
import allpro from "../../assets/images/allpro.png";
import right from "../../assets/images/right.png";
import left from "../../assets/images/left.png";
import Link from "next/link";

// Fetch categories function
const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `https://backend.treemix-eg.com/api/category.index`
    );
    return [
      { id: 0, name: "Show All", image: allpro },
      ...response.data.categories,
    ];
  } catch (error) {
    console.error("Error fetching categories:", error);
    message.error("Failed to fetch categories.");
    return [{ id: 0, name: "Show All", image: allpro }];
  }
};

// Fetch products function
const fetchProducts = async (categoryId) => {
  try {
    const url =
      categoryId === 0
        ? `https://backend.treemix-eg.com/api/product.index`
        : `https://backend.treemix-eg.com/api/product.byCategory/${categoryId}`;
    const response = await axios.get(url);
    return categoryId === 0
      ? response.data.products || []
      : response.data.product || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    message.error("Failed to fetch products.");
    return [];
  }
};

const Products = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [breadcrumbItems, setBreadcrumbItems] = useState(["Home", "Products"]);

  useEffect(() => {
    const initializeData = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      const fetchedProducts = await fetchProducts(0);
      setProductsData(fetchedProducts);
    };
    initializeData();
  }, []);

  const handleCategoryChange = async (categoryId) => {
    setActiveTab(categoryId);
    setLoading(true);
    const fetchedProducts = await fetchProducts(categoryId);
    setProductsData(fetchedProducts);
    setLoading(false);
  };

  // Motion variants for animation effects
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Render product card with motion effect
  const renderProductCard = (product, index) => (
    <motion.div
      key={product.id}
      className="product-card border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/products/${product.id}`} passHref>
        <Badge.Ribbon
          text={product.categoryName || "N/A"}
          color={
            product.categoryName === "Herbs"
              ? "#CB4919"
              : product.categoryName === "Seeds"
              ? "#1e874c"
              : product.categoryName === "Spices"
              ? "#F99A2E"
              : product.categoryName === "Dried"
              ? "#121217"
              : "#0F9144"
          }
        />
        <div className="block">
          <Image
            src={product.image || allpro}
            alt={product.name}
            width={300}
            height={200}
            className="w-full card-img h-40 object-cover"
            loading="lazy"
          />
          <div className="pt-4 flex flex-row items-center justify-between">
            <h3>{product.name}</h3>
          </div>
          <div className="flex items-center justify-center">
            <button className="details-button my-3 mt-4">More Details</button>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <>
      <div className="products-page">
        <div className="product-head flex flex-col lg:flex-row items-center mt-12 h-[150px] lg:h-[200px]">
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
        <div className="products-container p-6 mx-4 sm:mx-6 lg:mx-14 lg:px-14 mt-1">
          <Tabs
            activeKey={activeTab.toString()}
            onChange={(key) => handleCategoryChange(parseInt(key))}
            centered
            className="mb-2 mt-2 "
            items={categories.map((category) => ({
              label: (
                <div className="flex flex-col items-center min-w-[110px] sm:min-w-[100px]">
                  <Image
                    src={category.image || "/placeholder-category.png"}
                    alt={category.name}
                    width={70}
                    height={70}
                    className="product-tab"
                    loading="lazy"
                  />
                  <span
                    className={`mt-1 category-name text-center ${
                      activeTab === category.id
                        ? "text-green-600 "
                        : "text-gray-600"
                    }`}
                  >
                    {category.name}
                  </span>
                </div>
              ),
              key: category.id,
            }))}
          />

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Spin size="large" className="custom-spin" />
            </div>
          ) : productsData.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              }}
            >
              {productsData.map(renderProductCard)}
            </motion.div>
          ) : (
            <p className="text-center text-gray-500 mt-4">
              No products available for this category.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
