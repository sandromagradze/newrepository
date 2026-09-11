import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import {
  fetchLatestNews,
  type NewsItem,
} from "../MiniNewsCard/latestNewsCardApi";

export default function useLatestNews(
  visibleMiniNewsCount: number
) {
  const { i18n } = useTranslation();

  const langCode =
    i18n.resolvedLanguage?.split("-")[0] || "ka";

  return useQuery<NewsItem[]>({
    queryKey: [
      "latestnews",
      langCode,
      visibleMiniNewsCount,
    ],

    queryFn: () =>
      fetchLatestNews(
        langCode,
        visibleMiniNewsCount
      ),

    staleTime: 60 * 1000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,

    retry: 1,
  });
}