"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ShippingIcon from "../../assets/images/icons/shipping.png";
import ExportIcon from "../../assets/images/icons/export.png";
import SterilizationIcon from "../../assets/images/icons/sterlization.png";
import CommitmentsIcon from "../../assets/images/icons/commitment.png";
import PaymentTermIcon from "../../assets/images/icons/payment.png";
import QualityIcon from "../../assets/images/icons/quality.png";
import ServiceIcon from "../../assets/images/icons/service.png";
import psychiatryIcon from "../../assets/images/icons/psychiatry.png";

const services = [
    {
        icon: ShippingIcon,
        title: "Shipping",
        description: "Sea (FCL • LCL • River) / Air",
    },
    {
        icon: ExportIcon,
        title: "Export",
        description: "Export over the world",
    },
    {
        icon: SterilizationIcon,
        title: "Sterilization",
        description: "Steam & ETO & CO2",
    },
    {
        icon: CommitmentsIcon,
        title: "Commitments",
        description: "Follow Up with our Customers",
    },
    {
        icon: PaymentTermIcon,
        title: "Payment Term",
        description: "Advanced / CAD / L.C",
    },
    {
        icon: QualityIcon,
        title: "Quality",
        description: "Premium Products",
    },
];

const OurServices = () => {
    return (
        <div className="py-12 bg-white">
            <div className="flex justify-center items-center gap-3 service-section mb-8">
                <Image
                    src={ServiceIcon}
                    alt="Services Icon"
                    width={90}
                    height={81}
                />
                <h2>Our Services</h2>
                <Image
                    src={psychiatryIcon}
                    alt="Services Icon"
                    width={40}
                    height={40}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4 service-container justify-items-center">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        className="group bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center service-card transition-transform duration-300 hover:bg-[#EAF3DA]"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.2,
                            type: "spring",
                            stiffness: 100,
                        }}
                    >
                        <Image
                            src={service.icon}
                            alt={service.title}
                            width={150}
                            height={550}
                            className="mb-1"
                        />
                        <h3 className="text-lg font-bold text-green-600 mb-2">
                            {service.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default OurServices;
