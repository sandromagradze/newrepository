import { useEffect, useState } from "react";
import MainCard from "../maincard/MainCard";
import newsData from "../../_data/news.json";
import { useLocalizedData } from "../../i18n/useLocalizedData";
import "./SliderNews.css";

interface SliderNewsProps {
  compact?: boolean;
}

export default function SliderNews({ compact = false }: SliderNewsProps) {
  const localizedNews = useLocalizedData(newsData);
  const [activeIndex, setActiveIndex] = useState(0);
  const current = localizedNews[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? localizedNews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === localizedNews.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!localizedNews || localizedNews.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % localizedNews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [localizedNews, localizedNews.length]);

  return (
    <div className={`slider-news-wrapper ${compact ? "slider-news-wrapper--compact" : ""}`}>
      <MainCard
        title={current.title}
        time={current.time}
        image={current.image}
        compact={compact}
      />
      <div className="slider-pagination-wrapper">
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <img src="/arrowleft.svg" alt="left" />
        </button>

        <div className="slider-news-dots">
          {localizedNews.map((_item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`slider-news-dot ${
                index === activeIndex ? "slider-news-dot-active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next slide"
        >
          <img src="/arrowright.svg" alt="right" />
        </button>
      </div>
    </div>
  );
}
