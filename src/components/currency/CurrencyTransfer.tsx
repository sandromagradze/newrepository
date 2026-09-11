import { useTranslation } from "react-i18next";

import useRates from "../hooks/useRates";

import "./CurencyTransfer.css";

interface CurrencyTransferProps {
  code: string;
  rate: string;
  isUp?: boolean;
}

export default function CurrencyTransfer() {
  const { t } = useTranslation();

  const {
    data,
    isLoading,
    isError,
  } = useRates();

  const currencies: CurrencyTransferProps[] =
    (data?.dataset || []).map((currency) => {
      const previousRate = Number(currency.data[0]);
      const currentRate = Number(currency.data[1]);

      return {
        code: currency.label,
        rate: currency.data[1],
        isUp: currentRate >= previousRate,
      };
    });

  return (
    <div className="curenncy w-[198px] bg-white border border-gray-200 p-2 text-xs flex flex-col gap-1.5 shadow-sm rounded-sm">
      
      <div className="font-bold text-gray-500 text-[10px] uppercase border-b border-gray-100 pb-1">
        {t("currency.title")}
      </div>

      <div className="flex flex-col gap-1">

        {isLoading && (
          <div className="text-gray-400 text-[10px]">
            Loading...
          </div>
        )}

        {isError && (
          <div className="text-red-500 text-[10px]">
            Failed to load rates
          </div>
        )}

        {!isLoading &&
          !isError &&
          currencies.map((curr) => (
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