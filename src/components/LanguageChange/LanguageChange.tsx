import i18n, {
  SUPPORTED_LANGUAGES as SUPPORTED_LANGUAGES_LIST,
} from "../../i18n";
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
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between gap-1 px-3 py-1.5 text-xs font-semibold
         tracking-wider text-slate-700 "
      >
        <span>{currentLabel ? t(currentLabel) : "GEO"}</span>
        <svg
          className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-24 bg-white border border-slate-200 
        rounded-xl shadow-xl z-50 ">
          {SUPPORTED_LANGUAGES.map(({ code, labelKey }) => (
            <button
              key={code}
              onClick={() => {
                void i18n.changeLanguage(code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-1.5 text-xs font-medium transition-colors flex items-center justify-between ${
                code === currentLanguage
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span>{t(labelKey)}</span>
              {code === currentLanguage && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
