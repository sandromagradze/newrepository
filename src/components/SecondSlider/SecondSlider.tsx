import { useEffect, useState } from "react";
import newsData from "../../_data/secondNews.json";
import { useLocalizedData } from "../../i18n/useLocalizedData";
import "./SecongSlider.css";

export default function SecondSlider() {
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
      setActiveIndex((prevIndex) => (prevIndex + 1) % localizedNews.length);
    }, 300000);
    return () => clearInterval(interval);
  }, [localizedNews]);

  if (!localizedNews || localizedNews.length === 0 || !current) {
    return null;
  }

  return (
    <div className="slider-news-wrapper">
      <div className="bpn-style">
        <img src="/bpn.svg" alt="bpn logo" />
        <div className="h1-div">
          <h1 className="bpn-h1">ბიზნესისა და ეკონომიკის სიახლეები</h1>
        </div>
      </div>

      <div className="slider-content">
        <div className="slider-left">
          <img 
            src={current?.image} 
            alt={current?.title} 
            className="slider-image"
          />
        </div>

        <div className="slider-right">
          <div className="slider-text-content">
            <span className="slider-time">{current?.time}</span>
            <h2 className="slider-title">{current?.title}</h2>
          </div>
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
                  className={`second-slider-dot ${
                    index === activeIndex ? "second-slider-dot-active" : ""
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
      </div>
    </div>
  );
}