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
  const { t } = useTranslation();

  return (
    <div className="mt-20">
      <div className="border-b-2 border-[#D30202] pb-2 mb-6 flex gap-[60px] items-center">
        <img src="/palnewslogo.svg.svg" alt="Palnews" />
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
          {videos.length > 0 && <VideoCard image={videos[0].image} size="large" />}

          <div className="space-y-4" ref={parentref}>
            {Array.from({ length: visibleMiniNewsCount }).map((_, index) => (
              <MiniNewsCard key={index} />
            ))}
          </div>
        </div>

 <div className="space-y-6 flex flex-col">
  <div className="grid grid-cols-2 gap-1">
    {videos.slice(1, 5).map((video, index) => (
      <VideoCard key={index + 1} image={video.image} size="small" />
    ))}
  </div>
  <div className="flex items-start flex-1">
 <SecondSideCard />
  <div className="self-start lg:sticky lg:top-6 ">

    <SideBarAd  adIndex={0}/>
  </div>
  </div>
</div>
      </div>
    </div>
  );
}