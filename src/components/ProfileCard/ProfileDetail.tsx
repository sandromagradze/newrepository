import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import WrapperA from "../WrapperA/WrapperA";
import ProfileCard from "../ProfileCard/ProfileCard";

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
  url: string;
  hashtags?: ProfileHashtags;
  images?: ProfileImages;
}

interface ApiResponse {
  pagination?: {
    count: number;
    page: number;
    total: number;
  };
  profiles: Profile[];
}

const API_BASE_URL = "https://dev.ipn.ge";

export default function ProfileDetail() {
  const { i18n } = useTranslation();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const lang_code =
    i18n.resolvedLanguage?.split("-")[0] || "ka";

  /**
   * API-დან მიღებული image path-ის სწორ URL-ად გადაქცევა
   */
  const getImageUrl = (
    image?: string | null
  ): string => {
    if (!image) {
      return "";
    }

    const src = image.trim();

    if (!src) {
      return "";
    }

    // უკვე სრული HTTPS URL
    if (src.startsWith("https://")) {
      return src;
    }

    // HTTP -> HTTPS
    if (src.startsWith("http://")) {
      return src.replace(
        /^http:\/\//,
        "https://"
      );
    }

    // /media/...
    if (src.startsWith("/media/")) {
      return `${API_BASE_URL}${src}`;
    }

    // media/...
    if (src.startsWith("media/")) {
      return `${API_BASE_URL}/${src}`;
    }

    // /...
    if (src.startsWith("/")) {
      return `${API_BASE_URL}${src}`;
    }

    // relative path
    return `${API_BASE_URL}/${src}`;
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/${lang_code}/api/profiles/`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type":
                "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              page: "1",
            }).toString(),
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}`
          );
        }

        const data: ApiResponse =
          await response.json();

        console.log(
          "PROFILES API:",
          data
        );

        console.log(
          "PROFILES:",
          data.profiles
        );

        if (data.profiles?.length > 0) {
          console.log(
            "FIRST PROFILE:",
            data.profiles[0]
          );

          console.log(
            "FIRST PROFILE IMAGES:",
            data.profiles[0].images
          );

          const firstImage =
            data.profiles[0].images?.[
              "176x176"
            ] ||
            data.profiles[0].images?.[
              "198x198"
            ];

          console.log(
            "FIRST IMAGE FROM API:",
            firstImage
          );

          console.log(
            "FIRST IMAGE FINAL URL:",
            getImageUrl(firstImage)
          );

          console.log(
            "FIRST PROFILE URL:",
            data.profiles[0].url
          );
        }

        setProfiles(
          data.profiles || []
        );
      } catch (err) {
        console.error(
          "Failed to fetch profiles:",
          err
        );

        setError(
          "Profiles could not be loaded."
        );

        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [lang_code]);

  /*
   * LOADING
   */
  if (loading) {
    return (
      <main className="py-6">
        <WrapperA>
          <div className="p-6 text-center">
            Loading profiles...
          </div>
        </WrapperA>
      </main>
    );
  }

  /*
   * ERROR
   */
  if (error) {
    return (
      <main className="py-6">
        <WrapperA>
          <div className="p-6 text-center text-red-500">
            {error}
          </div>
        </WrapperA>
      </main>
    );
  }

  /*
   * NO PROFILES
   */
  if (profiles.length === 0) {
    return (
      <main className="py-6">
        <WrapperA>
          <div className="p-6 text-center">
            No profiles found.
          </div>
        </WrapperA>
      </main>
    );
  }

  /*
   * PROFILES
   */
  return (
    <main className="py-6">
      <WrapperA>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map((profile) => {
            const imageFromApi =
              profile.images?.["176x176"] ||
              profile.images?.["198x198"] ||
              "";

            const imageUrl =
              getImageUrl(imageFromApi);

            console.log(
              `Profile "${profile.title}" image:`,
              imageUrl
            );

            console.log(
              `Profile "${profile.title}" URL:`,
              profile.url
            );

            return (
              <ProfileCard
                key={profile.id}
                id={profile.id}
                url={profile.url}
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