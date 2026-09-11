import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import "./ProfileCard.css";

interface ProfileCardProps {
  id: number | string;

  url: string;

  image?:
    | string
    | {
        "176x176"?: string | null;
        "198x198"?: string | null;
      }
    | {
        original?: string;
        position?: number[];
      }
    | null;

  title: string;

  status?: string;

  position?: string;
}

export default function ProfileCard({
  id,
  url,
  image,
  title,
  status,
  position,
}: ProfileCardProps) {
  const { t } = useTranslation();

  const displayStatus =
    position || status || "";

  /*
   * IMAGE URL
   */
  const imageUrl =
    typeof image === "string"
      ? image
      : image &&
          typeof image === "object"
        ? "176x176" in image &&
          image["176x176"]
          ? image["176x176"]
          : "198x198" in image &&
              image["198x198"]
            ? image["198x198"]
            : "original" in image &&
                image.original
              ? image.original
              : ""
        : "";

  const hasValidImage =
    typeof imageUrl === "string" &&
    imageUrl.trim() !== "";

  /*
   * API URL
   *
   * მაგალითად:
   * /profiles/3-mamuka-baxtaze/
   */
  const profileUrl = url || `/profile/${id}`;

  return (
    <Link
      to={profileUrl}
      className="profile-card"
    >
      <div className="profile-card-size">

        <div className="profile-card-content">

          {hasValidImage ? (
            <img
              src={imageUrl}
              className="profile-card-image"
              alt={title}
              onError={(e) => {
                e.currentTarget.style.display =
                  "none";

                const parent =
                  e.currentTarget.parentElement;

                if (parent) {
                  const fallback =
                    parent.querySelector(
                      ".fallback-img"
                    );

                  if (fallback) {
                    (
                      fallback as HTMLElement
                    ).style.display = "flex";
                  }
                }
              }}
            />
          ) : null}

          <div
            className="fallback-img profile-card-image bg-gray-200 items-center justify-center text-gray-400 text-xs"
            style={{
              display: hasValidImage
                ? "none"
                : "flex",
            }}
          >
            No Photo
          </div>

          <h3 className="profile-card-name">
            {title}
          </h3>

          <p className="profile-card-status">
            {displayStatus}
          </p>

        </div>

        <div className="profile-card-button">
          {t("common.learnMore")}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="profile-card-button-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5-5 5M6 12h12"
            />
          </svg>
        </div>

      </div>
    </Link>
  );
}