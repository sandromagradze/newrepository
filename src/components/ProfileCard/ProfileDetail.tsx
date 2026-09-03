import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import WrapperA from "../WrapperA/WrapperA";
import ProfileCard from "../ProfileCard/ProfileCard"; // მიუთითე შენი ფაილის სწორი გზა

interface ProfileImages {
  "176x176": string | null;
  "198x198": string | null;
}

interface ProfileHashtags {
  alias: string;
  id: number;
  keywords: string[];
  title: string;
}

interface Profile {
  id: number;
  alias: string;
  title: string;
  position: string;
  birthdate: string;
  is_pub: boolean;
  hashtags?: ProfileHashtags;
  images?: ProfileImages;
}

interface ApiResponse {
  count: number;
  profiles: Profile[];
}

export default function ProfileDetail() {
  const { i18n } = useTranslation();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const lang_code = i18n.resolvedLanguage || "ka";

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dev.ipn.ge/${lang_code}/api/profiles/`,
          {
            method: "POST",
            headers: {
              "Accept": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        setProfiles(data.profiles || []);
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [lang_code]);

  if (loading) return <div className="p-6">Loading profiles...</div>;

  return (
    <main className="py-6">
      <WrapperA>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map((profile) => {
            
            const imageUrl =
              profile.images?.["176x176"] ||
              profile.images?.["198x198"] ||
              "";

            return (
              <ProfileCard
                key={profile.id}
                id={profile.id}
                image={imageUrl}
                title={profile.title}
                status={profile.position}
              />
            );
          })}
        </div>
      </WrapperA>
    </main>
  );
}