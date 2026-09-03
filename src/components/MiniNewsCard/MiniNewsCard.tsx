import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./MiniNewsCard.css";

interface PhotoData {
  title: string;
  url: string;
  id: number;
}

export default function MiniNewsCard() {
  const { t } = useTranslation();
  const [news, setNews] = useState<PhotoData | null>(null);

  useEffect(() => {
    
    const randomId = Math.floor(Math.random() * 100) + 1;
    const apiUrl = `https://jsonplaceholder.typicode.com/photos/${randomId}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
      })
      .catch((err) => console.error("მონაცემების ჩატვირთვის შეცდომა:", err));
  }, []);

  if (!news) {
    return <div className="mini-news-card loading">{t("common.loading")}</div>;
  }

  return (
    <div className="mini-news-card">
      <div className="mini-news-card-inner">
        <div className="image-width">
        <img
          src={`https://picsum.photos/seed/${news.id}/200/300`}
          alt={t("common.newsAlt")}
          className="mini-news-card-image"
        />
</div>
        <div className="mini-news-card-content">
          <span className="mini-news-card-time">10:00 / 2026</span>
          <h3 className="mini-news-card-title">{news.title}</h3>
        </div>
      </div>
    </div>
  );
}