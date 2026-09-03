import WrapperA from "../components/WrapperA/WrapperA";
import HomeHeroSection from "../components/HOME/HomeHeroSection";
import HomeProfileSection from "../components/HomeProfile/HomeProfileSection";
import HomeVideoSection from "../components/HomeVideo/HomeVideoSection";
import { useHomeLogic } from "../components/HomeLogic/HomeLogic";
import ScrollButton from "../components/ScrollButton/ScrollButton";

export default function Home() {
  const {
    parentref,
    localizedHomeNews,
    localizedProfileCards,
    featuredNews,
    videos,
    visibleMiniNewsCount,
    hasMoreMiniNews,
    showMoreButton,
    handleLoadMoreMiniNews,
    sidebarAdAlt,
  } = useHomeLogic();

  return (
    <div className="bg-[#ffffff]">
      <main className="py-6">
        <WrapperA>
          <HomeHeroSection
            featuredNews={featuredNews}
            localizedHomeNews={localizedHomeNews}
          />

          <HomeProfileSection
            localizedProfileCards={localizedProfileCards}
          />

          <HomeVideoSection
            videos={videos}
            visibleMiniNewsCount={visibleMiniNewsCount}
            parentref={parentref}
            sidebarAdAlt={sidebarAdAlt}
            hasMoreMiniNews={hasMoreMiniNews}
            showMoreButton={showMoreButton}
          />

          <ScrollButton
            hasMoreMiniNews={hasMoreMiniNews}
            showMoreButton={showMoreButton}
            onLoadMore={handleLoadMoreMiniNews}
          />
        </WrapperA>
      </main>
    </div>
  );
}