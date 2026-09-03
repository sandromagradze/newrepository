import { useTranslation } from "react-i18next";
import SearchBar from "../SearchBar/SearchBar";
import WrapperA from "../WrapperA/WrapperA";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface MenuItem {
  alias: string;
  is_external: boolean;
  link: string;
  text: string;
}

interface MenuResponse {
  footer: Record<string, unknown>;
  menu: MenuItem[];
}

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const [menu, setMenu] = useState<MenuItem[]>([]);

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

  useEffect(() => {
    const lang = i18n.resolvedLanguage || "ka";

    const fetchMenu = async () => {
      try {
        const response = await fetch(
          `https://dev.ipn.ge/${lang}/api/menu/`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Menu request failed: ${response.status}`);
        }

        const data: MenuResponse = await response.json();

        
        setMenu(data.menu.slice(1));
      } catch (error) {
        console.error("Failed to fetch navbar menu:", error);
      }
    };

    fetchMenu();
  }, [i18n.resolvedLanguage]);

  const handleSearch = (searchTerm: string) => {
    console.log("Search for:", searchTerm);
  };

  return (
    <>
      <div ref={sentinelRef} className="h-px w-full" />

      <nav
        className={`bg-white text-[12px] w-full sticky top-0 z-50 transition-shadow duration-300 ${
          isStuck ? "shadow-md" : "shadow-none"
        }`}
      >
        <WrapperA>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-[30px]">
              <img
                src="/ipn.jpeg"
                alt={t("header.logoAlt")}
                className={`h-10 overflow-hidden transition-[max-width,opacity] duration-300 ease-in-out ${
                  isStuck
                    ? "max-w-[160px] opacity-100"
                    : "max-w-0 opacity-0"
                }`}
              />

              <ul className="flex gap-[16px] items-center list-none m-0 p-0">
                {menu.map((item) => (
                  <li key={item.alias} className="navitem">
                    {item.is_external ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <Link
                        to={item.link}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {item.text}
                      </Link>
                    )}
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