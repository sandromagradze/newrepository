import { useTranslation } from "react-i18next";
import "./MiniNewsCard.css";

interface MiniNewsCardProps {
  title: string;
  time: string;
  image: string;
}

export default function MiniNewsCard({ title, time, image }: MiniNewsCardProps) {
  const { t } = useTranslation();

  return (
    <div className="mini-news-card">
      <div className="mini-news-card-inner">
        <img
          src={image}
          alt={t("common.newsAlt")}
          className="mini-news-card-image"
        />

        <div className="mini-news-card-content">
            <span className="mini-news-card-time">{time}</span>
          <h3 className="mini-news-card-title">{title}</h3>
        </div>
      </div>
    </div>
  );
}
