const API_BASE = "https://dev.ipn.ge";

export interface ArticleImage {
  original: string;
  thumb: string;
  webp: string;
  position: [number, number];
}

export interface Article {
  alias: string;
  id: number;
  title: string;
  introtext: string;
  publish_up: string;
  image: ArticleImage | null;
  video: string | null;
  show_ns: boolean;
  gallery: unknown;
  slider: string | null;
  url: string;
  pub_dt: string;
}

interface SliderResponse {
  top_big?: (Article | null)[];
}

export async function fetchSliderNews(
  langCode: string
): Promise<Article[]> {
  const response = await fetch(
    `${API_BASE}/${langCode}/api/slider/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: "loaded=0",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Slider request failed: ${response.status}`
    );
  }

  const data: SliderResponse =
    await response.json();

  const articles = (data.top_big ?? [])
    .filter(
      (article): article is Article =>
        article !== null
    )
    .slice(0, 19);

  return articles;
}
