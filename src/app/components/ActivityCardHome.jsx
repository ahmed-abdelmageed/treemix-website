"use client";

import React from "react";
import Image from "next/image";

interface ActivityCardProps {
  title: string;
  image: string;
  date: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, image, date }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    {/* Image */}
    <div className="relative w-full h-40">
      <Image src={image} alt={title} fill className="object-cover w-full h-full" />
    </div>

    {/* Content */}
    <div className="p-4">
      <h3 className="font-bold text-base text-gray-900">{title}</h3>
      <div className="text-gray-500 text-sm flex items-center mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l2.5 2.5M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
          />
        </svg>
        {date}
      </div>
    </div>

    {/* Action */}
    <div className="p-4 pt-0">
      <button className="activity-action-btn hover:bg-green-200 transition flex items-center">
        Read Post
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 ml-1"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </div>
);

export default ActivityCard;
