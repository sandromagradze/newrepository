import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { fetchAds, type AdItem } from "../Ads/adsApi";

export default function useAds() {
  const { i18n } = useTranslation();

  const langCode =
    i18n.resolvedLanguage?.split("-")[0] || "ka";

  return useQuery<AdItem[]>({
    queryKey: ["ads", langCode],

    queryFn: () => fetchAds(langCode),

    staleTime: 30 * 60 * 1000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,

    retry: 1,
  });
}