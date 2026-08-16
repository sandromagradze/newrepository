import { useEffect, useState } from "react";
import MainCard from "../maincard/MainCard";
import newsData from "../../_data/news.json";
import { useLocalizedData } from "../../i18n/useLocalizedData";
import "./SliderNews.css";

export default function SliderNews() {
  const localizedNews = useLocalizedData(newsData);
  const [activeIndex, setActiveIndex] = useState(0);
  const current = localizedNews[activeIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % localizedNews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [localizedNews.length]);

  if (!current) {
    return null;
  }

  return (
    <div>
      <MainCard
        title={current.title}
        time={current.time}
        image={current.image}
      />

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
    </div>
  );
}
