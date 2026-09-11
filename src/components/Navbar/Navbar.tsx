import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import SearchBar from "../SearchBar/SearchBar";
import WrapperA from "../WrapperA/WrapperA";
import { useMenu } from "../hooks/useMenu";

import "./Navbar.css";

export default function Navbar() {
  const { t } = useTranslation();

  const [isStuck, setIsStuck] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isError,
  } = useMenu();

  const menu = data?.menu ?? [];

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      {
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getMenuUrl = (link: string) => {
    if (!link) {
      return "#";
    }

    if (
      link.startsWith("http://") ||
      link.startsWith("https://")
    ) {
      return link;
    }

    if (link.startsWith("/")) {
      return `https://www.interpressnews.ge${link}`;
    }

    return `https://www.interpressnews.ge/${link}`;
  };

  const handleSearch = (searchTerm: string) => {
    console.log("Search for:", searchTerm);
  };

  const visibleMenu = menu.slice(0, 11);

  const extraMenu = menu.slice(11);

  return (
    <>
      <div
        ref={sentinelRef}
        className="h-px w-full"
      />

      <nav
        className={`bg-white text-[12px] w-full sticky top-0 z-50 transition-shadow duration-300 ${
          isStuck
            ? "shadow-md"
            : "shadow-none"
        }`}
      >
        <WrapperA>
          <div className="relative">

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

                  {isLoading && (
                    <li>
                      Loading...
                    </li>
                  )}

                  {isError && (
                    <li>
                      Failed to load menu
                    </li>
                  )}

                  {!isLoading &&
                    !isError &&
                    visibleMenu.map((item) => {
                      const url = getMenuUrl(item.link);

                      return (
                        <li
                          key={item.alias}
                          className="navitem"
                        >
                          <a
                            href={url}
                            target={
                              item.is_external
                                ? "_blank"
                                : "_self"
                            }
                            rel={
                              item.is_external
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="nav-link"
                          >
                            {item.text}
                          </a>
                        </li>
                      );
                    })}

                  {extraMenu.length > 0 && (
                    <li className="navitem more-menu">

                      <button
                        type="button"
                        className="nav-link more-button"
                        aria-label={t(
                          "header.menuToggle",
                          "More menu",
                        )}
                      >
                        <img
                          src="/burger.svg"
                          alt=""
                        />
                      </button>

                      <div className="more-dropdown">

                        <div className="more-dropdown-inner">

                          {extraMenu.map((item) => {
                            const url =
                              getMenuUrl(item.link);

                            return (
                              <a
                                key={item.alias}
                                href={url}
                                target={
                                  item.is_external
                                    ? "_blank"
                                    : "_self"
                                }
                                rel={
                                  item.is_external
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                className="dropdown-link"
                              >
                                {item.text}
                              </a>
                            );
                          })}

                        </div>
                      </div>
                    </li>
                  )}

                </ul>
              </div>

              <SearchBar
                onSearch={handleSearch}
              />

            </div>
          </div>
        </WrapperA>
      </nav>
    </>
  );
}