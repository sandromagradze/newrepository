const API_BASE = "https://dev.ipn.ge";

export interface NewsImage {
  original: string;
  thumb: string;
  webp: string;
  position: [number, number];
}

export interface NewsItem {
  alias: string;
  id: number;
  title: string;
  introtext: string;
  publish_up: string;
  image: NewsImage | null;
  url: string;
}

interface NewsResponse {
  results: (NewsItem | null)[];
}

export async function fetchLatestNews(
  langCode: string,
  visibleMiniNewsCount: number
): Promise<NewsItem[]> {
  const allNews: NewsItem[] = [];

  let page = 1;

  while (allNews.length < visibleMiniNewsCount) {
    const response = await fetch(
      `${API_BASE}/${langCode}/api/latestnews/`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `offset=0&page=${page}`,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Latest news request failed: ${response.status}`
      );
    }

    const data: NewsResponse = await response.json();

    const validNews = data.results.filter(
      (item): item is NewsItem => item !== null
    );

    // თუ ამ გვერდზე სიახლეები აღარ არის,
    // აღარ გავაგრძელოთ შემდეგი გვერდების მოთხოვნა.
    if (validNews.length === 0) {
      break;
    }

    allNews.push(...validNews);

    // საკმარისი სიახლეები უკვე მივიღეთ.
    if (allNews.length >= visibleMiniNewsCount) {
      break;
    }

    page++;
  }

  // duplicate ID-ების მოცილება
  const uniqueNews = Array.from(
    new Map(
      allNews.map((item) => [item.id, item])
    ).values()
  );

  // მხოლოდ იმდენი სიახლე დავაბრუნოთ,
  // რამდენიც კომპონენტს რეალურად სჭირდება.
  return uniqueNews.slice(0, visibleMiniNewsCount);
}