import { useEffect, useState } from "react";

interface SearchResultProps {
  search: string;
}

interface ArticleImage {
  original: string;
  position: [number, number];
  thumb: string;
  webp: string;
}

interface SearchArticle {
  alias: string;
  gallery: unknown;
  id: number;
  image: ArticleImage | null;
  introtext: string;
  pub_dt: string;
  publish_up: string;
  show_ns: boolean;
  slider: unknown;
  title: string;
  url: string;
  video: unknown;
}

interface SearchResponse {
  pagination: {
    count: number;
  };
  results: SearchArticle[];
}

export default function SearchResult({ search }: SearchResultProps) {
  const [results, setResults] = useState<SearchArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = search.trim();

    if (query.length < 4) {
      
      return;
    }

    const controller = new AbortController();

    const searchArticles = async () => {
      try {
        setLoading(true);
        setError("");

        const body = new URLSearchParams();

        body.append("cat", "");
        body.append("datefrom", "");
        body.append("datetill", "");
        body.append("from_date", "");
        body.append("page", "1");
        body.append("q", query);
        body.append("to_date", "");

        const response = await fetch(
          "https://dev.ipn.ge/ka/api/search/",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Search request failed: ${response.status}`);
        }

        const data: SearchResponse = await response.json();

        setResults(data.results || []);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        console.error("Search error:", err);
        setError("Search failed");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(searchArticles, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search]);

  const getImageUrl = (image: ArticleImage | null) => {
    if (!image) return "";

    if (image.webp) {
      return `https://cdn2.ipn.ge/media/${image.webp}`;
    }

    if (image.original) {
      return `https://cdn2.ipn.ge/media/${image.original}`;
    }

    return "";
  };

  const getArticleUrl = (url: string) => {
    if (!url) return "#";

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    return `https://www.interpressnews.ge${url}`;
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-[400px] bg-white border border-gray-200 shadow-lg z-[100]">
      {loading && (
        <div className="p-4 text-sm text-gray-500">
          Searching...
        </div>
      )}

      {!loading && error && (
        <div className="p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      {!loading && !error && results.length === 0 && (
        <div className="p-4 text-sm text-gray-500">
          No results found
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="max-h-[500px] overflow-y-auto">
          {results.map((article) => {
            const imageUrl = getImageUrl(article.image);

            return (
              <a
                key={article.id}
                href={getArticleUrl(article.url)}
                className="flex gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {imageUrl && (
                  <div className="w-[90px] h-[60px] flex-shrink-0 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1 min-w-0">
                  <h3 className="text-[13px] leading-[17px] font-medium text-gray-800 line-clamp-2">
                    {article.title}
                  </h3>

                  <span className="text-[10px] text-gray-400">
                    {article.publish_up}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}