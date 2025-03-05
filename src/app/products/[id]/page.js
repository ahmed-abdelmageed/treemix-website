"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Breadcrumb, Spin } from "antd";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import "./ProductDetails.scss";
import right from "../../../assets/images/right.png";
import left from "../../../assets/images/left.png";
import { motion } from "framer-motion";

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProduct = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
                `https://backend.treemix-eg.com/api/product.show/${id}`
            );
            setProduct(response.data.product);
        } catch (err) {
            console.error("Error fetching product details:", err);
            setError("Failed to fetch product details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const url = window.location.href;
        const id = url.split("/").pop();
        if (id) fetchProduct(id);
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
            <Spin size="large" className="custom-spin" />
            </div>
        );
    if (error) return <div className="text-center mt-12 text-red-500">{error}</div>;
    if (!product) return <div className="text-center mt-12">Product not found</div>;

    // Social media share URLs
    const shareUrl = window.location.href;
    const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const whatsappShare = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this product: ${shareUrl}`)}`;
    const instagramShare = `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`;

    return (
        <>
            <div className="product-details-head flex flex-col lg:flex-row items-center mt-12 h-[150px] lg:h-[200px]">
                <div className="flex w-full justify-between items-center relative h-full">
                    <div className="absolute left-0 lg:static">
                        <Image src={left} alt="Left Image" width={200} height={100} className="left-image" />
                    </div>

                    <div className="flex flex-col items-center mx-auto h-full justify-center">
                        <Breadcrumb
                            separator={<span className="mx-4 text-green-600 text-[24px]">&gt;</span>}
                        >
                            <Breadcrumb.Item className="cursor-pointer text-green-600 text-[24px]">
                                Home
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="text-green-600 text-[24px]">
                                Products
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div className="absolute right-0 lg:static">
                        <Image src={right} alt="Right Image" width={200} height={100} className="right-image" />
                    </div>
                </div>
            </div>

            <div className="sec-padding">
                <div className="product-details-container ">
                <motion.div 
                        className="product-header flex flex-col lg:flex-row items-center lg:items-start"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >                        <div className="product-images w-full lg:w-1/2 flex justify-center">
                            <img
                                src={product.image || "https://via.placeholder.com/400"}
                                alt={product.name}
                                className="main-image w-full max-w-sm sm:max-w-md lg:max-w-full"
                            />
                        </div>
                        <div className="product-info mt-6 lg:mt-0 lg:ml-8 w-full lg:w-1/2">
                            <div className="product-title flex items-center justify-between">
                                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
                                    {product.name}
                                </h1>
                                <span className="text-sm sm:text-base text-gray-500">
                                    {product.categoryName}
                                </span>
                            </div>
                            <div
                                className="short-description mt-4 text-sm sm:text-base"
                                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                            />

                            <div className="product-description mt-6">
                                <div
                                    className="mt-2 text-sm sm:text-base"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            </div>

                            <div className="social-icons mt-6 flex items-center space-x-4">
                                <p className="text-sm sm:text-base">Share item</p>
                                <a href={facebookShare} target="_blank" rel="noopener noreferrer">
                                    <FaFacebook size={24} className="text-blue-600" />
                                </a>
                                <a href={whatsappShare} target="_blank" rel="noopener noreferrer">
                                    <FaWhatsapp size={24} className="text-green-500" />
                                </a>
                                <a href={instagramShare} target="_blank" rel="noopener noreferrer">
                                    <FaInstagram size={24} className="text-pink-500" />
                                </a>
                            </div>
                        </div>
                        </motion.div>

                    <div className="products-devider mt-12 border-t border-gray-300"></div>

                    {/* Related Products Section */}
                    {product.related_products?.length > 0 && (
  <motion.div 
  className="related-products mt-12"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>                            <h2 className="text-center text-lg sm:text-xl font-semibold mb-4">
                                Related Products
                            </h2>
                            <div className="related-products-row flex overflow-x-auto space-x-4 py-2">
                                {product.related_products.map((relatedProduct) => (
                                    <div
                                        className={`related-product-card border border-gray-200 rounded-lg p-3 w-60 flex-shrink-0 cursor-pointer hover:shadow-md transition ${
                                            loading ? "opacity-50 pointer-events-none" : ""
                                        }`}
                                        key={relatedProduct.id}
                                        onClick={() => fetchProduct(relatedProduct.id)}
                                    >
                                        <img
                                            src={relatedProduct.image || "https://via.placeholder.com/150"}
                                            alt={relatedProduct.name}
                                            className="related-product-image w-full h-40 object-cover rounded-lg"
                                        />
                                        <div className="flex justify-between items-center mt-4 related-category">
                                            <h3 className="text-sm sm:text-base font-medium">
                                                {relatedProduct.name}
                                            </h3>
                                            <span className="related-category text-sm text-gray-500">
                                                {product.categoryName}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            </motion.div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
