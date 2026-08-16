import { useTranslation } from "react-i18next";
import "./VideoCard.css";

interface VideoCardProps {
  image: string;
}

export default function VideoCard({ image }: VideoCardProps) {
  const { t } = useTranslation();

  return (
    <div className="video-card">
      <img
        src={image}
        className="video-card-image"
        alt={t("common.videoAlt")}
      />
    </div>
  );
}
