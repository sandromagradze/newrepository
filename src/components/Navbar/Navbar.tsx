import { useTranslation } from "react-i18next";
import SearchBar from "../SearchBar/SearchBar";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { t } = useTranslation();
  const [isopen, setIsOpen] = useState(false);
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
    "რეგიონი",
    " სამხედრო",
    "კულტურა",
    "ანონსი",
    "nav.home",
    "nav.politics",
    "nav.economy",
    "nav.society",
    "nav.law",
    "nav.world",
    "nav.sport",
    "სხვა",
  ] as const;

  const handleSearch = (searchTerm: string) => {
    console.log("Search for:", searchTerm);
  };

  return (
    <>
      <div ref={sentinelRef} className="h-px" />
      <nav
        className={`sticky top-0 z-50 bg-[#FFFFFF] text-[12px] flex items-center gap-[30px] px-6 py-2 transition-shadow duration-200 ${
          isStuck ? "shadow-md" : ""
        }`}
      >
        {isStuck && (
          <img src="/ipn.jpeg" alt={t("header.logoAlt")} className="h-10 w-auto" />
        )}

        <ul className="flex gap-[16px]">
          {categories.map((key) => (
            <li key={key} className="navitem">
              {t(key)}
            </li>
          ))}
          <button onClick={() => setIsOpen(!isopen)} className="cursor-pointer">
            <img src="/burger.svg" alt="Burger Menu" />
          </button>
        </ul>

        <SearchBar onSearch={handleSearch} />
      </nav>
    </>
  );
}