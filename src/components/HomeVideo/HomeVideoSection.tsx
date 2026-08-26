import VideoCard from "../VideoCard/VideoCard";
import MiniNewsCard from "../MiniNewsCard/MiniNewsCard";
import SecondSideCard from "../SecondSidebar/SecondSideCard";

interface VideoItem {
  image: string;
  title?: string;
  time?: string;
}

interface MiniNewsItem {
  title: string;
  time: string;
  image: string;
}

interface HomeVideoSectionProps {
  videos: VideoItem[];
  localizedMiniNews: MiniNewsItem[];
  visibleMiniNewsCount: number;
  parentref: React.RefObject<HTMLDivElement | null>;
  hasMoreMiniNews: boolean;
  showMoreButton: boolean;
  handleLoadMoreMiniNews: () => void;
  sidebarAdAlt: string;
}

export default function HomeVideoSection({
  videos,
  localizedMiniNews,
  visibleMiniNewsCount,
  parentref,
  hasMoreMiniNews,
  showMoreButton,
  handleLoadMoreMiniNews,
  sidebarAdAlt,
}: HomeVideoSectionProps) {
  return (
    <div className="mt-20">
      <div className="border-b-2 border-[#D30202] pb-2 mb-6 flex gap-[60px] items-center">
        <img src="/palnewslogo.svg.svg" alt="Palnews" />
        <h2 className="text-[18px] font-bold text-[#424242] uppercase tracking-wider">
          ბოლო საინფორმაციო გამოშვება
        </h2>
        <div className="flex ml-auto w-[365px] h-[32px] bg-[#D30202] items-center justify-center tracking-wider rounded-tl-[60px]">
          <h1 className="text-[#FFFFFF] font-normal text-[24px]">
            ახალი ამბების ტელევიზია
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-[1.1fr_3fr]">
        <div className="space-y-4">
          {videos.length > 0 && <VideoCard image={videos[0].image} size="large" />}

          <div className="space-y-4" ref={parentref}>
            {localizedMiniNews.slice(0, visibleMiniNewsCount).map((news, index) => (
              <MiniNewsCard
                key={index}
                title={news.title}
                time={news.time}
                image={news.image}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {videos.slice(1, 5).map((video, index) => (
              <VideoCard
                key={index + 1}
                image={video.image}
                size="small"
              />
            ))}
          </div>

          <div>
            <div className="self-start lg:sticky lg:top-6 flex">
              <SecondSideCard />
              <img
                src="/Link.svg"
                alt={sidebarAdAlt}
                className="h-[503px] w-[286px]"
              />
            </div>
          </div>
        </div>
      </div>

      {hasMoreMiniNews && showMoreButton && (
        <div className="flex ml-[257px]">
          <div
            onClick={handleLoadMoreMiniNews}
            className="bg-[#1E5BA6] p-[13px] mt-[30px] flex items-center cursor-pointer rounded-[3px]"
          >
            <h1 className="text-[14px] font-[400] text-[#FFFFFF] px-[14px] leading-[30px]">
              დღის სხვა სიახლეები
            </h1>
            <img className="ml-[43px]" src="/public/arrowup.svg" alt="" />
          </div>
        </div>
      )}
    </div>
  );
}