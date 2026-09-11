import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import VideoCard from "../VideoCard/VideoCard";
import MiniNewsCard from "../MiniNewsCard/MiniNewsCard";
import SecondSideCard from "../SecondSidebar/SecondSideCard";
import SideBarAd from "../Ads/SideBarAd";

interface VideoItem {
  image: string;
  title?: string;
  time?: string;
}

interface NewsImage {
  original: string;
  thumb: string;
  webp: string;
  position: [number, number];
}

export interface NewsItem {
  alias: string;
  id: number;
  title: string;
  introtext: string;
  publish_up: string;
  image: NewsImage | null;
  url: string;
}

interface NewsResponse {
  results: (NewsItem | null)[];
}

interface HomeVideoSectionProps {
  videos: VideoItem[];
  visibleMiniNewsCount: number;
  parentref: React.RefObject<HTMLDivElement | null>;
  hasMoreMiniNews: boolean;
  showMoreButton: boolean;
  sidebarAdAlt: string;
}

export default function HomeVideoSection({
  videos,
  visibleMiniNewsCount,
  parentref,
}: HomeVideoSectionProps) {
  const { t, i18n } = useTranslation();

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const langcode =
    i18n.resolvedLanguage?.split("-")[0] || "ka";

  useEffect(() => {
  let cancelled = false;

  const fetchNews = async () => {
    try {
      setLoading(true);

      const allNews: NewsItem[] = [];

      let page = 1;

      while (allNews.length < visibleMiniNewsCount) {
        const response = await fetch(
          `https://dev.ipn.ge/${langcode}/api/latestnews/`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `offset=0&page=${page}`,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: NewsResponse = await response.json();

        const validNews = data.results.filter(
          (item): item is NewsItem => item !== null
        );

        
        if (validNews.length === 0) {
          break;
        }

        allNews.push(...validNews);

        
        if (allNews.length >= visibleMiniNewsCount) {
          break;
        }

        page++;
      }

      
      const uniqueNews = Array.from(
        new Map(
          allNews.map((item) => [item.id, item])
        ).values()
      );

   
      const finalNews = uniqueNews.slice(
        0,
        visibleMiniNewsCount
      );

      

      if (!cancelled) {
        setNews(finalNews);
      }
    } catch (error) {
      console.error(
        "სიახლეების ჩატვირთვის შეცდომა:",
        error
      );

      if (!cancelled) {
        setNews([]);
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  fetchNews();

  return () => {
    cancelled = true;
  };
}, [langcode, visibleMiniNewsCount]);

  
  const visibleNews = news.slice(
    0,
    visibleMiniNewsCount,
  );

  return (
    <div className="mt-20">
      <div className="border-b-2 border-[#D30202] pb-2 mb-6 flex gap-[60px] items-center">
        <img
          src="/palnewslogo.svg.svg"
          alt="Palnews"
        />

        <h2 className="text-[18px] font-bold text-[#424242] uppercase tracking-wider">
          {t("homeVideo.heading")}
        </h2>

        <div className="flex ml-auto w-[365px] h-[32px] bg-[#D30202] items-center justify-center tracking-wider rounded-tl-[60px]">
          <h1 className="text-[#FFFFFF] font-normal text-[24px]">
            {t("homeVideo.tvBanner")}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-[1.1fr_3fr]">

        <div className="space-y-4">

          {videos.length > 0 && (
            <VideoCard
              image={videos[0].image}
              size="large"
            />
          )}

          <div
            className="space-y-4"
            ref={parentref}
          >
            {loading ? (
              <div className="mini-news-card loading">
                {t("common.loading")}
              </div>
            ) : visibleNews.length > 0 ? (
              visibleNews.map((item) => (
                <MiniNewsCard
                  key={item.id}
                  news={item}
                />
              ))
            ) : (
              <div className="mini-news-card loading">
                {t("common.noNews")}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 flex flex-col">

          <div className="grid grid-cols-2 gap-1">
            {videos
              .slice(1, 5)
              .map((video, index) => (
                <VideoCard
                  key={`${video.image}-${index}`}
                  image={video.image}
                  size="small"
                />
              ))}
          </div>

          <div className="flex items-start flex-1">
              <div>
                 <SideBarAd position="c1" />
            <SecondSideCard />
            </div>
            <div className="self-start lg:sticky lg:top-6 flex flex-col gap-[10px]">
  <SideBarAd position="h1" />
  
</div>

          </div>
        </div>
      </div>
    </div>
  );
}