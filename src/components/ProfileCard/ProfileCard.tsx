import { useTranslation } from "react-i18next";
import "./ProfileCard.css";

interface ProfileCardProps {
  image: string;
  name: string;
  status: string;
}

export default function ProfileCard({ image, name, status }: ProfileCardProps) {
  const { t } = useTranslation();

  return (
    <div className="profile-card">
      <div className="profile-card-size">
      <img src={image} className="profile-card-image" alt={name} />
      <h3 className="profile-card-name">{name}</h3>
      <p className="profile-card-status">{status}</p>
      <button className="profile-card-button">

      
        {t("common.learnMore")}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="profile-card-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5-5 5M6 12h12"
          />
        </svg>
      </button>
      </div>
    </div>
  );
}
