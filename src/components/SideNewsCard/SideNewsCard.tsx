import defaultSideNewsData from "../../_data/sidebarNews.json";
import "./SideNewsCard.css";

type SideNewsItem = {
  id: number;
  time: string;
  title: string;
  category?: string;
  image: string;
};

type SideNewsCardProps = {
  items?: SideNewsItem[];
  visibleCount?: number;
  hasMore?: boolean;
  onLoadMore?: () => void;
};

export default function SideNewsCard({
  items = defaultSideNewsData,
  visibleCount = 4,
  hasMore = false,
  onLoadMore,
}: SideNewsCardProps) {
  return (
    <aside className="side-news-card ">

      <div className="side-news-header">
        <h2 className="side-news-title">დღის ბოლო სიახლეები</h2>
      </div>

      <div className="side-news-list">
        {items.slice(0, visibleCount).map((item) => (
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
              <p className="side-news-link">ყველა სიახლე ▶</p>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div
          onClick={onLoadMore}
          className="bg-[#1E5BA6] p-[13px] flex items-center justify-center cursor-pointer rounded-[3px] w-full"
        >
          <h1 className="text-[14px] font-[400] text-[#FFFFFF] px-[14px] leading-[30px]">მეტის ჩვენება</h1>
          <img className="ml-[10px]" src="/arrowup.svg" alt="" />
        </div>
      )}

    </aside>
  );
}
