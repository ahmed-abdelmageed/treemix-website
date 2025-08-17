"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import footerImg from "../../assets/images/footerImg.png";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Logo from "../../assets/images/treemixLogo.png";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(
          "https://backend.treemix-eg.com/api/footer.index"
        );
        const data = await response.json();
        setFooterData(data.footer[0]); // Assuming API returns an array with one object
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) return null; // Prevent rendering until data is available

  const { description, social, email, address, phone, whatsapp } = footerData;

  const socialLinks = [
    { icon: <FacebookOutlined />, href: social?.facebook || "#" },
    { icon: <TwitterOutlined />, href: social?.twitter || "#" },
    { icon: <InstagramOutlined />, href: social?.instagram || "#" },
    { icon: <LinkedinOutlined />, href: social?.linkedin || "#" },
  ];

  const importantLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/certificates", label: "Certificates" },
    { href: "/contact", label: "Contact Us" },
  ];

  const productLinks = [
    { href: "/products", label: "Herbs" },
    { href: "/products", label: "Seeds" },
    { href: "/products", label: "Spices" },
    { href: "/products", label: "Dried" },
  ];

  return (
    <footer
      className="bg-cover bg-center py-8 text-gray-800"
    >
      <div className="py-2 px-4 sm:px-14">
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
  <div className=" footer-img-container ">

<Link href="/" legacyBehavior>
  <Image src={Logo} alt="Tree Mix" width={190} height={110}  className="ml-[-45px]" />
</Link>{" "}
</div>            
            <p className="text-gray-700  ">
              Our Products are sourced from the finest farms and are carefully
              processed to retain their natural flavors and aromas.
            </p>
            <div className="flex mt-4 space-x-4">
              {socialLinks.map(({ icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 text-xl"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Important Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 sm:mt-0"
          >
            <h4 className="text-lg font-semibold text-gray-800">
              Important Links
            </h4>
            <ul className="mt-4 space-y-2">
              {importantLinks.map(({ href, label }, index) => (
                <li key={index}>
                  <Link href={href} passHref>
                    <motion.a
                      className="text-gray-700 hover:text-green-600"
                      whileHover={{ x: 5 }}
                    >
                      {label}
                    </motion.a>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 sm:mt-0"
          >
            <h4 className="text-lg font-semibold text-gray-800">
              Our Products
            </h4>
            <ul className="mt-4 space-y-2">
              {productLinks.map(({ href, label }, index) => (
                <li key={index}>
                  <Link href={href} passHref>
                    <motion.a
                      className="text-gray-700 hover:text-green-600"
                      whileHover={{ x: 5 }}
                    >
                      {label}
                    </motion.a>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 sm:mt-0"
          >
            <h4 className="text-lg font-semibold text-gray-800">Contact Us</h4>
            <ul className="mt-4 space-y-2">
              {/* Phone */}
              {/* WhatsApp */}
              {/* WhatsApp */}
              {whatsapp && (
                <li className="flex items-center space-x-2">
                  <a
                    href={`https://wa.me/20${whatsapp.replace(/^(\+?20)/, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                  >
                    <FaWhatsapp className="text-green-600" />
                    <span>{whatsapp}</span>
                  </a>
                </li>
              )}

              {/* Phone */}
              {phone && (
                <li className="flex items-center space-x-2">
                  <a
                    href={`tel:+20${phone.replace(/^(\+?20)/, "")}`}
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                  >
                    <PhoneOutlined className="text-green-600" />
                    <span>{phone}</span>
                  </a>
                </li>
              )}

              {/* Email */}
              {email && (
                <li className="flex items-center space-x-2">
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                  >
                    <MailOutlined className="text-green-600" />
                    <span>{email}</span>
                  </a>
                </li>
              )}

              {address && (
                <li className="flex items-start space-x-2">
                <EnvironmentOutlined className="text-green-600 mt-1" />
                <div>
                  <div>
                    <span className="font-semibold">Head office:</span>{" "}
                    El-Shawany St, Maghagha, Minya Governorate, Egypt
                  </div>
                  <div>
                    <span className="font-semibold">Branch:</span>{" "}
                    Al-Haram St., Giza, Egypt
                  </div>
                </div>
              </li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-gray-300 mt-10 text-center pt-4"
        >
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Tree Mix. All Rights Reserved{" "}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
