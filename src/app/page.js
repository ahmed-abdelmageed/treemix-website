"use client";

import { useEffect, useState } from "react";
import AboutHome from "./components/About";
import FeedbackSlider from "./components/FeedbackHome";
import HomeCertificates from "./components/HomeCertificates";
import OurServices from "./components/OurServices";
import ProductTabs from "./components/ProductTabs";
import Slider from "./components/Slider";
import ExportMap from "./components/ExportMap";
import ActivitiesHome from "./components/ActivitiesHome";

export default function Home() {
    const [flags, setFlags] = useState(null);

    useEffect(() => {
        const fetchFlags = async () => {
            try {
                const response = await fetch("https://backend.treemix-eg.com/api/appFlags.index");
                const data = await response.json();
                if (data.success) {
                    setFlags(data.flags[0]); // Extract the first flags object
                }
            } catch (error) {
                console.error("Error fetching flags:", error);
            }
        };

        fetchFlags();
    }, []);

    return (
        <>
            <Slider />
            <HomeCertificates />
            <OurServices id="our-services" />
            <AboutHome />
            <ProductTabs />
            {flags && flags.feedback_section !== 0 && <FeedbackSlider />}
            {flags && flags.activities_section !== 0 && <ActivitiesHome />}
            <ExportMap />
        </>
    );
}
