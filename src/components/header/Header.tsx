import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../../i18n";
import CurrencyTransfer from "../currency/CurrencyTransfer";
import LanguageChange from "../LanguageChange/LanguageChange";
import SideBarAd from "../Ads/SideBarAd";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const currentLanguage =
    SUPPORTED_LANGUAGES.find(({ code }) =>
      i18n.resolvedLanguage?.startsWith(code),
    )?.code ?? "ka";

  const currentLabel = SUPPORTED_LANGUAGES.find(
    ({ code }) => code === currentLanguage,
  )?.labelKey;

  return (
    <header className="bg-white mb-2 py-4 px-6">
      <div className="flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-4">
          <img
            src="/ipn.jpeg"
            alt={t("header.logoAlt")}
            className="h-30 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* HEADER AD */}
        <div className="flex w-[600px]">
          <SideBarAd
  position="b1"
  className="flex-shrink-0"
/>
        </div>

        {/* RIGHT SIDE */}
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

      </div>
    </header>
  );
}