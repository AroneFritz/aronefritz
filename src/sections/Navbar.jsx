import React, { useEffect, useRef, useState, useCallback } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);

  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / documentHeight) * 100;

      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sections = ["home", "services", "about", "projects", "contact"];
      const sectionElements = sections.map(id => document.getElementById(id));

      let currentSection = "home";
      sectionElements.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = sections[index];
          }
        }
      });

      setActiveSection(currentSection);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleMenu]);
  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/10 z-[60]">
        <div
          className="h-full bg-black transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        ref={navRef}
        role="navigation"
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2"
      >
        <div id="main-navigation" className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-8xl">
          {["home", "services", "about", "projects", "contact"].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)} className="relative">
                <Link
                  className={`transition-all duration-300 cursor-pointer hover:text-white relative ${
                    activeSection === section ? 'text-white' : 'text-white/80'
                  }`}
                  to={`${section}`}
                  smooth
                  offset={0}
                  duration={2000}
                  onClick={() => setIsOpen(false)}
                >
                  {section}
                  {activeSection === section && (
                    <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
                  )}
                </Link>
              </div>
            )
          )}
        </div>
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
        >
          <div className="font-light">
            <p className="tracking-wider text-white/50">E-mail</p>
            <p className="text-xl tracking-widest lowercase text-pretty">
              lamanilaoarone30@gmail.com
            </p>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-white/50">Social Media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                >
                  {"{ "}
                  {social.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <button
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10 hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-white"
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center transition-all duration-300 group-hover:bg-white/80"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center transition-all duration-300 group-hover:bg-white/80"
        ></span>

        {/* Menu label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/60 font-light tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isOpen ? 'CLOSE' : 'MENU'}
        </div>
      </button>
    </>
  );
};

export default Navbar;
