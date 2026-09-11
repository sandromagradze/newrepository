import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  getRates,
  CurrencyResponse,
} from "../src/components/api/ratesApi";

export default function useRates() {
  const { i18n } = useTranslation();

  const langCode =
    i18n.resolvedLanguage?.split("-")[0] || "ka";

  const [data, setData] =
    useState<CurrencyResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      try {
        setLoading(true);
        setError(null);

        const result = await getRates(langCode);

        if (!cancelled) {
          setData(result);
        }
      } catch (error) {
        console.error(
          "[useRates] Failed to load rates:",
          error
        );

        if (!cancelled) {
          setError("Failed to load currency rates");
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRates();

    return () => {
      cancelled = true;
    };
  }, [langCode]);

  return {
    data,
    loading,
    error,
  };
}