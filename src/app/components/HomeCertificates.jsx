"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import axios from "axios";
import { Spin, message } from "antd";

const HomeCertificates = () => {
  const [certificates, setCertificates] = useState([]); // ✅ no <any>
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(
          "https://backend.treemix-eg.com/api/certificates.index"
        );
        setCertificates(response.data.Certificats || []);
      } catch (error) {
        console.error("Error fetching certificates:", error);
        message.error("Failed to fetch certificates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <>
      {/* Heading Section */}
      <div className="flex flex-col items-center my-14 cer-heading px-4 text-center">
        <h6 className="maincolor text-lg md:text-xl">Certificates</h6>
        <h2 className="mb-2 mt-2 text-2xl md:text-4xl font-semibold">
          Trusted by Experts, Loved by Nature
        </h2>
        <p className="maincolor max-w-3xl text-sm md:text-base">
          At Tree Mix, we’re proud to have earned certifications that reflect
          our commitment to quality, sustainability, and trust. We aim to be
          helping hand in achieving success.
        </p>
      </div>

      {/* Marquee Section */}
      <div className="bg-gradient-to-r from-green-100 via-transparent to-green-100 py-5 flex flex-col items-center w-full">
        <div className="w-full max-w-6xl overflow-hidden px-4">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Spin size="large" />
            </div>
          ) : (
            <Marquee gradient={false} speed={30} pauseOnHover={true}>
              {certificates.map((certificate) => (
                <div key={certificate.id} className="inline-block px-4">
                  <Image
                    src={certificate.icon}
                    alt={certificate.name || "Certificate"}
                    width={120}
                    height={120}
                    className="rounded-lg object-contain md:w-[173px] md:h-[173px]"
                  />
                </div>
              ))}
            </Marquee>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeCertificates;
