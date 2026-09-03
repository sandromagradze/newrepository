import { useTranslation } from "react-i18next";
import SideNewsData from "../../_data/sidebarNews.json";
import { useLocalizedData } from "../../i18n/useLocalizedData";
import "./SecondSideCard.css";

export default function SideNewsCard() {
  const { t } = useTranslation();
  const localizedNews = useLocalizedData(SideNewsData);

  return (
    <aside className="side-news-card ">

      <div className="side-news-header">
        <h2 className="side-news-title">{t("sideNews.latestToday")}</h2>
      </div>

      <div className="side-news-list">
        {localizedNews.slice(0, 2).map((item) => (
          <div key={item.id} className="side-news-item">
            <div className="side-news-meta">
             
              {item.category && (
                <span className="side-news-category">• {item.category}</span>
              )}
            </div>
            <img src={item.image} className="side-news-image" alt={item.title} />
             <span className="side-news-time">{item.time}</span>
           
            <h3 className="side-news-item-title">{item.title}</h3>
             <div className="side-news-link-wrap">
              <p className="side-news-link">{t("common.viewAll")} ▶</p>
            </div>
          </div>
        ))}
      </div>
      
    </aside>
  );
}
