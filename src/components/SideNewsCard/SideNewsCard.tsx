import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "./SideNewsCard.css";

interface ArticleImage {
  original: string | null;
  thumb: string | null;
  webp: string | null;
  position: [number, number];
}

interface ArticleCategory {
  id: number;
  alias: string | null;
  title: string;
}

interface CategoryArticle {
  id: number;
  alias: string;
  title: string;
  introtext: string;
  pub_dt: string;
  publish_up: string;
  url: string;
  image: ArticleImage | null;
  categories?: ArticleCategory[];
  gallery: unknown;
  show_ns: boolean;
  slider: unknown;
  video: unknown;
}

interface CategoryBlock {
  id: number;
  alias: string | null;
  articles: CategoryArticle[];
  position: string;
  title: string;
  visual: string;
}

interface CategoryBlocksResponse {
  blocks: CategoryBlock[];
}

interface SideNewsCardProps {
  visibleCount?: number;
  hasMore?: boolean;
}

const API_BASE_URL = "https://dev.ipn.ge";

export default function SideNewsCard({
  visibleCount = 4,
  hasMore = false,
}: SideNewsCardProps) {
  const { t, i18n } = useTranslation();

  const [articles, setArticles] = useState<CategoryArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const langCode =
    i18n.resolvedLanguage?.split("-")[0] || "ka";

  const getImageUrl = (
    image?: string | null
  ): string => {
    if (!image) return "";

    const src = image.trim();

    if (!src) return "";

    if (src.startsWith("https://")) {
      return src;
    }

    if (src.startsWith("http://")) {
      return src.replace(/^http:\/\//, "https://");
    }

    if (
      src.startsWith("/media/__thumbs__/https://")
    ) {
      return src.replace(
        "/media/__thumbs__/",
        ""
      );
    }

    if (
      src.startsWith("/media/__thumbs__/http://")
    ) {
      return src
        .replace("/media/__thumbs__/", "")
        .replace(/^http:\/\//, "https://");
    }

    if (src.startsWith("/media/https://")) {
      return src.replace("/media/", "");
    }

    if (src.startsWith("/media/http://")) {
      return src
        .replace("/media/", "")
        .replace(/^http:\/\//, "https://");
    }

    if (src.startsWith("/media/")) {
      return `${API_BASE_URL}${src}`;
    }

    if (src.startsWith("media/")) {
      return `${API_BASE_URL}/${src}`;
    }

    if (src.startsWith("/")) {
      return `${API_BASE_URL}${src}`;
    }

    return `${API_BASE_URL}/${src}`;
  };

  const getTime = (
    date?: string | null
  ): string => {
    if (!date) return "";

    const time = date.split("T")[1];

    if (!time) return "";

    return time.slice(0, 5);
  };

  useEffect(() => {
    const fetchCategoryBlocks = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${API_BASE_URL}/${langCode}/api/categoryblocks/`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            body: "",
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}`
          );
        }

        const data: CategoryBlocksResponse =
          await response.json();

        const sideBlocks =
          data.blocks?.filter(
            (block) =>
              block.position ===
              "main_page_right_column"
          ) || [];

        const allArticles =
          sideBlocks.flatMap(
            (block) => block.articles || []
          );

        const uniqueArticles = Array.from(
          new Map(
            allArticles.map((article) => [
              article.id,
              article,
            ])
          ).values()
        );

        setArticles(uniqueArticles);
      } catch (error) {
        console.error(
          "Failed to fetch category blocks:",
          error
        );

        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBlocks();
  }, [langCode]);

  if (loading) {
    return (
      
      <aside className="side-news-card">
        
        <div className="side-news-loading">
          Loading...
        </div>
      </aside>
    );
  }

  if (articles.length === 0) {
    return (
      <aside className="side-news-card">
        <div className="side-news-loading">
          No news found.
        </div>
      </aside>
    );
  }

  return (
    <aside className="side-news-card">
<div className="side-news-header">
        <h2 className="side-news-title">{t("sideNews.latestToday")}</h2>
      </div>
      <div className="side-news-list">

        {articles
          .slice(0, visibleCount)
          .map((article) => {

            const imageSource =
              article.image?.webp ||
              article.image?.thumb ||
              article.image?.original ||
              "";

            const imageUrl =
              getImageUrl(imageSource);

            const category =
              article.categories?.[0]?.title || "";

            const articleUrl = article.url
              ? `${API_BASE_URL}/${langCode}${article.url}`
              : "#";

            return (
              <article
                key={article.id}
                className="side-news-item"
              >

                <div className="side-news-meta">

                  {category && (
                    <span className="side-news-category">
                      • {category}
                    </span>
                  )}

                  <span className="side-news-time">
                    {getTime(article.pub_dt)}
                  </span>

                </div>

                {imageUrl && (
                  <img
                    src={imageUrl}
                    className="side-news-image"
                    alt={article.title}
                    loading="lazy"
                    onError={(event) => {

                      const originalUrl =
                        getImageUrl(
                          article.image?.original
                        );

                      if (
                        originalUrl &&
                        event.currentTarget.src !==
                          originalUrl
                      ) {
                        event.currentTarget.src =
                          originalUrl;
                      } else {
                        event.currentTarget.style.display =
                          "none";
                      }

                    }}
                  />
                )}

                <h3 className="side-news-item-title">
                  {article.title}
                </h3>

                <div className="side-news-link-wrap">

                  <a
                    href={articleUrl}
                    className="side-news-link"
                  >
                    {t("common.viewAll")}
                    <span>▶</span>
                  </a>

                </div>

              </article>
            );
          })}

      </div>

      {hasMore && (
        <div className="side-news-more">

          <span>
            {t("sideNews.showMore")}
          </span>

          <img
            src="/arrowup.svg"
            alt=""
          />

        </div>
      )}

    </aside>
  );
}