import { useState } from "react";
import MainCard from "./MainCard";
import newsData from "../_data/news.json";

export default function SliderNews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = newsData[activeIndex];

  return (
  <div>
    <MainCard
      title={current.title}
      time={current.time}
      image={current.image}
    />

    <div className="flex items-center justify-center gap-2 mt-4">
      {newsData.map((_key, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`w-9 h-9 rounded text-sm font-bold ${
            index === activeIndex

          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  </div>
);
}