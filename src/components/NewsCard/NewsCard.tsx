import "./NewsCard.css";

interface NewsCardProps {
  title: string;
  time: string;
  image: string;
  isActive?: boolean;
  preview?: string;
}

export default function NewsCard({ title, time, image, isActive = false, preview }: NewsCardProps) {
  if (isActive) {
    return (
      <div className="news-card-active">
        <img src={image} className="news-card-image-active" alt={title} />
        <div className="news-card-body-active">
          <h3 className="news-card-title-active">{title}</h3>
          <p className="news-card-time-active">{time}</p>
          {preview && <p className="news-card-preview-active">{preview}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="news-card-compact">
      <img src={image} className="news-card-image-compact" alt={title} />
      <span className="news-card-time-compact">{time}</span>
      <div className="news-card-content-compact">
        <h3 className="news-card-title-compact">{title}</h3>
        
        {preview && <p className="news-card-preview-compact">{preview}</p>}
      </div>
    </div>
  );
}
