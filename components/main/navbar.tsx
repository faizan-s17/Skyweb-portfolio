'use client';
import { MouseEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";
import { personalInfo } from "@/data";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(NAV_LINKS[0]?.link ?? "#about-me");

  const sectionIds = useMemo(
    () => NAV_LINKS.map((item) => item.link.replace("#", "")).filter(Boolean),
    []
  );

  useEffect(() => {
    const updateActiveFromHash = () => {
      if (window.location.hash) {
        setActiveSection(window.location.hash);
      }
    };

    updateActiveFromHash();

    const observers = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.65],
      }
    );

    observers.forEach((el) => observer.observe(el));
    window.addEventListener("hashchange", updateActiveFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateActiveFromHash);
    };
  }, [sectionIds]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleScrollToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    targetHash: string,
    closeMobile = false
  ) => {
    if (!targetHash.startsWith("#")) return;

    event.preventDefault();
    const section = document.querySelector(targetHash);
    if (!section) return;

    const offsetTop = (section as HTMLElement).getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
    history.replaceState(null, "", targetHash);
    setActiveSection(targetHash);

    if (closeMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const linkClassName = (isActive: boolean) =>
    `rounded-full px-2.5 py-1.5 text-sm cursor-pointer interactive-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
      isActive
        ? "text-white bg-[rgba(112,66,248,0.24)] shadow-[0_0_14px_rgba(112,66,248,0.28)]"
        : "text-gray-200 hover:text-[rgb(112,66,248)]"
    }`;

  return (
    <header className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/45 bg-[#03001433] backdrop-blur-xl z-50 px-6 md:px-10 border-b border-purple-500/15">
      {/* Navbar Container */}
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo + Name */}
        <Link
          href="#about-me"
          onClick={(event) => handleScrollToSection(event, "#about-me")}
          className="flex items-center"
          aria-label="Go to About section"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={56}
            height={56}
            draggable={false}
            loading="eager"
            style={{ width: "56px", height: "56px" }}
            className="cursor-pointer"
          />
          <div className="hidden md:flex font-bold ml-[10px] text-gray-300">
            {personalInfo.name}
          </div>
        </Link>

        {/* Web Navbar */}
        <nav
          className="hidden md:flex w-[640px] h-full flex-row items-center justify-between md:mr-6"
          aria-label="Primary"
        >
          <div className="flex items-center justify-between w-full h-auto border border-[rgba(112,66,248,0.32)] bg-[rgba(6,2,24,0.46)] mr-[15px] px-[12px] py-[10px] rounded-full text-gray-200 backdrop-blur-xl shadow-[0_0_22px_rgba(112,66,248,0.14)] interactive-surface">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                onClick={(event) => handleScrollToSection(event, link.link)}
                aria-current={activeSection === link.link ? "page" : undefined}
                className={linkClassName(activeSection === link.link)}
              >
                {link.title}
              </Link>
            ))}

            {/* removed Source Code link */}
          </div>
        </nav>

        {/* Social Icons (Web) */}
        <div className="hidden md:flex flex-row gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
              aria-label={`Visit ${name}`}
              className="rounded-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <Icon className="h-6 w-6 text-white" />
            </Link>
          ))}
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-white text-4xl rounded-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          type="button"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-nav-menu"
        className={`absolute top-[65px] left-0 w-full bg-[#030014ee] backdrop-blur-xl p-5 flex flex-col items-center text-gray-300 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
          {/* Links */}
          <div className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className={`${linkClassName(activeSection === link.link)} text-center`}
                onClick={(event) => handleScrollToSection(event, link.link, true)}
                aria-current={activeSection === link.link ? "page" : undefined}
              >
                {link.title}
              </Link>
            ))}
            {/* removed Source Code link */}
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
                aria-label={`Visit ${name}`}
                className="rounded-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <Icon className="h-8 w-8 text-white" />
              </Link>
            ))}
          </div>
      </div>
    </header>
  );
};