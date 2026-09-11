import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MainCard from "../maincard/MainCard";
import "./SliderNews.css";

interface ArticleImage {
  original: string;
  thumb: string;
  webp: string;
  position: [number, number];
}

interface Article {
  alias: string;
  id: number;
  title: string;
  introtext: string;
  publish_up: string;
  image: ArticleImage | null;
  video: string | null;
  show_ns: boolean;
  gallery: unknown;
  slider: string | null;
  url: string;
  pub_dt: string;
}

interface SliderResponse {
  top_big: Article[];
}

interface SliderNewsProps {
  compact?: boolean;
}

export default function SliderNews({
  compact = false,
}: SliderNewsProps) {
  const { i18n } = useTranslation();

  const [articles, setArticles] = useState<Article[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const langCode =
    i18n.resolvedLanguage?.split("-")[0] || "ka";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = `https://dev.ipn.ge/${langCode}/api/slider/`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "loaded=0",
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: SliderResponse = await response.json();

        const topBigArticles = (data.top_big || [])
          .filter((article): article is Article => article !== null)
          .slice(0, 19);

        setArticles(topBigArticles);
        setActiveIndex(0);
      } catch (error) {
        console.error(
          "Failed to fetch slider articles:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch slider articles",
        );

        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [langCode]);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? articles.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === articles.length - 1 ? 0 : prev + 1,
    );
  };

  if (loading) {
    return (
      <div
        className={`slider-news-wrapper ${
          compact ? "slider-news-wrapper--compact" : ""
        }`}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`slider-news-wrapper ${
          compact ? "slider-news-wrapper--compact" : ""
        }`}
      >
        Slider error: {error}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div
        className={`slider-news-wrapper ${
          compact ? "slider-news-wrapper--compact" : ""
        }`}
      >
        No slider articles found.
      </div>
    );
  }

  const current = articles[activeIndex];

  /*
   * Converts API image path into a usable URL.
   *
   * Possible API values:
   *
   * uploads/2026/08-12/capture.jpg
   * gallery/2026/08-20/image.jpg
   * https://dev.ipn.ge/...
   */
  const getImageUrl = (
    image: ArticleImage | null,
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

   
    return `https://dev.ipn.ge/${src.replace(/^\/+/, "")}`;
  };

  const imageUrl = getImageUrl(current.image);

  
   
  const articleUrl = current.url
    ? `https://dev.ipn.ge/${langCode}${current.url}`
    : "https://dev.ipn.ge/";

  

  return (
    <div
      className={`slider-news-wrapper ${
        compact ? "slider-news-wrapper--compact" : ""
      }`}
    >
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
              onClick={() => setActiveIndex(index)}
              className={`slider-news-dot ${
                index === activeIndex
                  ? "slider-news-dot-active"
                  : ""
              }`}
              aria-label={`Go to article ${index + 1}`}
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