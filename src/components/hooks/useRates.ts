import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import {
  getRates,
  type CurrencyResponse,
} from "../currency/ratesApi";

export default function useRates() {
  const { i18n } = useTranslation();

  const langCode =
    i18n.resolvedLanguage || "ka";

  return useQuery<CurrencyResponse>({
    queryKey: ["rates", langCode],

    queryFn: () => getRates(langCode),

    staleTime: 60 * 1000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,

    retry: 1,
  });
}