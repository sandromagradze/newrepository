import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import {
  fetchSliderNews,
  type Article,
} from "../SliderNews/sliderNewsApi";

export default function useSliderNews() {
  const { i18n } = useTranslation();

  const langCode =
    i18n.resolvedLanguage?.split("-")[0] || "ka";

  return useQuery<Article[]>({
    queryKey: ["sliderNews", langCode],

    queryFn: () =>
      fetchSliderNews(langCode),

    staleTime: 60 * 1000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,

    retry: 1,
  });
}
