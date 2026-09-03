import { useTranslation } from "react-i18next";
import "./Footer.css";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer-container">
      <div className="footer-content">

        <div className="footer-left">
          <nav className="footer-nav">
            <a href="#">{t("footer.home")}</a>
            <span className="divider">|</span>
            <a href="#">{t("footer.about")}</a>
            <span className="divider">|</span>
            <a href="#">{t("footer.services")}</a>
            <span className="divider">|</span>
            <a href="#">{t("footer.ads")}</a>
          </nav>
          <p className="footer-disclaimer">
            {t("footer.disclaimer")}

            <br />
            {t("footer.termsOfUse")}
          </p>
        </div>


        <div className="footer-middle">
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <span>{t("footer.address")}</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <span>(+995 32) 2 38 78 00</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <span>ipnnews@ipn.ge</span>
          </div>
        </div>

       
        <div className="footer-right">
          <div className="partner-logo">
            <span className="logo-placeholder">
              <img src="/Top.svg" alt="Top logo" />
            </span>
          </div>
          <p className="copyright-text">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}