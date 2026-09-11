import { useTranslation } from "react-i18next";

import type { NewsItem } from "../HomeVideo/HomeVideoSection";

import "./MiniNewsCard.css";

interface MiniNewsCardProps {
  news: NewsItem;
}

export default function MiniNewsCard({
  news,
}: MiniNewsCardProps) {
  const { t, i18n } = useTranslation();

  const langcode =
    i18n.resolvedLanguage?.split("-")[0] || "ka";

  const getImageUrl = (
    image: NewsItem["image"],
  ): string | null => {
    if (!image?.original) {
      return null;
    }

    const src = image.original.trim();

    if (
      src.startsWith("http://") ||
      src.startsWith("https://")
    ) {
      return src;
    }

    return `https://dev.ipn.ge/${src.replace(
      /^\/+/,
      "",
    )}`;
  };

  const imageUrl = getImageUrl(news.image);

  const articleUrl =
    `https://dev.ipn.ge/${langcode}${news.url}`;

  return (
    <a
      href={articleUrl}
      className="mini-news-card block"
    >
      <div className="mini-news-card-inner">

        {/* IMAGE */}
        <div className="image-width">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={news.title}
              className="mini-news-card-image"
              onError={(event) => {
                

                event.currentTarget.style.display =
                  "none";
              }}
            />
          ) : (
            <div className="image-placeholder">
              {t("common.noImage")}
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="mini-news-card-content">

          <span className="mini-news-card-time">
            {news.publish_up}
          </span>

          <h3 className="mini-news-card-title">
            {news.title}
          </h3>

        </div>
      </div>
    </a>
  );
}