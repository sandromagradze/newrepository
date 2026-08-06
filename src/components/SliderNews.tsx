import { useEffect, useState } from "react";
import MainCard from "./maincard/MainCard";
import newsData from "../_data/news.json";
import { useLocalizedData } from "../i18n/useLocalizedData";

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
    <div className="">
      <MainCard
        title={current.title}
        time={current.time}
        image={current.image}
      />

      <div className="flex  items-center justify-center gap-2 mt-4">
        {localizedNews.map((_item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-9 h-9 rounded text-sm font-bold ${
              index === activeIndex
                ? "bg-[#1E5BA6] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
