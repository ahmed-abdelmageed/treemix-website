import { IBM_Plex_Sans } from "next/font/google";
import { ConfigProvider } from "antd";
import { MotionConfig } from "framer-motion";
import { useMemo } from "react";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import footerImg from "../assets/images/footerImg.png";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

export const metadata = {
  title: "Tree Mix",
  description: "High-Quality Herbs and Seeds Worldwide",
  keywords: "herbs, seeds, organic, health, wellness", 
};

export default function RootLayout({ children }) {
  const theme = useMemo(
    () => ({
      token: { colorPrimary: "#1890ff" },
    }),
    []
  );

  return (
    <html lang="en" className={ibmPlexSans.variable}>
      <body>
        <Navbar />
        <main>
          <ConfigProvider theme={theme}>
            <MotionConfig>{children}</MotionConfig>
          </ConfigProvider>
        </main>
        {/* Footer Section */}
        <div className="relative w-full min-h-[300px] lg:min-h-[400px] p-[20px_0px_20px_0px] lg:p-[20px_0px_20px_50px]">
          <Image
            src={footerImg}
            alt="Footer Background"
            layout="fill"
            objectFit="cover"
            className="absolute top-0 left-0 w-full h-full z-[-1]"
          />
          <Footer />
        </div>
      </body>
    </html>
  );
}
