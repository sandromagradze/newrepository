import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./CurencyTransfer.css";

interface CurrencyTransferProps {
  code: string;
  rate: string;
  isUp?: boolean;
}

interface CurrencyDataset {
  data: string[];
  label: string;
}

interface CurrencyResponse {
  dataset: CurrencyDataset[];
  labels: string[];
}

export default function CurrencyTransfer() {
  const { t, i18n } = useTranslation();

  const [currencies, setCurrencies] = useState<CurrencyTransferProps[]>([]);

  const langCode = i18n.resolvedLanguage || "ka";

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          `https://dev.ipn.ge/${langCode}/api/rates/`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
            },
            body: "",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: CurrencyResponse = await response.json();

        const formattedCurrencies = (data.dataset || []).map(
          (currency) => {
            const previousRate = Number(currency.data[0]);
            const currentRate = Number(currency.data[1]);

            return {
              code: currency.label,
              rate: currency.data[1],
              isUp: currentRate >= previousRate,
            };
          }
        );

        setCurrencies(formattedCurrencies);
      } catch (error) {
        console.error("Failed to fetch currency rates:", error);
        setCurrencies([]);
      }
    };

    fetchRates();
  }, [langCode]);

  return (
    <div className="curenncy w-[198px] bg-white border border-gray-200 p-2 text-xs flex flex-col gap-1.5 shadow-sm rounded-sm">
      <div className="font-bold text-gray-500 text-[10px] uppercase border-b border-gray-100 pb-1">
        {t("currency.title")}
      </div>

      <div className="flex flex-col gap-1">
        {currencies.map((curr) => (
          <div
            key={curr.code}
            className="flex justify-between items-center"
          >
            <span className="font-bold text-gray-700">
              {curr.code}
            </span>

            <div className="flex items-center gap-1">
              <span className="text-gray-900 font-medium">
                {curr.rate}
              </span>

              <span
                className={`text-[9px] ${
                  curr.isUp
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {curr.isUp ? "▲" : "▼"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
