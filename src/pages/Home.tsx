import Header from "../components/header/Header";
import Navbar from "../components/Navbar/Navbar";
import WrapperA from "../components/WrapperA/WrapperA";
import Footer from "../components/Footer/Footer";

import HomeHeroSection from "../components/HOME/HomeHeroSection";
import HomeProfileSection from "../components/HomeProfile/HomeProfileSection";
import HomeVideoSection from "../components/HomeVideo/HomeVideoSection";

import { useHomeLogic } from "../components/HomeLogic/HomeLogic";

export default function Home() {
  const {
    parentref,
    localizedHomeNews,
    localizedProfileCards,
    localizedMiniNews,
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
      <WrapperA>
        <Header />
        <Navbar />
      </WrapperA>

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
            localizedMiniNews={localizedMiniNews}
            visibleMiniNewsCount={visibleMiniNewsCount}
            parentref={parentref}
            hasMoreMiniNews={hasMoreMiniNews}
            showMoreButton={showMoreButton}
            handleLoadMoreMiniNews={handleLoadMoreMiniNews}
            sidebarAdAlt={sidebarAdAlt}
          />
        </WrapperA>
      </main>

      <Footer />
    </div>
  );
}