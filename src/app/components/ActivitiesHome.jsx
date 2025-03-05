"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PaymentTermIcon from "../../assets/images/pro.png";
import styles from "./ActivitiesHome.module.scss";

const ActivitiesHome = () => {
    const activities = [
        { id: 1, title: "Food Africa 2024", image: PaymentTermIcon, date: "15 August 2024" },
        { id: 2, title: "Gulfood", image: PaymentTermIcon, date: "20 August 2024" },
        { id: 3, title: "Expo Dubai", image: PaymentTermIcon, date: "10 September 2024" },
        { id: 4, title: "Custom Uploaded Event", image: PaymentTermIcon, date: "15 January 2025" },
    ];

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <section className={styles["activities-home"]}>
            {/* Header */}
            <div className="flex justify-center flex-col items-center gap-3 mb-8">
                <h1 className="text-center text-xl sm:text-2xl font-semibold">Latest Activities</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="88" height="24" viewBox="0 0 88 24" fill="none">
                    <path d="M76.7223 0.160479C42.4874 -0.95226 21.2534 3.88381 5.99276 9.64345C-2.34906 12.7918 -1.1699 23.5378 7.74331 23.7676C31.4581 24.3791 55.9719 16.45 78 13.5358C90.8919 11.8302 89.7197 0.582934 76.7223 0.160479Z" fill="#0F9144" />
                </svg>
            </div>

            {/* Carousel */}
            <div className="px-4 sm:px-6 md:px-12">
                <Slider {...sliderSettings} className="mx-0 md:mx-8">
                    {activities.map((activity) => (
                        <div key={activity.id} className="px-2">
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                {/* Card Image */}
                                <div className="relative w-full h-48 sm:h-60 md:h-72 lg:h-80">
                                    <Image src={activity.image} alt={activity.title} fill className="object-cover rounded-t-xl" />
                                </div>

                                {/* Card Action */}
                                <div className={`${styles["activities-home__card-action"]} p-3`}>
                                    <button className="activity-action-btn w-full flex justify-center items-center gap-1 text-sm sm:text-base">
                                        Read Post
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Card Content */}
                                <div className="mt-3 px-3 pb-4">
                                    <div className="text-gray-500 text-sm flex items-center">
                                        <span className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path d="M8 5.35205V8.85205M16 5.35205V8.85205M7.75 11.3521H16.25M6.75 19.8521H17.25C18.3546 19.8521 19.25 18.9566 19.25 17.8521V9.35205C19.25 8.24748 18.3546 7.35205 17.25 7.35205H6.75C5.64543 7.35205 4.75 8.24748 4.75 9.35205V17.8521C4.75 18.9566 5.64543 19.8521 6.75 19.8521Z" stroke="#8A8AA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {activity.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default ActivitiesHome;
