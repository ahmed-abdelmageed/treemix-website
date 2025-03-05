"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const FeedbackSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch(
                    "https://backend.treemix-eg.com/api/feedBack.index"
                );
                const data = await response.json();

                if (data.success) {
                    setFeedbacks(data.feedBack);
                }
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
            }
        };

        fetchFeedbacks();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "60px",
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        beforeChange: (_, next) => setActiveIndex(next),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerPadding: "20px",
                    dots: true,
                },
            },
        ],
    };

    return (
        <div className="feedback-slider px-4 md:px-0">
            <div className="mt-12">
                <div className="flex flex-col gap-4 mb-9 feedback-head text-center">
                    <h3 className="text-lg md:text-xl font-semibold">Testimonials</h3>
                    <h2 className="text-2xl md:text-3xl feedback-h2  font-bold">Good news far away</h2>
                    <p className="text-sm md:text-base">Let’s see what people think of Tree Mix</p>
                </div>
                <div className="relative">
                    {/* Surrounding small feedback images */}
                    <div className="surrounding-images hidden md:flex justify-center gap-3 mb-4">
                        {feedbacks.map((feedback, index) =>
                            index !== activeIndex ? (
                                <div
                                    key={index}
                                    className="small-feedback-image cursor-pointer"
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <Image
                                        src={feedback.image}
                                        alt={feedback.name}
                                        width={50}
                                        height={50}
                                        className="rounded-full border-2 border-transparent hover:border-green-500 transition"
                                    />
                                </div>
                            ) : null
                        )}
                    </div>

                    {/* Main Feedback Slider */}
                    <Slider {...settings}>
                        {feedbacks.map((feedback, index) => (
                            <div key={index} className="feedback-slide text-center px-2 md:px-0">
                                <Image
                                    src={feedback.image}
                                    alt={feedback.name}
                                    className="feedback-avatar mx-auto rounded-full"
                                    width={80}
                                    height={80}
                                />
                                <p className="feedback-text mt-6 text-sm md:text-base max-w-lg mx-auto">
                                    {feedback.description}
                                </p>
                                <h4 className="mt-6 text-lg font-semibold">{feedback.name}</h4>
                                <span className="flex justify-center items-center gap-1 mt-2 text-sm maincolor">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                    >
                                        <path
                                            d="M8.5 5.55103V9.05103M16.5 5.55103V9.05103M8.25 11.551H16.75M7.25 20.051H17.75C18.8546 20.051 19.75 19.1556 19.75 18.051V9.55103C19.75 8.44646 18.8546 7.55103 17.75 7.55103H7.25C6.14543 7.55103 5.25 8.44646 5.25 9.55103V18.051C5.25 19.1556 6.14543 20.051 7.25 20.051Z"
                                            stroke="#0F9144"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <p>{feedback.date || '22-12-2025'}</p>
                                </span>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default FeedbackSlider;
