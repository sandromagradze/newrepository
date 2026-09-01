import { useTranslation } from "react-i18next";
import SearchBar from "../SearchBar/SearchBar";
import WrapperA from "../WrapperA/WrapperA";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const categories = [
    "nav.region",
    "nav.military",
    "nav.culture",
    "nav.announcement",
    "nav.home",
    "nav.politics",
    "nav.economy",
    "nav.society",
    "nav.law",
    "nav.world",
    "nav.sport",
    
  ] as const;

  const handleSearch = (searchTerm: string) => {
    console.log("Search for:", searchTerm);
  };

  return (
    <>
      <div ref={sentinelRef} className="h-px w-full" />

      
      <nav
        className={` bg-white text-[12px] w-full transition-shadow duration-200 ${
          isStuck ? "shadow-md fixed top-0 z-50 " : ""
        }`}
      >
        
        <WrapperA>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-[30px]">
              {isStuck && (
                <img
                  src="/ipn.jpeg"
                  alt={t("header.logoAlt")}
                  className="h-10 w-auto transition-opacity duration-300"
                />
              )}

              <ul className="flex gap-[16px] items-center list-none m-0 p-0">
                {categories.map((key) => (
                  <li key={key} className="navitem">
                    {t(key)}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
                aria-label={t("header.menuToggle", "Toggle menu")}
                aria-expanded={isOpen}
              >
                <img src="/burger.svg" alt="" />
              </button>
            </div>

            <SearchBar onSearch={handleSearch} />
          </div>
        </WrapperA>
      </nav>
    </>
  );
}