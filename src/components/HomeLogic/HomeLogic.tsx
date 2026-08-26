import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalizedData } from "../../i18n/useLocalizedData";

import miniNews from "../../_data/miniNews.json";
import profileCards from "../../_data/profileCards.json";
import videos from "../../_data/videos.json";
import homeNews from "../../_data/homeNews.json";

const MINI_NEWS_PAGE_SIZE = 4;

export function useHomeLogic() {
  const parentref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const localizedHomeNews = useLocalizedData(homeNews);
  const localizedProfileCards = useLocalizedData(profileCards);
  const localizedMiniNews = useLocalizedData(miniNews);
  const featuredNews = localizedHomeNews[0];

  const [visibleMiniNewsCount, setVisibleMiniNewsCount] = useState(MINI_NEWS_PAGE_SIZE);
  const [showMoreButton, setShowMoreButton] = useState(true);

  const hasMoreMiniNews = visibleMiniNewsCount < localizedMiniNews.length;

  // Button click handler: loads 4 more and hides the button
  const handleLoadMoreMiniNews = () => {
    setShowMoreButton(false);
    setVisibleMiniNewsCount((prev) =>
      Math.min(prev + MINI_NEWS_PAGE_SIZE, localizedMiniNews.length)
    );
  };

  // Infinite scroll listener tied to when the user scrolls past the container
  useEffect(() => {
    // If the button is still showing, we don't want infinite scroll to take over yet
    if (showMoreButton) return;

    const handleScroll = () => {
      if (!parentref.current) return;
      
      const rect = parentref.current.getBoundingClientRect();
      // Trigger when the bottom of the container comes into view or passes the viewport
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