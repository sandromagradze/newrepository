import i18n, { SUPPORTED_LANGUAGES as SUPPORTED_LANGUAGES_LIST } from "../i18n";
import { useTranslation } from "react-i18next";

interface LanguageChangeProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  currentLabel?: string;
  SUPPORTED_LANGUAGES: typeof SUPPORTED_LANGUAGES_LIST;
  currentLanguage: string;
}

export default function LanguageChange({
  setIsOpen,
  isOpen,
  currentLabel,
  SUPPORTED_LANGUAGES,
  currentLanguage,
}: LanguageChangeProps) {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium cursor-pointer"
      >
        {currentLabel ? t(currentLabel) : "GEO"}

        <span className="text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white border rounded shadow-md z-10">
          {SUPPORTED_LANGUAGES.map(({ code, labelKey }) => (
            <button
              key={code}
              onClick={() => {
                void i18n.changeLanguage(code);

                setIsOpen(false);
              }}
              className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                code === currentLanguage ? "font-bold text-blue-600" : ""
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
      )}
      <div className="h-[] flex mt-2 text-[#777777] text-[13px]"><p>ორშ/6აპრ/26</p> <p>08:36:21</p></div>
      <div className="text-[#15AADC] text-[13px] leading-[42px] "><p>ამინდი/AMINDI.GE</p></div>
    </div>
  );
}
