import SliderNews from "../SliderNews/SliderNews";
import MainCard from "../maincard/MainCard"
import NewsCard from "../NewsCard/NewsCard";
import SecondSlider from "../SecondSlider/SecondSlider";
import SideNewsCard from "../SideNewsCard/SideNewsCard";

interface NewsItem {
  title: string;
  time: string;
  image: string;
  preview?: string;
}

interface HomeHeroSectionProps {
  featuredNews: NewsItem | null;
  localizedHomeNews: NewsItem[];
}

export default function HomeHeroSection({ featuredNews, localizedHomeNews }: HomeHeroSectionProps) {
  const gridNews = localizedHomeNews.slice(1);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_290px_286px]">
      <section className="space-y-6">
        <SliderNews />

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
          {gridNews.map((news, index) => (
            <NewsCard
              key={index}
              title={news.title}
              time={news.time}
              image={news.image}
              preview={news.preview}
            />
          ))}
        </div>

        <SecondSlider />
      </section>

      <aside>
        <SideNewsCard />
      </aside>

      <div className="self-start lg:sticky lg:top-6">
        <img
          src="/Link.svg"
          alt="Sidebar Advertisement"
          className="h-[503px] w-[286px]"
        />
      </div>
    </div>
  );
}