"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";
import Logo from "../../assets/images/treemixLogo.png";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();

  // Normalize pathname (remove trailing slash unless it's just "/")
  const normalizedPath = pathname !== "/" ? pathname.replace(/\/$/, "") : "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, handleClickOutside]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navClass =
    pathname === "/"
      ? isScrolled
        ? "bg-white shadow-md"
        : "bg-transparent"
      : "bg-white shadow-md";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/certificates", label: "Certificates" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 pr-6 sm:px-12 transition-all duration-300 ${navClass}`}
    >
      <div className="container mx-auto  py-1 flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <Image src={Logo} alt="Tree Mix" width={160} height={120} />
        </Link>

        <button
          onClick={toggleMenu}
          className="sm:hidden text-2xl text-gray-800 focus:outline-none"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul
          ref={menuRef}
          className={`absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent sm:flex space-y-4 sm:space-y-0 sm:space-x-8 p-6 sm:p-0 shadow-md sm:shadow-none transition-transform duration-300 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} legacyBehavior>
                <a
                  className={`font-semibold ${
                    normalizedPath === link.href
                      ? "text-green-700"
                      : "text-gray-800 hover:text-green-700"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <a
          href="https://wa.me/201033770330?text=Hello, I need more information."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-block px-4 py-2 f bg-orange-500 text-white rounded-full hover:bg-orange-600"
        >
          <div className="flex gap-2 items-center">
            Contact Us
            <FaWhatsapp className="text-lg" />
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
