import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { fetchMenu } from "../Navbar/menuApi";

export function useMenu() {
  const { i18n } = useTranslation();

  const lang =
    i18n.resolvedLanguage?.split("-")[0] || "ka";

  return useQuery({
    queryKey: ["menu", lang],

    queryFn: () => fetchMenu(lang),

    staleTime: 30 * 60 * 1000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,

    retry: 1,
  });
}