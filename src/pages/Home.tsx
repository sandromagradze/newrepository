import Header from "../components/Header";
import MainCard from "../components/maincard/MainCard";
import NewsCard from "../components/NewsCard";
import Navbar from "../components/Navbar/Navbar";
import WrapperA from "../components/WrapperA";
import ProfileCard from "../components/ProfileCard";
import VideoCard from "../components/VideoCard";
import MiniNewsCard from "../components/MiniNewsCard";
import SliderNews from "../components/SliderNews";
import miniNews from "../_data/miniNews.json";
import profileCards from "../_data/profileCards.json";
import videos from "../_data/videos.json";
import homeNews from "../_data/homeNews.json";
import { useLocalizedData } from "../i18n/useLocalizedData";
import { useTranslation } from "react-i18next";
import SideNewsCard from "../components/SideNewsCard";

export default function Home() {
  const { t } = useTranslation();
  const localizedHomeNews = useLocalizedData(homeNews);
  const localizedProfileCards = useLocalizedData(profileCards);
  const localizedMiniNews = useLocalizedData(miniNews);
  const featuredNews = localizedHomeNews[0];

  return (
    <div className=" bg-gray-100">
      <WrapperA>
        <Header />
        <Navbar />
      </WrapperA>

      <main className="py-6">
        <WrapperA>
          <div className="mb-5 lg:block">
            <SliderNews />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-8 space-y-6">
              {featuredNews && (
                <div className="lg:hidden">
                  <MainCard
                    time={featuredNews.time}
                    title={featuredNews.title}
                    image={featuredNews.image}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {localizedHomeNews.map((news, index) => (
                  <NewsCard
                    key={index}
                    title={news.title}
                    time={news.time}
                    image={news.image}
                    preview={news.preview}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {localizedProfileCards.map((profile, index) => (
                  <ProfileCard
                    key={index}
                    image={profile.image}
                    name={profile.name}
                    status={profile.status}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
                {videos.map((video, index) => (
                  <VideoCard key={index} image={video.image} />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mt-6">
                {localizedMiniNews.map((news, index) => (
                  <MiniNewsCard
                    key={index}
                    title={news.title}
                    time={news.time}
                    image={news.image}
                  />
                ))}
              </div>
            </section>

            <aside className="lg:col-span-4 space-y-4 flex">
              < SideNewsCard />
              <img src="/Link.svg" alt={t("common.sidebarAdAlt")}  className="w-[286px] h-[503px]"/>
              
            </aside>
          </div>
        </WrapperA>
      </main>
    </div>
  );
}
