import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { fetchMenu } from "../src/components/api/menuApi";

export function useMenu() {
  const { i18n } = useTranslation();

  const lang =
    i18n.resolvedLanguage?.split("-")[0] || "ka";

  return useQuery({
    queryKey: ["menu", lang],

      queryFn: async () => {
      return fetchMenu(lang);
    },
    
    staleTime: 30 * 60 * 1000,

    
    gcTime: 30 * 60 * 1000,
  });
}