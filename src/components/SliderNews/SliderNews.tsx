import { useState } from "react";

import { useTranslation } from "react-i18next";

import MainCard from "../maincard/MainCard";

import useSliderNews from "../hooks/useSliderNews";

import type { ArticleImage } from "./sliderNewsApi";

import "./SliderNews.css";

interface SliderNewsProps {
  compact?: boolean;
}

export default function SliderNews({
  compact = false,
}: SliderNewsProps) {
  const { i18n } = useTranslation();

  const {
    data: articles = [],
    isLoading,
    isError,
    error,
  } = useSliderNews();

  const [activeIndex, setActiveIndex] = useState(0);

  const langCode =
    i18n.resolvedLanguage?.split("-")[0] || "ka";

  const wrapperClassName = `slider-news-wrapper ${
    compact
      ? "slider-news-wrapper--compact"
      : ""
  }`;

  if (isLoading) {
    return (
      <div className={wrapperClassName}>
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className={wrapperClassName}>
        Slider error:{" "}
        {error instanceof Error
          ? error.message
          : "Failed to load slider"}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className={wrapperClassName}>
        No slider articles found.
      </div>
    );
  }

  /*
   * თუ articles შეიცვალა და ძველი activeIndex
   * აღარ არსებობს, ავტომატურად ბოლო არსებული
   * index გამოიყენება.
   */
  const safeActiveIndex = Math.min(
    activeIndex,
    articles.length - 1
  );

  const current = articles[safeActiveIndex];

  const getImageUrl = (
    image: ArticleImage | null
  ): string => {
    if (!image) {
      return "";
    }

    const src =
      image.webp?.trim() ||
      image.original?.trim() ||
      "";

    if (!src) {
      return "";
    }

    if (
      src.startsWith("http://") ||
      src.startsWith("https://")
    ) {
      return src;
    }

    return `https://dev.ipn.ge/${src.replace(
      /^\/+/,
      ""
    )}`;
  };

  const imageUrl = getImageUrl(current.image);

  /*
   * ეს არის ძველი, მუშა URL ლოგიკა.
   */
  const articleUrl = current.url
    ? `https://dev.ipn.ge/${langCode}${current.url}`
    : "https://dev.ipn.ge/";

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0
        ? articles.length - 1
        : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === articles.length - 1
        ? 0
        : prev + 1
    );
  };

  return (
    <div className={wrapperClassName}>
      <MainCard
        title={current.title}
        time={current.publish_up}
        image={imageUrl}
        compact={compact}
        url={articleUrl}
      />

      <div className="slider-pagination-wrapper">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous article"
        >
          <img
            src="/arrowleft.svg"
            alt="Previous"
          />
        </button>

        <div className="slider-news-dots">
          {articles.map((article, index) => (
            <button
              type="button"
              key={article.id}
              onClick={() =>
                setActiveIndex(index)
              }
              className={`slider-news-dot ${
                index === safeActiveIndex
                  ? "slider-news-dot-active"
                  : ""
              }`}
              aria-label={`Go to article ${
                index + 1
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next article"
        >
          <img
            src="/arrowright.svg"
            alt="Next"
          />
        </button>
      </div>
    </div>
  );
}
