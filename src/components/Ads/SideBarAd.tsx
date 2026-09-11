import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const API_BASE = "https://dev.ipn.ge";

interface AdItem {
  html: string;
  position: string;
}

interface AdsResponse {
  ads?: AdItem[];
}

interface SideBarAdProps {
  position: string;
  className?: string;
}

function loadHtmlWithScripts(
  html: string,
  container: HTMLElement
): Promise<void> {
  return new Promise((resolve) => {
    if (!html) {
      resolve();
      return;
    }

    const temp = document.createElement("div");
    temp.innerHTML = html;

    const nodes = Array.from(temp.childNodes);

    async function execute() {
      for (const node of nodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) {
          continue;
        }

        const element = node as HTMLElement;

       
        if (element.tagName.toLowerCase() !== "script") {
          container.appendChild(element.cloneNode(true));
          continue;
        }

        const oldScript = element as HTMLScriptElement;
        const script = document.createElement("script");

       
        Array.from(oldScript.attributes).forEach((attribute) => {
          script.setAttribute(
            attribute.name,
            attribute.value
          );
        });

       
        if (oldScript.src) {
          await new Promise<void>((scriptResolve) => {
            script.onload = () => {
              

              scriptResolve();
            };

            script.onerror = () => {
              

              scriptResolve();
            };

           
            script.src = oldScript.src.startsWith("//")
              ? `https:${oldScript.src}`
              : oldScript.src;

            container.appendChild(script);
          });

          continue;
        }

       
        script.textContent =
          oldScript.textContent || "";

        container.appendChild(script);
      }

      resolve();
    }

    execute();
  });
}

export default function SideBarAd({
  position,
  className = "",
}: SideBarAdProps) {
  const { i18n } = useTranslation();

  const containerRef =
    useRef<HTMLDivElement>(null);

  const langCode =
    i18n.resolvedLanguage?.split("-")[0] || "ka";

  useEffect(() => {
    let cancelled = false;

    async function loadAd() {
      try {
       

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

        const data: AdsResponse =
          await response.json();

       

        if (cancelled) {
          return;
        }

        const ad = data.ads?.find(
          (item) =>
            item.position === position
        );

       

        if (!ad?.html) {
          console.warn(
            `[SideBarAd] No ad found for position "${position}"`
          );

          return;
        }

        const container =
          containerRef.current;

        if (!container) {
          return;
        }

        container.innerHTML = "";

        await loadHtmlWithScripts(
          ad.html,
          container
        );

        if (cancelled) {
          return;
        }

      
      } catch (error) {
        if (!cancelled) {
          console.error(
            "[SideBarAd] Failed to load advertisement:",
            error
          );
        }
      }
    }

    loadAd();

    return () => {
      cancelled = true;

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [langCode, position]);

  return (
    <div className={className}>
      <div ref={containerRef} />
    </div>
  );
}