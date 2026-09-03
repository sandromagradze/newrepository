import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalizedData } from "../../i18n/useLocalizedData";

import miniNews from "../../_data/miniNews.json";
import videos from "../../_data/videos.json";
import homeNews from "../../_data/homeNews.json";

const MINI_NEWS_PAGE_SIZE = 4;

export function useHomeLogic() {
  const parentref = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  const localizedHomeNews = useLocalizedData(homeNews);
  const localizedMiniNews = useLocalizedData(miniNews);
  const featuredNews = localizedHomeNews[0];

  const [apiProfiles, setApiProfiles] = useState([]);
  const lang_code = i18n.resolvedLanguage || "ka";

useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          `https://dev.ipn.ge/${lang_code}/api/profiles/`,
          {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ page: "1" }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Swagger-ის სტრუქტურის მიხედვით, პროფილები არის data.profiles მასივში
        const profileList = data.profiles || [];
        setApiProfiles(profileList);
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
      }
    };

    fetchProfiles();
  }, [lang_code]);



  const localizedProfileCards = apiProfiles.slice(0, 4);
  

  const [visibleMiniNewsCount, setVisibleMiniNewsCount] = useState(MINI_NEWS_PAGE_SIZE);
  const [showMoreButton, setShowMoreButton] = useState(true);

  const hasMoreMiniNews = visibleMiniNewsCount < localizedMiniNews.length;

  const handleLoadMoreMiniNews = () => {
    setShowMoreButton(false);
    setVisibleMiniNewsCount((prev) =>
      Math.min(prev + MINI_NEWS_PAGE_SIZE, localizedMiniNews.length)
    );
  };

  useEffect(() => {
    if (showMoreButton) return;

    const handleScroll = () => {
      if (!parentref.current) return;

      const rect = parentref.current.getBoundingClientRect();
      const isBottomReached = rect.bottom <= window.innerHeight + 200;

      if (isBottomReached) {
        setVisibleMiniNewsCount((prev) => {
          if (prev >= localizedMiniNews.length) return prev;
          return Math.min(prev + MINI_NEWS_PAGE_SIZE, localizedMiniNews.length);
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showMoreButton, localizedMiniNews.length]);

  return {
    parentref,
    localizedHomeNews,
    localizedProfileCards,
    localizedMiniNews,
    featuredNews,
    videos,
    visibleMiniNewsCount,
    hasMoreMiniNews,
    showMoreButton,
    handleLoadMoreMiniNews,
    sidebarAdAlt: t("common.sidebarAdAlt"),
  };
}