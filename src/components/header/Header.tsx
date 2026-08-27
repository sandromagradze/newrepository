import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../../i18n";
import CurrencyTransfer from "../currency/CurrencyTransfer";
import LanguageChange from "../LanguageChange/LanguageChange";
import "./Header.css";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    SUPPORTED_LANGUAGES.find(({ code }) =>
      i18n.resolvedLanguage?.startsWith(code),
    )?.code ?? "ka";

  const currentLabel = SUPPORTED_LANGUAGES.find(
    ({ code }) => code === currentLanguage,
  )?.labelKey;

  return (
    <header className="bg-white mb-2 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src="/ipn.jpeg" alt={t("header.logoAlt")} className="h-30 w-auto" />
      </div>

      <div className="flex items-center gap-10">
        <CurrencyTransfer />
        <div className="flex flex-col items-center gap-4">
          <LanguageChange
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            currentLabel={currentLabel}
            SUPPORTED_LANGUAGES={SUPPORTED_LANGUAGES}
            currentLanguage={currentLanguage}
          />
        </div>
      </div>
    </header>
  );
}