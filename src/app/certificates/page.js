"use client";
import axios from "axios";
import { Breadcrumb, Spin, message, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import "./Certificates.scss";
import left from "../../assets/images/left.png";
import right from "../../assets/images/right.png";

const fetchCertificates = async () => {
    try {
        const response = await axios.get(
            `https://backend.treemix-eg.com/api/certificates.index`
        );
        return response.data.Certificats || [];
    } catch (error) {
        console.error("Error fetching certificates:", error);
        message.error("Failed to fetch certificates. Please try again later.");
        return [];
    }
};

const CertificatesPage = () => {
    const router = useRouter();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previewUrl, setPreviewUrl] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    // useEffect(() => {
    //     const initializeData = async () => {
    //         try {
    //             const fetchedCertificates = await fetchCertificates();
    //             setCertificates(fetchedCertificates);
    //         } catch (error) {
    //             message.error("Error initializing certificates.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     initializeData();
    // }, []);

    useEffect(() => {
        const initializeData = async () => {
            try {
                const fetchedCertificates = await fetchCertificates();
                // Limit certificates to the first 2
                setCertificates(fetchedCertificates.slice(0, 2));
            } catch (error) {
                message.error("Error initializing certificates.");
            } finally {
                setLoading(false);
            }
        };
    
        initializeData();
    }, []);
    
    const handlePreview = (certificatePdf, certificateName) => {
        if (!certificatePdf) {
            message.warning("Certificate preview is not available.");
            return;
        }
        setPreviewUrl(certificatePdf);
        setPreviewTitle(certificateName);
    };

    const handlePreviewModalClose = () => {
        setPreviewUrl("");
        setPreviewTitle("");
    };

    const handleDownload = (certificatePdf) => {
        if (!certificatePdf) {
            message.warning("Certificate download is not available.");
            return;
        }
        window.open(certificatePdf, "_blank");
    };

    return (
        <>
            <div className="mb-14">
                {/* Breadcrumb Section */}
                <div className="certificate-head flex flex-col lg:flex-row items-center mt-12 h-[150px] lg:h-[200px]">
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
                                >
                                    Home
                                </Breadcrumb.Item>
                                <Breadcrumb.Item className="text-green-600 text-[24px]">
                                    Certificates
                                </Breadcrumb.Item>
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

                {/* Certificate Description */}

                {/* Certificate Section */}
                <div className="flex justify-center flex-col items-center gap-3 mb-8 mt-12 certificate-desc px-12">
                    <motion.h1
                        className="text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Certificates
                    </motion.h1>
                    <motion.p
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        At Tree Mix, we take pride in providing only the highest
                        quality herbal products. Our certifications reflect our
                        commitment to excellence, ensuring that all our herbs
                        are organically grown, sustainably sourced, and meet
                        rigorous safety and quality standards. These
                        certifications guarantee that you can trust TreeMix for
                        pure, natural, and eco-friendly herbal solutions.{" "}
                    </motion.p>
                </div>
                <div className="certificate-section px-12 mx-auto ">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <Spin size="large" className="custom-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {certificates.map((certificate, index) => (
                                <motion.div
                                    key={certificate.id}
                                    className="certificate-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.2,
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Image
                                        src={certificate.image}
                                        alt={certificate.name}
                                        width={360}
                                        height={240}
                                        className="certificate-img"
                                        loading="lazy"
                                    />
                                    <div className="flex justify-between items-center w-full mt-5">
                                        <h3 className="ml-2">
                                            {certificate.name || "Certificate"}
                                        </h3>
                                        <div className="flex items-center mx- gap-4 mr-2">
                                            {/* Preview Button */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handlePreview(
                                                        certificate.pdf,
                                                        certificate.name
                                                    )
                                                }
                                                aria-label="Preview Certificate"
                                                className="certificate-action-btn"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 17 17"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M13.2503 8.34346C13.2503 9.00448 12.0935 12.4748 8.4579 12.4748C4.82231 12.4748 3.66553 9.00448 3.66553 8.34346C3.66553 7.68244 4.82231 4.2121 8.4579 4.2121C12.0935 4.2121 13.2503 7.68244 13.2503 8.34346Z"
                                                        stroke="#0F9144"
                                                        strokeWidth="0.991525"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M9.94519 8.34346C9.94519 9.16487 9.27931 9.83075 8.4579 9.83075C7.63649 9.83075 6.97061 9.16487 6.97061 8.34346C6.97061 7.52205 7.63649 6.85617 8.4579 6.85617C9.27931 6.85617 9.94519 7.52205 9.94519 8.34346Z"
                                                        stroke="#0F9144"
                                                        strokeWidth="0.991525"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>

                                            {/* Download Button */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDownload(
                                                        certificate.pdf,
                                                        certificate.name
                                                    )
                                                }
                                                aria-label="Download Certificate"
                                                className="certificate-action-btn"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 17 17"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M3.75049 10.1613V11.1528C3.75049 12.248 4.63833 13.1358 5.73354 13.1358H11.3522C12.4474 13.1358 13.3352 12.248 13.3352 11.1528V10.1613M8.54286 9.83075V3.55109M8.54286 9.83075L6.39456 7.51719M8.54286 9.83075L10.6912 7.51719"
                                                        stroke="#0F9144"
                                                        strokeWidth="0.991525"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Preview Modal with Animation */}
                <Modal
                    title={previewTitle || "Certificate Preview"}
                    open={!!previewUrl}
                    onCancel={handlePreviewModalClose}
                    footer={null}
                    width={800}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <iframe
                            src={previewUrl}
                            width="100%"
                            height="500px"
                            title="Certificate Preview"
                        ></iframe>
                    </motion.div>
                </Modal>
            </div>
        </>
    );
};

export default CertificatesPage;
