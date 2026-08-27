import VideoCard from "../VideoCard/VideoCard";
import MiniNewsCard from "../MiniNewsCard/MiniNewsCard";
import SecondSideCard from "../SecondSidebar/SecondSideCard";

interface VideoItem {
  image: string;
  title?: string;
  time?: string;
}



interface HomeVideoSectionProps {
  videos: VideoItem[];
  visibleMiniNewsCount: number;
  parentref: React.RefObject<HTMLDivElement | null>;
  hasMoreMiniNews: boolean;
  showMoreButton: boolean;
  handleLoadMoreMiniNews: () => void;
  sidebarAdAlt: string;
}

export default function HomeVideoSection({
  videos,
  visibleMiniNewsCount,
  parentref,
  sidebarAdAlt
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
            {Array.from({ length: visibleMiniNewsCount }).map((_, index) => (
              <MiniNewsCard key={index} />
            ))}
          </div>
        </div>

 <div className="space-y-6">
  <div className="grid grid-cols-2 gap-4">
    {videos.slice(1, 5).map((video, index) => (
      <VideoCard key={index + 1} image={video.image} size="small" />
    ))}
  </div>

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
  );
}