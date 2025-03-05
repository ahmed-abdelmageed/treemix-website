"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";

// Import images directly from the src/assets folder
import fdaImg from "../../assets/images/fda.png";
import iso from "../../assets/images/iso.png";
import hssp from "../../assets/images/hssp.png";
import cer4 from "../../assets/images/cer4.png";
import fairTrade from "../../assets/images/fairTrade.png";
import usda from "../../assets/images/usda.png";

const HomeCertificates = () => {
  const certificates = [fdaImg, iso, hssp, cer4, fairTrade, usda];

  return (
    <>
      {/* Heading Section */}
      <div className="flex flex-col items-center my-14 cer-heading px-4 text-center">
        <h6 className="maincolor text-lg md:text-xl">Certificates</h6>
        <h2 className="mb-2 mt-2 text-2xl md:text-4xl font-semibold">
          Trusted by Experts, Loved by Nature
        </h2>
        <p className="maincolor max-w-3xl text-sm md:text-base">
          At Tree Mix, we’re proud to have earned certifications that reflect our
          commitment to quality, sustainability, and trust. We aim to be helping hand in achieving success.
        </p>
      </div>

      {/* Marquee Section */}
      <div className="bg-gradient-to-r from-green-100 via-transparent to-green-100 py-5 flex flex-col items-center w-full">
        <div className="w-full max-w-6xl overflow-hidden px-4">
          <Marquee gradient={false} speed={30} pauseOnHover={true}>
            {certificates.map((certificate, index) => (
              <div key={index} className="inline-block px-4">
                <Image
                  src={certificate}
                  alt={`Certificate ${index + 1}`}
                  width={120}
                  height={120}
                  className="rounded-lg object-contain md:w-[173px] md:h-[173px]"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </>
  );
};

export default HomeCertificates;
