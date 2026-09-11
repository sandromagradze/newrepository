import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "./SecongSlider.css";

interface RssItem {
  description: string;
  image: string;

  images: {
    "170x96"?: string;
    "172x104"?: string;
    "206x116"?: string;
    "234x152"?: string;
    "288x162"?: string;
    "364x206"?: string;
  };

  link: string;
  original_image: string;
  pubDate: string | null;
  title: string;
}

interface RssBlock {
  domain: string;
  id: number;
  items: RssItem[];

  logo?: string | null;
  position?: string;
  slicenum?: number;
  title?: string;
  view?: string;
  visual?: string;
}

interface RssResponse {
  blocks: RssBlock[];
}

const API_BASE_URL = "https://dev.ipn.ge";

export default function SecondSlider() {
  const { t, i18n } = useTranslation();

  const [news, setNews] = useState<RssItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const lang =
    i18n.resolvedLanguage?.split("-")[0] || "ka";

  /*
   * FETCH BPN NEWS
   */
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_BASE_URL}/${lang}/api/rss/collectors/fetch-active/`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `API request failed: ${response.status} ${response.statusText}`
          );
        }

        const data: RssResponse =
          await response.json();

        const bpnBlock = data.blocks?.find(
          (block) =>
            block.domain === "bpn.ge"
        );

        if (!bpnBlock) {
          

          setNews([]);
          return;
        }

        const items = bpnBlock.items || [];


        setNews(items);
        setActiveIndex(0);
      } catch (error) {
        console.error(
          "Failed to fetch BPN news:",
          error
        );

        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [lang]);

 
  useEffect(() => {
    if (news.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex(
        (prevIndex) =>
          (prevIndex + 1) % news.length
      );
    }, 300000);

    return () => {
      clearInterval(interval);
    };
  }, [news]);

 
  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0
        ? news.length - 1
        : prev - 1
    );
  };

  
  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === news.length - 1
        ? 0
        : prev + 1
    );
  };

  
  const getImageUrl = (
    item: RssItem
  ): string => {
    
    const image =
      item.images?.["364x206"] ||
      item.images?.["288x162"] ||
      item.images?.["234x152"] ||
      item.images?.["206x116"] ||
      item.images?.["172x104"] ||
      item.images?.["170x96"] ||
      item.original_image ||
      item.image ||
      "";

    if (!image) {
      return "";
    }

    const src = image.trim();

    if (!src) {
      return "";
    }

    /*
     * Full URL
     */
    if (
      src.startsWith("http://") ||
      src.startsWith("https://")
    ) {
      return src.replace(
        /^http:\/\//,
        "https://"
      );
    }

   
    const cleanPath = src.replace(
      /^\/+/,
      ""
    );

    if (
      cleanPath.startsWith("__rss__/")
    ) {
      return `${API_BASE_URL}/media/${cleanPath}`;
    }

   
    if (
      cleanPath.startsWith("media/")
    ) {
      return `${API_BASE_URL}/${cleanPath}`;
    }

    
    return `${API_BASE_URL}/${cleanPath}`;
  };

 
  if (loading) {
    return null;
  }

  if (!news.length) {
    return null;
  }

  const current = news[activeIndex];

  const imageUrl = getImageUrl(current);

  



 

  return (
    <div className="slider-news-wrapper">

     
      <div className="bpn-style">

        <img
          src="/bpn.svg"
          alt="bpn logo"
        />

        <div className="h1-div">
          <h1 className="bpn-h1">
            {t("secondSlider.heading")}
          </h1>
        </div>

      </div>

     
      <div className="slider-contentA">


        <div className="slider-left">

          {imageUrl && (
            <a
              href={current.link}
              target="_blank"
              rel="noopener noreferrer"
              className="slider-image-link"
            >
              <img
                src={imageUrl}
                alt={current.title}
                className="slider-image"

                onError={(event) => {
                  console.error(
                    "",
                    imageUrl
                  );


                  const originalImage =
                    current.original_image
                      ?.replace(
                        /^http:\/\//,
                        "https://"
                      );

                  if (
                    originalImage &&
                    event.currentTarget.src !==
                      originalImage
                  ) {
                    event.currentTarget.src =
                      originalImage;
                  }
                }}
              />
            </a>
          )}

        </div>


        <div className="slider-right">

          <div className="slider-text-content">

            <span className="slider-time">
              {current.pubDate || ""}
            </span>

            <h2 className="slider-title">

              <a
                href={current.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {current.title}
              </a>

            </h2>

          </div>


          <div className="slider-pagination-wrapperA">


            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              type="button"
            >
              <img
                src="/arrowleft.svg"
                alt="left"
              />
            </button>


            <div className="slider-news-dots">

              {news.map(
                (item, index) => (
                  <button
                    key={`${item.link}-${index}`}
                    onClick={() =>
                      setActiveIndex(index)
                    }
                    className={`second-slider-dot ${
                      index === activeIndex
                        ? "second-slider-dot-active"
                        : ""
                    }`}
                    aria-label={`Go to slide ${
                      index + 1
                    }`}
                    type="button"
                  >
                    {index + 1}
                  </button>
                )
              )}

            </div>


            <button
              onClick={handleNext}
              aria-label="Next slide"
              type="button"
            >
              <img
                src="/arrowright.svg"
                alt="right"
              />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
