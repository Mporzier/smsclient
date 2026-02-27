"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isPageScrolled, setIsPageScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  // 1. Handle scroll styling (Header bubble)
  useEffect(() => {
    const handleScroll = () => setIsPageScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Handle Hash Navigation and State Reset
  useEffect(() => {
    // If we are NOT on home, clear the active ID and exit
    if (!isHome) {
      requestAnimationFrame(() => setActiveId(""));
      return;
    }

    // If we ARE on home and have a hash, scroll to it
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      // Use requestAnimationFrame to ensure DOM is ready without blocking render
      requestAnimationFrame(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveId(id);
        }
      });
    }
  }, [pathname, isHome]);

  // 3. Intersection Observer (Only active on Home)
  useEffect(() => {
    if (!isHome) return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const ids = ["hero", "how-it-works", "features", "pricing", "faq"];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const newActiveId = entry.target.id === "hero" ? "" : entry.target.id;
          setActiveId(newActiveId);
        }
      });
    }, observerOptions);

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState({}, "", "/");
      setActiveId("");
    }
  };

  return (
    <header className="sticky z-50 flex justify-center transition-all duration-500 top-1">
      <div
        className={`
          mx-auto rounded-2xl transition-all duration-500 ease-in-out
          border border-fuchsia-900/10 backdrop-blur-lg bg-background/75
          w-full max-w-7xl
          ${
            isPageScrolled
              ? "md:w-[1000px] translate-y-2 shadow-lg"
              : "translate-y-0"
          }
        `}
      >
        <div className="flex h-[56px] items-center justify-between px-3">
          <Link
            href="/"
            onClick={handleHomeClick}
            className="flex items-center flex-1"
          >
            <Logo />
            <span
              className={`
                inline-block overflow-hidden whitespace-nowrap
                transition-[max-width] duration-500 ease-in-out
                ${isPageScrolled ? "max-w-0" : "max-w-[200px] md:max-w-[280px]"}
              `}
            >
              <span className="inline-block font-semibold text-2xl text-slate-900">
                smsclient.fr
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center justify-center gap-8 flex-1">
            {[
              { name: "Accueil", id: "" },
              { name: "Mode d'emploi", id: "how-it-works" },
              { name: "Fonctionnalités", id: "features" },
              { name: "Tarifs", id: "pricing" },
              { name: "FAQ", id: "faq" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.id === "" ? "/" : `/#${item.id}`}
                scroll={false}
                onClick={(e) => {
                  if (item.id === "") handleHomeClick(e);
                  if (isHome && item.id !== "") {
                    e.preventDefault();
                    document
                      .getElementById(item.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState({}, "", `/#${item.id}`);
                    setActiveId(item.id);
                  }
                }}
                className={`relative py-1 text-sm font-medium transition-colors duration-300 whitespace-nowrap
                  ${
                    isHome && activeId === item.id
                      ? "text-sky-800"
                      : "text-gray-500 hover:text-gray-900"
                  }
                `}
              >
                {item.name}
                {isHome && (
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-sky-800 transition-all duration-300 
                    ${activeId === item.id ? "w-full" : "w-0"}`}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex-shrink-0 flex justify-end flex-1">
            <button className="bg-sky-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700 transition-colors">
              Essayer gratuitement
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
