import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard";

interface ProfileItem {
  id: number | string;
  alias?: string;
  title: string;
  position: string;
image?: {
    original?: string;
    position?: number[];
  } | string;
  images?: {
    "176x176"?: string | null;
    "198x198"?: string | null;
  };
  status?: string;
}

interface HomeProfileSectionProps {
  localizedProfileCards: ProfileItem[];
  totalCount?: number;
}

export default function HomeProfileSection({
  localizedProfileCards,
  totalCount = 212,
}: HomeProfileSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
      {localizedProfileCards.map((profile) => (
        <ProfileCard
          key={profile.id}
          id={profile.id}
          image={profile.image}
          title={profile.title}
          position={profile.position}
        />
      ) )}

      <Link
        to="/profile"
        className="bg-[#1E5BA6] rounded-[3px] p-6 flex flex-col justify-center text-center text-white h-[332px] cursor-pointer hover:bg-[#184a87] transition-colors box-border no-underline"
      >
        <div className="text-[62px] justify-center font-bold">{totalCount}</div>
        <div className="flex items-center justify-center text-center text-[18px] font-medium">
          <span>{t("homeProfile.viewAll")}</span>
        </div>
        <span className="text-[50px]">→</span>
      </Link>
    </div>
  );
}