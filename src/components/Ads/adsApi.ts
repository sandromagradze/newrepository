const API_BASE = "https://dev.ipn.ge";

export interface AdItem {
  html: string;
  position: string;
}

export interface AdsResponse {
  ads?: AdItem[];
}

export async function fetchAds(
  langCode: string
): Promise<AdItem[]> {
  const response = await fetch(
    `${API_BASE}/${langCode}/api/ads/`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Ads request failed: ${response.status}`
    );
  }

  const data: AdsResponse = await response.json();

  return data.ads ?? [];
}