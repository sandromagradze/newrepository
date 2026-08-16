import i18n, { SUPPORTED_LANGUAGES as SUPPORTED_LANGUAGES_LIST } from "../../i18n";
import { useTranslation } from "react-i18next";
import "./LanguageChange.css";

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
    <div className="language-change-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="language-change-button"
      >
        {currentLabel ? t(currentLabel) : "GEO"}
        <span className="language-change-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="language-change-menu">
          {SUPPORTED_LANGUAGES.map(({ code, labelKey }) => (
            <button
              key={code}
              onClick={() => {
                void i18n.changeLanguage(code);
                setIsOpen(false);
              }}
              className={`language-change-item ${
                code === currentLanguage ? "language-change-item-active" : ""
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
      )}

      <div className="language-change-meta">
        <p>ორშ/6აპრ/26</p>
        <p>08:36:21</p>
      </div>
      <div className="language-change-weather">
        <p>ამინდი/AMINDI.GE</p>
      </div>
    </div>
  );
}
