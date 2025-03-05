"use client";

import axios from "axios";
import { Breadcrumb } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import left from "../../assets/images/left.png";
import right from "../../assets/images/right.png";
import "./Contact.scss";
import { motion } from "framer-motion";

const ContactUsPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [footerData, setFooterData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                "https://backend.treemix-eg.com/api/contactUs.send",
                {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message, // Excluding subject since it's not required
                }
            );

            if (response.data.success) {
                alert("Message sent successfully!");
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                alert("Failed to send the message.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send the message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const response = await axios.get(
                    "https://backend.treemix-eg.com/api/footer.index"
                );
                if (response.data.success) {
                    setFooterData(response.data.footer[0]);
                }
            } catch (error) {
                console.error("Error fetching footer data:", error);
            }
        };

        fetchFooterData();
    }, []);
    return (
        <div className="contact-section w-full ">
            <div className="certificate-head flex flex-col lg:flex-row items-center mt-12 h-[150px] lg:h-[200px]">
                <div className="flex w-full justify-between items-center relative h-full">
                    {/* Left Image */}
                    <div className="absolute left-0 lg:static">
                        <Image
                            src={left}
                            alt="Left Image"
                            width={200}
                            height={100}
                            className="left-image"
                        />
                    </div>

                    {/* Breadcrumb */}
                    <div className="flex flex-col items-center mx-auto h-full justify-center">
                        <Breadcrumb
                            separator={
                                <span
                                    className="mx-4"
                                    style={{
                                        color: "#1e874c",
                                        fontSize: "24px",
                                    }}
                                >
                                    &gt;
                                </span>
                            }
                        >
                            <Breadcrumb.Item
                                onClick={() => router.push("/")}
                                className="cursor-pointer text-green-600 text-[24px]"
                                style={{
                                    color: "#1e874c",
                                    fontSize: "24px",
                                }}
                            >
                                Home
                            </Breadcrumb.Item>
                            <Breadcrumb.Item
                                className="text-green-600 text-[24px]"
                                style={{
                                    color: "#1e874c",
                                    fontSize: "24px",
                                }}
                            >
                                Contact Us
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    {/* Right Image */}
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
            <div className="pb-14 w-full">
            <motion.div
                className="flex justify-center flex-col items-center gap-3 mb-8 mt-14 certificate-desc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >                    <h1 className="text-center">Contact Us</h1>
                    <p className=" text-center">
                        Looking to collaborate or have a question about our
                        services? Our team is here to help. Fill out the form
                        below, or reach out to us directly via email or phone.
                        Let’s work together to achieve your business goals.
                    </p>
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

                    <motion.div
                className="flex flex-wrap justify-center items-start gap-10 contact-form-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >                    <div className="contact-info py-2">
                        <div className="flex items-center mb-4 flex flex-col w-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="51"
                                height="52"
                                viewBox="0 0 51 52"
                                fill="none"
                            >
                                <mask
                                    id="mask0_578_19061"
                                    style={{ maskType: "alpha" }}
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="52"
                                    height="52"
                                >
                                    <rect
                                        x="0.000488281"
                                        y="0.900513"
                                        width="51"
                                        height="51"
                                        fill="#D9D9D9"
                                    />
                                </mask>
                                <g mask="url(#mask0_578_19061)">
                                    <path
                                        d="M25.5005 26.4005C26.6692 26.4005 27.6698 25.9844 28.5021 25.1521C29.3343 24.3198 29.7505 23.3193 29.7505 22.1505C29.7505 20.9818 29.3343 19.9812 28.5021 19.149C27.6698 18.3167 26.6692 17.9005 25.5005 17.9005C24.3317 17.9005 23.3312 18.3167 22.4989 19.149C21.6666 19.9812 21.2505 20.9818 21.2505 22.1505C21.2505 23.3193 21.6666 24.3198 22.4989 25.1521C23.3312 25.9844 24.3317 26.4005 25.5005 26.4005ZM25.5005 42.0193C29.8213 38.0526 33.0265 34.4489 35.1161 31.2083C37.2057 27.9677 38.2505 25.0901 38.2505 22.5755C38.2505 18.7151 37.0198 15.5542 34.5583 13.0927C32.0968 10.6312 29.0776 9.40051 25.5005 9.40051C21.9234 9.40051 18.9041 10.6312 16.4427 13.0927C13.9812 15.5542 12.7505 18.7151 12.7505 22.5755C12.7505 25.0901 13.7953 27.9677 15.8849 31.2083C17.9744 34.4489 21.1797 38.0526 25.5005 42.0193ZM25.5005 47.6505C19.7984 42.7984 15.5396 38.2917 12.7239 34.1302C9.9083 29.9687 8.50049 26.1172 8.50049 22.5755C8.50049 17.263 10.2093 13.0307 13.6271 9.87864C17.0448 6.72655 21.0026 5.15051 25.5005 5.15051C29.9984 5.15051 33.9562 6.72655 37.3739 9.87864C40.7916 13.0307 42.5005 17.263 42.5005 22.5755C42.5005 26.1172 41.0927 29.9687 38.2771 34.1302C35.4614 38.2917 31.2026 42.7984 25.5005 47.6505Z"
                                        fill="#0F9144"
                                    />
                                </g>
                            </svg>
                            <p className="icon-text">{footerData?.address}</p>
                        </div>
                        <div className="contact-devider"></div>
                        <div className="flex items-center mb-4 flex flex-col w-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="51"
                                height="52"
                                viewBox="0 0 51 52"
                                fill="none"
                            >
                                <mask
                                    id="mask0_578_19061"
                                    style={{ maskType: "alpha" }}
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="52"
                                    height="52"
                                >
                                    <rect
                                        x="0.000488281"
                                        y="0.900513"
                                        width="51"
                                        height="51"
                                        fill="#D9D9D9"
                                    />
                                </mask>
                                <g mask="url(#mask0_578_19065)">
                                    <path
                                        d="M8.50049 43.4005C7.33174 43.4005 6.33122 42.9844 5.49893 42.1521C4.66663 41.3198 4.25049 40.3193 4.25049 39.1505V13.6505C4.25049 12.4818 4.66663 11.4812 5.49893 10.649C6.33122 9.81666 7.33174 9.40051 8.50049 9.40051H42.5005C43.6692 9.40051 44.6698 9.81666 45.5021 10.649C46.3343 11.4812 46.7505 12.4818 46.7505 13.6505V39.1505C46.7505 40.3193 46.3343 41.3198 45.5021 42.1521C44.6698 42.9844 43.6692 43.4005 42.5005 43.4005H8.50049ZM25.5005 28.5255L8.50049 17.9005V39.1505H42.5005V17.9005L25.5005 28.5255ZM25.5005 24.2755L42.5005 13.6505H8.50049L25.5005 24.2755ZM8.50049 17.9005V13.6505V39.1505V17.9005Z"
                                        fill="#0F9144"
                                    />
                                </g>
                            </svg>
                            <p className="icon-text"> {footerData?.email}</p>
                        </div>
                        <div className="contact-devider"></div>

                        <div className="flex items-center mb-4 flex flex-col w-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="51"
                                height="52"
                                viewBox="0 0 51 52"
                                fill="none"
                            >
                                <mask
                                    id="mask0_578_19061"
                                    style={{ maskType: "alpha" }}
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="52"
                                    height="52"
                                >
                                    <rect
                                        x="0.000488281"
                                        y="0.900513"
                                        width="51"
                                        height="51"
                                        fill="#D9D9D9"
                                    />
                                </mask>
                                <g mask="url(#mask0_578_19069)">
                                    <path
                                        d="M42.3942 45.5255C37.9672 45.5255 33.5932 44.5604 29.2724 42.6302C24.9515 40.7 21.0203 37.9641 17.4786 34.4224C13.9369 30.8807 11.201 26.9495 9.2708 22.6286C7.34059 18.3078 6.37549 13.9338 6.37549 9.50676C6.37549 8.86926 6.58799 8.33801 7.01299 7.91301C7.43799 7.48801 7.96924 7.27551 8.60674 7.27551H17.213C17.7088 7.27551 18.1515 7.44374 18.5411 7.7802C18.9307 8.11666 19.1609 8.5151 19.2317 8.97551L20.613 16.413C20.6838 16.9797 20.6661 17.4578 20.5599 17.8474C20.4536 18.237 20.2588 18.5734 19.9755 18.8568L14.8224 24.063C15.5307 25.3734 16.3718 26.6396 17.3458 27.8615C18.3198 29.0833 19.3911 30.2609 20.5599 31.3943C21.6578 32.4922 22.8088 33.5104 24.013 34.449C25.2172 35.3875 26.4922 36.2463 27.838 37.0255L32.8317 32.0318C33.1505 31.713 33.5666 31.4739 34.0802 31.3146C34.5937 31.1552 35.0984 31.1109 35.5942 31.1818L42.9255 32.6693C43.4213 32.8109 43.8286 33.0677 44.1474 33.4396C44.4661 33.8115 44.6255 34.2276 44.6255 34.688V43.2943C44.6255 43.9318 44.413 44.463 43.988 44.888C43.563 45.313 43.0317 45.5255 42.3942 45.5255ZM12.8036 20.0255L16.3099 16.5193L15.4067 11.5255H10.6786C10.8557 12.9776 11.1036 14.412 11.4224 15.8286C11.7411 17.2453 12.2015 18.6443 12.8036 20.0255ZM31.8224 39.0443C33.2036 39.6463 34.6114 40.1245 36.0458 40.4786C37.4802 40.8328 38.9234 41.063 40.3755 41.1693V36.4943L35.3817 35.4849L31.8224 39.0443Z"
                                        fill="#0F9144"
                                    />
                                </g>
                            </svg>
                            <p className="icon-text">{footerData?.phone}</p>
                        </div>
                    </div>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="flex flex-row gap-2 w-full">
                            <div className=" w-full flex flex-col gap-1">
                                <label className="" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full"
                                    placeholder="Name"
                                    required
                                />
                            </div>
                            <div className=" w-full flex flex-col gap-1">
                                <label className="" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4 w-full flex flex-col gap-1">
                            <label className="" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                rows="5"
                                placeholder="Go ahead , we are listening"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="form-btn"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                    </motion.div>
                    </div>
        </div>
    );
};

export default ContactUsPage;
