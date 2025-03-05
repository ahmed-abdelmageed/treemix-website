"use client";

import React from "react";
import Image from "next/image";
import worldMap from "../../assets/images/map.png"; // Replace with your world map image path

const ExportMap = () => {
    return (
        <div className="export-map-container">
            <div className="text-center mb-8">
                <p className="exporting-text text-green-600 font-bold uppercase">
                    Exporting
                </p>
                <h2 className="map-heading text-2xl font-bold">
                    We Export our Products <br /> the worldwide
                </h2>
            </div>
            <div className="map-container">
                <Image
                    src={worldMap}
                    alt="World Map"
                    layout="responsive"
                    className="world-map"
                />
            </div>
        </div>
    );
};

export default ExportMap;
