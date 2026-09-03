import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface AdItem {
  html: string;
  position: string;
  
}
interface SideBarAdProps {
  adIndex: number;
  position?:string;
}

export default function SideBarAd({ adIndex }: SideBarAdProps) {
  const { i18n } = useTranslation();
  const [ad, setAd] = useState<AdItem | null>(null);
  const lang_code = i18n.resolvedLanguage || "ka";

  useEffect(() => {
    fetch(`https://dev.ipn.ge/${lang_code}/api/ads/`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json()) 
      .then((data) => {
       const adData = data.ads?.[adIndex] ?? null;
       console.log(`Selected ad [${adIndex}]:`, adData);
        setAd(adData);
      })
      .catch((err) => console.error("Failed to Fetch Ads;", err));

  }, [lang_code, adIndex]);


  return (
    <div className="self-start lg:sticky lg:top-6 ml-[50px]">
      {ad?.html && (
        <div dangerouslySetInnerHTML={{ __html: ad.html }} />
        
      )}
    </div>
  );
}