"use client"; // If you're using Next.js App Router
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

const Footer = () => {
  return (
    <footer
      className="bg-cover bg-center py-4"
      style={{ backgroundImage: `url(${footerImg})` }}
    >
      <div className="py-2 px-4 sm:px-14">
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-green-600">TREE MIX</h3>
            <p className="text-gray-700 mt-4">
              Our spices are sourced from the finest farms and are carefully
              processed to retain their natural flavors and aromas.
            </p>
            <div className="flex mt-4 space-x-4">
              {[
                { icon: <FacebookOutlined />, href: "#" },
                { icon: <TwitterOutlined />, href: "#" },
                { icon: <InstagramOutlined />, href: "#" },
                { icon: <LinkedinOutlined />, href: "#" },
              ].map(({ icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="text-green-600 text-xl"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Treemix Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 sm:mt-0"
          >
            <h4 className="text-lg font-semibold text-gray-800">Treemix</h4>
            <ul className="mt-4 space-y-2">
              {["Home", "About us", "Activities", "Certificates"].map(
                (item, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      className="text-gray-700 hover:text-green-600"
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                )
              )}
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
              Our products
            </h4>
            <ul className="mt-4 space-y-2">
              {["Herbs", "Seeds", "Spices", "Dried"].map((item, index) => (
                <li key={index}>
                  <motion.a
                    href="#"
                    className="text-gray-700 hover:text-green-600"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
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
            <h4 className="text-lg font-semibold text-gray-800">Contact us</h4>
            <ul className="mt-4 space-y-2">
              {[
                { icon: <PhoneOutlined />, text: "Phone & WhatsApp" },
                { icon: <PhoneOutlined />, text: "+20235810105" },
                { icon: <MailOutlined />, text: "info@treemix-eg.net" },
                {
                  icon: <EnvironmentOutlined />,
                  text: "11 El Eather St., Haram, Giza Egypt",
                },
              ].map(({ icon, text }, index) => (
                <motion.li
                  key={index}
                  className="flex items-center text-gray-700"
                  whileHover={{ scale: 1.05 }}
                >
                  {icon}
                  <span className="ml-2">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-gray-300 mt-10 text-center py-4"
        >
          <p className="text-sm text-gray-600">
            ©2024 Treemix. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
