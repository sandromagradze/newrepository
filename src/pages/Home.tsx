import Header from "../components/Header";
import MainCard from "../components/MainCard";
import NewsCard from "../components/NewsCard";
import Navbar from "../components/Navbar";
import WrapperA from "../components/WrapperA";
import ProfileCard from "../components/ProfileCard";
import VideoCard from "../components/VideoCard";
import MiniNewsCard from "../components/MiniNewsCard";
import SliderNews from "../components/SliderNews";

const newMiniNews = [
  {
    image: "/zviada.svg",
    time: "05.04.2026 / 22:24",
    title: "პარლამენტთან მიმდიანრე აქციაზე, ოპოზიცია პროტესტს აანონსებს",
  },
  {
    image: "/kanxa.svg",
    time: "05.04.2026 / 22:24",
    title: "პარლამენტთან მიმდიანრე აქციაზე, ოპოზიცია პროტესტს აანონსებს",
  },
  {
    image: "/mere.svg",
    time: "05.04.2026 / 22:24",
    title: "პარლამენტთან მიმდიანრე აქციაზე, ოპოზიცია პროტესტს აანონსებს",
  },
  {
    image: "/conteinerebi.svg",
    time: "05.04.2026 / 22:24",
    title: "პარლამენტთან მიმდიანრე აქციაზე, ოპოზიცია პროტესტს აანონსებს",
  },
];

const newProfileCard = [
  {
    image: "/link1.svg",
    name: "მიხეილ სააკაშვილი",
    status: "ყოფილი პრეზიდენტი",
    buttonText: "გაიგე მეტი",
  },
  {
    image: "/merabishvili.svg",
    name: "ვანო მერაბიშვილი",
    status: "ყოფილი პრემიერ-მინისტრი",
    buttonText: "გაიგე მეტი",
  },
  {
    image: "/ugulava.svg",
    name: "გიგი უგულავა",
    status: "ყოფილი თბილისის მერი",
    buttonText: "გაიგე მეტი",
  },
  {
    image: "/link3.svg",
    name: "კახი კალაძე",
    status: "თბილისის მერი",
    buttonText: "გაიგე მეტი",
  },
];

const videoData = [
  {
    image: "/Region.png",
  },
  {
    image: "/palitra.svg",
  },
];

const newsData = [
  {
    title:
      "საჰაერო თავდასხმის შედეგად, ირანის ისლამური რევოლუციის გუშაგთა კორპუსის დაზვერვის უფროსი დაიღუპა",
    time: "-214 წუთის წინ",
    image: "/zviada.svg",
  },
  {
    title: "პარლამენტში ბიუჯეტის განხილვა დაიწყო — ოპოზიცია პროტესტს აანონსებს",
    time: "-45 წუთის წინ",
    image: "/kanxa.svg",
  },
  {
    title: "ეკონომიკის ზრდის ტემპმა ბოლო კვარტალში 6.2% შეადგინა",
    time: "-1 საათის წინ",
    image: "/mere.svg",
  },
  {
    title:
      "ქალაქში ახალი სკვერის მშენებლობა დაიწყო — პროექტის დეტალები ცნობილია",
    time: "-2 საათის წინ",
    image: "/conteinerebi.svg",
  },
  {
    title: "საერთაშორისო კონფერენციამ რეკორდული რაოდენობის მონაწილე დააფიქსირა",
    time: "-3 საათის წინ",
    image: "/favicon.svg",
  },
  {
    title: "ახალი ტექნოლოგიური ცენტრი მოსახლეობას ხვალიდან უმასპინძლებს",
    time: "-5 საათის წინ",
    image: "/ipn.jpeg",
    preview: "ახალი ტექნოლოგიური ცენტრი მოსახლეობას ხვალიდან უმასპინძლებს",
  },
  {
    title: "სპორტის საერთაშორისო ფესტივალი ქალაქში იწყება — დეტალები ცნობილია",
    time: "-6 საათის წინ",
    image: "/kanxa.svg",
    preview:
      "სპორტის საერთაშორისო ფესტივალი ქალაქში იწყება — დეტალები ცნობილია",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <WrapperA>
        <Header />
        <Navbar />
      </WrapperA>

      <main className="py-6">
        <WrapperA>
          <div className="mb-5 lg:block">
          <SliderNews/>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-8 space-y-6">
              <div className="lg:hidden">
                <MainCard
                  time="-214 წუთის წინ"
                  title="საჰაერო თავდასხმის შედეგად,
„ირანის ისლამური რევოლუციის
გუშაგთა კორპუსის“ დაზვერვის
უფროსი დაიღუპა"
                  image="/zviada.svg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {newsData.map((news, index) => (
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
                {newProfileCard.map((profile, index) => (
                  <ProfileCard
                    key={index}
                    image={profile.image}
                    name={profile.name}
                    status={profile.status}
                    buttonText={profile.buttonText}
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
                {videoData.map((video, index) => (
                  <VideoCard key={index} image={video.image} />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mt-6">
                {newMiniNews.map((news, index) => (
                  <MiniNewsCard
                    key={index}
                    title={news.title}
                    time={news.time}
                    image={news.image}
                  />
                ))}
              </div>
            </section>

            <aside className="lg:col-span-4 space-y-4">
              <img src="/Link.svg" alt="" />
            </aside>
          </div>
        </WrapperA>
      </main>
    </div>
  );
}
