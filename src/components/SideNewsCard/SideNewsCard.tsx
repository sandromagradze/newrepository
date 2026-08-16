import SideNewsData from "../../_data/sidebarNews.json";
import "./SideNewsCard.css";

export default function SideNewsCard() {
  return (
    <aside className="side-news-card">
      <div className="side-news-header">
        <h2 className="side-news-title">დღის ბოლო სიახლეები</h2>
      </div>

      <div className="side-news-list">
        {SideNewsData.map((item) => (
          <div key={item.id} className="side-news-item">
            <div className="side-news-meta">
              <span className="side-news-time">{item.time}</span>
              {item.category && (
                <span className="side-news-category">• {item.category}</span>
              )}
            </div>
            <img src={item.image} className="side-news-image" alt={item.title} />
            <div className="side-news-link-wrap">
              <p className="side-news-link">ყველა სიახლე ▶</p>
            </div>
            <h3 className="side-news-item-title">{item.title}</h3>
          </div>
        ))}
      </div>
    </aside>
  );
}
