"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsBroadcast } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// Inline utility for now to be safe, or just use standard template literals
function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "News", href: "/news" },
    { name: "Program", href: "/programPage" },
    { name: "Seputar UDINUS", href: "/seputarUdinus" },
  ];

  const dropdownLinks = [
    { name: "Digital Marketing", href: "/digitalMarketing" },
    { name: "Sales", href: "/sales" },
  ];

  return (
    <div
      className={classNames(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled || isMenuOpen || !isHome
          ? "bg-white/70 backdrop-blur-xl border-white/20 shadow-sm supports-[backdrop-filter]:bg-white/60"
          : "bg-transparent",
      )}
    >
      <header className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <Image
            src="/images/tvkublue2x.png"
            width={90}
            height={50}
            alt="tvku logo"
            className="object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul
            className={classNames(
              "flex items-center gap-6 text-sm font-medium transition-colors duration-300",
              scrolled || !isHome ? "text-slate-600" : "text-white",
            )}
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-1 hover:text-primary transition-colors duration-200 focus:outline-none">
                Lainnya <span className="text-xs">▾</span>
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="bg-white/80 backdrop-blur-xl rounded-none shadow-xl border border-white/20 overflow-hidden p-1 mt-2">
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-black/5 hover:text-black rounded-none transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>

          {/* CTA Button */}
          <Link href="/liveStream">
            <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-5 py-2.5 rounded-none transition-all duration-300 shadow-lg shadow-red-600/20 flex items-center gap-2 hover:scale-105 active:scale-95">
              <BsBroadcast size={14} />
              <span>Live Streaming</span>
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={classNames(
            "md:hidden relative z-50 focus:outline-none p-2 rounded-none transition-colors",
            scrolled || !isHome || isMenuOpen
              ? "text-black hover:bg-black/5"
              : "text-white hover:bg-white/10",
          )}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-0 w-full bg-white/95 backdrop-blur-2xl shadow-xl md:hidden flex flex-col pt-24 pb-8 px-6 border-b border-white/20"
            >
              <ul className="flex flex-col gap-4 text-center">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg font-medium text-slate-800 hover:text-primary py-2"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                {/* Mobile Dropdown Items */}
                <div className="h-px bg-slate-200 w-full my-2" />
                {dropdownLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-base text-slate-500 hover:text-primary py-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                <li className="mt-4">
                  <Link href="/liveStream" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg shadow-red-600/20 flex items-center justify-center gap-2">
                      <BsBroadcast />
                      Live Streaming
                    </button>
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

export default Navbar;
