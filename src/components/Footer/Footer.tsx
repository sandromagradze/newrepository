import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        <div className="footer-left">
          <nav className="footer-nav">
            <a href="#">მთავარი</a>
            <span className="divider">|</span>
            <a href="#">ჩვენს შესახებ</a>
            <span className="divider">|</span>
            <a href="#">სერვისები</a>
            <span className="divider">|</span>
            <a href="#">რეკლამა</a>
          </nav>
          <p className="footer-disclaimer">
            მასალების გადაბეჭდვა/რეპროდუცირება აკრძალულია,

            <br />
            იხილეთ მასალის გამოყენების პირობები
          </p>
        </div>


        <div className="footer-middle">
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <span>თბილისი, იოსებიძის ქ. 49</span>
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
            2018 ყველა უფლება დაცულია
          </p>
        </div>
      </div>
    </footer>
  );
}